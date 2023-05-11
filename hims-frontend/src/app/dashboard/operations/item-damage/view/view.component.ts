import { Component } from '@angular/core';
import { ItemDamage } from 'src/app/shared/interfaces/item-damaged.interface';
import { ItemDamageService } from '../item-damage.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintModule } from 'src/app/shared/print-module/print-module';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  hotel: any;
  department: any;
  items: Array<any> = [];
  batch_items: Array<ItemDamage> = [];
  batch_no:string = '';
  constructor(private itemDamageService: ItemDamageService, private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute, private print: PrintModule){
    this.hotel = this.localStorageService.getHotel();
    this.department = this.localStorageService.getDepartment();
  }
  ngOnInit():void{
    this.itemDamageService.get_items_discarded().subscribe({
      next: data => {
        this.items = data;
      }
    })
  }
  onRouteDiscardItem(){
    this.router.navigate(['../add'], { relativeTo: this.route})
  }
  onGetDiscardedItems(batch_no: string){
    this.itemDamageService.get_item_discarded(batch_no).subscribe({
      next: data => {
        this.batch_items = data;
        this.batch_no = batch_no;
      }
    })
  }
  onPrint(){
    this.print.printBill('Discard',this.batch_items, this.batch_no, this.hotel.name, this.department.name);
  }
}
