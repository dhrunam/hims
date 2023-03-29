import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemReceiveService } from '../item-receive.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  hotel: any;
  items: Array<any> = [];
  constructor(private itemReceiveService: ItemReceiveService, private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute){
    this.hotel = this.localStorageService.getHotel();
  }
  ngOnInit(): void{
    this.itemReceiveService.get_items_received(this.hotel.id).subscribe({
      next: data => this.items = data,
    })
  }
  onRouteReceiveItem(){
    this.router.navigate(['../add'], { relativeTo: this.route})
  }
  onRouteUpdateReceiveItem(batch_no:string){
    this.router.navigate(['../add'], { relativeTo: this.route, queryParams: { batch_no: batch_no } } );
  }
}
