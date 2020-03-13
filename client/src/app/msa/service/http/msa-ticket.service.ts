import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "@CommonServiceAuthModule/auth.service";
import MsaResponse from "@MsaModule/domain/model/ticket/Response";

@Injectable({providedIn: 'root'})
export class MsaTicketService {

  private url:string = 'http://0.0.0.0:8204/ticket';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  private getHeaders() {
    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + token);

    return headers;
  }

  getJournalStream() {
    return this.http.post<MsaResponse>(
      this.url + '/journal',
      {},
      {
        headers: this.getHeaders()
      }
    )
  }

  getJournalRemoveItemStream(id) {
    return this.http.post<MsaResponse>(
      this.url + '/journal/remove',
      {
        id_item: id
      },
      {
        headers: this.getHeaders()
      }
    )
  }

  getResultStream() {
    return this.http.post<MsaResponse>(
      this.url + '/result',
      {},
      {
        headers: this.getHeaders()
      }
    )
  }

  getResultRemoveItemStream(id) {
    return this.http.post<MsaResponse>(
      this.url + '/result/remove',
      {
        id_item: id
      },
      {
        headers: this.getHeaders()
      }
    )
  }

  getTicketAddStream(formData) {
    return this.http.post<MsaResponse>(
      this.url + '',
      {
        data: formData
      },
      {
        headers: this.getHeaders()
      }
    )
  }

  getTicketUpdateStream(formData) {
    return this.http.post<MsaResponse>(
      this.url + '/update',
      {
        data: formData
      },
      {
        headers: this.getHeaders()
      }
    )
  }
}
