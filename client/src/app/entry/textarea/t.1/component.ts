import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { filter } from 'rxjs/operators';


@Component({
  template: `
              <div [formGroup]="formTextAreaT1">
                <textarea [id]="parameters.id"
                          [rows]="parameters.rows"
                          [className]="parameters.className"
                          [formControlName]="parameters.formControlName"
                >
                </textarea>
                <span *ngFor="let validatorName of objectKeys(parameters.validators)">
                  <small class="message error" *ngIf="parameters.errors[validatorName]">
                    {{parameters.validators[validatorName].errorText}}
                  </small>
                </span>
              </div>
            `
})
export class TextareaT1Component {
  @Input() parameters;

  formTextAreaT1:FormGroup;

  objectKeys = Object.keys;

  ngOnInit() {
    this.formTextAreaT1 = this.createFormGroup();

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
    this.formTextAreaT1.get(this.parameters.formControlName).statusChanges
      .pipe(
        filter((status: string) => {
          this.parameters.errors = this.formTextAreaT1.get(this.parameters.formControlName).errors;

          // console.log(this.parameters.errors);

          if (!this.parameters.errors) {
            this.parameters.errors = {}
          }

          return false;
        }))
      .subscribe(() => {});
  }
}
