/**
 * Created by tamer on 11/06/17.
 */

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { FuncService }              from './func.service';
import { Func }                     from './func';

@Component({
  selector: 'func-detail',
  templateUrl: './func-detail.component.html',
  styleUrls: ['./func-detail.component.css'],
  moduleId: module.id
})
export class FuncDetailComponent implements OnInit {
  @Input('group')
  public parForm: FormGroup;
  public myForm: FormGroup;
  public control: FormArray;
  func: Func;
  model: any;
  param: Array<any> = [];
  submitted = false;
  constructor(
    private funcService: FuncService,
    private route: ActivatedRoute,
    private location: Location,
    private _fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.funcService.getFunc(+params['id']))
      .subscribe(func => {
        this.func = func;
        this.myForm = this._fb.group({
          pars2: this._fb.array([
            this.initPar(),
          ])
        });
        console.log(this.func);
        this.control = <FormArray>this.myForm.controls['pars2'];
        for (let i = 0; i < this.func.pars2.length - 1; i++) {
          this.addPar();
          this.param.push(['', '']);
        }
        this.param.push(['', '']);
      });
  }
  initPar() {
    return this._fb.group({
      par: '',
    });
  }
  addPar() {
    this.control.push(this.initPar());
  }
  goBack(): void {
    this.location.back();
  }
  onSubmit() { this.submitted = true; }
  get diagnostic() { return JSON.stringify(this.model); }
  save(model: Func) {
    console.log(model);
    this.checkTyp(model);
  }
  checkTyp(model: Func) {
    try {
      for (let item in model['value'].pars2) {
        this.param[item][0] = model['value'].pars2[item].par;
        if (this.param[item][0].startsWith('{') && this.param[item][0][this.param[item].length -1] === '}') {
          this.param[item][1] = '[' + this.param[item] + ']';
          console.log(this.param[item][1]);
          this.param[item][1] = eval(this.param[item][1])[0];
        } else {
          try {
            this.param[item][1] = eval(this.param[item][0]);
            this.param[item][1] = typeof this.param[item] === 'function' || typeof this.param[item] === 'object'
              || typeof this.param[item] === 'boolean' ? this.param[item][1] : this.param[item][0];
          } catch (exception) {
            try {
              this.param[item][1] = JSON.parse(this.param[item][0]);
            } catch (exception) {
              this.param[item][1] = isNaN(parseFloat(this.param[item][0])) ? this.param[item][0] : parseFloat(this.param[item][0]);
            }
          }
        }
        console.log(this.param[item][1]);
        console.log(typeof this.param[item][1]);
      }
      /*this.param[0] = model['value'].pars2[0].par;
      this.param[1] = model['value'].pars2[1].par;
      this.param[2] = this.param[1];

      if (this.param[1].startsWith('{') && this.param[1][this.param[1].length - 1] === '}') {
        this.param[2] = "[" + this.param[1] + "]";
        console.log(this.param[2]);
        this.param[2] = eval(this.param[2])[0];
      } else {
        try {
          this.param[2] = eval(this.param[1]);
          this.param[2] = typeof this.param[2] === 'function' || typeof this.param[2] === 'object'
          || typeof this.param[2] === 'boolean' ? this.param[2] : this.param[1];
        } catch (e1) {
          try {
            this.param[2] = JSON.parse(this.param[1]);
          } catch (e2) {
            this.param[2] = isNaN(parseFloat(this.param[1])) ? this.param[1] : parseFloat(this.param[1]);
          }
        }
      }
      console.log(this.param[2]);
      console.log(typeof this.param[2]);*/
    } catch (exception) {
      console.log('checkType is making problems');
      console.log(exception);
    }
  }
}
