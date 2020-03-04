import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { filter } from 'rxjs/operators';

import {AuthService} from "../../../auth.service";
import {StorageData} from "../../../storage.data";

@Component({
  template: `
            <div [formGroup]="formInputI2">
              <div class="row">
                <div class="col-{{parameters.col}}">
                  <input type="text"
                         [className]="parameters.className"
                         [id]="parameters.id"
                         [formControlName]="parameters.formControlName"
                         (keyup)="onKeyUp($event)"
                  >
                  <span *ngFor="let validatorName of objectKeys(parameters.validators)">
                    <small class="message error" *ngIf="parameters.errors[validatorName]">
                      {{parameters.validators[validatorName].errorText}}
                    </small>
                  </span>
                </div>
              </div>
            </div>
            `
})
export class InputI2Component {
  @Input() parameters;

  @Output() emitter:EventEmitter<any> = new EventEmitter();


  formInputI2:FormGroup;
  formData:any = {};

  objectKeys = Object.keys;

  constructor(
    private storageData: StorageData
  ) {

  }

  ngOnInit() {
    this.formInputI2 = this.createFormGroup();

    this.subscribeToFieldStatusChanges();
  }

  createFormGroup() {
    const validators = [];

    for (let validator of Object.values(this.parameters.validators)) {
      validators.push(validator['body']);
    }

    return new FormGroup({
      [this.parameters.formControlName]: new FormControl('', validators),
    });
  }

  onKeyUp(e) {
    this.emitter.emit({
      errors: this.parameters.errors,

      status:   this.formInputI2.status,
      formData: this.formInputI2.value
    });
  }

  subscribeToFieldStatusChanges() {
    for (let controlName of Object.keys(this.formInputI2.controls)) {
      this.formInputI2.get(this.parameters.formControlName).statusChanges
        .pipe(
          filter((status: string) => {
            this.parameters.errors = this.formInputI2.get(this.parameters.formControlName).errors;

            if (!this.parameters.errors) {
              this.parameters.errors = {}
            }

            return false;
          }))
        .subscribe(() => {
        });
    }
  }
}
