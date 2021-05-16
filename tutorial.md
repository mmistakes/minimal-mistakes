---

layout: single
title: Tool
excerpt: "A Google Earth Engine web application to monitor mountain valley glaciers"
header:
    overlay_image: /assets/images/glacier_header.jpg
    overlay_filter: 0.5


---

### Getting Started
***
To get started:

>Note: To view another glacier ...

```python
### syntax highlighting for many languages
for i in range(10):
    print(i)

```   

### Functionality



***

### How to read GLIMS IDs

GLIMS IDs are the systematic id numbers for the glaciers in our data set. Not all glaciers within the dataset have names in their local languages. Thus, we maintain the GLIMS IDs to index our data and images. The GLIMS IDs are representative of the Latitude and Longitude of the location of any particular glacier. For example, the Trient glacier has GLIMS ID, G007026E45991N. This represents that Trient is located at approximately 45.991° North in Latitude and 7.026° East in Longitude. 

For glaciers in the Western Hemisphere this works a bit differently. The Longitude value in the first part of the ID is never given in degrees west, thus for a place like Alaska and the Kashoto Glacier, G222987E58962N, the first part is not representative of the traditional LatLong identification we would be familiar with. Longitude values only go to 180° but here is listed as 222.987° E which corresponds to 360 - 222.987 or about 137° W, which falls in Alaska.

The Latitude portion of the Glims ID is given in both North and South.
