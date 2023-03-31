import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ItemReturnComponent } from './item-return.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard/operations/item-return/view', pathMatch: 'full'},
  { path: '', component: ItemReturnComponent, children: [
      { path: 'add', component: EditComponent },
      { path: 'edit', component: EditComponent },
      { path: 'view', component: ViewComponent },
    ]
  }
]
@NgModule({
  declarations: [
    ItemReturnComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ItemReturnModule { }
