import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private storage: LocalStorageService){}
  user: any = this.storage.getUserGroup();
  ngOnInit(): void{
    this.storage.getUserData();
  }
}
