

# [AI_8기] 6조 머신러닝 & 딥러닝 팀과제

| **팀원** | ✭박성규                                                                                            | 김민철                                                                                              | 이시헌                                                                                            | 박윤지                                                                                             |
|:------:|:-----------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------:|
|        | ![박성규님](https://github.com/user-attachments/assets/40f97c52-c562-44b0-bef6-12289e149d27) | ![김민철님](https://github.com/user-attachments/assets/28b83bd5-13c2-4249-beab-64f7567e1816) | ![이시헌님](https://github.com/user-attachments/assets/7b91b2aa-c113-44ed-8f41-e8df1ef7d06d) | ![박윤지님](https://github.com/user-attachments/assets/8d5be377-1a58-4f88-9ee2-176d1e1d162e) |
| **역할** | 오류 제어 및 REPO 관리 <br> 이모티콘 전처리 기능 추가                                                                | 모델 학습 테스트 및 <br> 기능 개선                                                                                | 모델 성능 비교 및 데이터 통계 <br> 마크다운 & README.md 작성                                                          | GIT 충돌 관리 및 팀원 코드 리뷰 <br> 모델 별 시각화                                                                 |

## 개발 환경

![://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566791609/noticon/nen1y11gazeqhejw7nmhttps1.png](https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566791609/noticon/nen1y11gazeqhejw7nm1.png) ![https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1626170585/noticon/uqui2rrxtt26ngudnhdu.png](https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1626170585/noticon/uqui2rrxtt26ngudnhdu.png)![https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1632975248/noticon/sph4ujixspcnhzpw8zky.png](https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1632975248/noticon/sph4ujixspcnhzpw8zky.png)

# 목차

- ## [타이타닉 생존자 예측](#%EF%B8%8F-타이타닉-생존자-예측)
  
  - ### [목표](#목표-2)
    #### 1. 데이터셋 불러오기
    #### 2. feature 분석
    #### 3. feature engineering
    #### 4. 모델 학습시키기 <br> (Logistic Regression, Decision Tree, XGBoost)

  - ### [추가 목표](#추가-목표-2)
    #### 5. 모델별 시각화 자료 (추가)
    #### 6. 모델 성능 비교 (추가)

- ## [영화 리뷰 감성 분석](#-영화-리뷰-감성-분석)

  - ### [목표](#목표-3)
    #### 1. 데이터셋 불러오기
    #### 2. 데이터 전처리
    #### 3. feature 분석 (EDA)
    #### 4. 리뷰 예측 모델 학습시키기 (LSTM)

  - ### [추가 목표](#추가-목표-3) 
    - [x] NLP 이용
    - [x] 긍정 / 부정 리뷰의 워드 클라우드 그려보기

  - ### [예측 모델 기능 개선 (추가)](#예측-모델-기능-개선-추가-1)
   - #### 이모티콘 전처리
   - #### 모델 학습 테스트 및 기능 개선

# ⛴️ 타이타닉 생존자 예측

> 타이타닉 탑승객 데이터셋을 활용해 생존자를 예측하는 모델을 만드는 프로젝트

## 목표

<details>
<summary> 1. 데이터셋 불러오기</summary>

```python
import seaborn as sns

titanic = sns.load_dataset('titanic')
```

> titanic Dataset

<!-- dataset df -->

<div> 
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>survived</th>
      <th>pclass</th>
      <th>sex</th>
      <th>age</th>
      <th>sibsp</th>
      <th>parch</th>
      <th>fare</th>
      <th>embarked</th>
      <th>class</th>
      <th>who</th>
      <th>adult_male</th>
      <th>deck</th>
      <th>embark_town</th>
      <th>alive</th>
      <th>alone</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>S</td>
      <td>Third</td>
      <td>man</td>
      <td>True</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>no</td>
      <td>False</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>C</td>
      <td>First</td>
      <td>woman</td>
      <td>False</td>
      <td>C</td>
      <td>Cherbourg</td>
      <td>yes</td>
      <td>False</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>S</td>
      <td>Third</td>
      <td>woman</td>
      <td>False</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>yes</td>
      <td>True</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>S</td>
      <td>First</td>
      <td>woman</td>
      <td>False</td>
      <td>C</td>
      <td>Southampton</td>
      <td>yes</td>
      <td>False</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>S</td>
      <td>Third</td>
      <td>man</td>
      <td>True</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>no</td>
      <td>True</td>
    </tr>
    <tr>
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
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0</td>
      <td>2</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>13.0000</td>
      <td>S</td>
      <td>Second</td>
      <td>man</td>
      <td>True</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>no</td>
      <td>True</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>S</td>
      <td>First</td>
      <td>woman</td>
      <td>False</td>
      <td>B</td>
      <td>Southampton</td>
      <td>yes</td>
      <td>True</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0</td>
      <td>3</td>
      <td>female</td>
      <td>NaN</td>
      <td>1</td>
      <td>2</td>
      <td>23.4500</td>
      <td>S</td>
      <td>Third</td>
      <td>woman</td>
      <td>False</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>no</td>
      <td>False</td>
    </tr>
    <tr>
      <th>889</th>
      <td>1</td>
      <td>1</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>C</td>
      <td>First</td>
      <td>man</td>
      <td>True</td>
      <td>C</td>
      <td>Cherbourg</td>
      <td>yes</td>
      <td>True</td>
    </tr>
    <tr>
      <th>890</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.7500</td>
      <td>Q</td>
      <td>Third</td>
      <td>man</td>
      <td>True</td>
      <td>NaN</td>
      <td>Queenstown</td>
      <td>no</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
<p>891 rows × 15 columns</p>
</div>
</details>
<br>

<details>
<summary>2. feature 분석</summary>

> 데이터 프레임 첫 5행

```python
titanic.head()
```

<!-- head df -->

<div>
<table border="1" class="dataframe">
   <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>survived</th>
      <th>pclass</th>
      <th>sex</th>
      <th>age</th>
      <th>sibsp</th>
      <th>parch</th>
      <th>fare</th>
      <th>embarked</th>
      <th>class</th>
      <th>who</th>
      <th>adult_male</th>
      <th>deck</th>
      <th>embark_town</th>
      <th>alive</th>
      <th>alone</th>
    </tr>
   </thead>
   <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>S</td>
      <td>Third</td>
      <td>man</td>
      <td>True</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>no</td>
      <td>False</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>C</td>
      <td>First</td>
      <td>woman</td>
      <td>False</td>
      <td>C</td>
      <td>Cherbourg</td>
      <td>yes</td>
      <td>False</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>S</td>
      <td>Third</td>
      <td>woman</td>
      <td>False</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>yes</td>
      <td>True</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>S</td>
      <td>First</td>
      <td>woman</td>
      <td>False</td>
      <td>C</td>
      <td>Southampton</td>
      <td>yes</td>
      <td>False</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>S</td>
      <td>Third</td>
      <td>man</td>
      <td>True</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>no</td>
      <td>True</td>
    </tr>
   </tbody>
   </table>
   </div>

> 통계 확인 

```python
titanic.describe()
```

`타이타닉 데이터셋 주요 항목 (행 row)`

| <span style="color:blue">**항목**</span>       | <span style="color:blue">**설명**</span> |
| -------------------------------------------- | -------------------------------------- |
| <span style="color:blue">**survived**</span> | 승객 생존 여부 (0 = 사망, 1 = 생존)              |
| <span style="color:green">**pclass**</span>  | 객실 등급 (1 = 1등석, 2 = 2등석, 3 = 3등석)      |
| <span style="color:purple">**age**</span>    | 승객 나이                                  |
| <span style="color:orange">**sibsp**</span>  | 동반한 형제자매 및 배우자 수                       |
| <span style="color:orange">**parch**</span>  | 동반한 부모 및 자녀 수                          |
| <span style="color:teal">**fare**</span>     | 승객이 지불한 운임 금액                          |

`타이타닉 데이터셋 주요 통계 (열 Column)`

| <span style="color:blue">**지표**</span>    | <span style="color:blue">**설명**</span>  |
| ----------------------------------------- | --------------------------------------- |
| <span style="color:blue">**count**</span> | 데이터가 존재하는 항목의 개수 (결측치를 제외한 값의 개수)       |
| <span style="color:green">**mean**</span> | 값들의 평균                                  |
| <span style="color:purple">**std**</span> | 표준편차 (데이터가 평균으로부터 얼마나 퍼져 있는지를 나타냄)      |
| <span style="color:orange">**min**</span> | 데이터의 최소값                                |
| <span style="color:teal">**25%**</span>   | 하위 25%에 해당하는 값. 데이터의 25%가 이 값보다 작음      |
| <span style="color:orange">**50%**</span> | 중위값 (데이터의 중간 값). 데이터의 50%가 이 값보다 작거나 같음 |
| <span style="color:teal">**75%**</span>   | 상위 25%에 해당하는 값. 데이터의 75%가 이 값보다 작음      |
| <span style="color:red">**max**</span>    | 데이터의 최대값                                |

> 데이터셋 통계

<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>survived</th>
      <th>pclass</th>
      <th>age</th>
      <th>sibsp</th>
      <th>parch</th>
      <th>fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>714.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>0.383838</td>
      <td>2.308642</td>
      <td>29.699118</td>
      <td>0.523008</td>
      <td>0.381594</td>
      <td>32.204208</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.486592</td>
      <td>0.836071</td>
      <td>14.526497</td>
      <td>1.102743</td>
      <td>0.806057</td>
      <td>49.693429</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.420000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>0.000000</td>
      <td>2.000000</td>
      <td>20.125000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>7.910400</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>0.000000</td>
      <td>3.000000</td>
      <td>28.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>14.454200</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>38.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>31.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>80.000000</td>
      <td>8.000000</td>
      <td>6.000000</td>
      <td>512.329200</td>
    </tr>
  </tbody>
</table>
</div>
<br>

</details>

<br>

<details>
<summary>
3. feature engineering
</summary>

> 결측치 처리

`결측치 갯수 확인`

```python
titanic.isnull().sum()
```

| <span style="color:blue">**항목**</span>            | <span style="color:blue">**결측치 수**</span> |
| ------------------------------------------------- | ----------------------------------------- |
| <span style="color:blue">**survived**</span>      | 0                                         |
| <span style="color:green">**pclass**</span>       | 0                                         |
| <span style="color:purple">**sex**</span>         | 0                                         |
| <span style="color:orange">**age**</span>         | 177                                       |
| <span style="color:teal">**sibsp**</span>         | 0                                         |
| <span style="color:blue">**parch**</span>         | 0                                         |
| <span style="color:green">**fare**</span>         | 0                                         |
| <span style="color:purple">**embarked**</span>    | 2                                         |
| <span style="color:orange">**class**</span>       | 0                                         |
| <span style="color:teal">**who**</span>           | 0                                         |
| <span style="color:blue">**adult_male**</span>    | 0                                         |
| <span style="color:green">**deck**</span>         | 688                                       |
| <span style="color:purple">**embark_town**</span> | 2                                         |
| <span style="color:orange">**alive**</span>       | 0                                         |
| <span style="color:teal">**alone**</span>         | 0                                         |

`결측치 값 대체`

```python
#Age(나이)의 결측치는 중앙값으로, Embarked(승선 항구)의 결측치는 최빈값으로 대체. 
titanic['age'].fillna(titanic['age'].median(), inplace=True)
titanic['embarked'].fillna(titanic['embarked'].mode()[0], inplace=True)

# 대체한 후에, 대체 결과를 isnull() 함수와 sum()  함수를 이용해서 확인
print(titanic['age'].isnull().sum())
print(titanic['embarked'].isnull().sum())
```

`수치형으로 인코딩`

```python
# Sex(성별)를 남자는 0, 여자는 1로 변환. 
# alive(생존여부)를 True는 1, False는 0으로 변환. 
# Embarked(승선 항구)는 ‘C’는 0으로, Q는 1으로, ‘S’는 2로 변환. 
# 모두 변환한 후에, 변환 결과를 head 함수를 이용해 확인. 


titanic['sex'] = titanic['sex'].map({'male': 0, 'female': 1})
titanic['alive'] = titanic['alive'].map({'no': 1, 'yes': 0})
titanic['embarked'] = titanic['embarked'].map({'C': 0, 'Q': 1, 'S': 2,})

print(titanic['sex'].head())
print(titanic['alive'].head())
print(titanic['embarked'].head())
```

`새로운 feature 생성`

```python
#Sibsp , Parch 를 통해 family_size 생성
#새로운 Feature를 head함수를 이용해 확인

titanic['family_size'] = titanic['sibsp'] + titanic['parch'] + 1

print(titanic['family_size'].head())
```

> 가족구성원 항목 추가된 데이터프레임

<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>survived</th>
      <th>pclass</th>
      <th>sex</th>
      <th>age</th>
      <th>sibsp</th>
      <th>parch</th>
      <th>fare</th>
      <th>embarked</th>
      <th>class</th>
      <th>who</th>
      <th>adult_male</th>
      <th>deck</th>
      <th>embark_town</th>
      <th>alive</th>
      <th>alone</th>
      <th>family_size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>0</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>2</td>
      <td>Third</td>
      <td>man</td>
      <td>True</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>1</td>
      <td>False</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>0</td>
      <td>First</td>
      <td>woman</td>
      <td>False</td>
      <td>C</td>
      <td>Cherbourg</td>
      <td>0</td>
      <td>False</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>1</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>2</td>
      <td>Third</td>
      <td>woman</td>
      <td>False</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>0</td>
      <td>True</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>2</td>
      <td>First</td>
      <td>woman</td>
      <td>False</td>
      <td>C</td>
      <td>Southampton</td>
      <td>0</td>
      <td>False</td>
      <td>2</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>3</td>
      <td>0</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>2</td>
      <td>Third</td>
      <td>man</td>
      <td>True</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>1</td>
      <td>True</td>
      <td>1</td>
    </tr>
    <tr>
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
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0</td>
      <td>2</td>
      <td>0</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>13.0000</td>
      <td>2</td>
      <td>Second</td>
      <td>man</td>
      <td>True</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>1</td>
      <td>True</td>
      <td>1</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>2</td>
      <td>First</td>
      <td>woman</td>
      <td>False</td>
      <td>B</td>
      <td>Southampton</td>
      <td>0</td>
      <td>True</td>
      <td>1</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0</td>
      <td>3</td>
      <td>1</td>
      <td>28.0</td>
      <td>1</td>
      <td>2</td>
      <td>23.4500</td>
      <td>2</td>
      <td>Third</td>
      <td>woman</td>
      <td>False</td>
      <td>NaN</td>
      <td>Southampton</td>
      <td>1</td>
      <td>False</td>
      <td>4</td>
    </tr>
    <tr>
      <th>889</th>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>0</td>
      <td>First</td>
      <td>man</td>
      <td>True</td>
      <td>C</td>
      <td>Cherbourg</td>
      <td>0</td>
      <td>True</td>
      <td>1</td>
    </tr>
    <tr>
      <th>890</th>
      <td>0</td>
      <td>3</td>
      <td>0</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.7500</td>
      <td>1</td>
      <td>Third</td>
      <td>man</td>
      <td>True</td>
      <td>NaN</td>
      <td>Queenstown</td>
      <td>1</td>
      <td>True</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<p>891 rows × 16 columns</p>
</div>

</details>
<br>

<details>
<summary>
4. 모델 학습시키기 (Logistic Regression, Decision Tree, XGBoost)  
</summary>

`데이터 스케일링 진행`

```py
#feature와 target 분리

titanic = titanic[['survived', 'pclass', 'sex', 'age', 'sibsp', 'parch', 'fare', 'embarked', 'family_size']]
X = titanic.drop('survived', axis=1) # feature
y = titanic['survived'] # target

# x는 승객의 생존 여부를 제외한 나머지 모든 열을 학습에 사용할 특징
# y는 승객이 생존했는지의 여부
# x로 y를 예측
```

> Logistic Regression

```py
# Logistic Regression

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# 데이터 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 데이터 스케일링
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 모델 생성 및 학습
model = LogisticRegression()
model.fit(X_train, y_train)

# 예측
y_pred = model.predict(X_test)

# 평가
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print(f"Classification Report:\n{classification_report(y_test, y_pred)}")
```

> 🔍 Logistic Regression 결과 요약

| **지표**                | **희생자 (0)**                      | **생존자 (1)**                      |
| --------------------- | -------------------------------- | -------------------------------- |
| **정밀도 (Precision)**   | 0.82 (모델이 예측한 '희생자' 중 실제 희생자 비율) | 0.78 (모델이 예측한 '생존자' 중 실제 생존자 비율) |
| **재현율 (Recall)**      | 0.86 (실제 희생자 중 정확히 예측한 비율)       | 0.73 (실제 생존자 중 정확히 예측한 비율)       |
| **F1-스코어 (F1-Score)** | 0.84 (정밀도와 재현율의 조화평균)            | 0.76 (정밀도와 재현율의 조화평균)            |
| **지원 (Support)**      | 105                              | 74                               |

| **평균 지표**          | **값**                                         |
| ------------------ | --------------------------------------------- |
| **정확도 (Accuracy)** | 0.80 (전체 데이터에서 정확히 예측한 비율)                    |
| **Macro 평균**       | Precision: 0.80, Recall: 0.79, F1-Score: 0.80 |
| **Weighted 평균**    | Precision: 0.80, Recall: 0.80, F1-Score: 0.80 |

**요약**: Logistic Regression 모델은 약 80%의 정확도를 보이며, 희생자를 예측하는 데 있어서 재현율이 높아(0.86) 희생자를 잘 예측. 생존자에 대한 재현율은 상대적으로 낮아(0.73) 생존자를 놓치는 경향이 약간 있음.

> Decision Tree

```py
#Decision Tree

from sklearn.tree import DecisionTreeClassifier  # Decision Tree 분류기
# 데이터 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 데이터 스케일링
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 모델 생성 및 학습
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# 예측
y_pred = model.predict(X_test)

# 평가
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print(f"Classification Report:\n{classification_report(y_test, y_pred)}")
```

> 🔍 Decision Tree 모델 결과 요약

| **지표**                | **희생자 (0)**                      | **생존자 (1)**                      |
| --------------------- | -------------------------------- | -------------------------------- |
| **정밀도 (Precision)**   | 0.83 (모델이 예측한 '희생자' 중 실제 희생자 비율) | 0.70 (모델이 예측한 '생존자' 중 실제 생존자 비율) |
| **재현율 (Recall)**      | 0.76 (실제 희생자 중 정확히 예측한 비율)       | 0.78 (실제 생존자 중 정확히 예측한 비율)       |
| **F1-스코어 (F1-Score)** | 0.80 (정밀도와 재현율의 조화평균)            | 0.74 (정밀도와 재현율의 조화평균)            |
| **지원 (Support)**      | 105                              | 74                               |

| **평균 지표**          | **값**                                         |
| ------------------ | --------------------------------------------- |
| **정확도 (Accuracy)** | 0.77 (전체 데이터에서 정확히 예측한 비율)                    |
| **Macro 평균**       | Precision: 0.77, Recall: 0.77, F1-Score: 0.77 |
| **Weighted 평균**    | Precision: 0.78, Recall: 0.77, F1-Score: 0.77 |

**요약**: Decision Tree 모델은 약 77%의 정확도를 보이며, 희생자 예측에서 정밀도가 높아(0.83) 희생자를 잘 분류하는 경향이 있음. 생존자의 재현율이 다소 높아(0.78) 생존자를 놓치는 경우는 적으나, 정밀도가 희생자에 비해 낮아(0.70) 생존자 예측 정확도가 떨어질 수 있음.

> XGBoost

```py
import xgboost as xgb
from sklearn.metrics import mean_squared_error

# 데이터 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 데이터 스케일링
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# XGBoost 모델 생성
xgb_model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)

# 모델 학습
xgb_model.fit(X_train_scaled, y_train)

# 예측
y_pred_xgb = xgb_model.predict(X_test_scaled)

# 평가
mse_xgb = mean_squared_error(y_test, y_pred_xgb)
print(f'XGBoost 모델의 MSE: {mse_xgb}')
```

> 🔍 XGBoost 모델 결과 요약

| **지표**                | **희생자 (0)**                      | **생존자 (1)**                      |
| --------------------- | -------------------------------- | -------------------------------- |
| **정밀도 (Precision)**   | 0.82 (모델이 예측한 '희생자' 중 실제 희생자 비율) | 0.78 (모델이 예측한 '생존자' 중 실제 생존자 비율) |
| **재현율 (Recall)**      | 0.86 (실제 희생자 중 정확히 예측한 비율)       | 0.73 (실제 생존자 중 정확히 예측한 비율)       |
| **F1-스코어 (F1-Score)** | 0.84 (정밀도와 재현율의 조화평균)            | 0.76 (정밀도와 재현율의 조화평균)            |
| **지원 (Support)**      | 105                              | 74                               |

| **평균 지표**          | **값**                                         |
| ------------------ | --------------------------------------------- |
| **정확도 (Accuracy)** | 0.80 (전체 데이터에서 정확히 예측한 비율)                    |
| **Macro 평균**       | Precision: 0.80, Recall: 0.79, F1-Score: 0.80 |
| **Weighted 평균**    | Precision: 0.80, Recall: 0.80, F1-Score: 0.80 |

**요약**: XGBoost 모델은 약 80%의 정확도를 보이며, 희생자 예측에서 높은 재현율(0.86)로 실제 희생자를 잘 식별하는 경향이 있음. 생존자 예측에서는 정밀도가 상대적으로 높아(0.78) 생존자를 더 정확하게 예측하며, 생존자 재현율은 0.73으로 다소 낮음. 전반적으로, XGBoost 모델은 희생자 식별에 강점을 보임.

</details>

## 추가 목표

<details>
<summary>
5. 모델별 시각화 자료 (추가)
</summary>

> 혼동 행렬 시각화 (Confusion Matrix)

```py
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc

# Confusion Matrix 시각화
conf_matrix = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=conf_matrix)
disp.plot(cmap=plt.cm.Blues)
plt.title('Confusion Matrix')
plt.show()
```

![ConfusionMatrix](https://github.com/user-attachments/assets/70734599-86ee-4d8a-ae0a-c4fe5a317771)

> 특성 중요도 (회귀 계수) 시각화

```py
feature_importance = model.coef_[0]  # 로지스틱 회귀 모델의 계수
features = X.columns

# 시각화
plt.figure(figsize=(10, 6))
plt.barh(features, feature_importance, color='skyblue')
plt.xlabel('Coefficient Value')
plt.ylabel('Features')
plt.title('Feature Importance in Logistic Regression')
plt.show()
```

![LogisticRegression](https://github.com/user-attachments/assets/e439404f-f671-45ad-a209-e46255b45fb8)

> 결정 트리 시각화 (Decision Tree)

```py
from sklearn.tree import plot_tree

# min_samples_split, min_samples_leaf로 모델 제약하기
model = DecisionTreeClassifier(random_state=42, min_samples_split=20, min_samples_leaf=10)
model.fit(X_train, y_train)

plt.figure(figsize=(20,10))
plot_tree(model, filled=True, feature_names=X.columns, class_names=['Not Survived', 'Survived'], max_depth=4)
plt.title('Simplified Decision Tree')
plt.show()
```

![DecisionTree](https://github.com/user-attachments/assets/9664fe93-9318-4619-8edc-c440b41dc8d0)

> XGBoost 특성 중요도 시각화

```py
# feature_importances_: XGBoost 모델이 예측을 수행하는 데 얼마나 많은 정보를 각 특성에서 얻는지를 나타낸다.
# 특성 중요도 추출
feature_importance = xgb_model.feature_importances_
features = X.columns


# 특성 중요도 시각화
plt.figure(figsize=(10, 6))
plt.barh(features, feature_importance, color='skyblue')
plt.xlabel('Importance')
plt.ylabel('Features')
plt.title('Feature Importance in XGBoost')
plt.show()
```

![XgBoost1](https://github.com/user-attachments/assets/322fe761-d333-4853-80f0-da1a5080b558)

</details>
<br>
<details>
<summary>
6. 모델 성능 비교 (추가)
</summary>

> 🐳 타이타닉 생존자 예측 결과 모델 성능 비교

| **모델**                  | **Accuracy** | <span style="color:red">**Precision (희생자)**</span> | <span style="color:blue">**Precision (생존자)**</span> | <span style="color:red">**Recall (희생자)**</span> | <span style="color:blue">**Recall (생존자)**</span> | <span style="color:red">**F1-Score (희생자)**</span> | <span style="color:blue">**F1-Score (생존자)**</span> |
| ----------------------- | ------------ | -------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ | ------------------------------------------------- | -------------------------------------------------- |
| **Logistic Regression** | 0.8045       | <span style="color:red">0.82</span>                | <span style="color:blue">0.78</span>                | <span style="color:red">0.86</span>             | <span style="color:blue">0.73</span>             | <span style="color:red">0.84</span>               | <span style="color:blue">0.76</span>               |
| **Decision Tree**       | 0.7709       | <span style="color:red">0.83</span>                | <span style="color:blue">0.70</span>                | <span style="color:red">0.76</span>             | <span style="color:blue">0.78</span>             | <span style="color:red">0.80</span>               | <span style="color:blue">0.74</span>               |
| **XGBoost**             | 0.8045       | <span style="color:red">0.82</span>                | <span style="color:blue">0.78</span>                | <span style="color:red">0.86</span>             | <span style="color:blue">0.73</span>             | <span style="color:red">0.84</span>               | <span style="color:blue">0.76</span>               |

##### 요약

- **Logistic Regression**와 **XGBoost** 모델은 동일한 정확도(80.45%)로 높은 성능을 보임.
- **Decision Tree**는 정확도는 상대적으로 낮지만, 생존자 클래스(1)의 Recall이 높아 생존자를 잘 예측.
- **Logistic Regression**와 **XGBoost** 모델이 Decision Tree보다 전반적으로 우수한 성능을 보임.

</details>

# 🎬 영화 리뷰 감성 분석

> 영화 리뷰 데이터를 사용하여 긍정적/부정적 감정을 분류하는 모델을 만드는 프로젝트 

## 목표

1. 데이터셋 불러오기

2. 데이터 전처리

3. feature 분석 (EDA)

4. 리뷰 예측 모델 학습시키기 (LSTM)

## 추가 목표

- [x] NLP 이용

- [x] 긍정 / 부정 리뷰의 워드 클라우드 그려보기 

## 예측 모델 기능 개선 (추가)

<details>
    <summary>이모티콘 전처리</summary>

### 😀

```py
  # 전처리 함수
  import re
  import emoji


  # 이모티콘만 추출하는 함수 (중복 제거)
  def remove_duplicate_emojis(text):
      # 유니코드 이모티콘 범위에 해당하는 모든 이모티콘을 찾음
      emoji_pattern = re.compile("[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F700-\U0001F77F]", flags=re.UNICODE)

      # 중복 제거를 위한 세트 (set) 사용
      emojis = set(emoji_pattern.findall(text))

      # 텍스트에서 중복된 이모티콘을 제거하고, 하나의 이모티콘만 남김
      for em in emojis:
          text = re.sub(em + '+', em, text)  # 중복된 이모티콘을 하나로 줄임

      return text

  # 전처리 함수 (이모티콘 중복 제거 후 텍스트로 변환)
  def preprocess_text(text):
      if isinstance(text, float):
          return ""

      # 이모티콘 중복 제거
      text = remove_duplicate_emojis(text)

      # 이모티콘을 텍스트로 변환
      text = emoji.demojize(text, delimiters=(" ", " "))

      # 소문자로 변환
      text = text.lower()

      # 숫자 및 구두점 제거
      text = re.sub(r'\d+', '', text)
      text = re.sub(r'[^\w\s]', '', text)

      # 앞뒤 공백 제거
      text = text.strip()

      return text

      df['content'] = df['content'].apply(preprocess_text)
```

> 왜? 리뷰에서 이모티콘은 평점과 관련해 중요한 데이터라 생각했고, 이를 지우기 보단 활용하는 방안을 생각했다. 전처리 과정에서 추가해봤다. 

```py
print(df['content'])
print('데이터 타입 : ', type(df['content'])) # 데이터 타입은 pandas 시리즈인걸 확인 할 수 있다.
print('데이터 타입 : ', type(df['score']))
```

`실행 결과`
| Index   | Review Content                                                                                   |
|---------|--------------------------------------------------------------------------------------------------|
| 0       | great app on the move i can watch my movies and shows anywhere i want                            |
| 1       | good                                                                                             |
| 2       | need to improve and to update some error during streaming                                        |
| 3       | netflix is a nice app but not all the movies are available                                       |
| 4       | not much availability considering options on world cinema                                        |
| ...     | ...                                                                                              |
| 117129  | i really like it there are so many movies and series to choose from                              |
| 117130  | i love netflix i always enjoy my time using it                                                   |
| 117131  | sound quality is very slow of movies                                                             |
| 117132  | rate is very expensive because we see netflix sundry places for free                             |
| 117133  | this app is awesome for english movies series and it brings a wide range of variety              |

**Total Reviews:** 117,134

**Data Type:** `pandas.core.series.Series`

</details>

<br>

<details>
<summary>모델 학습 테스트 및 기능 개선</summary>

<br>

### Keras 방식으로 학습 테스트

> Keras는 딥러닝 모델을 쉽게 구축하고 훈련할 수 있도록 돕는 고수준의 API로, 텐서플로우와 같은 백엔드 위에서 작동합니다.

```py
# ------------------------------------- 필요한 라이브러리 임포트 생략 ------------------------------------

# 파일 불러오기
df = pd.read_csv("netflix_reviews.csv")  

# 텍스트 전처리 함수
def preprocess_text(text):
    if isinstance(text, float):
        return ""
    text = text.lower()  # 대문자를 소문자로 변환
    text = re.sub(r'[^\w\s]', '', text)  # 구두점 제거
    text = re.sub(r'\d+', '', text)  # 숫자 제거
    text = text.strip()  # 양쪽 공백 제거
    return text

# 점수 카운트 계산
score_counts = df['score'].value_counts().reset_index()
score_counts.columns = ['Score', 'Count']

# 텍스트 토큰화
tokenizer = Tokenizer()
tokenizer.fit_on_texts(df['content'])
X = tokenizer.texts_to_sequences(df['content'])
X = pad_sequences(X)

# 레이블 설정
y = df['score'].values

# 학습 데이터와 테스트 데이터로 분할
X_train, X_test, y_train, y_test = tts(X, y, test_size=0.2, random_state=42)

# 모델 정의
model = Sequential()
model.add(Dense(64, activation="relu", input_shape=(X_train.shape[1],)))
model.add(Dropout(0.1))
model.add(Dense(32, activation="relu"))
model.add(Dense(1, activation="linear"))  # 회귀를 위해 'linear' 활성화 함수 사용

model.compile(loss="mean_squared_error", optimizer="adam", metrics=["mae"])

# 모델 훈련
model.fit(X_train, y_train, epochs=10, batch_size=4, verbose=1)

# ------------------------------------------- 중간 생략 -------------------------------------------

Epoch 9/10
23427/23427 [==============================] - 45s 2ms/step - loss: 2.9106 - mae: 1.5832
Epoch 10/10
23427/23427 [==============================] - 47s 2ms/step - loss: 2.9105 - mae: 1.5832

<keras.src.callbacks.History at 0x28b7e82c760>

733/733 [==============================] - 1s 2ms/step
Accuracy: 10.547658684423956%
```

<span style="color:red"> 학습률 10% </span>

#### 요약

- 간결한 코드 구조 덕분에 동일한 데이터셋으로 학습을 시도했으나, 낮은 학습률을 보였습니다.
- 이는 Keras에 대한 이해 부족이 원인일 수 있으나, PyTorch에 비해 훨씬 간단하여 딥러닝 수준의 코드가 오류 없이 작동하는 점은 긍정적입니다.
- 따라서 Keras에 대한 심층적인 학습을 위해 별도의 시간을 할애할 필요가 있다고 생각합니다.

### 1차 기본 학습

```py
# ------------------------------------------- 중간 생략 -------------------------------------------

# 데이터 로더 정의
BATCH_SIZE = 16

# 손실 함수와 옵티마이저 정의
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(model.parameters(), lr=0.01)  # 학습률 설정

# LSTM 모델 정의
class LSTMModel(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, output_dim, dropout_rate=0.5):
        super(LSTMModel, self).__init__()
        self.embedding = nn.EmbeddingBag(vocab_size, embed_dim, sparse=True)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, num_layers=2, batch_first=True, dropout=dropout_rate)  
        self.fc = nn.Linear(hidden_dim, output_dim)
        self.dropout = nn.Dropout(dropout_rate)  # 드롭아웃 레이어

    def forward(self, text):
        embedded = self.embedding(text)
        output, (hidden, cell) = self.lstm(embedded.unsqueeze(1))  # 배치 차원 추가
        hidden = self.dropout(hidden[-1])  # 드롭아웃 적용
        return self.fc(hidden)

# ------------------------------------------- 중간 생략 -------------------------------------------

Epoch 6, Loss: 1.4112727279465251
Epoch 7, Loss: 1.4057372415535927
Epoch 8, Loss: 1.3953191742201765
Epoch 9, Loss: 1.3764440944643788
Epoch 10, Loss: 1.352955166198948
Accuracy: 47.15499210312887%
```

<span style="color:red"> 학습률 47%  </span>

#### 요약

- 기본적으로 제시된 과제 조건에 충실하여 기본 코드를 작성했습니다.
- 드롭아웃을 적용하여 모델의 과적합을 방지하려고 했습니다.
- 미니배치 학습을 통해 모델의 성능을 개선하려고 노력했습니다.

### 2차 배치 사이즈 및 에폭 수 증가

```py
BATCH_SIZE = 64  # 배치 사이즈를 64로 설정

num_epochs = 100  # 학습할 에폭 수 조정 가능

# ------------------------------------------- 중간 생략 -------------------------------------------

Epoch 97, Loss: 1.1228876022348633
Epoch 98, Loss: 1.1235658764025458
Epoch 99, Loss: 1.1214616659965124
Epoch 100, Loss: 1.1203884350561852
Accuracy: 54.420113544201136%
```

<span style="color:red"> 학습률 54% </span>

#### 요약

- 배치 사이즈를 대폭 늘려보았습니다. 이는 모델의 학습 안정성을 향상시키고, 파라미터 업데이트의 변동성을 줄이는 데 도움이 됩니다.
- 에포크 수를 늘려보았습니다. 이는 모델이 데이터에 더 잘 적합하도록 하여 학습 성능을 향상시키는 데 기여할 수 있습니다.

### 3차 2레이어 추가

```py
#레이어 추가

# LSTM 모델 정의
class LSTMModel(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, output_dim):
        super(LSTMModel, self).__init__()
        self.embedding = nn.EmbeddingBag(vocab_size, embed_dim, sparse=True)
        self.lstm1 = nn.LSTM(embed_dim, hidden_dim, batch_first=True, bidirectional=True)
        self.lstm2 = nn.LSTM(hidden_dim * 2, hidden_dim, batch_first=True, bidirectional=True) 
        self.fc1 = nn.Linear(hidden_dim * 2, hidden_dim) 
        self.fc2 = nn.Linear(hidden_dim, output_dim)

    def forward(self, text):
        embedded = self.embedding(text)
        lstm_out, (hidden, cell) = self.lstm1(embedded.unsqueeze(1))
        lstm_out, (hidden, cell) = self.lstm2(lstm_out)

        # 양방향의 hidden state를 결합
        hidden_cat = torch.cat((hidden[-2], hidden[-1]), dim=1)

        return self.fc2(self.fc1(hidden_cat))

# ------------------------------------------- 중간 생략 -------------------------------------------
Epoch 90, Loss: 1.1628416655413527
Epoch 91, Loss: 1.1616355441942963
Epoch 92, Loss: 1.1602509196300963
Epoch 93, Loss: 1.1576813772676748
Epoch 94, Loss: 1.1575369658730543
Epoch 95, Loss: 1.153783379601944
Epoch 96, Loss: 1.1520104497365984
Epoch 97, Loss: 1.150690621483448
Epoch 98, Loss: 1.1507031974938948
Epoch 99, Loss: 1.1478193214728971
Epoch 100, Loss: 1.1457121307125677
Accuracy: 56.00375634951125%
```

<span style="color:red"> 학습률 56% </span>

#### 요약

- LSTM 레이어가 1개에서 2개로 늘어나고, 각 레이어가 양방향으로 구성됨에 따라 모델의 복잡성이 증가했습니다.
- FC 레이어도 1개에서 2개로 증가하여 출력층으로의 연결이 더 세분화되었습니다.

### 4차 4레이어 추가

```py
# LSTM 모델 정의 (4 레이어)
class LSTMModel(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, output_dim):
        super(LSTMModel, self).__init__()
        self.embedding = nn.EmbeddingBag(vocab_size, embed_dim, sparse=True)
        self.lstm1 = nn.LSTM(embed_dim, hidden_dim, batch_first=True, bidirectional=True)
        self.lstm2 = nn.LSTM(hidden_dim * 2, hidden_dim, batch_first=True, bidirectional=True)
        self.lstm3 = nn.LSTM(hidden_dim * 2, hidden_dim, batch_first=True, bidirectional=True)  # 추가된 레이어
        self.lstm4 = nn.LSTM(hidden_dim * 2, hidden_dim, batch_first=True, bidirectional=True)  # 추가된 레이어
        self.fc1 = nn.Linear(hidden_dim * 2, hidden_dim)  # 첫 번째 완전 연결층
        self.fc2 = nn.Linear(hidden_dim, output_dim)  # 최종 출력층

    def forward(self, text):
        embedded = self.embedding(text)
        lstm_out, (hidden, cell) = self.lstm1(embedded.unsqueeze(1))
        lstm_out, (hidden, cell) = self.lstm2(lstm_out)
        lstm_out, (hidden, cell) = self.lstm3(lstm_out)  # 3번째 LSTM 레이어
        lstm_out, (hidden, cell) = self.lstm4(lstm_out)  # 4번째 LSTM 레이어

        # 양방향의 hidden state를 결합
        hidden_cat = torch.cat((hidden[-2], hidden[-1]), dim=1)

        return self.fc2(self.fc1(hidden_cat))


Epoch 1, Loss: 1.4411939945644079
Epoch 2, Loss: 1.438289221480438
Epoch 3, Loss: 1.4380339547635752

# ------------------------------------------- 중간 생략 -------------------------------------------

Epoch 18, Loss: 1.4378050892019434
Epoch 19, Loss: 1.4376814013048245
Epoch 20, Loss: 1.437378289349657
Epoch 21, Loss: 1.4371888463407654
Epoch 22, Loss: 1.43679916533187
Epoch 23, Loss: 1.4355940978681676
Epoch 24, Loss: 1.4332314667034474
```

<span style="color:red"> 학습의 정체 </span>

- 이 모델은 4개의 LSTM 레이어로 구성되어 있어 더 깊고 복잡한 구조를 가지고 있으며, 각 레이어는 양방향으로 설계되어 있어 더 많은 정보를 학습할 수 있는 가능성이 높습니다.
- FC 레이어는 이전 코드와 같지만, LSTM 레이어의 추가로 인해 모델의 표현력이 증가하고, 더 복잡한 패턴을 학습할 수 있게 됩니다.
- 하지만 레이어 수가 많아져 모델이 지나치게 복잡해져서 학습이 어려워진 것으로 보입니다. 필요 이상의 파라미터가 많으면 수렴하기 어려울 수 있음을 알게 되었습니다.

### 5차 2레이어 복구 및 옵티마이저 변경

```py
#옵티마이저의 학습률을 0.01에서 0.05로 변경했습니다

optimizer = optim.SGD(model.parameters(), lr=0.05)

# ------------------------------------------- 중간 생략 -------------------------------------------
Epoch 93, Loss: 1.0482210473802716
Epoch 94, Loss: 1.0486159132609187
Epoch 95, Loss: 1.046645594578961
Epoch 96, Loss: 1.0441050273159664
Epoch 97, Loss: 1.0450137004103677
Epoch 98, Loss: 1.0456044204405956
Epoch 99, Loss: 1.0434317154282189
Epoch 100, Loss: 1.0428769397247366
Accuracy: 61.032142399795106%
```

<span style="color:red"> 학습률 61% </span>

- 학습률이 증가하면, 가중치 업데이트가 더 커져서 손실 함수의 최소값에 더 빠르게 도달할 수 있습니다. 이로 인해 모델이 더 빨리 수렴할 수 있습니다.

- 특정 문제에서는 높은 학습률이 모델이 다양한 지역 최솟값을 탐색하는 데 도움을 줄 수 있습니다. 더 큰 업데이트로 인해 모델이 더 다양한 매개변수 공간을 탐색하게 됩니다.

- 초기 에포크에서 손실 값이 빠르게 감소할 수 있으며, 이는 모델이 더 효과적으로 학습하고 있다는 신호일 수 있습니다.

- 특정 데이터셋이나 모델 구조에서는 높은 학습률이 오히려 성능을 개선할 수 있습니다. 특히 LSTM과 같은 복잡한 모델에서는 일부 파라미터에 대해 더 큰 변화가 도움이 될 수 있습니다.

</details>
