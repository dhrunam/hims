import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ItemDamageComponent } from './item-damage.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard/operations/item-damage/add', pathMatch: 'full'},
  { path: '', component: ItemDamageComponent, children: [
      { path: 'add', component: EditComponent },
      { path: 'edit', component: EditComponent },
      { path: 'view', component: ViewComponent },
    ]
  }
]
@NgModule({
  declarations: [
    ItemDamageComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ItemDamageModule { }
