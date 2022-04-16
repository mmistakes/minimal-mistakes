---
layout: single
title:  "[Titanic] Introduction to Ensembling Stacking"
categories: Kaggle
tag: [Kaggle, Titanic]
toc: true
author_profile: false
sidebar:
    nav: "docs"
search: false
---
**[공지사항]** ["출처: https://www.kaggle.com/code/arthurtok/introduction-to-ensembling-stacking-in-python/notebook"](https://www.kaggle.com/code/arthurtok/introduction-to-ensembling-stacking-in-python/notebook)
{: .notice--danger}


Stacking은 앙상블의 변형. Stacking은 첫번째 단계에서 몇가지 기본 분류기로 예측을 한, 다음 두번째 단계에선 다른 모델을 사용하여 이전 첫번째 단계의 예측으로 최종 output을 예측한다.


```python
# Load in our libraries
import re
import sklearn
import xgboost as xgb
import plotly.offline as py
py.init_notebook_mode(connected=True)
import plotly.graph_objs as go
import plotly.tools as tls
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier, GradientBoostingClassifier, ExtraTreesClassifier
from sklearn.svm import SVC
from sklearn.model_selection import StratifiedKFold
```


<script type="text/javascript">
window.PlotlyConfig = {MathJaxConfig: 'local'};
if (window.MathJax) {MathJax.Hub.Config({SVG: {font: "STIX-Web"}});}
if (typeof require !== 'undefined') {
require.undef("plotly");
requirejs.config({
    paths: {
        'plotly': ['https://cdn.plot.ly/plotly-2.9.0.min']
    }
});
require(['plotly'], function(Plotly) {
    window._Plotly = Plotly;
});
}
</script>



# Feature Exploration, Engineering and Cleaning


```python
train = pd.read_csv("./titanic/train.csv")
test = pd.read_csv("./titanic/test.csv")
PassengerId = test["PassengerId"]

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
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>




```python
test.head()
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
      <th>PassengerId</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>892</td>
      <td>3</td>
      <td>Kelly, Mr. James</td>
      <td>male</td>
      <td>34.5</td>
      <td>0</td>
      <td>0</td>
      <td>330911</td>
      <td>7.8292</td>
      <td>NaN</td>
      <td>Q</td>
    </tr>
    <tr>
      <th>1</th>
      <td>893</td>
      <td>3</td>
      <td>Wilkes, Mrs. James (Ellen Needs)</td>
      <td>female</td>
      <td>47.0</td>
      <td>1</td>
      <td>0</td>
      <td>363272</td>
      <td>7.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>2</th>
      <td>894</td>
      <td>2</td>
      <td>Myles, Mr. Thomas Francis</td>
      <td>male</td>
      <td>62.0</td>
      <td>0</td>
      <td>0</td>
      <td>240276</td>
      <td>9.6875</td>
      <td>NaN</td>
      <td>Q</td>
    </tr>
    <tr>
      <th>3</th>
      <td>895</td>
      <td>3</td>
      <td>Wirz, Mr. Albert</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>315154</td>
      <td>8.6625</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>896</td>
      <td>3</td>
      <td>Hirvonen, Mrs. Alexander (Helga E Lindqvist)</td>
      <td>female</td>
      <td>22.0</td>
      <td>1</td>
      <td>1</td>
      <td>3101298</td>
      <td>12.2875</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>




```python
train.isnull().sum()
```




    PassengerId      0
    Survived         0
    Pclass           0
    Name             0
    Sex              0
    Age            177
    SibSp            0
    Parch            0
    Ticket           0
    Fare             0
    Cabin          687
    Embarked         2
    dtype: int64




```python
test.isnull().sum()
```




    PassengerId      0
    Pclass           0
    Name             0
    Sex              0
    Age             86
    SibSp            0
    Parch            0
    Ticket           0
    Fare             1
    Cabin          327
    Embarked         0
    dtype: int64



## Feature Engineering


```python
full_data = [train, test]

train["Name_length"] = train["Name"].apply(len)
test["Name_length"] =test["Name"].apply(len)

# Cabin 유무
train["Has_Cabin"] = train["Cabin"].apply(lambda x: 0 if type(x) == float else 1)
test["Has_Cabin"] = test["Cabin"].apply(lambda x: 0 if type(x) == float else 1)

# SibSp와 Parch를 합쳐 FamilySize 칼럼 생성
for dataset in full_data:
    dataset["FamilySize"] = dataset["SibSp"] + dataset["Parch"] + 1
    
# FamilySize로 부터 IsAlone 칼럼 생성
for dataset in full_data:
    dataset["IsAlone"] = 0
    dataset.loc[dataset["FamilySize"] == 1, "IsAlone"] = 1

# Embarked 칼럼의 Null 값을 다른 값으로 대체
for dataset in full_data:
    dataset["Embarked"] = dataset["Embarked"].fillna("S")
    
# Fare 칼럼의 Null 값을 다른 값으로 대체하고, 4개의 카테고리를 가진 CategoricalFare 생성
for dataset in full_data:
    dataset["Fare"] = dataset["Fare"].fillna(train["Fare"].median())
train["CategoricalFare"] = pd.qcut(train["Fare"], 4)

# CategoricalAge 생성
for dataset in full_data:
    age_avg = dataset["Age"].mean()
    age_std = dataset["Age"].std()
    age_null_count = dataset["Age"].isnull().sum()
    print(age_null_count)
    age_null_random_list = np.random.randint(age_avg - age_std, age_avg + age_std,
                                             size=age_null_count)
    dataset.loc[dataset["Age"].isnull(), "Age"] = age_null_random_list
    dataset["Age"] = dataset["Age"].astype(int)
train["CategoricalAge"] = pd.cut(train["Age"], 5)

# Mr, Miss와 같은 탑승객의 호칭을 추출하는 함수
def get_title(name):
    title_search = re.search(" ([A-Za-z]+)\.", name)
    if title_search:
        return title_search.group(1)
    return ""

# 탑승객의 호칭을 담은 Title 칼럼 생성
for dataset in full_data:
    dataset["Title"] = dataset["Name"].apply(get_title)
    
# 빈도수가 적은 데이터는 Rare로 바꾼다.
for dataset in full_data:
    dataset["Title"] = dataset["Title"].replace(['Lady', 'Countess','Capt', 'Col','Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona'],
                                                "Rare")
    dataset["Title"] = dataset["Title"].replace("Mlle", "Miss")
    dataset["Title"] = dataset["Title"].replace("Ms", "Miss")
    dataset["Title"] = dataset["Title"].replace("Mme", "Mrs")
    
for dataset in full_data:
    # Mapping Sex
    dataset["Sex"] = dataset["Sex"].map({"female": 0, "male": 1}).astype(int)
    
    # Mapping titles
    title_mapping = {"Mr": 1, "Miss": 2, "Mrs": 3, "Master": 4, "Rare": 5}
    dataset["Title"] = dataset["Title"].map(title_mapping)
    dataset["Title"] = dataset["Title"].fillna(0)
    
    # Mapping Embarked
    dataset["Embarked"] = dataset["Embarked"].map({"S": 0, "C": 1, "Q": 2}).astype(int)
    
    # Mapping Fare
    dataset.loc[dataset["Fare"] <= 7.91, "Fare"] = 0
    dataset.loc[(dataset["Fare"] > 7.91) & (dataset["Fare"] <= 14.454), "Fare"] = 1
    dataset.loc[(dataset["Fare"] > 14.454) & (dataset["Fare"] <= 31), "Fare"] = 2
    dataset.loc[dataset["Fare"] > 31, "Fare"] = 3
    dataset["Fare"] = dataset["Fare"].astype(int)
    
    # Mapping Age
    dataset.loc[dataset["Age"] <= 16, "Age"] = 0
    dataset.loc[(dataset["Age"] > 16) & (dataset["Age"] <= 32), "Age"] = 1
    dataset.loc[(dataset["Age"] > 32) & (dataset["Age"] <= 48), "Age"] = 2
    dataset.loc[(dataset["Age"] > 48) & (dataset["Age"] <= 64), "Age"] = 3
    dataset.loc[dataset["Age"] > 64, "Age"] = 4
```

    177
    86
    


```python
# Feature Selection
drop_elements = ["PassengerId", "Name", "Ticket", "Cabin", "SibSp"]
train = train.drop(drop_elements, axis=1)
train = train.drop(["CategoricalAge", "CategoricalFare"], axis=1)
test = test.drop(drop_elements, axis=1)
```

# Visualisations


```python
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
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>Embarked</th>
      <th>Name_length</th>
      <th>Has_Cabin</th>
      <th>FamilySize</th>
      <th>IsAlone</th>
      <th>Title</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>23</td>
      <td>0</td>
      <td>2</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>2</td>
      <td>0</td>
      <td>3</td>
      <td>1</td>
      <td>51</td>
      <td>1</td>
      <td>2</td>
      <td>0</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>22</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>2</td>
      <td>0</td>
      <td>3</td>
      <td>0</td>
      <td>44</td>
      <td>1</td>
      <td>2</td>
      <td>0</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>3</td>
      <td>1</td>
      <td>2</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>24</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



## Pearson Correlation Heatmap

feature간 상관관계 확인


```python
colormap = plt.cm.RdBu
plt.figure(figsize=(14, 12))
plt.title("Person Correlation of Features", y=1.05, size=15)
sns.heatmap(train.astype(float).corr(), linewidths=0.1, vmax=1.0, square=True,
            cmap=colormap, linecolor="white", annot=True)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x1d434a8c550>




![png](/assets/images/220416/output_15_1.png)


FmilySize와 Parch를 제외하곤 매우 강한 상관관계를 가지는 feaure은 없어보입니다.

(두 feature는 원래 삭제하는 것이 좋으나 연습단계이기 때문에 그냥 넘어갑니다)

## Pairplots
두 개의 feature간의 분포를 확인하기 위해 pairplots를 생성합니다.


```python
g = sns.pairplot(train[["Survived", "Pclass", "Sex", "Age", "Parch", "Fare",
                        "Embarked", "FamilySize", "Title"]], hue="Survived", 
                 palette="seismic", size=1.2, diag_kind="kde", diag_kws=dict(shade=True),
                 plot_kws=dict(s=10))
g.set(xticklabels=[])
```




    <seaborn.axisgrid.PairGrid at 0x1d434a8cb80>




![png](/assets/images/220416/output_18_1.png)


# Ensembling & Stacking models

## Helpers via Python Classes


```python
ntrain = train.shape[0]
ntest = test.shape[0]
SEED = 0
NFOLDS = 5
kf = StratifiedKFold(n_splits=NFOLDS, shuffle=True, random_state=SEED)

class SklearnHelper(object):
    def __init__(self, clf, seed=0, params=None):
        params["random_state"] = seed
        self.clf = clf(**params)
        
    def train(self, x_train, y_train):
        self.clf.fit(x_train, y_train)
    
    def predict(self, x):
        return self.clf.predict(x)
    
    def fit(self, x, y):
        return self.clf.fit(x, y)
    
    def feature_importances(self, x, y):
        print(self.clf.fit(x, y).feature_importances_)
        return self.clf.fit(x, y).feature_importances_
```

## Out-of-Fold Predictions

* Out-of-Fold: K-Fold cross validation을 통해 얻어진 전체 예측 값




```python
def get_oof(clf, x_train, y_train, x_test):
    oof_train = np.zeros((ntrain,))
    oof_test = np.zeros((ntest,))
    oof_test_skf = np.empty((NFOLDS, ntest))
    
    for i, (train_index, test_index) in enumerate(kf.split(x_train, y_train)):
        x_tr = x_train[train_index]
        y_tr = y_train[train_index]
        x_te = x_train[test_index]
        
        clf.train(x_tr, y_tr)
        
        oof_train[test_index] = clf.predict(x_te)
        oof_test_skf[i, :] = clf.predict(x_test)
        
    oof_test[:] = oof_test_skf.mean(axis=0)
    return oof_train.reshape(-1, 1), oof_test.reshape(-1, 1) 
```

# Generating our Base First-Level Models

## Parameters

- n_jobs: 훈련 시 사용할 프로세스 숫자
- n_estimators: classification tree의 수
- max_depth: 트리의 최대 깊이 (너무 큰 숫자를 설정하면 overfitting이 될 수 있음)


```python
# Random Forest parameters
rf_params = {
    "n_jobs": -1,
    "n_estimators": 500,
    "warm_start": True, # .fit을 실행할 때 이전의 weight를 기억하고 그대로 이어서 업데이트. ensemble 모델일때 사용
    "max_depth": 6,
    "min_samples_leaf": 2, # leaf node에 있어야 하는 최소 샘플 수,
    "max_features": "sqrt", # split을 할 때, 고려할 feature의 수가 sqrt(n_features), auto와 동일
    "verbose": 0
}

# Extra Trees Parameters
et_params = {
    "n_jobs": -1,
    "n_estimators": 500,
    "max_depth": 8,
    "min_samples_leaf": 2,
    "verbose": 0
}

# AdaBoost parameters
ada_params = {
    "n_estimators": 500,
    "learning_rate": 0.75
}

# Gradient Boosting parameters
gb_params = {
    "n_estimators": 500,
    "max_depth": 5,
    "min_samples_leaf": 2,
    "verbose": 0
}

# Support Vector Classifier parameters
svc_params = {
    "kernel": "linear",
    "C": 0.025
}
```


```python
rf = SklearnHelper(clf=RandomForestClassifier, seed=SEED, params=rf_params)
et = SklearnHelper(clf=ExtraTreesClassifier, seed=SEED, params=et_params)
ada = SklearnHelper(clf=AdaBoostClassifier, seed=SEED, params=ada_params)
gb = SklearnHelper(clf=GradientBoostingClassifier, seed=SEED, params=gb_params)
svc = SklearnHelper(clf=SVC, seed=SEED, params=svc_params)
```

## Creating NumPy arrays out of our train and test sets


```python
y_train = train["Survived"].ravel()
train = train.drop(["Survived"], axis=1)
x_train = train.values
x_test = test.values
```

### Output of the First level Predictions


```python
et_oof_train, et_oof_test = get_oof(et, x_train, y_train, x_test)
rf_oof_train, rf_oof_test = get_oof(rf,x_train, y_train, x_test)
ada_oof_train, ada_oof_test = get_oof(ada, x_train, y_train, x_test)
gb_oof_train, gb_oof_test = get_oof(gb,x_train, y_train, x_test)
svc_oof_train, svc_oof_test = get_oof(svc,x_train, y_train, x_test)
```

### Feature importances generated from the different classifier


```python
rf_feature = rf.feature_importances(x_train,y_train)
et_feature = et.feature_importances(x_train, y_train)
ada_feature = ada.feature_importances(x_train, y_train)
gb_feature = gb.feature_importances(x_train,y_train)
```

    [0.11297712 0.21992303 0.03739706 0.0215505  0.05321412 0.02994163
     0.12057478 0.06019532 0.07586657 0.01170545 0.25665442]
    [0.12058936 0.37886445 0.02876845 0.01672613 0.05613948 0.02785238
     0.04624065 0.08386114 0.04514501 0.02145094 0.17436201]
    [0.03  0.008 0.014 0.064 0.04  0.01  0.708 0.014 0.046 0.004 0.062]
    [0.08640323 0.01227822 0.05044546 0.01239049 0.05315193 0.02556997
     0.17221705 0.03845785 0.11117741 0.00637753 0.43153085]
    


```python
cols = train.columns.values
feature_dataframe = pd.DataFrame({'features': cols, 
                                  'Random Forest feature importances': rf_feature, 
                                  'Extra Trees  feature importances': et_feature, 
                                  'AdaBoost feature importances': ada_feature, 
                                  'Gradient Boost feature importances': gb_feature
                                 })
```


```python
feature_dataframe.columns
```




    Index(['features', 'Random Forest feature importances',
           'Extra Trees  feature importances', 'AdaBoost feature importances',
           'Gradient Boost feature importances'],
          dtype='object')



### Interactive feature importances via Plotly scatterplots


```python
# Scatter plot
for col in feature_dataframe.columns:
    if col == "features":
        continue
        
    trace = go.Scatter(
        y=feature_dataframe[col].values,
        x=feature_dataframe["features"].values,
        mode="markers",
        marker=dict(
            sizemode="diameter",
            sizeref=1,
            size=25,
            color=feature_dataframe[col].values,
            colorscale="Portland",
            showscale=True
        ),
        text = feature_dataframe["features"].values
    )
    data = [trace]

    layout = go.Layout(
        autosize=True,
        title=col,
        hovermode="closest",
        yaxis=dict(
            title="Feature Importance",
            ticklen=5,
            gridwidth=2
        ),
        showlegend=False
    )
    fig = go.Figure(data=data, layout=layout)
    py.iplot(fig, filename="scatter2010")
```


![png](/assets/images/220416/1.png)

![png](/assets/images/220416/2.png)

![png](/assets/images/220416/3.png)

![png](/assets/images/220416/4.png)

모든 feature importances의 평균을 계산해서 새로운 칼럼에 저장을 합니다.


```python
feature_dataframe["mean"] = feature_dataframe.mean(axis=1)
feature_dataframe.head()
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
      <th>features</th>
      <th>Random Forest feature importances</th>
      <th>Extra Trees  feature importances</th>
      <th>AdaBoost feature importances</th>
      <th>Gradient Boost feature importances</th>
      <th>mean</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Pclass</td>
      <td>0.112977</td>
      <td>0.120589</td>
      <td>0.030</td>
      <td>0.086403</td>
      <td>0.087492</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Sex</td>
      <td>0.219923</td>
      <td>0.378864</td>
      <td>0.008</td>
      <td>0.012278</td>
      <td>0.154766</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Age</td>
      <td>0.037397</td>
      <td>0.028768</td>
      <td>0.014</td>
      <td>0.050445</td>
      <td>0.032653</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Parch</td>
      <td>0.021551</td>
      <td>0.016726</td>
      <td>0.064</td>
      <td>0.012390</td>
      <td>0.028667</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Fare</td>
      <td>0.053214</td>
      <td>0.056139</td>
      <td>0.040</td>
      <td>0.053152</td>
      <td>0.050626</td>
    </tr>
  </tbody>
</table>
</div>



### Plotly Barplot of Average Feature Importances


```python
y = feature_dataframe["mean"].values
x = feature_dataframe["features"].values
data = [go.Bar(
    x=x,
    y=y,
    width=0.5,
    marker=dict(
        color=feature_dataframe["mean"].values,
        colorscale="Portland",
        showscale=True,
        reversescale=False
    ),
    opacity=0.6
)]

layout = go.Layout(
    autosize=True,
    title="Barplots of Mean Feature Importance",
    hovermode="closest",
    yaxis=dict(
        title="Feature Importance",
        ticklen=5,
        gridwidth=2
    ),
    showlegend=False
)

fig = go.Figure(data=data, layout=layout)
py.iplot(fig, filename="bar-direct-labels")
```


![png](/assets/images/220416/5.png)


# Second-Level Predictions from the First-level Output

## First-level output as new features


```python
base_predictions_train = pd.DataFrame({
    "RandomForest": rf_oof_train.ravel(),
    "ExtraTrees": et_oof_train.ravel(),
    "AdaBoost": ada_oof_train.ravel(),
    "GradientBoost": gb_oof_train.ravel()
})

base_predictions_train.head()
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
      <th>RandomForest</th>
      <th>ExtraTrees</th>
      <th>AdaBoost</th>
      <th>GradientBoost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>



## Correlation Heatmap of the Second Level Training set


```python
data = [go.Heatmap(
    z=base_predictions_train.astype(float).corr().values,
    x=base_predictions_train.columns.values,
    y=base_predictions_train.columns.values,
    colorscale="Viridis",
    showscale=True,
    reversescale=True
)]
py.iplot(data, filename="labelled-heatmap")
```


![png](/assets/images/220416/6.png)


```python
x_train = np.concatenate((et_oof_train, rf_oof_train, ada_oof_train, gb_oof_train, svc_oof_train), axis=1)
x_test = np.concatenate((et_oof_test, rf_oof_test, ada_oof_test, gb_oof_test, svc_oof_test), axis=1)
```

## Second level learning model via XGBoost


```python
gbm = xgb.XGBClassifier(
    n_estimators=2000,
    max_depth=4,
    min_child_weight=2, # 값이 클수록 모델은 보수적
    gamma=0.9,
    subsample=0.8,
    colsample_bytree=0.8,
    objective="binary:logistic",
    nthread=-1,
    scale_pos_weight=1 # imbalance data에 사용, sum(negative instances) / sum(positive instances)
).fit(x_train, y_train)

predictions = gbm.predict(x_test)
```

    [15:53:04] WARNING: C:/Users/Administrator/workspace/xgboost-win64_release_1.5.1/src/learner.cc:1115: Starting in XGBoost 1.3.0, the default evaluation metric used with the objective 'binary:logistic' was changed from 'error' to 'logloss'. Explicitly set eval_metric if you'd like to restore the old behavior.
    

## Producing the Submission file


```python
StackingSubmission = pd.DataFrame({
    "PassengerId": PassengerId,
    "Survived": predictions
})
StackingSubmission.to_csv("StackingSubmission.csv", index=False)
```

------------
# End
