import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { filter } from 'rxjs/operators';

import {StorageData} from "../../../storage.data";

@Component({
  template: `
              <div [formGroup]="formInputI1">
                <input type="text"
                       [className]="parameters.className"
                       [id]="parameters.id"
                       [formControlName]="parameters.formControlName"
                >
                <span *ngFor="let validatorName of objectKeys(parameters.validators)">
                  <small class="message error" *ngIf="parameters.errors[validatorName]">
                    {{parameters.validators[validatorName].errorText}}
                  </small>
                </span>
              </div>
            `,
})
export class InputI1Component {
  @Input() payload;
  @Input() parameters;

  formInputI1:FormGroup;
  formData = {component: 'InputI1Component'};

  objectKeys = Object.keys;

  constructor(
    private storageData: StorageData
  ) {

  }

  ngOnInit() {
    this.formInputI1 = this.createFormGroup();

    this.subscribeToFieldStatusChanges();
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
    this.formInputI1.get(this.parameters.formControlName).statusChanges
      .pipe(
        filter((status: string) => {
          this.parameters.errors = this.formInputI1.get(this.parameters.formControlName).errors;

          // console.log(this.parameters.errors);

          if (!this.parameters.errors) {
               this.parameters.errors = {}
          }

          return false;
        }))
      .subscribe(() => {});
  }

  getFormValue() {
    return this.formInputI1.value;
  }
}
