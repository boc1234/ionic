import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
import { Screenshot } from '@ionic-native/screenshot/ngx';
import {DatePipe} from '@angular/common';
import { Platform } from '@ionic/angular';
import { AuthService } from './auth.service'
import { DataService } from './data.service'
@Injectable({
  providedIn: 'root'
})
export class NewOperationService {

  constructor(private router : Router,
    private storage : Storage,
    private screenshot : Screenshot,
    public dataService:DataService,
    private authService:AuthService,
    public datepipe:DatePipe,
    private platform: Platform,) { }

    validateInput(){
      // let A_Name = this.postData.A_Name.trim();
       let A_No = this.dataService.postData.A_No.trim();
       //let IT_No = this.postData.IT_No.trim();
      
    
       return (  this.dataService.postData.A_No  && A_No.length > 0 )
     }

    getMaterial(){
      if(this.validateInput()){

      this.authService.GetMaterial(this.dataService.postData.A_No).subscribe(res=>{
        if(res.a_No == this.dataService.postData.A_No ){
          this.dataService.data.A_No = res.a_No
          this.dataService.data.ITNo = res.iT_No
           this.dataService.data.serial_number = res.serial_number
            this.dataService.data.Description = res.description
          this.dataService.data.Manufacturer = res.manufacturer
        }else{
          alert("ไม่พบ A-Number")
        }
        this.dataService.postData.A_No = ''
      })
    }
    this.getHistory()
  }


  getHistory(){
    if(this.validateInput()){
      this.authService.GetHistory(this.dataService.postData.A_No).subscribe(res=>{
        let result =[res];
    let list = [];
    let i = 0 ;
    result.forEach(element => {
    list.push(element);
    console.log(element[0].history_date)
    
      try{
      do{
         let dateString =  element[i].history_date
     
         let newDate = new Date(dateString).toLocaleDateString()
         let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy');
        let id = element[i].id
        console.log(newDate)
        this.dataService.postDataHistory.eleHistoryID[i] =  "Date:" + latest_date  +  " Status:"+ element[i].statusid  
           
        this.dataService.getDataHistory.getDate[i] =  "Date : " + latest_date 
        this.dataService.getDataHistory.getStatus[i] = "Status : "+ element[i].statusid
       i++

      }while(element[i].statusid  != undefined)
  
    }catch{}
      })

    })

    
  }
}


 getAssetNumber(){
    this.dataService.data.A_No = ''
    this.dataService.data.ITNo = ''
    this.dataService.data.serial_number = ''
    this.dataService.data.Description = ''
    this.dataService.data.Manufacturer = ''
    this.dataService.data.category = ''
    this.dataService.data.location = ''
  if(this.validateInput()){
  var a = this.dataService.postData.A_No
  var check = a.slice(0,2).toLocaleUpperCase()

  if(check == "A-"){
    var newa = a.slice(2)
    this.dataService.postData.A_No = newa
  }

   this.authService.GetAssetNumber(this.dataService.postData.A_No).subscribe(res=>{
    
   if(res != ''){
     alert(res)
    this.dataService.data.A_No = res[0].iT_ASSET_NUMBER
    this.dataService.data.ITNo = res[0].iT_TAG_NUMBER
     this.dataService.data.serial_number = res[0].iT_SERIAL_NUMBER
      this.dataService.data.Description = res[0].iT_DESCRIPTION
    this.dataService.data.Manufacturer = res[0].iT_MANUFACTURE_NAME
    this.dataService.data.category = res[0].iT_ASSET_CATEGORY_TYPE
    this.dataService.data.location = res[0].iT_LOCATION
    this.dataService.checkdata = true
   }else{
     alert(0)
     alert(res)
   }
   
  })
  
}
// this.GetRepairITAssets()
this.dataService.postData.A_No = ''
}


// GetRepairITAssets(){
//   this.authService.GetRepairITAssets(this.dataService.postData.A_No).subscribe(res=>{
//     let dateString =  res[0].createDate
     
//     let newDate = new Date(dateString).toLocaleDateString()
//     let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy');
//     this.dataService.dataHistoryRepair.date = latest_date
//   })
//   this.dataService.postData.A_No = ''
// }
GetCountAsset(){
  this.authService.GetCountAsset().subscribe(res =>{
    this.dataService.countasset = res
  })
  this.dataService.countasset = '1201'

}
}
