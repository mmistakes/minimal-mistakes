---
layout: single
title: 'Tableau Desktop Specialist'
categories: tableau
tag: [tableau]
author_profile: false
published: true

---

Tableau Desktop Specialist 자격증을 공부하면서 개념들을 정리해 놨습니다. 파트별 정확한 기준으로 나눠진게 아닌점을 유의하시길 바랍니다.


## Connecting to & Prepareing Data

### Create file 
#### Create TDS file
1) On Data pane, right-click the data source and the select Add to Saved Data Sources.

2) Selcet Data on the toolbar, selecting the data source, and then selecting Add to Saved Data Source. 

### Metadata
**Renaming fields** and **Changing the defaults for formatting** or **aggregation** are metadata management tasks that can be handled in Tableau

Cannot change the data type, the number of rows in the data 

### Between Join and Relationship
**Relationships** are created in the **logical layer**, while **joins** are created in the **physical layer**.

### Relationship
Relationship connect tables using noodles in the logical layer. 

### Join 

cross database join can combine tables stored in different databases.

A join queries **all the specified tables**, regardless of whether fields from those tables are used in the view. 

Join create an extract using the **denormalized table**. When you use the physical table option, The denormalized table resulting from the join is saved

#### outer join
outer join will include **all rows from both tables**, even when the join criteria is not met, while a blend will not include rows from the secondary table unless there is a match on the linking field.


### Union 
Union is a method for appending values (rows) to table. you can use this method if both tables have the same columns

If the field names do not match, the fields will be included in the UNION but will contain **null values** for the rows from the table that is missing the field.


![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/union.png){: .align-center .img-height-half }  


Describes how to create a union of two table.

1) On the datasource page, drag the first table into the canvas. Then drag a second table onto the canvas, **below the first table**.

2) On the data source page, double-check the **"New union" icon**. A Union menu will appear, Drag both tables to the Union Menu, then click OK.

### Blend
blends **avoid duplicated when the tables are at different levels of granularity**, making them preferable to join in some situation.

blends can combine tables stored in **different databases**. it involves a **primary** and **secondary** data source. 

Tables are kept as sepatare data sources, with the **highlighted paperclip icon** linking them

**Data blending** simulates a tranditional **left join** . The main difference between the two is when the aggregation is performed. 

A join combines the data and then aggregates, A blend aggregated and the combines the data

Data blending is performed on a **sheet-by-sheet** basis and is established when a field from a second data source is used in the view

Primary data source appears with a **Blue tick-mark** and the secondary data source appears with a **Orange tick-mark**.

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/blend.png){: .align-center .img-height-half }  


### Union 
To append rows from one table to rows from another table 

### Live connection

If your organization enforces user-level **permissions to databases**, use a live connection for workbooks that connect those databases.

That ways, users who interact with workbooks and data source that **require authentication will be prompted for credentioals**. 

### File Type

(1) **.tds(Tableau Data Source)** :  TDS files save the data source metadata, such as the **connection information, default filed formatting, and sort order**. They don't save the data source itself, and hence you should use this format if everyone who will use the data source hass access to the underlying file or database defined in the connection information.

TDS 파일은 데이터 소스의 설정 정보를 저장하는데 사용되며, 실제 데이터 소스 자체를 저장하지는 않습니다. 데이터 원본 파일은 자주 사용하는 원본 데이터에 빠르게 연결하기 위한 바로 가기입니다. 이 파일 형식은 데이터 소스를 사용하는 모든 사용자가 연결된 파일 또는 데이터베이스에 액세스 할 수 있는 경우에 적합합니다.

TDS files are data source files which do not contain the data. but to include the connection information.

**To not contain the actual data** but rather the information necessary to connect to the actual data as well as any modification you've made on top of the actual data such as **changing default properties, creating calculated field etc.** 

Tableau 데이터 소스를 나타내며, 이는 실제 데이터를 포함하지 않고 대신에 실제 데이터에 연결하고 해당 데이터 위에 만든 변경 사항을 포함하는 정보를 나타냅니다. 이 변경 사항에는 기본 속성 변경, 계산된 필드 생성 등이 포함될 수 있습니다.

(2) **.twbx(Tableau packed workbook)** - To create a single zip file that contains a workbook along with any supporting local file data and background images. This is great for sharing your work with others who don't have access to the original data 

It contains viz, info needed to build the viz, and a copy of the data source. 

<i>The following files are included in packed workbooks:</i>

- Background image
- Custom geocoding
- Custom shape
- Local cube files
- Microsoft Access files
- Microsoft Excel files
- Tableau extract fiels (.hyde ore .tde)
- Text files (.csv, .txt, etc)

이는 워크북과 관련된 local 파일 데이터 및 배경 이미지를 모두 포함하는 단일한 압축 파일을 생성하는 목적으로 사용됩니다. 이것은 원본 데이터에 대한 액세스 권한이 없는 다른 사람들과 작업을 공유하는 데 유용합니다.

(3) **.Extract (.hyper or .tde)** - To create a local copy of a subset or entire data set that you can use to share data with others, when you need to work offline, and improve performance

이는 데이터 세트의 일부 또는 전체에 대한 로컬 복사본을 생성하는 데 사용됩니다. 이를 통해 데이터를 다른 사람들과 공유하거나 오프라인에서 작업하거나 성능을 향상시킬 수 있습니다. 

(4)  **.twb (Workbook)** : twb stands for tableau workbook. it include the worksheet and dashboards (if any) but not the connection information. 

 To hold one or more worksheet plus zero or more dashboards and stories  

이 파일 형식은 하나 이상의 워크시트와 0개 이상의 대시보드 및 스토리를 포함할 수 있습니다. 


(5) **.tdsx (Tableau packed data source)** : TDSX is a zip file containing the data source file(tds) as well as any extra files and local files 

 데이터 파일(.tds)뿐만 아니라 추출 파일(.hyper), 텍스트 파일, Excel 파일, Access 파일 및 로컬 큐브 파일과 같은 모든 로컬 파일 데이터도 포함하는 zip 파일입니다. 

(6) **.twm (bookmark)** - To contain a single worksheet and quickly share your work

Which file type can include an extract?
- tdsx, twbx

tds do not contain the actial data. twb can connect to extracts. but they do not themselves include extract 


### Field

![Alt text]({{site.url}}/images/2023-11-25-tableau1/field.png){: .align-center} 

**Continuous** means "forming an unbroken whole, without interruption". These fields are colored **green**. When a continuous field is put on the Rows or Columns shelf, an **axis** is created in the view.

**Discrete** means "individually separate and distinct." These fields are colored **blue**. When a discrete field is put on the Rows or Columns shelf, a **header** is created in the view.

Table auto-generate **1 Dimension, 4 Measure**

1 Dimension - Measure Names

4 Dimension - Latitude, Longitude, Number of records, Measure Values 


Measure Names and  Measure Values can't be deleted in Tableau. These are auto-genearated

Calculated Fields, and Number of records can both be deleted.

### Icon

![Alt text]({{site.url}}/images/2023-11-25-tableau1/type_icon.png){: .align-center} 


### Header, Axis

Dimensions can only create header. Measures will create header axis both.


### Extract

#### Extracts are advantageous for several reasons

1. **Supports large data sets**: You can create extracts that contain billions of rows of data.

2. **Help improve performance**: When you interact with views that use extract data sources, you generally experience better performance than when interacting with views based on connections to the original data.

3. **Support additional functionality**: Extracts allow you to take advantage of Tableau functionality that's not available or supported by the original data, such as the ability to compute Count Distinct.

4. **Provide offline access to your data**: If you are using Tableau Desktop, extracts allow you to save and work with the data locally when the original data is not available. For example, when you are traveling.

5. **Fast to create** : If You're working with large data sets, creating and working with extracts can be faster than working with the original data.

#### The things that can be configured when creating an extract.

1) Whether to store logical or physical tables.

2) Whether to limit the data extracted using filters

3) Whether to aggreate measures for visible dimensions 

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/extract.png){: .align-center .img-height-half }  

❗Setting a refresh schedule is done when you publish to Tableau Server 


### Option

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/extract_size.png){: .align-center .img-height-half }  

Physical Table option can potentially improvemance and help **reduce the size of the extract file.**

Using the incrementa fresh option should not impact the size of the extract . it should only impact whether the refresh works by **removing the old extract completely and recreating it, or whether it adds new rows to the existing extract .**

Materializing calculations may reduce the time to open the workbook since the results of the calculations will be saved in the extract, bu will no reduce the workbook size.

### Data pane 
![Alt text]({{site.url}}/images/2023-11-25-tableau1/data_pane_.png){: .align-center .img-height-half}



**Dimension fields** - Fields that contain qualitative (정성적) values (such as names, dates, or geographical data). **Dimensions affect the level of detail in the view.**

**Measure fields** - Fields that contain numeric, quantitative(정량적) values can be measured. (such as Sales, profit ..)

**Calculated field** - You can create new fields in Tableau using calculations and then save them as part of your data source. 

**Sets** - Subsets of data that you define. **Sets are custom fields based on exsiting dimension** and criteria that you specify. 

**Parameters** - Values that can be used as placeholders in formulas, or replace constant values in calculated fields and filters.


### Analytics pane
![Alt text]({{site.url}}/images/2023-11-25-tableau1/analytics_pane.png){: .align-center .img-height-half}



### Rename, Alias
#### Rename
**Field names, parameters amd sets may be renamed. **

Column values can be aliased but cannot be renamed. Generated fields such as measure names cannot be renamed.

#### Alias
Aliases can be applied only to **discrete dimension** values.

Aliases can be set only for discrete dimension, **not for measures, field name, or dates.** 

Aliases allow you to show more relevant or descriptive dimension values in your view

You can create aliases for members in a dimension so that their labels appear differently in the view.

Aliases can be created for the members of **discrete dimensions only**. They cannot be created for continuous dimensions, dates, or measure**



### Role, Type

When users connected to Tableau, the data fields in their data set are automatically assigned a role and a type.

#### Role
1) Dimension
2) Measure

#### Type
1) String
2) Number
3) Geographic
4) Boolean
5) Date
6) Date and Time 

When users connect to a data source, Tableau assigns each field in the data source as dimension or measure in the Data pane

####  Geographic role

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/geo.png){: .align-center .img-height-half }  

### Default properties

**default properties for a dimension**

- Comment, Color, Shape, Sort

**default properties for a measure**

- Comment, Number Format, Aggregation, Color, Total using 

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/default_properties.png){: .align-center .img-height-half }  

### Total 
1) On the Analysis Pnae, drag Totals into the view and drop on the [ex: Row Grand Total area]

2) Select the Analysis option on the toolbar, then Totals and Add [ex: Row Grand Total area]

### Date type

When the data type is mapped as numbers, text is treated as null while dates are treated as the number of days since 1/1/1900. 

If chaging type to date doesn't work, you should change the back to string and use a date parse function.

### Quick table calculation

![Alt text]({{site.url}}/images/2023-11-25-tableau1/quick_table.png){: .align-center} 

Runnung Total, Percent Difference, Difference, Percent of Total, Rank, Percentile, Moving Average

### Aggregate function

Sum, AVG, Median, Count, Min, Max, Percentile, Std, Variance


### Wildcard Search
Use this method to set up search criteria to automatically include tables in your union. Use the wildcard character, which is an asterisk (*), to match a sequence or pattern of characters in the Excel workbook and worksheet names, Google Sheets workbook and worksheet names, text file names, JSON file names, .pdf file names, and database table names.

검색 기준을 설정하여 자동으로 연합에 테이블을 포함할 수 있습니다. 와일드카드 문자인 별표(*)를 사용하여 Excel 워크북 및 워크시트 이름, Google Sheets 워크북 및 워크시트 이름, 텍스트 파일 이름, JSON 파일 이름, .pdf 파일 이름 및 데이터베이스 테이블 이름의 일련의 문자 또는 패턴과 일치시킬 수 있습니다.

---

## Exploring & Analyzing Data 

### Filter
slider filters are greate for date and numeric values

list filters are better for categorical data

#### Related date filter 
Relativedate filters work relative to the anchor date. By the default this will be the current date, but this can be changed. 

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/related_date_filter.png){: .align-center .img-height-half }  

#### Create filter

#### Order of Operations  
![Alt text]({{site.url}}/images/2023-11-25-tableau1/order_of_operations.png){: .align-center}

#### Context filter
1) **Improve performance** - If you set a lot of filters or have a large data source, the queries can be slow. You can set one or more context filters to improve performance.

2) **Create a dependent numerical or top N filter** - You can set a context filter to include only the data of interest, and then set a numerical or top N filter. 


#### Quick Filter 

![Alt text]({{site.url}}/images/2023-11-25-tableau1/quick_filter.png){: .align-center}

### Hierachies, Group, Sets

#### Hierachies
Hierachies organize multiple dimensions based on higher and lower levels. Groups do not do this

#### Sets
Sets determine which values of a dimension are in the Top N or Bottom N on a related measure

Sets are custom fields that are **created** within Tableau Desktop **based on dimensions** from your data source. Either dimensions or measures can be used to determine what is included or excluded from a set using conditional logic


-  To create a dynamic set

    - 1) In the Data pane, right click a dimension and select Create > Set

    - 2) In the Create Set dialog box, configure your set. You can configure your set using the following tabs

![Alt text]({{site.url}}/images/2023-11-25-tableau1/set.png){: .align-center}


#### Groups 
Groups can be created on measures and dimensions.

#### Ways to group data
1) Marks
2) Labels
3) Dimensions shelf

<div style="text-align:center;">
    <img src="{{site.url}}/images/2023-11-25-tableau1/group_data1.png" width="400" />
    <img src="{{site.url}}/images/2023-11-25-tableau1/group_data2.png" width="400" width="400" />
</div>

### Chart

![Alt text]({{site.url}}/images/2023-11-25-tableau1/chart.png){: .align-center .img-width-half} 

#### Scatter plot
scatter plots to visualuze relationships between numerical variables. 

scatter plots are used to understand the relationship between two or more variables rather than a single measure.

#### Bar chart
bar charts  to compare data across categories

#### Line chart
Line charts connect individual data points in a view. They provided a simple wqy to visualize a sequence of values and are useful when you want to see trends **over time**

line chart compare numeric data over time 

#### Pareto Chart
Pareto Chart is a type of contains both bars and line graph, where individual values are represented in **decending order by bars**, and **aecending cumulative total is represented by the line**

#### Stacked bar
stacked bar charts compare numeric data over two dimension

#### Histogram
A histogram is a chart that displays the shape of **distribution**. A histogram looks like a bar chart but groups values for **a continuous measure into ranges, or bins.**

histogram uses bins to subdivide a continuous measure into a discrete bins.

histogram always bins data and uses the **COUNT or COUNT DISTINCT function** to count the number of occurences within the bin.

#### bulet chart
A bullet graph is a variation of a bar graph developed to replace dashboard **gauges and meters**. A bullet graph is useful for comparing the performance of a **primary measure to one or more other measures.**

Bullet chart combines a **barchart with a reference line** 

#### Tree map 

Try **adjusting size** on a tree map and you will see it is **not an option**

#### Showing trends over time 
Some of the best visualization for showing trends over time are **line charts, area charts, and bar charts**

#### To visualize the distribution of a single continuous measure
Box plot, Histogram

### Bin
bin can be created on a **continuous measure or numeric dimension**

Create bins from a measure you can **create a dimension**

It's sometimes useful to convert a **continuous measure**(or a **nemeric dimension**) into bins.

### Reference Line
#### Add a reference line
On the analytics pane, click on reference line and drag into the view.

On the Show Me menu, select bullet graph (bullet graphes include reference line)

You can add a reference line at a **constant or computed value** on the axis. Computed values can be based on a specified field : **Calculated Fields, Measures**

### Trend Line

To add trend lines to a view,** both axes must contain a field that can be interpreted as a number.** However, you can add a trend line to a view of sales over time because both sales and time can be interpreted as numeric values. 

For multidimensional data sources, the date hierarchies actually contain strings rather than numbers. Therefore, trend lines are not allowed. Additionally, the ‘m/d/yy’ and ‘mmmm yyyy’ date formats on all data sources do not allow trend lines.

![Alt text]({{site.url}}/images/2023-11-25-tableau1/trend_line2.png){: .align-center} 

There are 5 types of trend lines which we can work with in Tableau

1) Linear Trend Line

2) Logarithmic Trend Line

3) Exponential Trend Line

4) Polynomial Trend Line

5) Power Model

![Alt text]({{site.url}}/images/2023-11-25-tableau1/trend_line.png){: .align-center} 


### Dashboard
#### Device option
Select Device Preview, then select specific(ex Phone) device type, then click the button labeled "Add specific(ex Phone) Layout"

#### Which of the following Device options are available in the Device Preview section 

Phone, Monitor, Laptop, Default

Default layout 
- Default, Phone 

#### Legend
Remove a legend

- click the x to remove it 
- click the arrow on the legend and select "**Remove from dashboard**"
- select the legend by clicking and **drag it out of the dashboard canva**s

#### Action
1) Select
- Filtering
2) Hover
- Highlighting
3) Menu
- added to the tooltip and user can decided whether to run that action or not 

#### Replace a worksheet in a dashboard

Click the **swap sheet icon** next to the new worksheet on the dashboard pane

-------
                                            
## Understanding Tableau Concepts
### Measure Names
Create a view with multiple measures on a single continuous axis, Tableau will autimatically add Measure Names to the view.


### Rule
A rule of thumb is to put the **most important data on the X- or Y-axis** and **less important data on color, size, or shape.**

### aggregation
#### AGG
measure that has an aggregation already built in, when you add it to the view you will see AGG in front of the field name

AGG indicateds taht the "Average Profit" already some type of aggregation. "Profit" does not include aggregation, so an aggregate function is applied when the field is added to the view. 

#### Error
If you try to aggregate an aggregated field, you will get the error message saying that an aggregate cannot be further aggregated


### Color palette

If the values are all positive then a sequential color gradient will be used. 

If there are negative and positive values then a diverging color gradient will be used. 

if the data is discrete a categorical pallete will be used

A **continuous** field will create a **color gradient**, while a **discrete** field will create a **color palete**. 

- all negative values are shown in one color and all positive values are shown in a second color
Click the arrow on the colors mark, select edit colors, select a diverging palette from the dropdown and check stepped color with 2 steps and check center on zero


Discrete field on Color in the Marks card, Tableau displays a categorical palette and assigns a color to each vlue of field

Continuous field on Color, Tableau displays a quantiative(정량적) legend with a continuous range of colors . 


### Legend 
show the color legend

1) Select Analysis>Legends>Color Legend

2) Select Worksheet>Show Cards>Reset Cards

3) Right-click in the space below the marks card and select Legend>Color Legend

### Mark Label

#### Show mark label
1) Click on Show Mark Labels Icon in Toolbar
2) Drag the measure to the Text label in the Marks Card
3) Click on Analysis -> Show mark labels from the Tableau menu bar 

### Story

#### Story point

A story is a sheet, so the methods you use to create, name, and manage worksheets and dashboards also apply to stories (for more details, see Workbooks and Sheets). At the same time, a story is also a **collection of sheets**, arranged in a sequence. **Each individual sheet in a story is called a story point.**

동시에 story는 시퀀스로 정렬된 시트의 컬렉션입니다. 이야기의 각 개별 시트를 'story point'라고 합니다."

![Alt text]({{site.url}}/images/2023-11-25-tableau1/story_point.png){: .align-center} 

#### Preserving the existig story point
Preserving the existig story point before modiofication - Select "**Save as New**" on the existing story point

### Mark Size

Polygon cannot have its size adjusted.

Mark size option

- Reversed, By range, 

Not By parameter, Stepped 

### Font size

To change the font size

1) Click Text on the Marks card

2) On the format menu, select Font and then make the change on the Pan dropdown

### Formatting axes

To make an axis bold, simply right click it, select format, and then click on Font to chose Bold


### Mark Card

The marks Card allow us not only to edit the Shape, Text and Color, but also to modify the Tooltip and the level of detail of the visualisation

![Alt text]({{site.url}}/images/2023-11-25-tableau1/mark_card.png){: .align-center}

### Animation

#### 1) Simultaneous animations

The default simulataneous animation are faster and work well when showing value changes in simpler charts and dashboards 

sequential animations will first change the size, then resort

#### 2) Sequential animations 
Sequential animations take more time but make complex changes clear by presenting them step-by-step

#### To Animate visualization in a workbook

1) Choose Format > Animation

2) If you want to animate every sheet, under Workbook Default, click On. Then do the following:

3) To override workbook defaults for a particular sheet, change the settings under Selected Sheet.

![Alt text]({{site.url}}/images/2023-11-25-tableau1/animation.png){: .align-center} 


### Export
#### CSV file
1) On the Data Source page, select Data. Then select Export Data to CSV

2) Right-click the data source name in the data pane, then select "Export data to CSV"

------

## Share Insights
### Dashboard action
To create dashboard action

1) Click the "More Options" arrow on the worksheet included in the dashboard layout. then select "**use as filter**"

Default action is On select 

❗ Click the "More Options" arrow on the worksheet included in the dashboard layout, then select "Filter" and the field you wish to use in the filter action. (Add a quick filter to the dashboard)

❗Right-click on a header value shown in the worksheet in the dashboard layout and select "exclude" or "keep only" (Create a context filter)

❗Click the "More Options" arrow on the worksheet included in the dashboard layout, then select "action" (No action option in the "More Options")

The available dashboard Actopn options are shown below.

- Filter, HIghlight, Go to URL, Go to Sheet, Change Parameter, Change Set Value

![dashboard_option]({{site.url}}/images/2023-11-26-tableau_specialist/dashboard_option.png){: .align-center }

### Change font color 
1) Right-click on the view, select "Format" and select the dropdown next to tooltip. Then select the color

2) Click on the tooltip button in the Marks area, hilight the text, and select the desired color using the dropdown.


### Proportional brushing
Set action can use used to achive proportional brushing

### Copy Image
1) By clicking on Worksheet in the Tableau Main Menu above, and choosing Copy->Image

2) By right clicking on the worksheet visualisation and selecting Copy -> Image

### 2020.1 version

#### 2020.1 version the new features 

1) Viz animation
2) Dynamic Parameter
3) Buffer Calculations

Set controls are new feature introduced in 2020.2 version