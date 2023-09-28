import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
import {PopoverController} from '@ionic/angular';
import { DataService } from '../data.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private popover :PopoverController,
    private router : Router,
    private storage : Storage,
    private dataService : DataService) { }

  ngOnInit() {
  }
 logout(){
  if (this.dataService.currentPopover) {
    this.dataService.currentPopover.dismiss().then(() => { this.dataService.currentPopover = null; });
  }
  this.storage.clear().then(() => {
    this.router.navigate(['employeelogin']);
  });
 }
 clickHistory(){
  if (this.dataService.currentPopover) {
    this.dataService.currentPopover.dismiss().then(() => { this.dataService.currentPopover = null; });
  }
   this.router.navigate(['historyupdate'])
 }
}
