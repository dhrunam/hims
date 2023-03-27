import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DamageComponent } from './damage/damage.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: DamageComponent}
]
@NgModule({
  declarations: [
    DamageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ItemDamageModule { }
