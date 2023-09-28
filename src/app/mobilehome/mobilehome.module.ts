import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobilehomePageRoutingModule } from './mobilehome-routing.module';

import { MobilehomePage } from './mobilehome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobilehomePageRoutingModule
  ],
  declarations: [MobilehomePage]
})
export class MobilehomePageModule {}
