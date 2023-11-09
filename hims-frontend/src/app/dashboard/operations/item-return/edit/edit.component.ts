import { Component, ElementRef,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/dashboard/masters/item/item.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemReturn } from 'src/app/shared/interfaces/item-return.interface';
import { ItemReturnService } from '../item-return.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @ViewChild('batch', { static: false } ) batch: ElementRef;
  hotel:any;
  constructor(private route: ActivatedRoute, private itemService: ItemService, private localStorageService: LocalStorageService, private itemReturnService: ItemReturnService){
    this.hotel = this.localStorageService.getHotel();
  }
  items: Array<ItemReturn> = [];
  item_master: Array<any> = [];
  item_name: string = '';
  item_id: number = 0;
  editMode: boolean = false;
  batch_no: string = '';
  batchErr: boolean = false;
  showSuccess: string = '';
  ob:number = 0;
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
    this.itemService.get_items().subscribe({
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
      let date = new Date();
      let todayDate = `${date.getFullYear()}-${date.getMonth() < 10 ? '0':''}${date.getMonth()+1}-${date.getDate() < 10 ? '0':''}${date.getDate()}`
      this.items.push({
        hotel: this.hotel.id,
        item: data.value.item_id,
        item_name: this.item_name,
        opening_balance: data.value.opening_balance,
        quantity_returned: data.value.quantity_returned,
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
    this.itemReturnService.get_opening_balance(this.hotel.id, this.item_id).subscribe({
      next: data => this.ob = data[0].opening_balance || 0,
    })
  }
}
