import { NgModule }                             from '@angular/core';
import { CommonModule }                         from '@angular/common';
import { FormsModule, ReactiveFormsModule }     from '@angular/forms';

import {EntryModule}                            from "@ComonWidgetEntryModule/entry.module";
import {DefaultModule}                          from "@ComontWidgetDefaulModule/default.module";

import {Form088yComponent}                      from "./component/form/088/y/body/component";
import {Form088yMessageBoxComponent}            from "./component/form/088/y/part/message-box/component";
import {Form088yButtonBoxComponent}             from "./component/form/088/y/part/button-box/component";
import {Form088yWrapperComponent}               from "./component/form/088/y/part/wrapper/component";

@NgModule({
  declarations: [
    Form088yComponent, Form088yMessageBoxComponent, Form088yButtonBoxComponent, Form088yWrapperComponent
  ],
  imports: [
    CommonModule,

    EntryModule,
    DefaultModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    Form088yWrapperComponent, Form088yMessageBoxComponent, Form088yButtonBoxComponent
  ],
})
export class MsaModule { }
