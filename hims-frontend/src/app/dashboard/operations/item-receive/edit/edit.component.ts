import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/dashboard/masters/item/item.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemReceiveService } from '../item-receive.service';
import { ItemReceive } from 'src/app/shared/interfaces/item-receive.interface';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @ViewChild('item', { static: false} ) item: ElementRef;
  @ViewChild('batch', { static: false } ) batch: ElementRef;
  constructor(private route: ActivatedRoute, private itemService: ItemService, private localStorageService: LocalStorageService, private itemReceiveService: ItemReceiveService, private renderer: Renderer2){}
  items: Array<ItemReceive> = [];
  item_master: Array<any> = [];
  item_name: string = '';
  item_id: string = '';
  editMode: boolean = false;
  batch_no: string = '';
  batchErr: boolean = false;
  ngOnInit(): void{
    this.route.queryParams.subscribe({
      next: (param: Params) => {
        this.editMode = param['batch_no'] != null;
        this.batch_no = param['batch_no'];
        if(this.editMode){
          this.itemReceiveService.get_item_received(param['batch_no']).subscribe({
            next: data => {
              this.items = data;
              console.log(data);
            }
          })
        }
      }
    })
    this.itemService.get_items().subscribe({
      next: data => this.item_master = data,
    })
  }
  onEnter(){
    if(this.batch_no === ''){
      this.renderer.setStyle(this.batch.nativeElement, 'border', '1px solid red');
    }
    else{
      this.renderer.removeStyle(this.batch.nativeElement, 'border');
    }
  }
  onSubmit(){
    if(this.batch_no === ''){
      this.renderer.setStyle(this.batch.nativeElement, 'border', '1px solid red');
      this.batchErr = true;
    }
    else{
      let observable: Observable<any>
      if(this.editMode){

      }
      else{
        observable = this.itemReceiveService.receive_item(this.items)
      }
      observable.subscribe({
        next: data => {
          this.renderer.removeStyle(this.batch.nativeElement, 'border');
          this.batchErr = false;
        }
      }) 
    }  
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
        batch_no: this.batch_no,
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