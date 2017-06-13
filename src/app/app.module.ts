import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}          from '@angular/forms';

import { AppComponent }         from './app.component';
import { FuncDetailComponent }  from './func-detail.component';
import { FuncsComponent }       from './funcs.component';
import { FuncService }          from './func.service';
import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports:      [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    FuncDetailComponent,
    FuncsComponent,
  ],
  providers:    [ FuncService],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
