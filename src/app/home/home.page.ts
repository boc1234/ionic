import { Component,ViewChild , OnInit, OnDestroy} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Router } from '@angular/router';
// import { MbscModule } from '@mobiscroll/angular';
import {DataService} from'../data.service';
import { AuthService } from '../auth.service';
import {DatePipe} from '@angular/common';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Chart } from 'chart.js';
import{AlertController} from '@ionic/angular';
import anime from 'animejs/lib/anime.es';
import * as HighCharts from 'highcharts';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { PopoverController } from '@ionic/angular';
import {ModalPage} from '../modal/modal.page'
const { Network } = Plugins;
import {OperationService} from '../operation.service'
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import {Storage} from '@ionic/storage'

import * as d3Shape from 'd3-shape';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
}) 

export class HomePage {

  @ViewChild('barChart') barChart;
  @ViewChild('barChart2') barChart2;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild('barChartCount') barChartCount;
  pieData = [
    { actor: 'Arya', fanP: 15 },
    { actor: 'Jaime', fanP: 10 },
    { actor: 'Snow', fanP: 15 },
    { actor: 'Sansa', fanP: 5 },
    { actor: 'Cersei', fanP: 12 },
    { actor: 'Tyrion', fanP: 13 },
    { actor: 'Daenerys', fanP: 20 },
    { actor: 'Bran', fanP: 10 }
  ];
  barData = [
    { season: 'S1', viewers: 250 },
    { season: 'S2', viewers: 380 },
    { season: 'S3', viewers: 500 },
    { season: 'S4', viewers: 690 },
    { season: 'S5', viewers: 690 },
    { season: 'S6', viewers: 750 },
    { season: 'S7', viewers: 100 },
    { season: 'S8', viewers: 170 }
  ];
  title = '';
  subtitle = '';
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  radius: number;
  color: any;
  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  svg: any;
  g: any;


bars: any;
colorArray: any;
  public test7={
    a : 2
  }
  public pie1 =[11,2,5]
  public pieName = ['Internet Explorer','fire','aaa'
  ]
  public postDataStorage ={
    username :'',
    expire : null
  }


  databaseObj: SQLiteObject;
  readonly database_name: string = "IT_ASSET.db";
 
  readonly table_name: string = "Material";

  name_model: string = "";
  row_data: any = [];

  // Handle Update Row Operation
  updateActive: boolean;
  to_update_item: any;


  constructor( private modalController:ModalController,
    public alertController:AlertController,
    private platform: Platform,
    public dataService:DataService,
    private authService:AuthService,
    public datepipe:DatePipe,
    public loadingController: LoadingController,
    private sqlite: SQLite,
    private router:Router,
    public popoverController: PopoverController,
    private operation : OperationService,
    private storage : Storage
   ) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2.5;
      this.platform.ready().then(() => {
      
        this.createDB();
      }).catch(error => {
        console.log(error);
      })
    }
  

    public postDataHome={
      icon:[],
      status_color:[],
      history_date:[],
      history_A_No:[],
      history_empID:[],
      history_location:[],
      history_status:[],
      show_history_update_date:[],
      show_history_A_No:[],
      show_history_status:[],
      show_history_update_by:[],
      show_history:[],
      show_history_detail:[],
      t:'',
      getH: '',
      getShow:'',
      A_No:'',
      allM:'',
      all1:'',
      all2:'',
      all3:'',
      c_category:'',
      all_category:[],
      all_categoryid:[],
      a_category:[],
      categoryStr:[],
      id_category:[],
      show_category:[],
      search_a:[],
      date_now:'',
      date_month:'',
      date_year:'',
      count_a:''
     
    }
    public color1={
      graph:[
        '#cc99ff','#b366ff','#8c1aff','#6600cc','#400080','#660066','#b300b3','#ff00ff','#ff66ff','#ffccff'
      ]
    }
    row:any[]=Array(1)
    data:any[]=Array(20)
    networkStatus: NetworkStatus;
    networkListener: PluginListenerHandle;
    slidesOptionsHome ={
      slidesPerView:3,
      loop:false,
      autoplay:false,
      speed: 1500
    }
    test1(){
      this.authService.GetMaterial(this.test7.a).subscribe(res=>{
        console.log(res)
      })
    }
    clickGraph1(){
      this.bars.destroy()
      this.chart = "bar"
      this.options={
        scales:{
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
      this.label=['ปกติ', 'ซ่อม', 'เสีย']
      this.datachart=[12,25,19]
      this.title="grap1"
      this.subtitle="graph1"
      // document.getElementById("ch").style.display="block"
      // document.getElementById("ch1").style.display="none"
      document.getElementById("graph1").style.border = "solid 1px blue";
      document.getElementById("graph1").style.borderTop = "thick solid blue";
      document.getElementById("graph1").style.color = "blue";
    
      document.getElementById("graph2").style.border = "solid 1px rgb(226, 223, 223)";
      document.getElementById("graph2").style.color = "grey";
      document.getElementById("graph3").style.border = "solid 1px rgb(226, 223, 223)";
      document.getElementById("graph3").style.color = "grey";
      this.createBarChart()
    }
    async clickGraph2(){
     this.bars.destroy()

      this.chart = "pie"
      this.options.scales.yAxes =[]
      this.label=['test1','test2','test3','test4']
      this.datachart=[5,1,8,2]
      document.getElementById("graph2").style.border = "solid 1px blue";
      document.getElementById("graph2").style.borderTop = "thick solid blue";
      document.getElementById("graph2").style.color = "blue";
    
      document.getElementById("graph1").style.border = "solid 1px rgb(226, 223, 223)";
      document.getElementById("graph1").style.color = "grey";
      document.getElementById("graph3").style.border = "solid 1px rgb(226, 223, 223)";
      document.getElementById("graph3").style.color = "grey";
      await this.createBarChart()
    }

    clickGraph3(){
      document.getElementById("graph3").style.border = "solid 1px blue";
      document.getElementById("graph3").style.borderTop = "thick solid blue";
      document.getElementById("graph3").style.color = "blue";
    
      document.getElementById("graph2").style.border = "solid 1px rgb(226, 223, 223)";
      document.getElementById("graph2").style.color = "grey";
      document.getElementById("graph1").style.border = "solid 1px rgb(226, 223, 223)";
      document.getElementById("graph1").style.color = "grey";
    }
    
      async ngOnInit() {
        console.log(this.dataService.us.slice(14))
        // this.storageExpire();
        this.getLocation();
        this.init();
        this.initAxes();
        this.drawAxes();
        this.drawChart();
        this.initSvg();
        this.drawPie();
       // this.lastHistory()
        // this.countAllDateHistory()
        let date_now = new Date()
      this.postDataHome.date_now = this.datepipe.transform(date_now,'yyyy-MM')
      this.showHistory();
        
        if(this.platform.is("desktop")){
          // this.countMaterial();
          // this.countMaterialCategory();
          
          // (<HTMLInputElement> document.getElementById("clear")).style.display = "none";
          // (<HTMLInputElement> document.getElementById("clear2")).style.display = "none";
         
        }else{
         
        }
        this.networkListener = Network.addListener('networkStatusChange', (status) => {
          console.log("Network status changed", status);
          this.networkStatus = status;
        });
      
        this.networkStatus = await Network.getStatus();
        if(this.networkStatus.connected == false){
          // (<HTMLInputElement> document.getElementById("load")).style.display = "none";
          // (<HTMLInputElement> document.getElementById("load2")).style.display = "none";
        }

      }
      
    ngOnDestroy() {
      this.networkListener.remove();
    }
      ionViewDidEnter() {
        this.createBarChart();
  
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
/////////////////////////////////////////////////////////////////////////////////////
      chart="bar"
      public options={
        scales:{
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
      label=['ปกติ', 'ซ่อม', 'เสีย']
      datachart=[12,25,19]
      createBarChart() {
        // (<HTMLInputElement> document.getElementById("graph")).style.display = "block";
        
        this.bars = new Chart(this.barChart.nativeElement, {
          type: this.chart,
          data: {
            labels: this.label,
            datasets: [{
              label: 'label',
              data: this.datachart,
              backgroundColor: ['#2780ea', '#1b59a4', '#cae2ff', '#95c5ff','#7faac6','#94bed9'], // array should have same number of elements as number of dataset
              borderColor: ['#004c6d', '#346888', '#5886a5', '#7aa6c2','#9dc6e0','#c1e7ff'],// array should have same number of elements as number of dataset
              borderWidth: 1
            }]
          },
          options: this.options
          //   scales: {
          //     yAxes: [{
          //       ticks: {
          //         beginAtZero: true
          //       }
          //     }]
          //   }
           
        });
    
      }

   
      plotSimplePieChart() {
    
        let pie =[];
        
        
        (<HTMLInputElement> document.getElementById("graph2")).style.display = "block";
       
       for(let k =0; k<this.postDataHome.all_category.length;k++){
         var pie_category:number =+this.postDataHome.a_category[k]
         
        pie[k] = {
          name: this.postDataHome.all_category[k],
          y:pie_category
        }
       
       
       }
        let myChart = HighCharts.chart('simplePie', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: ''
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y} ea</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: 'black'
                }
              }
            }
          },
          series: [{
            name: 'Quantity',
            colorByPoint: true,
            type: undefined,
            data: pie
            
          }]
        });
        
      }


      plotSimplePieChartStatus() {
    
        let pie =[];
        
        
        (<HTMLInputElement> document.getElementById("graph2")).style.display = "block";
       
       for(let k =0; k<6;k++){
         var pie_category:number =+this.postDataHome.a_category[k]
         
        pie[k] = {
          name: ['ปกติ', 'ซ่อม', 'เสีย','ตัดจำหน่าย','นำเข้าใหม่','โอนย้าย'],
          y:[2,1,2,2,3,4]
        }
       
       
       }
        let myChart = HighCharts.chart('simplePie', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: ''
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y} ea</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: 'black'
                }
              }
            }
          },
          series: [{
            name: 'Quantity',
            colorByPoint: true,
            type: undefined,
            data: pie
            // [{
            //   name: 'ปกติ',
            //   y: '3'
            // }]
            
          }]
        });
        
      }





    
      doRefresh(event) {
        console.log('Begin async operation');
        this.presentLoading()
     
        setTimeout(() => {
          console.log('Async operation has ended');
          event.target.complete();
        }, 2000);
      }
      refreshPage(){
        window.location.reload();
    } 
      createDB() {
        
        this.sqlite.create({
          name: this.database_name,
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            this.databaseObj = db;
          })
          .catch(e => {
            alert("error " + JSON.stringify(e))
          });
      }
      
      // Create table
      createTable() {
        
        this.databaseObj.executeSql(`
        CREATE TABLE IF NOT EXISTS ${this.table_name}  (ID INTEGER PRIMARY KEY, A_No varchar(50),Location varchar(50),Employees varchar(50),Status varchar(50),Cause varchar(50),Error varchar(50))
        `, [])
          .then(() => {
          
          })
          .catch(e => {
            alert("error " + JSON.stringify(e))
          });
      }

    
    
      loadData(event){
       
        console.log('das')
        setTimeout(() => {
          if(this.postDataHome.t == '1'){
         if(this.data.length >this.dataService.dataHome.eleHistoryID.length ){
          event.target.complete();
          this.infiniteScroll.disabled =true;
          return;
         }
         if(this.dataService.dataHome.eleHistoryID.length <= 10){
          event.target.complete();
          this.infiniteScroll.disabled =true;
          return;
         }
        }
        else if(this.postDataHome.t == '3'){
         if(this.data.length >this.dataService.dataHome.searchID.length){
          event.target.complete();
          this.infiniteScroll.disabled =true;
          return;
         }
         if(this.dataService.dataHome.searchID.length <= 10){
          event.target.complete();
          this.infiniteScroll.disabled =true;
          return;
         }
        }
        
          const nArr = Array(10);
          this.data.push( ...nArr);
          event.target.complete();
          
        }, 1000);
        this.checkStatus()
      }
    
      async presentLoading() {
         
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
          duration: 5000
        });
        await loading.present();
    
        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');
      }
    
  
    async test(){
      this.dataService.dataHome.search =[]
      
      // this.infiniteScroll.disabled =false;
      if(this.postDataHome.A_No == ''){
        this.presentAlert('กรุณากรอกข้อมูล')
      }else{
        this.data = Array(20)
       if(this.postDataHome.t == '1' ){
         
        (<HTMLInputElement> document.getElementById("color_status")).style.display ="block";
        // (<HTMLInputElement> document.getElementById("list1")).style.display = "block";
        (<HTMLInputElement> document.getElementById("card2")).style.display = "block";
        // (<HTMLInputElement> document.getElementById("item1")).style.display = "none";
        (<HTMLInputElement> document.getElementById("card3")).style.display = "block";
        (<HTMLInputElement> document.getElementById("cardload")).style.display = "none";
        (<HTMLInputElement> document.getElementById("cardload2")).style.display = "none";
        (<HTMLInputElement> document.getElementById("top")).style.display = "none";
        
        (<HTMLInputElement> document.getElementById("cardEmp")).style.display = "none";
        
        this.allHistory();
        this.selectAction();
       
        this.postDataHome.A_No =''
      }
      if(this.postDataHome.t == '2' ){
        // (<HTMLInputElement> document.getElementById("list1")).style.display = "none";
        (<HTMLInputElement> document.getElementById("card2")).style.display = "none";
        (<HTMLInputElement> document.getElementById("card3")).style.display = "none";
        (<HTMLInputElement> document.getElementById("color_status")).style.display ="none";
        (<HTMLInputElement> document.getElementById("cardEmp")).style.display = "block";
        // (<HTMLInputElement> document.getElementById("item1")).style.display = "block";
        (<HTMLInputElement> document.getElementById("cardload")).style.display = "none";
        (<HTMLInputElement> document.getElementById("cardload2")).style.display = "none";
        (<HTMLInputElement> document.getElementById("top")).style.display = "none";
        this.searchEmployees()
        this.onNoClick()
        this.postDataHome.A_No = ''
        
      }
      
    
    }
    }
    checkStatus(){
    
      for(let i =0; i<this.dataService.dataHome.eleHistoryID.length;i++){
      if(this.dataService.dataHome.eleHistoryID[i][1]=='1'){
      (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='green';
        }
      else if(this.dataService.dataHome.eleHistoryID[i][1]=='2'){
      (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='red';
        }
      else if(this.dataService.dataHome.eleHistoryID[i][1]=='3'){
     (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='blue';
       }
       else if(this.dataService.dataHome.eleHistoryID[i][1]=='4'){
      (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='rgb(140, 211, 172)';
       }
      else if(this.dataService.dataHome.eleHistoryID[i][1]=='5'){
      (<HTMLInputElement> document.getElementById("text_history"+i)).style.color='lightsalmon';
       }
      else if(this.dataService.dataHome.eleHistoryID[i][1]=='6'){
      (<HTMLInputElement> document.getElementById("text_history"+i)).style.color=':mediumpurple';
        }
      }
    }
    allHistory(){
      if(this.platform.is('desktop')){
        (<HTMLInputElement>document.getElementById('status_text')).style.display="block";
      }
      this.dataService.dataHome.eleHistoryID = []
      this.postDataHome.getH=''
      if(this.postDataHome.A_No != ''){
      this.authService.getHistory(this.postDataHome).subscribe((res:any)=>{
        if(res==''){
          this.dataService.dataHome.eleHistoryID[0] = "ไม่พบข้อมูล"
        
        }else{
        let result =[res];
        let list = [];
        let i = 0 ;
        
        result.forEach(element => {
        list.push(element);
        console.log(element)
        
          try{
          do{
            let a = 0
            let b =0
             let dateString =  element[i].history_date
        
             let newDate = new Date(dateString)
             let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy HH:mm:ss');
            let id = element[i].id
            if(element[i].statusid == "ปกติ"){
              a = 1
        
            }
            if(element[i].statusid == "เสีย"){
               a = 2
           
            }
            if(element[i].statusid == "ส่งซ่อม"){
               a = 3
            }
            if(element[i].statusid == "ตัดจำหน่าย"){
              a = 4
           }
            if(element[i].statusid == "นำเข้าใหม่"){
            a = 5
           }
            if(element[i].statusid == "โอนย้าย"){
            a = 6
           }
            this.dataService.dataHome.eleHistoryID[i] = [[" Status:"+ element[i].statusid],[a]]
            this.dataService.dataHome.status_history[i] = "Date:" + latest_date  + "  A-No:"  + element[i].material.A_No + "  EmpID:" + element[i].employeesid + " Location:" + element[i].locationid
            this.postDataHome.history_date[i] = latest_date
            this.postDataHome.history_A_No[i] = element[i].material.A_No
            this.postDataHome.history_empID[i] = element[i].employeesid
            this.postDataHome.history_location[i] = element[i].locationid
            this.postDataHome.history_status[i]
            i++
         
          }while(element[i].material.A_No  != undefined)
          
         
        }catch{}
        
        })
        
      } 
      this.checkStatus()
      this.data = Array(30)
      console.log(this.dataService.dataHome.eleHistoryID.length)
      if(this.dataService.dataHome.eleHistoryID.length < this.data.length){
        this.data = Array(this.dataService.dataHome.eleHistoryID.length)
      }
      console.log(this.data.length)
      })
      // this.postData.A_No =''
    }
    
    }
    
    async selectAction(){
      await this.authService.Select(this.postDataHome).subscribe((res:any)=>{
        if(res == false){
          alert("ไม่พบA-Number")
          this.dataService.dataHome.A_No = ''
          this.dataService.dataHome.ITNo = ''
          this.dataService.dataHome.emp_ID = ''
          this.dataService.dataHome.Empname = ''
          this.dataService.dataHome.Department= ''
          this.dataService.dataHome.room= ''
        }
          
        
        if((res.employees == null || res.employees == '') && (res.location == null || res.location == '')){
                    this.dataService.dataHome.ITNo = 'ไม่พบ'
                    this.dataService.dataHome.emp_ID = 'ไม่พบ'
                    this.dataService.dataHome.Empname= 'ไม่พบ'
                    this.dataService.dataHome.Department= 'ไม่พบ'
                    this.dataService.dataHome.room= 'ไม่พบ'
    
                    //this.dataService.dataHome.EmpID = res.employees.id
                  }else if(res.employees == null || res.employees == ''){
    
                    this.dataService.dataHome.emp_ID = 'ไม่พบ'
                    this.dataService.dataHome.Empname= 'ไม่พบ'
                    this.dataService.dataHome.Department= 'ไม่พบ'
                    this.dataService.dataHome.room= res.locationname
     
                  }else if(res.location == null || res.location == ''){
    
                    this.dataService.dataHome.emp_ID = res.employees.id
                    this.dataService.dataHome.Empname= res.employees.emp_Name
                    this.dataService.dataHome.Department= res.employees.emp_Department
                    this.dataService.dataHome.room= 'ไม่พบ'
     
                   }
                    else{
             
                    this.dataService.dataHome.emp_ID = res.employees.emp_ID
                    this.dataService.dataHome.Empname = res.employees.emp_Name
                    this.dataService.dataHome.Department = res.employees.emp_Department
                    this.dataService.dataHome.room = res.locationname
          }
        this.dataService.dataHome.A_No = res.A_No
        this.dataService.dataHome.ITNo = res.IT_No
        this.dataService.dataHome.emp_ID = res.employees.id
        this.dataService.dataHome.Empname = res.employees.emp_Name
        this.dataService.dataHome.Department= res.employees.emp_Department
        this.dataService.dataHome.room= res.locationname
      },(err)=>
      this.presentAlert('ไม่สามารถค้นหาได้')
      )
    
    }
    
     searchEmployees(){
     this.dataService.dataHome.search_all = this.postDataHome.A_No
      this.dataService.dataHome.A = []
      this.dataService.dataHome.An = []
      this.dataService.dataHome.IT = [] 
      this.dataService.dataHome.ID = ''
      this.dataService.dataHome.Dep = ''
      this.dataService.dataHome.Name = ''
      this.dataService.dataHome.searchID = []
      this.dataService.dataHome.A_No=''
      this.dataService.dataHome.ITNo=''
      this.dataService.dataHome.emp_ID=''
      this.dataService.dataHome.Department=''
      this.dataService.dataHome.Empname=''
      this.dataService.dataHome.room=''
      this.authService.searchAll(this.postDataHome).subscribe((res:any)=>{
        if(res == ''){
          this.dataService.dataHome.searchID[0] = "ไม่พบข้อมูล";
          this.postDataHome.search_a[0]  ='';
          
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
            this.dataService.dataHome.A[j] = element[j].A_No
            this.dataService.dataHome.An[j] = element[j].A_Name
            this.dataService.dataHome.IT[j] = element[j].IT_No
            this.dataService.dataHome.ID = element[j].employees.emp_ID
            this.dataService.dataHome.Dep = element[j].employees.emp_Department
            this.dataService.dataHome.Name =  element[j].employees.emp_Name
            this.postDataHome.search_a[j] = element[j].A_No
            this.dataService.dataHome.search[j] = element[j].A_No
         
            
            this.dataService.dataHome.searchID[j] = "A-Number: " + element[j].A_No + "  Brand: " + element[j].A_Name + "  IT-Number: " +element[j].IT_No
           j++
            
           console.log(this.postDataHome.search_a)
          
          }while(element[j].employees.emp_ID != undefined)
          
        }catch{ 
        }
        })
      }
      
      if(this.dataService.dataHome.searchID.length < this.data.length){
        this.data = Array(this.dataService.dataHome.searchID.length)
      }
     },(err)=>
      this.presentAlert('ไม่สามารถค้นหาได้')
     )
        }
    
    
        // searchLocation(){
        //   this.dataService.dataHome.A = []
        //   this.dataService.dataHome.An = []
        //   this.dataService.dataHome.IT = [] 
        //   this.dataService.dataHome.locationName = ''
         
        //   this.dataService.dataHome.searchID = []
        //   this.authService.searchAll(this.postData).subscribe((res:any)=>{
        //     if(res == ''){
        //       this.dataService.dataHome.searchID[0] = "ไม่พบข้อมูล"
        //     }else{
        //     let result =[res]
        //     let list2 = [];
        //     let j = 0 ;
        // // console.log(res[0].employees.emp_ID)
        //     //alert(res)
        //     result.forEach(element => {
        //     list2.push(element);
        //     try{
        //       do{
        //         this.dataService.dataHome.A[j] = element[j].A_No
        //         this.dataService.dataHome.An[j] = element[j].A_Name
        //         this.dataService.dataHome.IT[j] = element[j].IT_No
        //        this.dataService.dataHome.locationName = element[j].location.location_Name
                
        //        this.dataService.dataHome.search[j] = element[j].A_No
        //         this.dataService.dataHome.searchID[j] = "A-Number: " + element[j].A_No + "  Brand: " + element[j].A_Name + "  IT-Number: " +element[j].IT_No
        //        j++
               
        //       }while(element[j].location.location_Name != undefined)
              
        //     }catch{ 
        //     }
        //     })
        //   }
        //   if(this.dataService.dataHome.searchID.length < this.data.length){
        //     this.data = Array(this.dataService.dataHome.searchID.length)
        //   }
        //  })
        //     }
    
            searchAname(){
              this.dataService.dataHome.A = []
              this.dataService.dataHome.An = []
              this.dataService.dataHome.IT = [] 
              this.dataService.dataHome.locationName = ''
             
              this.dataService.dataHome.searchID = []
              this.authService.searchAll(this.postDataHome).subscribe((res:any)=>{
                if(res == ''){
                  this.dataService.dataHome.searchID[0] = "ไม่พบข้อมูล"
                  
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
                    this.dataService.dataHome.A[j] = element[j].A_No
                    this.dataService.dataHome.An[j] = element[j].A_Name
                    this.dataService.dataHome.IT[j] = element[j].IT_No
                   this.dataService.dataHome.Aname = element[j].A_No
                    
                   this.dataService.dataHome.search[j] = element[j].A_No
                    this.dataService.dataHome.searchID[j] = "A-Number: " + element[j].A_No + "  Brand: " + element[j].A_Name + "  IT-Number: " +element[j].IT_No
                   j++
                   
                  }while(element[j].location.location_Name != undefined)
                  
                }catch{ 
                }
                })
              }
              if(this.dataService.dataHome.searchID.length < this.data.length){
                this.data = Array(this.dataService.dataHome.searchID.length)
              }
             })
                }
      
    
    
                selectAction2(i){
                
                  if(this.platform.is('desktop')){      
                  // (<HTMLInputElement> document.getElementById("cardA2")).style.display = "block";
                  let isOpen = false;
                  // document.addEventListener('DOMContentLoaded', () => {
                    
                    let targets = document.getElementById('wrapper');
                 
                  if (isOpen) {
                    anime({
                      targets,
                      height: 0,
                      opacity: [1, 0],
                      duration: 400,
                      easing: 'easeOutQuad',
                      complete() {
                        isOpen = false;
                        (<HTMLInputElement> document.getElementById('wrapper')).style.display = '';
                      }
                    });
                  } else {
                    isOpen = true;
                    (<HTMLInputElement> document.getElementById('wrapper')).style.display = 'block';
                    (<HTMLInputElement> document.getElementById('wrapper')).style.height = '0px';
                    anime({
                      targets,
                      height: el => el.scrollHeight,
                      opacity: [0, 1],
                      duration: 400,
                      easing: 'easeOutCubic'
                    });
                  }
                  }else{
                 this.edit();
                //  (<HTMLInputElement> document.getElementById("cardA2")).style.display = "none";
                  }
                 
                  this.dataService.dataHome.EmpID = '';
                this.dataService.dataHome.Empname = '';
                this.dataService.dataHome.Department = '';
                  this.authService.Select3( this.postDataHome.search_a[i]).subscribe((res:any)=>{
                    
                    console.log(res)
                    console.log(this.postDataHome.search_a[i])
                    // try{ 
                    this.dataService.dataHome.A_No = res.A_No
                   if(res.A_No == this.postDataHome.search_a[i] ){
                      this.dataService.dataHome.A_No = res.A_No
                      this.dataService.dataHome.Aname = res.A_Name
                      this.dataService.dataHome.ITNo = res.IT_No
                      this.dataService.dataHome.description = res.description
                      this.dataService.dataHome.serial_number = res.serial_number
                      this.dataService.dataHome.manufacturer = res.manufacturer
                      if((res.employees == null || res.employees == '') && (res.location == null || res.location == '')){
                        this.dataService.dataHome.EmpID = 'ไม่พบ'
                        this.dataService.dataHome.emp_ID = 'ไม่พบ'
                        this.dataService.dataHome.Empname= 'ไม่พบ'
                        this.dataService.dataHome.Department= 'ไม่พบ'
                        this.dataService.dataHome.room= 'ไม่พบ'
                        this.dataService.dataHome.getStatus = res.status.type
                        //this.dataService.dataHome.EmpID = res.employees.id
                      }else if(res.employees == null || res.employees == ''){
                        this.dataService.dataHome.EmpID = 'ไม่พบ'
                        this.dataService.dataHome.emp_ID = 'ไม่พบ'
                        this.dataService.dataHome.Empname= 'ไม่พบ'
                        this.dataService.dataHome.Department= 'ไม่พบ'
                        this.dataService.dataHome.room= res.locationname
                        this.dataService.dataHome.getStatus = res.status.type
                      }else if(res.location == null || res.location == ''){
                        this.dataService.dataHome.EmpID = res.employees.emp_ID
                        this.dataService.dataHome.emp_ID = res.employees.id
                        this.dataService.dataHome.Empname= res.employees.emp_Name
                        this.dataService.dataHome.Department= res.employees.emp_Department
                        this.dataService.dataHome.room= 'ไม่พบ'
                        this.dataService.dataHome.getStatus = res.status.type
                        
                      }
                      else{
                       
                      this.dataService.dataHome.emp_ID = res.employees.emp_ID
                      this.dataService.dataHome.EmpID = res.employees.id
                      this.dataService.dataHome.Empname = res.employees.emp_Name
                      this.dataService.dataHome.Department = res.employees.emp_Department
                      this.dataService.dataHome.room = res.locationname
                      this.dataService.dataHome.locationID = res.location.id
                      this.dataService.dataHome.status = res.status.id
                      this.dataService.dataHome.getStatus = res.status.type
                      this.dataService.dataHome.description = res.description
                      this.dataService.dataHome.serial_number = res.serial_number
                      this.dataService.dataHome.manufacturer = res.manufacturer
                      }
                      this.dataService.dataHome.edit = '1';
                      this.postDataHome.A_No = '';
    
                    }
                    if(res.A_No == null){
                      // alert("ไม่พบรหัส A-Number");
                      this.dataService.dataHome.A_No = '';
                      this.postDataHome.A_No='';
                      this.dataService.dataHome.ITNo = '';
                      this.dataService.dataHome.emp_ID = '';
                      this.dataService.dataHome.Empname = '';
                      this.dataService.dataHome.Department = '';
                      this.dataService.dataHome.Locationname = '';
                      this.dataService.dataHome.locationID='';
                      this.dataService.dataHome.EmpID = '' ;
                      this.dataService.dataHome.status = '';
                      this.dataService.dataHome.getStatus = '';
                      this.dataService.dataHome.room = '';
                      this.onNoClick()
                    }
    
                  })      
    
              }
    onNoClick(){
          let isOpen = false;
    
        
            let targets = document.getElementById('wrapper');
            anime({
              targets,
              height: 0,
              opacity: [1, 0],
              duration: 400,
              easing: 'easeOutQuad',
              complete() {
                isOpen = false;
                (<HTMLInputElement> document.getElementById('wrapper')).style.display = '';
              }
            });
    }
    
    lastHistory(){
      
      this.authService.lastHistory(this.postDataHome).subscribe((res)=>{
        let dateString =  res.history_date
        
        let newDate = new Date(dateString)
        let latest_date =this.datepipe.transform(newDate, 'dd-MMM-yyyy');
          this.dataService.dataHome.lastdate =  latest_date
    })
    }
    
    async countDateHistory(){
      
      let isOpen = false;
      let targets = document.getElementById('wrapper_lastupdate');
      
      if (isOpen) {
       await anime({
          targets,
          height: 0,
          opacity: [1, 0],
          duration: 400,
          easing: 'easeOutQuad',
          complete() {
            isOpen = false;
            (<HTMLInputElement> document.getElementById('wrapper_lastupdate')).style.display = '';
          }
        });
      } else {
        isOpen = true;
        (<HTMLInputElement> document.getElementById('wrapper_lastupdate')).style.display = 'block';
        (<HTMLInputElement> document.getElementById('wrapper_lastupdate')).style.height = '0px';
        anime({
          targets,
          height: el => el.scrollHeight,
          opacity: [0, 1],
          duration: 400,
          easing: 'easeOutCubic'
        });
      }
      let i = 0;
      let j = 0;
      let list =[]
    
      await this.authService.countDateHistory(this.postDataHome).subscribe((res)=>{
    
        let result = [res]
        result.forEach(element => {
          list.push(element);
            
          do{
              // let dateString = element[i].history_Date
              // let date_history = new Date(dateString)
              // let new_history_date = this.datepipe.transform(date_history, 'yyyy-MM-dd')
            
            console.log(element[i])
            i++
            j++
          }while(i < element.length);
          
        
           
          
          })
      })
    
    }
    
    countAllDateHistory(){
      let date_now = new Date()
      this.postDataHome.date_month = this.datepipe.transform(date_now,'MM')
      this.postDataHome.date_year = this.datepipe.transform(date_now,'yyyy')
      this.authService.countAllDateHistory(this.postDataHome).subscribe((res)=>{
      
          this.postDataHome.count_a = res[0].Count
    
      })
      
    }
    
    edit(){
      this.router.navigate(['edit']);
    }
    asset(){
      this.router.navigate(['assetlist']);
    }
    
    clickHome(){
      window.location.reload();
    }
    
    async presentAlert(message) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Subtitle',
        message: message,
        buttons: ['OK']
      });
    
      await alert.present();
    }

editSearch(){
  console.log('t');
  (<HTMLInputElement> document.getElementById('wrapper-A_No')).readOnly =true;
  (<HTMLInputElement> document.getElementById('wrapper-IT_No')).readOnly =false;
  (<HTMLInputElement> document.getElementById('wrapper-department')).readOnly =false;
  (<HTMLInputElement> document.getElementById('wrapper-emp')).readOnly =false;
  (<HTMLInputElement> document.getElementById('wrapper-name')).readOnly =false;
  (<HTMLInputElement> document.getElementById('wrapper-location')).readOnly =false;
  (<HTMLInputElement> document.getElementById('wrapper-description')).readOnly =false;
  (<HTMLInputElement> document.getElementById('wrapper-serial_number')).readOnly =false;
  (<HTMLInputElement> document.getElementById('wrapper-manufacturer')).readOnly =false;
}

showHistory(){
  this.authService.GetShowHistory().subscribe((res)=>{
    let result =[res];
    let list = [];
    let i = 0 ;
    
    result.forEach(element => {
    list.push(element);
    console.log(element)
    
      try{
      do{
        let a = 0
        let b =0
         let dateString =  element[i].history_date
         let dateNow = new Date()
         let historyDate = new Date(dateString)
         let dateNow_sec = dateNow.getTime()/1000;
         let historyDate_sec = historyDate.getTime()/1000;
         let latest_date =this.datepipe.transform(historyDate, 'dd-MMM-yyyy HH:mm:ss');
         let lastDate = dateNow_sec - historyDate_sec 
         let showDate_y =Math.floor(lastDate/31556926);
         let showDate_M = Math.floor(lastDate/2629743)
         let showDate_w = Math.floor(lastDate/604800);
         let showDate_d = Math.floor(lastDate/86400);
         let showDate_h = Math.floor(lastDate/3600);
         let showDate_m = Math.floor(lastDate % 3600 / 60);
         let showDate_s = Math.floor(lastDate % 3600 % 60);
         let latest_date2 =this.datepipe.transform(dateNow, 'dd-MMM-yyyy HH:mm:ss');
    
         let yDisplay = showDate_y > 0 ? showDate_y + (showDate_y == 1 ? " year " : " years "):"";
         let MDisplay = showDate_M > 0 ? showDate_M + (showDate_M == 1 ? " month " : " months "):"";
         let dDisplay = showDate_d > 0 ? showDate_d + (showDate_d == 1 ? " day " : " days "):"";
         let wDisplay = showDate_w > 0 ? showDate_w + (showDate_w == 1 ? " week " : " weeks "):"";
         let hDisplay = showDate_h > 0 ? showDate_h + (showDate_h == 1 ? " hour " : " hours ") : "";
         let mDisplay = showDate_m > 0 ? showDate_m + (showDate_m == 1 ? " min " : " min ") : "";
         let sDisplay = showDate_s > 0 ? showDate_s + (showDate_s == 1 ? " sec" : " sec ") : "";
         if(showDate_s <= 60 && showDate_m ==0){
          var showDate = sDisplay
         }else if(showDate_m <=60 && showDate_h ==0){
           var showDate = mDisplay
         }else if(showDate_h <= 24){
           var showDate = hDisplay 
         }else if(showDate_d <=7){
            var showDate = dDisplay 
         }else if(showDate_d <=30){
            var showDate = wDisplay
         }else if(showDate_d <=365){
           var showDate = MDisplay
         }else{
           var showDate = yDisplay 
         }
         
        
        
        this.postDataHome.show_history_update_date[i] = showDate+"ago"
        this.postDataHome.show_history_A_No[i] = element[i].a_No 
        
        this.postDataHome.show_history_status[i]= element[i].t_type
        this.postDataHome.show_history_detail[i]= element[i].detail
        this.postDataHome.show_history_update_by[i] = element[i].update_by
        this.postDataHome.show_history[i] = "A-Number: "+ element[i].a_No +" Update By: "+ element[i].update_by
        // alert(this.postDataHome.show_history[i] )
        if(this.postDataHome.show_history_status[i] == 'ปกติ') {
          this.postDataHome.icon[i] = 'flash-outline'
          this.postDataHome.status_color[i] = 'label-green'
         }
         if(this.postDataHome.show_history_status[i] == 'ส่งซ่อม') {
          this.postDataHome.icon[i] = 'construct-outline'
          this.postDataHome.status_color[i] = 'label-blue'
         }
         if(this.postDataHome.show_history_status[i] == 'เสีย') {
          this.postDataHome.icon[i] = 'flash-off-outline'
          this.postDataHome.status_color[i] = 'label-red'
         }
         if(this.postDataHome.show_history_status[i] == 'ตัดจำหน่าย') {
          this.postDataHome.icon[i] = 'trash-outline'
          this.postDataHome.status_color[i] = 'label-black'
         }
         if(this.postDataHome.show_history_status[i] == 'นำเข้าใหม่') {
          this.postDataHome.icon[i] = 'add-circle-outline'
          this.postDataHome.status_color[i] = 'label-lightsalmon'
         }
         if(this.postDataHome.show_history_status[i] == 'โอนย้าย') {
          this.postDataHome.icon[i] = 'shuffle-outline'
          this.postDataHome.status_color[i] = 'label-mediumpurple'
         }


        i++
     
      }while(i  != 20)
      
     
    }catch{}
    
    })
  })
}




init() {
  this.svg = d3.select('#barChart')
    .append('svg')
    .attr('width', '80%')
    .attr('height', '40%')

    .attr('viewBox', '-10 0 900 500');
  this.g = this.svg.append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
}

initAxes() {
  this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
  this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
  this.x.domain(this.barData.map((d) => d.season));
  this.y.domain([0, d3Array.max(this.barData, (d) => d.viewers)]);
}

drawAxes() {
  this.g.append('g')

    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(d3Axis.axisBottom(this.x))
    .attr('font-size', '30');
  this.g.append('g')

    .attr('class', 'axis axis--y')
    .call(d3Axis.axisLeft(this.y))
    .attr('font-size','20')
    .append('text')
    .attr('class', 'axis-title')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .attr('fill', '#1b59a4')
    .attr('font-size', '50')
    .text('viewers');
}

drawChart() {
  this.g.selectAll('.bar')
    .data(this.barData)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('fill', '#1b59a4')
    .attr('x', (d) => this.x(d.season))
    .attr('y', (d) => this.y(d.viewers))
    .attr('width', this.x.bandwidth())
    .attr('height', (d) => this.height - this.y(d.viewers));
}


initSvg() {
  this.color = d3Scale.scaleOrdinal()
    .range(["#2780ea", "#578fed", "#779ef0", "#91adf3", "#a9bdf6", "#c0cdf8", "#d5ddfb", "#eaeefd", "#c1e7ff"]);
  this.arc = d3Shape.arc()
    .outerRadius(this.radius - 10)
    .innerRadius(0);
  this.labelArc = d3Shape.arc()
    .outerRadius(this.radius - 40)
    .innerRadius(this.radius - 40);

  this.labelPer = d3Shape.arc()
    .outerRadius(this.radius - 80)
    .innerRadius(this.radius - 80);

  this.pie = d3Shape.pie()
    .sort(null)
    .value((d: any) => d.fanP);

  this.svg = d3.select('#pieChart')
    .append('svg')
    .attr('width', '80%')
    .attr('height', '40%')
    .attr('viewBox', '-10 0 900 500')
    .append('g')
    .attr('transform', 'translate(' + Math.min(this.width, this.height) / 2 + ',' + Math.min(this.width, this.height) / 2 + ')');
}

drawPie() {
  
  const g = this.svg.selectAll('.arc')
    .data(this.pie(this.pieData))
    .enter().append('g')
    .attr('class', 'arc');
  g.append('path').attr('d', this.arc)
    .style('fill', (d: any) => this.color(d.data.actor));
  g.append('text')
    .attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
    .attr('font-size', '20')
    .attr('dy', '.3em')
    .text((d: any) => d.data.actor);
    g.append('text')
    .attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
    .attr("x", 0)
          .attr("y", "1.8em")          
          .attr('font-size', '17')
          .text(d => d.data.fanP);

  g.append('text').attr('transform', (d: any) => 'translate(' + this.labelPer.centroid(d) + ')')
}

async clear(){
    d3.selectAll('svg').remove()
}

public async get(){

  return [this.dataService.profile.fname = await this.storage.get(`fristname`),
  this.dataService.profile.lname = await this.storage.get(`lastname`),
  this.dataService.profile.username = await this.storage.get(`username`),
  this.dataService.profile.expire = await this.storage.get(`expire`),
  this.dataService.profile.empno = await this.storage.get(`empno`),
  this.dataService.profile.department = await this.storage.get(`department`)];  
}

public async storageExpire(){
  await this.get();
  
  let datenow = new Date()
  let datenow_sec = datenow.getTime()/1000;
  
  console.log(this.dataService.profile.username)
  if(this.dataService.profile.expire < datenow_sec ){

    this.storage.clear().then(() => {
      this.router.navigate(['employeelogin']);
    });
  }

}

async getLocation(){
    
  this.authService.GetJobSite('').subscribe(res=>{
   
     this.dataService.dataLocation.location[0] = res[0].JobNo
    //  var obj = {Location:this.dataService.dataLocation.location[0]}
     this.dataService.obj = {Location:this.dataService.dataLocation.location[0]}
     this.dataService.arrL.push(this.dataService.obj)
    let j =1
    let i =1
       
           do{
              
            if(res[j].JobNo != res[j-1].JobNo){
          this.dataService.dataLocation.location[i] = res[j].JobNo
          var obj = {Location:this.dataService.dataLocation.location[i]}
          this.dataService.obj = {Location:this.dataService.dataLocation.location[i]}
          this.dataService.arrL.push(this.dataService.obj)
          this.dataService.arrL1 = this.dataService.arrL
          i++
            }

        j++
          }while(res[j].JobNo != undefined)
        
  })
  
}


}
