import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { MaterialModule } from '../core/material/material.module';



@NgModule({
  declarations: [
    PagerComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    PagerComponent
  ]
})
export class SharedModule { }
