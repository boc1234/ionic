import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperationService } from '../operation.service';
import { MenueditPage } from '../menuedit/menuedit.page'
import { DataService } from '../data.service';
import { LoadingController, Platform, PopoverController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage'
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
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
  databaseObj: SQLiteObject;
  readonly database_name: string = "IT_ASSET.db";
  readonly table_material: string = "Material";
  readonly table_history: string = "History";
  readonly table_location: string = "Location";
  row_data: any = [];
  row_data_location:any=[];
  constructor(private router:Router,
    private operation : OperationService,
    private dataService : DataService,
    public popoverController: PopoverController,
    public authService: AuthService,
    public storage : Storage,
    private platform : Platform,
    private sqlite: SQLite,
    public loadingController: LoadingController,
    public datepipe:DatePipe) {
      this.platform.ready().then( () => {
        this.createDB()
        
      }).catch(error => {
        console.log(error);
      })
     }
a_no=''
newlocation=''
ionViewDidEnter(){
  (<HTMLInputElement>document.getElementById('inputlocation')).focus();
}

  ngOnInit() {
    // setInterval(function() {
    //   let element:HTMLElement = document.getElementById('auto_trigger_update') as HTMLElement;
  
    // element.click(),1000;
   
    //   }, 1000); 
      
  }

  ngOnDestroy(){
    this.row_data_location =[]
  }

  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        this.createTableHistory()
        this.createTableLocation()

        this.getRows()
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    }
    
    // Create table
    createTableHistory() {
    
    this.databaseObj.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.table_history}  (ID INTEGER PRIMARY KEY, A_No varchar(50),Location varchar(50),Date date )
    `, [])
      .then(() => {
    
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    }
    createTableLocation() {
    
      this.databaseObj.executeSql(`
      CREATE TABLE IF NOT EXISTS ${this.table_location}  (ID INTEGER PRIMARY KEY, Location varchar(50) )
      `, [])
        .then(() => {
      
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
      }


  deleteRow(item) {
  
      this.databaseObj.executeSql(`
      DELETE FROM ${this.table_history} WHERE ID = ${item.ID}
    `
      , [])
      .then((res) => {
      
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    }
    

storageData(){
  let checkname = true
  let a = []
  let b = []
  if(this.a_no != '' && this.newlocation != ''){

  this.databaseObj.executeSql(`
  INSERT INTO ${this.table_history} (A_No,Location) VALUES ('${this.a_no}','${this.newlocation}')
`, [])
  .then(() => {

    this.getRows()
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
  this.databaseObj.executeSql(`
  SELECT * FROM ${this.table_history}
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
  DELETE FROM ${this.table_history} WHERE ID = '${b[j]}' AND A_No= '${a[j]}'
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
  SELECT * FROM ${this.table_history} 
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
  async updateMaterialLocation(){
    if(this.a_no != '' && this.newlocation !=''){
    let updateData= "x="+"{A_No:"+"'"+ this.a_no+"'" +",Location:"+"'"+ this.newlocation+"'" +",update_by:"+"'"+this.dataService.profile.fname+"'" + "}" 
    this.authService.UpdateMaterialLocation(updateData).subscribe(async res => {
      if(res.bool_Result == true){
        alert('ทำรายการสำเร็จ')
        this.a_no =''
        this.newlocation=''
      }else{
      alert('ไม่พบ A-Number')
      this.a_no =''
        this.newlocation=''
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
    SELECT * FROM ${this.table_history}
    `
    , [])
    .then((res) => {
      keep = res.rows.length
      this.row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.row_data.push(res.rows.item(i));
          this.postDataUpdate.A_No = res.rows.item(i).A_No
          this.postDataUpdate.Location = res.rows.item(i).Location
          this.postDataUpdate.checkA[i] = res.rows.item(i).A_No
          let updateData= "x="+"{A_No:"+"'"+ this.a_no+"'" +",Location:"+"'"+ this.newlocation+"'" +",update_by:"+"'"+this.dataService.profile.fname+"'" + "}" 
          this.authService.UpdateMaterialLocation(updateData).subscribe(async res => {
            if(res.bool_Result==true){
               count++
                this.postDataUpdate.countUpdate = "success :"+count.toString() 
              await this.databaseObj.executeSql(`
              DELETE FROM ${this.table_history} WHERE A_No = '${res.rows.item(i).A_No}'
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

    public async saveCode(e): Promise<void> {
    
     let i =0
     let ch =false
        let loc = e.target.value;
      let list = this.dataService.row_data_location.filter(x => x === loc)[0];
      await this.databaseObj.executeSql(`
      SELECT * FROM ${this.table_location}
      `
      , [])
      .then((res) => {


        if (res.rows.length > 0){
          try{
          do{
            // if(res.rows.item(i).Location != this.newlocation){
            //   ch = true

            // }
            ch=true
             
            i++
           
          }while(res.rows.item(i).Location != this.newlocation)
         
        }catch(e){
          alert("ไม่พบ " + this.newlocation)
          this.newlocation='';
          (<HTMLInputElement>document.getElementById('inputlocation')).focus();
        }
        
        
        }

     

    })
  }









  public async get(){

    return [this.dataService.profile.fname = await this.storage.get(`fristname`)]
    
  }
 
}
