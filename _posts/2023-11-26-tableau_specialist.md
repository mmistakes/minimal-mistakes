---
layout: single
title: 'Tableau Desktop Specialist 개념 정리'
categories: 태블로자격증
tag: [tableau]
author_profile: false
published: true
sidebar:
    nav: "counts"

---

태블로 자격증을 공부하면서 정리한 내용입니다

<a href = 'https://www.udemy.com/share/109aDW3@zuowhuRjqeK2luvGrvusvcnU5h0xhZRAzu7tv8gDsKQLcWH5jI9xkH7xh68ocCU_5A==/'>【한글자막】 Tableau Desktop Specialist 자격증 준비하기! (태블로 자격 시험)</a> 와 <a href='https://www.udemy.com/share/103jVM3@13s1KZe4InAHLjghMRLSMOet-KoWmUnDwYftUDhzWR7_HyhyI9FRXoQ0WRga3PeSbw==/'> Tableau Desktop Specialist Certification Practice Tests </a> 을 참고하여 정리했습니다. 

파트별 분류 기준이 정확하지 않고 순서도 혼재되어 있는 점을 참고하시기 바랍니다!

## Connecting to & Prepareing Data


### Metadata
**Renaming fields** and **Changing the defaults for formatting** or **aggregation** are metadata management tasks that can be handled in Tableau

Cannot change the data type, the number of rows in the data 

- To see the table a field belong to
- To view all alises and hidden fields
- To see ther field name in the original data source

### Replace References:
When you successfully connect to a new data source, all worksheets in the workbook that previously referred to the original data source now refer to the new data source. If the new data source does not have the same field names as the original workbook, the fields become invalid and are marked with an exclamation point 

You can quickly resolve the problem by replacing the field’s references.

### Between Join and Relationship
**Relationships** are created in the **logical layer**, while **joins** are created in the **physical layer**.

Think that after the **join** is created, we get **1 single flat** combined (joined) table. This flat combined table is created prior to us creating our visualizations. This happens at the physical layer.

think about relationships, know that all tables will remain distinct and separate, and relationships sit at the logical layer.

A LEFT JOIN or INNER JOIN creates a row each time the join criteria is satisfied, which can result in duplicate rows. One way to avoid this is to use relationships instead.

### Relationship
Relationship connect tables using noodles in the logical layer. 

Tables that you drag to the logical layer of the Data Source page canvas must be related to each other. When you drag additional tables to the logical layer canvas, Tableau automatically attempts to create the relationship based on existing key constraints and matching fields to define the relationship. **If it can't determine the matching fields, you will need to select them.**

If no constraints are detected, **a Many-to-many relationship is created** and referential integrity is set to Some records match. These default settings are a safe choice and provide the most a lot of flexibility for your data source.

### Join 

cross database join can combine tables stored in different databases.

A join queries **all the specified tables**, regardless of whether fields from those tables are used in the view. 

Join create an extract using the **denormalized table**. When you use the physical table option, The denormalized table resulting from the join is saved

Join connect to multiple tables in a single data source at once

We can join a **maximum of 32 tables** in Tableau

Joins are a more static way to combine data. Joins must be defined between physical tables up front, before analysis, and can’t be changed without impacting all sheets using that data source. Joined tables are always merged into a **single table**. As a result, sometimes joined data is **missing unmatched values, or duplicates aggregated values**.

1) Are displayed with Venn diagram icons between physical tables

2) Require you to select join types and join clauses

3) Joined physical tables are merged into a single logical table with a fixed combination of data

4) May drop unmatched measure values

5) May duplicate aggregate values when fields are at different levels of detail

6) Support scenarios that require a single table of data, such as extract filters and aggregation

False
❗They are a more dynamic way than relationship to combine data

❗Joins can be defined at the time of query dynamically

#### outer join
outer join will include **all rows from both tables**, even when the join criteria is not met, while a blend will not include rows from the secondary table unless there is a match on the linking field.



### Union 
Union is a method for appending values (rows) to table. you can use this method if both tables have the same columns

If the field names do not match, the fields will be included in the UNION but will contain **null values** for the rows from the table that is missing the field.


![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/union.png){: .align-center .img-height-half }  




### Blend
blends **avoid duplicated when the tables are at different levels of granularity**, making them preferable to join in some situation.

blends can combine tables stored in **different databases**. it involves a **primary** and **secondary** data source. 

Tables are kept as sepatare data sources, with the **highlighted paperclip icon** linking them

**Data blending** simulates a tranditional **left join** . The main difference between the two is when the aggregation is performed. 

A join combines the data and then aggregates, A blend aggregated and the combines the data

Data blending is performed on a **sheet-by-sheet** basis and is established when a field from a second data source is used in the view. To create a blend in a workbook already connected to at least two data sources, bring a field from one data source to the sheet—it becomes the primary data source.

Primary data source appears with a **Blue tick-mark** and the secondary data source appears with a **Orange tick-mark**.

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/blend.png){: .align-center .img-height-half }  


### Live connection
By default, when you connect a data source to Tableau, Tableau will create a live connection to the data.

If your organization enforces user-level **permissions to databases**, use a live connection for workbooks that connect those databases.

That ways, users who interact with workbooks and data source that **require authentication will be prompted for credentioals**. 

### File Type

(1) **.tds(Tableau Data Source)** :  TDS files save the data source metadata, such as the **connection information, default filed formatting, and sort order**. They don't save the data source itself, and hence you should use this format if everyone who will use the data source hass access to the underlying file or database defined in the connection information.

TDS 파일은 데이터 소스의 설정 정보를 저장하는데 사용되며, 실제 데이터 소스 자체를 저장하지는 않습니다. 데이터 원본 파일은 자주 사용하는 원본 데이터에 빠르게 연결하기 위한 바로 가기입니다. 이 파일 형식은 데이터 소스를 사용하는 모든 사용자가 연결된 파일 또는 데이터베이스에 액세스 할 수 있는 경우에 적합합니다.

TDS files are **shortcuts for quickly connecting to the original data** that you use often. Data source files do not contain the actual data but rather the information necessary to connect to the actual data as well as any modifications you've made on top of the actual data such as **changing default properties, creating calculated fields, adding groups, and  metadata edicts** etc so on.

TDS files are data source files which do not contain the data. but to include the connection information.
 
Tableau 데이터 소스를 나타내며, 이는 실제 데이터를 포함하지 않고 대신에 실제 데이터에 연결하고 해당 데이터 위에 만든 변경 사항을 포함하는 정보를 나타냅니다. 이 변경 사항에는 기본 속성 변경, 계산된 필드 생성 등이 포함될 수 있습니다.

<i>The following files are included in TDS</i>
- Data source type
- Connection information specified on the data source page; for sample datasever address, port, location of local file, tables
- Groups, sets, caculated fields, bins
- Default field properties; for example, number formats, aggregation, and sort order 
- ❗X Copy of any local file-based data X -> tdsx

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

Dimensions containing String and Boolean values cannot be continuous.

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

Using the **incremental fresh** option should not impact the size of the extract . it should only impact whether the refresh works by **removing the old extract completely and recreating it, or whether it adds new rows to the existing extract .**


Materializing calculations may reduce the time to open the workbook since the results of the calculations will be saved in the extract, bu will no reduce the workbook size.
  
### Data pane 
![Alt text]({{site.url}}/images/2023-11-25-tableau1/data_pane_.png){: .align-center .img-height-half}



**Dimension fields** - Fields that contain qualitative (정성적) values (such as names, dates, or geographical data). 

**Dimensions affect the level of detail in the view.**

    - Names and Categories would be mostly used as dimensions (categorical data)
    - Dates are mostly placed in dimensions by default for relational data source

**Measure fields** - Fields that contain numeric, quantitative(정량적) values can be measured. (such as Sales, profit ..)


**Calculated field** - You can create new fields in Tableau using calculations and then save them as part of your data source. 

**Sets** - Subsets of data that you define. **Sets are custom fields based on exsiting dimension** and criteria that you specify. 

**Parameters** - Values that can be used as placeholders in formulas, or replace constant values in calculated fields and filters.


### Analytics pane
![Alt text]({{site.url}}/images/2023-11-25-tableau1/analytics_pane.png){: .align-center .img-height-half}



### Rename, Alias
#### Rename
**Field names, parameters amd sets may be renamed**

Column values can be aliased but cannot be renamed. Generated fields such as measure names cannot be renamed.

#### Alias
Aliases can be applied only to **discrete dimension** values.

Aliases can be set only for discrete dimension, **not for measures, field name, or dates.** 

Aliases allow you to show more relevant or descriptive dimension values in your view

You can create aliases for members in a dimension so that their labels appear differently in the view.

Aliases can be created for the members of **discrete dimensions only**. They cannot be created for continuous dimensions, dates, or measure



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


### Field Name
we can create custom names for columns where Remote Field Name is the original name of the column whereas Field name is the custom name we created in Tableau.

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/field_name.png){: .align-center .img-height-half }  


### Date type

When the data type is mapped as numbers, text is treated as null while dates are treated as the number of days since 1/1/1900. 

If chaging type to date doesn't work, you should change the back to string and use a date parse function.

The calculation [Ship Date] - [Order Date] will return number of days between these dates.
#### Date Part & Date Value
Dates in Tableau will behave differently depending on whether they are a Datepart (blue) or a Datevalue (green). 

Date parts in Tableau are the discrete version of your date field.

Date values in Tableau are the continuous version of your date field. 

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/date_part_value.png){: .align-center }  

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/date_value_part.png){: .align-center }  

### Quick table calculation

![Alt text]({{site.url}}/images/2023-11-25-tableau1/quick_table.png){: .align-center} 

Runnung Total, Percent Difference, Difference, Percent of Total, Rank, Percentile, Moving Average

These can be calculated using : Table(across), Cell, or Specific dimensions

- Percent Difference
    - When using a Percent difference, Tableau calculates what the percent change has occured as compared to the last data value. BUT, for the first data value, there is no previous value to compare it to. Hence, **it appears as NULL**.

### Aggregate function

Sum, AVG, Median, Count, Min, Max, Percentile, Std, Variance


### Wildcard Search
Use this method to set up search criteria to automatically include tables in your union. Use the wildcard character, which is an asterisk (*), to match a sequence or pattern of characters in the Excel workbook and worksheet names, Google Sheets workbook and worksheet names, text file names, JSON file names, .pdf file names, and database table names.

검색 기준을 설정하여 자동으로 연합에 테이블을 포함할 수 있습니다. 와일드카드 문자인 별표(*)를 사용하여 Excel 워크북 및 워크시트 이름, Google Sheets 워크북 및 워크시트 이름, 텍스트 파일 이름, JSON 파일 이름, .pdf 파일 이름 및 데이터베이스 테이블 이름의 일련의 문자 또는 패턴과 일치시킬 수 있습니다.0

### Disaggregating
The level of detail is determined by the dimensions in your view

Disaggregating your data can be useful for analyzing measures that you may want to use both independently and dependently in the view. 

Disaggregating data can be useful when you are viewing data as a scatter plot. 

If you decide you want to see all of the marks in the view at the most detailed level of granularity, you can disaggregate the measures the view.


### Data granularity
Data is generated and analyzed at many different levels of granularity. Granularity is the level of detail of the data. 

The type of aggregation applied varies depending on the context of the view.

Values are always aggregated at the level of granularity of the worksheet.

### Synchronize Axis
To align the two axes in a dual axes chart to use the same scale, right-click (control-click on Mac) **the secondary axis**, and select **Synchronize Axis**. This aligns the scale of the secondary axis to the scale of the primary axis.

If you would like to change which axis is the primary, and which axis is the secondary, select the field on the Columns or Rows shelf that is the secondary, and drag it in front of the primary field on the shelf


---

## Exploring & Analyzing Data 

### Filter

#### Filter for categorical data 
![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/categorical_filter.png){: .align-center}

list filters are better for categorical data


#### Filter for quantitative data 
![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/quantitative_filter.png){: .align-center}

slider filters are greate for date and numeric values


#### Relative  date filter 
Relative date filters work relative to the anchor date. By the default this will be the **current date,** but this can be changed. 

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/related_date_filter.png){: .align-center .img-height-half }  

#### Create filter

#### Order of Operations  
![Alt text]({{site.url}}/images/2023-11-25-tableau1/order_of_operations.png){: .align-center}

#### Context filter
1) **Improve performance** - If you set a lot of filters or have a large data source, the queries can be slow. You can set one or more context filters to improve performance.

2) **Create a dependent numerical or top N filter** - You can set a context filter to include only the data of interest, and then set a numerical or top N filter. 

If you are working with a huge dataset, which of the following are strong reasons to use a context filter?
- Improve query performance
- To include only the data of interest 

#### Quick Filter 

![Alt text]({{site.url}}/images/2023-11-25-tableau1/quick_filter.png){: .align-center}

### Sort
Manual Sort lets you select a value and move it to the desired position, either by dragging it in the list or using the arrows to the right.

However, as soon as you choose some other type of sort - be it field, nested, or alphabetic, our custom created manual sort gets deleted/cleared.

### Hierachies, Group, Sets

#### Hierachies
Hierachies organize multiple dimensions based on higher and lower levels. Groups do not do this

#### Sets
Sets determine which values of a dimension are in the Top N or Bottom N on a related measure

Sets are custom fields that are **created** within Tableau Desktop **based on dimensions** from your data source. Either dimensions or measures can be used to determine what is included or excluded from a set using conditional logic

- Combined Set
You can combine two sets to compare the members. When you combine sets you create a new set containing either the combination of all members, just the members that exist in both, or members that exist in one set but not the other.


### Cluster 
Clustering is a technique in Tableau which will identify marks with similar characteristics

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

#### Text  table
- 1 or more dimensions
- 1 or more measure

#### Highlight table
- 1 or more dimensions
- 1 measure

#### Scatter plot
- 0 or more dimensions
- 2 to 4 more measure
scatter plots to visualuze relationships **between numerical variables.** 

scatter plots are used to understand the relationship **between two or more variables rather than a single measure.**

#### Bar chart
bar charts  to compare data across categories

#### Box and whisker plot 
1) The ends of the box are the upper and lower quartiles, so the box spans the interquartile range

2) The median is marked by a vertical line inside the box

3) The whiskers are the two lines outside the box that extend to the highest and lowest observations.

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/boxplot.png){: .align-center .img-width-half} 

#### Line chart
- 0 or more dimensions
- 1 or more measure

Line charts connect individual data points in a view. They provided a simple way to visualize a sequence of values and are useful when you want to see trends **over time**

line chart compare numeric data over time 

#### Pareto Chart
Pareto Chart is a type of contains both bars and line graph, where individual values are represented in **decending order by bars**, and **aecending cumulative total is represented by the line**

**On the primary axis, bars** are used to show the raw quantities for each dimension member, sorted in descending order.

**On the secondary axis, a line** graph is used to show the cumulative total in percent format.

#### Stacked bar
- 1 or more dimensions
- 1 or more measure

stacked bar charts compare numeric data over two dimension

Stacked bar charts will usually have lesser number of bars compared to a normal bar chart

To visivialize parts of a whole

To be able to visualize complex information with fewer bars / marks

#### Histogram
- 1 measure
 
A histogram is a chart that displays the shape of **distribution**. A histogram looks like a bar chart but groups values for **a continuous measure into ranges, or bins.**

histogram uses bins to subdivide a continuous measure into a discrete bins.

histogram always bins data and uses the **COUNT or COUNT DISTINCT function** to count the number of occurences within the bin.

#### Bullet chart
- 0 or more dimensions
- 2 measure


A bullet graph is a variation of a bar graph developed to replace dashboard **gauges and meters**. A bullet graph is useful for **comparing the performance of a primary measure to one or more other measures.**

bulet chart need **at least 2 measures** for creating bullet graphs.

Bullet chart combines a **barchart with a reference line** 

### Heatmap
- 1 or more dimensions
- 1 or 2 measure

By default, the shape that a Heap map uses is a "Square". 

#### Treemaps
- 1 or more dimensions
- 1 or 2 measures 

Try **adjusting size** on a tree map and you will see it is **not an option**

#### Pie chart
- 1 or more dimensions
- 1 or 2 measures

pie chart should contain **2 to 5 categories**. Anything more than that is not easy for the eyes to distinguish. 

#### Area chart
- 1 or more dimensions

Area chart is a line chart where ther area between the line and the axis are shared with a color. These charts are typically used to represent **accumulated total over time and the convertional way to display stacked lines**. 

#### Showing trends over time 
Some of the best visualization for showing trends over time are **line charts, area charts, and bar charts**

#### To visualize the distribution of a single continuous measure
Box plot, Histogram

### Bin
bin can be created on a **continuous measure or numeric dimension**

Bins can be created on dimensions (True)

Create bins from a measure you can **create a dimension**

It's sometimes useful to convert a **continuous measure**(or a **nemeric dimension**) into bins.

For creating variable sized bins we use **calculater fields**

### Reference Line
You can add a reference line at a **constant or computed value** on the axis. Computed values can be based on a specified field : **Calculated Fields, Measures**

### Trend Line

To add trend lines to a view, **both axes must contain a field that can be interpreted as a number.** However, you can add a trend line to a view of sales over time because both sales and time can be interpreted as numeric values. 

Trend lines can only be used with numeric or date fields

For multidimensional data sources, the date hierarchies actually contain strings rather than numbers. Therefore, trend lines are not allowed. Additionally, the ‘m/d/yy’ and ‘mmmm yyyy’ date formats on all data sources do not allow trend lines.

2 measures on opposing axes, or a date and a measure on opposing axes.

![Alt text]({{site.url}}/images/2023-11-25-tableau1/trend_line2.png){: .align-center} 

There are 5 types of trend lines which we can work with in Tableau

1) Linear Trend Line

2) Logarithmic Trend Line

3) Exponential Trend Line

4) Polynomial Trend Line

5) Power Model

![Alt text]({{site.url}}/images/2023-11-25-tableau1/trend_line.png){: .align-center} 


### Dashboard

#### Device options are available in the Device Preview section 

Default, Phone, Tablet, Desktop

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
- Highlight

3) Menu
- added to the tooltip and user can decided whether to run that action or not 

#### Replace a worksheet in a dashboard

Click the **swap sheet icon** next to the new worksheet on the dashboard pane

#### Layout

Tiled items don't overlap

Floating items can be layered over other objects

A bar chart can be used a floating item 

#### Size option
- Fixed Size
- Automatic 
- Range

#### Padding
Padding lets you precisely space items on dashboard, while borders and background colors let you visually highlight them. 

**Inner padding** sets the spacing between item contents and the perimeter of the border and background color; 

**outer padding** provides additional spacing beyond the border and background color.

#### Layout containers
let you group related dashboard items together so you can quickly position them. As you change the size and placement of items inside a container, other container items automatically adjust

- Horizontal layout, vertical layout

####  benefits of combining sheets using dashboards
- Provides the ability to use one sheet as a filter for other
- Helps in faster analysis
- Easier to compare visualisation side by side 

### viwer
Most viewers scan content starting at the **top left of a page**.


### workbook lebel
단일 워크시트 수준이 아니라 워크북 수준(모든 시트)에서 형식을 지정할 수 있습니다.

the best way to change the formatting at a workbook level

Choose Format from the menu on top and then specify the formatting in the new Format workbook pane

-------
                                            
## Understanding Tableau Concepts
### Measure Names
Create a view with **multiple measures on a single continuous axis**, Tableau will autimatically add Measure Names to the view.

When you add it to a view, all of the measure names appear as row or column headers in the view.

The Measure Names field contains the names of **all measures in your data**, collected into a single field with discrete values.

### Rule
A rule of thumb is to put the **most important data on the X- or Y-axis** and **less important data on color, size, or shape.**

### aggregation
By default, measures placed in a view are aggregated. Mostly you'll notice that the aggregation is SUM, **but not ALWAYS.**

The type of aggregation applied varies **depending on the context of the view.**

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


### Story

#### Story point

A story is a sheet, so the methods you use to create, name, and manage worksheets and dashboards also apply to on stories (for more details, see Workbooks and Sheets). At the same time, **a story is also a collection of sheets**, arranged in a sequence. **Each individual sheet in a story is called a story point.**

동시에 story는 시퀀스로 정렬된 시트의 컬렉션입니다. 이야기의 각 개별 시트를 'story point'라고 합니다."

![Alt text]({{site.url}}/images/2023-11-25-tableau1/story_point.png){: .align-center} 

#### Preserving the existig story point
Preserving the existig story point before modiofication - Select "**Save as New**" on the existing story point 

### Font
#### Font size

- valid ways to make the font more readable in Tableau?
    - Make the Font color sharper / darker than the background
    - Use a clear and readable font
    - Increasae the font size 

To make an axis bold, simply right click it, select format, and then click on Font to chose Bold



### Mark Card

The marks Card allow us not only to edit the Shape, Text and Color, but also to modify the Tooltip and the level of detail of the visualisation

![Alt text]({{site.url}}/images/2023-11-25-tableau1/mark_card.png){: .align-center}

### Animation
It is possible to turn on for the entire workbook at once

They can be turned on for certain worksheets only

Sequential animations take more time but make complex changes clearer by presenting them step-by-step

#### 1) Simultaneous animations

The default simulataneous animation are faster and work well when showing value changes in simpler charts and dashboards 

sequential animations will first change the size, then resort

#### 2) Sequential animations 
Sequential animations take more time but make complex changes clear by presenting them **step-by-step**

### Export

#### Image
exporting a worksheet as an image in Tableau 

- Portable Network Frapgics (PNG)
- Windows Bitmap (bmp)
- JPEG Image(*jpeg, *jpg, *jpe, *jfif)

Not Tagged Image File Format(TIFF)

#### the view / visualisations
Export the data that is used to generate the view as an Access database (Windows only) or .csv file (Mac only).


#### PDF
Exporting the visualisation gives us a **static view** of the visualisation.

When you print an individual sheet to PDF, filters in the view are not included. To show filters, create a dashboard containing the sheet and export the dashboard to PDF.

### Tableau Server
Tableau SERVER enables us to create workbooks and views, dashboards, and data sources in Tableau Desktop, and then **publish this content to our own server.**

Moreover, as a Tableau Server administrator you will control who has access to server content to help protect sensitive data. Administrators can set user permissions on projects, workbooks, views, and data sources.

###  Data Interpreter
Data Interpreter in Tableau to clean/organize your data

To clean and automatically fix the data issues in our data source

### Tableau Support
Using the support option on the Tableau website

### Tableau Reader
We can use Tableau Reader as a **static tool** to open and interact with packaged workbooks with extracted data sources that have been created in Tableau Desktop.
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

- **Filter, HIghlight, Go to URL, Go to Sheet, Change Parameter, Change Set Value**

![dashboard_option]({{site.url}}/images/2023-11-26-tableau_specialist/dashboard_option.png){: .align-center }

A URL action is a hyperlink that points to a web page, file, or other web-based resource outside of Tableau. You can use URL actions to create an email or link to additional information about your data. 

prefixes - HTTPS

To customize links based on the data in your dashboard, you can automatically enter field values as **parameter** in URLs.

### Dashboard object 
![dashboard_option]({{site.url}}/images/2023-11-26-tableau_specialist/dash_board.png){: .align-center }

### Proportional brushing
Set action can use used to achive proportional brushing


### 2020.1 version

#### 2020.1 version the new features 

1) Viz animation
2) Dynamic Parameter
3) Buffer Calculations

Set controls are new feature introduced in 2020.2 version

### View Data 
The View Data window displays as much of the data as possible by default, up to 10,000 rows. This can be increased though, if you wish to.

### Highlight Container

#### Icon

Toggle the highlighting on/off

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/highlighting.png){: .align-center} 

----

## How to do it


###  valid way(s) to make either of Rows or Columns Bold without affecting the other?
- Choose **Format** from Menu bar, select Rows or Columns, and then select Bold under the header option.

- Right-click on Rows or Columns, and choose **format**. in the Font option click on Bold

###  valid ways to italicize Tooltip content in Tableau?

- Click on Format in the Menu bar, Choose Font, and then edit the tooltip options to italiciz the font
- Click on Tolltip in the Marks card, select the text, and then use the Italic option
- Click on Worksheet in the Menu bar, select tooltip, and then use the italics option

### valid ways to Bold the Tooltip content in Tableau?
- Click on Worksheet in the Menu bar, followed by Tooltip and select the bold option
- Click on Tooltip in the Marks card, and select bold.
- Right click, click format and then under the default worksheet formatting, choose Tooltip and make it bold.

### format an axis as Bold
By right click it, select **format**, and then click on Font to choose Bold:

### To change the font size

1) Click Text on the *Marks card*

2) On the **format** menu, select Font and then make the change on the Pan dropdown

### Change tooltip font color 
1) Right-click on the view, select "**Format**" and select the dropdown next to tooltip. Then select the color

2) Click on the tooltip button in the Marks area, hilight the text, and select the desired color using the dropdown.


### Animation

1) Choose Format > Animations.

2) If you want to animate every sheet, under Workbook Default, click On. Then do the following:

For Duration, choose a preset, or specify a custom duration of up to 10 seconds.

For Style, choose **Simultaneous to play all animations at once** or **Sequential to fade out marks, move and sort them, and then fade them in.**

3) To override workbook defaults for a particular sheet, change the settings under Selected Sheet.

![Alt text]({{site.url}}/images/2023-11-25-tableau1/animation.png){: .align-center} 


### format numbers in Tableau
Right-click a measure or axis in the view and select Format. Then in the Format pane, click the Numbers drop-down menu.

![Alt text]({{site.url}}/images/2023-11-26-tableau_specialist/number_format.png){: .align-center} 

### change the Default Aggregation for a measure in
By right-click the measure -> Default properties and choosing Aggregation

### correct ways to define a join in Tableau version 2020.3 and above?
Right-click a logical table and click on **open** to go to the Join/Union canvas in the physical layer and add joins or unions.

Double-click a logical table to the Join/Union canvas in the physical and add joins or union

### change the default Tableau repository location?
By clicking on File -> Repository Location and choosing a new location

###  Geographic role
From the data pane, simply right click on the dimension, choose geographic role, and then select the appropriate role 

### Dynamic set
-  To create a dynamic set

    - 1) In the Data pane, right click a dimension and select Create > Set

    - 2) In the Create Set dialog box, configure your set. You can configure your set using the following tabs

![Alt text]({{site.url}}/images/2023-11-25-tableau1/set.png){: .align-center}

### Export data
1) In Tableau Desktop, select Worksheet > Export > Data.

2) Select a location and type a name for your Access database or .csv file.

3) Click Save.

4) If you're on Windows, the Export Data to Access dialog box displays to give you the option to immediately use the new Access database and continue working in Access without interrupting your work flow.

### Create TDS file
1) On Data pane, right-click the data source and the select Add to Saved Data Sources.

2) Selcet Data on the toolbar, selecting the data source, and then selecting Add to Saved Data Source. 

#### CSV file
1) On the Data Source page, select Data. Then select Export Data to CSV

2) Right-click the data source name in the data pane, then select "Export data to CSV"

### Union
1) On the datasource page, drag the first table into the canvas. Then drag a second table onto the canvas, **below the first table**.

2) On the data source page, double-check the **"New union" icon**. A Union menu will appear, Drag both tables to the Union Menu, then click OK.

### Total 
1) On the Analysis Pnae, drag Totals into the view and drop on the [ex: Row Grand Total area]

2) FTeom the Analysis Tab in the Menu on top, then Totals and Add [ex: Row Grand Total area]

### Group
1) Marks 2) Labels 3) Dimensions shelf

### Legend 
show the color legend

1) Select Analysis>Legends>Color Legend

2) Select Worksheet>Show Cards>Reset Cards

3) Right-click in the space below the marks card and select Legend>Color Legend

#### Show mark label

1) Click on Show Mark Labels Icon in Toolbar

2) Drag the measure to the Text label in the Marks Card

3) Click on Analysis -> Show mark labels from the Tableau menu bar 

### Add a reference line
On the analytics pane, click on reference line and drag into the view.

On the Show Me menu, select bullet graph (bullet graphes include reference line)

### Dashboard device option
Select Device Preview, then select specific(ex Phone) device type, then click the button labeled "Add specific(ex Phone) Layout"

### Copy Image
1) By clicking on Worksheet in the Tableau Main Menu above, and choosing Copy->Image

2) By right clicking on the worksheet visualisation and selecting Copy -> Image

### valid ways to export a dashboard with multiple visualisations as an image
- Click on Dashboard in the Menu bar followed by copy Image