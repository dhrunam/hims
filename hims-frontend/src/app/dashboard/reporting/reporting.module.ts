import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: 'report', component: ReportComponent },
]
@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ReportingModule { }
