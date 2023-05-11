import { Component } from '@angular/core';
import { ItemDamage } from 'src/app/shared/interfaces/item-damaged.interface';
import { ItemDamageService } from '../item-damage.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintModule } from 'src/app/shared/print-module/print-module';
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
  isAdmin: boolean = true;
  hotel: any;
  department: any;
  hotel_name: string = '';
  dept_name: string = '';
  items: Array<any> = [];
  batch_items: Array<ItemDamage> = [];
  batch_no:string = '';
  constructor(private itemDamageService: ItemDamageService, private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute, private print: PrintModule, private hotelService: HotelService, private departmentService: DepartmentService){}
  ngOnInit():void{
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
  onRouteDiscardItem(){
    this.router.navigate(['../add'], { relativeTo: this.route})
  }
  onGetDiscardedItems(batch_no: string){
    this.itemDamageService.get_item_discarded(batch_no).subscribe({
      next: data => {
        this.batch_items = data;
        this.batch_no = batch_no;
      }
    })
  }
  onPrint(){
    this.print.printBill('Discard',this.batch_items, this.batch_no, this.isAdmin ? this.hotel_name : this.hotel.name, this.isAdmin ? this.dept_name : this.department.name);
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
  onSearchItemDiscarded(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let hotel = this.isAdmin ? data.value.hotel : this.hotel.id;
      let department = this.isAdmin ? data.value.dept : this.department.id;
      this.itemDamageService.get_items_discarded(data.value.start_date, data.value.end_date, hotel, department).subscribe({
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
