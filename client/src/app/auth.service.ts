import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subscription, Observable, throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';

import { CheckResponse } from './model/auth/check.response'
import { Keychain } from './model/auth/keychain'

import { AuthorizationService } from "./authorization.service";

@Injectable({providedIn: 'root'})
export class AuthService  {
  user = {
    role: 'guest',
    status: {
      auth: 'not-authorized'
    }
  };

  private keychain:Keychain = {
    tokenAccessList: null,
    tokenRefresh: null
  };

  async2data: CheckResponse;
  async2dataIsFetched: boolean;


  constructor(
    private http: HttpClient,
    private router: Router,
    private authorizationService: AuthorizationService,
  ) {
  }

  getKeyChain() {
    return this.keychain;
  }

  refreshTokenListBackground() {

    console.log('start refreshTokenListBackground...');

    if (this.user.status.auth === 'not-authorized') {
      return false;
    }

    let t = 1000 * 4;

    setTimeout(() => {
      this.http.post<any>(
        'http://0.0.0.0:8202/auth/refresh',
        {
          refreshToken: this.keychain.tokenRefresh
        }
      ).pipe(
        retry(0),
        catchError(this.handleError.bind(this))
      ).subscribe(r => {
        console.log('refreshTokenListBackground: ', r);

        this.keychain.tokenAccessList = r.tokenAccessList;
        this.keychain.tokenRefresh    = r.tokenRefresh;

        this.refreshTokenListBackground();
      });
    }, t);
  }

  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      console.log(error);
    }
    return throwError(errorMessage);
  }

  login(r) {
    window.localStorage.user = JSON.stringify({
      name:   r.user.name,
    });

    this.user.status.auth = 'authorized';

    console.log('r: ', r);
    this.authorizationService.RoleList = r.roleList;

    this.keychain.tokenAccessList = r.tokenAccessList;
    this.keychain.tokenRefresh    = r.tokenRefresh;

    this.refreshTokenListBackground();
  }

  logout() {
    window.localStorage.removeItem('user');

    this.user.status.auth = 'not-authorized';
  }

  isAuth() {
    const status = this.user.status.auth;

    console.log(status);

    if (status === 'authorized') {
      return true;
    }

    return new Promise((res, rej) => {

      // console.log('fetch status...');

      this.http.get<any>(
          'http://0.0.0.0:8202/auth/check',
          {}
        ).pipe(
          retry(0),
          catchError(this.handleError.bind(this))
        ).subscribe(r => {
          if(r.status === 'authorized') {
            // console.log('user is authorized');

            this.user.status.auth = 'authorized';
            res(true);
          } else {
            // console.log('user is not-authorized');

            this.user.status.auth = 'not-authorized';
            this.router.navigateByUrl('login');
            res(false);
          }
        });
    });
  }

  // async isAuth2() {
  //   this.async2data = await this.http.get<CheckResponse>(
  //     'http://0.0.0.0:8202/auth/check',
  //     {}
  //   ).toPromise();
  //
  //   // console.log(this.async2data);
  //   console.log('isAuth2');
  //
  //   return false;
  // }

  async isAuth3() {
    try {
      await this.http.get<CheckResponse>(
        'http://0.0.0.0:8202/auth/check',
        {}
      ).toPromise()
        .then(
          res => {
            // console.log("res: ", res);
            this.async2data = res;
            this.async2dataIsFetched = true;
          },
          rej => {
            // console.log("rej: ", rej);
            this.async2dataIsFetched = false;
          }
        );
    } catch (e) {
      console.log(e);
    }


    // console.log('isAuth2');

    return false;
  }
}
