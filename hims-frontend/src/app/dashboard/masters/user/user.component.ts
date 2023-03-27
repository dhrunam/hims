import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mode } from 'src/app/shared/interfaces/mode.interface';
import { DepartmentService } from '../department/department.service';
import { HotelService } from '../hotel/hotel.service';
import { UserService } from './user.service';
import { User } from './user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @ViewChild('modalBtn', { static: false} ) modalBtn: ElementRef;
  private subscription: Subscription;
  id:number = 0;
  showSuccess: string = '';
  editMode: boolean = false;
  deleteMessage: boolean = false;
  users: Array<any> = [];
  hotels: Array<any> = [];
  departments: Array<any> = [];
  user:User;
  constructor(private userService:UserService, private router: Router, private route: ActivatedRoute, private hotelService: HotelService, private departmentService: DepartmentService){}
  ngOnInit(): void{
    this.getUsers();
  }
  onGetOperation(values: Mode){
    this.user = new User('','','','','','');
    this.hotelService.get_hotels().subscribe({
      next: data => this.hotels = data,
    });
    this.departmentService.get_departments().subscribe({
      next: data => this.departments = data,
    });
    this.deleteMessage = false;
    this.editMode = values.operation === 'add' ? false : true;
    this.id = values.id ? values.id : 0;
    if(this.editMode){
      this.userService.get_user(this.id).subscribe({
        next: data => {
          this.user = new User(data.first_name, data.last_name, data.username, data.related_profile[0].contact_number, data.related_profile[0].related_hotel.id, data.related_profile[0].related_department.id)
        }
      })
    }
  }
  getDeleteMessage(id:number){
    this.id = id;
    this.deleteMessage = true;
  }
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.showSuccess = '';
      let observable: Observable<any>;
      let fd = new FormData();
      if(this.deleteMessage){
        fd.append('id', this.id.toString());
        observable = this.userService.delete_user(fd);
      }
      else{
        fd.append('first_name', data.value.fname);
        fd.append('last_name', data.value.lname);
        fd.append('password', data.value.password);
        fd.append('password2', data.value.password2);
        fd.append('email', 'test@test.com');
        fd.append('hotel', data.value.hotel_id);
        fd.append('department', data.value.department_id);
        fd.append('contact_number', data.value.contact);
        fd.append('username', data.value.username);
        fd.append('group', '2');
        if(this.editMode){
          fd.append('id', this.id.toString());
          observable = this.userService.update_user(fd);
        }
        else{
          observable = this.userService.add_user(fd);
        }
      }
      this.subscription = observable.subscribe({
        next: data => {
          this.showSuccess = 'true';
          this.modalBtn.nativeElement.click();
        },
        error: err => {
          this.showSuccess = 'false';
        },
        complete: () => {
          this.getUsers();
        }
      })
      data.reset();
    }
  }
  getUsers(){
    this.userService.get_users().subscribe({
      next: data => this.users = data,
    })
  }
  onGoBack(){
    this.router.navigate(['../../home'], { relativeTo: this.route } );
  }
  ngOnDestroy():void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}