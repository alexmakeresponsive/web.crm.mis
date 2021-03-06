import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { filter } from 'rxjs/operators';


@Component({
  templateUrl: './component.html'
})
export class TableRowTr2EntryComponent implements OnInit, AfterViewInit {
  @Input() parameters;
  @Input() payload;

  @Output() emitterData:EventEmitter<any>      = new EventEmitter();
  @Output() emitterInstance:EventEmitter<any> = new EventEmitter();

  @Output() emitterAction:EventEmitter<any>    = new EventEmitter();
  @Output() emitterAfterInit:EventEmitter<any> = new EventEmitter();

  form:FormGroup;

  objectKeys = Object.keys;

  ngOnInit() {
    this.form = this.createFormGroup();
                this.subscribeToFieldStatusChanges();
  }

  ngAfterViewInit() {
    if (this.parameters.type === 'notChildEntry') {
      this.emitterAfterInit.emit({});
    }
  }

  createFormGroup() {

    let formGroupOptions  = {};

    for (let col of Object.values(this.parameters.body)) {
      for (let fieldKey of  Object.keys(col)) {
        let validators = [];

        if(col[fieldKey].exclude) {
          continue;
        }

        for (let validatorName of Object.keys(col[fieldKey].validators)) {
          validators.push(col[fieldKey].validators[validatorName].body);
        }

        let value = this.payload.hasOwnProperty(fieldKey) ? this.payload[fieldKey] : '';

        formGroupOptions[fieldKey] = new FormControl(value, validators);
      }
    }

    return new FormGroup(formGroupOptions);
  }

  onKeyUp(e) {
    this.emitterData.emit({
      controls: this.form.controls,
      status:   this.form.status,
      multiple:        this.parameters.multiple,
      formControlName: this.parameters.formControlName,
      id:              this.payload.id
    });
  }

  subscribeToFieldStatusChanges() {

    for (let col of Object.values(this.parameters.body)) {
        for (let controlName of Object.keys(col)) {

          if(col[controlName].exclude) {
            continue;
          }

          this.form.get(controlName).statusChanges
            .pipe(
              filter((status: string) => {
                col[controlName].errors[this.payload.id] = this.form.get(controlName).errors;

                if (!col[controlName].errors[this.payload.id]) {
                     col[controlName].errors[this.payload.id] = {}
                }

                return false;
              }))
            .subscribe(() => {});
        }
    }
  }

  removeTd(id) {
    this.emitterAction.emit({
      action: 'removeTd',
      id: id
    });
  }

  setDataFromEntryComponent(res) {
    this.emitterData.emit(res);
  }

  getInstanceEntryComponent(instance) {
    this.form.controls = instance.form.controls;

    this.emitterAfterInit.emit({});
  }
}
