import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderDetailedComponent } from '../order-detailed/order-detailed.component';
import { MaterialModule } from '../core/material/material.module';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailedComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
