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
import { Lodash }                   from './lodash';

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
  lodash: Lodash = new Lodash();
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
        //console.log(this.func);
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
    this.checkTyp(model);
  }
  checkTyp(model: Func) {
    try {
      let temp: Array<any> = [], x = '';
      for (let item in model['value'].pars2) {
        this.param[item][0] = model['value'].pars2[item].par;
        if (this.param[item][0].startsWith('{') && this.param[item][0][this.param[item][0].length - 1] === '}') {
          try {
            this.param[item][1] = '[' + this.param[item][0] + ']';
            this.param[item][1] = eval(this.param[item][1])[0];
          } catch (exception) {
            this.param[item][1] = this.param[item][0];
          }
        } else {
          try {
            this.param[item][1] = eval(this.param[item][0]);
            this.param[item][1] = typeof this.param[item][1] === 'function' ||
            typeof this.param[item][1] === 'object' || typeof this.param[item][1] === 'boolean' ||
            typeof this.param[item][1] === 'number' && (this.param[item][1] !== 0 ||
            this.param[item][0] === '0') ? this.param[item][1] : this.param[item][0];
          } catch (exception) {
            try {
              this.param[item][1] = JSON.parse(this.param[item][0]);
            } catch (exception) {
              this.param[item][1] = isNaN(parseFloat(this.param[item][0])) ? this.param[item][0] : parseFloat(this.param[item][0]);
            }
          }
        }
        temp.push(this.param[item][1]);
      }
      try {
        x = this.lodash[this.func.name](...temp);
        if (Array.isArray(x) && x[0] === undefined) {
          console.log('wrong input');
        } else
          console.log(x);
      } catch (exception) {
        console.log('function problem');
      }
    } catch (exception) {
      console.log('checkType is making problems');
      console.log(exception);
    }
  }
}
