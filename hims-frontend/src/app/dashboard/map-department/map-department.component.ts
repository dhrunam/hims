import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
@Component({
  selector: 'app-map-department',
  templateUrl: './map-department.component.html',
  styleUrls: ['./map-department.component.css']
})
export class MapDepartmentComponent {
  constructor(private http: HttpService){}
  showMappedDept: boolean = false;
  mappedDept: any = [];
  hotels: any = [];
  departments: any = [];
  hotel_name:string = 'N/A';
  dept_name:string = 'N/A';
  ngOnInit(): void{
    this.getMappedDepartments();
  }
  getMappedDepartments(){
    this.http.get_map_departments().subscribe({
      next: data => {
        this.showMappedDept = data[0] ? true : false;
        this.mappedDept = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  mapDepartment(data:any){
    let fd = new FormData();
    fd.append('hotel', data.value.hotel);
    fd.append('department', data.value.department);
    this.http.map_department(fd).subscribe({
      next: data => {
        this.getMappedDepartments();
      },
      error: err => {
        console.log(err);
      }
    })
  }
  hotels_list(){
    this.http.get_hotels().subscribe({
      next: data => {
        this.hotels = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  departments_list(){
    this.http.get_departments().subscribe({
      next: data => {
        this.departments = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  async loadData(){
    await this.hotels_list();
    await this.departments_list();
  }
}
