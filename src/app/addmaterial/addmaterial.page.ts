
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
const { Network } = Plugins;
@Component({
  selector: 'app-addmaterial',
  templateUrl: './addmaterial.page.html',
  styleUrls: ['./addmaterial.page.scss'],
})
export class AddmaterialPage implements OnInit {
  public dataError ={
    err_a:[]
   }
  public postDataAddMaterial={
    A_No:'',
    getStatus:'',
    hDate:'',
    hA_No:'',
    hLocation:'',
    hEmp:'',
    hStatus:'',
    name_model:'',
    checkA:[],
    countUpdate:'',
    keep:'',
    room:'',
    manufacturer:'',
    description:'',
    serial_number:'',
    category:'',
    error:''
  }
  data:any[]=Array(5)
  databaseObj: SQLiteObject;
  readonly database_name: string = "IT_ASSET.db";
  readonly table_name1: string = "Employees";
  readonly table_name: string = "Material";
  readonly table_name2: string = "Location";
  readonly table_name3: string = "History";
  readonly table_name4 : string = "Status";
  readonly table_name5 : string = "Historystatus";
  readonly table_name6 : string = "Historyemp";
  readonly table_err : string = "Error"
  readonly a_status : string = "Astatus";
 readonly c_status : string = "Cstatus";
 readonly category : string = "Category"
 readonly table_material_add : string = "Materialadd"
 readonly table_history_add : string = "Historyadd"
  name_model: string = "";
  serial_number: string= "";
  row_data: any = [];
  row_data2: any =[];
  row_data3:any =[];
  row_data4: any=[];
  row_dataerror: any=[];
  // Handle Update Row Operation
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;

  updateActive: boolean;
  er:boolean;
  to_update_item: any;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor( public navCtrl: NavController ,
    private router:Router ,
     private authService:AuthService,
     public datepipe:DatePipe,
     public dataService:DataService,
     public alertController:AlertController,
     private platform: Platform,
     private sqlite: SQLite) {
      this.platform.ready().then(() => {
        this.createDB();
        
      }).catch(error => {
        console.log(error);
      })
      }
      async ngOnInit() {
  
       
        setInterval(function() {
          let element:HTMLElement = document.getElementById('auto666') as HTMLElement;
      
        element.click(),1000;
       
          }, 1000); 
          this.networkListener = Network.addListener('networkStatusChange', (status) => {
            console.log("Network status changed", status);
            this.networkStatus = status;
          });
        
          this.networkStatus = await Network.getStatus();
    }
    
    ngOnDestroy() {
      this.networkListener.remove();
    }
    createDB() {
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
         
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }
    loadData(event){
       
      console.log('das')
      setTimeout(() => {
        
      //  if(this.data.length >this.dataService.data.eleHistoryID.length ){
      //   event.target.complete();
      //   this.infiniteScroll.disabled =true;
      //   return;
      //  }
    
        const nArr = Array(10);
        this.data.push( ...nArr);
        event.target.complete();
        
      }, 1000);
    }
     
    
    
    
    enter(){
    (<HTMLInputElement> document.getElementById("input1")).disabled = false;
    }
    doRefresh(event) {
    console.log('Begin async operation');
    

    
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
    }
   
    
    
    
    getRows() {
      
    this.databaseObj.executeSql(`
    SELECT * FROM ${this.table_material_add} 
    `
      , [])
      .then((res) => {
        this.row_data3 = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data3.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    }
    getRowsError() {
      
      this.databaseObj.executeSql(`
      SELECT * FROM ${this.table_err} 
      `
        , [])
        .then((res) => {
          this.row_dataerror = [];
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              this.row_dataerror.push(res.rows.item(i));
            }
          }
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
      }
    // Delete single row 
    deleteRow(item) {
    this.databaseObj.executeSql(`
      DELETE FROM ${this.table_material_add} WHERE ID = ${item.ID}
    `
      , [])
      .then((res) => {
       
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
      this.databaseObj.executeSql(`
      DELETE FROM ${this.table_history_add} WHERE ID = ${item.ID}
    `
      , [])
      .then((res) => {
        alert("Row Deleted!");
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    }
    
    // Enable update mode and keep row data in a variable
    enableUpdate(item) {
    this.updateActive = true;
    this.to_update_item = item;
    this.name_model = item.Name;
    }
    
    
    
     insertMaterial(){

      if(this.name_model != ''){
        if(this.serial_number ==''){
         alert("โปรดกรอกSerial-Number")
         this.name_model=''
         this.serial_number=''
        }else{
          
          this.databaseObj.executeSql(`
          INSERT INTO ${this.table_material_add} (A_No,Serial_number,Category,Description,Manufacturer,Created_by) VALUES ('${this.name_model}','${this.serial_number}','${this.dataService.dataAddMaterial.category}','${this.dataService.dataAddMaterial.description}','-','ADMIN')
        `, [])
          .then(() => {
       
            this.getRows()
          })
          .catch(e => {
            alert("error " + JSON.stringify(e))
          });
          this.insertHistory()

      let checkname = true
      let a = []
      let b = []
          this.databaseObj.executeSql(`
    SELECT * FROM ${this.table_material_add}
    `
    , [])
    .then(async (res) => {
      if(this.name_model != ''){
      this.row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          a[i] = res.rows.item(i).A_No
         if(this.name_model != res.rows.item(i).A_No){
     
         }else if(this.name_model == res.rows.item(i).A_No){
         
            b[i] = res.rows.item(i).ID
            checkname = false
            
         }
        }
        
      }
      
      if(checkname == false){
       
        for (var j = 0; j < b.length-1; j++) {
        this.databaseObj.executeSql(`
    DELETE FROM ${this.table_material_add} WHERE ID = '${b[j]}' AND A_No= '${a[j]}'
    `
      , [])
      .then((res) => {
        this.name_model=''
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
     this.databaseObj.executeSql(`
      DELETE FROM ${this.table_history_add} WHERE ID = '${b[j]}'AND Material = '${a[j]}'
      `
        , [])
        .then((res) => {
          this.name_model=''
          this.getRows();
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
      }
    
      }
      this.name_model = ''
      this.serial_number =''
      }
          })  
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
      
    
    
    }
      
    if(this.row_data3.length < this.data.length){
      this.data = Array(this.row_data3.length)
    }
    
      }
    }
    
    
    insertHistory(){
     
      let newDate = new Date()
      let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy HH:mm:ss');
     if(this.name_model == ''){alert('1')}else{
      this.databaseObj.executeSql(`
      INSERT INTO ${this.table_history_add} (Date,Material,Location,Employees,Status) VALUES ('${latest_date}','${this.name_model}','NULL','NULL','นำเข้าใหม่')
    `, [])
      .then(() => {
        // alert(this.postData.A[1]);
        // this.name_model = ''
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
     }
    }
    

    async addDatabase(){
    this.dataError.err_a=[]
    this.postDataAddMaterial.error = ''
    let k = 0
    let count = 0
    let keep = 0
    var j =0
    this.postDataAddMaterial.countUpdate =''
    this.postDataAddMaterial.keep = ''
    await this.databaseObj.executeSql(`
    SELECT * FROM ${this.table_material_add}
    `
    , [])
    .then(async (res) => {
      keep = res.rows.length
      this.row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
         
          this.row_data.push(res.rows.item(i));
          this.postDataAddMaterial.A_No = res.rows.item(i).A_No
          this.postDataAddMaterial.description = res.rows.item(i).Description
          this.postDataAddMaterial.serial_number = res.rows.item(i).Serial_number
          this.postDataAddMaterial.manufacturer = res.rows.item(i).Manufacturer
          this.postDataAddMaterial.category = res.rows.item(i).Category
          this.postDataAddMaterial.room = res.rows.item(i).Location
          this.postDataAddMaterial.checkA[i] = res.rows.item(i).A_No
          
          this.authService.addMaterial(this.postDataAddMaterial).subscribe(async (res:any)=>{
        
            
            if(res[0]==true){
               count++
                this.postDataAddMaterial.countUpdate = "success :"+count.toString()
        
                
              this.updateActive = false;
              this.databaseObj.executeSql(`
              DELETE FROM ${this.table_material_add} WHERE A_No = '${res[1]}'
              `
                , [])
                .then((res) => {
               
               this.getRows()
              
                })
                .catch(e => {
                  alert("error " + JSON.stringify(e))
                });
                
            }
            else {
              this.postDataAddMaterial.error = await res[0]
              
              k++
              this.postDataAddMaterial.keep  = "fail :" + k.toString()
            }
            // alert(this.dataError.err_a)
          },(err)=>
          alert(err.message)
          )
          
        }

      
      await this.insertDatabaseHistory()
      
        
        }
        
    
        
      
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    
    }
        
    countUpdate(){
    alert('UPDATE'+ this.postDataAddMaterial.countUpdate)
     
    }
    
    async insertDatabaseHistory(){
    
     await this.databaseObj.executeSql(`
    SELECT * FROM ${this.table_history_add}
    `
    , [])
    .then(async (res) => {
      
      
      this.row_data3 = [];
      if (res.rows.length > 0) {
        let j= 0
        for (var i = 0; i < res.rows.length; i++) {
          
         await this.row_data3.push(res.rows.item(i));
         
          this.postDataAddMaterial.hEmp = res.rows.item(i).Employees
          this.postDataAddMaterial.hDate = res.rows.item(i).Date
          this.postDataAddMaterial.hA_No = res.rows.item(i).Material
          this.postDataAddMaterial.hLocation = res.rows.item(i).Location
          this.postDataAddMaterial.hStatus = 'นำเข้าใหม่'
          
              if(this.postDataAddMaterial.error != this.postDataAddMaterial.hA_No){
           this.authService.newHistory(this.postDataAddMaterial).subscribe(async (res:any)=>{
      
               if(res[0] == "check"){
              await  this.databaseObj.executeSql(`
                DELETE FROM ${this.table_history_add} WHERE Material = '${res[1]}'
                `
                  , [])
                  .then((res) => {
                    this.getRows()
                 
                  })
                  .catch(e => {
                    alert("error " + JSON.stringify(e))
                  });
                   
                }
              })
       
            }
        }
        
      }
      
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    
    }
    
    
    deleteRows(){
      this.databaseObj.executeSql(`
      DELETE FROM ${this.table_material_add}
      `
        , [])
        .then((res) => {
        
          this.getRows();
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
        this.databaseObj.executeSql(`
      DELETE FROM ${this.table_history_add}
      `
        , [])
        .then((res) => {
        
          this.getRows();
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }
    
    
    
    async presentAlertConfirm() {
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: 'Message <strong>text</strong>!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
          this.addDatabase()
        }
      }
    ]
    });
    
    await alert.present();
    }
    
    
    
    
}


