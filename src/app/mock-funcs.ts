/**
 * Created by tamer on 11/06/17.
 */

import { Func } from './func';

export const FUNCS: Func[] = [
  {id: 1 , name: '_.countBy', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 2 , name: '_.forEach', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 3 , name: '_.forEachRight', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 4 , name: '_.every', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 5 , name: '_.filter', pars: ['collection', 'predicate'], pars2: ['', ''], paramsNo: 2 },
  {id: 6 , name: '_.find', pars: ['collection', 'predicate', '3'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 7 , name: '_.findLast', pars: ['collection', 'predicate', '3'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 8 , name: '_.flatMap', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 9 , name: '_.flatMapDeep', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 10 , name: '_.flatMapDepth', pars: ['collection', 'iteratee', 'depth'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 11 , name: '_.groupBy', pars: ['collection', '2'], pars2: ['', ''], paramsNo: 2 },
  {id: 12 , name: '_.includes', pars: ['collection', 'value', 'fromIndex'], pars2: ['', ''], paramsNo: 3 },
  {id: 13 , name: '_.invokeMap', pars: ['collection', 'path', '[args]'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 14 , name: '_.keyBy', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 15 , name: '_.map', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 16 , name: '_.orderBy', pars: ['collection', 'iteratee', '[orders]'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 17 , name: '_.partition', pars: ['collection', 'predicate'], pars2: ['', ''], paramsNo: 2 },
  {id: 18 , name: '_.reduce', pars: ['collection', 'iteratee', 'accumulator'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 19 , name: '_.reduceRight', pars: ['collection', 'iteratee', 'accumulator'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 20 , name: '_.reject', pars: ['collection', 'iteratee', 'predicate'], pars2: ['', '', ''], paramsNo: 3 },
  {id: 21 , name: '_.sample', pars: ['collection'], pars2: [''], paramsNo: 1 },
  {id: 22 , name: '_.sampleSize', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 },
  {id: 23 , name: '_.shuffle', pars: ['collection'], pars2: [''], paramsNo: 1 },
  {id: 24 , name: '_.size', pars: ['collection'], pars2: [''], paramsNo: 1 },
  {id: 25 , name: '_.some', pars: ['collection', 'predicate'], pars2: ['', ''], paramsNo: 2 },
  {id: 26 , name: '_.sortBy', pars: ['collection', 'iteratee'], pars2: ['', ''], paramsNo: 2 }
];
