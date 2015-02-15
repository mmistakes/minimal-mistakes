---
layout: post
title: Map Example
modified:
categories:
excerpt: An example of a map hero-unit.
tags: []
image:
  feature:
date: 2015-01-07T22:11:31-07:00
map:
  height: 20vw;
  mapboxlayer: examples.map-i86nkdio
  attribution: Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>
  options:
    center: "[51.0402, -114.0234]"
    zoom: 12
    attributionControl: false
  markers:
    - coordinates: [51.0402, -114.0427]
      content: I'm an open popup!
      open: true
    - coordinates: [51.027, -114.0523]
      content: I'm closed by default.
#location: whitehouse  # Rather than build a map, you could place a location here -->
---

Maps are also supported as Hero Units. This is achieved by adding a `map` variable to the post/page meta data in a fashion similar to the following:


{% highlight yaml %}
---
# ...
map:
  height: 20vw;  # Optional...
  mapboxlayer: examples.map-i86nkdio
  # baselayer: ... #  If you want to add a non-mapbox baselayer
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
# ...
---
{% endhighlight %}

This will take precedent over any `image` variable set on a page or a post.

<br />
Additionally, you can save commonly used locations in the `_data/locations.yml` file. By including a single `location` attribute in a post/page's `map` setting, the page will load a her-unit map with the location as a popup.

{% highlight yaml %}
# locations

whitehouse:
  name: The US Whitehouse
  coordinates: [38.897096, -77.036545]
  url: http://whitehouse.gov
  zoom: 18
  address: 1600 Pennsylvania Avenue Northwest,<br />Washington, DC
  extra: <i>Great bathrooms!</i>
{% endhighlight %}

{% highlight yaml %}
---
# ...
map:
  height: 20vw;  # Optional...
  mapboxlayer: examples.map-i86nkdio
  # baselayer: ... #  If you want to add a non-mapbox baselayer
  attribution: Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>
  location: whitehouse
# ...
---
{% endhighlight %}

<br />
If you set create a `default_map` object in your `_config.yml` (with a `mapboxlayer` or `baselayer`, `zoom`, and optionally a collection `options`), you can avoid the map all together when using `location`. These will be overridden by any `map` attributes set in a page/post.

{% highlight yaml %}
---
layout: post
title: Map Example
modified:
categories:
excerpt: An example of a map hero-unit.
tags: []
image:
feature:
date: 2015-01-07T22:11:31-07:00
location: whitehouse
---
{% endhighlight %}
