import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard/home', pathMatch: 'full'
  },
  { path: '', component: DashboardComponent, children: [
      { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
      { path: 'hotel', loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule) },
      { path: 'department', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
      { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
      { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
