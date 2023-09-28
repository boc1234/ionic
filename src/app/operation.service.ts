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
export class OperationService {
  data:any[]=Array(20)
  constructor(private router : Router,
    private storage : Storage,
    private screenshot : Screenshot,
    public dataService:DataService,
    private authService:AuthService,
    public datepipe:DatePipe,
    private platform: Platform,) { }

//-------------------------------------------------------
    doRefresh(event) {
      console.log('Begin async operation');
      window.location.reload();
   
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
//-------------------------------------------------------
  alertSuccess(){
    Swal.fire(
      'Success!',
      '',
      'success'
    )
  }
  alertTime(){
    Swal.fire({
      
      icon: 'success',
      title: 'Deleted!',
      showConfirmButton: false,
      timer: 1200
    })
  }
//-------------------------------------------------------
changePageSearch(){
    this.router.navigate(['searchasset']);
  }
changePageAsset(){
  this.router.navigate(['assetgeneral']);
  
}
changePageHome(){
  this.router.navigate(['mobilehome']);
}
changePageAccount(){
  this.router.navigate(['account']);
}
changePageEdit(){
  this.router.navigate(['menuedit']);
}
//-------------------------------------------------------
takeScreenshot(){
  let datetime = new Date(Date.now())
  let latest_date =this.datepipe.transform(datetime, 'dd-MM-yyyy hh:mm:ss');
  let p_name = "screenshot"+latest_date+".jpg"
  this.screenshot.save('jpg', 80, p_name)
      .then(res => {
        alert('save')
      })
      .catch(() => alert("screenshot error"))
}
//-------------------------------------------------------
validateInput(){
  // let A_Name = this.postData.A_Name.trim();
   let A_No = this.dataService.postData.A_No.trim();
   //let IT_No = this.postData.IT_No.trim();
  

   return (  this.dataService.postData.A_No  && A_No.length > 0 )
 }


selectAction(){
  this.allHistory()
  if(this.validateInput()){
   
    this.dataService.data.A_No = '';
    
    this.dataService.data.ITNo = '';
    this.dataService.data.emp_ID = '';
    this.dataService.data.Empname = '';
    this.dataService.data.Department = '';
    this.dataService.data.Locationname = '';
    this.dataService.data.locationID='';
    this.dataService.data.EmpID = '' ;
    this.dataService.data.status = '';
    this.dataService.data.getStatus = '';
    this.dataService.data.room ='';

    this.dataService.data.EmpID = '';
  this.dataService.data.Empname = '';
  this.dataService.data.Department = '';
    this.authService.Select(this.dataService.postData).subscribe((res:any)=>{

      // try{ 
      this.dataService.data.A_No = res.A_No
     if(res.A_No == this.dataService.postData.A_No ){
        
        this.dataService.data.A_No = res.A_No
        this.dataService.data.Aname = res.A_Name
        this.dataService.data.ITNo = res.IT_No
        if((res.employees == null || res.employees == '') && (res.location == null || res.location == '')){
          this.dataService.data.EmpID = 'ไม่พบ'
          this.dataService.data.emp_ID = 'ไม่พบ'
          this.dataService.data.Empname= 'ไม่พบ'
          this.dataService.data.Department= 'ไม่พบ'
          this.dataService.data.room= 'ไม่พบ'
          this.dataService.data.status = 'ไม่พบ'
          this.dataService.data.getStatus = res.status.type
          //this.dataService.data.EmpID = res.employees.id
        }else if(res.employees == null || res.employees == ''){
          this.dataService.data.EmpID = 'ไม่พบ'
          this.dataService.data.emp_ID = 'ไม่พบ'
          this.dataService.data.Empname= 'ไม่พบ'
          this.dataService.data.Department= 'ไม่พบ'
          this.dataService.data.room= res.locationname
          this.dataService.data.getStatus = res.status.type
        }else if(res.location == null || res.location == ''){
          this.dataService.data.EmpID = res.employees.emp_ID
          this.dataService.data.emp_ID = res.employees.id
          this.dataService.data.Empname= res.employees.emp_Name
          this.dataService.data.Department= res.employees.emp_Department
          this.dataService.data.room= 'ไม่พบ'
          this.dataService.data.getStatus = res.status.type
        }
        else{
        this.dataService.data.category = res.category.category_name
        this.dataService.data.Description = res.description
        this.dataService.data.serial_number = res.serial_number
        this.dataService.data.emp_ID = res.employees.emp_ID
        this.dataService.data.EmpID = res.employees.id
        this.dataService.data.Empname = res.employees.emp_Name
        this.dataService.data.Department = res.employees.emp_Department
        this.dataService.data.room = res.locationname
        this.dataService.data.locationID = res.location.location_ID
        // this.dataService.data.status = res.status.id
        this.dataService.data.getStatus = res.status.type
        }
        this.dataService.data.edit = '1';
        this.dataService.postData.A_No = '';
        //this.dataService.data.getLocation = this.postData.getL+'  '+ this.postData.getF
        //this.dataService.data.getLocation[0] = this.getData.getL
       // this.dataService.data.getLocation[1] = this.getData.getF
       
        
        // this.presentAlertPrompt()
      }else{
        alert('ไม่พบ A-Number')
      }
      if(res.A_No == null ){
       
      this.dataService.data.A_No = '';
        this.dataService.postData.A_No='';
        this.dataService.data.ITNo = '';
        this.dataService.data.emp_ID = '';
        this.dataService.data.Empname = '';
        this.dataService.data.Department = '';
        this.dataService.data.Locationname = '';
        this.dataService.data.locationID='';
        this.dataService.data.EmpID = '' ;
        this.dataService.data.status = '';
        this.dataService.data.getStatus = '';
        this.dataService.data.room ='';
        
      }
      if(res.status.id == '1'){
        this.dataService.data.status = 'ปกติ'
      }
      if(res.status.id == '2'){
        this.dataService.data.status = 'เสีย'
      }
      if(res.status.id == '3'){
        this.dataService.data.status = 'ส่งซ่อม'
      }
      if(this.dataService.postData.getStatus != ''){
        this.dataService.data.status = this.dataService.postData.getStatus
      }
      if(this.dataService.postData.getF != ''){
        
      }

    })      
  }

}


//-----------------------------------------------------

searchAll(){
  this.dataService.data.search_all = this.dataService.postData.A_No
   this.dataService.data.A = []
   this.dataService.data.An = []
   this.dataService.data.IT = [] 
   this.dataService.data.ID = ''
   this.dataService.data.Dep = ''
   this.dataService.data.Name = ''
   this.dataService.data.searchID = []
   this.dataService.data.A_No=''
   this.dataService.data.ITNo=''
   this.dataService.data.emp_ID=''
   this.dataService.data.Department=''
   this.dataService.data.Empname=''
   this.dataService.data.room=''
   this.authService.searchAll(this.dataService.postDataSearch).subscribe((res:any)=>{
     if(res == ''){
       this.dataService.data.searchID[0] = "ไม่พบข้อมูล";
       this.dataService.postData.search_a[0]  ='';
       
     }else{
     let result =[res]
     let list2 = [];
     let j = 0 ;
 // console.log(res[0].employees.emp_ID)
     //alert(res)
     result.forEach(element => {
     list2.push(element);
     try{
       do{
         this.dataService.data.A[j] = element[j].A_No
         this.dataService.data.An[j] = element[j].A_Name
         this.dataService.data.IT[j] = element[j].IT_No
         this.dataService.data.ID = element[j].employees.emp_ID
         this.dataService.data.Dep = element[j].employees.emp_Department
         this.dataService.data.Name =  element[j].employees.emp_Name
         this.dataService.postData.search_a[j] = element[j].A_No
         this.dataService.data.search[j] = element[j].A_No
      
         
         this.dataService.data.searchID[j] = "A-Number: " + element[j].A_No + "  Brand: " + element[j].A_Name + "  IT-Number: " +element[j].IT_No
        j++
         
      
       
       }while(element[j].employees.emp_ID != undefined)
       
     }catch{ 
     }
     })
   }
   
   if(this.dataService.data.searchID.length < this.data.length){
     this.data = Array(this.dataService.data.searchID.length)
   }
  },(err)=>
   alert('ไม่สามารถค้นหาได้')
  )

}


allHistory(){
  this.dataService.postData.getH = ''
  if(this.dataService.postData.A_No != ''){
  this.authService.getHistory(this.dataService.postData).subscribe((res:any)=>{
 
    let result =[res];
    let list = [];
    let i = 0 ;
    result.forEach(element => {
    list.push(element);
    
    
      try{
      do{
         let dateString =  element[i].history_date
         console.log(dateString)
         let newDate = new Date(dateString).toLocaleDateString()
         let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy');
        let id = element[i].id
        console.log(newDate)
      
        this.dataService.postDataHistory.eleHistoryID[i] =  "Date:" + latest_date  + "  A-No:"  + element[i].material.A_No + "  EmpID:" + element[i].employeesid + " Location:" + element[i].locationid+" Status:"+ element[i].statusid  

       i++
       
      }while(element[i].material.A_No  != undefined)
  
    }catch{}
    })    
  })
}
}


 
}
