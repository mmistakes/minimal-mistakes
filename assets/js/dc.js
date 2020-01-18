/*!
 *  dc 3.0.7
 *  http://dc-js.github.io/dc.js/
 *  Copyright 2012-2016 Nick Zhu & the dc.js Developers
 *  https://github.com/dc-js/dc.js/blob/master/AUTHORS
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
(function() { function _dc(d3, crossfilter) {
'use strict';

/**
 * The entire dc.js library is scoped under the **dc** name space. It does not introduce
 * anything else into the global name space.
 *
 * Most `dc` functions are designed to allow function chaining, meaning they return the current chart
 * instance whenever it is appropriate.  The getter forms of functions do not participate in function
 * chaining because they return values that are not the chart, although some,
 * such as {@link dc.baseMixin#svg .svg} and {@link dc.coordinateGridMixin#xAxis .xAxis},
 * return values that are themselves chainable d3 objects.
 * @namespace dc
 * @version 3.0.7
 * @example
 * // Example chaining
 * chart.width(300)
 *      .height(300)
 *      .filter('sunday');
 */
/*jshint -W079*/
var dc = {
    version: '3.0.7',
    constants: {
        CHART_CLASS: 'dc-chart',
        DEBUG_GROUP_CLASS: 'debug',
        STACK_CLASS: 'stack',
        DESELECTED_CLASS: 'deselected',
        SELECTED_CLASS: 'selected',
        NODE_INDEX_NAME: '__index__',
        GROUP_INDEX_NAME: '__group_index__',
        DEFAULT_CHART_GROUP: '__default_chart_group__',
        EVENT_DELAY: 40,
        NEGLIGIBLE_NUMBER: 1e-10
    },
    _renderlet: null
};
/*jshint +W079*/

/**
 * The dc.chartRegistry object maintains sets of all instantiated dc.js charts under named groups
 * and the default group.
 *
 * A chart group often corresponds to a crossfilter instance. It specifies
 * the set of charts which should be updated when a filter changes on one of the charts or when the
 * global functions {@link dc.filterAll dc.filterAll}, {@link dc.refocusAll dc.refocusAll},
 * {@link dc.renderAll dc.renderAll}, {@link dc.redrawAll dc.redrawAll}, or chart functions
 * {@link dc.baseMixin#renderGroup baseMixin.renderGroup},
 * {@link dc.baseMixin#redrawGroup baseMixin.redrawGroup} are called.
 *
 * @namespace chartRegistry
 * @memberof dc
 * @type {{has, register, deregister, clear, list}}
 */
dc.chartRegistry = (function () {
    // chartGroup:string => charts:array
    var _chartMap = {};

    function initializeChartGroup (group) {
        if (!group) {
            group = dc.constants.DEFAULT_CHART_GROUP;
        }

        if (!_chartMap[group]) {
            _chartMap[group] = [];
        }

        return group;
    }

    return {
        /**
         * Determine if a given chart instance resides in any group in the registry.
         * @method has
         * @memberof dc.chartRegistry
         * @param {Object} chart dc.js chart instance
         * @returns {Boolean}
         */
        has: function (chart) {
            for (var e in _chartMap) {
                if (_chartMap[e].indexOf(chart) >= 0) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Add given chart instance to the given group, creating the group if necessary.
         * If no group is provided, the default group `dc.constants.DEFAULT_CHART_GROUP` will be used.
         * @method register
         * @memberof dc.chartRegistry
         * @param {Object} chart dc.js chart instance
         * @param {String} [group] Group name
         */
        register: function (chart, group) {
            group = initializeChartGroup(group);
            _chartMap[group].push(chart);
        },

        /**
         * Remove given chart instance from the given group, creating the group if necessary.
         * If no group is provided, the default group `dc.constants.DEFAULT_CHART_GROUP` will be used.
         * @method deregister
         * @memberof dc.chartRegistry
         * @param {Object} chart dc.js chart instance
         * @param {String} [group] Group name
         */
        deregister: function (chart, group) {
            group = initializeChartGroup(group);
            for (var i = 0; i < _chartMap[group].length; i++) {
                if (_chartMap[group][i].anchorName() === chart.anchorName()) {
                    _chartMap[group].splice(i, 1);
                    break;
                }
            }
        },

        /**
         * Clear given group if one is provided, otherwise clears all groups.
         * @method clear
         * @memberof dc.chartRegistry
         * @param {String} group Group name
         */
        clear: function (group) {
            if (group) {
                delete _chartMap[group];
            } else {
                _chartMap = {};
            }
        },

        /**
         * Get an array of each chart instance in the given group.
         * If no group is provided, the charts in the default group are returned.
         * @method list
         * @memberof dc.chartRegistry
         * @param {String} [group] Group name
         * @returns {Array<Object>}
         */
        list: function (group) {
            group = initializeChartGroup(group);
            return _chartMap[group];
        }
    };
})();

/**
 * Add given chart instance to the given group, creating the group if necessary.
 * If no group is provided, the default group `dc.constants.DEFAULT_CHART_GROUP` will be used.
 * @memberof dc
 * @method registerChart
 * @param {Object} chart dc.js chart instance
 * @param {String} [group] Group name
 */
dc.registerChart = function (chart, group) {
    dc.chartRegistry.register(chart, group);
};

/**
 * Remove given chart instance from the given group, creating the group if necessary.
 * If no group is provided, the default group `dc.constants.DEFAULT_CHART_GROUP` will be used.
 * @memberof dc
 * @method deregisterChart
 * @param {Object} chart dc.js chart instance
 * @param {String} [group] Group name
 */
dc.deregisterChart = function (chart, group) {
    dc.chartRegistry.deregister(chart, group);
};

/**
 * Determine if a given chart instance resides in any group in the registry.
 * @memberof dc
 * @method hasChart
 * @param {Object} chart dc.js chart instance
 * @returns {Boolean}
 */
dc.hasChart = function (chart) {
    return dc.chartRegistry.has(chart);
};

/**
 * Clear given group if one is provided, otherwise clears all groups.
 * @memberof dc
 * @method deregisterAllCharts
 * @param {String} group Group name
 */
dc.deregisterAllCharts = function (group) {
    dc.chartRegistry.clear(group);
};

/**
 * Clear all filters on all charts within the given chart group. If the chart group is not given then
 * only charts that belong to the default chart group will be reset.
 * @memberof dc
 * @method filterAll
 * @param {String} [group]
 */
dc.filterAll = function (group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        charts[i].filterAll();
    }
};

/**
 * Reset zoom level / focus on all charts that belong to the given chart group. If the chart group is
 * not given then only charts that belong to the default chart group will be reset.
 * @memberof dc
 * @method refocusAll
 * @param {String} [group]
 */
dc.refocusAll = function (group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        if (charts[i].focus) {
            charts[i].focus();
        }
    }
};

/**
 * Re-render all charts belong to the given chart group. If the chart group is not given then only
 * charts that belong to the default chart group will be re-rendered.
 * @memberof dc
 * @method renderAll
 * @param {String} [group]
 */
dc.renderAll = function (group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        charts[i].render();
    }

    if (dc._renderlet !== null) {
        dc._renderlet(group);
    }
};

/**
 * Redraw all charts belong to the given chart group. If the chart group is not given then only charts
 * that belong to the default chart group will be re-drawn. Redraw is different from re-render since
 * when redrawing dc tries to update the graphic incrementally, using transitions, instead of starting
 * from scratch.
 * @memberof dc
 * @method redrawAll
 * @param {String} [group]
 */
dc.redrawAll = function (group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        charts[i].redraw();
    }

    if (dc._renderlet !== null) {
        dc._renderlet(group);
    }
};

/**
 * If this boolean is set truthy, all transitions will be disabled, and changes to the charts will happen
 * immediately.
 * @memberof dc
 * @member disableTransitions
 * @type {Boolean}
 * @default false
 */
dc.disableTransitions = false;

/**
 * Start a transition on a selection if transitions are globally enabled
 * ({@link dc.disableTransitions} is false) and the duration is greater than zero; otherwise return
 * the selection. Since most operations are the same on a d3 selection and a d3 transition, this
 * allows a common code path for both cases.
 * @memberof dc
 * @method transition
 * @param {d3.selection} selection - the selection to be transitioned
 * @param {Number|Function} [duration=250] - the duration of the transition in milliseconds, a
 * function returning the duration, or 0 for no transition
 * @param {Number|Function} [delay] - the delay of the transition in milliseconds, or a function
 * returning the delay, or 0 for no delay
 * @param {String} [name] - the name of the transition (if concurrent transitions on the same
 * elements are needed)
 * @returns {d3.transition|d3.selection}
 */
dc.transition = function (selection, duration, delay, name) {
    if (dc.disableTransitions || duration <= 0) {
        return selection;
    }

    var s = selection.transition(name);

    if (duration >= 0 || duration !== undefined) {
        s = s.duration(duration);
    }
    if (delay >= 0 || delay !== undefined) {
        s = s.delay(delay);
    }

    return s;
};

/* somewhat silly, but to avoid duplicating logic */
dc.optionalTransition = function (enable, duration, delay, name) {
    if (enable) {
        return function (selection) {
            return dc.transition(selection, duration, delay, name);
        };
    } else {
        return function (selection) {
            return selection;
        };
    }
};

// See http://stackoverflow.com/a/20773846
dc.afterTransition = function (transition, callback) {
    if (transition.empty() || !transition.duration) {
        callback.call(transition);
    } else {
        var n = 0;
        transition
            .each(function () { ++n; })
            .on('end', function () {
                if (!--n) {
                    callback.call(transition);
                }
            });
    }
};

/**
 * @namespace units
 * @memberof dc
 * @type {{}}
 */
dc.units = {};

/**
 * The default value for {@link dc.coordinateGridMixin#xUnits .xUnits} for the
 * {@link dc.coordinateGridMixin Coordinate Grid Chart} and should
 * be used when the x values are a sequence of integers.
 * It is a function that counts the number of integers in the range supplied in its start and end parameters.
 * @method integers
 * @memberof dc.units
 * @see {@link dc.coordinateGridMixin#xUnits coordinateGridMixin.xUnits}
 * @example
 * chart.xUnits(dc.units.integers) // already the default
 * @param {Number} start
 * @param {Number} end
 * @returns {Number}
 */
dc.units.integers = function (start, end) {
    return Math.abs(end - start);
};

/**
 * This argument can be passed to the {@link dc.coordinateGridMixin#xUnits .xUnits} function of a
 * coordinate grid chart to specify ordinal units for the x axis. Usually this parameter is used in
 * combination with passing
 * {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales d3.scaleOrdinal}
 * to {@link dc.coordinateGridMixin#x .x}.
 *
 * As of dc.js 3.0, this is purely a placeholder or magic value which causes the chart to go into ordinal mode; the
 * function is not called.
 * @method ordinal
 * @memberof dc.units
 * @see {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales d3.scaleOrdinal}
 * @see {@link dc.coordinateGridMixin#xUnits coordinateGridMixin.xUnits}
 * @see {@link dc.coordinateGridMixin#x coordinateGridMixin.x}
 * @example
 * chart.xUnits(dc.units.ordinal)
 *      .x(d3.scaleOrdinal())
 */
dc.units.ordinal = function () {
    throw new Error('dc.units.ordinal should not be called - it is a placeholder');
};

/**
 * @namespace fp
 * @memberof dc.units
 * @type {{}}
 */
dc.units.fp = {};
/**
 * This function generates an argument for the {@link dc.coordinateGridMixin Coordinate Grid Chart}
 * {@link dc.coordinateGridMixin#xUnits .xUnits} function specifying that the x values are floating-point
 * numbers with the given precision.
 * The returned function determines how many values at the given precision will fit into the range
 * supplied in its start and end parameters.
 * @method precision
 * @memberof dc.units.fp
 * @see {@link dc.coordinateGridMixin#xUnits coordinateGridMixin.xUnits}
 * @example
 * // specify values (and ticks) every 0.1 units
 * chart.xUnits(dc.units.fp.precision(0.1)
 * // there are 500 units between 0.5 and 1 if the precision is 0.001
 * var thousandths = dc.units.fp.precision(0.001);
 * thousandths(0.5, 1.0) // returns 500
 * @param {Number} precision
 * @returns {Function} start-end unit function
 */
dc.units.fp.precision = function (precision) {
    var _f = function (s, e) {
        var d = Math.abs((e - s) / _f.resolution);
        if (dc.utils.isNegligible(d - Math.floor(d))) {
            return Math.floor(d);
        } else {
            return Math.ceil(d);
        }
    };
    _f.resolution = precision;
    return _f;
};

dc.round = {};
dc.round.floor = function (n) {
    return Math.floor(n);
};
dc.round.ceil = function (n) {
    return Math.ceil(n);
};
dc.round.round = function (n) {
    return Math.round(n);
};

dc.override = function (obj, functionName, newFunction) {
    var existingFunction = obj[functionName];
    obj['_' + functionName] = existingFunction;
    obj[functionName] = newFunction;
};

dc.renderlet = function (_) {
    if (!arguments.length) {
        return dc._renderlet;
    }
    dc._renderlet = _;
    return dc;
};

dc.instanceOfChart = function (o) {
    return o instanceof Object && o.__dcFlag__ && true;
};

dc.errors = {};

dc.errors.Exception = function (msg) {
    var _msg = msg || 'Unexpected internal error';

    this.message = _msg;

    this.toString = function () {
        return _msg;
    };
    this.stack = (new Error()).stack;
};
dc.errors.Exception.prototype = Object.create(Error.prototype);
dc.errors.Exception.prototype.constructor = dc.errors.Exception;

dc.errors.InvalidStateException = function () {
    dc.errors.Exception.apply(this, arguments);
};

dc.errors.InvalidStateException.prototype = Object.create(dc.errors.Exception.prototype);
dc.errors.InvalidStateException.prototype.constructor = dc.errors.InvalidStateException;

dc.errors.BadArgumentException = function () {
    dc.errors.Exception.apply(this, arguments);
};

dc.errors.BadArgumentException.prototype = Object.create(dc.errors.Exception.prototype);
dc.errors.BadArgumentException.prototype.constructor = dc.errors.BadArgumentException;

/**
 * The default date format for dc.js
 * @name dateFormat
 * @memberof dc
 * @type {Function}
 * @default d3.timeFormat('%m/%d/%Y')
 */
dc.dateFormat = d3.timeFormat('%m/%d/%Y');

/**
 * @namespace printers
 * @memberof dc
 * @type {{}}
 */
dc.printers = {};

/**
 * Converts a list of filters into a readable string.
 * @method filters
 * @memberof dc.printers
 * @param {Array<dc.filters>} filters
 * @returns {String}
 */
dc.printers.filters = function (filters) {
    var s = '';

    for (var i = 0; i < filters.length; ++i) {
        if (i > 0) {
            s += ', ';
        }
        s += dc.printers.filter(filters[i]);
    }

    return s;
};

/**
 * Converts a filter into a readable string.
 * @method filter
 * @memberof dc.printers
 * @param {dc.filters|any|Array<any>} filter
 * @returns {String}
 */
dc.printers.filter = function (filter) {
    var s = '';

    if (typeof filter !== 'undefined' && filter !== null) {
        if (filter instanceof Array) {
            if (filter.length >= 2) {
                s = '[' + filter.map(function (e) {
                    return dc.utils.printSingleValue(e);
                }).join(' -> ') + ']';
            } else if (filter.length >= 1) {
                s = dc.utils.printSingleValue(filter[0]);
            }
        } else {
            s = dc.utils.printSingleValue(filter);
        }
    }

    return s;
};

/**
 * Returns a function that given a string property name, can be used to pluck the property off an object.  A function
 * can be passed as the second argument to also alter the data being returned.
 *
 * This can be a useful shorthand method to create accessor functions.
 * @method pluck
 * @memberof dc
 * @example
 * var xPluck = dc.pluck('x');
 * var objA = {x: 1};
 * xPluck(objA) // 1
 * @example
 * var xPosition = dc.pluck('x', function (x, i) {
 *     // `this` is the original datum,
 *     // `x` is the x property of the datum,
 *     // `i` is the position in the array
 *     return this.radius + x;
 * });
 * dc.selectAll('.circle').data(...).x(xPosition);
 * @param {String} n
 * @param {Function} [f]
 * @returns {Function}
 */
dc.pluck = function (n, f) {
    if (!f) {
        return function (d) { return d[n]; };
    }
    return function (d, i) { return f.call(d, d[n], i); };
};

/**
 * @namespace utils
 * @memberof dc
 * @type {{}}
 */
dc.utils = {};

/**
 * Print a single value filter.
 * @method printSingleValue
 * @memberof dc.utils
 * @param {any} filter
 * @returns {String}
 */
dc.utils.printSingleValue = function (filter) {
    var s = '' + filter;

    if (filter instanceof Date) {
        s = dc.dateFormat(filter);
    } else if (typeof(filter) === 'string') {
        s = filter;
    } else if (dc.utils.isFloat(filter)) {
        s = dc.utils.printSingleValue.fformat(filter);
    } else if (dc.utils.isInteger(filter)) {
        s = Math.round(filter);
    }

    return s;
};
dc.utils.printSingleValue.fformat = d3.format('.2f');

// convert 'day' to 'timeDay' and similar
dc.utils.toTimeFunc = function (t) {
    return 'time' + t.charAt(0).toUpperCase() + t.slice(1);
};

/**
 * Arbitrary add one value to another.
 *
 * If the value l is of type Date, adds r units to it. t becomes the unit.
 * For example dc.utils.add(dt, 3, 'week') will add 3 (r = 3) weeks (t= 'week') to dt.
 *
 * If l is of type numeric, t is ignored. In this case if r is of type string,
 * it is assumed to be percentage (whether or not it includes %). For example
 * dc.utils.add(30, 10) will give 40 and dc.utils.add(30, '10') will give 33.
 *
 * They also generate strange results if l is a string.
 * @method add
 * @memberof dc.utils
 * @param {Date|Number} l the value to modify
 * @param {String|Number} r the amount by which to modify the value
 * @param {Function|String} [t=d3.timeDay] if `l` is a `Date`, then this should be a
 * [d3 time interval](https://github.com/d3/d3-time/blob/master/README.md#_interval).
 * For backward compatibility with dc.js 2.0, it can also be the name of an interval, i.e.
 * 'millis', 'second', 'minute', 'hour', 'day', 'week', 'month', or 'year'
 * @returns {Date|Number}
 */
dc.utils.add = function (l, r, t) {
    if (typeof r === 'string') {
        r = r.replace('%', '');
    }

    if (l instanceof Date) {
        if (typeof r === 'string') {
            r = +r;
        }
        if (t === 'millis') {
            return new Date(l.getTime() + r);
        }
        t = t || d3.timeDay;
        if (typeof t !== 'function') {
            t = d3[dc.utils.toTimeFunc(t)];
        }
        return t.offset(l, r);
    } else if (typeof r === 'string') {
        var percentage = (+r / 100);
        return l > 0 ? l * (1 + percentage) : l * (1 - percentage);
    } else {
        return l + r;
    }
};

/**
 * Arbitrary subtract one value from another.
 *
 * If the value l is of type Date, subtracts r units from it. t becomes the unit.
 * For example dc.utils.subtract(dt, 3, 'week') will subtract 3 (r = 3) weeks (t= 'week') from dt.
 *
 * If l is of type numeric, t is ignored. In this case if r is of type string,
 * it is assumed to be percentage (whether or not it includes %). For example
 * dc.utils.subtract(30, 10) will give 20 and dc.utils.subtract(30, '10') will give 27.
 *
 * They also generate strange results if l is a string.
 * @method subtract
 * @memberof dc.utils
 * @param {Date|Number} l the value to modify
 * @param {String|Number} r the amount by which to modify the value
 * @param {Function|String} [t=d3.timeDay] if `l` is a `Date`, then this should be a
 * [d3 time interval](https://github.com/d3/d3-time/blob/master/README.md#_interval).
 * For backward compatibility with dc.js 2.0, it can also be the name of an interval, i.e.
 * 'millis', 'second', 'minute', 'hour', 'day', 'week', 'month', or 'year'
 * @returns {Date|Number}
 */
dc.utils.subtract = function (l, r, t) {
    if (typeof r === 'string') {
        r = r.replace('%', '');
    }

    if (l instanceof Date) {
        if (typeof r === 'string') {
            r = +r;
        }
        if (t === 'millis') {
            return new Date(l.getTime() - r);
        }
        t = t || d3.timeDay;
        if (typeof t !== 'function') {
            t = d3[dc.utils.toTimeFunc(t)];
        }
        return t.offset(l, -r);
    } else if (typeof r === 'string') {
        var percentage = (+r / 100);
        return l < 0 ? l * (1 + percentage) : l * (1 - percentage);
    } else {
        return l - r;
    }
};

/**
 * Is the value a number?
 * @method isNumber
 * @memberof dc.utils
 * @param {any} n
 * @returns {Boolean}
 */
dc.utils.isNumber = function (n) {
    return n === +n;
};

/**
 * Is the value a float?
 * @method isFloat
 * @memberof dc.utils
 * @param {any} n
 * @returns {Boolean}
 */
dc.utils.isFloat = function (n) {
    return n === +n && n !== (n | 0);
};

/**
 * Is the value an integer?
 * @method isInteger
 * @memberof dc.utils
 * @param {any} n
 * @returns {Boolean}
 */
dc.utils.isInteger = function (n) {
    return n === +n && n === (n | 0);
};

/**
 * Is the value very close to zero?
 * @method isNegligible
 * @memberof dc.utils
 * @param {any} n
 * @returns {Boolean}
 */
dc.utils.isNegligible = function (n) {
    return !dc.utils.isNumber(n) || (n < dc.constants.NEGLIGIBLE_NUMBER && n > -dc.constants.NEGLIGIBLE_NUMBER);
};

/**
 * Ensure the value is no greater or less than the min/max values.  If it is return the boundary value.
 * @method clamp
 * @memberof dc.utils
 * @param {any} val
 * @param {any} min
 * @param {any} max
 * @returns {any}
 */
dc.utils.clamp = function (val, min, max) {
    return val < min ? min : (val > max ? max : val);
};

/**
 * Given `x`, return a function that always returns `x`.
 *
 * {@link https://github.com/d3/d3/blob/master/CHANGES.md#internals `d3.functor` was removed in d3 version 4}.
 * This function helps to implement the replacement,
 * `typeof x === "function" ? x : dc.utils.constant(x)`
 * @method constant
 * @memberof dc.utils
 * @param {any} x
 * @returns {Function}
 */
dc.utils.constant = function (x) {
    return function () {
        return x;
    };
};

/**
 * Using a simple static counter, provide a unique integer id.
 * @method uniqueId
 * @memberof dc.utils
 * @returns {Number}
 */
var _idCounter = 0;
dc.utils.uniqueId = function () {
    return ++_idCounter;
};

/**
 * Convert a name to an ID.
 * @method nameToId
 * @memberof dc.utils
 * @param {String} name
 * @returns {String}
 */
dc.utils.nameToId = function (name) {
    return name.toLowerCase().replace(/[\s]/g, '_').replace(/[\.']/g, '');
};

/**
 * Append or select an item on a parent element.
 * @method appendOrSelect
 * @memberof dc.utils
 * @param {d3.selection} parent
 * @param {String} selector
 * @param {String} tag
 * @returns {d3.selection}
 */
dc.utils.appendOrSelect = function (parent, selector, tag) {
    tag = tag || selector;
    var element = parent.select(selector);
    if (element.empty()) {
        element = parent.append(tag);
    }
    return element;
};

/**
 * Return the number if the value is a number; else 0.
 * @method safeNumber
 * @memberof dc.utils
 * @param {Number|any} n
 * @returns {Number}
 */
dc.utils.safeNumber = function (n) { return dc.utils.isNumber(+n) ? +n : 0;};

/**
 * Return true if both arrays are equal, if both array are null these are considered equal
 * @method arraysEqual
 * @memberof dc.utils
 * @param {Array|null} a1
 * @param {Array|null} a2
 * @returns {Boolean}
 */
dc.utils.arraysEqual = function (a1, a2) {
    if (!a1 && !a2) {
        return true;
    }

    if (!a1 || !a2) {
        return false;
    }

    return a1.length === a2.length &&
        // If elements are not integers/strings, we hope that it will match because of toString
        // Test cases cover dates as well.
        a1.every(function (elem, i) {
            return elem.valueOf() === a2[i].valueOf();
        });
};

// ******** Sunburst Chart ********
dc.utils.allChildren = function (node) {
    var paths = [];
    paths.push(node.path);
    console.log('currentNode', node);
    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            paths = paths.concat(dc.utils.allChildren(node.children[i]));
        }
    }
    return paths;
};

// builds a d3 Hierarchy from a collection
// TODO: turn this monster method something better.
dc.utils.toHierarchy = function (list, accessor) {
    var root = {'key': 'root', 'children': []};
    for (var i = 0; i < list.length; i++) {
        var data = list[i];
        var parts = data.key;
        var value = accessor(data);
        var currentNode = root;
        for (var j = 0; j < parts.length; j++) {
            var currentPath = parts.slice(0, j + 1);
            var children = currentNode.children;
            var nodeName = parts[j];
            var childNode;
            if (j + 1 < parts.length) {
                // Not yet at the end of the sequence; move down the tree.
                childNode = findChild(children, nodeName);

                // If we don't already have a child node for this branch, create it.
                if (childNode === void 0) {
                    childNode = {'key': nodeName, 'children': [], 'path': currentPath};
                    children.push(childNode);
                }
                currentNode = childNode;
            } else {
                // Reached the end of the sequence; create a leaf node.
                childNode = {'key': nodeName, 'value': value, 'data': data, 'path': currentPath};
                children.push(childNode);
            }
        }
    }
    return root;
};

function findChild (children, nodeName) {
    for (var k = 0; k < children.length; k++) {
        if (children[k].key === nodeName) {
            return children[k];
        }
    }
}

dc.utils.getAncestors = function (node) {
    var path = [];
    var current = node;
    while (current.parent) {
        path.unshift(current.name);
        current = current.parent;
    }
    return path;
};

dc.utils.arraysIdentical = function (a, b) {
    var i = a.length;
    if (i !== b.length) {
        return false;
    }
    while (i--) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};

/**
 * Provides basis logging and deprecation utilities
 * @class logger
 * @memberof dc
 * @returns {dc.logger}
 */
dc.logger = (function () {

    var _logger = {};

    /**
     * Enable debug level logging. Set to `false` by default.
     * @name enableDebugLog
     * @memberof dc.logger
     * @instance
     */
    _logger.enableDebugLog = false;

    /**
     * Put a warning message to console
     * @method warn
     * @memberof dc.logger
     * @instance
     * @example
     * dc.logger.warn('Invalid use of .tension on CurveLinear');
     * @param {String} [msg]
     * @returns {dc.logger}
     */
    _logger.warn = function (msg) {
        if (console) {
            if (console.warn) {
                console.warn(msg);
            } else if (console.log) {
                console.log(msg);
            }
        }

        return _logger;
    };

    var _alreadyWarned = {};

    /**
     * Put a warning message to console. It will warn only on unique messages.
     * @method warnOnce
     * @memberof dc.logger
     * @instance
     * @example
     * dc.logger.warnOnce('Invalid use of .tension on CurveLinear');
     * @param {String} [msg]
     * @returns {dc.logger}
     */
    _logger.warnOnce = function (msg) {
        if (!_alreadyWarned[msg]) {
            _alreadyWarned[msg] = true;

            dc.logger.warn(msg);
        }

        return _logger;
    };

    /**
     * Put a debug message to console. It is controlled by `dc.logger.enableDebugLog`
     * @method debug
     * @memberof dc.logger
     * @instance
     * @example
     * dc.logger.debug('Total number of slices: ' + numSlices);
     * @param {String} [msg]
     * @returns {dc.logger}
     */
    _logger.debug = function (msg) {
        if (_logger.enableDebugLog && console) {
            if (console.debug) {
                console.debug(msg);
            } else if (console.log) {
                console.log(msg);
            }
        }

        return _logger;
    };

    /**
     * Use it to deprecate a function. It will return a wrapped version of the function, which will
     * will issue a warning when invoked. For each function, warning will be issued only once.
     *
     * @method deprecate
     * @memberof dc.logger
     * @instance
     * @example
     * _chart.interpolate = dc.logger.deprecate(function (interpolate) {
     *    if (!arguments.length) {
     *        return _interpolate;
     *    }
     *    _interpolate = interpolate;
     *    return _chart;
     * }, 'dc.lineChart.interpolate has been deprecated since version 3.0 use dc.lineChart.curve instead');
     * @param {Function} [fn]
     * @param {String} [msg]
     * @returns {Function}
     */
    _logger.deprecate = function (fn, msg) {
        // Allow logging of deprecation
        var warned = false;
        function deprecated () {
            if (!warned) {
                _logger.warn(msg);
                warned = true;
            }
            return fn.apply(this, arguments);
        }
        return deprecated;
    };

    return _logger;
})();

/**
 * General configuration
 *
 * @class config
 * @memberof dc
 * @returns {dc.config}
 */
dc.config = (function () {
    var _config = {};

    // D3v5 has removed schemeCategory20c, copied here for backward compatibility
    var _schemeCategory20c = [
        '#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d',
        '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476',
        '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8', '#bcbddc',
        '#dadaeb', '#636363', '#969696', '#bdbdbd', '#d9d9d9'];

    var _defaultColors = _schemeCategory20c;

    /**
     * Set the default color scheme for ordinal charts. Changing it will impact all ordinal charts.
     *
     * By default it is set to a copy of
     * `d3.schemeCategory20c` for backward compatibility. This color scheme has been
     * [removed from D3v5](https://github.com/d3/d3/blob/master/CHANGES.md#changes-in-d3-50).
     * In DC 3.1 release it will change to a more appropriate default.
     *
     * @example
     * dc.config.defaultColors(d3.schemeSet1)
     * @method defaultColors
     * @memberof dc.config
     * @instance
     * @param {Array} [colors]
     * @returns {Array|dc.config}
     */
    _config.defaultColors = function (colors) {
        if (!arguments.length) {
            // Issue warning if it uses _schemeCategory20c
            if (_defaultColors === _schemeCategory20c) {
                dc.logger.warnOnce('You are using d3.schemeCategory20c, which has been removed in D3v5. ' +
                    'See the explanation at https://github.com/d3/d3/blob/master/CHANGES.md#changes-in-d3-50. ' +
                    'DC is using it for backward compatibility, however it will be changed in DCv3.1. ' +
                    'You can change it by calling dc.config.defaultColors(newScheme). ' +
                    'See https://github.com/d3/d3-scale-chromatic for some alternatives.');
            }
            return _defaultColors;
        }
        _defaultColors = colors;
        return _config;
    };

    return _config;
})();

dc.events = {
    current: null
};

/**
 * This function triggers a throttled event function with a specified delay (in milli-seconds).  Events
 * that are triggered repetitively due to user interaction such brush dragging might flood the library
 * and invoke more renders than can be executed in time. Using this function to wrap your event
 * function allows the library to smooth out the rendering by throttling events and only responding to
 * the most recent event.
 * @name events.trigger
 * @memberof dc
 * @example
 * chart.on('renderlet', function(chart) {
 *     // smooth the rendering through event throttling
 *     dc.events.trigger(function(){
 *         // focus some other chart to the range selected by user on this chart
 *         someOtherChart.focus(chart.filter());
 *     });
 * })
 * @param {Function} closure
 * @param {Number} [delay]
 */
dc.events.trigger = function (closure, delay) {
    if (!delay) {
        closure();
        return;
    }

    dc.events.current = closure;

    setTimeout(function () {
        if (closure === dc.events.current) {
            closure();
        }
    }, delay);
};

/**
 * The dc.js filters are functions which are passed into crossfilter to chose which records will be
 * accumulated to produce values for the charts.  In the crossfilter model, any filters applied on one
 * dimension will affect all the other dimensions but not that one.  dc always applies a filter
 * function to the dimension; the function combines multiple filters and if any of them accept a
 * record, it is filtered in.
 *
 * These filter constructors are used as appropriate by the various charts to implement brushing.  We
 * mention below which chart uses which filter.  In some cases, many instances of a filter will be added.
 *
 * Each of the dc.js filters is an object with the following properties:
 * * `isFiltered` - a function that returns true if a value is within the filter
 * * `filterType` - a string identifying the filter, here the name of the constructor
 *
 * Currently these filter objects are also arrays, but this is not a requirement. Custom filters
 * can be used as long as they have the properties above.
 * @namespace filters
 * @memberof dc
 * @type {{}}
 */
dc.filters = {};

/**
 * RangedFilter is a filter which accepts keys between `low` and `high`.  It is used to implement X
 * axis brushing for the {@link dc.coordinateGridMixin coordinate grid charts}.
 *
 * Its `filterType` is 'RangedFilter'
 * @name RangedFilter
 * @memberof dc.filters
 * @param {Number} low
 * @param {Number} high
 * @returns {Array<Number>}
 * @constructor
 */
dc.filters.RangedFilter = function (low, high) {
    var range = new Array(low, high);
    range.isFiltered = function (value) {
        return value >= this[0] && value < this[1];
    };
    range.filterType = 'RangedFilter';

    return range;
};

/**
 * TwoDimensionalFilter is a filter which accepts a single two-dimensional value.  It is used by the
 * {@link dc.heatMap heat map chart} to include particular cells as they are clicked.  (Rows and columns are
 * filtered by filtering all the cells in the row or column.)
 *
 * Its `filterType` is 'TwoDimensionalFilter'
 * @name TwoDimensionalFilter
 * @memberof dc.filters
 * @param {Array<Number>} filter
 * @returns {Array<Number>}
 * @constructor
 */
dc.filters.TwoDimensionalFilter = function (filter) {
    if (filter === null) { return null; }

    var f = filter;
    f.isFiltered = function (value) {
        return value.length && value.length === f.length &&
               value[0] === f[0] && value[1] === f[1];
    };
    f.filterType = 'TwoDimensionalFilter';

    return f;
};

/**
 * The RangedTwoDimensionalFilter allows filtering all values which fit within a rectangular
 * region. It is used by the {@link dc.scatterPlot scatter plot} to implement rectangular brushing.
 *
 * It takes two two-dimensional points in the form `[[x1,y1],[x2,y2]]`, and normalizes them so that
 * `x1 <= x2` and `y1 <= y2`. It then returns a filter which accepts any points which are in the
 * rectangular range including the lower values but excluding the higher values.
 *
 * If an array of two values are given to the RangedTwoDimensionalFilter, it interprets the values as
 * two x coordinates `x1` and `x2` and returns a filter which accepts any points for which `x1 <= x <
 * x2`.
 *
 * Its `filterType` is 'RangedTwoDimensionalFilter'
 * @name RangedTwoDimensionalFilter
 * @memberof dc.filters
 * @param {Array<Array<Number>>} filter
 * @returns {Array<Array<Number>>}
 * @constructor
 */
dc.filters.RangedTwoDimensionalFilter = function (filter) {
    if (filter === null) { return null; }

    var f = filter;
    var fromBottomLeft;

    if (f[0] instanceof Array) {
        fromBottomLeft = [
            [Math.min(filter[0][0], filter[1][0]), Math.min(filter[0][1], filter[1][1])],
            [Math.max(filter[0][0], filter[1][0]), Math.max(filter[0][1], filter[1][1])]
        ];
    } else {
        fromBottomLeft = [[filter[0], -Infinity], [filter[1], Infinity]];
    }

    f.isFiltered = function (value) {
        var x, y;

        if (value instanceof Array) {
            x = value[0];
            y = value[1];
        } else {
            x = value;
            y = fromBottomLeft[0][1];
        }

        return x >= fromBottomLeft[0][0] && x < fromBottomLeft[1][0] &&
               y >= fromBottomLeft[0][1] && y < fromBottomLeft[1][1];
    };
    f.filterType = 'RangedTwoDimensionalFilter';

    return f;
};

// ******** Sunburst Chart ********

/**
 * HierarchyFilter is a filter which accepts a key path as an array. It matches any node at, or
 * child of, the given path. It is used by the {@link dc.sunburstChart sunburst chart} to include particular cells and all
 * their children as they are clicked.
 *
 * @name HierarchyFilter
 * @memberof dc.filters
 * @param {String} path
 * @returns {Array<String>}
 * @constructor
 */
dc.filters.HierarchyFilter = function (path) {
    if (path === null) {
        return null;
    }

    var filter = path.slice(0);
    filter.isFiltered = function (value) {
        if (!(filter.length && value && value.length && value.length >= filter.length)) {
            return false;
        }

        for (var i = 0; i < filter.length; i++) {
            if (value[i] !== filter[i]) {
                return false;
            }
        }

        return true;
    };
    return filter;
};

/**
 * `dc.baseMixin` is an abstract functional object representing a basic `dc` chart object
 * for all chart and widget implementations. Methods from the {@link #dc.baseMixin dc.baseMixin} are inherited
 * and available on all chart implementations in the `dc` library.
 * @name baseMixin
 * @memberof dc
 * @mixin
 * @param {Object} _chart
 * @returns {dc.baseMixin}
 */
dc.baseMixin = function (_chart) {
    _chart.__dcFlag__ = dc.utils.uniqueId();

    var _dimension;
    var _group;

    var _anchor;
    var _root;
    var _svg;
    var _isChild;

    var _minWidth = 200;
    var _defaultWidthCalc = function (element) {
        var width = element && element.getBoundingClientRect && element.getBoundingClientRect().width;
        return (width && width > _minWidth) ? width : _minWidth;
    };
    var _widthCalc = _defaultWidthCalc;

    var _minHeight = 200;
    var _defaultHeightCalc = function (element) {
        var height = element && element.getBoundingClientRect && element.getBoundingClientRect().height;
        return (height && height > _minHeight) ? height : _minHeight;
    };
    var _heightCalc = _defaultHeightCalc;
    var _width, _height;
    var _useViewBoxResizing = false;

    var _keyAccessor = dc.pluck('key');
    var _valueAccessor = dc.pluck('value');
    var _label = dc.pluck('key');

    var _ordering = dc.pluck('key');
    var _orderSort;

    var _renderLabel = false;

    var _title = function (d) {
        return _chart.keyAccessor()(d) + ': ' + _chart.valueAccessor()(d);
    };
    var _renderTitle = true;
    var _controlsUseVisibility = false;

    var _transitionDuration = 750;

    var _transitionDelay = 0;

    var _filterPrinter = dc.printers.filters;

    var _mandatoryAttributes = ['dimension', 'group'];

    var _chartGroup = dc.constants.DEFAULT_CHART_GROUP;

    var _listeners = d3.dispatch(
        'preRender',
        'postRender',
        'preRedraw',
        'postRedraw',
        'filtered',
        'zoomed',
        'renderlet',
        'pretransition');

    var _legend;
    var _commitHandler;

    var _filters = [];
    var _filterHandler = function (dimension, filters) {
        if (filters.length === 0) {
            dimension.filter(null);
        } else if (filters.length === 1 && !filters[0].isFiltered) {
            // single value and not a function-based filter
            dimension.filterExact(filters[0]);
        } else if (filters.length === 1 && filters[0].filterType === 'RangedFilter') {
            // single range-based filter
            dimension.filterRange(filters[0]);
        } else {
            dimension.filterFunction(function (d) {
                for (var i = 0; i < filters.length; i++) {
                    var filter = filters[i];
                    if (filter.isFiltered && filter.isFiltered(d)) {
                        return true;
                    } else if (filter <= d && filter >= d) {
                        return true;
                    }
                }
                return false;
            });
        }
        return filters;
    };

    var _data = function (group) {
        return group.all();
    };

    /**
     * Set or get the height attribute of a chart. The height is applied to the SVGElement generated by
     * the chart when rendered (or re-rendered). If a value is given, then it will be used to calculate
     * the new height and the chart returned for method chaining.  The value can either be a numeric, a
     * function, or falsy. If no value is specified then the value of the current height attribute will
     * be returned.
     *
     * By default, without an explicit height being given, the chart will select the width of its
     * anchor element. If that isn't possible it defaults to 200 (provided by the
     * {@link dc.baseMixin#minHeight minHeight} property). Setting the value falsy will return
     * the chart to the default behavior.
     * @method height
     * @memberof dc.baseMixin
     * @instance
     * @see {@link dc.baseMixin#minHeight minHeight}
     * @example
     * // Default height
     * chart.height(function (element) {
     *     var height = element && element.getBoundingClientRect && element.getBoundingClientRect().height;
     *     return (height && height > chart.minHeight()) ? height : chart.minHeight();
     * });
     *
     * chart.height(250); // Set the chart's height to 250px;
     * chart.height(function(anchor) { return doSomethingWith(anchor); }); // set the chart's height with a function
     * chart.height(null); // reset the height to the default auto calculation
     * @param {Number|Function} [height]
     * @returns {Number|dc.baseMixin}
     */
    _chart.height = function (height) {
        if (!arguments.length) {
            if (!dc.utils.isNumber(_height)) {
                // only calculate once
                _height = _heightCalc(_root.node());
            }
            return _height;
        }
        _heightCalc = height ? (typeof height === 'function' ? height : dc.utils.constant(height)) : _defaultHeightCalc;
        _height = undefined;
        return _chart;
    };

    /**
     * Set or get the width attribute of a chart.
     * @method width
     * @memberof dc.baseMixin
     * @instance
     * @see {@link dc.baseMixin#height height}
     * @see {@link dc.baseMixin#minWidth minWidth}
     * @example
     * // Default width
     * chart.width(function (element) {
     *     var width = element && element.getBoundingClientRect && element.getBoundingClientRect().width;
     *     return (width && width > chart.minWidth()) ? width : chart.minWidth();
     * });
     * @param {Number|Function} [width]
     * @returns {Number|dc.baseMixin}
     */
    _chart.width = function (width) {
        if (!arguments.length) {
            if (!dc.utils.isNumber(_width)) {
                // only calculate once
                _width = _widthCalc(_root.node());
            }
            return _width;
        }
        _widthCalc = width ? (typeof width === 'function' ? width : dc.utils.constant(width)) : _defaultWidthCalc;
        _width = undefined;
        return _chart;
    };

    /**
     * Set or get the minimum width attribute of a chart. This only has effect when used with the default
     * {@link dc.baseMixin#width width} function.
     * @method minWidth
     * @memberof dc.baseMixin
     * @instance
     * @see {@link dc.baseMixin#width width}
     * @param {Number} [minWidth=200]
     * @returns {Number|dc.baseMixin}
     */
    _chart.minWidth = function (minWidth) {
        if (!arguments.length) {
            return _minWidth;
        }
        _minWidth = minWidth;
        return _chart;
    };

    /**
     * Set or get the minimum height attribute of a chart. This only has effect when used with the default
     * {@link dc.baseMixin#height height} function.
     * @method minHeight
     * @memberof dc.baseMixin
     * @instance
     * @see {@link dc.baseMixin#height height}
     * @param {Number} [minHeight=200]
     * @returns {Number|dc.baseMixin}
     */
    _chart.minHeight = function (minHeight) {
        if (!arguments.length) {
            return _minHeight;
        }
        _minHeight = minHeight;
        return _chart;
    };

    /**
     * Turn on/off using the SVG
     * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox `viewBox` attribute}.
     * When enabled, `viewBox` will be set on the svg root element instead of `width` and `height`.
     * Requires that the chart aspect ratio be defined using chart.width(w) and chart.height(h).
     *
     * This will maintain the aspect ratio while enabling the chart to resize responsively to the
     * space given to the chart using CSS. For example, the chart can use `width: 100%; height:
     * 100%` or absolute positioning to resize to its parent div.
     *
     * Since the text will be sized as if the chart is drawn according to the width and height, and
     * will be resized if the chart is any other size, you need to set the chart width and height so
     * that the text looks good. In practice, 600x400 seems to work pretty well for most charts.
     *
     * You can see examples of this resizing strategy in the [Chart Resizing
     * Examples](http://dc-js.github.io/dc.js/resizing/); just add `?resize=viewbox` to any of the
     * one-chart examples to enable `useViewBoxResizing`.
     * @method useViewBoxResizing
     * @memberof dc.baseMixin
     * @instance
     * @param {Boolean} [useViewBoxResizing=false]
     * @returns {Boolean|dc.baseMixin}
     */
    _chart.useViewBoxResizing = function (useViewBoxResizing) {
        if (!arguments.length) {
            return _useViewBoxResizing;
        }
        _useViewBoxResizing = useViewBoxResizing;
        return _chart;
    };

    /**
     * **mandatory**
     *
     * Set or get the dimension attribute of a chart. In `dc`, a dimension can be any valid
     * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension crossfilter dimension}
     *
     * If a value is given, then it will be used as the new dimension. If no value is specified then
     * the current dimension will be returned.
     * @method dimension
     * @memberof dc.baseMixin
     * @instance
     * @see {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension crossfilter.dimension}
     * @example
     * var index = crossfilter([]);
     * var dimension = index.dimension(dc.pluck('key'));
     * chart.dimension(dimension);
     * @param {crossfilter.dimension} [dimension]
     * @returns {crossfilter.dimension|dc.baseMixin}
     */
    _chart.dimension = function (dimension) {
        if (!arguments.length) {
            return _dimension;
        }
        _dimension = dimension;
        _chart.expireCache();
        return _chart;
    };

    /**
     * Set the data callback or retrieve the chart's data set. The data callback is passed the chart's
     * group and by default will return
     * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group_all group.all}.
     * This behavior may be modified to, for instance, return only the top 5 groups.
     * @method data
     * @memberof dc.baseMixin
     * @instance
     * @example
     * // Default data function
     * chart.data(function (group) { return group.all(); });
     *
     * chart.data(function (group) { return group.top(5); });
     * @param {Function} [callback]
     * @returns {*|dc.baseMixin}
     */
    _chart.data = function (callback) {
        if (!arguments.length) {
            return _data.call(_chart, _group);
        }
        _data = typeof callback === 'function' ? callback : dc.utils.constant(callback);
        _chart.expireCache();
        return _chart;
    };

    /**
     * **mandatory**
     *
     * Set or get the group attribute of a chart. In `dc` a group is a
     * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group-map-reduce crossfilter group}.
     * Usually the group should be created from the particular dimension associated with the same chart. If a value is
     * given, then it will be used as the new group.
     *
     * If no value specified then the current group will be returned.
     * If `name` is specified then it will be used to generate legend label.
     * @method group
     * @memberof dc.baseMixin
     * @instance
     * @see {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group-map-reduce crossfilter.group}
     * @example
     * var index = crossfilter([]);
     * var dimension = index.dimension(dc.pluck('key'));
     * chart.dimension(dimension);
     * chart.group(dimension.group(crossfilter.reduceSum()));
     * @param {crossfilter.group} [group]
     * @param {String} [name]
     * @returns {crossfilter.group|dc.baseMixin}
     */
    _chart.group = function (group, name) {
        if (!arguments.length) {
            return _group;
        }
        _group = group;
        _chart._groupName = name;
        _chart.expireCache();
        return _chart;
    };

    /**
     * Get or set an accessor to order ordinal dimensions.  The chart uses
     * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#quicksort_by crossfilter.quicksort.by}
     * to sort elements; this accessor returns the value to order on.
     * @method ordering
     * @memberof dc.baseMixin
     * @instance
     * @see {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#quicksort_by crossfilter.quicksort.by}
     * @example
     * // Default ordering accessor
     * _chart.ordering(dc.pluck('key'));
     * @param {Function} [orderFunction]
     * @returns {Function|dc.baseMixin}
     */
    _chart.ordering = function (orderFunction) {
        if (!arguments.length) {
            return _ordering;
        }
        _ordering = orderFunction;
        _orderSort = crossfilter.quicksort.by(_ordering);
        _chart.expireCache();
        return _chart;
    };

    _chart._computeOrderedGroups = function (data) {
        var dataCopy = data.slice(0);

        if (dataCopy.length <= 1) {
            return dataCopy;
        }

        if (!_orderSort) {
            _orderSort = crossfilter.quicksort.by(_ordering);
        }

        return _orderSort(dataCopy, 0, dataCopy.length);
    };

    /**
     * Clear all filters associated with this chart. The same effect can be achieved by calling
     * {@link dc.baseMixin#filter chart.filter(null)}.
     * @method filterAll
     * @memberof dc.baseMixin
     * @instance
     * @returns {dc.baseMixin}
     */
    _chart.filterAll = function () {
        return _chart.filter(null);
    };

    /**
     * Execute d3 single selection in the chart's scope using the given selector and return the d3
     * selection.
     *
     * This function is **not chainable** since it does not return a chart instance; however the d3
     * selection result can be chained to d3 function calls.
     * @method select
     * @memberof dc.baseMixin
     * @instance
     * @see {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3.select}
     * @example
     * // Has the same effect as d3.select('#chart-id').select(selector)
     * chart.select(selector)
     * @returns {d3.selection}
     */
    _chart.select = function (s) {
        return _root.select(s);
    };

    /**
     * Execute in scope d3 selectAll using the given selector and return d3 selection result.
     *
     * This function is **not chainable** since it does not return a chart instance; however the d3
     * selection result can be chained to d3 function calls.
     * @method selectAll
     * @memberof dc.baseMixin
     * @instance
     * @see {@link https://github.com/d3/d3-selection/blob/master/README.md#selectAll d3.selectAll}
     * @example
     * // Has the same effect as d3.select('#chart-id').selectAll(selector)
     * chart.selectAll(selector)
     * @returns {d3.selection}
     */
    _chart.selectAll = function (s) {
        return _root ? _root.selectAll(s) : null;
    };

    /**
     * Set the root SVGElement to either be an existing chart's root; or any valid [d3 single
     * selector](https://github.com/d3/d3-selection/blob/master/README.md#selecting-elements) specifying a dom
     * block element such as a div; or a dom element or d3 selection. Optionally registers the chart
     * within the chartGroup. This class is called internally on chart initialization, but be called
     * again to relocate the chart. However, it will orphan any previously created SVGElements.
     * @method anchor
     * @memberof dc.baseMixin
     * @instance
     * @param {anchorChart|anchorSelector|anchorNode} [parent]
     * @param {String} [chartGroup]
     * @returns {String|node|d3.selection|dc.baseMixin}
     */
    _chart.anchor = function (parent, chartGroup) {
        if (!arguments.length) {
            return _anchor;
        }
        if (dc.instanceOfChart(parent)) {
            _anchor = parent.anchor();
            _root = parent.root();
            _isChild = true;
        } else if (parent) {
            if (parent.select && parent.classed) { // detect d3 selection
                _anchor = parent.node();
            } else {
                _anchor = parent;
            }
            _root = d3.select(_anchor);
            _root.classed(dc.constants.CHART_CLASS, true);
            dc.registerChart(_chart, chartGroup);
            _isChild = false;
        } else {
            throw new dc.errors.BadArgumentException('parent must be defined');
        }
        _chartGroup = chartGroup;
        return _chart;
    };

    /**
     * Returns the DOM id for the chart's anchored location.
     * @method anchorName
     * @memberof dc.baseMixin
     * @instance
     * @returns {String}
     */
    _chart.anchorName = function () {
        var a = _chart.anchor();
        if (a && a.id) {
            return a.id;
        }
        if (a && a.replace) {
            return a.replace('#', '');
        }
        return 'dc-chart' + _chart.chartID();
    };

    /**
     * Returns the root element where a chart resides. Usually it will be the parent div element where
     * the SVGElement was created. You can also pass in a new root element however this is usually handled by
     * dc internally. Resetting the root element on a chart outside of dc internals may have
     * unexpected consequences.
     * @method root
     * @memberof dc.baseMixin
     * @instance
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement HTMLElement}
     * @param {HTMLElement} [rootElement]
     * @returns {HTMLElement|dc.baseMixin}
     */
    _chart.root = function (rootElement) {
        if (!arguments.length) {
            return _root;
        }
        _root = rootElement;
        return _chart;
    };

    /**
     * Returns the top SVGElement for this specific chart. You can also pass in a new SVGElement,
     * however this is usually handled by dc internally. Resetting the SVGElement on a chart outside
     * of dc internals may have unexpected consequences.
     * @method svg
     * @memberof dc.baseMixin
     * @instance
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGElement SVGElement}
     * @param {SVGElement|d3.selection} [svgElement]
     * @returns {SVGElement|d3.selection|dc.baseMixin}
     */
    _chart.svg = function (svgElement) {
        if (!arguments.length) {
            return _svg;
        }
        _svg = svgElement;
        return _chart;
    };

    /**
     * Remove the chart's SVGElements from the dom and recreate the container SVGElement.
     * @method resetSvg
     * @memberof dc.baseMixin
     * @instance
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGElement SVGElement}
     * @returns {SVGElement}
     */
    _chart.resetSvg = function () {
        _chart.select('svg').remove();
        return generateSvg();
    };

    function sizeSvg () {
        if (_svg) {
            if (!_useViewBoxResizing) {
                _svg
                    .attr('width', _chart.width())
                    .attr('height', _chart.height());
            } else if (!_svg.attr('viewBox')) {
                _svg
                    .attr('viewBox', '0 0 ' + _chart.width() + ' ' + _chart.height());
            }
        }
    }

    function generateSvg () {
        _svg = _chart.root().append('svg');
        sizeSvg();
        return _svg;
    }

    /**
     * Set or get the filter printer function. The filter printer function is used to generate human
     * friendly text for filter value(s) associated with the chart instance. The text will get shown
     * in the `.filter element; see {@link dc.baseMixin#turnOnControls turnOnControls}.
     *
     * By default dc charts use a default filter printer {@link dc.printers.filters dc.printers.filters}
     * that provides simple printing support for both single value and ranged filters.
     * @method filterPrinter
     * @memberof dc.baseMixin
     * @instance
     * @example
     * // for a chart with an ordinal brush, print the filters in upper case
     * chart.filterPrinter(function(filters) {
     *   return filters.map(function(f) { return f.toUpperCase(); }).join(', ');
     * });
     * // for a chart with a range brush, print the filter as start and extent
     * chart.filterPrinter(function(filters) {
     *   return 'start ' + dc.utils.printSingleValue(filters[0][0]) +
     *     ' extent ' + dc.utils.printSingleValue(filters[0][1] - filters[0][0]);
     * });
     * @param {Function} [filterPrinterFunction=dc.printers.filters]
     * @returns {Function|dc.baseMixin}
     */
    _chart.filterPrinter = function (filterPrinterFunction) {
        if (!arguments.length) {
            return _filterPrinter;
        }
        _filterPrinter = filterPrinterFunction;
        return _chart;
    };

    /**
     * If set, use the `visibility` attribute instead of the `display` attribute for showing/hiding
     * chart reset and filter controls, for less disruption to the layout.
     * @method controlsUseVisibility
     * @memberof dc.baseMixin
     * @instance
     * @param {Boolean} [controlsUseVisibility=false]
     * @returns {Boolean|dc.baseMixin}
     **/
    _chart.controlsUseVisibility = function (useVisibility) {
        if (!arguments.length) {
            return _controlsUseVisibility;
        }
        _controlsUseVisibility = useVisibility;
        return _chart;
    };

    /**
     * Turn on optional control elements within the root element. dc currently supports the
     * following html control elements.
     * * root.selectAll('.reset') - elements are turned on if the chart has an active filter. This type
     * of control element is usually used to store a reset link to allow user to reset filter on a
     * certain chart. This element will be turned off automatically if the filter is cleared.
     * * root.selectAll('.filter') elements are turned on if the chart has an active filter. The text
     * content of this element is then replaced with the current filter value using the filter printer
     * function. This type of element will be turned off automatically if the filter is cleared.
     * @method turnOnControls
     * @memberof dc.baseMixin
     * @instance
     * @returns {dc.baseMixin}
     */
    _chart.turnOnControls = function () {
        if (_root) {
            var attribute = _chart.controlsUseVisibility() ? 'visibility' : 'display';
            _chart.selectAll('.reset').style(attribute, null);
            _chart.selectAll('.filter').text(_filterPrinter(_chart.filters())).style(attribute, null);
        }
        return _chart;
    };

    /**
     * Turn off optional control elements within the root element.
     * @method turnOffControls
     * @memberof dc.baseMixin
     * @see {@link dc.baseMixin#turnOnControls turnOnControls}
     * @instance
     * @returns {dc.baseMixin}
     */
    _chart.turnOffControls = function () {
        if (_root) {
            var attribute = _chart.controlsUseVisibility() ? 'visibility' : 'display';
            var value = _chart.controlsUseVisibility() ? 'hidden' : 'none';
            _chart.selectAll('.reset').style(attribute, value);
            _chart.selectAll('.filter').style(attribute, value).text(_chart.filter());
        }
        return _chart;
    };

    /**
     * Set or get the animation transition duration (in milliseconds) for this chart instance.
     * @method transitionDuration
     * @memberof dc.baseMixin
     * @instance
     * @param {Number} [duration=750]
     * @returns {Number|dc.baseMixin}
     */
    _chart.transitionDuration = function (duration) {
        if (!arguments.length) {
            return _transitionDuration;
        }
        _transitionDuration = duration;
        return _chart;
    };

    /**
     * Set or get the animation transition delay (in milliseconds) for this chart instance.
     * @method transitionDelay
     * @memberof dc.baseMixin
     * @instance
     * @param {Number} [delay=0]
     * @returns {Number|dc.baseMixin}
     */
    _chart.transitionDelay = function (delay) {
        if (!arguments.length) {
            return _transitionDelay;
        }
        _transitionDelay = delay;
        return _chart;
    };

    _chart._mandatoryAttributes = function (_) {
        if (!arguments.length) {
            return _mandatoryAttributes;
        }
        _mandatoryAttributes = _;
        return _chart;
    };

    function checkForMandatoryAttributes (a) {
        if (!_chart[a] || !_chart[a]()) {
            throw new dc.errors.InvalidStateException('Mandatory attribute chart.' + a +
                ' is missing on chart[#' + _chart.anchorName() + ']');
        }
    }

    /**
     * Invoking this method will force the chart to re-render everything from scratch. Generally it
     * should only be used to render the chart for the first time on the page or if you want to make
     * sure everything is redrawn from scratch instead of relying on the default incremental redrawing
     * behaviour.
     * @method render
     * @memberof dc.baseMixin
     * @instance
     * @returns {dc.baseMixin}
     */
    _chart.render = function () {
        _height = _width = undefined; // force recalculate
        _listeners.call('preRender', _chart, _chart);

        if (_mandatoryAttributes) {
            _mandatoryAttributes.forEach(checkForMandatoryAttributes);
        }

        var result = _chart._doRender();

        if (_legend) {
            _legend.render();
        }

        _chart._activateRenderlets('postRender');

        return result;
    };

    _chart._activateRenderlets = function (event) {
        _listeners.call('pretransition', _chart, _chart);
        if (_chart.transitionDuration() > 0 && _svg) {
            _svg.transition().duration(_chart.transitionDuration()).delay(_chart.transitionDelay())
                .on('end', function () {
                    _listeners.call('renderlet', _chart, _chart);
                    if (event) {
                        _listeners.call(event, _chart, _chart);
                    }
                });
        } else {
            _listeners.call('renderlet', _chart, _chart);
            if (event) {
                _listeners.call(event, _chart, _chart);
            }
        }
    };

    /**
     * Calling redraw will cause the chart to re-render data changes incrementally. If there is no
     * change in the underlying data dimension then calling this method will have no effect on the
     * chart. Most chart interaction in dc will automatically trigger this method through internal
     * events (in particular {@link dc.redrawAll dc.redrawAll}); therefore, you only need to
     * manually invoke this function if data is manipulated outside of dc's control (for example if
     * data is loaded in the background using
     * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#crossfilter_add crossfilter.add}).
     * @method redraw
     * @memberof dc.baseMixin
     * @instance
     * @returns {dc.baseMixin}
     */
    _chart.redraw = function () {
        sizeSvg();
        _listeners.call('preRedraw', _chart, _chart);

        var result = _chart._doRedraw();

        if (_legend) {
            _legend.render();
        }

        _chart._activateRenderlets('postRedraw');

        return result;
    };

    /**
     * Gets/sets the commit handler. If the chart has a commit handler, the handler will be called when
     * the chart's filters have changed, in order to send the filter data asynchronously to a server.
     *
     * Unlike other functions in dc.js, the commit handler is asynchronous. It takes two arguments:
     * a flag indicating whether this is a render (true) or a redraw (false), and a callback to be
     * triggered once the commit is filtered. The callback has the standard node.js continuation signature
     * with error first and result second.
     * @method commitHandler
     * @memberof dc.baseMixin
     * @instance
     * @returns {dc.baseMixin}
     */
    _chart.commitHandler = function (commitHandler) {
        if (!arguments.length) {
            return _commitHandler;
        }
        _commitHandler = commitHandler;
        return _chart;
    };

    /**
     * Redraws all charts in the same group as this chart, typically in reaction to a filter
     * change. If the chart has a {@link dc.baseMixin.commitFilter commitHandler}, it will
     * be executed and waited for.
     * @method redrawGroup
     * @memberof dc.baseMixin
     * @instance
     * @returns {dc.baseMixin}
     */
    _chart.redrawGroup = function () {
        if (_commitHandler) {
            _commitHandler(false, function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    dc.redrawAll(_chart.chartGroup());
                }
            });
        } else {
            dc.redrawAll(_chart.chartGroup());
        }
        return _chart;
    };

    /**
     * Renders all charts in the same group as this chart. If the chart has a
     * {@link dc.baseMixin.commitFilter commitHandler}, it will be executed and waited for
     * @method renderGroup
     * @memberof dc.baseMixin
     * @instance
     * @returns {dc.baseMixin}
     */
    _chart.renderGroup = function () {
        if (_commitHandler) {
            _commitHandler(false, function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    dc.renderAll(_chart.chartGroup());
                }
            });
        } else {
            dc.renderAll(_chart.chartGroup());
        }
        return _chart;
    };

    _chart._invokeFilteredListener = function (f) {
        if (f !== undefined) {
            _listeners.call('filtered', _chart, _chart, f);
        }
    };

    _chart._invokeZoomedListener = function () {
        _listeners.call('zoomed', _chart, _chart);
    };

    var _hasFilterHandler = function (filters, filter) {
        if (filter === null || typeof(filter) === 'undefined') {
            return filters.length > 0;
        }
        return filters.some(function (f) {
            return filter <= f && filter >= f;
        });
    };

    /**
     * Set or get the has-filter handler. The has-filter handler is a function that checks to see if
     * the chart's current filters (first argument) include a specific filter (second argument).  Using a custom has-filter handler allows
     * you to change the way filters are checked for and replaced.
     * @method hasFilterHandler
     * @memberof dc.baseMixin
     * @instance
     * @example
     * // default has-filter handler
     * chart.hasFilterHandler(function (filters, filter) {
     *     if (filter === null || typeof(filter) === 'undefined') {
     *         return filters.length > 0;
     *     }
     *     return filters.some(function (f) {
     *         return filter <= f && filter >= f;
     *     });
     * });
     *
     * // custom filter handler (no-op)
     * chart.hasFilterHandler(function(filters, filter) {
     *     return false;
     * });
     * @param {Function} [hasFilterHandler]
     * @returns {Function|dc.baseMixin}
     */
    _chart.hasFilterHandler = function (hasFilterHandler) {
        if (!arguments.length) {
            return _hasFilterHandler;
        }
        _hasFilterHandler = hasFilterHandler;
        return _chart;
    };

    /**
     * Check whether any active filter or a specific filter is associated with particular chart instance.
     * This function is **not chainable**.
     * @method hasFilter
     * @memberof dc.baseMixin
     * @instance
     * @see {@link dc.baseMixin#hasFilterHandler hasFilterHandler}
     * @param {*} [filter]
     * @returns {Boolean}
     */
    _chart.hasFilter = function (filter) {
        return _hasFilterHandler(_filters, filter);
    };

    var _removeFilterHandler = function (filters, filter) {
        for (var i = 0; i < filters.length; i++) {
            if (filters[i] <= filter && filters[i] >= filter) {
                filters.splice(i, 1);
                break;
            }
        }
        return filters;
    };

    /**
     * Set or get the remove filter handler. The remove filter handler is a function that removes a
     * filter from the chart's current filters. Using a custom remove filter handler allows you to
     * change how filters are removed or perform additional work when removing a filter, e.g. when
     * using a filter server other than crossfilter.
     *
     * The handler should return a new or modified array as the result.
     * @method removeFilterHandler
     * @memberof dc.baseMixin
     * @instance
     * @example
     * // default remove filter handler
     * chart.removeFilterHandler(function (filters, filter) {
     *     for (var i = 0; i < filters.length; i++) {
     *         if (filters[i] <= filter && filters[i] >= filter) {
     *             filters.splice(i, 1);
     *             break;
     *         }
     *     }
     *     return filters;
     * });
     *
     * // custom filter handler (no-op)
     * chart.removeFilterHandler(function(filters, filter) {
     *     return filters;
     * });
     * @param {Function} [removeFilterHandler]
     * @returns {Function|dc.baseMixin}
     */
    _chart.removeFilterHandler = function (removeFilterHandler) {
        if (!arguments.length) {
            return _removeFilterHandler;
        }
        _removeFilterHandler = removeFilterHandler;
        return _chart;
    };

    var _addFilterHandler = function (filters, filter) {
        filters.push(filter);
        return filters;
    };

    /**
     * Set or get the add filter handler. The add filter handler is a function that adds a filter to
     * the chart's filter list. Using a custom add filter handler allows you to change the way filters
     * are added or perform additional work when adding a filter, e.g. when using a filter server other
     * than crossfilter.
     *
     * The handler should return a new or modified array as the result.
     * @method addFilterHandler
     * @memberof dc.baseMixin
     * @instance
     * @example
     * // default add filter handler
     * chart.addFilterHandler(function (filters, filter) {
     *     filters.push(filter);
     *     return filters;
     * });
     *
     * // custom filter handler (no-op)
     * chart.addFilterHandler(function(filters, filter) {
     *     return filters;
     * });
     * @param {Function} [addFilterHandler]
     * @returns {Function|dc.baseMixin}
     */
    _chart.addFilterHandler = function (addFilterHandler) {
        if (!arguments.length) {
            return _addFilterHandler;
        }
        _addFilterHandler = addFilterHandler;
        return _chart;
    };

    var _resetFilterHandler = function (filters) {
        return [];
    };

    /**
     * Set or get the reset filter handler. The reset filter handler is a function that resets the
     * chart's filter list by returning a new list. Using a custom reset filter handler allows you to
     * change the way filters are reset, or perform additional work when resetting the filters,
     * e.g. when using a filter server other than crossfilter.
     *
     * The handler should return a new or modified array as the result.
     * @method resetFilterHandler
     * @memberof dc.baseMixin
     * @instance
     * @example
     * // default remove filter handler
     * function (filters) {
     *     return [];
     * }
     *
     * // custom filter handler (no-op)
     * chart.resetFilterHandler(function(filters) {
     *     return filters;
     * });
     * @param {Function} [resetFilterHandler]
     * @returns {dc.baseMixin}
     */
    _chart.resetFilterHandler = function (resetFilterHandler) {
        if (!arguments.length) {
            return _resetFilterHandler;
        }
        _resetFilterHandler = resetFilterHandler;
        return _chart;
    };

    function applyFilters (filters) {
        if (_chart.dimension() && _chart.dimension().filter) {
            var fs = _filterHandler(_chart.dimension(), filters);
            if (fs) {
                filters = fs;
            }
        }
        return filters;
    }

    /**
     * Replace the chart filter. This is equivalent to calling `chart.filter(null).filter(filter)`
     * but more efficient because the filter is only applied once.
     *
     * @method replaceFilter
     * @memberof dc.baseMixin
     * @instance
     * @param {*} [filter]
     * @returns {dc.baseMixin}
     **/
    _chart.replaceFilter = function (filter) {
        _filters = _resetFilterHandler(_filters);
        _chart.filter(filter);
        return _chart;
    };

    /**
     * Filter the chart by the given parameter, or return the current filter if no input parameter
     * is given.
     *
     * The filter parameter can take one of these forms:
     * * A single value: the value will be toggled (added if it is not present in the current
     * filters, removed if it is present)
     * * An array containing a single array of values (`[[value,value,value]]`): each value is
     * toggled
     * * When appropriate for the chart, a {@link dc.filters dc filter object} such as
     *   * {@link dc.filters.RangedFilter `dc.filters.RangedFilter`} for the
     * {@link dc.coordinateGridMixin dc.coordinateGridMixin} charts
     *   * {@link dc.filters.TwoDimensionalFilter `dc.filters.TwoDimensionalFilter`} for the
     * {@link dc.heatMap heat map}
     *   * {@link dc.filters.RangedTwoDimensionalFilter `dc.filters.RangedTwoDimensionalFilter`}
     * for the {@link dc.scatterPlot scatter plot}
     * * `null`: the filter will be reset using the
     * {@link dc.baseMixin#resetFilterHandler resetFilterHandler}
     *
     * Note that this is always a toggle (even when it doesn't make sense for the filter type). If
     * you wish to replace the current filter, either call `chart.filter(null)` first - or it's more
     * efficient to call {@link dc.baseMixin#replaceFilter `chart.replaceFilter(filter)`} instead.
     *
     * Each toggle is executed by checking if the value is already present using the
     * {@link dc.baseMixin#hasFilterHandler hasFilterHandler}; if it is not present, it is added
     * using the {@link dc.baseMixin#addFilterHandler addFilterHandler}; if it is already present,
     * it is removed using the {@link dc.baseMixin#removeFilterHandler removeFilterHandler}.
     *
     * Once the filters array has been updated, the filters are applied to the
     * crossfilter dimension, using the {@link dc.baseMixin#filterHandler filterHandler}.
     *
     * Once you have set the filters, call {@link dc.baseMixin#redrawGroup `chart.redrawGroup()`}
     * (or {@link dc.redrawAll `dc.redrawAll()`}) to redraw the chart's group.
     * @method filter
     * @memberof dc.baseMixin
     * @instance
     * @see {@link dc.baseMixin#addFilterHandler addFilterHandler}
     * @see {@link dc.baseMixin#removeFilterHandler removeFilterHandler}
     * @see {@link dc.baseMixin#resetFilterHandler resetFilterHandler}
     * @see {@link dc.baseMixin#filterHandler filterHandler}
     * @example
     * // filter by a single string
     * chart.filter('Sunday');
     * // filter by a single age
     * chart.filter(18);
     * // filter by a set of states
     * chart.filter([['MA', 'TX', 'ND', 'WA']]);
     * // filter by range -- note the use of dc.filters.RangedFilter, which is different
     * // from the syntax for filtering a crossfilter dimension directly, dimension.filter([15,20])
     * chart.filter(dc.filters.RangedFilter(15,20));
     * @param {*} [filter]
     * @returns {dc.baseMixin}
     */
    _chart.filter = function (filter) {
        if (!arguments.length) {
            return _filters.length > 0 ? _filters[0] : null;
        }
        var filters = _filters;
        if (filter instanceof Array && filter[0] instanceof Array && !filter.isFiltered) {
            // toggle each filter
            filter[0].forEach(function (f) {
                if (_hasFilterHandler(filters, f)) {
                    filters = _removeFilterHandler(filters, f);
                } else {
                    filters = _addFilterHandler(filters, f);
                }
            });
        } else if (filter === null) {
            filters = _resetFilterHandler(filters);
        } else {
            if (_hasFilterHandler(filters, filter)) {
                filters = _removeFilterHandler(filters, filter);
            } else {
                filters = _addFilterHandler(filters, filter);
            }
        }
        _filters = applyFilters(filters);
        _chart._invokeFilteredListener(filter);

        if (_root !== null && _chart.hasFilter()) {
            _chart.turnOnControls();
        } else {
            _chart.turnOffControls();
        }

        return _chart;
    };

    /**
     * Returns all current filters. This method does not perform defensive cloning of the internal
     * filter array before returning, therefore any modification of the returned array will effect the
     * chart's internal filter storage.
     * @method filters
     * @memberof dc.baseMixin
     * @instance
     * @returns {Array<*>}
     */
    _chart.filters = function () {
        return _filters;
    };

    _chart.highlightSelected = function (e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, true);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, false);
    };

    _chart.fadeDeselected = function (e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, false);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, true);
    };

    _chart.resetHighlight = function (e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, false);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, false);
    };

    /**
     * This function is passed to d3 as the onClick handler for each chart. The default behavior is to
     * filter on the clicked datum (passed to the callback) and redraw the chart group.
     * @method onClick
     * @memberof dc.baseMixin
     * @instance
     * @param {*} datum
     */
    _chart.onClick = function (datum) {
        var filter = _chart.keyAccessor()(datum);
        dc.events.trigger(function () {
            _chart.filter(filter);
            _chart.redrawGroup();
        });
    };

    /**
     * Set or get the filter handler. The filter handler is a function that performs the filter action
     * on a specific dimension. Using a custom filter handler allows you to perform additional logic
     * before or after filtering.
     * @method filterHandler
     * @memberof dc.baseMixin
     * @instance
     * @see {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension_filter crossfilter.dimension.filter}
     * @example
     * // the default filter handler handles all possible cases for the charts in dc.js
     * // you can replace it with something more specialized for your own chart
     * chart.filterHandler(function (dimension, filters) {
     *     if (filters.length === 0) {
     *         // the empty case (no filtering)
     *         dimension.filter(null);
     *     } else if (filters.length === 1 && !filters[0].isFiltered) {
     *         // single value and not a function-based filter
     *         dimension.filterExact(filters[0]);
     *     } else if (filters.length === 1 && filters[0].filterType === 'RangedFilter') {
     *         // single range-based filter
     *         dimension.filterRange(filters[0]);
     *     } else {
     *         // an array of values, or an array of filter objects
     *         dimension.filterFunction(function (d) {
     *             for (var i = 0; i < filters.length; i++) {
     *                 var filter = filters[i];
     *                 if (filter.isFiltered && filter.isFiltered(d)) {
     *                     return true;
     *                 } else if (filter <= d && filter >= d) {
     *                     return true;
     *                 }
     *             }
     *             return false;
     *         });
     *     }
     *     return filters;
     * });
     *
     * // custom filter handler
     * chart.filterHandler(function(dimension, filter){
     *     var newFilter = filter + 10;
     *     dimension.filter(newFilter);
     *     return newFilter; // set the actual filter value to the new value
     * });
     * @param {Function} [filterHandler]
     * @returns {Function|dc.baseMixin}
     */
    _chart.filterHandler = function (filterHandler) {
        if (!arguments.length) {
            return _filterHandler;
        }
        _filterHandler = filterHandler;
        return _chart;
    };

    // abstract function stub
    _chart._doRender = function () {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    _chart._doRedraw = function () {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    _chart.legendables = function () {
        // do nothing in base, should be overridden by sub-function
        return [];
    };

    _chart.legendHighlight = function () {
        // do nothing in base, should be overridden by sub-function
    };

    _chart.legendReset = function () {
        // do nothing in base, should be overridden by sub-function
    };

    _chart.legendToggle = function () {
        // do nothing in base, should be overriden by sub-function
    };

    _chart.isLegendableHidden = function () {
        // do nothing in base, should be overridden by sub-function
        return false;
    };

    /**
     * Set or get the key accessor function. The key accessor function is used to retrieve the key
     * value from the crossfilter group. Key values are used differently in different charts, for
     * example keys correspond to slices in a pie chart and x axis positions in a grid coordinate chart.
     * @method keyAccessor
     * @memberof dc.baseMixin
     * @instance
     * @example
     * // default key accessor
     * chart.keyAccessor(function(d) { return d.key; });
     * // custom key accessor for a multi-value crossfilter reduction
     * chart.keyAccessor(function(p) { return p.value.absGain; });
     * @param {Function} [keyAccessor]
     * @returns {Function|dc.baseMixin}
     */
    _chart.keyAccessor = function (keyAccessor) {
        if (!arguments.length) {
            return _keyAccessor;
        }
        _keyAccessor = keyAccessor;
        return _chart;
    };

    /**
     * Set or get the value accessor function. The value accessor function is used to retrieve the
     * value from the crossfilter group. Group values are used differently in different charts, for
     * example values correspond to slice sizes in a pie chart and y axis positions in a grid
     * coordinate chart.
     * @method valueAccessor
     * @memberof dc.baseMixin
     * @instance
     * @example
     * // default value accessor
     * chart.valueAccessor(function(d) { return d.value; });
     * // custom value accessor for a multi-value crossfilter reduction
     * chart.valueAccessor(function(p) { return p.value.percentageGain; });
     * @param {Function} [valueAccessor]
     * @returns {Function|dc.baseMixin}
     */
    _chart.valueAccessor = function (valueAccessor) {
        if (!arguments.length) {
            return _valueAccessor;
        }
        _valueAccessor = valueAccessor;
        return _chart;
    };

    /**
     * Set or get the label function. The chart class will use this function to render labels for each
     * child element in the chart, e.g. slices in a pie chart or bubbles in a bubble chart. Not every
     * chart supports the label function, for example line chart does not use this function
     * at all. By default, enables labels; pass false for the second parameter if this is not desired.
     * @method label
     * @memberof dc.baseMixin
     * @instance
     * @example
     * // default label function just return the key
     * chart.label(function(d) { return d.key; });
     * // label function has access to the standard d3 data binding and can get quite complicated
     * chart.label(function(d) { return d.data.key + '(' + Math.floor(d.data.value / all.value() * 100) + '%)'; });
     * @param {Function} [labelFunction]
     * @param {Boolean} [enableLabels=true]
     * @returns {Function|dc.baseMixin}
     */
    _chart.label = function (labelFunction, enableLabels) {
        if (!arguments.length) {
            return _label;
        }
        _label = labelFunction;
        if ((enableLabels === undefined) || enableLabels) {
            _renderLabel = true;
        }
        return _chart;
    };

    /**
     * Turn on/off label rendering
     * @method renderLabel
     * @memberof dc.baseMixin
     * @instance
     * @param {Boolean} [renderLabel=false]
     * @returns {Boolean|dc.baseMixin}
     */
    _chart.renderLabel = function (renderLabel) {
        if (!arguments.length) {
            return _renderLabel;
        }
        _renderLabel = renderLabel;
        return _chart;
    };

    /**
     * Set or get the title function. The chart class will use this function to render the SVGElement title
     * (usually interpreted by browser as tooltips) for each child element in the chart, e.g. a slice
     * in a pie chart or a bubble in a bubble chart. Almost every chart supports the title function;
     * however in grid coordinate charts you need to turn off the brush in order to see titles, because
     * otherwise the brush layer will block tooltip triggering.
     * @method title
     * @memberof dc.baseMixin
     * @instance
     * @example
     * // default title function shows "key: value"
     * chart.title(function(d) { return d.key + ': ' + d.value; });
     * // title function has access to the standard d3 data binding and can get quite complicated
     * chart.title(function(p) {
     *    return p.key.getFullYear()
     *        + '\n'
     *        + 'Index Gain: ' + numberFormat(p.value.absGain) + '\n'
     *        + 'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%\n'
     *        + 'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage) + '%';
     * });
     * @param {Function} [titleFunction]
     * @returns {Function|dc.baseMixin}
     */
    _chart.title = function (titleFunction) {
        if (!arguments.length) {
            return _title;
        }
        _title = titleFunction;
        return _chart;
    };

    /**
     * Turn on/off title rendering, or return the state of the render title flag if no arguments are
     * given.
     * @method renderTitle
     * @memberof dc.baseMixin
     * @instance
     * @param {Boolean} [renderTitle=true]
     * @returns {Boolean|dc.baseMixin}
     */
    _chart.renderTitle = function (renderTitle) {
        if (!arguments.length) {
            return _renderTitle;
        }
        _renderTitle = renderTitle;
        return _chart;
    };

    /**
     * A renderlet is similar to an event listener on rendering event. Multiple renderlets can be added
     * to an individual chart.  Each time a chart is rerendered or redrawn the renderlets are invoked
     * right after the chart finishes its transitions, giving you a way to modify the SVGElements.
     * Renderlet functions take the chart instance as the only input parameter and you can
     * use the dc API or use raw d3 to achieve pretty much any effect.
     *
     * Use {@link dc.baseMixin#on on} with a 'renderlet' prefix.
     * Generates a random key for the renderlet, which makes it hard to remove.
     * @method renderlet
     * @memberof dc.baseMixin
     * @instance
     * @deprecated
     * @example
     * // do this instead of .renderlet(function(chart) { ... })
     * chart.on("renderlet", function(chart){
     *     // mix of dc API and d3 manipulation
     *     chart.select('g.y').style('display', 'none');
     *     // its a closure so you can also access other chart variable available in the closure scope
     *     moveChart.filter(chart.filter());
     * });
     * @param {Function} renderletFunction
     * @returns {dc.baseMixin}
     */
    _chart.renderlet = dc.logger.deprecate(function (renderletFunction) {
        _chart.on('renderlet.' + dc.utils.uniqueId(), renderletFunction);
        return _chart;
    }, 'chart.renderlet has been deprecated.  Please use chart.on("renderlet.<renderletKey>", renderletFunction)');

    /**
     * Get or set the chart group to which this chart belongs. Chart groups are rendered or redrawn
     * together since it is expected they share the same underlying crossfilter data set.
     * @method chartGroup
     * @memberof dc.baseMixin
     * @instance
     * @param {String} [chartGroup]
     * @returns {String|dc.baseMixin}
     */
    _chart.chartGroup = function (chartGroup) {
        if (!arguments.length) {
            return _chartGroup;
        }
        if (!_isChild) {
            dc.deregisterChart(_chart, _chartGroup);
        }
        _chartGroup = chartGroup;
        if (!_isChild) {
            dc.registerChart(_chart, _chartGroup);
        }
        return _chart;
    };

    /**
     * Expire the internal chart cache. dc charts cache some data internally on a per chart basis to
     * speed up rendering and avoid unnecessary calculation; however it might be useful to clear the
     * cache if you have changed state which will affect rendering.  For example, if you invoke
     * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#crossfilter_add crossfilter.add}
     * function or reset group or dimension after rendering, it is a good idea to
     * clear the cache to make sure charts are rendered properly.
     * @method expireCache
     * @memberof dc.baseMixin
     * @instance
     * @returns {dc.baseMixin}
     */
    _chart.expireCache = function () {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    /**
     * Attach a dc.legend widget to this chart. The legend widget will automatically draw legend labels
     * based on the color setting and names associated with each group.
     * @method legend
     * @memberof dc.baseMixin
     * @instance
     * @example
     * chart.legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
     * @param {dc.legend} [legend]
     * @returns {dc.legend|dc.baseMixin}
     */
    _chart.legend = function (legend) {
        if (!arguments.length) {
            return _legend;
        }
        _legend = legend;
        _legend.parent(_chart);
        return _chart;
    };

    /**
     * Returns the internal numeric ID of the chart.
     * @method chartID
     * @memberof dc.baseMixin
     * @instance
     * @returns {String}
     */
    _chart.chartID = function () {
        return _chart.__dcFlag__;
    };

    /**
     * Set chart options using a configuration object. Each key in the object will cause the method of
     * the same name to be called with the value to set that attribute for the chart.
     * @method options
     * @memberof dc.baseMixin
     * @instance
     * @example
     * chart.options({dimension: myDimension, group: myGroup});
     * @param {{}} opts
     * @returns {dc.baseMixin}
     */
    _chart.options = function (opts) {
        var applyOptions = [
            'anchor',
            'group',
            'xAxisLabel',
            'yAxisLabel',
            'stack',
            'title',
            'point',
            'getColor',
            'overlayGeoJson'
        ];

        for (var o in opts) {
            if (typeof(_chart[o]) === 'function') {
                if (opts[o] instanceof Array && applyOptions.indexOf(o) !== -1) {
                    _chart[o].apply(_chart, opts[o]);
                } else {
                    _chart[o].call(_chart, opts[o]);
                }
            } else {
                dc.logger.debug('Not a valid option setter name: ' + o);
            }
        }
        return _chart;
    };

    /**
     * All dc chart instance supports the following listeners.
     * Supports the following events:
     * * `renderlet` - This listener function will be invoked after transitions after redraw and render. Replaces the
     * deprecated {@link dc.baseMixin#renderlet renderlet} method.
     * * `pretransition` - Like `.on('renderlet', ...)` but the event is fired before transitions start.
     * * `preRender` - This listener function will be invoked before chart rendering.
     * * `postRender` - This listener function will be invoked after chart finish rendering including
     * all renderlets' logic.
     * * `preRedraw` - This listener function will be invoked before chart redrawing.
     * * `postRedraw` - This listener function will be invoked after chart finish redrawing
     * including all renderlets' logic.
     * * `filtered` - This listener function will be invoked after a filter is applied, added or removed.
     * * `zoomed` - This listener function will be invoked after a zoom is triggered.
     * @method on
     * @memberof dc.baseMixin
     * @instance
     * @see {@link https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch_on d3.dispatch.on}
     * @example
     * .on('renderlet', function(chart, filter){...})
     * .on('pretransition', function(chart, filter){...})
     * .on('preRender', function(chart){...})
     * .on('postRender', function(chart){...})
     * .on('preRedraw', function(chart){...})
     * .on('postRedraw', function(chart){...})
     * .on('filtered', function(chart, filter){...})
     * .on('zoomed', function(chart, filter){...})
     * @param {String} event
     * @param {Function} listener
     * @returns {dc.baseMixin}
     */
    _chart.on = function (event, listener) {
        _listeners.on(event, listener);
        return _chart;
    };

    return _chart;
};

/**
 * Margin is a mixin that provides margin utility functions for both the Row Chart and Coordinate Grid
 * Charts.
 * @name marginMixin
 * @memberof dc
 * @mixin
 * @param {Object} _chart
 * @returns {dc.marginMixin}
 */
dc.marginMixin = function (_chart) {
    var _margin = {top: 10, right: 50, bottom: 30, left: 30};

    /**
     * Get or set the margins for a particular coordinate grid chart instance. The margins is stored as
     * an associative Javascript array.
     * @method margins
     * @memberof dc.marginMixin
     * @instance
     * @example
     * var leftMargin = chart.margins().left; // 30 by default
     * chart.margins().left = 50;
     * leftMargin = chart.margins().left; // now 50
     * @param {{top: Number, right: Number, left: Number, bottom: Number}} [margins={top: 10, right: 50, bottom: 30, left: 30}]
     * @returns {{top: Number, right: Number, left: Number, bottom: Number}|dc.marginMixin}
     */
    _chart.margins = function (margins) {
        if (!arguments.length) {
            return _margin;
        }
        _margin = margins;
        return _chart;
    };

    _chart.effectiveWidth = function () {
        return _chart.width() - _chart.margins().left - _chart.margins().right;
    };

    _chart.effectiveHeight = function () {
        return _chart.height() - _chart.margins().top - _chart.margins().bottom;
    };

    return _chart;
};

/**
 * The Color Mixin is an abstract chart functional class providing universal coloring support
 * as a mix-in for any concrete chart implementation.
 * @name colorMixin
 * @memberof dc
 * @mixin
 * @param {Object} _chart
 * @returns {dc.colorMixin}
 */
dc.colorMixin = function (_chart) {
    var _colors = d3.scaleOrdinal(dc.config.defaultColors());
    var _defaultAccessor = true;

    var _colorAccessor = function (d) { return _chart.keyAccessor()(d); };

    /**
     * Retrieve current color scale or set a new color scale. This methods accepts any function that
     * operates like a d3 scale.
     * @method colors
     * @memberof dc.colorMixin
     * @instance
     * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
     * @example
     * // alternate categorical scale
     * chart.colors(d3.scale.category20b());
     * // ordinal scale
     * chart.colors(d3.scaleOrdinal().range(['red','green','blue']));
     * // convenience method, the same as above
     * chart.ordinalColors(['red','green','blue']);
     * // set a linear scale
     * chart.linearColors(["#4575b4", "#ffffbf", "#a50026"]);
     * @param {d3.scale} [colorScale=d3.scaleOrdinal(d3.schemeCategory20c)]
     * @returns {d3.scale|dc.colorMixin}
     */
    _chart.colors = function (colorScale) {
        if (!arguments.length) {
            return _colors;
        }
        if (colorScale instanceof Array) {
            _colors = d3.scaleQuantize().range(colorScale); // deprecated legacy support, note: this fails for ordinal domains
        } else {
            _colors = typeof colorScale === 'function' ? colorScale : dc.utils.constant(colorScale);
        }
        return _chart;
    };

    /**
     * Convenience method to set the color scale to
     * {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales d3.scaleOrdinal} with
     * range `r`.
     * @method ordinalColors
     * @memberof dc.colorMixin
     * @instance
     * @param {Array<String>} r
     * @returns {dc.colorMixin}
     */
    _chart.ordinalColors = function (r) {
        return _chart.colors(d3.scaleOrdinal().range(r));
    };

    /**
     * Convenience method to set the color scale to an Hcl interpolated linear scale with range `r`.
     * @method linearColors
     * @memberof dc.colorMixin
     * @instance
     * @param {Array<Number>} r
     * @returns {dc.colorMixin}
     */
    _chart.linearColors = function (r) {
        return _chart.colors(d3.scaleLinear()
                             .range(r)
                             .interpolate(d3.interpolateHcl));
    };

    /**
     * Set or the get color accessor function. This function will be used to map a data point in a
     * crossfilter group to a color value on the color scale. The default function uses the key
     * accessor.
     * @method colorAccessor
     * @memberof dc.colorMixin
     * @instance
     * @example
     * // default index based color accessor
     * .colorAccessor(function (d, i){return i;})
     * // color accessor for a multi-value crossfilter reduction
     * .colorAccessor(function (d){return d.value.absGain;})
     * @param {Function} [colorAccessor]
     * @returns {Function|dc.colorMixin}
     */
    _chart.colorAccessor = function (colorAccessor) {
        if (!arguments.length) {
            return _colorAccessor;
        }
        _colorAccessor = colorAccessor;
        _defaultAccessor = false;
        return _chart;
    };

    // what is this?
    _chart.defaultColorAccessor = function () {
        return _defaultAccessor;
    };

    /**
     * Set or get the current domain for the color mapping function. The domain must be supplied as an
     * array.
     *
     * Note: previously this method accepted a callback function. Instead you may use a custom scale
     * set by {@link dc.colorMixin#colors .colors}.
     * @method colorDomain
     * @memberof dc.colorMixin
     * @instance
     * @param {Array<String>} [domain]
     * @returns {Array<String>|dc.colorMixin}
     */
    _chart.colorDomain = function (domain) {
        if (!arguments.length) {
            return _colors.domain();
        }
        _colors.domain(domain);
        return _chart;
    };

    /**
     * Set the domain by determining the min and max values as retrieved by
     * {@link dc.colorMixin#colorAccessor .colorAccessor} over the chart's dataset.
     * @method calculateColorDomain
     * @memberof dc.colorMixin
     * @instance
     * @returns {dc.colorMixin}
     */
    _chart.calculateColorDomain = function () {
        var newDomain = [d3.min(_chart.data(), _chart.colorAccessor()),
                         d3.max(_chart.data(), _chart.colorAccessor())];
        _colors.domain(newDomain);
        return _chart;
    };

    /**
     * Get the color for the datum d and counter i. This is used internally by charts to retrieve a color.
     * @method getColor
     * @memberof dc.colorMixin
     * @instance
     * @param {*} d
     * @param {Number} [i]
     * @returns {String}
     */
    _chart.getColor = function (d, i) {
        return _colors(_colorAccessor.call(this, d, i));
    };

    /**
     * **Deprecated.** Get/set the color calculator. This actually replaces the
     * {@link dc.colorMixin#getColor getColor} method!
     *
     * This is not recommended, since using a {@link dc.colorMixin#colorAccessor colorAccessor} and
     * color scale ({@link dc.colorMixin#colors .colors}) is more powerful and idiomatic d3.
     * @method colorCalculator
     * @memberof dc.colorMixin
     * @instance
     * @param {*} [colorCalculator]
     * @returns {Function|dc.colorMixin}
     */
    _chart.colorCalculator = dc.logger.deprecate(function (colorCalculator) {
        if (!arguments.length) {
            return _chart.getColor;
        }
        _chart.getColor = colorCalculator;
        return _chart;
    }, 'colorMixin.colorCalculator has been deprecated. Please colorMixin.colors and colorMixin.colorAccessor instead');

    return _chart;
};

/**
 * Coordinate Grid is an abstract base chart designed to support a number of coordinate grid based
 * concrete chart types, e.g. bar chart, line chart, and bubble chart.
 * @name coordinateGridMixin
 * @memberof dc
 * @mixin
 * @mixes dc.colorMixin
 * @mixes dc.marginMixin
 * @mixes dc.baseMixin
 * @param {Object} _chart
 * @returns {dc.coordinateGridMixin}
 */
dc.coordinateGridMixin = function (_chart) {
    var GRID_LINE_CLASS = 'grid-line';
    var HORIZONTAL_CLASS = 'horizontal';
    var VERTICAL_CLASS = 'vertical';
    var Y_AXIS_LABEL_CLASS = 'y-axis-label';
    var X_AXIS_LABEL_CLASS = 'x-axis-label';
    var CUSTOM_BRUSH_HANDLE_CLASS = 'custom-brush-handle';
    var DEFAULT_AXIS_LABEL_PADDING = 12;

    _chart = dc.colorMixin(dc.marginMixin(dc.baseMixin(_chart)));

    _chart.colors(d3.scaleOrdinal(d3.schemeCategory10));
    _chart._mandatoryAttributes().push('x');
    var _parent;
    var _g;
    var _chartBodyG;

    var _x;
    var _origX; // Will hold orginial scale in case of zoom
    var _xOriginalDomain;
    var _xAxis = d3.axisBottom();
    var _xUnits = dc.units.integers;
    var _xAxisPadding = 0;
    var _xAxisPaddingUnit = d3.timeDay;
    var _xElasticity = false;
    var _xAxisLabel;
    var _xAxisLabelPadding = 0;
    var _lastXDomain;

    var _y;
    var _yAxis = null;
    var _yAxisPadding = 0;
    var _yElasticity = false;
    var _yAxisLabel;
    var _yAxisLabelPadding = 0;

    var _brush = d3.brushX();
    var _gBrush;
    var _brushOn = true;
    var _parentBrushOn = false;
    var _round;

    var _renderHorizontalGridLine = false;
    var _renderVerticalGridLine = false;

    var _resizing = false;
    var _unitCount;

    var _zoomScale = [1, Infinity];
    var _zoomOutRestrict = true;

    var _zoom = d3.zoom().on('zoom', onZoom);
    var _nullZoom = d3.zoom().on('zoom', null);
    var _hasBeenMouseZoomable = false;

    var _rangeChart;
    var _focusChart;

    var _mouseZoomable = false;
    var _clipPadding = 0;

    var _outerRangeBandPadding = 0.5;
    var _rangeBandPadding = 0;

    var _useRightYAxis = false;

    /**
     * When changing the domain of the x or y scale, it is necessary to tell the chart to recalculate
     * and redraw the axes. (`.rescale()` is called automatically when the x or y scale is replaced
     * with {@link dc.coordinateGridMixin+x .x()} or {@link dc.coordinateGridMixin#y .y()}, and has
     * no effect on elastic scales.)
     * @method rescale
     * @memberof dc.coordinateGridMixin
     * @instance
     * @returns {dc.coordinateGridMixin}
     */
    _chart.rescale = function () {
        _unitCount = undefined;
        _resizing = true;
        return _chart;
    };

    _chart.resizing = function () {
        return _resizing;
    };

    /**
     * Get or set the range selection chart associated with this instance. Setting the range selection
     * chart using this function will automatically update its selection brush when the current chart
     * zooms in. In return the given range chart will also automatically attach this chart as its focus
     * chart hence zoom in when range brush updates.
     *
     * Usually the range and focus charts will share a dimension. The range chart will set the zoom
     * boundaries for the focus chart, so its dimension values must be compatible with the domain of
     * the focus chart.
     *
     * See the [Nasdaq 100 Index](http://dc-js.github.com/dc.js/) example for this effect in action.
     * @method rangeChart
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {dc.coordinateGridMixin} [rangeChart]
     * @returns {dc.coordinateGridMixin}
     */
    _chart.rangeChart = function (rangeChart) {
        if (!arguments.length) {
            return _rangeChart;
        }
        _rangeChart = rangeChart;
        _rangeChart.focusChart(_chart);
        return _chart;
    };

    /**
     * Get or set the scale extent for mouse zooms.
     * @method zoomScale
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Array<Number|Date>} [extent=[1, Infinity]]
     * @returns {Array<Number|Date>|dc.coordinateGridMixin}
     */
    _chart.zoomScale = function (extent) {
        if (!arguments.length) {
            return _zoomScale;
        }
        _zoomScale = extent;
        return _chart;
    };

    /**
     * Get or set the zoom restriction for the chart. If true limits the zoom to origional domain of the chart.
     * @method zoomOutRestrict
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Boolean} [zoomOutRestrict=true]
     * @returns {Boolean|dc.coordinateGridMixin}
     */
    _chart.zoomOutRestrict = function (zoomOutRestrict) {
        if (!arguments.length) {
            return _zoomOutRestrict;
        }
        _zoomOutRestrict = zoomOutRestrict;
        return _chart;
    };

    _chart._generateG = function (parent) {
        if (parent === undefined) {
            _parent = _chart.svg();
        } else {
            _parent = parent;
        }

        var href = window.location.href.split('#')[0];

        _g = _parent.append('g');

        _chartBodyG = _g.append('g').attr('class', 'chart-body')
            .attr('transform', 'translate(' + _chart.margins().left + ', ' + _chart.margins().top + ')')
            .attr('clip-path', 'url(' + href + '#' + getClipPathId() + ')');

        return _g;
    };

    /**
     * Get or set the root g element. This method is usually used to retrieve the g element in order to
     * overlay custom svg drawing programatically. **Caution**: The root g element is usually generated
     * by dc.js internals, and resetting it might produce unpredictable result.
     * @method g
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {SVGElement} [gElement]
     * @returns {SVGElement|dc.coordinateGridMixin}
     */
    _chart.g = function (gElement) {
        if (!arguments.length) {
            return _g;
        }
        _g = gElement;
        return _chart;
    };

    /**
     * Set or get mouse zoom capability flag (default: false). When turned on the chart will be
     * zoomable using the mouse wheel. If the range selector chart is attached zooming will also update
     * the range selection brush on the associated range selector chart.
     * @method mouseZoomable
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Boolean} [mouseZoomable=false]
     * @returns {Boolean|dc.coordinateGridMixin}
     */
    _chart.mouseZoomable = function (mouseZoomable) {
        if (!arguments.length) {
            return _mouseZoomable;
        }
        _mouseZoomable = mouseZoomable;
        return _chart;
    };

    /**
     * Retrieve the svg group for the chart body.
     * @method chartBodyG
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {SVGElement} [chartBodyG]
     * @returns {SVGElement}
     */
    _chart.chartBodyG = function (chartBodyG) {
        if (!arguments.length) {
            return _chartBodyG;
        }
        _chartBodyG = chartBodyG;
        return _chart;
    };

    /**
     * **mandatory**
     *
     * Get or set the x scale. The x scale can be any d3
     * {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale} or
     * {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales ordinal scale}
     * @method x
     * @memberof dc.coordinateGridMixin
     * @instance
     * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
     * @example
     * // set x to a linear scale
     * chart.x(d3.scaleLinear().domain([-2500, 2500]))
     * // set x to a time scale to generate histogram
     * chart.x(d3.scaleTime().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
     * @param {d3.scale} [xScale]
     * @returns {d3.scale|dc.coordinateGridMixin}
     */
    _chart.x = function (xScale) {
        if (!arguments.length) {
            return _x;
        }
        _x = xScale;
        _xOriginalDomain = _x.domain();
        _chart.rescale();
        return _chart;
    };

    _chart.xOriginalDomain = function () {
        return _xOriginalDomain;
    };

    /**
     * Set or get the xUnits function. The coordinate grid chart uses the xUnits function to calculate
     * the number of data projections on the x axis such as the number of bars for a bar chart or the
     * number of dots for a line chart.
     *
     * This function is expected to return a Javascript array of all data points on the x axis, or
     * the number of points on the axis. d3 time range functions [d3.timeDays, d3.timeMonths, and
     * d3.timeYears](https://github.com/d3/d3-time/blob/master/README.md#intervals) are all valid
     * xUnits functions.
     *
     * dc.js also provides a few units function, see the {@link dc.units Units Namespace} for
     * a list of built-in units functions.
     *
     * Note that as of dc.js 3.0, `dc.units.ordinal` is not a real function, because it is not
     * possible to define this function compliant with the d3 range functions. It was already a
     * magic value which caused charts to behave differently, and now it is completely so.
     * @method xUnits
     * @memberof dc.coordinateGridMixin
     * @instance
     * @example
     * // set x units to count days
     * chart.xUnits(d3.timeDays);
     * // set x units to count months
     * chart.xUnits(d3.timeMonths);
     *
     * // A custom xUnits function can be used as long as it follows the following interface:
     * // units in integer
     * function(start, end) {
     *      // simply calculates how many integers in the domain
     *      return Math.abs(end - start);
     * }
     *
     * // fixed units
     * function(start, end) {
     *      // be aware using fixed units will disable the focus/zoom ability on the chart
     *      return 1000;
     * }
     * @param {Function} [xUnits=dc.units.integers]
     * @returns {Function|dc.coordinateGridMixin}
     */
    _chart.xUnits = function (xUnits) {
        if (!arguments.length) {
            return _xUnits;
        }
        _xUnits = xUnits;
        return _chart;
    };

    /**
     * Set or get the x axis used by a particular coordinate grid chart instance. This function is most
     * useful when x axis customization is required. The x axis in dc.js is an instance of a
     * {@link https://github.com/d3/d3-axis/blob/master/README.md#axisBottom d3 bottom axis object};
     * therefore it supports any valid d3 axisBottom manipulation.
     *
     * **Caution**: The x axis is usually generated internally by dc; resetting it may cause
     * unexpected results. Note also that when used as a getter, this function is not chainable:
     * it returns the axis, not the chart,
     * {@link https://github.com/dc-js/dc.js/wiki/FAQ#why-does-everything-break-after-a-call-to-xaxis-or-yaxis
     * so attempting to call chart functions after calling `.xAxis()` will fail}.
     * @method xAxis
     * @memberof dc.coordinateGridMixin
     * @instance
     * @see {@link https://github.com/d3/d3-axis/blob/master/README.md#axisBottom d3.axisBottom}
     * @example
     * // customize x axis tick format
     * chart.xAxis().tickFormat(function(v) {return v + '%';});
     * // customize x axis tick values
     * chart.xAxis().tickValues([0, 100, 200, 300]);
     * @param {d3.axis} [xAxis=d3.axisBottom()]
     * @returns {d3.axis|dc.coordinateGridMixin}
     */
    _chart.xAxis = function (xAxis) {
        if (!arguments.length) {
            return _xAxis;
        }
        _xAxis = xAxis;
        return _chart;
    };

    /**
     * Turn on/off elastic x axis behavior. If x axis elasticity is turned on, then the grid chart will
     * attempt to recalculate the x axis range whenever a redraw event is triggered.
     * @method elasticX
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Boolean} [elasticX=false]
     * @returns {Boolean|dc.coordinateGridMixin}
     */
    _chart.elasticX = function (elasticX) {
        if (!arguments.length) {
            return _xElasticity;
        }
        _xElasticity = elasticX;
        return _chart;
    };

    /**
     * Set or get x axis padding for the elastic x axis. The padding will be added to both end of the x
     * axis if elasticX is turned on; otherwise it is ignored.
     *
     * Padding can be an integer or percentage in string (e.g. '10%'). Padding can be applied to
     * number or date x axes.  When padding a date axis, an integer represents number of units being padded
     * and a percentage string will be treated the same as an integer. The unit will be determined by the
     * xAxisPaddingUnit variable.
     * @method xAxisPadding
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Number|String} [padding=0]
     * @returns {Number|String|dc.coordinateGridMixin}
     */
    _chart.xAxisPadding = function (padding) {
        if (!arguments.length) {
            return _xAxisPadding;
        }
        _xAxisPadding = padding;
        return _chart;
    };

    /**
     * Set or get x axis padding unit for the elastic x axis. The padding unit will determine which unit to
     * use when applying xAxis padding if elasticX is turned on and if x-axis uses a time dimension;
     * otherwise it is ignored.
     *
     * The padding unit should be a
     * [d3 time interval](https://github.com/d3/d3-time/blob/master/README.md#_interval).
     * For backward compatibility with dc.js 2.0, it can also be the name of a d3 time interval
     * ('day', 'hour', etc). Available arguments are the
     * [d3 time intervals](https://github.com/d3/d3-time/blob/master/README.md#intervals d3.timeInterval).
     * @method xAxisPaddingUnit
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {String} [unit=d3.timeDay]
     * @returns {String|dc.coordinateGridMixin}
     */
    _chart.xAxisPaddingUnit = function (unit) {
        if (!arguments.length) {
            return _xAxisPaddingUnit;
        }
        _xAxisPaddingUnit = unit;
        return _chart;
    };

    /**
     * Returns the number of units displayed on the x axis. If the x axis is ordinal (`xUnits` is
     * `dc.units.ordinal`), this is the number of items in the domain of the x scale. Otherwise, the
     * x unit count is calculated using the {@link dc.coordinateGridMixin#xUnits xUnits} function.
     * @method xUnitCount
     * @memberof dc.coordinateGridMixin
     * @instance
     * @returns {Number}
     */
    _chart.xUnitCount = function () {
        if (_unitCount === undefined) {
            if (_chart.isOrdinal()) {
                // In this case it number of items in domain
                _unitCount = _chart.x().domain().length;
            } else {
                _unitCount = _chart.xUnits()(_chart.x().domain()[0], _chart.x().domain()[1]);

                // Sometimes xUnits() may return an array while sometimes directly the count
                if (_unitCount instanceof Array) {
                    _unitCount = _unitCount.length;
                }
            }
        }

        return _unitCount;
    };

    /**
     * Gets or sets whether the chart should be drawn with a right axis instead of a left axis. When
     * used with a chart in a composite chart, allows both left and right Y axes to be shown on a
     * chart.
     * @method useRightYAxis
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Boolean} [useRightYAxis=false]
     * @returns {Boolean|dc.coordinateGridMixin}
     */
    _chart.useRightYAxis = function (useRightYAxis) {
        if (!arguments.length) {
            return _useRightYAxis;
        }

        // We need to warn if value is changing after _yAxis was created
        if (_useRightYAxis !== useRightYAxis && _yAxis) {
            dc.logger.warn('Value of useRightYAxis has been altered, after yAxis was created. ' +
                'You might get unexpected yAxis behavior. ' +
                'Make calls to useRightYAxis sooner in your chart creation process.');
        }

        _useRightYAxis = useRightYAxis;
        return _chart;
    };

    /**
     * Returns true if the chart is using ordinal xUnits ({@link dc.units.ordinal dc.units.ordinal}, or false
     * otherwise. Most charts behave differently with ordinal data and use the result of this method to
     * trigger the appropriate logic.
     * @method isOrdinal
     * @memberof dc.coordinateGridMixin
     * @instance
     * @returns {Boolean}
     */
    _chart.isOrdinal = function () {
        return _chart.xUnits() === dc.units.ordinal;
    };

    _chart._useOuterPadding = function () {
        return true;
    };

    _chart._ordinalXDomain = function () {
        var groups = _chart._computeOrderedGroups(_chart.data());
        return groups.map(_chart.keyAccessor());
    };

    function prepareXAxis (g, render) {
        if (!_chart.isOrdinal()) {
            if (_chart.elasticX()) {
                _x.domain([_chart.xAxisMin(), _chart.xAxisMax()]);
            }
        } else { // _chart.isOrdinal()
            // D3v4 - Ordinal charts would need scaleBand
            // bandwidth is a method in scaleBand
            // (https://github.com/d3/d3-scale/blob/master/README.md#scaleBand)
            if (!_x.bandwidth) {
                // If _x is not a scaleBand create a new scale and
                // copy the original domain to the new scale
                dc.logger.warn('For compatibility with d3v4+, dc.js d3.0 ordinal bar/line/bubble charts need ' +
                               'd3.scaleBand() for the x scale, instead of d3.scaleOrdinal(). ' +
                               'Replacing .x() with a d3.scaleBand with the same domain - ' +
                               'make the same change in your code to avoid this warning!');
                _x = d3.scaleBand().domain(_x.domain());
            }

            if (_chart.elasticX() || _x.domain().length === 0) {
                _x.domain(_chart._ordinalXDomain());
            }
        }

        // has the domain changed?
        var xdom = _x.domain();
        if (render || !dc.utils.arraysEqual(_lastXDomain, xdom)) {
            _chart.rescale();
        }
        _lastXDomain = xdom;

        // please can't we always use rangeBands for bar charts?
        if (_chart.isOrdinal()) {
            _x.range([0, _chart.xAxisLength()])
                .paddingInner(_rangeBandPadding)
                .paddingOuter(_chart._useOuterPadding() ? _outerRangeBandPadding : 0);
        } else {
            _x.range([0, _chart.xAxisLength()]);
        }

        _xAxis = _xAxis.scale(_chart.x());

        renderVerticalGridLines(g);
    }

    _chart.renderXAxis = function (g) {
        var axisXG = g.select('g.x');

        if (axisXG.empty()) {
            axisXG = g.append('g')
                .attr('class', 'axis x')
                .attr('transform', 'translate(' + _chart.margins().left + ',' + _chart._xAxisY() + ')');
        }

        var axisXLab = g.select('text.' + X_AXIS_LABEL_CLASS);
        if (axisXLab.empty() && _chart.xAxisLabel()) {
            axisXLab = g.append('text')
                .attr('class', X_AXIS_LABEL_CLASS)
                .attr('transform', 'translate(' + (_chart.margins().left + _chart.xAxisLength() / 2) + ',' +
                      (_chart.height() - _xAxisLabelPadding) + ')')
                .attr('text-anchor', 'middle');
        }
        if (_chart.xAxisLabel() && axisXLab.text() !== _chart.xAxisLabel()) {
            axisXLab.text(_chart.xAxisLabel());
        }

        dc.transition(axisXG, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('transform', 'translate(' + _chart.margins().left + ',' + _chart._xAxisY() + ')')
            .call(_xAxis);
        dc.transition(axisXLab, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('transform', 'translate(' + (_chart.margins().left + _chart.xAxisLength() / 2) + ',' +
                  (_chart.height() - _xAxisLabelPadding) + ')');
    };

    function renderVerticalGridLines (g) {
        var gridLineG = g.select('g.' + VERTICAL_CLASS);

        if (_renderVerticalGridLine) {
            if (gridLineG.empty()) {
                gridLineG = g.insert('g', ':first-child')
                    .attr('class', GRID_LINE_CLASS + ' ' + VERTICAL_CLASS)
                    .attr('transform', 'translate(' + _chart.margins().left + ',' + _chart.margins().top + ')');
            }

            var ticks = _xAxis.tickValues() ? _xAxis.tickValues() :
                (typeof _x.ticks === 'function' ? _x.ticks.apply(_x, _xAxis.tickArguments()) : _x.domain());

            var lines = gridLineG.selectAll('line')
                .data(ticks);

            // enter
            var linesGEnter = lines.enter()
                .append('line')
                .attr('x1', function (d) {
                    return _x(d);
                })
                .attr('y1', _chart._xAxisY() - _chart.margins().top)
                .attr('x2', function (d) {
                    return _x(d);
                })
                .attr('y2', 0)
                .attr('opacity', 0);
            dc.transition(linesGEnter, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('opacity', 1);

            // update
            var linesGEnterUpdate = linesGEnter.merge(lines);
            dc.transition(linesGEnterUpdate, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('x1', function (d) {
                    return _x(d);
                })
                .attr('y1', _chart._xAxisY() - _chart.margins().top)
                .attr('x2', function (d) {
                    return _x(d);
                })
                .attr('y2', 0);

            // exit
            lines.exit().remove();
        } else {
            gridLineG.selectAll('line').remove();
        }
    }

    _chart._xAxisY = function () {
        return (_chart.height() - _chart.margins().bottom);
    };

    _chart.xAxisLength = function () {
        return _chart.effectiveWidth();
    };

    /**
     * Set or get the x axis label. If setting the label, you may optionally include additional padding to
     * the margin to make room for the label. By default the padded is set to 12 to accomodate the text height.
     * @method xAxisLabel
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {String} [labelText]
     * @param {Number} [padding=12]
     * @returns {String}
     */
    _chart.xAxisLabel = function (labelText, padding) {
        if (!arguments.length) {
            return _xAxisLabel;
        }
        _xAxisLabel = labelText;
        _chart.margins().bottom -= _xAxisLabelPadding;
        _xAxisLabelPadding = (padding === undefined) ? DEFAULT_AXIS_LABEL_PADDING : padding;
        _chart.margins().bottom += _xAxisLabelPadding;
        return _chart;
    };

    function createYAxis () {
        return _useRightYAxis ? d3.axisRight() : d3.axisLeft();
    }

    _chart._prepareYAxis = function (g) {
        if (_y === undefined || _chart.elasticY()) {
            if (_y === undefined) {
                _y = d3.scaleLinear();
            }
            var min = _chart.yAxisMin() || 0,
                max = _chart.yAxisMax() || 0;
            _y.domain([min, max]).rangeRound([_chart.yAxisHeight(), 0]);
        }

        _y.range([_chart.yAxisHeight(), 0]);

        if (!_yAxis) {
            _yAxis = createYAxis();
        }

        _yAxis.scale(_y);

        _chart._renderHorizontalGridLinesForAxis(g, _y, _yAxis);
    };

    _chart.renderYAxisLabel = function (axisClass, text, rotation, labelXPosition) {
        labelXPosition = labelXPosition || _yAxisLabelPadding;

        var axisYLab = _chart.g().select('text.' + Y_AXIS_LABEL_CLASS + '.' + axisClass + '-label');
        var labelYPosition = (_chart.margins().top + _chart.yAxisHeight() / 2);
        if (axisYLab.empty() && text) {
            axisYLab = _chart.g().append('text')
                .attr('transform', 'translate(' + labelXPosition + ',' + labelYPosition + '),rotate(' + rotation + ')')
                .attr('class', Y_AXIS_LABEL_CLASS + ' ' + axisClass + '-label')
                .attr('text-anchor', 'middle')
                .text(text);
        }
        if (text && axisYLab.text() !== text) {
            axisYLab.text(text);
        }
        dc.transition(axisYLab, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('transform', 'translate(' + labelXPosition + ',' + labelYPosition + '),rotate(' + rotation + ')');
    };

    _chart.renderYAxisAt = function (axisClass, axis, position) {
        var axisYG = _chart.g().select('g.' + axisClass);
        if (axisYG.empty()) {
            axisYG = _chart.g().append('g')
                .attr('class', 'axis ' + axisClass)
                .attr('transform', 'translate(' + position + ',' + _chart.margins().top + ')');
        }

        dc.transition(axisYG, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('transform', 'translate(' + position + ',' + _chart.margins().top + ')')
            .call(axis);
    };

    _chart.renderYAxis = function () {
        var axisPosition = _useRightYAxis ? (_chart.width() - _chart.margins().right) : _chart._yAxisX();
        _chart.renderYAxisAt('y', _yAxis, axisPosition);
        var labelPosition = _useRightYAxis ? (_chart.width() - _yAxisLabelPadding) : _yAxisLabelPadding;
        var rotation = _useRightYAxis ? 90 : -90;
        _chart.renderYAxisLabel('y', _chart.yAxisLabel(), rotation, labelPosition);
    };

    _chart._renderHorizontalGridLinesForAxis = function (g, scale, axis) {
        var gridLineG = g.select('g.' + HORIZONTAL_CLASS);

        if (_renderHorizontalGridLine) {
            // see https://github.com/d3/d3-axis/blob/master/src/axis.js#L48
            var ticks = axis.tickValues() ? axis.tickValues() :
                (scale.ticks ? scale.ticks.apply(scale, axis.tickArguments()) : scale.domain());

            if (gridLineG.empty()) {
                gridLineG = g.insert('g', ':first-child')
                    .attr('class', GRID_LINE_CLASS + ' ' + HORIZONTAL_CLASS)
                    .attr('transform', 'translate(' + _chart.margins().left + ',' + _chart.margins().top + ')');
            }

            var lines = gridLineG.selectAll('line')
                .data(ticks);

            // enter
            var linesGEnter = lines.enter()
                .append('line')
                .attr('x1', 1)
                .attr('y1', function (d) {
                    return scale(d);
                })
                .attr('x2', _chart.xAxisLength())
                .attr('y2', function (d) {
                    return scale(d);
                })
                .attr('opacity', 0);
            dc.transition(linesGEnter, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('opacity', 1);

            // update
            var linesGEnterUpdate = linesGEnter.merge(lines);
            dc.transition(linesGEnterUpdate, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('x1', 1)
                .attr('y1', function (d) {
                    return scale(d);
                })
                .attr('x2', _chart.xAxisLength())
                .attr('y2', function (d) {
                    return scale(d);
                });

            // exit
            lines.exit().remove();
        } else {
            gridLineG.selectAll('line').remove();
        }
    };

    _chart._yAxisX = function () {
        return _chart.useRightYAxis() ? _chart.width() - _chart.margins().right : _chart.margins().left;
    };

    /**
     * Set or get the y axis label. If setting the label, you may optionally include additional padding
     * to the margin to make room for the label. By default the padding is set to 12 to accommodate the
     * text height.
     * @method yAxisLabel
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {String} [labelText]
     * @param {Number} [padding=12]
     * @returns {String|dc.coordinateGridMixin}
     */
    _chart.yAxisLabel = function (labelText, padding) {
        if (!arguments.length) {
            return _yAxisLabel;
        }
        _yAxisLabel = labelText;
        _chart.margins().left -= _yAxisLabelPadding;
        _yAxisLabelPadding = (padding === undefined) ? DEFAULT_AXIS_LABEL_PADDING : padding;
        _chart.margins().left += _yAxisLabelPadding;
        return _chart;
    };

    /**
     * Get or set the y scale. The y scale is typically automatically determined by the chart implementation.
     * @method y
     * @memberof dc.coordinateGridMixin
     * @instance
     * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
     * @param {d3.scale} [yScale]
     * @returns {d3.scale|dc.coordinateGridMixin}
     */
    _chart.y = function (yScale) {
        if (!arguments.length) {
            return _y;
        }
        _y = yScale;
        _chart.rescale();
        return _chart;
    };

    /**
     * Set or get the y axis used by the coordinate grid chart instance. This function is most useful
     * when y axis customization is required. Depending on `useRightYAxis` the y axis in dc.js is an instance of
     * either [d3.axisLeft](https://github.com/d3/d3-axis/blob/master/README.md#axisLeft) or
     * [d3.axisRight](https://github.com/d3/d3-axis/blob/master/README.md#axisRight); therefore it supports any
     * valid d3 axis manipulation.
     *
     * **Caution**: The y axis is usually generated internally by dc; resetting it may cause
     * unexpected results.  Note also that when used as a getter, this function is not chainable: it
     * returns the axis, not the chart,
     * {@link https://github.com/dc-js/dc.js/wiki/FAQ#why-does-everything-break-after-a-call-to-xaxis-or-yaxis
     * so attempting to call chart functions after calling `.yAxis()` will fail}.
     * In addition, depending on whether you are going to use the axis on left or right
     * you need to appropriately pass [d3.axisLeft](https://github.com/d3/d3-axis/blob/master/README.md#axisLeft)
     * or [d3.axisRight](https://github.com/d3/d3-axis/blob/master/README.md#axisRight)
     * @method yAxis
     * @memberof dc.coordinateGridMixin
     * @instance
     * @see {@link https://github.com/d3/d3-axis/blob/master/README.md d3.axis}
     * @example
     * // customize y axis tick format
     * chart.yAxis().tickFormat(function(v) {return v + '%';});
     * // customize y axis tick values
     * chart.yAxis().tickValues([0, 100, 200, 300]);
     * @param {d3.axisLeft|d3.axisRight} [yAxis]
     * @returns {d3.axisLeft|d3.axisRight|dc.coordinateGridMixin}
     */
    _chart.yAxis = function (yAxis) {
        if (!arguments.length) {
            if (!_yAxis) {
                _yAxis = createYAxis();
            }
            return _yAxis;
        }
        _yAxis = yAxis;
        return _chart;
    };

    /**
     * Turn on/off elastic y axis behavior. If y axis elasticity is turned on, then the grid chart will
     * attempt to recalculate the y axis range whenever a redraw event is triggered.
     * @method elasticY
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Boolean} [elasticY=false]
     * @returns {Boolean|dc.coordinateGridMixin}
     */
    _chart.elasticY = function (elasticY) {
        if (!arguments.length) {
            return _yElasticity;
        }
        _yElasticity = elasticY;
        return _chart;
    };

    /**
     * Turn on/off horizontal grid lines.
     * @method renderHorizontalGridLines
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Boolean} [renderHorizontalGridLines=false]
     * @returns {Boolean|dc.coordinateGridMixin}
     */
    _chart.renderHorizontalGridLines = function (renderHorizontalGridLines) {
        if (!arguments.length) {
            return _renderHorizontalGridLine;
        }
        _renderHorizontalGridLine = renderHorizontalGridLines;
        return _chart;
    };

    /**
     * Turn on/off vertical grid lines.
     * @method renderVerticalGridLines
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Boolean} [renderVerticalGridLines=false]
     * @returns {Boolean|dc.coordinateGridMixin}
     */
    _chart.renderVerticalGridLines = function (renderVerticalGridLines) {
        if (!arguments.length) {
            return _renderVerticalGridLine;
        }
        _renderVerticalGridLine = renderVerticalGridLines;
        return _chart;
    };

    /**
     * Calculates the minimum x value to display in the chart. Includes xAxisPadding if set.
     * @method xAxisMin
     * @memberof dc.coordinateGridMixin
     * @instance
     * @returns {*}
     */
    _chart.xAxisMin = function () {
        var min = d3.min(_chart.data(), function (e) {
            return _chart.keyAccessor()(e);
        });
        return dc.utils.subtract(min, _xAxisPadding, _xAxisPaddingUnit);
    };

    /**
     * Calculates the maximum x value to display in the chart. Includes xAxisPadding if set.
     * @method xAxisMax
     * @memberof dc.coordinateGridMixin
     * @instance
     * @returns {*}
     */
    _chart.xAxisMax = function () {
        var max = d3.max(_chart.data(), function (e) {
            return _chart.keyAccessor()(e);
        });
        return dc.utils.add(max, _xAxisPadding, _xAxisPaddingUnit);
    };

    /**
     * Calculates the minimum y value to display in the chart. Includes yAxisPadding if set.
     * @method yAxisMin
     * @memberof dc.coordinateGridMixin
     * @instance
     * @returns {*}
     */
    _chart.yAxisMin = function () {
        var min = d3.min(_chart.data(), function (e) {
            return _chart.valueAccessor()(e);
        });
        return dc.utils.subtract(min, _yAxisPadding);
    };

    /**
     * Calculates the maximum y value to display in the chart. Includes yAxisPadding if set.
     * @method yAxisMax
     * @memberof dc.coordinateGridMixin
     * @instance
     * @returns {*}
     */
    _chart.yAxisMax = function () {
        var max = d3.max(_chart.data(), function (e) {
            return _chart.valueAccessor()(e);
        });
        return dc.utils.add(max, _yAxisPadding);
    };

    /**
     * Set or get y axis padding for the elastic y axis. The padding will be added to the top and
     * bottom of the y axis if elasticY is turned on; otherwise it is ignored.
     *
     * Padding can be an integer or percentage in string (e.g. '10%'). Padding can be applied to
     * number or date axes. When padding a date axis, an integer represents number of days being padded
     * and a percentage string will be treated the same as an integer.
     * @method yAxisPadding
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Number|String} [padding=0]
     * @returns {Number|dc.coordinateGridMixin}
     */
    _chart.yAxisPadding = function (padding) {
        if (!arguments.length) {
            return _yAxisPadding;
        }
        _yAxisPadding = padding;
        return _chart;
    };

    _chart.yAxisHeight = function () {
        return _chart.effectiveHeight();
    };

    /**
     * Set or get the rounding function used to quantize the selection when brushing is enabled.
     * @method round
     * @memberof dc.coordinateGridMixin
     * @instance
     * @example
     * // set x unit round to by month, this will make sure range selection brush will
     * // select whole months
     * chart.round(d3.timeMonth.round);
     * @param {Function} [round]
     * @returns {Function|dc.coordinateGridMixin}
     */
    _chart.round = function (round) {
        if (!arguments.length) {
            return _round;
        }
        _round = round;
        return _chart;
    };

    _chart._rangeBandPadding = function (_) {
        if (!arguments.length) {
            return _rangeBandPadding;
        }
        _rangeBandPadding = _;
        return _chart;
    };

    _chart._outerRangeBandPadding = function (_) {
        if (!arguments.length) {
            return _outerRangeBandPadding;
        }
        _outerRangeBandPadding = _;
        return _chart;
    };

    dc.override(_chart, 'filter', function (_) {
        if (!arguments.length) {
            return _chart._filter();
        }

        _chart._filter(_);

        _chart.redrawBrush(_, false);

        return _chart;
    });

    /**
     * Get or set the brush. Brush must be an instance of d3 brushes
     * https://github.com/d3/d3-brush/blob/master/README.md
     * You will use this only if you are writing a new chart type that supports brushing.
     *
     * **Caution**: dc creates and manages brushes internally. Go through and understand the source code
     * if you want to pass a new brush object. Even if you are only using the getter,
     * the brush object may not behave the way you expect.
     *
     * @method brush
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {d3.brush} [_]
     * @returns {d3.brush|dc.coordinateGridMixin}
     */
    _chart.brush = function (_) {
        if (!arguments.length) {
            return _brush;
        }
        _brush = _;
        return _chart;
    };

    _chart.renderBrush = function (g, doTransition) {
        if (_brushOn) {
            _brush.on('start brush end', _chart._brushing);

            // To retrieve selection we need _gBrush
            _gBrush = g.append('g')
                .attr('class', 'brush')
                .attr('transform', 'translate(' + _chart.margins().left + ',' + _chart.margins().top + ')');

            _chart.setBrushExtents();

            _chart.createBrushHandlePaths(_gBrush, doTransition);

            _chart.redrawBrush(_chart.filter(), doTransition);
        }
    };

    _chart.createBrushHandlePaths = function (gBrush) {
        var brushHandles = gBrush.selectAll('path.' + CUSTOM_BRUSH_HANDLE_CLASS).data([{type: 'w'}, {type: 'e'}]);

        brushHandles = brushHandles
            .enter()
            .append('path')
            .attr('class', CUSTOM_BRUSH_HANDLE_CLASS)
            .merge(brushHandles);

        brushHandles
            .attr('d', _chart.resizeHandlePath);
    };

    _chart.extendBrush = function (brushSelection) {
        if (brushSelection && _chart.round()) {
            brushSelection[0] = _chart.round()(brushSelection[0]);
            brushSelection[1] = _chart.round()(brushSelection[1]);
        }
        return brushSelection;
    };

    _chart.brushIsEmpty = function (brushSelection) {
        return !brushSelection || brushSelection[1] <= brushSelection[0];
    };

    _chart._brushing = function () {
        // Avoids infinite recursion (mutual recursion between range and focus operations)
        // Source Event will be null when brush.move is called programmatically (see below as well).
        if (!d3.event.sourceEvent) { return; }

        // Ignore event if recursive event - i.e. not directly generated by user action (like mouse/touch etc.)
        // In this case we are more worried about this handler causing brush move programmatically which will
        // cause this handler to be invoked again with a new d3.event (and current event set as sourceEvent)
        // This check avoids recursive calls
        if (d3.event.sourceEvent.type && ['start', 'brush', 'end'].indexOf(d3.event.sourceEvent.type) !== -1) {
            return;
        }

        var brushSelection = d3.event.selection;
        if (brushSelection) {
            brushSelection = brushSelection.map(_chart.x().invert);
        }

        brushSelection = _chart.extendBrush(brushSelection);

        _chart.redrawBrush(brushSelection, false);

        var rangedFilter = _chart.brushIsEmpty(brushSelection) ? null : dc.filters.RangedFilter(brushSelection[0], brushSelection[1]);

        dc.events.trigger(function () {
            _chart.applyBrushSelection(rangedFilter);
        }, dc.constants.EVENT_DELAY);
    };

    // This can be overridden in a derived chart. For example Composite chart overrides it
    _chart.applyBrushSelection = function (rangedFilter) {
        _chart.replaceFilter(rangedFilter);
        _chart.redrawGroup();
    };

    _chart.setBrushExtents = function (doTransition) {
        // Set boundaries of the brush, must set it before applying to _gBrush
        _brush.extent([[0, 0], [_chart.effectiveWidth(), _chart.effectiveHeight()]]);

        _gBrush
            .call(_brush);
    };

    _chart.redrawBrush = function (brushSelection, doTransition) {
        if (_brushOn && _gBrush) {
            if (_resizing) {
                _chart.setBrushExtents(doTransition);
            }

            if (!brushSelection) {
                _gBrush
                    .call(_brush.move, null);

                _gBrush.selectAll('path.' + CUSTOM_BRUSH_HANDLE_CLASS)
                    .attr('display', 'none');
            } else {
                var scaledSelection = [_x(brushSelection[0]), _x(brushSelection[1])];

                var gBrush =
                    dc.optionalTransition(doTransition, _chart.transitionDuration(), _chart.transitionDelay())(_gBrush);

                gBrush
                    .call(_brush.move, scaledSelection);

                gBrush.selectAll('path.' + CUSTOM_BRUSH_HANDLE_CLASS)
                    .attr('display', null)
                    .attr('transform', function (d, i) {
                        return 'translate(' + _x(brushSelection[i]) + ', 0)';
                    })
                    .attr('d', _chart.resizeHandlePath);
            }
        }
        _chart.fadeDeselectedArea(brushSelection);
    };

    _chart.fadeDeselectedArea = function (brushSelection) {
        // do nothing, sub-chart should override this function
    };

    // borrowed from Crossfilter example
    _chart.resizeHandlePath = function (d) {
        d = d.type;
        var e = +(d === 'e'), x = e ? 1 : -1, y = _chart.effectiveHeight() / 3;
        return 'M' + (0.5 * x) + ',' + y +
            'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6) +
            'V' + (2 * y - 6) +
            'A6,6 0 0 ' + e + ' ' + (0.5 * x) + ',' + (2 * y) +
            'Z' +
            'M' + (2.5 * x) + ',' + (y + 8) +
            'V' + (2 * y - 8) +
            'M' + (4.5 * x) + ',' + (y + 8) +
            'V' + (2 * y - 8);
    };

    function getClipPathId () {
        return _chart.anchorName().replace(/[ .#=\[\]"]/g, '-') + '-clip';
    }

    /**
     * Get or set the padding in pixels for the clip path. Once set padding will be applied evenly to
     * the top, left, right, and bottom when the clip path is generated. If set to zero, the clip area
     * will be exactly the chart body area minus the margins.
     * @method clipPadding
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Number} [padding=5]
     * @returns {Number|dc.coordinateGridMixin}
     */
    _chart.clipPadding = function (padding) {
        if (!arguments.length) {
            return _clipPadding;
        }
        _clipPadding = padding;
        return _chart;
    };

    function generateClipPath () {
        var defs = dc.utils.appendOrSelect(_parent, 'defs');
        // cannot select <clippath> elements; bug in WebKit, must select by id
        // https://groups.google.com/forum/#!topic/d3-js/6EpAzQ2gU9I
        var id = getClipPathId();
        var chartBodyClip = dc.utils.appendOrSelect(defs, '#' + id, 'clipPath').attr('id', id);

        var padding = _clipPadding * 2;

        dc.utils.appendOrSelect(chartBodyClip, 'rect')
            .attr('width', _chart.xAxisLength() + padding)
            .attr('height', _chart.yAxisHeight() + padding)
            .attr('transform', 'translate(-' + _clipPadding + ', -' + _clipPadding + ')');
    }

    _chart._preprocessData = function () {};

    _chart._doRender = function () {
        _chart.resetSvg();

        _chart._preprocessData();

        _chart._generateG();
        generateClipPath();

        drawChart(true);

        configureMouseZoom();

        return _chart;
    };

    _chart._doRedraw = function () {
        _chart._preprocessData();

        drawChart(false);
        generateClipPath();

        return _chart;
    };

    function drawChart (render) {
        if (_chart.isOrdinal()) {
            _brushOn = false;
        }

        prepareXAxis(_chart.g(), render);
        _chart._prepareYAxis(_chart.g());

        _chart.plotData();

        if (_chart.elasticX() || _resizing || render) {
            _chart.renderXAxis(_chart.g());
        }

        if (_chart.elasticY() || _resizing || render) {
            _chart.renderYAxis(_chart.g());
        }

        if (render) {
            _chart.renderBrush(_chart.g(), false);
        } else {
            // Animate the brush only while resizing
            _chart.redrawBrush(_chart.filter(), _resizing);
        }
        _chart.fadeDeselectedArea(_chart.filter());
        _resizing = false;
    }

    function configureMouseZoom () {
        // Save a copy of original x scale
        _origX = _x.copy();

        if (_mouseZoomable) {
            _chart._enableMouseZoom();
        } else if (_hasBeenMouseZoomable) {
            _chart._disableMouseZoom();
        }
    }

    _chart._enableMouseZoom = function () {
        _hasBeenMouseZoomable = true;

        var extent = [[0, 0],[_chart.effectiveWidth(), _chart.effectiveHeight()]];

        _zoom
            .scaleExtent(_zoomScale)
            .extent(extent)
            .duration(_chart.transitionDuration());

        if (_zoomOutRestrict) {
            // Ensure minimum zoomScale is at least 1
            var zoomScaleMin = Math.max(_zoomScale[0], 1);
            _zoom
                .translateExtent(extent)
                .scaleExtent([zoomScaleMin, _zoomScale[1]]);
        }

        _chart.root().call(_zoom);

        // Tell D3 zoom our current zoom/pan status
        updateD3zoomTransform();
    };

    _chart._disableMouseZoom = function () {
        _chart.root().call(_nullZoom);
    };

    function zoomHandler (newDomain, noRaiseEvents) {
        var domFilter;

        if (hasRangeSelected(newDomain)) {
            _chart.x().domain(newDomain);
            domFilter = dc.filters.RangedFilter(newDomain[0], newDomain[1]);
        } else {
            _chart.x().domain(_xOriginalDomain);
            domFilter = null;
        }

        _chart.replaceFilter(domFilter);
        _chart.rescale();
        _chart.redraw();

        if (!noRaiseEvents) {
            if (_rangeChart && !dc.utils.arraysEqual(_chart.filter(), _rangeChart.filter())) {
                dc.events.trigger(function () {
                    _rangeChart.replaceFilter(domFilter);
                    _rangeChart.redraw();
                });
            }

            _chart._invokeZoomedListener();
            dc.events.trigger(function () {
                _chart.redrawGroup();
            }, dc.constants.EVENT_DELAY);
        }
    }

    // event.transform.rescaleX(_origX).domain() should give back newDomain
    function domainToZoomTransform (newDomain, origDomain, xScale) {
        var k = (origDomain[1] - origDomain[0]) / (newDomain[1] - newDomain[0]);
        var xt = -1 * xScale(newDomain[0]);

        return d3.zoomIdentity.scale(k).translate(xt, 0);
    }

    // If we changing zoom status (for example by calling focus), tell D3 zoom about it
    function updateD3zoomTransform () {
        if (_zoom) {
            _zoom.transform(_chart.root(), domainToZoomTransform(_chart.x().domain(), _xOriginalDomain, _origX));
        }
    }

    function onZoom () {
        // Avoids infinite recursion (mutual recursion between range and focus operations)
        // Source Event will be null when zoom is called programmatically (see below as well).
        if (!d3.event.sourceEvent) { return; }

        // Ignore event if recursive event - i.e. not directly generated by user action (like mouse/touch etc.)
        // In this case we are more worried about this handler causing zoom programmatically which will
        // cause this handler to be invoked again with a new d3.event (and current event set as sourceEvent)
        // This check avoids recursive calls
        if (d3.event.sourceEvent.type && ['start', 'zoom', 'end'].indexOf(d3.event.sourceEvent.type) !== -1) {
            return;
        }

        var newDomain = d3.event.transform.rescaleX(_origX).domain();
        _chart.focus(newDomain, false);
    }

    function checkExtents (ext, outerLimits) {
        if (!ext || ext.length !== 2 || !outerLimits || outerLimits.length !== 2) {
            return ext;
        }

        if (ext[0] > outerLimits[1] || ext[1] < outerLimits[0]) {
            console.warn('Could not intersect extents, will reset');
        }
        // Math.max does not work (as the values may be dates as well)
        return [ext[0] > outerLimits[0] ? ext[0] : outerLimits[0], ext[1] < outerLimits[1] ? ext[1] : outerLimits[1]];
    }

    /**
     * Zoom this chart to focus on the given range. The given range should be an array containing only
     * 2 elements (`[start, end]`) defining a range in the x domain. If the range is not given or set
     * to null, then the zoom will be reset. _For focus to work elasticX has to be turned off;
     * otherwise focus will be ignored.
     *
     * To avoid ping-pong volley of events between a pair of range and focus charts please set
     * `noRaiseEvents` to `true`. In that case it will update this chart but will not fire `zoom` event
     * and not try to update back the associated range chart.
     * If you are calling it manually - typically you will leave it to `false` (the default).
     *
     * @method focus
     * @memberof dc.coordinateGridMixin
     * @instance
     * @example
     * chart.on('renderlet', function(chart) {
     *     // smooth the rendering through event throttling
     *     dc.events.trigger(function(){
     *          // focus some other chart to the range selected by user on this chart
     *          someOtherChart.focus(chart.filter());
     *     });
     * })
     * @param {Array<Number>} [range]
     * @param {Boolean} [noRaiseEvents = false]
     */
    _chart.focus = function (range, noRaiseEvents) {
        if (_zoomOutRestrict) {
            // ensure range is within _xOriginalDomain
            range = checkExtents(range, _xOriginalDomain);

            // If it has an associated range chart ensure range is within domain of that rangeChart
            if (_rangeChart) {
                range = checkExtents(range, _rangeChart.x().domain());
            }
        }

        zoomHandler(range, noRaiseEvents);
        updateD3zoomTransform();
    };

    _chart.refocused = function () {
        return !dc.utils.arraysEqual(_chart.x().domain(), _xOriginalDomain);
    };

    _chart.focusChart = function (c) {
        if (!arguments.length) {
            return _focusChart;
        }
        _focusChart = c;
        _chart.on('filtered.dcjs-range-chart', function (chart) {
            if (!chart.filter()) {
                dc.events.trigger(function () {
                    _focusChart.x().domain(_focusChart.xOriginalDomain(), true);
                });
            } else if (!dc.utils.arraysEqual(chart.filter(), _focusChart.filter())) {
                dc.events.trigger(function () {
                    _focusChart.focus(chart.filter(), true);
                });
            }
        });
        return _chart;
    };

    /**
     * Turn on/off the brush-based range filter. When brushing is on then user can drag the mouse
     * across a chart with a quantitative scale to perform range filtering based on the extent of the
     * brush, or click on the bars of an ordinal bar chart or slices of a pie chart to filter and
     * un-filter them. However turning on the brush filter will disable other interactive elements on
     * the chart such as highlighting, tool tips, and reference lines. Zooming will still be possible
     * if enabled, but only via scrolling (panning will be disabled.)
     * @method brushOn
     * @memberof dc.coordinateGridMixin
     * @instance
     * @param {Boolean} [brushOn=true]
     * @returns {Boolean|dc.coordinateGridMixin}
     */
    _chart.brushOn = function (brushOn) {
        if (!arguments.length) {
            return _brushOn;
        }
        _brushOn = brushOn;
        return _chart;
    };

    /**
     * This will be internally used by composite chart onto children. Please go not invoke directly.
     *
     * @method parentBrushOn
     * @memberof dc.coordinateGridMixin
     * @protected
     * @instance
     * @param {Boolean} [brushOn=false]
     * @returns {Boolean|dc.coordinateGridMixin}
     */
    _chart.parentBrushOn = function (brushOn) {
        if (!arguments.length) {
            return _parentBrushOn;
        }
        _parentBrushOn = brushOn;
        return _chart;
    };

    // Get the SVG rendered brush
    _chart.gBrush = function () {
        return _gBrush;
    };

    function hasRangeSelected (range) {
        return range instanceof Array && range.length > 1;
    }

    return _chart;
};

/**
 * Stack Mixin is an mixin that provides cross-chart support of stackability using d3.stackD3v3.
 * @name stackMixin
 * @memberof dc
 * @mixin
 * @param {Object} _chart
 * @returns {dc.stackMixin}
 */
dc.stackMixin = function (_chart) {

    function prepareValues (layer, layerIdx) {
        var valAccessor = layer.accessor || _chart.valueAccessor();
        layer.name = String(layer.name || layerIdx);
        var allValues = layer.group.all().map(function (d, i) {
            return {
                x: _chart.keyAccessor()(d, i),
                y: layer.hidden ? null : valAccessor(d, i),
                data: d,
                layer: layer.name,
                hidden: layer.hidden
            };
        });

        layer.domainValues = allValues.filter(domainFilter());
        layer.values = _chart.evadeDomainFilter() ? allValues : layer.domainValues;
    }

    var _stackLayout = d3.stack();

    var _stack = [];
    var _titles = {};

    var _hidableStacks = false;
    var _evadeDomainFilter = false;

    function domainFilter () {
        if (!_chart.x()) {
            return dc.utils.constant(true);
        }
        var xDomain = _chart.x().domain();
        if (_chart.isOrdinal()) {
            // TODO #416
            //var domainSet = d3.set(xDomain);
            return function () {
                return true; //domainSet.has(p.x);
            };
        }
        if (_chart.elasticX()) {
            return function () { return true; };
        }
        return function (p) {
            //return true;
            return p.x >= xDomain[0] && p.x <= xDomain[xDomain.length - 1];
        };
    }

    /**
     * Stack a new crossfilter group onto this chart with an optional custom value accessor. All stacks
     * in the same chart will share the same key accessor and therefore the same set of keys.
     *
     * For example, in a stacked bar chart, the bars of each stack will be positioned using the same set
     * of keys on the x axis, while stacked vertically. If name is specified then it will be used to
     * generate the legend label.
     * @method stack
     * @memberof dc.stackMixin
     * @instance
     * @see {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group-map-reduce crossfilter.group}
     * @example
     * // stack group using default accessor
     * chart.stack(valueSumGroup)
     * // stack group using custom accessor
     * .stack(avgByDayGroup, function(d){return d.value.avgByDay;});
     * @param {crossfilter.group} group
     * @param {String} [name]
     * @param {Function} [accessor]
     * @returns {Array<{group: crossfilter.group, name: String, accessor: Function}>|dc.stackMixin}
     */
    _chart.stack = function (group, name, accessor) {
        if (!arguments.length) {
            return _stack;
        }

        if (arguments.length <= 2) {
            accessor = name;
        }

        var layer = {group: group};
        if (typeof name === 'string') {
            layer.name = name;
        }
        if (typeof accessor === 'function') {
            layer.accessor = accessor;
        }
        _stack.push(layer);

        return _chart;
    };

    dc.override(_chart, 'group', function (g, n, f) {
        if (!arguments.length) {
            return _chart._group();
        }
        _stack = [];
        _titles = {};
        _chart.stack(g, n);
        if (f) {
            _chart.valueAccessor(f);
        }
        return _chart._group(g, n);
    });

    /**
     * Allow named stacks to be hidden or shown by clicking on legend items.
     * This does not affect the behavior of hideStack or showStack.
     * @method hidableStacks
     * @memberof dc.stackMixin
     * @instance
     * @param {Boolean} [hidableStacks=false]
     * @returns {Boolean|dc.stackMixin}
     */
    _chart.hidableStacks = function (hidableStacks) {
        if (!arguments.length) {
            return _hidableStacks;
        }
        _hidableStacks = hidableStacks;
        return _chart;
    };

    function findLayerByName (n) {
        var i = _stack.map(dc.pluck('name')).indexOf(n);
        return _stack[i];
    }

    /**
     * Hide all stacks on the chart with the given name.
     * The chart must be re-rendered for this change to appear.
     * @method hideStack
     * @memberof dc.stackMixin
     * @instance
     * @param {String} stackName
     * @returns {dc.stackMixin}
     */
    _chart.hideStack = function (stackName) {
        var layer = findLayerByName(stackName);
        if (layer) {
            layer.hidden = true;
        }
        return _chart;
    };

    /**
     * Show all stacks on the chart with the given name.
     * The chart must be re-rendered for this change to appear.
     * @method showStack
     * @memberof dc.stackMixin
     * @instance
     * @param {String} stackName
     * @returns {dc.stackMixin}
     */
    _chart.showStack = function (stackName) {
        var layer = findLayerByName(stackName);
        if (layer) {
            layer.hidden = false;
        }
        return _chart;
    };

    _chart.getValueAccessorByIndex = function (index) {
        return _stack[index].accessor || _chart.valueAccessor();
    };

    _chart.yAxisMin = function () {
        var min = d3.min(flattenStack(), function (p) {
            return (p.y < 0) ? (p.y + p.y0) : p.y0;
        });

        return dc.utils.subtract(min, _chart.yAxisPadding());

    };

    _chart.yAxisMax = function () {
        var max = d3.max(flattenStack(), function (p) {
            return (p.y > 0) ? (p.y + p.y0) : p.y0;
        });

        return dc.utils.add(max, _chart.yAxisPadding());
    };

    function flattenStack () {
        var valueses = _chart.data().map(function (layer) { return layer.domainValues; });
        return Array.prototype.concat.apply([], valueses);
    }

    _chart.xAxisMin = function () {
        var min = d3.min(flattenStack(), dc.pluck('x'));
        return dc.utils.subtract(min, _chart.xAxisPadding(), _chart.xAxisPaddingUnit());
    };

    _chart.xAxisMax = function () {
        var max = d3.max(flattenStack(), dc.pluck('x'));
        return dc.utils.add(max, _chart.xAxisPadding(), _chart.xAxisPaddingUnit());
    };

    /**
     * Set or get the title function. Chart class will use this function to render svg title (usually interpreted by
     * browser as tooltips) for each child element in the chart, i.e. a slice in a pie chart or a bubble in a bubble chart.
     * Almost every chart supports title function however in grid coordinate chart you need to turn off brush in order to
     * use title otherwise the brush layer will block tooltip trigger.
     *
     * If the first argument is a stack name, the title function will get or set the title for that stack. If stackName
     * is not provided, the first stack is implied.
     * @method title
     * @memberof dc.stackMixin
     * @instance
     * @example
     * // set a title function on 'first stack'
     * chart.title('first stack', function(d) { return d.key + ': ' + d.value; });
     * // get a title function from 'second stack'
     * var secondTitleFunction = chart.title('second stack');
     * @param {String} [stackName]
     * @param {Function} [titleAccessor]
     * @returns {String|dc.stackMixin}
     */
    dc.override(_chart, 'title', function (stackName, titleAccessor) {
        if (!stackName) {
            return _chart._title();
        }

        if (typeof stackName === 'function') {
            return _chart._title(stackName);
        }
        if (stackName === _chart._groupName && typeof titleAccessor === 'function') {
            return _chart._title(titleAccessor);
        }

        if (typeof titleAccessor !== 'function') {
            return _titles[stackName] || _chart._title();
        }

        _titles[stackName] = titleAccessor;

        return _chart;
    });

    /**
     * Gets or sets the stack layout algorithm, which computes a baseline for each stack and
     * propagates it to the next.
     * @method stackLayout
     * @memberof dc.stackMixin
     * @instance
     * @see {@link https://github.com/d3/d3-3.x-api-reference/blob/master/Stack-Layout.md d3.stackD3v3}
     * @param {Function} [stack=d3.stackD3v3]
     * @returns {Function|dc.stackMixin}
     */
    _chart.stackLayout = function (stack) {
        if (!arguments.length) {
            return _stackLayout;
        }
        _stackLayout = stack;
        return _chart;
    };

    /**
     * Since dc.js 2.0, there has been {@link https://github.com/dc-js/dc.js/issues/949 an issue}
     * where points are filtered to the current domain. While this is a useful optimization, it is
     * incorrectly implemented: the next point outside the domain is required in order to draw lines
     * that are clipped to the bounds, as well as bars that are partly clipped.
     *
     * A fix will be included in dc.js 2.1.x, but a workaround is needed for dc.js 2.0 and until
     * that fix is published, so set this flag to skip any filtering of points.
     *
     * Once the bug is fixed, this flag will have no effect, and it will be deprecated.
     * @method evadeDomainFilter
     * @memberof dc.stackMixin
     * @instance
     * @param {Boolean} [evadeDomainFilter=false]
     * @returns {Boolean|dc.stackMixin}
     */
    _chart.evadeDomainFilter = function (evadeDomainFilter) {
        if (!arguments.length) {
            return _evadeDomainFilter;
        }
        _evadeDomainFilter = evadeDomainFilter;
        return _chart;
    };

    function visibility (l) {
        return !l.hidden;
    }

    _chart.data(function () {
        var layers = _stack.filter(visibility);
        if (!layers.length) {
            return [];
        }
        layers.forEach(prepareValues);
        var v4data = layers[0].values.map(function (v, i) {
            var col = {x: v.x};
            layers.forEach(function (layer) {
                col[layer.name] = layer.values[i].y;
            });
            return col;
        });
        var keys = layers.map(function (layer) { return layer.name; });
        var v4result = _chart.stackLayout().keys(keys)(v4data);
        v4result.forEach(function (series, i) {
            series.forEach(function (ys, j) {
                layers[i].values[j].y0 = ys[0];
                layers[i].values[j].y1 = ys[1];
            });
        });
        return layers;
    });

    _chart._ordinalXDomain = function () {
        var flat = flattenStack().map(dc.pluck('data'));
        var ordered = _chart._computeOrderedGroups(flat);
        return ordered.map(_chart.keyAccessor());
    };

    _chart.colorAccessor(function (d) {
        var layer = this.layer || this.name || d.name || d.layer;
        return layer;
    });

    _chart.legendables = function () {
        return _stack.map(function (layer, i) {
            return {
                chart: _chart,
                name: layer.name,
                hidden: layer.hidden || false,
                color: _chart.getColor.call(layer, layer.values, i)
            };
        });
    };

    _chart.isLegendableHidden = function (d) {
        var layer = findLayerByName(d.name);
        return layer ? layer.hidden : false;
    };

    _chart.legendToggle = function (d) {
        if (_hidableStacks) {
            if (_chart.isLegendableHidden(d)) {
                _chart.showStack(d.name);
            } else {
                _chart.hideStack(d.name);
            }
            //_chart.redraw();
            _chart.renderGroup();
        }
    };

    return _chart;
};

/**
 * Cap is a mixin that groups small data elements below a _cap_ into an *others* grouping for both the
 * Row and Pie Charts.
 *
 * The top ordered elements in the group up to the cap amount will be kept in the chart, and the rest
 * will be replaced with an *others* element, with value equal to the sum of the replaced values. The
 * keys of the elements below the cap limit are recorded in order to filter by those keys when the
 * others* element is clicked.
 * @name capMixin
 * @memberof dc
 * @mixin
 * @param {Object} _chart
 * @returns {dc.capMixin}
 */
dc.capMixin = function (_chart) {
    var _cap = Infinity, _takeFront = true;
    var _othersLabel = 'Others';

    // emulate old group.top(N) ordering
    _chart.ordering(function (kv) {
        return -kv.value;
    });

    var _othersGrouper = function (topItems, restItems) {
        var restItemsSum = d3.sum(restItems, _chart.valueAccessor()),
            restKeys = restItems.map(_chart.keyAccessor());
        if (restItemsSum > 0) {
            return topItems.concat([{
                others: restKeys,
                key: _chart.othersLabel(),
                value: restItemsSum
            }]);
        }
        return topItems;
    };

    _chart.cappedKeyAccessor = function (d, i) {
        if (d.others) {
            return d.key;
        }
        return _chart.keyAccessor()(d, i);
    };

    _chart.cappedValueAccessor = function (d, i) {
        if (d.others) {
            return d.value;
        }
        return _chart.valueAccessor()(d, i);
    };

    // return N "top" groups, where N is the cap, sorted by baseMixin.ordering
    // whether top means front or back depends on takeFront
    _chart.data(function (group) {
        if (_cap === Infinity) {
            return _chart._computeOrderedGroups(group.all());
        } else {
            var items = group.all(), rest;
            items = _chart._computeOrderedGroups(items); // sort by baseMixin.ordering

            if (_cap) {
                if (_takeFront) {
                    rest = items.slice(_cap);
                    items = items.slice(0, _cap);
                } else {
                    var start = Math.max(0, items.length - _cap);
                    rest = items.slice(0, start);
                    items = items.slice(start);
                }
            }

            if (_othersGrouper) {
                return _othersGrouper(items, rest);
            }
            return items;
        }
    });

    /**
     * Get or set the count of elements to that will be included in the cap. If there is an
     * {@link dc.capMixin#othersGrouper othersGrouper}, any further elements will be combined in an
     * extra element with its name determined by {@link dc.capMixin#othersLabel othersLabel}.
     *
     * As of dc.js 2.1 and onward, the capped charts use
     * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group_all group.all()}
     * and {@link dc.baseMixin#ordering baseMixin.ordering()} to determine the order of
     * elements. Then `cap` and {@link dc.capMixin#takeFront takeFront} determine how many elements
     * to keep, from which end of the resulting array.
     *
     * **Migration note:** Up through dc.js 2.0.*, capping used
     * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group_top group.top(N)},
     * which selects the largest items according to
     * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group_order group.order()}.
     * The chart then sorted the items according to {@link dc.baseMixin#ordering baseMixin.ordering()}.
     * So the two values essentially had to agree, but if the `group.order()` was incorrect (it's
     * easy to forget about), the wrong rows or slices would be displayed, in the correct order.
     *
     * If your chart previously relied on `group.order()`, use `chart.ordering()` instead. As of
     * 2.1.5, the ordering defaults to sorting from greatest to least like `group.top(N)` did.
     *
     * If you want to cap by one ordering but sort by another, please
     * [file an issue](https://github.com/dc-js/dc.js/issues/new) - it's still possible but we'll
     * need to work up an example.
     * @method cap
     * @memberof dc.capMixin
     * @instance
     * @param {Number} [count=Infinity]
     * @returns {Number|dc.capMixin}
     */
    _chart.cap = function (count) {
        if (!arguments.length) {
            return _cap;
        }
        _cap = count;
        return _chart;
    };

    /**
     * Get or set the direction of capping. If set, the chart takes the first
     * {@link dc.capMixin#cap cap} elements from the sorted array of elements; otherwise
     * it takes the last `cap` elements.
     * @method takeFront
     * @memberof dc.capMixin
     * @instance
     * @param {Boolean} [takeFront=true]
     * @returns {Boolean|dc.capMixin}
     */
    _chart.takeFront = function (takeFront) {
        if (!arguments.length) {
            return _takeFront;
        }
        _takeFront = takeFront;
        return _chart;
    };

    /**
     * Get or set the label for *Others* slice when slices cap is specified.
     * @method othersLabel
     * @memberof dc.capMixin
     * @instance
     * @param {String} [label="Others"]
     * @returns {String|dc.capMixin}
     */
    _chart.othersLabel = function (label) {
        if (!arguments.length) {
            return _othersLabel;
        }
        _othersLabel = label;
        return _chart;
    };

    /**
     * Get or set the grouper function that will perform the insertion of data for the *Others* slice
     * if the slices cap is specified. If set to a falsy value, no others will be added.
     *
     * The grouper function takes an array of included ("top") items, and an array of the rest of
     * the items. By default the grouper function computes the sum of the rest.
     * @method othersGrouper
     * @memberof dc.capMixin
     * @instance
     * @example
     * // Do not show others
     * chart.othersGrouper(null);
     * // Default others grouper
     * chart.othersGrouper(function (topItems, restItems) {
     *     var restItemsSum = d3.sum(restItems, _chart.valueAccessor()),
     *         restKeys = restItems.map(_chart.keyAccessor());
     *     if (restItemsSum > 0) {
     *         return topItems.concat([{
     *             others: restKeys,
     *             key: _chart.othersLabel(),
     *             value: restItemsSum
     *         }]);
     *     }
     *     return topItems;
     * });
     * @param {Function} [grouperFunction]
     * @returns {Function|dc.capMixin}
     */
    _chart.othersGrouper = function (grouperFunction) {
        if (!arguments.length) {
            return _othersGrouper;
        }
        _othersGrouper = grouperFunction;
        return _chart;
    };

    dc.override(_chart, 'onClick', function (d) {
        if (d.others) {
            _chart.filter([d.others]);
        }
        _chart._onClick(d);
    });

    return _chart;
};

/**
 * This Mixin provides reusable functionalities for any chart that needs to visualize data using bubbles.
 * @name bubbleMixin
 * @memberof dc
 * @mixin
 * @mixes dc.colorMixin
 * @param {Object} _chart
 * @returns {dc.bubbleMixin}
 */
dc.bubbleMixin = function (_chart) {
    var _maxBubbleRelativeSize = 0.3;
    var _minRadiusWithLabel = 10;
    var _sortBubbleSize = false;
    var _elasticRadius = false;

    _chart.BUBBLE_NODE_CLASS = 'node';
    _chart.BUBBLE_CLASS = 'bubble';
    _chart.MIN_RADIUS = 10;

    _chart = dc.colorMixin(_chart);

    _chart.renderLabel(true);

    _chart.data(function (group) {
        var data = group.all();
        if (_sortBubbleSize) {
            // sort descending so smaller bubbles are on top
            var radiusAccessor = _chart.radiusValueAccessor();
            data.sort(function (a, b) { return d3.descending(radiusAccessor(a), radiusAccessor(b)); });
        }
        return data;
    });

    var _r = d3.scaleLinear().domain([0, 100]);

    var _rValueAccessor = function (d) {
        return d.r;
    };

    /**
     * Get or set the bubble radius scale. By default the bubble chart uses
     * {@link https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear d3.scaleLinear().domain([0, 100])}
     * as its radius scale.
     * @method r
     * @memberof dc.bubbleMixin
     * @instance
     * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
     * @param {d3.scale} [bubbleRadiusScale=d3.scaleLinear().domain([0, 100])]
     * @returns {d3.scale|dc.bubbleMixin}
     */
    _chart.r = function (bubbleRadiusScale) {
        if (!arguments.length) {
            return _r;
        }
        _r = bubbleRadiusScale;
        return _chart;
    };

    /**
     * Turn on or off the elastic bubble radius feature, or return the value of the flag. If this
     * feature is turned on, then bubble radii will be automatically rescaled to fit the chart better.
     * @method elasticRadius
     * @memberof dc.bubbleChart
     * @instance
     * @param {Boolean} [elasticRadius=false]
     * @returns {Boolean|dc.bubbleChart}
     */
    _chart.elasticRadius = function (elasticRadius) {
        if (!arguments.length) {
            return _elasticRadius;
        }
        _elasticRadius = elasticRadius;
        return _chart;
    };

    _chart.calculateRadiusDomain = function () {
        if (_elasticRadius) {
            _chart.r().domain([_chart.rMin(), _chart.rMax()]);
        }
    };

    /**
     * Get or set the radius value accessor function. If set, the radius value accessor function will
     * be used to retrieve a data value for each bubble. The data retrieved then will be mapped using
     * the r scale to the actual bubble radius. This allows you to encode a data dimension using bubble
     * size.
     * @method radiusValueAccessor
     * @memberof dc.bubbleMixin
     * @instance
     * @param {Function} [radiusValueAccessor]
     * @returns {Function|dc.bubbleMixin}
     */
    _chart.radiusValueAccessor = function (radiusValueAccessor) {
        if (!arguments.length) {
            return _rValueAccessor;
        }
        _rValueAccessor = radiusValueAccessor;
        return _chart;
    };

    _chart.rMin = function () {
        var min = d3.min(_chart.data(), function (e) {
            return _chart.radiusValueAccessor()(e);
        });
        return min;
    };

    _chart.rMax = function () {
        var max = d3.max(_chart.data(), function (e) {
            return _chart.radiusValueAccessor()(e);
        });
        return max;
    };

    _chart.bubbleR = function (d) {
        var value = _chart.radiusValueAccessor()(d);
        var r = _chart.r()(value);
        if (isNaN(r) || value <= 0) {
            r = 0;
        }
        return r;
    };

    var labelFunction = function (d) {
        return _chart.label()(d);
    };

    var shouldLabel = function (d) {
        return (_chart.bubbleR(d) > _minRadiusWithLabel);
    };

    var labelOpacity = function (d) {
        return shouldLabel(d) ? 1 : 0;
    };

    var labelPointerEvent = function (d) {
        return shouldLabel(d) ? 'all' : 'none';
    };

    _chart._doRenderLabel = function (bubbleGEnter) {
        if (_chart.renderLabel()) {
            var label = bubbleGEnter.select('text');

            if (label.empty()) {
                label = bubbleGEnter.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('dy', '.3em')
                    .on('click', _chart.onClick);
            }

            label
                .attr('opacity', 0)
                .attr('pointer-events', labelPointerEvent)
                .text(labelFunction);
            dc.transition(label, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('opacity', labelOpacity);
        }
    };

    _chart.doUpdateLabels = function (bubbleGEnter) {
        if (_chart.renderLabel()) {
            var labels = bubbleGEnter.select('text')
                .attr('pointer-events', labelPointerEvent)
                .text(labelFunction);
            dc.transition(labels, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('opacity', labelOpacity);
        }
    };

    var titleFunction = function (d) {
        return _chart.title()(d);
    };

    _chart._doRenderTitles = function (g) {
        if (_chart.renderTitle()) {
            var title = g.select('title');

            if (title.empty()) {
                g.append('title').text(titleFunction);
            }
        }
    };

    _chart.doUpdateTitles = function (g) {
        if (_chart.renderTitle()) {
            g.select('title').text(titleFunction);
        }
    };

    /**
     * Turn on or off the bubble sorting feature, or return the value of the flag. If enabled,
     * bubbles will be sorted by their radius, with smaller bubbles in front.
     * @method sortBubbleSize
     * @memberof dc.bubbleChart
     * @instance
     * @param {Boolean} [sortBubbleSize=false]
     * @returns {Boolean|dc.bubbleChart}
     */
    _chart.sortBubbleSize = function (sortBubbleSize) {
        if (!arguments.length) {
            return _sortBubbleSize;
        }
        _sortBubbleSize = sortBubbleSize;
        return _chart;
    };

    /**
     * Get or set the minimum radius. This will be used to initialize the radius scale's range.
     * @method minRadius
     * @memberof dc.bubbleMixin
     * @instance
     * @param {Number} [radius=10]
     * @returns {Number|dc.bubbleMixin}
     */
    _chart.minRadius = function (radius) {
        if (!arguments.length) {
            return _chart.MIN_RADIUS;
        }
        _chart.MIN_RADIUS = radius;
        return _chart;
    };

    /**
     * Get or set the minimum radius for label rendering. If a bubble's radius is less than this value
     * then no label will be rendered.
     * @method minRadiusWithLabel
     * @memberof dc.bubbleMixin
     * @instance
     * @param {Number} [radius=10]
     * @returns {Number|dc.bubbleMixin}
     */

    _chart.minRadiusWithLabel = function (radius) {
        if (!arguments.length) {
            return _minRadiusWithLabel;
        }
        _minRadiusWithLabel = radius;
        return _chart;
    };

    /**
     * Get or set the maximum relative size of a bubble to the length of x axis. This value is useful
     * when the difference in radius between bubbles is too great.
     * @method maxBubbleRelativeSize
     * @memberof dc.bubbleMixin
     * @instance
     * @param {Number} [relativeSize=0.3]
     * @returns {Number|dc.bubbleMixin}
     */
    _chart.maxBubbleRelativeSize = function (relativeSize) {
        if (!arguments.length) {
            return _maxBubbleRelativeSize;
        }
        _maxBubbleRelativeSize = relativeSize;
        return _chart;
    };

    _chart.fadeDeselectedArea = function (selection) {
        if (_chart.hasFilter()) {
            _chart.selectAll('g.' + _chart.BUBBLE_NODE_CLASS).each(function (d) {
                if (_chart.isSelectedNode(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.selectAll('g.' + _chart.BUBBLE_NODE_CLASS).each(function () {
                _chart.resetHighlight(this);
            });
        }
    };

    _chart.isSelectedNode = function (d) {
        return _chart.hasFilter(d.key);
    };

    _chart.onClick = function (d) {
        var filter = d.key;
        dc.events.trigger(function () {
            _chart.filter(filter);
            _chart.redrawGroup();
        });
    };

    return _chart;
};

/**
 * The pie chart implementation is usually used to visualize a small categorical distribution.  The pie
 * chart uses keyAccessor to determine the slices, and valueAccessor to calculate the size of each
 * slice relative to the sum of all values. Slices are ordered by {@link dc.baseMixin#ordering ordering}
 * which defaults to sorting by key.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
 * @class pieChart
 * @memberof dc
 * @mixes dc.capMixin
 * @mixes dc.colorMixin
 * @mixes dc.baseMixin
 * @example
 * // create a pie chart under #chart-container1 element using the default global chart group
 * var chart1 = dc.pieChart('#chart-container1');
 * // create a pie chart under #chart-container2 element using chart group A
 * var chart2 = dc.pieChart('#chart-container2', 'chartGroupA');
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.pieChart}
 */
dc.pieChart = function (parent, chartGroup) {
    var DEFAULT_MIN_ANGLE_FOR_LABEL = 0.5;

    var _sliceCssClass = 'pie-slice';
    var _labelCssClass = 'pie-label';
    var _sliceGroupCssClass = 'pie-slice-group';
    var _labelGroupCssClass = 'pie-label-group';
    var _emptyCssClass = 'empty-chart';
    var _emptyTitle = 'empty';

    var _radius,
        _givenRadius, // specified radius, if any
        _innerRadius = 0,
        _externalRadiusPadding = 0;

    var _g;
    var _cx;
    var _cy;
    var _minAngleForLabel = DEFAULT_MIN_ANGLE_FOR_LABEL;
    var _externalLabelRadius;
    var _drawPaths = false;
    var _chart = dc.capMixin(dc.colorMixin(dc.baseMixin({})));

    _chart.colorAccessor(_chart.cappedKeyAccessor);

    _chart.title(function (d) {
        return _chart.cappedKeyAccessor(d) + ': ' + _chart.cappedValueAccessor(d);
    });

    /**
     * Get or set the maximum number of slices the pie chart will generate. The top slices are determined by
     * value from high to low. Other slices exeeding the cap will be rolled up into one single *Others* slice.
     * @method slicesCap
     * @memberof dc.pieChart
     * @instance
     * @param {Number} [cap]
     * @returns {Number|dc.pieChart}
     */
    _chart.slicesCap = _chart.cap;

    _chart.label(_chart.cappedKeyAccessor);
    _chart.renderLabel(true);

    _chart.transitionDuration(350);
    _chart.transitionDelay(0);

    _chart._doRender = function () {
        _chart.resetSvg();

        _g = _chart.svg()
            .append('g')
            .attr('transform', 'translate(' + _chart.cx() + ',' + _chart.cy() + ')');

        _g.append('g').attr('class', _sliceGroupCssClass);
        _g.append('g').attr('class', _labelGroupCssClass);

        drawChart();

        return _chart;
    };

    function drawChart () {
        // set radius from chart size if none given, or if given radius is too large
        var maxRadius =  d3.min([_chart.width(), _chart.height()]) / 2;
        _radius = _givenRadius && _givenRadius < maxRadius ? _givenRadius : maxRadius;

        var arc = buildArcs();

        var pie = pieLayout();
        var pieData;
        // if we have data...
        if (d3.sum(_chart.data(), _chart.cappedValueAccessor)) {
            pieData = pie(_chart.data());
            _g.classed(_emptyCssClass, false);
        } else {
            // otherwise we'd be getting NaNs, so override
            // note: abuse others for its ignoring the value accessor
            pieData = pie([{key: _emptyTitle, value: 1, others: [_emptyTitle]}]);
            _g.classed(_emptyCssClass, true);
        }

        if (_g) {
            var slices = _g.select('g.' + _sliceGroupCssClass)
                .selectAll('g.' + _sliceCssClass)
                .data(pieData);

            var labels = _g.select('g.' + _labelGroupCssClass)
                .selectAll('text.' + _labelCssClass)
                .data(pieData);

            removeElements(slices, labels);

            createElements(slices, labels, arc, pieData);

            updateElements(pieData, arc);

            highlightFilter();

            dc.transition(_g, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('transform', 'translate(' + _chart.cx() + ',' + _chart.cy() + ')');
        }
    }

    function createElements (slices, labels, arc, pieData) {
        var slicesEnter = createSliceNodes(slices);

        createSlicePath(slicesEnter, arc);

        createTitles(slicesEnter);

        createLabels(labels, pieData, arc);
    }

    function createSliceNodes (slices) {
        var slicesEnter = slices
            .enter()
            .append('g')
            .attr('class', function (d, i) {
                return _sliceCssClass + ' _' + i;
            });
        return slicesEnter;
    }

    function createSlicePath (slicesEnter, arc) {
        var slicePath = slicesEnter.append('path')
            .attr('fill', fill)
            .on('click', onClick)
            .attr('d', function (d, i) {
                return safeArc(d, i, arc);
            });

        var transition = dc.transition(slicePath, _chart.transitionDuration(), _chart.transitionDelay());
        if (transition.attrTween) {
            transition.attrTween('d', tweenPie);
        }
    }

    function createTitles (slicesEnter) {
        if (_chart.renderTitle()) {
            slicesEnter.append('title').text(function (d) {
                return _chart.title()(d.data);
            });
        }
    }

    _chart._applyLabelText = function (labels) {
        labels
            .text(function (d) {
                var data = d.data;
                if ((sliceHasNoData(data) || sliceTooSmall(d)) && !isSelectedSlice(d)) {
                    return '';
                }
                return _chart.label()(d.data);
            });
    };

    function positionLabels (labels, arc) {
        _chart._applyLabelText(labels);
        dc.transition(labels, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('transform', function (d) {
                return labelPosition(d, arc);
            })
            .attr('text-anchor', 'middle');
    }

    function highlightSlice (i, whether) {
        _chart.select('g.pie-slice._' + i)
            .classed('highlight', whether);
    }

    function createLabels (labels, pieData, arc) {
        if (_chart.renderLabel()) {
            var labelsEnter = labels
                .enter()
                .append('text')
                .attr('class', function (d, i) {
                    var classes = _sliceCssClass + ' ' + _labelCssClass + ' _' + i;
                    if (_externalLabelRadius) {
                        classes += ' external';
                    }
                    return classes;
                })
                .on('click', onClick)
                .on('mouseover', function (d, i) {
                    highlightSlice(i, true);
                })
                .on('mouseout', function (d, i) {
                    highlightSlice(i, false);
                });
            positionLabels(labelsEnter, arc);
            if (_externalLabelRadius && _drawPaths) {
                updateLabelPaths(pieData, arc);
            }
        }
    }

    function updateLabelPaths (pieData, arc) {
        var polyline = _g.selectAll('polyline.' + _sliceCssClass)
                .data(pieData);

        polyline.exit().remove();

        polyline = polyline
            .enter()
            .append('polyline')
            .attr('class', function (d, i) {
                return 'pie-path _' + i + ' ' + _sliceCssClass;
            })
            .on('click', onClick)
            .on('mouseover', function (d, i) {
                highlightSlice(i, true);
            })
            .on('mouseout', function (d, i) {
                highlightSlice(i, false);
            })
            .merge(polyline);

        var arc2 = d3.arc()
                .outerRadius(_radius - _externalRadiusPadding + _externalLabelRadius)
                .innerRadius(_radius - _externalRadiusPadding);
        var transition = dc.transition(polyline, _chart.transitionDuration(), _chart.transitionDelay());
        // this is one rare case where d3.selection differs from d3.transition
        if (transition.attrTween) {
            transition
                .attrTween('points', function (d) {
                    var current = this._current || d;
                    current = {startAngle: current.startAngle, endAngle: current.endAngle};
                    var interpolate = d3.interpolate(current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        var d2 = interpolate(t);
                        return [arc.centroid(d2), arc2.centroid(d2)];
                    };
                });
        } else {
            transition.attr('points', function (d) {
                return [arc.centroid(d), arc2.centroid(d)];
            });
        }
        transition.style('visibility', function (d) {
            return d.endAngle - d.startAngle < 0.0001 ? 'hidden' : 'visible';
        });

    }

    function updateElements (pieData, arc) {
        updateSlicePaths(pieData, arc);
        updateLabels(pieData, arc);
        updateTitles(pieData);
    }

    function updateSlicePaths (pieData, arc) {
        var slicePaths = _g.selectAll('g.' + _sliceCssClass)
            .data(pieData)
            .select('path')
            .attr('d', function (d, i) {
                return safeArc(d, i, arc);
            });
        var transition = dc.transition(slicePaths, _chart.transitionDuration(), _chart.transitionDelay());
        if (transition.attrTween) {
            transition.attrTween('d', tweenPie);
        }
        transition.attr('fill', fill);
    }

    function updateLabels (pieData, arc) {
        if (_chart.renderLabel()) {
            var labels = _g.selectAll('text.' + _labelCssClass)
                .data(pieData);
            positionLabels(labels, arc);
            if (_externalLabelRadius && _drawPaths) {
                updateLabelPaths(pieData, arc);
            }
        }
    }

    function updateTitles (pieData) {
        if (_chart.renderTitle()) {
            _g.selectAll('g.' + _sliceCssClass)
                .data(pieData)
                .select('title')
                .text(function (d) {
                    return _chart.title()(d.data);
                });
        }
    }

    function removeElements (slices, labels) {
        slices.exit().remove();
        labels.exit().remove();
    }

    function highlightFilter () {
        if (_chart.hasFilter()) {
            _chart.selectAll('g.' + _sliceCssClass).each(function (d) {
                if (isSelectedSlice(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.selectAll('g.' + _sliceCssClass).each(function () {
                _chart.resetHighlight(this);
            });
        }
    }

    /**
     * Get or set the external radius padding of the pie chart. This will force the radius of the
     * pie chart to become smaller or larger depending on the value.
     * @method externalRadiusPadding
     * @memberof dc.pieChart
     * @instance
     * @param {Number} [externalRadiusPadding=0]
     * @returns {Number|dc.pieChart}
     */
    _chart.externalRadiusPadding = function (externalRadiusPadding) {
        if (!arguments.length) {
            return _externalRadiusPadding;
        }
        _externalRadiusPadding = externalRadiusPadding;
        return _chart;
    };

    /**
     * Get or set the inner radius of the pie chart. If the inner radius is greater than 0px then the
     * pie chart will be rendered as a doughnut chart.
     * @method innerRadius
     * @memberof dc.pieChart
     * @instance
     * @param {Number} [innerRadius=0]
     * @returns {Number|dc.pieChart}
     */
    _chart.innerRadius = function (innerRadius) {
        if (!arguments.length) {
            return _innerRadius;
        }
        _innerRadius = innerRadius;
        return _chart;
    };

    /**
     * Get or set the outer radius. If the radius is not set, it will be half of the minimum of the
     * chart width and height.
     * @method radius
     * @memberof dc.pieChart
     * @instance
     * @param {Number} [radius]
     * @returns {Number|dc.pieChart}
     */
    _chart.radius = function (radius) {
        if (!arguments.length) {
            return _givenRadius;
        }
        _givenRadius = radius;
        return _chart;
    };

    /**
     * Get or set center x coordinate position. Default is center of svg.
     * @method cx
     * @memberof dc.pieChart
     * @instance
     * @param {Number} [cx]
     * @returns {Number|dc.pieChart}
     */
    _chart.cx = function (cx) {
        if (!arguments.length) {
            return (_cx ||  _chart.width() / 2);
        }
        _cx = cx;
        return _chart;
    };

    /**
     * Get or set center y coordinate position. Default is center of svg.
     * @method cy
     * @memberof dc.pieChart
     * @instance
     * @param {Number} [cy]
     * @returns {Number|dc.pieChart}
     */
    _chart.cy = function (cy) {
        if (!arguments.length) {
            return (_cy ||  _chart.height() / 2);
        }
        _cy = cy;
        return _chart;
    };

    function buildArcs () {
        return d3.arc()
            .outerRadius(_radius - _externalRadiusPadding)
            .innerRadius(_innerRadius);
    }

    function isSelectedSlice (d) {
        return _chart.hasFilter(_chart.cappedKeyAccessor(d.data));
    }

    _chart._doRedraw = function () {
        drawChart();
        return _chart;
    };

    /**
     * Get or set the minimal slice angle for label rendering. Any slice with a smaller angle will not
     * display a slice label.
     * @method minAngleForLabel
     * @memberof dc.pieChart
     * @instance
     * @param {Number} [minAngleForLabel=0.5]
     * @returns {Number|dc.pieChart}
     */
    _chart.minAngleForLabel = function (minAngleForLabel) {
        if (!arguments.length) {
            return _minAngleForLabel;
        }
        _minAngleForLabel = minAngleForLabel;
        return _chart;
    };

    function pieLayout () {
        return d3.pie().sort(null).value(_chart.cappedValueAccessor);
    }

    function sliceTooSmall (d) {
        var angle = (d.endAngle - d.startAngle);
        return isNaN(angle) || angle < _minAngleForLabel;
    }

    function sliceHasNoData (d) {
        return _chart.cappedValueAccessor(d) === 0;
    }

    function tweenPie (b) {
        b.innerRadius = _innerRadius;
        var current = this._current;
        if (isOffCanvas(current)) {
            current = {startAngle: 0, endAngle: 0};
        } else {
            // only interpolate startAngle & endAngle, not the whole data object
            current = {startAngle: current.startAngle, endAngle: current.endAngle};
        }
        var i = d3.interpolate(current, b);
        this._current = i(0);
        return function (t) {
            return safeArc(i(t), 0, buildArcs());
        };
    }

    function isOffCanvas (current) {
        return !current || isNaN(current.startAngle) || isNaN(current.endAngle);
    }

    function fill (d, i) {
        return _chart.getColor(d.data, i);
    }

    function onClick (d, i) {
        if (_g.attr('class') !== _emptyCssClass) {
            _chart.onClick(d.data, i);
        }
    }

    function safeArc (d, i, arc) {
        var path = arc(d, i);
        if (path.indexOf('NaN') >= 0) {
            path = 'M0,0';
        }
        return path;
    }

    /**
     * Title to use for the only slice when there is no data.
     * @method emptyTitle
     * @memberof dc.pieChart
     * @instance
     * @param {String} [title]
     * @returns {String|dc.pieChart}
     */
    _chart.emptyTitle = function (title) {
        if (arguments.length === 0) {
            return _emptyTitle;
        }
        _emptyTitle = title;
        return _chart;
    };

    /**
     * Position slice labels offset from the outer edge of the chart.
     *
     * The argument specifies the extra radius to be added for slice labels.
     * @method externalLabels
     * @memberof dc.pieChart
     * @instance
     * @param {Number} [externalLabelRadius]
     * @returns {Number|dc.pieChart}
     */
    _chart.externalLabels = function (externalLabelRadius) {
        if (arguments.length === 0) {
            return _externalLabelRadius;
        } else if (externalLabelRadius) {
            _externalLabelRadius = externalLabelRadius;
        } else {
            _externalLabelRadius = undefined;
        }

        return _chart;
    };

    /**
     * Get or set whether to draw lines from pie slices to their labels.
     *
     * @method drawPaths
     * @memberof dc.pieChart
     * @instance
     * @param {Boolean} [drawPaths]
     * @returns {Boolean|dc.pieChart}
     */
    _chart.drawPaths = function (drawPaths) {
        if (arguments.length === 0) {
            return _drawPaths;
        }
        _drawPaths = drawPaths;
        return _chart;
    };

    function labelPosition (d, arc) {
        var centroid;
        if (_externalLabelRadius) {
            centroid = d3.arc()
                .outerRadius(_radius - _externalRadiusPadding + _externalLabelRadius)
                .innerRadius(_radius - _externalRadiusPadding + _externalLabelRadius)
                .centroid(d);
        } else {
            centroid = arc.centroid(d);
        }
        if (isNaN(centroid[0]) || isNaN(centroid[1])) {
            return 'translate(0,0)';
        } else {
            return 'translate(' + centroid + ')';
        }
    }

    _chart.legendables = function () {
        return _chart.data().map(function (d, i) {
            var legendable = {name: d.key, data: d.value, others: d.others, chart: _chart};
            legendable.color = _chart.getColor(d, i);
            return legendable;
        });
    };

    _chart.legendHighlight = function (d) {
        highlightSliceFromLegendable(d, true);
    };

    _chart.legendReset = function (d) {
        highlightSliceFromLegendable(d, false);
    };

    _chart.legendToggle = function (d) {
        _chart.onClick({key: d.name, others: d.others});
    };

    function highlightSliceFromLegendable (legendable, highlighted) {
        _chart.selectAll('g.pie-slice').each(function (d) {
            if (legendable.name === d.data.key) {
                d3.select(this).classed('highlight', highlighted);
            }
        });
    }

    return _chart.anchor(parent, chartGroup);
};

/**
 * The sunburst chart implementation is usually used to visualize a small tree distribution.  The sunburst
 * chart uses keyAccessor to determine the slices, and valueAccessor to calculate the size of each
 * slice relative to the sum of all values. Slices are ordered by {@link dc.baseMixin#ordering ordering} which defaults to sorting
 * by key.
 *
 * The keys used in the sunburst chart should be arrays, representing paths in the tree.
 *
 * When filtering, the sunburst chart creates instances of {@link dc.filters.HierarchyFilter HierarchyFilter}.
 *
 * @class sunburstChart
 * @memberof dc
 * @mixes dc.capMixin
 * @mixes dc.colorMixin
 * @mixes dc.baseMixin
 * @example
 * // create a sunburst chart under #chart-container1 element using the default global chart group
 * var chart1 = dc.sunburstChart('#chart-container1');
 * // create a sunburst chart under #chart-container2 element using chart group A
 * var chart2 = dc.sunburstChart('#chart-container2', 'chartGroupA');
 *
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-3.x-api-reference/blob/master/Selections.md#selecting-elements d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.sunburstChart}
 **/
dc.sunburstChart = function (parent, chartGroup) {
    var DEFAULT_MIN_ANGLE_FOR_LABEL = 0.5;

    var _sliceCssClass = 'pie-slice';
    var _emptyCssClass = 'empty-chart';
    var _emptyTitle = 'empty';

    var _radius,
        _innerRadius = 0;

    var _g;
    var _cx;
    var _cy;
    var _minAngleForLabel = DEFAULT_MIN_ANGLE_FOR_LABEL;
    var _externalLabelRadius;
    var _chart = dc.capMixin(dc.colorMixin(dc.baseMixin({})));

    _chart.colorAccessor(_chart.cappedKeyAccessor);

    // Handle cases if value corresponds to generated parent nodes
    function extendedValueAccessor (d) {
        if (d.path) {
            return d.value;
        }
        return _chart.cappedValueAccessor(d);
    }

    _chart.title(function (d) {
        return _chart.cappedKeyAccessor(d) + ': ' + extendedValueAccessor(d);
    });

    _chart.label(_chart.cappedKeyAccessor);
    _chart.renderLabel(true);

    _chart.transitionDuration(350);

    _chart.filterHandler(function (dimension, filters) {
        if (filters.length === 0) {
            dimension.filter(null);
        } else {
            dimension.filterFunction(function (d) {
                for (var i = 0; i < filters.length; i++) {
                    var filter = filters[i];
                    if (filter.isFiltered && filter.isFiltered(d)) {
                        return true;
                    }
                }
                return false;
            });
        }
        return filters;
    });

    _chart._doRender = function () {
        _chart.resetSvg();

        _g = _chart.svg()
            .append('g')
            .attr('transform', 'translate(' + _chart.cx() + ',' + _chart.cy() + ')');

        drawChart();

        return _chart;
    };

    function drawChart () {
        // set radius on basis of chart dimension if missing
        _radius = _radius ? _radius : d3.min([_chart.width(), _chart.height()]) / 2;

        var arc = buildArcs();

        var sunburstData, cdata;
        // if we have data...
        if (d3.sum(_chart.data(), _chart.valueAccessor())) {
            cdata = dc.utils.toHierarchy(_chart.data(), _chart.valueAccessor());
            sunburstData = partitionNodes(cdata);
            // First one is the root, which is not needed
            sunburstData.shift();
            _g.classed(_emptyCssClass, false);
        } else {
            // otherwise we'd be getting NaNs, so override
            // note: abuse others for its ignoring the value accessor
            cdata = dc.utils.toHierarchy([], function (d) {
                return d.value;
            });
            sunburstData = partitionNodes(cdata);
            _g.classed(_emptyCssClass, true);
        }

        if (_g) {
            var slices = _g.selectAll('g.' + _sliceCssClass)
                .data(sunburstData);
            createElements(slices, arc, sunburstData);

            updateElements(sunburstData, arc);

            removeElements(slices);

            highlightFilter();
        }
    }

    function createElements (slices, arc, sunburstData) {
        var slicesEnter = createSliceNodes(slices);

        createSlicePath(slicesEnter, arc);
        createTitles(slicesEnter);
        createLabels(sunburstData, arc);
    }

    function createSliceNodes (slices) {
        var slicesEnter = slices
            .enter()
            .append('g')
            .attr('class', function (d, i) {
                return _sliceCssClass +
                    ' _' + i + ' ' +
                    _sliceCssClass + '-level-' + d.depth;
            });
        return slicesEnter;
    }

    function createSlicePath (slicesEnter, arc) {
        var slicePath = slicesEnter.append('path')
            .attr('fill', fill)
            .on('click', onClick)
            .attr('d', function (d) {
                return safeArc(arc, d);
            });

        var transition = dc.transition(slicePath, _chart.transitionDuration());
        if (transition.attrTween) {
            transition.attrTween('d', tweenSlice);
        }
    }

    function createTitles (slicesEnter) {
        if (_chart.renderTitle()) {
            slicesEnter.append('title').text(function (d) {
                return _chart.title()(d);
            });
        }
    }

    function positionLabels (labelsEnter, arc) {
        dc.transition(labelsEnter, _chart.transitionDuration())
            .attr('transform', function (d) {
                return labelPosition(d, arc);
            })
            .attr('text-anchor', 'middle')
            .text(function (d) {
                // position label...
                if (sliceHasNoData(d) || sliceTooSmall(d)) {
                    return '';
                }
                return _chart.label()(d);
            });
    }

    function createLabels (sunburstData, arc) {
        if (_chart.renderLabel()) {
            var labels = _g.selectAll('text.' + _sliceCssClass)
                .data(sunburstData);

            labels.exit().remove();

            var labelsEnter = labels
                .enter()
                .append('text')
                .attr('class', function (d, i) {
                    var classes = _sliceCssClass + ' _' + i;
                    if (_externalLabelRadius) {
                        classes += ' external';
                    }
                    return classes;
                })
                .on('click', onClick);
            positionLabels(labelsEnter, arc);
        }
    }

    function updateElements (sunburstData, arc) {
        updateSlicePaths(sunburstData, arc);
        updateLabels(sunburstData, arc);
        updateTitles(sunburstData);
    }

    function updateSlicePaths (sunburstData, arc) {
        var slicePaths = _g.selectAll('g.' + _sliceCssClass)
            .data(sunburstData)
            .select('path')
            .attr('d', function (d, i) {
                return safeArc(arc, d);
            });
        var transition = dc.transition(slicePaths, _chart.transitionDuration());
        if (transition.attrTween) {
            transition.attrTween('d', tweenSlice);
        }
        transition.attr('fill', fill);
    }

    function updateLabels (sunburstData, arc) {
        if (_chart.renderLabel()) {
            var labels = _g.selectAll('text.' + _sliceCssClass)
                .data(sunburstData);
            positionLabels(labels, arc);
        }
    }

    function updateTitles (sunburstData) {
        if (_chart.renderTitle()) {
            _g.selectAll('g.' + _sliceCssClass)
                .data(sunburstData)
                .select('title')
                .text(function (d) {
                    return _chart.title()(d);
                });
        }
    }

    function removeElements (slices) {
        slices.exit().remove();
    }

    function highlightFilter () {
        if (_chart.hasFilter()) {
            _chart.selectAll('g.' + _sliceCssClass).each(function (d) {
                if (isSelectedSlice(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.selectAll('g.' + _sliceCssClass).each(function (d) {
                _chart.resetHighlight(this);
            });
        }
    }

    /**
     * Get or set the inner radius of the sunburst chart. If the inner radius is greater than 0px then the
     * sunburst chart will be rendered as a doughnut chart. Default inner radius is 0px.
     * @method innerRadius
     * @memberof dc.sunburstChart
     * @instance
     * @param {Number} [innerRadius=0]
     * @returns {Number|dc.sunburstChart}
     */
    _chart.innerRadius = function (innerRadius) {
        if (!arguments.length) {
            return _innerRadius;
        }
        _innerRadius = innerRadius;
        return _chart;
    };

    /**
     * Get or set the outer radius. If the radius is not set, it will be half of the minimum of the
     * chart width and height.
     * @method radius
     * @memberof dc.sunburstChart
     * @instance
     * @param {Number} [radius]
     * @returns {Number|dc.sunburstChart}
     */
    _chart.radius = function (radius) {
        if (!arguments.length) {
            return _radius;
        }
        _radius = radius;
        return _chart;
    };

    /**
     * Get or set center x coordinate position. Default is center of svg.
     * @method cx
     * @memberof dc.sunburstChart
     * @instance
     * @param {Number} [cx]
     * @returns {Number|dc.sunburstChart}
     */
    _chart.cx = function (cx) {
        if (!arguments.length) {
            return (_cx || _chart.width() / 2);
        }
        _cx = cx;
        return _chart;
    };

    /**
     * Get or set center y coordinate position. Default is center of svg.
     * @method cy
     * @memberof dc.sunburstChart
     * @instance
     * @param {Number} [cy]
     * @returns {Number|dc.sunburstChart}
     */
    _chart.cy = function (cy) {
        if (!arguments.length) {
            return (_cy || _chart.height() / 2);
        }
        _cy = cy;
        return _chart;
    };

    /**
     * Get or set the minimal slice angle for label rendering. Any slice with a smaller angle will not
     * display a slice label.
     * @method minAngleForLabel
     * @memberof dc.sunburstChart
     * @instance
     * @param {Number} [minAngleForLabel=0.5]
     * @returns {Number|dc.sunburstChart}
     */
    _chart.minAngleForLabel = function (minAngleForLabel) {
        if (!arguments.length) {
            return _minAngleForLabel;
        }
        _minAngleForLabel = minAngleForLabel;
        return _chart;
    };

    /**
     * Title to use for the only slice when there is no data.
     * @method emptyTitle
     * @memberof dc.sunburstChart
     * @instance
     * @param {String} [title]
     * @returns {String|dc.sunburstChart}
     */
    _chart.emptyTitle = function (title) {
        if (arguments.length === 0) {
            return _emptyTitle;
        }
        _emptyTitle = title;
        return _chart;
    };

    /**
     * Position slice labels offset from the outer edge of the chart.
     *
     * The argument specifies the extra radius to be added for slice labels.
     * @method externalLabels
     * @memberof dc.sunburstChart
     * @instance
     * @param {Number} [externalLabelRadius]
     * @returns {Number|dc.sunburstChart}
     */
    _chart.externalLabels = function (externalLabelRadius) {
        if (arguments.length === 0) {
            return _externalLabelRadius;
        } else if (externalLabelRadius) {
            _externalLabelRadius = externalLabelRadius;
        } else {
            _externalLabelRadius = undefined;
        }

        return _chart;
    };

    function buildArcs () {
        return d3.arc()
            .startAngle(function (d) {
                return d.x0;
            })
            .endAngle(function (d) {
                return d.x1;
            })
            .innerRadius(function (d) {
                return d.data.path && d.data.path.length === 1 ? _innerRadius : Math.sqrt(d.y0);
            })
            .outerRadius(function (d) {
                return Math.sqrt(d.y1);
            });
    }

    function isSelectedSlice (d) {
        return isPathFiltered(d.path);
    }

    function isPathFiltered (path) {
        for (var i = 0; i < _chart.filters().length; i++) {
            var currentFilter = _chart.filters()[i];
            if (currentFilter.isFiltered(path)) {
                return true;
            }
        }
        return false;
    }

    // returns all filters that are a parent or child of the path
    function filtersForPath (path) {
        var pathFilter = dc.filters.HierarchyFilter(path);
        var filters = [];
        for (var i = 0; i < _chart.filters().length; i++) {
            var currentFilter = _chart.filters()[i];
            if (currentFilter.isFiltered(path) || pathFilter.isFiltered(currentFilter)) {
                filters.push(currentFilter);
            }
        }
        return filters;
    }

    _chart._doRedraw = function () {
        drawChart();
        return _chart;
    };

    function partitionNodes (data) {
        // The changes picked up from https://github.com/d3/d3-hierarchy/issues/50
        var hierarchy = d3.hierarchy(data)
            .sum(function (d) {
                return d.children ? 0 : extendedValueAccessor(d);
            })
            .sort(function (a, b) {
                return d3.ascending(a.data.path, b.data.path);
            });

        var partition = d3.partition()
            .size([2 * Math.PI, _radius * _radius]);

        partition(hierarchy);

        // In D3v4 the returned data is slightly different, change it enough to suit our purposes.
        var nodes = hierarchy.descendants().map(function (d) {
            d.key = d.data.key;
            d.path = d.data.path;
            return d;
        });

        return nodes;
    }

    function sliceTooSmall (d) {
        var angle = d.x1 - d.x0;
        return isNaN(angle) || angle < _minAngleForLabel;
    }

    function sliceHasNoData (d) {
        return extendedValueAccessor(d) === 0;
    }

    function tweenSlice (d) {
        var current = this._current;
        if (isOffCanvas(current)) {
            current = {x0: 0, x1: 0, y0: 0, y1: 0};
        }
        var tweenTarget = {
            x0: d.x0,
            x1: d.x1,
            y0: d.y0,
            y1: d.y1
        };
        var i = d3.interpolate(current, tweenTarget);
        this._current = i(0);
        return function (t) {
            return safeArc(buildArcs(), Object.assign({}, d, i(t)));
        };
    }

    function isOffCanvas (d) {
        return !d || isNaN(d.x0) || isNaN(d.y0);
    }

    function fill (d, i) {
        return _chart.getColor(d.data, i);
    }

    function _onClick (d) {
        // Clicking on Legends do not filter, it throws exception
        // Must be better way to handle this, in legends we need to access `d.key`
        var path = d.path || d.key;
        var filter = dc.filters.HierarchyFilter(path);

        // filters are equal to, parents or children of the path.
        var filters = filtersForPath(path);
        var exactMatch = false;
        // clear out any filters that cover the path filtered.
        for (var i = filters.length - 1; i >= 0; i--) {
            var currentFilter = filters[i];
            if (dc.utils.arraysIdentical(currentFilter, path)) {
                exactMatch = true;
            }
            _chart.filter(filters[i]);
        }
        dc.events.trigger(function () {
            // if it is a new filter - put it in.
            if (!exactMatch) {
                _chart.filter(filter);
            }
            _chart.redrawGroup();
        });
    }

    _chart.onClick = onClick;

    function onClick (d, i) {
        if (_g.attr('class') !== _emptyCssClass) {
            _onClick(d, i);
        }
    }

    function safeArc (arc, d) {
        var path = arc(d);
        if (path.indexOf('NaN') >= 0) {
            path = 'M0,0';
        }
        return path;
    }

    function labelPosition (d, arc) {
        var centroid;
        if (_externalLabelRadius) {
            centroid = d3.svg.arc()
                .outerRadius(_radius + _externalLabelRadius)
                .innerRadius(_radius + _externalLabelRadius)
                .centroid(d);
        } else {
            centroid = arc.centroid(d);
        }
        if (isNaN(centroid[0]) || isNaN(centroid[1])) {
            return 'translate(0,0)';
        } else {
            return 'translate(' + centroid + ')';
        }
    }

    _chart.legendables = function () {
        return _chart.data().map(function (d, i) {
            var legendable = {name: d.key, data: d.value, others: d.others, chart: _chart};
            legendable.color = _chart.getColor(d, i);
            return legendable;
        });
    };

    _chart.legendHighlight = function (d) {
        highlightSliceFromLegendable(d, true);
    };

    _chart.legendReset = function (d) {
        highlightSliceFromLegendable(d, false);
    };

    _chart.legendToggle = function (d) {
        _chart.onClick({key: d.name, others: d.others});
    };

    function highlightSliceFromLegendable (legendable, highlighted) {
        _chart.selectAll('g.pie-slice').each(function (d) {
            if (legendable.name === d.key) {
                d3.select(this).classed('highlight', highlighted);
            }
        });
    }

    return _chart.anchor(parent, chartGroup);
};

/**
 * Concrete bar chart/histogram implementation.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
 * - {@link http://dc-js.github.com/dc.js/crime/index.html Canadian City Crime Stats}
 * @class barChart
 * @memberof dc
 * @mixes dc.stackMixin
 * @mixes dc.coordinateGridMixin
 * @example
 * // create a bar chart under #chart-container1 element using the default global chart group
 * var chart1 = dc.barChart('#chart-container1');
 * // create a bar chart under #chart-container2 element using chart group A
 * var chart2 = dc.barChart('#chart-container2', 'chartGroupA');
 * // create a sub-chart under a composite parent chart
 * var chart3 = dc.barChart(compositeChart);
 * @param {String|node|d3.selection|dc.compositeChart} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector}
 * specifying a dom block element such as a div; or a dom element or d3 selection.  If the bar
 * chart is a sub-chart in a {@link dc.compositeChart Composite Chart} then pass in the parent
 * composite chart instance instead.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.barChart}
 */
dc.barChart = function (parent, chartGroup) {
    var MIN_BAR_WIDTH = 1;
    var DEFAULT_GAP_BETWEEN_BARS = 2;
    var LABEL_PADDING = 3;

    var _chart = dc.stackMixin(dc.coordinateGridMixin({}));

    var _gap = DEFAULT_GAP_BETWEEN_BARS;
    var _centerBar = false;
    var _alwaysUseRounding = false;

    var _barWidth;

    dc.override(_chart, 'rescale', function () {
        _chart._rescale();
        _barWidth = undefined;
        return _chart;
    });

    dc.override(_chart, 'render', function () {
        if (_chart.round() && _centerBar && !_alwaysUseRounding) {
            dc.logger.warn('By default, brush rounding is disabled if bars are centered. ' +
                         'See dc.js bar chart API documentation for details.');
        }

        return _chart._render();
    });

    _chart.label(function (d) {
        return dc.utils.printSingleValue(d.y0 + d.y);
    }, false);

    _chart.plotData = function () {
        var layers = _chart.chartBodyG().selectAll('g.stack')
            .data(_chart.data());

        calculateBarWidth();

        layers = layers
            .enter()
                .append('g')
                .attr('class', function (d, i) {
                    return 'stack ' + '_' + i;
                })
            .merge(layers);

        var last = layers.size() - 1;
        layers.each(function (d, i) {
            var layer = d3.select(this);

            renderBars(layer, i, d);

            if (_chart.renderLabel() && last === i) {
                renderLabels(layer, i, d);
            }
        });
    };

    function barHeight (d) {
        return dc.utils.safeNumber(Math.abs(_chart.y()(d.y + d.y0) - _chart.y()(d.y0)));
    }

    function labelXPos (d) {
        var x = _chart.x()(d.x);
        if (!_centerBar) {
            x += _barWidth / 2;
        }
        if (_chart.isOrdinal() && _gap !== undefined) {
            x += _gap / 2;
        }
        return dc.utils.safeNumber(x);
    }

    function labelYPos (d) {
        var y = _chart.y()(d.y + d.y0);

        if (d.y < 0) {
            y -= barHeight(d);
        }

        return dc.utils.safeNumber(y - LABEL_PADDING);
    }

    function renderLabels (layer, layerIndex, d) {
        var labels = layer.selectAll('text.barLabel')
            .data(d.values, dc.pluck('x'));

        var labelsEnterUpdate = labels
            .enter()
                .append('text')
                .attr('class', 'barLabel')
                .attr('text-anchor', 'middle')
                .attr('x', labelXPos)
                .attr('y', labelYPos)
            .merge(labels);

        if (_chart.isOrdinal()) {
            labelsEnterUpdate.on('click', _chart.onClick);
            labelsEnterUpdate.attr('cursor', 'pointer');
        }

        dc.transition(labelsEnterUpdate, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('x', labelXPos)
            .attr('y', labelYPos)
            .text(function (d) {
                return _chart.label()(d);
            });

        dc.transition(labels.exit(), _chart.transitionDuration(), _chart.transitionDelay())
            .attr('height', 0)
            .remove();
    }

    function barXPos (d) {
        var x = _chart.x()(d.x);
        if (_centerBar) {
            x -= _barWidth / 2;
        }
        if (_chart.isOrdinal() && _gap !== undefined) {
            x += _gap / 2;
        }
        return dc.utils.safeNumber(x);
    }

    function renderBars (layer, layerIndex, d) {
        var bars = layer.selectAll('rect.bar')
            .data(d.values, dc.pluck('x'));

        var enter = bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('fill', dc.pluck('data', _chart.getColor))
            .attr('x', barXPos)
            .attr('y', _chart.yAxisHeight())
            .attr('height', 0);

        var barsEnterUpdate = enter.merge(bars);

        if (_chart.renderTitle()) {
            enter.append('title').text(dc.pluck('data', _chart.title(d.name)));
        }

        if (_chart.isOrdinal()) {
            barsEnterUpdate.on('click', _chart.onClick);
        }

        dc.transition(barsEnterUpdate, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('x', barXPos)
            .attr('y', function (d) {
                var y = _chart.y()(d.y + d.y0);

                if (d.y < 0) {
                    y -= barHeight(d);
                }

                return dc.utils.safeNumber(y);
            })
            .attr('width', _barWidth)
            .attr('height', function (d) {
                return barHeight(d);
            })
            .attr('fill', dc.pluck('data', _chart.getColor))
            .select('title').text(dc.pluck('data', _chart.title(d.name)));

        dc.transition(bars.exit(), _chart.transitionDuration(), _chart.transitionDelay())
            .attr('x', function (d) { return _chart.x()(d.x); })
            .attr('width', _barWidth * 0.9)
            .remove();
    }

    function calculateBarWidth () {
        if (_barWidth === undefined) {
            var numberOfBars = _chart.xUnitCount();

            // please can't we always use rangeBands for bar charts?
            if (_chart.isOrdinal() && _gap === undefined) {
                _barWidth = Math.floor(_chart.x().bandwidth());
            } else if (_gap) {
                _barWidth = Math.floor((_chart.xAxisLength() - (numberOfBars - 1) * _gap) / numberOfBars);
            } else {
                _barWidth = Math.floor(_chart.xAxisLength() / (1 + _chart.barPadding()) / numberOfBars);
            }

            if (_barWidth === Infinity || isNaN(_barWidth) || _barWidth < MIN_BAR_WIDTH) {
                _barWidth = MIN_BAR_WIDTH;
            }
        }
    }

    _chart.fadeDeselectedArea = function (brushSelection) {
        var bars = _chart.chartBodyG().selectAll('rect.bar');

        if (_chart.isOrdinal()) {
            if (_chart.hasFilter()) {
                bars.classed(dc.constants.SELECTED_CLASS, function (d) {
                    return _chart.hasFilter(d.x);
                });
                bars.classed(dc.constants.DESELECTED_CLASS, function (d) {
                    return !_chart.hasFilter(d.x);
                });
            } else {
                bars.classed(dc.constants.SELECTED_CLASS, false);
                bars.classed(dc.constants.DESELECTED_CLASS, false);
            }
        } else if (_chart.brushOn() || _chart.parentBrushOn()) {
            if (!_chart.brushIsEmpty(brushSelection)) {
                var start = brushSelection[0];
                var end = brushSelection[1];

                bars.classed(dc.constants.DESELECTED_CLASS, function (d) {
                    return d.x < start || d.x >= end;
                });
            } else {
                bars.classed(dc.constants.DESELECTED_CLASS, false);
            }
        }
    };

    /**
     * Whether the bar chart will render each bar centered around the data position on the x-axis.
     * @method centerBar
     * @memberof dc.barChart
     * @instance
     * @param {Boolean} [centerBar=false]
     * @returns {Boolean|dc.barChart}
     */
    _chart.centerBar = function (centerBar) {
        if (!arguments.length) {
            return _centerBar;
        }
        _centerBar = centerBar;
        return _chart;
    };

    dc.override(_chart, 'onClick', function (d) {
        _chart._onClick(d.data);
    });

    /**
     * Get or set the spacing between bars as a fraction of bar size. Valid values are between 0-1.
     * Setting this value will also remove any previously set {@link dc.barChart#gap gap}. See the
     * {@link https://github.com/d3/d3-scale/blob/master/README.md#scaleBand d3 docs}
     * for a visual description of how the padding is applied.
     * @method barPadding
     * @memberof dc.barChart
     * @instance
     * @param {Number} [barPadding=0]
     * @returns {Number|dc.barChart}
     */
    _chart.barPadding = function (barPadding) {
        if (!arguments.length) {
            return _chart._rangeBandPadding();
        }
        _chart._rangeBandPadding(barPadding);
        _gap = undefined;
        return _chart;
    };

    _chart._useOuterPadding = function () {
        return _gap === undefined;
    };

    /**
     * Get or set the outer padding on an ordinal bar chart. This setting has no effect on non-ordinal charts.
     * Will pad the width by `padding * barWidth` on each side of the chart.
     * @method outerPadding
     * @memberof dc.barChart
     * @instance
     * @param {Number} [padding=0.5]
     * @returns {Number|dc.barChart}
     */
    _chart.outerPadding = _chart._outerRangeBandPadding;

    /**
     * Manually set fixed gap (in px) between bars instead of relying on the default auto-generated
     * gap.  By default the bar chart implementation will calculate and set the gap automatically
     * based on the number of data points and the length of the x axis.
     * @method gap
     * @memberof dc.barChart
     * @instance
     * @param {Number} [gap=2]
     * @returns {Number|dc.barChart}
     */
    _chart.gap = function (gap) {
        if (!arguments.length) {
            return _gap;
        }
        _gap = gap;
        return _chart;
    };

    _chart.extendBrush = function (brushSelection) {
        if (brushSelection && _chart.round() && (!_centerBar || _alwaysUseRounding)) {
            brushSelection[0] = _chart.round()(brushSelection[0]);
            brushSelection[1] = _chart.round()(brushSelection[1]);
        }
        return brushSelection;
    };

    /**
     * Set or get whether rounding is enabled when bars are centered. If false, using
     * rounding with centered bars will result in a warning and rounding will be ignored.  This flag
     * has no effect if bars are not {@link dc.barChart#centerBar centered}.
     * When using standard d3.js rounding methods, the brush often doesn't align correctly with
     * centered bars since the bars are offset.  The rounding function must add an offset to
     * compensate, such as in the following example.
     * @method alwaysUseRounding
     * @memberof dc.barChart
     * @instance
     * @example
     * chart.round(function(n) { return Math.floor(n) + 0.5; });
     * @param {Boolean} [alwaysUseRounding=false]
     * @returns {Boolean|dc.barChart}
     */
    _chart.alwaysUseRounding = function (alwaysUseRounding) {
        if (!arguments.length) {
            return _alwaysUseRounding;
        }
        _alwaysUseRounding = alwaysUseRounding;
        return _chart;
    };

    function colorFilter (color, inv) {
        return function () {
            var item = d3.select(this);
            var match = item.attr('fill') === color;
            return inv ? !match : match;
        };
    }

    _chart.legendHighlight = function (d) {
        if (!_chart.isLegendableHidden(d)) {
            _chart.g().selectAll('rect.bar')
                .classed('highlight', colorFilter(d.color))
                .classed('fadeout', colorFilter(d.color, true));
        }
    };

    _chart.legendReset = function () {
        _chart.g().selectAll('rect.bar')
            .classed('highlight', false)
            .classed('fadeout', false);
    };

    dc.override(_chart, 'xAxisMax', function () {
        var max = this._xAxisMax();
        if ('resolution' in _chart.xUnits()) {
            var res = _chart.xUnits().resolution;
            max += res;
        }
        return max;
    });

    return _chart.anchor(parent, chartGroup);
};

/**
 * Concrete line/area chart implementation.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
 * - {@link http://dc-js.github.com/dc.js/crime/index.html Canadian City Crime Stats}
 * @class lineChart
 * @memberof dc
 * @mixes dc.stackMixin
 * @mixes dc.coordinateGridMixin
 * @example
 * // create a line chart under #chart-container1 element using the default global chart group
 * var chart1 = dc.lineChart('#chart-container1');
 * // create a line chart under #chart-container2 element using chart group A
 * var chart2 = dc.lineChart('#chart-container2', 'chartGroupA');
 * // create a sub-chart under a composite parent chart
 * var chart3 = dc.lineChart(compositeChart);
 * @param {String|node|d3.selection|dc.compositeChart} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector}
 * specifying a dom block element such as a div; or a dom element or d3 selection.  If the line
 * chart is a sub-chart in a {@link dc.compositeChart Composite Chart} then pass in the parent
 * composite chart instance instead.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.lineChart}
 */
dc.lineChart = function (parent, chartGroup) {
    var DEFAULT_DOT_RADIUS = 5;
    var TOOLTIP_G_CLASS = 'dc-tooltip';
    var DOT_CIRCLE_CLASS = 'dot';
    var Y_AXIS_REF_LINE_CLASS = 'yRef';
    var X_AXIS_REF_LINE_CLASS = 'xRef';
    var DEFAULT_DOT_OPACITY = 1e-6;
    var LABEL_PADDING = 3;

    var _chart = dc.stackMixin(dc.coordinateGridMixin({}));
    var _renderArea = false;
    var _dotRadius = DEFAULT_DOT_RADIUS;
    var _dataPointRadius = null;
    var _dataPointFillOpacity = DEFAULT_DOT_OPACITY;
    var _dataPointStrokeOpacity = DEFAULT_DOT_OPACITY;
    var _curve = null;
    var _interpolate = null; // d3.curveLinear;  // deprecated in 3.0
    var _tension = null;  // deprecated in 3.0
    var _defined;
    var _dashStyle;
    var _xyTipsOn = true;

    _chart.transitionDuration(500);
    _chart.transitionDelay(0);
    _chart._rangeBandPadding(1);

    _chart.plotData = function () {
        var chartBody = _chart.chartBodyG();
        var layersList = chartBody.select('g.stack-list');

        if (layersList.empty()) {
            layersList = chartBody.append('g').attr('class', 'stack-list');
        }

        var layers = layersList.selectAll('g.stack').data(_chart.data());

        var layersEnter = layers
            .enter()
            .append('g')
            .attr('class', function (d, i) {
                return 'stack ' + '_' + i;
            });

        layers = layersEnter.merge(layers);

        drawLine(layersEnter, layers);

        drawArea(layersEnter, layers);

        drawDots(chartBody, layers);

        if (_chart.renderLabel()) {
            drawLabels(layers);
        }
    };

    /**
     * Gets or sets the curve factory to use for lines and areas drawn, allowing e.g. step
     * functions, splines, and cubic interpolation. Typically you would use one of the interpolator functions
     * provided by {@link https://github.com/d3/d3-shape/blob/master/README.md#curves d3 curves}.
     *
     * Replaces the use of {@link dc.lineChart#interpolate} and {@link dc.lineChart#tension}
     * in dc.js < 3.0
     *
     * This is passed to
     * {@link https://github.com/d3/d3-shape/blob/master/README.md#line_curve line.curve} and
     * {@link https://github.com/d3/d3-shape/blob/master/README.md#area_curve area.curve}.
     * @example
     * // default
     * chart
     *     .curve(d3.curveLinear);
     * // Add tension to curves that support it
     * chart
     *     .curve(d3.curveCardinal.tension(0.5));
     * // You can use some specialized variation like
     * // https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline
     * chart
     *     .curve(d3.curveCatmullRom.alpha(0.5));
     * @method curve
     * @memberof dc.lineChart
     * @instance
     * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#line_curve line.curve}
     * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#area_curve area.curve}
     * @param  {d3.curve} [curve=d3.curveLinear]
     * @returns {d3.curve|dc.lineChart}
     */
    _chart.curve = function (curve) {
        if (!arguments.length) {
            return _curve;
        }
        _curve = curve;
        return _chart;
    };

    /**
     * Gets or sets the interpolator to use for lines drawn, by string name, allowing e.g. step
     * functions, splines, and cubic interpolation.
     *
     * Possible values are: 'linear', 'linear-closed', 'step', 'step-before', 'step-after', 'basis',
     * 'basis-open', 'basis-closed', 'bundle', 'cardinal', 'cardinal-open', 'cardinal-closed', and
     * 'monotone'.
     *
     * This function exists for backward compatibility. Use {@link dc.lineChart#curve}
     * which is generic and provides more options.
     * Value set through `.curve` takes precedence over `.interpolate` and `.tension`.
     * @method interpolate
     * @memberof dc.lineChart
     * @instance
     * @deprecated since version 3.0 use {@link dc.lineChart#curve} instead
     * @see {@link dc.lineChart#curve}
     * @param  {d3.curve} [interpolate=d3.curveLinear]
     * @returns {d3.curve|dc.lineChart}
     */
    _chart.interpolate = dc.logger.deprecate(function (interpolate) {
        if (!arguments.length) {
            return _interpolate;
        }
        _interpolate = interpolate;
        return _chart;
    }, 'dc.lineChart.interpolate has been deprecated since version 3.0 use dc.lineChart.curve instead');

    /**
     * Gets or sets the tension to use for lines drawn, in the range 0 to 1.
     *
     * Passed to the {@link https://github.com/d3/d3-shape/blob/master/README.md#curves d3 curve function}
     * if it provides a `.tension` function. Example:
     * {@link https://github.com/d3/d3-shape/blob/master/README.md#curveCardinal_tension curveCardinal.tension}.
     *
     * This function exists for backward compatibility. Use {@link dc.lineChart#curve}
     * which is generic and provides more options.
     * Value set through `.curve` takes precedence over `.interpolate` and `.tension`.
     * @method tension
     * @memberof dc.lineChart
     * @instance
     * @deprecated since version 3.0 use {@link dc.lineChart#curve} instead
     * @see {@link dc.lineChart#curve}
     * @param  {Number} [tension=0]
     * @returns {Number|dc.lineChart}
     */
    _chart.tension = dc.logger.deprecate(function (tension) {
        if (!arguments.length) {
            return _tension;
        }
        _tension = tension;
        return _chart;
    }, 'dc.lineChart.tension has been deprecated since version 3.0 use dc.lineChart.curve instead');

    /**
     * Gets or sets a function that will determine discontinuities in the line which should be
     * skipped: the path will be broken into separate subpaths if some points are undefined.
     * This function is passed to
     * {@link https://github.com/d3/d3-shape/blob/master/README.md#line_defined line.defined}
     *
     * Note: crossfilter will sometimes coerce nulls to 0, so you may need to carefully write
     * custom reduce functions to get this to work, depending on your data. See
     * {@link https://github.com/dc-js/dc.js/issues/615#issuecomment-49089248 this GitHub comment}
     * for more details and an example.
     * @method defined
     * @memberof dc.lineChart
     * @instance
     * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#line_defined line.defined}
     * @param  {Function} [defined]
     * @returns {Function|dc.lineChart}
     */
    _chart.defined = function (defined) {
        if (!arguments.length) {
            return _defined;
        }
        _defined = defined;
        return _chart;
    };

    /**
     * Set the line's d3 dashstyle. This value becomes the 'stroke-dasharray' of line. Defaults to empty
     * array (solid line).
     * @method dashStyle
     * @memberof dc.lineChart
     * @instance
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray stroke-dasharray}
     * @example
     * // create a Dash Dot Dot Dot
     * chart.dashStyle([3,1,1,1]);
     * @param  {Array<Number>} [dashStyle=[]]
     * @returns {Array<Number>|dc.lineChart}
     */
    _chart.dashStyle = function (dashStyle) {
        if (!arguments.length) {
            return _dashStyle;
        }
        _dashStyle = dashStyle;
        return _chart;
    };

    /**
     * Get or set render area flag. If the flag is set to true then the chart will render the area
     * beneath each line and the line chart effectively becomes an area chart.
     * @method renderArea
     * @memberof dc.lineChart
     * @instance
     * @param  {Boolean} [renderArea=false]
     * @returns {Boolean|dc.lineChart}
     */
    _chart.renderArea = function (renderArea) {
        if (!arguments.length) {
            return _renderArea;
        }
        _renderArea = renderArea;
        return _chart;
    };

    function colors (d, i) {
        return _chart.getColor.call(d, d.values, i);
    }

    // To keep it backward compatible, this covers multiple cases
    // See https://github.com/dc-js/dc.js/issues/1376
    // It will be removed when interpolate and tension are removed.
    function getCurveFactory () {
        var curve = null;

        // _curve takes precedence
        if (_curve) {
            return _curve;
        }

        // Approximate the D3v3 behavior
        if (typeof _interpolate === 'function') {
            curve = _interpolate;
        } else {
            // If _interpolate is string
            var mapping = {
                'linear': d3.curveLinear,
                'linear-closed': d3.curveLinearClosed,
                'step': d3.curveStep,
                'step-before': d3.curveStepBefore,
                'step-after': d3.curveStepAfter,
                'basis': d3.curveBasis,
                'basis-open': d3.curveBasisOpen,
                'basis-closed': d3.curveBasisClosed,
                'bundle': d3.curveBundle,
                'cardinal': d3.curveCardinal,
                'cardinal-open': d3.curveCardinalOpen,
                'cardinal-closed': d3.curveCardinalClosed,
                'monotone': d3.curveMonotoneX
            };
            curve = mapping[_interpolate];
        }

        // Default value
        if (!curve) {
            curve = d3.curveLinear;
        }

        if (_tension !== null) {
            if (typeof curve.tension !== 'function') {
                dc.logger.warn('tension was specified but the curve/interpolate does not support it.');
            } else {
                curve = curve.tension(_tension);
            }
        }
        return curve;
    }

    function drawLine (layersEnter, layers) {
        var line = d3.line()
            .x(function (d) {
                return _chart.x()(d.x);
            })
            .y(function (d) {
                return _chart.y()(d.y + d.y0);
            })
            .curve(getCurveFactory());
        if (_defined) {
            line.defined(_defined);
        }

        var path = layersEnter.append('path')
            .attr('class', 'line')
            .attr('stroke', colors);
        if (_dashStyle) {
            path.attr('stroke-dasharray', _dashStyle);
        }

        dc.transition(layers.select('path.line'), _chart.transitionDuration(), _chart.transitionDelay())
            //.ease('linear')
            .attr('stroke', colors)
            .attr('d', function (d) {
                return safeD(line(d.values));
            });
    }

    function drawArea (layersEnter, layers) {
        if (_renderArea) {
            var area = d3.area()
                .x(function (d) {
                    return _chart.x()(d.x);
                })
                .y1(function (d) {
                    return _chart.y()(d.y + d.y0);
                })
                .y0(function (d) {
                    return _chart.y()(d.y0);
                })
                .curve(getCurveFactory());
            if (_defined) {
                area.defined(_defined);
            }

            layersEnter.append('path')
                .attr('class', 'area')
                .attr('fill', colors)
                .attr('d', function (d) {
                    return safeD(area(d.values));
                });

            dc.transition(layers.select('path.area'), _chart.transitionDuration(), _chart.transitionDelay())
                //.ease('linear')
                .attr('fill', colors)
                .attr('d', function (d) {
                    return safeD(area(d.values));
                });
        }
    }

    function safeD (d) {
        return (!d || d.indexOf('NaN') >= 0) ? 'M0,0' : d;
    }

    function drawDots (chartBody, layers) {
        if (_chart.xyTipsOn() === 'always' || (!(_chart.brushOn() || _chart.parentBrushOn()) && _chart.xyTipsOn())) {
            var tooltipListClass = TOOLTIP_G_CLASS + '-list';
            var tooltips = chartBody.select('g.' + tooltipListClass);

            if (tooltips.empty()) {
                tooltips = chartBody.append('g').attr('class', tooltipListClass);
            }

            layers.each(function (d, layerIndex) {
                var points = d.values;
                if (_defined) {
                    points = points.filter(_defined);
                }

                var g = tooltips.select('g.' + TOOLTIP_G_CLASS + '._' + layerIndex);
                if (g.empty()) {
                    g = tooltips.append('g').attr('class', TOOLTIP_G_CLASS + ' _' + layerIndex);
                }

                createRefLines(g);

                var dots = g.selectAll('circle.' + DOT_CIRCLE_CLASS)
                    .data(points, dc.pluck('x'));

                var dotsEnterModify = dots
                    .enter()
                        .append('circle')
                        .attr('class', DOT_CIRCLE_CLASS)
                        .attr('cx', function (d) {
                            return dc.utils.safeNumber(_chart.x()(d.x));
                        })
                        .attr('cy', function (d) {
                            return dc.utils.safeNumber(_chart.y()(d.y + d.y0));
                        })
                        .attr('r', getDotRadius())
                        .style('fill-opacity', _dataPointFillOpacity)
                        .style('stroke-opacity', _dataPointStrokeOpacity)
                        .attr('fill', _chart.getColor)
                        .attr('stroke', _chart.getColor)
                        .on('mousemove', function () {
                            var dot = d3.select(this);
                            showDot(dot);
                            showRefLines(dot, g);
                        })
                        .on('mouseout', function () {
                            var dot = d3.select(this);
                            hideDot(dot);
                            hideRefLines(g);
                        })
                    .merge(dots);

                dotsEnterModify.call(renderTitle, d);

                dc.transition(dotsEnterModify, _chart.transitionDuration())
                    .attr('cx', function (d) {
                        return dc.utils.safeNumber(_chart.x()(d.x));
                    })
                    .attr('cy', function (d) {
                        return dc.utils.safeNumber(_chart.y()(d.y + d.y0));
                    })
                    .attr('fill', _chart.getColor);

                dots.exit().remove();
            });
        }
    }

    _chart.label(function (d) {
        return dc.utils.printSingleValue(d.y0 + d.y);
    }, false);

    function drawLabels (layers) {
        layers.each(function (d, layerIndex) {
            var layer = d3.select(this);
            var labels = layer.selectAll('text.lineLabel')
                .data(d.values, dc.pluck('x'));

            var labelsEnterModify = labels
                .enter()
                    .append('text')
                    .attr('class', 'lineLabel')
                    .attr('text-anchor', 'middle')
                .merge(labels);

            dc.transition(labelsEnterModify, _chart.transitionDuration())
                .attr('x', function (d) {
                    return dc.utils.safeNumber(_chart.x()(d.x));
                })
                .attr('y', function (d) {
                    var y = _chart.y()(d.y + d.y0) - LABEL_PADDING;
                    return dc.utils.safeNumber(y);
                })
                .text(function (d) {
                    return _chart.label()(d);
                });

            dc.transition(labels.exit(), _chart.transitionDuration())
                .attr('height', 0)
                .remove();
        });
    }

    function createRefLines (g) {
        var yRefLine = g.select('path.' + Y_AXIS_REF_LINE_CLASS).empty() ?
            g.append('path').attr('class', Y_AXIS_REF_LINE_CLASS) : g.select('path.' + Y_AXIS_REF_LINE_CLASS);
        yRefLine.style('display', 'none').attr('stroke-dasharray', '5,5');

        var xRefLine = g.select('path.' + X_AXIS_REF_LINE_CLASS).empty() ?
            g.append('path').attr('class', X_AXIS_REF_LINE_CLASS) : g.select('path.' + X_AXIS_REF_LINE_CLASS);
        xRefLine.style('display', 'none').attr('stroke-dasharray', '5,5');
    }

    function showDot (dot) {
        dot.style('fill-opacity', 0.8);
        dot.style('stroke-opacity', 0.8);
        dot.attr('r', _dotRadius);
        return dot;
    }

    function showRefLines (dot, g) {
        var x = dot.attr('cx');
        var y = dot.attr('cy');
        var yAxisX = (_chart._yAxisX() - _chart.margins().left);
        var yAxisRefPathD = 'M' + yAxisX + ' ' + y + 'L' + (x) + ' ' + (y);
        var xAxisRefPathD = 'M' + x + ' ' + _chart.yAxisHeight() + 'L' + x + ' ' + y;
        g.select('path.' + Y_AXIS_REF_LINE_CLASS).style('display', '').attr('d', yAxisRefPathD);
        g.select('path.' + X_AXIS_REF_LINE_CLASS).style('display', '').attr('d', xAxisRefPathD);
    }

    function getDotRadius () {
        return _dataPointRadius || _dotRadius;
    }

    function hideDot (dot) {
        dot.style('fill-opacity', _dataPointFillOpacity)
            .style('stroke-opacity', _dataPointStrokeOpacity)
            .attr('r', getDotRadius());
    }

    function hideRefLines (g) {
        g.select('path.' + Y_AXIS_REF_LINE_CLASS).style('display', 'none');
        g.select('path.' + X_AXIS_REF_LINE_CLASS).style('display', 'none');
    }

    function renderTitle (dot, d) {
        if (_chart.renderTitle()) {
            dot.select('title').remove();
            dot.append('title').text(dc.pluck('data', _chart.title(d.name)));
        }
    }

    /**
     * Turn on/off the mouseover behavior of an individual data point which renders a circle and x/y axis
     * dashed lines back to each respective axis.  This is ignored if the chart
     * {@link dc.coordinateGridMixin#brushOn brush} is on
     * @method xyTipsOn
     * @memberof dc.lineChart
     * @instance
     * @param  {Boolean} [xyTipsOn=false]
     * @returns {Boolean|dc.lineChart}
     */
    _chart.xyTipsOn = function (xyTipsOn) {
        if (!arguments.length) {
            return _xyTipsOn;
        }
        _xyTipsOn = xyTipsOn;
        return _chart;
    };

    /**
     * Get or set the radius (in px) for dots displayed on the data points.
     * @method dotRadius
     * @memberof dc.lineChart
     * @instance
     * @param  {Number} [dotRadius=5]
     * @returns {Number|dc.lineChart}
     */
    _chart.dotRadius = function (dotRadius) {
        if (!arguments.length) {
            return _dotRadius;
        }
        _dotRadius = dotRadius;
        return _chart;
    };

    /**
     * Always show individual dots for each datapoint.
     *
     * If `options` is falsy, it disables data point rendering. If no `options` are provided, the
     * current `options` values are instead returned.
     * @method renderDataPoints
     * @memberof dc.lineChart
     * @instance
     * @example
     * chart.renderDataPoints({radius: 2, fillOpacity: 0.8, strokeOpacity: 0.0})
     * @param  {{fillOpacity: Number, strokeOpacity: Number, radius: Number}} [options={fillOpacity: 0.8, strokeOpacity: 0.0, radius: 2}]
     * @returns {{fillOpacity: Number, strokeOpacity: Number, radius: Number}|dc.lineChart}
     */
    _chart.renderDataPoints = function (options) {
        if (!arguments.length) {
            return {
                fillOpacity: _dataPointFillOpacity,
                strokeOpacity: _dataPointStrokeOpacity,
                radius: _dataPointRadius
            };
        } else if (!options) {
            _dataPointFillOpacity = DEFAULT_DOT_OPACITY;
            _dataPointStrokeOpacity = DEFAULT_DOT_OPACITY;
            _dataPointRadius = null;
        } else {
            _dataPointFillOpacity = options.fillOpacity || 0.8;
            _dataPointStrokeOpacity = options.strokeOpacity || 0.0;
            _dataPointRadius = options.radius || 2;
        }
        return _chart;
    };

    function colorFilter (color, dashstyle, inv) {
        return function () {
            var item = d3.select(this);
            var match = (item.attr('stroke') === color &&
                item.attr('stroke-dasharray') === ((dashstyle instanceof Array) ?
                    dashstyle.join(',') : null)) || item.attr('fill') === color;
            return inv ? !match : match;
        };
    }

    _chart.legendHighlight = function (d) {
        if (!_chart.isLegendableHidden(d)) {
            _chart.g().selectAll('path.line, path.area')
                .classed('highlight', colorFilter(d.color, d.dashstyle))
                .classed('fadeout', colorFilter(d.color, d.dashstyle, true));
        }
    };

    _chart.legendReset = function () {
        _chart.g().selectAll('path.line, path.area')
            .classed('highlight', false)
            .classed('fadeout', false);
    };

    dc.override(_chart, 'legendables', function () {
        var legendables = _chart._legendables();
        if (!_dashStyle) {
            return legendables;
        }
        return legendables.map(function (l) {
            l.dashstyle = _dashStyle;
            return l;
        });
    });

    return _chart.anchor(parent, chartGroup);
};

/**
 * The data count widget is a simple widget designed to display the number of records selected by the
 * current filters out of the total number of records in the data set. Once created the data count widget
 * will automatically update the text content of child elements with the following classes:
 *
 * * `.total-count` - total number of records
 * * `.filter-count` - number of records matched by the current filters
 *
 * Note: this widget works best for the specific case of showing the number of records out of a
 * total. If you want a more general-purpose numeric display, please use the
 * {@link dc.numberDisplay} widget instead.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
 * @class dataCount
 * @memberof dc
 * @mixes dc.baseMixin
 * @example
 * var ndx = crossfilter(data);
 * var all = ndx.groupAll();
 *
 * dc.dataCount('.dc-data-count')
 *     .dimension(ndx)
 *     .group(all);
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.dataCount}
 */
dc.dataCount = function (parent, chartGroup) {
    var _formatNumber = d3.format(',d');
    var _chart = dc.baseMixin({});
    var _html = {some: '', all: ''};

    /**
     * Gets or sets an optional object specifying HTML templates to use depending how many items are
     * selected. The text `%total-count` will replaced with the total number of records, and the text
     * `%filter-count` will be replaced with the number of selected records.
     * - all: HTML template to use if all items are selected
     * - some: HTML template to use if not all items are selected
     * @method html
     * @memberof dc.dataCount
     * @instance
     * @example
     * counter.html({
     *      some: '%filter-count out of %total-count records selected',
     *      all: 'All records selected. Click on charts to apply filters'
     * })
     * @param {{some:String, all: String}} [options]
     * @returns {{some:String, all: String}|dc.dataCount}
     */
    _chart.html = function (options) {
        if (!arguments.length) {
            return _html;
        }
        if (options.all) {
            _html.all = options.all;
        }
        if (options.some) {
            _html.some = options.some;
        }
        return _chart;
    };

    /**
     * Gets or sets an optional function to format the filter count and total count.
     * @method formatNumber
     * @memberof dc.dataCount
     * @instance
     * @see {@link https://github.com/d3/d3-format/blob/master/README.md#format d3.format}
     * @example
     * counter.formatNumber(d3.format('.2g'))
     * @param {Function} [formatter=d3.format('.2g')]
     * @returns {Function|dc.dataCount}
     */
    _chart.formatNumber = function (formatter) {
        if (!arguments.length) {
            return _formatNumber;
        }
        _formatNumber = formatter;
        return _chart;
    };

    _chart._doRender = function () {
        var tot = _chart.dimension().size(),
            val = _chart.group().value();
        var all = _formatNumber(tot);
        var selected = _formatNumber(val);

        if ((tot === val) && (_html.all !== '')) {
            _chart.root().html(_html.all.replace('%total-count', all).replace('%filter-count', selected));
        } else if (_html.some !== '') {
            _chart.root().html(_html.some.replace('%total-count', all).replace('%filter-count', selected));
        } else {
            _chart.selectAll('.total-count').text(all);
            _chart.selectAll('.filter-count').text(selected);
        }
        return _chart;
    };

    _chart._doRedraw = function () {
        return _chart._doRender();
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 * The data table is a simple widget designed to list crossfilter focused data set (rows being
 * filtered) in a good old tabular fashion.
 *
 * Note: Unlike other charts, the data table (and data grid chart) use the {@link dc.dataTable#group group} attribute as a
 * keying function for {@link https://github.com/d3/d3-collection/blob/master/README.md#nest nesting} the data
 * together in groups.  Do not pass in a crossfilter group as this will not work.
 *
 * Another interesting feature of the data table is that you can pass a crossfilter group to the `dimension`, as
 * long as you specify the {@link dc.dataTable#order order} as `d3.descending`, since the data
 * table will use `dimension.top()` to fetch the data in that case, and the method is equally
 * supported on the crossfilter group as the crossfilter dimension.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
 * - {@link http://dc-js.github.io/dc.js/examples/table-on-aggregated-data.html dataTable on a crossfilter group}
 * ({@link https://github.com/dc-js/dc.js/blob/develop/web/examples/table-on-aggregated-data.html source})
 * @class dataTable
 * @memberof dc
 * @mixes dc.baseMixin
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.dataTable}
 */
dc.dataTable = function (parent, chartGroup) {
    var LABEL_CSS_CLASS = 'dc-table-label';
    var ROW_CSS_CLASS = 'dc-table-row';
    var COLUMN_CSS_CLASS = 'dc-table-column';
    var GROUP_CSS_CLASS = 'dc-table-group';
    var HEAD_CSS_CLASS = 'dc-table-head';

    var _chart = dc.baseMixin({});

    var _size = 25;
    var _columns = [];
    var _sortBy = function (d) {
        return d;
    };
    var _order = d3.ascending;
    var _beginSlice = 0;
    var _endSlice;
    var _showGroups = true;

    _chart._doRender = function () {
        _chart.selectAll('tbody').remove();

        renderRows(renderGroups());

        return _chart;
    };

    _chart._doColumnValueFormat = function (v, d) {
        return ((typeof v === 'function') ?
                v(d) :                          // v as function
                ((typeof v === 'string') ?
                 d[v] :                         // v is field name string
                 v.format(d)                        // v is Object, use fn (element 2)
                )
               );
    };

    _chart._doColumnHeaderFormat = function (d) {
        // if 'function', convert to string representation
        // show a string capitalized
        // if an object then display its label string as-is.
        return (typeof d === 'function') ?
                _chart._doColumnHeaderFnToString(d) :
                ((typeof d === 'string') ?
                 _chart._doColumnHeaderCapitalize(d) : String(d.label));
    };

    _chart._doColumnHeaderCapitalize = function (s) {
        // capitalize
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    _chart._doColumnHeaderFnToString = function (f) {
        // columnString(f) {
        var s = String(f);
        var i1 = s.indexOf('return ');
        if (i1 >= 0) {
            var i2 = s.lastIndexOf(';');
            if (i2 >= 0) {
                s = s.substring(i1 + 7, i2);
                var i3 = s.indexOf('numberFormat');
                if (i3 >= 0) {
                    s = s.replace('numberFormat', '');
                }
            }
        }
        return s;
    };

    function renderGroups () {
        // The 'original' example uses all 'functions'.
        // If all 'functions' are used, then don't remove/add a header, and leave
        // the html alone. This preserves the functionality of earlier releases.
        // A 2nd option is a string representing a field in the data.
        // A third option is to supply an Object such as an array of 'information', and
        // supply your own _doColumnHeaderFormat and _doColumnValueFormat functions to
        // create what you need.
        var bAllFunctions = true;
        _columns.forEach(function (f) {
            bAllFunctions = bAllFunctions & (typeof f === 'function');
        });

        if (!bAllFunctions) {
            // ensure one thead
            var thead = _chart.selectAll('thead').data([0]);
            thead.exit().remove();
            thead = thead.enter()
                    .append('thead')
                .merge(thead);

            // with one tr
            var headrow = thead.selectAll('tr').data([0]);
            headrow.exit().remove();
            headrow = headrow.enter()
                    .append('tr')
                .merge(headrow);

            // with a th for each column
            var headcols = headrow.selectAll('th')
                .data(_columns);
            headcols.exit().remove();
            headcols.enter().append('th')
                .merge(headcols)
                    .attr('class', HEAD_CSS_CLASS)
                    .html(function (d) {
                        return (_chart._doColumnHeaderFormat(d));
                    });
        }

        var groups = _chart.root().selectAll('tbody')
            .data(nestEntries(), function (d) {
                return _chart.keyAccessor()(d);
            });

        var rowGroup = groups
            .enter()
            .append('tbody');

        if (_showGroups === true) {
            rowGroup
                .append('tr')
                .attr('class', GROUP_CSS_CLASS)
                    .append('td')
                    .attr('class', LABEL_CSS_CLASS)
                    .attr('colspan', _columns.length)
                    .html(function (d) {
                        return _chart.keyAccessor()(d);
                    });
        }

        groups.exit().remove();

        return rowGroup;
    }

    function nestEntries () {
        var entries;
        if (_order === d3.ascending) {
            entries = _chart.dimension().bottom(_size);
        } else {
            entries = _chart.dimension().top(_size);
        }

        return d3.nest()
            .key(_chart.group())
            .sortKeys(_order)
            .entries(entries.sort(function (a, b) {
                return _order(_sortBy(a), _sortBy(b));
            }).slice(_beginSlice, _endSlice));
    }

    function renderRows (groups) {
        var rows = groups.order()
            .selectAll('tr.' + ROW_CSS_CLASS)
            .data(function (d) {
                return d.values;
            });

        var rowEnter = rows.enter()
            .append('tr')
            .attr('class', ROW_CSS_CLASS);

        _columns.forEach(function (v, i) {
            rowEnter.append('td')
                .attr('class', COLUMN_CSS_CLASS + ' _' + i)
                .html(function (d) {
                    return _chart._doColumnValueFormat(v, d);
                });
        });

        rows.exit().remove();

        return rows;
    }

    _chart._doRedraw = function () {
        return _chart._doRender();
    };

    /**
     * Get or set the group function for the data table. The group function takes a data row and
     * returns the key to specify to {@link https://github.com/d3/d3-collection/blob/master/README.md#nest d3.nest}
     * to split rows into groups.
     *
     * Do not pass in a crossfilter group as this will not work.
     * @method group
     * @memberof dc.dataTable
     * @instance
     * @example
     * // group rows by the value of their field
     * chart
     *     .group(function(d) { return d.field; })
     * @param {Function} groupFunction Function taking a row of data and returning the nest key.
     * @returns {Function|dc.dataTable}
     */

    /**
     * Get or set the table size which determines the number of rows displayed by the widget.
     * @method size
     * @memberof dc.dataTable
     * @instance
     * @param {Number} [size=25]
     * @returns {Number|dc.dataTable}
     */
    _chart.size = function (size) {
        if (!arguments.length) {
            return _size;
        }
        _size = size;
        return _chart;
    };

    /**
     * Get or set the index of the beginning slice which determines which entries get displayed
     * by the widget. Useful when implementing pagination.
     *
     * Note: the sortBy function will determine how the rows are ordered for pagination purposes.

     * See the {@link http://dc-js.github.io/dc.js/examples/table-pagination.html table pagination example}
     * to see how to implement the pagination user interface using `beginSlice` and `endSlice`.
     * @method beginSlice
     * @memberof dc.dataTable
     * @instance
     * @param {Number} [beginSlice=0]
     * @returns {Number|dc.dataTable}
     */
    _chart.beginSlice = function (beginSlice) {
        if (!arguments.length) {
            return _beginSlice;
        }
        _beginSlice = beginSlice;
        return _chart;
    };

    /**
     * Get or set the index of the end slice which determines which entries get displayed by the
     * widget. Useful when implementing pagination. See {@link dc.dataTable#beginSlice `beginSlice`} for more information.
     * @method endSlice
     * @memberof dc.dataTable
     * @instance
     * @param {Number|undefined} [endSlice=undefined]
     * @returns {Number|dc.dataTable}
     */
    _chart.endSlice = function (endSlice) {
        if (!arguments.length) {
            return _endSlice;
        }
        _endSlice = endSlice;
        return _chart;
    };

    /**
     * Get or set column functions. The data table widget supports several methods of specifying the
     * columns to display.
     *
     * The original method uses an array of functions to generate dynamic columns. Column functions
     * are simple javascript functions with only one input argument `d` which represents a row in
     * the data set. The return value of these functions will be used to generate the content for
     * each cell. However, this method requires the HTML for the table to have a fixed set of column
     * headers.
     *
     * <pre><code>chart.columns([
     *     function(d) { return d.date; },
     *     function(d) { return d.open; },
     *     function(d) { return d.close; },
     *     function(d) { return numberFormat(d.close - d.open); },
     *     function(d) { return d.volume; }
     * ]);
     * </code></pre>
     *
     * In the second method, you can list the columns to read from the data without specifying it as
     * a function, except where necessary (ie, computed columns).  Note the data element name is
     * capitalized when displayed in the table header. You can also mix in functions as necessary,
     * using the third `{label, format}` form, as shown below.
     *
     * <pre><code>chart.columns([
     *     "date",    // d["date"], ie, a field accessor; capitalized automatically
     *     "open",    // ...
     *     "close",   // ...
     *     {
     *         label: "Change",
     *         format: function (d) {
     *             return numberFormat(d.close - d.open);
     *         }
     *     },
     *     "volume"   // d["volume"], ie, a field accessor; capitalized automatically
     * ]);
     * </code></pre>
     *
     * In the third example, we specify all fields using the `{label, format}` method:
     * <pre><code>chart.columns([
     *     {
     *         label: "Date",
     *         format: function (d) { return d.date; }
     *     },
     *     {
     *         label: "Open",
     *         format: function (d) { return numberFormat(d.open); }
     *     },
     *     {
     *         label: "Close",
     *         format: function (d) { return numberFormat(d.close); }
     *     },
     *     {
     *         label: "Change",
     *         format: function (d) { return numberFormat(d.close - d.open); }
     *     },
     *     {
     *         label: "Volume",
     *         format: function (d) { return d.volume; }
     *     }
     * ]);
     * </code></pre>
     *
     * You may wish to override the dataTable functions `_doColumnHeaderCapitalize` and
     * `_doColumnHeaderFnToString`, which are used internally to translate the column information or
     * function into a displayed header. The first one is used on the "string" column specifier; the
     * second is used to transform a stringified function into something displayable. For the Stock
     * example, the function for Change becomes the table header **d.close - d.open**.
     *
     * Finally, you can even specify a completely different form of column definition. To do this,
     * override `_chart._doColumnHeaderFormat` and `_chart._doColumnValueFormat` Be aware that
     * fields without numberFormat specification will be displayed just as they are stored in the
     * data, unformatted.
     * @method columns
     * @memberof dc.dataTable
     * @instance
     * @param {Array<Function>} [columns=[]]
     * @returns {Array<Function>}|dc.dataTable}
     */
    _chart.columns = function (columns) {
        if (!arguments.length) {
            return _columns;
        }
        _columns = columns;
        return _chart;
    };

    /**
     * Get or set sort-by function. This function works as a value accessor at row level and returns a
     * particular field to be sorted by.
     * @method sortBy
     * @memberof dc.dataTable
     * @instance
     * @example
     * chart.sortBy(function(d) {
     *     return d.date;
     * });
     * @param {Function} [sortBy=identity function]
     * @returns {Function|dc.dataTable}
     */
    _chart.sortBy = function (sortBy) {
        if (!arguments.length) {
            return _sortBy;
        }
        _sortBy = sortBy;
        return _chart;
    };

    /**
     * Get or set sort order. If the order is `d3.ascending`, the data table will use
     * `dimension().bottom()` to fetch the data; otherwise it will use `dimension().top()`
     * @method order
     * @memberof dc.dataTable
     * @instance
     * @see {@link https://github.com/d3/d3-array/blob/master/README.md#ascending d3.ascending}
     * @see {@link https://github.com/d3/d3-array/blob/master/README.md#descending d3.descending}
     * @example
     * chart.order(d3.descending);
     * @param {Function} [order=d3.ascending]
     * @returns {Function|dc.dataTable}
     */
    _chart.order = function (order) {
        if (!arguments.length) {
            return _order;
        }
        _order = order;
        return _chart;
    };

    /**
     * Get or set if group rows will be shown. The dataTable {@link dc.dataTable#group group}
     * function must be specified even if groups are not shown.
     * @method showGroups
     * @memberof dc.dataTable
     * @instance
     * @example
     * chart
     *     .group([value], [name])
     *     .showGroups(true|false);
     * @param {Boolean} [showGroups=true]
     * @returns {Boolean|dc.dataTable}
     */
    _chart.showGroups = function (showGroups) {
        if (!arguments.length) {
            return _showGroups;
        }
        _showGroups = showGroups;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 * Data grid is a simple widget designed to list the filtered records, providing
 * a simple way to define how the items are displayed.
 *
 * Note: Unlike other charts, the data grid chart (and data table) use the {@link dc.dataGrid#group group} attribute as a keying function
 * for {@link https://github.com/d3/d3-collection/blob/master/README.md#nest nesting} the data together in groups.
 * Do not pass in a crossfilter group as this will not work.
 *
 * Examples:
 * - {@link http://europarl.me/dc.js/web/ep/index.html List of members of the european parliament}
 * @class dataGrid
 * @memberof dc
 * @mixes dc.baseMixin
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.dataGrid}
 */
dc.dataGrid = function (parent, chartGroup) {
    var LABEL_CSS_CLASS = 'dc-grid-label';
    var ITEM_CSS_CLASS = 'dc-grid-item';
    var GROUP_CSS_CLASS = 'dc-grid-group';
    var GRID_CSS_CLASS = 'dc-grid-top';

    var _chart = dc.baseMixin({});

    var _size = 999; // shouldn't be needed, but you might
    var _html = function (d) { return 'you need to provide an html() handling param:  ' + JSON.stringify(d); };
    var _sortBy = function (d) {
        return d;
    };
    var _order = d3.ascending;
    var _beginSlice = 0, _endSlice;

    var _htmlGroup = function (d) {
        return '<div class=\'' + GROUP_CSS_CLASS + '\'><h1 class=\'' + LABEL_CSS_CLASS + '\'>' +
            _chart.keyAccessor()(d) + '</h1></div>';
    };

    _chart._doRender = function () {
        _chart.selectAll('div.' + GRID_CSS_CLASS).remove();

        renderItems(renderGroups());

        return _chart;
    };

    function renderGroups () {
        var groups = _chart.root().selectAll('div.' + GRID_CSS_CLASS)
                .data(nestEntries(), function (d) {
                    return _chart.keyAccessor()(d);
                });

        var itemGroup = groups
                .enter()
                .append('div')
                .attr('class', GRID_CSS_CLASS);

        if (_htmlGroup) {
            itemGroup
                .html(function (d) {
                    return _htmlGroup(d);
                });
        }

        groups.exit().remove();
        return itemGroup;
    }

    function nestEntries () {
        var entries = _chart.dimension().top(_size);

        return d3.nest()
            .key(_chart.group())
            .sortKeys(_order)
            .entries(entries.sort(function (a, b) {
                return _order(_sortBy(a), _sortBy(b));
            }).slice(_beginSlice, _endSlice));
    }

    function renderItems (groups) {
        var items = groups.order()
                .selectAll('div.' + ITEM_CSS_CLASS)
                .data(function (d) {
                    return d.values;
                });

        items.exit().remove();

        items = items
            .enter()
                .append('div')
                .attr('class', ITEM_CSS_CLASS)
                .html(function (d) {
                    return _html(d);
                })
            .merge(items);

        return items;
    }

    _chart._doRedraw = function () {
        return _chart._doRender();
    };

    /**
     * Get or set the group function for the data grid. The group function takes a data row and
     * returns the key to specify to {@link https://github.com/d3/d3-collection/blob/master/README.md#nest d3.nest}
     * to split rows into groups.
     *
     * Do not pass in a crossfilter group as this will not work.
     * @method group
     * @memberof dc.dataGrid
     * @instance
     * @example
     * // group rows by the value of their field
     * chart
     *     .group(function(d) { return d.field; })
     * @param {Function} groupFunction Function taking a row of data and returning the nest key.
     * @returns {Function|dc.dataTable}
     */

    /**
     * Get or set the index of the beginning slice which determines which entries get displayed by the widget.
     * Useful when implementing pagination.
     * @method beginSlice
     * @memberof dc.dataGrid
     * @instance
     * @param {Number} [beginSlice=0]
     * @returns {Number|dc.dataGrid}
     */
    _chart.beginSlice = function (beginSlice) {
        if (!arguments.length) {
            return _beginSlice;
        }
        _beginSlice = beginSlice;
        return _chart;
    };

    /**
     * Get or set the index of the end slice which determines which entries get displayed by the widget.
     * Useful when implementing pagination.
     * @method endSlice
     * @memberof dc.dataGrid
     * @instance
     * @param {Number} [endSlice]
     * @returns {Number|dc.dataGrid}
     */
    _chart.endSlice = function (endSlice) {
        if (!arguments.length) {
            return _endSlice;
        }
        _endSlice = endSlice;
        return _chart;
    };

    /**
     * Get or set the grid size which determines the number of items displayed by the widget.
     * @method size
     * @memberof dc.dataGrid
     * @instance
     * @param {Number} [size=999]
     * @returns {Number|dc.dataGrid}
     */
    _chart.size = function (size) {
        if (!arguments.length) {
            return _size;
        }
        _size = size;
        return _chart;
    };

    /**
     * Get or set the function that formats an item. The data grid widget uses a
     * function to generate dynamic html. Use your favourite templating engine or
     * generate the string directly.
     * @method html
     * @memberof dc.dataGrid
     * @instance
     * @example
     * chart.html(function (d) { return '<div class='item '+data.exampleCategory+''>'+data.exampleString+'</div>';});
     * @param {Function} [html]
     * @returns {Function|dc.dataGrid}
     */
    _chart.html = function (html) {
        if (!arguments.length) {
            return _html;
        }
        _html = html;
        return _chart;
    };

    /**
     * Get or set the function that formats a group label.
     * @method htmlGroup
     * @memberof dc.dataGrid
     * @instance
     * @example
     * chart.htmlGroup (function (d) { return '<h2>'.d.key . 'with ' . d.values.length .' items</h2>'});
     * @param {Function} [htmlGroup]
     * @returns {Function|dc.dataGrid}
     */
    _chart.htmlGroup = function (htmlGroup) {
        if (!arguments.length) {
            return _htmlGroup;
        }
        _htmlGroup = htmlGroup;
        return _chart;
    };

    /**
     * Get or set sort-by function. This function works as a value accessor at the item
     * level and returns a particular field to be sorted.
     * @method sortBy
     * @memberof dc.dataGrid
     * @instance
     * @example
     * chart.sortBy(function(d) {
     *     return d.date;
     * });
     * @param {Function} [sortByFunction]
     * @returns {Function|dc.dataGrid}
     */
    _chart.sortBy = function (sortByFunction) {
        if (!arguments.length) {
            return _sortBy;
        }
        _sortBy = sortByFunction;
        return _chart;
    };

    /**
     * Get or set sort the order function.
     * @method order
     * @memberof dc.dataGrid
     * @instance
     * @see {@link https://github.com/d3/d3-array/blob/master/README.md#ascending d3.ascending}
     * @see {@link https://github.com/d3/d3-array/blob/master/README.md#descending d3.descending}
     * @example
     * chart.order(d3.descending);
     * @param {Function} [order=d3.ascending]
     * @returns {Function|dc.dataGrid}
     */
    _chart.order = function (order) {
        if (!arguments.length) {
            return _order;
        }
        _order = order;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 * A concrete implementation of a general purpose bubble chart that allows data visualization using the
 * following dimensions:
 * - x axis position
 * - y axis position
 * - bubble radius
 * - color
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
 * - {@link http://dc-js.github.com/dc.js/vc/index.html US Venture Capital Landscape 2011}
 * @class bubbleChart
 * @memberof dc
 * @mixes dc.bubbleMixin
 * @mixes dc.coordinateGridMixin
 * @example
 * // create a bubble chart under #chart-container1 element using the default global chart group
 * var bubbleChart1 = dc.bubbleChart('#chart-container1');
 * // create a bubble chart under #chart-container2 element using chart group A
 * var bubbleChart2 = dc.bubbleChart('#chart-container2', 'chartGroupA');
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.bubbleChart}
 */
dc.bubbleChart = function (parent, chartGroup) {
    var _chart = dc.bubbleMixin(dc.coordinateGridMixin({}));

    _chart.transitionDuration(750);

    _chart.transitionDelay(0);

    var bubbleLocator = function (d) {
        return 'translate(' + (bubbleX(d)) + ',' + (bubbleY(d)) + ')';
    };

    _chart.plotData = function () {
        _chart.calculateRadiusDomain();
        _chart.r().range([_chart.MIN_RADIUS, _chart.xAxisLength() * _chart.maxBubbleRelativeSize()]);

        var data = _chart.data();
        var bubbleG = _chart.chartBodyG().selectAll('g.' + _chart.BUBBLE_NODE_CLASS)
                .data(data, function (d) { return d.key; });
        if (_chart.sortBubbleSize()) {
            // update dom order based on sort
            bubbleG.order();
        }

        removeNodes(bubbleG);

        bubbleG = renderNodes(bubbleG);

        updateNodes(bubbleG);

        _chart.fadeDeselectedArea(_chart.filter());
    };

    function renderNodes (bubbleG) {
        var bubbleGEnter = bubbleG.enter().append('g');

        bubbleGEnter
            .attr('class', _chart.BUBBLE_NODE_CLASS)
            .attr('transform', bubbleLocator)
            .append('circle').attr('class', function (d, i) {
                return _chart.BUBBLE_CLASS + ' _' + i;
            })
            .on('click', _chart.onClick)
            .attr('fill', _chart.getColor)
            .attr('r', 0);

        bubbleG = bubbleGEnter.merge(bubbleG);

        dc.transition(bubbleG, _chart.transitionDuration(), _chart.transitionDelay())
            .select('circle.' + _chart.BUBBLE_CLASS)
            .attr('r', function (d) {
                return _chart.bubbleR(d);
            })
            .attr('opacity', function (d) {
                return (_chart.bubbleR(d) > 0) ? 1 : 0;
            });

        _chart._doRenderLabel(bubbleGEnter);

        _chart._doRenderTitles(bubbleGEnter);

        return bubbleG;
    }

    function updateNodes (bubbleG) {
        dc.transition(bubbleG, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('transform', bubbleLocator)
            .select('circle.' + _chart.BUBBLE_CLASS)
            .attr('fill', _chart.getColor)
            .attr('r', function (d) {
                return _chart.bubbleR(d);
            })
            .attr('opacity', function (d) {
                return (_chart.bubbleR(d) > 0) ? 1 : 0;
            });

        _chart.doUpdateLabels(bubbleG);
        _chart.doUpdateTitles(bubbleG);
    }

    function removeNodes (bubbleG) {
        bubbleG.exit().remove();
    }

    function bubbleX (d) {
        var x = _chart.x()(_chart.keyAccessor()(d));
        if (isNaN(x) || !isFinite(x)) {
            x = 0;
        }
        return x;
    }

    function bubbleY (d) {
        var y = _chart.y()(_chart.valueAccessor()(d));
        if (isNaN(y) || !isFinite(y)) {
            y = 0;
        }
        return y;
    }

    _chart.renderBrush = function () {
        // override default x axis brush from parent chart
    };

    _chart.redrawBrush = function (brushSelection, doTransition) {
        // override default x axis brush from parent chart
        _chart.fadeDeselectedArea(brushSelection);
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 * Composite charts are a special kind of chart that render multiple charts on the same Coordinate
 * Grid. You can overlay (compose) different bar/line/area charts in a single composite chart to
 * achieve some quite flexible charting effects.
 * @class compositeChart
 * @memberof dc
 * @mixes dc.coordinateGridMixin
 * @example
 * // create a composite chart under #chart-container1 element using the default global chart group
 * var compositeChart1 = dc.compositeChart('#chart-container1');
 * // create a composite chart under #chart-container2 element using chart group A
 * var compositeChart2 = dc.compositeChart('#chart-container2', 'chartGroupA');
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.compositeChart}
 */
dc.compositeChart = function (parent, chartGroup) {

    var SUB_CHART_CLASS = 'sub';
    var DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING = 12;

    var _chart = dc.coordinateGridMixin({});
    var _children = [];

    var _childOptions = {};

    var _shareColors = false,
        _shareTitle = true,
        _alignYAxes = false;

    var _rightYAxis = d3.axisRight(),
        _rightYAxisLabel = 0,
        _rightYAxisLabelPadding = DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING,
        _rightY,
        _rightAxisGridLines = false;

    _chart._mandatoryAttributes([]);
    _chart.transitionDuration(500);
    _chart.transitionDelay(0);

    dc.override(_chart, '_generateG', function () {
        var g = this.__generateG();

        for (var i = 0; i < _children.length; ++i) {
            var child = _children[i];

            generateChildG(child, i);

            if (!child.dimension()) {
                child.dimension(_chart.dimension());
            }
            if (!child.group()) {
                child.group(_chart.group());
            }

            child.chartGroup(_chart.chartGroup());
            child.svg(_chart.svg());
            child.xUnits(_chart.xUnits());
            child.transitionDuration(_chart.transitionDuration(), _chart.transitionDelay());
            child.parentBrushOn(_chart.brushOn());
            child.brushOn(false);
            child.renderTitle(_chart.renderTitle());
            child.elasticX(_chart.elasticX());
        }

        return g;
    });

    _chart.on('filtered.dcjs-composite-chart', function (chart) {
        // Propagate the filters onto the children
        // Notice that on children the call is .replaceFilter and not .filter
        //   the reason is that _chart.filter() returns the entire current set of filters not just the last added one
        for (var i = 0; i < _children.length; ++i) {
            _children[i].replaceFilter(_chart.filter());
        }
    });

    _chart._prepareYAxis = function () {
        var left = (leftYAxisChildren().length !== 0);
        var right = (rightYAxisChildren().length !== 0);
        var ranges = calculateYAxisRanges(left, right);

        if (left) { prepareLeftYAxis(ranges); }
        if (right) { prepareRightYAxis(ranges); }

        if (leftYAxisChildren().length > 0 && !_rightAxisGridLines) {
            _chart._renderHorizontalGridLinesForAxis(_chart.g(), _chart.y(), _chart.yAxis());
        } else if (rightYAxisChildren().length > 0) {
            _chart._renderHorizontalGridLinesForAxis(_chart.g(), _rightY, _rightYAxis);
        }
    };

    _chart.renderYAxis = function () {
        if (leftYAxisChildren().length !== 0) {
            _chart.renderYAxisAt('y', _chart.yAxis(), _chart.margins().left);
            _chart.renderYAxisLabel('y', _chart.yAxisLabel(), -90);
        }

        if (rightYAxisChildren().length !== 0) {
            _chart.renderYAxisAt('yr', _chart.rightYAxis(), _chart.width() - _chart.margins().right);
            _chart.renderYAxisLabel('yr', _chart.rightYAxisLabel(), 90, _chart.width() - _rightYAxisLabelPadding);
        }
    };

    function calculateYAxisRanges (left, right) {
        var lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax;
        var ranges;

        if (left) {
            lyAxisMin = yAxisMin();
            lyAxisMax = yAxisMax();
        }

        if (right) {
            ryAxisMin = rightYAxisMin();
            ryAxisMax = rightYAxisMax();
        }

        if (_chart.alignYAxes() && left && right) {
            ranges = alignYAxisRanges(lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax);
        }

        return ranges || {
            lyAxisMin: lyAxisMin,
            lyAxisMax: lyAxisMax,
            ryAxisMin: ryAxisMin,
            ryAxisMax: ryAxisMax
        };
    }

    function alignYAxisRanges (lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax) {
        // since the two series will share a zero, each Y is just a multiple
        // of the other. and the ratio should be the ratio of the ranges of the
        // input data, so that they come out the same height. so we just min/max

        // note: both ranges already include zero due to the stack mixin (#667)
        // if #667 changes, we can reconsider whether we want data height or
        // height from zero to be equal. and it will be possible for the axes
        // to be aligned but not visible.
        var extentRatio = (ryAxisMax - ryAxisMin) / (lyAxisMax - lyAxisMin);

        return {
            lyAxisMin: Math.min(lyAxisMin, ryAxisMin / extentRatio),
            lyAxisMax: Math.max(lyAxisMax, ryAxisMax / extentRatio),
            ryAxisMin: Math.min(ryAxisMin, lyAxisMin * extentRatio),
            ryAxisMax: Math.max(ryAxisMax, lyAxisMax * extentRatio)
        };
    }

    function prepareRightYAxis (ranges) {
        var needDomain = _chart.rightY() === undefined || _chart.elasticY(),
            needRange = needDomain || _chart.resizing();
        if (_chart.rightY() === undefined) {
            _chart.rightY(d3.scaleLinear());
        }
        if (needDomain) {
            _chart.rightY().domain([ranges.ryAxisMin, ranges.ryAxisMax]);
        }
        if (needRange) {
            _chart.rightY().rangeRound([_chart.yAxisHeight(), 0]);
        }

        _chart.rightY().range([_chart.yAxisHeight(), 0]);
        _chart.rightYAxis(_chart.rightYAxis().scale(_chart.rightY()));

        // In D3v4 create a RightAxis
        // _chart.rightYAxis().orient('right');
    }

    function prepareLeftYAxis (ranges) {
        var needDomain = _chart.y() === undefined || _chart.elasticY(),
            needRange = needDomain || _chart.resizing();
        if (_chart.y() === undefined) {
            _chart.y(d3.scaleLinear());
        }
        if (needDomain) {
            _chart.y().domain([ranges.lyAxisMin, ranges.lyAxisMax]);
        }
        if (needRange) {
            _chart.y().rangeRound([_chart.yAxisHeight(), 0]);
        }

        _chart.y().range([_chart.yAxisHeight(), 0]);
        _chart.yAxis(_chart.yAxis().scale(_chart.y()));

        // In D3v4 create a LeftAxis
        // _chart.yAxis().orient('left');
    }

    function generateChildG (child, i) {
        child._generateG(_chart.g());
        child.g().attr('class', SUB_CHART_CLASS + ' _' + i);
    }

    _chart.plotData = function () {
        for (var i = 0; i < _children.length; ++i) {
            var child = _children[i];

            if (!child.g()) {
                generateChildG(child, i);
            }

            if (_shareColors) {
                child.colors(_chart.colors());
            }

            child.x(_chart.x());

            child.xAxis(_chart.xAxis());

            if (child.useRightYAxis()) {
                child.y(_chart.rightY());
                child.yAxis(_chart.rightYAxis());
            } else {
                child.y(_chart.y());
                child.yAxis(_chart.yAxis());
            }

            child.plotData();

            child._activateRenderlets();
        }
    };

    /**
     * Get or set whether to draw gridlines from the right y axis.  Drawing from the left y axis is the
     * default behavior. This option is only respected when subcharts with both left and right y-axes
     * are present.
     * @method useRightAxisGridLines
     * @memberof dc.compositeChart
     * @instance
     * @param {Boolean} [useRightAxisGridLines=false]
     * @returns {Boolean|dc.compositeChart}
     */
    _chart.useRightAxisGridLines = function (useRightAxisGridLines) {
        if (!arguments) {
            return _rightAxisGridLines;
        }

        _rightAxisGridLines = useRightAxisGridLines;
        return _chart;
    };

    /**
     * Get or set chart-specific options for all child charts. This is equivalent to calling
     * {@link dc.baseMixin#options .options} on each child chart.
     *
     * Note: currently you must call this before `compose` in order for the options to be propagated.
     * @method childOptions
     * @memberof dc.compositeChart
     * @instance
     * @param {Object} [childOptions]
     * @returns {Object|dc.compositeChart}
     */
    _chart.childOptions = function (childOptions) {
        if (!arguments.length) {
            return _childOptions;
        }
        _childOptions = childOptions;
        _children.forEach(function (child) {
            child.options(_childOptions);
        });
        return _chart;
    };

    _chart.fadeDeselectedArea = function (brushSelection) {
        if (_chart.brushOn()) {
            for (var i = 0; i < _children.length; ++i) {
                var child = _children[i];
                child.fadeDeselectedArea(brushSelection);
            }
        }
    };

    /**
     * Set or get the right y axis label.
     * @method rightYAxisLabel
     * @memberof dc.compositeChart
     * @instance
     * @param {String} [rightYAxisLabel]
     * @param {Number} [padding]
     * @returns {String|dc.compositeChart}
     */
    _chart.rightYAxisLabel = function (rightYAxisLabel, padding) {
        if (!arguments.length) {
            return _rightYAxisLabel;
        }
        _rightYAxisLabel = rightYAxisLabel;
        _chart.margins().right -= _rightYAxisLabelPadding;
        _rightYAxisLabelPadding = (padding === undefined) ? DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING : padding;
        _chart.margins().right += _rightYAxisLabelPadding;
        return _chart;
    };

    /**
     * Combine the given charts into one single composite coordinate grid chart.
     *
     * Note: currently due to the way it is implemented, you must call this function at the end of
     * initialization of the composite chart, in particular after `shareTitle`, `childOptions`,
     * `width`, `height`, and `margins`, in order for the settings to get propagated to the children
     * correctly.
     * @method compose
     * @memberof dc.compositeChart
     * @instance
     * @example
     * moveChart.compose([
     *     // when creating sub-chart you need to pass in the parent chart
     *     dc.lineChart(moveChart)
     *         .group(indexAvgByMonthGroup) // if group is missing then parent's group will be used
     *         .valueAccessor(function (d){return d.value.avg;})
     *         // most of the normal functions will continue to work in a composed chart
     *         .renderArea(true)
     *         .stack(monthlyMoveGroup, function (d){return d.value;})
     *         .title(function (d){
     *             var value = d.value.avg?d.value.avg:d.value;
     *             if(isNaN(value)) value = 0;
     *             return dateFormat(d.key) + '\n' + numberFormat(value);
     *         }),
     *     dc.barChart(moveChart)
     *         .group(volumeByMonthGroup)
     *         .centerBar(true)
     * ]);
     * @param {Array<Chart>} [subChartArray]
     * @returns {dc.compositeChart}
     */
    _chart.compose = function (subChartArray) {
        _children = subChartArray;
        _children.forEach(function (child) {
            child.height(_chart.height());
            child.width(_chart.width());
            child.margins(_chart.margins());

            if (_shareTitle) {
                child.title(_chart.title());
            }

            child.options(_childOptions);
        });
        return _chart;
    };

    /**
     * Returns the child charts which are composed into the composite chart.
     * @method children
     * @memberof dc.compositeChart
     * @instance
     * @returns {Array<dc.baseMixin>}
     */
    _chart.children = function () {
        return _children;
    };

    /**
     * Get or set color sharing for the chart. If set, the {@link dc.colorMixin#colors .colors()} value from this chart
     * will be shared with composed children. Additionally if the child chart implements
     * Stackable and has not set a custom .colorAccessor, then it will generate a color
     * specific to its order in the composition.
     * @method shareColors
     * @memberof dc.compositeChart
     * @instance
     * @param {Boolean} [shareColors=false]
     * @returns {Boolean|dc.compositeChart}
     */
    _chart.shareColors = function (shareColors) {
        if (!arguments.length) {
            return _shareColors;
        }
        _shareColors = shareColors;
        return _chart;
    };

    /**
     * Get or set title sharing for the chart. If set, the {@link dc.baseMixin#title .title()} value from
     * this chart will be shared with composed children.
     *
     * Note: currently you must call this before `compose` or the child will still get the parent's
     * `title` function!
     * @method shareTitle
     * @memberof dc.compositeChart
     * @instance
     * @param {Boolean} [shareTitle=true]
     * @returns {Boolean|dc.compositeChart}
     */
    _chart.shareTitle = function (shareTitle) {
        if (!arguments.length) {
            return _shareTitle;
        }
        _shareTitle = shareTitle;
        return _chart;
    };

    /**
     * Get or set the y scale for the right axis. The right y scale is typically automatically
     * generated by the chart implementation.
     * @method rightY
     * @memberof dc.compositeChart
     * @instance
     * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
     * @param {d3.scale} [yScale]
     * @returns {d3.scale|dc.compositeChart}
     */
    _chart.rightY = function (yScale) {
        if (!arguments.length) {
            return _rightY;
        }
        _rightY = yScale;
        _chart.rescale();
        return _chart;
    };

    /**
     * Get or set alignment between left and right y axes. A line connecting '0' on both y axis
     * will be parallel to x axis. This only has effect when {@link #dc.coordinateGridMixin+elasticY elasticY} is true.
     * @method alignYAxes
     * @memberof dc.compositeChart
     * @instance
     * @param {Boolean} [alignYAxes=false]
     * @returns {Chart}
     */
    _chart.alignYAxes = function (alignYAxes) {
        if (!arguments.length) {
            return _alignYAxes;
        }
        _alignYAxes = alignYAxes;
        _chart.rescale();
        return _chart;
    };

    function leftYAxisChildren () {
        return _children.filter(function (child) {
            return !child.useRightYAxis();
        });
    }

    function rightYAxisChildren () {
        return _children.filter(function (child) {
            return child.useRightYAxis();
        });
    }

    function getYAxisMin (charts) {
        return charts.map(function (c) {
            return c.yAxisMin();
        });
    }

    delete _chart.yAxisMin;
    function yAxisMin () {
        return d3.min(getYAxisMin(leftYAxisChildren()));
    }

    function rightYAxisMin () {
        return d3.min(getYAxisMin(rightYAxisChildren()));
    }

    function getYAxisMax (charts) {
        return charts.map(function (c) {
            return c.yAxisMax();
        });
    }

    delete _chart.yAxisMax;
    function yAxisMax () {
        return dc.utils.add(d3.max(getYAxisMax(leftYAxisChildren())), _chart.yAxisPadding());
    }

    function rightYAxisMax () {
        return dc.utils.add(d3.max(getYAxisMax(rightYAxisChildren())), _chart.yAxisPadding());
    }

    function getAllXAxisMinFromChildCharts () {
        return _children.map(function (c) {
            return c.xAxisMin();
        });
    }

    dc.override(_chart, 'xAxisMin', function () {
        return dc.utils.subtract(d3.min(getAllXAxisMinFromChildCharts()), _chart.xAxisPadding(), _chart.xAxisPaddingUnit());
    });

    function getAllXAxisMaxFromChildCharts () {
        return _children.map(function (c) {
            return c.xAxisMax();
        });
    }

    dc.override(_chart, 'xAxisMax', function () {
        return dc.utils.add(d3.max(getAllXAxisMaxFromChildCharts()), _chart.xAxisPadding(), _chart.xAxisPaddingUnit());
    });

    _chart.legendables = function () {
        return _children.reduce(function (items, child) {
            if (_shareColors) {
                child.colors(_chart.colors());
            }
            items.push.apply(items, child.legendables());
            return items;
        }, []);
    };

    _chart.legendHighlight = function (d) {
        for (var j = 0; j < _children.length; ++j) {
            var child = _children[j];
            child.legendHighlight(d);
        }
    };

    _chart.legendReset = function (d) {
        for (var j = 0; j < _children.length; ++j) {
            var child = _children[j];
            child.legendReset(d);
        }
    };

    _chart.legendToggle = function () {
        console.log('composite should not be getting legendToggle itself');
    };

    /**
     * Set or get the right y axis used by the composite chart. This function is most useful when y
     * axis customization is required. The y axis in dc.js is an instance of a
     * [d3.axisRight](https://github.com/d3/d3-axis/blob/master/README.md#axisRight) therefore it supports any valid
     * d3 axis manipulation.
     *
     * **Caution**: The right y axis is usually generated internally by dc; resetting it may cause
     * unexpected results.  Note also that when used as a getter, this function is not chainable: it
     * returns the axis, not the chart,
     * {@link https://github.com/dc-js/dc.js/wiki/FAQ#why-does-everything-break-after-a-call-to-xaxis-or-yaxis
     * so attempting to call chart functions after calling `.yAxis()` will fail}.
     * @method rightYAxis
     * @memberof dc.compositeChart
     * @instance
     * @see {@link https://github.com/d3/d3-axis/blob/master/README.md#axisRight}
     * @example
     * // customize y axis tick format
     * chart.rightYAxis().tickFormat(function (v) {return v + '%';});
     * // customize y axis tick values
     * chart.rightYAxis().tickValues([0, 100, 200, 300]);
     * @param {d3.axisRight} [rightYAxis]
     * @returns {d3.axisRight|dc.compositeChart}
     */
    _chart.rightYAxis = function (rightYAxis) {
        if (!arguments.length) {
            return _rightYAxis;
        }
        _rightYAxis = rightYAxis;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 * A series chart is a chart that shows multiple series of data overlaid on one chart, where the
 * series is specified in the data. It is a specialization of Composite Chart and inherits all
 * composite features other than recomposing the chart.
 *
 * Examples:
 * - {@link http://dc-js.github.io/dc.js/examples/series.html Series Chart}
 * @class seriesChart
 * @memberof dc
 * @mixes dc.compositeChart
 * @example
 * // create a series chart under #chart-container1 element using the default global chart group
 * var seriesChart1 = dc.seriesChart("#chart-container1");
 * // create a series chart under #chart-container2 element using chart group A
 * var seriesChart2 = dc.seriesChart("#chart-container2", "chartGroupA");
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.seriesChart}
 */
dc.seriesChart = function (parent, chartGroup) {
    var _chart = dc.compositeChart(parent, chartGroup);

    function keySort (a, b) {
        return d3.ascending(_chart.keyAccessor()(a), _chart.keyAccessor()(b));
    }

    var _charts = {};
    var _chartFunction = dc.lineChart;
    var _seriesAccessor;
    var _seriesSort = d3.ascending;
    var _valueSort = keySort;

    _chart._mandatoryAttributes().push('seriesAccessor', 'chart');
    _chart.shareColors(true);

    _chart._preprocessData = function () {
        var keep = [];
        var childrenChanged;
        var nester = d3.nest().key(_seriesAccessor);
        if (_seriesSort) {
            nester.sortKeys(_seriesSort);
        }
        if (_valueSort) {
            nester.sortValues(_valueSort);
        }
        var nesting = nester.entries(_chart.data());
        var children =
            nesting.map(function (sub, i) {
                var subChart = _charts[sub.key] || _chartFunction.call(_chart, _chart, chartGroup, sub.key, i);
                if (!_charts[sub.key]) {
                    childrenChanged = true;
                }
                _charts[sub.key] = subChart;
                keep.push(sub.key);
                return subChart
                    .dimension(_chart.dimension())
                    .group({
                        all: typeof sub.values === 'function' ? sub.values : dc.utils.constant(sub.values)
                    }, sub.key)
                    .keyAccessor(_chart.keyAccessor())
                    .valueAccessor(_chart.valueAccessor())
                    .brushOn(false);
            });
        // this works around the fact compositeChart doesn't really
        // have a removal interface
        Object.keys(_charts)
            .filter(function (c) {return keep.indexOf(c) === -1;})
            .forEach(function (c) {
                clearChart(c);
                childrenChanged = true;
            });
        _chart._compose(children);
        if (childrenChanged && _chart.legend()) {
            _chart.legend().render();
        }
    };

    function clearChart (c) {
        if (_charts[c].g()) {
            _charts[c].g().remove();
        }
        delete _charts[c];
    }

    function resetChildren () {
        Object.keys(_charts).map(clearChart);
        _charts = {};
    }

    /**
     * Get or set the chart function, which generates the child charts.
     * @method chart
     * @memberof dc.seriesChart
     * @instance
     * @example
     * // put curve on the line charts used for the series
     * chart.chart(function(c) { return dc.lineChart(c).curve(d3.curveBasis); })
     * // do a scatter series chart
     * chart.chart(dc.scatterPlot)
     * @param {Function} [chartFunction=dc.lineChart]
     * @returns {Function|dc.seriesChart}
     */
    _chart.chart = function (chartFunction) {
        if (!arguments.length) {
            return _chartFunction;
        }
        _chartFunction = chartFunction;
        resetChildren();
        return _chart;
    };

    /**
     * **mandatory**
     *
     * Get or set accessor function for the displayed series. Given a datum, this function
     * should return the series that datum belongs to.
     * @method seriesAccessor
     * @memberof dc.seriesChart
     * @instance
     * @example
     * // simple series accessor
     * chart.seriesAccessor(function(d) { return "Expt: " + d.key[0]; })
     * @param {Function} [accessor]
     * @returns {Function|dc.seriesChart}
     */
    _chart.seriesAccessor = function (accessor) {
        if (!arguments.length) {
            return _seriesAccessor;
        }
        _seriesAccessor = accessor;
        resetChildren();
        return _chart;
    };

    /**
     * Get or set a function to sort the list of series by, given series values.
     * @method seriesSort
     * @memberof dc.seriesChart
     * @instance
     * @see {@link https://github.com/d3/d3-array/blob/master/README.md#ascending d3.ascending}
     * @see {@link https://github.com/d3/d3-array/blob/master/README.md#descending d3.descending}
     * @example
     * chart.seriesSort(d3.descending);
     * @param {Function} [sortFunction=d3.ascending]
     * @returns {Function|dc.seriesChart}
     */
    _chart.seriesSort = function (sortFunction) {
        if (!arguments.length) {
            return _seriesSort;
        }
        _seriesSort = sortFunction;
        resetChildren();
        return _chart;
    };

    /**
     * Get or set a function to sort each series values by. By default this is the key accessor which,
     * for example, will ensure a lineChart series connects its points in increasing key/x order,
     * rather than haphazardly.
     * @method valueSort
     * @memberof dc.seriesChart
     * @instance
     * @see {@link https://github.com/d3/d3-array/blob/master/README.md#ascending d3.ascending}
     * @see {@link https://github.com/d3/d3-array/blob/master/README.md#descending d3.descending}
     * @example
     * // Default value sort
     * _chart.valueSort(function keySort (a, b) {
     *     return d3.ascending(_chart.keyAccessor()(a), _chart.keyAccessor()(b));
     * });
     * @param {Function} [sortFunction]
     * @returns {Function|dc.seriesChart}
     */
    _chart.valueSort = function (sortFunction) {
        if (!arguments.length) {
            return _valueSort;
        }
        _valueSort = sortFunction;
        resetChildren();
        return _chart;
    };

    // make compose private
    _chart._compose = _chart.compose;
    delete _chart.compose;

    return _chart;
};

/**
 * The geo choropleth chart is designed as an easy way to create a crossfilter driven choropleth map
 * from GeoJson data. This chart implementation was inspired by
 * {@link http://bl.ocks.org/4060606 the great d3 choropleth example}.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/vc/index.html US Venture Capital Landscape 2011}
 * @class geoChoroplethChart
 * @memberof dc
 * @mixes dc.colorMixin
 * @mixes dc.baseMixin
 * @example
 * // create a choropleth chart under '#us-chart' element using the default global chart group
 * var chart1 = dc.geoChoroplethChart('#us-chart');
 * // create a choropleth chart under '#us-chart2' element using chart group A
 * var chart2 = dc.compositeChart('#us-chart2', 'chartGroupA');
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.geoChoroplethChart}
 */
dc.geoChoroplethChart = function (parent, chartGroup) {
    var _chart = dc.colorMixin(dc.baseMixin({}));

    _chart.colorAccessor(function (d) {
        return d || 0;
    });

    var _geoPath = d3.geoPath();
    var _projectionFlag;
    var _projection;

    var _geoJsons = [];

    _chart._doRender = function () {
        _chart.resetSvg();
        for (var layerIndex = 0; layerIndex < _geoJsons.length; ++layerIndex) {
            var states = _chart.svg().append('g')
                .attr('class', 'layer' + layerIndex);

            var regionG = states.selectAll('g.' + geoJson(layerIndex).name)
                .data(geoJson(layerIndex).data);

            regionG = regionG.enter()
                    .append('g')
                    .attr('class', geoJson(layerIndex).name)
                .merge(regionG);

            regionG
                .append('path')
                .attr('fill', 'white')
                .attr('d', _getGeoPath());

            regionG.append('title');

            plotData(layerIndex);
        }
        _projectionFlag = false;
    };

    function plotData (layerIndex) {
        var data = generateLayeredData();

        if (isDataLayer(layerIndex)) {
            var regionG = renderRegionG(layerIndex);

            renderPaths(regionG, layerIndex, data);

            renderTitle(regionG, layerIndex, data);
        }
    }

    function generateLayeredData () {
        var data = {};
        var groupAll = _chart.data();
        for (var i = 0; i < groupAll.length; ++i) {
            data[_chart.keyAccessor()(groupAll[i])] = _chart.valueAccessor()(groupAll[i]);
        }
        return data;
    }

    function isDataLayer (layerIndex) {
        return geoJson(layerIndex).keyAccessor;
    }

    function renderRegionG (layerIndex) {
        var regionG = _chart.svg()
            .selectAll(layerSelector(layerIndex))
            .classed('selected', function (d) {
                return isSelected(layerIndex, d);
            })
            .classed('deselected', function (d) {
                return isDeselected(layerIndex, d);
            })
            .attr('class', function (d) {
                var layerNameClass = geoJson(layerIndex).name;
                var regionClass = dc.utils.nameToId(geoJson(layerIndex).keyAccessor(d));
                var baseClasses = layerNameClass + ' ' + regionClass;
                if (isSelected(layerIndex, d)) {
                    baseClasses += ' selected';
                }
                if (isDeselected(layerIndex, d)) {
                    baseClasses += ' deselected';
                }
                return baseClasses;
            });
        return regionG;
    }

    function layerSelector (layerIndex) {
        return 'g.layer' + layerIndex + ' g.' + geoJson(layerIndex).name;
    }

    function isSelected (layerIndex, d) {
        return _chart.hasFilter() && _chart.hasFilter(getKey(layerIndex, d));
    }

    function isDeselected (layerIndex, d) {
        return _chart.hasFilter() && !_chart.hasFilter(getKey(layerIndex, d));
    }

    function getKey (layerIndex, d) {
        return geoJson(layerIndex).keyAccessor(d);
    }

    function geoJson (index) {
        return _geoJsons[index];
    }

    function renderPaths (regionG, layerIndex, data) {
        var paths = regionG
            .select('path')
            .attr('fill', function () {
                var currentFill = d3.select(this).attr('fill');
                if (currentFill) {
                    return currentFill;
                }
                return 'none';
            })
            .on('click', function (d) {
                return _chart.onClick(d, layerIndex);
            });

        dc.transition(paths, _chart.transitionDuration(), _chart.transitionDelay()).attr('fill', function (d, i) {
            return _chart.getColor(data[geoJson(layerIndex).keyAccessor(d)], i);
        });
    }

    _chart.onClick = function (d, layerIndex) {
        var selectedRegion = geoJson(layerIndex).keyAccessor(d);
        dc.events.trigger(function () {
            _chart.filter(selectedRegion);
            _chart.redrawGroup();
        });
    };

    function renderTitle (regionG, layerIndex, data) {
        if (_chart.renderTitle()) {
            regionG.selectAll('title').text(function (d) {
                var key = getKey(layerIndex, d);
                var value = data[key];
                return _chart.title()({key: key, value: value});
            });
        }
    }

    _chart._doRedraw = function () {
        for (var layerIndex = 0; layerIndex < _geoJsons.length; ++layerIndex) {
            plotData(layerIndex);
            if (_projectionFlag) {
                _chart.svg().selectAll('g.' + geoJson(layerIndex).name + ' path').attr('d', _getGeoPath());
            }
        }
        _projectionFlag = false;
    };

    /**
     * **mandatory**
     *
     * Use this function to insert a new GeoJson map layer. This function can be invoked multiple times
     * if you have multiple GeoJson data layers to render on top of each other. If you overlay multiple
     * layers with the same name the new overlay will override the existing one.
     * @method overlayGeoJson
     * @memberof dc.geoChoroplethChart
     * @instance
     * @see {@link http://geojson.org/ GeoJSON}
     * @see {@link https://github.com/topojson/topojson/wiki TopoJSON}
     * @see {@link https://github.com/topojson/topojson-1.x-api-reference/blob/master/API-Reference.md#wiki-feature topojson.feature}
     * @example
     * // insert a layer for rendering US states
     * chart.overlayGeoJson(statesJson.features, 'state', function(d) {
     *      return d.properties.name;
     * });
     * @param {geoJson} json - a geojson feed
     * @param {String} name - name of the layer
     * @param {Function} keyAccessor - accessor function used to extract 'key' from the GeoJson data. The key extracted by
     * this function should match the keys returned by the crossfilter groups.
     * @returns {dc.geoChoroplethChart}
     */
    _chart.overlayGeoJson = function (json, name, keyAccessor) {
        for (var i = 0; i < _geoJsons.length; ++i) {
            if (_geoJsons[i].name === name) {
                _geoJsons[i].data = json;
                _geoJsons[i].keyAccessor = keyAccessor;
                return _chart;
            }
        }
        _geoJsons.push({name: name, data: json, keyAccessor: keyAccessor});
        return _chart;
    };

    /**
     * Gets or sets a custom geo projection function. See the available
     * {@link https://github.com/d3/d3-geo/blob/master/README.md#projections d3 geo projection functions}.
     *
     * Starting version 3.0 it has been deprecated to rely on the default projection being
     * {@link https://github.com/d3/d3-geo/blob/master/README.md#geoAlbersUsa d3.geoAlbersUsa()}. Please
     * set it explicitly. {@link https://bl.ocks.org/mbostock/5557726
     * Considering that `null` is also a valid value for projection}, if you need
     * projection to be `null` please set it explicitly to `null`.
     * @method projection
     * @memberof dc.geoChoroplethChart
     * @instance
     * @see {@link https://github.com/d3/d3-geo/blob/master/README.md#projections d3.projection}
     * @see {@link https://github.com/d3/d3-geo-projection d3-geo-projection}
     * @param {d3.projection} [projection=d3.geoAlbersUsa()]
     * @returns {d3.projection|dc.geoChoroplethChart}
     */
    _chart.projection = function (projection) {
        if (!arguments.length) {
            return _projection;
        }

        _projection = projection;
        _projectionFlag = true;
        return _chart;
    };

    var _getGeoPath = function () {
        if (_projection === undefined) {
            dc.logger.warn('choropleth projection default of geoAlbers is deprecated,' +
                ' in next version projection will need to be set explicitly');
            return _geoPath.projection(d3.geoAlbersUsa());
        }

        return _geoPath.projection(_projection);
    };

    /**
     * Returns all GeoJson layers currently registered with this chart. The returned array is a
     * reference to this chart's internal data structure, so any modification to this array will also
     * modify this chart's internal registration.
     * @method geoJsons
     * @memberof dc.geoChoroplethChart
     * @instance
     * @returns {Array<{name:String, data: Object, accessor: Function}>}
     */
    _chart.geoJsons = function () {
        return _geoJsons;
    };

    /**
     * Returns the {@link https://github.com/d3/d3-geo/blob/master/README.md#paths d3.geoPath} object used to
     * render the projection and features.  Can be useful for figuring out the bounding box of the
     * feature set and thus a way to calculate scale and translation for the projection.
     * @method geoPath
     * @memberof dc.geoChoroplethChart
     * @instance
     * @see {@link https://github.com/d3/d3-geo/blob/master/README.md#paths d3.geoPath}
     * @returns {d3.geoPath}
     */
    _chart.geoPath = function () {
        return _geoPath;
    };

    /**
     * Remove a GeoJson layer from this chart by name
     * @method removeGeoJson
     * @memberof dc.geoChoroplethChart
     * @instance
     * @param {String} name
     * @returns {dc.geoChoroplethChart}
     */
    _chart.removeGeoJson = function (name) {
        var geoJsons = [];

        for (var i = 0; i < _geoJsons.length; ++i) {
            var layer = _geoJsons[i];
            if (layer.name !== name) {
                geoJsons.push(layer);
            }
        }

        _geoJsons = geoJsons;

        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 * The bubble overlay chart is quite different from the typical bubble chart. With the bubble overlay
 * chart you can arbitrarily place bubbles on an existing svg or bitmap image, thus changing the
 * typical x and y positioning while retaining the capability to visualize data using bubble radius
 * and coloring.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/crime/index.html Canadian City Crime Stats}
 * @class bubbleOverlay
 * @memberof dc
 * @mixes dc.bubbleMixin
 * @mixes dc.baseMixin
 * @example
 * // create a bubble overlay chart on top of the '#chart-container1 svg' element using the default global chart group
 * var bubbleChart1 = dc.bubbleOverlayChart('#chart-container1').svg(d3.select('#chart-container1 svg'));
 * // create a bubble overlay chart on top of the '#chart-container2 svg' element using chart group A
 * var bubbleChart2 = dc.compositeChart('#chart-container2', 'chartGroupA').svg(d3.select('#chart-container2 svg'));
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.bubbleOverlay}
 */
dc.bubbleOverlay = function (parent, chartGroup) {
    var BUBBLE_OVERLAY_CLASS = 'bubble-overlay';
    var BUBBLE_NODE_CLASS = 'node';
    var BUBBLE_CLASS = 'bubble';

    /**
     * **mandatory**
     *
     * Set the underlying svg image element. Unlike other dc charts this chart will not generate a svg
     * element; therefore the bubble overlay chart will not work if this function is not invoked. If the
     * underlying image is a bitmap, then an empty svg will need to be created on top of the image.
     * @method svg
     * @memberof dc.bubbleOverlay
     * @instance
     * @example
     * // set up underlying svg element
     * chart.svg(d3.select('#chart svg'));
     * @param {SVGElement|d3.selection} [imageElement]
     * @returns {dc.bubbleOverlay}
     */
    var _chart = dc.bubbleMixin(dc.baseMixin({}));
    var _g;
    var _points = [];

    _chart.transitionDuration(750);

    _chart.transitionDelay(0);

    _chart.radiusValueAccessor(function (d) {
        return d.value;
    });

    /**
     * **mandatory**
     *
     * Set up a data point on the overlay. The name of a data point should match a specific 'key' among
     * data groups generated using keyAccessor.  If a match is found (point name <-> data group key)
     * then a bubble will be generated at the position specified by the function. x and y
     * value specified here are relative to the underlying svg.
     * @method point
     * @memberof dc.bubbleOverlay
     * @instance
     * @param {String} name
     * @param {Number} x
     * @param {Number} y
     * @returns {dc.bubbleOverlay}
     */
    _chart.point = function (name, x, y) {
        _points.push({name: name, x: x, y: y});
        return _chart;
    };

    _chart._doRender = function () {
        _g = initOverlayG();

        _chart.r().range([_chart.MIN_RADIUS, _chart.width() * _chart.maxBubbleRelativeSize()]);

        initializeBubbles();

        _chart.fadeDeselectedArea(_chart.filter());

        return _chart;
    };

    function initOverlayG () {
        _g = _chart.select('g.' + BUBBLE_OVERLAY_CLASS);
        if (_g.empty()) {
            _g = _chart.svg().append('g').attr('class', BUBBLE_OVERLAY_CLASS);
        }
        return _g;
    }

    function initializeBubbles () {
        var data = mapData();
        _chart.calculateRadiusDomain();

        _points.forEach(function (point) {
            var nodeG = getNodeG(point, data);

            var circle = nodeG.select('circle.' + BUBBLE_CLASS);

            if (circle.empty()) {
                circle = nodeG.append('circle')
                    .attr('class', BUBBLE_CLASS)
                    .attr('r', 0)
                    .attr('fill', _chart.getColor)
                    .on('click', _chart.onClick);
            }

            dc.transition(circle, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('r', function (d) {
                    return _chart.bubbleR(d);
                });

            _chart._doRenderLabel(nodeG);

            _chart._doRenderTitles(nodeG);
        });
    }

    function mapData () {
        var data = {};
        _chart.data().forEach(function (datum) {
            data[_chart.keyAccessor()(datum)] = datum;
        });
        return data;
    }

    function getNodeG (point, data) {
        var bubbleNodeClass = BUBBLE_NODE_CLASS + ' ' + dc.utils.nameToId(point.name);

        var nodeG = _g.select('g.' + dc.utils.nameToId(point.name));

        if (nodeG.empty()) {
            nodeG = _g.append('g')
                .attr('class', bubbleNodeClass)
                .attr('transform', 'translate(' + point.x + ',' + point.y + ')');
        }

        nodeG.datum(data[point.name]);

        return nodeG;
    }

    _chart._doRedraw = function () {
        updateBubbles();

        _chart.fadeDeselectedArea(_chart.filter());

        return _chart;
    };

    function updateBubbles () {
        var data = mapData();
        _chart.calculateRadiusDomain();

        _points.forEach(function (point) {
            var nodeG = getNodeG(point, data);

            var circle = nodeG.select('circle.' + BUBBLE_CLASS);

            dc.transition(circle, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('r', function (d) {
                    return _chart.bubbleR(d);
                })
                .attr('fill', _chart.getColor);

            _chart.doUpdateLabels(nodeG);

            _chart.doUpdateTitles(nodeG);
        });
    }

    _chart.debug = function (flag) {
        if (flag) {
            var debugG = _chart.select('g.' + dc.constants.DEBUG_GROUP_CLASS);

            if (debugG.empty()) {
                debugG = _chart.svg()
                    .append('g')
                    .attr('class', dc.constants.DEBUG_GROUP_CLASS);
            }

            var debugText = debugG.append('text')
                .attr('x', 10)
                .attr('y', 20);

            debugG
                .append('rect')
                .attr('width', _chart.width())
                .attr('height', _chart.height())
                .on('mousemove', function () {
                    var position = d3.mouse(debugG.node());
                    var msg = position[0] + ', ' + position[1];
                    debugText.text(msg);
                });
        } else {
            _chart.selectAll('.debug').remove();
        }

        return _chart;
    };

    _chart.anchor(parent, chartGroup);

    return _chart;
};

/**
 * Concrete row chart implementation.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
 * @class rowChart
 * @memberof dc
 * @mixes dc.capMixin
 * @mixes dc.marginMixin
 * @mixes dc.colorMixin
 * @mixes dc.baseMixin
 * @example
 * // create a row chart under #chart-container1 element using the default global chart group
 * var chart1 = dc.rowChart('#chart-container1');
 * // create a row chart under #chart-container2 element using chart group A
 * var chart2 = dc.rowChart('#chart-container2', 'chartGroupA');
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.rowChart}
 */
dc.rowChart = function (parent, chartGroup) {

    var _g;

    var _labelOffsetX = 10;
    var _labelOffsetY = 15;
    var _hasLabelOffsetY = false;
    var _dyOffset = '0.35em';  // this helps center labels https://github.com/d3/d3-3.x-api-reference/blob/master/SVG-Shapes.md#svg_text
    var _titleLabelOffsetX = 2;

    var _gap = 5;

    var _fixedBarHeight = false;
    var _rowCssClass = 'row';
    var _titleRowCssClass = 'titlerow';
    var _renderTitleLabel = false;

    var _chart = dc.capMixin(dc.marginMixin(dc.colorMixin(dc.baseMixin({}))));

    var _x;

    var _elasticX;

    var _xAxis = d3.axisBottom();

    var _rowData;

    _chart.rowsCap = _chart.cap;

    function calculateAxisScale () {
        if (!_x || _elasticX) {
            var extent = d3.extent(_rowData, _chart.cappedValueAccessor);
            if (extent[0] > 0) {
                extent[0] = 0;
            }
            if (extent[1] < 0) {
                extent[1] = 0;
            }
            _x = d3.scaleLinear().domain(extent)
                .range([0, _chart.effectiveWidth()]);
        }
        _xAxis.scale(_x);
    }

    function drawAxis () {
        var axisG = _g.select('g.axis');

        calculateAxisScale();

        if (axisG.empty()) {
            axisG = _g.append('g').attr('class', 'axis');
        }
        axisG.attr('transform', 'translate(0, ' + _chart.effectiveHeight() + ')');

        dc.transition(axisG, _chart.transitionDuration(), _chart.transitionDelay())
            .call(_xAxis);
    }

    _chart._doRender = function () {
        _chart.resetSvg();

        _g = _chart.svg()
            .append('g')
            .attr('transform', 'translate(' + _chart.margins().left + ',' + _chart.margins().top + ')');

        drawChart();

        return _chart;
    };

    _chart.title(function (d) {
        return _chart.cappedKeyAccessor(d) + ': ' + _chart.cappedValueAccessor(d);
    });

    _chart.label(_chart.cappedKeyAccessor);

    /**
     * Gets or sets the x scale. The x scale can be any d3
     * {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}.
     * @method x
     * @memberof dc.rowChart
     * @instance
     * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
     * @param {d3.scale} [scale]
     * @returns {d3.scale|dc.rowChart}
     */
    _chart.x = function (scale) {
        if (!arguments.length) {
            return _x;
        }
        _x = scale;
        return _chart;
    };

    function drawGridLines () {
        _g.selectAll('g.tick')
            .select('line.grid-line')
            .remove();

        _g.selectAll('g.tick')
            .append('line')
            .attr('class', 'grid-line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', function () {
                return -_chart.effectiveHeight();
            });
    }

    function drawChart () {
        _rowData = _chart.data();

        drawAxis();
        drawGridLines();

        var rows = _g.selectAll('g.' + _rowCssClass)
            .data(_rowData);

        removeElements(rows);
        rows = createElements(rows)
            .merge(rows);
        updateElements(rows);
    }

    function createElements (rows) {
        var rowEnter = rows.enter()
            .append('g')
            .attr('class', function (d, i) {
                return _rowCssClass + ' _' + i;
            });

        rowEnter.append('rect').attr('width', 0);

        createLabels(rowEnter);

        return rowEnter;
    }

    function removeElements (rows) {
        rows.exit().remove();
    }

    function rootValue () {
        var root = _x(0);
        return (root === -Infinity || root !== root) ? _x(1) : root;
    }

    function updateElements (rows) {
        var n = _rowData.length;

        var height;
        if (!_fixedBarHeight) {
            height = (_chart.effectiveHeight() - (n + 1) * _gap) / n;
        } else {
            height = _fixedBarHeight;
        }

        // vertically align label in center unless they override the value via property setter
        if (!_hasLabelOffsetY) {
            _labelOffsetY = height / 2;
        }

        var rect = rows.attr('transform', function (d, i) {
                return 'translate(0,' + ((i + 1) * _gap + i * height) + ')';
            }).select('rect')
            .attr('height', height)
            .attr('fill', _chart.getColor)
            .on('click', onClick)
            .classed('deselected', function (d) {
                return (_chart.hasFilter()) ? !isSelectedRow(d) : false;
            })
            .classed('selected', function (d) {
                return (_chart.hasFilter()) ? isSelectedRow(d) : false;
            });

        dc.transition(rect, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('width', function (d) {
                return Math.abs(rootValue() - _x(_chart.cappedValueAccessor(d)));
            })
            .attr('transform', translateX);

        createTitles(rows);
        updateLabels(rows);
    }

    function createTitles (rows) {
        if (_chart.renderTitle()) {
            rows.select('title').remove();
            rows.append('title').text(_chart.title());
        }
    }

    function createLabels (rowEnter) {
        if (_chart.renderLabel()) {
            rowEnter.append('text')
                .on('click', onClick);
        }
        if (_chart.renderTitleLabel()) {
            rowEnter.append('text')
                .attr('class', _titleRowCssClass)
                .on('click', onClick);
        }
    }

    function updateLabels (rows) {
        if (_chart.renderLabel()) {
            var lab = rows.select('text')
                .attr('x', _labelOffsetX)
                .attr('y', _labelOffsetY)
                .attr('dy', _dyOffset)
                .on('click', onClick)
                .attr('class', function (d, i) {
                    return _rowCssClass + ' _' + i;
                })
                .text(function (d) {
                    return _chart.label()(d);
                });
            dc.transition(lab, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('transform', translateX);
        }
        if (_chart.renderTitleLabel()) {
            var titlelab = rows.select('.' + _titleRowCssClass)
                    .attr('x', _chart.effectiveWidth() - _titleLabelOffsetX)
                    .attr('y', _labelOffsetY)
                    .attr('dy', _dyOffset)
                    .attr('text-anchor', 'end')
                    .on('click', onClick)
                    .attr('class', function (d, i) {
                        return _titleRowCssClass + ' _' + i ;
                    })
                    .text(function (d) {
                        return _chart.title()(d);
                    });
            dc.transition(titlelab, _chart.transitionDuration(), _chart.transitionDelay())
                .attr('transform', translateX);
        }
    }

    /**
     * Turn on/off Title label rendering (values) using SVG style of text-anchor 'end'.
     * @method renderTitleLabel
     * @memberof dc.rowChart
     * @instance
     * @param {Boolean} [renderTitleLabel=false]
     * @returns {Boolean|dc.rowChart}
     */
    _chart.renderTitleLabel = function (renderTitleLabel) {
        if (!arguments.length) {
            return _renderTitleLabel;
        }
        _renderTitleLabel = renderTitleLabel;
        return _chart;
    };

    function onClick (d) {
        _chart.onClick(d);
    }

    function translateX (d) {
        var x = _x(_chart.cappedValueAccessor(d)),
            x0 = rootValue(),
            s = x > x0 ? x0 : x;
        return 'translate(' + s + ',0)';
    }

    _chart._doRedraw = function () {
        drawChart();
        return _chart;
    };

    /**
     * Get or sets the x axis for the row chart instance.
     * See the {@link https://github.com/d3/d3-axis/blob/master/README.md d3.axis}
     * documention for more information.
     * @method xAxis
     * @memberof dc.rowChart
     * @instance
     * @example
     * // customize x axis tick format
     * chart.xAxis().tickFormat(function (v) {return v + '%';});
     * // customize x axis tick values
     * chart.xAxis().tickValues([0, 100, 200, 300]);
     * // use a top-oriented axis. Note: position of the axis and grid lines will need to
     * // be set manually, see https://dc-js.github.io/dc.js/examples/row-top-axis.html
     * chart.xAxis(d3.axisTop())
     * @returns {d3.axis}
     */
    _chart.xAxis = function (xAxis) {
        if (!arguments.length) {
            return _xAxis;
        }
        _xAxis = xAxis;
        return this;
    };

    /**
     * Get or set the fixed bar height. Default is [false] which will auto-scale bars.
     * For example, if you want to fix the height for a specific number of bars (useful in TopN charts)
     * you could fix height as follows (where count = total number of bars in your TopN and gap is
     * your vertical gap space).
     * @method fixedBarHeight
     * @memberof dc.rowChart
     * @instance
     * @example
     * chart.fixedBarHeight( chartheight - (count + 1) * gap / count);
     * @param {Boolean|Number} [fixedBarHeight=false]
     * @returns {Boolean|Number|dc.rowChart}
     */
    _chart.fixedBarHeight = function (fixedBarHeight) {
        if (!arguments.length) {
            return _fixedBarHeight;
        }
        _fixedBarHeight = fixedBarHeight;
        return _chart;
    };

    /**
     * Get or set the vertical gap space between rows on a particular row chart instance.
     * @method gap
     * @memberof dc.rowChart
     * @instance
     * @param {Number} [gap=5]
     * @returns {Number|dc.rowChart}
     */
    _chart.gap = function (gap) {
        if (!arguments.length) {
            return _gap;
        }
        _gap = gap;
        return _chart;
    };

    /**
     * Get or set the elasticity on x axis. If this attribute is set to true, then the x axis will rescle to auto-fit the
     * data range when filtered.
     * @method elasticX
     * @memberof dc.rowChart
     * @instance
     * @param {Boolean} [elasticX]
     * @returns {Boolean|dc.rowChart}
     */
    _chart.elasticX = function (elasticX) {
        if (!arguments.length) {
            return _elasticX;
        }
        _elasticX = elasticX;
        return _chart;
    };

    /**
     * Get or set the x offset (horizontal space to the top left corner of a row) for labels on a particular row chart.
     * @method labelOffsetX
     * @memberof dc.rowChart
     * @instance
     * @param {Number} [labelOffsetX=10]
     * @returns {Number|dc.rowChart}
     */
    _chart.labelOffsetX = function (labelOffsetX) {
        if (!arguments.length) {
            return _labelOffsetX;
        }
        _labelOffsetX = labelOffsetX;
        return _chart;
    };

    /**
     * Get or set the y offset (vertical space to the top left corner of a row) for labels on a particular row chart.
     * @method labelOffsetY
     * @memberof dc.rowChart
     * @instance
     * @param {Number} [labelOffsety=15]
     * @returns {Number|dc.rowChart}
     */
    _chart.labelOffsetY = function (labelOffsety) {
        if (!arguments.length) {
            return _labelOffsetY;
        }
        _labelOffsetY = labelOffsety;
        _hasLabelOffsetY = true;
        return _chart;
    };

    /**
     * Get of set the x offset (horizontal space between right edge of row and right edge or text.
     * @method titleLabelOffsetX
     * @memberof dc.rowChart
     * @instance
     * @param {Number} [titleLabelOffsetX=2]
     * @returns {Number|dc.rowChart}
     */
    _chart.titleLabelOffsetX = function (titleLabelOffsetX) {
        if (!arguments.length) {
            return _titleLabelOffsetX;
        }
        _titleLabelOffsetX = titleLabelOffsetX;
        return _chart;
    };

    function isSelectedRow (d) {
        return _chart.hasFilter(_chart.cappedKeyAccessor(d));
    }

    return _chart.anchor(parent, chartGroup);
};

/**
 * Legend is a attachable widget that can be added to other dc charts to render horizontal legend
 * labels.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
 * - {@link http://dc-js.github.com/dc.js/crime/index.html Canadian City Crime Stats}
 * @class legend
 * @memberof dc
 * @example
 * chart.legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
 * @returns {dc.legend}
 */
dc.legend = function () {
    var LABEL_GAP = 2;

    var _legend = {},
        _parent,
        _x = 0,
        _y = 0,
        _itemHeight = 12,
        _gap = 5,
        _horizontal = false,
        _legendWidth = 560,
        _itemWidth = 70,
        _autoItemWidth = false,
        _legendText = dc.pluck('name'),
        _maxItems;

    var _g;

    _legend.parent = function (p) {
        if (!arguments.length) {
            return _parent;
        }
        _parent = p;
        return _legend;
    };

    _legend.render = function () {
        _parent.svg().select('g.dc-legend').remove();
        _g = _parent.svg().append('g')
            .attr('class', 'dc-legend')
            .attr('transform', 'translate(' + _x + ',' + _y + ')');
        var legendables = _parent.legendables();

        if (_maxItems !== undefined) {
            legendables = legendables.slice(0, _maxItems);
        }

        var itemEnter = _g.selectAll('g.dc-legend-item')
            .data(legendables)
            .enter()
            .append('g')
            .attr('class', 'dc-legend-item')
            .on('mouseover', function (d) {
                _parent.legendHighlight(d);
            })
            .on('mouseout', function (d) {
                _parent.legendReset(d);
            })
            .on('click', function (d) {
                d.chart.legendToggle(d);
            });

        _g.selectAll('g.dc-legend-item')
            .classed('fadeout', function (d) {
                return d.chart.isLegendableHidden(d);
            });

        if (legendables.some(dc.pluck('dashstyle'))) {
            itemEnter
                .append('line')
                .attr('x1', 0)
                .attr('y1', _itemHeight / 2)
                .attr('x2', _itemHeight)
                .attr('y2', _itemHeight / 2)
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', dc.pluck('dashstyle'))
                .attr('stroke', dc.pluck('color'));
        } else {
            itemEnter
                .append('rect')
                .attr('width', _itemHeight)
                .attr('height', _itemHeight)
                .attr('fill', function (d) {return d ? d.color : 'blue';});
        }

        itemEnter.append('text')
                .text(_legendText)
                .attr('x', _itemHeight + LABEL_GAP)
                .attr('y', function () {
                    return _itemHeight / 2 + (this.clientHeight ? this.clientHeight : 13) / 2 - 2;
                });

        var _cumulativeLegendTextWidth = 0;
        var row = 0;
        itemEnter.attr('transform', function (d, i) {
            if (_horizontal) {
                var itemWidth   = _autoItemWidth === true ? this.getBBox().width + _gap : _itemWidth;
                if ((_cumulativeLegendTextWidth + itemWidth) > _legendWidth && _cumulativeLegendTextWidth > 0) {
                    ++row;
                    _cumulativeLegendTextWidth = 0;
                }
                var translateBy = 'translate(' + _cumulativeLegendTextWidth + ',' + row * legendItemHeight() + ')';
                _cumulativeLegendTextWidth += itemWidth;
                return translateBy;
            } else {
                return 'translate(0,' + i * legendItemHeight() + ')';
            }
        });
    };

    function legendItemHeight () {
        return _gap + _itemHeight;
    }

    /**
     * Set or get x coordinate for legend widget.
     * @method x
     * @memberof dc.legend
     * @instance
     * @param  {Number} [x=0]
     * @returns {Number|dc.legend}
     */
    _legend.x = function (x) {
        if (!arguments.length) {
            return _x;
        }
        _x = x;
        return _legend;
    };

    /**
     * Set or get y coordinate for legend widget.
     * @method y
     * @memberof dc.legend
     * @instance
     * @param  {Number} [y=0]
     * @returns {Number|dc.legend}
     */
    _legend.y = function (y) {
        if (!arguments.length) {
            return _y;
        }
        _y = y;
        return _legend;
    };

    /**
     * Set or get gap between legend items.
     * @method gap
     * @memberof dc.legend
     * @instance
     * @param  {Number} [gap=5]
     * @returns {Number|dc.legend}
     */
    _legend.gap = function (gap) {
        if (!arguments.length) {
            return _gap;
        }
        _gap = gap;
        return _legend;
    };

    /**
     * Set or get legend item height.
     * @method itemHeight
     * @memberof dc.legend
     * @instance
     * @param  {Number} [itemHeight=12]
     * @returns {Number|dc.legend}
     */
    _legend.itemHeight = function (itemHeight) {
        if (!arguments.length) {
            return _itemHeight;
        }
        _itemHeight = itemHeight;
        return _legend;
    };

    /**
     * Position legend horizontally instead of vertically.
     * @method horizontal
     * @memberof dc.legend
     * @instance
     * @param  {Boolean} [horizontal=false]
     * @returns {Boolean|dc.legend}
     */
    _legend.horizontal = function (horizontal) {
        if (!arguments.length) {
            return _horizontal;
        }
        _horizontal = horizontal;
        return _legend;
    };

    /**
     * Maximum width for horizontal legend.
     * @method legendWidth
     * @memberof dc.legend
     * @instance
     * @param  {Number} [legendWidth=500]
     * @returns {Number|dc.legend}
     */
    _legend.legendWidth = function (legendWidth) {
        if (!arguments.length) {
            return _legendWidth;
        }
        _legendWidth = legendWidth;
        return _legend;
    };

    /**
     * Legend item width for horizontal legend.
     * @method itemWidth
     * @memberof dc.legend
     * @instance
     * @param  {Number} [itemWidth=70]
     * @returns {Number|dc.legend}
     */
    _legend.itemWidth = function (itemWidth) {
        if (!arguments.length) {
            return _itemWidth;
        }
        _itemWidth = itemWidth;
        return _legend;
    };

    /**
     * Turn automatic width for legend items on or off. If true, {@link dc.legend#itemWidth itemWidth} is ignored.
     * This setting takes into account the {@link dc.legend#gap gap}.
     * @method autoItemWidth
     * @memberof dc.legend
     * @instance
     * @param  {Boolean} [autoItemWidth=false]
     * @returns {Boolean|dc.legend}
     */
    _legend.autoItemWidth = function (autoItemWidth) {
        if (!arguments.length) {
            return _autoItemWidth;
        }
        _autoItemWidth = autoItemWidth;
        return _legend;
    };

    /**
     * Set or get the legend text function. The legend widget uses this function to render the legend
     * text for each item. If no function is specified the legend widget will display the names
     * associated with each group.
     * @method legendText
     * @memberof dc.legend
     * @instance
     * @param  {Function} [legendText]
     * @returns {Function|dc.legend}
     * @example
     * // default legendText
     * legend.legendText(dc.pluck('name'))
     *
     * // create numbered legend items
     * chart.legend(dc.legend().legendText(function(d, i) { return i + '. ' + d.name; }))
     *
     * // create legend displaying group counts
     * chart.legend(dc.legend().legendText(function(d) { return d.name + ': ' d.data; }))
     **/
    _legend.legendText = function (legendText) {
        if (!arguments.length) {
            return _legendText;
        }
        _legendText = legendText;
        return _legend;
    };

    /**
     * Maximum number of legend items to display
     * @method maxItems
     * @memberof dc.legend
     * @instance
     * @param  {Number} [maxItems]
     * @return {dc.legend}
     */
    _legend.maxItems = function (maxItems) {
        if (!arguments.length) {
            return _maxItems;
        }
        _maxItems = dc.utils.isNumber(maxItems) ? maxItems : undefined;
        return _legend;
    };

    return _legend;
};

/**
 * htmlLegend is a attachable widget that can be added to other dc charts to render horizontal/vertical legend
 * labels.
 *
 * @class htmlLegend
 * @memberof dc
 * @example
 * chart.legend(dc.htmlLegend().container(legendContainerElement).horizontal(false))
 * @returns {dc.htmlLegend}
 */
dc.htmlLegend = function () {
    var _legend = {},
        _htmlLegendDivCssClass = 'dc-html-legend',
        _legendItemCssClassHorizontal = 'dc-legend-item-horizontal',
        _legendItemCssClassVertical = 'dc-legend-item-vertical',
        _parent,
        _container,
        _legendText = dc.pluck('name'),
        _maxItems,
        _horizontal = false,
        _legendItemClass,
        _highlightSelected = false;

    _legend.parent = function (p) {
        if (!arguments.length) {
            return _parent;
        }
        _parent = p;
        return _legend;
    };

    _legend.render = function () {
        var _defaultLegendItemCssClass = _horizontal ?  _legendItemCssClassHorizontal : _legendItemCssClassVertical;
        _container.select('div.dc-html-legend').remove();

        var _l = _container.append('div').attr('class', _htmlLegendDivCssClass);
        _l.attr('style', 'max-width:' + _container.nodes()[0].style.width);

        var legendables = _parent.legendables();
        var filters = _parent.filters();

        if (_maxItems !== undefined) {
            legendables = legendables.slice(0, _maxItems);
        }

        var legendItemClassName = _legendItemClass ? _legendItemClass : _defaultLegendItemCssClass;

        var itemEnter = _l.selectAll('div.' + legendItemClassName)
            .data(legendables).enter()
            .append('div')
            .classed(legendItemClassName, true)
            .on('mouseover', _parent.legendHighlight)
            .on('mouseout', _parent.legendReset)
            .on('click', _parent.legendToggle);

        if (_highlightSelected) {
            itemEnter.classed(dc.constants.SELECTED_CLASS, function (d) {
                return filters.indexOf(d.name) !== -1;
            });
        }

        itemEnter.append('span')
            .attr('class', 'dc-legend-item-color')
            .style('background-color', dc.pluck('color'));

        itemEnter.append('span')
            .attr('class', 'dc-legend-item-label')
            .attr('title', _legendText)
            .text(_legendText);
    };

    /**
     #### .container([selector])
     Set the container selector for the legend widget. Required.
     **/
    _legend.container = function (c) {
        if (!arguments.length) {
            return _container;
        }
        _container = d3.select(c);
        return _legend;
    };

    /**
     #### .legendItemClass([selector])
     This can be optionally used to override class for legenditem and just use this class style.
     The reason to have this is so this can be done for a particular chart rather than overriding the style for all charts
     Setting this will disable the highlighting of selected items also.
     **/
    _legend.legendItemClass = function (c) {
        if (!arguments.length) {
            return _legendItemClass;
        }
        _legendItemClass = c;
        return _legend;
    };

    /**
     #### .highlightSelected([boolean])
     This can be optionally used to enable highlighting legends for the selections/filters for the chart.
     **/
    _legend.highlightSelected = function (c) {
        if (!arguments.length) {
            return _highlightSelected;
        }
        _highlightSelected = c;
        return _legend;
    };

    /**
     #### .horizontal([boolean])
     Display the legend horizontally instead of horizontally
     **/
    _legend.horizontal = function (b) {
        if (!arguments.length) {
            return _horizontal;
        }
        _horizontal = b;
        return _legend;
    };

    /**
     * Set or get the legend text function. The legend widget uses this function to render the legend
     * text for each item. If no function is specified the legend widget will display the names
     * associated with each group.
     * @method legendText
     * @memberof dc.htmlLegend
     * @instance
     * @param  {Function} [legendText]
     * @returns {Function|dc.htmlLegend}
     * @example
     * // default legendText
     * legend.legendText(dc.pluck('name'))
     *
     * // create numbered legend items
     * chart.legend(dc.htmlLegend().legendText(function(d, i) { return i + '. ' + d.name; }))
     *
     * // create legend displaying group counts
     * chart.legend(dc.htmlLegend().legendText(function(d) { return d.name + ': ' d.data; }))
     **/
    _legend.legendText = function (legendText) {
        if (!arguments.length) {
            return _legendText;
        }
        _legendText = legendText;
        return _legend;
    };

    /**
     * Maximum number of legend items to display
     * @method maxItems
     * @memberof dc.htmlLegend
     * @instance
     * @param  {Number} [maxItems]
     * @return {dc.htmlLegend}
     */
    _legend.maxItems = function (maxItems) {
        if (!arguments.length) {
            return _maxItems;
        }
        _maxItems = dc.utils.isNumber(maxItems) ? maxItems : undefined;
        return _legend;
    };

    return _legend;
};


/**
 * A scatter plot chart
 *
 * Examples:
 * - {@link http://dc-js.github.io/dc.js/examples/scatter.html Scatter Chart}
 * - {@link http://dc-js.github.io/dc.js/examples/multi-scatter.html Multi-Scatter Chart}
 * @class scatterPlot
 * @memberof dc
 * @mixes dc.coordinateGridMixin
 * @example
 * // create a scatter plot under #chart-container1 element using the default global chart group
 * var chart1 = dc.scatterPlot('#chart-container1');
 * // create a scatter plot under #chart-container2 element using chart group A
 * var chart2 = dc.scatterPlot('#chart-container2', 'chartGroupA');
 * // create a sub-chart under a composite parent chart
 * var chart3 = dc.scatterPlot(compositeChart);
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.scatterPlot}
 */
dc.scatterPlot = function (parent, chartGroup) {
    var _chart = dc.coordinateGridMixin({});
    var _symbol = d3.symbol();

    var _existenceAccessor = function (d) { return d.value; };

    var originalKeyAccessor = _chart.keyAccessor();
    _chart.keyAccessor(function (d) { return originalKeyAccessor(d)[0]; });
    _chart.valueAccessor(function (d) { return originalKeyAccessor(d)[1]; });
    _chart.colorAccessor(function () { return _chart._groupName; });

    _chart.title(function (d) {
        // this basically just counteracts the setting of its own key/value accessors
        // see https://github.com/dc-js/dc.js/issues/702
        return _chart.keyAccessor()(d) + ',' + _chart.valueAccessor()(d) + ': ' +
            _chart.existenceAccessor()(d);
    });

    var _locator = function (d) {
        return 'translate(' + _chart.x()(_chart.keyAccessor()(d)) + ',' +
                              _chart.y()(_chart.valueAccessor()(d)) + ')';
    };

    var _highlightedSize = 7;
    var _symbolSize = 5;
    var _excludedSize = 3;
    var _excludedColor = null;
    var _excludedOpacity = 1.0;
    var _emptySize = 0;
    var _emptyOpacity = 0;
    var _nonemptyOpacity = 1;
    var _emptyColor = null;
    var _filtered = [];

    // Use a 2 dimensional brush
    _chart.brush(d3.brush());

    function elementSize (d, i) {
        if (!_existenceAccessor(d)) {
            return Math.pow(_emptySize, 2);
        } else if (_filtered[i]) {
            return Math.pow(_symbolSize, 2);
        } else {
            return Math.pow(_excludedSize, 2);
        }
    }
    _symbol.size(elementSize);

    dc.override(_chart, '_filter', function (filter) {
        if (!arguments.length) {
            return _chart.__filter();
        }

        return _chart.__filter(dc.filters.RangedTwoDimensionalFilter(filter));
    });

    _chart.plotData = function () {
        var symbols = _chart.chartBodyG().selectAll('path.symbol')
            .data(_chart.data());

        dc.transition(symbols.exit(), _chart.transitionDuration(), _chart.transitionDelay())
            .attr('opacity', 0).remove();

        symbols = symbols
            .enter()
                .append('path')
                .attr('class', 'symbol')
                .attr('opacity', 0)
                .attr('fill', _chart.getColor)
                .attr('transform', _locator)
            .merge(symbols);

        symbols.call(renderTitles, _chart.data());

        symbols.each(function (d, i) {
            _filtered[i] = !_chart.filter() || _chart.filter().isFiltered([_chart.keyAccessor()(d), _chart.valueAccessor()(d)]);
        });

        dc.transition(symbols, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('opacity', function (d, i) {
                if (!_existenceAccessor(d)) {
                    return _emptyOpacity;
                } else if (_filtered[i]) {
                    return _nonemptyOpacity;
                } else {
                    return _chart.excludedOpacity();
                }
            })
            .attr('fill', function (d, i) {
                if (_emptyColor && !_existenceAccessor(d)) {
                    return _emptyColor;
                } else if (_chart.excludedColor() && !_filtered[i]) {
                    return _chart.excludedColor();
                } else {
                    return _chart.getColor(d);
                }
            })
            .attr('transform', _locator)
            .attr('d', _symbol);
    };

    function renderTitles (symbol, d) {
        if (_chart.renderTitle()) {
            symbol.selectAll('title').remove();
            symbol.append('title').text(function (d) {
                return _chart.title()(d);
            });
        }
    }

    /**
     * Get or set the existence accessor.  If a point exists, it is drawn with
     * {@link dc.scatterPlot#symbolSize symbolSize} radius and
     * opacity 1; if it does not exist, it is drawn with
     * {@link dc.scatterPlot#emptySize emptySize} radius and opacity 0. By default,
     * the existence accessor checks if the reduced value is truthy.
     * @method existenceAccessor
     * @memberof dc.scatterPlot
     * @instance
     * @see {@link dc.scatterPlot#symbolSize symbolSize}
     * @see {@link dc.scatterPlot#emptySize emptySize}
     * @example
     * // default accessor
     * chart.existenceAccessor(function (d) { return d.value; });
     * @param {Function} [accessor]
     * @returns {Function|dc.scatterPlot}
     */
    _chart.existenceAccessor = function (accessor) {
        if (!arguments.length) {
            return _existenceAccessor;
        }
        _existenceAccessor = accessor;
        return this;
    };

    /**
     * Get or set the symbol type used for each point. By default the symbol is a circle (d3.symbolCircle).
     * Type can be a constant or an accessor.
     * @method symbol
     * @memberof dc.scatterPlot
     * @instance
     * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_type symbol.type}
     * @example
     * // Circle type
     * chart.symbol(d3.symbolCircle);
     * // Square type
     * chart.symbol(d3.symbolSquare);
     * @param {Function} [type=d3.symbolCircle]
     * @returns {Function|dc.scatterPlot}
     */
    _chart.symbol = function (type) {
        if (!arguments.length) {
            return _symbol.type();
        }
        _symbol.type(type);
        return _chart;
    };

    /**
     * Get or set the symbol generator. By default `dc.scatterPlot` will use
     * {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol d3.symbol()}
     * to generate symbols. `dc.scatterPlot` will set the
     * {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_size symbol size accessor}
     * on the symbol generator.
     * @method customSymbol
     * @memberof dc.scatterPlot
     * @instance
     * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol d3.symbol}
     * @see {@link https://stackoverflow.com/questions/25332120/create-additional-d3-js-symbols Create additional D3.js symbols}
     * @param {String|Function} [customSymbol=d3.symbol()]
     * @returns {String|Function|dc.scatterPlot}
     */
    _chart.customSymbol = function (customSymbol) {
        if (!arguments.length) {
            return _symbol;
        }
        _symbol = customSymbol;
        _symbol.size(elementSize);
        return _chart;
    };

    /**
     * Set or get radius for symbols.
     * @method symbolSize
     * @memberof dc.scatterPlot
     * @instance
     * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_size d3.symbol.size}
     * @param {Number} [symbolSize=3]
     * @returns {Number|dc.scatterPlot}
     */
    _chart.symbolSize = function (symbolSize) {
        if (!arguments.length) {
            return _symbolSize;
        }
        _symbolSize = symbolSize;
        return _chart;
    };

    /**
     * Set or get radius for highlighted symbols.
     * @method highlightedSize
     * @memberof dc.scatterPlot
     * @instance
     * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_size d3.symbol.size}
     * @param {Number} [highlightedSize=5]
     * @returns {Number|dc.scatterPlot}
     */
    _chart.highlightedSize = function (highlightedSize) {
        if (!arguments.length) {
            return _highlightedSize;
        }
        _highlightedSize = highlightedSize;
        return _chart;
    };

    /**
     * Set or get size for symbols excluded from this chart's filter. If null, no
     * special size is applied for symbols based on their filter status.
     * @method excludedSize
     * @memberof dc.scatterPlot
     * @instance
     * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_size d3.symbol.size}
     * @param {Number} [excludedSize=null]
     * @returns {Number|dc.scatterPlot}
     */
    _chart.excludedSize = function (excludedSize) {
        if (!arguments.length) {
            return _excludedSize;
        }
        _excludedSize = excludedSize;
        return _chart;
    };

    /**
     * Set or get color for symbols excluded from this chart's filter. If null, no
     * special color is applied for symbols based on their filter status.
     * @method excludedColor
     * @memberof dc.scatterPlot
     * @instance
     * @param {Number} [excludedColor=null]
     * @returns {Number|dc.scatterPlot}
     */
    _chart.excludedColor = function (excludedColor) {
        if (!arguments.length) {
            return _excludedColor;
        }
        _excludedColor = excludedColor;
        return _chart;
    };

    /**
     * Set or get opacity for symbols excluded from this chart's filter.
     * @method excludedOpacity
     * @memberof dc.scatterPlot
     * @instance
     * @param {Number} [excludedOpacity=1.0]
     * @returns {Number|dc.scatterPlot}
     */
    _chart.excludedOpacity = function (excludedOpacity) {
        if (!arguments.length) {
            return _excludedOpacity;
        }
        _excludedOpacity = excludedOpacity;
        return _chart;
    };

    /**
     * Set or get radius for symbols when the group is empty.
     * @method emptySize
     * @memberof dc.scatterPlot
     * @instance
     * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_size d3.symbol.size}
     * @param {Number} [emptySize=0]
     * @returns {Number|dc.scatterPlot}
     */
    _chart.hiddenSize = _chart.emptySize = function (emptySize) {
        if (!arguments.length) {
            return _emptySize;
        }
        _emptySize = emptySize;
        return _chart;
    };

    /**
     * Set or get color for symbols when the group is empty. If null, just use the
     * {@link dc.colorMixin#colors colorMixin.colors} color scale zero value.
     * @name emptyColor
     * @memberof dc.scatterPlot
     * @instance
     * @param {String} [emptyColor=null]
     * @return {String}
     * @return {dc.scatterPlot}/
     */
    _chart.emptyColor = function (emptyColor) {
        if (!arguments.length) {
            return _emptyColor;
        }
        _emptyColor = emptyColor;
        return _chart;
    };

    /**
     * Set or get opacity for symbols when the group is empty.
     * @name emptyOpacity
     * @memberof dc.scatterPlot
     * @instance
     * @param {Number} [emptyOpacity=0]
     * @return {Number}
     * @return {dc.scatterPlot}
     */
    _chart.emptyOpacity = function (emptyOpacity) {
        if (!arguments.length) {
            return _emptyOpacity;
        }
        _emptyOpacity = emptyOpacity;
        return _chart;
    };

    /**
     * Set or get opacity for symbols when the group is not empty.
     * @name nonemptyOpacity
     * @memberof dc.scatterPlot
     * @instance
     * @param {Number} [nonemptyOpacity=1]
     * @return {Number}
     * @return {dc.scatterPlot}
     */
    _chart.nonemptyOpacity = function (nonemptyOpacity) {
        if (!arguments.length) {
            return _emptyOpacity;
        }
        _nonemptyOpacity = nonemptyOpacity;
        return _chart;
    };

    _chart.legendables = function () {
        return [{chart: _chart, name: _chart._groupName, color: _chart.getColor()}];
    };

    _chart.legendHighlight = function (d) {
        resizeSymbolsWhere(function (symbol) {
            return symbol.attr('fill') === d.color;
        }, _highlightedSize);
        _chart.chartBodyG().selectAll('.chart-body path.symbol').filter(function () {
            return d3.select(this).attr('fill') !== d.color;
        }).classed('fadeout', true);
    };

    _chart.legendReset = function (d) {
        resizeSymbolsWhere(function (symbol) {
            return symbol.attr('fill') === d.color;
        }, _symbolSize);
        _chart.chartBodyG().selectAll('.chart-body path.symbol').filter(function () {
            return d3.select(this).attr('fill') !== d.color;
        }).classed('fadeout', false);
    };

    function resizeSymbolsWhere (condition, size) {
        var symbols = _chart.chartBodyG().selectAll('.chart-body path.symbol').filter(function () {
            return condition(d3.select(this));
        });
        var oldSize = _symbol.size();
        _symbol.size(Math.pow(size, 2));
        dc.transition(symbols, _chart.transitionDuration(), _chart.transitionDelay()).attr('d', _symbol);
        _symbol.size(oldSize);
    }

    _chart.createBrushHandlePaths = function () {
        // no handle paths for poly-brushes
    };

    _chart.extendBrush = function (brushSelection) {
        if (_chart.round()) {
            brushSelection[0] = brushSelection[0].map(_chart.round());
            brushSelection[1] = brushSelection[1].map(_chart.round());
        }
        return brushSelection;
    };

    _chart.brushIsEmpty = function (brushSelection) {
        return !brushSelection || brushSelection[0][0] >= brushSelection[1][0] || brushSelection[0][1] >= brushSelection[1][1];
    };

    _chart._brushing = function () {
        // Avoids infinite recursion (mutual recursion between range and focus operations)
        // Source Event will be null when brush.move is called programmatically (see below as well).
        if (!d3.event.sourceEvent) { return; }

        // Ignore event if recursive event - i.e. not directly generated by user action (like mouse/touch etc.)
        // In this case we are more worried about this handler causing brush move programmatically which will
        // cause this handler to be invoked again with a new d3.event (and current event set as sourceEvent)
        // This check avoids recursive calls
        if (d3.event.sourceEvent.type && ['start', 'brush', 'end'].indexOf(d3.event.sourceEvent.type) !== -1) {
            return;
        }

        var brushSelection = d3.event.selection;

        // Testing with pixels is more reliable
        var brushIsEmpty = _chart.brushIsEmpty(brushSelection);

        if (brushSelection) {
            brushSelection = brushSelection.map(function (point) {
                return point.map(function (coord, i) {
                    var scale = i === 0 ? _chart.x() : _chart.y();
                    return scale.invert(coord);
                });
            });

            brushSelection = _chart.extendBrush(brushSelection);

            // The rounding process might have made brushSelection empty, so we need to recheck
            brushIsEmpty = brushIsEmpty && _chart.brushIsEmpty(brushSelection);
        }

        _chart.redrawBrush(brushSelection, false);

        var ranged2DFilter = brushIsEmpty ? null : dc.filters.RangedTwoDimensionalFilter(brushSelection);

        dc.events.trigger(function () {
            _chart.replaceFilter(ranged2DFilter);
            _chart.redrawGroup();
        }, dc.constants.EVENT_DELAY);
    };

    _chart.redrawBrush = function (brushSelection, doTransition) {
        // override default x axis brush from parent chart
        var _brush = _chart.brush();
        var _gBrush = _chart.gBrush();

        if (_chart.brushOn() && _gBrush) {
            if (_chart.resizing()) {
                _chart.setBrushExtents(doTransition);
            }

            if (!brushSelection) {
                _gBrush
                    .call(_brush.move, brushSelection);

            } else {
                brushSelection = brushSelection.map(function (point) {
                    return point.map(function (coord, i) {
                        var scale = i === 0 ? _chart.x() : _chart.y();
                        return scale(coord);
                    });
                });

                var gBrush =
                    dc.optionalTransition(doTransition, _chart.transitionDuration(), _chart.transitionDelay())(_gBrush);

                gBrush
                    .call(_brush.move, brushSelection);

            }
        }

        _chart.fadeDeselectedArea(brushSelection);
    };

    _chart.setBrushY = function (gBrush) {
        gBrush.call(_chart.brush().y(_chart.y()));
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 * A display of a single numeric value.
 * Unlike other charts, you do not need to set a dimension. Instead a group object must be provided and
 * a valueAccessor that returns a single value.
 * @class numberDisplay
 * @memberof dc
 * @mixes dc.baseMixin
 * @example
 * // create a number display under #chart-container1 element using the default global chart group
 * var display1 = dc.numberDisplay('#chart-container1');
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.numberDisplay}
 */
dc.numberDisplay = function (parent, chartGroup) {
    var SPAN_CLASS = 'number-display';
    var _formatNumber = d3.format('.2s');
    var _chart = dc.baseMixin({});
    var _html = {one: '', some: '', none: ''};
    var _lastValue;

    // dimension not required
    _chart._mandatoryAttributes(['group']);

    // default to ordering by value, to emulate old group.top(1) behavior when multiple groups
    _chart.ordering(function (kv) { return kv.value; });

    /**
     * Gets or sets an optional object specifying HTML templates to use depending on the number
     * displayed.  The text `%number` will be replaced with the current value.
     * - one: HTML template to use if the number is 1
     * - zero: HTML template to use if the number is 0
     * - some: HTML template to use otherwise
     * @method html
     * @memberof dc.numberDisplay
     * @instance
     * @example
     * numberWidget.html({
     *      one:'%number record',
     *      some:'%number records',
     *      none:'no records'})
     * @param {{one:String, some:String, none:String}} [html={one: '', some: '', none: ''}]
     * @returns {{one:String, some:String, none:String}|dc.numberDisplay}
     */
    _chart.html = function (html) {
        if (!arguments.length) {
            return _html;
        }
        if (html.none) {
            _html.none = html.none;//if none available
        } else if (html.one) {
            _html.none = html.one;//if none not available use one
        } else if (html.some) {
            _html.none = html.some;//if none and one not available use some
        }
        if (html.one) {
            _html.one = html.one;//if one available
        } else if (html.some) {
            _html.one = html.some;//if one not available use some
        }
        if (html.some) {
            _html.some = html.some;//if some available
        } else if (html.one) {
            _html.some = html.one;//if some not available use one
        }
        return _chart;
    };

    /**
     * Calculate and return the underlying value of the display.
     * @method value
     * @memberof dc.numberDisplay
     * @instance
     * @returns {Number}
     */
    _chart.value = function () {
        return _chart.data();
    };

    function maxBin (all) {
        if (!all.length) {
            return null;
        }
        var sorted = _chart._computeOrderedGroups(all);
        return sorted[sorted.length - 1];
    }
    _chart.data(function (group) {
        var valObj = group.value ? group.value() : maxBin(group.all());
        return _chart.valueAccessor()(valObj);
    });

    _chart.transitionDuration(250); // good default
    _chart.transitionDelay(0);

    _chart._doRender = function () {
        var newValue = _chart.value(),
            span = _chart.selectAll('.' + SPAN_CLASS);

        if (span.empty()) {
            span = span.data([0])
                .enter()
                    .append('span')
                    .attr('class', SPAN_CLASS)
                .merge(span);
        }

        span.transition()
            .duration(_chart.transitionDuration())
            .delay(_chart.transitionDelay())
            .ease(d3.easeQuad)
            .tween('text', function () {
                // [XA] don't try and interpolate from Infinity, else this breaks.
                var interpStart = isFinite(_lastValue) ? _lastValue : 0;
                var interp = d3.interpolateNumber(interpStart || 0, newValue);
                _lastValue = newValue;

                // need to save it in D3v4
                var node = this;
                return function (t) {
                    var html = null, num = _chart.formatNumber()(interp(t));
                    if (newValue === 0 && (_html.none !== '')) {
                        html = _html.none;
                    } else if (newValue === 1 && (_html.one !== '')) {
                        html = _html.one;
                    } else if (_html.some !== '') {
                        html = _html.some;
                    }
                    node.innerHTML = html ? html.replace('%number', num) : num;
                };
            });
    };

    _chart._doRedraw = function () {
        return _chart._doRender();
    };

    /**
     * Get or set a function to format the value for the display.
     * @method formatNumber
     * @memberof dc.numberDisplay
     * @instance
     * @see {@link https://github.com/d3/d3-format/blob/master/README.md#format d3.format}
     * @param {Function} [formatter=d3.format('.2s')]
     * @returns {Function|dc.numberDisplay}
     */
    _chart.formatNumber = function (formatter) {
        if (!arguments.length) {
            return _formatNumber;
        }
        _formatNumber = formatter;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 * A heat map is matrix that represents the values of two dimensions of data using colors.
 * @class heatMap
 * @memberof dc
 * @mixes dc.colorMixin
 * @mixes dc.marginMixin
 * @mixes dc.baseMixin
 * @example
 * // create a heat map under #chart-container1 element using the default global chart group
 * var heatMap1 = dc.heatMap('#chart-container1');
 * // create a heat map under #chart-container2 element using chart group A
 * var heatMap2 = dc.heatMap('#chart-container2', 'chartGroupA');
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.heatMap}
 */
dc.heatMap = function (parent, chartGroup) {

    var DEFAULT_BORDER_RADIUS = 6.75;

    var _chartBody;

    var _cols;
    var _rows;
    var _colOrdering = d3.ascending;
    var _rowOrdering = d3.ascending;
    var _colScale = d3.scaleBand();
    var _rowScale = d3.scaleBand();

    var _xBorderRadius = DEFAULT_BORDER_RADIUS;
    var _yBorderRadius = DEFAULT_BORDER_RADIUS;

    var _chart = dc.colorMixin(dc.marginMixin(dc.baseMixin({})));
    _chart._mandatoryAttributes(['group']);
    _chart.title(_chart.colorAccessor());

    var _colsLabel = function (d) {
        return d;
    };
    var _rowsLabel = function (d) {
        return d;
    };

    /**
     * Set or get the column label function. The chart class uses this function to render
     * column labels on the X axis. It is passed the column name.
     * @method colsLabel
     * @memberof dc.heatMap
     * @instance
     * @example
     * // the default label function just returns the name
     * chart.colsLabel(function(d) { return d; });
     * @param  {Function} [labelFunction=function(d) { return d; }]
     * @returns {Function|dc.heatMap}
     */
    _chart.colsLabel = function (labelFunction) {
        if (!arguments.length) {
            return _colsLabel;
        }
        _colsLabel = labelFunction;
        return _chart;
    };

    /**
     * Set or get the row label function. The chart class uses this function to render
     * row labels on the Y axis. It is passed the row name.
     * @method rowsLabel
     * @memberof dc.heatMap
     * @instance
     * @example
     * // the default label function just returns the name
     * chart.rowsLabel(function(d) { return d; });
     * @param  {Function} [labelFunction=function(d) { return d; }]
     * @returns {Function|dc.heatMap}
     */
    _chart.rowsLabel = function (labelFunction) {
        if (!arguments.length) {
            return _rowsLabel;
        }
        _rowsLabel = labelFunction;
        return _chart;
    };

    var _xAxisOnClick = function (d) { filterAxis(0, d); };
    var _yAxisOnClick = function (d) { filterAxis(1, d); };
    var _boxOnClick = function (d) {
        var filter = d.key;
        dc.events.trigger(function () {
            _chart.filter(filter);
            _chart.redrawGroup();
        });
    };

    function filterAxis (axis, value) {
        var cellsOnAxis = _chart.selectAll('.box-group').filter(function (d) {
            return d.key[axis] === value;
        });
        var unfilteredCellsOnAxis = cellsOnAxis.filter(function (d) {
            return !_chart.hasFilter(d.key);
        });
        dc.events.trigger(function () {
            var selection = unfilteredCellsOnAxis.empty() ? cellsOnAxis : unfilteredCellsOnAxis;
            var filters = selection.data().map(function (kv) {
                return dc.filters.TwoDimensionalFilter(kv.key);
            });
            _chart._filter([filters]);
            _chart.redrawGroup();
        });
    }

    dc.override(_chart, 'filter', function (filter) {
        if (!arguments.length) {
            return _chart._filter();
        }

        return _chart._filter(dc.filters.TwoDimensionalFilter(filter));
    });

    /**
     * Gets or sets the values used to create the rows of the heatmap, as an array. By default, all
     * the values will be fetched from the data using the value accessor.
     * @method rows
     * @memberof dc.heatMap
     * @instance
     * @param  {Array<String|Number>} [rows]
     * @returns {Array<String|Number>|dc.heatMap}
     */

    _chart.rows = function (rows) {
        if (!arguments.length) {
            return _rows;
        }
        _rows = rows;
        return _chart;
    };

    /**
     #### .rowOrdering([orderFunction])
     Get or set an accessor to order the rows.  Default is d3.ascending.
     */
    _chart.rowOrdering = function (_) {
        if (!arguments.length) {
            return _rowOrdering;
        }
        _rowOrdering = _;
        return _chart;
    };

    /**
     * Gets or sets the keys used to create the columns of the heatmap, as an array. By default, all
     * the values will be fetched from the data using the key accessor.
     * @method cols
     * @memberof dc.heatMap
     * @instance
     * @param  {Array<String|Number>} [cols]
     * @returns {Array<String|Number>|dc.heatMap}
     */
    _chart.cols = function (cols) {
        if (!arguments.length) {
            return _cols;
        }
        _cols = cols;
        return _chart;
    };

    /**
     #### .colOrdering([orderFunction])
     Get or set an accessor to order the cols.  Default is ascending.
     */
    _chart.colOrdering = function (_) {
        if (!arguments.length) {
            return _colOrdering;
        }
        _colOrdering = _;
        return _chart;
    };

    _chart._doRender = function () {
        _chart.resetSvg();

        _chartBody = _chart.svg()
            .append('g')
            .attr('class', 'heatmap')
            .attr('transform', 'translate(' + _chart.margins().left + ',' + _chart.margins().top + ')');

        return _chart._doRedraw();
    };

    _chart._doRedraw = function () {
        var data = _chart.data(),
            rows = _chart.rows() || data.map(_chart.valueAccessor()),
            cols = _chart.cols() || data.map(_chart.keyAccessor());
        if (_rowOrdering) {
            rows = rows.sort(_rowOrdering);
        }
        if (_colOrdering) {
            cols = cols.sort(_colOrdering);
        }
        rows = _rowScale.domain(rows);
        cols = _colScale.domain(cols);

        var rowCount = rows.domain().length,
            colCount = cols.domain().length,
            boxWidth = Math.floor(_chart.effectiveWidth() / colCount),
            boxHeight = Math.floor(_chart.effectiveHeight() / rowCount);

        cols.rangeRound([0, _chart.effectiveWidth()]);
        rows.rangeRound([_chart.effectiveHeight(), 0]);

        var boxes = _chartBody.selectAll('g.box-group').data(_chart.data(), function (d, i) {
            return _chart.keyAccessor()(d, i) + '\0' + _chart.valueAccessor()(d, i);
        });

        boxes.exit().remove();

        var gEnter = boxes.enter().append('g')
            .attr('class', 'box-group');

        gEnter.append('rect')
            .attr('class', 'heat-box')
            .attr('fill', 'white')
            .attr('x', function (d, i) { return cols(_chart.keyAccessor()(d, i)); })
            .attr('y', function (d, i) { return rows(_chart.valueAccessor()(d, i)); })
            .on('click', _chart.boxOnClick());

        boxes = gEnter.merge(boxes);

        if (_chart.renderTitle()) {
            gEnter.append('title');
            boxes.select('title').text(_chart.title());
        }

        dc.transition(boxes.select('rect'), _chart.transitionDuration(), _chart.transitionDelay())
            .attr('x', function (d, i) { return cols(_chart.keyAccessor()(d, i)); })
            .attr('y', function (d, i) { return rows(_chart.valueAccessor()(d, i)); })
            .attr('rx', _xBorderRadius)
            .attr('ry', _yBorderRadius)
            .attr('fill', _chart.getColor)
            .attr('width', boxWidth)
            .attr('height', boxHeight);

        var gCols = _chartBody.select('g.cols');
        if (gCols.empty()) {
            gCols = _chartBody.append('g').attr('class', 'cols axis');
        }
        var gColsText = gCols.selectAll('text').data(cols.domain());

        gColsText.exit().remove();

        gColsText = gColsText
            .enter()
                .append('text')
                .attr('x', function (d) {
                    return cols(d) + boxWidth / 2;
                })
                .style('text-anchor', 'middle')
                .attr('y', _chart.effectiveHeight())
                .attr('dy', 12)
                .on('click', _chart.xAxisOnClick())
                .text(_chart.colsLabel())
            .merge(gColsText);

        dc.transition(gColsText, _chart.transitionDuration(), _chart.transitionDelay())
               .text(_chart.colsLabel())
               .attr('x', function (d) { return cols(d) + boxWidth / 2; })
               .attr('y', _chart.effectiveHeight());

        var gRows = _chartBody.select('g.rows');
        if (gRows.empty()) {
            gRows = _chartBody.append('g').attr('class', 'rows axis');
        }

        var gRowsText = gRows.selectAll('text').data(rows.domain());

        gRowsText.exit().remove();

        gRowsText = gRowsText
            .enter()
            .append('text')
                .style('text-anchor', 'end')
                .attr('x', 0)
                .attr('dx', -2)
                .attr('y', function (d) { return rows(d) + boxHeight / 2; })
                .attr('dy', 6)
                .on('click', _chart.yAxisOnClick())
                .text(_chart.rowsLabel())
            .merge(gRowsText);

        dc.transition(gRowsText, _chart.transitionDuration(), _chart.transitionDelay())
              .text(_chart.rowsLabel())
              .attr('y', function (d) { return rows(d) + boxHeight / 2; });

        if (_chart.hasFilter()) {
            _chart.selectAll('g.box-group').each(function (d) {
                if (_chart.isSelectedNode(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.selectAll('g.box-group').each(function () {
                _chart.resetHighlight(this);
            });
        }
        return _chart;
    };

    /**
     * Gets or sets the handler that fires when an individual cell is clicked in the heatmap.
     * By default, filtering of the cell will be toggled.
     * @method boxOnClick
     * @memberof dc.heatMap
     * @instance
     * @example
     * // default box on click handler
     * chart.boxOnClick(function (d) {
     *     var filter = d.key;
     *     dc.events.trigger(function () {
     *         _chart.filter(filter);
     *         _chart.redrawGroup();
     *     });
     * });
     * @param  {Function} [handler]
     * @returns {Function|dc.heatMap}
     */
    _chart.boxOnClick = function (handler) {
        if (!arguments.length) {
            return _boxOnClick;
        }
        _boxOnClick = handler;
        return _chart;
    };

    /**
     * Gets or sets the handler that fires when a column tick is clicked in the x axis.
     * By default, if any cells in the column are unselected, the whole column will be selected,
     * otherwise the whole column will be unselected.
     * @method xAxisOnClick
     * @memberof dc.heatMap
     * @instance
     * @param  {Function} [handler]
     * @returns {Function|dc.heatMap}
     */
    _chart.xAxisOnClick = function (handler) {
        if (!arguments.length) {
            return _xAxisOnClick;
        }
        _xAxisOnClick = handler;
        return _chart;
    };

    /**
     * Gets or sets the handler that fires when a row tick is clicked in the y axis.
     * By default, if any cells in the row are unselected, the whole row will be selected,
     * otherwise the whole row will be unselected.
     * @method yAxisOnClick
     * @memberof dc.heatMap
     * @instance
     * @param  {Function} [handler]
     * @returns {Function|dc.heatMap}
     */
    _chart.yAxisOnClick = function (handler) {
        if (!arguments.length) {
            return _yAxisOnClick;
        }
        _yAxisOnClick = handler;
        return _chart;
    };

    /**
     * Gets or sets the X border radius.  Set to 0 to get full rectangles.
     * @method xBorderRadius
     * @memberof dc.heatMap
     * @instance
     * @param  {Number} [xBorderRadius=6.75]
     * @returns {Number|dc.heatMap}
     */
    _chart.xBorderRadius = function (xBorderRadius) {
        if (!arguments.length) {
            return _xBorderRadius;
        }
        _xBorderRadius = xBorderRadius;
        return _chart;
    };

    /**
     * Gets or sets the Y border radius.  Set to 0 to get full rectangles.
     * @method yBorderRadius
     * @memberof dc.heatMap
     * @instance
     * @param  {Number} [yBorderRadius=6.75]
     * @returns {Number|dc.heatMap}
     */
    _chart.yBorderRadius = function (yBorderRadius) {
        if (!arguments.length) {
            return _yBorderRadius;
        }
        _yBorderRadius = yBorderRadius;
        return _chart;
    };

    _chart.isSelectedNode = function (d) {
        return _chart.hasFilter(d.key);
    };

    return _chart.anchor(parent, chartGroup);
};

// https://github.com/d3/d3-plugins/blob/master/box/box.js
// * Original source March 22, 2013
// * Enhancements integrated on May 13, 2018 for dc.js library only

// https://github.com/d3/d3-plugins/blob/master/LICENSE
// Copyright (c) 2012-2015, Michael Bostock
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice, this
//   list of conditions and the following disclaimer.
//
// * Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution.
//
// * The name Michael Bostock may not be used to endorse or promote products
//   derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
(function () {

    // Inspired by http://informationandvisualization.de/blog/box-plot
    d3.box = function () {
        var width = 1,
            height = 1,
            duration = 0,
            delay = 0,
            domain = null,
            value = Number,
            whiskers = boxWhiskers,
            quartiles = boxQuartiles,
            tickFormat = null,

            // Enhanced attributes
            renderDataPoints = false,
            dataRadius = 3,
            dataOpacity = 0.3,
            dataWidthPortion = 0.8,
            renderTitle = false,
            showOutliers = true,
            boldOutlier = false;

        // For each small multiple…
        function box (g) {
            /* jshint -W074 */
            g.each(function (d, i) {
                d = d.map(value).sort(d3.ascending);
                var g = d3.select(this),
                    n = d.length,
                    min,
                    max;

                // Leave if there are no items.
                if (n === 0) {return;}

                // Compute quartiles. Must return exactly 3 elements.
                var quartileData = d.quartiles = quartiles(d);

                // Compute whiskers. Must return exactly 2 elements, or null.
                var whiskerIndices = whiskers && whiskers.call(this, d, i),
                    whiskerData = whiskerIndices && whiskerIndices.map(function (i) { return d[i]; });

                // Compute outliers. If no whiskers are specified, all data are 'outliers'.
                // We compute the outliers as indices, so that we can join across transitions!
                var outlierIndices = whiskerIndices ?
                    d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n)) : d3.range(n);

                // Determine the maximum value based on if outliers are shown
                if (showOutliers) {
                    min = d[0];
                    max = d[n - 1];
                } else {
                    min = d[whiskerIndices[0]];
                    max = d[whiskerIndices[1]];
                }
                var pointIndices = d3.range(whiskerIndices[0], whiskerIndices[1] + 1);

                // Compute the new x-scale.
                var x1 = d3.scaleLinear()
                    .domain(domain && domain.call(this, d, i) || [min, max])
                    .range([height, 0]);

                // Retrieve the old x-scale, if this is an update.
                var x0 = this.__chart__ || d3.scaleLinear()
                    .domain([0, Infinity])
                    .range(x1.range());

                // Stash the new scale.
                this.__chart__ = x1;

                // Note: the box, median, and box tick elements are fixed in number,
                // so we only have to handle enter and update. In contrast, the outliers
                // and other elements are variable, so we need to exit them! Variable
                // elements also fade in and out.

                // Update center line: the vertical line spanning the whiskers.
                var center = g.selectAll('line.center')
                    .data(whiskerData ? [whiskerData] : []);

                center.enter().insert('line', 'rect')
                    .attr('class', 'center')
                    .attr('x1', width / 2)
                    .attr('y1', function (d) { return x0(d[0]); })
                    .attr('x2', width / 2)
                    .attr('y2', function (d) { return x0(d[1]); })
                    .style('opacity', 1e-6)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .style('opacity', 1)
                    .attr('y1', function (d) { return x1(d[0]); })
                    .attr('y2', function (d) { return x1(d[1]); });

                center.transition()
                    .duration(duration)
                    .delay(delay)
                    .style('opacity', 1)
                    .attr('x1', width / 2)
                    .attr('x2', width / 2)
                    .attr('y1', function (d) { return x1(d[0]); })
                    .attr('y2', function (d) { return x1(d[1]); });

                center.exit().transition()
                    .duration(duration)
                    .delay(delay)
                    .style('opacity', 1e-6)
                    .attr('y1', function (d) { return x1(d[0]); })
                    .attr('y2', function (d) { return x1(d[1]); })
                    .remove();

                // Update innerquartile box.
                var box = g.selectAll('rect.box')
                    .data([quartileData]);

                box.enter().append('rect')
                    .attr('class', 'box')
                    .attr('x', 0)
                    .attr('y', function (d) { return x0(d[2]); })
                    .attr('width', width)
                    .attr('height', function (d) { return x0(d[0]) - x0(d[2]); })
                    .style('fill-opacity', (renderDataPoints) ? 0.1 : 1)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('y', function (d) { return x1(d[2]); })
                    .attr('height', function (d) { return x1(d[0]) - x1(d[2]); });

                box.transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('width', width)
                    .attr('y', function (d) { return x1(d[2]); })
                    .attr('height', function (d) { return x1(d[0]) - x1(d[2]); });

                // Update median line.
                var medianLine = g.selectAll('line.median')
                    .data([quartileData[1]]);

                medianLine.enter().append('line')
                    .attr('class', 'median')
                    .attr('x1', 0)
                    .attr('y1', x0)
                    .attr('x2', width)
                    .attr('y2', x0)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('y1', x1)
                    .attr('y2', x1);

                medianLine.transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('x1', 0)
                    .attr('x2', width)
                    .attr('y1', x1)
                    .attr('y2', x1);

                // Update whiskers.
                var whisker = g.selectAll('line.whisker')
                    .data(whiskerData || []);

                whisker.enter().insert('line', 'circle, text')
                    .attr('class', 'whisker')
                    .attr('x1', 0)
                    .attr('y1', x0)
                    .attr('x2', width)
                    .attr('y2', x0)
                    .style('opacity', 1e-6)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('y1', x1)
                    .attr('y2', x1)
                    .style('opacity', 1);

                whisker.transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('x1', 0)
                    .attr('x2', width)
                    .attr('y1', x1)
                    .attr('y2', x1)
                    .style('opacity', 1);

                whisker.exit().transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('y1', x1)
                    .attr('y2', x1)
                    .style('opacity', 1e-6)
                    .remove();

                // Update outliers.
                if (showOutliers) {
                    var outlierClass = boldOutlier ? 'outlierBold' : 'outlier';
                    var outlierSize = boldOutlier ? 3 : 5;
                    var outlierX = boldOutlier ?
                        function () { return Math.floor(Math.random() *
                            (width * dataWidthPortion) +
                            1 + ((width - (width * dataWidthPortion)) / 2)); } :
                        function () { return width / 2; };

                    var outlier = g.selectAll('circle.' + outlierClass)
                        .data(outlierIndices, Number);

                    outlier.enter().insert('circle', 'text')
                        .attr('class', outlierClass)
                        .attr('r', outlierSize)
                        .attr('cx', outlierX)
                        .attr('cy', function (i) { return x0(d[i]); })
                        .style('opacity', 1e-6)
                        .transition()
                        .duration(duration)
                        .delay(delay)
                        .attr('cy', function (i) { return x1(d[i]); })
                        .style('opacity', 0.6);

                    if (renderTitle) {
                        outlier.selectAll('title').remove();
                        outlier.append('title').text(function (i) {return d[i]; });
                    }

                    outlier.transition()
                        .duration(duration)
                        .delay(delay)
                        .attr('cx', outlierX)
                        .attr('cy', function (i) { return x1(d[i]); })
                        .style('opacity', 0.6);

                    outlier.exit().transition()
                        .duration(duration)
                        .delay(delay)
                        .attr('cy', 0) //function (i) { return x1(d[i]); })
                        .style('opacity', 1e-6)
                        .remove();
                }

                // Update Values
                if (renderDataPoints) {
                    var point = g.selectAll('circle.data')
                        .data(pointIndices);

                    point.enter().insert('circle', 'text')
                        .attr('class', 'data')
                        .attr('r', dataRadius)
                        .attr('cx', function () { return Math.floor(Math.random() *
                            (width * dataWidthPortion) +
                            1 + ((width - (width * dataWidthPortion)) / 2)); })
                        .attr('cy', function (i) { return x0(d[i]); })
                        .style('opacity', 1e-6)
                        .transition()
                        .duration(duration)
                        .delay(delay)
                        .attr('cy', function (i) { return x1(d[i]); })
                        .style('opacity', dataOpacity);

                    if (renderTitle) {
                        point.selectAll('title').remove();
                        point.append('title').text(function (i) { return d[i]; });
                    }

                    point.transition()
                        .duration(duration)
                        .delay(delay)
                        .attr('cx', function () { return Math.floor(Math.random() *
                            (width * dataWidthPortion) +
                            1 + ((width - (width * dataWidthPortion)) / 2)); })
                        .attr('cy', function (i) { return x1(d[i]); })
                        .style('opacity', dataOpacity);

                    point.exit().transition()
                        .duration(duration)
                        .delay(delay)
                        .attr('cy', 0)
                        .style('opacity', 1e-6)
                        .remove();
                }

                // Compute the tick format.
                var format = tickFormat || x1.tickFormat(8);

                // Update box ticks.
                var boxTick = g.selectAll('text.box')
                    .data(quartileData);

                boxTick.enter().append('text')
                    .attr('class', 'box')
                    .attr('dy', '.3em')
                    .attr('dx', function (d, i) { return i & 1 ? 6 : -6; })
                    .attr('x', function (d, i) { return i & 1 ? width : 0; })
                    .attr('y', x0)
                    .attr('text-anchor', function (d, i) { return i & 1 ? 'start' : 'end'; })
                    .text(format)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('y', x1);

                boxTick.transition()
                    .duration(duration)
                    .delay(delay)
                    .text(format)
                    .attr('x', function (d, i) { return i & 1 ? width : 0; })
                    .attr('y', x1);

                // Update whisker ticks. These are handled separately from the box
                // ticks because they may or may not exist, and we want don't want
                // to join box ticks pre-transition with whisker ticks post-.
                var whiskerTick = g.selectAll('text.whisker')
                    .data(whiskerData || []);

                whiskerTick.enter().append('text')
                    .attr('class', 'whisker')
                    .attr('dy', '.3em')
                    .attr('dx', 6)
                    .attr('x', width)
                    .attr('y', x0)
                    .text(format)
                    .style('opacity', 1e-6)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('y', x1)
                    .style('opacity', 1);

                whiskerTick.transition()
                    .duration(duration)
                    .delay(delay)
                    .text(format)
                    .attr('x', width)
                    .attr('y', x1)
                    .style('opacity', 1);

                whiskerTick.exit().transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('y', x1)
                    .style('opacity', 1e-6)
                    .remove();

                // Remove temporary quartiles element from within data array.
                delete d.quartiles;
            });
            /* jshint +W074 */
            d3.timerFlush();
        }

        box.width = function (x) {
            if (!arguments.length) {
                return width;
            }
            width = x;
            return box;
        };

        box.height = function (x) {
            if (!arguments.length) {
                return height;
            }
            height = x;
            return box;
        };

        box.tickFormat = function (x) {
            if (!arguments.length) {
                return tickFormat;
            }
            tickFormat = x;
            return box;
        };

        box.showOutliers = function (x) {
            if (!arguments.length) {
                return showOutliers;
            }
            showOutliers = x;
            return box;
        };

        box.boldOutlier = function (x) {
            if (!arguments.length) {
                return boldOutlier;
            }
            boldOutlier = x;
            return box;
        };

        box.renderDataPoints = function (x) {
            if (!arguments.length) {
                return renderDataPoints;
            }
            renderDataPoints = x;
            return box;
        };

        box.renderTitle = function (x) {
            if (!arguments.length) {
                return renderTitle;
            }
            renderTitle = x;
            return box;
        };

        box.dataOpacity = function (x) {
            if (!arguments.length) {
                return dataOpacity;
            }
            dataOpacity = x;
            return box;
        };

        box.dataWidthPortion = function (x) {
            if (!arguments.length) {
                return dataWidthPortion;
            }
            dataWidthPortion = x;
            return box;
        };

        box.duration = function (x) {
            if (!arguments.length) {
                return duration;
            }
            duration = x;
            return box;
        };

        box.domain = function (x) {
            if (!arguments.length) {
                return domain;
            }
            domain = x === null ? x :  typeof x === 'function' ? x : dc.utils.constant(x);
            return box;
        };

        box.value = function (x) {
            if (!arguments.length) {
                return value;
            }
            value = x;
            return box;
        };

        box.whiskers = function (x) {
            if (!arguments.length) {
                return whiskers;
            }
            whiskers = x;
            return box;
        };

        box.quartiles = function (x) {
            if (!arguments.length) {
                return quartiles;
            }
            quartiles = x;
            return box;
        };

        return box;
    };

    function boxWhiskers (d) {
        return [0, d.length - 1];
    }

    function boxQuartiles (d) {
        return [
            d3.quantile(d, 0.25),
            d3.quantile(d, 0.5),
            d3.quantile(d, 0.75)
        ];
    }

})();



/**
 * A box plot is a chart that depicts numerical data via their quartile ranges.
 *
 * Examples:
 * - {@link http://dc-js.github.io/dc.js/examples/boxplot-basic.html Boxplot Basic example}
 * - {@link http://dc-js.github.io/dc.js/examples/boxplot-enhanced.html Boxplot Enhanced example}
 * - {@link http://dc-js.github.io/dc.js/examples/boxplot-render-data.html Boxplot Render Data example}
 * - {@link http://dc-js.github.io/dc.js/examples/boxplot-time.html Boxplot time example}
 * @class boxPlot
 * @memberof dc
 * @mixes dc.coordinateGridMixin
 * @example
 * // create a box plot under #chart-container1 element using the default global chart group
 * var boxPlot1 = dc.boxPlot('#chart-container1');
 * // create a box plot under #chart-container2 element using chart group A
 * var boxPlot2 = dc.boxPlot('#chart-container2', 'chartGroupA');
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.boxPlot}
 */
dc.boxPlot = function (parent, chartGroup) {
    var _chart = dc.coordinateGridMixin({});

    // Returns a function to compute the interquartile range.
    function DEFAULT_WHISKERS_IQR (k) {
        return function (d) {
            var q1 = d.quartiles[0],
                q3 = d.quartiles[2],
                iqr = (q3 - q1) * k,
                i = -1,
                j = d.length;
            do { ++i; } while (d[i] < q1 - iqr);
            do { --j; } while (d[j] > q3 + iqr);
            return [i, j];
        };
    }

    var _whiskerIqrFactor = 1.5;
    var _whiskersIqr = DEFAULT_WHISKERS_IQR;
    var _whiskers = _whiskersIqr(_whiskerIqrFactor);

    var _box = d3.box();
    var _tickFormat = null;
    var _renderDataPoints = false;
    var _dataOpacity = 0.3;
    var _dataWidthPortion = 0.8;
    var _showOutliers = true;
    var _boldOutlier = false;

    // Used in yAxisMin and yAxisMax to add padding in pixel coordinates
    // so the min and max data points/whiskers are within the chart
    var _yRangePadding = 8;

    var _boxWidth = function (innerChartWidth, xUnits) {
        if (_chart.isOrdinal()) {
            return _chart.x().bandwidth();
        } else {
            return innerChartWidth / (1 + _chart.boxPadding()) / xUnits;
        }
    };

    // default to ordinal
    _chart.x(d3.scaleBand());
    _chart.xUnits(dc.units.ordinal);

    // valueAccessor should return an array of values that can be coerced into numbers
    // or if data is overloaded for a static array of arrays, it should be `Number`.
    // Empty arrays are not included.
    _chart.data(function (group) {
        return group.all().map(function (d) {
            d.map = function (accessor) { return accessor.call(d, d); };
            return d;
        }).filter(function (d) {
            var values = _chart.valueAccessor()(d);
            return values.length !== 0;
        });
    });

    /**
     * Get or set the spacing between boxes as a fraction of box size. Valid values are within 0-1.
     * See the {@link https://github.com/d3/d3-scale/blob/master/README.md#scaleBand d3 docs}
     * for a visual description of how the padding is applied.
     * @method boxPadding
     * @memberof dc.boxPlot
     * @instance
     * @see {@link https://github.com/d3/d3-scale/blob/master/README.md#scaleBand d3.scaleBand}
     * @param {Number} [padding=0.8]
     * @returns {Number|dc.boxPlot}
     */
    _chart.boxPadding = _chart._rangeBandPadding;
    _chart.boxPadding(0.8);

    /**
     * Get or set the outer padding on an ordinal box chart. This setting has no effect on non-ordinal charts
     * or on charts with a custom {@link dc.boxPlot#boxWidth .boxWidth}. Will pad the width by
     * `padding * barWidth` on each side of the chart.
     * @method outerPadding
     * @memberof dc.boxPlot
     * @instance
     * @param {Number} [padding=0.5]
     * @returns {Number|dc.boxPlot}
     */
    _chart.outerPadding = _chart._outerRangeBandPadding;
    _chart.outerPadding(0.5);

    /**
     * Get or set the numerical width of the boxplot box. The width may also be a function taking as
     * parameters the chart width excluding the right and left margins, as well as the number of x
     * units.
     * @example
     * // Using numerical parameter
     * chart.boxWidth(10);
     * // Using function
     * chart.boxWidth((innerChartWidth, xUnits) { ... });
     * @method boxWidth
     * @memberof dc.boxPlot
     * @instance
     * @param {Number|Function} [boxWidth=0.5]
     * @returns {Number|Function|dc.boxPlot}
     */
    _chart.boxWidth = function (boxWidth) {
        if (!arguments.length) {
            return _boxWidth;
        }
        _boxWidth = typeof boxWidth === 'function' ? boxWidth : dc.utils.constant(boxWidth);
        return _chart;
    };

    var boxTransform = function (d, i) {
        var xOffset = _chart.x()(_chart.keyAccessor()(d, i));
        return 'translate(' + xOffset + ', 0)';
    };

    _chart._preprocessData = function () {
        if (_chart.elasticX()) {
            _chart.x().domain([]);
        }
    };

    _chart.plotData = function () {
        var _calculatedBoxWidth = _boxWidth(_chart.effectiveWidth(), _chart.xUnitCount());

        _box.whiskers(_whiskers)
            .width(_calculatedBoxWidth)
            .height(_chart.effectiveHeight())
            .value(_chart.valueAccessor())
            .domain(_chart.y().domain())
            .duration(_chart.transitionDuration())
            .tickFormat(_tickFormat)
            .renderDataPoints(_renderDataPoints)
            .dataOpacity(_dataOpacity)
            .dataWidthPortion(_dataWidthPortion)
            .renderTitle(_chart.renderTitle())
            .showOutliers(_showOutliers)
            .boldOutlier(_boldOutlier);

        var boxesG = _chart.chartBodyG().selectAll('g.box').data(_chart.data(), _chart.keyAccessor());

        var boxesGEnterUpdate = renderBoxes(boxesG);
        updateBoxes(boxesGEnterUpdate);
        removeBoxes(boxesG);

        _chart.fadeDeselectedArea(_chart.filter());
    };

    function renderBoxes (boxesG) {
        var boxesGEnter = boxesG.enter().append('g');

        boxesGEnter
            .attr('class', 'box')
            .attr('transform', boxTransform)
            .call(_box)
            .on('click', function (d) {
                _chart.filter(_chart.keyAccessor()(d));
                _chart.redrawGroup();
            });
        return boxesGEnter.merge(boxesG);
    }

    function updateBoxes (boxesG) {
        dc.transition(boxesG, _chart.transitionDuration(), _chart.transitionDelay())
            .attr('transform', boxTransform)
            .call(_box)
            .each(function (d) {
                var color = _chart.getColor(d, 0);
                d3.select(this).select('rect.box').attr('fill', color);
                d3.select(this).selectAll('circle.data').attr('fill', color);
            });
    }

    function removeBoxes (boxesG) {
        boxesG.exit().remove().call(_box);
    }

    function minDataValue () {
        return d3.min(_chart.data(), function (e) {
            return d3.min(_chart.valueAccessor()(e));
        });
    }

    function maxDataValue () {
        return d3.max(_chart.data(), function (e) {
            return d3.max(_chart.valueAccessor()(e));
        });
    }

    function yAxisRangeRatio () {
        return ((maxDataValue() - minDataValue()) / _chart.effectiveHeight());
    }

    _chart.fadeDeselectedArea = function (brushSelection) {
        if (_chart.hasFilter()) {
            if (_chart.isOrdinal()) {
                _chart.g().selectAll('g.box').each(function (d) {
                    if (_chart.isSelectedNode(d)) {
                        _chart.highlightSelected(this);
                    } else {
                        _chart.fadeDeselected(this);
                    }
                });
            } else {
                if (!(_chart.brushOn() || _chart.parentBrushOn())) {
                    return;
                }
                var start = brushSelection[0];
                var end = brushSelection[1];
                var keyAccessor = _chart.keyAccessor();
                _chart.g().selectAll('g.box').each(function (d) {
                    var key = keyAccessor(d);
                    if (key < start || key >= end) {
                        _chart.fadeDeselected(this);
                    } else {
                        _chart.highlightSelected(this);
                    }
                });
            }
        } else {
            _chart.g().selectAll('g.box').each(function () {
                _chart.resetHighlight(this);
            });
        }
    };

    _chart.isSelectedNode = function (d) {
        return _chart.hasFilter(_chart.keyAccessor()(d));
    };

    _chart.yAxisMin = function () {
        var padding = _yRangePadding * yAxisRangeRatio();
        return dc.utils.subtract(minDataValue() - padding, _chart.yAxisPadding());
    };

    _chart.yAxisMax = function () {
        var padding = _yRangePadding * yAxisRangeRatio();
        return dc.utils.add(maxDataValue() + padding, _chart.yAxisPadding());
    };

    /**
     * Get or set the numerical format of the boxplot median, whiskers and quartile labels. Defaults
     * to integer formatting.
     * @example
     * // format ticks to 2 decimal places
     * chart.tickFormat(d3.format('.2f'));
     * @method tickFormat
     * @memberof dc.boxPlot
     * @instance
     * @param {Function} [tickFormat]
     * @returns {Number|Function|dc.boxPlot}
     */
    _chart.tickFormat = function (tickFormat) {
        if (!arguments.length) {
            return _tickFormat;
        }
        _tickFormat = tickFormat;
        return _chart;
    };

    /**
     * Get or set the amount of padding to add, in pixel coordinates, to the top and
     * bottom of the chart to accommodate box/whisker labels.
     * @example
     * // allow more space for a bigger whisker font
     * chart.yRangePadding(12);
     * @method yRangePadding
     * @memberof dc.boxPlot
     * @instance
     * @param {Function} [yRangePadding = 8]
     * @returns {Number|Function|dc.boxPlot}
     */
    _chart.yRangePadding = function (yRangePadding) {
        if (!arguments.length) {
            return _yRangePadding;
        }
        _yRangePadding = yRangePadding;
        return _chart;
    };

    /**
     * Get or set whether individual data points will be rendered.
     * @example
     * // Enable rendering of individual data points
     * chart.renderDataPoints(true);
     * @method renderDataPoints
     * @memberof dc.boxPlot
     * @instance
     * @param {Boolean} [show=false]
     * @returns {Boolean|dc.boxPlot}
     */
    _chart.renderDataPoints = function (show) {
        if (!arguments.length) {
            return _renderDataPoints;
        }
        _renderDataPoints = show;
        return _chart;
    };

    /**
     * Get or set the opacity when rendering data.
     * @example
     * // If individual data points are rendered increase the opacity.
     * chart.dataOpacity(0.7);
     * @method dataOpacity
     * @memberof dc.boxPlot
     * @instance
     * @param {Number} [opacity=0.3]
     * @returns {Number|dc.boxPlot}
     */
    _chart.dataOpacity = function (opacity) {
        if (!arguments.length) {
            return _dataOpacity;
        }
        _dataOpacity = opacity;
        return _chart;
    };

    /**
     * Get or set the portion of the width of the box to show data points.
     * @example
     * // If individual data points are rendered increase the data box.
     * chart.dataWidthPortion(0.9);
     * @method dataWidthPortion
     * @memberof dc.boxPlot
     * @instance
     * @param {Number} [percentage=0.8]
     * @returns {Number|dc.boxPlot}
     */
    _chart.dataWidthPortion = function (percentage) {
        if (!arguments.length) {
            return _dataWidthPortion;
        }
        _dataWidthPortion = percentage;
        return _chart;
    };

    /**
     * Get or set whether outliers will be rendered.
     * @example
     * // Disable rendering of outliers
     * chart.showOutliers(false);
     * @method showOutliers
     * @memberof dc.boxPlot
     * @instance
     * @param {Boolean} [show=true]
     * @returns {Boolean|dc.boxPlot}
     */
    _chart.showOutliers = function (show) {
        if (!arguments.length) {
            return _showOutliers;
        }
        _showOutliers = show;
        return _chart;
    };

    /**
     * Get or set whether outliers will be drawn bold.
     * @example
     * // If outliers are rendered display as bold
     * chart.boldOutlier(true);
     * @method boldOutlier
     * @memberof dc.boxPlot
     * @instance
     * @param {Boolean} [show=false]
     * @returns {Boolean|dc.boxPlot}
     */
    _chart.boldOutlier = function (show) {
        if (!arguments.length) {
            return _boldOutlier;
        }
        _boldOutlier = show;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};


/**
 * The select menu is a simple widget designed to filter a dimension by selecting an option from
 * an HTML `<select/>` menu. The menu can be optionally turned into a multiselect.
 * @class selectMenu
 * @memberof dc
 * @mixes dc.baseMixin
 * @example
 * // create a select menu under #select-container using the default global chart group
 * var select = dc.selectMenu('#select-container')
 *                .dimension(states)
 *                .group(stateGroup);
 * // the option text can be set via the title() function
 * // by default the option text is '`key`: `value`'
 * select.title(function (d){
 *     return 'STATE: ' + d.key;
 * })
 * @param {String|node|d3.selection|dc.compositeChart} parent - Any valid
 * [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this widget should be placed in.
 * Interaction with the widget will only trigger events and redraws within its group.
 * @returns {selectMenu}
 **/
dc.selectMenu = function (parent, chartGroup) {
    var SELECT_CSS_CLASS = 'dc-select-menu';
    var OPTION_CSS_CLASS = 'dc-select-option';

    var _chart = dc.baseMixin({});

    var _select;
    var _promptText = 'Select all';
    var _multiple = false;
    var _promptValue = null;
    var _numberVisible = null;
    var _order = function (a, b) {
        return _chart.keyAccessor()(a) > _chart.keyAccessor()(b) ?
             1 : _chart.keyAccessor()(b) > _chart.keyAccessor()(a) ?
            -1 : 0;
    };

    var _filterDisplayed = function (d) {
        return _chart.valueAccessor()(d) > 0;
    };

    _chart.data(function (group) {
        return group.all().filter(_filterDisplayed);
    });

    _chart._doRender = function () {
        _chart.select('select').remove();
        _select = _chart.root().append('select')
                        .classed(SELECT_CSS_CLASS, true);
        _select.append('option').text(_promptText).attr('value', '');

        _chart._doRedraw();
        return _chart;
    };
    // Fixing IE 11 crash when redrawing the chart
    // see here for list of IE user Agents :
    // http://www.useragentstring.com/pages/useragentstring.php?name=Internet+Explorer
    var ua = window.navigator.userAgent;
    // test for IE 11 but not a lower version (which contains MSIE in UA)
    if (ua.indexOf('Trident/') > 0 && ua.indexOf('MSIE') === -1) {
        _chart.redraw = _chart.render;
    }

    _chart._doRedraw = function () {
        setAttributes();
        renderOptions();
        // select the option(s) corresponding to current filter(s)
        if (_chart.hasFilter() && _multiple) {
            _select.selectAll('option')
                .property('selected', function (d) {
                    return typeof d !== 'undefined' && _chart.filters().indexOf(String(_chart.keyAccessor()(d))) >= 0;
                });
        } else if (_chart.hasFilter()) {
            _select.property('value', _chart.filter());
        } else {
            _select.property('value', '');
        }
        return _chart;
    };

    function renderOptions () {
        var options = _select.selectAll('option.' + OPTION_CSS_CLASS)
          .data(_chart.data(), function (d) { return _chart.keyAccessor()(d); });

        options.exit().remove();

        options.enter()
              .append('option')
              .classed(OPTION_CSS_CLASS, true)
              .attr('value', function (d) { return _chart.keyAccessor()(d); })
            .merge(options)
              .text(_chart.title());

        _select.selectAll('option.' + OPTION_CSS_CLASS).sort(_order);

        _select.on('change', onChange);
    }

    function onChange (d, i) {
        var values;
        var target = d3.event.target;
        if (target.selectedOptions) {
            var selectedOptions = Array.prototype.slice.call(target.selectedOptions);
            values = selectedOptions.map(function (d) {
                return d.value;
            });
        } else { // IE and other browsers do not support selectedOptions
            // adapted from this polyfill: https://gist.github.com/brettz9/4212217
            var options = [].slice.call(d3.event.target.options);
            values = options.filter(function (option) {
                return option.selected;
            }).map(function (option) {
                return option.value;
            });
        }
        // console.log(values);
        // check if only prompt option is selected
        if (values.length === 1 && values[0] === '') {
            values = _promptValue || null;
        } else if (!_multiple && values.length === 1) {
            values = values[0];
        }
        _chart.onChange(values);
    }

    _chart.onChange = function (val) {
        if (val && _multiple) {
            _chart.replaceFilter([val]);
        } else if (val) {
            _chart.replaceFilter(val);
        } else {
            _chart.filterAll();
        }
        dc.events.trigger(function () {
            _chart.redrawGroup();
        });
    };

    function setAttributes () {
        if (_multiple) {
            _select.attr('multiple', true);
        } else {
            _select.attr('multiple', null);
        }
        if (_numberVisible !== null) {
            _select.attr('size', _numberVisible);
        } else {
            _select.attr('size', null);
        }
    }

    /**
     * Get or set the function that controls the ordering of option tags in the
     * select menu. By default options are ordered by the group key in ascending
     * order.
     * @name order
     * @memberof dc.selectMenu
     * @instance
     * @param {Function} [order]
     * @example
     * // order by the group's value
     * chart.order(function (a,b) {
     *     return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
     * });
     **/
    _chart.order = function (order) {
        if (!arguments.length) {
            return _order;
        }
        _order = order;
        return _chart;
    };

    /**
     * Get or set the text displayed in the options used to prompt selection.
     * @name promptText
     * @memberof dc.selectMenu
     * @instance
     * @param {String} [promptText='Select all']
     * @example
     * chart.promptText('All states');
     **/
    _chart.promptText = function (_) {
        if (!arguments.length) {
            return _promptText;
        }
        _promptText = _;
        return _chart;
    };

    /**
     * Get or set the function that filters option tags prior to display. By default options
     * with a value of < 1 are not displayed.
     * @name filterDisplayed
     * @memberof dc.selectMenu
     * @instance
     * @param {function} [filterDisplayed]
     * @example
     * // display all options override the `filterDisplayed` function:
     * chart.filterDisplayed(function () {
     *     return true;
     * });
     **/
    _chart.filterDisplayed = function (filterDisplayed) {
        if (!arguments.length) {
            return _filterDisplayed;
        }
        _filterDisplayed = filterDisplayed;
        return _chart;
    };

    /**
     * Controls the type of select menu. Setting it to true converts the underlying
     * HTML tag into a multiple select.
     * @name multiple
     * @memberof dc.selectMenu
     * @instance
     * @param {boolean} [multiple=false]
     * @example
     * chart.multiple(true);
     **/
    _chart.multiple = function (multiple) {
        if (!arguments.length) {
            return _multiple;
        }
        _multiple = multiple;

        return _chart;
    };

    /**
     * Controls the default value to be used for
     * [dimension.filter](https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension_filter)
     * when only the prompt value is selected. If `null` (the default), no filtering will occur when
     * just the prompt is selected.
     * @name promptValue
     * @memberof dc.selectMenu
     * @instance
     * @param {?*} [promptValue=null]
     **/
    _chart.promptValue = function (promptValue) {
        if (!arguments.length) {
            return _promptValue;
        }
        _promptValue = promptValue;

        return _chart;
    };

    /**
     * Controls the number of items to show in the select menu, when `.multiple()` is true. This
     * controls the [`size` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes) of
     * the `select` element. If `null` (the default), uses the browser's default height.
     * @name numberItems
     * @memberof dc.selectMenu
     * @instance
     * @param {?number} [numberVisible=null]
     * @example
     * chart.numberVisible(10);
     **/
    _chart.numberVisible = function (numberVisible) {
        if (!arguments.length) {
            return _numberVisible;
        }
        _numberVisible = numberVisible;

        return _chart;
    };

    _chart.size = dc.logger.deprecate(_chart.numberVisible, 'selectMenu.size is ambiguous - use numberVisible instead');

    return _chart.anchor(parent, chartGroup);
};

/**
 * Text Filter Widget
 *
 * The text filter widget is a simple widget designed to display an input field allowing to filter
 * data that matches the text typed.
 * As opposed to the other charts, this doesn't display any result and doesn't update its display,
 * it's just to input an filter other charts.
 *
 * @class textFilterWidget
 * @memberof dc
 * @mixes dc.baseMixin
 * @example
 *
 * var data = [{"firstName":"John","lastName":"Coltrane"}{"firstName":"Miles",lastName:"Davis"}]
 * var ndx = crossfilter(data);
 * var dimension = ndx.dimension(function(d) {
 *     return d.lastName.toLowerCase() + ' ' + d.firstName.toLowerCase();
 * });
 *
 * dc.textFilterWidget('#search')
 *     .dimension(dimension);
 *     // you don't need the group() function
 *
 * @param {String|node|d3.selection|dc.compositeChart} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector}
 * specifying a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.textFilterWidget}
 **/

dc.textFilterWidget = function (parent, chartGroup) {
    var INPUT_CSS_CLASS = 'dc-text-filter-input';

    var _chart = dc.baseMixin({});

    var _normalize = function (s) {
        return s.toLowerCase();
    };

    var _filterFunctionFactory = function (query) {
        query = _normalize(query);
        return function (d) {
            return _normalize(d).indexOf(query) !== -1;
        };
    };

    var _placeHolder = 'search';

    _chart.group(function () {
        throw 'the group function on textFilterWidget should never be called, please report the issue';
    });

    _chart._doRender = function () {
        _chart.select('input').remove();

        var _input = _chart.root().append('input')
            .classed(INPUT_CSS_CLASS, true);

        _input.on('input', function () {
            _chart.dimension().filterFunction(_filterFunctionFactory(this.value));
            dc.events.trigger(function () {
                dc.redrawAll();
            }, dc.constants.EVENT_DELAY);
        });

        _chart._doRedraw();

        return _chart;
    };

    _chart._doRedraw = function () {
        _chart.root().selectAll('input')
            .attr('placeholder', _placeHolder);

        return _chart;
    };

    /**
     * This function will be called on values before calling the filter function.
     * @name normalize
     * @memberof dc.textFilterWidget
     * @instance
     * @example
     * // This is the default
     * chart.normalize(function (s) {
     *   return s.toLowerCase();
     * });
     * @param {function} [normalize]
     * @returns {dc.textFilterWidget|function}
     **/
    _chart.normalize = function (normalize) {
        if (!arguments.length) {
            return _normalize;
        }
        _normalize = normalize;
        return _chart;
    };

    /**
     * Placeholder text in the search box.
     * @name placeHolder
     * @memberof dc.textFilterWidget
     * @instance
     * @example
     * // This is the default
     * chart.placeHolder('type to filter');
     * @param {function} [placeHolder='search']
     * @returns {dc.textFilterWidget|string}
     **/
    _chart.placeHolder = function (placeHolder) {
        if (!arguments.length) {
            return _placeHolder;
        }
        _placeHolder = placeHolder;
        return _chart;
    };

    /**
     * This function will be called with the search text, it needs to return a function that will be used to
     * filter the data. The default function checks presence of the search text.
     * @name filterFunctionFactory
     * @memberof dc.textFilterWidget
     * @instance
     * @example
     * // This is the default
     * function (query) {
     *     query = _normalize(query);
     *     return function (d) {
     *         return _normalize(d).indexOf(query) !== -1;
     *     };
     * };
     * @param {function} [filterFunctionFactory]
     * @returns {dc.textFilterWidget|function}
     **/
    _chart.filterFunctionFactory = function (filterFunctionFactory) {
        if (!arguments.length) {
            return _filterFunctionFactory;
        }
        _filterFunctionFactory = filterFunctionFactory;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 * The cboxMenu is a simple widget designed to filter a dimension by
 * selecting option(s) from a set of HTML `<input />` elements. The menu can be
 * made into a set of radio buttons (single select) or checkboxes (multiple).
 * @class cboxMenu
 * @memberof dc
 * @mixes dc.baseMixin
 * @example
 * // create a cboxMenu under #cbox-container using the default global chart group
 * var cbox = dc.cboxMenu('#cbox-container')
 *                .dimension(states)
 *                .group(stateGroup);
 * // the option text can be set via the title() function
 * // by default the option text is '`key`: `value`'
 * cbox.title(function (d){
 *     return 'STATE: ' + d.key;
 * })
 * @param {String|node|d3.selection|dc.compositeChart} parent - Any valid
 * [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this widget should be placed in.
 * Interaction with the widget will only trigger events and redraws within its group.
 * @returns {cboxMenu}
 **/
dc.cboxMenu = function (parent, chartGroup) {
    var GROUP_CSS_CLASS = 'dc-cbox-group';
    var ITEM_CSS_CLASS = 'dc-cbox-item';

    var _chart = dc.baseMixin({});

    var _cbox;
    var _promptText = 'Select all';
    var _multiple = false;
    var _inputType = 'radio';
    var _promptValue = null;
    // generate a random number to use as an ID
    var _randVal = Math.floor(Math.random() * (100000)) + 1;
    var _order = function (a, b) {
        return _chart.keyAccessor()(a) > _chart.keyAccessor()(b) ?
             1 : _chart.keyAccessor()(b) > _chart.keyAccessor()(a) ?
            -1 : 0;
    };

    var _filterDisplayed = function (d) {
        return _chart.valueAccessor()(d) > 0;
    };

    _chart.data(function (group) {
        return group.all().filter(_filterDisplayed);
    });

    _chart._doRender = function () {
        return _chart._doRedraw();
    };
    /*
    // IS THIS NEEDED?
    // Fixing IE 11 crash when redrawing the chart
    // see here for list of IE user Agents :
    // http://www.useragentstring.com/pages/useragentstring.php?name=Internet+Explorer
    var ua = window.navigator.userAgent;
    // test for IE 11 but not a lower version (which contains MSIE in UA)
    if (ua.indexOf('Trident/') > 0 && ua.indexOf('MSIE') === -1) {
        _chart.redraw = _chart.render;
    }
    */
    _chart._doRedraw = function () {
        _chart.select('ul').remove();
        _cbox = _chart.root()
            .append('ul')
            .classed(GROUP_CSS_CLASS, true);
        renderOptions();

        if (_chart.hasFilter() && _multiple) {
            _cbox.selectAll('input')
                .property('checked', function (d) {
                    // adding `false` avoids failing test cases in phantomjs
                    return d && _chart.filters().indexOf(String(_chart.keyAccessor()(d))) >= 0 || false;
                });
        } else if (_chart.hasFilter()) {
            _cbox.selectAll('input')
                .property('checked', function (d) {
                    if (!d) {
                        return false;
                    }
                    return _chart.keyAccessor()(d) === _chart.filter();
                });
        }
        return _chart;
    };

    function renderOptions () {
        var options = _cbox
        .selectAll('li.' + ITEM_CSS_CLASS)
            .data(_chart.data(), function (d) {
            return _chart.keyAccessor()(d);
        });

        options.exit().remove();

        options = options.enter()
                .append('li')
                .classed(ITEM_CSS_CLASS, true)
            .merge(options);

        options
            .append('input')
            .attr('type', _inputType)
            .attr('value', function (d) { return _chart.keyAccessor()(d); })
            .attr('name', 'domain_' + _randVal)
            .attr('id', function (d, i) {
                return 'input_' + _randVal + '_' + i;
            });
        options
            .append('label')
            .attr('for', function (d, i) {
                return 'input_' + _randVal + '_' + i;
            })
            .text(_chart.title());

        // 'all' option
        if (_multiple) {
            _cbox
            .append('li')
            .append('input')
            .attr('type', 'reset')
            .text(_promptText)
            .on('click', onChange);
        } else {
            var li = _cbox.append('li');
            li.append('input')
                .attr('type', _inputType)
                .attr('value', _promptValue)
                .attr('name', 'domain_' + _randVal)
                .attr('id', function (d, i) {
                    return 'input_' + _randVal + '_all';
                })
                .property('checked', true);
            li.append('label')
                .attr('for', function (d, i) {
                    return 'input_' + _randVal + '_all';
                })
                .text(_promptText);
        }

        _cbox
            .selectAll('li.' + ITEM_CSS_CLASS)
            .sort(_order);

        _cbox.on('change', onChange);
        return options;
    }

    function onChange (d, i) {
        var values,
            target = d3.select(d3.event.target),
            options;

        if (!target.datum()) {
            values = _promptValue || null;
        } else {
            options = d3.select(this).selectAll('input')
            .filter(function (o) {
                if (o) {
                    return this.checked;
                }
            });
            values = options.nodes().map(function (option) {
                return option.value;
            });
            // check if only prompt option is selected
            if (!_multiple && values.length === 1) {
                values = values[0];
            }
        }
        _chart.onChange(values);
    }

    _chart.onChange = function (val) {
        if (val && _multiple) {
            _chart.replaceFilter([val]);
        } else if (val) {
            _chart.replaceFilter(val);
        } else {
            _chart.filterAll();
        }
        dc.events.trigger(function () {
            _chart.redrawGroup();
        });
    };

    /**
     * Get or set the function that controls the ordering of option tags in the
     * cbox menu. By default options are ordered by the group key in ascending
     * order.
     * @name order
     * @memberof dc.cboxMenu
     * @instance
     * @param {Function} [order]
     * @example
     * // order by the group's value
     * chart.order(function (a,b) {
     *     return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
     * });
     **/
    _chart.order = function (order) {
        if (!arguments.length) {
            return _order;
        }
        _order = order;
        return _chart;
    };

    /**
     * Get or set the text displayed in the options used to prompt selection.
     * @name promptText
     * @memberof dc.cboxMenu
     * @instance
     * @param {String} [promptText='Select all']
     * @example
     * chart.promptText('All states');
     **/
    _chart.promptText = function (_) {
        if (!arguments.length) {
            return _promptText;
        }
        _promptText = _;
        return _chart;
    };

    /**
     * Get or set the function that filters options prior to display. By default options
     * with a value of < 1 are not displayed.
     * @name filterDisplayed
     * @memberof dc.cboxMenu
     * @instance
     * @param {function} [filterDisplayed]
     * @example
     * // display all options override the `filterDisplayed` function:
     * chart.filterDisplayed(function () {
     *     return true;
     * });
     **/
    _chart.filterDisplayed = function (filterDisplayed) {
        if (!arguments.length) {
            return _filterDisplayed;
        }
        _filterDisplayed = filterDisplayed;
        return _chart;
    };

    /**
     * Controls the type of input element. Setting it to true converts
     * the HTML `input` tags from radio buttons to checkboxes.
     * @name multiple
     * @memberof dc.cboxMenu
     * @instance
     * @param {boolean} [multiple=false]
     * @example
     * chart.multiple(true);
     **/
    _chart.multiple = function (multiple) {
        if (!arguments.length) {
            return _multiple;
        }
        _multiple = multiple;
        if (_multiple) {
            _inputType = 'checkbox';
        } else {
            _inputType = 'radio';
        }
        return _chart;
    };

    /**
     * Controls the default value to be used for
     * [dimension.filter](https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension_filter)
     * when only the prompt value is selected. If `null` (the default), no filtering will occur when
     * just the prompt is selected.
     * @name promptValue
     * @memberof dc.cboxMenu
     * @instance
     * @param {?*} [promptValue=null]
     **/
    _chart.promptValue = function (promptValue) {
        if (!arguments.length) {
            return _promptValue;
        }
        _promptValue = promptValue;

        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

// Renamed functions

dc.abstractBubbleChart = dc.bubbleMixin;
dc.baseChart = dc.baseMixin;
dc.capped = dc.capMixin;
dc.colorChart = dc.colorMixin;
dc.coordinateGridChart = dc.coordinateGridMixin;
dc.marginable = dc.marginMixin;
dc.stackableChart = dc.stackMixin;

// Expose d3 and crossfilter, so that clients in browserify
// case can obtain them if they need them.
dc.d3 = d3;
dc.crossfilter = crossfilter;

return dc;}
    if(typeof define === "function" && define.amd) {
        define(["d3", "crossfilter2"], _dc);
    } else if(typeof module === "object" && module.exports) {
        var _d3 = require('d3');
        var _crossfilter = require('crossfilter2');
        // When using npm + browserify, 'crossfilter' is a function,
        // since package.json specifies index.js as main function, and it
        // does special handling. When using bower + browserify,
        // there's no main in bower.json (in fact, there's no bower.json),
        // so we need to fix it.
        if (typeof _crossfilter !== "function") {
            _crossfilter = _crossfilter.crossfilter;
        }
        module.exports = _dc(_d3, _crossfilter);
    } else {
        this.dc = _dc(d3, crossfilter);
    }
}
)();

//# sourceMappingURL=dc.js.map