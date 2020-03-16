import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import {NgbModule}                      from '@ng-bootstrap/ng-bootstrap';
import {SelectModule}                   from 'ng2-select';
import { NgxMyDatePickerModule }        from 'ngx-mydatepicker';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {SelectS1Component}              from "./collection/select/s.1/component";
import {InputI1Component}               from "./collection/input/default/i.1/component";
import {InputI2Component}               from "./collection/input/default/i.2/component";
import {InputDecoratePhoneI1Component}  from "./collection/input/decorate/phone/i.d.p.1/component";
import {TextareaT1Component}            from "./collection/textarea/t.1/component";
import {TableRowTbR1EntryComponent}     from "./collection/table/tr.1/component";
import {TableRowTr2EntryComponent}      from "./collection/table/tr.2/component";
import {DatePickerD1Component}          from "./collection/datepicker/d.1/component";
import {DatePickerD2Component}          from "./collection/datepicker/d.2/component";
import {ModalM1EntryComponent}          from "./collection/modal/m.1/component";
import {ModalM2EntryComponent}          from "./collection/modal/m.2/component";

import {EntryWrapper}                   from "./collection/wrapper";
import {EntryWrapper2}                  from "./collection/wrapper2";

import {EntryDirective}                 from "./collection/directive";
import {PhoneMaskDirective}             from "./directive/input/decorate/phone/m.1";


@NgModule({
  declarations: [
    EntryWrapper,
    EntryWrapper2,
    EntryDirective, PhoneMaskDirective,

    SelectS1Component,
    InputI1Component, InputI2Component, InputDecoratePhoneI1Component,
    TextareaT1Component,
    TableRowTbR1EntryComponent, TableRowTr2EntryComponent,
    DatePickerD1Component,
    DatePickerD2Component,
    ModalM1EntryComponent, ModalM2EntryComponent,
  ],
  entryComponents: [
    SelectS1Component,
    InputI1Component, InputI2Component, InputDecoratePhoneI1Component,
    TextareaT1Component,
    TableRowTbR1EntryComponent, TableRowTr2EntryComponent,
    DatePickerD1Component,
    DatePickerD2Component,
    ModalM1EntryComponent, ModalM2EntryComponent,
  ],
  imports: [
    CommonModule,

    NgbModule,
    SelectModule,
    NgxMyDatePickerModule.forRoot(),

    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    EntryWrapper,
    EntryWrapper2,

    SelectS1Component,
    InputI1Component, InputI2Component, InputDecoratePhoneI1Component,
    TextareaT1Component,
    TableRowTbR1EntryComponent, TableRowTr2EntryComponent,
    DatePickerD1Component,
    DatePickerD2Component,
    ModalM1EntryComponent, ModalM2EntryComponent,

    CommonModule,

    FormsModule,
    ReactiveFormsModule, PhoneMaskDirective,
  ],
})
export class EntryModule { }
