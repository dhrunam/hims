import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemTransferRoutingModule } from './item-transfer-routing.module';
import { ItemTransferComponent } from './item-transfer.component';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ItemTransferComponent,
    ViewComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ItemTransferRoutingModule,
    FormsModule
  ]
})
export class ItemTransferModule { }
