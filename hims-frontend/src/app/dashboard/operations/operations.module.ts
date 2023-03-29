import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'item-receive', loadChildren: () => import('./item-receive/item-receive.module').then(m => m.ItemReceiveModule) },
  { path: 'item-return', loadChildren: () => import('./item-return/item-return.module').then(m => m.ItemReturnModule) },
  { path: 'item-damage', loadChildren: () => import('./item-damage/item-damage.module').then(m => m.ItemDamageModule) },
  { path: 'item-transfer', loadChildren: () => import('./item-transfer/item-transfer.module').then(m => m.ItemTransferModule) },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class OperationsModule { }
