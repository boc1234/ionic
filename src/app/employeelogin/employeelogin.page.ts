import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service'
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-employeelogin',
  templateUrl: './employeelogin.page.html',
  styleUrls: ['./employeelogin.page.scss'],
})
export class EmployeeloginPage implements OnInit {
public postData={
  employeeno :'',
  img : false
}
public storageData={
  username:'',
  password:''

}
  constructor(private authService : AuthService,
    private router : Router,
    private dataService : DataService,
    private storage : Storage,
    private platform : Platform) { }

  ngOnInit() {

    // this.storageAction()
// window.location.reload()
  }
  validateInput(){
    let empno = this.dataService.employeeno.trim();
   
    
    return (this.dataService.employeeno  && empno.length > 0 )
  }

  getEmployee(){
   
    if(this.validateInput()){
     this.postData.employeeno = this.dataService.employeeno 
    this.authService.GetEmployee(this.postData).subscribe(res =>{
      if(res != null){
      this.dataService.emp.LoginName = res.LoginName
 
      this.router.navigate(['login'])
      }
    },(err) =>{
      
      alert(err.message)
    })
  }else{
    
    alert('Sorry, your input data is incorrect or incomplete.')
  }
  }
  public async get(){

    return [this.storageData.username = await this.storage.get(`username`),this.storageData.password = await this.storage.get(`password`)];
    
  }
  // async storageAction(){
  //   await this.get()
  //     if(this.storageData.username != null){
        
  //       if(this.platform.is('desktop')){
  //         this.router.navigate(['home'])
  //       }else{
  //       this.router.navigate(['mobilehome']);
  //       }
  //     }
  //   }
  getUpdateHistory(){
    this.authService.GetUpdateHistory(this.postData).subscribe(res=>{
      console.log(res)
    })
  }





// dataNewStatus : any
//    updateStatus(){
//     this.authService.GetMaterialDateStatus().subscribe(async res =>{
//       console.log(res)
//       let result =[res]

//       let list = [];
//       let j = 0 ;
//      await res.forEach(element => {
//       list.push(element);
//       do{
//       this.dataNewStatus = "x="+"{ID:"+res[j].id+"}"

//         this.authService.UpdateStatus(this.dataNewStatus).subscribe(res=>{
//                 if(res.bool_Result == true){
//                   alert('สำเร็จ')
//                 }else{
//                   alert('2')
//                 }
//         })

//       j++
//     }while(res[j].id != undefined)
      

//     })
//     // let c = "x="+"{A_No:'A-117314',Location:'qqwww'}"
      
     
      
    
//     // // this.authService.GetJobSite('').subscribe(res=>{
//     // //   console.log(res)
//     // // })
//     // this.authService.UpdateMaterialLocation(c).subscribe(async res => {
//     //   console.log(res);
//     // })
//   }) 
//   }
}
