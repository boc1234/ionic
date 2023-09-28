import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as HighCharts from 'highcharts';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { Platform } from '@ionic/angular';
import { Chart } from 'chart.js';
import Swal from 'sweetalert2'
import { OperationService } from '../operation.service'
import * as d3Shape from 'd3-shape';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage';
import { DataService } from '../data.service';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-mobilehome',
  templateUrl: './mobilehome.page.html',
  styleUrls: ['./mobilehome.page.scss'],
})
export class MobilehomePage implements OnInit {
  @ViewChild('barChart') barChart;
  public postDataHome={
    icon:[],
    status_color:[],
    show_history_update_date:[],
    show_history_A_No:[],
    show_history_status:[],
    show_history_update_by:[],
    show_history:[],
    show_history_detail:[],
  }
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
    { season: 'Jan', viewers: 400 },
    { season: 'Feb', viewers: 380 },
    { season: 'Mar', viewers: 400 },
    { season: 'Apr', viewers: 190 },
    { season: 'May', viewers: 90 },
    { season: 'Jun', viewers: 40 },
    { season: 'Jul', viewers: 100 },
    { season: 'Aug', viewers: 120 },
    { season: 'Sep', viewers: 90 },
    { season: 'Oct', viewers: 50 },
    { season: 'Nov', viewers: 100 },
    { season: 'Dec', viewers: 110 }
  ];
  title = 'Test';
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
  range:any =200;
  range_upper:any;
  range_lower:any;
  data:any[]=Array(20)
  databaseObj: SQLiteObject;
  row_expire:any =[]
  expire=''
  expire_id=''
readonly database_name: string = "IT_ASSET.db";
readonly table_location: string = "Location";
readonly table_time: string = "Time";
  constructor(private router:Router,
              private operation : OperationService,
              private authService:AuthService,
              public datepipe:DatePipe,
              private storage : Storage,
              private dataService : DataService,
              private sqlite: SQLite,
              private platform : Platform,
        ) { 
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2.5;
    this.platform.ready().then(() => {
     
    }).catch(error => {
      console.log(error);
      
    })
  }


  async createDB() {
   await this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
     
        this.createTableLocation()
        this.createTableTime()
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    }
    createTableLocation() {

      this.databaseObj.executeSql(`
      CREATE TABLE IF NOT EXISTS ${this.table_location}  (ID INTEGER PRIMARY KEY, Location varchar(50) )
      `, [])
        .then(() => {
      
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
      }
      createTableTime() {
    
        this.databaseObj.executeSql(`
        CREATE TABLE IF NOT EXISTS ${this.table_time}  (ID INTEGER PRIMARY KEY, Expire date )
        `, [])
          .then(() => {

          })
          .catch(e => {
    
            alert("error " + JSON.stringify(e))
          });
        }

  slidesOptions ={
    slidesPerView:1.3,
    loop: true,
    autoplay: false,
    speed:1000,
  }
  doRefresh(event) {
    console.log('Begin async operation');
    window.location.reload();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  ra(){
    this.range_upper = this.range.upper
    this.range_lower = this.range.lower
    // console.log(this.range)
    this.createBarChart()
  }
   
 ngOnInit() {



  //  this.storageExpire();
   this.getLastHistory();
   this.showHistory();
   this.init();
    this.initAxes();
    this.drawAxes();
    this.drawChart();
    this.initSvg();
    this.drawPie();
    
  }
  ionViewDidEnter() {
  
      this.createBarChart();
  }

 
  changeData(){
    this.clearGraph();
  }

  createBarChart() {
    // (<HTMLInputElement> document.getElementById("graph")).style.display = "block";
    
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['ปกติ', 'ซ่อม', 'เสีย'],
        datasets: [{
          label: 'Viewers in millions',
          data: [50,100,this.range_lower],
          backgroundColor: ['#2780ea', '#1b59a4', '#cae2ff', '#95c5ff','#7faac6','#94bed9'], // array should have same number of elements as number of dataset
          borderColor: ['#004c6d', '#346888', '#5886a5', '#7aa6c2','#9dc6e0','#c1e7ff'],// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      // options: {
      //   scales: {
      //     yAxes: [{
      //       ticks: {
      //         beginAtZero: true
      //       }
      //     }]
      //   }
      // }
    });
  }

 init() {
  this.svg = d3.select('#barChart')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 900 500');
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
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 ' + Math.min(this.width, this.height) + ' ' + Math.min(this.width, this.height))
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

async clearGraph(){
  d3.selectAll('svg').remove()
}

 getContent() {
  return 
}


 scrollToTop() {
  document.querySelector('ion-content').scrollToTop(1500);
}
async test(){
  this.clearGraph()
  this.barData= 
  [ { season: 'S1', viewers: 150 },
  { season: 'S2', viewers: 480 },
  { season: 'S3', viewers: 200 },
  { season: 'S4', viewers: 690 },
  { season: 'S5', viewers: 390 },
  { season: 'S6', viewers: 550 },
  { season: 'S7', viewers: 700 },
  { season: 'S8', viewers: 470 }]
 this.init();
  this.initAxes();
  this.drawAxes();
  this.drawChart();
}
async test2(){
  this.clearGraph()
  this.barData= 
  [{ season: 'S1', viewers: 250 },
  { season: 'S2', viewers: 380 },
  { season: 'S3', viewers: 500 },
  { season: 'S4', viewers: 690 },
  { season: 'S5', viewers: 690 },
  { season: 'S6', viewers: 700 },
  { season: 'S7', viewers: 100 },
  { season: 'S8', viewers: 170 }]
 this.init();
  this.initAxes();
  this.drawAxes();
  this.drawChart();
}
showHistory(){
  this.authService.GetShowHistory().subscribe((res)=>{
    let result =[res];
    let list = [];
    let i = 0 ;
    
    result.forEach(element => {
    list.push(element);
    
    
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

testPage(){
  this.router.navigate(['updatematerial']);
}


lastdate:any
getLastHistory(){
  this.authService.GetLastHistory().subscribe(res=>{
  
    let latest_date =this.datepipe.transform(res.history_date, 'yyyy-MM-dd');
    this.lastdate = latest_date
  })
}

public async storageExpire(){
  await this.get();
  await this.createDB()
  
  let datenow = new Date()
  let datenow_sec = datenow.getTime()/1000;
  if(this.dataService.profile.expire < datenow_sec ){
    alert('หมดเวลา')
    this.storage.clear().then(() => {
      this.router.navigate(['employeelogin']);
    });
  }
  if(this.dataService.locationexpire < datenow_sec){
    this.loadLocation()
  }
  
}
public async get(){

  return [this.dataService.profile.fname = await this.storage.get(`fristname`),
  this.dataService.profile.lname = await this.storage.get(`lastname`),
  this.dataService.profile.username = await this.storage.get(`username`),
  this.dataService.profile.expire = await this.storage.get(`expire`),
  this.dataService.locationexpire = await this.storage.get(`locationexpire`)];
  
}


  async loadLocation(){

 let datenow = new Date()
 let datenow_sec = datenow.getTime()/1000;
 let expire = Math.floor(datenow_sec+(3600*100));
 let locationexpire = Math.floor(datenow_sec+(3600*168));


 await this.databaseObj.executeSql(`
  SELECT * FROM ${this.table_time}
  `
  , [])
  .then((res) => {

    this.row_expire = [];
    if (res.rows.length > 0){
      // alert(1)
      for (var i = 0; i < 1; i++) {

        
        this.expire = res.rows.item(0).Expire
        this.expire_id = res.rows.item(0).ID
        let newExpire = new Number(this.expire);
        // alert(newExpire)
        // alert(datenow_sec)
        if(this.expire != ''  && newExpire < datenow_sec ){
          this.databaseObj.executeSql(`
        UPDATE ${this.table_time}
        SET Expire = '${locationexpire}'
        WHERE ID = '${this.expire_id}'
      `, [])
        .then(() => {
          alert(2)
          this.getJob()
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });

        }
      }
    }else{
      this.databaseObj.executeSql(`
       INSERT INTO ${this.table_time} (Expire) VALUES ('${locationexpire}')
       `, [])
       .then(() => {
        this.getJob()
        })
    }

  })

}

getJob(){
   
  this.authService.GetJobSite('').subscribe(res=>{
   
    this.databaseObj.executeSql(`
    DELETE FROM ${this.table_location}
    `
      , [])
      .then((res) => {
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    let result =[res]
          // this.dataService.dataLocation.location[0] = res[0].JobNo
          let list = [];
          let j = 1 ;
          let i = 1;
        
        //   result.forEach(element => {
        //   list.push(element);
        //  console.log(element[j].JobNo)
        // this.location = res[j].JobNo
        this.databaseObj.executeSql(`
        INSERT INTO ${this.table_location} (Location) VALUES ('${res[0].JobNo}')
        `, [])
        .then(() => {
        })
          do{
            
            if(res[j].JobNo != res[j-1].JobNo){
              // this.dataService.dataLocation.location[i] = res[j].JobNo
             
              this.databaseObj.executeSql(`
              INSERT INTO ${this.table_location} (Location) VALUES ('${res[j].JobNo}')
              `, [])
              .then(() => {
           
              })
            }
            i++
            j++
          }while(res[j].JobNo != undefined)
  
             
          })
         
        // })
}


}
