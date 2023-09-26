import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';

import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent
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
