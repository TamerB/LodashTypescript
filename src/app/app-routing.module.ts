/**
 * Created by tamer on 11/06/17.
 */

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuncsComponent }         from './funcs.component';
import { FuncDetailComponent }  from './func-detail.component';

const routes: Routes = [
  { path: '', component: FuncsComponent },
  { path: 'detail/:id', component: FuncDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}


