import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangestatusPage } from './changestatus.page';

const routes: Routes = [
  {
    path: '',
    component: ChangestatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangestatusPageRoutingModule {}
