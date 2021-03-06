import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DashboardAuthService {

  private url:string = '/api/auth/';

  constructor(
    private http: HttpClient,
  ) {
  }

  login(data) {
    return this.http.post<any>(
      this.url + 'login',
      {
        data: data
      }
    )
  }
}
