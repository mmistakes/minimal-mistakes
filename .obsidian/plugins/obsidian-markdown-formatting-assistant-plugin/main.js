'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];
  idx = 0;

  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }

  idx = 0;

  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }

  return result;
}

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;

    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;

      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }

      combined[combinedIdx] = result;

      if (!_isPlaceholder(result)) {
        left -= 1;
      }

      combinedIdx += 1;
    }

    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      const sumArgs = (...args) => R.sum(args);
 *
 *      const curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */

var curryN =
/*#__PURE__*/
_curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }

  return _arity(length, _curryN(length, [], fn));
});

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

function _isTransformer(obj) {
  return obj != null && typeof obj['@@transducer/step'] === 'function';
}

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer created by [transducerCreator] to return a new transformer
 * (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} transducerCreator transducer factory if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */

function _dispatchable(methodNames, transducerCreator, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }

    var obj = arguments[arguments.length - 1];

    if (!_isArray(obj)) {
      var idx = 0;

      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }

        idx += 1;
      }

      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }

    return fn.apply(this, arguments);
  };
}

function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

var _xfBase = {
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
};

function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);

  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }

  return result;
}

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 *      _isArrayLike({nodeType: 1, length: 1}) // => false
 */

var _isArrayLike =
/*#__PURE__*/
_curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }

  if (!x) {
    return false;
  }

  if (typeof x !== 'object') {
    return false;
  }

  if (_isString(x)) {
    return false;
  }

  if (x.length === 0) {
    return true;
  }

  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }

  return false;
});

var XWrap =
/*#__PURE__*/
function () {
  function XWrap(fn) {
    this.f = fn;
  }

  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };

  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };

  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      const log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */

var bind =
/*#__PURE__*/
_curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    idx += 1;
  }

  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();

  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    step = iter.next();
  }

  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }

  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }

  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }

  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }

  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }

  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}

var XMap =
/*#__PURE__*/
function () {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;

  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap =
/*#__PURE__*/
_curry2(function _xmap(f, xf) {
  return new XMap(f, xf);
});

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var toString = Object.prototype.toString;

var _isArguments =
/*#__PURE__*/
function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has('callee', x);
  };
}();

var hasEnumBug = !
/*#__PURE__*/
{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

var hasArgsEnumBug =
/*#__PURE__*/
function () {

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;

  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }

    idx += 1;
  }

  return false;
};
/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values, R.toPairs
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */


var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ?
/*#__PURE__*/
_curry1(function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) :
/*#__PURE__*/
_curry1(function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }

  var prop, nIdx;
  var ks = [];

  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);

  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }

  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;

    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];

      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }

      nIdx -= 1;
    }
  }

  return ks;
});

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex, R.pluck, R.project
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */

var map =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });

    case '[object Object]':
      return _reduce(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));

    default:
      return _map(fn, functor);
  }
}));

/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
var _isInteger = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      const list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */

var nth =
/*#__PURE__*/
_curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});

/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx -> {s: a} -> a | Undefined
 * @param {String|Number} p The property name or array index
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path, R.props, R.pluck, R.project, R.nth
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 *      R.prop(0, [100]); //=> 100
 *      R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
 */

var prop =
/*#__PURE__*/
_curry2(function prop(p, obj) {
  if (obj == null) {
    return;
  }

  return _isInteger(p) ? nth(p, obj) : obj[p];
});

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */

var reduce =
/*#__PURE__*/
_curry3(_reduce);

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */

var append =
/*#__PURE__*/
_curry2(function append(el, list) {
  return _concat(list, [el]);
});

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys, R.toPairs
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */

var values =
/*#__PURE__*/
_curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;

  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }

  return vals;
});

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */

var type =
/*#__PURE__*/
_curry1(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implementation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */

function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;

    if (length === 0) {
      return fn();
    }

    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */

var slice =
/*#__PURE__*/
_curry3(
/*#__PURE__*/
_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */

var tail =
/*#__PURE__*/
_curry1(
/*#__PURE__*/
_checkForMethod('tail',
/*#__PURE__*/
slice(1, Infinity)));

/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      const f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 * @symb R.pipe(f, g, h)(a)(b) = h(g(f(a)))(b)
 */

function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }

  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */

var reverse =
/*#__PURE__*/
_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});

function _identity(x) {
  return x;
}

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      const obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */

var identity =
/*#__PURE__*/
_curry1(_identity);

function _arrayFromIterator(iter) {
  var list = [];
  var next;

  while (!(next = iter.next()).done) {
    list.push(next.value);
  }

  return list;
}

function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}

function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function _objectIs(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
}

var _objectIs$1 = typeof Object.is === 'function' ? Object.is : _objectIs;

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparison of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);

  var b = _arrayFromIterator(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  } // if *a* array contains any element that is not included in *b*


  return !_includesWith(function (b, aItem) {
    return !_includesWith(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if (_objectIs$1(a, b)) {
    return true;
  }

  var typeA = type(a);

  if (typeA !== type(b)) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
        return a === b;
      }

      break;

    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && _objectIs$1(a.valueOf(), b.valueOf()))) {
        return false;
      }

      break;

    case 'Date':
      if (!_objectIs$1(a.valueOf(), b.valueOf())) {
        return false;
      }

      break;

    case 'Error':
      return a.name === b.name && a.message === b.message;

    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }

      break;
  }

  var idx = stackA.length - 1;

  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }

    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));

    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));

    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;

    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);

  if (keysA.length !== keys(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;

  while (idx >= 0) {
    var key = keysA[idx];

    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }

    idx -= 1;
  }

  return true;
}

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      const a = {}; a.v = a;
 *      const b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */

var equals =
/*#__PURE__*/
_curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});

function _indexOf(list, a, idx) {
  var inf, item; // Array.prototype.indexOf doesn't exist below IE9

  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;

          while (idx < list.length) {
            item = list[idx];

            if (item === 0 && 1 / item === inf) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];

            if (typeof item === 'number' && item !== item) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } // non-zero numbers can utilise Set


        return list.indexOf(a, idx);
      // all these types can utilise Set

      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }

    }
  } // anything else not covered above, defer to R.equals


  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}

function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }

    idx += 1;
  }

  return result;
}

function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

var XFilter =
/*#__PURE__*/
function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;

  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter =
/*#__PURE__*/
_curry2(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */

var filter =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['fantasy-land/filter', 'filter'], _xfilter, function (pred, filterable) {
  return _isObject(filterable) ? _reduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }

    return acc;
  }, {}, keys(filterable)) : // else
  _filter(pred, filterable);
}));

/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      const isOdd = (n) => n % 2 !== 0;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */

var reject =
/*#__PURE__*/
_curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});

var XDrop =
/*#__PURE__*/
function () {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }

  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;

  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

var _xdrop =
/*#__PURE__*/
_curry2(function _xdrop(n, xf) {
  return new XDrop(n, xf);
});

/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */

var drop =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));

/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */

var last =
/*#__PURE__*/
nth(-1);

/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */

var takeLast =
/*#__PURE__*/
_curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});

var XFind =
/*#__PURE__*/
function () {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }

  XFind.prototype['@@transducer/init'] = _xfBase.init;

  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }

    return result;
  };

  return XFind;
}();

var _xfind =
/*#__PURE__*/
_curry2(function _xfind(f, xf) {
  return new XFind(f, xf);
});

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */

var find =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx += 1;
  }
}));

var XFindIndex =
/*#__PURE__*/
function () {
  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }

  XFindIndex.prototype['@@transducer/init'] = _xfBase.init;

  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, this.idx));
    }

    return result;
  };

  return XFindIndex;
}();

var _xfindIndex =
/*#__PURE__*/
_curry2(function _xfindIndex(f, xf) {
  return new XFindIndex(f, xf);
});

/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce, R.indexOf
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */

var findIndex =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xfindIndex, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}));

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      const mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */

var flip =
/*#__PURE__*/
_curry1(function flip(fn) {
  return curryN(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});

/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */

var forEachObjIndexed =
/*#__PURE__*/
_curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;

  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }

  return obj;
});

/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf, R.findIndex
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */

var indexOf =
/*#__PURE__*/
_curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
});

function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;

  while (idx < length) {
    var source = arguments[idx];

    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }

    idx += 1;
  }

  return output;
}

var _objectAssign$1 = typeof Object.assign === 'function' ? Object.assign : _objectAssign;

/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */

var match =
/*#__PURE__*/
_curry2(function match(rx, str) {
  return str.match(rx) || [];
});

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeRight, R.mergeDeepLeft, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const resetToDefault = R.mergeLeft({x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeLeft(a, b) = {...b, ...a}
 */

var mergeLeft =
/*#__PURE__*/
_curry2(function mergeLeft(l, r) {
  return _objectAssign$1({}, r, l);
});

/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.whereEq`](#whereEq).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.whereEq, R.propSatisfies, R.equals
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      const alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      const kids = [abby, fred, rusty, alois];
 *      const hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */

var propEq =
/*#__PURE__*/
_curry3(function propEq(name, val, obj) {
  return equals(val, prop(name, obj));
});

/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * The first two parameters correspond to the parameters of the
 * `String.prototype.replace()` function, so the second parameter can also be a
 * function.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */

var replace =
/*#__PURE__*/
_curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});

/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      const sortByFirstItem = R.sortBy(R.prop(0));
 *      const pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *
 *      const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      const people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */

var sortBy =
/*#__PURE__*/
_curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});

/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference, R.remove
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */

var without =
/*#__PURE__*/
_curry2(function (xs, list) {
  return reject(flip(_includes)(xs), list);
});

// Material Design Icons v7.0.96
var mdiChevronDown = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
var mdiChevronUp = "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";
var mdiCircleSmall = "M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z";
var mdiCodeTags = "M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z";
var mdiDivision = "M19,13H5V11H19V13M12,5A2,2 0 0,1 14,7A2,2 0 0,1 12,9A2,2 0 0,1 10,7A2,2 0 0,1 12,5M12,15A2,2 0 0,1 14,17A2,2 0 0,1 12,19A2,2 0 0,1 10,17A2,2 0 0,1 12,15Z";
var mdiFileLink = "M14 2H6C4.89 2 4 2.89 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M11 20H10C8.39 20 6 18.94 6 16C6 13.07 8.39 12 10 12H11V14H10C9.54 14 8 14.17 8 16C8 17.9 9.67 18 10 18H11V20M15 15V17H9V15H15M14 20H13V18H14C14.46 18 16 17.83 16 16C16 14.1 14.33 14 14 14H13V12H14C15.61 12 18 13.07 18 16C18 18.94 15.61 20 14 20M13 9V3.5L18.5 9H13Z";
var mdiFormatBold = "M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z";
var mdiFormatHeader1 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z";
var mdiFormatHeader2 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z";
var mdiFormatHeader3 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V15H15V16H19V12H15V10H19V6H15V7H13V6A2,2 0 0,1 15,4Z";
var mdiFormatHeader4 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M18,18V13H13V11L18,4H20V11H21V13H20V18H18M18,11V7.42L15.45,11H18Z";
var mdiFormatHeader5 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H20V6H15V10H17A4,4 0 0,1 21,14A4,4 0 0,1 17,18H15A2,2 0 0,1 13,16V15H15V16H17A2,2 0 0,0 19,14A2,2 0 0,0 17,12H15A2,2 0 0,1 13,10V6A2,2 0 0,1 15,4Z";
var mdiFormatHeader6 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V7H19V6H15V10H19A2,2 0 0,1 21,12V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V6A2,2 0 0,1 15,4M15,12V16H19V12H15Z";
var mdiFormatIndentIncrease = "M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M11,17H21V15H11M3,8V16L7,12M3,21H21V19H3V21Z";
var mdiFormatItalic = "M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z";
var mdiFormatListBulleted = "M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z";
var mdiFormatListBulletedSquare = "M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9";
var mdiFormatListNumbered = "M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z";
var mdiFormatStrikethroughVariant = "M23,12V14H18.61C19.61,16.14 19.56,22 12.38,22C4.05,22.05 4.37,15.5 4.37,15.5L8.34,15.55C8.37,18.92 11.5,18.92 12.12,18.88C12.76,18.83 15.15,18.84 15.34,16.5C15.42,15.41 14.32,14.58 13.12,14H1V12H23M19.41,7.89L15.43,7.86C15.43,7.86 15.6,5.09 12.15,5.08C8.7,5.06 9,7.28 9,7.56C9.04,7.84 9.34,9.22 12,9.88H5.71C5.71,9.88 2.22,3.15 10.74,2C19.45,0.8 19.43,7.91 19.41,7.89Z";
var mdiFormatUnderline = "M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z";
var mdiGraph = "M19.5 17C19.37 17 19.24 17 19.11 17.04L17.5 13.79C17.95 13.34 18.25 12.71 18.25 12C18.25 10.62 17.13 9.5 15.75 9.5C15.62 9.5 15.5 9.5 15.36 9.54L13.73 6.29C14.21 5.84 14.5 5.21 14.5 4.5C14.5 3.12 13.38 2 12 2S9.5 3.12 9.5 4.5C9.5 5.21 9.79 5.84 10.26 6.29L8.64 9.54C8.5 9.5 8.38 9.5 8.25 9.5C6.87 9.5 5.75 10.62 5.75 12C5.75 12.71 6.05 13.34 6.5 13.79L4.89 17.04C4.76 17 4.63 17 4.5 17C3.12 17 2 18.12 2 19.5C2 20.88 3.12 22 4.5 22S7 20.88 7 19.5C7 18.8 6.71 18.16 6.24 17.71L7.86 14.46C8 14.5 8.12 14.5 8.25 14.5C8.38 14.5 8.5 14.5 8.64 14.46L10.27 17.71C9.8 18.16 9.5 18.8 9.5 19.5C9.5 20.88 10.62 22 12 22S14.5 20.88 14.5 19.5C14.5 18.12 13.38 17 12 17C11.87 17 11.74 17 11.61 17.04L10 13.79C10.46 13.34 10.75 12.71 10.75 12S10.46 10.66 10 10.21L11.61 6.96C11.74 7 11.87 7 12 7S12.26 7 12.39 6.96L14 10.21C13.55 10.66 13.25 11.3 13.25 12C13.25 13.38 14.37 14.5 15.75 14.5C15.88 14.5 16 14.5 16.14 14.46L17.77 17.71C17.3 18.16 17 18.8 17 19.5C17 20.88 18.12 22 19.5 22S22 20.88 22 19.5C22 18.12 20.88 17 19.5 17Z";
var mdiImage = "M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z";
var mdiLanguageMarkdown = "M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6H20.56C21.35 6 22 6.63 22 7.41V16.59C22 17.37 21.35 18 20.56 18M6.81 15.19V11.53L8.73 13.88L10.65 11.53V15.19H12.58V8.81H10.65L8.73 11.16L6.81 8.81H4.89V15.19H6.81M19.69 12H17.77V8.81H15.85V12H13.92L16.81 15.28L19.69 12Z";
var mdiLinkVariant = "M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z";
var mdiMarker = "M18.5,1.15C17.97,1.15 17.46,1.34 17.07,1.73L11.26,7.55L16.91,13.2L22.73,7.39C23.5,6.61 23.5,5.35 22.73,4.56L19.89,1.73C19.5,1.34 19,1.15 18.5,1.15M10.3,8.5L4.34,14.46C3.56,15.24 3.56,16.5 4.36,17.31C3.14,18.54 1.9,19.77 0.67,21H6.33L7.19,20.14C7.97,20.9 9.22,20.89 10,20.12L15.95,14.16";
var mdiMenu = "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
var mdiXml = "M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z";

var greek = {
    alpha: 'M 14.401734,12.57328 13.755395,9.1800053 Q 13.094368,5.7132827 10.479636,5.6985932 8.5112431,5.6839037 7.6151835,7.3144385 6.4840918,9.3269003 6.4840918,12.015079 q 0,3.231691 1.1017126,4.774088 1.1164022,1.571777 2.8938316,1.571777 1.968394,0 3.026038,-3.128864 z m 1.513018,-4.4949874 1.454261,-4.3040242 h 2.409078 l -3.011348,8.9165276 0.58758,3.217001 q 0.132206,0.719786 0.646339,1.322056 0.602269,0.705096 1.072333,0.705096 h 1.292676 v 2.291562 h -1.615845 q -1.380813,0 -2.614731,-1.233918 -0.60227,-0.616959 -0.851991,-1.909635 -0.646338,1.571776 -2.056531,2.908521 -0.646338,0.616959 -2.746937,0.60227 -3.4373431,-0.02938 -5.1266359,-2.232805 -1.7186718,-2.291562 -1.7186718,-6.345865 0,-4.362782 1.8655668,-6.3458648 2.0712198,-2.2181148 4.9797409,-2.2621833 4.568436,-0.073448 5.435116,4.6712617 z',
    Alpha: "M 12,5.0899277 8.5418087,14.467431 H 15.470813 Z M 10.561191,2.5783215 h 2.89024 L 20.632858,21.421678 H 17.98242 L 16.265945,16.587782 H 7.7719191 L 6.0554443,21.421678 H 3.3671424 Z",
    Beta: 'm 7.8859735,12.420825 v 6.871367 h 4.0700605 q 2.047592,0 3.027421,-0.841648 0.992391,-0.85421 0.992391,-2.600316 0,-1.758668 -0.992391,-2.587755 -0.979829,-0.841648 -3.027421,-0.841648 z m 0,-7.7130155 v 5.6528615 h 3.7560125 q 1.859163,0 2.763621,-0.6909053 0.91702,-0.7034672 0.91702,-2.1355255 0,-1.4194963 -0.91702,-2.1229635 Q 13.501149,4.7078095 11.641986,4.7078095 Z M 5.3484667,2.6225317 h 6.4819483 q 2.901802,0 4.472041,1.2059437 1.570239,1.2059438 1.570239,3.4294027 0,1.7209823 -0.803962,2.7384974 -0.803963,1.0175155 -2.36164,1.2687535 1.871725,0.401981 2.901802,1.683296 1.042639,1.268754 1.042639,3.178165 0,2.512383 -1.70842,3.881631 -1.708421,1.369249 -4.861461,1.369249 H 5.3484667 Z',
    beta: 'm 9.2302992,16.654701 v 4.585227 H 7.5166283 V 6.9840389 q 0,-4.2239673 3.9460747,-4.2239673 4.001653,0 4.020179,3.5662882 0.02779,2.5380856 -1.59325,3.4643942 2.584401,0.833678 2.593664,3.306922 0.01853,4.399966 -4.464808,4.390703 -1.963774,-0.0093 -2.7881888,-0.833678 z m 0,-2.223141 q 1.0282028,1.611777 2.8530308,1.602514 2.667769,0 2.667769,-2.908609 0,-2.61219 -4.298072,-2.408402 V 9.142338 q 3.3625,0.055578 3.3625,-2.9641876 0,-2.0378789 -2.167562,-2.0286159 -2.4176658,0 -2.4176658,2.8900829 z',
    chi: 'M 13.641778,18.976096 11.900675,14.500644 8.3133019,21.044386 H 5.7776018 L 10.849002,11.789665 8.7222858,6.2859105 Q 8.1497084,4.8135685 6.3501792,4.8135685 H 5.7776018 V 2.9672983 l 0.8179678,0.02337 q 3.0147955,0.081797 3.7743374,2.0332342 l 1.729417,4.4754523 3.587373,-6.5437422 h 2.5357 l -5.0714,9.2547209 2.126716,5.503755 q 0.572578,1.472342 2.372107,1.472342 h 0.572577 v 1.84627 l -0.817967,-0.02337 q -3.014796,-0.0818 -3.762652,-2.033235 z',
    Chi: 'm 3.4596471,0.83472184 h 3.2456333 l 5.5489856,8.30104376 5.5789,-8.30104376 h 3.245633 l -7.179281,10.72405116 7.6579,11.606504 h -3.245633 l -6.281871,-9.49759 -6.3267416,9.49759 H 2.4425822 L 10.414576,11.244679 Z',
    delta: 'M 16.356173,5.6275098 Q 15.17758,4.8186714 12.415974,4.8186714 q -2.923373,0 -2.923373,1.3519156 0,1.0630447 3.050476,1.6176768 2.403406,0.4275289 3.755322,1.7216703 1.640786,1.5599029 1.640786,4.7605919 0,3.062031 -1.583012,4.864585 Q 14.77316,20.94922 12,20.94922 q -2.7616053,0 -4.3561725,-1.814109 -1.5830123,-1.802554 -1.5830123,-4.980133 0,-2.357187 1.5830123,-4.2637343 Q 8.2562338,9.1517343 9.1228463,8.7357602 7.3202922,7.8229283 7.3202922,6.1936966 q 0,-3.1429149 5.0956818,-3.1429149 2.553619,0 3.940199,0.8088384 z m -5.63876,3.6859921 q -0.7857282,0.3350902 -1.4212441,1.1785931 -0.9937158,1.305696 -0.9937158,3.662883 0,2.345631 0.9821609,3.662882 0.993716,1.328806 2.715386,1.328806 1.698561,0 2.692277,-1.340361 0.993715,-1.340361 0.993715,-3.535779 0,-2.299412 -1.05149,-3.408676 Q 13.513683,9.6717018 12.057774,9.5445986 11.318265,9.4752696 10.717413,9.3135019 Z',
    Delta: 'M 12,5.4972069 7.1303291,18.870986 H 16.881548 Z M 3.8759636,20.866364 10.645994,3.1336349 h 2.719889 l 6.758153,17.7327291 z',
    epsilon: 'M 9.6932475,11.339868 Q 8.0317921,10.983842 7.1417267,10.019604 6.2516613,9.0702014 6.2516613,7.6906 q 0,-2.0916537 1.6911243,-3.2635732 1.6762898,-1.157085 4.5838364,-1.157085 1.127417,0 2.388343,0.178013 1.260926,0.1780131 2.714699,0.5340393 V 6.4593428 Q 16.190725,6.0291445 15.003971,5.836297 13.802383,5.6434495 12.749139,5.6434495 q -1.765297,0 -2.7888718,0.6823835 -1.0384097,0.6823835 -1.0384097,1.6317866 0,1.0384097 1.0087408,1.7059587 0.9939067,0.6527147 2.7146997,0.6527147 h 2.299335 v 2.254832 h -2.195494 q -2.032316,0 -3.1003947,0.756556 -1.1570851,0.830728 -1.1570851,2.136157 0,1.335098 1.2460916,2.165826 1.2609262,0.830727 3.5009242,0.830727 1.379601,0 2.640527,-0.267019 1.260926,-0.281854 2.31417,-0.830728 v 2.536687 q -1.335098,0.415363 -2.581189,0.623045 -1.260926,0.207682 -2.44768,0.207682 -3.5305931,0 -5.4442338,-1.349932 -1.9136406,-1.349933 -1.9136406,-3.916288 0,-1.602118 1.0235752,-2.685031 1.0235752,-1.082913 2.8630437,-1.438939 z',
    Epsilon: 'M 6.2256278,3.0383187 H 17.558283 V 5.079157 H 8.650624 v 5.30618 h 8.535506 v 2.040838 H 8.650624 v 6.494668 h 9.123748 v 2.040838 H 6.2256278 Z',
    epsilonV2: 'M 18.514318,6.2709902 Q 17.960863,6.076533 17.407408,5.9269504 15.926541,5.5380359 14.340966,5.5380359 q -2.73736,0 -4.263102,1.480867 Q 8.6568302,8.3950621 8.3875817,10.923007 H 18.514318 v 2.153988 H 8.3875817 q 0.2692485,2.527945 1.6902823,3.904104 1.525742,1.480867 4.263102,1.480867 1.914656,0 3.066442,-0.388915 l 1.10691,-0.373956 v 2.498028 l -1.181702,0.269249 q -1.555658,0.329081 -3.156191,0.329081 -4.008811,0 -6.3422987,-2.333487 -2.3484455,-2.333488 -2.3484455,-6.461965 0,-4.1284778 2.3484455,-6.4619651 2.3334877,-2.3334874 6.3422987,-2.3334874 1.510784,0 3.156191,0.3290816 0.598331,0.119666 1.181702,0.299165 z',
    eta: 'M 17.268669,8.4557243 V 20.835414 H 15.201643 V 8.5231273 q 0,-1.7861803 -0.696498,-2.6736535 -0.696498,-0.8874732 -2.089494,-0.8874732 -1.673842,0 -2.6399523,1.0672146 -0.96611,1.0672147 -0.96611,2.9095641 V 16.049799 H 6.7313286 V 3.4679001 H 8.8095887 V 5.422588 Q 9.551022,4.2879703 10.550834,3.7262784 q 1.011045,-0.5616919 2.325404,-0.5616919 2.168131,0 3.280281,1.3368267 1.11215,1.3480606 1.11215,3.9543111 z',
    Eta: 'M 5.1765843,3.0480151 H 7.5989568 V 10.387084 H 16.401043 V 3.0480151 h 2.422373 V 20.951986 H 16.401043 V 12.425715 H 7.5989568 v 8.526271 H 5.1765843 Z',
    gamma: 'M 9.3393684,5.1089069 12.167372,13.096573 16.207376,3.0773617 h 2.25086 L 13.229316,16.005377 V 20.92264 H 11.105428 V 16.005377 L 7.7118237,6.3555369 Q 7.2039374,4.9011352 6.1073647,4.9011352 H 5.541764 V 3.0773617 h 0.8080009 q 2.2739456,0 2.9896035,2.0315452 z',
    Gamma: 'M 6.4626058,20.89917 V 3.1008309 H 17.537393 V 5.1274335 H 8.8706865 V 20.89917 Z',
    iota: 'M 11.406705,3.4808912 V 14.510095 q 0,2.205841 0.517232,2.905625 0.547657,0.730209 2.190628,0.730209 h 1.35393 v 2.373181 h -1.68861 q -2.738285,0 -3.9857258,-1.460419 -1.247441,-1.490844 -1.247441,-4.715935 L 8.5315055,3.4808912 Z',
    Iota: 'M 2.8576269,0.82926106 H 5.2855426 V 18.774202 H 2.8576269 Z',
    kappa: 'm 1.7263958,1.4153005 h 2.9457887 v 7.20943 l 7.4885045,-7.20943 h 3.47293 L 8.7962885,7.958052 16.703405,18.779949 H 13.214971 L 6.7962531,9.8185501 4.6721845,11.818586 v 6.961363 H 1.7263958 Z',
    kappaV2: 'M 10.230844,14.202115 Q 8.7976033,18.158456 5.8116853,20.009725 3.7066132,21.338459 3.6618244,19.173668 3.6468948,18.158456 4.5575998,16.904371 5.9908404,14.933665 8.0212646,13.082396 9.3798573,10.051689 8.7378849,7.5285883 8.3497156,5.975911 6.2297138,5.975911 q -0.8509866,0 -2.2095793,1.6123957 V 4.2440785 Q 5.2443609,3.3333736 7.1254892,3.5871766 10.798168,4.0649235 11.290845,7.648025 q 0.283662,2.0901426 -0.343381,3.762257 l 2.821693,-1.612396 q 1.43324,-3.9563413 4.419158,-5.8076105 2.105072,-1.3287335 2.149861,0.836057 0.01493,1.0152122 -0.895775,2.2692977 -1.433241,1.9707059 -3.463665,3.8219748 -1.358593,3.030707 -0.71662,5.553808 0.388169,1.552677 2.508171,1.552677 0.850986,0 2.209579,-1.612396 v 3.344228 q -1.224226,0.910705 -3.105355,0.656902 -3.672679,-0.477747 -4.165355,-4.060848 -0.283662,-2.090143 0.34338,-3.762257 z',
    Kappa: 'M 5.0808843,3.2824989 H 7.4398065 V 10.651211 L 15.263954,3.2824989 h 3.036237 L 9.6469168,11.41027 18.919116,20.717503 H 15.812812 L 7.4398065,12.321141 v 8.396362 H 5.0808843 Z',
    lambda: 'M 12.314527,5.2264366 18.122042,20.739355 H 15.931587 L 12.404392,11.438344 8.0684131,20.739355 H 5.8779576 L 11.393412,8.675 10.562163,6.4508451 Q 10.034207,5.0354738 8.8322643,5.0354738 H 7.7538862 V 3.2606432 l 1.3142733,0.022466 q 2.5386815,0.033699 3.2463675,1.9433272 z',
    Lambda: 'M 6.3859009,20.89793 H 3.8470408 L 10.641173,3.1020703 h 2.729573 L 20.152959,20.89793 H 17.649858 L 12,5.474057 Z',
    my: 'M 5.6951998,21.033569 V 2.9664295 h 2.1502934 v 8.1337185 q 0,1.694525 0.8063601,2.559317 0.80636,0.864792 2.3840207,0.864792 1.729584,0 2.594376,-0.981656 0.876478,-0.981656 0.876478,-2.944967 V 2.9664295 h 2.150294 V 13.040087 q 0,0.701182 0.198668,1.040087 0.210355,0.327219 0.642751,0.327219 0.105177,0 0.292159,-0.05843 0.186982,-0.07012 0.514201,-0.210355 v 1.729584 q -0.479142,0.268787 -0.911538,0.397337 -0.420709,0.12855 -0.829732,0.12855 -0.80636,0 -1.285502,-0.455769 -0.479141,-0.455769 -0.654437,-1.390679 -0.584319,0.923224 -1.437424,1.390679 -0.84142,0.455769 -1.986684,0.455769 -1.192011,0 -2.0334301,-0.455769 -0.8297328,-0.455769 -1.3205607,-1.367306 v 6.462567 z',
    My: 'm 3.7687495,3.0034731 h 3.627535 L 11.987948,15.24791 16.603715,3.0034731 H 20.23125 V 20.996529 H 17.857083 V 5.1968663 L 13.217213,17.537716 H 10.770736 L 6.1308653,5.1968663 V 20.996529 H 3.7687495 Z',
    ny: 'M 9.7754676,20.591297 4.52864,3.4087037 H 7.566277 L 12,17.829809 Q 13.840992,15.92745 15.375152,13.288695 16.541114,11.309628 16.60248,9.591369 16.633163,8.7782641 16.264965,7.244104 15.8354,5.4184534 14.20919,3.4087037 h 2.853538 v 0 q 1.058571,1.3654025 1.764284,3.267761 0.644348,1.7489426 0.644348,2.9455875 0,3.0069538 -2.086458,5.6917338 -2.715464,3.497885 -4.602481,5.277511 z',
    Ny: 'm 5.3103501,3.161375 h 3.220504 l 7.8381389,14.78827 V 3.161375 H 18.68965 V 20.838627 H 15.469146 L 7.6310074,6.0503566 V 20.838627 H 5.3103501 Z',
    omega: 'm 8.2760531,19.014332 q -5.066931,0 -5.066931,-7.252426 0,-2.8692265 1.8924682,-6.7762576 h 2.4174755 q -1.7459545,3.9070311 -1.7459545,6.8373046 -0.012209,5.286701 2.7105028,5.286701 2.5273609,0 2.4785229,-6.568696 h 2.07561 q -0.04884,6.605325 2.478523,6.568696 2.710503,-0.02442 2.710503,-5.286701 0,-2.9302735 -1.745955,-6.8373046 h 2.417476 q 1.892468,3.9070311 1.892468,6.7762576 0.02442,7.264636 -5.066931,7.252426 -3.308767,-0.01221 -3.723889,-3.650632 -0.500588,3.650632 -3.7238889,3.650632 z',
    Omega: 'm 20.200889,18.722517 v 2.072048 h -6.984433 v -2.072048 q 2.060408,-1.129151 3.212839,-3.061511 1.152432,-1.93236 1.152432,-4.283786 0,-2.7937731 -1.536576,-4.4816779 -1.536575,-1.6879048 -4.050971,-1.6879048 -2.5143964,0 -4.0626126,1.6995455 Q 6.394992,8.5950876 6.394992,11.37722 q 0,2.351426 1.1524316,4.283786 1.1640723,1.93236 3.2361214,3.061511 v 2.072048 H 3.7991108 v -2.072048 h 3.7133906 q -1.8392342,-1.618061 -2.689007,-3.352529 -0.838132,-1.734467 -0.838132,-3.87636 0,-3.7017502 2.2350188,-5.9949726 Q 8.4437593,3.205433 11.99418,3.205433 q 3.527139,0 5.773798,2.2932224 2.235019,2.2815816 2.235019,5.8785646 0,2.258301 -0.826491,3.981128 -0.826492,1.722827 -2.700648,3.364169 z',
    omikron: 'm 12,5.6961742 q -2.1596437,0 -3.4145719,1.6926938 Q 7.3305,9.0669695 7.3305,11.999999 q 0,2.93303 1.240336,4.625724 1.2549281,1.678101 3.429164,1.678101 2.145052,0 3.39998,-1.692694 1.254928,-1.692693 1.254928,-4.611131 0,-2.9038451 -1.254928,-4.5965388 Q 14.145052,5.6961742 12,5.6961742 Z M 12,3.419793 q 3.502125,0 5.501255,2.2763812 1.999129,2.2763813 1.999129,6.3038248 0,4.012852 -1.999129,6.303825 -1.99913,2.276381 -5.501255,2.276381 -3.5167172,0 -5.5158469,-2.276381 -1.9845374,-2.290973 -1.9845374,-6.303825 0,-4.0274435 1.9845374,-6.3038248 Q 8.4832828,3.419793 12,3.419793 Z',
    Omikron: 'm 12.011717,4.8465967 q -2.5778024,0 -4.1010495,1.9216348 -1.5115297,1.9216347 -1.5115297,5.2376265 0,3.304274 1.5115297,5.225909 1.5232471,1.921635 4.1010495,1.921635 2.577803,0 4.077615,-1.921635 1.51153,-1.921635 1.51153,-5.225909 0,-3.3159918 -1.51153,-5.2376265 Q 14.58952,4.8465967 12.011717,4.8465967 Z m 0,-1.9216347 q 3.679228,0 5.882077,2.4723471 2.20285,2.4606299 2.20285,6.6085489 0,4.136201 -2.20285,6.608549 -2.202849,2.460629 -5.882077,2.460629 -3.6909445,0 -5.9055114,-2.460629 -2.2028496,-2.46063 -2.2028496,-6.608549 0,-4.147919 2.2028496,-6.6085489 Q 8.3207725,2.924962 12.011717,2.924962 Z',
    phi: 'm 13.801441,4.860948 q -0.748449,0 -0.748449,1.6696169 V 14.42958 q 1.082372,0 2.187774,-1.197518 0.990255,-1.070858 0.978741,-3.6386136 Q 16.207992,7.1984117 15.229251,5.9087766 14.423229,4.860948 13.801441,4.860948 Z m 0,-1.8077921 q 1.658102,0 3.074398,1.5199271 1.531442,1.6235586 1.5775,5.0203654 0.04606,3.1204566 -1.5775,4.9743066 -1.531442,1.750219 -3.822847,1.750219 v 4.628869 H 10.94582 v -4.617354 q -2.2914051,0 -3.8343614,-1.761734 Q 5.5454731,12.771478 5.5454731,9.604963 5.5339585,6.3117875 7.1114586,4.630656 8.308977,3.3755647 10.197371,3.0531559 V 4.9300356 Q 9.4374077,5.1948714 8.7695609,6.0930102 7.7677908,7.4171891 7.7793054,9.604963 7.79082,11.930912 8.7695609,13.255091 9.6446705,14.441095 10.94582,14.441095 V 6.5305649 q 0,-3.477409 2.855621,-3.477409 z',
    Phi: 'M 10.832526,6.8944823 Q 8.3117132,7.1268153 6.9757984,8.3117136 5.6398837,9.4966119 5.6398837,11.785092 q 0,2.28848 1.3359147,3.473378 1.3359148,1.173282 3.8567276,1.405615 z m 2.35818,9.7696027 q 2.520813,-0.232333 3.845111,-1.405615 1.324298,-1.184898 1.324298,-3.473378 0,-2.2884801 -1.324298,-3.4733784 -1.324298,-1.1848983 -3.845111,-1.4172313 z m -2.35818,1.939981 Q 7.1500482,18.336883 5.1519844,16.606002 3.1655372,14.863504 3.1655372,11.785092 q 0,-3.0784123 1.9864472,-4.8209098 Q 7.1500482,5.210068 10.832526,4.9428851 V 3.3281707 h 2.35818 v 1.6147144 q 3.682478,0.2671829 5.657309,2.0096804 1.986447,1.7308809 1.986447,4.8325265 0,3.078412 -1.986447,4.82091 -1.974831,1.730881 -5.657309,1.998064 v 2.067763 h -2.35818 z',
    pi: 'M 3.7189921,3.2906647 H 19.845165 V 6.0560104 H 17.726069 V 16.395998 q 0,1.082092 0.360697,1.563022 0.375726,0.4659 1.202324,0.4659 0.225436,0 0.556075,-0.03006 0.330639,-0.04509 0.435843,-0.06012 v 1.998864 q -0.526017,0.195378 -1.082092,0.285552 -0.556075,0.09017 -1.11215,0.09017 -1.803486,0 -2.494823,-0.976888 -0.691336,-0.991918 -0.691336,-3.637031 V 6.0560104 H 8.6936084 V 20.123203 H 5.8681466 V 6.0560104 H 3.7189921 Z',
    Pi: 'M 18.608513,3.3299575 V 20.670044 H 16.262432 V 5.3043813 H 7.7375675 V 20.670044 h -2.34608 V 3.3299575 Z',
    psi: 'M 10.935468,16.327933 Q 8.2479614,15.897466 7.0030989,14.768946 5.479015,13.384473 5.479015,10.557355 V 3.0067407 h 2.1639665 v 7.4691753 q 0,2.129063 0.9889095,3.013265 0.8609329,0.767859 2.303577,0.930738 V 3.0067407 h 2.129064 V 14.408285 q 1.524084,-0.162879 2.303577,-0.930738 0.98891,-0.977276 0.98891,-3.013266 V 3.0067407 h 2.163966 v 7.5389803 q 0,2.931826 -1.524084,4.211591 -1.372839,1.151788 -3.932369,1.558986 v 4.67696 h -2.129064 z',
    Psi: 'm 10.801897,20.855284 q 0.01186,-1.589562 0,-3.677345 -2.5385542,0 -4.768686,-2.491105 Q 3.8505289,12.266904 3.7912169,7.9964391 V 3.1447164 h 2.5266918 v 4.8517227 q 0,3.3451979 1.5421124,5.2906319 1.3048643,1.660736 2.9418759,1.82681 V 3.1447164 h 2.396205 V 15.113881 q 1.637012,-0.166074 2.941876,-1.82681 1.542113,-1.945434 1.542113,-5.2906319 V 3.1447164 h 2.526691 v 4.8517227 q -0.05931,4.2704649 -2.241994,6.6903949 -2.230131,2.491105 -4.768686,2.491105 -0.01186,0.854093 0,3.677345 z',
    rho: 'M 7.2721353,5.5638933 Q 7.9738378,4.3905546 9.7108392,3.3552558 10.389535,2.9526396 12.483139,2.9526396 q 2.346678,0 3.807599,1.8635379 1.472425,1.8635378 1.472425,4.9004144 0,3.0368761 -1.472425,4.9004141 -1.460921,1.863538 -3.807599,1.863538 -1.414908,0 -2.438704,-0.552159 Q 9.0321433,15.364722 8.3649507,14.21439 v 6.832972 H 6.2368365 V 9.8316251 q 0,-2.657267 1.0352988,-4.2677318 z m 8.2938937,4.1526986 q 0,-2.335174 -0.966279,-3.6580558 -0.954775,-1.3343852 -2.63426,-1.3343852 -1.679485,0 -2.6457637,1.3343852 -0.9547756,1.3228818 -0.9547756,3.6580558 0,2.3351741 0.9547756,3.6695591 0.9662787,1.322882 2.6457637,1.322882 1.679485,0 2.63426,-1.322882 0.966279,-1.334385 0.966279,-3.6695591 z',
    rhoV2: 'M 6.343175,9.8672262 Q 6.3658039,7.5590777 7.3614758,5.669564 8.0516575,4.5154897 9.76014,3.4971889 10.427693,3.101183 12.486923,3.101183 q 2.308149,0 3.745084,1.8329415 1.44825,1.8329415 1.44825,4.8199572 0,2.9870153 -1.44825,4.8199573 -1.436935,1.832941 -3.745084,1.832941 -1.391677,0 -2.398664,-0.543093 -0.9956718,-0.554409 -1.6519101,-1.685854 0.056572,4.797328 3.3151351,4.797328 h 5.657227 v 1.923457 h -5.476196 q -5.6798556,0 -5.6119689,-8.259551 z m 8.225608,3.4961658 q 0.950414,-1.312476 0.950414,-3.6093103 0,-2.2968341 -0.950414,-3.5979962 -0.9391,-1.3124766 -2.59101,-1.3124766 -1.65191,0 -2.6023244,1.3124766 -0.9390997,1.3011621 -0.9390997,3.5979962 0,2.2968343 0.9390997,3.6093103 0.9504144,1.301163 2.6023244,1.301163 1.65191,0 2.59101,-1.301163 z',
    Rho: 'm 8.7160019,5.1915682 v 6.5797248 h 2.9790551 q 1.653728,0 2.556827,-0.856185 0.9031,-0.856186 0.9031,-2.4395418 0,-1.5716276 -0.9031,-2.4278128 -0.903099,-0.8561852 -2.556827,-0.8561852 z m -2.36917,-1.9469417 h 5.3482251 q 2.94387,0 4.445126,1.3370564 1.512985,1.3253277 1.512985,3.8938833 0,2.5920128 -1.512985,3.9173408 -1.501256,1.325327 -4.445126,1.325327 H 8.7160019 v 7.037139 h -2.36917 z',
    sigma: 'm 11.272533,5.5802928 q -2.2798958,0 -3.5098398,1.6499248 -1.2899411,1.7249214 -1.2899411,4.5747914 0,3.014863 1.2749418,4.754783 1.2899412,1.724922 3.5248391,1.724922 2.2049,0 3.494841,-1.739921 1.289941,-1.739921 1.289941,-4.739784 0,-2.7448748 -1.289941,-4.5747914 -1.184946,-1.6499248 -3.494841,-1.6499248 z m 0,-2.2048994 9.164582,0.014999 v 2.7598741 h -3.089859 q 1.634926,2.3398934 1.634926,5.6547422 0,4.124812 -2.054907,6.464705 -2.054906,2.354893 -5.654742,2.354893 -3.614835,0 -5.654742,-2.354893 -2.0549063,-2.339893 -2.0549063,-6.464705 0,-4.1398112 2.0549063,-6.4797045 1.7099221,-1.9499111 5.654742,-1.9499111 z',
    Sigma: 'm 9.086566,18.74536 h 8.541392 v 1.989091 H 6.3720414 V 18.74536 L 11.976599,11.444225 6.3720414,5.2546408 V 3.2655495 H 17.417348 V 5.2546408 H 9.086566 l 5.604557,6.1427822 z',
    tau: 'm 13.906962,17.409391 q 0.547017,0.729356 2.188069,0.729356 h 1.352348 v 2.370408 h -1.686636 q -2.735086,0 -3.98107,-1.458712 Q 10.53369,17.56134 10.53369,14.340017 V 6.2867085 H 4.1518225 V 3.4908429 H 19.848177 v 2.7958656 h -6.457842 v 8.2204525 q 0,2.203264 0.516627,2.90223 z',
    Tau: 'M 4.5314337,3.1713617 H 19.468567 V 5.1819022 H 13.200411 V 20.828638 H 10.799589 V 5.1819022 H 4.5314337 Z',
    theta: 'M 15.579689,12.72607 H 8.4090535 Q 8.5779067,16.091879 9.3546318,17.521503 10.322724,19.277577 12,19.277577 q 1.688532,0 2.622854,-1.767331 0.821752,-1.55345 0.956835,-4.784176 z M 15.545918,10.8124 Q 15.230726,7.6154443 14.622854,6.4897558 13.654762,4.711168 12,4.711168 q -1.722304,0 -2.6341113,1.756074 Q 8.645448,7.8856095 8.4315672,10.8124 Z M 12,3.0226353 q 2.701652,0 4.243845,2.3864596 1.542193,2.3752027 1.542193,6.5852771 0,4.198818 -1.542193,6.585278 Q 14.701652,20.977367 12,20.977367 q -2.7129095,0 -4.2438459,-2.397717 -1.5421932,-2.38646 -1.5421932,-6.585278 0,-4.2100744 1.5421932,-6.5852771 Q 9.2870905,3.0226353 12,3.0226353 Z',
    thetaV2: 'm 15.469438,10.838572 q 0.06605,-2.7081621 -0.539431,-4.0952695 -0.825659,-1.8714941 -2.36689,-1.8714941 -0.913729,0 -1.618292,0.781624 -0.616492,0.7265801 -0.616492,1.7173711 0,1.6843447 1.332064,2.8622855 0.81465,0.715571 3.809041,0.605483 z m 0.03303,1.871494 q -3.390707,0.09908 -4.832858,-0.715571 -2.3228548,-1.321055 -2.3228548,-4.5686476 0,-1.7614062 1.144914,-2.9723729 1.1449138,-1.2329844 3.0714518,-1.2329844 2.300837,0 3.787024,2.3338632 1.409125,2.2017578 1.310046,6.4401417 -0.09908,4.260401 -1.508205,6.440141 -1.508204,2.344872 -4.150313,2.344872 -2.6090829,0 -4.1503133,-2.344872 -1.6403096,-2.476977 -1.5082041,-7.607073 l 2.1467138,0.01101 q -0.36329,4.205357 0.9247383,6.572247 0.9357473,1.706362 2.5870653,1.706362 1.585266,0 2.565048,-1.717371 1.045835,-1.827459 0.935747,-4.689744 z',
    Theta: 'm 7.9367942,10.451838 h 8.1264118 v 1.956784 H 7.9367942 Z M 12.01151,4.9728405 q -2.532309,0 -4.0171633,1.8877217 -1.4963647,1.8877216 -1.4963647,5.1451928 0,3.24596 1.4848542,5.133682 1.4963648,1.887721 4.0286738,1.887721 2.53231,0 4.017164,-1.887721 1.473344,-1.887722 1.473344,-5.133682 0,-3.2574712 -1.473344,-5.1451928 Q 14.54382,4.9728405 12.01151,4.9728405 Z m 0,-1.8877216 q 3.614297,0 5.77827,2.428715 2.163974,2.4172046 2.163974,6.4919211 0,4.063205 -2.163974,6.48041 -2.163973,2.428715 -5.77827,2.428715 -3.6258063,0 -5.7897799,-2.417204 -2.1754841,-2.417205 -2.1754841,-6.491921 0,-4.0747165 2.1754841,-6.5034316 Q 8.3857037,3.0851189 12.01151,3.0851189 Z',
    xi: 'm 13.455676,15.869969 q 1.171642,0.0089 1.872851,0.674582 0.745591,0.70121 0.745591,1.766338 0,1.020749 -0.65683,1.730835 -0.710086,0.772218 -2.156886,0.772218 0,-0.665705 0,-1.340287 0.612449,0.04438 0.985244,-0.346167 0.284035,-0.310662 0.284035,-0.639077 0,-0.470432 -0.284035,-0.860979 -0.275158,-0.372795 -0.78997,-0.372795 -5.5297944,0 -5.5297944,-3.878845 0,-2.662822 2.9557324,-3.4439165 -2.4853005,-0.3195386 -2.4853005,-2.6273179 0,-1.7485866 1.9527365,-2.4764247 H 8.5028264 V 3.1860592 h 7.0032226 v 1.6420737 q -5.5830508,0 -5.5830508,2.5829376 0,1.6953301 4.6865668,1.7752148 v 1.5089327 q -5.0593619,-0.195274 -5.0416097,2.680574 0.00888,2.405416 3.8877207,2.494177 z',
    Xi: 'm 7.8096655,10.414628 h 8.3806695 v 2.003817 H 7.8096655 Z M 6.5720139,3.2008867 H 17.427987 V 5.2047036 H 6.5720139 Z m 0,15.5944103 H 17.427987 v 2.003817 H 6.5720139 Z',
    ypsilon: 'M 8.0381133,3.5543118 V 14.212449 q 0,1.984619 0.735044,2.925475 0.8085484,1.014361 2.3815427,1.014361 2.205132,0 3.748724,-3.057783 0.867352,-1.734704 1.087865,-4.483768 Q 16.108896,9.1112442 15.66787,7.2295316 15.256245,5.480127 13.697952,3.5543118 h 2.734363 v 0 q 1.029062,1.3230791 1.690602,3.1312873 0.617436,1.6906011 0.617436,3.9545369 0,3.719322 -1.881712,6.468387 -2.293337,3.3518 -6.027361,3.337099 -2.631457,0 -4.1162458,-1.764105 Q 5.274348,16.946813 5.274348,14.05074 L 5.2596471,3.5543118 Z',
    Ypsilon: 'm 4.4662565,3.0660208 h 2.5970173 l 4.9546782,7.3482432 4.918775,-7.3482432 h 2.597017 l -6.31901,9.3588372 v 8.509121 h -2.429468 v -8.509121 z',
    zeta: 'm 13.354145,15.871523 q 1.172112,0.0089 1.873604,0.674853 0.74589,0.701491 0.74589,1.767048 0,1.021158 -0.657094,1.731529 -0.710371,0.772529 -2.157752,0.772529 0,-0.665973 0,-1.340826 0.612695,0.0444 0.98564,-0.346306 0.284148,-0.310787 0.284148,-0.639334 0,-0.470621 -0.284148,-0.861325 -0.275269,-0.372944 -0.790288,-0.372944 -5.3810606,0 -5.3899402,-4.999237 0,-4.3687818 5.0702732,-7.432257 H 8.3105107 V 3.1825199 H 16.035796 V 4.825253 q -6.4288581,3.2321883 -6.4288581,7.432257 0,3.614013 3.7472071,3.614013 z',
    Zeta: 'M 5.1680194,3.3042234 H 18.83198 V 5.0981279 L 7.8355786,18.715494 H 19.099901 v 1.980284 H 4.9000986 V 18.901873 L 15.8965,5.2845076 H 5.1680194 Z',
};
var latex = {};

var iconPaths = /*#__PURE__*/Object.freeze({
    __proto__: null,
    greek: greek,
    latex: latex
});

function pathToSvg(icon) {
    return "\n    <svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill=\"currentColor\" d=\"".concat(icon, "\" />\n    </svg>");
}
function importIconPaths() {
    var res = {};
    console.log(iconPaths);
    forEachObjIndexed(function (value, key, obj) {
        // @ts-ignore
        res = mergeLeft(res, map(pathToSvg, value));
    }, iconPaths);
    return res;
}
var icons = __assign(__assign({}, importIconPaths()), { division: pathToSvg(mdiDivision), multiplication: pathToSvg(mdiCircleSmall), h1: pathToSvg(mdiFormatHeader1), h2: pathToSvg(mdiFormatHeader2), h3: pathToSvg(mdiFormatHeader3), h4: pathToSvg(mdiFormatHeader4), h5: pathToSvg(mdiFormatHeader5), h6: pathToSvg(mdiFormatHeader6), bold: pathToSvg(mdiFormatBold), italic: pathToSvg(mdiFormatItalic), strikethrough: pathToSvg(mdiFormatStrikethroughVariant), codeInline: pathToSvg(mdiCodeTags), codeBlock: pathToSvg(mdiXml), link: pathToSvg(mdiLinkVariant), mermaidBlock: pathToSvg(mdiGraph), fileLink: pathToSvg(mdiFileLink), image: pathToSvg(mdiImage), quote: pathToSvg(mdiFormatIndentIncrease), bulletList: pathToSvg(mdiFormatListBulleted), numberList: pathToSvg(mdiFormatListNumbered), checkList: pathToSvg(mdiFormatListBulletedSquare), viewIcon: pathToSvg(mdiLanguageMarkdown), underline: pathToSvg(mdiFormatUnderline), menu: pathToSvg(mdiMenu), expandArrowDown: pathToSvg(mdiChevronDown), expandArrowUp: pathToSvg(mdiChevronUp), highlight: pathToSvg(mdiMarker) });
var addIcons = function () {
    Object.keys(icons).forEach(function (key) {
        obsidian.addIcon(key, icons[key]);
    });
};
/**
 * Convert an svg string into an HTML element.
 *
 * @param svgText svg image as a string
 */
var svgToElement = function (key) {
    if (key.toString().contains('.svg')) {
        var img = document.createElement('img');
        img.src = key.toString();
        img.style.width = '24px';
        img.style.height = '24px';
        return img;
    }
    else {
        var parser = new DOMParser();
        return parser.parseFromString(icons[key], 'text/xml').documentElement;
    }
};

var formatSettings = {
    h1: {
        des: 'h1',
        icon: 'h1',
        symbol: '# ',
        shift: 2,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    h2: {
        des: 'h2',
        icon: 'h2',
        symbol: '## ',
        shift: 3,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    h3: {
        des: 'h3',
        icon: 'h3',
        symbol: '### ',
        shift: 4,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    h4: {
        des: 'h4',
        icon: 'h4',
        symbol: '#### ',
        shift: 5,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    h5: {
        des: 'h5',
        icon: 'h5',
        symbol: '##### ',
        shift: 6,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    h6: {
        des: 'h6',
        icon: 'h6',
        symbol: '###### ',
        shift: 7,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    bold: {
        des: 'bold',
        icon: 'bold',
        symbol: '****',
        shift: 2,
        selectionInput: 2,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    italic: {
        des: 'italic',
        icon: 'italic',
        symbol: '**',
        shift: 1,
        selectionInput: 1,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    underline: {
        des: 'underline',
        icon: 'underline',
        symbol: '<u></u>',
        shift: 3,
        selectionInput: 3,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    strikethrough: {
        des: 'strikethrough',
        icon: 'strikethrough',
        symbol: '~~~~',
        shift: 2,
        selectionInput: 2,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    highlight: {
        des: 'highlight',
        icon: 'highlight',
        symbol: '========',
        shift: 4,
        selectionInput: 4,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    codeBlock: {
        des: 'code_block',
        icon: 'codeBlock',
        symbol: '``` \n```',
        shift: 4,
        selectionInput: 4,
        newLine: true,
        enclose: true,
        objectType: 'formatterSetting',
    },
    mermaidBlock: {
        des: 'mermaid_block',
        icon: 'mermaidBlock',
        symbol: '```mermaid \n```',
        shift: 4,
        selectionInput: 4,
        newLine: true,
        enclose: true,
        objectType: 'formatterSetting',
    },
    codeInline: {
        des: 'code_inline',
        icon: 'codeInline',
        symbol: '``',
        shift: 1,
        selectionInput: 1,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    link: {
        des: 'link',
        icon: 'link',
        symbol: '[]()',
        shift: 3,
        selectionInput: 1,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    internalLink: {
        des: 'internal_link',
        icon: 'fileLink',
        symbol: '[[]]',
        shift: 2,
        selectionInput: 2,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    image: {
        des: 'image',
        icon: 'image',
        symbol: '![]()',
        shift: 4,
        selectionInput: 2,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    blockquote: {
        des: 'blockquote',
        icon: 'quote',
        symbol: '> ',
        shift: 2,
        selectionInput: 0,
        newLine: true,
        enclose: false,
        objectType: 'formatterSetting',
    },
    bulletList: {
        des: 'bullet_list',
        icon: 'bulletList',
        symbol: '- ',
        shift: 2,
        selectionInput: 0,
        newLine: true,
        enclose: false,
        objectType: 'formatterSetting',
    },
    numberList: {
        des: 'number_list',
        icon: 'numberList',
        symbol: '1. ',
        shift: 3,
        selectionInput: 0,
        newLine: true,
        enclose: false,
        objectType: 'formatterSetting',
    },
    checkList: {
        des: 'check_list',
        icon: 'checkList',
        symbol: '- [ ] ',
        shift: 6,
        selectionInput: 0,
        newLine: true,
        enclose: false,
        objectType: 'formatterSetting',
    },
};
function iconFormatter(editor, item) {
    if (editor) {
        var isSelection = editor.somethingSelected;
        var selection = editor.getSelection();
        var curserStart = editor.getCursor('from');
        editor.getCursor('to');
        var line = editor.getLine(curserStart.line);
        editor.focus();
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].contains(item.des)) {
            var reStringExact = '^\\s*' + item.symbol + '+\\s*';
            var reStringAny = '^\\s*#+\\s*';
            var cleanedLine = line.replace(new RegExp(reStringAny, 'g'), '');
            var replacement = item.symbol + cleanedLine;
            // To delete the headings if the same heading is clicked twice
            if (new RegExp(reStringExact, 'g').test(line)) {
                replacement = cleanedLine;
            }
            // replace the hole line with the updated new line
            editor.replaceRange(replacement, { line: curserStart.line, ch: 0 }, { line: curserStart.line, ch: line.length });
            // Calculate the shift of the course depending on how many # are in the old and new line
            var oldNumberOfHeadings = match(/([#])/g, line).length;
            var newNumberOfHeadings = match(/([#])/g, replacement).length;
            var courserCorrection = newNumberOfHeadings - oldNumberOfHeadings;
            // If the old or the new line doesn't contain any heading than the course correction has to be corrected by the space after the # (### sdfsd)
            if (newNumberOfHeadings === 0)
                courserCorrection -= 1;
            if (oldNumberOfHeadings === 0)
                courserCorrection += 1;
            // finally set the new course position
            editor.setCursor(curserStart.line, curserStart.ch + courserCorrection);
        }
        else if ([
            'bold',
            'italic',
            'strikethrough',
            'code_inline',
            'link',
            'internal_link',
            'image',
            'underline',
            'highlight',
        ].contains(item.des)) {
            if (isSelection) {
                editor.replaceSelection(item.symbol.substring(0, item.selectionInput) +
                    selection +
                    item.symbol.substring(item.selectionInput));
                editor.setCursor(curserStart.line, curserStart.ch + selection.length + item.shift);
            }
            else {
                editor.replaceRange(item.symbol, curserStart);
                editor.setCursor(curserStart.line, curserStart.ch + item.shift);
            }
        }
        else if (['code_block'].contains(item.des) ||
            ['mermaid_block'].contains(item.des)) {
            if (isSelection) {
                var re = new RegExp('^(```).*(```)$', 'gs');
                var match$1 = selection.trim().match(re);
                var replacment = selection.trim();
                if (match$1) {
                    replacment = editor
                        .getSelection()
                        .trim()
                        .replace(/^(```)/g, '')
                        .replace(/(```)$/g, '');
                    editor.replaceSelection(replacment);
                }
                else {
                    editor.replaceSelection(item.symbol.substring(0, item.selectionInput) +
                        '\n' +
                        replacment +
                        item.symbol.substring(item.selectionInput));
                    editor.setCursor(curserStart.line, curserStart.ch + item.shift);
                }
            }
            else {
                var pos = curserStart;
                var replacement = item.symbol;
                if (line.trim()) {
                    pos.ch = line.length;
                    replacement = '\n' + replacement;
                }
                else {
                    pos.ch = 0;
                }
                editor.replaceRange(replacement, pos);
                editor.setCursor(curserStart.line, curserStart.ch + item.shift);
            }
        }
        else if (['blockquote', 'bullet_list', 'number_list', 'check_list'].contains(item.des)) {
            var reString_1 = ('^\\s*' + item.symbol + '\\s*')
                .replace('[', '\\[')
                .replace(']', '\\]');
            if (isSelection) {
                var selectionLines = selection.split('\n');
                var notAllAreItems = selectionLines.map(function (lineOfSelection) {
                    var re = new RegExp(reString_1, 'g');
                    return re.test(lineOfSelection);
                });
                if (!notAllAreItems.contains(false)) {
                    var convertetSelectionLines = selectionLines.map(function (newLine) {
                        var re = new RegExp(reString_1, 'g');
                        return newLine.replace(re, '');
                    });
                    editor.replaceSelection(convertetSelectionLines.join('\n'));
                }
                else {
                    var convertetSelectionLines = selectionLines.map(function (newLine) {
                        var re = new RegExp(reString_1, 'g');
                        if (!re.test(newLine.trim())) {
                            return item.symbol + newLine.trim();
                        }
                        else {
                            return newLine;
                        }
                    });
                    editor.replaceSelection(convertetSelectionLines.join('\n'));
                }
            }
            else {
                var re = new RegExp(reString_1, 'gm');
                var match$1 = line.trim().match(re);
                var replacment = item.symbol + line.replace(re, '');
                if (match$1) {
                    replacment = line.replace(re, '');
                }
                editor.replaceRange(replacment, { line: curserStart.line, ch: 0 }, { line: curserStart.line, ch: line.length });
            }
        }
    }
}

var htmlFormatterSettings = {
    br: {
        des: '<br/>',
        symbol: '<br/>',
        shift: 5,
        selectionInput: 5,
        objectType: 'htmlFormatterSetting',
    },
    div: {
        des: '<div>',
        symbol: '<div></div>',
        shift: 5,
        selectionInput: 5,
        objectType: 'htmlFormatterSetting',
    },
    span: {
        des: '<span>',
        symbol: '<span></span>',
        shift: 6,
        selectionInput: 6,
        objectType: 'htmlFormatterSetting',
    },
    img: {
        des: '<img>',
        symbol: '<img src="" alt="" width="" height=""></img>',
        shift: 10,
        selectionInput: 38,
        objectType: 'htmlFormatterSetting',
    },
    a: {
        des: '<a>',
        symbol: '<a></a>',
        shift: 3,
        selectionInput: 3,
        objectType: 'htmlFormatterSetting',
    },
    p: {
        des: '<p>',
        symbol: '<p></p>',
        shift: 3,
        selectionInput: 3,
        objectType: 'htmlFormatterSetting',
    },
    font: {
        des: '<font>',
        symbol: '<span style="font-family:default; font-size:default; color:red"></span>',
        shift: 64,
        selectionInput: 64,
        objectType: 'htmlFormatterSetting',
    },
    table: {
        des: '<table>',
        symbol: '<table></table>',
        shift: 7,
        selectionInput: 7,
        objectType: 'htmlFormatterSetting',
    },
    thead: {
        des: '<thead>',
        symbol: '<thead></thead>',
        shift: 7,
        selectionInput: 7,
        objectType: 'htmlFormatterSetting',
    },
    tbody: {
        des: '<tbody>',
        symbol: '<tbody></tbody>',
        shift: 7,
        selectionInput: 7,
        objectType: 'htmlFormatterSetting',
    },
    tfoot: {
        des: '<tfoot>',
        symbol: '<tfoot></tfoot>',
        shift: 7,
        selectionInput: 7,
        objectType: 'htmlFormatterSetting',
    },
    tr: {
        des: '<tr>',
        symbol: '<tr></tr>',
        shift: 4,
        selectionInput: 4,
        objectType: 'htmlFormatterSetting',
    },
    td: {
        des: '<td>',
        symbol: '<td></td>',
        shift: 4,
        selectionInput: 4,
        objectType: 'htmlFormatterSetting',
    },
    th: {
        des: '<th>',
        symbol: '<th></th>',
        shift: 4,
        selectionInput: 4,
        objectType: 'htmlFormatterSetting',
    },
    details: {
        des: '<details>',
        symbol: '<details></details>',
        shift: 9,
        selectionInput: 9,
        objectType: 'htmlFormatterSetting',
    },
    summary: {
        des: '<summary>',
        symbol: '<summary></summary>',
        shift: 9,
        selectionInput: 9,
        objectType: 'htmlFormatterSetting',
    },
    u: {
        des: '<u>',
        symbol: '<u></u>',
        shift: 3,
        selectionInput: 3,
        objectType: 'htmlFormatterSetting',
    },
};
function htmlFormatter(editor, item) {
    if (editor) {
        var isSelection = editor.somethingSelected;
        var selection = editor.getSelection();
        var curserStart = editor.getCursor('from');
        editor.getCursor('to');
        editor.getLine(curserStart.line);
        editor.focus();
        if (isSelection) {
            var replacment = selection.trim();
            editor.replaceSelection(item.symbol.substring(0, item.selectionInput) +
                replacment +
                item.symbol.substring(item.selectionInput));
            editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
        else {
            editor.replaceRange(item.symbol, curserStart);
            editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
    }
}

var greekLowerCaseFormatterSettings = {
    alpha: {
        des: 'alpha',
        icon: 'alpha',
        symbol: '\\alpha',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    beta: {
        des: 'beta',
        icon: 'beta',
        symbol: '\\beta',
        shift: 5,
        objectType: 'greekFormatterSetting',
    },
    gamma: {
        des: 'gamma',
        icon: 'gamma',
        symbol: '\\gamma',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    delta: {
        des: 'delta',
        icon: 'delta',
        symbol: '\\delta',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    epsilon: {
        des: 'epsilon',
        icon: 'epsilon',
        symbol: '\\epsilon',
        shift: 8,
        objectType: 'greekFormatterSetting',
    },
    zeta: {
        des: 'zeta',
        icon: 'zeta',
        symbol: '\\zeta',
        shift: 5,
        objectType: 'greekFormatterSetting',
    },
    eta: {
        des: 'eta',
        icon: 'eta',
        symbol: '\\eta',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    theta: {
        des: 'theta',
        icon: 'theta',
        symbol: '\\theta',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    iota: {
        des: 'iota',
        icon: 'iota',
        symbol: '\\iota',
        shift: 5,
        objectType: 'greekFormatterSetting',
    },
    kappa: {
        des: 'kappa',
        icon: 'kappa',
        symbol: '\\kappa',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    lambda: {
        des: 'lambda',
        icon: 'lambda',
        symbol: '\\lambda',
        shift: 7,
        objectType: 'greekFormatterSetting',
    },
    mu: {
        des: 'mu',
        icon: 'my',
        symbol: '\\mu',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    nu: {
        des: 'nu',
        icon: 'ny',
        symbol: '\\nu',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    xi: {
        des: 'xi',
        icon: 'xi',
        symbol: '\\xi',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    pi: {
        des: 'pi',
        icon: 'pi',
        symbol: '\\pi',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    rho: {
        des: 'rho',
        icon: 'rho',
        symbol: '\\rho',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    sigma: {
        des: 'sigma',
        icon: 'sigma',
        symbol: '\\sigma',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    tau: {
        des: 'tau',
        icon: 'tau',
        symbol: '\\tau',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    upsilon: {
        des: 'upsilon',
        icon: 'ypsilon',
        symbol: '\\upsilon',
        shift: 8,
        objectType: 'greekFormatterSetting',
    },
    phi: {
        des: 'phi',
        icon: 'phi',
        symbol: '\\phi',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    chi: {
        des: 'chi',
        icon: 'chi',
        symbol: '\\chi',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    psi: {
        des: 'psi',
        icon: 'psi',
        symbol: '\\psi',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    omega: {
        des: 'omega',
        icon: 'omega',
        symbol: '\\omega',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
};
var greekUpperCaseFormatterSettings = {
    // Alpha: {
    //   des: 'Alpha',
    //   icon: 'Alpha',
    //   symbol: '\\Alpha',
    //   shift: 6,
    // objectType: 'greekFormatterSetting',},
    // Beta: {
    //   des: 'Beta',
    //   icon: 'Beta',
    //   symbol: '\\Beta',
    //   shift: 5,
    // objectType: 'greekFormatterSetting',},
    Gamma: {
        des: 'Gamma',
        icon: 'Gamma',
        symbol: '\\Gamma',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    Delta: {
        des: 'Delta',
        icon: 'Delta',
        symbol: '\\Delta',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    // Epsilon: {
    //   des: 'Epsilon',
    //   icon: 'Epsilon',
    //   symbol: '\\Epsilon',
    //   shift: 8,
    // objectType: 'greekFormatterSetting',},
    // Zeta: {
    //   des: 'Zeta',
    //   icon: 'Zeta',
    //   symbol: '\\Zeta',
    //   shift: 5,
    // objectType: 'greekFormatterSetting',},
    // Eta: {
    //   des: 'Eta',
    //   icon: 'Eta',
    //   symbol: '\\Eta',
    //   shift: 4,
    // objectType: 'greekFormatterSetting',},
    Theta: {
        des: 'Theta',
        icon: 'Theta',
        symbol: '\\Theta',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    // Iota: {
    //   des: 'Iota',
    //   icon: 'Iota',
    //   symbol: '\\Iota',
    //   shift: 5,
    // objectType: 'greekFormatterSetting',},
    // Kappa: {
    //   des: 'Kappa',
    //   icon: 'Kappa',
    //   symbol: '\\Kappa',
    //   shift: 6,
    // objectType: 'greekFormatterSetting',},
    Lambda: {
        des: 'Lambda',
        icon: 'Lambda',
        symbol: '\\Lambda',
        shift: 7,
        objectType: 'greekFormatterSetting',
    },
    // Mu: {
    //   des: 'Mu',
    //   icon: 'My',
    //   symbol: '\\Mu',
    //   shift: 3,
    // objectType: 'greekFormatterSetting',},
    // Nu: {
    //   des: 'Nu',
    //   icon: 'Ny',
    //   symbol: '\\Nu',
    //   shift: 3,
    // objectType: 'greekFormatterSetting',},
    Xi: {
        des: 'Xi',
        icon: 'Xi',
        symbol: '\\Xi',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    // Omikron: {
    //   des: 'Omikron',
    //   icon: 'Omikron',
    //   symbol: '\\Omikron',
    //   shift: 8,
    // objectType: 'greekFormatterSetting',},
    Pi: {
        des: 'Pi',
        icon: 'Pi',
        symbol: '\\Pi',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    // Rho: {
    //   des: 'Rho',
    //   icon: 'Rho',
    //   symbol: '\\Rho',
    //   shift: 4,
    // objectType: 'greekFormatterSetting',},
    Sigma: {
        des: 'Sigma',
        icon: 'Sigma',
        symbol: '\\Sigma',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    // Tau: {
    //   des: 'Tau',
    //   icon: 'Tau',
    //   symbol: '\\Tau',
    //   shift: 4,
    // objectType: 'greekFormatterSetting',},
    Upsilon: {
        des: 'Upsilon',
        icon: 'Ypsilon',
        symbol: '\\Upsilon',
        shift: 8,
        objectType: 'greekFormatterSetting',
    },
    Phi: {
        des: 'Phi',
        icon: 'Phi',
        symbol: '\\Phi',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    // Chi: {
    //   des: 'Chi',
    //   icon: 'Chi',
    //   symbol: '\\Chi',
    //   shift: 4,
    // objectType: 'greekFormatterSetting',},
    Psi: {
        des: 'Psi',
        icon: 'Psi',
        symbol: '\\Psi',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    Omega: {
        des: 'Omega',
        icon: 'Omega',
        symbol: '\\Omega',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
};
function greekFormatter(editor, item) {
    if (editor) {
        editor.somethingSelected;
        editor.getSelection();
        var curserStart = editor.getCursor('from');
        editor.getCursor('to');
        editor.getLine(curserStart.line);
        editor.focus();
        editor.replaceRange(item.symbol, curserStart);
        editor.setCursor(curserStart.line, curserStart.ch + item.shift);
    }
}

var latexFormatterSettings = {
    inlineEquation: {
        des: 'inline equation',
        text: '$$x$$',
        symbol: '$$$$',
        shift: 2,
        selectionInput: 2,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    equation: {
        des: 'equation',
        text: '$x$',
        symbol: '$$',
        shift: 1,
        selectionInput: 1,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    division: {
        des: 'frac',
        text: 'division',
        symbol: '\\frac{}{}',
        shift: 6,
        selectionInput: 6,
        type: 'icon',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    multiplication: {
        des: 'times',
        text: 'multiplication',
        symbol: '\\times',
        shift: 6,
        selectionInput: 6,
        type: 'icon',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    sup: {
        des: 'superscript',
        text: 'x<sup>y</sup>',
        symbol: '^{}',
        shift: 2,
        selectionInput: 2,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    div: {
        des: 'division',
        text: 'x<sup>-1</sup>',
        symbol: '^{-1}',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    sub: {
        des: 'subscript',
        text: 'x<sub>y</sub>',
        symbol: '_{}',
        shift: 2,
        selectionInput: 2,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    pi: {
        des: 'pi',
        text: 'pi',
        symbol: '\\pi',
        shift: 3,
        selectionInput: 3,
        type: 'icon',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    e: {
        des: 'e',
        text: 'e<sup>x</sup>',
        symbol: 'e^{}',
        shift: 3,
        selectionInput: 3,
        type: 'text',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    exp: {
        des: 'exp',
        text: 'exp',
        symbol: '\\exp()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    log: {
        des: 'log',
        text: 'log',
        symbol: '\\log()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    sin: {
        des: 'sin',
        text: 'sin',
        symbol: '\\sin()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    cos: {
        des: 'cos',
        text: 'cos',
        symbol: '\\cos()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    tan: {
        des: 'tan',
        text: 'tan',
        symbol: '\\tan()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    cot: {
        des: 'cot',
        text: 'cot',
        symbol: '\\cot()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    sin2: {
        des: 'cos^2',
        text: 'sin<sup>2</sup>',
        symbol: '\\sin^2()',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    cos2: {
        des: 'cos^2',
        text: 'cos<sup>2</sup>',
        symbol: '\\cos^2()',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    tan2: {
        des: 'tan^2',
        text: 'tan<sup>2</sup>',
        symbol: '\\tan^2()',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    cot2: {
        des: 'cot^2',
        text: 'cot<sup>2</sup>',
        symbol: '\\cot^2()',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    roundBrackets: {
        des: 'round brackets',
        text: '(x)',
        symbol: '\\left(\\right)',
        shift: 6,
        selectionInput: 6,
        type: 'text',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    squareBrackets: {
        des: 'square brackets',
        text: '[x]',
        symbol: '\\left[\\right]',
        shift: 6,
        selectionInput: 6,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    curlyBrackets: {
        des: 'curly brackets',
        text: '{x}',
        symbol: '\\left\\{\\right\\}',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    pipeBrackets: {
        des: 'pipe brackets',
        text: '|x|',
        symbol: '\\left|\\right|',
        shift: 6,
        selectionInput: 6,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    doublePipeBrackets: {
        des: 'double pipe brackets',
        text: '||x||',
        symbol: '\\left\\|\\right\\|',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
};
function latexFormatter(editor, item) {
    if (editor) {
        var isSelection = editor.somethingSelected;
        var selection = editor.getSelection();
        var curserStart = editor.getCursor('from');
        editor.getCursor('to');
        editor.getLine(curserStart.line);
        editor.focus();
        if (isSelection) {
            var replacment = selection.trim();
            editor.replaceSelection(item.symbol.substring(0, item.selectionInput) +
                replacment +
                item.symbol.substring(item.selectionInput));
            editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
        else {
            editor.replaceRange(item.symbol, curserStart);
            editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
    }
}

var calloutsFormatterSettings = {
    note: {
        des: 'note',
        text: 'Note',
        icon: 'lucide-pencil',
        color: 'rgb(68,138,255)',
        bgColor: 'rgba(68,138,255,0.1)',
        symbol: '> [!note] \n>  ',
        shift: 13,
        selectionInput: 13,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    info: {
        des: 'info',
        text: 'Info',
        icon: 'lucide-info',
        color: 'rgb(0,184,212)',
        bgColor: 'rgba(0,184,212,0.1)',
        symbol: '> [!info] \n>  ',
        shift: 13,
        selectionInput: 13,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    todo: {
        des: 'todo',
        text: 'Todo',
        icon: 'lucide-check-circle-2',
        color: 'rgb(0,184,212)',
        bgColor: 'rgba(0,184,212,0.1)',
        symbol: '> [!todo] \n>  ',
        shift: 13,
        selectionInput: 13,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    abstract: {
        des: 'abstract',
        text: 'Abstract',
        icon: 'lucide-clipboard-list',
        color: 'rgb(0, 176, 255)',
        bgColor: 'rgba(0, 176, 255,0.1)',
        symbol: '> [!abstract] \n>  ',
        shift: 17,
        selectionInput: 17,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    summary: {
        des: 'summary',
        text: 'Summary',
        icon: 'lucide-clipboard-list',
        color: 'rgb(0, 176, 255)',
        bgColor: 'rgba(0, 176, 255,0.1)',
        symbol: '> [!summary] \n>  ',
        shift: 16,
        selectionInput: 16,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    tldr: {
        des: 'tldr',
        text: 'TLDR',
        icon: 'lucide-clipboard-list',
        color: 'rgb(0, 176, 255)',
        bgColor: 'rgba(0, 176, 255,0.1)',
        symbol: '> [!tldr] \n>  ',
        shift: 13,
        selectionInput: 13,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    //step 2
    tip: {
        des: 'tip',
        text: 'Tip',
        icon: 'lucide-flame',
        color: 'rgb(0, 191, 165)',
        bgColor: 'rgba(0, 191, 165,0.1)',
        symbol: '> [!tip] \n>  ',
        shift: 12,
        selectionInput: 12,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    hint: {
        des: 'hint',
        text: 'Hint',
        icon: 'lucide-flame',
        color: 'rgb(0, 191, 165)',
        bgColor: 'rgba(0, 191, 165,0.1)',
        symbol: '> [!hint] \n>  ',
        shift: 13,
        selectionInput: 13,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    important: {
        des: 'important',
        text: 'Important',
        icon: 'lucide-flame',
        color: 'rgb(0, 191, 165)',
        bgColor: 'rgba(0, 191, 165,0.1)',
        symbol: '> [!important] \n>  ',
        shift: 18,
        selectionInput: 18,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    success: {
        des: 'success',
        text: 'Success',
        icon: 'lucide-check',
        color: 'rgb(0, 200, 83)',
        bgColor: 'rgba(0, 200, 83,0.1)',
        symbol: '> [!success] \n>  ',
        shift: 16,
        selectionInput: 16,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    check: {
        des: 'check',
        text: 'Check',
        icon: 'lucide-check',
        color: 'rgb(0, 200, 83)',
        bgColor: 'rgba(0, 200, 83,0.1)',
        symbol: '> [!check] \n>  ',
        shift: 14,
        selectionInput: 14,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    done: {
        des: 'done',
        text: 'Done',
        icon: 'lucide-check',
        color: 'rgb(0, 200, 83)',
        bgColor: 'rgba(0, 200, 83,0.1)',
        symbol: '> [!done] \n>  ',
        shift: 13,
        selectionInput: 13,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    question: {
        des: 'question',
        text: 'Question',
        icon: 'help-circle',
        color: 'rgb(100, 221, 23)',
        bgColor: 'rgba(100, 221, 23,0.1)',
        symbol: '> [!question] \n>  ',
        shift: 17,
        selectionInput: 17,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    help: {
        des: 'help',
        text: 'Help',
        icon: 'help-circle',
        color: 'rgb(100, 221, 23)',
        bgColor: 'rgba(100, 221, 23,0.1)',
        symbol: '> [!help] \n>  ',
        shift: 13,
        selectionInput: 13,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    faq: {
        des: 'faq',
        text: 'FAQ',
        icon: 'help-circle',
        color: 'rgb(100, 221, 23)',
        bgColor: 'rgba(100, 221, 23,0.1)',
        symbol: '> [!faq] \n>  ',
        shift: 12,
        selectionInput: 12,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    warning: {
        des: 'warning',
        text: 'Warning',
        icon: 'lucide-alert-triangle',
        color: 'rgb(255, 145, 0)',
        bgColor: 'rgba(255, 145, 0,0.1)',
        symbol: '> [!warning] \n>  ',
        shift: 16,
        selectionInput: 16,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    caution: {
        des: 'caution',
        text: 'Caution',
        icon: 'lucide-alert-triangle',
        color: 'rgb(255, 145, 0)',
        bgColor: 'rgba(255, 145, 0,0.1)',
        symbol: '> [!caution] \n>  ',
        shift: 16,
        selectionInput: 16,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    attention: {
        des: 'attention',
        text: 'Attention',
        icon: 'lucide-alert-triangle',
        color: 'rgb(255, 145, 0)',
        bgColor: 'rgba(255, 145, 0,0.1)',
        symbol: '> [!attention] \n>  ',
        shift: 18,
        selectionInput: 18,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    failure: {
        des: 'failure',
        text: 'Failure',
        icon: 'lucide-x',
        color: 'rgb(255, 82, 82)',
        bgColor: 'rgba(255, 82, 82,0.1)',
        symbol: '> [!failure] \n>  ',
        shift: 16,
        selectionInput: 16,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    fail: {
        des: 'fail',
        text: 'Fail',
        icon: 'lucide-x',
        color: 'rgb(255, 82, 82)',
        bgColor: 'rgba(255, 82, 82,0.1)',
        symbol: '> [!fail] \n>  ',
        shift: 13,
        selectionInput: 13,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    missing: {
        des: 'missing',
        text: 'Missing',
        icon: 'lucide-x',
        color: 'rgb(255, 82, 82)',
        bgColor: 'rgba(255, 82, 82,0.1)',
        symbol: '> [!missing] \n>  ',
        shift: 16,
        selectionInput: 16,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    danger: {
        des: 'danger',
        text: 'Danger',
        icon: 'lucide-zap',
        color: 'rgb(255, 23, 68)',
        bgColor: 'rgba(255, 23, 68,0.1)',
        symbol: '> [!danger] \n>  ',
        shift: 15,
        selectionInput: 15,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    error: {
        des: 'error',
        text: 'Error',
        icon: 'lucide-zap',
        color: 'rgb(255, 23, 68)',
        bgColor: 'rgba(255, 23, 68,0.1)',
        symbol: '> [!error] \n>  ',
        shift: 14,
        selectionInput: 14,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    bug: {
        des: 'bug',
        text: 'Bug',
        icon: 'lucide-bug',
        color: 'rgb(245, 0, 87)',
        bgColor: 'rgba(245, 0, 87,0.1)',
        symbol: '> [!bug] \n>  ',
        shift: 12,
        selectionInput: 12,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    example: {
        des: 'example',
        text: 'Example',
        icon: 'lucide-list',
        color: 'rgb(124, 77, 255)',
        bgColor: 'rgba(124, 77, 255,0.1)',
        symbol: '> [!example] \n>  ',
        shift: 16,
        selectionInput: 16,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    quote: {
        des: 'quote',
        text: 'Quote',
        icon: 'quote-glyph',
        color: 'rgb(158, 158, 158)',
        bgColor: 'rgba(158, 158, 158,0.1)',
        symbol: '> [!quote] \n>  ',
        shift: 14,
        selectionInput: 14,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    glyph: {
        des: 'glyph',
        text: 'Glyph',
        icon: 'quote-glyph',
        color: 'rgb(158, 158, 158)',
        bgColor: 'rgba(158, 158, 158,0.1)',
        symbol: '> [!glyph] \n>  ',
        shift: 14,
        selectionInput: 14,
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
};
function calloutsFormatter(editor, item) {
    if (editor) {
        var isSelection = editor.somethingSelected;
        var selection = editor.getSelection();
        var curserStart = editor.getCursor('from');
        editor.getCursor('to');
        editor.getLine(curserStart.line);
        editor.focus();
        if (isSelection) {
            var replacment = selection.trim();
            editor.replaceSelection(item.symbol.substring(0, item.selectionInput) +
                replacment +
                item.symbol.substring(item.selectionInput));
            editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
        else {
            editor.replaceRange(item.symbol, curserStart);
            editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
    }
}

function checkIfSelection(editor) {
    var selection = editor.getSelection();
    if (!selection || selection === '') {
        return false;
    }
    else {
        return true;
    }
}
function checkIfMarkdownSource(leaf) {
    return (
    // @ts-ignore
    leaf.view instanceof obsidian.MarkdownView && leaf.view.currentMode.type === 'source');
}

function colorFormatter(editor, color) {
    if (editor) {
        var isSelection = checkIfSelection(editor);
        var selection = editor.getSelection();
        var curserStart = editor.getCursor('from');
        editor.getCursor('to');
        editor.getLine(curserStart.line);
        editor.focus();
        if (isSelection) {
            selection.trim();
            editor.replaceSelection(color);
            editor.setCursor(curserStart);
        }
        else {
            editor.replaceRange(color, curserStart);
            editor.setCursor(curserStart);
        }
    }
}

var SidePanelControlViewType = 'side-panel-control-view';
var SidePanelControlView = /** @class */ (function (_super) {
    __extends(SidePanelControlView, _super);
    function SidePanelControlView(leaf, plugin) {
        var _this = _super.call(this, leaf) || this;
        _this.plugin = plugin;
        return _this;
    }
    SidePanelControlView.prototype.getViewType = function () {
        return SidePanelControlViewType;
    };
    SidePanelControlView.prototype.getDisplayText = function () {
        return 'Markdown-Autocomplete';
    };
    SidePanelControlView.prototype.getIcon = function () {
        return 'viewIcon';
    };
    SidePanelControlView.prototype.load = function () {
        _super.prototype.load.call(this);
        this.draw();
    };
    SidePanelControlView.prototype.draw = function () {
        var container = this.containerEl.children[1];
        var rootEl = document.createElement('div');
        rootEl.id = 'SidePaneRootElement';
        this.drawContentOfRootElement(rootEl);
        container.empty();
        container.appendChild(rootEl);
    };
    SidePanelControlView.prototype.drawContentOfRootElement = function (rootEl) {
        var _this = this;
        if (rootEl === void 0) { rootEl = null; }
        if (!rootEl)
            rootEl = document.getElementById('SidePaneRootElement');
        rootEl.textContent = '';
        var getRegion = function (name) {
            return _this.plugin.settings.regionSettings.find(function (item) { return item.name === name; });
        };
        var mainDiv = rootEl.createDiv({ cls: 'nav-header' });
        mainDiv.style.maxWidth = '300px';
        mainDiv.style.minWidth = '300px';
        // --------------
        // Text Edit Section
        // --------------
        var addTextEditSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'textEdit', 'Text Edit');
            _this.addTextEditButtons(content);
        };
        // --------------
        // Table Section
        // --------------
        var addTabelsSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'tables', 'Tables');
            var info = content.createEl('p');
            info.appendText('upcoming ...');
            info.style.textAlign = 'center';
        };
        // --------------
        // HTML Section
        // --------------
        var addHtmlSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'html', 'HTML');
            _this.addHtmlButtons(content);
            var info = content.createEl('p');
            info.style.textAlign = 'center';
            info.style.marginTop = '10px';
            info.style.marginBottom = '10px';
            var link = info.createEl('a');
            link.appendText('Do you miss a Tag? report it!');
            link.style.textAlign = 'center';
            link.style.fontSize = '10px';
            link.href =
                'https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/issues';
        };
        // --------------
        // Latex Section
        // --------------
        var addLatexSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'latex', 'Latex');
            _this.addLatexButtons(content);
            var info = content.createEl('p');
            info.style.textAlign = 'center';
            info.style.marginTop = '10px';
            info.style.marginBottom = '10px';
            var link = info.createEl('a');
            link.appendText('Introduction into latex mathematics');
            link.style.textAlign = 'center';
            link.style.fontSize = '10px';
            link.href = 'https://en.wikibooks.org/wiki/LaTeX/Mathematics';
            info = content.createEl('p');
            info.style.textAlign = 'center';
            info.style.marginTop = '10px';
            info.style.marginBottom = '10px';
            link = info.createEl('a');
            link.appendText('Do you miss a latex function? report it!');
            link.style.textAlign = 'center';
            link.style.fontSize = '10px';
            link.href =
                'https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/issues';
        };
        // --------------
        // Greek Section
        // --------------
        var addGreekLettersSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'greekLetters', 'Greek Letters');
            var header = content.createEl('h5');
            header.appendText('Lower Case');
            header.style.textAlign = 'center';
            header.style.marginTop = '0px';
            header.style.marginBottom = '5px';
            _this.addGreekLowerCaseLetters(content);
            header = content.createEl('h5');
            header.appendText('Upper Case');
            header.style.textAlign = 'center';
            header.style.marginTop = '10px';
            header.style.marginBottom = '5px';
            _this.addGreekUpperCaseLetters(content);
            var info = content.createEl('p');
            info.style.textAlign = 'center';
            info.style.marginTop = '10px';
            info.style.marginBottom = '10px';
            var link = info.createEl('a');
            link.appendText('Overview of greek letters');
            link.style.textAlign = 'center';
            link.style.fontSize = '10px';
            link.href = 'https://en.wikipedia.org/wiki/Greek_alphabet';
        };
        // --------------
        // Colors
        // --------------
        var addColorsSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'colors', 'Colors');
            _this.addColorBody(content);
        };
        // --------------
        // Callouts
        // --------------
        var addCalloutsSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'callouts', 'Callouts');
            _this.addCalloutsButtons(content);
        };
        var regions = {
            textEdit: addTextEditSection,
            tables: addTabelsSection,
            html: addHtmlSection,
            latex: addLatexSection,
            greekLetters: addGreekLettersSection,
            colors: addColorsSection,
            callouts: addCalloutsSection,
        };
        this.plugin.settings.regionSettings.map(function (item) {
            // @ts-ignore
            var regionFunction = regions[item.name];
            if (regionFunction && getRegion(item.name).active)
                regionFunction();
        });
    };
    SidePanelControlView.prototype.addHtmlButtons = function (mainDiv) {
        var _this = this;
        var addClickEvent = function (btn, type) {
            btn.onClickEvent(function () {
                // @ts-ignore
                var formatterSetting = htmlFormatterSettings[type];
                var leaf = _this.app.workspace.getMostRecentLeaf();
                var editor = null;
                if (checkIfMarkdownSource(leaf)) {
                    // @ts-ignore
                    editor = leaf.view.sourceMode.cmEditor;
                    htmlFormatter(editor, formatterSetting);
                }
            });
        };
        var numberOfCols = 3;
        var row = null;
        sortBy(identity, keys(htmlFormatterSettings)).forEach(function (key, index) {
            // @ts-ignore
            var item = htmlFormatterSettings[key];
            if (index % numberOfCols === 0) {
                row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            }
            var button = row.createDiv({ cls: 'nav-action-text-button' });
            addClickEvent(button, key);
            button.appendText(item.des);
        });
    };
    //xxxxx
    SidePanelControlView.prototype.addCalloutsButtons = function (mainDiv) {
        var _this = this;
        var addClickEvent = function (btn, type) {
            btn.onClickEvent(function () {
                // @ts-ignore
                var formatterSetting = calloutsFormatterSettings[type];
                var leaf = _this.app.workspace.getMostRecentLeaf();
                var editor = null;
                if (checkIfMarkdownSource(leaf)) {
                    // @ts-ignore
                    editor = leaf.view.sourceMode.cmEditor;
                    calloutsFormatter(editor, formatterSetting);
                }
            });
        };
        var row = null;
        keys(calloutsFormatterSettings).forEach(function (key, index) {
            // @ts-ignore
            var item = calloutsFormatterSettings[key];
            if (index === 0 || item.newLine) {
                row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            }
            var button = row.createDiv({ cls: 'nav-action-text-button' });
            // @ts-ignore
            button.style.textJustify = 'center';
            button.style.textAlign = 'center';
            button.style.backgroundColor = item.bgColor;
            addClickEvent(button, key);
            var spanText = document.createElement('span');
            spanText.innerHTML = ' ' + item.text;
            var spanIcon = document.createElement('span');
            obsidian.setIcon(spanIcon, item.icon);
            spanIcon.style.verticalAlign = 'middle';
            spanIcon.style.color = item.color;
            button.appendChild(spanIcon);
            button.appendChild(spanText);
        });
    };
    SidePanelControlView.prototype.addLatexButtons = function (mainDiv) {
        var _this = this;
        var addClickEvent = function (btn, type) {
            btn.onClickEvent(function () {
                // @ts-ignore
                var formatterSetting = latexFormatterSettings[type];
                var leaf = _this.app.workspace.getMostRecentLeaf();
                var editor = null;
                if (checkIfMarkdownSource(leaf)) {
                    // @ts-ignore
                    editor = leaf.view.sourceMode.cmEditor;
                    latexFormatter(editor, formatterSetting);
                }
            });
        };
        var row = null;
        keys(latexFormatterSettings).forEach(function (key, index) {
            // @ts-ignore
            var item = latexFormatterSettings[key];
            if (index === 0 || item.newLine) {
                row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            }
            var button = row.createDiv({ cls: 'nav-action-text-button' });
            // @ts-ignore
            button.style.textJustify = 'center';
            button.style.textAlign = 'center';
            addClickEvent(button, key);
            if (item.type === 'icon') {
                var svg = svgToElement(item.text);
                svg.style.display = 'inline-block';
                svg.style.verticalAlign = 'middle';
                button.appendChild(svg);
            }
            else if (item.type === 'text') {
                var div = document.createElement('div');
                div.innerHTML = item.text;
                button.appendChild(div);
            }
        });
    };
    SidePanelControlView.prototype.addGreekLowerCaseLetters = function (mainDiv) {
        var _this = this;
        var addClickEvent = function (btn, type) {
            btn.onClickEvent(function () {
                // @ts-ignore
                var formatterSetting = greekLowerCaseFormatterSettings[type];
                var leaf = _this.app.workspace.getMostRecentLeaf();
                var editor = null;
                if (checkIfMarkdownSource(leaf)) {
                    // @ts-ignore
                    editor = leaf.view.sourceMode.cmEditor;
                    greekFormatter(editor, formatterSetting);
                }
            });
        };
        var numberOfCols = 5;
        var row = null;
        keys(greekLowerCaseFormatterSettings).forEach(function (key, index) {
            // @ts-ignore
            var item = greekLowerCaseFormatterSettings[key];
            if (index % numberOfCols === 0) {
                row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            }
            var button = row.createDiv({ cls: 'nav-action-button' });
            addClickEvent(button, key);
            button.appendChild(svgToElement(item.icon));
        });
    };
    SidePanelControlView.prototype.addGreekUpperCaseLetters = function (mainDiv) {
        var _this = this;
        var addClickEvent = function (btn, type) {
            btn.onClickEvent(function () {
                // @ts-ignore
                var formatterSetting = greekUpperCaseFormatterSettings[type];
                var leaf = _this.app.workspace.getMostRecentLeaf();
                var editor = null;
                if (checkIfMarkdownSource(leaf)) {
                    // @ts-ignore
                    editor = leaf.view.sourceMode.cmEditor;
                    greekFormatter(editor, formatterSetting);
                }
            });
        };
        var numberOfCols = 5;
        var row = null;
        keys(greekUpperCaseFormatterSettings).forEach(function (key, index) {
            // @ts-ignore
            var item = greekUpperCaseFormatterSettings[key];
            if (index % numberOfCols === 0) {
                row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            }
            var button = row.createDiv({ cls: 'nav-action-button' });
            addClickEvent(button, key);
            button.appendChild(svgToElement(item.icon));
        });
    };
    SidePanelControlView.prototype.addTextEditButtons = function (mainDiv) {
        var _this = this;
        var addClickEvent = function (btn, type) {
            btn.onClickEvent(function () {
                console.log('Clicked Button', btn, type);
                // @ts-ignore
                var formatterSetting = formatSettings[type];
                var leaf = _this.app.workspace.getMostRecentLeaf();
                var editor = null;
                if (checkIfMarkdownSource(leaf)) {
                    // @ts-ignore
                    editor = leaf.view.sourceMode.cmEditor;
                    iconFormatter(editor, formatterSetting);
                }
            });
        };
        var row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
        for (var _i = 0, _a = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']; _i < _a.length; _i++) {
            var icon = _a[_i];
            var button_1 = row.createDiv({ cls: 'nav-action-button' });
            addClickEvent(button_1, icon);
            button_1.appendChild(svgToElement(icon));
        }
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
        var button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'bold');
        button.appendChild(svgToElement('bold'));
        button.id = 'obsidianMarkdownFormattingAssistantPluginButtonBold';
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'italic');
        button.appendChild(svgToElement('italic'));
        button.id = 'obsidianMarkdownFormattingAssistantPluginButtonItalic';
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'strikethrough');
        button.appendChild(svgToElement('strikethrough'));
        button.id = 'obsidianMarkdownFormattingAssistantPluginButtonStrikethrough';
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'underline');
        button.appendChild(svgToElement('underline'));
        button.id = 'obsidianMarkdownFormattingAssistantPluginButtonUnderline';
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'highlight');
        button.appendChild(svgToElement('highlight'));
        button.id = 'obsidianMarkdownFormattingAssistantPluginButtonHighlight';
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'codeInline');
        button.appendChild(svgToElement('codeInline'));
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'codeBlock');
        button.appendChild(svgToElement('codeBlock'));
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'mermaidBlock');
        button.appendChild(svgToElement('mermaidBlock'));
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'link');
        button.appendChild(svgToElement('link'));
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'internalLink');
        button.appendChild(svgToElement('fileLink'));
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'blockquote');
        button.appendChild(svgToElement('quote'));
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'image');
        button.appendChild(svgToElement('image'));
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'bulletList');
        button.appendChild(svgToElement('bulletList'));
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'numberList');
        button.appendChild(svgToElement('numberList'));
        button = row.createDiv({ cls: 'nav-action-button' });
        addClickEvent(button, 'checkList');
        button.appendChild(svgToElement('checkList'));
    };
    SidePanelControlView.prototype.addColorBody = function (mainDiv) {
        var _this = this;
        var insertColor = function (color) {
            var leaf = _this.app.workspace.getMostRecentLeaf();
            var editor = null;
            if (checkIfMarkdownSource(leaf)) {
                var addColor = 
                // @ts-ignore
                document.getElementById('inputColorTagCheckBox').checked;
                var addBackgroundColor = 
                // @ts-ignore
                document.getElementById('inputBackgroundColorTagCheckBox').checked;
                var addStyle = 
                // @ts-ignore
                document.getElementById('inputStyleTagCheckBox').checked;
                var res = color;
                if (addColor)
                    res = "color: ".concat(color);
                if (addBackgroundColor)
                    res = "background-color: ".concat(color);
                if (addColor && addBackgroundColor)
                    res = "color: ".concat(color, "; background-color: ").concat(color);
                if (addStyle)
                    res = "style=\"".concat(res, "\"");
                // @ts-ignore
                editor = leaf.view.sourceMode.cmEditor;
                colorFormatter(editor, res);
                editor.focus();
            }
        };
        var drawLastSelectedColorIcons = function (container) {
            if (container === void 0) { container = null; }
            if (!container)
                container = document.getElementById('lastSelectedColorsDiv');
            container.textContent = '';
            var table = container.createEl('table');
            var tbody = table.createEl('tbody');
            var row;
            reverse(SidePanelControlView.lastColors).forEach(function (color, index) {
                if (index % 10 === 0)
                    row = tbody.createEl('tr');
                var colorBox = row.createEl('td');
                colorBox.classList.add('color-icon');
                colorBox.style.backgroundColor = color;
                colorBox.onClickEvent(function (ev) {
                    if (ev.type === 'click') {
                        insertColor(color);
                    }
                    else {
                        SidePanelControlView.lastColors = without([color], SidePanelControlView.lastColors);
                        drawLastSelectedColorIcons();
                    }
                });
            });
        };
        var drawLastSavedColorIcons = function (container) {
            if (container === void 0) { container = null; }
            if (!container)
                container = document.getElementById('lastSavedColorsDiv');
            container.textContent = '';
            var table = container.createEl('table');
            var tbody = table.createEl('tbody');
            var row;
            reverse(_this.plugin.settings.savedColors).forEach(function (color, index) {
                if (index % 10 === 0)
                    row = tbody.createEl('tr');
                var colorBox = row.createEl('td');
                colorBox.id = 'lastSavedColorsDiv' + color;
                colorBox.classList.add('color-icon');
                colorBox.style.backgroundColor = color;
                colorBox.draggable = true;
                colorBox.onClickEvent(function (ev) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(ev.type === 'click')) return [3 /*break*/, 1];
                                insertColor(color);
                                return [3 /*break*/, 3];
                            case 1:
                                this.plugin.settings.savedColors = without([color], this.plugin.settings.savedColors);
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 2:
                                _a.sent();
                                drawLastSavedColorIcons();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                colorBox.ondragstart = function (event) {
                    // @ts-ignore
                    _this.dragStartColor = event.target.id.replace('lastSavedColorsDiv', '');
                };
                colorBox.ondrop = function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var id, startColor, endColor, startIndex, endIndex;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(event && event.target)) return [3 /*break*/, 2];
                                id = event.target.id;
                                if (!(id.indexOf('lastSavedColorsDiv') === 0)) return [3 /*break*/, 2];
                                startColor = this.dragStartColor;
                                endColor = id.replace('lastSavedColorsDiv', '');
                                startIndex = indexOf(startColor, this.plugin.settings.savedColors);
                                endIndex = indexOf(endColor, this.plugin.settings.savedColors);
                                this.plugin.settings.savedColors[startIndex] = endColor;
                                this.plugin.settings.savedColors[endIndex] = startColor;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                drawLastSavedColorIcons();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); };
                colorBox.ondragover = function (event) {
                    event.preventDefault();
                };
            });
        };
        var colorSection = mainDiv.createDiv();
        var colorSelector = colorSection.createDiv();
        colorSelector.style.backgroundColor = last(SidePanelControlView.lastColors);
        colorSelector.style.height = '16px';
        colorSelector.style.borderRadius = '8px';
        colorSelector.style.padding = '5px';
        colorSelector.style.margin = '4px';
        colorSelector.style.marginBottom = '10px';
        var colorInput = colorSelector.createEl('input');
        colorInput.id = 'colorInput';
        colorInput.type = 'color';
        colorInput.value = last(SidePanelControlView.lastColors);
        colorInput.style.visibility = 'hidden';
        colorInput.style.padding = '0';
        colorInput.style.margin = '0';
        // colorInput.style.display = 'block';
        // colorInput.style.opacity = '0';
        colorInput.addEventListener('input', function (ev) {
            // @ts-ignore
            var color = ev.target.value;
            colorSelector.style.backgroundColor = color;
        });
        colorInput.addEventListener('change', function (ev) {
            // @ts-ignore
            var color = ev.target.value;
            // @ts-ignore
            SidePanelControlView.lastColors = pipe(without([color]), append(color), takeLast(10))(SidePanelControlView.lastColors);
            drawLastSelectedColorIcons();
            insertColor(color);
            colorSelector.style.backgroundColor = color;
            navigator.clipboard.writeText(color).then(function () {
                // @ts-ignore
                new obsidian.Notice('Copied ' + color + ' to clipboard');
            }, function () {
                new obsidian.Notice('Could not copy the color to clipboard');
            });
        }, false);
        var colorButton = colorSection.createEl('label');
        colorButton.classList.add('nav-action-text-button');
        colorButton.appendText('Select a Color');
        colorButton.style.display = 'block';
        colorButton.htmlFor = 'colorInput';
        var colorSaveButton = colorSection.createEl('div');
        colorSaveButton.classList.add('nav-action-text-button');
        colorSaveButton.appendText('Save Color');
        colorSaveButton.style.display = 'block';
        colorSaveButton.onClickEvent(function (ev) { return __awaiter(_this, void 0, void 0, function () {
            var color;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        color = last(SidePanelControlView.lastColors);
                        this.plugin.settings.savedColors = pipe(without([color]), append(color))(this.plugin.settings.savedColors);
                        drawLastSavedColorIcons();
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        colorSaveButton.style.marginBottom = '20px';
        var addCheckbox = function (id, text) {
            var div = colorSection.createEl('div');
            var input = div.createEl('input');
            input.id = id;
            input.type = 'checkbox';
            input.name = id;
            var label = div.createEl('label');
            label.appendText(text);
            label.style.fontSize = '12px';
        };
        addCheckbox('inputColorTagCheckBox', ' Add "color: {your color}"');
        addCheckbox('inputBackgroundColorTagCheckBox', ' Add "background-color: {your color}"');
        addCheckbox('inputStyleTagCheckBox', ' Add tag: "style={your color}"');
        var lastSelectedColorsTitle = colorSection.createEl('p');
        lastSelectedColorsTitle.appendText('Last used colors:');
        lastSelectedColorsTitle.style.marginBottom = '0px';
        var lastSelectedColors = colorSection.createEl('div');
        lastSelectedColors.id = 'lastSelectedColorsDiv';
        lastSelectedColors.style.display = 'flex';
        drawLastSelectedColorIcons(lastSelectedColors);
        var lastSavedColorsTitle = colorSection.createEl('p');
        lastSavedColorsTitle.appendText('Saved Colors:');
        lastSavedColorsTitle.style.marginBottom = '0px';
        var settingsInfo = colorSection.createEl('p');
        settingsInfo.appendText('Saved colors can be directly edited in the settings.');
        settingsInfo.style.textAlign = 'left';
        settingsInfo.style.fontSize = '10px';
        settingsInfo.style.marginTop = '0px';
        var lastSavedColors = colorSection.createEl('div');
        lastSavedColors.id = 'lastSavedColorsDiv';
        lastSavedColors.style.display = 'flex';
        drawLastSavedColorIcons(lastSavedColors);
        var info = colorSection.createEl('p');
        info.style.textAlign = 'center';
        info.style.marginTop = '10px';
        info.style.marginBottom = '10px';
        var link = info.createEl('a');
        link.appendText('Do you need some Help?');
        link.style.textAlign = 'center';
        link.style.fontSize = '10px';
        link.href =
            'https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin#color-picker';
    };
    SidePanelControlView.prototype.addSelectableHeader = function (mainDiv, regionName, sectionTitle) {
        var _this = this;
        var getRegion = function (name) {
            return _this.plugin.settings.regionSettings.find(function (item) { return item.name === name; });
        };
        var header = mainDiv.createEl('div');
        header.id = 'lastSavedHeaderDiv' + regionName;
        var hr = mainDiv.createEl('hr');
        var title = header.createEl('h4');
        var arrowButton = header.createDiv({ cls: 'nav-action-button' });
        var content = mainDiv.createEl('div');
        header.style.width = '100%';
        // header.style.border = '2px solid white';
        header.style.display = 'flex';
        header.style.flexWrap = 'nowrap';
        header.style.alignContent = 'center';
        header.style.position = 'relative';
        header.style.cursor = 'move';
        header.draggable = true;
        header.ondragstart = function (event) {
            // @ts-ignore
            var sectionId = event.target.id.replace('lastSavedHeaderDiv', '');
            event.dataTransfer.setData('sectionHeaderMoveId', sectionId);
        };
        var onDrop = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var getId, start, end, startIndex, endIndex, startRegion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getId = pipe(find(pipe(prop('id'), undefined('lastSavedHeaderDiv'))), prop('id'), replace('lastSavedHeaderDiv', ''));
                        start = event.dataTransfer.getData('sectionHeaderMoveId');
                        end = getId(event.path);
                        if (!(end &&
                            this.plugin.settings.aviabileRegions.contains(end) &&
                            start !== end)) return [3 /*break*/, 2];
                        startIndex = findIndex(propEq('name', start), this.plugin.settings.regionSettings);
                        endIndex = findIndex(propEq('name', end), this.plugin.settings.regionSettings);
                        startRegion = this.plugin.settings.regionSettings[startIndex];
                        this.plugin.settings.regionSettings[startIndex] =
                            this.plugin.settings.regionSettings[endIndex];
                        this.plugin.settings.regionSettings[endIndex] = startRegion;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        this.drawContentOfRootElement();
                        _a.label = 2;
                    case 2:
                        event.preventDefault();
                        return [2 /*return*/];
                }
            });
        }); };
        header.ondragover = function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                event.preventDefault();
                return [2 /*return*/];
            });
        }); };
        header.ondrop = onDrop;
        title.appendText(sectionTitle);
        title.style.flexDirection = 'column';
        title.style.textAlign = 'left';
        title.style.margin = '0px';
        title.style.display = 'flex';
        title.style.flexWrap = 'nowrap';
        title.style.justifyContent = 'center';
        arrowButton.appendChild(svgToElement('expandArrowDown'));
        arrowButton.style.position = 'absolute';
        arrowButton.style.right = '0px';
        arrowButton.style.top = '0px';
        arrowButton.style.bottom = '0px';
        arrowButton.style.marginTop = 'auto';
        arrowButton.style.marginBottom = 'auto';
        arrowButton.style.width = '24px';
        arrowButton.style.height = '24px';
        var region = getRegion(regionName);
        if (region && region.active && region.visible) {
            content.style.display = 'block';
        }
        else {
            content.style.display = 'none';
        }
        arrowButton.onClickEvent(function (e) { return __awaiter(_this, void 0, void 0, function () {
            var region;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        region = getRegion(regionName);
                        if (!(region && region.active)) return [3 /*break*/, 2];
                        if (!region.visible) {
                            content.style.display = 'block';
                            arrowButton.innerHTML = null;
                            arrowButton.appendChild(svgToElement('expandArrowUp'));
                            region.visible = true;
                        }
                        else {
                            content.style.display = 'none';
                            arrowButton.innerHTML = null;
                            arrowButton.appendChild(svgToElement('expandArrowDown'));
                            region.visible = false;
                        }
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        hr.style.marginTop = '0px';
        hr.style.marginBottom = '10px';
        return content;
    };
    SidePanelControlView.lastColors = ['#ff0000'];
    return SidePanelControlView;
}(obsidian.ItemView));

var suggestions$1 = values(formatSettings).concat(
// @ts-ignore
values(htmlFormatterSettings), values(latexFormatterSettings), values(greekLowerCaseFormatterSettings), values(greekUpperCaseFormatterSettings));
var CodeSuggestionModal = /** @class */ (function (_super) {
    __extends(CodeSuggestionModal, _super);
    function CodeSuggestionModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setEditor = function (editor) {
            _this.editor = editor;
        };
        return _this;
    }
    // Returns all available suggestions.
    CodeSuggestionModal.prototype.getSuggestions = function (query) {
        var filterFunction = function (setting) {
            return setting.des.toLowerCase().includes(query.toLowerCase());
        };
        // @ts-ignore
        return values(filter(filterFunction, suggestions$1));
    };
    // Renders each suggestion item.
    CodeSuggestionModal.prototype.renderSuggestion = function (baseFormatterSetting, el) {
        var row = el.createEl('div');
        row.classList.add('command-list-view-row');
        var iconContainer = row.createDiv();
        iconContainer.classList.add('command-list-view-container');
        var iconDiv = iconContainer.createDiv();
        iconDiv.classList.add('command-list-view-icon');
        var cell2 = row.createDiv();
        cell2.classList.add('command-list-view-text');
        cell2.setText(baseFormatterSetting.des);
        console.log(baseFormatterSetting.objectType);
        if (baseFormatterSetting.objectType === 'formatterSetting') {
            iconDiv.appendChild(svgToElement(baseFormatterSetting.icon));
            cell2.style.color = '#c7254e';
        }
        else if (baseFormatterSetting.objectType === 'htmlFormatterSetting') {
            iconDiv.appendText('HTML');
            cell2.style.color = '#0055F2';
        }
        else if (baseFormatterSetting.objectType === 'greekFormatterSetting') {
            iconDiv.appendChild(svgToElement(baseFormatterSetting.icon));
            cell2.style.color = '#25e712';
        }
        else if (baseFormatterSetting.objectType === 'latexFormatterSetting') {
            var item = baseFormatterSetting;
            if (item.type === 'icon') {
                var svg = svgToElement(item.text);
                svg.style.display = 'inline-block';
                svg.style.verticalAlign = 'middle';
                iconDiv.appendChild(svg);
            }
            else if (item.type === 'text') {
                var div = document.createElement('div');
                div.innerHTML = item.text;
                iconDiv.appendChild(div);
            }
            cell2.style.color = '#25e712';
        }
        else {
            iconDiv.appendText('HTML');
        }
    };
    // Perform action on the selected suggestion.
    CodeSuggestionModal.prototype.onChooseSuggestion = function (baseFormatterSetting, evt) {
        // @ts-ignore
        var item = baseFormatterSetting;
        console.log(baseFormatterSetting);
        if (item.objectType === 'formatterSetting') {
            // @ts-ignore
            iconFormatter(this.editor, item);
        }
        else if (item.objectType === 'htmlFormatterSetting') {
            // @ts-ignore
            htmlFormatter(this.editor, item);
        }
        else if (item.objectType === 'latexFormatterSetting') {
            // @ts-ignore
            latexFormatter(this.editor, item);
        }
        else if (item.objectType === 'greekFormatterSetting') {
            // @ts-ignore
            greekFormatter(this.editor, item);
        }
        // new Notice(`Selected ${baseFormatterSetting.des}`);
    };
    CodeSuggestionModal.display = function (app, editor) {
        var modal = new CodeSuggestionModal(app);
        modal.setEditor(editor);
        modal.open();
    };
    return CodeSuggestionModal;
}(obsidian.SuggestModal));

var suggestions = values(calloutsFormatterSettings);
var CalloutsSuggestionModal = /** @class */ (function (_super) {
    __extends(CalloutsSuggestionModal, _super);
    function CalloutsSuggestionModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setEditor = function (editor) {
            _this.editor = editor;
        };
        return _this;
    }
    // Returns all available suggestions.
    CalloutsSuggestionModal.prototype.getSuggestions = function (query) {
        var filterFunction = function (setting) {
            return setting.des.toLowerCase().includes(query.toLowerCase());
        };
        // @ts-ignore
        return values(filter(filterFunction, suggestions));
    };
    // Renders each suggestion item.
    CalloutsSuggestionModal.prototype.renderSuggestion = function (calloutsFormatterSetting, el) {
        var row = el.createEl('div');
        row.classList.add('command-list-view-row');
        var iconContainer = row.createDiv();
        iconContainer.classList.add('command-list-view-container');
        var iconDiv = iconContainer.createDiv();
        iconDiv.classList.add('command-list-view-icon');
        var cell2 = row.createDiv();
        cell2.classList.add('command-list-view-text');
        cell2.setText(calloutsFormatterSetting.des);
        var spanIcon = document.createElement('span');
        spanIcon.style.verticalAlign = 'middle';
        spanIcon.style.color = calloutsFormatterSetting.color;
        obsidian.setIcon(spanIcon, calloutsFormatterSetting.icon);
        iconDiv.appendChild(spanIcon);
    };
    // Perform action on the selected suggestion.
    CalloutsSuggestionModal.prototype.onChooseSuggestion = function (calloutsFormatterSetting, evt) {
        // @ts-ignore
        var item = calloutsFormatterSetting;
        console.log(calloutsFormatterSetting);
        calloutsFormatter(this.editor, item);
        // new Notice(`Selected ${calloutsFormatterSetting.des}`);
    };
    CalloutsSuggestionModal.display = function (app, editor) {
        var modal = new CalloutsSuggestionModal(app);
        modal.setEditor(editor);
        modal.open();
    };
    return CalloutsSuggestionModal;
}(obsidian.SuggestModal));

var DEFAULT_SETTINGS = {
    triggerChar: '\\',
    sidePaneSideLeft: false,
    savedColors: ['#ff0000'],
    aviabileRegions: [
        'textEdit',
        'tabels',
        'html',
        'latex',
        'greekLetters',
        'colors',
        'callouts',
    ],
    regionSettings: [
        { name: 'textEdit', active: true, visible: false },
        { name: 'tables', active: true, visible: false },
        { name: 'html', active: true, visible: false },
        { name: 'latex', active: true, visible: false },
        { name: 'greekLetters', active: true, visible: false },
        { name: 'colors', active: true, visible: false },
        { name: 'callouts', active: true, visible: false },
    ],
};
var MarkdownAutocompletePlugin = /** @class */ (function (_super) {
    __extends(MarkdownAutocompletePlugin, _super);
    function MarkdownAutocompletePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggleSidePanelControlView = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // const existing = this.app.workspace.getLeavesOfType(
                        //   SidePanelControlViewType,
                        // );
                        // if (existing.length) {
                        //   this.app.workspace.revealLeaf(existing[0]);
                        //   return;
                        // }
                        this.app.workspace.detachLeavesOfType(SidePanelControlViewType);
                        if (!this.settings.sidePaneSideLeft) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.app.workspace.getLeftLeaf(false).setViewState({
                                type: SidePanelControlViewType,
                                active: true,
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.app.workspace.getRightLeaf(false).setViewState({
                            type: SidePanelControlViewType,
                            active: true,
                        })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(SidePanelControlViewType)[0]);
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    MarkdownAutocompletePlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('loading obsidian-markdown-formatting-assistant-plugin');
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        addIcons();
                        this.registerView(SidePanelControlViewType, function (leaf) {
                            _this.sidePanelControlView = new SidePanelControlView(leaf, _this);
                            return _this.sidePanelControlView;
                        });
                        this.addRibbonIcon('viewIcon', 'Open Markdown Formatting Assistant', function () {
                            _this.toggleSidePanelControlView();
                        });
                        this.addCommand({
                            id: 'open-command-selector',
                            name: 'Open Command Selector',
                            hotkeys: [{ modifiers: ['Alt'], key: 'q' }],
                            editorCallback: function (editor, view) {
                                CodeSuggestionModal.display(_this.app, editor);
                            },
                        });
                        this.addCommand({
                            id: 'open-callouts-selector',
                            name: 'Open Callouts Selector',
                            hotkeys: [{ modifiers: ['Alt'], key: 'c' }],
                            editorCallback: function (editor, view) {
                                CalloutsSuggestionModal.display(_this.app, editor);
                            },
                        });
                        this.addSettingTab(new SettingsTab(this.app, this));
                        return [2 /*return*/];
                }
            });
        });
    };
    MarkdownAutocompletePlugin.prototype.onunload = function () { };
    MarkdownAutocompletePlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    MarkdownAutocompletePlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MarkdownAutocompletePlugin;
}(obsidian.Plugin));
var SettingsTab = /** @class */ (function (_super) {
    __extends(SettingsTab, _super);
    function SettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SettingsTab.prototype.close = function () {
        console.log('closed');
        _super.prototype.hide.call(this);
    };
    SettingsTab.prototype.display = function () {
        return __awaiter(this, void 0, void 0, function () {
            var containerEl, getRegion;
            var _this = this;
            return __generator(this, function (_a) {
                containerEl = this.containerEl;
                containerEl.empty();
                containerEl.createEl('h2', {
                    text: 'Markdown Formatting Assistant Settings',
                });
                new obsidian.Setting(containerEl)
                    .setName('Trigger Char')
                    .setDesc('Char which triggers the autocompletion')
                    .addText(function (text) {
                    return text
                        .setPlaceholder('Enter a char to trigger the autocompletion')
                        .setValue(_this.plugin.settings.triggerChar)
                        .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.plugin.settings.triggerChar = value;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                new obsidian.Setting(containerEl)
                    .setName('Side Pane Side')
                    .setDesc('Choose on which side the Side Pane accours. ()')
                    .addText(function (text) {
                    return text
                        .setPlaceholder('Enter left or right')
                        .setValue(_this.plugin.settings.sidePaneSideLeft ? 'left' : 'right')
                        .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.plugin.settings.sidePaneSideLeft =
                                        value === 'left' ? true : false;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                getRegion = function (name) {
                    return _this.plugin.settings.regionSettings.find(function (item) { return item.name === name; });
                };
                new obsidian.Setting(containerEl)
                    .setName('Toggle Text Section')
                    .setDesc('Activate or deactivate the Text Editor section. (restart required)')
                    .addToggle(function (comp) {
                    comp.setValue(getRegion('textEdit').active).onChange(function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var region;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    region = getRegion('textEdit');
                                    region.active = e;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                new obsidian.Setting(containerEl)
                    .setName('Toggle Tabels Section')
                    .setDesc('Activate or deactivate the Greek Letters section. (restart required)')
                    .addToggle(function (comp) {
                    comp.setValue(getRegion('tables').active).onChange(function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var region;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    region = getRegion('tables');
                                    region.active = e;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                new obsidian.Setting(containerEl)
                    .setName('Toggle HTML Section')
                    .setDesc('Activate or deactivate the HTML section. (restart required)')
                    .addToggle(function (comp) {
                    comp.setValue(getRegion('html').active).onChange(function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var region;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    region = getRegion('html');
                                    region.active = e;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                new obsidian.Setting(containerEl)
                    .setName('Toggle Colors Section')
                    .setDesc('Activate or deactivate the Colors section. (restart required)')
                    .addToggle(function (comp) {
                    comp.setValue(getRegion('colors').active).onChange(function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var region;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    region = getRegion('colors');
                                    region.active = e;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                new obsidian.Setting(containerEl)
                    .setName('Toggle Latex Section')
                    .setDesc('Activate or deactivate the Latex section. (restart required)')
                    .addToggle(function (comp) {
                    comp.setValue(getRegion('latex').active).onChange(function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var region;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    region = getRegion('latex');
                                    region.active = e;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                new obsidian.Setting(containerEl)
                    .setName('Toggle Greek Letters Section')
                    .setDesc('Activate or deactivate the Greek Letters section. (restart required)')
                    .addToggle(function (comp) {
                    comp.setValue(getRegion('greekLetters').active).onChange(function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var region;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    region = getRegion('greekLetters');
                                    region.active = e;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                new obsidian.Setting(containerEl)
                    .setName('Saved Colors')
                    .setDesc('Colors which are saved vie the color picker. The order will be also considered. Requiers a restart of obsidian.')
                    .addTextArea(function (text) {
                    text.inputEl.style.minHeight = '400px';
                    text
                        .setValue(_this.plugin.settings.savedColors
                        .reverse()
                        .map(function (color, i) { return color; })
                        .join('\n'))
                        .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                        var colors, filteredColors;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    colors = value.split('\n').reverse();
                                    filteredColors = colors.filter(function (color) {
                                        return /^#[0-9A-F]{6}$/i.test(color);
                                    });
                                    this.plugin.settings.savedColors = filteredColors;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    text.inputEl.addEventListener('focusout', function (ev) {
                        // @ts-ignore
                        var colors = ev.target.value.split('\n').reverse();
                        // @ts-ignore
                        colors.map(function (color, i) {
                            var isHex = /^#[0-9A-F]{6}$/i.test(color);
                            if (!isHex) {
                                new obsidian.Notice('The color ' +
                                    color +
                                    'on Line' +
                                    (i + 1) +
                                    " has the wrong format and wan't be saved.");
                            }
                        });
                    });
                });
                new obsidian.Setting(containerEl)
                    .setName('Toggle Callouts Section')
                    .setDesc('Activate or deactivate the Callouts section. (restart required)')
                    .addToggle(function (comp) {
                    comp.setValue(getRegion('callouts').active).onChange(function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var region;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    region = getRegion('callouts');
                                    region.active = e;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                return [2 /*return*/];
            });
        });
    };
    return SettingsTab;
}(obsidian.PluginSettingTab));

module.exports = MarkdownAutocompletePlugin;


/* nosourcemap */