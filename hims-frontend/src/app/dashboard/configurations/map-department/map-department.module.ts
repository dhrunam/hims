import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDepartmentComponent } from './map-department.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MapDepartmentComponent },
]

@NgModule({
  declarations: [
    MapDepartmentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class MapDepartmentModule { }
