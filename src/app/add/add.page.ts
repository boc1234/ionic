import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {ModalController} from '@ionic/angular';
import{AlertController} from '@ionic/angular';
import {DataService} from '../data.service';
import anime from 'animejs/lib/anime.es';
import { Platform } from '@ionic/angular';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { data } from 'jquery';
const { Network } = Plugins;
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  postDataAdd ={
    A_No:'',
    getL:'',
    getF:'',
    getStatus:'',
    getCategory:'',
    getDescription:''

  }
  constructor( public navCtrl: NavController,
    private router:Router , 
    private authService:AuthService,
    private modalController:ModalController,
    public alertController:AlertController,
    public dataService:DataService,
    private platform: Platform) { }

  ngOnInit() {
    document.getElementById("btn").click(),5000;
    document.getElementById("btnCategory").click(),5000;
    document.getElementById("btnDescription").click(),5000;
  }

  addMaterial(){
   
    if(this.dataService.dataAdd.A_No == '' || this.dataService.dataAdd.description == '' || this.dataService.dataAdd.category == ''){
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    }else{
    this.authService.Select(this.dataService.dataAdd).subscribe((res:any)=>{
      if(this.dataService.dataAdd.A_No != res.A_No){
        this.authService.addMaterial(this.dataService.dataAdd).subscribe((res:any)=>{
          if(res[0] == true){
            this.dataService.dataAdd.status = 'นำเข้าใหม่'
            this.dataService.dataAdd.detail ='Add new asset'
            this.authService.addHistory(this.dataService.dataAdd).subscribe((res:any)=>{
              if(res == true){
                alert('เพิ่มข้อมูลสำเร็จ')
              }
            })
        

              this.dataService.dataAdd.A_No =''
              this.dataService.dataAdd.ITNo =''
              this.dataService.dataAdd.emp_ID =''
             
              this.dataService.dataAdd.serial_number =''
              this.dataService.dataAdd.manufacturer = ''
              
          }
      
        })
      }else{
        alert('ไม่สามารถเพิ่มรายการได้')
              this.dataService.dataAdd.A_No =''
              this.dataService.dataAdd.ITNo =''
              this.dataService.dataAdd.emp_ID =''
              this.dataService.dataAdd.description =''
              this.dataService.dataAdd.serial_number =''
              this.dataService.dataAdd.manufacturer = ''
              this.dataService.dataAdd.category = ''
      }
    })
  
  }
  
  }

  selectCategory(){
    
    this.authService.allCategoryName(this.postDataAdd).subscribe((res:any)=>{
      console.log(res)
      let result =[res]
      let list = [];
      let i = 0 ;
      result.forEach(element => {
      list.push(element);
    
        try{
        do{
          this.dataService.dataAdd.eleCategory[i] = element[i].category_Name 
          

         i++
         
        }while(element[i].category_Name  != undefined)
       
      }catch{}
   
      })
    })
    
  }

  chooseCategory(){
    this.dataService.dataAdd.category = this.postDataAdd.getCategory
  }

  selectDescription(){
    
    this.authService.allDescription(this.postDataAdd).subscribe((res:any)=>{
      console.log(res)
      let result =[res]
      let list = [];
      let i = 0 ;
      result.forEach(element => {
      list.push(element);
    
        try{
        do{
          this.dataService.dataAdd.eleDescription[i] = element[i].description
          

         i++
         
        }while(element[i].description  != undefined)
       
      }catch{}
   
      })
    })
    
  }
  chooseDescription(){
    this.dataService.dataAdd.description = this.postDataAdd.getDescription
  }
  selectLocation(){
    
    this.authService.getLocation(this.postDataAdd).subscribe((res:any)=>{
      console.log(res)
      let result =[res]
      let list = [];
      let i = 0 ;
      result.forEach(element => {
      list.push(element);
    
        try{
        do{
          this.dataService.dataAdd.ele[i] = element[i].location_Name 
         i++
         
        }while(element[i].location_Name  != undefined)
       
      }catch{}
   
      })
    })
    
  }
   
  selectLocation2(){
    (<HTMLInputElement> document.getElementById("floor")).disabled = false;
    this.dataService.dataAdd.ele2 = []
    this.dataService.dataAdd.getF=''
    this.authService.getLocation2(this.postDataAdd).subscribe((res:any)=>{
      let result =[res]
      let list2 = [];
      let j = 0 ;
  
      //alert(res)
      result.forEach(element => {
      list2.push(element);
      try{
        do{
          
          this.dataService.data.ele2[j] = element[j].location_Floor
         j++
         
        }while(element[j].location_Floor != undefined)
        
      }catch{ 
      }
     
      })
    })
  }







}
