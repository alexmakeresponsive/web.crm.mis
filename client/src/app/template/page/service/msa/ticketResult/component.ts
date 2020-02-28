import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from "../../../../../auth.service";
import { StorageData } from "../../../../../storage.data";
import MsaResponse from "../../../../../model/msa/Response";

@Component({
  selector: 'page-action-msa-result',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class PageServiceMsaTicketResultComponent {
  tableHeader = [
    {
      text: 'Дата направления'
    },
    {
      text: 'ФИО'
    },
    {
      text: 'Пол'
    },
    {
      text: 'Дата рождения'
    },
    {
      text: 'Диангоз'
    },
    {
      text: 'Вид МСЭ'
    },
    {
      text: 'Комиссия'
    },
    {
      text: 'Статус'
    }
  ];

  tableBody = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private storageData: StorageData
  ) {
    this.loadData();
  }

  loadData() {
    // console.log('loadData...');

    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + token);


    this.http.post<MsaResponse>(
      'http://0.0.0.0:8203/ticket/result',
      {},
      {
        headers: headers
      }
    ).toPromise()
      .then(
        res => {
          // console.log("res: ", res.data);

          this.tableBody = res.data;
          this.storageData.ticketResult = res.data;
        },
        rej => {
          console.log("rej: ", rej);
        }
      );
  }

  removeItem(id) {
    console.log('remove item, id: ', id);
  }
}
