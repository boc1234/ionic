import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseaddPage } from './chooseadd.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseaddPageRoutingModule {}
