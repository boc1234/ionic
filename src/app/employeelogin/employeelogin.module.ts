import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeloginPageRoutingModule } from './employeelogin-routing.module';

import { EmployeeloginPage } from './employeelogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeloginPageRoutingModule
  ],
  declarations: [EmployeeloginPage]
})
export class EmployeeloginPageModule {}
