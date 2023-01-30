import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemReceiveRoutingModule } from './item-receive-routing.module';
import { ItemReceiveComponent } from './item-receive.component';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ItemReceiveComponent,
    ViewComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ItemReceiveRoutingModule,
    FormsModule
  ]
})
export class ItemReceiveModule { }
