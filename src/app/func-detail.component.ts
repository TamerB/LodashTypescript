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
import {describe} from "selenium-webdriver/testing";

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
  result: any = ['', ''];
  submitted = false;
  serieName: any;
  from: any;
  to: any;
  options: Object;
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
      let temp: Array<any> = [];
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
        console.log(this.param[item][1]);
        console.log(typeof this.param[item][1]);
        temp.push(this.param[item][1]);
      }
      try {
        this.result[0] = this.lodash[this.func.name](...temp);
        if (Array.isArray(this.result[0]) && this.result[0][0] === undefined) {
          console.log('wrong input');
        } else {
          this.result[1] = JSON.stringify(this.result[0]);
          this.result[1] = this.result[1].replace(/\"/gi, '');
          this.result[1] = this.result[1].replace(/\\/gi, '');
          console.log(this.result[1]);
          this.options = {
            chart: {
              zoomType: 'x',
              type: 'bar'
            },
            series: this.getResults ()
          };
        }
      } catch (exception) {
        console.log('function problem');
      }
    } catch (exception) {
      console.log('checkType is making problems');
      console.log(exception);
    }
  }
  onChartSelection (e: any) {
    this.from = e.originalEvent.xAxis[0].min.toFixed(2);
    this.to = e.originalEvent.xAxis[0].max.toFixed(2);
  }
  onSeriesMouseOver (e: any) {
    this.serieName = e.context.name;
  }
  getResults () {
    let arr = [];
    console.log('*******************');
    console.log(this.result[0]);
    console.log(typeof this.result[0]);
    if (Array.isArray(this.result[0])) {
      for (let item of this.result[0]) {
        arr.push(item);
      }
    } else {
      if (typeof this.result[0] === 'object') {
        for (let item of Object.keys(this.result[0])) {
          console.log(item);
          console.log(this.result[0][item]);
          arr.push({'name': item === 'undefined' ? 'No output' : item, 'data': this.getNumbers(this.result[0][item])});
          console.log(typeof item);
          console.log(typeof this.result[0][item]);
          console.log('here');
        }
      }
      console.log(arr);
    } return arr === [] ? false : arr;
  }
  getNumbers(value: any): Array<any> {
    let arr = [];
    if (typeof value === 'string') {
      arr.push(value.length);
    } else {
      if (Array.isArray(value)) {
        for (let item of value) {
          if (typeof item === 'string') {
            arr.push(item.length);
          } else {
            arr.push(this.getNumbers(item));
          }
        }
      } else {
        if (typeof value === 'number') {
          arr.push(value);
        } else {
          if (typeof value === 'boolean') {
            arr.push(value ? 1 : 0);
          } else {
            if (typeof value === 'object') {
              for (let item2 of Object['values'](value)) {
                arr.push(this.getNumbers(item2));
              }
            }
          }
        }
      }
    }
    return arr;
  }
}




























