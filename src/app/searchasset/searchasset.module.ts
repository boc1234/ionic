import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchassetPageRoutingModule } from './searchasset-routing.module';

import { SearchassetPage } from './searchasset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchassetPageRoutingModule
  ],
  declarations: [SearchassetPage]
})
export class SearchassetPageModule {}
