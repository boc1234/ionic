import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {
  public postData={
    
  }
  constructor(private router : Router,
    private dataService : DataService,
    private platform : Platform,
    private authService : AuthService) { }

  ngOnInit() {
  }
  getUpdateHistory(){
    this.authService.GetUpdateHistory(this.postData).subscribe(res=>{
      console.log(res)
    })
  }
}
