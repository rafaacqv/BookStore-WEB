import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { MaterialModule } from '../core/material/material.module';
import { StepperComponent } from './stepper/stepper.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutSuccessComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    CheckoutSuccessComponent,
    StepperComponent
  ]
})
export class CheckoutModule { }
