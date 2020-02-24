import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subscription, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {Router } from '@angular/router';
import {AuthService} from "../../../../auth.service";


@Component({
  selector: 'part-nav-main',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class PartNavMainComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
    ) {
  }

  itemsDefault = [
    {
      link: '',
      text: 'Home'
    },
    {
      link: '/about',
      text: 'About'
    },
  ];

  // links = this.linksDefault.map((item) => {
  //   item.isActive  = false;
  //   item.isVisible = false;
  //
  //   if (item.href === this.path) {
  //     item.isActive = true;
  //   }
  //
  //   return item;
  // });

  logout(): Observable<any> | Subscription {
    console.log('logout');
    return this.http.post<any>(
      'http://0.0.0.0:8202/ann/logout',
      {}
    ).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    ).subscribe(r => {
      // console.log(r);
      this.authService.logout();

      this.router.navigateByUrl('/login');
    });
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

}
