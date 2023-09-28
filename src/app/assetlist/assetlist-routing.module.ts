import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetlistPage } from './assetlist.page';

const routes: Routes = [
  {
    path: '',
    component: AssetlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetlistPageRoutingModule {}
