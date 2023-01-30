import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDamageComponent } from './item-damage.component';

const routes: Routes = [{ path: '', component: ItemDamageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemDamageRoutingModule { }
