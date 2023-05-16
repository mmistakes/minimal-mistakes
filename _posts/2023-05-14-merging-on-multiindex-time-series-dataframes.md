# Merging a time series dataframe on a multi index

In my current role I am frequently (pun intended!) working with time series data.
I trail, validate, build and deploy machine learning models to forecast financial time series data.

## It is all about the index

It is best practice to make use of an [multiindex](https://en.wikipedia.org/wiki/Multi-index_notation) when working with big time series dataframes.
My usual tool of use is [pandas](tbd.).
Often enough you get your data from some data source like SQL or an API. The data in question can often not be used in testing purposes (for confidentiallity purposes ofor instance).

Thus every good data scientist has some sort of a helper function to create a test data frame
Especially when you thrive in [TDD](https://en.wikipedia.org/wiki/Test-driven_development).

One function I almost always come back to is posted below.



```python
import pandas as pd
import numpy as np

def dfTS_gen(nsize, ncat, ncols, start="2018-01-01", freq="D"):
    # generate data
    list_df = []
    for i in range(ncat):
        df = pd.DataFrame()
        df["date"] = pd.date_range(start, periods=nsize, freq=freq)
        df["cat0"] = i
        df["cat1"] = "test"
        for j in range(ncols):
            df[f"col{j}"] = np.linspace(0, nsize-1, nsize)

        df.set_index(["date", "cat0", "cat1"], inplace=True)
        list_df.append(df)

    return pd.concat(list_df).sort_index()
```

The function takes four arguments: `nsize, ncat, ncols, freq`. `nsize` sets the number of total observation, i.e. the _size_ of the dataframe.
`ncat` defines the number of different categorical values (which will also be indexed by!).
`ncols` sets the horizontal length, that means _create n number of columns in the new data frame_.
The `freq` parameter defines the frequency of the main index column _date_. For instance: Possible parameters are monthly (set `freq="M"` or `freq="MS"`), hourly (set `freq="H"`). The default is daily data with `freq="D"`.

See an example. I create a dataframe that is 31 days long, with 3 categories and 10 columns.


```python
df = dfTS_gen(31, 3, 10)
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th></th>
      <th>col0</th>
      <th>col1</th>
      <th>col2</th>
      <th>col3</th>
      <th>col4</th>
      <th>col5</th>
      <th>col6</th>
      <th>col7</th>
      <th>col8</th>
      <th>col9</th>
    </tr>
    <tr>
      <th>date</th>
      <th>cat0</th>
      <th>cat1</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">2018-01-01</th>
      <th>0</th>
      <th>test</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">2018-01-02</th>
      <th>0</th>
      <th>test</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <th>...</th>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">2018-01-30</th>
      <th>1</th>
      <th>test</th>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-31</th>
      <th>0</th>
      <th>test</th>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
      <td>30.0</td>
    </tr>
  </tbody>
</table>
<p>93 rows × 10 columns</p>
</div>



I populated the dataframe with a linear space (using numpy) to have some linear data to work with.

## How to correctly loc on a multiindex

Once you start working with a multiindexed time series you will come across the problem to select (or look at) a subset of the data.
How to do that? The answer is simple: `pd.IndexSlice` to the rescue.

Once you have mastered that handy tool, working with multiindexed dataframes becomes really easy.
Say we want to loc onto the full data for the categorical 0 (i.e. 2nd index) .


```python
idx = pd.IndexSlice
df.loc[idx[:, 0, "test"]].head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>col0</th>
      <th>col1</th>
      <th>col2</th>
      <th>col3</th>
      <th>col4</th>
      <th>col5</th>
      <th>col6</th>
      <th>col7</th>
      <th>col8</th>
      <th>col9</th>
    </tr>
    <tr>
      <th>date</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2018-01-01</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2018-01-02</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2018-01-03</th>
      <td>2.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>2018-01-04</th>
      <td>3.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>2018-01-05</th>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
    </tr>
  </tbody>
</table>
</div>



You could also loc the datetime with the same idea. Let's say we want the data for all 1 level categoricals for the 4 days January 10th to 13th:


```python
df.loc[idx["2018-01-10":"2018-01-13", :, "test"]]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th></th>
      <th>col0</th>
      <th>col1</th>
      <th>col2</th>
      <th>col3</th>
      <th>col4</th>
      <th>col5</th>
      <th>col6</th>
      <th>col7</th>
      <th>col8</th>
      <th>col9</th>
    </tr>
    <tr>
      <th>date</th>
      <th>cat0</th>
      <th>cat1</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">2018-01-10</th>
      <th>0</th>
      <th>test</th>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-11</th>
      <th>0</th>
      <th>test</th>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-12</th>
      <th>0</th>
      <th>test</th>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-13</th>
      <th>0</th>
      <th>test</th>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
      <td>12.0</td>
    </tr>
  </tbody>
</table>
</div>



## How to merge onto a multiindex dataframe

Now, I am working regularly with time series data in the [predictive analytics space](https://online.hbs.edu/blog/post/predictive-analytics).
Especially in Forecasting you often end up creating a forecast by running some script or project that returns a _future dataframe_.
That means the date index lies (often) in the future.
If you run a validation you would cut of the dataframe in the past and create forecasts in the (real) past but with a datetime index that is not in the train dataframe.
A typical business application is to compare the validation dataframe with the actual values from the train.
It is important to understand how [cross-validation techniques for time series works](https://robjhyndman.com/hyndsight/tscv/).
See the illustration below, to give you an idea:

![TS Cross Validation](https://robjhyndman.com/files/cv1-1.png)

This is the moving window technique!

1. Pick a start date: Cut the dataframe at a datetime in the past, e.g. using `df.query("date < '2018-01-05')` or the `pd.IndexSlice` functionality above (when working with multiindexed time series data).
2. Create your forecasts and return the dataframe with the datetime index (or column).
3. Merge the dataframe and calculate the forecasting error from the validation values and actual values.

Let's create a hypothetical dataframe with validation data now. Remember we created `df` with a length of 31 rows (full Jan. of 2018.).
I will create a shorter dataframe that overlaps (for merging purposes) with a different start date. Also I manipulate the data and multiply it by 100 to distinguish it from the training dataframe:


```python
df_val = dfTS_gen(15, 3, 1, start="2018-01-20")
df_val["col0"] = df_val["col0"] * 100
df_val
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th></th>
      <th>col0</th>
    </tr>
    <tr>
      <th>date</th>
      <th>cat0</th>
      <th>cat1</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">2018-01-20</th>
      <th>0</th>
      <th>test</th>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>0.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-21</th>
      <th>0</th>
      <th>test</th>
      <td>100.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>100.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>100.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-22</th>
      <th>0</th>
      <th>test</th>
      <td>200.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>200.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>200.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-23</th>
      <th>0</th>
      <th>test</th>
      <td>300.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>300.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>300.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-24</th>
      <th>0</th>
      <th>test</th>
      <td>400.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>400.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>400.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-25</th>
      <th>0</th>
      <th>test</th>
      <td>500.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>500.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>500.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-26</th>
      <th>0</th>
      <th>test</th>
      <td>600.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>600.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>600.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-27</th>
      <th>0</th>
      <th>test</th>
      <td>700.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>700.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>700.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-28</th>
      <th>0</th>
      <th>test</th>
      <td>800.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>800.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>800.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-29</th>
      <th>0</th>
      <th>test</th>
      <td>900.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>900.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>900.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-30</th>
      <th>0</th>
      <th>test</th>
      <td>1000.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>1000.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>1000.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-01-31</th>
      <th>0</th>
      <th>test</th>
      <td>1100.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>1100.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>1100.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-02-01</th>
      <th>0</th>
      <th>test</th>
      <td>1200.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>1200.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>1200.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-02-02</th>
      <th>0</th>
      <th>test</th>
      <td>1300.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>1300.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>1300.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-02-03</th>
      <th>0</th>
      <th>test</th>
      <td>1400.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>1400.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>1400.0</td>
    </tr>
  </tbody>
</table>
</div>



The dataframe does indeed overlap with the training dataframe, named `df` in this notebook.
Let's see how we can merge them. If we simply run the default `pd.DataFrame.merge()` function it will not work as what you most likely intend.


```python
df.merge(df_val)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>col0</th>
      <th>col1</th>
      <th>col2</th>
      <th>col3</th>
      <th>col4</th>
      <th>col5</th>
      <th>col6</th>
      <th>col7</th>
      <th>col8</th>
      <th>col9</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>



We see the index vanished!! We lose so much information.
Also, we need to be aware, that we try to merge on the same column `col0`.

In practice you would most likely have another column that you want to _add to the train dataframe_.
Let's first check how to correctly solve the first case.

### Merging another dataframe with the same column


```python
df_merge_same_col = df.merge(df_val, how="outer", left_on=["date", "cat0", "cat1"], right_on=["date", "cat0", "cat1"])
df_merge_same_col

```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th></th>
      <th>col0_x</th>
      <th>col1</th>
      <th>col2</th>
      <th>col3</th>
      <th>col4</th>
      <th>col5</th>
      <th>col6</th>
      <th>col7</th>
      <th>col8</th>
      <th>col9</th>
      <th>col0_y</th>
    </tr>
    <tr>
      <th>date</th>
      <th>cat0</th>
      <th>cat1</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">2018-01-01</th>
      <th>0</th>
      <th>test</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">2018-01-02</th>
      <th>0</th>
      <th>test</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>...</th>
      <th>...</th>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">2018-02-02</th>
      <th>1</th>
      <th>test</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1300.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1300.0</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-02-03</th>
      <th>0</th>
      <th>test</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1400.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1400.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1400.0</td>
    </tr>
  </tbody>
</table>
<p>102 rows × 11 columns</p>
</div>



This looks quite good. Remeber the SQL merging types. Also quite helpful to refer to [pandas docs](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.merge.html).

Lets discet the code:
1. Use `how=outer` as merging strategy.
2. Specify the index to merge on as a list (since it is a multiindex).

You see that for the default set up will rename the overlapping columns with a suffix: x (old) and y (new).

Let's now look at a overlapping entry (using the `idx` Pandas IndexSlice object defined above):


```python
df_merge_same_col.loc[idx["2018-01-30", :, :]]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>col0_x</th>
      <th>col1</th>
      <th>col2</th>
      <th>col3</th>
      <th>col4</th>
      <th>col5</th>
      <th>col6</th>
      <th>col7</th>
      <th>col8</th>
      <th>col9</th>
      <th>col0_y</th>
    </tr>
    <tr>
      <th>cat0</th>
      <th>cat1</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <th>test</th>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>1000.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>1000.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>1000.0</td>
    </tr>
  </tbody>
</table>
</div>



And we find our 1000 for all the `cat0` and `cat1` entries. Note, that the date index gets omitted by using loc.

### Merging another dataframe with a new column onto an old column

Sometimes you want to append the findings from your validation dataframe (here `df_val`) to the old dataframe (i.e. `df`).
This is to append values from `col0` in `df_val` to `col0` in `df`.

For this we will need the pandas functionality [pd.concat](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.concat.html#pandas.concat).
Beautifully this will work out of the box and gives us what we need (even with the default arguments, note the `join='outer'`):


```python
pd.concat([df, df_val])
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th></th>
      <th>col0</th>
      <th>col1</th>
      <th>col2</th>
      <th>col3</th>
      <th>col4</th>
      <th>col5</th>
      <th>col6</th>
      <th>col7</th>
      <th>col8</th>
      <th>col9</th>
    </tr>
    <tr>
      <th>date</th>
      <th>cat0</th>
      <th>cat1</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">2018-01-01</th>
      <th>0</th>
      <th>test</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">2018-01-02</th>
      <th>0</th>
      <th>test</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <th>...</th>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">2018-02-02</th>
      <th>1</th>
      <th>test</th>
      <td>1300.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>1300.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2018-02-03</th>
      <th>0</th>
      <th>test</th>
      <td>1400.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <th>test</th>
      <td>1400.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <th>test</th>
      <td>1400.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<p>138 rows × 10 columns</p>
</div>



## Conculsion

Merging and concatenating can quite a dauting field, especially for time series data.
This short overview is hopefully helpful to get a more stabel foot down in this area.
I have been working with time series for years now and find myself often reading the pandas docs for help.
Thus, I can highly recommend the [article about merging dataframe](https://pandas.pydata.org/pandas-docs/stable/user_guide/merging.html) in the offical pandas docs.
