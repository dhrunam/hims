import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemOperationsComponent } from './item-operations.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: ItemOperationsComponent }
];
@NgModule({
  declarations: [
    ItemOperationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ItemOperationsModule { }
