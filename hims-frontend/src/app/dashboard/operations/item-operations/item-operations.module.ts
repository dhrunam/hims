import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemOperationsRoutingModule } from './item-operations-routing.module';
import { ItemOperationsComponent } from './item-operations.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    ItemOperationsComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ItemOperationsRoutingModule
  ]
})
export class ItemOperationsModule { }
