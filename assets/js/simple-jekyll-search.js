/*!
  * Simple-Jekyll-Search v1.7.4 (https://github.com/christian-fei/Simple-Jekyll-Search)
  * Copyright 2015-2020, Christian Fei
  * Licensed under the MIT License.
  */

(function(){
'use strict'

var _$Templater_7 = {
  compile: compile,
  setOptions: setOptions
}

var options = {}
options.pattern = /\{(.*?)\}/g
options.template = ''
options.middleware = function () {}

function setOptions (_options) {
  options.pattern = _options.pattern || options.pattern
  options.template = _options.template || options.template
  if (typeof _options.middleware === 'function') {
    options.middleware = _options.middleware
  }
}

function compile (data) {
  return options.template.replace(options.pattern, function (match, prop) {
    var value = options.middleware(prop, data[prop], options.template)
    if (typeof value !== 'undefined') {
      return value
    }
    return data[prop] || match
  })
}

'use strict';

function fuzzysearch (needle, haystack) {
  var tlen = haystack.length;
  var qlen = needle.length;
  if (qlen > tlen) {
    return false;
  }
  if (qlen === tlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < qlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < tlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

var _$fuzzysearch_1 = fuzzysearch;

'use strict'

/* removed: var _$fuzzysearch_1 = require('fuzzysearch') */;

var _$FuzzySearchStrategy_5 = new FuzzySearchStrategy()

function FuzzySearchStrategy () {
  this.matches = function (string, crit) {
    return _$fuzzysearch_1(crit.toLowerCase(), string.toLowerCase())
  }
}

'use strict'

var _$LiteralSearchStrategy_6 = new LiteralSearchStrategy()

function LiteralSearchStrategy () {
  this.matches = function (str, crit) {
    if (!str) return false

    str = str.trim().toLowerCase()
    crit = crit.trim().toLowerCase()

    return crit.split(' ').filter(function (word) {
      return str.indexOf(word) >= 0
    }).length === crit.split(' ').length
  }
}

'use strict'

var _$Repository_4 = {
  put: put,
  clear: clear,
  search: search,
  setOptions: __setOptions_4
}

/* removed: var _$FuzzySearchStrategy_5 = require('./SearchStrategies/FuzzySearchStrategy') */;
/* removed: var _$LiteralSearchStrategy_6 = require('./SearchStrategies/LiteralSearchStrategy') */;

function NoSort () {
  return 0
}

var data = []
var opt = {}

opt.fuzzy = false
opt.limit = 10
opt.searchStrategy = opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6
opt.sort = NoSort

function put (data) {
  if (isObject(data)) {
    return addObject(data)
  }
  if (isArray(data)) {
    return addArray(data)
  }
  return undefined
}
function clear () {
  data.length = 0
  return data
}

function isObject (obj) {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray (obj) {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Array]'
}

function addObject (_data) {
  data.push(_data)
  return data
}

function addArray (_data) {
  var added = []
  clear()
  for (var i = 0, len = _data.length; i < len; i++) {
    if (isObject(_data[i])) {
      added.push(addObject(_data[i]))
    }
  }
  return added
}

function search (crit) {
  if (!crit) {
    return []
  }
  return findMatches(data, crit, opt.searchStrategy, opt).sort(opt.sort)
}

function __setOptions_4 (_opt) {
  opt = _opt || {}

  opt.fuzzy = _opt.fuzzy || false
  opt.limit = _opt.limit || 10
  opt.searchStrategy = _opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6
  opt.sort = _opt.sort || NoSort
}

function findMatches (data, crit, strategy, opt) {
  var matches = []
  for (var i = 0; i < data.length && matches.length < opt.limit; i++) {
    var match = findMatchesInObject(data[i], crit, strategy, opt)
    if (match) {
      matches.push(match)
    }
  }
  return matches
}

function findMatchesInObject (obj, crit, strategy, opt) {
  for (var key in obj) {
    if (!isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit)) {
      return obj
    }
  }
}

function isExcluded (term, excludedTerms) {
  var excluded = false
  excludedTerms = excludedTerms || []
  for (var i = 0, len = excludedTerms.length; i < len; i++) {
    var excludedTerm = excludedTerms[i]
    if (!excluded && new RegExp(term).test(excludedTerm)) {
      excluded = true
    }
  }
  return excluded
}

/* globals ActiveXObject:false */

'use strict'

var _$JSONLoader_2 = {
  load: load
}

function load (location, callback) {
  var xhr = getXHR()
  xhr.open('GET', location, true)
  xhr.onreadystatechange = createStateChangeListener(xhr, callback)
  xhr.send()
}

function createStateChangeListener (xhr, callback) {
  return function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        callback(null, JSON.parse(xhr.responseText))
      } catch (err) {
        callback(err, null)
      }
    }
  }
}

function getXHR () {
  return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
}

'use strict'

var _$OptionsValidator_3 = function OptionsValidator (params) {
  if (!validateParams(params)) {
    throw new Error('-- OptionsValidator: required options missing')
  }

  if (!(this instanceof OptionsValidator)) {
    return new OptionsValidator(params)
  }

  var requiredOptions = params.required

  this.getRequiredOptions = function () {
    return requiredOptions
  }

  this.validate = function (parameters) {
    var errors = []
    requiredOptions.forEach(function (requiredOptionName) {
      if (typeof parameters[requiredOptionName] === 'undefined') {
        errors.push(requiredOptionName)
      }
    })
    return errors
  }

  function validateParams (params) {
    if (!params) {
      return false
    }
    return typeof params.required !== 'undefined' && params.required instanceof Array
  }
}

'use strict'

var _$utils_9 = {
  merge: merge,
  isJSON: isJSON
}

function merge (defaultParams, mergeParams) {
  var mergedOptions = {}
  for (var option in defaultParams) {
    mergedOptions[option] = defaultParams[option]
    if (typeof mergeParams[option] !== 'undefined') {
      mergedOptions[option] = mergeParams[option]
    }
  }
  return mergedOptions
}

function isJSON (json) {
  try {
    if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

var _$src_8 = {};
(function (window) {
  'use strict'

  var options = {
    searchInput: null,
    resultsContainer: null,
    json: [],
    success: Function.prototype,
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    templateMiddleware: Function.prototype,
    sortMiddleware: function () {
      return 0
    },
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false,
    exclude: []
  }

  var requiredOptions = ['searchInput', 'resultsContainer', 'json']

  /* removed: var _$Templater_7 = require('./Templater') */;
  /* removed: var _$Repository_4 = require('./Repository') */;
  /* removed: var _$JSONLoader_2 = require('./JSONLoader') */;
  var optionsValidator = _$OptionsValidator_3({
    required: requiredOptions
  })
  /* removed: var _$utils_9 = require('./utils') */;

  var simpleJekyllSearch = function (_options) {
    var errors = optionsValidator.validate(_options)
    if (errors.length > 0) {
      throwError('You must specify the following required options: ' + requiredOptions)
    }

    options = _$utils_9.merge(options, _options)

    _$Templater_7.setOptions({
      template: options.searchResultTemplate,
      middleware: options.templateMiddleware
    })

    _$Repository_4.setOptions({
      fuzzy: options.fuzzy,
      limit: options.limit,
      sort: options.sortMiddleware
    })

    if (_$utils_9.isJSON(options.json)) {
      initWithJSON(options.json)
    } else {
      initWithURL(options.json)
    }

    return {
      search: search
    }
  }

  window.SimpleJekyllSearch = function (_options) {
    var search = simpleJekyllSearch(_options)
    _options.success.call(search)
    return search
  }

  function initWithJSON (json) {
    _$Repository_4.put(json)
    registerInput()
  }

  function initWithURL (url) {
    _$JSONLoader_2.load(url, function (err, json) {
      if (err) {
        throwError('failed to get JSON (' + url + ')')
      }
      initWithJSON(json)
    })
  }

  function emptyResultsContainer () {
    options.resultsContainer.innerHTML = ''
  }

  function appendToResultsContainer (text) {
    options.resultsContainer.innerHTML += text
  }

  function registerInput () {
    options.searchInput.addEventListener('keyup', function (e) {
      if (isWhitelistedKey(e.which)) {
        emptyResultsContainer()
        search(e.target.value)
      }
    })
  }

  function search (query) {
    if (isValidQuery(query)) {
      emptyResultsContainer()
      render(_$Repository_4.search(query), query)
    }
  }

  function render (results, query) {
    var len = results.length
    if (len === 0) {
      return appendToResultsContainer(options.noResultsText)
    }
    for (var i = 0; i < len; i++) {
      results[i].query = query
      appendToResultsContainer(_$Templater_7.compile(results[i]))
    }
  }

  function isValidQuery (query) {
    return query && query.length > 0
  }

  function isWhitelistedKey (key) {
    return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(key) === -1
  }

  function throwError (message) {
    throw new Error('SimpleJekyllSearch --- ' + message)
  }
})(window)

}());
