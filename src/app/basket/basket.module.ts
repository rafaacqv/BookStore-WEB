import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { MaterialModule } from '../core/material/material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    BasketRoutingModule,
    SharedModule
  ]
})
export class BasketModule { }
