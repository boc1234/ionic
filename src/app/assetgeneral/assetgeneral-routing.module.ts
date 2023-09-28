import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetgeneralPage } from './assetgeneral.page';

const routes: Routes = [
  {
    path: '',
    component: AssetgeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetgeneralPageRoutingModule {}
