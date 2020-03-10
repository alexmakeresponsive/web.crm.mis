import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import {TableTb1Component}              from "./collection/table/tb.1/component";
import {EntryModule}                    from "@EntryWidgetModule/entry.module";

@NgModule({
  declarations: [
    TableTb1Component
  ],
  imports: [
    CommonModule,
    EntryModule
  ],
  exports: [
    CommonModule,

    TableTb1Component
  ],
})
export class DefaultModule { }
