HTMLWidgets.widget(
{
  name: "scatterplotThree",
  type: "output",

  initialize: function(el, width, height)
  {
    var w = parseInt(width);
    var h = parseInt(height);
    var g = new Widget.scatter(w, h);
    if(w == 0) w = 1; // set minimum object size
    if(h == 0) h = 1;
    return {widget: g, width: parseInt(width), height: parseInt(height)};
  },

  resize: function(el, width, height, obj)
  {
    obj.width = width;
    obj.height = height;
    obj.widget.camera.aspect = obj.width / obj.height;
    obj.widget.camera.updateProjectionMatrix();
    obj.widget.renderer.setSize(obj.width, obj.height);
    obj.widget.animate();
  },

  renderValue: function(el, x, obj)
  {
    obj.widget.init(el, obj.widget.init_width, obj.widget.init_height); // init here, see issue #52
    obj.widget.create_plot(x); // see below
    obj.widget.renderer.setSize(obj.width, obj.height);
    obj.widget.animate();
  }
})


/* Define a scatter object with methods
 * init(el, width, height)   create the widget
 * create_plot(options)      set up the plot options
 * animate()                 internal threejs animation function
 * render()                  internal threejs draw function
 * update()                  internal vertex update function
 * draw_lines()              internal buffered lines creation function
 * ...  other miscellaneous internal functions
 *
 * The htmlwidgets interface resides in the init() function.
 * The user plot interface is in create_plot() with options JavaScript array:
 * [vertices]  an array of vectors, each vector length a multiple of 3 (flattened out coordinates by xyz triples (byrow))
 *             when vertices.length = 1 no animation, otherwise vertices.length = number of scenes
 * [color]     optional array of colors, one for each scene. each element can be scalar or vector
 * [alpha]     optional array of alphas, one for each scene. each element either scalar or vector
 * [from]      optional array of line from vertex ids, one for each scene, optionally of length 1 for no line animation
 * [to]        optional array of line to vertex ids, one for each scene, optionally of length 1 for no line animation
 * [lcol]      optional array of line colors
 * [main]      optional array of title text
 * fpl         interpolated frames per scene (per layout)
 * size        vector of vertex sizes
 * lwd         scalar line width applies to all edges/lines
 * linealpha   scalar line transparence applies to all lines
 * pch         scalar or vector of vertex symbols
 * labels      vector of vertex labels (mouse over)
 * axis        true/false show axis
 * center      true/false center plot
 * bg          scalar background color
 * flipy       true/false flip y axis
 * grid        true/false show grid
 * numticks
 * renderer    either "auto" or "canvas"
 * stroke      only canvas
 * xlim
 * xtick
 * xticklab
 * ylim
 * ytick
 * yticklab
 * zlim
 * ztick
 * zticklab
 * axislength  length of each axis (float[3])
 * top         optional infobox top position (int)
 * left        optional infobox left position (int)
 * fontmain    optional infobox css font
 * cexsymbols  optional pch scale size (float)
 * fontsymbols  optional pch css font specification
 * cexaxis      optional axis scale size (float)
 * fontaxis    optional axis css font
 */
var Widget = Widget || {};
Widget.scatter = function(w, h)
{
  this.idle = true;
  this.frame = -1;   // current animation frame
  this.scene = 0;    // current animation scene
  this.init_width = w;
  this.init_height = h;

  var ct_sel = new crosstalk.SelectionHandle();
  var ct_filter = new crosstalk.FilterHandle();

  var scene;
  var _this = this;

  _this.init = function (el, width, height)
  {
    if(Detector.webgl)
    {
      _this.renderer = new THREE.WebGLRenderer({alpha: true});
      _this.renderer.GL = true;
    } else {
      _this.renderer = new THREE.CanvasRenderer();
      _this.renderer.GL = false;
    }
    _this.frame = -1;   //  reset animation too,
    _this.scene = 0;    //  see issue #58
    _this.renderer.sortObjects = false;
    _this.renderer.autoClearColor = false;
    _this.renderer.setSize(width, height);
    _this.el = el; // stash a reference to our container for posterity
    _this.width = width;
    _this.height = height;

    // Info box for mouse-over labels and generic text
    var info = document.createElement("div");
    info.style.textAlign = "center";
    info.style.zIndex = 100;
    info.style.fontFamily = "Sans";
    info.style.fontSize = "x-large";
    _this.infobox = info;
    _this.fgcss = "#000000";     // default foreground css color
    _this.main = "";             // default text in infobox
    _this.mousethreshold = 0.02; // default mouse over id threshold

    if(height > 0) _this.camera = new THREE.PerspectiveCamera(40, width / height, 1e-5, 100);
    else _this.camera = new THREE.PerspectiveCamera(40, 1, 1e-5, 100);

    _this.camera.position.z = 2.0;
    _this.camera.position.x = 2.5;
    _this.camera.position.y = 1.2;

    _this.controls = new THREE.TrackballControls(_this.camera, el);
    _this.controls.rotateSpeed = 4.6;
    _this.controls.zoomSpeed = 1.5;
    _this.controls.panSpeed = 0.8;
    _this.controls.dynamicDampingFactor = 0.2;
    _this.controls.addEventListener('change', render);

    scene = new THREE.Scene();
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
    el.appendChild(_this.renderer.domElement);
    info.style.position = "relative";
    info.style.top = "-" + el.getBoundingClientRect().height + "px";
    info.style.left = "0px";
    el.appendChild(info);

// subscribe to custom shown event (fired by ioslides to trigger
// shiny reactivity but we can use it as well). this is necessary
// because if a widget starts out as display:none it has height
// and width == 0 and this doesn't change when it becomes visible
    if (typeof jQuery != 'undefined')
    {
      $(el).closest('slide').on('shown', function() {
        _this.width = _this.el.offsetWidth;
        _this.height = _this.el.offsetHeight;
        _this.camera.aspect = _this.width / _this.height;
        _this.camera.updateProjectionMatrix();
        _this.renderer.setSize(_this.width, _this.height);
        _this.controls.handleResize();
        _this.animate();
       });

       // ...and the same for reveal.js
       $(el).closest('section.slide').on('shown', function() {
        _this.width = _this.el.offsetWidth;
        _this.height = _this.el.offsetHeight;
        _this.camera.aspect = _this.width / _this.height;
        _this.camera.updateProjectionMatrix();
        _this.renderer.setSize(_this.width, _this.height);
        _this.controls.handleResize();
        _this.animate();
       });

      // ...and the same for bootstrap tabs
      $('.nav-tabs a').on('shown.bs.tab', function(event){
        if (event.target.hash == '#'+$(el).closest('.tab-pane')[0].id) {
          _this.width = _this.el.offsetWidth;
          _this.height = _this.el.offsetHeight;
          _this.camera.aspect = _this.width / _this.height;
          _this.camera.updateProjectionMatrix();
          _this.renderer.setSize(_this.width, _this.height);
          _this.controls.handleResize();
          _this.animate();
        }
       });
    }

    el.onmousemove = function(ev)
    {
      if(ev.preventDefault) ev.preventDefault();
      var mouse = new THREE.Vector2();
      var raycaster = new THREE.Raycaster();
      raycaster.params.Points.threshold = _this.mousethreshold;
      var canvasRect = this.getBoundingClientRect();
      mouse.x = 2 * (ev.clientX - canvasRect.left) / canvasRect.width - 1;
      mouse.y = -2 * (ev.clientY - canvasRect.top) / canvasRect.height + 1;
      raycaster.setFromCamera(mouse, _this.camera);
      var I = raycaster.intersectObject(_this.pointgroup, true);
      if(I && I.length > 0)
      {
        if(I[0].object.type == "Points")
        {
          /* discard vertices with tiny alpha */
          var idx = I.map(function(x) {
            return I[0].object.geometry.attributes.color.array[x.index * 4 + 3] > 0.1;
          }).indexOf(true);
//            return I[0].object.geometry.attributes.color.array[x.index * 4 + 3];
//          }).findIndex(function(v) {return(v > 0.1);});
          if(idx > -1 && I[idx].object.geometry.labels[I[idx].index].length > 0) printInfo(I[idx].object.geometry.labels[I[idx].index]);
        } else if(I[0].object.type == "Mesh")
        {
          if(I[0].object.label.length > 0) printInfo(I[0].object.label);
        }
      } else
      {
        printInfo(_this.main);
      }
      if(_this.idle)
      {
        _this.idle = false;
        _this.animate();
      }
    }

//  trigger vertex-specific animation sequence
    el.onclick = function(ev)
    {
      if(ev.preventDefault) ev.preventDefault();
      var mouse = new THREE.Vector2();
      var raycaster = new THREE.Raycaster();
      raycaster.params.Points.threshold = _this.mousethreshold;
      var canvasRect = this.getBoundingClientRect();
      mouse.x = 2 * (ev.clientX - canvasRect.left) / canvasRect.width - 1;
      mouse.y = -2 * (ev.clientY - canvasRect.top) / canvasRect.height + 1;
      raycaster.setFromCamera(mouse, _this.camera);
      var I = raycaster.intersectObject(_this.pointgroup, true);
      if(I.length > 0 && (I[0].object.type == "Points" || I[0].object.type == "Mesh"))
      {
        /* ignore vertices with tiny alpha */
        var idx, i;
        if(I[0].object.type == "Points")
        {
          idx = I.map(function(x) {
            return I[0].object.geometry.attributes.color.array[x.object.indices[x.index] * 4 + 3] > 0.1;
          }).indexOf(true);
          if(idx < 0) return;
          i = I[idx].object.indices[I[idx].index];
        } else
        {
          idx = I[0].object.index;
          i = idx;
        }
        _this.brush(i);
        if(!_this.options.click) return;
        if(!_this.options.click[i]) return;
        _this.frame = -1;  // suspend animation
        var N = _this.options.vertices.length - 1;
        if(_this.options.click[i].cumulative)
        { // add to current plot, otherwise simply replace coordinates
          // and make the alpha values sticky
          for(var j=0;j < _this.options.click[i].layout.length; j++)
          {
            _this.options.click[i].layout[j] = _this.options.click[i].layout[j] + _this.options.vertices[N][j];
            _this.options.click[i].alpha[j] = Math.min(1, _this.options.click[i].alpha[j] + _this.options.alpha[N][j]);
          }
        }
        // re-center
        var max_x = 0, min_x = 0, max_y = 0, min_y = 0, max_z = 0, min_z = 0;
        for(var j = 0;j < _this.options.click[i].layout.length / 3; j++)
        {
          max_x = Math.max(_this.options.click[i].layout[j * 3], max_x);
          min_x = Math.min(_this.options.click[i].layout[j * 3], min_x);
          max_z = Math.max(_this.options.click[i].layout[j * 3 + 1], max_z);
          min_z = Math.min(_this.options.click[i].layout[j * 3 + 1], min_z);
          max_y = Math.max(_this.options.click[i].layout[j * 3 + 2], max_y);
          min_y = Math.min(_this.options.click[i].layout[j * 3 + 2], min_y);
        }
        for(var j = 0;j < _this.options.click[i].layout.length / 3; j++)
        {
          if(max_x != min_x) _this.options.click[i].layout[j * 3] = 2 * ((_this.options.click[i].layout[j * 3] - min_x) / (max_x - min_x) - 0.5);
          if(max_z != min_z) _this.options.click[i].layout[j * 3 + 1] = 2 * ((_this.options.click[i].layout[j * 3 + 1] - min_z) / (max_z - min_z) - 0.5);
          if(max_y != min_y) _this.options.click[i].layout[j * 3 + 2] = 2 * ((_this.options.click[i].layout[j * 3 + 2] - min_y) / (max_y - min_y) - 0.5);
        }
        _this.options.vertices = [_this.options.vertices[N], _this.options.click[i].layout]; // new animation sequence
        _this.options.alpha = [_this.options.alpha[N], _this.options.click[i].alpha]; // new alphas
        _this.options.color = [_this.options.color[N], _this.options.click[i].color]; // new colors
        if(_this.options.click[i].from)
        {
          if(_this.options.from)
          {
            N = _this.options.from.length - 1;
            _this.options.from = [_this.options.from[N], _this.options.click[i].from]; // new lines
            _this.options.to = [_this.options.to[N], _this.options.click[i].to];
          } else
          {
            _this.options.from = [[], _this.options.click[i].from]; // new lines
            _this.options.to = [[], _this.options.click[i].to];
          }
        } else {
          if(_this.options.from)
          {
            N = _this.options.from.length - 1;
            _this.options.from = [_this.options.from[N]];
            _this.options.to = [_this.options.to[N]];
          } else
          {
            _this.options.from = [[]];   // avoid delete here for run time optimization
            _this.options.to = [[]];
          }
        }
        if(_this.options.click[i].lcol) _this.options.lcol = _this.options.click[i].lcol;
        _this.scene = 0; // reset animation
        _this.frame = 0; // start
        if(_this.idle)
        {
          _this.idle = false;
          _this.animate();
        }
      } else _this.brush(null);
    }
  };


/* Experimental scene animation transition function. Animate from the
 * current plot state to the new state in _this.options.defer[i].
 * TODO Adjust click animation to use this interface and consolidate code.
 */
  _this.transition = function(i)
  {
    if(!_this.options.defer) return;
    if(i >= _this.options.defer.vertices.length) return;
    _this.brush(null);
    var N = _this.options.vertices.length - 1;
    _this.options.vertices = [_this.options.vertices[N], _this.options.defer.vertices[i]]; // new animation sequence
    if(_this.options.defer.alpha.length > 1)
      _this.options.alpha = [_this.options.alpha[N], _this.options.defer.alpha[i]]; // new alpha sequence
    if(_this.options.defer.alpha.length > 1)
      _this.options.color = [_this.options.color[N], _this.options.defer.color[i]]; // new color sequence

    if(_this.options.defer.from && i < _this.options.defer.from.length)
    {
      if(_this.options.from)
      {
        N = _this.options.from.length - 1;
        _this.options.from = [_this.options.from[N], _this.options.defer.from[i]]; // new lines
        _this.options.to = [_this.options.to[N], _this.options.defer.to[i]];
      } else
      {
         _this.options.from = [[], _this.options.defer.from[i]]; // new lines
         _this.options.to = [[], _this.options.defer.to[i]];
      }
      _this.phase = _this.options.from[0].length > _this.options.from[1].length;
    } else
    {
      _this.phase = false;
      if(_this.options.from)
      {
        N = _this.options.from.length - 1;
        _this.options.from = [_this.options.from[N]];
        _this.options.to = [_this.options.to[N]];
      } else
      {
        _this.options.from = [[]];
        _this.options.to = [[]];
      }
    }
    if(_this.options.defer.lcol && i < _this.options.defer.lcol.length) 
      _this.options.lcol = _this.options.defer.lcol[i];
    if(_this.options.defer.main && Array.isArray(_this.options.defer.main) && i < _this.options.defer.main.length)
        {
          _this.options.main = [_this.main, _this.options.defer.main[i]];
        }
    _this.scene = 0; // reset animation
    _this.fps = 50;
    if(_this.options.deferfps) _this.fps = _this.options.deferfps;
    _this.frame = 0; // start
    if(_this.idle)
    {
      _this.idle = false;
      _this.animate();
    }
  };

// Use (abuse) filter handle to control animation frame
  ct_filter.on("change", function(e)
  {
    var i;
    if(Array.isArray(e.value) && e.value.length > 0) i = parseInt(e.value[0]);
    else i = parseInt(e.value);
    if(isNaN(i)) return;
    _this.transition(i);
  });

// The crosstalk select handle operates normally
  ct_sel.on("change", function(e)
  {
    if(e.sender === ct_sel) return;
    if(e.value.length == 0)
    {
      _this.brush(null);
      return;
    }
    // Map crosstalk keys (strings) to integer indices in the key vector
    _this.brush(e.value.map(function(i){return _this.options.crosstalk_key.indexOf(i)}));
  });

/* TODO clean this up; consolidate vertex and line color setting code
 * vertices a vector of int32 vertex ids or null to clear the brush
 */
  _this.brush = function(vertices)
  {
    if(!_this.options.brush) return;
    if(!vertices && !_this.brushed) return; // nothing to do
    if(!vertices) // reset brush and return
    {
      for(var j = 0; j < _this.pointgroup.children.length; j++)
      {
        if(_this.pointgroup.children[j].type == "Mesh") // spheres
        {
          k = _this.pointgroup.children[j].index; // the vertex id
          _this.pointgroup.children[j].material.color = _this.datacolor[k];
        } else if(_this.pointgroup.children[j].type == "Points") // buffered
        {
          var col;
          for(var i = 0; i < _this.pointgroup.children[j].geometry.attributes.position.array.length / 3; i++)
          {
            k = _this.pointgroup.children[j].indices[i]; // vertex id
            col = _this.datacolor[k];
            _this.pointgroup.children[j].geometry.attributes.color.array[i * 4] = col.r;
            _this.pointgroup.children[j].geometry.attributes.color.array[i * 4 + 1] = col.g;
            _this.pointgroup.children[j].geometry.attributes.color.array[i * 4 + 2] = col.b;
          }
          _this.pointgroup.children[j].geometry.attributes.color.needsUpdate = true;
        }
      }
      if(_this.options.from) update_line_colors(_this.scene, null);
      if(_this.options.crosstalk_key)
      {
        ct_sel.set([]);
      }
      _this.brushed = null;
      return;
    }
    var off = new THREE.Color("lightgray");
    var on = new THREE.Color("red");
    if(_this.options.highlight) on = new THREE.Color(_this.options.highlight);
    if(_this.options.lowlight) off = new THREE.Color(_this.options.lowlight);
    if(! Array.isArray(vertices)) vertices = [vertices];
    if(_this.options.crosstalk_key)
    {
      ct_sel.set(vertices.map(function(i) {return _this.options.crosstalk_key[i];}));
    }
    var k;
    for(var j = 0; j < _this.pointgroup.children.length; j++)
    {
      if(_this.pointgroup.children[j].type == "Mesh") // spheres
      {
        k = _this.pointgroup.children[j].index; // the vertex id
        if(vertices.indexOf(k + "") >= 0) _this.pointgroup.children[j].material.color = on;
        else _this.pointgroup.children[j].material.color = off;
      } else if(_this.pointgroup.children[j].type == "Points") // buffered
      {
        for(var i = 0; i < _this.pointgroup.children[j].geometry.attributes.position.array.length / 3; i++)
        {
          k = _this.pointgroup.children[j].indices[i]; // vertex id
          if(vertices.indexOf(k) >= 0)
          {
            _this.pointgroup.children[j].geometry.attributes.color.array[i * 4] = on.r;
            _this.pointgroup.children[j].geometry.attributes.color.array[i * 4 + 1] = on.g;
            _this.pointgroup.children[j].geometry.attributes.color.array[i * 4 + 2] = on.b;
          } else
          {
            _this.pointgroup.children[j].geometry.attributes.color.array[i * 4] = off.r;
            _this.pointgroup.children[j].geometry.attributes.color.array[i * 4 + 1] = off.g;
            _this.pointgroup.children[j].geometry.attributes.color.array[i * 4 + 2] = off.b;
          }
        }
        _this.pointgroup.children[j].geometry.attributes.color.needsUpdate = true;
      }
    }
    // now brush edges
    if(_this.options.from)
    {
      var s = _this.scene;
      if(_this.options.from.length <= s)  s = 0;
      var lcol = [];
      lcol.length = _this.options.from[s].length;
      lcol.fill(off);
      for(var j = 0; j < lcol.length; j++)
      {
        if(vertices.indexOf(_this.options.from[s][j] ) >= 0 ||
           vertices.indexOf(_this.options.to[s][j] ) >= 0) lcol[j] = on;
      }
      update_line_colors(_this.scene, lcol);
    }
    _this.brushed = true;
  };

  _this.create_plot = function(x)
  {
    if(x.crosstalk_group)
    {
      ct_sel.setGroup(x.crosstalk_group);
      ct_filter.setGroup(x.crosstalk_group);
    }
    _this.options = x;
    if(x.renderer == "canvas" && _this.renderer.GL)
    {
      _this.renderer = new THREE.CanvasRenderer();
      _this.renderer.GL = false;
      _this.el.appendChild(_this.renderer.domElement);
    }
    if(x.useorbitcontrols)
    {
/* *** Alternatively, use OrbitControls. But zoom is not damped and vertical rotation is restricted. */
      _this.controls = new THREE.StateOrbitControls(_this.camera, _this.el);
      _this.controls.rotateSpeed = 0.6;
      _this.controls.zoomSpeed = 1.5;
      _this.controls.panSpeed = 1;
      _this.controls.enableZoom = true;
      _this.controls.enablePan = true;
      _this.controls.enableDamping = true;
      _this.controls.dampingFactor = 0.15;
      _this.controls.addEventListener('change', render);
    }
    var group = new THREE.Object3D();        // contains non-point plot elements (axes, etc.)
    _this.pointgroup = new THREE.Object3D(); // contains plot points
    _this.linegroup = new THREE.Object3D();  // contains plot lines
    group.name = "group";
    _this.pointgroup.name = "pointgroup";
    _this.linegroup.name = "linegroup";
    scene.add(group);
    scene.add(_this.linegroup);
    scene.add(_this.pointgroup);
    if(x.bg) _this.renderer.setClearColor(new THREE.Color(x.bg));
    if(x.top) _this.infobox.style.top += x.top;
    if(x.left) _this.infobox.style.left += x.left;
    if(x.fontmain) _this.infobox.style.font = x.fontmain;
    if(x.main && Array.isArray(x.main)) _this.main = x.main[0];
    else if(x.main) _this.main = x.main;

    printInfo(_this.main);
    if(x.mousethreshold) _this.mousethreshold = x.mousethreshold;
    var cexaxis = 0.5;
    var cexlab = 1;
    var fontaxis = "48px Arial";
    var fontsymbols = "48px Arial";
    if(x.cexaxis) cexaxis = parseFloat(x.cexaxis);
    if(x.cexlab) cexlab = parseFloat(x.cexlab);
    if(x.fontaxis) fontaxis = x.fontaxis;
    if(x.fontsymbols) fontsymbols = x.fontsymbols;
    // caching for convenient vertex lookup in *_lines functions
    _this.data = x.vertices[0].slice();
    // also cache (current) colors for convenience later
    if(x.color && Array.isArray(x.color[0]))
    {
      // array of colors
      _this.datacolor = x.color[0].slice().map(function(x) {return new THREE.Color(x);});
    } else if(x.color) {
      // only a single color specified
      var XC;
      if(Array.isArray(x.color)) XC = new THREE.Color("#" + new THREE.Color(x.color[0]).getHexString());
      else XC = new THREE.Color(x.color);
      _this.datacolor = [];
      _this.datacolor.length = x.NROW;
      _this.datacolor.fill(XC);
    } else {
      // no color specified, use a default data color cache for each vertex
      _this.datacolor = [];
      _this.datacolor.length = x.NROW;
      _this.datacolor.fill(new THREE.Color("#ffa500"));
    }

    // circle sprite for pch='@'
    var sz = 512;
    if(_this.options.strokewidth == null || typeof(_this.options.strokewidth) === undefined) _this.options.strokewidth = 0.75;
    else _this.options.strokewidth = Math.max(0, Math.min(1, 1 - _this.options.strokewidth));
    var dataColor = new Uint8Array( sz * sz * 4 );
    for(var i = 0; i < sz * sz * 4; i++) dataColor[i] = 0;
    for(var i = 0; i < sz; i++)
    {
      for(var j = 0; j < sz; j++)
      {
        var dx = 2*i/(sz-1) - 1;
        var dy = 2*j/(sz-1) - 1;
        var dz = dx*dx + dy*dy;
        var k = i*sz + j;
        if(dz <= _this.options.strokewidth)
        {
          dataColor[k*4] = 255;
          dataColor[k*4 + 1] = 255;
          dataColor[k*4 + 2] = 255;
          dataColor[k*4 + 3] = 255;
        } else if(dz < 1)
        {
          dataColor[k*4] = 0;
          dataColor[k*4 + 1] = 0;
          dataColor[k*4 + 2] = 0;
          dataColor[k*4 + 3] = 255;
        }
      }
    }
    var circle = new THREE.DataTexture(dataColor, sz, sz, THREE.RGBAFormat, THREE.UnsignedByteType );
    circle.needsUpdate = true;
    // circle sprite for pch='@' and square sprite for pch='.'
    var sz = 16;
    var dataColor = new Uint8Array( sz * sz * 4 );
    for(var i = 0; i < sz * sz * 4; i++) dataColor[i] = 255;
    var square = new THREE.DataTexture(dataColor, sz, sz, THREE.RGBAFormat, THREE.UnsignedByteType );
    square.needsUpdate = true;

    if(_this.renderer.GL)
    {
      _this.N = x.vertices[0].length / 3;       // number of vertices

      if(x.fpl) _this.fps = x.fpl;
      if(x.fps) _this.fps = x.fps;              // alternative notation
      if(!_this.fps) _this.fps = 200;           // default frames per scene

      // lights
      if(x.lights) {
        for(var i = 0; i < x.lights.length; i++) {
          if(x.lights[i].type == "ambient") {
            var light = new THREE.AmbientLight(x.lights[i].color);
            scene.add(light)
          } else if(x.lights[i].type == "directional") {
            var light = new THREE.DirectionalLight(x.lights[i].color);
            light.position.set(x.lights[i].position[0], x.lights[i].position[1], x.lights[i].position[2]);
            scene.add(light)
          }
        }
      } else {
        var light = new THREE.AmbientLight(0xa6a6a6);
        scene.add(light );
      }

      // Handle mupltiple kinds of glyphs
      /* FIXME avoid multiple data scans here and below (pre-sort by pch, for instance) */
      var npoints = 0;
      var scale = 0.02;
      for (var i = 0; i < _this.N; i++)
      {
        if(x.pch[i] == 'o')    // special case: spheres
        {
          npoints++;
          if(x.size) {
            if(Array.isArray(x.size)) scale = 0.02 * x.size[i];
            else scale = 0.02 * x.size;
          }
          // Create geometry
          var sphereGeo =  new THREE.SphereGeometry(scale, 20, 20);
          sphereGeo.computeFaceNormals();
          // Move to position
          sphereGeo.applyMatrix (
            new THREE.Matrix4().makeTranslation(x.vertices[0][i*3], x.vertices[0][i*3 + 1], x.vertices[0][i*3 + 2]));
          // Color
          col = _this.datacolor[i];
        /** FIXME: figure out how to embed this mesh in the buffer geometry below
         */
          var mesh = new THREE.Mesh(sphereGeo, new THREE.MeshLambertMaterial({color : col}));
          mesh.index = i;
          if(x.labels && Array.isArray(x.labels)) mesh.label = x.labels[i];
          else mesh.label = "";
          _this.pointgroup.add(mesh);
        }
      } // end of special sphere case
      if(npoints < _this.N)
      { // more points (that are not spheres)
//        var unique_pch = [...new Set(x.pch)]; // XXX doesn't work in some versions of RStudio
//        if(!Array.isArray(x.pch)) unique_pch = [...new Set([x.pch])];
        var unique_pch;
        if(Array.isArray(x.pch))
        {
          unique_pch = x.pch.filter(function (x, i, a) { 
            return a.indexOf(x) == i; 
          }).filter(function(x){return (x != 'o')});
        } else
        {
          unique_pch = [x.pch].filter(function (x, i, a) { 
            return a.indexOf(x) == i; 
          }).filter(function(x){return (x != 'o')});
        }
        for(var j=0; j < unique_pch.length; j++)
        {
          var pchpoints = 0;
          for (var i = 0; i < _this.N; i++)
          {
            if(x.pch[i] == unique_pch[j]) pchpoints++;
          }
          var geometry = new THREE.BufferGeometry();
          var positions = new Float32Array(pchpoints * 3);
          var colors = new Float32Array(pchpoints * 4);
          var sizes = new Float32Array(pchpoints);
          var indices = new Int32Array(pchpoints);
          var col = new THREE.Color("orange");
          scale = 0.3;
          // generic pch sprite (text)
          var canvas = document.createElement("canvas");
          var cwidth = 512;
          canvas.width = cwidth;
          canvas.height = cwidth;
          var context = canvas.getContext("2d");
          context.fillStyle = "#ffffff";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.font = fontsymbols;
          context.fillText(unique_pch[j], cwidth / 2, cwidth / 2);
          var sprite = new THREE.Texture(canvas);
          sprite.flipY = false;
          sprite.needsUpdate = true;

          geometry.labels = [];

          var txtur, scalefactor;
          if(unique_pch[j] == '@') {
            txtur = circle;
            scalefactor = 0.25;
          } else if(unique_pch[j] == '.') {
            txtur = square;
            scalefactor = 0.25;
          } else {
            txtur = sprite;
            scalefactor = 10;
          }

          if(x.size && !Array.isArray(x.size)) scale = x.size;
          var k = 0;
          for (var i = 0; i < _this.N; i++)
          {
            if(x.pch[i] == unique_pch[j])
            {
              npoints++;
              if(Array.isArray(x.size)) sizes[k] = x.size[i] * scalefactor;
              else sizes[k] = scale * scalefactor;
              if(x.labels && Array.isArray(x.labels)) geometry.labels.push(x.labels[i]);
              else geometry.labels.push("");
              indices[k] = i; // track vertex index
              positions[k * 3 ] = x.vertices[0][i * 3];
              positions[k * 3 + 1 ] = x.vertices[0][i * 3 + 1];
              positions[k * 3 + 2 ] = x.vertices[0][i * 3 + 2];
              col = _this.datacolor[i];
              colors[k * 4] = col.r;
              colors[k * 4 + 1] = col.g;
              colors[k * 4 + 2] = col.b;
              if(x.alpha && Array.isArray(x.alpha[0])) colors[k * 4 + 3] = x.alpha[0][k];
              else colors[k * 4 + 3] = 1;
              k++;
            }
          }
          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));
          geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
          geometry.computeBoundingSphere();

          var material = new THREE.ShaderMaterial({
              uniforms: {
                texture1: { type: 't',  value: txtur }
              },
              vertexShader: [
                "attribute float size;",
                "attribute vec4 color;",
                "varying vec4 vColor;",
                "void main() {",
                  "vColor = color;",
                  "vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);",
                  "gl_PointSize = size * ( 300.0 / -mvPosition.z );",
                  "gl_Position = projectionMatrix * mvPosition; }"].join("\n"),
              fragmentShader: [
                "uniform sampler2D texture1;",
                "varying vec4 vColor;",
                "void main() {",
                  "gl_FragColor = vec4( vColor );",
                  "gl_FragColor = gl_FragColor * texture2D( texture1, gl_PointCoord.xy );",
                  "if ( gl_FragColor.a < ALPHATEST ) discard; }"].join("\n"),
              alphaTest: 0.1, // NB ALPHATEST in the shader
              transparent: true
          });

          var particleSystem = new THREE.Points(geometry, material);
          particleSystem.indices = indices; // vertex indices
          _this.pointgroup.add(particleSystem);
        }
      }
    } else { // canvas (not WebGL)
      var program = function (context)
      {
        context.beginPath();
        context.arc(0, 0, 0.5, 0, Math.PI*2, true);
        if(x.stroke)
        {
          context.strokeStyle = x.stroke;
          context.lineWidth = 0.15;
          context.stroke();
        }
        context.fill();
      };
      var col = new THREE.Color("steelblue");
      var scale = 0.03;
      for ( var i = 0; i < _this.N; i++ ) {
        if(x.color) {
          if(Array.isArray(x.color[0])) col = new THREE.Color(x.color[0][i]);
          else col = new THREE.Color(x.color[0]);
        }
        if(x.size) {
          if(Array.isArray(x.size)) scale = 0.03 * x.size[i];
          else scale = 0.03 * x.size;
        }
        var material = new THREE.SpriteCanvasMaterial( {
            color: col, program: program , opacity:0.9} );
        var particle = new THREE.Sprite(material);
        particle.position.x = x.vertices[0][i * 3];
        particle.position.y = x.vertices[0][i* 3 + 1];
        particle.position.z = x.vertices[0][i * 3 + 2];
        particle.scale.x = particle.scale.y = scale;
        _this.pointgroup.add(particle);
      }
    }

// helper function to add text to 'object'
    function addText(object, string, scale, x, y, z, color)
    {
      var log2 = function(x) {return Math.log(x) / Math.log(2);};  // no Math.log2 function in RStudio on Windows :(
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      scale = scale / 4;
      context.fillStyle = "#" + color.getHexString();
      context.textAlign = 'center';
      context.font = fontaxis;
      var size = Math.max(64, Math.pow(2, Math.ceil(log2(context.measureText(string).width))));
      canvas.width = size;
      canvas.height = size;
      scale = scale * (size / 128);
      context = canvas.getContext('2d');
      context.fillStyle = "#" + color.getHexString();
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = fontaxis;
      context.fillText(string, size / 2, size / 2);
      var amap = new THREE.Texture(canvas);
      amap.needsUpdate = true;
      var mat = new THREE.SpriteMaterial({
        map: amap,
        transparent: true,
        color: 0xffffff });
      sp = new THREE.Sprite(mat);
      sp.scale.set( scale, scale, scale );
      sp.position.x = x;
      sp.position.y = y;
      sp.position.z = z;
      object.add(sp);
    }

// Set up the axes
    var axisColor = new THREE.Color("#000000");
    if(x.bg)
    {
      var bgcolor = new THREE.Color(x.bg);
      axisColor.r = 1 - bgcolor.r;
      axisColor.g = 1 - bgcolor.g;
      axisColor.b = 1 - bgcolor.b;
      _this.fgcss = "#" + axisColor.getHexString(); // mouse-over info box color
      _this.infobox.style.color = _this.fgcss;
    }
    function v(x,y,z){ return new THREE.Vector3(x,y,z); }
    var tickColor = axisColor;
    tickColor.r = Math.min(tickColor.r + 0.2, 1);
    tickColor.g = Math.min(tickColor.g + 0.2, 1);
    tickColor.b = Math.min(tickColor.b + 0.2, 1);

    if(x.axis)
    {
      var xAxisGeo = new THREE.Geometry();
      var yAxisGeo = new THREE.Geometry();
      var zAxisGeo = new THREE.Geometry();
      xAxisGeo.vertices.push(v(0, 0, 0), v(x.axislength[0], 0, 0));
      yAxisGeo.vertices.push(v(0, 0, 0), v(0, x.axislength[1], 0));
      zAxisGeo.vertices.push(v(0, 0, 0), v(0, 0, x.axislength[2]));
      var xAxis = new THREE.Line(xAxisGeo, new THREE.LineBasicMaterial({color: axisColor, linewidth: 1}));
      var yAxis = new THREE.Line(yAxisGeo, new THREE.LineBasicMaterial({color: axisColor, linewidth: 1}));
      var zAxis = new THREE.Line(zAxisGeo, new THREE.LineBasicMaterial({color: axisColor, linewidth: 1}));
      xAxis.type = THREE.Lines;
      yAxis.type = THREE.Lines;
      zAxis.type = THREE.Lines;
      group.add(xAxis);
      group.add(yAxis);
      group.add(zAxis);
      if(x.axisLabels)
      {
        var dropOff = -0.08;
        addText(group, x.axisLabels[0], cexlab, x.axislength[0] + .1, dropOff, dropOff, axisColor)
        addText(group, x.axisLabels[1], cexlab, 0, x.axislength[1] + .1, 0, axisColor)
        addText(group, x.axisLabels[2], cexlab, dropOff, dropOff, x.axislength[2] + .1, axisColor)
      }
// Ticks and tick labels
      function tick(length, thickness, axis, ticks, ticklabels)
      {
        for(var j=0; j < ticks.length; j++)
        {
          var tick = new THREE.Geometry();
          var a1 = ticks[j]; var a2 = ticks[j]; var a3=ticks[j];
          var b1 = length; var b2 = -length; var b3=-0.05;
          var c1 = 0; var c2 = 0; var c3=-0.08;
          if(axis==1){a1=length; b1=ticks[j]; c1=0; a2=-length; b2=ticks[j]; c2=0; a3=0.08; b3=ticks[j]; c3=-0.05;}
          else if(axis==2){a1=0; b1=length; c1=ticks[j];a2=0;b2=-length;c2=ticks[j]; a3=-0.08; b3=-0.05; c3=ticks[j];}
          tick.vertices.push(v(a1,b1,c1),v(a2,b2,c2));
          if(ticklabels)
            addText(group, ticklabels[j], cexaxis, a3, b3, c3, tickColor);
          var tl = new THREE.Line(tick, new THREE.LineBasicMaterial({color: tickColor, linewidth: thickness}));
          tl.type=THREE.Lines;
          group.add(tl);
        }
      }
      if(x.xtick) tick(0.005, 3, 0, x.xtick, x.xticklab);
      if(x.ytick) tick(0.005, 3, 1, x.ytick, x.yticklab);
      if(x.ztick) tick(0.005, 3, 2, x.ztick, x.zticklab);
    }

// Grid
    function grid(ticks,axis,axislength) {
      for(var j=1; j < ticks.length; j++)
      {
        var gridline = new THREE.Geometry();
        if(axis==0) {
          gridline.vertices.push(v(ticks[j], 0, 0), v(ticks[j], 0, axislength[2]));
        }
        else if(axis==2) {
          gridline.vertices.push(v(0,0,ticks[j]), v(axislength[0],0,ticks[j]));
        }
        var gl = new THREE.Line(gridline, new THREE.LineBasicMaterial({color: tickColor, linewidth: 1}));
        gl.type = THREE.Lines;
        group.add(gl);
      }      
    }
    if(x.grid && x.xtick)
    {
      grid(x.xtick,0,x.axislength);
    }
    if(x.grid && x.ztick)
    {
      grid(x.ztick,2,x.axislength);
    }
    
// Lines
/* Note that variable line widths are not directly supported by buffered geometry, see for instance:
 * http://stackoverflow.com/questions/32544413/buffergeometry-and-linebasicmaterial-segments-thickness
 * also see https://mattdesl.svbtle.com/drawing-lines-is-hard
 **FIXME add custom shader to support this!
 */
    if(x.from && _this.renderer.GL)
    {
      draw_lines(0, null);
    }
    if(x.vertices.length > 1 && _this.fps > 0) _this.frame = 0; // animate
    _this.idle = false;
    render();
  }; // end of create_plot

/** FIXME Help improving animation performance appreciated */
  _this.update = function()
  {
    if(_this.frame > -1)
    { // animate
      var h = _this.frame / _this.fps;
      var k;
      // update vertices and possibly vertex colors
      for(var j = 0; j < _this.pointgroup.children.length; j++)
      {
        if(_this.pointgroup.children[j].type == "Mesh") // spheres
        {
          k = _this.pointgroup.children[j].index; // the vertex id
          var x  = _this.options.vertices[_this.scene][k * 3];
          var y  = _this.options.vertices[_this.scene][k * 3 + 1];
          var z  = _this.options.vertices[_this.scene][k * 3 + 2];
          var x1 = _this.options.vertices[_this.scene + 1][k * 3];
          var y1 = _this.options.vertices[_this.scene + 1][k * 3 + 1];
          var z1 = _this.options.vertices[_this.scene + 1][k * 3 + 2];
          var dx = (x1 - x) / (_this.fps + 1);
          var dy = (y1 - y) / (_this.fps + 1);
          var dz = (z1 - z) / (_this.fps + 1);
          _this.pointgroup.children[j].geometry.translate(dx, dy, dz);
          // cache for posterity (easy lookup in *_lines)
          _this.data[k * 3] = _this.data[k * 3] + dx;
          _this.data[k * 3 + 1] = _this.data[k * 3 + 1] + dy;
          _this.data[k * 3 + 2] = _this.data[k * 3 + 2] + dz;
          if(_this.options.color.length > 1)
          {
            var col1, col2;
            var a1 = 1; var a2 = 1;
            if(Array.isArray(_this.options.color[_this.scene]))
            {
              col1 = new THREE.Color(_this.options.color[_this.scene][k]);
            }
            else col1 = new THREE.Color(_this.options.color[_this.scene]);
            if(Array.isArray(_this.options.color[_this.scene + 1]))
            {
              col2 = new THREE.Color(_this.options.color[_this.scene + 1][k]);
            } else col2 = new THREE.Color(_this.options.color[_this.scene + 1]);
            _this.pointgroup.children[j].material.color = new THREE.Color(
                                         col1.r + (col2.r - col1.r) * h,
                                         col1.g + (col2.g - col1.g) * h,
                                         col1.b + (col2.b - col1.b) * h);
            _this.datacolor[k] = _this.pointgroup.children[j].material.color; // cache vertex color
          }
          k++;
        } else if(_this.pointgroup.children[j].type == "Points") // buffered
        {
          for(var i = 0; i < _this.pointgroup.children[j].geometry.attributes.position.array.length / 3; i++)
          {
            k = _this.pointgroup.children[j].indices[i]; // vertex id
            var x  = _this.options.vertices[_this.scene][k * 3];
            var y  = _this.options.vertices[_this.scene][k * 3 + 1];
            var z  = _this.options.vertices[_this.scene][k * 3 + 2];
            var x1 = _this.options.vertices[_this.scene + 1][k * 3];
            var y1 = _this.options.vertices[_this.scene + 1][k * 3 + 1];
            var z1 = _this.options.vertices[_this.scene + 1][k * 3 + 2];
            _this.pointgroup.children[j].geometry.attributes.position.array[i * 3] = x + (x1 - x) * h;
            _this.pointgroup.children[j].geometry.attributes.position.array[i * 3 + 1] = y + (y1 - y) * h;
            _this.pointgroup.children[j].geometry.attributes.position.array[i * 3 + 2] = z + (z1 - z) * h;
            // cache for posterity (easy lookup in *_lines)
            _this.data[k*3] = _this.pointgroup.children[j].geometry.attributes.position.array[i * 3];
            _this.data[k*3 + 1] = _this.pointgroup.children[j].geometry.attributes.position.array[i * 3 + 1];
            _this.data[k*3 + 2] = _this.pointgroup.children[j].geometry.attributes.position.array[i * 3 + 2];
/* Note: The list of colors and alphas is _either_ length one (same colors for all scenes),
 * _or_ a list of the same length as the number of scenes specifying per-scene colors.
 */
            if(_this.options.color.length > 1)
            {
              var col1, col2;
              var a1 = 1; var a2 = 1;
              if(Array.isArray(_this.options.color[_this.scene]))
              {
                col1 = new THREE.Color(_this.options.color[_this.scene][k]);
              }
              else col1 = new THREE.Color(_this.options.color[_this.scene]);
              if(Array.isArray(_this.options.color[_this.scene + 1]))
              {
                col2 = new THREE.Color(_this.options.color[_this.scene + 1][k]);
              } else col2 = new THREE.Color(_this.options.color[_this.scene + 1]);
              _this.datacolor[k] = new THREE.Color(col1.r + (col2.r - col1.r) * h,
                                           col1.g + (col2.g - col1.g) * h,
                                           col1.b + (col2.b - col1.b) * h); // cache color
              if(_this.options.alpha.length > 1)
              {
                if(Array.isArray(_this.options.alpha[_this.scene])) a1 = parseFloat(_this.options.alpha[_this.scene][k]);
                else a1 = parseFloat(_this.options.alpha[_this.scene]);
                if(Array.isArray(_this.options.alpha[_this.scene + 1])) a2 = parseFloat(_this.options.alpha[_this.scene + 1][k]);
                else a2 = parseFloat(_this.options.alpha[_this.scene + 1]);
              }
              _this.pointgroup.children[j].geometry.attributes.color.array[i * 4] = col1.r + (col2.r - col1.r) * h;
              _this.pointgroup.children[j].geometry.attributes.color.array[i * 4 + 1] = col1.g + (col2.g - col1.g) * h;
              _this.pointgroup.children[j].geometry.attributes.color.array[i * 4 + 2] = col1.b + (col2.b - col1.b) * h;
              _this.pointgroup.children[j].geometry.attributes.color.array[i * 4 + 3] = a1 + (a2 - a1) * h;
            }
            k++;
          }
          _this.pointgroup.children[j].geometry.attributes.position.needsUpdate = true;
          if(_this.options.color.length > 1) _this.pointgroup.children[j].geometry.attributes.color.needsUpdate = true;
        }
      }
// increase frame and scene counters
      if(_this.phase && _this.frame == 0) _this.linegroup.children[0].geometry.setDrawRange(0, 0);
      _this.frame++;
      if(_this.frame > _this.fps)
      {
        _this.scene++;
        s = Math.min(_this.scene, _this.options.from.length - 1);
        if(_this.options.from) draw_lines(s, null);
        if(_this.options.main && Array.isArray(_this.options.main) && _this.options.main.length > _this.scene)
        {
          _this.main = _this.options.main[_this.scene];
          printInfo(_this.main);
        }
        if(_this.scene >= _this.options.vertices.length - 1)
        {
          _this.frame = -1; // done!
          return;
        } else {
          _this.frame = 0; // more scenes to animate, reset frame counter
        }
      }
      update_line_positions(_this.scene);
      update_line_colors(_this.scene, null);
    }
  };

  /* create or update a set of buffered lines
   * l: optional array of line colors
   * s: scene
   */
  var draw_lines = function(s, l)
  {
    if(s >= _this.options.from.length)  s = _this.options.from.length - 1;

    if(! _this.linegroup.children || !_this.linegroup.children[0])
    {
      // need to create buffers
      var maxlen = Math.max.apply(Math, _this.options.from.map(function(x) {return x.length;}));
      if(_this.options.defer && _this.options.defer.from)
      {
        maxlen = Math.max.apply(Math, _this.options.defer.from.map(function(x) {return x.length;}).concat(maxlen));
      }
      var geometry = new THREE.BufferGeometry();
      var positions = new Float32Array(maxlen * 6);
      var colors = new Float32Array(maxlen * 6);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.computeBoundingSphere();
      var material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors, linewidth: _this.options.lwd, opacity: _this.options.linealpha, transparent: true});
      var lines = new THREE.LineSegments(geometry, material);
      _this.linegroup.add(lines);
    }
    var segments = _this.options.from[s].length;
    _this.linegroup.children[0].geometry.setDrawRange(0, 2 * segments);
    update_line_positions(s);
    update_line_colors(s, l);
  };

  /* s: scene index */
  var update_line_positions = function (s)
  {
    var si = Math.min(s, _this.options.from.length - 1);
    var segments = _this.options.from[si].length;
    for(var i = 0; i < segments; i++)
    {
      var from = _this.options.from[si][i];
      var to = _this.options.to[si][i];
      _this.linegroup.children[0].geometry.attributes.position.array[i * 6] = _this.data[from * 3];
      _this.linegroup.children[0].geometry.attributes.position.array[i * 6 + 1] = _this.data[from * 3 + 1];
      _this.linegroup.children[0].geometry.attributes.position.array[i * 6 + 2] = _this.data[from * 3 + 2];
      _this.linegroup.children[0].geometry.attributes.position.array[i * 6 + 3] = _this.data[to * 3];
      _this.linegroup.children[0].geometry.attributes.position.array[i * 6 + 4] = _this.data[to * 3 + 1];
      _this.linegroup.children[0].geometry.attributes.position.array[i * 6 + 5] = _this.data[to * 3 + 2];
    }
    _this.linegroup.children[0].geometry.attributes.position.needsUpdate = true;
  };

  /* s: scene index, l: optional array of line colors */
  var update_line_colors = function(s, l)
  {
    var si = Math.min(s, _this.options.from.length - 1);
    var segments = _this.options.from[si].length;
    for(var i = 0; i < segments; i++)
    {
      var from = _this.options.from[si][i];
      var to = _this.options.to[si][i];
      var c1, c2;
      if(l)
      {
        c1 = l[i];
        c2 = c1;
      } else if(_this.options.lcol)
      {
        if(Array.isArray(_this.options.lcol))
        {
          if(Array.isArray(_this.options.lcol[s]))
            c1 = new THREE.Color(_this.options.lcol[s][i]);
          else
            c1 = new THREE.Color(_this.options.lcol[s]);
        } else c1 = new THREE.Color(_this.options.lcol);
        c2 = c1;
      } else {
        if(_this.datacolor)
        { // interpolate line colors
          c1 = _this.datacolor[from];
          c2 = _this.datacolor[to];
        } else {
          c1 = new THREE.Color(_this.options.color[Math.min(s, _this.options.color.length - 1)]);
          c2 = c1;
        }
      }
      _this.linegroup.children[0].geometry.attributes.color.array[i * 6] = c1.r;
      _this.linegroup.children[0].geometry.attributes.color.array[i * 6 + 1] = c1.g;
      _this.linegroup.children[0].geometry.attributes.color.array[i * 6 + 2] = c1.b;
      _this.linegroup.children[0].geometry.attributes.color.array[i * 6 + 3] = c2.r;
      _this.linegroup.children[0].geometry.attributes.color.array[i * 6 + 4] = c2.g;
      _this.linegroup.children[0].geometry.attributes.color.array[i * 6 + 5] = c2.b;
    }
    _this.linegroup.children[0].geometry.attributes.color.needsUpdate = true;
  };



  function printInfo(text)
  {
    if(_this.infobox.innerHTML != text)
    {
      _this.infobox.innerHTML = text;
      _this.infobox.style.color = _this.fgcss;
      _this.infobox.style.top = "-" + _this.el.getBoundingClientRect().height + "px";
      _this.infobox.style.left = "0px";
      if(_this.options.top) _this.infobox.style.top = (_this.options.top - _this.el.getBoundingClientRect().height) + "px";
      if(_this.options.left) _this.infobox.style.left = _this.options.left + "px";
    }
  }

  _this.animate = function ()
  {
    _this.controls.update();
    render();
    if(_this.renderer.GL) _this.update();
    if(! _this.idle)  requestAnimationFrame(_this.animate); // (hogs CPU)
  };

  function render()
  {
    if(_this.controls.state && _this.controls.state < 0 && _this.frame < 0)
    {
      _this.idle = true; // Conserve CPU by terminating render loop when not needed
    }
    // render scenes
    _this.renderer.clear();
    _this.renderer.render(scene, _this.camera);
  }

};
