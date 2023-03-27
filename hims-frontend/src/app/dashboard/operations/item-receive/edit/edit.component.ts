import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/dashboard/masters/item/item.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemReceiveService } from '../item-receive.service';
export interface ItemReceive{
  hotel: string;
  item: string;
  item_name?: string;
  batch_no: string;
  opening_balance: number;
  quantity_received: number;
  unit_price: number;
  expiry_date: string;
  remarks: string;
  received_on: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @ViewChild('item', { static: false} ) item: ElementRef;
  constructor(private router: Router, private route: ActivatedRoute, private itemService: ItemService, private localStorageService: LocalStorageService, private itemReceiveService: ItemReceiveService){}
  items: Array<ItemReceive> = [];
  item_master: Array<any> = [];
  item_name: string = '';
  item_id: string = '';
  editMode: boolean = false;
  ngOnInit(): void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode !== param['id']
      }
    })
    this.itemService.get_items().subscribe({
      next: data => this.item_master = data,
    })
  }
  onSubmit(){
    let observable: Observable<any>
    if(this.editMode){

    }
    else{
      observable = this.itemReceiveService.receive_item(this.items)
    }
    observable.subscribe({
      next: data => {
        console.log(data);
      }
    })   
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
        batch_no: data.value.batch,
        opening_balance: data.value.opening_balance,
        quantity_received: data.value.quantity_received,
        unit_price: data.value.price_per_unit,
        expiry_date: data.value.expiry,
        remarks: data.value.remarks || '',
        received_on: todayDate,
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
  }
}
