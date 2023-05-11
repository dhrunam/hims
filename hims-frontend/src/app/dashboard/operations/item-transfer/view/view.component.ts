import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PrintModule } from 'src/app/shared/print-module/print-module';
import { ItemTransferService } from '../item-transfer.service';
import { ItemTransfer } from 'src/app/shared/interfaces/item-transfer.interface';
import { HotelService } from 'src/app/dashboard/masters/hotel/hotel.service';
import { DepartmentService } from 'src/app/dashboard/masters/department/department.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private itemTransferService: ItemTransferService, private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute, private print: PrintModule, private hotelService: HotelService, private departmentService: DepartmentService){}
  hotels: Array<any> = [];
  departments: Array<any> = [];
  isAdmin: boolean = true;
  items: Array<any> = [];
  hotel: any;
  department: any;
  batch_items: Array<ItemTransfer> = [];
  batch_no:string = '';
  hotel_name: string = '';
  dept_name: string = '';
  ngOnInit(): void{
    this.isAdmin = this.localStorageService.getRole() === 1 ? true : false;
    if(this.isAdmin){
      this.getHotels();
      this.getDepartments();
    }
    if(!this.isAdmin){
      this.hotel = this.localStorageService.getHotel();
      this.department = this.localStorageService.getDepartment();
    }
  }
  onRouteTransferItem(){
    this.router.navigate(['../add'], { relativeTo: this.route})
  }
  onGetTransferredItems(batch_no: string){
    this.itemTransferService.get_item_transferred(batch_no).subscribe({
      next: data => {
        this.batch_items = data;
        this.batch_no = batch_no;
      }
    })
  }
  onPrint(){
    this.print.printBill('Transfer',this.batch_items, this.batch_no, this.isAdmin ? this.hotel_name : this.hotel.name, this.isAdmin ? this.dept_name : this.department.name);
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
  onSearchItemTransferred(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let hotel = this.isAdmin ? data.value.hotel : this.hotel.id;
      let department = this.isAdmin ? data.value.dept : this.department.id;
      this.itemTransferService.get_items_transferred(data.value.start_date, data.value.end_date, hotel, department).subscribe({
        next: data => {
          this.items = data;
        },
      })
    }
  }
  onGetNames(event: any, key: string){
    if(key === 'd'){
      this.dept_name = event.target.options[event.target.options.selectedIndex].text;
    }
    if(key === 'h'){
      this.hotel_name = event.target.options[event.target.options.selectedIndex].text;
    }
  }
}
