import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangestatusPageRoutingModule } from './changestatus-routing.module';

import { ChangestatusPage } from './changestatus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangestatusPageRoutingModule
  ],
  declarations: [ChangestatusPage]
})
export class ChangestatusPageModule {}
