---
layout: single
title: "Deepness: Deep Neural Remote Sensing QGIS Plugin"
author: [kraft-marek, aszkowski-przemyslaw, ptak-bartosz, pieczynski-dominik]
modified: 2022-10-27
tags: [qgis, plugin, deepness, remote sensing]
category: [project]
teaser: "/assets/images/posts/2022/10/deepness-thumb.webp"
---
<BR>

Successful application of deep learning to remote sensing and GIS data still requires a certain amount of domain expertise in machine learning and data engineering. To overcome this barrier, we introduce Deepness: Deep Neural Remote Sensing [QGIS](https://qgis.org/pl/site/) plugin.

<iframe width="1280" height="720" src="https://www.youtube.com/embed/RCr_ULHHc8A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Scope

The plugin allows the user to perform segmentation, detection and regression on raster orthophotos with custom ONNX Neural Network models, bringing the power of deep learning to casual users. Integration with QGIS facilitates using input data from various sources, including satellites, planes, and UAVs. Moreover, one can quickly review, evaluate and export the results in native GIS formats. You can also use the plugin to export remote sensing training data using a rich set of settings for easier neural network development.

## Model ZOO

The plugin comes with a model ZOO featuring ready-to-run models for popular tasks and comprehensive documentation. The plugin is entirely open-source to encourage further collaborative development.

## Features highlights
- tested with Windows, Linux (Ubuntu, Fedora, Arch), macOS
- processing of any raster layer (custom orthophoto from file or layers from online providers, e.g. Google Satellite, Sentinel Hub)
- limiting processing range to a predefined area (visible part or area defined by vector layer polygons)
- common types of models are supported: segmentation, regression, detection
- integration with QGIS layers (both for input data and for generated model output) - once an output layer is created, it can be saved as a file manually
- model ZOO is still under development, but some demo models are ready (plane detection on Bing Aerial, corn field damage, land cover segmentation, oil storage tanks detection, ...)
- training data Export Tool - exporting raster and mask as small tiles
- parametrization of the processing for advanced users (spatial resolution, overlap, postprocessing)
We eagerly await your feedback, and we're open to collaboration

## Links

- [Deepness on the QGIS Plugins Repository](https://plugins.qgis.org/plugins/deepness/)
- [Deepness on the GitHub](https://github.com/PUTvision/qgis-plugin-deepness)
- [Deepness examples, installation and documentation](https://qgis-plugin-deepness.readthedocs.io/en/latest/)
- [Deepness Model ZOO](https://github.com/PUTvision/qgis-plugin-deepness/blob/devel/docs/source/main/model_zoo/MODEL_ZOO.md)
