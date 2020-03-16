import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './component.html'
})
export class SelectS1Component implements OnInit {
  @Input() payload: string;
  @Input() parameters;

  @Input() data: string[];

  @Output() emitter:EventEmitter<any> = new EventEmitter();

  form:FormGroup;
  index:number = 0;

  objectKeys = Object.keys;


  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    this.form.patchValue({
      [this.parameters.formControlName]: value.id
    });
  }

  public removed(value:any):void {
    this.form.patchValue({
      [this.parameters.formControlName]: ''
    });
  }

  public typed(value:any):void {

  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  ngOnInit() {
    this.form = this.createFormGroup();
                this.subscribeToFieldStatusChanges();

    if (this.payload) {
      this.index = +this.payload - 1;
    }
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
