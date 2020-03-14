import {
  Component,
  ViewChild, ElementRef, Renderer2, HostListener,
  OnInit, AfterViewInit, OnDestroy
} from '@angular/core';

import {Form088YEventService} from "@MsaModule/service/event/form-088-y-event.service";

@Component({
  selector: 'form-088-y-message-box',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class Form088yMessageBoxComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('formMessage', {static: false}) formMessage: ElementRef;
  @ViewChild('formMessageWrapper', {static: false}) formMessageWrapper: ElementRef;

  private formMessageType:string = 'light';

  messageSubscriber;

  constructor(
    private renderer: Renderer2,
    private eventService: Form088YEventService
  ) { }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    const bottomBreakpoint = document.body.clientHeight - window.innerHeight - 30;

    const formMessagePositionTop = window.pageYOffset - 150 + 30;
    const formMessagePositionBottom = document.body.clientHeight - 150 - 45 -47;

    if (document.body.scrollTop <= 150 || document.documentElement.scrollTop <= 150) {
      this.renderer.removeClass(this.formMessageWrapper.nativeElement, 'sticky-top');
    }
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
      this.renderer.addClass(this.formMessageWrapper.nativeElement, 'sticky-top');
    }

    if ( document.body.scrollTop > (bottomBreakpoint)
      || document.documentElement.scrollTop > (bottomBreakpoint)) {
      // this.renderer.setStyle(this.formMessage.nativeElement, 'top', (formMessagePositionBottom + 'px'));
    }
  }

  showMessage(message) {
    this.formMessage.nativeElement.innerHTML =message.text;

    this.eventService.notifyWrapper({cover: true});

    this.formMessageType = message.status;
    this.renderer.setStyle(this.formMessage.nativeElement, 'display', 'block');

    setTimeout(() => {
      this.hideMessage();
    }, message.timeout);
  }

  hideMessage() {
    this.renderer.setStyle(this.formMessage.nativeElement, 'display', 'none');
    this.eventService.notifyWrapper({show: true});
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.messageSubscriber = this.eventService.message.subscribe( message => {
      if(!message) {
        return;
      }

      if(message.action === 'hide') {
        this.hideMessage();
      }

      if(message.action === 'show') {
        this.showMessage(message);
      }

    });
  }

  ngOnDestroy() {
    this.messageSubscriber.unsubscribe();
  }
}
