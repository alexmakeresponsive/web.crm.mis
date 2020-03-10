import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";


@Injectable({providedIn: 'root'})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):boolean {
    const userRole = this.authService.user.role;

    return false;
  }
}
