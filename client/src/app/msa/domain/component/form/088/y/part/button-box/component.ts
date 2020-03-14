import { Component, ViewChild, ElementRef, Renderer2, HostListener, OnInit, AfterViewInit } from '@angular/core';

import {Form088YEventService} from "@MsaModule/service/event/form-088-y-event.service";

@Component({
  selector: 'form-088-y-button-box',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class Form088yButtonBoxComponent implements OnInit, AfterViewInit {
  @ViewChild('containerBtn', {static: false}) containerBtn: ElementRef;

  constructor(
    private renderer: Renderer2,
    private eventService: Form088YEventService
  ) { }


  headerHeight          = 150;
  containerBtnOffsetTop = 0;

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (document.body.scrollTop <= this.containerBtnOffsetTop
      || document.documentElement.scrollTop <= this.containerBtnOffsetTop
    ) {
      this.renderer.removeClass(this.containerBtn.nativeElement, 'sticky-top');
    }

    if (document.body.scrollTop > this.containerBtnOffsetTop
      || document.documentElement.scrollTop > this.containerBtnOffsetTop
    ) {
      this.renderer.addClass(this.containerBtn.nativeElement, 'sticky-top');
    }

    const bottomBreakpoint = document.body.clientHeight - window.innerHeight - 30;
    const bottom =  window.innerHeight + window.pageYOffset - document.body.clientHeight - 45 + 90;

    if ( document.body.scrollTop > (bottomBreakpoint)
      || document.documentElement.scrollTop > (bottomBreakpoint)) {

    }
  }

  doSubmit() {
    this.eventService.clickButton({action: 'submit'});
  }

  doClear() {
    this.eventService.clickButton({action: 'reset'});
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  scrollToDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.containerBtnOffsetTop = this.headerHeight + this.containerBtn.nativeElement.offsetTop;
  }
}
