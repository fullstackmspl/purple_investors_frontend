import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

 
  constructor(private authService: AuthService, private store: LocalStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.userValue;
    const token = this.store.getItem('token');
    if (currentUser && token) {
      return true;
    }
    console.log('Could not authenticate');
    this.router.navigate(['/landing'], { queryParams: { 'next': state.url } });
    return false;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  // here you can inject your auth service to check that user is signed in or not
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.userValue) {
      if (this.authService.userValue.roles === 'admin' || this.authService.userValue.roles === 'superadmin' || this.authService.userValue.roles === 'mturkers') {
        this.router.navigate(['/dashboard']);
        return false;
      }
    }
    return true;
  }
}

