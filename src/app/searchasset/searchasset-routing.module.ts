import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchassetPage } from './searchasset.page';

const routes: Routes = [
  {
    path: '',
    component: SearchassetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchassetPageRoutingModule {}
