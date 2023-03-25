import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapDepartmentRoutingModule } from './map-department-routing.module';
import { MapDepartmentComponent } from './map-department.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    MapDepartmentComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MapDepartmentRoutingModule
  ]
})
export class MapDepartmentModule { }
