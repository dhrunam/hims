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
  item_name: string = '';
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
  onChange(event:any){
    let text = event.target.options[event.target.options.selectedIndex].text;
    this.item_name = text;
  }
  add_item_received(data: any){
    data = {
      hotel: this.hotel_id,
      item: data.value.item,
      item_name: this.item_name,
      batch_no: 'GC/HK/2223/0001',
      opening_balance: 0,
      quantity_received: parseInt(data.value.quantity),
      unit_price: parseInt(data.value.ppu),
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
