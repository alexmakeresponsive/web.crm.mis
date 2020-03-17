import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import {TableTb1Component}              from "./collection/table/tb.1/component";
import {TableTb2Component}              from "./collection/table/tb.2/component";
import {EntryModule}                    from "@ComonWidgetEntryModule/entry.module";

@NgModule({
  declarations: [
    TableTb1Component, TableTb2Component
  ],
  imports: [
    CommonModule,
    EntryModule
  ],
  exports: [
    CommonModule,

    TableTb1Component, TableTb2Component
  ],
})
export class DefaultModule { }
