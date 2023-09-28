import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
import { DataService } from '../data.service';
import {Plugins} from '@capacitor/core';
import { Platform } from '@ionic/angular';
const {Keyboard} = Plugins;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public postData = {
    appno : 'W-0035',
    login : '',
    password : ''
    
  }
  public postDataStorage ={
    username :'',
    password :''
  }
  constructor(public dataService:DataService,
    private router:Router ,
     private authService:AuthService,
     private toastService: ToastService,
     private storage: Storage,
     private platform:Platform) { }

  ngOnInit() {
    Keyboard.removeAllListeners();
    this.storageAction()
  }
  validateInput(){
    let username = this.postData.login.trim();
    let password = this.postData.password.trim();
    
    return (this.postData.login && this.postData.password && username.length > 0 && password.length > 0)
  }
  
  back(){
    this.router.navigate(['employeelogin'])
  }
  loginAction(){
    
    if(this.validateInput()){
      // this.authService.login(this.postData).subscribe((res:any)=>{
      if(this.dataService.emp.LoginName == this.postData.login){
   this.authService.Login(this.postData).subscribe((res)=>{
        
          this.dataService.profile.fname = res.FirstNameEng
          this.dataService.profile.lname = res.LastNameEng
          // this.dataService.profile.image = res.ImageBase64
          this.dataService.profile.department = res.DepartmentEng

          this.dataService.profile.empno = res.EmpNo
        
          let datenow = new Date()
          let datenow_sec = datenow.getTime()/1000;
          let expire = Math.floor(datenow_sec+(3600*100));
          let locationexpire = Math.floor(datenow_sec+(3600*168));
          // let day = datenow.getDate()+1
          this.dataService.profile.expire = expire
         
          
          
          this.set()
          
          if(this.platform.is('desktop')){
            this.router.navigate(['home'])
          }else{
          this.router.navigate(['mobilehome']);
          }
          this.toastService.presentToast("success")
          this.postData.password = ''
       
   },(err)=>{

     alert(' Sorry, your input data is incorrect or incomplete')
   })
  
      //   if(res.username ==this.postData.username && res.password == this.postData.password){
       
                // console.log(res.username)
                // console.log(res.password)


          
         
           


    //     }
    //     else{
    //       this.toastService.presentToast("incorrect username and password")
    
          
    //     }

    //   },
    //   (error:any)=>{
    //     alert("network connecting error")
      
    // });
   }else{
     alert(' Sorry, your input data is incorrect or incomplete.')
   }
    }else{
      alert("Please give some information");
      
    }
    
  }
 async storageAction(){
  await this.get()
    if(this.postDataStorage.username != null){
      
      if(this.platform.is('desktop')){
        this.router.navigate(['home'])
      }else{
      this.router.navigate(['mobilehome']);
      }
    }
  }
  public async set(){
   
    this.dataService.dataLogin.username = this.postData.login
    //  this.router.navigate(['mobilehome'])
  //  let i=0 
  //      return await this.storage.set(`${i}`,this.postData.password)
       return await [this.storage.set(`username`,this.postData.login),
       this.storage.set(`expire`,this.dataService.profile.expire),
       this.storage.set(`fristname`,this.dataService.profile.fname),
       this.storage.set(`lastname`,this.dataService.profile.lname),
       this.storage.set(`image`,this.dataService.profile.image),
       this.storage.set(`empno`,this.dataService.profile.empno),
       this.storage.set(`department`,this.dataService.profile.department),
       ];
     
    
    
  }
  
  public async get(){

    return [this.postDataStorage.username = await this.storage.get(`username`)];
    
  }
  public async remove(settingName){
    return await this.storage.remove(`setting:${ settingName }`);
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

enterInput(){
    

    Keyboard.hide();

}

 

}
