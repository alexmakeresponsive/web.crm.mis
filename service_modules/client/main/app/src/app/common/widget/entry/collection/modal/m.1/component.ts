import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import { filter } from 'rxjs/operators';

import MsaResponse                    from "@MsaModule/widget/model/ticket/Response";
import {AuthService}                  from "@CommonServiceAuthModule/auth.service";
import { HttpClient, HttpHeaders }    from '@angular/common/http';


@Component({
  templateUrl: './component.html',
  styleUrls: ['./component.styl'],
})
export class ModalM1EntryComponent implements OnInit, AfterViewInit {
  @Input() parameters;
  @Input() payload;

  @Output() emitterData:EventEmitter<any>      = new EventEmitter();
  @Output() emitterAfterInit:EventEmitter<any> = new EventEmitter();

  @Output() emitterAction:EventEmitter<any>    = new EventEmitter();

  form:FormGroup;
  formModal:FormGroup;

  objectKeys = Object.keys;

  closeResult: string;

  dataIsFetched: boolean = false;
  data:any;
  dataItem:any = '';


  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private modalService: NgbModal
  )
  {

  }

  open(content) {
    this.putData();

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      scrollable: true,
    }).result.then((result) => {
      // click to bottom button

      let id = this.formModal.get(this.parameters.formModalControlName).value;

      if (!id) {
        return;
      }

      let value = this.parameters.rendererControlNameById(id, this.data);

      this.form.patchValue({
        [this.parameters.formControlNameHidden]: id
      });

      this.form.patchValue({
        [this.parameters.formControlName]: value
      });

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // click to header button
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.form      = this.createFormGroup();
    this.formModal = this.createFormModalGroup();

                     this.subscribeToFieldStatusChanges();
  }

  ngAfterViewInit() {
    this.emitterAfterInit.emit({});
  }

  createFormGroup() {
    let valueHidden = this.payload ? this.payload : null;

    if (valueHidden) {
      this.loadItemData(valueHidden);
    }

    return new FormGroup({
      [this.parameters.formControlNameHidden]: new FormControl(valueHidden, []),
      [this.parameters.formControlName]: new FormControl('', []),
    });
  }

  createFormModalGroup() {
    return new FormGroup({
      [this.parameters.formModalControlName]: new FormControl(null, []),
    });
  }

  subscribeToFieldStatusChanges() {
    this.form.get(this.parameters.formControlName).statusChanges
      .pipe(
        filter((status: string) => {
          this.parameters.errors = this.form.get(this.parameters.formControlName).errors;

          if (!this.parameters.errors) {
            this.parameters.errors = {}
          }

          return false;
        }))
      .subscribe(() => {
      });
  }

  remove() {
    this.formModal.patchValue({
      [this.parameters.formModalControlName]: null
    });

    this.form.patchValue({
      [this.parameters.formControlNameHidden]: null
    });
    this.form.patchValue({
      [this.parameters.formControlName]: ''
    });
  }

  select(id) {
    this.formModal.patchValue({
      [this.parameters.formModalControlName]: id
    });
  }

  async putData() {
    if (this.dataIsFetched) {
      return;
    }

    await this.loadData();

    this.dataIsFetched = true;
  }

  async loadData() {
    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + token);


    await this.http.post<MsaResponse>(
      '/api/main/dc/protocol/list',
      {},
      {
        headers: headers
      }
    ).toPromise()
      .then(
        res => {
          this.data = res.data;
        },
        rej => {
        }
      );
  }

  async loadItemData(id) {
    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);


    await this.http.post<MsaResponse>(
      '/api/main/dc/protocol/item',
      {
        id: id
      },
      {
        headers: headers
      }
    ).toPromise()
      .then(
        res => {
          this.dataItem = res.data;

          this.form.patchValue({
            [this.parameters.formControlName]: this.parameters.rendererControlName(this.dataItem)
          });
        },
        rej => {
        }
      );
  }
}
