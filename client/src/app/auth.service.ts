import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subscription, Observable, throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';

import { CheckResponse } from './model/auth/check.response'

@Injectable({providedIn: 'root'})
export class AuthService  {
  user = {
    status: {
      auth: 'not-authorized'
    }
  };

  async2data: CheckResponse;
  async2dataIsFetched: boolean;


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
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
      name:   r.name,
      id:     r.id
    });

    this.user.status.auth = 'authorized';
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

      console.log('fetch status...');

      this.http.get<any>(
          'http://0.0.0.0:8202/ann/check',
          {}
        ).pipe(
          retry(0),
          catchError(this.handleError.bind(this))
        ).subscribe(r => {
          if(r.status === 'authorized') {
            console.log('user is authorized');

            this.user.status.auth = 'authorized';
            res(true);
          } else {
            console.log('user is not-authorized');

            this.user.status.auth = 'not-authorized';
            this.router.navigateByUrl('login');
            res(false);
          }
        });
    });
  }

  // async isAuth2() {
  //   this.async2data = await this.http.get<CheckResponse>(
  //     'http://0.0.0.0:8202/ann/check',
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
        'http://0.0.0.0:8202/ann/check',
        {}
      ).toPromise()
        .then(
          res => {
            console.log("res: ", res);
            this.async2data = res;
            this.async2dataIsFetched = true;
          },
          rej => {
            console.log("rej: ", rej);
            this.async2dataIsFetched = false;
          }
        );
    } catch (e) {
      console.log(e);
    }


    console.log('isAuth2');

    return false;
  }
}
