import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseaddPageRoutingModule } from './chooseadd-routing.module';

import { ChooseaddPage } from './chooseadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseaddPageRoutingModule
  ],
  declarations: [ChooseaddPage]
})
export class ChooseaddPageModule {}
