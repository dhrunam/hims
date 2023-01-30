import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapDepartmentRoutingModule } from './map-department-routing.module';
import { MapDepartmentComponent } from './map-department.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MapDepartmentComponent
  ],
  imports: [
    CommonModule,
    MapDepartmentRoutingModule,
    FormsModule
  ]
})
export class MapDepartmentModule { }
