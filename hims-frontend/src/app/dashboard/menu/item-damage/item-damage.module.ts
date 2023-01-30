import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemDamageRoutingModule } from './item-damage-routing.module';
import { ItemDamageComponent } from './item-damage.component';


@NgModule({
  declarations: [
    ItemDamageComponent
  ],
  imports: [
    CommonModule,
    ItemDamageRoutingModule
  ]
})
export class ItemDamageModule { }
