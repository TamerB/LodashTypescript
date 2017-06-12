/**
 * Created by tamer on 11/06/17.
 */

import { Injectable } from '@angular/core';

import { Func } from './func';
import { FUNCS } from './mock-funcs';

@Injectable()
export class FuncService {
  getFuncs(): Promise<Func[]> {
    return Promise.resolve(FUNCS);
  }
  getFunc(id: number): Promise<Func> {
    return this.getFuncs()
      .then(funcs => funcs.find(func => func.id === id));
  }
}
