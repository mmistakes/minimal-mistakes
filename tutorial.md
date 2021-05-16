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
App opening screen

![image](https://user-images.githubusercontent.com/43550569/118410568-f3d84380-b644-11eb-8160-5b08b3496a65.png)
>Note: To view another glacier ...

```python
### syntax highlighting for many languages
for i in range(10):
    print(i)

```   

### Functionality

## Seminal Examples 
Our app contains three seminal examples of analysis results for glacier retreat over time. 
## Map Layers and Navigation

The map can be navigated as any other application using google maps. Search bar can used to navigate to particular regions of the world as desired and any click with a glacier polygon bring information on the side bar for data download. 

We have four primary fixed geo-spatial data layers displayed on the world map in our Google Earth Engine Application. 

Layer 1: Polygon for every spatially joined WGMS valley glacier, this consists of 474 glaciers. 

Layer 2: Polygon for every spatially joined WGMS valley glacier that has a matching GLIMS ID with the GLIMS database, this consists of 75 glaciers.

Layer 3: Glacier flowlines estimated using gd-flow (Hansen et al 2021).

Layer 4: Bounding Box around the glacier polygons.

These layers are automatically loaded on the map within the application but each can be hidden for easier viewing. 
## Data Access 



***

### How to read GLIMS IDs

GLIMS IDs are the systematic id numbers for the glaciers in our data set. Not all glaciers within the dataset have names in their local languages. Thus, we maintain the GLIMS IDs to index our data and images. The GLIMS IDs are representative of the Latitude and Longitude of the location of any particular glacier. For example, the Trient glacier has GLIMS ID, G007026E45991N. This represents that Trient is located at approximately 45.991° North in Latitude and 7.026° East in Longitude. 

For glaciers in the Western Hemisphere this works a bit differently. The Longitude value in the first part of the ID is never given in degrees west, thus for a place like Alaska and the Kashoto Glacier, G222987E58962N, the first part is not representative of the traditional LatLong identification we would be familiar with. Longitude values only go to 180° but here is listed as 222.987° E which corresponds to 360 - 222.987 or about 137° W, which falls in Alaska.

The Latitude portion of the Glims ID is given in both North and South.
