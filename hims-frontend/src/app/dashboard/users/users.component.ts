import { Component, ViewEncapsulation } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent {
  hotels: any = [];
  departments: any = [];
  users: any = [];
  hotel: string = 'N/A';
  department: string = 'N/A';
  showUsers: boolean = false;
  constructor(private http: HttpService){}
  ngOnInit(): void{
    this.get_hotels();
    this.get_deparments();
    this.get_users();
  }
  add_user(data: any){
    let fd = new FormData();
    fd.append('first_name', data.value.fname);
    fd.append('last_name', data.value.lname);
    fd.append('password', data.value.password);
    fd.append('password2', data.value.password2);
    fd.append('email', 'test@test.com');
    fd.append('hotel', this.hotel);
    fd.append('department', this.department);
    fd.append('group', '3');
    fd.append('contact_number', data.value.contact);
    fd.append('username', data.value.username);
    this.http.add_user(fd).subscribe({
      next: data => {
      },
      error: err => {
        console.log(err);
      }
    })
  }
  get_hotels(){
    this.http.get_hotels().subscribe({
      next: data => {
        this.hotels = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  get_deparments(){
    this.http.get_departments().subscribe({
      next: data => {
        this.departments = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  get_users(){
    this.http.get_users().subscribe({
      next: data => {
        this.showUsers = data[0] ? true : false;
        console.log(data);
        this.users = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
