import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemReturnComponent } from './item-return.component';

const routes: Routes = [{ path: '', component: ItemReturnComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemReturnRoutingModule { }
