---
title: "SQL: Mobile Manufacturer Data Analysis"
excerpt: "Analysis of Manufacturer's data for various products"
permalink: /Sports-Analysis-Exce
# classes: wide
toc: true
toc_label: "Contents"
toc_sticky: true
header:
  # image: /assets/images/unsplash-gallery-image-1.jpg
  teaser: assets/images/Excel/Teasers/Sports_Data/Teaser.png
sidebar:
  - title: "Sports Dataset Cleaning"
    image: /assets/images/SQL/SQL_Logo.png
    image_alt: "logo"
    text: "Usage of Index(Match()) among others"
  # - title: "In page Title 2 of Another"
  #   text: "In pageText 2 of Another"


# gallery:
#   - url: assets/images/PowerBI/Retail_Dashboard.png
#     image_path: assets/images/PowerBI/Retail_Dashboard.png
#     alt: "placeholder image 1"
#   - url: assets/images/PowerBI/Retail_Dashboard.png
#     image_path: assets/images/PowerBI/Retail_Dashboard.png
#     alt: "placeholder image 2"
#   - url: assets/images/PowerBI/Retail_Dashboard.png
#     image_path: assets/images/PowerBI/Retail_Dashboard.png
#     alt: "placeholder image 3"
---
<!-- 
## Excel Workbook

Live Excel Workbook (View Workbook in <a href="https://onedrive.live.com/view.aspx?resid=CEA95E92A534446E!1290&ithint=file%2cxlsx&authkey=!AImokmU1ZLtbdfw"> New Tab</a>) :

<iframe title="E-commerce Case Study" width="745" height="430" src="https://onedrive.live.com/view.aspx?resid=CEA95E92A534446E!1290&ithint=file%2cxlsx&authkey=!AImokmU1ZLtbdfw" frameborder="0" allowFullScreen="true"></iframe>

## Gallery

{% include gallery caption="This is a sample gallery to go along with this case study." %} -->



## Mobile Manufacturer EDA Assignment by AnalytixLabs Noida

> #### Q7. List if there is any model that was in the top 5 in terms of quantity, simultaneously in 2008, 2009 and 2010


> A computer program can easily produce gibberish - especially if it has been provided with garbage beforehand. This program does something a little different. It takes a block of text as input and works out the proportion of characters within the text according to a chosen order. For example, an order of 2 means the program looks at pairs of letters, an order of 3 means triplets of letters and so on. The software can regurgitate random text that is controlled by the proportion of characters. The results can be quite surprising.

```
SOLUTION:
```

<script src="https://gist.github.com/bhanu-thakur/b420a086fb72980a00798ece267f2651.js"></script>
  


```
Q10. Find top 100 customers and their average spend, average quantity by each year. Also find the percentage of change in their spend.
```

<script src="https://gist.github.com/bhanu-thakur/07d81741e2106db4cdb1cc1a5eb4169c.js"></script>
  
>Output


| Customer_Name     | Year_of_Purchase Average_Spend | Change | percent_change | Average_Quantity |   |
|-------------------|--------------------------------|--------|----------------|------------------|---|
| Alease Buemi      | 2007                           | 436.00 | NULL           | 0.00 %           | 1 |
| Angella Cetta     | 2003                           | 170.00 | NULL           | 0.00 %           | 1 |
| Angella Cetta     | 2004                           | 282.50 | 112.50         | 66.17 %          | 1 |
| Angella Cetta     | 2007                           | 300.00 | 17.50          | 6.19 %           | 1 |
| Angella Cetta     | 2010                           | 173.00 | -127.00        | -42.33 %         | 1 |
| Arlene Klusman    | 2004                           | 665.00 | NULL           | 0.00 %           | 1 |
| Arlene Klusman    | 2006                           | 415.00 | -250.00        | -37.59 %         | 1 |
| Arlene Klusman    | 2008                           | 347.00 | -68.00         | -16.38 %         | 1 |
| Arlene Klusman    | 2010                           | 476.00 | 129.00         | 37.17 %          | 1 |
| Arlette Honeywell | 2004                           | 189.00 | NULL           | 0.00 %           | 1 |
| Arlette Honeywell | 2005                           | 269.00 | 80.00          | 42.32 %          | 1 |
| Arlette Honeywell | 2006                           | 233.00 | -36.00         | -13.38 %         | 1 |
| Arlette Honeywell | 2007                           | 76.67  | -156.3334      | -67.09 %         | 1 |
| Arlette Honeywell | 2008                           | 502.00 | 425.3334       | 554.78 %         | 1 |
| Bobbye Rhym       | 2005                           | 319.00 | NULL           | 0.00 %           | 1 |


```
Q9. Show the manufacturers that sold cellphones in 2010 but did not in 2009.
```

<script src="https://gist.github.com/bhanu-thakur/e14cd98e3dbdd845762a7974716c092b.js"></script>
  
>Output


| Question                                      | Answer |
|-----------------------------------------------|--------|
| Company that sold in 2010 but not in 2009 HTC | Apple  |

```
Q8. Show the manufacturer with the 2nd top sales in the year of 2009 and the manufacturer with the 2nd top sales in the year of 2010.
```

<script src="https://gist.github.com/bhanu-thakur/d527578c481dff91eeebfb645f03638d.js"></script>
  
>Output


| Manufacturer_Name | State   | Total_Quantity_Sold |
|-------------------|---------|---------------------|
| Samsung           | Arizona | 18                  |


```
Q7. List if there is any model that was in the top 5 in terms of quantity, simultaneously in 2008, 2009 and 2010
```
<script src="https://gist.github.com/bhanu-thakur/516f36b293f850757896d3d26ddc03cc.js"></script>
  
>Output


| Year_Sales | Manufacturer_Name | Ranking |
|------------|-------------------|---------|
| 2010       | Apple             | 2       |
| 2009       | Samsung           | 2       |


```
Q6. List the names of the customers and the average amount spent in 2009, where the average is higher than 500
```

<script src="https://gist.github.com/bhanu-thakur/cd8e23262723d4e1974959b0b7c46bc7.js"></script>
  
>Output


| Customer_Name    | Average_Sales |
|------------------|---------------|
| Laurel Reitler   | 1528.00       |
| Lettie Isenhower | 870.00        |
| Moon Parlato     | 823.50        |
| Danica Bruschke  | 760.00        |
| Celeste Korando  | 613.00        |
| Shawna Palaspas  | 569.00        |



```
Q5. Find out the average price for each model in the top5 manufacturers in terms of sales quantity and order by average price.
```

<script src="https://gist.github.com/bhanu-thakur/e885e40fc60e630861714950d43b68f0.js"></script>
  
>Output


| Top_5_Manufacturers | Model_Name | Total_Sales | Quantity_Sold Avg_price_per_quantity |        |
|---------------------|------------|-------------|--------------------------------------|--------|
| Samsung             | Galaxy S8  | 3325.00     | 5                                    | 665.00 |
| Apple               | iPhone 7   | 8872.00     | 16                                   | 554.50 |
| Apple               | iPhone 6   | 8561.00     | 17                                   | 503.59 |
| One Plus            | OnePlus 6T | 6477.00     | 13                                   | 498.23 |
| Apple               | iPhone 5   | 3673.00     | 8                                    | 459.13 |



```
Q4. Show the cheapest cellphone (Output should contain the price also)
```

<script src="https://gist.github.com/bhanu-thakur/6f27f6d0e484a397a1c693ce90e6edb7.js"></script>
  
>Output


| Manufacturer_Name | Model_Name | Unit_price |
|-------------------|------------|------------|
| Nokia             | 3210       | 14.00      |




```
Q3. Show the number of transactions for each model per zip code per state.
```

<script src="https://gist.github.com/bhanu-thakur/e62fc0e27bb6f784031ad8ca4d5f74a5.js"></script>
  
>Output


| Model_Name   | ZipCode | State    | Num_of_Transactions |
|--------------|---------|----------|---------------------|
| 3310 (3330)  | 21163   | Maryland | 1                   |
| 5230         | 21163   | Maryland | 3                   |
| 6230 (6233)  | 21163   | Maryland | 1                   |
| C139         | 21163   | Maryland | 2                   |
| Droid Bionic | 21163   | Maryland | 2                   |



```
Q2. What state in the US is buying the most 'Samsung' cell phones?
```
<script src="https://gist.github.com/bhanu-thakur/88677570f9b459a535fdf0d7624fee8c.js"></script>
  
>Output


| Manufacturer_Name | State   | Total_Quantity_Sold |
|-------------------|---------|---------------------|
| Samsung           | Arizona | 18                  |



```
Q1. List all the states in which we have customers who have bought cellphones from 2005 till today.
```

<script src="https://gist.github.com/bhanu-thakur/80a38380744d2e7d3ac7c763fc6178e6.js"></script>
  
>Output


| State             |
|-------------------|
| Arizona           |
| California        |
| Delhi             |
| Haryana           |
| Karnataka         |
| Maharashtra       |
| Maryland          |