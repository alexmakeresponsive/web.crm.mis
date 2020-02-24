import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";

import { CheckResponse } from './model/auth/check.response'


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Promise<any> | boolean {

    return this.canActivateWorker2();

    // return this.authService.isAuth2();
  }

  // async canActivateWorker() {
  //
  //   const data = await this.authService.isAuth();
  //
  //   console.log(data);
  //
  //   return data;
  // }

  async canActivateWorker2() {

    await this.authService.isAuth3();

    if(this.authService.async2dataIsFetched === false) {
      this.router.navigateByUrl('login');
      return false;
    }

    let async2data =  this.authService.async2data;    console.log(async2data);

    if(async2data.status === 'authorized') {
      return true;
    }

      this.router.navigateByUrl('login');
      return false;
  }

}
