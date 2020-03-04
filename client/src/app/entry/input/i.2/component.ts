import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { filter } from 'rxjs/operators';


@Component({
  template: `
            <div [formGroup]="formInputI2">
              <div class="row">
                <div class="col-{{parameters.col}}">
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
              </div>
            </div>
            `
})
export class InputI2Component {
  @Input() parameters;

  formInputI2:FormGroup;

  objectKeys = Object.keys;

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

  subscribeToFieldStatusChanges() {

    this.formInputI2.get(this.parameters.formControlName).statusChanges
      .pipe(
        filter((status: string) => {
          this.parameters.errors = this.formInputI2.get(this.parameters.formControlName).errors;

          // console.log(this.parameters.errors);

          if (!this.parameters.errors) {
            this.parameters.errors = {}
          }

          return false;
        }))
      .subscribe(() => {});
  }
}
