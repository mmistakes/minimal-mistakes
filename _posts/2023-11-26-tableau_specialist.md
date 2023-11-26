---
layout: single
title: 'Tableau Desktop Specialist'
categories: tableau
tag: [tableau]
author_profile: false
---

## Connecting to & Prepareing Data

### Between Join and Relationship

Relationships are created in the logical layer, while joins are created in the physical layer.

### 

### Join 

cross database join can combine tables stored in different databases.

#### outer join
outer join will include all rows from both tables, even when the join criteria is not met, while a blend will not include rows from the secondary table unless there is a match on the linking field.


### Union 
union append rows from one table to rows in another table

If the field names do not match, the fields will be included in the UNION but will contain null values for the rows from the table that is missing the field.

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/union.png){: .align-center .img-height-half }  

### Blend
blends avoid duplicated when the tables are at different levels of granularity, making them preferable to join in some situation.

blends can combine tables stored in different databases. it involves a primary and secondary data source. 

### File Type

.TDS file : TDS files save the data source metadata, such as the connection information, default filed formatting, and sort order. They don't save the data source itself, and hence you should use this format if everyone who will use the data source hass access to the underlying file or database defined in the connection information.

TDS 파일은 데이터 소스의 설정 정보를 저장하는데 사용되며, 실제 데이터 소스 자체를 저장하지는 않습니다. 이 파일 형식은 데이터 소스를 사용하는 모든 사용자가 연결된 파일 또는 데이터베이스에 액세스 할 수 있는 경우에 적합합니다.

### Rename, Alias
#### Rename
Field names, parameters amd sets may be renamed. 

Column values can be aliased but cannot be renamed. Generated fields such as measure names cannot be renamed.

#### Alias

Aliases can be applied only to discrete dimension values.

### Role
####  Geographic role

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/geo.png){: .align-center .img-height-half }  

### Default properties

change default properties for a dimension

- Comment, Color, Shape, Sort

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/default_properties.png){: .align-center .img-height-half }  

## Exploring & Analyzing Data 
### Chart

#### Scatter plot
scatter plots to visualuze relationships between numerical variables. 

#### Bar chart
bar charts  to compare data across categories

#### Line chart
line chart compare numeric data over time 

#### Stacked bar
stacked bar charts compare numeric data over two dimwnsion

#### Histogram
histogram uses bins to subdivide a continuous measure into a discrete bins.

### Bin
bin can be created on a continuous measure or numeric dimension

### Reference Line
#### Add a reference line
On the analytics pane, click on reference line and drag into the view.

On rhe Show Me menu, select bullet graph (bullet graphes include reference line)

### Dashboard
#### Device Type
Select Device Preview, then select specific device type, then click the button labeled "Add specific Layout"

#### Legend
Remove a legend

- click the x to remove it 
- click the arrow on the legend and select "Remove from dashboard"
- select the legend by clicking and drag it out of the dashboard canvas

#### Replace a worksheet in a dashboard

Click the swap sheet icon next to the new worksheet on the dashboard pane

## Understanding Tableau Concepts

### Rule
A rule of thumb is to put the most important data on the X- or Y- axis and less important data on color, size, or shape.

### AGG
measure that has an aggregation already built in, when you add it to the view you will see AGG in front of the field name

### Color palette

If the values are all positive then a sequential color gradient will be used. If there are negative values then a diverging color gradient will be used. if the data is discrete a categorical pallete will be used

### Font size

To change the font size

1) Click Text on the Marks card

2) On the format menu, select Font and then make the change on the Pan dropdown


### Animation

#### Sequential animations
sequential animations will first change the size, then resort

### Export
#### CSV file
1) On the Data Source page, select Data. Then select Export Data to CSV

2) Right-click the data source name in the data pane, then select "Export data to CSV"


