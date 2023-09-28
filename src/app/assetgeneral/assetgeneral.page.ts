import { Component, OnInit , ViewChild } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import {DataService} from '../data.service';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Plugins} from '@capacitor/core';
import {OperationService} from '../operation.service'
import {NewOperationService} from '../new-operation.service'
const {Keyboard} = Plugins;
@Component({
  selector: 'app-assetgeneral',
  templateUrl: './assetgeneral.page.html',
  styleUrls: ['./assetgeneral.page.scss'],
})
export class AssetgeneralPage implements OnInit {
  @ViewChild('myTextInput1') mInput;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
 isOpen:string='0'
 public postDataAssetGeneral={
  A_No:'',
  test:'',
  test2:[],
  s:'',
  s2:[],

 }
 data:any[]=Array(20)
 i:number = 0
 a:any = this.postDataAssetGeneral.test
 detailButton:any = 'colorWhite'
 purchaseButton:any ='colorWhite'
 historyButton:any ='colorWhite'
 scanButton:any = 'colorWhite'
  constructor(public dataService:DataService,
    private authService:AuthService,
    public datepipe:DatePipe,
    private platform: Platform,
    public barcodeScanner: BarcodeScanner,
    public loadingController: LoadingController,
    private router:Router,
    private navCtrl : NavController,
    public newOperationService : NewOperationService,
    public operation : OperationService) {
      this.platform.ready().then(async() => {

      }).catch(error => {
        console.log(error);
      })
     }
     slidesOptions ={
      slidesPerView:1.5
    }
    ionViewDidEnter(){
      // Plugins.Keyboard.addListener('keyboardWillShow', (info: any) => {
      //   Keyboard.hide();
      //  });
    //  (<HTMLInputElement>document.getElementById('myTextInput')).select();
     
    // (<HTMLInputElement>document.getElementById('myTextInput')).focus();
    }
    ionViewWillEnter(){
    //   setTimeout(() => {
    //     this.mInput.setFocus();
    //   }, 500);
     }
    ionViewWillLeave(){
      
    }

  ngOnInit() {
    setInterval(function() {
      let element:HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
  
    element.click(),5000;
   
      }, 3000); 
    //  Plugins.Keyboard.addListener('keyboardWillShow', (info: any) => {
      // Keyboard.hide();
    //  });
      

  }
  ngOnDestroy(){
  //  console.log("ngOnDestroy")
  //        Keyboard.removeAllListeners();
  
      this.dataService.postData.A_No=''
  }
  scanBarcode(){
    this.barcodeScanner.scan().then(barcodeData=>{
      console.log('Barcode data',barcodeData);
      this.dataService.postData.A_No=barcodeData.text;
    })
  }
async t(){
   
    (<HTMLInputElement>document.getElementById('myTextInput')).select();
    (<HTMLInputElement>document.getElementById('myTextInput')).focus();
  
  }
 changePageSearch(){
   Keyboard.removeAllListeners();
  this.router.navigate(['searchasset'])
}
click(){ 
    document.getElementById("t").click(),5000;
  }

ta(){
  alert(1)
  this.postDataAssetGeneral.s = this.postDataAssetGeneral.test;
}
clear(){
  this.postDataAssetGeneral.s = ''
  this.postDataAssetGeneral.test = ''
}


clickRefresh(){
  
  this.router.navigate(['mobilehome']);
}
clickDetail(){

  (<HTMLInputElement>document.getElementById('detail_page')).style.display="block";
  (<HTMLInputElement>document.getElementById('history_page')).style.display="none";
  (<HTMLInputElement>document.getElementById('purchase_page')).style.display="none";
}
clickHistory(){

  (<HTMLInputElement>document.getElementById('detail_page')).style.display="none";
  (<HTMLInputElement>document.getElementById('history_page')).style.display="block";
  (<HTMLInputElement>document.getElementById('purchase_page')).style.display="none";
}
clickPurchase(){
  
  (<HTMLInputElement>document.getElementById('detail_page')).style.display="none";
  (<HTMLInputElement>document.getElementById('history_page')).style.display="none";
  (<HTMLInputElement>document.getElementById('purchase_page')).style.display="block";
}




add(){
  this.postDataAssetGeneral.s2[this.i] = this.postDataAssetGeneral.s
  
 
  this.postDataAssetGeneral.test2[this.i] = this.postDataAssetGeneral.test
  alert(this.postDataAssetGeneral.test2.length)
  this.i++
}
async addMaterial(){
 

  let i =0
  do{
    alert(i)
   this.dataService.dataAssetList.A_No = await this.postDataAssetGeneral.test2[i]
    this.dataService.dataAssetList.serial_number = await this.postDataAssetGeneral.s2[i]
    this.dataService.dataAssetList.category = '666'
     this.authService.Select(this.dataService.dataAssetList).subscribe((res: any) => {
      if (this.dataService.dataAssetList.A_No != res.A_No) {
        this.authService.addMaterial(this.dataService.dataAssetList).subscribe(async (res: any) => {
          if (res[0] == true) {
            this.dataService.dataAssetList.status = 'นำเข้าใหม่';
            this.dataService.dataAssetList.detail = 'Add new asset';
            this.authService.addHistory(this.dataService.dataAssetList).subscribe((res: any) => {
              if (res == true) {
                alert('เพิ่มข้อมูลสำเร็จ');
              }
            });


            this.dataService.dataAddMaterial.A_No = '';
            this.dataService.dataAssetList.serial_number = '';


          }

        });
      }
    })
     i++
  }while(i < this.postDataAssetGeneral.test2.length)
}




}
