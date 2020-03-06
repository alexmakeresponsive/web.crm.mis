import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { filter } from 'rxjs/operators';

import controls from './form/controls';
import groups   from './form/groups';

import MsaResponse from "../../../../../model/msa/Response";
import {AuthService} from "../../../../../auth.service";

import {EntryWrapper} from "../../../../../entry/wrapper";



@Component({
  selector: 'page-service-msa-ticket',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class PageServiceMsaTicketComponent implements OnInit, AfterViewInit {
  @Input() payloadFromServer = {
    t_25: JSON.parse('{"1":{"id":1},"2":{"id":2}}') // create new table in db for t_25
  };

  private controls = controls;
  private groups   = groups;

  private form:FormGroup;
  private formData:any  = {};

  private formControls:any = {};

  private entryComponentInstanceCollection = {};

  private formValidateStatus:boolean          = false;

  private formMessageType:string       = 'light';

  objectKeys = Object.keys;

  private formInitStatus:string = 'not-ready';


  @ViewChild('containerBtn', {static: false}) containerBtn: ElementRef;
  @ViewChild('formMessage', {static: false}) formMessage: ElementRef;
  @ViewChild('formWrapper', {static: false}) formWrapper: ElementRef;

  @ViewChild(EntryWrapper, {static: false})
  private entryWrapper: EntryWrapper;



  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    // console.log('ngOnInit');
    this.form = this.createFormGroup();
                this.subscribeToFieldStatusChanges();
  }

  ngAfterViewInit() {
    this.buildFormControls();

    // console.log('formInitStatus: ready');
    this.formInitStatus = 'ready';
  }

  buildFormControls() {
    this.formControls = Object.assign({}, this.form.controls);

    for (let key of Object.keys(this.entryComponentInstanceCollection)) {

      const component = this.entryComponentInstanceCollection[key];

      if (component.parameters.multiple) {

        if(this.formControls[component.parameters.formControlName] === undefined) {   // for next iteration
          this.formControls[component.parameters.formControlName] = {
            multiple: true,
            list: []  // use object instead array
          };
        }

        let item = {};

        for (let key of Object.keys(component.form.controls)) {
          item[key] = component.form.controls[key];
        }
        this.formControls[component.parameters.formControlName].list.push(item);

        continue;
      }

      for (let key of Object.keys(component.form.controls)) {
        this.formControls[key] = component.form.controls[key];
      }
    }

    // console.log(this.entryComponentInstanceCollection);
    // console.log(this.formControls);
  }

  subscribeToFieldStatusChanges() {
    for (let controlName of Object.keys(this.controls)) {

      if(this.controls[controlName].validation == 'not-validate') {
        continue;
      }

      this.form.get(controlName).statusChanges
        .pipe(
          filter((status: string) => {
            this.controls[controlName].errors = this.form.get(controlName).errors;

            if (!this.controls[controlName].errors) {
                 this.controls[controlName].errors = {}
            }

            return false;
          }))
        .subscribe(() => {});
    }
  }

  getLabelWithErrors() {
    let result = [];

    for (let key of Object.keys(this.formControls)) {
      // if multiple
      if(this.formControls[key].hasOwnProperty('multiple')) {
        for (let id of Object.keys(this.formControls[key].list)) {
          for (let controlName of Object.keys(this.formControls[key].list[id])) {
            if (this.formControls[key].list[id][controlName].errors === null) {
              continue;
            }

            let resultId = +id + 1;
            let formControlId = key + '_' + resultId;

            let resultKey     = controlName + '_' + resultId;

            if (this.formControls[key].list[id][controlName].errors !== null) {
              for (let colName of Object.keys(this.entryComponentInstanceCollection[formControlId].parameters.body)) {
                if (!this.entryComponentInstanceCollection[formControlId].parameters.body[colName].hasOwnProperty(controlName)) {
                  continue;
                }

                result.push(this.entryComponentInstanceCollection[formControlId].parameters.body[colName][controlName].label);
              }
            }
          }
        }
        continue;
      }
      // if multiple

      if (this.formControls[key]['errors'] !== null) {
        result.push(this.controls[key].label);
      }
    }

    return result;
  }

  getLabelForRequiredFields() {
    let result = {};

    for (let key of Object.keys(this.formControls)) {

      // if multiple
      // add property multipleType to entry component parameters
      // and getLabelForRequiredFields for multiple and multipleType
      // also add listLevel - if entry component have nested level > 1 - for hard forms
      // instead
      // controlName: { multiple: true, list: [0: FormControl, 1: { multiple: true, list: [...]}] }
      // try use
      // controlName: { multiple: true, list: {
      //                                        controlName_levelValue } }
      //
      if(this.formControls[key].hasOwnProperty('multiple')) {
        // console.log('getLabelForRequiredFields: multiple detected');
        for (let id of Object.keys(this.formControls[key].list)) {
          for (let controlName of Object.keys(this.formControls[key].list[id])) {
            if (this.formControls[key].list[id][controlName].errors === null) {
              continue;
            }

            let resultId = +id + 1;
            let formControlId = key + '_' + resultId;

            let resultKey     = controlName + '_' + resultId;

            if (this.formControls[key].list[id][controlName].errors.required) {
              for (let colName of Object.keys(this.entryComponentInstanceCollection[formControlId].parameters.body)) {
                if (!this.entryComponentInstanceCollection[formControlId].parameters.body[colName].hasOwnProperty(controlName)) {
                  continue;
                }
                result[resultKey] = this.entryComponentInstanceCollection[formControlId].parameters.body[colName][controlName].label
              }
            }
          }
        }
        continue;
      }
      // if multiple

      if (this.formControls[key].errors === null) {
        continue;
      }
      if (this.formControls[key].errors.required) {
        result[key] = this.controls[key].label;
      }
    }

    return result;
  }

  formValidate() {
    const labelWithErrors = this.getLabelWithErrors();

    if (labelWithErrors.length !== 0) {
      this.formMessage.nativeElement.innerHTML ='Форма не валидна. Проверьте поля: ';

      for (let label of labelWithErrors) {
        this.formMessage.nativeElement.innerHTML += label + ', ';
      }

      this.formValidateStatus = false;
    } else {
      this.formValidateStatus = true;
    }
  };

  formValidateRequired() {
    const labelWithErrors = this.getLabelForRequiredFields();

    if (Object.values(labelWithErrors).length !== 0) {
      this.formMessage.nativeElement.innerHTML ='Поля обязателные к заполнению: ';

      for (let label of Object.values(labelWithErrors)) {
        this.formMessage.nativeElement.innerHTML += label + ', ';
      }

      //show hint under fields
      for(let key of Object.keys(labelWithErrors)) {
        if (this.controls[key] !== undefined) {
          this.controls[key].errors = {required: true};
        }
      }
      //show hint under entry fields
      for (let key of Object.keys(this.entryComponentInstanceCollection)) {

        const component = this.entryComponentInstanceCollection[key];

        // if multiple
        if(this.formControls[component.parameters.formControlName].hasOwnProperty('multiple')) {

          let payloadId = component.payload.id;
          let listCollection =  this.formControls[component.parameters.formControlName].list[+payloadId - 1];

          let formControlId = component.parameters.formControlName + '_' + payloadId;

          for (let controlName of Object.keys(listCollection)) {
            if (listCollection[controlName].errors === null) {
              continue;
            }

            if (listCollection[controlName].errors.hasOwnProperty('required')) {
              for (let colName of Object.keys(this.entryComponentInstanceCollection[formControlId].parameters.body)) {
                if (!this.entryComponentInstanceCollection[formControlId].parameters.body[colName].hasOwnProperty(controlName)) {
                  continue;
                }
                  this.entryComponentInstanceCollection[formControlId].parameters.body[colName][controlName].errors[payloadId] = {required:true};
              }
            }
          }
          continue;
        }
        // if multiple

        if (this.formControls[component.parameters.formControlName].errors === null) {
          continue;
        }

        if (component.parameters.validators.hasOwnProperty('required')) {
          component.parameters.errors = {required:true};
        }
      }

      this.formValidateStatus = false;
    } else {
      this.formValidateStatus = true;
    }
  }

  getFormData() {
    let result = {};

    for(let key of Object.keys(this.formControls)) {
      if(this.formControls[key].hasOwnProperty('multiple')) {
        console.log('getFormData: multiple detected');
        continue;
      }
      result[key] = this.formControls[key].value;
    }

    this.formData = result;
  }

  createFormGroup() {
    const FormGroupOptions = {};

    for (let controlName of Object.keys(this.controls)) {
      const validators = [];

      if(this.controls[controlName].validation == 'not-validate') {
        continue;
      }

      for (let validator of Object.values(this.controls[controlName]['validators'])) {
        validators.push(validator['body']);
      }

      FormGroupOptions[controlName] = new FormControl('', validators);
    }

    return new FormGroup(FormGroupOptions);
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (document.body.scrollTop <= 396 || document.documentElement.scrollTop <= 396) {
      const top = 246 + 150 + 30 - window.pageYOffset;
      this.renderer.setStyle(this.containerBtn.nativeElement, 'top', (top + 'px'));
      this.renderer.setStyle(this.containerBtn.nativeElement, 'bottom', 'auto');
    }

    if (document.body.scrollTop > 396 || document.documentElement.scrollTop > 396) {
      this.renderer.setStyle(this.containerBtn.nativeElement, 'top', (30 + 'px'));
      this.renderer.setStyle(this.containerBtn.nativeElement, 'bottom', 'auto');
    }

      const bottomBreakpoint = document.body.clientHeight - window.innerHeight - 30;
      const bottom =  window.innerHeight + window.pageYOffset - document.body.clientHeight - 45 + 90;


      const formMessagePositionTop = window.pageYOffset - 150 + 30;
      const formMessagePositionBottom = document.body.clientHeight - 150 - 45 -47;

    if (document.body.scrollTop <= 150 || document.documentElement.scrollTop <= 150) {
      this.renderer.setStyle(this.formMessage.nativeElement, 'top', (0 + 'px'));
    }
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
      this.renderer.setStyle(this.formMessage.nativeElement, 'top', (formMessagePositionTop + 'px'));
    }

    if ( document.body.scrollTop > (bottomBreakpoint)
      || document.documentElement.scrollTop > (bottomBreakpoint)) {

      this.renderer.setStyle(this.containerBtn.nativeElement, 'top', 'auto');
      this.renderer.setStyle(this.containerBtn.nativeElement, 'bottom', (bottom + 'px'));

      this.renderer.setStyle(this.formMessage.nativeElement, 'top', (formMessagePositionBottom + 'px'));
    }


  }

  scrollToTop() {
    window.scrollTo(0, 0); // values are x,y-offset
  }

  scrollToDown() {
    window.scrollTo(0, document.body.scrollHeight); // values are x,y-offset
  }

  showMessage(options) {
    this.formMessageType = options.color;
    this.renderer.setStyle(this.formMessage.nativeElement, 'display', 'block');

    setTimeout(() => {
      this.renderer.setStyle(this.formMessage.nativeElement, 'display', 'none');
    }, options.timeout);
  }

  hideMessage() {
    this.renderer.setStyle(this.formMessage.nativeElement, 'display', 'none');
  }

  async doSubmit() {

    this.formValidateRequired();

    if(!this.formValidateStatus) {
      this.showMessage({
        color: 'danger',
        timeout: 16000
      });

      return;
    }

    this.formValidate();

    if(!this.formValidateStatus) {
      this.showMessage({
        color: 'danger',
        timeout: 16000
      });

      return;
    }

    this.hideMessage();
    this.getFormData();

    console.log('Form valid!!');
    return;

    this.formMessageType = 'info';
    this.formMessage.nativeElement.innerHTML ='Форма отправляется';
    this.renderer.setStyle(this.formMessage.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.formWrapper.nativeElement, 'opacity', '0.5');


    let top = window.pageYOffset;
    if (window.pageYOffset <= 150 ) {
      top = 0;
    } else {
      top = window.pageYOffset - 120;
    }
    this.renderer.setStyle(this.formMessage.nativeElement, 'top', (top + 'px'));


    // do http
    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + token);

    await this.http.post<MsaResponse>(
      'http://0.0.0.0:8204/ticket',
      {
        data: this.formData
      },
      {
        headers: headers
      }
    ).toPromise()
      .then(
        res => {
          console.log(res);

          setTimeout(() => {
            this.formMessageType = 'success';
            this.formMessage.nativeElement.innerHTML ='Форма сохранена';
          }, 1000);

          setTimeout(() => {
            this.renderer.setStyle(this.formWrapper.nativeElement, 'opacity', '1');
            this.renderer.setStyle(this.formMessage.nativeElement, 'display', 'none');
          }, 3000);

          this.doClear();
        },
        rej => {
          console.log("rej: ", rej);
        }
      );
  }

  doClear() {
    this.form.reset();
  }

  // fire when input in entry component change value
  setDataFromEntryComponent(res) {
    if (res.multiple) {
      this.formControls[res.formControlName].list[res.id - 1] = res.controls;
      return;
    }

    this.formControls = {
      ...this.formControls,
      ...res.controls
    };
  }

  // fire beetwen ngOnInit and ngAfterViewInit
  // and when add new entry component
  getInstanceEntryComponent(instance) {
    // console.log(instance);
    // console.log('getInstanceEntryComponent..');

    let key = instance.parameters.formControlName;

    if (instance.parameters.multiple) {
        key = instance.parameters.formControlName + '_' + instance.payload.id;
    }

    // console.log(key);

    this.entryComponentInstanceCollection[key] = instance;


    if (this.formInitStatus === 'ready') {
      // console.log('getInstanceEntryComponent: buildFormControls...');
      this.buildFormControls();
    }
  }

  actionController(res) {
    switch (res.action) {
      case 'removeEntryComponentInstance': {
        this.removeEntryComponentInstance(res);
        this.buildFormControls();
      }
      break;
      case 'removeAllEntryComponentInstance': {
        this.removeAllEntryComponentInstance(res);
        this.buildFormControls();
      }
        break;
      case 'addEntryComponentInstance': {
        this.addEntryComponentInstance(res);
        // getInstanceEntryComponent will be runned async
      }
      break;
    }

        // rebuild controls after remove/add item
  }

  removeEntryComponentInstance(res) {
    const key = res.formControlName + '_' + res.payload.id;

    delete this.entryComponentInstanceCollection[key];
  }

  removeAllEntryComponentInstance(res) {
    for (let item of res.payload) {
      const key = res.formControlName + '_' + item.id;

      delete this.entryComponentInstanceCollection[key];
    }

    console.log('removeAllEntryComponentInstance');
  }

  addEntryComponentInstance(res) {
    const key = res.formControlName + '_' + res.payload.id;
    // console.log(key);
  }
}
