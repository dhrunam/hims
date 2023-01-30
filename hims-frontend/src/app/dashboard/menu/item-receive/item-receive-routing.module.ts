import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ItemReceiveComponent } from './item-receive.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo:'/dashboard/menu/item-receive/view', pathMatch: 'full'},
  { path: '', component: ItemReceiveComponent, children: [
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
export class ItemReceiveRoutingModule { }
