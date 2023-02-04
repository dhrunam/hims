import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  dept_id: string = '';
  hotel_id: string = '';
  hotel_name: string = '';
  dept_name: string = '';
  item: string = 'N/A';
  item_name: string = '';
  items: any = [];
  draft: any = [];
  constructor(private http: HttpService, private storage: LocalStorageService){}
  ngOnInit():void{
  }
  getHotelDept(){
    this.hotel_name = this.storage.getHotelName();
    this.dept_name = this.storage.getDepartmentName();
    this.hotel_id = this.storage.getHotelId();
    this.dept_id = this.storage.getDepartmentId();
    this.http.get_items_dept(this.dept_id).subscribe({
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
      hotel: this.hotel_id,
      item: data.value.item,
      item_name: this.item_name,
      batch_no: 'GC/HK/2223/0001',
      opening_balance: 0,
      quantity_returned: parseInt(data.value.quantity),
      unit_price: parseInt(data.value.ppu),
      expiry_date: data.value.expiry,
      remarks: data.value.remarks
    }
    this.draft.push(entry);
  }
  returnedItems(){
    this.http.add_item_returned(this.draft).subscribe({
      next: data => {
        console.log(data);
      }
    })
  }
}
