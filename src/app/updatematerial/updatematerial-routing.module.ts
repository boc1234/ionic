import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatematerialPage } from './updatematerial.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatematerialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatematerialPageRoutingModule {}
