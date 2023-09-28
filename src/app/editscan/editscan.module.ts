import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditscanPageRoutingModule } from './editscan-routing.module';

import { EditscanPage } from './editscan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditscanPageRoutingModule
  ],
  declarations: [EditscanPage]
})
export class EditscanPageModule {}
