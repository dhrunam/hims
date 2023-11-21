import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/dashboard/masters/item/item.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemDamage } from 'src/app/shared/interfaces/item-damaged.interface';
import { ItemDamageService } from '../item-damage.service';
import { ItemReceiveService } from '../../item-receive/item-receive.service';
import { HotelService } from 'src/app/dashboard/masters/hotel/hotel.service';
import { DepartmentService } from 'src/app/dashboard/masters/department/department.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(private route: ActivatedRoute, private itemService: ItemService, private localStorageService: LocalStorageService, private itemDamageService: ItemDamageService, private itemReceiveService: ItemReceiveService,  private hotelService: HotelService, private departmentService: DepartmentService){}
  items: Array<ItemDamage> = [];
  item_master: Array<any> = [];
  item_name: string = '';
  item_id: number = 0;
  ob: number = 0;
  editMode: boolean = false;
  hotels: Array<any> = [];
  departments: Array<any> = [];
  dept_id: any;
  hotel_id: any;
  batch_no: string = '';
  isAdmin: boolean = false;
  batchErr: boolean = false;
  showSuccess: string = '';
  ngOnInit(): void{
    this.isAdmin = this.localStorageService.getRole() === 1 ? true : false;
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          
        }
      }
    })
    if(!this.isAdmin){
      this.hotel_id = this.localStorageService.getHotel().id;
      this.dept_id = this.localStorageService.getDepartment().id;
      this.getItems();
    }
    else{
      this.getHotels();
      this.getDepartments();
    }
  }
  onSubmit(){
    this.items.forEach((d:any) => {
      d.batch_no = this.batch_no;
    })
    let observable: Observable<any>
    if(this.editMode){

    }
    else{
      observable = this.itemDamageService.discard_item(this.items)
    }
    observable.subscribe({
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
        expiry_date: data.value.expiry,
        unit_price: data.value.price_per_unit,
        opening_balance: this.ob.toString(),
        quantity_damaged: data.value.quantity_damaged,
        remarks: data.value.remarks || 'N/A',
        damaged_on: todayDate,
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
          this.ob = data[0].opening_balance;
        }
        else{
          this.ob = 0;
        }
      }
    })
  }
  getItems(){
    this.itemService.get_items_by_department(this.dept_id).subscribe({
      next: data => this.item_master = data,
    })
  }
  getHotels(){
    this.hotelService.get_hotels().subscribe({
      next: data => this.hotels = data,
    })
  }
  getDepartments(){
    this.departmentService.get_departments().subscribe({
      next: data => this.departments = data,
    })
  }
  onSetHotelId(event: any){
    this.hotel_id = event.target.value;
  }
  onSetDepartmentId(event: any){
    this.dept_id = event.target.value;
    this.getItems();
  }
}
