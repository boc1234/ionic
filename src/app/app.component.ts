import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage'
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NewOperationService } from './new-operation.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public postDataStorage ={
    username :'',
    expire : null
  }
 
  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    private storage:Storage,
    private authService: AuthService,
    private dataService : DataService,
    private newOperationService : NewOperationService
  ) {
    // this.iab.create('https://sthq67.stecon.co.th/SingleSignOn/Access/Login?cb=http://192.168.20.128:8100/home&ac=W-0035&md=CL/', '_self');
    this.initializeApp();
  }

async initializeApp() {
    this.newOperationService.GetCountAsset()
//  await this.get()

    this.platform.ready().then(async() => {
     
      
      if(this.platform.is('desktop')){
        if(this.dataService.us == ''){
              // var browser=this.iab.create('https://sthq67.stecon.co.th/SingleSignOn/Access/Login?cb=http://192.168.20.118:8100/home&ac=W-0035&md=CL/', '_self');
            }
        // if(this.postDataStorage.username !=null){
   
        this.router.navigate(['home'])
         
          
        // }else{
        //   this.router.navigateByUrl('employeelogin')
        // }
      }else{
      

        // if(this.dataService.us == ''){
        //    alert(2)
        //   var browser=this.iab.create('https://sthq67.stecon.co.th/SingleSignOn/Access/Login?cb=http://192.168.20.119:8101/home&ac=W-0035&md=CL/', '_self');
          
        // }
     
        // if(this.postDataStorage.username != null){
  
        //  await this.router.navigate(['mobilehome']);
       
          
      //   }else{
       await  this.router.navigateByUrl('mobilehome')
      //   }
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    await this.searchParam()
  }
  public async searchParam(){
    const us= window.location.search;
    const urlParams = new URLSearchParams(us);
    const q = urlParams.get('ec')
    let arr=[]
    arr = q.split('|')
    
    let empNo =atob(arr[0])
    this.dataService.us = empNo
    // console.log(this.dataService.us)
  }
  public async get(){

    return [this.postDataStorage.username = await this.storage.get(`username`)];
    
  }
  dataNewStatus : any
   updateStatus(){
    this.authService.GetMaterialDateStatus().subscribe(async res =>{
      let result =[res]

      let list = [];
      let j = 0 ;
     await res.forEach(element => {
      list.push(element);
      do{
      this.dataNewStatus = "x="+"{ID:"+res[j].id+"}"

        this.authService.UpdateStatus(this.dataNewStatus).subscribe(res=>{
                if(res.bool_Result == true){
                 
                }else{
                 
                }
        })

      j++
    }while(res[j].id != undefined)
      

    })
    })
  }



}
