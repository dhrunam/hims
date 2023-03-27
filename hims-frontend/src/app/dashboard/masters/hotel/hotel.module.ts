import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HotelComponent}
]
@NgModule({
  declarations: [
    HotelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HotelModule { }
