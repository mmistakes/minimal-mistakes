---
title: "About"
layout: splash
permalink: /about/
date: 2016-03-23T11:48:41-04:00
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/unsplash-image-1.jpg
  actions:
    - label: "Learn More"
      url: "/terms/"
intro: 
  - excerpt: 'transparent, neutral data about the cloud computing landscape
'
feature_row:
  - image_path: assets/images/unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Cloudmap"
    excerpt: "Browse public cloud regions and edge sites around the world."
    btn_label: "Read More"
    btn_class: "btn--primary" 
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "CloudWatch"
    excerpt: "Real time aggregated feed of public cloud status updates."
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: /assets/images/unsplash-gallery-image-3-th.jpg
    title: "Placeholder 3"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
    btn_label: "Read More"
    btn_class: "btn--primary"
feature_row2:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder Image Left Aligned"
    excerpt: 'This is some sample content that goes here with **Markdown** formatting. Left aligned with `type="left"`'
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
feature_row3:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder Image Right Aligned"
    excerpt: 'This is some sample content that goes here with **Markdown** formatting. Right aligned with `type="right"`'
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
feature_row4:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder Image Center Aligned"
    excerpt: 'This is some sample content that goes here with **Markdown** formatting. Centered with `type="center"`'
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row %}

{% include feature_row id="feature_row4" type="center" %}

  <script type="text/javascript" src="js/d3.js"></script>
    <script type="text/javascript" src="js/crossfilter.js"></script>
    <script type="text/javascript" src="js/dc.js"></script>
    <script type="text/javascript" src="js/dc.leaflet.js"></script>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/axis.js"></script>
    <script type="text/javascript">
    d3.json('cloudmap.geojson', ).then(data => {
        d3.json('cloudmap_style.json').then(mapStyle => {
            data = data.features.map(x => ({
                region: x.properties['Region Name'],
                regionType: x.properties['Region Type'],
                provider: x.properties.Provider,
                city: x.properties.City,
                country: x.properties.Country,
                website: x.properties.Website,
                point: x.geometry.coordinates.reverse(),
                id: x.id,
            }))

            var ndx = crossfilter(data)
            var all = ndx.groupAll();

            dc.dataCount('#count')
                .dimension(ndx)
                .group(all)
                .html({
                    some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records',
                    all: 'showing <strong>%total-count</strong> records'
                });

            var markerDim = ndx.dimension(function(d) {
                return d.point;
            });
            var markerGroup = markerDim.group();

            map = dc_leaflet.markerChart("#map")
                .dimension(markerDim)
                .group(markerGroup)
                .center([0, 0])
                .zoom(2)
                .mapStyle(mapStyle)
                .renderPopup(false)
                .filterByArea(true);

            ['provider', 'regionType', 'city', 'region'].forEach(function(dimName, idx) {
                createBarChart(dimName, idx, '#charts', ndx)
            })

            dc.renderAll();
        });
    });

    $('#reset').click(function() {
        dc.filterAll();
        map.map().setCenter(map.center());
        map.map().setZoom(map.zoom());
        dc.redrawAll();
    })