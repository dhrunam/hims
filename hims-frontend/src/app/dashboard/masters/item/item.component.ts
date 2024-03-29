import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mode } from 'src/app/shared/interfaces/mode.interface';
import { DepartmentService } from '../department/department.service';
import { ItemService } from './item.service';
import { HotelService } from '../hotel/hotel.service';

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
  hotels: Array<any> = [];
  items: Array<any> = [];
  departments: Array<any> = [];
  minOrderConfig: Array<any> = [];
  update_items: { name: string, department: string, hotels?: Array<any> } = { name: '', department: '', hotels: []};
  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute, private departmentService: DepartmentService, private hotelService: HotelService){}
  ngOnInit(): void{
    this.getItems();
  }
  onGetOperation(values: Mode){
    this.update_items = { name: '', department: '', hotels: []};
    this.departmentService.get_departments().subscribe({
      next: data => this.departments = data,
    })
    this.getHotels();
    this.deleteMessage = false;
    this.editMode = values.operation === 'add' ? false : true;
    this.id = values.id ? values.id : 0;
    if(this.editMode){
      this.itemService.get_item(this.id).subscribe({
        next: data => {
          this.update_items.name = data[0].related_item.name;
          this.update_items.department = data[0].related_item.department;
          this.update_items.hotels = data;
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
      this.minOrderConfig = [];
      this.showSuccess = '';
      let observable: Observable<any>;
      let fd = new FormData();
      if(this.deleteMessage){
        fd.append('id', this.id.toString());
        observable = this.itemService.delete_item(fd);
      }
      else{
        this.hotels.forEach((d:any) => {
          this.minOrderConfig.push({
            hotel_id: d.id,
            min_level: data.value[`${d.short_name}`],
          })
        })
        fd.append('name', data.value.name);
        fd.append('department', data.value.department);
        fd.append('hotels', JSON.stringify(this.minOrderConfig));
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
      data.reset();
    }
  }
  getItems(){
    this.itemService.get_items().subscribe({
      next: data => this.items = data,
    })
  }
  getHotels(){
    this.hotelService.get_hotels().subscribe({
      next: data => {
        this.hotels = data
      },
    })
  }
  ngOnDestroy():void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  // onGetInputValue(hotel_name: string, event:any){
  //   console.log(hotel_name, event.target.value);
  // }
}
