import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryupdatePage } from './historyupdate.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryupdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryupdatePageRoutingModule {}
