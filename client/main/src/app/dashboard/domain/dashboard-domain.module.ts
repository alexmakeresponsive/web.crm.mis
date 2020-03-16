import { NgModule }                             from '@angular/core';
import { CommonModule }                         from '@angular/common';
import { FormsModule, ReactiveFormsModule }     from '@angular/forms';

import {FormSignInComponent} from "./component/form/signin/component";


@NgModule({
  declarations: [
    FormSignInComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    FormSignInComponent
  ],
})
export class DashboardDomainModule { }
