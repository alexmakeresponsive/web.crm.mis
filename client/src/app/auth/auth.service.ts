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

    if (this.user.status.auth === 'not-authorized') {
      return false;
    }

    let t = 1000 * 60;

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
    }
    return throwError(errorMessage);
  }

  login(r) {
    window.localStorage.user = JSON.stringify({
      name:   r.user.name,
    });

    this.user.status.auth = 'authorized';

    this.authorizationService.RoleList = r.roleList;

    this.keychain.tokenAccessList = r.tokenAccessList;
    this.keychain.tokenRefresh    = r.tokenRefresh;

    this.refreshTokenListBackground();

    let url = '';

    if (window.localStorage.hasOwnProperty('state')) {
      const urlLastVisited = JSON.parse(window.localStorage.state).url.lastVisited;
      url = urlLastVisited;
    }

    this.router.navigateByUrl(url);
  }

  logout() {
    if (this.router.url === '/') {
      const state = JSON.parse(window.localStorage.state);
            state.url.lastVisited = this.router.url;

      window.localStorage.state = JSON.stringify(state);
    }

    window.localStorage.removeItem('user');

    this.user.status.auth = 'not-authorized';

    this.http.post<any>(
      'http://0.0.0.0:8202/auth/logout',
      {}
    ).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    ).subscribe(r => {
      this.router.navigateByUrl('/login');
    });
  }

  isAuth() {
    const status = this.user.status.auth;

    if (status === 'authorized') {
      return true;
    }

    return new Promise((res, rej) => {
      this.http.get<any>(
          'http://0.0.0.0:8202/auth/check',
          {}
        ).pipe(
          retry(0),
          catchError(this.handleError.bind(this))
        ).subscribe(r => {
          if(r.status === 'authorized') {
            this.user.status.auth = 'authorized';
            res(true);
          } else {
            this.user.status.auth = 'not-authorized';
            this.router.navigateByUrl('login');
            res(false);
          }
        });
    });
  }

  async isAuth3() {
    try {
      await this.http.get<CheckResponse>(
        'http://0.0.0.0:8202/auth/check',
        {}
      ).toPromise()
        .then(
          (r:any) => {
            this.async2data = r;
            this.async2dataIsFetched = true;

            this.authorizationService.RoleList = r.roleList;

            this.keychain.tokenAccessList = r.tokenAccessList;
            this.keychain.tokenRefresh    = r.tokenRefresh;
          },
          rej => {
            this.async2dataIsFetched = false;
          }
        );
    } catch (e) {

    }

    return false;
  }
}
