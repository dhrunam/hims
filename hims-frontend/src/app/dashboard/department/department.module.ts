import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    FormsModule
  ]
})
export class DepartmentModule { }
