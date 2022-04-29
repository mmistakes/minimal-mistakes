# Outlayer

_Brains and guts of a layout library_

Outlayer is a base layout class for layout libraries like [Isotope](http://isotope.metafizzy.co), [Packery](http://packery.metafizzy.co), and [Masonry](http://masonry.desandro.com)

Outlayer layouts work with a container element and children item elements.

``` html
<div class="grid">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  ...
</div>
```

## Install

Install with [Bower](http://bower.io): `bower install outlayer`

[Install with npm](http://npmjs.org/package/outlayer): `npm install outlayer`

## Outlayer.create()

Create a layout class with `Outlayer.create()`

``` js
var Layout = Outlayer.create( namespace );
// for example
var Masonry = Outlayer.create('masonry');
```

+ `namespace` _{String}_ should be camelCased
+ returns `LayoutClass` _{Function}_

Create a new layout class. `namespace` is used for jQuery plugin, and for declarative initialization.

The `Layout` inherits from [`Outlayer.prototype`](docs/outlayer.md).

```
var elem = document.querySelector('.selector');
var msnry = new Masonry( elem, {
  // set options...
  columnWidth: 200
});
```

## Item

Layouts work with Items, accessible as `Layout.Item`. See [Item API](docs/item.md).

## Declarative

An Outlayer layout class can be initialized via HTML, by setting an attribute of `data-namespace` on the element. Options are set in JSON. For example:

``` html
<!-- var Masonry = Outlayer.create('masonry') -->
<div class="grid" data-masonry='{ "itemSelector": ".item", "columnWidth": 200 }'>
  ...
</div>
```

The declarative attributes and class will be dashed. i.e. `Outlayer.create('myNiceLayout')` will use `data-my-nice-layout` as the attribute.

## .data()

Get a layout instance from an element.

```
var myMasonry = Masonry.data( document.querySelector('.grid') );
```

## jQuery plugin

The layout class also works as jQuery plugin.

``` js
// create Masonry layout class, namespace will be the jQuery method
var Masonry = Outlayer.create('masonry');
// rock some jQuery
$( function() {
  // .masonry() to initialize
  var $grid = $('.grid').masonry({
    // options...
  });
  // methods are available by passing a string as first parameter
  $grid.masonry( 'reveal', elems );
});
```

## RequireJS

To use Outlayer with [RequireJS](http://requirejs.org/), you'll need to set some config.

Set [baseUrl](http://requirejs.org/docs/api.html#config-baseUrl) to bower_components and set a [path config](http://requirejs.org/docs/api.html#config-paths) for all your application code.

``` js
requirejs.config({
  baseUrl: 'bower_components',
  paths: {
    app: '../'
  }
});

requirejs( [ 'outlayer/outlayer', 'app/my-component.js' ], function( Outlayer, myComp ) {
  new Outlayer( /*...*/ )
});
```

Or set a path config for all Outlayer dependencies.

``` js
requirejs.config({
  paths: {
    'ev-emitter': 'bower_components/ev-emitter',
    'get-size': 'bower_components/get-size',
    'matches-selector': 'bower_components/matches-selector'
  }
});
```

## MIT license

Outlayer is released under the [MIT license](http://desandro.mit-license.org).
