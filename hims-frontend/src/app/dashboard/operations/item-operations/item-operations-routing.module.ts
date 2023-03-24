import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ItemOperationsComponent } from './item-operations.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch:'full'},
  { path: '', component: ItemOperationsComponent, children: [
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
export class ItemOperationsRoutingModule {}
