import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetlistPageRoutingModule } from './assetlist-routing.module';

import { AssetlistPage } from './assetlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetlistPageRoutingModule
  ],
  declarations: [AssetlistPage]
})
export class AssetlistPageModule {}
