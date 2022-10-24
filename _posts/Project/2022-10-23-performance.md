---
layout: single
title:  "Project 3"
categories: project
tag: [python, blog, project]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---
## Mobile Price Classification

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


# Mobile Price Classification


# Introduction:

- With the dataset from Mobile Price Classification, evaluating the performance of each of the following models: logistic regression, decision tree classifier, random forest classifier, Ada boosting, support vector machine model and gradient boosting decision tree. By computing the accuarcies of each models, find the best model which fits well with this dataset. After comparing the performance of each data model, select the best model of this dataset. Data from https://www.kaggle.com/datasets/iabhishekofficial/mobile-price-classification


## 1. Import and train Data



```python
import warnings
warnings.filterwarnings(action = 'ignore')
import pandas as pd
import numpy as np
```


```python
train = pd.read_csv('./data/train.csv')
test = pd.read_csv('./data/test.csv')
```


```python
test.head()
train.head()
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
      <th>battery_power</th>
      <th>blue</th>
      <th>clock_speed</th>
      <th>dual_sim</th>
      <th>fc</th>
      <th>four_g</th>
      <th>int_memory</th>
      <th>m_dep</th>
      <th>mobile_wt</th>
      <th>n_cores</th>
      <th>...</th>
      <th>px_height</th>
      <th>px_width</th>
      <th>ram</th>
      <th>sc_h</th>
      <th>sc_w</th>
      <th>talk_time</th>
      <th>three_g</th>
      <th>touch_screen</th>
      <th>wifi</th>
      <th>price_range</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>842</td>
      <td>0</td>
      <td>2.2</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>7</td>
      <td>0.6</td>
      <td>188</td>
      <td>2</td>
      <td>...</td>
      <td>20</td>
      <td>756</td>
      <td>2549</td>
      <td>9</td>
      <td>7</td>
      <td>19</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1021</td>
      <td>1</td>
      <td>0.5</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>53</td>
      <td>0.7</td>
      <td>136</td>
      <td>3</td>
      <td>...</td>
      <td>905</td>
      <td>1988</td>
      <td>2631</td>
      <td>17</td>
      <td>3</td>
      <td>7</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>563</td>
      <td>1</td>
      <td>0.5</td>
      <td>1</td>
      <td>2</td>
      <td>1</td>
      <td>41</td>
      <td>0.9</td>
      <td>145</td>
      <td>5</td>
      <td>...</td>
      <td>1263</td>
      <td>1716</td>
      <td>2603</td>
      <td>11</td>
      <td>2</td>
      <td>9</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>615</td>
      <td>1</td>
      <td>2.5</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>0.8</td>
      <td>131</td>
      <td>6</td>
      <td>...</td>
      <td>1216</td>
      <td>1786</td>
      <td>2769</td>
      <td>16</td>
      <td>8</td>
      <td>11</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1821</td>
      <td>1</td>
      <td>1.2</td>
      <td>0</td>
      <td>13</td>
      <td>1</td>
      <td>44</td>
      <td>0.6</td>
      <td>141</td>
      <td>2</td>
      <td>...</td>
      <td>1208</td>
      <td>1212</td>
      <td>1411</td>
      <td>8</td>
      <td>2</td>
      <td>15</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 21 columns</p>
</div>



```python
train['price_range'].dtypes
```

<pre>
dtype('int64')
</pre>

```python
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import GradientBoostingClassifier
from xgboost import XGBClassifier
from sklearn import datasets
from sklearn import tree
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error
```


```python
# Set the features as the input and the price range as the output
X = train.drop("price_range", axis=1)
y = train["price_range"]
acc_list = []
# Split data into training and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state=9)
```

## 2.Model Accuracy



```python
# Logistic Regression
clf = LogisticRegression(random_state = 1000, solver = "lbfgs", max_iter = 1000)
clf.fit(X_train, y_train)
clf_acc = clf.score(X_test, y_test)
acc_list.append(clf_acc)
print("Logistic regression accuracy:", clf_acc)
```

<pre>
Logistic regression accuracy: 0.71
</pre>

```python
# Decision Tree Classifier
dtc = DecisionTreeClassifier(criterion="entropy", max_depth=10, random_state=1000)
dtc.fit(X_train, y_train)
dtc_acc = dtc.score(X_test, y_test)
acc_list.append(dtc_acc)
print("Decision tree classifier accuracy:", dtc_acc)
```

<pre>
Decision tree classifier accuracy: 0.86
</pre>

```python
# Random Forest Classifier
rfc = RandomForestClassifier(max_depth=10, n_estimators=100, random_state=1000)
rfc.fit(X_train, y_train)
rfc_acc = rfc.score(X_test, y_test)
acc_list.append(rfc_acc)
print("Random forest classifier accuracy:", rfc_acc)
```

<pre>
Random forest classifier accuracy: 0.8875
</pre>

```python
# Ada Boosting Classifier
ada = AdaBoostClassifier(random_state = 1000)
ada.fit(X_train, y_train)
ada_acc = ada.score(X_test, y_test)
acc_list.append(ada_acc)
print("Ada boost classifier accuracy:", ada_acc)
```

<pre>
Ada boost classifier accuracy: 0.6725
</pre>

```python
# Gradient Boosting Decision Tree Classifier
gbdt = GradientBoostingClassifier(random_state=1000)
gbdt.fit(X_train, y_train)
gbdt_acc = gbdt.score(X_test, y_test)
acc_list.append(gbdt_acc)
print("Gradient boosting classifier accuracy:", gbdt_acc)
```

<pre>
Gradient boosting classifier accuracy: 0.8975
</pre>

```python
# XGB Classifier
xgb = XGBClassifier(n_estimators = 100, learning_rate = 0.1, random_state = 1000)
xgb.fit(X_train, y_train)
xgb_acc = xgb.score(X_test, y_test)
acc_list.append(xgb_acc)
print("XGB classifier accuract:", xgb_acc)
```

<pre>
XGB classifier accuract: 0.91
</pre>

```python
acc_list
```

<pre>
[0.71, 0.86, 0.8875, 0.6725, 0.8975, 0.91]
</pre>

```python
model_list = ['Logistic Regression', 'Decision Tree Classifier', 'Random Forest Classifier',
             'Ada Boosting Classifier', 'Gradient Boosting Decision Tree Classifier',
             'XGB Classifier']
acc_df = pd.DataFrame({"var" : model_list,
                      "imp": acc_list})
```


```python
import matplotlib.pyplot as plt
acc_df = acc_df.sort_values(['imp'], ascending = False)
plt.bar(acc_df['var'], acc_df['imp'])
plt.xticks(rotation = 90)
plt.show()

# XGB is the best for the accuracy
```

<img src="data:image/png;base64,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"/>

## 3. XGB Feature importances



```python
## Going with XGB Classifier
```


```python
train.columns
```

<pre>
Index(['battery_power', 'blue', 'clock_speed', 'dual_sim', 'fc', 'four_g',
       'int_memory', 'm_dep', 'mobile_wt', 'n_cores', 'pc', 'px_height',
       'px_width', 'ram', 'sc_h', 'sc_w', 'talk_time', 'three_g',
       'touch_screen', 'wifi', 'price_range'],
      dtype='object')
</pre>

```python
input_var = ['battery_power', 'blue', 'clock_speed', 'dual_sim', 'fc', 'four_g',
       'int_memory', 'm_dep', 'mobile_wt', 'n_cores', 'pc', 'px_height',
       'px_width', 'ram', 'sc_h', 'sc_w', 'talk_time', 'three_g',
       'touch_screen', 'wifi']
```


```python
xgb_imp_df =pd.DataFrame({"var": input_var,
                      "imp": xgb.feature_importances_})
xgb_imp_df = xgb_imp_df.sort_values(['imp'], ascending = False)
plt.bar(xgb_imp_df['var'], xgb_imp_df['imp'])
plt.xticks(rotation = 90)
plt.show()
```

<img src="data:image/png;base64,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"/>


```python
mean_cross = (cross_val_score(xgb, train[input_var], train['price_range'], scoring = "neg_mean_squared_error", cv = 3)).mean()
-mean_cross
```

<pre>
0.08750279514897207
</pre>

```python
# With the feature importances, improve the performance of model
```


```python
score_list = []
selected_varnum = []
for i in range(1, len(input_var) + 1):
    selected_var = xgb_imp_df['var'].iloc[:i].to_list()
    scores = cross_val_score(xgb, train[selected_var], 
                train['price_range'], scoring = "neg_mean_squared_error", cv = 3)
    score_list.append(-np.mean(scores))
    selected_varnum.append(i)
    #print(i)
```


```python
plt.xticks([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
plt.plot(selected_varnum, score_list)
# The lowest socre is the best
# so 4
```

<pre>
[<matplotlib.lines.Line2D at 0x297a0812dc0>]
</pre>
<img src="data:image/png;base64,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"/>

## 4. GBDT Feature importances



```python
gbdt_imp_df =pd.DataFrame({"var": input_var,
                      "imp": gbdt.feature_importances_})
gbdt_imp_df = gbdt_imp_df.sort_values(['imp'], ascending = False)
plt.bar(gbdt_imp_df['var'], gbdt_imp_df['imp'])
plt.xticks(rotation = 90)
plt.show()
```

<img src="data:image/png;base64,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"/>


```python
gbdt_mean = cross_val_score(gbdt, train[input_var], train['price_range'], scoring = "neg_mean_squared_error", cv = 3).mean()
-gbdt_mean
```

<pre>
0.10299579939759851
</pre>

```python
score_list = []
selected_varnum = []
for i in range(1, len(input_var) + 1):
    selected_var = gbdt_imp_df['var'].iloc[:i].to_list()
    scores = cross_val_score(gbdt, train[selected_var], 
                train['price_range'], scoring = "neg_mean_squared_error", cv = 3)
    score_list.append(-np.mean(scores))
    selected_varnum.append(i)
    # print(i)
```


```python
plt.xticks([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
plt.plot(selected_varnum, score_list)
# For the gbdt, the best is 5
```

<pre>
[<matplotlib.lines.Line2D at 0x297a08a9f70>]
</pre>
<img src="data:image/png;base64,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"/>

## 5. Conclusion



```python
gbdt_scores = cross_val_score(gbdt, train[['ram', 'battery_power', 'px_width', 'px_height', 'mobile_wt']], 
                train['price_range'], scoring = "neg_mean_squared_error", cv = 3)
```


```python
xgb_scores = cross_val_score(xgb, train[['ram', 'battery_power', 'px_width', 'px_height']], 
                train['price_range'], scoring = "neg_mean_squared_error", cv = 3)
```


```python
mean_gbdt_scores = gbdt_scores.mean()
-mean_gbdt_scores
```

<pre>
0.09299779539659599
</pre>

```python
mean_xgb_scores = xgb_scores.mean()
-mean_xgb_scores
```

<pre>
0.07850128989559274
</pre>

```python
## The best model is XGB Classifier and best features of this model is 'ram', 'battery_power', 'px_width', 'px_height', 'mobile_wt'
```
