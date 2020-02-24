import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'part-header-default',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class PartHeaderDefaultComponent {
  userName = JSON.parse(window.localStorage.user).name;
}
