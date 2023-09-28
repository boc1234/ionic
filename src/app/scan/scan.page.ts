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

const { Network } = Plugins;
@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  public postDataScan = {
 
    A_No : '',
    locationid:'',
    getL:'',
    getF:'',
    getStatus:''
    
  }
  
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;
  
  constructor(
    public navCtrl: NavController,
    private router:Router , 
    private authService:AuthService,
    private modalController:ModalController,
    public alertController:AlertController,
    public dataService:DataService,
    private platform: Platform) { }

  async ngOnInit() {
    document.getElementById("btnStatus").click(),5000;
    document.getElementById("btn").click(),5000;
      setInterval(function() {
        let element:HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
    
      element.click(),5000;
     
        }, 3000); 

        this.networkListener = Network.addListener('networkStatusChange', (status) => {
          console.log("Network status changed", status);
          this.networkStatus = status;
        });
      
        this.networkStatus = await Network.getStatus();
  }
  ngOnDestroy() {
    this.networkListener.remove();
  }
  doRefresh(event) {
    console.log('Begin async operation');
    window.location.reload();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  onNoClick(){
    let isOpen = false;

  
      let targets = document.getElementById('wrapper2');
      anime({
        targets,
        height: 0,
        opacity: [1, 0],
        duration: 400,
        easing: 'easeOutQuad',
        complete() {
          isOpen = false;
          (<HTMLInputElement> document.getElementById('wrapper2')).style.display = 'none';
        }
      });
}
  validateInput(){
    // let A_Name = this.postData.A_Name.trim();
     let A_No = this.postDataScan.A_No.trim();
     //let IT_No = this.postData.IT_No.trim();
    
 
     return (  this.postDataScan.A_No  && A_No.length > 0 )
   }
 
  selectAction(){
  
    if(this.validateInput()){
      this.dataService.dataScan.A_No = '';
      
      this.dataService.dataScan.ITNo = '';
      this.dataService.dataScan.emp_ID = '';
      this.dataService.dataScan.Empname = '';
      this.dataService.dataScan.Department = '';
      this.dataService.dataScan.Locationname = '';
      this.dataService.dataScan.locationID='';
      this.dataService.dataScan.EmpID = '' ;
      this.dataService.dataScan.status = '';
      this.dataService.dataScan.getStatus = '';
      this.dataService.dataScan.room ='';

      if(this.platform.is('desktop')){
      (<HTMLInputElement> document.getElementById('card_scan')).style.width ="100%";
      (<HTMLInputElement> document.getElementById('card_scan')).style.left ="";
    
      let isOpen = false;
      // document.addEventListener('DOMContentLoaded', () => {
        
        let targets = document.getElementById('wrapper2');
        let wrapperStyle =(<HTMLInputElement> document.getElementById('wrapper2')).style;
        
        
          
          if (isOpen) {
            anime({
              targets,
              height: 0,
              opacity: [1, 0],
              duration: 400,
              easing: 'easeOutQuad',
              complete() {
                isOpen = false;
                (<HTMLInputElement> document.getElementById('wrapper2')).style.display = '';
              }
            });
          } else {
            isOpen = true;
            (<HTMLInputElement> document.getElementById('wrapper2')).style.display = 'block';
            (<HTMLInputElement> document.getElementById('wrapper2')).style.height = '0px';
            anime({
              targets,
              height: el => el.scrollHeight,
              opacity: [0, 1],
              duration: 400,
              easing: 'easeOutCubic'
            });
          }
        }else{
          this.router.navigate(['editscan']);
          
        }


      this.dataService.dataScan.EmpID = '';
    this.dataService.dataScan.Empname = '';
    this.dataService.dataScan.Department = '';
      this.authService.Select(this.postDataScan).subscribe((res:any)=>{
        console.log(res.employees)
        // try{ 
        this.dataService.dataScan.A_No = res.A_No
       if(res.A_No == this.postDataScan.A_No ){
          
          this.dataService.dataScan.A_No = res.A_No
          this.dataService.dataScan.Aname = res.A_Name
          this.dataService.dataScan.ITNo = res.IT_No
          if((res.employees == null || res.employees == '') && (res.location == null || res.location == '')){
            this.dataService.dataScan.EmpID = 'ไม่พบ'
            this.dataService.dataScan.emp_ID = 'ไม่พบ'
            this.dataService.dataScan.Empname= 'ไม่พบ'
            this.dataService.dataScan.Department= 'ไม่พบ'
            this.dataService.dataScan.room= 'ไม่พบ'
            this.dataService.dataScan.status = 'ไม่พบ'
            this.dataService.dataScan.getStatus = res.status.type
            //this.dataService.data.EmpID = res.employees.id
          }else if(res.employees == null || res.employees == ''){
            this.dataService.dataScan.EmpID = 'ไม่พบ'
            this.dataService.dataScan.emp_ID = 'ไม่พบ'
            this.dataService.dataScan.Empname= 'ไม่พบ'
            this.dataService.dataScan.Department= 'ไม่พบ'
            this.dataService.dataScan.room= res.locationname
            this.dataService.dataScan.getStatus = res.status.type
          }else if(res.location == null || res.location == ''){
            this.dataService.dataScan.EmpID = res.employees.emp_ID
            this.dataService.dataScan.emp_ID = res.employees.id
            this.dataService.dataScan.Empname= res.employees.emp_Name
            this.dataService.dataScan.Department= res.employees.emp_Department
            this.dataService.dataScan.room= 'ไม่พบ'
            this.dataService.dataScan.getStatus = res.status.type
          }
          else{
           
           
          this.dataService.dataScan.emp_ID = res.employees.emp_ID
          this.dataService.dataScan.EmpID = res.employees.id
          this.dataService.dataScan.Empname = res.employees.emp_Name
          this.dataService.dataScan.Department = res.employees.emp_Department
          this.dataService.dataScan.room = res.locationname
          this.dataService.dataScan.locationID = res.location.id
          // this.dataService.data.status = res.status.id
          this.dataService.dataScan.getStatus = res.status.type
          }
          this.dataService.dataScan.edit = '1';
          this.postDataScan.A_No = '';
          //this.dataService.data.getLocation = this.postData.getL+'  '+ this.postData.getF
          //this.dataService.data.getLocation[0] = this.getData.getL
         // this.dataService.data.getLocation[1] = this.getData.getF
         
          
          // this.presentAlertPrompt()
        }
        if(res.A_No == null ){
          if(this.platform.is('desktop')){
          let isOpen = false;

  
          let targets = document.getElementById('wrapper2');
          anime({
            targets,
            height: 0,
            opacity: [1, 0],
            duration: 400,
            easing: 'easeOutQuad',
            complete() {
              isOpen = false;
              alert("ไม่พบรหัส A-Number");
              (<HTMLInputElement> document.getElementById('wrapper2')).style.display = '';
            }
          });
          
          
        }else{
           alert("ไม่พบรหัส A-Number");
          this.router.navigate(['scan'])
          
         
          
        }
        this.dataService.dataScan.A_No = '';
          this.postDataScan.A_No='';
          this.dataService.dataScan.ITNo = '';
          this.dataService.dataScan.emp_ID = '';
          this.dataService.dataScan.Empname = '';
          this.dataService.dataScan.Department = '';
          this.dataService.dataScan.Locationname = '';
          this.dataService.dataScan.locationID='';
          this.dataService.dataScan.EmpID = '' ;
          this.dataService.dataScan.status = '';
          this.dataService.dataScan.getStatus = '';
          this.dataService.dataScan.room ='';
          
        }
        if(res.status.id == '1'){
          this.dataService.dataScan.status = 'ปกติ'
        }
        if(res.status.id == '2'){
          this.dataService.dataScan.status = 'เสีย'
        }
        if(res.status.id == '3'){
          this.dataService.dataScan.status = 'ส่งซ่อม'
        }
        if(res.status.id == '4'){
          this.dataService.dataScan.status = 'ตัดจำหน่าย'
        }
        if(res.status.id == '5'){
          this.dataService.dataScan.status = 'โอนเข้าใหม่'
        }
        if(res.status.id == '6'){
          this.dataService.dataScan.status = 'โอนย้าย'
        }
        if(this.postDataScan.getStatus != ''){
          this.dataService.dataScan.status = this.postDataScan.getStatus
        }
        if(this.postDataScan.getF != ''){
          
        }
      //  }
      //  catch{
      //    this.postData.A_No = '';
      //   }
      })      
    }
  }




  refreshPage(){
    window.location.reload();
} 

edit(){
  this.router.navigate(['edit']);
}

selectLocation(){
    
  this.authService.getLocation(this.postDataScan).subscribe((res:any)=>{
    console.log(res)
    let result =[res]
    let list = [];
    let i = 0 ;
    result.forEach(element => {
    list.push(element);
  
      try{
      do{
        this.dataService.dataScan.ele[i] = element[i].location_Name 
       i++
       
      }while(element[i].location_Name  != undefined)
     
    }catch{}
 
    })
  })
  
}
 
selectLocation2(){
  (<HTMLInputElement> document.getElementById("floor")).disabled = false;
  this.dataService.dataScan.ele2 = []
  this.dataService.dataScan.getF=''
  this.authService.getLocation2(this.postDataScan).subscribe((res:any)=>{
    let result =[res]
    let list2 = [];
    let j = 0 ;

    //alert(res)
    result.forEach(element => {
    list2.push(element);
    try{
      do{
        
        this.dataService.dataScan.ele2[j] = element[j].location_Floor
       j++
       
      }while(element[j].location_Floor != undefined)
      
    }catch{ 
    }
   
    })
  })
}

selectRoom(){
    
  this.dataService.dataScan.empID = this.dataService.dataScan.emp_ID

  this.authService.getRoom(this.postDataScan).subscribe((res:any)=>{
    this.dataService.dataScan.room = res.room_Name
    this.dataService.dataScan.newLocation = res.id
    this.dataService.dataScan.locationid =  this.postDataScan.locationid 
    this.dataService.dataScan.getF = this.postDataScan.getF
 
    this.showLocation()
  })
}

showLocation(){
  this.dataService.dataScan.getLocation ='สถานที่: '+ this.postDataScan.getL+' ชั้น: '+ this.postDataScan.getF + ' ห้อง: ' + this.dataService.dataScan.room
  // this.dataService.data.room = this.dataService.data.getLocation
  
}


updateAction(){
  this.authService.UpdateMaterial(this.dataService.dataScan).subscribe((res:any)=>{
    // if(this.postData.getStatus != ''){
      this.authService.UpdateStatus(this.dataService.dataScan).subscribe((res2:any)=>{
      
       
    if((res == true && res2== true)||(res == true) ){
  alert("เพิ่มข้อมูลสำเร็จ")
  this.dataService.dataScan.EmpID = ''
  this.dataService.dataScan.ITNo = ''
  this.dataService.dataScan.emp_ID= ''
  this.dataService.dataScan.Department = ''
  this.dataService.dataScan.Empname= ''
  this.dataService.dataScan.A_No = ''
  this.dataService.dataScan.room = ''
  this.dataService.dataScan.status = ''
    }else if((res2 == true && res== true)||(res2 == true)){
      this.authService.addHistory(this.dataService.dataScan).subscribe((res:any)=>{
        if(res == true){
          alert('เพิ่มข้อมูลสำเร็จ')
        }
      })
    }
  })
  // }
  })
  this.updateStatus()
}
selectStatus(){
  this.dataService.dataScan.empID = this.dataService.dataScan.emp_ID
  
  this.authService.getStatus(this.postDataScan).subscribe((res:any)=>{
    console.log(res)
    let result =[res]
    let list = [];
    let i = 0 ;
    result.forEach(element => {
    list.push(element);
  
      try{
      do{
        this.dataService.dataScan.eleStatus[i] = element[i].type
       i++
       
      }while(element[i].type  != undefined)
     
    }catch{}
 
    })
  })
  
}
chooseStatus(){
  this.dataService.dataScan.status = this.postDataScan.getStatus;
  if(this.dataService.dataScan.status == 'ส่งซ่อม'){
  (<HTMLInputElement> document.getElementById("fix-report-label")).style.display ='block' ;
  (<HTMLInputElement> document.getElementById("fix-report")).style.display ='block' ;
  }
  else{
  (<HTMLInputElement> document.getElementById("fix-report-label")).style.display ='none' ;
  (<HTMLInputElement> document.getElementById("fix-report")).style.display ='none' ;
  }
}
updateStatus(){
  
  console.log(this.dataService.dataScan.A_No)

}



}
