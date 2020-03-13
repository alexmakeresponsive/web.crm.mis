import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Router } from '@angular/router';
import {AuthService} from "@AppModule/common/service/auth/auth.service";


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

  logout() {
    this.authService.logout();
  }

  userName = JSON.parse(window.localStorage.user).name;
}
