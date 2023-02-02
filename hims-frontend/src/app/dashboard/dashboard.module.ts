import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UtilitiesModule,
  ]
})
export class DashboardModule { }
