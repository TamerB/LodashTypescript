/**
 * Created by tamer on 12/06/17.
 */

export class Lodash {
  constructor () { }
  INFINITY = 1 / 0;

  /**
   *
   * Determines behaviour based on whither 'coll' is an array or an object and returns
   * the array or array of the objects kyes or values
   *
   * @private
   * @param {Array|Object} coll is an array or an object
   * @returns {array} returns the corresponding array
   */
  pickSubject = function (coll: any, val: any) {
    let arr1 = [];
    if (val === 'key') {
      if (Array.isArray(coll)) {
        for (let item of coll) {
          arr1.push(item);
        }
      } else {
        for (let item of Object.keys(coll)) {
          arr1.push(item);
        }
      }
      return arr1;
      //return Array.isArray(coll) ? coll : Object.keys(coll);
    }
    for (let item of Object['values'](coll)) {
      arr1.push(item);
    }
    return arr1;
    //return Array.isArray(coll) ? coll : Object['values'](coll);
  }

  /**
   * Determines behavior based on whither the argument is a function or a property in which
   * (funciton: func(x), property: x[func])
   *
   * @private
   * @param {function} func
   * @returns {function} Returns the coressponding function
   */
  pickFunc = function (func: any) {
    return typeof func === 'string' ? (value: any) => value[func] : (value: any) => func(value);
  }

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `arr` thru `pickSubject` and `countByloop`. The corresponding value of
   * each key is the number of times the key was returned by `func`. The
   * iteratee is invoked with one argument: (value).
   *
   * @static
   * @param {Array|Object} arr
   * @param {function} func
   * @returns {object} Returns the composed object.
   */
  countBy = function (arr: any, func: any) {
    let coll = {};
    this.countByloop(this.pickSubject(arr, 'value'), func, coll);
    return coll;
  }

  /**
   *
   * Takes an object and populate it keys generated from the results of running
   * each element of `arr` thru `pickFunc`. The corresponding value of
   * each key is the number of times the key was returned by `func`.
   *
   * @private
   * @param {collection} arr subject
   * @param {function/string}func Function to be applied
   * @param {object} coll The object to be populated.
   */
  countByloop = function (arr: any, func: any, coll: any) {
    let temp;
    let applied = this.pickFunc(func);
    for (let u of arr) {
      temp = applied(u);
      coll.hasOwnProperty(temp) ? coll[temp] += 1 : coll[temp] = 1;
    }
  }

  /**
   * Iterates over elements of `arr` and applying `func` each element.
   *
   * @static
   * @param {array|Object} arr The collection to iterate over
   * @param {function} The function to be applied per iteration
   * @returns {Array|Object} Returns `arr`
   */
  forEach = function (arr: any, func: any) {
    let appl = Array.isArray(arr) ? (value: any) => func(arr[value]) :
      (value: any) => func(arr[value], value);
    for (let item in arr) {
      appl(item);
    }
  }

  /**
   * Iterates over elements of reversed `arr` and applying `func` each element.
   *
   * @static
   * @param {array|Object} collection The collection to iterate over
   * @param {function} The function to be applied per iteration
   * @returns {Array|Object} Returns `arr`
   */
  forEachRight = function (arr: any, func: any) {
    let arr2 = arr.reverse();
    let appl = Array.isArray(arr) ? (value: any) => func(arr[value]) :
      (value: any) => func(arr[value], value);
    for (let item in arr2) {
      appl(item);
    }
  }

  /**
   * Checks if `func` returns truthy for **all** elements of `arr`.
   * Iteration is stopped once `item` returns falsey.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function applied per iteration.
   * returns {boolean} Returns `true` if all elements pass the check.
   */
  every = function (arr: any, func: any) {
    let applied = typeof func === 'function' ? this.everyFunctionFunc : typeof func === 'string' ?
      this.everyStringFunc : Array.isArray(func) ? this.everyArrayFunc : this.everyObjectFunc;
    return applied(arr, func);
  }

  /**
   * Checks if `func` returns truthy for **all** elements of `arr`.
   * Iteration is stopped once `item` returns falsey. This function is to apply functions.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function applied per iteration.
   * returns {boolean} Returns `true` if all elements pass the check.
   */
  everyFunctionFunc = function (arr: any, value: any) {
    for (let item of arr) {
      if (!value(item)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if `func` returns truthy for **all** elements of `arr`.
   * Iteration is stopped once `item` returns falsey. This function is to apply properties.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function applied per iteration.
   * returns {boolean} Returns `true` if all elements pass the check.
   */
  everyStringFunc = function (arr: any, value: any) {
    for (let item of arr) {
      if (!item[value]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if `func` returns truthy for **all** elements of `arr`.
   * Iteration is stopped once `item` returns falsey. This function is to check for objects.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function applied per iteration.
   * returns {boolean} Returns `true` if all elements pass the check.
   */
  everyObjectFunc = function (arr: any, values: any) {
    for (let item of arr) {
      for (let value in values) {
        if (item[value] !== values[value]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks if `func` returns truthy for **all** elements of `arr`.
   * Iteration is stopped once `item` returns falsey. This function is to check for arrays.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function applied per iteration.
   * returns {boolean} Returns `true` if all elements pass the check.
   */
  everyArrayFunc = function (arr: any, values: any) {
    for (let item of arr) {
      for (let i = 0; i < values.length; i += 2) {
        if (item[values[i]] !== values[i + 1]) {
          return false;
        }

      }
    }
    return true;
  }

  /**
   * Iterates over elements of `arr`, returning an array of all elements
   * `func` returns truthy for.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  filter = function (arr: any, func: any) {
    let applied = typeof func === 'function' ? this.filterFunctionFunc : typeof func === 'string' ?
      this.filterStringFunc : Array.isArray(func) ? this.filterArrayFunc : this.filterObjectFunc;
    let arr2: Array<any> = [];
    applied(arr, func, arr2);
    return arr2;
  }

  /**
   * Iterates over elements of `arr`, returning an array of all elements
   * `func` (function) returns truthy for.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function invoked per iteration.
   * @param {Array} arr2 The array to be populated.
   */
  filterFunctionFunc = function (arr: any, func: any, arr2: any) {
    for (let item of arr) {
      if (func(item))
        arr2.push(item);
    }
  }

  /**
   * Iterates over elements of `arr`, returning an array of all elements
   * `func` (string) returns truthy for.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {String} func The function invoked per iteration.
   * @param {Array} arr2 The array to be populated.
   */
  filterStringFunc = function (arr: any, func: any, arr2: any) {
    for (let item of arr) {
      if (item[func])
        arr2.push(item)
    }
  }

  /**
   * Iterates over elements of `arr`, returning an array of all elements
   * `func` (Array) returns truthy for.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Array} func The function invoked per iteration.
   * @param {Array} arr2 The array to be populated.
   */
  filterArrayFunc = function (arr: any, func: any, arr2: any) {
    let flag;
    for (let item of arr) {
      flag = true;
      for (let i = 0; i < func.length; i += 2) {
        if (item[func[i]] !== func[i + 1]) {
          flag = false;
          break;
        }
      }
      if (flag)
        arr2.push(item);
    }
  }

  /**
   * Iterates over elements of `arr`, returning an array of all elements
   * `func` (Object) returns truthy for.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Object} func The function invoked per iteration.
   * @param {Array} arr2 The array to be populated.
   */
  filterObjectFunc = function (arr: any, func: any, arr2: any) {
    let flag;
    for (let item of arr) {
      flag = true;
      for (let value in func) {
        if (item[value] !== func[value]) {
          flag = false;
          break;
        }
      }
      if (flag)
        arr2.push(item);
    }
  }

  /**
   * Iterates over elements of `arr`, returning the first element
   * `func` returns truthy for.
   *
   * @static
   * @param {Array|Object} arr The collection to inspect.
   * @param {Function} func The function called per iteration.
   * @param {number} ind The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   */
  find = function (arr: any, func: any, ind: any) {
    let index = ind || 0, coll;
    let applied = typeof func === 'function' ? this.findFunctionFunc : typeof func === 'string' ?
      this.findStringFunc : Array.isArray(func) ? this.findArrayFunc : this.fidObjectFunc;
    coll = applied(arr, func, index)
    return typeof coll === 'undefined' ? false : applied(arr, func, index);
  }

  /**
   * Iterates over elements of `arr`, returning the first element
   * `func` (Function) returns truthy for.
   *
   * @private
   * @param {Array|Object} arr The collection to inspect.
   * @param {Function} func function called per iteration.
   * @param {number} index The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   */
  findFunctionFunc = function (arr: any, func: any, index: any) {
    for (let i = index; i < arr.length; i++) {
      if (func(arr[i])) {
        return arr[i];
      }
    }
  }

  /**
   * Iterates over elements of `arr`, returning the first element
   * `func` (String) returns truthy for.
   *
   * @private
   * @param {Array|Object} arr The collection to inspect.
   * @param {String} func function called per iteration.
   * @param {number} index The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   */
  findStringFunc = function (arr: any, func: any, index: any) {
    for (let i = index; i < arr.length; i++) {
      if (arr[i][func])
        return arr[i];
    }
  }

  /**
   * Iterates over elements of `arr`, returning the first element
   * `func` (Array) returns truthy for.
   *
   * @private
   * @param {Array|Object} arr The collection to inspect.
   * @param {Array} func function called per iteration.
   * @param {number} index The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   */
  findArrayFunc = function (arr: any, func: any, index: any) {
    let flag;
    for (let i = index; i < arr.length; i++) {
      flag = true;
      for (let j = 0; j < func.length; j += 2) {
        if (arr[i][func[j]] !== func[j + 1]) {
          flag = false;
          break;
        }
      }
      if (flag)
        return arr[i];
    }
  }

  /**
   * Iterates over elements of `arr`, returning the first element
   * `func` (Object) returns truthy for.
   *
   * @private
   * @param {Array|Object} arr The collection to inspect.
   * @param {Object} func function called per iteration.
   * @param {number} index The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   */
  fidObjectFunc = function (arr: any, func: any, index: any) {
    let flag;
    for (let i = index; i < arr.length; i++) {
      flag = true;
      for (let value in func) {
        if (arr[i][value] !== func[value]) {
          flag = false;
          break;
        }
      }
      if (flag)
        return arr[i];
    }
  }

  /**
   * This method is like `_.find` except that it iterates over elements of
   * `arr` from right to left.
   *
   * @static
   * @param {Array|Object} arr The collection to inspect.
   * @param {Function} func The function called per iteration.
   * @param {number} ind The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   */
  findLast = function (arr: any, func: any, ind: any) {
    let index: any = ind === '' ? arr.length : ind;
    if (ind === '')
      return this.find(arr.reverse(), func, arr.length - index);
    return this.find(arr.reverse(), func, arr.length - index - 1);
  }

  /**
   * Creates a flattened array of values by running each element in `arr`
   * thru `func` and flattening the mapped results.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function invoked per iteration.
   * @returns {Array} Returns the new flattened array.
   */
  flatMap = function (arr: any, func: any) {
    let arr2 = [];
    for (let item of arr) {
      arr2.push(...func(item));
    }
    return arr2;
  }

  /**
   * This method is like `_.flatMap` except that it recursively flattens the
   * mapped results. it applies `func` on arr elements then calls `flatMapDeepArray`.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function called per iteration.
   * @returns {Array} Returns the new flattened array.
   */
  flatMapDeep = function (arr: any, func: any) {
    let arr2 = [], arr3: any = [];
    for (let item of arr)
      arr2.push(func(item));
    this.flatMapDepthArray(arr2, arr3, this.INFINITY);
    return arr3;
  }

  /**
   * This method is like `_.flatMap` except that it recursively flattens the
   * mapped results up to `depth` times.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function invoked per iteration.
   * @param {number} [depth=1] The maximum recursion depth.
   * @returns {Array} Returns the new flattened array.
   */
  flatMapDepth = function (arr: any, func: any, depth: any) {
    depth = depth || 1;
    let arr2 = [], arr3: any = [];
    for (let item of arr)
      arr2.push(func(item));
    this.flatMapDepthArray(arr2, arr3, depth);
    return arr3;
  }

  /**
   * This is the recursive function called by `flatMapDeep` and `flatMapDepth`functions to return
   * flatted Array
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Array} arr2 The Array to be populated
   * @param {number} [depth=1] The maximum recursion depth.
   * @returns {Array} Returns the new flattened array.
   */
  flatMapDepthArray = function (arr: any, arr2: any, depth: any) {
    let depth1;
    for (let item of arr) {
      depth1 = depth;
      if (typeof item === 'object' && item[0] !== undefined && depth1 > 0) {
        depth1--;
        this.flatMapDepthArray(item, arr2, depth1);
      } else {
        arr2.push(item);

      }
    }
    return arr2;
  }

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `arr` through `func`. The order of grouped values
   * is determined by the order they occur in `arr`. The corresponding
   * value of each key is an array of elements responsible for generating the
   * key. The func is invoked with one argument: (value).
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The iteratee to transform keys.
   * @returns {Object} Returns the composed aggregate object.
   */
  groupBy = function (arr: any, func: any) {
    let coll = this.checkOwnPropertyOrNot(arr, func, true);
    return coll;
  }

  /**
   * Checks if `func` is in `arr`. If `arr` is a string, it's
   * checked for a substring of `func`,
   * is used for equality comparisons. If `ind` is negative, it's used as
   * the offset from the end of `arr`.
   *
   * @static
   * @param {Array|Object|string} arr The collection to inspect.
   * @param {*} func The value to search for.
   * @param {number} [ind=0] The index to search from.
   * @returns {boolean} Returns `true` if `value` is found, else `false`.
   * */
  includes = function (arr: any, func: any, ind: any) {
    let index = ind || 0;
    return typeof arr[0] === 'undefined' ? Object['values'](arr).includes(func, index) :
      arr.includes(func, index);
  }

  /**
   * Invokes the method at `func` of each element in `arr`, returning
   * an array of the results of each invoked method. Any additional arguments
   * are provided to each invoked method. If `func` is a function, it's invoked
   * for, and `this` bound to, each element in `arr`.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Array|Function|string} func The path of the method to invoke or
   *  the function invoked per iteration.
   * @param {...*} [ar] The arguments to invoke each method with.
   * @returns {Array} Returns the array of results.
   */
  invokeMap = function (arr: any, func: any, ar: any) {
    let coll = [];
    let func1 = typeof func === 'string' ? this.invokeMapString : this.invokeMapFunction;
    let arr1 = typeof arr[0] === 'undefined' ? Object['values'](arr) : arr;
    for (let item of arr1) {
      coll.push(func1(item, func, ar));
    }
    return coll;
  }

  /**
   * This function is used by invodeMap in case `func` is a string.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {string} func The path of the method to invoke or
   *  the function invoked per iteration.
   * @param {...*} [ar] The arguments to invoke each method with.
   * @returns {Array} Returns the array of results.
   */
  invokeMapString = function (arr: any, func: any, ar: any) {
    return ar === '' ? arr[func]() : arr[func](...ar);
  }

  /**
   * This function is used by invodeMap in case `func` is a function.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The path of the method to invoke or
   *  the function invoked per iteration.
   * @param {...*} [ar] The arguments to invoke each method with.
   * @returns {Array} Returns the array of results.
   */
  invokeMapFunction = function (arr: any, func: any, ar: any) {
    return func.call(arr, ...ar);
  }

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `arr` through `func`. The corresponding value of
   * each key is the last element responsible for generating the key. The
   * iteratee is invoked with one argument: (value).
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The iteratee to transform keys.
   * @returns {Object} Returns the composed aggregate object.
   */
  keyBy = function (arr: any, func: any) {
    let coll = this.checkOwnPropertyOrNot(arr, func, false);
    return coll;
  }

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `arr` through `func`. The corresponding value of
   * each key is : if `check` is true => an array of elements responsible for generating the key.
   * if `check` is false => the last element responsible for generating the key. The
   * iteratee is invoked with one argument: (value).
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The iteratee to transform keys.
   * @returns {Array|Object} Returns the composed aggregate array or object.
   */
  checkOwnPropertyOrNot = function(arr: any, func: any, check: any) {
    let arr1 = Array.isArray(arr) ? arr : Object.keys(arr), coll = {}, temp;
    let applied = typeof func === 'string' ? (value: any) => value[func] :
      (value: any) => func(value);
    for (let u of arr1) {
      temp = applied(u);
      check ? coll.hasOwnProperty(temp) ? coll[temp].push(u) : coll[temp] = [u] : coll[temp] = u;
    }
    return coll;
  }

  /**
   * Creates an array of values by running each element in `arr` through
   * `func`.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  map = function (arr: any, func: any) {
    let arr1 = this.pickSubject(arr, 'key');
    let func1 = this.pickFunc(func);
    let coll = [];
    for (let item of arr1) {
      !Array.isArray(arr) && typeof func !== 'string' ? coll.push(func1(arr[item])) :
        coll.push(func1(item));
    }
    return coll;
  }

  /**
   * This method is like `_.sortBy` except that it allows specifying the sort
   * orders of the func to sort by. If `ord` is unspecified, all values
   * are sorted in ascending order. Otherwise, specify an order of "desc" for
   * descending or "asc" for ascending sort order of corresponding values.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Array[]|Function[]|Object[]|string[]} func The iteratees to sort by.
   * @param {string[]} [ord] The sort orders of `func`.
   * @returns {Array} Returns the new sorted array.
   */
  orderBy = function (arr: any, func: any, ord: any) {
    let coll = [], temp;
    for (let item of arr) {
      coll.push(item);
    }
    if (Array.isArray(func)) {
      let func2 = func.reverse();
      if (ord && Array.isArray(ord)) {
        ord = ord.reverse();
      }
      for (let item in func2) {
        temp = Array.isArray(ord) && ord[item] ? ord[item] : 'asc';
        coll = this.applyOrder(func2[item], coll, temp);
      }
    } else {
      coll = this.applyOrder(func, coll, ord);
    }
    console.log(coll);
    return coll;
  }

  /**
   * This function is used by _.orderBy per one item of the collection
   *
   * @private
   * @param {Function[]|string[]} func The iteratee to sort by.arr The collection to iterate over.
   * @param {Array|Object} coll The collection to iterate over.
   * @param {string} ord The sort order of `func`.
   * @returns {Array} Returns the new sorted array.
   */
  applyOrder = function (func: any, coll: any, item: any) {
    let func1 = this.pickFunc(func);
    coll = coll.sort((obj1: any, obj2: any) => this.order(func1(obj1), func1(obj2), item));
    return coll;
  }

  /**
   * This function applies ascending or descending comparision.
   *
   * @private
   * @param {any} obj1 First comparing parameter.
   * @param {any} obj2 Second comparing parameter.
   * @param {string} ord The sort order of `func`.
   * @returns {boolean} Returns the comparision result.
   */
  order = function (obj1: any, obj2: any, value: any) {
    return value === 'desc' ? obj1 < obj2 : obj1 > obj2;
  }

  /**
   * Creates an array of elements split into two groups, the first of which
   * contains elements `func` returns truthy for, the second of which
   * contains elements `func` returns falsey for.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function invoked per iteration.
   * @returns {Array} Returns the array of grouped elements.
   * @param arr
   * @param func
   */
  partition = function (arr: any, func: any) {
    let arr1 = [];
    arr1[0] = this.filter(arr, func);
    arr1[1] = [];
    for (let item of arr) {
      if (this.find(arr1[0], item) === false) {
        arr1[1].push(item);
      }
    }
    return arr1;
  }

  /**
   * Reduces `arr` to a value which is the accumulated result of running
   * each element in `arr` thru `func`, where each successive
   * invocation is supplied the return value of the previous. If `acc`
   * is not given, the first element of `arr` is used as the initial
   * value.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function invoked per iteration.
   * @param {*} acc The initial value.
   * @returns {*} Returns the accumulated value.
   */
  reduce = function (arr: any, func: any, acc: any) {
    let arr1 = this.pickSubject(arr, 'key'),
      func1 = typeof func === 'string' ? (item: any) => acc += item[func] :
        Array.isArray(arr) ? (item: any) => acc = func(acc, item) :
          (item: any) => func(acc, arr[item], item);
    for (let item of arr1) {
      func1(item);
    }
    return acc;
  }

  /**
   * This method is like `_.reduce` except that it iterates over elements of
   * `arr` from right to left.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function invoked per iteration.
   * @param {*} acc The initial value.
   * @returns {*} Returns the accumulated value.
   */
  reduceRight = function (arr: any, func: any, acc: any) {
    let arr1 = [];
    if (typeof arr[0] !== 'undefined') {
      for (let i = arr.length - 1; i >= 0; i--) {
        arr1[arr.length - i - 1] = arr[i];
      }
    } else {
      arr1 = arr;
    }
    this.reduce(arr1, func, acc);
  }

  /**
   * The opposite of `_.filter`; this method returns the elements of `arr`
   * that `func` does **not** return truthy for.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  reject = function (arr: any, func: any) {
    return this.partition(arr, func)[1];
  }

  /**
   * Gets a random element from `arr`.
   *
   * @static
   * @param {Array|Object} arr The collection to sample.
   * @returns {*} Returns the random element.
   */
  sample = function (arr: any, lower: any, upper: any) {
    let arr1 = this.pickSubject(arr);
    lower = lower || 0;
    upper = upper || arr1.length;
    let rand = Math.floor(Math.random() * (upper - lower + 1) + lower);
    return arr1[rand];
  }

  /**
   * Gets `n` random elements at unique keys from `arr` up to the
   * size of `arr`.
   *
   * @static
   * @param {Array|Object} arr The collection to sample.
   * @param {number} [n=1] The number of elements to sample.
   * @returns {Array} Returns the random elements.
   */
  sampleSize = function (arr: any, n: any) {
    let arr2 = this.pickSubject(arr), arr1 = [];

    n = n === undefined || n === '' || n > arr2.length ? arr2.length : n;
    for (let i = 0, j = 0; i < arr2.length && j < n ; i++, j++) {
      let randomChoiceIndex = arr2.indexOf(this.sample(arr2, i, arr2.length - 1));
      [arr2[i], arr2[randomChoiceIndex]] = [arr2[randomChoiceIndex], arr2[i]];
      arr1.push(arr2[i]);
    }
    arr2 = '';
    for (let item of arr1) {
      arr2 += item;
    }
    return arr2;
  }

  /**
   * This functions applies Fisher-Yates shuffle algorithm on `array`
   *
   *
   * @param array the collection to be shuffled
   * @returns {any} the shuffled collection of the same type as `array`
   */
  shuffleInPlace = function(array: any) {
    // if it's 1 or 0 items, just return
    if (array.length <= 1) return array;

    // For each index in array
    for (let i = 0; i < array.length; i++) {

      // choose a random not-yet-placed item to place there
      // must be an item AFTER the current item, because the stuff
      // before has all already been placed
      let randomChoiceIndex = array.indexOf(this.sample(array, i, array.length - 1));

      // place our random choice in the spot by swapping
      [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
    }

    return array;
  }

  /**
   * Creates an array of shuffled values.
   *
   * @static
   * @param {Array|Object} arr The collection to shuffle.
   * @returns {Array} Returns the new shuffled array.
   */
  shuffle = function (arr: any) {
    let arr1;
    if (typeof arr === 'string') {
      arr1 = arr.split('');
      arr1 = this.shuffleInPlace(arr1);
      arr = '';
      for (let item of arr1) {
        arr += item;
      }
      return arr;
    }
    return this.shuffleInPlace(arr);
  }



  /**
   * Gets the size of `arr` by returning its length for array-like
   * values or the number of own enumerable string keyed properties for objects.
   *
   * @static
   * @param {Array|Object|string} arr The collection to inspect.
   * @returns {number} Returns the collection size.
   */
  size = function (arr: any) {
    let arr1 = this.pickSubject(arr);
    return arr1.length;
  }

  /**
   * Checks if `func` returns truthy for **any** element of `arr`.
   * Iteration is stopped once `item` returns falsey.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function applied per iteration.
   * returns {boolean} Returns `true` if any element passes the check.
   */
  some = function (arr: any, func: any) {
    let applied = typeof func === 'function' ? this.anyFunctionFunc : typeof func === 'string' ?
      this.anyStringFunc : Array.isArray(func) ? this.anyArrayFunc : this.anyObjectFunc;
    return applied(arr, func);
  }

  /**
   * Checks if `func` returns truthy for **any** element of `arr`.
   * Iteration is stopped once `item` returns truthy. This function is to apply functions.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function applied per iteration.
   * returns {boolean} Returns `true` if any elements passes the check.
   */
  anyFunctionFunc = function (arr: any, value: any) {
    for (let item of arr) {
      if (value(item))
        return true;
    }
    return false;
  }

  /**
   * Checks if `func` returns truthy for **any** element of `arr`.
   * Iteration is stopped once `item` returns truthy. This function is to apply properties.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function applied per iteration.
   * returns {boolean} Returns `true` if all elements pass the check.
   */
  anyStringFunc = function (arr: any, value: any) {
    for (let item of arr) {
      if (item[value])
        return true;
    }
    return false;
  }

  /**
   * Checks if `func` returns truthy for **any** element of `arr`.
   * Iteration is stopped once `flag` check returns truthy. This function is to check objects.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function applied per iteration.
   * returns {boolean} Returns `true` if all elements pass the check.
   */
  anyObjectFunc = function (arr: any, values: any) {
    let flag = false;
    for (let item of arr) {
      for (let value in values) {
        if (item[value] === values[value])
          flag = true;
        else {
          flag = false;
          break;
        }
      }
      if (flag) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if `func` returns truthy for **any** element of `arr`.
   * Iteration is stopped once `flag` check returns truthy. This function is to check arrays.
   *
   * @private
   * @param {Array|Object} arr The collection to iterate over.
   * @param {Function} func The function applied per iteration.
   * returns {boolean} Returns `true` if all elements pass the check.
   */
  anyArrayFunc = function (arr: any, values: any) {
    let flag = false;
    for (let item of arr) {
      for (let i = 0; i < values.length; i += 2) {
        if (item[values[i]] === values[i + 1]) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag) {
        return true;
      }
    }
    return false;
  }

  /**
   * Creates an array of elements, sorted in ascending order by the results of
   * running each element in a arr thru each func. This method
   * performs a stable sort, that is, it preserves the original sort order of
   * equal elements.
   *
   * @static
   * @param {Array|Object} arr The collection to iterate over.
   * @param {...(Function|Function[])} func The iteratees to sort by.
   * @returns {Array} Returns the new sorted array.
   */
  sortBy = function (arr: any, func: any) {
    return this.orderBy(arr, func);
  }
}
