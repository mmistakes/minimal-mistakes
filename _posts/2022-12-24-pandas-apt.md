---
layout: single
title: "Pandas Apartment Sale Price Data 2"
categories: pandas
tag: [python, pandas, data_visualization]
author_profile: false
---

## Data Management and Visualization through Pandas

Today, I continued learning data management and visualization through Pandas by using the public data of the prices of the korean apartments.
Through this practice, I learned many different functions to manage data through Pandas.

### What I got to do today

I started by grouping data through pivot table.
```python
import pandas as pd
pd.pivot_table(my_data, index=["region"], values=["price_by_area"], aggfunc="mean")
# my_data.pivot_table(index=["region"], values=["price_by_area"], aggfunc="mean") works as well
```
And I learned how to visualize the data into various types of graphs:
```python
# Line graph
g = my_data.groupby(["region"])["price_by_area"].mean().sort_values(ascending=False) # descending order
g.plot()

# Bar graph
g.plot.bar(rot=0, figsize=(10, 3)) # rot: tilting labels, figsize: adjust width and height of graph

# Box plot
my_data.pivot_table(index="month", columns="year", values="price_by_area").plot.box()

# Histogram
my_data["price_by_area"].hist(bins=10)
```
These graphs can be more easily made using Seaborn
```python
import seaborn as sns
%matplotlib inline

# Bar plot
sns.barplot(data = my_data, x="region", y="price_by_area", ci="sd") # ci: confidence interval

# Subplot using catplot
sns.catplot(data = my_data, x="region", y="price_by_area", kind="bar", col="region", col_wrap=4)

# Line plot
import matplotlib.pyplot as plt
plt.rc("font", family="Malgun Gothic")

sns.lineplot(data = my_data, x="region", y="price_by_area", hue="region") # hue: gives different color based on the category
plt.legend(bbox_to_anchor=(1.02, 1), loc=2, borderaxespad=0.) # Putting legend outside the graph

# Subplot using relplot
sns.relplot(data = my_data, x="region", y="price_by_area", kind="line", col="region", col_wrap=4)

# Box plot
sns.boxplot(data = my_data, x="region", y="price_by_area")
sns.boxenplot(data = my_data, x="region", y="price_by_area") # more detail version of box plot

# Violin plot
sns.violinplot(data = my_data, x="region", y="price_by_area") # more detail version of boxenplot

# Scatter plot
sns.lmplot(data = my_data, x="region", y="price_by_area", hue="area", col="area", col_wrap=3)
  # lmplot shows the regression line of the scatter plot
  
# Swarm plot
sns.swarmplot(data = my_data, x="region", y="price_by_area", hue="area")
  # Not suitable when there's a lot of data
  
# Distplot
price = my_data.loc[my_data["price_by_area"].notnull(), "price_by_area"]   # Only collect non-null data for distplot
sns.distplot(price)

# Ridge plot
g = sns.FacetGrid(my_data, row="region",
                  height=1.7, aspect=4,)
g.map(sns.kdeplot, "price_by_area");

# Pair plot
my_data_notnull = my_data.loc[my_data["price_by_area"].notnull(), 
                          ["year", "month", "price_by_area", "region", "area"]]
sns.pairplot(df_last_notnull, hue="area")
  # shows different types of graphs altogether

# Heat map
t = my_data.pivot_table(index="year", columns="region", values="price_by_area").round()
sns.heatmap(t, cmap="Blues", annot=True, fmt=".0f") # cmap: color, fmt: format of label
```
And lastly, I learned to merge two data together.

Assuming the two data having the same column:
```python
combined_data = pd.concat([data_1, data_2])
```

I really learned a lot about visualizing data by various types of graphs here. I will get more used to these by trying more practice with other public data.