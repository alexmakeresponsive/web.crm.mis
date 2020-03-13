import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl }                                        from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import MsaResponse                    from "@AppModule/msa/domain/model/ticket/Response";
import {AuthService}                  from "@AppModule/common/service/auth/auth.service";
import { HttpClient, HttpHeaders }    from '@angular/common/http';


@Component({
  templateUrl: './component.html',
  styleUrls: ['./component.styl'],
})
export class ModalM2EntryComponent implements OnInit, AfterViewInit {
  @Input() parameters;
  @Input() payload;

  @Output() emitterData:EventEmitter<any>      = new EventEmitter();
  @Output() emitterAfterInit:EventEmitter<any> = new EventEmitter();

  @Output() emitterAction:EventEmitter<any>    = new EventEmitter();

  form:         FormGroup;

  formHidden:  FormGroup;
  formModal:    FormGroup;

  objectKeys = Object.keys;

  closeResult: string;

  dataIsFetched: boolean = false;

  data:any;
  dataSelected:any = {};

  modalTitle:string = '';
  modalOwner:string = '';

  valueMain:string = '';
  idMain:number;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private modalService: NgbModal
  )
  {

  }

  async open(content, owner) {
    await this.putData();

    if (owner === 'main') {
      this.modalOwner = 'main';
    } else {
      this.modalOwner = 'other';
    }

    console.log(this.data);

    this.formModal =  this.createFormModalGroupAfterOpenModal(this.modalOwner);

    this.modalTitle = this.parameters.options.modalTitle[this.modalOwner];

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      scrollable: true,
    }).result.then((result) => {
      // click to bottom button
      if (this.modalOwner === 'main') {
        let value = this.formModal.controls[this.parameters.formModalControlName.main].value;

        this.valueMain =  this.parameters.renderValueMain(this.data[value]);
        this.idMain    = +this.data[value].id;

        this.formHidden.patchValue({
          [this.parameters.formControlNameHidden.main]: +this.data[value].id
        });
      } else {
        this.dataSelected = {};

        for (let controlName of Object.keys(this.formModal.controls)) {
          if (this.formModal.controls[controlName].value) {
            let id = +controlName.replace(this.parameters.formModalControlName.other + '_', '');

            this.dataSelected[id] = this.data[id];
          }
        }

        this.formHidden.patchValue({
          [this.parameters.formControlNameHidden.other]: JSON.stringify(Object.keys(this.dataSelected))
        });
      }

      let valueParent = {
        main: this.idMain,
        other: Object.keys(this.dataSelected)
      };

      this.form.patchValue({
        [this.parameters.formControlNameHidden.parent]: JSON.stringify(valueParent)
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
    this.form        = this.createFormGroup();

    this.formHidden = this.createFormHiddenGroup();
    this.formModal   = this.createFormModalGroup();
  }

  ngAfterViewInit() {
    this.emitterAfterInit.emit({});
  }

  createFormGroup() {
    let valueParentStr = this.payload ? this.payload : null;

    if (valueParentStr) {
      let valueParent = JSON.parse(valueParentStr);

      let idMain      = valueParent.main;
      let idListOther = valueParent.other;

      let idList = [];
          idList.push(idMain);
          idList = [...idList, ...idListOther ];

      idList = idList.map((value) => {
        return +value;
      });

      this.loadItemSelectedData(idList, idMain);
    }

    return new FormGroup({
      [this.parameters.formControlNameHidden.parent]: new FormControl(valueParentStr, []),
    });
  }

  createFormHiddenGroup() {
    return new FormGroup({
      [this.parameters.formControlNameHidden.main]: new FormControl('', []),
      [this.parameters.formControlNameHidden.other]: new FormControl('', []),
    });
  }

  createFormModalGroup() {
    return new FormGroup({
      [this.parameters.formModalControlName.main]: new FormControl(null, []),
      [this.parameters.formModalControlName.other]: new FormControl(null, []),
    });
  }

  createFormModalGroupAfterOpenModal(owner) {

    if (this.modalOwner === 'main') {
      return new FormGroup({
        [this.parameters.formModalControlName.main]: new FormControl(null, []),
      });
    }

    let result = {};

    for (let key of Object.keys(this.data)) {
      let name = this.parameters.formModalControlName[owner] + '_' + this.data[key].id;
      result[name] = new FormControl(false, []);
    }

    return new FormGroup(result);
  }

  removeMain(id) {
    this.formHidden.patchValue({
      [this.parameters.formControlNameHidden.main]: null
    });
    this.valueMain = '';

    let valueParentStr    = this.form.controls[this.parameters.formControlNameHidden.parent].value;

    let valueParent       = JSON.parse(valueParentStr);
        valueParent.main  = null;

    this.form.patchValue({
      [this.parameters.formControlNameHidden.parent]: JSON.stringify(valueParent)
    });
  }

  removeOther(id) {
    delete this.dataSelected[id];

    let valueOtherStr = this.formHidden.controls[this.parameters.formControlNameHidden.other].value;

    let valueOther    = JSON.parse(valueOtherStr);

    valueOther = valueOther.filter((value)=> {
      if (+value !== id) {
        return value;
      }
    });

    this.formHidden.patchValue({
      [this.parameters.formControlNameHidden.other]: JSON.stringify(valueOther)
    });

    let valueParentStr    = this.form.controls[this.parameters.formControlNameHidden.parent].value;

    let valueParent       = JSON.parse(valueParentStr);
        valueParent.other  = valueOther;

    this.form.patchValue({
      [this.parameters.formControlNameHidden.parent]: JSON.stringify(valueParent)
    });
  }

  select(id) {
    let keyBase = this.parameters.formModalControlName[this.modalOwner];

    let key   = this.modalOwner === 'main' ?  keyBase : keyBase + '_' + id;
    let value = this.modalOwner === 'main' ?  id : !this.formModal.get(key).value;

    this.formModal.patchValue({
      [key]: value
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
      'http://0.0.0.0:8203/dc/member/list',
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

  async loadItemSelectedData(idList, idMain) {
    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);

    await this.http.post<MsaResponse>(
      'http://0.0.0.0:8203/dc/member/item/selected',
      {
        idList: idList
      },
      {
        headers: headers
      }
    ).toPromise()
      .then(
        res => {

          const data = res.data;

          if(idMain) {
            this.valueMain =  this.parameters.renderValueMain(data[idMain]);
            this.idMain    = +idMain;

            this.formHidden.patchValue({
              [this.parameters.formControlNameHidden.main]: +idMain
            });
          }

          delete data[idMain];

          this.dataSelected = data;

          this.formHidden.patchValue({
            [this.parameters.formControlNameHidden.other]: JSON.stringify(Object.keys(data))
          });
        },
        rej => {
        }
      );
  }
}
