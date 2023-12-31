import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { MaterialModule } from '../core/material/material.module';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from '../checkout/stepper/stepper.component';



@NgModule({
  declarations: [
    PagerComponent,
    OrderTotalsComponent,
  ],
  imports: [
    RouterModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PagerComponent,
    OrderTotalsComponent,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
