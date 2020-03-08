import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {StorageData} from "../../../../../storage.data";
import {AuthService} from "../../../../../auth.service";
import {EventService} from "../../../../../event.service";
import MsaResponse from "../../../../../model/msa/Response";

@Component({
  selector: 'page-service-msa-journal-item',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class PageServiceMsaTicketJournalItemComponent {
  data: any;
  dataHead:any = {};
  dataIsFetched: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private eventService: EventService,
    private http: HttpClient,
    private storageData: StorageData
  )
  {

  }

  ngOnInit() {
    // console.log('init!');
    this.eventService.skipClicked.subscribe( value => {
      if(value) {
        this.refreshData();
      }
    });

    this.putData();
  }

  async putData() {
    // if browser refresh page
    if (this.storageData.ticketJournal.length === 0) {
      await this.loadData();
    }

    this.route.paramMap.subscribe(params => {

      this.data = this.storageData.ticketJournal[+params.get('id')];

      for (let key of Object.keys(this.data)) {
        if (key.match(/f_6_name_/i)) {
          this.dataHead[key] = this.data[key];
        }
      }

      this.dataIsFetched = true;
    });

    console.log(this.data);
  }

  async refreshData() {
    await this.loadData();

    this.route.paramMap.subscribe(params => {

      const data = this.storageData.ticketJournal[+params.get('id')];

      for (let key of Object.keys(data)) {
        if (key.match(/f_6_name_/i)) {
          this.dataHead[key] = data[key];
        }
      }

      this.dataIsFetched = true;
    });
  }


  async loadData() {
    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);


    await this.http.post<MsaResponse>(
      'http://0.0.0.0:8204/ticket/journal',
      {},
      {
        headers: headers
      }
    ).toPromise()
      .then(
        res => {
          this.storageData.ticketJournal = res.data;
        },
        rej => {
          console.log("rej: ", rej);
        }
      );
  }
}
