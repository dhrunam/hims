import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemService } from 'src/app/dashboard/masters/item/item.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemReceiveService } from '../item-receive.service';
import { ItemReceive } from 'src/app/shared/interfaces/item-receive.interface';
import { VendorService } from 'src/app/dashboard/masters/vendor/vendor.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(private route: ActivatedRoute, private itemService: ItemService, private localStorageService: LocalStorageService, private itemReceiveService: ItemReceiveService, private vendorService: VendorService){}
  items: Array<ItemReceive> = [];
  item_master: Array<any> = [];
  vendors: Array<any> = [];
  item_name: string = '';
  item_id: string = '';
  vendor_name: string = '';
  vendor_id: string = '';
  hotel_id: number = this.localStorageService.getHotel().id;
  dept_id: number = this.localStorageService.getDepartment().id;
  editMode: boolean = false;
  showSuccess: string = '';
  editableOB: boolean = true;
  min: number = 0;
  max: number = 0;
  ob: number = 0;
  ngOnInit(): void{
    this.route.queryParams.subscribe({
      next: (param: Params) => {
        this.editMode = param['batch_no'] != null;
        if(this.editMode){
          this.itemReceiveService.get_item_received(param['batch_no']).subscribe({
            next: data => {
              this.items = data;
            }
          })
        }
      }
    })
    this.itemService.get_items_by_department(this.dept_id).subscribe({
      next: data => this.item_master = data,
    })
    this.vendorService.get_vendors().subscribe({
      next: data => this.vendors = data,
    })
  }
  onSubmit(){
    this.showSuccess = '';
    this.itemReceiveService.receive_item(this.items).subscribe({
      next: data => {
        this.showSuccess = 'true';
      }
    })  
  }
  onAddItems(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let date = new Date();
      let todayDate = `${date.getFullYear()}-${date.getMonth() < 10 ? '0':''}${date.getMonth()+1}-${date.getDate() < 10 ? '0':''}${date.getDate()}`
      this.items.push({
        hotel: this.hotel_id.toString(),
        item: data.value.item_id,
        item_name: this.item_name,
        vendor: this.vendor_id,
        min_level: this.min.toString(),
        vendor_name: this.vendor_name,
        opening_balance: this.ob,
        quantity_received: data.value.quantity_received,
        unit_price: data.value.price_per_unit,
        expiry_date: data.value.expiry,
        remarks: data.value.remarks || '',
        received_on: todayDate,
      })
      data.reset();
    }
  }
  onDeleteItem(item_name: any){
    this.items.splice(this.items.indexOf(item_name), 1)
  }
  onGetNamesValue(event: any){
    this.item_name = event.target.options[event.target.options.selectedIndex].text;
    this.item_id = event.target.value;
    this.itemReceiveService.get_min_max(this.hotel_id, event.target.value).subscribe({
      next: data => {
        if(data[0]){
          this.min = data[0].min_level;
          this.max = data[0].max_level;
          this.ob = data[0].opening_balance;
          this.editableOB = true;
        }
        else{
          this.editableOB = false;
          this.min = 0;
          this.max = 0;
          this.ob = 0;
        }
      }
    })
  }
  onGetVendorNamesValue(event: any){
    this.vendor_name = event.target.options[event.target.options.selectedIndex].text;
    this.vendor_id = event.target.value;
  }
}