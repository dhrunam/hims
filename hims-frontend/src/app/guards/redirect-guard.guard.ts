import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RedirectGuardGuard implements CanActivate {
  constructor(private storage: LocalStorageService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.storage.getToken()){
        return true;
      }
      alert('Please login to access dashboard.');
      this.router.navigateByUrl('/login');
      return false;
  }
  
}
