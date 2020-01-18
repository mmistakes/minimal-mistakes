/*!
 *  dc.leaflet 0.4.0
 *  http://dc-js.github.io/dc.leaflet.js/
 *  Copyright 2014-2015 Boyan Yurukov and the dc.leaflet Developers
 *  https://github.com/dc-js/dc.leaflet.js/blob/master/AUTHORS
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
(function() { function _dc_leaflet(dc) {
'use strict';

var dc_leaflet = {
    version: '0.4.0'
};

dc_leaflet.leafletBase = function(_chart) {
    _chart = dc.marginMixin(dc.baseChart(_chart));

    _chart.margins({left:0, top:0, right:0, bottom:0});

    var _map;

    var _mapOptions=false;
    var _mapStyle = null;
    var _defaultCenter=false;
    var _defaultZoom=false;

    var _cachedHandlers = {};

    var _createLeaflet = function(root) {
        // append sub-div if not there, to allow client to put stuff (reset link etc.)
        // in main div. might also use relative positioning here, for now assume
        // appending will put in right position
        var child_div = root.selectAll('div.dc-leaflet');
        child_div = child_div.data([0]).enter()
            .append('div').attr('class', 'dc-leaflet')
            .style('width', _chart.effectiveWidth() + "px")
            .style('height', _chart.effectiveHeight() + "px")
            .merge(child_div);
        return new google.maps.Map(child_div.node(), {
            zoom: 2,
            center: _chart.center(),
            styles: _mapStyle
        });
    };

    _chart.createLeaflet = function(_) {
        if(!arguments.length) {
            return _createLeaflet;
        }
        _createLeaflet = _;
        return _chart;
    };

    _chart._doRender = function() {
        if(! _chart.map()){
            _map = _createLeaflet(_chart.root());
            for(var ev in _cachedHandlers)
                _map.addListener(ev, _cachedHandlers[ev]);

            if (_defaultCenter && _defaultZoom) {
                _map.setCenter(_defaultCenter);
                _map.setZoom(_defaultZoom);
            }

            _chart._postRender();
        }
        else
            console.warn("WARNING: Leaflet map already rendered.");

        return _chart._doRedraw();
    };

    _chart._doRedraw = function() {
        return _chart;
    };

    _chart._postRender = function() {
        return _chart;
    };

    _chart.mapOptions = function(_) {
        if (!arguments.length) {
            return _mapOptions;
        }
        _mapOptions = _;
        return _chart;
    };

    _chart.mapStyle = function(_) {
        if (!arguments.length) {
            return _mapStyle;
        }
        _mapStyle = _;
        return _chart;
    };

    _chart.center = function(value) {
        if (!arguments.length) {
            return _defaultCenter;
        }
        _defaultCenter = new google.maps.LatLng(value[0], value[1]);
        return _chart;
    };

    _chart.zoom = function(_) {
        if (!arguments.length) {
            return _defaultZoom;
        }
        _defaultZoom = _;
        return _chart;
    };

    _chart.map = function() {
        return _map;
    };

    _chart.toLatLng = function(value) {
        if (typeof value === "string") {
            // expects '11.111,1.111'
            value = value.split(",");
        }
        // else expects [11.111,1.111]
        return new google.maps.LatLng(value[0], value[1]);
    };

    // combine Leaflet events into d3 & dc events
    dc.override(_chart, 'on', function(event, callback) {
        var leaflet_events = ['zoomend', 'moveend'];
        if(leaflet_events.indexOf(event) >= 0) {
            if(_map) {
                _map.addListener(event, callback);
            }
            else {
                _cachedHandlers[event] = callback;
            }
            return this;
        }
        else return _chart._on(event, callback);
    });

    return _chart;
};


dc_leaflet.markerChart = function(parent, chartGroup) {
    var _chart = dc_leaflet.leafletBase({});

    var _renderPopup = true;
    var _cluster = false; // requires leaflet.markerCluster
    var _clusterOptions=false;
    var _rebuildMarkers = false;
    var _brushOn = true;
    var _filterByArea = false;

    var _filter;
    var _innerFilter=false;
    var _zooming=false;
    var _layerGroup = false;
    var _markerList = [];
    var _currentGroups=false;
    var _infowindow = null;

    _chart.renderTitle(true);

    var _location = function(d) {
        return _chart.keyAccessor()(d);
    };

    var _marker = function(d, map) {
        var marker = new google.maps.Marker({
            position: _chart.toLatLng(d.key),
            map: map,
            title: _chart.renderTitle() ? _chart.title()(d) : '',
            id: Math.floor(Math.random() * (100))
        });
        var items = _chart.dimension().top(Infinity).filter(x => _chart.toLatLng(d.key).equals(_chart.toLatLng(x.point)))
        var content = '';
        items.forEach(function(item) {
            content += `
            region: <strong>${item.region}</strong><br>
            regionType: <strong>${item.regionType}</strong><br>
            provider: <strong>${item.provider}</strong><br>
            city: <strong>${item.city}</strong><br>
            country: <strong>${item.country}</strong><br>
            website: <a href="${item.website}" target="_blank"><strong>${item.website}</strong></a><br>
            point: <strong>${item.point}</strong><br>
            id: <strong>${item.id}</strong><br>
            <br>
            <br>
            `
        })
        marker.addListener('click', function(e) {

            _infowindow.setContent(content);
            _infowindow.open(map, this);
            e.stopPropagation();
          });
        return marker;
    };


    var _popup = function(d, marker) {
        return _chart.title()(d);
    };

    _chart._postRender = function() {
        if (_chart.brushOn()) {
            if (_filterByArea) {
                _chart.filterHandler(doFilterByArea);
            }
            _infowindow = new google.maps.InfoWindow()
            _chart.map().addListener('zoom_changed', zoomFilter);
            _chart.map().addListener('mouseup', zoomFilter);
        }
    };

    _chart._doRedraw = function() {
        var groups = _chart._computeOrderedGroups(_chart.data()).filter(function (d) {
            return _chart.valueAccessor()(d) !== 0;
        });

        _markerList.forEach(function(marker) {
            marker.setMap(null)
        })
        _markerList = []

        groups.forEach(function(v, i) {
            var key = _chart.keyAccessor()(v);
            var marker = createmarker(v, key);
            _markerList.push(marker);
        });
    };

    _chart.locationAccessor = function(_) {
        if (!arguments.length) {
            return _location;
        }
        _location= _;
        return _chart;
    };

    _chart.marker = function(_) {
        if (!arguments.length) {
            return _marker;
        }
        _marker= _;
        return _chart;
    };

    _chart.popup = function(_) {
        if (!arguments.length) {
            return _popup;
        }
        _popup= _;
        return _chart;
    };

    _chart.brushOn = function(_) {
        if (!arguments.length) {
            return _brushOn;
        }
        _brushOn = _;
        return _chart;
    };

    _chart.renderPopup = function(_) {
        if (!arguments.length) {
            return _renderPopup;
        }
        _renderPopup = _;
        return _chart;
    };


    _chart.filterByArea = function(_) {
        if (!arguments.length) {
            return _filterByArea;
        }
        _filterByArea = _;
        return _chart;
    };

    _chart.markerList = function() {
        return _markerList;
    };

    var createmarker = function(v, k) {
        var marker = _marker(v, _chart.map());
        return marker;
    };


    var zoomFilter = function() {

        if (_filterByArea) {
            var filter;
            if (_chart.map().getCenter().equals(_chart.center()) && _chart.map().getZoom() === _chart.zoom()) {
                filter = null;
            }
            else {
                filter = _chart.map().getBounds();
            }
            dc.events.trigger(function () {
                _chart.filter(null);
                if (filter) {
                    _innerFilter=true;
                    _chart.filter(filter);
                    _innerFilter=false;
                }
                dc.redrawAll(_chart.chartGroup());
            });
        }
    };

    var doFilterByArea = function(dimension, filters) {
        _chart.dimension().filter(null);
        if (filters && filters.length>0) {
            _chart.dimension().filterFunction(function(d) {         
                return filters[0].contains(_chart.toLatLng(d));
            });
            if (!_innerFilter && _chart.map().getBounds().toString !== filters[0].toString()) {
                _chart.map().fitBounds(filters[0]);
            }
        }
    };

    return _chart.anchor(parent, chartGroup);
};


dc_leaflet.d3 = d3;
dc_leaflet.crossfilter = crossfilter;
dc_leaflet.dc = dc;

return dc_leaflet;
}
    if (typeof define === 'function' && define.amd) {
        define(["dc"], _dc_leaflet);
    } else if (typeof module == "object" && module.exports) {
        var _dc = require('dc');
        module.exports = _dc_leaflet(_dc);
    } else {
        this.dc_leaflet = _dc_leaflet(dc);
    }
}
)();
