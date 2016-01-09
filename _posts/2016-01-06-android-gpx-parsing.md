---
layout: post
title: Android GPX Parsing
excerpt: "A simple library to parse GPX files, built with Android in mind."
modified: 2016-1-9
tags: [android, java, gpx, gps]
comments: true
---

This article is linked to the GPX parsing library that I published - fork it [here on Github](https://github.com/ticofab/android-gpx-parser).

For a recent Android, project I needed to parse GPX files. 'GPX' is an acronym for [GPS Exchange Format](https://en.wikipedia.org/wiki/GPS_Exchange_Format) and it is an XML format to describe routes, tracks and waypoints, together with information about altitude, timing and so forth. This is an example:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" creator="Oregon 400t" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
  <metadata>
    <link href="http://www.garmin.com">
      <text>Garmin International</text>
    </link>
    <time>2009-10-17T22:58:43Z</time>
  </metadata>
  <trk>
    <name>Example GPX Document</name>
    <trkseg>
      <trkpt lat="47.644548" lon="-122.326897">
        <ele>4.46</ele>
        <time>2009-10-17T18:37:26Z</time>
      </trkpt>
    </trkseg>
  </trk>
</gpx>
{% endhighlight %}

When faced with the need to parse such files in Android, and map them to convenient structures, I found no existing library to do it. Therefore I set out to make one myself. The first step was to map all these GPX object in a convenient way, so for instance:

{% highlight java %}
public class TrackPoint {
    private final Double mLatitude;
    private final Double mLongitude;
    private final Double mElevation;
    private final DateTime mTime;
    ...
}
{% endhighlight %}

What took me the most time was the actual XML parsing. My last encounter with XML was a while ago, so I had to wrap my head around it again. I decided to use the default XmlPullParser shipped with the Android SDK. You start by defining the XML tags in Java:

{% highlight java %}
static final String TAG_GPX = "gpx";
static final String TAG_TRACK = "trk";
static final String TAG_SEGMENT = "trkseg";
static final String TAG_POINT = "trkpt";
static final String TAG_LAT = "lat";
static final String TAG_LON = "lon";
...
{% endhighlight %}

And then it becomes a matter of recursively scanning the GPX file, "nesting" one level deeper when you encounter specific tags, and parsing each tag attribute. This is for instance how you can parse a TrackPoint:

{% highlight java %}
// Processes summary tags in the feed.
TrackPoint readPoint(XmlPullParser parser) throws IOException, XmlPullParserException {
    parser.require(XmlPullParser.START_TAG, ns, TAG_POINT);
    Double lat = Double.valueOf(parser.getAttributeValue(null, TAG_LAT));
    Double lng = Double.valueOf(parser.getAttributeValue(null, TAG_LON));
    Double ele = null;
    DateTime time = null;
    while (parser.next() != XmlPullParser.END_TAG) {
        if (parser.getEventType() != XmlPullParser.START_TAG) {
            continue;
        }
        String name = parser.getName();
        switch (name) {
            case TAG_ELEVATION:
                ele = readElevation(parser);
                break;
            case TAG_TIME:
                time = readTime(parser);
                break;
            default:
                skip(parser);
                break;
        }
    }
    parser.require(XmlPullParser.END_TAG, ns, TAG_POINT);
    return new TrackPoint.Builder()
            .setElevation(ele)
            .setLatitude(lat)
            .setLongitude(lng)
            .setTime(time)
            .build();
}
{% endhighlight %}

The [library](https://github.com/ticofab/android-gpx-parser) I published is largely incomplete - it only parses the elements I needed to parse - but it can be expanded to be more complete. All contributions to expand this library are most welcome, so fork it at will!

