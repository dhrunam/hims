import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  lists: any = [];
  hotel_id: string = '';
  constructor(private http: HttpService, private storage: LocalStorageService){}
  ngOnInit(): void {
    this.hotel_id = this.storage.getHotelId();
    this.http.get_item_received(this.hotel_id).subscribe({
      next: data => {
        this.lists = data;
      }
    })
  }
}
