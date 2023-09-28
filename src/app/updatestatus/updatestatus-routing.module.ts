import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatestatusPage } from './updatestatus.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatestatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatestatusPageRoutingModule {}
