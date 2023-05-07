import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Mode } from 'src/app/shared/interfaces/mode.interface';
import { VendorService } from './vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent {
  @ViewChild('modalBtn', { static: false} ) modalBtn: ElementRef;
  id:number = 0;
  vendor: { name: string, contact: string, gst: string, address: string} = { name: '', contact: '', gst: '', address: ''};
  deleteMessage: boolean = false;
  editMode: boolean = false;
  vendors: any = [];
  showError: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private vendorService: VendorService){}
  ngOnInit(): void{
    this.getVendors();
  }
  onGoBack(){
    this.router.navigate(['../../home'], { relativeTo: this.route } );
  }
  onGetOperation(values: Mode){
    this.deleteMessage = false;
    this.editMode = values.operation === 'add' ? false : true;
    this.id = values.id ? values.id : 0;
    this.vendor = { name: '', contact: '', gst: '', address: ''};
    if(this.editMode){
      this.vendorService.get_vendor(this.id).subscribe({
        next: data => {
          this.vendor = { name: data.name, contact: data.contact_no, gst: data.gst_no, address: data.address }; 
        }
      })
    }
  }
  getDeleteMessage(id:number){
    this.id = id;
    this.deleteMessage = true;
  }
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.showError = '';
      let observable: Observable<any>;
      let fd = new FormData();
      fd.append('name', data.value.vendor_name);
      fd.append('gst_no', data.value.gst);
      fd.append('contact_no', data.value.contact);
      fd.append('address', data.value.address);
      if(this.deleteMessage){
        observable = this.vendorService.delete_vendor(this.id);
      }
      else{
        if(this.editMode){
          fd.append('id', this.id.toString());
          observable = this.vendorService.update_vendor(fd);
        }
        else{
          observable = this.vendorService.add_vendor(fd);
        }
      }
      observable.pipe(take(1)).subscribe({
        next: data => {
          this.modalBtn.nativeElement.click();
        },
        error: err => {
          this.showError = 'false';
        },
        complete: () => {
          this.getVendors();
        }
      })
    }
  }
  getVendors(){
    this.vendorService.get_vendors().subscribe({
      next: data => {
        this.vendors = data;
      }
    })
  }
}
