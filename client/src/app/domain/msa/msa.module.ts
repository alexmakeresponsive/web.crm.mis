import { NgModule }                             from '@angular/core';
import { CommonModule }                         from '@angular/common';
import { FormsModule, ReactiveFormsModule }     from '@angular/forms';

import {EntryModule}                            from "../../widget/entry/entry.module";
import {DefaultModule}                          from "../../widget/default/default.module";

import {Form088yComponent}                      from "./component/form/088/y/component";


@NgModule({
  declarations: [
    Form088yComponent
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

    Form088yComponent
  ],
})
export class MsaModule { }
