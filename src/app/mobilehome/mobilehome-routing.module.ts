import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobilehomePage } from './mobilehome.page';

const routes: Routes = [
  {
    path: '',
    component: MobilehomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobilehomePageRoutingModule {}
