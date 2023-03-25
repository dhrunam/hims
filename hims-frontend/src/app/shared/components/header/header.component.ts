import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string = '';
  constructor(private authService: AuthService, private localStorageService: LocalStorageService, private router: Router){}
  ngOnInit(): void{
    this.username = this.localStorageService.getUserName();
  }
  onLogout(){
    this.authService.onLogout().subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.localStorageService.clearSession();
      }
    })
  }
}
