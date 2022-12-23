---
layout: single
title: "Pandas 1"
categories: pandas
---

## My First Use of Pandas

Today, I got to experience how to work with pandas from an online class. From the class, I got to use the public data of the prices of the korean apartments. Because pandas is basically a software for Python, I recognized same functions that are used to analyze data, but  it was a new experience to actually get to manage data through Python.



### What I got to do today

I basically got to upload the data to Jupyter Notebook and learned how to observe the data along with making some changes from the data.

So I imported pandas through:

```python
import pandas as pd
```

and I loaded the data by:

```python
my_data = pd.read_csv("data/"data_name.csv", encoding="cp949")
my_data
```

And these are some basic functions I got to use today:

```python
# Seeing the information of the data
my_data.info()

# Seeing first nth element of data
my_data.head()

# Seeing last nth element of data
my_data.tail()

# Seeing an empty or null data
my_data.isnull()

# Changing object type to numeric type 
pd.numeric(arg, errors, downcast)

# General description of data, statistics
my_data.describe()

# Erasing column
my_data.drop(["column"], axis = 1)

# Grouping data and get mean value
my_data.groupby(["Column_A"])["Column_B"].mean()

# Grouping data and seeing it in a chart form
my_data.groupby(["Column_A"])["Column_B"].mean().unstack()

# Transposing the column and row
my_data.groupby(["Column_A"])["Column_B"].mean().unstack().T
```

