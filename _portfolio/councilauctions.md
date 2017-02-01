---
title: "Bristol's Council House Auctions"
permalink: /portfolio/councilauctions/
excerpt: "Mapping the sale of council houses"
header:
  image:
  teaser: councilauctions-th.gif
date: 2016-04-08 12:00:00
sidebar:
  - title: "Main Tools"
    text: "Carto"
  - title: "Published"
    text: "Online"
  - title: "Publisher"
    text: The Bristol Cable

---
I used Carto (formerly called CartoDB) to quickly map Bristol's council house auctions over the last 10 years. This helped to better understand where, when, and how many council houses were  sold.

<iframe width='100%' height='520' frameborder='0' src='https://bristolcable.cartodb.com/viz/0966e538-fbf3-11e5-a85f-0e3ff518bd15/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

<h2>Methodology</h2>
 A colleague obtained through FOIA a list of the addresses and dates corresponding dates of council house auctions in Bristol.
 
 I ran this list through <a href="https://www.doogal.co.uk/BatchGeocoding.php">a batch geocoder</a> to obtain the coordinates of the properties.
 
 This new dataset was then uploaded to Carto, where I applied the 'torque' temporal mapping feature. The CartoCSS required a bit of tweaking to force the dots to remain after they appeared {% highlight css %}
 /** torque visualization */

Map {
-torque-frame-count:256;
-torque-animation-duration:30;
-torque-time-attribute:"date";
-torque-aggregation-function:"count(cartodb_id)";
-torque-resolution:2;
-torque-data-aggregation:cumulative;
}

#bristol_council_housing_auctions_geocoord_address_{
  comp-op: multiply;
  marker-fill-opacity: 0.9;
  marker-line-color: #FFFFFF;
  marker-line-width: 19;
  marker-line-opacity: 0.2;
  marker-type: ellipse;
  marker-width: 5;
  marker-fill: #FFCC00;
}
#bristol_council_housing_auctions_geocoord_address_[frame-offset=1] {
 marker-width:7;
 marker-fill-opacity:0.45; 
}
#bristol_council_housing_auctions_geocoord_address_[frame-offset=2] {
 marker-width:9;
 marker-fill-opacity:0.225; 
}
#bristol_council_housing_auctions_geocoord_address_[frame-offset=3] {
 marker-width:11;
 marker-fill-opacity:0.15; 
}{% endhighlight %}

I also created a second layer to enable constant hovering over data points, displaying a tooltip containing the date of sale and area. The CartoCSS for that is:

{% highlight css %}
/** simple visualization */

#bristol_council_housing_auctions_geocoord_address_ {
  marker-fill-opacity: 0.9;
  marker-line-color: #FFF;
  marker-line-width: 1;
  marker-line-opacity: 1;
  marker-placement: point;
  marker-type: ellipse;
    marker-fill: white;
}
    {% endhighlight %}

<a href="https://thebristolcable.org/2016/04/interactive-bristol-councils-homes-under-the-hammer/">Read the article here</a>.
