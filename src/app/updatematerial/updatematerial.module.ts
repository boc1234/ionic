import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatematerialPageRoutingModule } from './updatematerial-routing.module';

import { UpdatematerialPage } from './updatematerial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatematerialPageRoutingModule
  ],
  declarations: [UpdatematerialPage]
})
export class UpdatematerialPageModule {}
