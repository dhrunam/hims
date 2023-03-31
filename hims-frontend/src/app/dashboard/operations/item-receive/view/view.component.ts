import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ItemReceive } from 'src/app/shared/interfaces/item-receive.interface';
import { PrintModule } from 'src/app/shared/print-module/print-module';
import { ItemReceiveService } from '../item-receive.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  hotel: any;
  department: any;
  items: Array<any> = [];
  batch_items: Array<ItemReceive> = [];
  batch_no:string = '';
  constructor(private itemReceiveService: ItemReceiveService, private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute, private print: PrintModule){
    this.hotel = this.localStorageService.getHotel();
    this.department = this.localStorageService.getDepartment();
  }
  ngOnInit(): void{
    this.itemReceiveService.get_items_received(this.hotel.id).subscribe({
      next: data => this.items = data,
    })
  }
  onRouteReceiveItem(){
    this.router.navigate(['../add'], { relativeTo: this.route})
  }
  onRouteUpdateReceiveItem(batch_no:string){
    this.router.navigate(['../add'], { relativeTo: this.route, queryParams: { batch_no: batch_no } } );
  }
  onGetReceivedItems(batch_no: string){
    this.itemReceiveService.get_item_received(batch_no).subscribe({
      next: data => {
        this.batch_items = data;
        this.batch_no = batch_no;
      }
    })
  }
  onPrint(){
    this.print.printBill(this.batch_items, this.batch_no, this.hotel.name, this.department.name);
  }
}
