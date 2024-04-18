import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class AuthGuard{
  constructor(private authService: AuthService, private router: Router) {}

  OnInit() {
    this.authService.isLoggedIn();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const username = this.authService.getUsername();
      if (username) {
        // User is logged in, allow access
        return true;
      } else {
        // User is not logged in, redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
  }
}