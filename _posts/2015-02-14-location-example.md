---
layout: post
title: coordinates Example
modified:
categories:
excerpt: An example of a post with a coordinates.
tags: []
image:
  feature:
date: 2015-02-14T22:11:31-07:00
map:
  height: 20vw;
  mapboxlayer: examples.map-i86nkdio
  attribution: Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>
  location: whitehouse
---

You can save commonly used locations in the `locations.yml` file. By including a single `location` attribute in a post/page's `map` setting, the page will load a her-unit map with the location as a popup.


{% highlight yaml %}
map:
  height: 20vw;  # Optional...
  mapboxlayer: examples.map-i86nkdio
  # layer: ... #  If you want to add a non-mapbox baselayer
  attribution: Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>
  options:  # Accepts any standard map option: http://leafletjs.com/reference.html#map-options
    center: "[51.04, -114.075]"  # Center array must be in quotes if under options
    zoom: 10
    attributionControl: false
  markers:
    - coordinates: [51.0402, -114.0427]
      content: I'm an open popup!
      open: true
    - coordinates: [51.027, -114.0523]
      content: I'm closed by default.
{% endhighlight %}


This will take precedent over any `image` variable set on a page or a post.
