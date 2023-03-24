import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editMode: boolean = false;
  id:number = 0;
  hotel_name: string = '';
  hotel_short_name: string = '';
  constructor(private hotelService: HotelService, private router: Router, private route: ActivatedRoute){}
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let observable: Observable<any>;
      let fd = new FormData();
      fd.append('name', data.value.name);
      fd.append('short_name', data.value.short_name);
      if(this.editMode){
        fd.append('id', this.id.toString());
        observable = this.hotelService.add_hotel(fd)
      }
      else{
        observable = this.hotelService.add_hotel(fd)
      }
    }
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], { relativeTo: this.route }) : this.router.navigate(['../'], { relativeTo: this.route } );
  }
}
