import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { filter } from 'rxjs/operators';

import controls from './config/controls';
import groups   from './config/groups';

import MsaResponse    from "@AppModule/msa/domain/model/ticket/Response";

import {AuthService}  from "@AppModule/common/service/auth/auth.service";
import {EventService} from "@AppModule/common/service/event/event.service";

import {EntryWrapper} from "@AppModule/common/widget/entry/collection/wrapper";

import {MsaTicketService} from "@MsaModule/service/ticket/msa-ticket.service";


@Component({
  selector: 'form-088-y',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class Form088yComponent implements OnInit, AfterViewInit {
  @Input() payloadFromServer;

  private urlSubmit;
  private id;

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
    private msaTicketService: MsaTicketService,
    private http: HttpClient,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.id        = !this.payloadFromServer ? null : this.payloadFromServer.id;

    if (!this.payloadFromServer) {
         this.payloadFromServer = {};
    }

    this.form = this.createFormGroup();
                this.subscribeToFieldStatusChanges();
  }

  ngAfterViewInit() {
    this.buildFormControls();

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
            list: []
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
  }

  subscribeToFieldStatusChanges() {
    for (let controlName of Object.keys(this.controls)) {

      if(this.controls[controlName].exclude) {
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
        result = [
          ...result,
          ...this.controls[key].iterator.label.default({
            key:                              key,
            list:                             this.formControls[key].list,
            entryComponentInstanceCollection: this.entryComponentInstanceCollection
          })
        ];
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
        result = {
          ...result,
          ...this.controls[key].iterator.label.require({
            key:                              key,
            list:                             this.formControls[key].list,
            entryComponentInstanceCollection: this.entryComponentInstanceCollection
          })
        };
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

    let message = '';

    if (labelWithErrors.length !== 0) {
      message ='Форма не валидна. Проверьте поля: ';

      for (let label of labelWithErrors) {
        message += label + ', ';
      }

      const pos = message.lastIndexOf(',');

            message = message.substring(0, pos);
            message = message.trim();
            message += '.';

      this.formMessage.nativeElement.innerHTML = message;

      this.formValidateStatus = false;
    } else {
      this.formValidateStatus = true;
    }
  };

  formValidateRequired() {
    const labelWithErrors = this.getLabelForRequiredFields();

    let message = '';

    if (Object.values(labelWithErrors).length !== 0) {
      message ='Поля обязателные к заполнению: ';

      for (let label of Object.values(labelWithErrors)) {
        message += label + ', ';
      }

      const pos = message.lastIndexOf(',');

            message = message.substring(0, pos);
            message = message.trim();
            message += '.';

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

          this.controls[component.parameters.formControlName].iterator.error.require({
            component:                        component,
            formControls:                     this.formControls,
            entryComponentInstanceCollection: this.entryComponentInstanceCollection
          });
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

      this.formMessage.nativeElement.innerHTML = message;

      this.formValidateStatus = false;
    } else {
      this.formValidateStatus = true;
    }
  }

  getFormData() {
    let result = {};

    for(let key of Object.keys(this.formControls)) {
      if(this.formControls[key].hasOwnProperty('multiple')) {
        let value = {};
        for (let index of Object.keys(this.formControls[key].list)) {
          value[+index+1] = {id: +index+1};
          for (let controlName of Object.keys(this.formControls[key].list[index])) {
            value[+index+1][controlName] = this.formControls[key].list[index][controlName].value;
          }
          result[key] = JSON.stringify(value);
        }
        continue;
      }

      if(typeof this.formControls[key].value === 'object' && this.formControls[key].value !== null) {
        if (this.formControls[key].value.hasOwnProperty('date')) {
          result[key] = this.formControls[key].value.formatted;
          continue;
        }
      }

      result[key] = this.formControls[key].value;
    }

    if (this.payloadFromServer.id) {
      result['id'] = this.payloadFromServer.id;
    }

    this.formData = result;
  }

  createFormGroup() {
    const FormGroupOptions = {};

    for (let controlName of Object.keys(this.controls)) {
      const validators = [];

      if(this.controls[controlName].exclude) {
        continue;
      }

      for (let validator of Object.values(this.controls[controlName]['validators'])) {
        validators.push(validator['body']);
      }

      let value = this.payloadFromServer.hasOwnProperty(controlName) ? this.payloadFromServer[controlName] : '';

      if (validators.length === 0) {
        FormGroupOptions[controlName] = new FormControl(value);
      } else {
        FormGroupOptions[controlName] = new FormControl(value, validators);
      }
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
    window.scrollTo(0, 0);
  }

  scrollToDown() {
    window.scrollTo(0, document.body.scrollHeight);
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

  getSream(formData) {
    if (!this.payloadFromServer) {
      return this.msaTicketService.getTicketAddStream(formData);
    }
      return this.msaTicketService.getTicketUpdateStream(formData);
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

    console.log(this.formData);

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

    await this.getSream(this.formData).toPromise()
      .then(
        res => {

          if (!this.payloadFromServer.id) {
            this.form.reset();
          }

          if (this.payloadFromServer.id) {
            // fire event for update storage.data
            this.eventService.updateTicketJournalItem();
          }

          setTimeout(() => {
            this.formMessageType = 'success';
            this.formMessage.nativeElement.innerHTML ='Форма сохранена';
          }, 1000);

          setTimeout(() => {
            this.renderer.setStyle(this.formWrapper.nativeElement, 'opacity', '1');
            this.renderer.setStyle(this.formMessage.nativeElement, 'display', 'none');
          }, 3000);
        },
        rej => {

        }
      );
  }

  doClear() {
    this.formMessage.nativeElement.innerHTML ='Форма очищена';
    this.form.reset();

    this.showMessage({
      color: 'success',
      timeout: 2000
    });
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
    let key = instance.parameters.formControlName;

    if (instance.parameters.multiple) {
        key = instance.parameters.formControlName + '_' + instance.payload.id;
    }

    this.entryComponentInstanceCollection[key] = instance;


    if (this.formInitStatus === 'ready') {
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

  }

  addEntryComponentInstance(res) {
    const key = res.formControlName + '_' + res.payload.id;
  }
}