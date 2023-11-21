import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { DepartmentService } from 'src/app/dashboard/masters/department/department.service';
import { HotelService } from 'src/app/dashboard/masters/hotel/hotel.service';
import { ItemService } from 'src/app/dashboard/masters/item/item.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemTransfer } from 'src/app/shared/interfaces/item-transfer.interface';
import { ItemTransferService } from '../item-transfer.service';
import { ItemReceiveService } from '../../item-receive/item-receive.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(private route: ActivatedRoute, private itemService: ItemService, private localStorageService: LocalStorageService, private itemTransferService: ItemTransferService, private hotelService: HotelService, private deparmentService: DepartmentService, private itemReceiveService: ItemReceiveService){}
  isAdmin: boolean = false;
  items: Array<ItemTransfer> = [];
  item_master: Array<any> = [];
  hotels: Array<any> = [];
  departments: Array<any> = [];
  item_name: string = '';
  item_id: number = 0;
  from_hotel_name: string = '';
  from_department_name: string = '';
  to_hotel_name: string = '';
  to_department_name: string = '';
  editMode: boolean = false;
  batch_no: string = '';
  batchErr: boolean = false;
  showSuccess: string = '';
  ob:number = 0;
  to_dept_id: any;
  to_hotel_id: any;
  from_dept_id: any;
  from_hotel_id: any;
  ngOnInit(): void{
    this.isAdmin = this.localStorageService.getRole() === 1 ? true : false;
    this.route.queryParams.subscribe({
      next: (param: Params) => {
        this.editMode = param['batch_no'] != null;
        if(this.editMode){
          // this.itemReturnService.get_item_received(param['batch_no']).subscribe({
          //   next: data => {
          //     this.items = data;
          //   }
          // })
        }
      }
    })
    if(!this.isAdmin){
      this.from_hotel_id = this.localStorageService.getHotel().id;
      this.from_dept_id = this.localStorageService.getDepartment().id;
      this.getItems();
    }
    this.getHotels();
    this.getDepartments();
  }
  onSubmit(){
    this.items.forEach((d:any) => {
      d.batch_no = this.batch_no;
    })
    let observable: Observable<any>
    if(this.editMode){

    }
    else{
      observable = this.itemTransferService.transfer_item(this.items)
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
        hotel: this.from_hotel_id,
        from_hotel: this.from_hotel_id,
        from_department: this.from_dept_id,
        to_hotel: data.value.to_hotel,
        to_department: data.value.to_department,
        to_hotel_name: this.to_hotel_name,
        to_department_name: this.to_department_name,
        item: data.value.item_id,
        item_name: this.item_name,
        opening_balance: this.ob.toString(),
        quantity_transferred: data.value.quantity_transferred,
        remarks: data.value.remarks || 'N/A',
        transferred_on: todayDate,
        expiry_date: data.value.expiry,
        unit_price: data.value.price_per_unit,
      })
      data.reset();
    }
  }
  onDeleteItem(item_name: any){
    this.items.splice(this.items.indexOf(item_name), 1)
  }
  onGetNamesValue(event: any, key:string){
    if(key === 'item'){
      this.item_name = event.target.options[event.target.options.selectedIndex].text;
      this.item_id = event.target.value;
      this.itemReceiveService.get_min_max(this.from_hotel_id,event.target.value).subscribe({
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
    if(key === 'hotel'){
      this.to_hotel_name = event.target.options[event.target.options.selectedIndex].text;
    }
    if(key === 'department'){
      this.to_department_name = event.target.options[event.target.options.selectedIndex].text;
    }
  }
  getItems(){
    this.itemService.get_items_by_department(this.from_dept_id).subscribe({
      next: data => this.item_master = data,
    })
  }
  getHotels(){
    this.hotelService.get_hotels().subscribe({
      next: data => this.hotels = data,
    })
  }
  getDepartments(){
    this.deparmentService.get_departments().subscribe({
      next: data => this.departments = data,
    })
  }
  onSetHotelId(event: any){
    this.from_hotel_id = event.target.value;
  }
  onSetDepartmentId(event: any){
    this.from_dept_id = event.target.value;
    this.getItems();
  }
}
