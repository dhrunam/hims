import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { routes } from '../item-operations-routing.module';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  key:string = '';
  constructor(private route: ActivatedRoute){
    this.route.params.subscribe({
      next: (params: Params) => {
        this.key = params['key']
      }
    })
  }
  ngOnInit():void{
    routes[0].redirectTo = `/dashboard/operations/${this.key}/view`;
  }
}
