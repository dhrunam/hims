import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './transfer/transfer.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: TransferComponent}
]
@NgModule({
  declarations: [
    TransferComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ItemTransferModule { }
