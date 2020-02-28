import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import {StorageData} from "../../../../../storage.data";

@Component({
  selector: 'page-service-msa-result-item',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class PageServiceMsaTicketResultItemComponent {
  data: any;
  constructor(
    private route: ActivatedRoute,
    private storageData: StorageData
  )
  {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.data = this.storageData.ticketResult[+params.get('id') -1];
    });
  }
}
