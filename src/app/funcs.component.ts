/**
 * Created by tamer on 11/06/17.
 */

import { Component, OnInit } from '@angular/core';
import { Router }             from '@angular/router';

import { Func } from './func';
import { FuncService } from './func.service';
@Component({
  selector: 'my-funcs',
  templateUrl: './funcs.component.html',
  styleUrls: ['./funcs.component.css'],
})
export class FuncsComponent implements OnInit {
  funcs: Func[];
  selectedFunc: Func;
  constructor(private funcService: FuncService, private router: Router) { }
  getFuncs(): void {
    this.funcService.getFuncs().then(funcs => this.funcs = funcs);
  }
  ngOnInit(): void {
    this.getFuncs();
  }
  onSelect(func: Func): void {
    this.selectedFunc = func;
    this.router.navigate(['/detail', this.selectedFunc.id]);
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedFunc.id]);
  }
}




























