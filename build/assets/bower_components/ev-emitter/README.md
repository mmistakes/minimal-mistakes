# EvEmitter

_Lil' event emitter_ — add a little pub/sub

EvEmitter adds publish/subscribe pattern to a browser class. It's a smaller version of [Olical/EventEmitter](https://github.com/Olical/EventEmitter). That EventEmitter is full featured, widely used, and great. This EvEmitter has just the base event functionality to power the event API in libraries like [Isotope](http://isotope.metafizzy.co), [Flickity](http://flickity.metafizzy.co), [Masonry](http://masonry.desandro.com), and [imagesLoaded](http://imagesloaded.desandro.com).

## API

``` js
// Inherit prototype, IE8+
MyClass.prototype = new EvEmitter();

// Inherit prototype, IE9+
MyClass.prototype = Object.create( EvEmitter.prototype );

// Mixin prototype
_.extend( MyClass.prototype, EvEmitter.prototype );

// single instance
var emitter = new EvEmitter();
```

### on

Add an event listener.

``` js
emitter.on( eventName, listener )
```

+ `eventName` - _String_ - name of the event
+ `listener` - _Function_

### off

Remove an event listener.

``` js
emitter.off( eventName, listener )
```

### once

Add an event listener to be triggered only once.

``` js
emitter.once( eventName, listener )
```

### emitEvent

Trigger an event.

``` js
emitter.emitEvent( eventName, args )
```

+ `eventName` - _String_ - name of the event
+ `args` - _Array_ - arguments passed to listeners

### allOff

Removes all event listeners.

``` js
emitter.allOff()
```

## Code example

``` js
// create event emitter
var emitter = new EventEmitter();

// listeners
function hey( a, b, c ) {
  console.log( 'Hey', a, b, c )
}

function ho( a, b, c ) {
  console.log( 'Ho', a, b, c )
}

function letsGo( a, b, c ) {
  console.log( 'Lets go', a, b, c )
}

// bind listeners
emitter.on( 'rock', hey )
emitter.once( 'rock', ho )
// trigger letsGo once
emitter.on( 'rock', letsGo )

// emit event
emitter.emitEvent( 'rock', [ 1, 2, 3 ] )
// => 'Hey', 1, 2, 3
// => 'Ho', 1, 2, 3
// => 'Lets go', 1, 2, 3

// unbind
emitter.off( 'rock', ho )

emitter.emitEvent( 'rock', [ 4, 5, 6 ] )
// => 'Hey' 4, 5, 6
```

## License

EvEmitter is released under the [MIT License](http://desandro.mit-license.org/). Have at it.
