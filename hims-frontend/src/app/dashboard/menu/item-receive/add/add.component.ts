import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { HttpService } from 'src/app/services/http/http.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  items: any = [];
  draft: any = [];
  item: string = 'N/A';
  hotel_name: string = '';
  dept_name: string = '';
  hotel_id: string = '';
  dept_id: string = '';
  constructor(private storage: LocalStorageService, private http: HttpService){}
  getHotelDept(){
    this.hotel_name = this.storage.getHotelName();
    this.dept_name = this.storage.getDepartmentName();
    this.dept_id = this.storage.getDepartmentId();
    this.hotel_id = this.storage.getHotelId();
    this.http.get_items_dept(this.dept_id).subscribe({
      next: data => {
        this.items = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  add_item_received(data: any){
    let fd = new FormData();
    fd.append('hotel', this.hotel_id);
    fd.append('item', data.value.item);
    fd.append('batch_no', 'GC/HK/2223/0001');
    fd.append('opening_balance', '0');
    fd.append('quantity_received', data.value.quantity);
    fd.append('unit_price', data.value.ppu);
    fd.append('expiry_date', data.value.expiry);
    fd.append('remarks', data.value.remarks);
    this.http.add_item_received(fd).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
