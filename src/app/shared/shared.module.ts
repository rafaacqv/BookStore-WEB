import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { MaterialModule } from '../core/material/material.module';
import { OrderTotalsComponent } from './order-totals/order-totals.component';



@NgModule({
  declarations: [
    PagerComponent,
    OrderTotalsComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    PagerComponent,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
