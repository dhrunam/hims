import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mode } from 'src/app/shared/interfaces/mode.interface';
import { DepartmentService } from './department.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  @ViewChild('modalBtn', { static: false} ) modalBtn: ElementRef;
  private subscription: Subscription;
  id:number = 0;
  showSuccess: string = '';
  department_name: string = '';
  department_short_name: string = '';
  deleteMessage: boolean = false;
  editMode: boolean = false;
  departments: Array<any> = [];
  constructor(private departmentService: DepartmentService, private router: Router, private route: ActivatedRoute){}
  ngOnInit():void{
    this.getDepartments();
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
        observable = this.departmentService.delete_department(fd);
      }
      else{
        fd.append('name', data.value.name);
        fd.append('short_name', data.value.short_name);
        if(this.editMode){
          fd.append('id', this.id.toString());
          observable = this.departmentService.update_department(fd);
        }
        else{
          observable = this.departmentService.add_department(fd);
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
          this.getDepartments();
        }
      })
      data.reset();
    }
  }
  onGetOperation(values: Mode){
    this.department_name = '';
    this.department_short_name = '';
    this.deleteMessage = false;
    this.editMode = values.operation === 'add' ? false : true;
    this.id = values.id ? values.id : 0;
    if(this.editMode){
      this.departmentService.get_department(this.id).subscribe({
        next: data => {
          this.department_name = data.name;
          this.department_short_name = data.short_name;
        }
      })
    }
  }
  getDeleteMessage(id:number){
    this.id = id;
    this.deleteMessage = true;
  }
  onGoBack(){
    this.router.navigate(['../../home'], { relativeTo: this.route } );
  }
  getDepartments(){
    this.departmentService.get_departments().subscribe({
      next: data => {
        this.departments = data;
      }
    })
  }
  ngOnDestroy():void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
