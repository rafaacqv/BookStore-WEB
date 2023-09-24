import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';

import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
