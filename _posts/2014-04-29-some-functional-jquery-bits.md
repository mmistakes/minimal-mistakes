---
id: 33
title: Some Functional JQuery bits
date: 2014-04-29T12:51:43+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=33
permalink: /some-functional-jquery-bits/
categories:
  - Uncategorized
---
<li>Return a processed array, leaving underlying array unaltered
<code>
var arr = Array.apply(null, Array(5)).map(function (_, i) {return i;});
var processedArr = $.map(arr, function(el) { return el * 2; } );
// arr = [0, 1, 2, 3, 4]
// processedArr = [0, 2, 4, 6, 8]
</code>

<li>Summarize values in an array
<code>
 var keys = $.unique($.map(objects, function(e) { return e[keyfield] }))
 $.map(keys,function(e){ 
  var ret = {}; 
  ret[e]= $.grep(objects, function(gr) { 
    return gr[keyfield] == e; 
  }).length; 
  return ret; 
} );
</code>
<a href="http://jsfiddle.net/edgriebel/LekSt/2/" target="_blank">JSFiddle</a>

<li>Modify every row in an array
<code>
var arr = Array.apply(null, Array(5)).map(function (_, i) {return i;});
// note that no records change with scalar elements b/c items passed by value
$.each(arr, function(idx, el) { el *= 2; });
// [ 0, 1, 2, 3, 4 ]

var arr1 = [ ['a',1],['b',2],['c',3] ];
$.each(arr, function(idx, el) { el *= 2; });
// [["a", 2], ["b", 4], ["c", 6]]

var arr2 = [ {a: 1}, {a: 2}, {a: 3} ];
// records change with an object
$.each(arr2, function(idx, el) { el.a *= 2; });
// [ {a: 2}, {a: 4}, {a: 6} ];

</code>