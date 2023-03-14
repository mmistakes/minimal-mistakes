---
layout: single
title:  "Machine Learning 2"
categories: coding
tag: [python, machine_learning]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---
## Clustering
<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>


# Clustering



```python
# import libraries
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
```


```python
# import data
data = pd.read_csv('./data/boston.csv')
```


```python
data.head()
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
      <th>crim</th>
      <th>zn</th>
      <th>indus</th>
      <th>chas</th>
      <th>nox</th>
      <th>rm</th>
      <th>age</th>
      <th>dis</th>
      <th>rad</th>
      <th>tax</th>
      <th>ptratio</th>
      <th>b</th>
      <th>lstat</th>
      <th>medv</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.00632</td>
      <td>18.0</td>
      <td>2.31</td>
      <td>0.0</td>
      <td>0.538</td>
      <td>6.575</td>
      <td>65.2</td>
      <td>4.0900</td>
      <td>1.0</td>
      <td>296.0</td>
      <td>15.3</td>
      <td>396.90</td>
      <td>4.98</td>
      <td>24.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.02731</td>
      <td>0.0</td>
      <td>7.07</td>
      <td>0.0</td>
      <td>0.469</td>
      <td>6.421</td>
      <td>78.9</td>
      <td>4.9671</td>
      <td>2.0</td>
      <td>242.0</td>
      <td>17.8</td>
      <td>396.90</td>
      <td>9.14</td>
      <td>21.6</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.02729</td>
      <td>0.0</td>
      <td>7.07</td>
      <td>0.0</td>
      <td>0.469</td>
      <td>7.185</td>
      <td>61.1</td>
      <td>4.9671</td>
      <td>2.0</td>
      <td>242.0</td>
      <td>17.8</td>
      <td>392.83</td>
      <td>4.03</td>
      <td>34.7</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.03237</td>
      <td>0.0</td>
      <td>2.18</td>
      <td>0.0</td>
      <td>0.458</td>
      <td>6.998</td>
      <td>45.8</td>
      <td>6.0622</td>
      <td>3.0</td>
      <td>222.0</td>
      <td>18.7</td>
      <td>394.63</td>
      <td>2.94</td>
      <td>33.4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.06905</td>
      <td>0.0</td>
      <td>2.18</td>
      <td>0.0</td>
      <td>0.458</td>
      <td>7.147</td>
      <td>54.2</td>
      <td>6.0622</td>
      <td>3.0</td>
      <td>222.0</td>
      <td>18.7</td>
      <td>396.90</td>
      <td>5.33</td>
      <td>36.2</td>
    </tr>
  </tbody>
</table>
</div>


## 1. Find similar group data by clustering



```python
# Delete unnecessary data column
del data['chas']
medv = data['medv']
del data['medv']
```


```python
data.head()
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
      <th>crim</th>
      <th>zn</th>
      <th>indus</th>
      <th>nox</th>
      <th>rm</th>
      <th>age</th>
      <th>dis</th>
      <th>rad</th>
      <th>tax</th>
      <th>ptratio</th>
      <th>b</th>
      <th>lstat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.00632</td>
      <td>18.0</td>
      <td>2.31</td>
      <td>0.538</td>
      <td>6.575</td>
      <td>65.2</td>
      <td>4.0900</td>
      <td>1.0</td>
      <td>296.0</td>
      <td>15.3</td>
      <td>396.90</td>
      <td>4.98</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.02731</td>
      <td>0.0</td>
      <td>7.07</td>
      <td>0.469</td>
      <td>6.421</td>
      <td>78.9</td>
      <td>4.9671</td>
      <td>2.0</td>
      <td>242.0</td>
      <td>17.8</td>
      <td>396.90</td>
      <td>9.14</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.02729</td>
      <td>0.0</td>
      <td>7.07</td>
      <td>0.469</td>
      <td>7.185</td>
      <td>61.1</td>
      <td>4.9671</td>
      <td>2.0</td>
      <td>242.0</td>
      <td>17.8</td>
      <td>392.83</td>
      <td>4.03</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.03237</td>
      <td>0.0</td>
      <td>2.18</td>
      <td>0.458</td>
      <td>6.998</td>
      <td>45.8</td>
      <td>6.0622</td>
      <td>3.0</td>
      <td>222.0</td>
      <td>18.7</td>
      <td>394.63</td>
      <td>2.94</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.06905</td>
      <td>0.0</td>
      <td>2.18</td>
      <td>0.458</td>
      <td>7.147</td>
      <td>54.2</td>
      <td>6.0622</td>
      <td>3.0</td>
      <td>222.0</td>
      <td>18.7</td>
      <td>396.90</td>
      <td>5.33</td>
    </tr>
  </tbody>
</table>
</div>



```python
# import library
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
```


```python
# Normalization
# Create Object
scaler = StandardScaler()
```


```python
# Teach data and trasnform
scaler.fit(data)
scaler_data = scaler.transform(data)
```


```python
pca = PCA(n_components = 2)
```


```python
pca.fit(scaler_data)
```

<pre>
PCA(n_components=2)
</pre>

```python
pca.transform(scaler_data)
```

<pre>
array([[-2.09723388, -0.72017904],
       [-1.456003  , -0.94769427],
       [-2.07345404, -0.62533575],
       ...,
       [-0.31128314, -1.39524641],
       [-0.26939083, -1.35059004],
       [-0.12452556, -1.34293829]])
</pre>

```python
# Transform to DataFrame
data2 = pd.DataFrame(data = pca.transform(scaler_data), columns = ['pc1', 'pc2'])
```


```python
data2.head()
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
      <th>pc1</th>
      <th>pc2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-2.097234</td>
      <td>-0.720179</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-1.456003</td>
      <td>-0.947694</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-2.073454</td>
      <td>-0.625336</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-2.610161</td>
      <td>-0.134044</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-2.456866</td>
      <td>-0.229919</td>
    </tr>
  </tbody>
</table>
</div>


## 2. How should we cluster these data?

- KMeans(n_cluster = k) : create object to make k clusters

- KMeans.fit(): teach data

- KMeans.inertia_: check the cohesion of KMeans

                 : if cohesion -> low, clustering is good

- KMeans.predict(data): Transform data with studied data



```python
# import library
from sklearn.cluster import KMeans
```


```python
x = [] # how many k 
y = [] # how many cohesion
for k in range (1,30):
    kmeans = KMeans(n_clusters = k)
    kmeans.fit(data2)
    x.append(k)
    y.append(kmeans.inertia_)
```

<pre>
C:\Users\hoon7\anaconda3\lib\site-packages\sklearn\cluster\_kmeans.py:881: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
  warnings.warn(
</pre>

```python
# Draw a graph
plt.plot(x, y)
```

<pre>
[<matplotlib.lines.Line2D at 0x1ae49a7bc10>]
</pre>
<img src="data:image/png;base64,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"/>

### Set 'Elbow Poins' as x = 4



```python
kmeans = KMeans(n_clusters = 4)
kmeans.fit(data2)
```

<pre>
KMeans(n_clusters=4)
</pre>

```python
data2['labels'] = kmeans.predict(data2)
```


```python
data2.head()
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
      <th>pc1</th>
      <th>pc2</th>
      <th>labels</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-2.097234</td>
      <td>-0.720179</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-1.456003</td>
      <td>-0.947694</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-2.073454</td>
      <td>-0.625336</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-2.610161</td>
      <td>-0.134044</td>
      <td>2</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-2.456866</td>
      <td>-0.229919</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>



```python
sns.scatterplot(x = 'pc1', y ='pc2', hue = 'labels', data = data2)
```

<pre>
<AxesSubplot:xlabel='pc1', ylabel='pc2'>
</pre>
<img src="data:image/png;base64,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"/>

## 3.Analyze the result of Clustering.



```python
# Insert 'medv' column
data2['medv'] = medv
```


```python
data2.head()
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
      <th>pc1</th>
      <th>pc2</th>
      <th>labels</th>
      <th>medv</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-2.097234</td>
      <td>-0.720179</td>
      <td>2</td>
      <td>24.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-1.456003</td>
      <td>-0.947694</td>
      <td>2</td>
      <td>21.6</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-2.073454</td>
      <td>-0.625336</td>
      <td>2</td>
      <td>34.7</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-2.610161</td>
      <td>-0.134044</td>
      <td>2</td>
      <td>33.4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-2.456866</td>
      <td>-0.229919</td>
      <td>2</td>
      <td>36.2</td>
    </tr>
  </tbody>
</table>
</div>



```python
# To visualize the data, create variables of 'medv' by groups 
data2[data2['labels'] == 0]['medv'].mean()
```

<pre>
29.068674698795174
</pre>

```python
medv_0 = data2[data2['labels'] == 0]['medv'].mean()
medv_1 = data2[data2['labels'] == 1]['medv'].mean()
medv_2 = data2[data2['labels'] == 2]['medv'].mean()
medv_3 = data2[data2['labels'] == 3]['medv'].mean()
```


```python
sns.barplot(x = ['group0', 'group1', 'group2', 'group3'], 
           y = [medv_0, medv_1, medv_2, medv_3])
```

<pre>
<AxesSubplot:>
</pre>
<img src="data:image/png;base64,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"/>

### The characteristics of each group

- Find the reason of the house prices are low or high

- Group2 is the highest, Group 1 is the lowest



```python
# Copy the labels to original data
data['labels'] = data2['labels']
```


```python
# Save only group 1 and 2 
group = data[(data['labels'] == 1) | (data['labels'] == 2)]
```


```python
#group.head()
group.tail()
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
      <th>crim</th>
      <th>zn</th>
      <th>indus</th>
      <th>nox</th>
      <th>rm</th>
      <th>age</th>
      <th>dis</th>
      <th>rad</th>
      <th>tax</th>
      <th>ptratio</th>
      <th>b</th>
      <th>lstat</th>
      <th>labels</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>485</th>
      <td>3.67367</td>
      <td>0.0</td>
      <td>18.10</td>
      <td>0.583</td>
      <td>6.312</td>
      <td>51.9</td>
      <td>3.9917</td>
      <td>24.0</td>
      <td>666.0</td>
      <td>20.2</td>
      <td>388.62</td>
      <td>10.58</td>
      <td>1</td>
    </tr>
    <tr>
      <th>486</th>
      <td>5.69175</td>
      <td>0.0</td>
      <td>18.10</td>
      <td>0.583</td>
      <td>6.114</td>
      <td>79.8</td>
      <td>3.5459</td>
      <td>24.0</td>
      <td>666.0</td>
      <td>20.2</td>
      <td>392.68</td>
      <td>14.98</td>
      <td>1</td>
    </tr>
    <tr>
      <th>487</th>
      <td>4.83567</td>
      <td>0.0</td>
      <td>18.10</td>
      <td>0.583</td>
      <td>5.905</td>
      <td>53.2</td>
      <td>3.1523</td>
      <td>24.0</td>
      <td>666.0</td>
      <td>20.2</td>
      <td>388.22</td>
      <td>11.45</td>
      <td>1</td>
    </tr>
    <tr>
      <th>489</th>
      <td>0.18337</td>
      <td>0.0</td>
      <td>27.74</td>
      <td>0.609</td>
      <td>5.414</td>
      <td>98.3</td>
      <td>1.7554</td>
      <td>4.0</td>
      <td>711.0</td>
      <td>20.1</td>
      <td>344.05</td>
      <td>23.97</td>
      <td>1</td>
    </tr>
    <tr>
      <th>490</th>
      <td>0.20746</td>
      <td>0.0</td>
      <td>27.74</td>
      <td>0.609</td>
      <td>5.093</td>
      <td>98.0</td>
      <td>1.8226</td>
      <td>4.0</td>
      <td>711.0</td>
      <td>20.1</td>
      <td>318.43</td>
      <td>29.68</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



```python
group = group.groupby('labels').mean().reset_index()
group
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
      <th>labels</th>
      <th>crim</th>
      <th>zn</th>
      <th>indus</th>
      <th>nox</th>
      <th>rm</th>
      <th>age</th>
      <th>dis</th>
      <th>rad</th>
      <th>tax</th>
      <th>ptratio</th>
      <th>b</th>
      <th>lstat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>12.571770</td>
      <td>0.000000</td>
      <td>18.243881</td>
      <td>0.671470</td>
      <td>6.010679</td>
      <td>89.929851</td>
      <td>2.05719</td>
      <td>23.701493</td>
      <td>666.671642</td>
      <td>20.198507</td>
      <td>288.733209</td>
      <td>18.723358</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>0.217935</td>
      <td>6.604167</td>
      <td>6.434107</td>
      <td>0.489874</td>
      <td>6.485048</td>
      <td>56.989881</td>
      <td>4.43312</td>
      <td>4.625000</td>
      <td>281.839286</td>
      <td>17.819048</td>
      <td>389.853929</td>
      <td>9.010417</td>
    </tr>
  </tbody>
</table>
</div>


### Subplot for Visualizaion

- plt.subplots(row, column, figsize())



```python
f, ax = plt.subplots(2, 6, figsize = (20, 13))

sns.barplot(x='labels', y='crim', data = group, ax = ax[0,0])
sns.barplot(x='labels', y='zn', data = group, ax = ax[0,1])
```

<pre>
<AxesSubplot:xlabel='labels', ylabel='zn'>
</pre>
<img src="data:image/png;base64,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"/>


```python
column = group.columns
```


```python
f, ax = plt.subplots(2, 6, figsize=(20, 13))
for i in range (1, 12):
    sns.barplot(x = 'labels', y = column[i], data = group, ax = ax[i // 6, i % 6]) 
```

<img src="data:image/png;base64,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"/>

## 4. Conclusion

- As you can see in the graph, the lower the crime rate, the higher the proportion of residential areas exceeding 25,000 square feet, the better the price.



In addition, you can look at not only two but also various graphs to see the characteristics of areas with high house prices.



```python
```
