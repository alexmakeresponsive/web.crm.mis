import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { filter } from 'rxjs/operators';


@Component({
  template: `
              <div [formGroup]="form">
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
export class InputI1Component implements OnInit {
  @Input() payload;
  @Input() parameters;
  @Output() emitter:EventEmitter<any> = new EventEmitter();

  form:FormGroup;

  objectKeys = Object.keys;

  constructor(
  ) {

  }

  ngOnInit() {
    this.form = this.createFormGroup();

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
    this.form.get(this.parameters.formControlName).statusChanges
      .pipe(
        filter((status: string) => {
          this.parameters.errors = this.form.get(this.parameters.formControlName).errors;

          if (!this.parameters.errors) {
               this.parameters.errors = {}
          }

          return false;
        }))
      .subscribe(() => {});
  }
}
