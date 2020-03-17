import { Component, OnInit } from '@angular/core';
import {AuthService} from "@CommonServiceAuthModule/auth.service";

@Component({
  selector: 'part-header-msa',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class PartHeaderMsaComponent {
  constructor(
    private authService: AuthService
  ) {
  }

  logout() {
    this.authService.logout();
  }

  userName = JSON.parse(window.localStorage.user).name;
}
