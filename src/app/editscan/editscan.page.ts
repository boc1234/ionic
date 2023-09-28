import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
@Component({
  selector: 'app-editscan',
  templateUrl: './editscan.page.html',
  styleUrls: ['./editscan.page.scss'],
})
export class EditscanPage implements OnInit {

  constructor(public dataService:DataService,) { }

  ngOnInit() {
  }

}
