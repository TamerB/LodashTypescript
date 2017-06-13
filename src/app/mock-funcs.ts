/**
 * Created by tamer on 11/06/17.
 */

import { Func } from './func';

export const FUNCS: Func[] = [
  {id: 1 , name: 'countBy', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 2 , name: 'forEach', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 3 , name: 'forEachRight', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 4 , name: 'every', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 5 , name: 'filter', pars: ['collection', 'predicate'], pars2: ['', ''], paramsNo: 2 },
  {id: 6 , name: 'find', pars: ['collection', 'predicate', '3'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 7 , name: 'findLast', pars: ['collection', 'predicate', '3'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 8 , name: 'flatMap', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 9 , name: 'flatMapDeep', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 10 , name: 'flatMapDepth', pars: ['collection', 'iteratee', 'depth'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 11 , name: 'groupBy', pars: ['collection', '2'], pars2: ['', ''], paramsNo: 2 },
  {id: 12 , name: 'includes', pars: ['collection', 'value', 'fromIndex'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 13 , name: 'invokeMap', pars: ['collection', 'path', '[args]'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 14 , name: 'keyBy', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 15 , name: 'map', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 16 , name: 'orderBy', pars: ['collection', 'iteratee', '[orders]'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 17 , name: 'partition', pars: ['collection', 'predicate'], pars2: ['', ''], paramsNo: 2 },
  {id: 18 , name: 'reduce', pars: ['collection', 'iteratee', 'accumulator'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 19 , name: 'reduceRight', pars: ['collection', 'iteratee', 'accumulator'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 20 , name: 'reject', pars: ['collection', 'iteratee', 'predicate'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 21 , name: 'sample', pars: ['collection'], pars2: [''], paramsNo: 1 },
  {id: 22 , name: 'sampleSize', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 23 , name: 'shuffle', pars: ['collection'], pars2: [''], paramsNo: 1 },
  {id: 24 , name: 'size', pars: ['collection'], pars2: [''], paramsNo: 1 },
  {id: 25 , name: 'some', pars: ['collection', 'predicate'], pars2: ['', ''], paramsNo: 2 },
  {id: 26 , name: 'sortBy', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 }
];
