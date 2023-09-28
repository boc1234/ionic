import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import anime from 'animejs/lib/anime.es';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll, NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-updatelist',
  templateUrl: './updatelist.page.html',
  styleUrls: ['./updatelist.page.scss'],
})
export class UpdatelistPage implements OnInit {
public count={
   a:0
}
public getData={
  getA : [],
  getDate : [],
  getDetail : []
}
filter=[]
modifiedData:any;
data:any[]=Array(20)
@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private router : Router,
    private authService : AuthService,
    private dataService : DataService,
    private datepipe : DatePipe,
    private navCtrl : NavController,
    private storage : Storage,
    private platform : Platform) {
      this.platform.ready().then(async ()=>{
       await this.get()
       await this.getUpdateHistory()
      })
     }

  ngOnInit() {
    
  }

  loadData(event){
    setTimeout(() => {

     if(this.data.length >=this.getData.getA.length  ){
      this.getData.getA.length
      event.target.complete();
      this.infiniteScroll.disabled =true;
      return;
     }
  
      const nArr = Array(5);
      this.data.push( ...nArr);
      event.target.complete();
      
    }, 1000);
  }

 async getUpdateHistory(){

    this.authService.GetUpdateHistory(this.dataService.profile.username).subscribe(async res=>{
    
      let result =[res];
      let list = [];
      let i = 0 ;
     result.forEach( element => {
       list.push(element);

        try {
          do {
            let dateString =  element[i].history_date
         
            let newDate = new Date(dateString).toLocaleDateString()
            let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy');
            this.getData.getA[i] = 'A-Number : '+ element[i].a_No
            this.getData.getDate[i] ='Date : '+ latest_date ;
            this.getData.getDetail[i] ='Detail : '+ element[i].detail
            // this.test.list1[i] = element[i].materailid;
            this.filter[i] = {'Date':latest_date,'No':element[i].a_No}
            i++;
            var obj = {Date:latest_date,No:element[i].a_No,Detail:element[i].detail}
            this.arr.push(obj)
       console.log(obj)
            this.arr1 = this.arr
          } while (element[i].materialid != undefined);
         
          // this.updateList = JSON.parse(JSON.stringify(this.test.list1));
          // console.log(this.updateList)
        } catch { }
      })  
      
      if(this.getData.getA.length < this.data.length){
        
        this.data = Array(this.getData.getA.length)
      }  
    })
  }


  test(){
    this.authService.GetUpdateHistory(this.dataService.profile.username).subscribe(async res=>{
          
      let result =[res];
      let list = [];
      let i = 0 ;
     result.forEach( element => {
       list.push(element);

        try {
          do {
            let dateString =  element[i].history_date
         
            let newDate = new Date(dateString).toLocaleDateString()
            let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy');
            var obj = {Date:latest_date,No:element[i].a_No,Detail:element[i].detail}
            this.arr.push(obj)
            this.arr1 = this.arr
            
          } while (element[i].materialid != undefined);
          
        } catch {
        
         }
      })  
    })
  }
arr =[]
arr1=[]
  filterArr(ev:any){
    this.arr =this.arr1
    const val = ev.target.value;
  
    if(val && val.trim() !='')
    {
      this.arr = this.arr1.filter((item)=>{
        console.log(this.arr)
        return (
        item.No.toLowerCase().indexOf(val.toLowerCase())>-1||
        item.Date.toLowerCase().indexOf(val.toLowerCase())>-1||
        item.Detail.toLowerCase().indexOf(val.toLowerCase())>-1
        )
      })
    }
   }

isOpen:string='0'
async showsub(){
  let i = 0
  
  // document.addEventListener('DOMContentLoaded', () => {
    
    let targets = document.getElementById('wrappermenuasset');
 
  if (this.isOpen=='1') { 
 
    this.isOpen = '0';
    anime({
      targets,
      height: 0,
      opacity: [1, 0],
      duration: 400,
      easing: 'easeOutQuad',
      complete() {
        
        (<HTMLInputElement> document.getElementById('wrappermenuasset')).style.visibility = '';
      }
    });
  } else {
   this.isOpen = '1' ;

   
   (<HTMLInputElement> document.getElementById('wrappermenuasset')).style.display = '';
    (<HTMLInputElement> document.getElementById('wrappermenuasset')).style.visibility = 'visible';
    (<HTMLInputElement> document.getElementById('wrappermenuasset')).style.height = '0px';
     
    anime({
      targets,
      height: el => el.scrollHeight,
      opacity: [0, 1],
      duration: 400,
      easing: 'easeOutCubic'
    });
  }
}

   public async get(){

    return [this.dataService.profile.fname = await this.storage.get(`fristname`),
    this.dataService.profile.lname = await this.storage.get(`lastname`),
    this.dataService.profile.username = await this.storage.get(`username`),
    this.dataService.profile.expire = await this.storage.get(`expire`)];
    
  }
}
