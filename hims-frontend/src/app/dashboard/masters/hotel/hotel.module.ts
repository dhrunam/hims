import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelComponent } from './hotel.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HotelComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    FormsModule
  ]
})
export class HotelModule { }
