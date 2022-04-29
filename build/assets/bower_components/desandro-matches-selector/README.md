# matchesSelector helper

[`matches`/`matchesSelector`](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) is pretty hot :fire:, but has [vendor-prefix baggage](http://caniuse.com/#feat=matchesselector) :handbag: :pouch:. This helper function takes care of that, without polyfilling or augmenting `Element.prototype`.

``` js
matchesSelector( elem, selector );
// for example
matchesSelector( myElem, 'div.my-hawt-selector' );
```

## Install

Download [matches-selector.js](https://github.com/desandro/matches-selector/raw/master/matches-selector.js)

Install with [Bower](http://bower.io): `bower install matches-selector`

[Install with npm](https://www.npmjs.org/package/desandro-matches-selector): `npm install desandro-matches-selector`

## Browser support

IE10+, all modern browsers

Use [matchesSelector v1](https://github.com/desandro/matches-selector/releases/tag/v1.0.3) for IE8 and IE9 support.

## MIT license

matchesSelector is released under the [MIT license](http://desandro.mit-license.org)
