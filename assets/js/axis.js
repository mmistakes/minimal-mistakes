/**
 * Separate axis implementation.
 *
 * Examples:
 * - {@link https://bl.ocks.org/ialarmedalien/0a4bf25ffc0fb96ae569a20f91957bc1 eslint on dc.js source}
 * @class axisChart
 * @memberof dc
 * @mixes dc.capMixin
 * @mixes dc.marginMixin
 * @mixes dc.baseMixin
 * @example
 * // create an axis under #chart-container1 element using the default global chart group
 * var chart1 = dc.axisChart('#chart-container1');
 * // create an axis under #chart-container2 element using chart group A
 * var chart2 = dc.axisChart('#chart-container2', 'chartGroupA');
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.axisChart} a dc axis chart
 */
dc.axisChart = function (parent, chartGroup) {

    var _g;

    var _chart = dc.capMixin(dc.marginMixin(dc.baseMixin({})));

    var _scale;

    var _elastic;

    var _type;

    var _theAxis = d3.axisBottom();

    var _axisData;

    var validAxisTypes = [ 'axisBottom', 'axisTop', 'axisLeft', 'axisRight' ];

    _chart.axisCap = _chart.cap;

    function calculateAxisScale () {
        if (!_scale || _elastic) {
            var extent = d3.extent(_axisData, _chart.cappedValueAccessor);
            if (extent[0] > 0) {
                extent[0] = 0;
            }
            if (extent[1] < 0) {
                extent[1] = 0;
            }
            _scale = d3.scaleLinear().domain(extent)
                .range([0, _chart.effectiveWidth()]);
        }
        _theAxis.scale(_scale);
    }

    function drawAxis () {
        var axisG = _g.select('g.axis');

        calculateAxisScale();

        if (axisG.empty()) {
            axisG = _g.append('g').attr('class', 'axis');
        }

        dc.transition(axisG, _chart.transitionDuration(), _chart.transitionDelay())
            .call(_theAxis);
    }

    _chart._doRender = function () {
        _chart.resetSvg();

        _g = _chart.svg()
            .append('g')
            .attr('transform', 'translate(' + _chart.margins().left + ',' + _chart.margins().top + ')');

        drawChart();

        return _chart;
    };

    /**
     * Gets or sets the axis type. The axis type can be any valid
     * {@link https://github.com/d3/d3-axis d3 axis}. The default is
     * axisBottom (a bottom axis).
     * @method type
     * @memberof dc.axisChart
     * @instance
     * @see {@link https://github.com/d3/d3-axis d3 axis}
     * @param {d3.type} [type]
     * @returns {string|dc.axisChart} no args: type string; args: axis chart
     */

    _chart.type = function (type) {
        if (!arguments.length) {
            return _type;
        }
        // set the axis type here
        if ( validAxisTypes.indexOf( type ) !== -1 ) {
            _theAxis = d3[ type ]();
            _type = type;
        }
        else {
            console.error( type + ' is not a valid d3 axis type');
        }

        return _chart;
    };

    /**
     * Gets or sets the axis scale. The axis scale can be any d3
     * {@link https://github.com/d3/d3-scale quantitive scale}.
     * @method scale
     * @memberof dc.axisChart
     * @instance
     * @see {@link https://github.com/d3/d3-scale quantitive scale}
     * @param {d3.scale} [scale] any value d3 scale
     * @returns {d3.scale|dc.axisChart} no args: chart scale; args: axis chart
     */
    _chart.scale = function (scale) {
        if (!arguments.length) {
            return _scale;
        }
        _scale = scale;
        return _chart;
    };

    /**
     * Get or set the elasticity on the axis. If this attribute is set to true,
     * then the axis will rescale to auto-fit the data range when filtered.
     * @method elastic
     * @memberof dc.axisChart
     * @instance
     * @param {Boolean} [elastic] any valid boolean
     * @returns {Boolean|dc.axisChart} no args: boolean; args: axis chart
     */
    _chart.elastic = function (elastic) {
        if (!arguments.length) {
            return _elastic;
        }
        _elastic = elastic;
        return _chart;
    };

    /**
     * Get the axis for the axis chart instance.
     * See the {@link https://github.com/d3/d3-axis d3 axis object}
     * documention for more information.
     * @method axis
     * @memberof dc.axisChart
     * @instance
     * @see {@link https://github.com/d3/d3-axis d3.axis}
     * @example
     * // customize axis tick format
     * chart.axis().tickFormat(function (v) {return v + '%';});
     * // customize axis tick values
     * chart.axis().tickValues([0, 100, 200, 300]);
     * @returns {d3.axis} d3 axis
     */
    _chart.axis = function () {
        return _theAxis;
    };

    function drawChart () {
        _axisData = _chart.data();
        drawAxis();
    }

    _chart._doRedraw = function () {
        drawChart();
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};