import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import {ModalPage} from '../modal/modal.page';
import { PopoverController } from '@ionic/angular';
import { OperationService } from '../operation.service';

@Component({
  selector: 'app-historyupdate',
  templateUrl: './historyupdate.page.html',
  styleUrls: ['./historyupdate.page.scss'],
})
export class HistoryupdatePage implements OnInit {
  public count={
    a:0
 }
 public getData={
   getA : [],
   getDate : [],
   getDetail : []
 }
 arr =[]
arr1=[]
 filter=[]
 modifiedData:any;
 data:any[]=Array(10)
 page:any[]=Array(1)
  constructor(private router : Router,
    private authService : AuthService,
    private dataService : DataService,
    public datepipe:DatePipe,
    private storage:Storage,
    private platform: Platform,
    private operation : OperationService,
    private popoverController : PopoverController
    ) { 
      this.platform.ready().then(async ()=>{
        await this.get()
        await this.getUpdateHistory()
       })
    }

  ngOnInit() {


  }
  async  presentPopover(event) {
    const popoverElement =await this.popoverController.create( {
      component: ModalPage,
      componentProps:{},
      event: event,
      translucent:true
    });
   
    this.dataService.currentPopover = popoverElement
    return await popoverElement.present();
  }
  clickAsset(){
    this.router.navigate(['assetlist']);
  }
  clickHome(){
    this.router.navigate(['home'])
  }
countpage=''
  async getUpdateHistory(){

    this.authService.GetUpdateHistory(this.dataService.profile.username).subscribe( res=>{
      this.countpage = res.length
      let result =[res];
      let list = [];
      let i = 0 ;
     result.forEach( async element => {
       list.push(element);

        try {
          do {
            let dateString =  element[i].history_date
         
            let newDate = new Date(dateString).toLocaleDateString()
            let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy');
            this.getData.getA[i] = element[i].a_No
            this.getData.getDate[i] =latest_date ;
            this.getData.getDetail[i] =element[i].detail
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
      // this.data=Array()
      if(Number(this.countpage)/10 > 1){
        (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
      this.page = Array(Math.ceil(Number(this.countpage)/10))
      }else{
        (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='none';
        this.page = Array(1)
      }
       
      if(this.arr.length < this.data.length){
        
        this.data = Array(this.arr.length)
      }  
    })
  }

  // filterArr(ev:any){
  //   this.arr =this.arr1
  //   const val = ev.target.value;
  
  //   if(val && val.trim() !='')
  //   {
  //     this.arr = this.arr1.filter((item)=>{
  //       console.log(this.arr)
  //       return (
  //       item.No.toLowerCase().indexOf(val.toLowerCase())>-1||
  //       item.Date.toLowerCase().indexOf(val.toLowerCase())>-1||
  //       item.Detail.toLowerCase().indexOf(val.toLowerCase())>-1
  //       )
  //     })
  //   }
  //  }

  public async get(){

    return [this.dataService.profile.fname = await this.storage.get(`fristname`),
    this.dataService.profile.lname = await this.storage.get(`lastname`),
    this.dataService.profile.username = await this.storage.get(`username`),
    this.dataService.profile.expire = await this.storage.get(`expire`)];
    
  }

}
