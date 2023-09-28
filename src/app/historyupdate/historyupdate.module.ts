import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryupdatePageRoutingModule } from './historyupdate-routing.module';

import { HistoryupdatePage } from './historyupdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryupdatePageRoutingModule
  ],
  declarations: [HistoryupdatePage]
})
export class HistoryupdatePageModule {}
