import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as formFields from './form/fields';
import {EntryDirective} from "../../../../../entry/directive";

@Component({
  selector: 'page-service-msa-ticket',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class PageServiceMsaTicketComponent implements OnInit {
  ff5  = formFields.f5;
  ff6  = formFields.f6;
  ff7  = formFields.f7;
  ff8  = formFields.f8;
  ff9  = formFields.f9;
  ff10 = formFields.f10;
  ff11 = formFields.f11;
  ff13 = formFields.f13;
  ff14 = formFields.f14;
  ff16 = formFields.f16;
  ff17 = formFields.f17;
  ff18 = formFields.f18;
  ff19 = formFields.f19;
  ff20 = formFields.f20;
  ff21 = formFields.f21;
  ff25 = formFields.f25;
  ff26 = formFields.f26;
  ff27 = formFields.f27;
  ff30 = formFields.f30;
  ff3437 = formFields.f3437;
  ff3133 = formFields.f3133;

  form:FormGroup;

  @ViewChild('containerBtn', {static: false}) containerBtn: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      protocol: new FormControl(''),
      field_6_name: new FormGroup({
        field_6_name_last: new FormControl('', [
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required
        ]),
        field_6_name_first: new FormControl('', [
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required
        ]),
        field_6_name_patronymic: new FormControl('', [
          Validators.pattern('[a-zA-Z ]*'),
        ]),
      }),
    });
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (document.body.scrollTop <= 395 || document.documentElement.scrollTop <= 395) {
      this.renderer.setStyle(this.containerBtn.nativeElement, 'top', (425 + 'px'));
      this.renderer.setStyle(this.containerBtn.nativeElement, 'bottom', 'auto');
    }

    if (document.body.scrollTop > 395 || document.documentElement.scrollTop > 395) {
      this.renderer.setStyle(this.containerBtn.nativeElement, 'top', (27 + 'px'));
      this.renderer.setStyle(this.containerBtn.nativeElement, 'bottom', 'auto');
    }

    if ( document.body.scrollTop > (document.body.scrollHeight - 850)
      || document.documentElement.scrollTop > (document.body.scrollHeight - 850)) {
      this.renderer.setStyle(this.containerBtn.nativeElement, 'top', 'auto');
      this.renderer.setStyle(this.containerBtn.nativeElement, 'bottom', '45px');
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0); // values are x,y-offset
  }

  scrollToDown() {
    window.scrollTo(0, document.body.scrollHeight); // values are x,y-offset
  }

  //with with forms
  doSubmit() {

    if(this.form.valid) {
      const formData = this.form.value;
      console.log(formData);
    }
  }

  doClear() {
    this.form.reset();
  }
}
