import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { UserComponent } from './user.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/masters/user/view', pathMatch:'full'},
  { path: '', component: UserComponent, children: [
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
export class UserRoutingModule { }
