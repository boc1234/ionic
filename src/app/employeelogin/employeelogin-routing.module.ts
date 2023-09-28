import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeloginPage } from './employeelogin.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeloginPageRoutingModule {}
