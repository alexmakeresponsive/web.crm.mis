import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'part-header-default',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class PartHeaderComponent {
  userName = JSON.parse(window.localStorage.user).name;
}
