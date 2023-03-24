import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarMenusComponent } from './sidebar/sidebar-menus/sidebar-menus.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SidebarMenusComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
  ]
})
export class UtilitiesModule { }
