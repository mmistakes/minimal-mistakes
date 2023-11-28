---
layout: single
title: 'Tableau Desktop Specialist'
categories: tableau
tag: [tableau]
author_profile: false
published: false

---

## Connecting to & Prepareing Data

### Create file 
#### Create TDS file
1) On Data pane, right-click the data source and the select Add to Saved Data Sources.

2) Selcet Data on the toolbar, selecting the data source, and then selecting Add to Saved Data Source. 

### Metadata
Renaming fields and Changing the defaults for formatting or aggregation are metadata management tasks that can be handled in Tableau

Cannor change the data type, the number of rows in the data 

### Between Join and Relationship

Relationships are created in the logical layer, while joins are created in the physical layer.
### Relationship
Relationship connect tables using noodles in the logical layer. 
### Join 

cross database join can combine tables stored in different databases.

A join queries **all the specified tables**, regardless of whether fields from those tables are used in the view. 

Join create an extract using the denormalized table. When you use the physical table option, The denormalized table resulting from the join is saved


#### outer join
outer join will include all rows from both tables, even when the join criteria is not met, while a blend will not include rows from the secondary table unless there is a match on the linking field.


### Union 
union append rows from one table to rows in another table

If the field names do not match, the fields will be included in the UNION but will contain null values for the rows from the table that is missing the field.

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/union.png){: .align-center .img-height-half }  


Describes how to create a union of two table.

1) On the datasource page, drag the first table into the canvas. Then drag a second table onto the canvas, below the first table.

2) On the data source page, double-check the "New union" icon. A Union menu will appear, Drag both tables to the Union Menu, then click OK.

### Blend
blends avoid duplicated when the tables are at different levels of granularity, making them preferable to join in some situation.

blends can combine tables stored in different databases. it involves a primary and secondary data source. 

Tables are kept as sepatare data sources, with the highlighted paperclip icon linking them

### Union 
To append rows from one table to rows from another table 

### Live connection

If your organization enforces user-level permissions to databases, use a live connection for workbooks that connect those databases.
That ways, users who interact with workbooks and data source that require authentication will be prompted for credentioals. 

### File Type

1) .TDS file : TDS files save the data source metadata, such as the connection information, default filed formatting, and sort order. They don't save the data source itself, and hence you should use this format if everyone who will use the data source hass access to the underlying file or database defined in the connection information.

TDS 파일은 데이터 소스의 설정 정보를 저장하는데 사용되며, 실제 데이터 소스 자체를 저장하지는 않습니다. 데이터 원본 파일은 자주 사용하는 원본 데이터에 빠르게 연결하기 위한 바로 가기입니다. 이 파일 형식은 데이터 소스를 사용하는 모든 사용자가 연결된 파일 또는 데이터베이스에 액세스 할 수 있는 경우에 적합합니다.

TDS files are data source files which do not contain the data. but to include the connection information.

2) .TDSX : TDSX is a zip file containing the data source file(tds) as well as any extra files and local files 

 데이터 원본 파일(.tds)뿐만 아니라 추출 파일(.hyper), 텍스트 파일, Excel 파일, Access 파일 및 로컬 큐브 파일과 같은 모든 로컬 파일 데이터도 포함하는 zip 파일입니다. 

3) TWB : twb stands for tableau workbook. it include the worksheet and dashboards (if any) but not the connection information. 


Which file type can include an extract?
- tdsx, twbx

tds do not contain tje actial data. twb can connect to extracts. but they do not themselves include extract 

### Extract

The things that can be configured when creating an extract.

1) Whether to store logical or physical tables.

2) Whether to limit the data extracted using filters

3) Whether to aggreate measures for visible dimensions 

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/extract.png){: .align-center .img-height-half }  

❗Setting a refresh schedule is done when you publish to Tableau Server 

### Option

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/extract_size.png){: .align-center .img-height-half }  

Physical Table option can potentially improvemance and help reduce the size of the extract file.

Using the incrementa fresh option should not impact the size of the extract . it should only impact whether the refresh works by removing the old extract completely and recreating it, or whether it adds new rows to the existing extract .

Materializinf calculations may reduce the time to open the workbook since the results of the calculations will be saved in the extract, bu will no reduce the workbook size.


### Rename, Alias
#### Rename
Field names, parameters amd sets may be renamed. 

Column values can be aliased but cannot be renamed. Generated fields such as measure names cannot be renamed.

#### Alias
Aliases can be applied only to **discrete dimension** values.

Aliases can be set only for discrete dimension, not for measures, field name, or dates. 

Aliases allow you to show more relevant or descriptive dimension values in your view

### Role
####  Geographic role

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/geo.png){: .align-center .img-height-half }  

### Default properties

default properties for a dimension

- Comment, Color, Shape, Sort

default properties for a measure

- Comment, Number Format, Aggregation, Color, Total using 

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/default_properties.png){: .align-center .img-height-half }  

### Total 
1) On the Analysis Pnae, drag Totals into the view and deop on the [ex: Row Grand Total area]

2) Select the Analysis option on the toolbar, then Totals and Add [ex: Row Grand Total area]

### Date type

When the data type is mapped as numbers, text is treated as null whie dates are treated as the number of days since 1/1/1900. 

If chaging type to date doesn't work, you should change the back to string and use a date parse function.

---

## Exploring & Analyzing Data 

### Filter
slider filters are greate for date and numeric values

list filters are better for categorical data

#### Related date filter 
Relativedate filters work relative to the anchor date. By the default this will be the current date, but this can be changed. 

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/related_date_filter.png){: .align-center .img-height-half }  

### Hierachies, Group, Sets

- Hierachies organize multiple dimensions based on higher and lower levels. Groups do not do this

- Sets determine which values of a dimension are in the Top N or Bottom N on a related measure

- Groups can be created on measures and dimensions.


### Chart
#### Scatter plot
scatter plots to visualuze relationships between numerical variables. 

scatter plots are used to understand the relationship between two or more variables rather than a single mwasure.

#### Bar chart
bar charts  to compare data across categories

#### Line chart
line chart compare numeric data over time 

#### Stacked bar
stacked bar charts compare numeric data over two dimwnsion

#### Histogram
histogram uses bins to subdivide a continuous measure into a discrete bins.

histogram always bins data and uses the COUNT or COUNT DISTINCT function to count the number of occurences withib the bin.

#### bulet chart
Bullet chart combines a barchart with a reference line 

#### Tree map 

Try adjusting size on a tree map and you will see it is not an option

#### Showing trends over time 
Some of the best visualization for showing trends over time are line charts, area charts, and vbar charts

#### To visualize the distribution of a single continuous measure
Box plot, Histogram

### Bin
bin can be created on a continuous measure or numeric dimension

Create bins from a measure you can create a dimension

### Reference Line
#### Add a reference line
On the analytics pane, click on reference line and drag into the view.

On rhe Show Me menu, select bullet graph (bullet graphes include reference line)

### Dashboard
#### Device Type
Select Device Preview, then select specific(ex Phone) device type, then click the button labeled "Add specific(ex Phone) Layout"

Default layout 
- Default, Phone 

#### Legend
Remove a legend

- click the x to remove it 
- click the arrow on the legend and select "Remove from dashboard"
- select the legend by clicking and drag it out of the dashboard canvas

#### Replace a worksheet in a dashboard

Click the swap sheet icon next to the new worksheet on the dashboard pane

-------
                                            
## Understanding Tableau Concepts
### Measure Names
Create a view with multiple measures on a single continuopus axis, Tableau will autimatically add Measure Names to the view.


### Rule
A rule of thumb is to put the most important data on the X- or Y- axis and less important data on color, size, or shape.

### aggregation
#### AGG
measure that has an aggregation already built in, when you add it to the view you will see AGG in front of the field name

AGG indicateds taht the "Average Profit" already some type of aggregation. "Profit" does not include aggregation, so an aggregate function is applied when the field is added to the view. 

#### Error
If you try to aggregate an aggregated field, you will get the error message saying that an aggregate cannot be further aggregated


### Color palette

If the values are all positive then a sequential color gradient will be used. If there are negative values then a diverging color gradient will be used. if the data is discrete a categorical pallete will be used

A continuous field will create a color gradient, while a discrete field will create a color palete. 

- all negative values are shown in one color and all positive values are shown in a second color
Click the arrow on the colors mark, select edit colors, select a diverging palette from the dropdown and check stepped color with 2 steps and check center on zero 

### Legend 
show the color legend

1) Select Analysis>Legends>Color Legend

2) Select Worksheet>Show Cards>Reset Cards

3) Right-click in the space below the marks card and select Legend>Color Legend

### Story
Preserving the existinf story point before modiofication - Select "Save as New" on the existing story point

### Mark Size

Polygin cannot have its size adjusted.

Mark size option

- Reversed, By range, 

Not By parameter, Stepped 

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

------

## Share Insights
### Dashboard action
To create dashboard action

1) Click the "More Options" arroe on the worksheet included in the dashboard layout. then select "**use as filter**"

Default action is On select 

❗ Click the "More Options" arroe on the worksheet included in the dashboard layout, then select "Filter" and the field you wish to use in the filter action. (Add a quick filter to the dashboard)

❗Right-click on a header value shown in the worksheet in the dashboard layout and select "exclude" or "keep only" (Create a context filter)

❗Click the "More Options" arrow on the worksheet included in the dashboard layout, then select "action" (No action option in the "More Options")

The available dashboard options are shown below.

- Filter, HIghlight, Go to URL, Go to Sheet, Change Parameter, Change Set Value

![dashboard_option]({{site.url}}/images/2023-11-26-tableau_specialist/dashboard_option.png){: .align-center }

### Change font color 
1) Right-click on the view, select "Format" and select the dropdown next to tooltip. Then select the color

2) Click on the tooltip button in the Marks area, hilight the text, and select the desired color using the dropdown.


### Proportional brushing
Set action can use used to achive proportional brushing

