import { Component, OnInit ,ViewChild } from '@angular/core';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import {NavController} from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {DataService} from '../data.service';
import{AlertController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import { IonInfiniteScroll } from '@ionic/angular';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { MenueditPage } from '../menuedit/menuedit.page';
import { PopoverController } from '@ionic/angular';
import { OperationService } from '../operation.service';
const { Network } = Plugins;
@Component({
  selector: 'app-updatestatus',
  templateUrl: './updatestatus.page.html',
  styleUrls: ['./updatestatus.page.scss'],
})
export class UpdatestatusPage implements OnInit {
  public postDataUpdate={
    A_No:'',
    Location:'',
    Employees:'',
    location:'',
    status:'',
    empID:[],
    empName:[],
    checkA:[],
    countUpdate:'',
    keep:''
  }
  newstatus:''
  a_no=''
  databaseObj: SQLiteObject;
  row_data: any = [];
  row_data_status:any=[];
  readonly database_name: string = "IT_ASSET.db";

   readonly table_status: string = "Status";
  constructor(public navCtrl: NavController ,
    private router:Router ,
     private authService:AuthService,
     public datepipe:DatePipe,
     public dataService:DataService,
     public alertController:AlertController,
     private platform: Platform,
     private sqlite: SQLite,
     public popoverController: PopoverController,
     private operation : OperationService) { 
      this.platform.ready().then(() => {
        this.createDB();
        
      }).catch(error => {
        console.log(error);
      })
     }

     async ngOnInit() {
  
      document.getElementById("autoselect").click(),5000;
      // setInterval(function() {
      //   let element:HTMLElement = document.getElementById('auto_trigger6') as HTMLElement;
    
      // element.click(),1000;
     
      //   }, 1000); 
        
  }
  
  ngOnDestroy() {
  
  }

  createDB() {
  this.sqlite.create({
    name: this.database_name,
    location: 'default'
  })
    .then((db: SQLiteObject) => {
      this.databaseObj = db;
      this.createTableStatus()

      this.getRows()
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }

  
  createTableStatus() {
    
    this.databaseObj.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.table_status}  (ID INTEGER PRIMARY KEY, A_No varchar(50),Status varchar(50),Date date )
    `, [])
      .then(() => {
    
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    }


  storageData(){
    let checkname = true
    let a = []
    let b = []
    if(this.a_no != '' && this.newstatus != ''){
 
    this.databaseObj.executeSql(`
    INSERT INTO ${this.table_status} (A_No,Status) VALUES ('${this.a_no}','${this.newstatus}')
  `, [])
    .then(() => {
  
      this.getRows()
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    this.databaseObj.executeSql(`
    SELECT * FROM ${this.table_status}
    `
    , [])
    .then((res) => {
      if(this.a_no != ''){
      this.row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          a[i] = res.rows.item(i).A_No
         if(this.a_no != res.rows.item(i).A_No){
     
         }else if(this.a_no == res.rows.item(i).A_No){
         
            b[i] = res.rows.item(i).ID
            checkname = false
            
         }
        }
        
      }
      
      if(checkname == false){
       
        for (var j = 0; j < b.length-1; j++) {
        this.databaseObj.executeSql(`
    DELETE FROM ${this.table_status} WHERE ID = '${b[j]}' AND A_No= '${a[j]}'
    `
      , [])
      .then((res) => {
        this.a_no=''
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
      }
    
      }
      this.a_no = ''
      }
          })  
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });  
  }
  
  }
  getRows() {
    
    this.databaseObj.executeSql(`
    SELECT * FROM ${this.table_status} 
    `
      , [])
      .then((res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    }

    
  deleteRow(item) {
  
    this.databaseObj.executeSql(`
    DELETE FROM ${this.table_status} WHERE ID = ${item.ID}
  `
    , [])
    .then((res) => {
    
      this.getRows();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }
  async updateMaterialStatus(){
    if(this.a_no != '' && this.newstatus !=''){
    let updateData= "x="+"{A_No:"+"'"+ this.a_no+"'" +",statusid:"+"'"+ this.newstatus+"'" +",update_by:"+"'"+this.dataService.profile.fname+"'" + "}" 
    this.authService.UpdateMaterialLocation(updateData).subscribe(async res => {
      if(res.bool_Result == true){
        alert('ทำรายการสำเร็จ')
        this.a_no =''
        this.newstatus=''
      }else{
      alert('ไม่พบ A-Number')
      this.a_no =''
        this.newstatus=''
      }
    })
  }
  }

  async updateDatabase(){
    let k = 0
    let count = 0
    let keep = 0
    var j =0
    this.postDataUpdate.countUpdate =''
    this.postDataUpdate.keep = ''
    await this.databaseObj.executeSql(`
    SELECT * FROM ${this.table_status}
    `
    , [])
    .then((res) => {
      keep = res.rows.length
      this.row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.row_data.push(res.rows.item(i));
          this.postDataUpdate.A_No = res.rows.item(i).A_No
         
          this.postDataUpdate.checkA[i] = res.rows.item(i).A_No
          if(res.rows.item(i).Status =="Waste"){
            this.postDataUpdate.status = "2"
          }
          if(res.rows.item(i).Status =="Repair"){
            this.postDataUpdate.status = "3"
          }
          if(res.rows.item(i).Status =="Write-Off"){
            this.postDataUpdate.status = "4"
          }
          let updateData= "x="+"{A_No:"+"'"+ this.postDataUpdate.A_No+"'" +",statusid:"+"'"+ this.postDataUpdate.status+"'" +",update_by:"+"'"+this.dataService.profile.fname+"'" + "}" 
          this.authService.UpdateMaterialLocation(updateData).subscribe(async res => {
            if(res.bool_Result==true){
               count++
                this.postDataUpdate.countUpdate = "success :"+count.toString() 
              await this.databaseObj.executeSql(`
              DELETE FROM ${this.table_status} WHERE A_No = '${res.rows.item(i).A_No}'
              `
                , [])
                .then((res) => {

                })
                .catch(e => {
                  alert("error " + JSON.stringify(e))
                });
                
            }
            else {
             
              k++
              this.postDataUpdate.keep  = "fail :" + k.toString()
            }
            // alert(this.dataError.err_a)
          },(err)=>
          alert(err.message)
          )     
        }
        }

    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    
    }






  async  presentPopover(event) {
    const popoverElement =await this.popoverController.create( {
      component: MenueditPage,
      componentProps:{},
      event: event,
      translucent:true
    });
   
    this.dataService.currentPopover = popoverElement
    return await popoverElement.present();
  }


 
}
