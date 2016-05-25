// Skills stats for profile page

(function(c, e, l, j) {
    var d = function(a, b) {
        arguments.length && this.init(a, b);
    };
    d.CANVAS_NAMES = [ "back", "fill", "front" ];
    var i = d, f;
    f = l.createElement("canvas");
    f.getContext ? (f = f.getContext("2d"), f = (e.devicePixelRatio || 1) / (f.webkitBackingStorePixelRatio || f.mozBackingStorePixelRatio || f.msBackingStorePixelRatio || f.oBackingStorePixelRatio || f.backingStorePixelRatio || 1)) : f = 1;
    i.PIXEL_RATIO = f;
    i = [ "ms", "moz", "webkit", "o" ];
    for (f = 0; f < i.length && !e.requestAnimationFrame; f++) e.requestAnimationFrame = e[i[f] + "RequestAnimationFrame"], e.cancelAnimationFrame = e[i[f] + "CancelAnimationFrame"] || e[i[f] + "CancelRequestAnimationFrame"];
    e.requestAnimationFrame || (e.requestAnimationFrame = function(a) {
        return e.setTimeout(function() {
            a();
        }, 16);
    });
    e.cancelAnimationFrame || (e.cancelAnimationFrame = function(a) {
        clearTimeout(a);
    });
    var q = function(a) {
        arguments.length && this.init(a);
    };
    q.prototype = {
        attributes: {
            onLoop: null,
            afterStop: null,
            afterStopRequest: null,
            params: {},
            owner: null
        },
        init: function(a) {
            this.options = c.extend({}, this.attributes, a);
            this.animationHandle = null;
            this.loops = 0;
            this.stopRequested = !1;
        },
        start: function() {
            var a = this;
            this.animationHandle = e.requestAnimationFrame(function() {
                a.options.onLoop.apply(a.options.owner, [ a._getThreadInfo() ]) && a._loop();
            });
        },
        _getThreadInfo: function() {
            return {
                loops: ++this.loops,
                params: this.options.params,
                stopRequested: this.stopped
            };
        },
        _kill: function() {
            this.animationHandle && e.cancelAnimationFrame(this.animationHandle);
            c.isFunction(this.options.afterStop) && this.options.afterStop.call(this.options.owner);
            c.isFunction(this.options.afterStopRequest) && this.options.afterStopRequest.call(this.options.owner);
        },
        _loop: function() {
            var a = this;
            this.animationHandle = e.requestAnimationFrame(function() {
                a.options.onLoop.apply(a.options.owner, [ a._getThreadInfo() ]) ? a._loop() : a._kill();
            });
        },
        stop: function(a) {
            this.stopped = !0;
            this.options.afterStopRequest = a;
        }
    };
    d.prototype = {
        defaults: {
            initialValue: 0,
            maxValue: 100,
            label: "",

            labelClassName: "text-label",
            title: "",

            titleClassName: "text-title",
            dates: "",
            datesClassName: "text-dates",

            percent: !1,
            decimals: 0,
            digitClassName: "digit-label",
            format: null,
            duration: 4e3,
            fillColor: "#eeeeee",
            wrapperClassName: "circular-stat",
            outerThickness: 8,
            fillThickness: 10
        },
        init: function(a, b) {
            this.element = c(a);
            this.options = c.extend({}, this.defaults, b, this.element.data());
            this.attributes = {};
            this.labels = {};
            this.canvases = {};
            this.activeAnimationThread = null;
            this._parseOptions();
            if (this.canvases = this._build()) this._drawBackside(this.canvases.back), this._drawFrontside(this.canvases.front), this.labels = this._attachLabels(), this._updateVal(0), this.animate(this.options.initialValue, !1);
            return this;
        },
        _parseOptions: function() {
            var a = Math.max(this.element.width(), this.element.height()) / 2, b = this.options.outerThickness;
            this.attributes = c.extend({}, this.attributes, {
                currentValue: 0,
                radius: {
                    back: a,
                    fill: a - b,
                    front: a - b - this.options.fillThickness
                }
            });
        },
        _createCanvas: function(a, b) {
            if (0 === a || 0 === b) return console.log("Invalid canvas dimensions"), !1;
            var g = l.createElement("canvas");
            g.width = a * d.PIXEL_RATIO;
            g.height = b * d.PIXEL_RATIO;
            1 < d.PIXEL_RATIO && (g.style.width = a + "px", g.style.height = b + "px");
            if (!g.getContext) if ("undefined" !== typeof G_vmlCanvasManager) G_vmlCanvasManager.initElement(g); else return console.log("Your browser does not support HTML5 Canvas, or excanvas is missing on IE"), !1;
            return g;
        },
        _attachLabels: function() {
            var a = c("<span></span>").addClass(this.options.digitClassName), b = c("<span></span>").addClass(this.options.labelClassName).text(this.options.label),  z = c("<span></span>").addClass(this.options.titleClassName).text(this.options.title), y = c("<span></span>").addClass(this.options.datesClassName).text(this.options.dates);;

            this.element.append([ a, b, z, y ]);
            return {
                digit: a,
                text: b,
                text: z,
                text: y
            };
        },
        _build: function() {
            for (var a = {}, b, g = 2 * this.attributes.radius.back, m = 0; m < d.CANVAS_NAMES.length; ++m) {
                if (!(b = this._createCanvas(g, g))) return !1;
                b.style.position = "absolute";
                b.style.top = 0;
                b.style.left = 0;
                b.className = d.CANVAS_NAMES[m];
                a[d.CANVAS_NAMES[m]] = b;
            }
            this.element.addClass(this.options.wrapperClassName).append(c.map(a, function(a) {
                return a;
            }));
            return a;
        },
        _drawBackside: function(a) {
            var b = this.attributes.radius.back, g = this.attributes.radius.fill, a = a.getContext("2d"), c = a.createLinearGradient(0, 0, 0, 2 * b);
            c.addColorStop(0, "#d5d5d5");
            c.addColorStop(1, "#ffffff");
            1 < d.PIXEL_RATIO && a.scale(d.PIXEL_RATIO, d.PIXEL_RATIO);
            this._drawCircle(a, b, b, b);
            a.fillStyle = c;
            a.fill();
            this._drawCircle(a, b, b, g);
            a.fillStyle = "#eeeeee";
            a.fill();
        },
        _drawFrontside: function(a) {
            var b = this.attributes.radius.back, c = this.attributes.radius.front, a = a.getContext("2d");
            1 < d.PIXEL_RATIO && a.scale(d.PIXEL_RATIO, d.PIXEL_RATIO);
            this._drawCircle(a, b, b, c);
            a.shadowColor = "rgba(0, 0, 0, 0.3)";
            a.shadowBlur = 3;
            a.shadowOffsetY = 1;
            a.fillStyle = "#ffffff";
            a.fill();
        },
        _drawCircle: function(a, b, c, d) {
            a.beginPath();
            a.arc(b, c, d, 0, 2 * Math.PI, !1);
            a.closePath();
        },
        _updateVal: function(a, b, d) {
            c.isNumeric(a) && c.isNumeric(b) && c.isNumeric(d) ? (d = (d - b) * a, a = Math.max(0, Math.min(b + 100 * d / this.options.maxValue, 100)), b = Math.max(0, Math.min(b + d, this.options.maxValue))) : (a = Math.min(this.attributes.currentValue / this.options.maxValue, 100), b = Math.min(this.attributes.currentValue, this.options.maxValue));
            this.labels.digit[0].innerHTML = (c.isFunction(this.options.format) ? this.options.format : function(a, b, c) {
                return this.options.percent ? a.toFixed(this.options.decimals) + "%" : b.toFixed(this.options.decimals) + "/" + c.toFixed(this.options.decimals);
            }).apply(this, [ a, b, this.options.maxValue ]);
        },
        _redraw: function() {
            var a = this.canvases.fill, b = a.getContext("2d"), c = this.attributes.radius.back, f = this.attributes.radius.fill, e = 2 * (this.attributes.currentValue / this.options.maxValue) * Math.PI;
            b.fillStyle = this.options.fillColor;
            b.clearRect(0, 0, a.width, a.height);
            0 !== e && (b.save(), 1 < d.PIXEL_RATIO && b.scale(d.PIXEL_RATIO, d.PIXEL_RATIO), b.translate(c, c), b.rotate(-Math.PI / 2), b.beginPath(), b.arc(0, 0, f, 0, e, !1), b.lineTo(0, 0), b.closePath(), b.fill(), b.restore());
            this._updateVal();
        },
        animate: function(a, b) {
            function f(b) {
                1 === b.loops && (j = (new Date).getTime(), r = 2 * (a / this.options.maxValue) * Math.PI, p = 2 * (this.attributes.currentValue / this.options.maxValue) * Math.PI);
                var c = Math.min(((new Date).getTime() - j) / this.options.duration, 1), e = p + (r - p) * c;
                h.clearRect(0, 0, n.width, n.height);
                0 !== e && (h.save(), 1 < d.PIXEL_RATIO && h.scale(d.PIXEL_RATIO, d.PIXEL_RATIO), h.translate(i, i), h.rotate(-Math.PI / 2), h.beginPath(), h.arc(0, 0, l, 0, e, !1), h.lineTo(0, 0), h.closePath(), h.fill(), h.restore());
                k._updateVal(c, k.attributes.currentValue, a);
                return b.stopRequested || 1 <= c ? (k.attributes.currentValue += (a - k.attributes.currentValue) * c, !1) : !0;
            }
            function e(a) {
                c(this).queue("circular", function(a) {
                    (this.activeAnimationThread = new q({
                        onLoop: function() {
                            return f.apply(this, arguments);
                        },
                        afterStop: function() {
                            a();
                            0 === c(this).queue("circular").length && (this.activeAnimationThread = null);
                        },
                        owner: this
                    })).start();
                });
                a && c(this).dequeue("circular");
            }
            if (c.isNumeric(a) && !(0 > a || a > this.options.maxValue)) {
                var k = this, n = this.canvases.fill, h = n.getContext("2d"), i = this.attributes.radius.back, l = this.attributes.radius.fill, j, r, p;
                h.fillStyle = this.options.fillColor;
                !b && this.activeAnimationThread ? (c(this).clearQueue("circular"), this.activeAnimationThread.stop(function() {
                    e.apply(this, [ !0 ]);
                })) : e.apply(this, [ !this.activeAnimationThread ]);
            }
        },
        option: function(a, b) {
            if (0 === arguments.length) return c.extend({}, this.options);
            if ("string" === typeof a) {
                if (b === j) return this.options[a];
                switch (a) {
                  case "label":
                    this.options[a] = b;
                    this.labels.text.html(b);
                    break;
                  case "maxValue":
                    this.options.percent || (this.attributes.currentValue = Math.max(Math.min(this.attributes.currentValue, b), 0), this.options[a] = b, this._redraw());
                    break;
                  case "percent":
                    b && (this.options.maxValue = 100, this.attributes.currentValue = Math.max(Math.min(this.attributes.currentValue, 100), 0));
                  case "format":
                  case "decimals":
                  case "fillColor":
                  case "duration":
                    this.options[a] = b, this._redraw();
                }
            }
            return this;
        }
    };
    d.defaults = d.prototype.defaults;
    c.fn.CircularStat = function(a) {
        var b = "string" === typeof a, e = Array.prototype.slice.call(arguments, 1), f = this;
        if (b && "_" === a.charAt(0)) return f;
        b ? this.each(function() {
            var b = c.data(this, "circular-stat"), d = b && c.isFunction(b[a]) ? b[a].apply(b, e) : b;
            if (d !== b && d !== j) return f = d, !1;
        }) : this.each(function() {
            c.data(this, "circular-stat") || c.data(this, "circular-stat", new d(this, a));
        });
        return f;
    };
    c(function() {
        c('[data-provide="circular"]').each(function() {
            var a = c(this);
            a.CircularStat(a.data());
        });
    });
})(jQuery, window, document);
