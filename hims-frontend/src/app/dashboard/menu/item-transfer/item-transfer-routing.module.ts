import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ItemTransferComponent } from './item-transfer.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo:'/dashboard/menu/item-transfer/view', pathMatch: 'full'},
  { path: '', component: ItemTransferComponent, children: [
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
export class ItemTransferRoutingModule { }
