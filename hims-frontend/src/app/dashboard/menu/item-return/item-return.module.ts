import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemReturnRoutingModule } from './item-return-routing.module';
import { ItemReturnComponent } from './item-return.component';


@NgModule({
  declarations: [
    ItemReturnComponent
  ],
  imports: [
    CommonModule,
    ItemReturnRoutingModule
  ]
})
export class ItemReturnModule { }
