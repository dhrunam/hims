import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemReceiveService } from '../item-receive.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  hotel: any;
  constructor(private itemReceiveService: ItemReceiveService, private localStorageService: LocalStorageService){
    this.hotel = this.localStorageService.getHotel();
  }

  ngOnInit(): void{
    this.itemReceiveService.get_item_received(this.hotel.id).subscribe({
      next: data => console.log(data),
    })
  }
}
