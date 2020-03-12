import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import { filter } from 'rxjs/operators';


@Component({
  templateUrl: './component.html'
})
export class ModalM1EntryComponent implements OnInit, AfterViewInit {
  @Input() parameters;
  @Input() payload;

  @Output() emitterData:EventEmitter<any>      = new EventEmitter();
  @Output() emitterAfterInit:EventEmitter<any> = new EventEmitter();

  @Output() emitterAction:EventEmitter<any>    = new EventEmitter();

  form:FormGroup;

  objectKeys = Object.keys;

  closeResult: string;

  constructor(private modalService: NgbModal) {}
  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      scrollable: true,
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
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
    this.form = this.createFormGroup();
                this.subscribeToFieldStatusChanges();
  }

  ngAfterViewInit() {
    this.emitterAfterInit.emit({});
  }

  createFormGroup() {

    const validators = [];

    for (let validator of Object.values(this.parameters.validators)) {
      validators.push(validator['body']);
    }

    let value = this.payload ? this.payload : '';

    return new FormGroup({
      [this.parameters.formControlName]: new FormControl(value, validators),
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

  remove(id) {
    this.emitterAction.emit({
      action: 'remove',
      id: id
    });
  }

  loadData() {

  }
}
