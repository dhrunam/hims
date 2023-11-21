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
  items: Array<ItemTransfer> = [];
  item_master: Array<any> = [];
  hotels: Array<any> = [];
  departments: Array<any> = [];
  item_name: string = '';
  item_id: number = 0;
  hotel_name: string = '';
  department_name: string = '';
  editMode: boolean = false;
  batch_no: string = '';
  batchErr: boolean = false;
  showSuccess: string = '';
  ob:number = 0;
  dept_id: number = this.localStorageService.getDepartment().id;
  hotel_id: number = this.localStorageService.getHotel().id;
  ngOnInit(): void{
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
    this.itemService.get_items_by_department(this.dept_id).subscribe({
      next: data => this.item_master = data,
    });
    this.hotelService.get_hotels().subscribe({
      next: data => this.hotels = data,
    });
    this.deparmentService.get_departments().subscribe({
      next: data => this.departments = data,
    });
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
        // this.renderer.removeStyle(this.batch.nativeElement, 'border');
        // this.batchErr = false;
        this.showSuccess = 'true';
      }
    }) 
    // if(this.batch_no === ''){
    //   this.renderer.setStyle(this.batch.nativeElement, 'border', '1px solid red');
    //   this.batchErr = true;
    // }
    // else{
    //   this.items.forEach((d:any) => {
    //     d.batch_no = this.batch_no;
    //   })
    //   let observable: Observable<any>
    //   if(this.editMode){

    //   }
    //   else{
    //     observable = this.itemReturnService.return_item(this.items)
    //   }
    //   observable.subscribe({
    //     next: data => {
    //       this.renderer.removeStyle(this.batch.nativeElement, 'border');
    //       this.batchErr = false;
    //     }
    //   }) 
    // }  
  }
  onAddItems(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let hotel = this.localStorageService.getHotel();
      let department = this.localStorageService.getDepartment();
      let date = new Date();
      let todayDate = `${date.getFullYear()}-${date.getMonth() < 10 ? '0':''}${date.getMonth()+1}-${date.getDate() < 10 ? '0':''}${date.getDate()}`
      this.items.push({
        hotel: hotel.id,
        from_hotel: hotel.id,
        from_department: department.id,
        to_hotel: data.value.to_hotel,
        to_department: data.value.to_department,
        to_hotel_name: this.hotel_name,
        to_department_name: this.department_name,
        item: data.value.item_id,
        item_name: this.item_name,
        opening_balance: this.ob.toString(),
        quantity_transferred: data.value.quantity_transferred,
        remarks: data.value.remarks || '',
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
      this.itemReceiveService.get_min_max(this.hotel_id,event.target.value).subscribe({
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
      this.hotel_name = event.target.options[event.target.options.selectedIndex].text;
    }
    if(key === 'department'){
      this.department_name = event.target.options[event.target.options.selectedIndex].text;
    }
  }
}
