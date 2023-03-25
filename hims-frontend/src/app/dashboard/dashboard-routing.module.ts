import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo:'/dashboard/home', pathMatch: 'full'},
  { path: '', component: DashboardComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'masters', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule)},
      { path: 'configurations', loadChildren: () => import('./configurations/configurations.module').then(m => m.ConfigurationsModule)},
      { path: 'operations', loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule)},
      { path: 'reporting', loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingModule)},
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
