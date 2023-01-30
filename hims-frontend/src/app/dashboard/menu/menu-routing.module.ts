import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  { 
    path: '', component: MenuComponent, children: [
      { path: 'item-receive', loadChildren: () => import('./item-receive/item-receive.module').then(m => m.ItemReceiveModule) },
      { path: 'item-damage', loadChildren: () => import('./item-damage/item-damage.module').then(m => m.ItemDamageModule) },
      { path: 'item-transfer', loadChildren: () => import('./item-transfer/item-transfer.module').then(m => m.ItemTransferModule) },
      { path: 'item-return', loadChildren: () => import('./item-return/item-return.module').then(m => m.ItemReturnModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
