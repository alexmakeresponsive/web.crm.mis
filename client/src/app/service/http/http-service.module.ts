import { BrowserModule }                        from '@angular/platform-browser';

import { HttpClientModule }                     from '@angular/common/http';
import { NgModule }                             from '@angular/core';

import { HTTP_INTERCEPTORS }                    from '@angular/common/http';

import { CookieInterceptor }                    from './cookie.interceptor';


@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CookieInterceptor,
      multi: true
    }
  ],
})
export class HttpServiceModule { }
