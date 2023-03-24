import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/masters/department/view', pathMatch:'full'},
  { path: '', component: DepartmentComponent, children: [
        { path: 'view', component: ViewComponent },
        { path: 'add', component: EditComponent },
        { path: 'edit/:id', component: EditComponent },
      ] 
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
