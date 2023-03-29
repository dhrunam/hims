import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnComponent } from './return/return.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: ReturnComponent}
]
@NgModule({
  declarations: [
    ReturnComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ItemReturnModule { }
