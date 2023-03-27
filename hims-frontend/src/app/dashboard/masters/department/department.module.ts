import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: DepartmentComponent }
]
@NgModule({
  declarations: [
    DepartmentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class DepartmentModule { }
