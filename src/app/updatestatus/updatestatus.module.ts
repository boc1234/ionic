import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatestatusPageRoutingModule } from './updatestatus-routing.module';

import { UpdatestatusPage } from './updatestatus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatestatusPageRoutingModule
  ],
  declarations: [UpdatestatusPage]
})
export class UpdatestatusPageModule {}
