import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { MaterialModule } from '../core/material/material.module';



@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutSuccessComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    CheckoutSuccessComponent
  ]
})
export class CheckoutModule { }
