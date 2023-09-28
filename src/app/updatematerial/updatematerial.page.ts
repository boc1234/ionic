
import { Component, OnInit ,ViewChild } from '@angular/core';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

import {NavController} from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import {DataService} from '../data.service';
import{AlertController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import { IonInfiniteScroll } from '@ionic/angular';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
const { Network } = Plugins;
@Component({
  selector: 'app-updatematerial',
  templateUrl: './updatematerial.page.html',
  styleUrls: ['./updatematerial.page.scss'],
})
export class UpdatematerialPage implements OnInit {
  public dataError ={
    err_a:[]
   }
  public postDataUpdate={
    A_No:'',
    A:[],
    allL:[],
    allF:[],
    allR:[],
    getL:'',
    getF:'',
    getR:'',
    getStatus:'',
    R:[],
    L:[],
    F:[],
    emp:'',
    Location:[],
    Employees:[],
    newA_No:'',
    newLocation:'',
    location:'',
    hDate:'',
    hA_No:'',
    hLocation:'',
    hEmp:'',
    hStatus:'',
    name_model:'',
    status:[],
    sta:'',
    empID:[],
    empName:[],
    checkA:[],
    countUpdate:'',
    keep:''
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
 readonly table_category : string = "Category"
  name_model: string = "C-778899";
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
  constructor(
    public navCtrl: NavController ,
    private router:Router ,
     private authService:AuthService,
     public datepipe:DatePipe,
     public dataService:DataService,
     public alertController:AlertController,
     private platform: Platform,
     private sqlite: SQLite
  ) { 
    this.platform.ready().then(() => {
      this.createDB()
      
    }).catch(error => {
      console.log(error);
    })
  }
  back(){
    this.router.navigate(['mobilehome'])
  }
  async ngOnInit() {
  
 
    document.getElementById("autoselectlocation").click(),5000;
    // setInterval(function() {
    //   let element:HTMLElement = document.getElementById('auto_trigger_update') as HTMLElement;
  
    // element.click(),1000;
   
    //   }, 1000); 
      this.networkListener = Network.addListener('networkStatusChange', (status) => {
        console.log("Network status changed", status);
        this.networkStatus = status;
      });
    
      this.networkStatus = await Network.getStatus();
}

ngOnDestroy() {
  
  this.networkListener.remove();
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
 


selectLocation(){
 

this.authService.getAllLocation(this.postDataUpdate).subscribe((res:any)=>{

   this.databaseObj.executeSql(`
  DELETE FROM ${this.table_name2}
  `
    , [])
    .then((res) => {
    
      this.getRows();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
 
  let result =[res]

  let list = [];
  let j = 0 ;
  res.forEach(element => {
  list.push(element);
  
    try{
    do{
      this.postDataUpdate.allL[j] = res[j].location_Name 
     
      this.postDataUpdate.allF[j] = res[j].location_Floor
      this.postDataUpdate.allR[j] = res[j].room_Name 
      
     this.databaseObj.executeSql(`
  INSERT INTO ${this.table_name2} (Location,Floor,Room) VALUES ('${this.postDataUpdate.allL[j]}','${this.postDataUpdate.allF[j]}','${this.postDataUpdate.allR[j]}')
`, [])
  .then(() => {
    this.getRowsLocation()
  
    
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });

  j++
    }while(res[j].location_Name != undefined)
   
   
  }catch{e =>{
    alert("error" + JSON.stringify(e))
  }}

  })

})

}

getRowsLocation() {

this.databaseObj.executeSql(`
SELECT DISTINCT Location FROM ${this.table_name2}
`
  , [])
  .then((res) => {
    this.row_data2 = [];
    
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        this.row_data2.push(res.rows.item(i).Location);
        
      }
    }
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}

getRowsFloor() {
alert(this.postDataUpdate.getL)
this.databaseObj.executeSql(`
SELECT DISTINCT Floor FROM ${this.table_name2} WHERE Location = '${this.postDataUpdate.getL}'
`
  , [])
  .then((res) => {
    
    this.row_data3 = [];
    (<HTMLInputElement> document.getElementById("floor")).disabled = false;
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        this.row_data3.push(res.rows.item(i).Floor)
    
      }
    }
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}
enter(){
(<HTMLInputElement> document.getElementById("input1")).disabled = false;
}
doRefresh(event) {
console.log('Begin async operation');
this.selectDatabase();
this.createTable();
this.createTableEmployees();
this.createTableLocation();
this.createTableHistory();
this.createTableStatus();
this.createTableHistorystatus()
this.createTableHistoryemployees()
this.createTableError()

setTimeout(() => {
  console.log('Async operation has ended');
  event.target.complete();
}, 2000);
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

// Create table
createTable() {

this.databaseObj.executeSql(`
CREATE TABLE IF NOT EXISTS ${this.table_name}  (ID INTEGER PRIMARY KEY, A_No varchar(50),Location varchar(50),Employees varchar(50),Status varchar(50),Cause varchar(50),Error varchar(50))
`, [])
  .then(() => {
    alert('Table Created!');
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}
createTableEmployees() {

this.databaseObj.executeSql(`
CREATE TABLE IF NOT EXISTS ${this.table_name1}  (ID INTEGER PRIMARY KEY,emp_ID varchar(50),emp_Name varchar(50))
`, [])
  .then(() => {

  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}
createTableLocation() {

this.databaseObj.executeSql(`
CREATE TABLE IF NOT EXISTS ${this.table_name2}  (ID INTEGER PRIMARY KEY,Location varchar(50),Floor varchar(50),Room varchar(50))
`, [])
  .then(() => {
 
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}
createTableHistory(){
this.databaseObj.executeSql(`
CREATE TABLE IF NOT EXISTS ${this.table_name3}  (ID INTEGER PRIMARY KEY,Date date,Material varchar(50),Location varchar(50),Employees varchar(50),Status varchar(50),Error varchar(50))
`, [])
  .then(() => {

  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}
createTableStatus(){
this.databaseObj.executeSql(`
CREATE TABLE IF NOT EXISTS ${this.table_name4}  (ID INTEGER PRIMARY KEY,type varchar(50))
`, [])
  .then(() => {

  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}
createTableHistorystatus(){
this.databaseObj.executeSql(`
CREATE TABLE IF NOT EXISTS ${this.table_name5}  (ID INTEGER PRIMARY KEY,Date date,Material varchar(50),Location varchar(50),Employees varchar(50),Status varchar(50))
`, [])
  .then(() => {
  
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}
createTableHistoryemployees(){
this.databaseObj.executeSql(`
CREATE TABLE IF NOT EXISTS ${this.table_name6}  (ID INTEGER PRIMARY KEY,Date date,Material varchar(50),Location varchar(50),Employees varchar(50),Status varchar(50))
`, [])
  .then(() => {
   
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}
createTableError(){
  this.databaseObj.executeSql(`
  CREATE TABLE IF NOT EXISTS ${this.table_err}  (ID INTEGER PRIMARY KEY,Material varchar(50),Cause varchar(50))
  `, [])
    .then(() => {
      
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }


//Inset row in the table
insertRow() {
// Value should not be empty
if (!this.name_model.length) {
  alert("Enter Name");
  return;
}

this.databaseObj.executeSql(`
  INSERT INTO ${this.table_name} (A_No,Location) VALUES ('${this.name_model}','location1')
`, [])
  .then(() => {
    alert('Row Inserted!');
    this.getRows();
    this.name_model = ''
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}

// Retrieve rows from table
getRows() {
  
this.databaseObj.executeSql(`
SELECT * FROM ${this.table_name3} 
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
  DELETE FROM ${this.table_name} WHERE ID = ${item.ID}
`
  , [])
  .then((res) => {
   
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
  this.databaseObj.executeSql(`
  DELETE FROM ${this.table_name3} WHERE ID = ${item.ID}
`
  , [])
  .then((res) => {
    Swal.fire({
      
      icon: 'success',
      title: 'Deleted!',
      showConfirmButton: false,
      timer: 1200
    })
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

// Update row with saved row id
updateRow() {
this.databaseObj.executeSql(`
  UPDATE ${this.table_name}
  SET Name = '${this.name_model}'
  WHERE pid = ${this.to_update_item.pid}
`, [])
  .then(() => {
    alert('Row Updated!');
    this.updateActive = false;
    this.getRows();
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}

async selectDatabase(){

await this.authService.Select2(this.postDataUpdate).subscribe((res:any)=>{

  let result =[res]
  // console.log(result)
  // let list = [];
   let i = 0 ;
  // result.forEach(element => {
  // list.push(element);

  this.databaseObj.executeSql(`
  DELETE FROM ${this.table_name}
  `
    , [])
    .then((res) => {
  
      this.getRows();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    this.databaseObj.executeSql(`
  DELETE FROM ${this.table_name2}
  `
    , [])
    .then((res) => {
   
      this.getRows();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    this.databaseObj.executeSql(`
  DELETE FROM ${this.table_name3}
  `
    , [])
    .then((res) => {

      this.getRows();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    this.databaseObj.executeSql(`
  DELETE FROM ${this.table_name4}
  `
    , [])
    .then((res) => {

      this.getRows();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    this.databaseObj.executeSql(`
  DELETE FROM ${this.table_name5}
  `
    , [])
    .then((res) => {
      
      this.getRows();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    this.databaseObj.executeSql(`
    DELETE FROM ${this.table_name6}
    `
      , [])
      .then((res) => {
        
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    try{
      
    do{
       
      this.postDataUpdate.A[i] = res[i].A_No
      this.postDataUpdate.status[i] = res[i].status.type
      
      if(res[i].location == undefined && res[i].employees == undefined){
        this.postDataUpdate.Location[i] ='ไม่พบ'
        this.postDataUpdate.Employees[i] = 'ไม่พบ'
     
       }else if(res[i].employees == undefined){
       
       this.postDataUpdate.Location[i] = res[i].location.location_Name
       this.postDataUpdate.Employees[i] = 'ไม่พบ'
       }else if(res[i].location == undefined){
         this.postDataUpdate.Location[i] ='ไม่พบ'
         this.postDataUpdate.Employees[i] = res[i].employees.emp_ID
        
      }else{
        this.postDataUpdate.Employees[i] = res[i].employees.emp_ID
        this.postDataUpdate.Location[i] = res[i].location.location_Name
       
       
      }
      
  //   this.databaseObj.executeSql(`
  //   INSERT INTO ${this.table_name} (A_No,Location) VALUES ('${this.postData.A[i]}','${this.postData.Location[i]}')
  // `, [])
  //   .then(() => {
  //     this.getRows();
  //   })
  //   .catch(e => {
  //     alert("error " + JSON.stringify(e))
  //   });
    this.postDataUpdate.A_No = '';
    i++

 }while(res[i].A_No.length > result.length)
 
 
   
  }catch{}

 
  this.selectStatus()
  this.selectLocation()
  

  },err =>{
    alert("error")
    

  },)
  


// })
}

checkRows() {
let status = 0;
if(this.name_model != ''){
if(this.postDataUpdate.getL==''){
 alert("โปรดเลือกสถานที่")
 this.name_model=''
}else{
this.databaseObj.executeSql(`
SELECT * FROM ${this.table_name}
`
, [])
.then((res) => {
  
  this.row_data = [];
  if (res.rows.length > 0) {
  
    for (var i = 0; i < res.rows.length; i++) {
      
      if(this.name_model == res.rows.item(i).A_No){
       
        
        status = 1
        this.postDataUpdate.sta = res.rows.item(i).Status
         this.postDataUpdate.emp = res.rows.item(i).Employees
        this.databaseObj.executeSql(`
        UPDATE ${this.table_name}
        SET Location = '${this.postDataUpdate.getL}'
        WHERE A_No = '${this.name_model}'
      `, [])
        .then(() => {
          
          
          this.updateActive = false;
          this.postDataUpdate.name_model = this.name_model
          status = 1
          this.insertHistory()
          this.getRows();
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });

        }
       
    
    }
    if(status == 0){
      alert("ไม่พบ A-Number")
          this.name_model = ''
          this.postDataUpdate.name_model = ''
    }
}
  
  

})

.catch(e => {
  alert("error " + JSON.stringify(e))
});
}

}

}
insertMaterial2(){
  if(this.name_model != ''){
    if(this.postDataUpdate.getL==''){
     alert("โปรดเลือกสถานที่")
     this.name_model=''
    }else{
  this.databaseObj.executeSql(`
  INSERT INTO ${this.table_name} (A_No,Location) VALUES ('${this.name_model}','${this.postDataUpdate.getL}')
`, [])
  .then(() => {
    // alert(this.postData.A[1]);
    
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
  this.insertHistory()
}
  }
}

insertMaterial(){
  if(this.name_model != ''){
    if(this.postDataUpdate.getL==''){
     alert("โปรดเลือกสถานที่")
     this.name_model=''
    }else{
      
      this.databaseObj.executeSql(`
      INSERT INTO ${this.table_name} (A_No,Location) VALUES ('${this.name_model}','${this.postDataUpdate.getL}')
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
SELECT * FROM ${this.table_name}
`
, [])
.then((res) => {
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
DELETE FROM ${this.table_name} WHERE ID = '${b[j]}' AND A_No= '${a[j]}'
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
  DELETE FROM ${this.table_name3} WHERE ID = '${b[j]}'AND Material = '${a[j]}'
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
  INSERT INTO ${this.table_name3} (Date,Material,Location,Employees,Status) VALUES ('${latest_date}','${this.name_model}','${this.postDataUpdate.getL}','${this.postDataUpdate.emp}','${this.postDataUpdate.getStatus}')
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


async check(){
  await this.databaseObj.executeSql(`
SELECT * FROM ${this.table_name}
`
, [])
.then((res) => {
  
  
})
.catch(e => {
  alert("error " + JSON.stringify(e))
});
}

async updateDatabase(){
this.dataError.err_a=[]
let k = 0
let count = 0
let keep = 0
var j =0
this.postDataUpdate.countUpdate =''
this.postDataUpdate.keep = ''
await this.databaseObj.executeSql(`
SELECT * FROM ${this.table_name}
`
, [])
.then((res) => {
  keep = res.rows.length
  this.row_data = [];
  if (res.rows.length > 0) {
    for (var i = 0; i < res.rows.length; i++) {
      this.row_data.push(res.rows.item(i));
      this.postDataUpdate.newA_No = res.rows.item(i).A_No
      this.postDataUpdate.newLocation = res.rows.item(i).Location
      this.postDataUpdate.checkA[i] = res.rows.item(i).A_No
      
      this.authService.newUpdateMaterial(this.postDataUpdate).subscribe(async (res:any)=>{
    
        
        if(res[0]=='success'){
           count++
            this.postDataUpdate.countUpdate = "success :"+count.toString()
         
            
          this.updateActive = false;
          await this.databaseObj.executeSql(`
          DELETE FROM ${this.table_name} WHERE A_No = '${res[1]}'
          `
            , [])
            .then((res) => {
           
           
          
            })
            .catch(e => {
              alert("error " + JSON.stringify(e))
            });
            
        }
        else {
          this.dataError.err_a[k] = [res[0],res[1]]
          // alert(this.dataError.err_a[k][0])
          // alert(this.dataError.err_a[k][1])
           this.databaseObj.executeSql(`
            UPDATE ${this.table_name3}
            SET Error = 'ไม่พบ ${this.dataError.err_a[k][0]}'
            WHERE Material ='${this.dataError.err_a[k][1]}'
          `, [])
            .then(() => {
              // alert(this.dataError.err_a[0]);
              
              this.getRows();
            })
            .catch(e => {
              alert("error " + JSON.stringify(e))
            });

          k++
          this.postDataUpdate.keep  = "fail :" + k.toString()
        }
        // alert(this.dataError.err_a)
      },(err)=>
      alert(err.message)
      )
      
    }
  
    this.insertDatabaseHistory()
    
    }
    

    
  
})
.catch(e => {
  alert("error " + JSON.stringify(e))
});

}

testupdate(){
  if(this.postDataUpdate.A_No == ''){
    alert('6')
  }
  if(this.postDataUpdate.A_No !=''){
   
    alert('1')
      this.authService.Select666(this.postDataUpdate.A_No).subscribe((result:any)=>{
        
         alert(this.postDataUpdate.A_No)
    alert(result[0])
           alert('0')
     
     
    
        })
          }
}

countUpdate(){
alert('UPDATE'+ this.postDataUpdate.countUpdate)
 
}

async insertDatabaseHistory(){
 
 await this.databaseObj.executeSql(`
SELECT * FROM ${this.table_name3}
`
, [])
.then((res) => {
  
  
  this.row_data3 = [];
  if (res.rows.length > 0) {
    let j= 0
    for (var i = 0; i < res.rows.length; i++) {
      
      this.row_data3.push(res.rows.item(i));
      this.postDataUpdate.hEmp = res.rows.item(i).Employees
      this.postDataUpdate.hDate = res.rows.item(i).Date
      this.postDataUpdate.hA_No = res.rows.item(i).Material
      this.postDataUpdate.hLocation = res.rows.item(i).Location
      this.postDataUpdate.hStatus = 'โอนย้าย'
      
      
       
        // this.authService.Select666(this.postDataUpdate.hA_No).subscribe((result:any)=>{
        //   this.postDataUpdate.hStatus = result[0].status.type
        //   this.postDataUpdate.hEmp = result[0].employees.emp_ID
        


          
       this.authService.newHistory(this.postDataUpdate).subscribe(async (res:any)=>{
  
           if(res[0] == "check"){
             alert(res[1])
           await this.databaseObj.executeSql(`
            DELETE FROM ${this.table_name3} WHERE Material = '${res[1]}'
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
        // }),err=>{

       
        //  }

    }
    
  }
  
})
.catch(e => {
  alert("error " + JSON.stringify(e))
});

}


deleteRows(){
  this.databaseObj.executeSql(`
  DELETE FROM ${this.table_name3}
  `
    , [])
    .then((res) => {
    
      this.getRows();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    this.databaseObj.executeSql(`
  DELETE FROM ${this.table_name}
  `
    , [])
    .then((res) => {
    
      this.getRows();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
}

selectStatus(){


this.authService.getStatus(this.postDataUpdate).subscribe((res:any)=>{
 this.databaseObj.executeSql(`
DELETE FROM ${this.table_name4}
`
  , [])
  .then((res) => {
    
    this.getRows();
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });

let result =[res]

let list = [];
let i = 0 ;
res.forEach(element => {
list.push(element);

  try{
  do{
   
    this.postDataUpdate.status[i] = res[i].type
   this.databaseObj.executeSql(`
INSERT INTO ${this.table_name4} (type) VALUES ('${this.postDataUpdate.status[i]}')
`, [])
.then(() => {
  this.getRowsStatus()

  
})
.catch(e => {
  alert("error " + JSON.stringify(e))
});

i++
   
}while(element[i].type  != undefined)
 
 
}catch{e =>{
  alert("error" + JSON.stringify(e))
}}

})

})

}

getRowsStatus() {

this.databaseObj.executeSql(`
SELECT * FROM ${this.table_name4}
`
, [])
.then((res) => {
  this.row_data4 = [];

  if (res.rows.length > 0) {
    for (var i = 0; i < res.rows.length; i++) {
      
      this.row_data4.push(res.rows.item(i).type);
      
     
    }
  }
})
.catch(e => {
  alert("error " + JSON.stringify(e))
});
}


async presentAlertConfirm() {
  Swal.fire({
    title: 'UPDATE',
    text: "Are you sure?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Update'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
       'Update',
        '',
        'success'
      )
      this.updateDatabase()
      

    }
  })
// const alert = await this.alertController.create({
// cssClass: 'my-custom-class',
// header: 'Confirm!',
// message: 'Message <strong>text</strong>!!!',
// buttons: [
//   {
//     text: 'Cancel',
//     role: 'cancel',
//     cssClass: 'secondary',
//     handler: (blah) => {
//       console.log('Confirm Cancel: blah');
//     }
//   }, {
//     text: 'Okay',
//     handler: () => {
//       console.log('Confirm Okay');
//       this.updateDatabase()
//     }
//   }
// ]
// });

// await alert.present();
}


async presentAlertConfirm2() {
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
      this.selectDatabase()
    }
  }
]
});

await alert.present();
}
public postData={employeeno:"P05613",img:false}

 sss(){
 
  //  this.authService.GetEmployee(this.postData).subscribe(res=>{
  //    console.log(res)
  //    alert(res)
  //  })



}
  
//    ss1(){
//     this.authService.ip().subscribe(result=>{
//     this.authService.test3('{"empno": "P05613", "img": false}').subscribe(res=>{
//       console.log(res)
//     })  
//   })
//  }

updateData= "x="+"{A_No:"+ this.name_model +",Location:"+"test"+"}" 
async updateMaterialLocation(){
  this.authService.UpdateMaterialLocation(this.updateData).subscribe(async res => {
    console.log(res);
  })
}

}
