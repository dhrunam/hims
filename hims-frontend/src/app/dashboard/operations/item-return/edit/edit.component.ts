import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/dashboard/masters/item/item.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemReturn } from 'src/app/shared/interfaces/item-return.interface';
import { ItemReturnService } from '../item-return.service';
import { ItemReceiveService } from '../../item-receive/item-receive.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @ViewChild('batch', { static: false } ) batch: ElementRef;
  constructor(private route: ActivatedRoute, private itemService: ItemService, private localStorageService: LocalStorageService, private itemReturnService: ItemReturnService, private itemReceiveService: ItemReceiveService){}
  items: Array<ItemReturn> = [];
  item_master: Array<any> = [];
  item_name: string = '';
  dept_id: number = this.localStorageService.getDepartment().id;
  hotel_id: number = this.localStorageService.getHotel().id;
  item_id: string = '';
  editMode: boolean = false;
  batch_no: string = '';
  ob: number = 0;
  batchErr: boolean = false;
  showSuccess: string = '';
  ngOnInit(): void{
    this.route.queryParams.subscribe({
      next: (param: Params) => {
        this.editMode = param['batch_no'] != null;
        if(this.editMode){
          // this.itemReturnService.get_item_received(param['batch_no']).subscribe({
          //   next: data => {
          //     this.items = data;
          //   }
          // })
        }
      }
    })
    this.itemService.get_items_by_department(this.dept_id).subscribe({
      next: data => this.item_master = data,
    })
  }
  // onEnter(){
  //   if(this.batch_no === ''){
  //     this.renderer.setStyle(this.batch.nativeElement, 'border', '1px solid red');
  //   }
  //   else{
  //     this.renderer.removeStyle(this.batch.nativeElement, 'border');
  //   }
  // }
  onSubmit(){
    this.items.forEach((d:any) => {
      d.batch_no = this.batch_no;
    })
    let observable: Observable<any>
    if(this.editMode){

    }
    else{
      observable = this.itemReturnService.return_item(this.items)
    }
    observable.subscribe({
      next: data => {
        // this.renderer.removeStyle(this.batch.nativeElement, 'border');
        // this.batchErr = false;
        this.showSuccess = 'true';
      }
    }) 
    // if(this.batch_no === ''){
    //   this.renderer.setStyle(this.batch.nativeElement, 'border', '1px solid red');
    //   this.batchErr = true;
    // }
    // else{
    //   this.items.forEach((d:any) => {
    //     d.batch_no = this.batch_no;
    //   })
    //   let observable: Observable<any>
    //   if(this.editMode){

    //   }
    //   else{
    //     observable = this.itemReturnService.return_item(this.items)
    //   }
    //   observable.subscribe({
    //     next: data => {
    //       this.renderer.removeStyle(this.batch.nativeElement, 'border');
    //       this.batchErr = false;
    //     }
    //   }) 
    // }  
  }
  onAddItems(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let hotel = this.localStorageService.getHotel();
      let date = new Date();
      let todayDate = `${date.getFullYear()}-${date.getMonth() < 10 ? '0':''}${date.getMonth()+1}-${date.getDate() < 10 ? '0':''}${date.getDate()}`
      this.items.push({
        hotel: hotel.id,
        item: data.value.item_id,
        item_name: this.item_name,
        opening_balance: this.ob.toString(),
        quantity_returned: data.value.quantity_returned,
        unit_price: data.value.price_per_unit,
        expiry_date: data.value.expiry,
        remarks: data.value.remarks || '',
        returned_on: todayDate,
      })
      data.reset();
    }
  }
  onDeleteItem(item_name: any){
    this.items.splice(this.items.indexOf(item_name), 1)
  }
  onGetNamesValue(event: any){
    this.item_name = event.target.options[event.target.options.selectedIndex].text;
    this.item_id = event.target.value;
    this.itemReceiveService.get_min_max(this.hotel_id, event.target.value).subscribe({
      next: data => {
        if(data[0]){
          this.ob = data[0].opening_balance;
        }
        else{
          this.ob = 0;
        }
      }
    })
  }
}
