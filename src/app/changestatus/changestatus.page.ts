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
  selector: 'app-changestatus',
  templateUrl: './changestatus.page.html',
  styleUrls: ['./changestatus.page.scss'],
})
export class ChangestatusPage implements OnInit {
  public postDataChangeStatus = {
 
    A_No : '',
    locationid:'',
    getL:'',
    getF:'',
    getStatus:''
    
  }
  
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;
  constructor(public navCtrl: NavController,
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
     let A_No = this.postDataChangeStatus.A_No.trim();
     //let IT_No = this.postData.IT_No.trim();
    
 
     return (  this.postDataChangeStatus.A_No  && A_No.length > 0 )
   }
 
  selectAction(){
  
    if(this.validateInput()){
      this.dataService.dataChangeStatus.A_No = '';
      
      this.dataService.dataChangeStatus.ITNo = '';
      this.dataService.dataChangeStatus.emp_ID = '';
      this.dataService.dataChangeStatus.Empname = '';
      this.dataService.dataChangeStatus.Department = '';
      this.dataService.dataChangeStatus.Locationname = '';
      this.dataService.dataChangeStatus.locationID='';
      this.dataService.dataChangeStatus.EmpID = '' ;
      this.dataService.dataChangeStatus.status = '';
      this.dataService.dataChangeStatus.getStatus = '';
      this.dataService.dataChangeStatus.room ='';

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


      this.dataService.dataChangeStatus.EmpID = '';
    this.dataService.dataChangeStatus.Empname = '';
    this.dataService.dataChangeStatus.Department = '';
      this.authService.Select(this.postDataChangeStatus).subscribe((res:any)=>{
        console.log(res.employees)
        // try{ 
        this.dataService.dataChangeStatus.A_No = res.A_No
       if(res.A_No == this.postDataChangeStatus.A_No ){
          
          this.dataService.dataChangeStatus.A_No = res.A_No
          this.dataService.dataChangeStatus.Aname = res.A_Name
          this.dataService.dataChangeStatus.ITNo = res.IT_No
          if((res.employees == null || res.employees == '') && (res.location == null || res.location == '')){
            this.dataService.dataChangeStatus.EmpID = 'ไม่พบ'
            this.dataService.dataChangeStatus.emp_ID = 'ไม่พบ'
            this.dataService.dataChangeStatus.Empname= 'ไม่พบ'
            this.dataService.dataChangeStatus.Department= 'ไม่พบ'
            this.dataService.dataChangeStatus.room= 'ไม่พบ'
            this.dataService.dataChangeStatus.status = 'ไม่พบ'
            this.dataService.dataChangeStatus.getStatus = res.status.type
            //this.dataService.data.EmpID = res.employees.id
          }else if(res.employees == null || res.employees == ''){
            this.dataService.dataChangeStatus.EmpID = 'ไม่พบ'
            this.dataService.dataChangeStatus.emp_ID = 'ไม่พบ'
            this.dataService.dataChangeStatus.Empname= 'ไม่พบ'
            this.dataService.dataChangeStatus.Department= 'ไม่พบ'
            this.dataService.dataChangeStatus.room= res.locationname
            this.dataService.dataChangeStatus.getStatus = res.status.type
          }else if(res.location == null || res.location == ''){
            this.dataService.dataChangeStatus.EmpID = res.employees.emp_ID
            this.dataService.dataChangeStatus.emp_ID = res.employees.id
            this.dataService.dataChangeStatus.Empname= res.employees.emp_Name
            this.dataService.dataChangeStatus.Department= res.employees.emp_Department
            this.dataService.dataChangeStatus.room= 'ไม่พบ'
            this.dataService.dataChangeStatus.getStatus = res.status.type
          }
          else{
           
           
          this.dataService.dataChangeStatus.emp_ID = res.employees.emp_ID
          this.dataService.dataChangeStatus.EmpID = res.employees.id
          this.dataService.dataChangeStatus.Empname = res.employees.emp_Name
          this.dataService.dataChangeStatus.Department = res.employees.emp_Department
          this.dataService.dataChangeStatus.room = res.locationname
          this.dataService.dataChangeStatus.locationID = res.location.id
          this.dataService.dataChangeStatus.getStatus = res.status.type
          }
          this.dataService.dataChangeStatus.edit = '1';
          this.postDataChangeStatus.A_No = '';
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
        this.dataService.dataChangeStatus.A_No = '';
          this.postDataChangeStatus.A_No='';
          this.dataService.dataChangeStatus.ITNo = '';
          this.dataService.dataChangeStatus.emp_ID = '';
          this.dataService.dataChangeStatus.Empname = '';
          this.dataService.dataChangeStatus.Department = '';
          this.dataService.dataChangeStatus.Locationname = '';
          this.dataService.dataChangeStatus.locationID='';
          this.dataService.dataChangeStatus.EmpID = '' ;
          this.dataService.dataChangeStatus.status = '';
          this.dataService.dataChangeStatus.getStatus = '';
          this.dataService.dataChangeStatus.room ='';
          
        }
        if(res.status.id == '1'){
          this.dataService.dataChangeStatus.status = 'ปกติ'
        }
        if(res.status.id == '2'){
          this.dataService.dataChangeStatus.status = 'เสีย'
        }
        if(res.status.id == '3'){
          this.dataService.dataChangeStatus.status = 'ส่งซ่อม'
        }
        if(res.status.id == '4'){
          this.dataService.dataChangeStatus.status = 'ตัดจำหน่าย'
        }
        if(res.status.id == '5'){
          this.dataService.dataChangeStatus.status = 'โอนเข้าใหม่'
        }
        if(res.status.id == '6'){
          this.dataService.dataChangeStatus.status = 'โอนย้าย'
        }
        if(this.postDataChangeStatus.getStatus != ''){
          this.dataService.dataChangeStatus.status = this.postDataChangeStatus.getStatus
        }
        if(this.postDataChangeStatus.getF != ''){
          
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
    
  this.authService.getLocation(this.postDataChangeStatus).subscribe((res:any)=>{
    console.log(res)
    let result =[res]
    let list = [];
    let i = 0 ;
    result.forEach(element => {
    list.push(element);
  
      try{
      do{
        this.dataService.dataChangeStatus.ele[i] = element[i].location_Name 
       i++
       
      }while(element[i].location_Name  != undefined)
     
    }catch{}
 
    })
  })
  
}
 
selectLocation2(){
  (<HTMLInputElement> document.getElementById("floor")).disabled = false;
  this.dataService.dataChangeStatus.ele2 = []
  this.dataService.dataChangeStatus.getF=''
  this.authService.getLocation2(this.postDataChangeStatus).subscribe((res:any)=>{
    let result =[res]
    let list2 = [];
    let j = 0 ;

    //alert(res)
    result.forEach(element => {
    list2.push(element);
    try{
      do{
        
        this.dataService.dataChangeStatus.ele2[j] = element[j].location_Floor
       j++
       
      }while(element[j].location_Floor != undefined)
      
    }catch{ 
    }
   
    })
  })
}

selectRoom(){
    
  this.dataService.dataChangeStatus.empID = this.dataService.dataChangeStatus.emp_ID

  this.authService.getRoom(this.postDataChangeStatus).subscribe((res:any)=>{
    this.dataService.dataChangeStatus.room = res.room_Name
    this.dataService.dataChangeStatus.newLocation = res.id
    this.dataService.dataChangeStatus.locationid =  this.postDataChangeStatus.locationid 
    this.dataService.dataChangeStatus.getF = this.postDataChangeStatus.getF
 
    this.showLocation()
  })
}

showLocation(){
  this.dataService.dataChangeStatus.getLocation ='สถานที่: '+ this.postDataChangeStatus.getL+' ชั้น: '+ this.postDataChangeStatus.getF + ' ห้อง: ' + this.dataService.dataChangeStatus.room
  // this.dataService.data.room = this.dataService.data.getLocation
  
}


updateAction(){
  this.authService.UpdateMaterial(this.dataService.dataChangeStatus).subscribe((res:any)=>{
    // if(this.postData.getStatus != ''){
      this.authService.UpdateStatus(this.dataService.dataChangeStatus).subscribe((res2:any)=>{
      
       
    if((res == true && res2== true)||(res == true) ){
  alert("เพิ่มข้อมูลสำเร็จ")
  this.dataService.dataChangeStatus.EmpID = ''
  this.dataService.dataChangeStatus.ITNo = ''
  this.dataService.dataChangeStatus.emp_ID= ''
  this.dataService.dataChangeStatus.Department = ''
  this.dataService.dataChangeStatus.Empname= ''
  this.dataService.dataChangeStatus.A_No = ''
  this.dataService.dataChangeStatus.room = ''
  this.dataService.dataChangeStatus.status = ''
    }else if((res2 == true && res== true)||(res2 == true)){
      this.authService.addHistory(this.dataService.dataChangeStatus).subscribe((res:any)=>{
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
  this.dataService.dataChangeStatus.empID = this.dataService.dataChangeStatus.emp_ID
  
  this.authService.getStatus(this.postDataChangeStatus).subscribe((res:any)=>{
    console.log(res)
    let result =[res]
    let list = [];
    let i = 0 ;
    result.forEach(element => {
    list.push(element);
  
      try{
      do{
        this.dataService.dataChangeStatus.eleStatus[i] = element[i].type
       i++
       
      }while(element[i].type  != undefined)
     
    }catch{}
 
    })
  })
  
}
chooseStatus(){
  this.dataService.dataChangeStatus.status = this.postDataChangeStatus.getStatus;
  if(this.dataService.dataChangeStatus.status == 'ส่งซ่อม'){
  (<HTMLInputElement> document.getElementById("fix-report-label")).style.display ='block' ;
  (<HTMLInputElement> document.getElementById("fix-report")).style.display ='block' ;
  }
  else{
  (<HTMLInputElement> document.getElementById("fix-report-label")).style.display ='none' ;
  (<HTMLInputElement> document.getElementById("fix-report")).style.display ='none' ;
  }
}
updateStatus(){
  
  console.log(this.dataService.dataChangeStatus.A_No)

}

}
