import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Plugins} from '@capacitor/core';
import { OperationService} from '../operation.service'
import {DataService} from '../data.service';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
const {Keyboard} = Plugins;
@Component({
  selector: 'app-searchasset',
  templateUrl: './searchasset.page.html',
  styleUrls: ['./searchasset.page.scss'],
})
export class SearchassetPage implements OnInit {
  @ViewChild('searchInput') sInput;
  constructor(private router:Router,
    private operation:OperationService,
    public dataService:DataService,
    private platform: Platform,
    private sqlite: SQLite,) {
      this.platform.ready().then(() => {
        this.createDB();
        
      }).catch(error => {
        console.log(error);
      })
     }
    databaseObj: SQLiteObject;
    row_data: any = [];
    searchdata:''
    readonly database_name: string = "IT_ASSET.db";
    readonly table_search: string = "Search";
  ngOnInit() {
  
 
  }
  ionViewDidEnter(){
    // Keyboard.removeAllListeners();
      console.log("ionViewDidLoad");
      setTimeout(() => {
        this.sInput.setFocus();
      }, 500);
    }

    createDB() {
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
          this.createTableSearch()
    
          this.getRows()
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
      }
    
      
    createTableSearch() {
        
        this.databaseObj.executeSql(`
        CREATE TABLE IF NOT EXISTS ${this.table_search}  (ID INTEGER PRIMARY KEY, Search varchar(50))
        `, [])
          .then(() => {
        
          })
          .catch(e => {
            alert("error " + JSON.stringify(e))
          });
        }

    search(){
      document.getElementById('storedata').style.display="none";
      document.getElementById('searchdata').style.display="block";
      if(this.searchdata!=''){
      this.databaseObj.executeSql(`
    INSERT INTO ${this.table_search} (Search) VALUES ('${this.searchdata}')
  `, [])
    .then(() => {
      this.searchdata=''
      this.getRows()
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
    }
    }

    getRows() {
    
          this.databaseObj.executeSql(`
          SELECT * FROM ${this.table_search} 
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
      DELETE FROM ${this.table_search} WHERE ID = ${item.ID}
    `
      , [])
      .then((res) => {
      
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    
    }


test(data){
  alert(data)
}

closeSearchData(){
  document.getElementById('storedata').style.display="block";
  document.getElementById('searchdata').style.display="none";
}

}
