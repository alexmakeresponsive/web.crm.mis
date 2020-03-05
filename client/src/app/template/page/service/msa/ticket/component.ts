import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
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
  private controls = controls;
  private groups   = groups;

  private form:FormGroup;
  private formData:any  = {};

  private formControls:any = {};
  private formControlsRequired:any = {};

  private entryComponentInstanceCollection = [];

  private formValidateStatus:boolean          = false;
  private formValidateRequiredStatus:boolean  = false;

  private formMessageType:string       = 'light';

  objectKeys = Object.keys;


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
    this.form = this.createFormGroup();

    this.subscribeToFieldStatusChanges();
  }

  ngAfterViewInit() {
    this.formControls = this.form.controls;

    // for (let key of Object.keys(this.controls)) {
    //   if (!this.formControls.hasOwnProperty(key)) {
    //     this.formControls[key] = "";
    //   }
    // }

    // console.log(this.formControls);

    this.getRequiredFields();
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

            // console.log(this.controls[controlName].errors);

            // console.log(this.form);

            if (!this.controls[controlName].errors) {
                 this.controls[controlName].errors = {}
            }

            return false;
          }))
        .subscribe(() => {});
    }
  }

  getRequiredFields() {
    let result = {};

    for (let key of Object.keys(this.controls)) {
      if (this.controls[key].required) {
        result[key] = {
          touched: false,
          type: this.controls[key].type
        };
      }
    }

    this.formControlsRequired = result;
  }

  getLabelWithErrors() {
    let result = [];

    for (let key of Object.keys(this.formControls)) {

      if (this.formControls[key]['errors'] !== null) {
        result.push(this.controls[key].label);
      }
    }

    return result;
  }

  getLabelForRequiredFieldsClean() {
    let result = {};

    // console.log(this.formControlsRequired);

    for (let key of Object.keys(this.formControlsRequired)) {

      // console.log(key);
      // console.log(this.formControls[key]);

      if (!this.formControlsRequired[key].touched) {
            // touched: false
            // if it entry filed then
        if(this.formControlsRequired[key].type === 'entry') {
            result[key] = this.controls[key].label;
        } else {
          if (this.formControls[key].errors !== null) {
            if (this.formControls[key].errors.hasOwnProperty('required')) {
              result[key] = this.controls[key].label;
            }
          }
        }
            // if it not entry filed - check if this.formControls[key].errors.hasOwnProperty('required') then
            // result[key] = this.controls[key].label; else continue
      } else {
        if (this.formControls[key].errors !== null) {
          if (this.formControls[key].errors.hasOwnProperty('required')) {
            // touched: true
            result[key] = this.controls[key].label;
          }
        }
      }
    }

    // console.log(result);

    return result
  }

  getLabelForRequiredFieldsDirty() {
    let result = {};



    return result;
  }

  getLabelForRequiredFields() {
    let result = {};
    let entryNotMatched = true;

    // console.log(this.formControlsRequired);
    // console.log(this.formControls);

    for (let key of Object.keys(this.formControlsRequired)) {

      if (this.formControlsRequired[key].type !== 'entry') {
        continue;
      }

      if(this.formControls.hasOwnProperty(key)) {
        // console.log('entry matched!!');
        this.formControlsRequired[key].touched = true;
        // entryNotMatched = false;
      }
    }

    if (1) {
      result = this.getLabelForRequiredFieldsClean();
    } else {
      // result = this.getLabelForRequiredFieldsDirty();
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

      // console.log('form have required field input');
      this.formMessage.nativeElement.innerHTML ='Поля обязателные к заполнению: ';

      for (let label of Object.values(labelWithErrors)) {
        this.formMessage.nativeElement.innerHTML += label + ', ';
      }

      // console.log(labelWithErrors);
      //show hint under fields
      for(let key of Object.keys(labelWithErrors)) {
        this.controls[key].errors = {required: true};
      }
      //show hint under entry fields
      for (let component of this.entryComponentInstanceCollection) {

        if (!this.formControlsRequired.hasOwnProperty(component.parameters.formControlName)) {
          continue;
        }
        if (!this.formControlsRequired[component.parameters.formControlName].touched) {
          component.parameters.errors = {required:true}
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
      result[key] = this.formControls[key].value;
    }


    console.log(this.formControls);

    for (let key of Object.keys(this.controls)) {
      if (result.hasOwnProperty(key)) {
         continue;
      }
      console.log(key);
      // if (result[key].length === 0) {
      //   result[key] = "";
      // }
    }

    this.formData = result;

    console.log(this.formData);
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

  setDataFromEntryComponent(res) {
    this.formControls = {
      ...this.formControls,
      ...res.controls
    };
  }

  getInstanceEntryComponent(instance) {
    // console.log(instance);
    this.entryComponentInstanceCollection.push(instance);
  }
}
