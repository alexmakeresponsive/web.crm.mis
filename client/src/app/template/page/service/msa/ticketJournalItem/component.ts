import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {StorageData} from "../../../../../storage.data";
import {AuthService} from "../../../../../auth.service";
import MsaResponse from "../../../../../model/msa/Response";

@Component({
  selector: 'page-service-msa-journal-item',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class PageServiceMsaTicketJournalItemComponent {
  data: any;
  dataIsFetched: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private storageData: StorageData
  )
  {

  }

  ngOnInit() {
    // console.log('init!');

    this.putData();
  }

  async putData() {
    if (this.storageData.ticketJournal.length === 0) {
      // console.log('putData, load data');
      await this.loadData();
    }

    // console.log(this.storageData.ticketJournal);
    //   console.log('putData, go');

    this.route.paramMap.subscribe(params => {
      this.dataIsFetched = true;
      this.data = this.storageData.ticketJournal[+params.get('id')];

      // console.log(this.data);
    });
  }


  async loadData() {
    // console.log('loadData...');

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
          // console.log("res: ", res.data);

          // console.log('data loaded');
          this.storageData.ticketJournal = res.data;

          // this.route.paramMap.subscribe(params => {
          //   this.dataIsFetched = true;
          //   this.data = this.storageData.ticketJournal[+params.get('id') -1];
          // });
        },
        rej => {
          console.log("rej: ", rej);
        }
      );
  }
}
