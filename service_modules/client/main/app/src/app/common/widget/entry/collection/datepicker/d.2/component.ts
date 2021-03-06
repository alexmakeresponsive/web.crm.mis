import {Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

import {filter} from 'rxjs/operators';

import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
// other imports here...
@Component({
  templateUrl: './component.html',
  styleUrls: ['./component.styl'],
})
export class DatePickerD2Component implements OnInit {

  @Input() payload;
  @Input() parameters;
  @Output() emitter:EventEmitter<any> = new EventEmitter();


  formControlNameInner;


  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    selectorHeight: '300px',
    selectorWidth:   '303px',
    todayBtnTxt: 'Сегодня',
    dayLabels: {su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'},
    monthLabels: { 1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июнь', 7: 'Июль', 8: 'Авг', 9: 'Сент', 10: 'Окт', 11: 'Нояб', 12: 'Дек' }
  };

  form: FormGroup;

  objectKeys = Object.keys;


  ngOnInit() {
    this.formControlNameInner = this.parameters.formControlName + '_i';

    this.form = this.createFormGroup();

    if (this.payload) {
      this.setDate();
    }
  }

  createFormGroup() {
    let value = this.payload ? this.payload : '';

    return new FormGroup({
      [this.formControlNameInner]: new FormControl(value, []),
      [this.parameters.formControlName]: new FormControl(value, []),
    });
  }

  setDate(): void {
    let list = this.payload.split('-');

    this.form.patchValue({[this.formControlNameInner]: {
        date: {
          year:   Number(list[0]),
          month:  Number(list[1]),
          day:    Number(list[2]),
        }
    }});
  }

  onDateChanged(event: IMyDateModel): void {
    this.form.patchValue({[this.parameters.formControlName]: event.formatted});
  }
}
