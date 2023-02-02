import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemDamageRoutingModule } from './item-damage-routing.module';
import { ItemDamageComponent } from './item-damage.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ItemDamageComponent,
    ViewComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ItemDamageRoutingModule,
    FormsModule,
  ]
})
export class ItemDamageModule { }
