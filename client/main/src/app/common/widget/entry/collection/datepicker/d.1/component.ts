import {Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import {filter} from 'rxjs/operators';

@Component({
  template: `
    <div [formGroup]="form" class="form-inline">
      <div class="form-group">
        <div class="input-group">
          <input class="form-control" placeholder="yyyy-mm-dd"
                  [(ngModel)]="model" ngbDatepicker #d="ngbDatepicker"
                  [formControlName]="parameters.formControlName"
                  [id]="parameters.id"
                  displayMonths="1"
                  navigation = "arrows"
          >
          <div class="input-group-append">
            <button class="btn btn-outline-secondary glyphicon glyphicon-calendar" (click)="d.toggle()" type="button"></button>
          </div>
        </div>
      </div>
      <span *ngFor="let validatorName of objectKeys(parameters.validators)">
          <small class="message error" *ngIf="parameters.errors[validatorName]">
            {{parameters.validators[validatorName].errorText}}
          </small>
        </span>
    </div>
  `
})
export class DatePickerD1Component {
           model;

  @Input() payload;
  @Input() parameters;
  @Output() emitter:EventEmitter<any> = new EventEmitter();

  form:FormGroup;

  objectKeys = Object.keys;

  ngOnInit() {
    this.form = this.createFormGroup();

    this.subscribeToFieldStatusChanges();

    console.log(this.payload);
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

          console.log(this.parameters.errors);

          if (!this.parameters.errors) {
            this.parameters.errors = {}
          }

          return false;
        }))
      .subscribe(() => {
      });
  }
}
