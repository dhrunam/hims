import { Component } from '@angular/core';
import { ReportingService } from '../reporting.service';
import { NgForm } from '@angular/forms';
import { DepartmentService } from '../../masters/department/department.service';
import { HotelService } from '../../masters/hotel/hotel.service';
import { ItemService } from '../../masters/item/item.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  hotels: any;
  departments: any;
  items: any;
  reports: Array<any> = [];
  constructor(private reportingService: ReportingService, private departmentService: DepartmentService, private hotelService: HotelService, private itemService: ItemService){}
  ngOnInit(): void{
    this.hotelService.get_hotels().subscribe({
      next: data => {
        this.hotels = data;
      }
    })
    this.departmentService.get_departments().subscribe({
      next: data => {
        this.departments = data;
      }
    })
    this.itemService.get_items().subscribe({
      next: data => {
        this.items = data;
      }
    })
  }
  onGetReport(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.reportingService.get_report(data.value.start_date, data.value.end_date, data.value.hotel_id, data.value.department_id, data.value.item_id).subscribe({
        next: data => {
          this.reports = data;
          console.log(data);
        }
      })
    }
  }
}
