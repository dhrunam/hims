import { Component } from '@angular/core';
import { ReportingService } from '../reporting.service';
import { NgForm } from '@angular/forms';
import { DepartmentService } from '../../masters/department/department.service';
import { HotelService } from '../../masters/hotel/hotel.service';
import { ItemService } from '../../masters/item/item.service';
import { Observable, take } from 'rxjs';
import * as XLSX from 'xlsx';
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
  resetItemInput: string = '';
  filename: string = '';
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
  }
  onGetReport(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.reports = [];
      let itemIndex = this.items.findIndex(i => i.name === data.value.item);
      let itemId = itemIndex > -1 ? this.items[itemIndex].id : null;
      let observable: Observable<any>;
      if(itemId != null){
        observable = this.reportingService.get_report(data.value.start_date, data.value.end_date, data.value.hotel_id, data.value.department_id, itemId);
        this.filename = data.value.item;
      }
      else{
        observable = this.reportingService.get_report(data.value.start_date, data.value.end_date, data.value.hotel_id, data.value.department_id);
        this.filename = data.value.department_id;
      }
      observable.pipe(take(1)).subscribe({
        next: data => {
          this.reports = data;
        }
      })
    }
  }
  getItems(dept_id: number){
    this.resetItemInput = '';
    this.items = [];
    this.itemService.get_items_by_department(dept_id).subscribe({
      next: data => {
        this.items = data;
      }
    })
  }
  generateExcelReport(){
    let element = document.getElementById('report');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.filename);
  }
}
