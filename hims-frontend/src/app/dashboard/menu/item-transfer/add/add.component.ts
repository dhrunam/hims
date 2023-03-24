import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { URLs } from 'src/environments/environment.prod';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  dept_id: string = '';
  hotel_id: string = '';
  hotels: any = [];
  depts: any = [];
  to_hotel: string = 'N/A';
  to_dept: string = 'N/A';
  hotel_name: string = '';
  dept_name: string = '';
  item: string = 'N/A';
  item_name: string = '';
  items: any = [];
  draft: any = [];
  constructor(private http: HttpService, private storage: LocalStorageService){}
  getHotelDept(){
    this.getHotels();
    this.getDepartments();
    this.hotel_name = this.storage.getHotelName();
    this.dept_name = this.storage.getDepartmentName();
    this.hotel_id = this.storage.getHotelId();
    this.dept_id = this.storage.getDepartmentId();
    this.http.get({url: URLs['item']}).subscribe({
      next: data => {
        this.items = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onChange(event: any){
    let text = event.target.options[event.target.options.selectedIndex].text;
    this.item_name = text;
  }

  addItemsDraft(data:any){
    let entry = {
      from_hotel: this.hotel_id,
      to_hotel: this.to_hotel,
      from_department: this.dept_id,
      to_department: this.to_dept,
      item: data.value.item,
      item_name: this.item_name,
      batch_no: 'GC/HK/2223/0001',
      opening_balance: 0,
      quantity_transferred: parseInt(data.value.quantity),
      unit_price: parseInt(data.value.ppu),
      expiry_date: data.value.expiry,
      remarks: data.value.remarks
    }
    this.draft.push(entry);
  }
  transferItems(){
    this.http.add_item_transferred(this.draft).subscribe({
      next: data => {
        console.log(data);
      }
    })
  }
  getHotels(){
    this.http.get_hotels().subscribe({
      next: data => {
        this.hotels = data;
      }
    })
  }
  getDepartments(){
    this.http.get_departments().subscribe({
      next: data => {
        this.depts = data;
      }
    })
  }
}
