import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth.service';
import { AuthResponse } from '../shared/interfaces/auth-response.interface';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLoader: boolean = false;
  showErrMessage = null;
  constructor (private authService: AuthService, private router: Router){}
  login(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.showLoader = true;
      if(this.showErrMessage){
        this.showErrMessage = '';
      }
      let fd = new FormData();
      fd.append('username', data.value.username);
      fd.append('password', data.value.password);
      fd.append('client', 'api');
      this.authService.onLogin(fd).subscribe({
        next: (data:AuthResponse) => {
          this.router.navigate(['/dashboard']);
          this.showLoader = false;
        },
        error: err => {
          this.showErrMessage = err.error.non_field_errors[0];
          this.showLoader = false;
        },
      })
    } 
  }
}
