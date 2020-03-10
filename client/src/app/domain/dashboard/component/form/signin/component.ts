import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subscription, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from "@SecurityServiceModule/auth.service";

@Component({
  selector: 'form-sign-in',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class FormSignInComponent implements OnInit{
  form: FormGroup;

  errorStorageText = {
    403: {
      message: "Login or password is wrong"
    },
    404:  {
      message: "Login not found"
    }
  };

  errorCurrentText: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
    ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl('', [
        Validators.required,
      ]),
      'password': new FormControl('', [
        Validators.required,
      ])
    });
  }

  onSubmit(): Observable<any> | Subscription {
    const customerData = this.form.value;

    return this.http.post<any>(
      'http://0.0.0.0:8202/auth/login',
      {
        data: customerData
      }
      // this.httpOptions
    ).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    ).subscribe(r => {
      this.errorCurrentText = '';

      this.authService.login(r);
    });
  }

  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      this.showError(error.status);
    }
    return throwError(errorMessage);
  }

  showError(status: number) {
    this.errorCurrentText = this.errorStorageText[status].message;
  }
}
