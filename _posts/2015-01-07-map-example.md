---
layout: post
title: Map Example
modified:
categories:
excerpt:
tags: []
image:
  feature:
date: 2015-01-07T22:11:31-07:00
map:
  mapboxlayer: examples.map-i86nkdio
  attribution: Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>
  options:
    center: "[51.0402, -114.0234]"
    zoom: 12
    attributionControl: false
  markers:
    - location: [51.0402, -114.0427]
      content: I'm an open popup!
      open: true
    - location: [51.027, -114.0523]
      content: I'm closed by default.
---

Maps are also supported as Hero Units. This is achieved by adding a `map` variable to the post/page meta data in a fashion similar to the following:


{% highlight yaml %}
map:
  mapboxlayer: examples.map-i86nkdio
  # layer: ... #  If you want to add a non-mapbox baselayer
  attribution: Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>
  options:  # Accepts any standard map option: http://leafletjs.com/reference.html#map-options
    center: "[51.04, -114.075]"  # Center array must be in quotes if under options
    zoom: 10
    attributionControl: false
  markers:
    - location: [51.0402, -114.0427]
      content: I'm an open popup!
      open: true
    - location: [51.027, -114.0523]
      content: I'm closed by default.
{% endhighlight %}


This will take precedent over any `image` variable set on a page or a post.
