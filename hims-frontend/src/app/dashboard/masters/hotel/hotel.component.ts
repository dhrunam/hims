import { Component, ElementRef,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mode } from 'src/app/shared/interfaces/mode.interface';
import { HotelService } from './hotel.service';
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent {
  @ViewChild('modalBtn', { static: false} ) modalBtn: ElementRef;
  private subscription: Subscription;
  id:number = 0;
  showSuccess: string = '';
  editMode: boolean = false;
  deleteMessage: boolean = false;
  hotels: Array<any> = [];
  hotel_name: string = '';
  hotel_short_name: string = '';
  constructor(private hotelService: HotelService, private router: Router, private route: ActivatedRoute){}
  ngOnInit(): void{
    this.getHotels();
  }
  onGetOperation(values: Mode){
    this.deleteMessage = false;
    this.editMode = values.operation === 'add' ? false : true;
    this.id = values.id ? values.id : 0;
    if(this.editMode){
      this.hotelService.get_hotel(this.id).subscribe({
        next: data => {
          this.hotel_name = data.name;
          this.hotel_short_name = data.short_name;
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
        observable = this.hotelService.delete_hotels(fd);
      }
      else{
        fd.append('name', data.value.name);
        fd.append('short_name', data.value.short_name);
        fd.append('address_line1', 'asdf');
        fd.append('pin','fasd')
        if(this.editMode){
          fd.append('id', this.id.toString());
          observable = this.hotelService.update_hotel(fd);
        }
        else{
          observable = this.hotelService.add_hotel(fd);
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
          this.getHotels();
        }
      })
      data.reset();
    }
  }
  getHotels(){
    this.hotelService.get_hotels().subscribe({
      next: data => {
        this.hotels = data;
      }
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
