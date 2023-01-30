import { Component, ViewEncapsulation } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DepartmentComponent {
    constructor(private http: HttpService){}
    departments: any = [];
    showDepartments: boolean = false;
    ngOnInit(): void {
      this.get_departments();
    }
    add_department(data:any){
      let fd = new FormData();
      fd.append('name', data.value.department_name);
      fd.append('short_name', data.value.department_short_name);
      this.http.add_department(fd).subscribe({
        next: data => {
          this.get_departments();
        },
        error: err => {
          console.log(err);
        }
      })
    }
    get_departments(){
      this.http.get_departments().subscribe({
        next: data => {
          this.showDepartments = data[0] ? true : false;
          this.departments = data;
        },
        error: err => {
          console.log(err);
        }
      })
    }
}
