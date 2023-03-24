import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  role: number = 0;
  constructor(private localStorageService: LocalStorageService){}

  ngOnInit():void{
    this.role = this.localStorageService.getRole();
  }
}
