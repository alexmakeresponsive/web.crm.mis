import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { filter } from 'rxjs/operators';

import controls from './form/controls';
import groups   from './form/groups';

import MsaResponse from "../../../../../model/msa/Response";
import {AuthService} from "../../../../../auth.service";


@Component({
  selector: 'page-service-msa-ticket',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class PageServiceMsaTicketComponent implements OnInit {
  controls = controls;
  groups   = groups;

  form:FormGroup;
  formMessageType:string = 'light';

  objectKeys = Object.keys;


  @ViewChild('containerBtn', {static: false}) containerBtn: ElementRef;
  @ViewChild('formMessage', {static: false}) formMessage: ElementRef;
  @ViewChild('formWrapper', {static: false}) formWrapper: ElementRef;

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.form = this.createFormGroup();

    // console.log(this.form);

    this.subscribeToFieldStatusChanges();
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

            if (!this.controls[controlName].errors) {
                 this.controls[controlName].errors = {}
            }

            return false;
          }))
        .subscribe(() => {});
    }
  }

  getLabelWithErrors() {
    const result = [];

    for (let key of Object.keys(this.form.controls)) {

      if (this.form.controls[key]['errors'] !== null) {
        result.push(this.controls[key].label);
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
    }
  };

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

  async doSubmit() {

    this.form.value.amr = 'test';
    console.log(this.form.value);

    this.formValidate();

    if(!this.form.valid) {
        this.formMessageType = 'danger';
        this.renderer.setStyle(this.formMessage.nativeElement, 'display', 'block');

      setTimeout(() => {
        this.renderer.setStyle(this.formMessage.nativeElement, 'display', 'none');
      }, 16000);

      return;
    }

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
        data: this.form.value
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

  catchDataFromEntryWrapper(data) {
    console.log('catchDataFromEntryWrapper', data);
  }
}
