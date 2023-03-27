import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mode } from 'src/app/shared/interfaces/mode.interface';
import { DepartmentService } from '../department/department.service';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @ViewChild('modalBtn', { static: false} ) modalBtn: ElementRef;
  private subscription: Subscription;
  showSuccess: string = '';
  deleteMessage: boolean = false;
  editMode: boolean = false;
  id:number = 0;
  items: Array<any> = [];
  departments: Array<any> = [];
  item_name: string = '';
  item_department: string = '';
  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute, private departmentService: DepartmentService){}
  ngOnInit(): void{
    this.getItems();
  }
  onGetOperation(values: Mode){
    this.item_name = '';
    this.item_department = '';
    this.item_department = '';
    this.departmentService.get_departments().subscribe({
      next: data => this.departments = data,
    })
    this.deleteMessage = false;
    this.editMode = values.operation === 'add' ? false : true;
    this.id = values.id ? values.id : 0;
    if(this.editMode){
      this.itemService.get_item(this.id).subscribe({
        next: data => {
          this.item_name = data.name;
          this.item_department = data.department
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
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      if(!data.valid){
        data.control.markAllAsTouched();
      }
      else{
        this.showSuccess = '';
        let observable: Observable<any>;
        let fd = new FormData();
        if(this.deleteMessage){
          fd.append('id', this.id.toString());
          observable = this.itemService.delete_item(fd);
        }
        else{
          fd.append('name', data.value.name);
          fd.append('department', data.value.department);
          if(this.editMode){
            fd.append('id', this.id.toString());
            observable = this.itemService.update_item(fd);
          }
          else{
            observable = this.itemService.add_item(fd);
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
            this.getItems();
          }
        })
      }
      data.reset();
    }
  }
  getItems(){
    this.itemService.get_items().subscribe({
      next: data => this.items = data,
    })
  }
  ngOnDestroy():void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
