import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ItemReturnComponent } from './item-return.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo:'/dashboard/menu/item-return/view', pathMatch: 'full'},
  { path: '', component: ItemReturnComponent, children: [
      { path: 'view', component: ViewComponent},
      { path: 'add', component: AddComponent},
      { path: 'edit', component: EditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemReturnRoutingModule { }
