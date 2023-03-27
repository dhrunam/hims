import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ItemReceiveComponent } from './item-receive.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard/operations/item-receive/view', pathMatch: 'full'},
  { path: '', component: ItemReceiveComponent, children: [
      { path: 'add', component: EditComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'view', component: ViewComponent },
    ]
  }
]
@NgModule({
  declarations: [
    ItemReceiveComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ItemReceiveModule { }
