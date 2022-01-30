---
layout: single
title: "XGBoost 산탄데르 고객 데이터"
categories: 데이터 분석
tag: [
    python,
    머신러닝,
    blog,
    github,
    sklearn,
    사이킥런,
    이상치,
    제거,
    xgboost,
    santander,
    산탄데르
    lightgbm,
    산데르센,
    멀티캠퍼스,
    국비지원,
    교육,
    분석,
    데이터,
    파이썬,
  ]
toc: true
sidebar:
  nav: "docs"
---

## XGBoost, LightGBM 분류학습

- 머신러닝 분류 성능을 높이는 두가지 방법?
- 이상치 제거 vs 하이퍼 파라미터 튜닝
- 산탄데르은행 고객 데이터를 활용

### 1. 데이터 전처리

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
```

```python
cust_df = pd.read_csv('train_santander.csv', encoding='latin-1')
cust_df.head(2)
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
      <th>ID</th>
      <th>var3</th>
      <th>var15</th>
      <th>imp_ent_var16_ult1</th>
      <th>imp_op_var39_comer_ult1</th>
      <th>imp_op_var39_comer_ult3</th>
      <th>imp_op_var40_comer_ult1</th>
      <th>imp_op_var40_comer_ult3</th>
      <th>imp_op_var40_efect_ult1</th>
      <th>imp_op_var40_efect_ult3</th>
      <th>...</th>
      <th>saldo_medio_var33_hace2</th>
      <th>saldo_medio_var33_hace3</th>
      <th>saldo_medio_var33_ult1</th>
      <th>saldo_medio_var33_ult3</th>
      <th>saldo_medio_var44_hace2</th>
      <th>saldo_medio_var44_hace3</th>
      <th>saldo_medio_var44_ult1</th>
      <th>saldo_medio_var44_ult3</th>
      <th>var38</th>
      <th>TARGET</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>2</td>
      <td>23</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>39205.17</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>2</td>
      <td>34</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>49278.03</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>2 rows × 371 columns</p>
</div>

```python
# 만족: 0, 불만족: 1
print(cust_df['TARGET'].value_counts())
```

    0    73012
    1     3008
    Name: TARGET, dtype: int64

```python
# 불만족 비율
total_cnt = cust_df['TARGET'].count()
unsatis_cnt = cust_df[cust_df['TARGET']==1]['TARGET'].count()
print(f'불만족 비율: {100*unsatis_cnt/total_cnt:.2f}%')
```

    불만족 비율: 3.96%

```python
# 이상치 확인
cust_df.describe()
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
      <th>ID</th>
      <th>var3</th>
      <th>var15</th>
      <th>imp_ent_var16_ult1</th>
      <th>imp_op_var39_comer_ult1</th>
      <th>imp_op_var39_comer_ult3</th>
      <th>imp_op_var40_comer_ult1</th>
      <th>imp_op_var40_comer_ult3</th>
      <th>imp_op_var40_efect_ult1</th>
      <th>imp_op_var40_efect_ult3</th>
      <th>...</th>
      <th>saldo_medio_var33_hace2</th>
      <th>saldo_medio_var33_hace3</th>
      <th>saldo_medio_var33_ult1</th>
      <th>saldo_medio_var33_ult3</th>
      <th>saldo_medio_var44_hace2</th>
      <th>saldo_medio_var44_hace3</th>
      <th>saldo_medio_var44_ult1</th>
      <th>saldo_medio_var44_ult3</th>
      <th>var38</th>
      <th>TARGET</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>...</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>76020.000000</td>
      <td>7.602000e+04</td>
      <td>76020.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>75964.050723</td>
      <td>-1523.199277</td>
      <td>33.212865</td>
      <td>86.208265</td>
      <td>72.363067</td>
      <td>119.529632</td>
      <td>3.559130</td>
      <td>6.472698</td>
      <td>0.412946</td>
      <td>0.567352</td>
      <td>...</td>
      <td>7.935824</td>
      <td>1.365146</td>
      <td>12.215580</td>
      <td>8.784074</td>
      <td>31.505324</td>
      <td>1.858575</td>
      <td>76.026165</td>
      <td>56.614351</td>
      <td>1.172358e+05</td>
      <td>0.039569</td>
    </tr>
    <tr>
      <th>std</th>
      <td>43781.947379</td>
      <td>39033.462364</td>
      <td>12.956486</td>
      <td>1614.757313</td>
      <td>339.315831</td>
      <td>546.266294</td>
      <td>93.155749</td>
      <td>153.737066</td>
      <td>30.604864</td>
      <td>36.513513</td>
      <td>...</td>
      <td>455.887218</td>
      <td>113.959637</td>
      <td>783.207399</td>
      <td>538.439211</td>
      <td>2013.125393</td>
      <td>147.786584</td>
      <td>4040.337842</td>
      <td>2852.579397</td>
      <td>1.826646e+05</td>
      <td>0.194945</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>-999999.000000</td>
      <td>5.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>...</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>5.163750e+03</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>38104.750000</td>
      <td>2.000000</td>
      <td>23.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>...</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>6.787061e+04</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>76043.000000</td>
      <td>2.000000</td>
      <td>28.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>...</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.064092e+05</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>113748.750000</td>
      <td>2.000000</td>
      <td>40.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>...</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.187563e+05</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>151838.000000</td>
      <td>238.000000</td>
      <td>105.000000</td>
      <td>210000.000000</td>
      <td>12888.030000</td>
      <td>21024.810000</td>
      <td>8237.820000</td>
      <td>11073.570000</td>
      <td>6600.000000</td>
      <td>6600.000000</td>
      <td>...</td>
      <td>50003.880000</td>
      <td>20385.720000</td>
      <td>138831.630000</td>
      <td>91778.730000</td>
      <td>438329.220000</td>
      <td>24650.010000</td>
      <td>681462.900000</td>
      <td>397884.300000</td>
      <td>2.203474e+07</td>
      <td>1.000000</td>
    </tr>
  </tbody>
</table>
<p>8 rows × 371 columns</p>
</div>

-> var3 값 분포가 이상하다!

```python
cust_df['var3'].value_counts()[:5]
```

     2         74165
     8           138
    -999999      116
     9           110
     3           108
    Name: var3, dtype: int64

-> -999999 값을 최빈값인 2로 대체한다

```python
# var3 값 대체
cust_df['var3'] = cust_df['var3'].replace(-999999, 2)

# cust_df = cust_df.drop('ID',axis=1)
cust_df.iloc[:,:3]
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
      <th>ID</th>
      <th>var3</th>
      <th>var15</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>2</td>
      <td>23</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>2</td>
      <td>34</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>2</td>
      <td>23</td>
    </tr>
    <tr>
      <th>3</th>
      <td>8</td>
      <td>2</td>
      <td>37</td>
    </tr>
    <tr>
      <th>4</th>
      <td>10</td>
      <td>2</td>
      <td>39</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>76015</th>
      <td>151829</td>
      <td>2</td>
      <td>48</td>
    </tr>
    <tr>
      <th>76016</th>
      <td>151830</td>
      <td>2</td>
      <td>39</td>
    </tr>
    <tr>
      <th>76017</th>
      <td>151835</td>
      <td>2</td>
      <td>23</td>
    </tr>
    <tr>
      <th>76018</th>
      <td>151836</td>
      <td>2</td>
      <td>25</td>
    </tr>
    <tr>
      <th>76019</th>
      <td>151838</td>
      <td>2</td>
      <td>46</td>
    </tr>
  </tbody>
</table>
<p>76020 rows × 3 columns</p>
</div>

```python
# feature, target 분리
     # df 인덱싱 (첫번째는 인덱스, 두번째는 컬럼)
x_features = cust_df.iloc[:,:-1]
y_labels = cust_df.iloc[:, -1]

print(x_features.shape)
    # 위 두 데이터의 인덱스 수는 같고 컬럼 수는 다르다. (타겟은 컬럼수 1개)
```

    (76020, 370)

```python
from sklearn.model_selection import train_test_split

# 분리 (stratify:계층화하다)
x_train, x_test, y_train, y_test = train_test_split(x_features, y_labels, test_size=0.2, random_state=0, stratify=y_labels)
```

```python
# 분리된 값 분포 확인

train_cnt = y_train.count()
test_cnt = y_test.count()
print(f'학습셋: {x_train.shape}, 테스트셋:{x_test.shape} \n')

# stratify 옵션이 설정되어 있어 분포비율이 유지됨
print('학습셋 레이블 분포비율')
print(y_train.value_counts()/train_cnt)

print('\n 테스트셋 레이블 분포비율')
print(y_test.value_counts()/test_cnt)
```

    학습셋: (60816, 370), 테스트셋:(15204, 370)

    학습셋 레이블 분포비율
    0    0.960438
    1    0.039562
    Name: TARGET, dtype: float64

     테스트셋 레이블 분포비율
    0    0.960405
    1    0.039595
    Name: TARGET, dtype: float64

### 2. XGboost 학습

```python
from xgboost import XGBClassifier
from sklearn.metrics import roc_auc_score

# 모델 객체 생성
xgb_clf = XGBClassifier(n_estimators=100, random_state=156)
    # n_estimators 디폴트 100 (생성할 나무갯수)
    # max_features 선택할 특성의 수
```

```python
# 학습
 # early_stoping : 모니터링되는 측정항목의 개선이 중지되면 학습을 중지
        # 최고치에서 30회까지 개선이 없으면 중지
        # 왼쪽은 학습, 우측은 검증 (검증값이 가장 높은 건 15번째 + 30 더하고 멈춤)
xgb_clf.fit(x_train, y_train, early_stopping_rounds=30,
            eval_metric="auc", eval_set=[(x_train, y_train), (x_test, y_test)])
      # 원래 검증 셋은 test 말고 다른 데이터 셋으로 해야하지만 여기선 그냥 test 셋으로 진행함
```

```python
# 분류 성능 확인
    # y_test 값과 xgb_clf 예측값을 비교,
xgb_roc_score = roc_auc_score(y_test, xgb_clf.predict_proba(x_test)[:,1], average='macro')
    # 평균의 종류 - 매크로(점수), 마이크로(점수x데이터수)
print(f'ROC AUC: {xgb_roc_score:.4f}')
```

    ROC AUC: 0.8247

```python
### 3. GridSearchCV 적용
%time # 수행시간 표시
from sklearn.model_selection import GridSearchCV

# 수행속도 향상을 위해 n_estimators를 50으로 감소
xgb_clf = XGBClassifier(n_estimators=50)

# colsample_bytree : 컬럼이 너무 많으니 조정해서 과적합을 조정하겠다.
# min_child_weight: 트리에서 추가로 가지치기 위한 필요 최소 샘플수
params = {'max_depth':[5,7], 'min_child_weight':[1,3], 'colsample_bytree':[0.5,0.75]}

# 하이퍼 파라미터 수행속도를 향상하기 위해 cv는 2 부여함
gridcv = GridSearchCV(xgb_clf, param_grid=params, cv=2)
gridcv.fit(x_train, y_train, early_stopping_rounds=30, eval_metric='auc',eval_set=[(x_train, y_train), (x_test,y_test)])
```

```python
print('GridSearchCv 최적 파라미터:' , gridcv.best_params_)

xgb_roc_score = roc_auc_score(y_test, gridcv.predict_proba(x_test)[:,1], average='macro')
print(f'ROC AUC: {xgb_roc_score:.4f}')
```

    GridSearchCv 최적 파라미터: {'colsample_bytree': 0.75, 'max_depth': 5, 'min_child_weight': 3}
    ROC AUC: 0.8260

-> 교차검증 해도 큰 차이 없다

### 3. 하이퍼파라미터 튜닝

```python
%%time

# 새로운 하이퍼파라미터 적용된 XGBClassifier 객체 생성
xgb_clf = XGBClassifier(n_estimators=1000, random_state=156, learning_rate=0.02, max_depth=5,
                               min_child_weight=1, colsample_bytree=0.75, reg_alpha=0.03)
    # colsample_bytree(1.0) : x트리(스탭)마다 사용할 칼럼(feature)의 비율
    # learning_rate(0.2) : 학습률은 낮을수록 모델이 견고해지고 오버피팅에 좋지만, Step 수를 줄이기 위해 올리기도함
    # min_child_weight(1): 트리에서 추가로 가지치는 최소 샘플수 (과적합 조절)
    # max_depth(6) : 너무 크면 과적합(통상 3~10 적용), 0 or ∞ 을 적용하면 제한없어짐
    # reg_lambda(1) : L2 Regularization(규제) 적용값, 피처개수가 많을 때 적용을 검토, 클수록 과적합 감소

# 학습
# eval_metric : 검증에 사용되는 함수 정의(통상 회귀'rmse', 분류'error'), 여기선 auc 스코어를 적용
xgb_clf.fit(x_train, y_train, early_stopping_rounds=200,
           eval_metric='auc', eval_set=[(x_train, y_train), (x_test, y_test)])
```

```python
# 평가(roc auc)
xgb_roc_score = roc_auc_score(y_test, xgb_clf.predict_proba(x_test)[:,1],average='macro')
print(f'ROC AUC: {xgb_roc_score:.4f}')
```

    ROC AUC: 0.8265

```python
from xgboost import plot_importance
import matplotlib.pyplot as plt
%matplotlib inline

fig, ax = plt.subplots(1,1,figsize=(10,8))
plot_importance(xgb_clf, ax=ax , max_num_features=20,height=0.4);
```

![output_24_0](https://user-images.githubusercontent.com/67591105/150675496-2440646b-b889-4a3b-8fc1-569a57a7baf1.png)

-> 피처이름이 나오는 건 DF타입인 xgb_clf.fit(x_train)이 인자이기 때문

### 4. LightGBM 모델 학습

```python
from lightgbm import LGBMClassifier

# LGBMClassifier 객체 생성
lgbm_clf = LGBMClassifier(n_estimators=500)

# 검증 데이터 지정
evals = [(x_test, y_test)]

# 학습
lgbm_clf.fit(x_train, y_train, early_stopping_rounds=100, eval_metric="auc", eval_set=evals,
                verbose=True)
# 평가(roc auc)
lgbm_roc_score = roc_auc_score(y_test, lgbm_clf.predict_proba(x_test)[:,1],average='macro')
    # predict_proba(X_test)[:,1] -> 두번째 컬럼(1이 될 활률 반환), ~[:,0] 첫번째 컬럼(0 확률 반환)
```

```python
print('ROC AUC: {0:.4f}'.format(lgbm_roc_score))
```

    ROC AUC: 0.8243

```python
%%time
# 그리드서치CV 수행
from sklearn.model_selection import GridSearchCV

# 하이퍼 파라미터 테스트의 수행 속도를 향상시키기 위해 n_estimators를 100으로 감소
LGBM_clf = LGBMClassifier(n_estimators=100)
```

    CPU times: total: 0 ns
    Wall time: 0 ns

-> XGBoost에 비하면 수행시간이 엄청 빠르다

```python
# 위 하이퍼 파라미터를 적용하고 n_estimators는 1000으로 증가, early_stopping_rounds는 100으로 증가
lgbm_clf = LGBMClassifier(n_estimators=1000, num_leaves=32, sumbsample=0.8, min_child_samples=100,
                          max_depth=128)

evals = [(x_test, y_test)]
lgbm_clf.fit(x_train, y_train, early_stopping_rounds=100, eval_metric="auc", eval_set=evals,
                verbose=True)

lgbm_roc_score = roc_auc_score(y_test, lgbm_clf.predict_proba(x_test)[:,1],average='macro')
```

```python
print('ROC AUC: {0:.4f}'.format(lgbm_roc_score))
```

    ROC AUC: 0.8246

```python
params = {'num_leaves': [32, 64],
          'max_depth':[128, 160],
          'min_child_samples':[60, 100],
          'subsample':[0.8, 1]}

# 하이퍼 파라미터 테스트 수행속도 향상을 위해 cv 지정하지 않음
gridcv = GridSearchCV(lgbm_clf, param_grid=params)
gridcv.fit(x_train, y_train, early_stopping_rounds=30, eval_metric="auc",
           eval_set=[(x_train, y_train), (x_test, y_test)])
```

```python
print('GridSearchCV 최적 파라미터:', gridcv.best_params_)
lgbm_roc_score = roc_auc_score(y_test, gridcv.predict_proba(x_test)[:,1], average='macro')
print('ROC AUC: {0:.4f}'.format(lgbm_roc_score))
```

    GridSearchCV 최적 파라미터: {'max_depth': 128, 'min_child_samples': 100, 'num_leaves': 32, 'subsample': 0.8}
    ROC AUC: 0.8246

## 결론

### 검증된 알고리즘을 쓰는 경우 하이퍼 파라미터 튜닝보단

### 피처 엔지니어링의 성능 향상에 효과적인 경우가 많다

### -> 이상치제거, 표준정규화 등
