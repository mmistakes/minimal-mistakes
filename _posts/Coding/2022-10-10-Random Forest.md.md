---
layout: single
title:  "Machine Learning 5"
categories: coding
tag: [python, machine_learning]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---
## Random Forest
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

## Example of Begging and Xgboost


```python
# Import Data
# Data from Bank marketing campaigns dataset, Kaggle
import pandas as pd
import os
os.chdir(r'C:\Users\hoon7\Documents\Machine Learning\data')
data = pd.read_csv("bank-additional-full.csv", sep = ';')
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
      <th>age</th>
      <th>job</th>
      <th>marital</th>
      <th>education</th>
      <th>default</th>
      <th>housing</th>
      <th>loan</th>
      <th>contact</th>
      <th>month</th>
      <th>day_of_week</th>
      <th>...</th>
      <th>campaign</th>
      <th>pdays</th>
      <th>previous</th>
      <th>poutcome</th>
      <th>emp.var.rate</th>
      <th>cons.price.idx</th>
      <th>cons.conf.idx</th>
      <th>euribor3m</th>
      <th>nr.employed</th>
      <th>y</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>56</td>
      <td>housemaid</td>
      <td>married</td>
      <td>basic.4y</td>
      <td>no</td>
      <td>no</td>
      <td>no</td>
      <td>telephone</td>
      <td>may</td>
      <td>mon</td>
      <td>...</td>
      <td>1</td>
      <td>999</td>
      <td>0</td>
      <td>nonexistent</td>
      <td>1.1</td>
      <td>93.994</td>
      <td>-36.4</td>
      <td>4.857</td>
      <td>5191.0</td>
      <td>no</td>
    </tr>
    <tr>
      <th>1</th>
      <td>57</td>
      <td>services</td>
      <td>married</td>
      <td>high.school</td>
      <td>unknown</td>
      <td>no</td>
      <td>no</td>
      <td>telephone</td>
      <td>may</td>
      <td>mon</td>
      <td>...</td>
      <td>1</td>
      <td>999</td>
      <td>0</td>
      <td>nonexistent</td>
      <td>1.1</td>
      <td>93.994</td>
      <td>-36.4</td>
      <td>4.857</td>
      <td>5191.0</td>
      <td>no</td>
    </tr>
    <tr>
      <th>2</th>
      <td>37</td>
      <td>services</td>
      <td>married</td>
      <td>high.school</td>
      <td>no</td>
      <td>yes</td>
      <td>no</td>
      <td>telephone</td>
      <td>may</td>
      <td>mon</td>
      <td>...</td>
      <td>1</td>
      <td>999</td>
      <td>0</td>
      <td>nonexistent</td>
      <td>1.1</td>
      <td>93.994</td>
      <td>-36.4</td>
      <td>4.857</td>
      <td>5191.0</td>
      <td>no</td>
    </tr>
    <tr>
      <th>3</th>
      <td>40</td>
      <td>admin.</td>
      <td>married</td>
      <td>basic.6y</td>
      <td>no</td>
      <td>no</td>
      <td>no</td>
      <td>telephone</td>
      <td>may</td>
      <td>mon</td>
      <td>...</td>
      <td>1</td>
      <td>999</td>
      <td>0</td>
      <td>nonexistent</td>
      <td>1.1</td>
      <td>93.994</td>
      <td>-36.4</td>
      <td>4.857</td>
      <td>5191.0</td>
      <td>no</td>
    </tr>
    <tr>
      <th>4</th>
      <td>56</td>
      <td>services</td>
      <td>married</td>
      <td>high.school</td>
      <td>no</td>
      <td>no</td>
      <td>yes</td>
      <td>telephone</td>
      <td>may</td>
      <td>mon</td>
      <td>...</td>
      <td>1</td>
      <td>999</td>
      <td>0</td>
      <td>nonexistent</td>
      <td>1.1</td>
      <td>93.994</td>
      <td>-36.4</td>
      <td>4.857</td>
      <td>5191.0</td>
      <td>no</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 21 columns</p>
</div>




```python
# Find category type data
data.dtypes
data = pd.get_dummies(data, columns = 
                      ['job', 'marital', 'education', 'default', 'housing', 'loan', 'contact', 'month', 'day_of_week', 'poutcome'])
```


```python
data['id'] = range(len(data))
```


```python
train = data.sample(30000, replace = False, random_state = 2020).reset_index().drop(['index'],axis = 1)
test = data.loc[~data['id'].isin(train['id'])].reset_index().drop(['index'],axis = 1)
```

## Random Forest
- Hard to analyze
- Learning is slow 

#### n_estimators(int, default=100): The number of trees in the forest.
#### min_samples_split: The minimum number of samples required to split an internal node:
- If int, then consider min_samples_split as the minimum number.
- If float, then min_samples_split is a fraction and ceil(min_samples_split * n_samples) are the minimum number of samples for each split.

## 1. Begging


```python
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators = 500, min_samples_split = 10)
```


```python
input_var = ['age', 'duration', 'campaign', 'pdays', 'previous', 'emp.var.rate',
       'cons.price.idx', 'cons.conf.idx', 'euribor3m', 'nr.employed',
       'job_admin.', 'job_blue-collar', 'job_entrepreneur', 'job_housemaid',
       'job_management', 'job_retired', 'job_self-employed', 'job_services',
       'job_student', 'job_technician', 'job_unemployed', 'job_unknown',
       'marital_divorced', 'marital_married', 'marital_single',
       'marital_unknown', 'education_basic.4y', 'education_basic.6y',
       'education_basic.9y', 'education_high.school', 'education_illiterate',
       'education_professional.course', 'education_university.degree',
       'education_unknown', 'default_no', 'default_unknown', 'default_yes',
       'housing_no', 'housing_unknown', 'housing_yes', 'loan_no',
       'loan_unknown', 'loan_yes', 'contact_cellular', 'contact_telephone',
       'month_apr', 'month_aug', 'month_dec', 'month_jul', 'month_jun',
       'month_mar', 'month_may', 'month_nov', 'month_oct', 'month_sep',
       'day_of_week_fri', 'day_of_week_mon', 'day_of_week_thu',
       'day_of_week_tue', 'day_of_week_wed', 'poutcome_failure',
       'poutcome_nonexistent', 'poutcome_success']
```


```python
rf.fit(train[input_var], train['y'])
```




    RandomForestClassifier(min_samples_split=10, n_estimators=500)




```python
predictions = rf.predict(test[input_var])
```


```python
test['pred'] = predictions
```


```python
(test['pred'] == test['y']).mean()
```




    0.9140150160886664



#### Compare with Decision Tree


```python
from sklearn.tree import DecisionTreeClassifier
```


```python
dt = DecisionTreeClassifier(min_samples_split = 10)
```


```python
dt.fit(train[input_var], train['y'])
test['pred'] = dt.predict(test[input_var])
```


```python
(test['pred'] == test['y']).mean()
```




    0.8989989274222381



#### Random Forest is better than Decision Tree in this data 

### Find feature importances


```python
feature_imp = rf.feature_importances_
```


```python
imp_df = pd.DataFrame({'var': input_var,
             'imp': feature_imp})
```


```python
imp_df.sort_values(['imp'], ascending = False).head()
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
      <th>var</th>
      <th>imp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>duration</td>
      <td>0.323451</td>
    </tr>
    <tr>
      <th>8</th>
      <td>euribor3m</td>
      <td>0.095830</td>
    </tr>
    <tr>
      <th>9</th>
      <td>nr.employed</td>
      <td>0.074548</td>
    </tr>
    <tr>
      <th>0</th>
      <td>age</td>
      <td>0.055440</td>
    </tr>
    <tr>
      <th>3</th>
      <td>pdays</td>
      <td>0.040824</td>
    </tr>
  </tbody>
</table>
</div>



### The most important feature is 'duration'

## 2. Xgboost
- Hard to analyze
- Usually the performance of Xgboost is better than RandomForest

#### n_estimators: The number of trees in the forest.
#### learning_rate: The speed of learning


```python
# Install the package of xgboost
!pip install xgboost
```

    Requirement already satisfied: xgboost in c:\users\hoon7\anaconda3\lib\site-packages (1.6.2)
    Requirement already satisfied: scipy in c:\users\hoon7\anaconda3\lib\site-packages (from xgboost) (1.7.1)
    Requirement already satisfied: numpy in c:\users\hoon7\anaconda3\lib\site-packages (from xgboost) (1.20.3)
    


```python
from xgboost import XGBClassifier
```


```python
## Got Error: Invalid classes inferred from unique values of `y`.
## the solution is
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
train['y'] = le.fit_transform(train['y'])
test['y'] = le.fit_transform(test['y'])
```


```python
xgb = XGBClassifier(n_estimators = 300, learning_rate = 0.1)
xgb.fit(train[input_var], train['y'])
```




    XGBClassifier(base_score=0.5, booster='gbtree', callbacks=None,
                  colsample_bylevel=1, colsample_bynode=1, colsample_bytree=1,
                  early_stopping_rounds=None, enable_categorical=False,
                  eval_metric=None, gamma=0, gpu_id=-1, grow_policy='depthwise',
                  importance_type=None, interaction_constraints='',
                  learning_rate=0.1, max_bin=256, max_cat_to_onehot=4,
                  max_delta_step=0, max_depth=6, max_leaves=0, min_child_weight=1,
                  missing=nan, monotone_constraints='()', n_estimators=300,
                  n_jobs=0, num_parallel_tree=1, predictor='auto', random_state=0,
                  reg_alpha=0, reg_lambda=1, ...)




```python
## Predicaiton and its accuracy
predictions = xgb.predict(test[input_var])
(pd.Series(predictions) == test['y']).mean()
```




    0.9141043975688238



### Find the best n_estimators


```python
for n in [100, 200, 300, 400, 500, 600, 700, 800, 900]:
    xgb = XGBClassifier(n_estimators = n, learning_rate = 0.05)
    xgb.fit(train[input_var], train['y'])
    predictions = xgb.predict(test[input_var])
    print((pd.Series(predictions) == test['y']).mean())
```

    0.9129424383267787
    0.9140150160886664
    0.9131212012870933
    0.9146406864497676
    0.9127636753664641
    0.9115123346442617
    0.9115123346442617
    0.9111548087236324
    0.9108866642831606
    

### The best n_estimators is 400


```python
feature_imp = xgb.feature_importances_
```


```python
imp_df = pd.DataFrame({'var':input_var,
                       'imp':feature_imp})

imp_df.sort_values(['imp'],ascending=False).head()
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
      <th>var</th>
      <th>imp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9</th>
      <td>nr.employed</td>
      <td>0.367053</td>
    </tr>
    <tr>
      <th>1</th>
      <td>duration</td>
      <td>0.039611</td>
    </tr>
    <tr>
      <th>5</th>
      <td>emp.var.rate</td>
      <td>0.035773</td>
    </tr>
    <tr>
      <th>7</th>
      <td>cons.conf.idx</td>
      <td>0.030671</td>
    </tr>
    <tr>
      <th>53</th>
      <td>month_oct</td>
      <td>0.026311</td>
    </tr>
  </tbody>
</table>
</div>



### The most important feature is 'nr.employed'
