import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  constructor(private http: HttpService){}
  showItems: boolean = false;
  items: any = [];
  dept_option: string = 'N/A';
  departments: any = [];
  ngOnInit(): void{
    this.get_items();
  }
  add_item(data: any){
    let fd = new FormData();
    fd.append('name', data.value.itemName);
    fd.append('department', data.value.dept);
    this.http.add_items(fd).subscribe({
      next: data => {
        this.get_items();
      },
      error: err => {
        console.log(err);
      }
    })
  }
  get_items(){
    this.http.get_items().subscribe({
      next: data => {
        this.showItems = data[0] ? true : false;
        this.items = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  loadData(){
    this.http.get_departments().subscribe({
      next: data => {
        this.departments = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
