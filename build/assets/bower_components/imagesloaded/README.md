# imagesLoaded

<p class="tagline">JavaScript is all like "You images done yet or what?"</p>

[imagesloaded.desandro.com](http://imagesloaded.desandro.com)

Detect when images have been loaded.

## Install

### Download

+ [imagesloaded.pkgd.min.js](https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js) minified
+ [imagesloaded.pkgd.js](https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.js) un-minified

### CDN

``` html
<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>
<!-- or -->
<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.js"></script>
```

### Package managers

Install via [npm](https://www.npmjs.com/package/imagesloaded): `npm install imagesloaded`

Install via [Bower](http://bower.io): `bower install imagesloaded --save`

## jQuery

You can use imagesLoaded as a jQuery Plugin.

``` js
$('#container').imagesLoaded( function() {
  // images have loaded
});

// options
$('#container').imagesLoaded( {
  // options...
  },
  function() {
    // images have loaded
  }
);
```

`.imagesLoaded()` returns a [jQuery Deferred object](http://api.jquery.com/category/deferred-object/). This allows you to use `.always()`, `.done()`, `.fail()` and `.progress()`.

``` js
$('#container').imagesLoaded()
  .always( function( instance ) {
    console.log('all images loaded');
  })
  .done( function( instance ) {
    console.log('all images successfully loaded');
  })
  .fail( function() {
    console.log('all images loaded, at least one is broken');
  })
  .progress( function( instance, image ) {
    var result = image.isLoaded ? 'loaded' : 'broken';
    console.log( 'image is ' + result + ' for ' + image.img.src );
  });
```

## Vanilla JavaScript

You can use imagesLoaded with vanilla JS.

``` js
imagesLoaded( elem, callback )
// options
imagesLoaded( elem, options, callback )
// you can use `new` if you like
new imagesLoaded( elem, callback )
```

+ `elem` _Element, NodeList, Array, or Selector String_
+ `options` _Object_
+ `callback` _Function_ - function triggered after all images have been loaded

Using a callback function is the same as binding it to the `always` event (see below).

``` js
// element
imagesLoaded( document.querySelector('#container'), function( instance ) {
  console.log('all images are loaded');
});
// selector string
imagesLoaded( '#container', function() {...});
// multiple elements
var posts = document.querySelectorAll('.post');
imagesLoaded( posts, function() {...});
```

Bind events with vanilla JS with .on(), .off(), and .once() methods.

``` js
var imgLoad = imagesLoaded( elem );
function onAlways( instance ) {
  console.log('all images are loaded');
}
// bind with .on()
imgLoad.on( 'always', onAlways );
// unbind with .off()
imgLoad.off( 'always', onAlways );
```

## Background

Detect when background images have loaded, in addition to `<img>`s.

Set `{ background: true }` to detect when the element's background image has loaded.

``` js
// jQuery
$('#container').imagesLoaded( { background: true }, function() {
  console.log('#container background image loaded');
});

// vanilla JS
imagesLoaded( '#container', { background: true }, function() {
  console.log('#container background image loaded');
});
```

[See jQuery demo](http://codepen.io/desandro/pen/pjVMPB) or [vanilla JS demo](http://codepen.io/desandro/pen/avKooW) on CodePen.

Set to a selector string like `{ background: '.item' }` to detect when the background images of child elements have loaded.

``` js
// jQuery
$('#container').imagesLoaded( { background: '.item' }, function() {
  console.log('all .item background images loaded');
});

// vanilla JS
imagesLoaded( '#container', { background: '.item' }, function() {
  console.log('all .item background images loaded');
});
```

[See jQuery demo](http://codepen.io/desandro/pen/avKoZL) or [vanilla JS demo](http://codepen.io/desandro/pen/vNrBGz) on CodePen.

## Events

### always

``` js
// jQuery
$('#container').imagesLoaded().always( function( instance ) {
  console.log('ALWAYS - all images have been loaded');
});

// vanilla JS
imgLoad.on( 'always', function( instance ) {
  console.log('ALWAYS - all images have been loaded');
});
```

Triggered after all images have been either loaded or confirmed broken.

+ `instance` _imagesLoaded_ - the imagesLoaded instance

### done

``` js
// jQuery
$('#container').imagesLoaded().done( function( instance ) {
  console.log('DONE  - all images have been successfully loaded');
});

// vanilla JS
imgLoad.on( 'done', function( instance ) {
  console.log('DONE  - all images have been successfully loaded');
});
```

Triggered after all images have successfully loaded without any broken images.

### fail

``` js
$('#container').imagesLoaded().fail( function( instance ) {
  console.log('FAIL - all images loaded, at least one is broken');
});

// vanilla JS
imgLoad.on( 'fail', function( instance ) {
  console.log('FAIL - all images loaded, at least one is broken');
});
```

Triggered after all images have been loaded with at least one broken image.

### progress

``` js
imgLoad.on( 'progress', function( instance, image ) {
  var result = image.isLoaded ? 'loaded' : 'broken';
  console.log( 'image is ' + result + ' for ' + image.img.src );
});
```

Triggered after each image has been loaded.

+ `instance` _imagesLoaded_ - the imagesLoaded instance
+ `image` _LoadingImage_ - the LoadingImage instance of the loaded image

<!-- sponsored -->

## Properties

### LoadingImage.img

_Image_ - The `img` element

### LoadingImage.isLoaded

_Boolean_ - `true` when the image has successfully loaded

### imagesLoaded.images

Array of _LoadingImage_ instances for each image detected

``` js
var imgLoad = imagesLoaded('#container');
imgLoad.on( 'always', function() {
  console.log( imgLoad.images.length + ' images loaded' );
  // detect which image is broken
  for ( var i = 0, len = imgLoad.images.length; i < len; i++ ) {
    var image = imgLoad.images[i];
    var result = image.isLoaded ? 'loaded' : 'broken';
    console.log( 'image is ' + result + ' for ' + image.img.src );
  }
});
```

## Browserify

imagesLoaded works with [Browserify](http://browserify.org/).

``` bash
npm install imagesloaded --save
```

``` js
var imagesLoaded = require('imagesloaded');

imagesLoaded( elem, function() {...} );
```

Use `.makeJQueryPlugin` to make to use `.imagesLoaded()` jQuery plugin.

``` js
var $ = require('jquery');
var imagesLoaded = require('imagesloaded');

// provide jQuery argument
imagesLoaded.makeJQueryPlugin( $ );
// now use .imagesLoaded() jQuery plugin
$('#container').imagesLoaded( function() {...});
```

## Webpack

Install imagesLoaded with npm.

``` bash
npm install imagesloaded
```

You can then `require('imagesloaded')`.

``` js
// main.js
var imagesLoaded = require('imagesloaded');

imagesLoaded( '#container', function() {
  // images have loaded
});
```

Use `.makeJQueryPlugin` to make `.imagesLoaded()` jQuery plugin.

``` js
// main.js
var imagesLoaded = require('imagesloaded');
var $ = require('jquery');

// provide jQuery argument
imagesLoaded.makeJQueryPlugin( $ );
// now use .imagesLoaded() jQuery plugin
$('#container').imagesLoaded( function() {...});
```

Run webpack.

``` bash
webpack main.js bundle.js
```

## RequireJS

imagesLoaded works with [RequireJS](http://requirejs.org).

You can require [imagesloaded.pkgd.js](http://imagesloaded.desandro.com/imagesloaded.pkgd.js).

``` js
requirejs( [
  'path/to/imagesloaded.pkgd.js',
], function( imagesLoaded ) {
  imagesLoaded( '#container', function() { ... });
});
```

Use `.makeJQueryPlugin` to make `.imagesLoaded()` jQuery plugin.

``` js
requirejs( [
  'jquery',
  'path/to/imagesloaded.pkgd.js',
], function( $, imagesLoaded ) {
  // provide jQuery argument
  imagesLoaded.makeJQueryPlugin( $ );
  // now use .imagesLoaded() jQuery plugin
  $('#container').imagesLoaded( function() {...});
});
```

You can manage dependencies with [Bower](http://bower.io). Set `baseUrl` to `bower_components` and set a path config for all your application code.

``` js
requirejs.config({
  baseUrl: 'bower_components/',
  paths: { // path to your app
    app: '../'
  }
});

requirejs( [
  'imagesloaded/imagesloaded',
  'app/my-component.js'
], function( imagesLoaded, myComp ) {
  imagesLoaded( '#container', function() { ... });
});
```

## Browser support

+ IE9+
+ Android 2.3+
+ iOS Safari 4+
+ All other modern browsers

Use [imagesLoaded v3](http://imagesloaded.desandro.com/v3/) for IE8 support.

## MIT License

imagesLoaded is released under the [MIT License](http://desandro.mit-license.org/). Have at it.
