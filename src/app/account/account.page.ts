import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
import { asapScheduler } from 'rxjs';
import {DataService} from '../data.service';
import Swal from 'sweetalert2'
import { OperationService } from '../operation.service'
import { AuthService } from '../auth.service';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';
import { LoadingController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private router:Router ,
     private storage:Storage,
     public dataService:DataService,
     private operation:OperationService,
     private authService : AuthService,
     private platform : Platform,
     private sqlite: SQLite,
     public loadingController: LoadingController
     ) { 
      this.platform.ready().then(() => {
        this.createDB()
        
      }).catch(error => {
        console.log(error);
      })
     }
a:string = ''
image : any = ''
databaseObj: SQLiteObject;
readonly database_name: string = "IT_ASSET.db";
readonly table_location: string = "Location";
readonly table_time: string = "Time";
 async ngOnInit() {
  await  this.get()
  this.dad()
  }

  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        this.createTableLocation()
        this.createTableTime()
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
      createTableTime() {
    
        this.databaseObj.executeSql(`
        CREATE TABLE IF NOT EXISTS ${this.table_time}  (ID INTEGER PRIMARY KEY, Expire date )
        `, [])
          .then(() => {

          })
          .catch(e => {
    
            alert("error " + JSON.stringify(e))
          });
        }

      async presentLoading() {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
          duration: 3000
        });
        await loading.present();
    
        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');
      }
  
public logout() {
  this.dataService.employeeno = ''
  this.storage.clear().then(() => {
   
    this.router.navigate(['employeelogin']);
  });
  // Swal.fire({
  //   title: 'Logging out',
  //   text: "Are you sure?",
  //   icon: 'question',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Log out'
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     // Swal.fire(
  //     //  'Logout',
  //     //   '',
  //     //   'success'
  //     // )

      

  //   }
  // })
  
}

picImage :any
dad(){
  this.picImage = this.dataService.profile.image
  // console.log(this.image)
}

public async get(){

  return [this.dataService.profile.fname = await this.storage.get(`fristname`),
  this.dataService.profile.lname = await this.storage.get(`lastname`),
  this.dataService.profile.image = await this.storage.get(`image`),
  this.dataService.profile.empno = await this.storage.get(`empno`),
  this.dataService.profile.department = await this.storage.get(`department`)];
  
}

changePageUpdateList(){
  this.router.navigate(['updatelist'])
}




  async loadLocation(){
    this.presentLoading()
    let datenow = new Date()
    let datenow_sec = datenow.getTime()/1000;
    let locationexpire = Math.floor(datenow_sec+(3600*168));
   

    await this.databaseObj.executeSql(`
    SELECT * FROM ${this.table_time}
    `
    , [])
    .then((res) => {
      if (res.rows.length > 0){

      }else{
        this.databaseObj.executeSql(`
         INSERT INTO ${this.table_time} (Expire) VALUES ('${locationexpire}')
         `, [])
         .then(() => {
  
          })
      }

       this.databaseObj.executeSql(`
        UPDATE ${this.table_time}
        SET Expire = '${locationexpire}'
        WHERE ID = '1'
      `, [])
        .then(() => {
    
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });

        
    
    this.authService.GetJobSite('').subscribe(res=>{
      
      this.databaseObj.executeSql(`
      DELETE FROM ${this.table_location}
      `
        , [])
        .then((res) => {
        
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
      let result =[res]
            // this.dataService.dataLocation.location[0] = res[0].JobNo
            let list = [];
            let j = 1 ;
            let i = 1;
          //   result.forEach(element => {
          //   list.push(element);
          //  console.log(element[j].JobNo)
          // this.location = res[j].JobNo
          this.databaseObj.executeSql(`
          INSERT INTO ${this.table_location} (Location) VALUES ('${res[0].JobNo}')
          `, [])
          .then(() => {
          })
            do{
              
              if(res[j].JobNo != res[j-1].JobNo){
                // this.dataService.dataLocation.location[i] = res[j].JobNo
               
                this.databaseObj.executeSql(`
                INSERT INTO ${this.table_location} (Location) VALUES ('${res[j].JobNo}')
                `, [])
                .then(() => {
                })
              }
              i++
              j++
            }while(res[j].JobNo != undefined)
    
               
            })
           
          })
  }
}

