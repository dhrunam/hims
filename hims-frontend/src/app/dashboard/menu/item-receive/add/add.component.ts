import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { formatDate } from '@angular/common';
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
    console.log(this.item)
    data = {
      hotel: this.hotel_id,
      item: data.value.item,
      batch_no: 'GC/HK/2223/0001',
      opening_balance: '0',
      quantity_received: data.value.quantity,
      unit_price: data.value.ppu,
      expiry_date: data.value.expiry,
      remarks: data.value.remarks
    }
    this.draft.push(data);
  }
  received_item(){
    this.http.add_item_received(this.draft).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
