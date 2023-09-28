import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
import {Platform, PopoverController} from '@ionic/angular';
import { DataService } from '../data.service';
import { OperationService } from '../operation.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Component({
  selector: 'app-menuedit',
  templateUrl: './menuedit.page.html',
  styleUrls: ['./menuedit.page.scss'],
})
export class MenueditPage implements OnInit {
  databaseObj: SQLiteObject;
  readonly database_name: string = "IT_ASSET.db";
  readonly table_location: string = "Location";
  constructor(private popover :PopoverController,
    private router : Router,
    private storage : Storage,
    private dataService : DataService,
    private operation : OperationService,
    private sqlite: SQLite,
    private platform : Platform) {
      this.platform.ready().then( () => {
        this.createDB()
        
      }).catch(error => {
        console.log(error);
      })
     }
    
  ngOnInit() {
  }
  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        this.createTableLocation()
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
async changePageUpdateLocation(){
  await this.getLocation()
  this.router.navigate(['edit'])
  }
changePageUpdateStatus(){
  this.router.navigate(['updatestatus'])
}
async getLocation() {
 
  await this.databaseObj.executeSql(`
  SELECT * FROM ${this.table_location}
  `
  , [])
  .then((res) => {
    this.dataService.row_data_location = [];
  
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        this.dataService.row_data_location.push(res.rows.item(i).Location);
      }
    }
  })
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });
}



}
