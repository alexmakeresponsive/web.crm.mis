import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { filter } from 'rxjs/operators';

@Component({
  template: `
            <div [formGroup]="form">
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
export class InputI2Component implements OnInit {
  @Input() parameters;
  @Output() emitter:EventEmitter<any> = new EventEmitter();

  form:FormGroup;

  objectKeys = Object.keys;

  ngOnInit() {
    this.form = this.createFormGroup();

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
      controls: this.form.controls,
      status: this.form.status
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
}
