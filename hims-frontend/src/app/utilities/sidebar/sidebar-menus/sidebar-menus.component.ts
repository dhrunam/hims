import { Component, Input, Renderer2 } from '@angular/core';

import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-sidebar-menus',
  templateUrl: './sidebar-menus.component.html',
  styleUrls: ['./sidebar-menus.component.css']
})
export class SidebarMenusComponent {
  subMenuToggle: boolean = false;
  role:number = 0;
  @Input() toggleValue: boolean = false;
  masters: Array<{menu:string, class: string, route:string}> = [
    {
      menu: 'Property Master',
      class: 'bi bi-buildings',
      route: '/dashboard/property',
    },
    {
      menu: 'Category Master',
      class: 'bi bi-bookmark-star',
      route: '/dashboard/room-category',
    },
    {
      menu: 'Room Master',
      class: 'bi bi-map',
      route: '/dashboard/room',
    },
    {
      menu: 'User Master',
      class: 'bi bi-person',
      route: '/dashboard/users',
    }
  ]
  constructor(private renderer: Renderer2, private localStorageService: LocalStorageService){}
  ngOnInit():void{
    this.role = this.localStorageService.getRoleId();
  }
  onToggle(elem1:any, elem2: any){
    this.subMenuToggle = !this.subMenuToggle
    if(this.subMenuToggle){
      this.renderer.addClass(elem1, 'open');
      this.renderer.addClass(elem2, 'active');
    }
    else{
      this.renderer.removeClass(elem1, 'open');
      this.renderer.removeClass(elem2, 'active');
    }
  }
}
