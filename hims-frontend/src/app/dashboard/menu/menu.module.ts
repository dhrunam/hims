import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { ItemReceiveComponent } from './item-receive/item-receive.component';
import { ItemReturnComponent } from './item-return/item-return.component';
import { ItemDamageComponent } from './item-damage/item-damage.component';
import { ItemTransferComponent } from './item-transfer/item-transfer.component';


@NgModule({
  declarations: [
    MenuComponent,
    ItemReceiveComponent,
    ItemReturnComponent,
    ItemDamageComponent,
    ItemTransferComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
