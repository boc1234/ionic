import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetgeneralPageRoutingModule } from './assetgeneral-routing.module';

import { AssetgeneralPage } from './assetgeneral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetgeneralPageRoutingModule
  ],
  declarations: [AssetgeneralPage]
})
export class AssetgeneralPageModule {}
