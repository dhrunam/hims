import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PrintModule } from 'src/app/shared/print-module/print-module';
import { ItemTransferService } from '../item-transfer.service';
import { ItemTransfer } from 'src/app/shared/interfaces/item-transfer.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private itemTransferService: ItemTransferService, private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute, private print: PrintModule){
    this.hotel = this.localStorageService.getHotel();
    this.department = this.localStorageService.getDepartment();
  }
  items: Array<any> = [];
  hotel: any;
  department: any;
  batch_items: Array<ItemTransfer> = [];
  batch_no:string = '';
  ngOnInit(): void{
    this.itemTransferService.get_items_transferred().subscribe({
      next: data => {
        this.items = data;
      }
    })
  }
  onRouteTransferItem(){
    this.router.navigate(['../add'], { relativeTo: this.route})
  }
  onGetTransferredItems(batch_no: string){
    this.itemTransferService.get_item_transferred(batch_no).subscribe({
      next: data => {
        this.batch_items = data;
        this.batch_no = batch_no;
      }
    })
  }
  onPrint(){
    this.print.printBill('Transfer',this.batch_items, this.batch_no, this.hotel.name, this.department.name);
  }
}
