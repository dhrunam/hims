import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/dashboard/masters/item/item.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemDamage } from 'src/app/shared/interfaces/item-damaged.interface';
import { ItemDamageService } from '../item-damage.service';
import { ItemReceiveService } from '../../item-receive/item-receive.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(private route: ActivatedRoute, private itemService: ItemService, private localStorageService: LocalStorageService, private itemDamageService: ItemDamageService, private itemReceiveService: ItemReceiveService){}
  items: Array<ItemDamage> = [];
  item_master: Array<any> = [];
  item_name: string = '';
  item_id: string = '';
  editMode: boolean = false;
  dept_id: number = this.localStorageService.getDepartment().id;
  hotel_id: number = this.localStorageService.getHotel().id;
  batch_no: string = '';
  batchErr: boolean = false;
  ob:number = 0;
  showSuccess: string = '';
  ngOnInit(): void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          
        }
      }
    })
    this.itemService.get_items_by_department(this.dept_id).subscribe({
      next: data => this.item_master = data,
    })
  }
  onSubmit(){
    this.items.forEach((d:any) => {
      d.batch_no = this.batch_no;
    })
    let observable: Observable<any>
    if(this.editMode){

    }
    else{
      observable = this.itemDamageService.discard_item(this.items)
    }
    observable.subscribe({
      next: data => {
        this.showSuccess = 'true';
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
        expiry_date: data.value.expiry,
        unit_price: data.value.price_per_unit,
        opening_balance: this.ob.toString(),
        quantity_damaged: data.value.quantity_damaged,
        remarks: data.value.remarks || '',
        damaged_on: todayDate,
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
