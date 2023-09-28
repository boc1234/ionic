import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {ModalController} from '@ionic/angular';
import{AlertController} from '@ionic/angular';
import {DataService} from '../data.service';
import anime from 'animejs/lib/anime.es';
import { Platform } from '@ionic/angular';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { data } from 'jquery';
const { Network } = Plugins;
@Component({
  selector: 'app-chooseadd',
  templateUrl: './chooseadd.page.html',
  styleUrls: ['./chooseadd.page.scss'],
})
export class ChooseaddPage implements OnInit {
public postDataChoose1={
 getCategory:'',
 getDescription:'',
}
databaseObj: SQLiteObject;
readonly database_name: string = "IT_ASSET.db";

readonly table_name: string = "Material";
readonly table_name2: string = "Location";
readonly table_name3: string = "History";
readonly table_name4 : string = "Status";
readonly table_name5 : string = "Historystatus";
readonly table_name6 : string = "Historyemp";
readonly a_status : string = "Astatus";
readonly table_add : string = "Addmaterial";
readonly table_description :string = "Description";
readonly table_category : string = "Category";
name_model: string = "";
row_data: any = [];
row_data2: any =[];
row_data3:any =[];
row_data4:any=[];
row_data5:any=[];
row_status:any=[];
row_category:any=[];
row_description:any=[];
  constructor(public navCtrl: NavController,
    private router:Router , 
    private authService:AuthService,
    private modalController:ModalController,
    public alertController:AlertController,
    public dataService:DataService,
    private platform: Platform,
    private sqlite: SQLite) { 
      this.platform.ready().then(() => {
        this.createDB();
        
      }).catch(error => {
        console.log(error);
      })
    }

  ngOnInit() {
    // document.getElementById("btnLocation1").click(),5000;
    // document.getElementById("btnCategory1").click(),5000;
    // document.getElementById("btnDescription1").click(),5000;
    // document.getElementById("btnrowsDescription").click(),5000;
    // document.getElementById("btnrowsCategory").click(),5000;
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
  
  selectCategory(){
    
    this.authService.allCategoryName(this.postDataChoose1).subscribe((res:any)=>{
      console.log(res)
      let result =[res]
      let list = [];
      let i = 0 ;
      result.forEach(element => {
      list.push(element);
    
        try{
        do{
          this.dataService.dataAddMaterial.eleCategory[i] = element[i].category_Name 
          

         i++
         
        }while(element[i].category_Name  != undefined)
       
      }catch{}
   
      })
    })
    
  }

  chooseCategory(){
    this.dataService.dataAddMaterial.category = this.postDataChoose1.getCategory
  }

  addCategory(){
    (<HTMLInputElement>document.getElementById('addcategory')).style.display='block';
  }
  addDescription(){
    (<HTMLInputElement>document.getElementById('adddescription')).style.display='block';
  }

  selectDescription(){
    
    this.authService.allDescription(this.postDataChoose1).subscribe((res:any)=>{
      this.databaseObj.executeSql(`
      DELETE FROM ${this.table_description}
      `
        , [])
        .then((res) => {
        
         
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
      console.log(res)
      let result =[res]
      let list = [];
      let i = 0 ;
      result.forEach(element => {
      list.push(element);
    
        try{
        do{
          this.dataService.dataAddMaterial.eleDescription[i] = element[i].description
          
          this.databaseObj.executeSql(`
          INSERT INTO ${this.table_description} (Type) VALUES ('${this.dataService.dataAddMaterial.eleDescription[i]}')
        `, [])
          .then(() => {
            this.getRowsDescription()
           
            
          })
          .catch(e => {
            alert("error " + JSON.stringify(e))
          });
         i++
         
        }while(element[i].description  != undefined)
       
      }catch{}
   
      })
    })
    
  }
  getRowsDescription() {

    this.databaseObj.executeSql(`
    SELECT DISTINCT Type FROM ${this.table_description}
    `
      , [])
      .then((res) => {
        this.row_description = [];
        
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_description.push(res.rows.item(i).Type);
            
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    }

    getRowsCategory() {

      this.databaseObj.executeSql(`
      SELECT DISTINCT CategoryName FROM ${this.table_category}
      `
        , [])
        .then((res) => {
          this.row_category = [];
          
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              this.row_category.push(res.rows.item(i).CategoryName);
              
            }
          }
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
      }
    
  chooseDescription(){
  
    this.dataService.dataAddMaterial.description = this.postDataChoose1.getDescription
  }
  selectLocation(){
    
    this.authService.getLocation(this.postDataChoose1).subscribe((res:any)=>{
      console.log(res)
      let result =[res]
      let list = [];
      let i = 0 ;
      result.forEach(element => {
      list.push(element);
    
        try{
        do{
          this.dataService.dataAddMaterial.ele[i] = element[i].location_Name 
         i++
         
        }while(element[i].location_Name  != undefined)
       
      }catch{}
   
      })
    })
    
  }
   
  selectLocation2(){
    (<HTMLInputElement> document.getElementById("floor")).disabled = false;
    this.dataService.dataAddMaterial.ele2 = []
    this.dataService.dataAddMaterial.getF=''
    this.authService.getLocation2(this.postDataChoose1).subscribe((res:any)=>{
      let result =[res]
      let list2 = [];
      let j = 0 ;
  
      //alert(res)
      result.forEach(element => {
      list2.push(element);
      try{
        do{
          
          this.dataService.dataAddMaterial.ele2[j] = element[j].location_Floor
         j++
         
        }while(element[j].location_Floor != undefined)
        
      }catch{ 
      }
     
      })
    })
  }

next(){
 
    this.router.navigate(['addmaterial']);
}
}
