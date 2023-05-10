import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintModule } from 'src/app/shared/print-module/print-module';
import { ItemReturn } from 'src/app/shared/interfaces/item-return.interface';
import { ItemReturnService } from '../item-return.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  hotel: any;
  department: any;
  items: Array<any> = [];
  batch_items: Array<ItemReturn> = [];
  batch_no:string = '';
  constructor(private itemReturnService: ItemReturnService, private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute, private print: PrintModule){
    this.hotel = this.localStorageService.getHotel();
    this.department = this.localStorageService.getDepartment();
  }
  ngOnInit():void{
    this.itemReturnService.get_items_returned().subscribe({
      next: data => {
        this.items = data;
      }
    })
  }
  onRouteReturnItem(){
    this.router.navigate(['../add'], { relativeTo: this.route})
  }
  onGetReturnedItems(batch_no: string){
    this.itemReturnService.get_item_returned(batch_no).subscribe({
      next: data => {
        this.batch_items = data;
        this.batch_no = batch_no;
      }
    })
  }
  onPrint(){
    this.print.printBill('Return',this.batch_items, this.batch_no, this.hotel.name, this.department.name);
  }
}
