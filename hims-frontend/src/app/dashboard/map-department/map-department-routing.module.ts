import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapDepartmentComponent } from './map-department.component';

const routes: Routes = [{ path: '', component: MapDepartmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapDepartmentRoutingModule { }
