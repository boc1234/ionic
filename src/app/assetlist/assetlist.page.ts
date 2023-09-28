import { Component, OnInit , ViewChild } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import {DataService} from '../data.service';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { data, post } from 'jquery';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {OperationService} from '../operation.service'
import { PopoverController } from '@ionic/angular';
import {ModalPage} from '../modal/modal.page'
import { NewOperationService } from '../new-operation.service';
@Component({
  selector: 'app-assetlist',
  templateUrl: './assetlist.page.html',
  styleUrls: ['./assetlist.page.scss'],
})
export class AssetlistPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
 isOpen:string='0'
 public icon={
   last_update:'caret-down-outline'
 }
 public postDataAssetList={
  table_color:[],
  status_color:[],
  history_color:[],
  getCategory:'',
  getH:'',
  getStatus:'',
  getHistory:'',
  A_No:'',
  categoryid_statusid:[],
  categoryid:'',
  category_color:[],
  locationname:'',
  countHistory:'',
  countMaterial:'',
  statusid:''

 }
 public postDataPageHistory={
   page:[],
   page_date:[],
   page_status:[],
   page_detail:[],
   page_update_by:[],
   status_color:[]
 }
 public postDataPageMaterial={
   page:[],
   page_A_No:[],
   page_last_update:[],
   page_status:[],
   page_serialnumber:[],
   page_location:[],
   all:[{
     A_No:'',
     Location:'',
     Serial_Number:'',
     Last_Update:'',
     Status:''
   }],
   statuspage:''
 }
 public postDataPageStatus={
   page:[],
   pageA_No:[],
   page_last_update:[],
   page_status:[]
 }
 searchdata=''
 table:number=1;
 variable:boolean;
 add_edit:boolean;
 data:any[]=Array(20)
 page:any[]=Array(1)
 pageHistory:any[]=Array(1)
  constructor(public dataService:DataService,
    private router:Router , 
    private platform: Platform,
    private authService:AuthService,
    public datepipe:DatePipe,
    public loadingController: LoadingController,
    private operation : OperationService,
    private newOperationService : NewOperationService,
    private popoverController : PopoverController) { 
      this.platform.ready().then(() => {
        this.selectCategory()
        this.selectMaterial10(0)
       this.getLocation()
       this.selectStatus()
       this.changePage(0)
      }).catch(error => {
        console.log(error);
      })
    }

  async ngOnInit() {
    this.postDataAssetList.countMaterial = this.dataService.countasset
    if(Number(this.postDataAssetList.countMaterial)/10 > 1){
      (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
    this.page = Array(Math.ceil(Number(this.postDataAssetList.countMaterial)/10))
    }else{
      (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='none';
      this.page = Array(1)
    }

    this.selectMaterial10(0)
    this.clear();
    this.variable=true;
    //  document.getElementById("btnCategoryAsset").click(),5000;
    // document.getElementById("btnTop10").click(),5000;
 
   
    

    // const searchbar = document.querySelector('ion-searchbar');
    // const items = Array.from(document.getElementById('searchrow').children);

    // searchbar.addEventListener('ionInput', handleInput);

    // function handleInput(event) {
      
    //   const query = event.target.value.toLowerCase();
    //   requestAnimationFrame(() => {
    //     items.forEach(item => {
    //       const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
    //       item.style.display = shouldShow ? 'block' : 'none';
    //     });
    //   });
    // }
    
  }
  allpage:any=[]
  showpage:any=[]
  click:any=5
  changePage(y){

    
    // if(this.dataService.clickpage == 'l'){
    //   this.dataService.clickpage = 'r'
      
      // this.click = 10
    //   console.log(this.click)
      this.dataService.countpage = this.dataService.countpage+this.click

    // }else{
    //   this.dataService.clickpage = 'r'
    //   this.click = 5
    //   console.log(this.click)
    //   this.dataService.countpage = this.dataService.countpage+this.click

    // }
   
    for(let i =0; i< this.page.length; i++){
    
      this.allpage[i] = i
      // console.log(this.ad[i])
      
    } 
   
     let z = 0
    for(let x =y ;x<=(y+5) ; x++){
      
      this.showpage[z] = this.allpage[x]
     
      z++
      
    }
    
  }
  backPage(y){ 
    
    // if(this.dataService.clickpage == 'r'){
    //   this.dataService.clickpage = 'l'
    //   this.click = 5
    //   console.log(this.click)
    //   console.log(1)
      this.dataService.countpage = this.dataService.countpage-this.click

    // }else{
    //   this.dataService.clickpage = 'l'
    //   this.click = 5
    //   console.log(this.click)
    //   console.log(2)
    //   this.dataService.countpage = this.dataService.countpage-this.click

    // }
    // y-5

    // y = this.dataService.countpage
      y = this.dataService.countpage-5
      // this.dataService.countpage = this.dataService.countpage-5
    
  
      let z = 0
    for(let x =y ;x<=(y+5) ; x++){
      
      this.showpage[z] = this.allpage[x]
      
      z++
    }
    
  
     
    
  }


     searchItem(){
   this.getAssetNumber()
   
   if(this.dataService.data.A_No == ''){
    

   }else{
    
   }
  }
  validateInput(){
    // let A_Name = this.postData.A_Name.trim();
     let A_No = this.dataService.postData.A_No.trim();
     //let IT_No = this.postData.IT_No.trim();
    
  
     return (  this.dataService.postData.A_No  && A_No.length > 0 )
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
    
    this.dataService.data.A_No = res[0].iT_ASSET_NUMBER
    this.dataService.data.ITNo = res[0].iT_TAG_NUMBER
     this.dataService.data.serial_number = res[0].iT_SERIAL_NUMBER
      this.dataService.data.Description = res[0].iT_DESCRIPTION
    this.dataService.data.Manufacturer = res[0].iT_MANUFACTURE_NAME
    this.dataService.data.category = res[0].iT_ASSET_CATEGORY_TYPE
    this.dataService.data.location = res[0].iT_LOCATION
    document.getElementById("buttonhistory").style.display="block";
    (<HTMLInputElement> document.getElementById('detail')).style.display = 'none';
    (<HTMLInputElement> document.getElementById('menuasset')).style.display = 'block';
    (<HTMLInputElement> document.getElementById('addasset')).style.display = 'block';
    (<HTMLInputElement> document.getElementById('show')).style.display = 'none';
    (<HTMLInputElement> document.getElementById('general')).style.display = 'block';
    (<HTMLInputElement> document.getElementById('status')).disabled =false;
   }else{
     alert('ไม่พบ')
    
   }
   
  })
  
}
// this.GetRepairITAssets()
this.dataService.postData.A_No = ''
}

  
  ionViewWillEnter(){
    

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
    this.router.navigate(['assetlist'])
  }
  clear(){
    document.getElementById("buttongeneral").style.border = "solid 1px blue";
    document.getElementById("buttongeneral").style.borderTop = "thick solid blue";
    document.getElementById("buttongeneral").style.color = "blue";
    document.getElementById("buttondetail").style.border = "solid 1px rgb(226, 223, 223)";
    document.getElementById("buttondetail").style.color = "grey";
    document.getElementById("buttonhistory").style.border = "solid 1px rgb(226, 223, 223)";
    document.getElementById("buttonhistory").style.color = "grey";
  }
  testPage(){
    this.router.navigate(['assetgeneral'])
  }
  clickHome(){
    this.router.navigate(['home']);
  }
buttonGeneral(){
  
  (<HTMLInputElement> document.getElementById('general')).style.display = 'block';
  (<HTMLInputElement> document.getElementById('detail')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('history')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('purchase')).style.display = 'none';
  document.getElementById("buttongeneral").style.border = "solid 1px blue";
  document.getElementById("buttongeneral").style.borderTop = "thick solid blue";
  document.getElementById("buttongeneral").style.color = "blue";

  document.getElementById("buttondetail").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttondetail").style.color = "grey";
  document.getElementById("buttonhistory").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttonhistory").style.color = "grey";
  document.getElementById("buttonpurchase").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttonpurchase").style.color = "grey";
}
buttonDetail(){
  (<HTMLInputElement> document.getElementById('general')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('detail')).style.display = 'block';
  (<HTMLInputElement> document.getElementById('history')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('purchase')).style.display = 'none';
  document.getElementById("buttongeneral").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttongeneral").style.color = "grey";
  document.getElementById("buttonhistory").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttonhistory").style.color = "grey";
  document.getElementById("buttonpurchase").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttonpurchase").style.color = "grey";

  document.getElementById("buttondetail").style.border = "solid 1px blue";
  document.getElementById("buttondetail").style.borderTop = "thick solid blue";
  document.getElementById("buttondetail").style.color = "blue";
}
buttonPurchase(){
  (<HTMLInputElement> document.getElementById('general')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('detail')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('history')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('purchase')).style.display = 'block';
  document.getElementById("buttongeneral").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttongeneral").style.color = "grey";
  document.getElementById("buttondetail").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttondetail").style.color = "grey";
  document.getElementById("buttonhistory").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttonhistory").style.color = "grey";

  document.getElementById("buttonpurchase").style.border = "solid 1px blue";
  document.getElementById("buttonpurchase").style.borderTop = "thick solid blue";
  document.getElementById("buttonpurchase").style.color = "blue";
}
buttonHistory(){
  this.allHistory(0);
  (<HTMLInputElement> document.getElementById('general')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('detail')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('history')).style.display = 'block';
  (<HTMLInputElement> document.getElementById('purchase')).style.display = 'none';
  document.getElementById("buttongeneral").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttongeneral").style.color = "grey";
  document.getElementById("buttondetail").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttondetail").style.color = "grey";
  document.getElementById("buttonpurchase").style.border = "solid 1px rgb(226, 223, 223)";
  document.getElementById("buttonpurchase").style.color = "grey";

  document.getElementById("buttonhistory").style.border = "solid 1px blue";
  document.getElementById("buttonhistory").style.borderTop = "thick solid blue";
  document.getElementById("buttonhistory").style.color = "blue";
}

buttonNew(){
  (<HTMLInputElement> document.getElementById('menuasset')).style.display = 'block';
  this.menu(-1)
  this.buttonGeneral();
  (<HTMLInputElement> document.getElementById('addasset')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('show')).style.display = 'none';

  this.add_edit= true
  this.dataService.dataAssetList.A_No =''
  this.dataService.dataAssetList.ITNo =''
  this.dataService.dataAssetList.category =''
  this.dataService.dataAssetList.manufacturer =''
  this.dataService.dataAssetList.description ='';
  (<HTMLInputElement> document.getElementById('status')).disabled =true;
  this.dataService.dataAssetList.status =''
  this.dataService.dataAssetList.serial_number ='';
  this.dataService.dataAssetList.update_date ='';

  document.getElementById("buttonhistory").style.display="none";
  document.getElementById("add1").style.display="block";
  document.getElementById("add2").style.display="block";
  document.getElementById("add3").style.display="block";
  // document.getElementById("edit1").style.display="none";
  // document.getElementById("edit2").style.display="none";
  // document.getElementById("edit3").style.display="none";
  this.variable= false
}

buttonEdit(){

  // document.getElementById("edit1").style.display="block";
  // document.getElementById("edit2").style.display="block";
  // document.getElementById("edit3").style.display="block";
  document.getElementById("add1").style.display="none";
  document.getElementById("add2").style.display="none";
  document.getElementById("add3").style.display="none";
  this.variable= false
}
buttonAdd(){

}
menu(i){
  this.postDataAssetList.category_color =[]
  this.postDataAssetList.category_color[i] = 'category_color'
}
statusPageColor(i){
  this.postDataPageHistory.status_color=[]
  this.postDataPageHistory.status_color[i]='status_page_color'
}
assetPage=[]
assetPageColor(i){
  this.assetPage=[]
  this.assetPage[i]='status_page_color'
}

refreshPage(){
  window.location.reload();
}
  
  loadData(event){
   
    console.log('das')
    setTimeout(() => {
     
     if(this.data.length > this.dataService.dataAssetList.history_date.length){
      event.target.complete();
      this.infiniteScroll.disabled =true;
      return;
     }
    
    
      const nArr = Array(10);
      this.data.push( ...nArr);
      event.target.complete();
      
    }, 1000);
    // this.checkStatus()
  }

async showsub(){
  let i = 0
  
  // document.addEventListener('DOMContentLoaded', () => {
    
    let targets = document.getElementById('wrappermenuasset');
 
  if (this.isOpen=='1') { 
    (<HTMLInputElement> document.getElementById('up')).style.display = 'none';
    (<HTMLInputElement> document.getElementById('down')).style.display = 'block';
    this.isOpen = '0';
    anime({
      targets,
      height: 0,
      opacity: [1, 0],
      duration: 400,
      easing: 'easeOutQuad',
      complete() {
        
        (<HTMLInputElement> document.getElementById('wrappermenuasset')).style.display = '';
      }
    });
  } else {
   this.isOpen = '1' ;

   (<HTMLInputElement> document.getElementById('up')).style.display = 'block';
   (<HTMLInputElement> document.getElementById('down')).style.display = 'none';
   (<HTMLInputElement> document.getElementById('wrappermenuasset')).style.display = '';
    (<HTMLInputElement> document.getElementById('wrappermenuasset')).style.display = 'block';
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

async showsubLocation(){
  let i = 0
  
  // document.addEventListener('DOMContentLoaded', () => {
    
    let targets = document.getElementById('wrappermenulocation');
 
  if (this.isOpen=='1') { 
    (<HTMLInputElement> document.getElementById('up2')).style.display = 'none';
    (<HTMLInputElement> document.getElementById('down2')).style.display = 'block';
    this.isOpen = '0';
    anime({
      targets,
      height: 0,
      opacity: [1, 0],
      duration: 400,
      easing: 'easeOutQuad',
      complete() {
        (<HTMLInputElement> document.getElementById('searchlocation')).style.display = 'none';
        (<HTMLInputElement> document.getElementById('wrappermenulocation')).style.display = '';

      }
    });
  } else {
   this.isOpen = '1' ;

   (<HTMLInputElement> document.getElementById('up2')).style.display = 'block';
   (<HTMLInputElement> document.getElementById('down2')).style.display = 'none';
   (<HTMLInputElement> document.getElementById('wrappermenulocation')).style.display = '';
    (<HTMLInputElement> document.getElementById('wrappermenulocation')).style.display = 'block';
    (<HTMLInputElement> document.getElementById('wrappermenulocation')).style.height = '0px';
    (<HTMLInputElement> document.getElementById('searchlocation')).style.display = 'block';
    anime({
      targets,
      height: 500,
      width: 300,
      opacity: [0, 1],
      duration: 400,
      easing: 'easeOutCubic'
    });
  }
}

selectStatus(){
  this.dataService.data.empID = this.dataService.data.emp_ID
  
  this.authService.getStatus(this.postDataAssetList).subscribe((res:any)=>{
    console.log(res)
    let result =[res]
    let list = [];
    let i = 0 ;
    result.forEach(element => {
    list.push(element);
  
      try{
      do{
        this.dataService.dataAssetList.eleStatus[i] = element[i].type
       i++
       
      }while(element[i].type  != undefined)
     
    }catch{}
 
    })
  })
  
}
arrL =[]
arrL1=[]
  filterLocation(ev:any){
    this.dataService.arrL =this.dataService.arrL1
    const val = ev.target.value;
  
    if(val && val.trim() !='')
    {
      this.dataService.arrL = this.dataService.arrL1.filter((item)=>{

        return (
        item.Location.toLowerCase().indexOf(val.toLowerCase())>-1
        )
      })
    }
   }

async getLocation(){
    
  // this.authService.GetJobSite('').subscribe(res=>{
   
  //    this.dataService.dataLocation.location[0] = res[0].JobNo
  //    var obj = {Location:this.dataService.dataLocation.location[0]}
  //           this.arrL.push(obj)
  //   let j =1
  //   let i =1
      
  //          do{
              
  //           if(res[j].JobNo != res[j-1].JobNo){
  //         this.dataService.dataLocation.location[i] = res[j].JobNo
  //         var obj = {Location:this.dataService.dataLocation.location[i]}
  //           this.arrL.push(obj)
  //           this.arrL1 = this.arrL
  //         i++
  //           }

        
  //       j++
  //         }while(res[j].JobNo != undefined)
        
  // })
 
  
}
 async selectCategory(){
  
  this.authService.GetAllCategory().subscribe(async (res:any)=>{
    console.log(res)
    let result =[res]
    let list = [];
    let i = 0 ;
     result.forEach(async element => {
    list.push(element);
  
      try{
      do{
        this.dataService.dataAssetList.eleCategory[i] =await element[i].category_name 
        

       i++
       
      }while(element[i].category_name  != undefined)
     
    }catch{}
 
    })
  })
  
}
status1(){
  
  this.postDataAssetList.categoryid_statusid = [this.postDataAssetList.categoryid,'1']
  this.postDataAssetList.statusid = '1'
  if(this.postDataAssetList.categoryid == ''&& this.postDataAssetList.locationname == ''){
  this.selectAllStatus()
  }else if(this.postDataAssetList.categoryid != ''){
  this.selectCategoryStatus()
  }else if(this.postDataAssetList.locationname != ''){
    this.selectLocationStatus()
  }
}
status2(){
  this.postDataAssetList.categoryid_statusid = [this.postDataAssetList.categoryid,'2']
  this.postDataAssetList.statusid = '2'
  if(this.postDataAssetList.categoryid == ''&& this.postDataAssetList.locationname == ''){
    this.selectAllStatus()
    }else if(this.postDataAssetList.categoryid != ''){
    this.selectCategoryStatus()
    }else if(this.postDataAssetList.locationname != ''){
      this.selectLocationStatus()
    }
}
status3(){
  this.postDataAssetList.categoryid_statusid = [this.postDataAssetList.categoryid,'3']
  this.postDataAssetList.statusid = '3'
  if(this.postDataAssetList.categoryid == '' && this.postDataAssetList.locationname == ''){
    this.selectAllStatus()
    }else if(this.postDataAssetList.categoryid != ''){
    this.selectCategoryStatus()
    }else if(this.postDataAssetList.locationname != ''){
      this.selectLocationStatus()
    }
}
status4(){
  this.postDataAssetList.categoryid_statusid = [this.postDataAssetList.categoryid,'4']
  this.postDataAssetList.statusid = '4'
  if(this.postDataAssetList.categoryid == '' && this.postDataAssetList.locationname == ''){
    this.selectAllStatus()
    }else if(this.postDataAssetList.categoryid != ''){
    this.selectCategoryStatus()
    }else if(this.postDataAssetList.locationname != ''){
      this.selectLocationStatus()
    }
}
// status5(){
//   this.postDataAssetList.status_color=[]
//   this.postDataAssetList.categoryid_statusid = [this.postDataAssetList.categoryid,'5']
//   if(this.postDataAssetList.categoryid == ''){
//     this.selectAllStatus()
//     }else{
//     this.selectCategoryStatus()
//     }
// }
// status6(){
//   this.postDataAssetList.status_color=[]
//   this.postDataAssetList.categoryid_statusid = [this.postDataAssetList.categoryid,'6']
//   if(this.postDataAssetList.categoryid == ''){
//     this.selectAllStatus()
//     }else{
//     this.selectCategoryStatus()
//     }
// }
selectCategoryStatus(){
  this.dataService.dataAssetList.eleHistoryID=[]
  this.dataService.dataAssetList.table_A_No = []
 this.dataService.dataAssetList.table_ITNo = []  
 this.dataService.dataAssetList.table_status = []
 this.dataService.dataAssetList.table_status_type = []
 this.dataService.dataAssetList.table_last_update = []
 this.postDataPageMaterial.page_A_No = []
 this.postDataPageMaterial.page_last_update = []
  this.authService.GetMaterialCategoryStatus(this.postDataAssetList.categoryid_statusid[0],this.postDataAssetList.categoryid_statusid[1]).subscribe((res:any)=>{
    let result =[res];
    let list = [];
    let i = 0 ;
    this.postDataAssetList.countMaterial = res.length
    result.forEach(element => {
    list.push(element);
    console.log(element)
    try{
      do{
        let a = 0
        let b =0
         let dateString =  element[i].update_date
    
         let newDate = new Date(dateString)
         let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy HH:mm:ss');
        // let id = element[i].id
        if(i%2 == 0){
          this.postDataAssetList.table_color[i]="table_a"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "1"){
          a = 1
          this.postDataAssetList.status_color[i]="label-green"
    
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "2"){
           a = 2
           this.postDataAssetList.status_color[i]="label-red"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "3"){
           a = 3
           this.postDataAssetList.status_color[i]="label-blue"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "4"){
          a = 4
          this.postDataAssetList.status_color[i]="label-black"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "5"){
        a = 5
        this.postDataAssetList.status_color[i]="label-lightsalmon"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "6"){
        a = 6
        this.postDataAssetList.status_color[i]="label-mediumpurple"
        }

        this.dataService.dataAssetList.eleHistoryID[i] = [[" Status:"+ element[i].type],[a]]
        
        this.dataService.dataAssetList.table_A_No[i] = element[i].a_No 
        
        this.dataService.dataAssetList.table_last_update[i] = latest_date

        this.postDataPageMaterial.page_A_No[i] = element[i].a_No 
        this.postDataPageMaterial.page_serialnumber[i] = element[i].serial_number
        this.postDataPageMaterial.page_last_update[i] = latest_date
        this.postDataPageMaterial.page_status[i] = element[i].type
     
        if(element[i].locationname == undefined){
          this.dataService.dataAssetList.table_location[i] = '-'
          this.postDataPageMaterial.page_location[i] = '-'
        }
        else{
        this.dataService.dataAssetList.table_location[i] = element[i].locationname
        this.postDataPageMaterial.page_location[i] = element[i].locationname
        }
        if(this.dataService.dataAssetList.table_status[i]  == null){
          this.dataService.dataAssetList.table_status_type[i] = element[i].type
          
        
        
        }else{
          this.dataService.dataAssetList.table_status_type[i] = element[i].status.type
          this.dataService.dataAssetList.table_status[i] = element[i].status.id
        }

        this.postDataPageMaterial.all[i] =
            {
                A_No : this.postDataPageMaterial.page_A_No[i],
                Location : this.postDataPageMaterial.page_location[i],
                Last_Update : this.postDataPageMaterial.page_last_update[i],
                Serial_Number : this.postDataPageMaterial.page_serialnumber[i],
                Status : ''
          }


        i++
        
      }while(element[i].a_No  != undefined)
    }catch{
 
    }
  })
  this.data = Array(10)
  if(Number(this.postDataAssetList.countMaterial)/10 > 1){
    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
  this.page = Array(Math.ceil(Number(this.postDataAssetList.countMaterial)/10))
  }else{
    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='none';
    this.page = Array(1)
  }
   
  if(this.dataService.dataAssetList.table_A_No.length < this.data.length){
    this.data = Array(this.dataService.dataAssetList.table_A_No.length)
  }
  })
}

selectLocationStatus(){
  this.dataService.dataAssetList.eleHistoryID=[]
  this.dataService.dataAssetList.table_A_No = []
 this.dataService.dataAssetList.table_ITNo = []  
 this.dataService.dataAssetList.table_status = []
 this.dataService.dataAssetList.table_status_type = []
 this.dataService.dataAssetList.table_last_update = []
 this.postDataPageMaterial.page_A_No = []
 this.postDataPageMaterial.page_last_update = []
  this.authService.GetMaterialLocationStatus(this.postDataAssetList.locationname,this.postDataAssetList.statusid).subscribe((res:any)=>{
    let result =[res];
    let list = [];
    let i = 0 ;
    this.postDataAssetList.countMaterial = res.length
    result.forEach(element => {
    list.push(element);
    console.log(element)
    try{
      do{
        let a = 0
        let b =0
         let dateString =  element[i].update_date
    
         let newDate = new Date(dateString)
         let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy HH:mm:ss');
        // let id = element[i].id
        if(i%2 == 0){
          this.postDataAssetList.table_color[i]="table_a"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "1"){
          a = 1
          this.postDataAssetList.status_color[i]="label-green"
    
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "2"){
           a = 2
           this.postDataAssetList.status_color[i]="label-red"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "3"){
           a = 3
           this.postDataAssetList.status_color[i]="label-blue"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "4"){
          a = 4
          this.postDataAssetList.status_color[i]="label-black"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "5"){
        a = 5
        this.postDataAssetList.status_color[i]="label-lightsalmon"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "6"){
        a = 6
        this.postDataAssetList.status_color[i]="label-mediumpurple"
        }

        this.dataService.dataAssetList.eleHistoryID[i] = [[" Status:"+ element[i].type],[a]]
        
        this.dataService.dataAssetList.table_A_No[i] = element[i].a_No 
        
        this.dataService.dataAssetList.table_last_update[i] = latest_date

        this.postDataPageMaterial.page_A_No[i] = element[i].a_No 
        this.postDataPageMaterial.page_serialnumber[i] = element[i].serial_number
        this.postDataPageMaterial.page_last_update[i] = latest_date
        this.postDataPageMaterial.page_status[i] = element[i].type
     
        if(element[i].locationname == undefined){
          this.dataService.dataAssetList.table_location[i] = '-'
          this.postDataPageMaterial.page_location[i] = '-'
        }
        else{
        this.dataService.dataAssetList.table_location[i] = element[i].locationname
        this.postDataPageMaterial.page_location[i] = element[i].locationname
        }
        if(this.dataService.dataAssetList.table_status[i]  == null){
          this.dataService.dataAssetList.table_status_type[i] = element[i].type
          
        
        
        }else{
          this.dataService.dataAssetList.table_status_type[i] = element[i].status.type
          this.dataService.dataAssetList.table_status[i] = element[i].status.id
        }

        this.postDataPageMaterial.all[i] =
            {
                A_No : this.postDataPageMaterial.page_A_No[i],
                Location : this.postDataPageMaterial.page_location[i],
                Last_Update : this.postDataPageMaterial.page_last_update[i],
                Serial_Number : this.postDataPageMaterial.page_serialnumber[i],
                Status : ''
          }
        i++
        
      }while(element[i].a_No  != undefined)
    }catch{
 
    }
  })
  this.data = Array(10)
  if(Number(this.postDataAssetList.countMaterial)/10 > 1){
    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
  this.page = Array(Math.ceil(Number(this.postDataAssetList.countMaterial)/10))
  }else{
    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='none';
    this.page = Array(1)
  }
   
  if(this.dataService.dataAssetList.table_A_No.length < this.data.length){
    this.data = Array(this.dataService.dataAssetList.table_A_No.length)
  }
  })
}

selectAllStatus(){
  this.dataService.dataAssetList.eleHistoryID=[]
  this.dataService.dataAssetList.table_A_No = []
 this.dataService.dataAssetList.table_ITNo = []  
 this.dataService.dataAssetList.table_status = []
 this.dataService.dataAssetList.table_status_type = []
 this.dataService.dataAssetList.table_last_update = []
this.postDataPageMaterial.page_A_No =[]
this.postDataPageMaterial.page_last_update =[]
this.arr = []
  this.authService.GetAllMaterialStatus(this.postDataAssetList.categoryid_statusid[1]).subscribe((res:any)=>{
    let result =[res];
    let list = [];
    let i = 0 ;
    this.postDataAssetList.countMaterial = res.length
    result.forEach(element => {
    list.push(element);
    console.log(element)
    try{
      do{
        let a = 0
        let b =0
         let dateString =  element[i].update_date
    
         let newDate = new Date(dateString)
         let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy HH:mm:ss');
        let id = element[i].id
        if(i%2 == 0){
          this.postDataAssetList.table_color[i]="table_a"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "1"){
          a = 1
          this.postDataAssetList.status_color[i]="label-green"
    
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "2"){
           a = 2
           this.postDataAssetList.status_color[i]="label-red"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "3"){
           a = 3
           this.postDataAssetList.status_color[i]="label-blue"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "4"){
          a = 4
          this.postDataAssetList.status_color[i]="label-black"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "5"){
        a = 5
        this.postDataAssetList.status_color[i]="label-lightsalmon"
        }
        if(this.postDataAssetList.categoryid_statusid[1] == "6"){
        a = 6
        this.postDataAssetList.status_color[i]="label-mediumpurple"
        }

        this.dataService.dataAssetList.eleHistoryID[i] = [[" Status:"+ element[i].type],[a]]
        
        this.dataService.dataAssetList.table_A_No[i] = element[i].a_No 
        
        this.dataService.dataAssetList.table_last_update[i] = latest_date
        this.postDataPageMaterial.page_A_No[i] = element[i].a_No 
        this.postDataPageMaterial.page_serialnumber[i] = element[i].serial_number
        this.postDataPageMaterial.page_last_update[i] = latest_date
        this.postDataPageMaterial.page_status[i] = element[i].type
        if(element[i].locationname == undefined){
          this.dataService.dataAssetList.table_location[i] = '-'
          this.postDataPageMaterial.page_location[i] = '-'
        }
        else{
        this.dataService.dataAssetList.table_location[i] = element[i].locationname
        this.postDataPageMaterial.page_location[i] = element[i].locationname
        }
        if(this.dataService.dataAssetList.table_status[i]  == null){
          this.dataService.dataAssetList.table_status_type[i] = element[i].type
          
        
        
        }else{
          this.dataService.dataAssetList.table_status_type[i] = element[i].type
          this.dataService.dataAssetList.table_status[i] = element[i].statusid
        }

        this.postDataPageMaterial.all[i] =
            {
                A_No : this.postDataPageMaterial.page_A_No[i],
                Location : this.postDataPageMaterial.page_location[i],
                Last_Update : this.postDataPageMaterial.page_last_update[i],
                Serial_Number : this.postDataPageMaterial.page_serialnumber[i],
                Status : ''
          }
  
        i++
     

    //     this.postDataPageMaterial.pageA_No[i] = {No:element[i].a_No}
        
    //     this.arr.push(this.postDataPageMaterial.pageA_No[i])
    // console.log(i)
    //     console.log(this.postDataPageMaterial.pageA_No[i])
    //     // console.log(obj)
    //     this.arr1 = this.arr
      }while(element[i].a_No  != undefined)
    }catch{
   
    }
  })
  this.data = Array(10)
  if(Number(this.postDataAssetList.countMaterial)/10 > 1){
    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
  this.page = Array(Math.ceil(Number(this.postDataAssetList.countMaterial)/10))
  }else{
    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='none';
    this.page = Array(1)
  }
   
  if(this.dataService.dataAssetList.table_A_No.length < this.data.length){
    this.data = Array(this.dataService.dataAssetList.table_A_No.length)
  }
  })
}

page_no:any
choosePageMaterial(j){
alert(j)
  let a = j.slice(0,1)

  this.assetPageColor(a)
  if(j == '00'){
    j = 0
  }
 this.page_no = j
  this.materialPage(j)
}
materialPage(j){
  
  (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
  this.postDataPageMaterial.page_A_No =  []
  this.postDataPageMaterial.page_last_update = []
  this.postDataPageMaterial.page_location = []
  // this.postDataPageMaterial.all =[]
  for(let i = 0 ; i<10; i++){
  
    if(this.postDataPageMaterial.page_status[j] == "ปกติ"){
    
      this.postDataAssetList.status_color[i]="label-green"

    }
    if(this.postDataPageMaterial.page_status[j] == "เสีย"){
   
       this.postDataAssetList.status_color[i]="label-red"
    }
    if(this.postDataPageMaterial.page_status[j] == "ส่งซ่อม"){
  
       this.postDataAssetList.status_color[i]="label-blue"
    }
    if(this.postDataPageMaterial.page_status[j] == "ตัดจำหน่าย"){
     
      this.postDataAssetList.status_color[i]="label-black"
    }
    if(this.postDataPageMaterial.page_status[j] == "นำเข้าใหม่"){
   
    this.postDataAssetList.status_color[i]="label-lightsalmon"
    }
    if(this.postDataPageMaterial.page_status[j] == "โอนย้าย"){
    
    this.postDataAssetList.status_color[i]="label-mediumpurple"
    } 
  
   this.postDataPageMaterial.all[i].A_No = this.dataService.dataAssetList.table_A_No[j]
   this.postDataPageMaterial.all[i].Last_Update = this.dataService.dataAssetList.table_last_update[j]
   this.postDataPageMaterial.all[i].Location = this.dataService.dataAssetList.table_location[j]
   this.postDataPageMaterial.all[i].Serial_Number = this.dataService.dataAssetList.table_serial_number[j]

  this.postDataPageMaterial.page_A_No[i] =  this.dataService.dataAssetList.table_A_No[j]
  this.postDataPageMaterial.page_last_update[i] = this.dataService.dataAssetList.table_last_update[j]
  this.postDataPageMaterial.page_location[i] = this.dataService.dataAssetList.table_location[j]
 
  j++
  }
  
 this.data = Array(10)

 if(this.postDataPageMaterial.page_A_No[9]==null && this.dataService.dataAssetList.table_A_No.length > 10){
  (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
   this.data = Array(this.dataService.dataAssetList.table_A_No.length%10)
  }else if(this.dataService.dataAssetList.table_A_No.length < 10){

    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='none';
  }
 if(this.dataService.dataAssetList.table_A_No.length < this.data.length){
  this.data = Array(this.dataService.dataAssetList.table_A_No.length)
}


}
   selectMaterial10(j){

  this.assetPageColor(0)
   this.data= Array(10)
  this.arr=[]
  
  this.dataService.dataAssetList.eleHistoryID=[]
  this.dataService.dataAssetList.table_A_No = []
 this.dataService.dataAssetList.table_ITNo = []  
 this.dataService.dataAssetList.table_status = []
 this.dataService.dataAssetList.table_status_type = []
 this.dataService.dataAssetList.table_last_update = []
  this.postDataAssetList.locationname='';
  this.postDataAssetList.categoryid = '';
  (<HTMLInputElement> document.getElementById('purchase')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('history')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('menuasset')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('addasset')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('show')).style.display = 'block';
  (<HTMLInputElement> document.getElementById('general')).style.display = 'none';     
  (<HTMLInputElement> document.getElementById('detail')).style.display = 'none';     
  (<HTMLInputElement> document.getElementById('status')).disabled =false;
  // document.getElementById("edit1").style.display="none";
  // document.getElementById("edit2").style.display="none";
  // document.getElementById("edit3").style.display="none";
  this.authService.GetAllMaterialList().subscribe((res:any)=>{
    this.data= Array(10)
      let result =[res];
      let list = [];
      let i = 0 ;
      //24 this.postDataAssetList.countMaterial = res.length
  
      result.forEach(async element => {
      list.push(element);
      console.log(element)
      try{
        do{
          let a = 0
          let b =0
           let dateString =  element[j].update_date
      
           let newDate = new Date(dateString)
           
           let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy HH:mm:ss');
          let id = element[j].id
          if(i%2 == 0){
            this.postDataAssetList.table_color[i]="table_a"
          }
          if(element[j].type == "ปกติ"){
            a = 1
            this.postDataAssetList.status_color[i]="label-green"
      
          }
          if(element[j].type == "เสีย"){
             a = 2
             this.postDataAssetList.status_color[i]="label-red"
          }
          if(element[j].type == "ส่งซ่อม"){
             a = 3
             this.postDataAssetList.status_color[i]="label-blue"
          }
          if(element[j].type == "ตัดจำหน่าย"){
            a = 4
            this.postDataAssetList.status_color[i]="label-black"
          }
          if(element[j].type == "นำเข้าใหม่"){
          a = 5
          this.postDataAssetList.status_color[i]="label-lightsalmon"
          }
          if(element[j].type == "โอนย้าย"){
          a = 6
       
          this.postDataAssetList.status_color[i]="label-mediumpurple"
          }
          this.dataService.dataAssetList.eleHistoryID[i] = [[" Status:"+ element[j].type],[a]]
          this.postDataPageMaterial.page_status[i] = element[j].type
          
          this.dataService.dataAssetList.table_A_No[i] = element[j].a_No 
          
      
      
          
          this.dataService.dataAssetList.table_last_update[i] = latest_date
          this.dataService.dataAssetList.table_serial_number[i] = element[j].serial_number
          this.postDataPageMaterial.page_A_No[i] =  element[j].a_No 
          this.postDataPageMaterial.page_last_update[i] =latest_date
          this.postDataPageMaterial.page_serialnumber[i] = element[j].serial_number
          if(element[j].locationname == undefined){
            this.dataService.dataAssetList.table_location[i] = '-'
            this.postDataPageMaterial.page_location[i] = '-'
          }
          else{
          this.dataService.dataAssetList.table_location[i] = element[j].locationname
          this.postDataPageMaterial.page_location[i] = element[j].locationname
          }
          if(this.dataService.dataAssetList.table_status[i]  == null){
            this.dataService.dataAssetList.table_status_type[i] = element[j].type
            
          
          
          }else{
            this.dataService.dataAssetList.table_status_type[i] = element[j].status.type
            this.dataService.dataAssetList.table_status[i] = element[j].status.id
            
          }
          this.postDataPageMaterial.all[i] =
            {
                A_No : this.postDataPageMaterial.page_A_No[i],
                Location : this.postDataPageMaterial.page_location[i],
                Last_Update : this.postDataPageMaterial.page_last_update[i],
                Serial_Number : this.postDataPageMaterial.page_serialnumber[i],
                Status : element[j].type
          }

          // var obj = {Date:latest_date,No:element[i].a_No}
          // this.postDataPageMaterial.pageA_No[i] = {No:element[i].a_No}
          // this.arr.push(this.postDataPageMaterial.pageA_No[i])

          // // console.log(obj)

          // this.arr1 = this.arr
          i++
          j++
          
        }while(element[j].a_No  != undefined)
      }catch(error){
   
      }
    })
    
    this.data = Array(10)
    if(Number(this.postDataAssetList.countMaterial)/10 > 1){
      (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
    this.page = Array(Math.ceil(Number(this.postDataAssetList.countMaterial)/10))
    }else{
      (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='none';
      this.page = Array(1)
    }
     
    if(this.dataService.dataAssetList.table_A_No.length < this.data.length){
      this.data = Array(this.dataService.dataAssetList.table_A_No.length)
    }
  })
}
// checkStatus(){
 
//   for(let i =0; i<this.dataService.dataAssetList.eleHistoryID.length;i++){
  
//   if(this.dataService.dataAssetList.eleHistoryID[i][1]=='1'){

//   (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='green';
//     }
//   else if(this.dataService.dataAssetList.eleHistoryID[i][1]=='2'){
//   (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='red';
//     }
//   else if(this.dataService.dataAssetList.eleHistoryID[i][1]=='3'){
//  (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='blue';
//    }
//    else if(this.dataService.dataAssetList.eleHistoryID[i][1]=='4'){
// (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='rgb(140, 211, 172) ';
//   }
//   else if(this.dataService.dataAssetList.eleHistoryID[i][1]=='5'){
//   (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='lightsalmon';
//   }
// else if(this.dataService.dataAssetList.eleHistoryID[i][1]=='6'){
//   (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='mediumpurple';
//    }
//   }
// }

selectAction2(i){   
  this.menu(i)
  this.clear(); 
  document.getElementById("add1").style.display="none";
  document.getElementById("add2").style.display="none";
  document.getElementById("add3").style.display="none";
  (<HTMLInputElement> document.getElementById('purchase')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('history')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('menuasset')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('addasset')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('show')).style.display = 'block';
  (<HTMLInputElement> document.getElementById('general')).style.display = 'none';     
  (<HTMLInputElement> document.getElementById('detail')).style.display = 'none';     
  (<HTMLInputElement> document.getElementById('status')).disabled =false;
  // document.getElementById("edit1").style.display="none";
  // document.getElementById("edit2").style.display="none";
  // document.getElementById("edit3").style.display="none";

       this.dataService.dataAssetList.eleHistoryID=[]
         this.dataService.dataAssetList.table_A_No = []
        this.dataService.dataAssetList.table_ITNo = []  
        this.dataService.dataAssetList.table_status = []
        this.dataService.dataAssetList.table_status_type = []
        this.dataService.dataAssetList.table_last_update = []
        this.postDataAssetList.categoryid = this.dataService.dataAssetList.eleCategory[i]
  this.authService.GetMaterialCategory(this.dataService.dataAssetList.eleCategory[i]).subscribe(async (res:any)=>{
    let result =[res];
    let list = [];
    let i = 0 ;
    this.postDataAssetList.countMaterial = res.length
    await result.forEach(element => {
    list.push(element);
    console.log(element)
    try{
      do{
        let a = 0
        let b =0
         let dateString =  element[i].update_date
    
         let newDate = new Date(dateString)
         let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy HH:mm:ss');
        // let id = element[i].id
        if(i%2 == 0){
          this.postDataAssetList.table_color[i]="table_a"
        }
        
        if(element[i].type == "ปกติ"){
          a = 1
          this.postDataAssetList.status_color[i] = "label-green"
        }
        if(element[i].type == "เสีย"){
           a = 2
           this.postDataAssetList.status_color[i] = "label-red"
        }
        if(element[i].type == "ส่งซ่อม"){
           a = 3
           this.postDataAssetList.status_color[i] = "label-blue"
        }
        if(element[i].type == "ตัดจำหน่าย"){
          a = 4
          this.postDataAssetList.status_color[i] = "label-black"
        }
        if(element[i].type == "นำเข้าใหม่"){
        a = 5
        this.postDataAssetList.status_color[i] = "label-lightsalmon"
        }
        if(element[i].type == "โอนย้าย"){
        a = 6
        this.postDataAssetList.status_color[i] = "label-mediumpurple"
        }
        this.dataService.dataAssetList.eleHistoryID[i] = [[" Status:"+ element[i].type],[a]]
        this.dataService.dataAssetList.table_A_No[i] = element[i].a_No
        this.postDataPageMaterial.page_serialnumber[i] = element[i].serial_number
        this.dataService.dataAssetList.table_ITNo[i] = element[i].iT_No    
        this.dataService.dataAssetList.table_status[i] = element[i].statusid
        this.dataService.dataAssetList.table_status_type[i] = element[i].type
        this.dataService.dataAssetList.table_last_update[i] = latest_date
        this.postDataPageMaterial.page_A_No[i] = element[i].a_No
        this.postDataPageMaterial.page_last_update[i] = latest_date
        this.postDataPageMaterial.page_status[i] = element[i].type
        if(element[i].locationname == undefined){
          this.dataService.dataAssetList.table_location[i] = '-'
          this.postDataPageMaterial.page_location[i] = '-'
        }
        else{
        this.dataService.dataAssetList.table_location[i] = element[i].locationname
        this.postDataPageMaterial.page_location[i] = element[i].locationname
        }
        i++
      
      }while(element[i].a_No  != undefined)
    }catch{}
    
  })
 
  this.data = Array(10)
  if(Number(this.postDataAssetList.countMaterial)/10 > 1){
    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
  this.page = Array(Math.ceil(Number(this.postDataAssetList.countMaterial)/10))
  }else{
    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='none';
    this.page = Array(1)
  }
   
  if(this.dataService.dataAssetList.table_A_No.length < this.data.length){
    this.data = Array(this.dataService.dataAssetList.table_A_No.length)
  }
     
})
}
   seachData(){
    this.dataService.searchA_Number =  this.searchdata
    this.chooseAll(this.dataService.searchA_Number)
}
chooseAll(i){
  this.clear();
  this.searchdata =''
  this.variable= true
  this.add_edit= true;
  document.getElementById("buttonhistory").style.display="block";
  (<HTMLInputElement> document.getElementById('detail')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('menuasset')).style.display = 'block';
  (<HTMLInputElement> document.getElementById('addasset')).style.display = 'block';
  (<HTMLInputElement> document.getElementById('show')).style.display = 'none';
  (<HTMLInputElement> document.getElementById('general')).style.display = 'block';
  (<HTMLInputElement> document.getElementById('status')).disabled =false;
  this.postDataAssetList.A_No = ''
  this.authService.GetMaterial(i).subscribe((res:any)=>{
    console.log(res)
    let dateString =  res.update_date
    let newDate = new Date(dateString)
    let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy ');
    this.dataService.dataAssetList.A_No = res.a_No
    this.postDataAssetList.A_No=res.a_No;
    this.dataService.dataAssetList.ITNo = res.iT_No
    this.dataService.dataAssetList.category = res.category_name
    this.dataService.dataAssetList.manufacturer = res.manufacturer
    this.dataService.dataAssetList.description = res.description
    if(res.type == "ส่งซ่อม"){
       this.dataService.dataAssetList.status = "Repair"
    }
   
    this.dataService.dataAssetList.update_by = res.update_by
    this.dataService.dataAssetList.update_date = latest_date
    this.dataService.dataAssetList.created_by = res.created_by
    this.dataService.dataAssetList.created_date = res.created_date
    this.dataService.dataAssetList.serial_number = res.serial_number
    
    // if(res[0].location.location_ID == null){
    //   this.dataService.dataAssetList.table_location[i] = '-'
    // }else{
    // this.dataService.dataAssetList.table_location[i] = res[0].location.location_ID
    // }
    this.dataService.dataAssetList.table_location = res.locationname
  })
  this.data=Array(10)
}

choosePage(j){
  let a = j.slice(0,1)
  this.statusPageColor(a)
  if(j == '00'){
    j = 0
  }
 
  // this.allHistory(j)
  this.historyPage(j)
}
historyPage(j){
  let i =0
  this.postDataPageHistory.page_date = []
  this.postDataPageHistory.page_update_by =[]
  this.postDataPageHistory.page_detail =[]
  
 for(let i = 0 ; i<10; i++){
 
  if(this.postDataPageHistory.page_status[j]== "ปกติ"){
   
    this.postDataAssetList.history_color[i]="label-green"
  }
  if(this.postDataPageHistory.page_status[j] == "เสีย"){

     this.postDataAssetList.history_color[i]="label-red"
  }
  if(this.postDataPageHistory.page_status[j] == "ส่งซ่อม"){

     this.postDataAssetList.history_color[i]="label-blue"
  }
  if(this.postDataPageHistory.page_status[j] == "ตัดจำหน่าย"){

    this.postDataAssetList.history_color[i]="label-black"
 }
  if(this.postDataPageHistory.page_status[j] == "นำเข้าใหม่"){

  this.postDataAssetList.history_color[i]="label-lightsalmon"
 }
  if(this.postDataPageHistory.page_status[j] == "โอนย้าย"){

  this.postDataAssetList.history_color[i]="label-mediumpurple"
 }
  this.postDataPageHistory.page_date[i] = this.dataService.dataAssetList.history_date[j]
  this.postDataPageHistory.page_detail[i] = this.dataService.dataAssetList.history_detail[j]
  this.postDataPageHistory.page_update_by[i] = this.dataService.dataAssetList.history_h_update_by[j]
 
 j++
 }

 this.data = Array(10)
 if(this.postDataPageHistory.page_date[9]==null && this.dataService.dataAssetList.history_date.length > 10){
   this.data = Array(this.dataService.dataAssetList.history_date.length%10)
  }
 if(this.postDataPageHistory.page_date.length < this.data.length){
  this.data = Array(this.postDataPageHistory.page_date.length)
}
}


allHistory(j){
  this.statusPageColor(0)
  this.postDataPageHistory.page_date = []
  this.postDataPageHistory.page_update_by =[]
  this.postDataPageHistory.page_detail =[]
  this.dataService.dataAssetList.history_date = [] 
  this.dataService.dataAssetList.history_A_No = [] 
  this.dataService.dataAssetList.history_empID = [] 
  this.dataService.dataAssetList.history_location = [] 
  this.dataService.dataAssetList.history_status = []
  this.dataService.dataHome.eleHistoryID = []
  this.postDataAssetList.getHistory=''
  if(this.postDataAssetList.A_No != ''){
  this.authService.GetHistory(this.postDataAssetList.A_No).subscribe((res:any)=>{
    if(res==''){
      this.dataService.dataHome.eleHistoryID[0] = "ไม่พบข้อมูล"
      
    }else{
    let result =[res];
    let list = [];
    let i = 0 ;
   
     this.postDataAssetList.countHistory = res.length
    result.forEach(element => {
    list.push(element);
    console.log(element)
    
      try{
      do{
        let a = 0
        let b =0
         let dateString =  element[j].history_date
    
         let newDate = new Date(dateString)
         let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy HH:mm:ss');
        let id = element[j].id
        if(element[j].statusid == "ปกติ"){
          a = 1

          this.postDataAssetList.history_color[i]="label-green"
        }
        if(element[j].statusid == "เสีย"){
           a = 2
           this.postDataAssetList.history_color[i]="label-red"
        }
        if(element[j].statusid == "ส่งซ่อม"){
           a = 3
           this.postDataAssetList.history_color[i]="label-blue"
        }
        if(element[j].statusid == "ตัดจำหน่าย"){
          a = 4
          this.postDataAssetList.history_color[i]="label-black"
       }
        if(element[j].statusid == "นำเข้าใหม่"){
        a = 5
        this.postDataAssetList.history_color[i]="label-lightsalmon"
       }
        if(element[j].statusid == "โอนย้าย"){
        a = 6
        this.postDataAssetList.history_color[i]="label-mediumpurple"
       }
    
        this.dataService.dataHome.eleHistoryID[i] = [[" Status:"+ element[j].statusid],[a]]
        // this.dataService.dataHome.status_history[i] = "Date:" + latest_date  + "  A-No:"  + element[j].material.A_No + "  EmpID:" + element[j].employeesid + " Location:" + element[j].locationid
        this.dataService.dataAssetList.history_date[i] = latest_date
        // this.dataService.dataAssetList.history_A_No[i] = element[j].material.A_No
        this.dataService.dataAssetList.history_empID[i] = element[j].employeesid
        this.dataService.dataAssetList.history_location[i] = element[j].locationid
        this.dataService.dataAssetList.history_detail[i] = element[j].detail
        this.dataService.dataAssetList.history_h_update_by[i] = element[j].h_update_by
        this.dataService.dataAssetList.history_status[i]
        this.postDataPageHistory.page_date[i] = latest_date
        this.postDataPageHistory.page_detail[i] = element[j].detail
        this.postDataPageHistory.page_update_by[i] = element[j].h_update_by
        this.postDataPageHistory.page_status[i] = element[j].statusid
        j++
        i++
      }while(element[j].materialid != undefined)
      
     
    }catch{}
    
    })
    
  } 
  // this.checkStatus()

  this.data = Array(10)
  if(Number(this.postDataAssetList.countHistory)/10 > 1){
    (<HTMLInputElement> document.getElementById('pagehistory')).style.display ='block';
  this.pageHistory = Array(Math.ceil(Number(this.postDataAssetList.countHistory)/10))
  }else{
    (<HTMLInputElement> document.getElementById('pagehistory')).style.display ='none';
    this.pageHistory = Array(1)
  }
  if(this.dataService.dataAssetList.history_date.length < this.data.length){
    this.data = Array(this.dataService.dataAssetList.history_date.length)
  }
  
  })
 
  // this.postData.A_No =''
}

}


addMaterial(){
   
  if(this.dataService.dataAssetList.A_No == '' || this.dataService.dataAssetList.description == '' || this.dataService.dataAssetList.category == ''){
    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
  }else{
  this.authService.Select(this.dataService.dataAssetList).subscribe((res:any)=>{
    if(this.dataService.dataAssetList.A_No != res.A_No){
      this.authService.addMaterial(this.dataService.dataAssetList).subscribe((res:any)=>{
        if(res[0] == true){
          this.dataService.dataAssetList.status = 'นำเข้าใหม่'
          this.dataService.dataAssetList.detail = 'Add new asset'
          this.authService.addHistory(this.dataService.dataAssetList).subscribe((res:any)=>{
            if(res == true){
              alert('เพิ่มข้อมูลสำเร็จ')
            }
          })
      

            this.dataService.dataAddMaterial.A_No =''
            this.dataService.dataAssetList.ITNo =''
            // this.dataService.dataAssetList.emp_ID =''
           
            this.dataService.dataAssetList.serial_number =''
            this.dataService.dataAssetList.manufacturer = ''
            
        }
    
      })
    }else{
      alert('ไม่สามารถเพิ่มรายการได้')
            this.dataService.dataAssetList.A_No =''
            this.dataService.dataAssetList.ITNo =''
            // this.dataService.dataAssetList.emp_ID =''
            this.dataService.dataAssetList.description =''
            this.dataService.dataAssetList.serial_number =''
            this.dataService.dataAssetList.manufacturer = ''
            this.dataService.dataAssetList.category = ''
    }
  })

}

}

editMaterial(){
  this.authService.editAll(this.postDataAssetList).subscribe((res:any)=>{

  })
}

getMaterialBylocation(i){
  this.postDataAssetList.locationname = i
  this.dataService.dataAssetList.table_A_No=[]
  this.authService.GetMaterialByLocation(i).subscribe((res:any)=>{
    this.postDataAssetList.countMaterial = res.length
    let result = [res]
    let list = [];
    let i = 0 ;
    result.forEach(element => {
    list.push(element);
  console.log(element.id)
      try{
      do{
        let a = 0
        this.dataService.dataAssetList.table_A_No[i] = element[i].a_No 
        this.postDataPageMaterial.page_serialnumber[i] = element[i].serial_number
        this.postDataPageMaterial.page_A_No[i] = element[i].a_No
        this.postDataPageMaterial.page_status[i] = element[i].t_type
       
        let dateString =  element[i].update_date
        let newDate = new Date(dateString)
        let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy HH:mm:ss');
        this.postDataPageMaterial.page_last_update[i] = latest_date
        
        if(element[i].locationname == undefined){
          this.dataService.dataAssetList.table_location[i] = '-'
          this.postDataPageMaterial.page_location[i] = '-'
        }
        else{
        this.dataService.dataAssetList.table_location[i] = element[i].locationname
        this.postDataPageMaterial.page_location[i] = element[i].locationname
        }
        if(i%2 == 0){
          this.postDataAssetList.table_color[i]="table_a"
        }
        
        if(element[i].type == "ปกติ"){
          a = 1
          this.postDataAssetList.status_color[i] = "label-green"
        }
        if(element[i].type == "เสีย"){
           a = 2
           this.postDataAssetList.status_color[i] = "label-red"
        }
        if(element[i].type == "ส่งซ่อม"){
           a = 3
           this.postDataAssetList.status_color[i] = "label-blue"
        }
        if(element[i].type == "ตัดจำหน่าย"){
          a = 4
          this.postDataAssetList.status_color[i] = "label-black"
        }
        if(element[i].type == "นำเข้าใหม่"){
        a = 5
        this.postDataAssetList.status_color[i] = "label-lightsalmon"
        }
        if(element[i].type == "โอนย้าย"){
        a = 6
        this.postDataAssetList.status_color[i] = "label-mediumpurple"
        }
        this.dataService.dataAssetList.eleHistoryID[i] = [[" Status:"+ element[i].type],[a]]
       i++
       
      }while(element[i].id  != undefined)
     
    }catch{}

  })
  this.data = Array(10)
  if(Number(this.postDataAssetList.countMaterial)/10 > 1){
    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
  this.page = Array(Math.ceil(Number(this.postDataAssetList.countMaterial)/10))
  }else{
    (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='none';
    this.page = Array(1)
  }
   
  if(this.dataService.dataAssetList.table_A_No.length < this.data.length){
    this.data = Array(this.dataService.dataAssetList.table_A_No.length)
  }
    
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
         
        // this.data = Array(10)
        // if(Number(item.No)/10 > 1){
        //   (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='block';
        // this.page = Array(Math.ceil(Number(item.No)/10))
        // }else{
        //   (<HTMLInputElement> document.getElementById('pageMaterial')).style.display ='none';
        //   this.page = Array(1)
        // }
         
        // if(this.dataService.dataAssetList.table_A_No.length < this.data.length){
        //   this.data = Array(this.dataService.dataAssetList.table_A_No.length)
        // }
        return (
       
        item.No.toLowerCase().indexOf(val.toLowerCase())>-1
        )
      })
    }
   
   }


sortLastUpdate(){
this.choosePageMaterial('00')
    if(this.icon.last_update == "caret-down-outline"){
    this.icon.last_update="caret-up-outline"
    this.postDataPageMaterial.statuspage ='1'



  var data_sort =  this.postDataPageMaterial.all.sort(function(a, b){
  
      var z = new Date(a.Last_Update)  
      var x = new Date(b.Last_Update)  

    
      return Number(z) - Number(x);
  });
  
  let j = this.page_no
  let i = 0
  do{
    this.dataService.dataAssetList.table_A_No[i] = data_sort[i].A_No
    this.dataService.dataAssetList.table_last_update[i] = data_sort[i].Last_Update 
    this.dataService.dataAssetList.table_location[i] = data_sort[i].Location
    this.dataService.dataAssetList
    j++
    i++
  }while(data_sort[i].A_No != undefined)
}else{
    this.icon.last_update="caret-down-outline"
    this.postDataPageMaterial.statuspage =''


  var data_sort =  this.postDataPageMaterial.all.sort(function(a, b){

      var z = new Date(a.Last_Update)  
      var x = new Date(b.Last_Update)  

    
      return Number(z) - Number(x);
  });
  data_sort.reverse()
  
  let j = this.page_no
  let i = 0
  do{
    this.dataService.dataAssetList.table_A_No[i] = data_sort[i].A_No
    this.dataService.dataAssetList.table_last_update[i] = data_sort[i].Last_Update 
    this.dataService.dataAssetList.table_location[i] = data_sort[i].Location
    this.dataService.dataAssetList
    i++
    j++
  }while(data_sort[i].A_No != undefined)
}
    // this.postDataPageMaterial.all.sort(function compare(a, b ) {
    //   // this.postDataPageMaterial.page_A_No[i]]
    //   // this.postDataPageMaterial.page_last_update[i] 
    //   // this.postDataPageMaterial.page_location[i] 
    //   alert(a.A_No)

    
    //   return a
    // });
  
  
   }


   sortA(){
   
   }

 
}
