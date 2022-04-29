# getSize

Get the size of elements. Used in [Masonry](https://masonry.desandro.com), [Isotope](https://isotope.metafizzy.co), &  [Flickity](https://flickity.metafizzy.co). 

``` js
var size = getSize( elem );
// elem can be an element
var size = getSize( document.querySelector('.selector') )
// elem can be a selector string
var size = getSize('.selector')
```

Returns an object with: 

+ width, height
+ innerWidth, innerHeight
+ outerWidth, outerHeight
+ paddingLeft, paddingTop, paddingRight, paddingBottom
+ marginLeft, marginTop, marginRight, marginBottom
+ borderLeftWidth, borderTopWidth, borderRightWidth, borderBottomWidth
+ isBorderBox

Browser support: IE10+, Android 4.0+, iOS 5+, and modern browsers

## Install

Install with npm: `npm install get-size`

Install with [Bower](https://bower.io): `bower install get-size`

## Firefox hidden iframe bug

[Firefox has an old bug](https://bugzilla.mozilla.org/show_bug.cgi?id=548397) that occurs within iframes that are hidden with `display: none`. To resolve this, you can use alternate CSS to hide the iframe off-screen, with out `display: none`.

``` css
.hide-iframe {
  visibility: hidden;
  position: absolute;
  left: -999em;
}
```

## MIT License

getSize is released under the [MIT License](https://desandro.mit-license.org/).
