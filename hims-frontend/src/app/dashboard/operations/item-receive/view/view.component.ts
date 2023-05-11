import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemReceive } from 'src/app/shared/interfaces/item-receive.interface';
import { PrintModule } from 'src/app/shared/print-module/print-module';
import { ItemReceiveService } from '../item-receive.service';
import { NgForm } from '@angular/forms';
import { HotelService } from 'src/app/dashboard/masters/hotel/hotel.service';
import { DepartmentService } from 'src/app/dashboard/masters/department/department.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  hotels: Array<any> = [];
  departments: Array<any> = [];
  hotel: any;
  department: any;
  items: Array<any> = [];
  batch_items: Array<ItemReceive> = [];
  batch_no:string = '';
  isAdmin: boolean = true;
  constructor(private itemReceiveService: ItemReceiveService, private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute, private print: PrintModule, private hotelService: HotelService, private departmentService: DepartmentService){}
  ngOnInit(): void{
    if(this.localStorageService.getRole() != 1){
      this.hotel = this.localStorageService.getHotel();
      this.department = this.localStorageService.getDepartment();
      this.isAdmin = false;
    }
    if(this.isAdmin){

    }
  }
  onRouteReceiveItem(){
    this.router.navigate(['../add'], { relativeTo: this.route})
  }
  onGetReceivedItems(batch_no: string){
    this.itemReceiveService.get_item_received(batch_no).subscribe({
      next: data => {
        this.batch_items = data;
        this.batch_no = batch_no;
      }
    })
  }
  onPrint(){
    this.print.printBill('Receive',this.batch_items, this.batch_no, this.hotel.name, this.department.name);
  }
  onSearchItemReceived(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.itemReceiveService.get_items_received(this.hotel).subscribe({
        next: data => console.log(data),
      })
    }
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
}
