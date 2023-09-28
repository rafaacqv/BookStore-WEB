import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';

import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { PagerComponent } from '../shared/pager/pager.component';

@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
