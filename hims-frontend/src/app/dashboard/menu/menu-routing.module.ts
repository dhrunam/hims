import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDamageComponent } from './item-damage/item-damage.component';
import { ItemReceiveComponent } from './item-receive/item-receive.component';
import { ItemReturnComponent } from './item-return/item-return.component';
import { ItemTransferComponent } from './item-transfer/item-transfer.component';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  { 
    path: '', component: MenuComponent, children: [
      { path: 'item-receive', component: ItemReceiveComponent },
      { path: 'item-return', component: ItemReturnComponent },
      { path: 'item-damage', component: ItemDamageComponent},
      { path: 'item-transfer', component: ItemTransferComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
