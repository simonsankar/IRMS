import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if(this.auth.isLoggedIn()) {
      console.log('Can Activate');
      return true; 
    } else {
      console.log('Cannot Activate');
      this.router.navigate(['/']);
      return false;      
    }
  }
}
