import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemReturnRoutingModule } from './item-return-routing.module';
import { ItemReturnComponent } from './item-return.component';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ItemReturnComponent,
    ViewComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ItemReturnRoutingModule,
    FormsModule
  ]
})
export class ItemReturnModule { }
