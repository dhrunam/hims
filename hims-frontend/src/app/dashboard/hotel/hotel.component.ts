import { Component, ViewEncapsulation } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HotelComponent {
  constructor(private http: HttpService){}

  add_hotel(data:any){
    let fd = new FormData();
    fd.append('state', '1');
    fd.append('district', '1');
    fd.append('proprietor', '');
    fd.append('name', data.hotel_name);
    fd.append('short_name', 'GC');
    fd.append('address_line1', 'Test');
    fd.append('address_line2', '');
    fd.append('address_line3', '');
    fd.append('pin', '123456');
    fd.append('contact_number','');
    this.http.add_hotel(fd).subscribe({
      next: data => {
        console.log(data);
      }
    })
  }
}
