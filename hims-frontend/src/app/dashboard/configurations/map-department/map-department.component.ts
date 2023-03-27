import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mode } from 'src/app/shared/interfaces/mode.interface';
import { DepartmentService } from '../../masters/department/department.service';
import { HotelService } from '../../masters/hotel/hotel.service';
import { MapDepartmentService, MappedDepartments } from './map-department.service';

@Component({
  selector: 'app-map-department',
  templateUrl: './map-department.component.html',
  styleUrls: ['./map-department.component.css']
})
export class MapDepartmentComponent {
  @ViewChild('modalBtn', { static: false} ) modalBtn: ElementRef;
  private subscription: Subscription;
  deleteMessage: boolean = false;
  id: number = 0;
  showSuccess: string = '';
  hotels: Array<any> = [];
  departments: Array<any> = [];
  hotel_name: string = '';
  department_name: string = '';
  mappedDepartments: Array<MappedDepartments> = [];
  constructor(private router: Router, private route: ActivatedRoute, private mapDepartmentService: MapDepartmentService, private departmenService: DepartmentService, private hotelService: HotelService){}
  ngOnInit(): void{
    this.getMappedDepartments();
  }
  onGoBack(){
    this.router.navigate(['../../home'], { relativeTo: this.route } );
  }
  getDeleteMessage(id:number){
    this.id = id;
    this.deleteMessage = true;
  }
  onGetOperation(values: Mode){
    this.hotelService.get_hotels().subscribe({
      next: data => this.hotels = data,
    })
    this.departmenService.get_departments().subscribe({
      next: data => this.departments = data,
    })
    this.deleteMessage = false;
    this.id = values.id ? values.id : 0;
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
        observable = this.mapDepartmentService.delete_map_department(fd);
      }
      else{
        fd.append('hotel', data.value.hotel);
        fd.append('department', data.value.department);
        observable = this.mapDepartmentService.map_department(fd);
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
          this.getMappedDepartments();
        }
      })
    }
  }
  getMappedDepartments(){
    this.mapDepartmentService.get_mapped_departments().subscribe({
      next: data => this.mappedDepartments = data,
    })
  }
  ngOnDestroy():void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
