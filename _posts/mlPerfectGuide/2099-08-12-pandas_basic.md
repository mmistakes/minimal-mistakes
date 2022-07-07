---
published: true
layout: single
title: "[Machine Learning PerfectGuide] pandas 사용법 기초"
category: mlbasic
tags:
comments: true
sidebar:
  nav: "mainMenu"
--- 
* * *

<br>

**pandas DataFrame 생성**
* * *

```python
import pandas as pd

titanic_df = pd.read_csv('kaggle/titanic/test.csv')
print('titanic 변수 type:',type(titanic_df))
```

```
------------------------------------
titanic 변수 type: <class 'pandas.core.frame.DataFrame'>
------------------------------------
```

<br>

**DataFrame 앞부분 추출**
* * *

```python
titanic_df = pd.read_csv('test.csv')
print(titanic_df.head(5))
```

```
------------------------------------
   PassengerId  Pclass  ... Cabin Embarked
0          892       3  ...   NaN        Q
1          893       3  ...   NaN        S
2          894       2  ...   NaN        Q
3          895       3  ...   NaN        S
4          896       3  ...   NaN        S

[5 rows x 11 columns]
------------------------------------
```

<br>

**Dictionary -> DataFrame 생성**
* * *
```python
dic1 = {'Name': ['Chulmin', 'Eunkyung','Jinwoong','Soobeom'],
        'Year': [2011, 2016, 2015, 2015],
        'Gender': ['Male', 'Female', 'Male', 'Male']
       }

# 딕셔너리 -> 데이터프레임으로 생성
data_df = pd.DataFrame(dic1)
print(data_df, '\n')

# 새로운 컬럼명을 추가
data_df = pd.DataFrame(dic1, columns=["Name", "Year", "Gender", "Age"])
print(data_df, '\n')

# 인덱스를 새로운 값으로 할당. 
data_df = pd.DataFrame(dic1, index=['one', 'two', 'three', 'four'])
print(data_df)
```
```
------------------------------------
       Name  Year  Gender
0   Chulmin  2011    Male
1  Eunkyung  2016  Female
2  Jinwoong  2015    Male
3   Soobeom  2015    Male

       Name  Year  Gender  Age
0   Chulmin  2011    Male  NaN
1  Eunkyung  2016  Female  NaN
2  Jinwoong  2015    Male  NaN
3   Soobeom  2015    Male  NaN

           Name  Year  Gender
one     Chulmin  2011    Male
two    Eunkyung  2016  Female
three  Jinwoong  2015    Male
four    Soobeom  2015    Male
------------------------------------
```

<br>

**DataFrame의 컬럼명과 인덱스**
* * *
```python
print("columns:", data_df.columns)
print("index:", data_df.index)
print("index value:", data_df.index.values, '\n')

data_df = pd.DataFrame(dic1)
print("columns:", data_df.columns)
print("index:", data_df.index)
print("index value:", data_df.index.values)
```

```
------------------------------------
columns: Index(['Name', 'Year', 'Gender'], dtype='object')
index: Index(['one', 'two', 'three', 'four'], dtype='object')
index value: ['one' 'two' 'three' 'four']

columns: Index(['Name', 'Year', 'Gender'], dtype='object')
index: RangeIndex(start=0, stop=4, step=1)
index value: [0 1 2 3]
------------------------------------
```

<br>

**DataFrame에서 Series 추출 및 DataFrame 필터링 추출**
* * *

```python
dic1 = {'Name': ['Chulmin', 'Eunkyung', 'Jinwoong', 'Soobeom'],
       'Year': [2011, 2016, 2015, 2015],
       'Gender': ['Male', 'Female', 'Male', 'Male']
       }

df = pd.DataFrame(dic1)

# Series 반환
series = df['Name']
print(series.head(3))
print("## type:", type(series), '\n')

# Data Frame 반환
filtered_df = df[['Name', 'Year']]
print(filtered_df.head(3))
print("## type:", type(filtered_df), '\n')

# Data Frame 반환
one_col_df = titanic_df[['Name']]
print(one_col_df.head(3))
print("## type:", type(one_col_df))
```

```
------------------------------------
0     Chulmin
1    Eunkyung
2    Jinwoong
Name: Name, dtype: object
## type: <class 'pandas.core.series.Series'>

       Name  Year
0   Chulmin  2011
1  Eunkyung  2016
2  Jinwoong  2015
## type: <class 'pandas.core.frame.DataFrame'>

       Name
0   Chulmin
1  Eunkyung
2  Jinwoong
## type: <class 'pandas.core.frame.DataFrame'>
------------------------------------
```

<br>

**DataFrame의 행(Row)와 열(Column) 크기**
* * *
```python
print('Data Farme의 shape', df.shape)
```

```
------------------------------------
Data Farme의 shape (4, 3)
------------------------------------
```

<br>

**DataFrame info()**
* * *
```python
# print 함수 X
# info   -> X 
# info() -> O
# 메모리 사용량, Non-Null Count, 컬럼 type, 컬럼 명 등
df.info()
```
```
------------------------------------
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 4 entries, 0 to 3
Data columns (total 3 columns):
 #   Column  Non-Null Count  Dtype 
---  ------  --------------  ----- 
 0   Name    4 non-null      object
 1   Year    4 non-null      int64 
 2   Gender  4 non-null      object
dtypes: int64(1), object(2)
memory usage: 224.0+ bytes
------------------------------------
```

<br>

**Dataframe describe()**
* * *
```python
# 데이터값들의 평균, 표준편차, 4분위 분포도를 제공
test_df = pd.read_csv('test.csv')
print(test_df.describe())
```

```
------------------------------------
       PassengerId      Pclass         Age       SibSp       Parch        Fare
count   418.000000  418.000000  332.000000  418.000000  418.000000  417.000000
mean   1100.500000    2.265550   30.272590    0.447368    0.392344   35.627188
std     120.810458    0.841838   14.181209    0.896760    0.981429   55.907576
min     892.000000    1.000000    0.170000    0.000000    0.000000    0.000000
25%     996.250000    1.000000   21.000000    0.000000    0.000000    7.895800
50%    1100.500000    3.000000   27.000000    0.000000    0.000000   14.454200
75%    1204.750000    3.000000   39.000000    1.000000    0.000000   31.500000
max    1309.000000    3.000000   76.000000    8.000000    9.000000  512.329200
------------------------------------
```

<br>

**Series value_counts()**
* * *
```python
pSeries = test_df['Pclass']
print(pSeries.value_counts())
```
```
------------------------------------
3    218
1    107
2     93
------------------------------------
```

<br>

**DataFrame 정렬 sort_values()**
* * *
```python
# by=정렬컬럼
# ascending=True 오름차순
# ascending=False 내림차순
# 주피터 노트북에서는 print 없이 출력 되는데, pycharm에선 출력이 안됨

test_df.sort_values(by='Pclass', ascending=True)
#test_df[['Name','Age']].sort_values(by='Age')
#test_df[['Name','Age','Pclass']].sort_values(by=['Pclass','Age'])
```

```
------------------------------------
     PassengerId  Pclass  ...        Cabin Embarked
208         1100       1  ...          A11        C
350         1242       1  ...      D10 D12        C
122         1014       1  ...          C28        C
343         1235       1  ...  B51 B53 B55        C
131         1023       1  ...          C51        C
..           ...     ...  ...          ...      ...
------------------------------------
```

<br>

**DataFrame과 리스트, 딕셔너리, 넘파이 ndarray 상호 변환**
* * *

```python
col_name1 = ['col1']
list1 = [1, 2, 3]
array1 = np.array(list1)

df_list1 = pd.DataFrame(list1, columns=col_name1)
print('1차원 리스트로 만든 DataFrame:\n', df_list1, '\n')

df_array1 = pd.DataFrame(array1, columns=col_name1)
print('1차원 ndarray로 만든 DataFrame:\n', df_array1, '\n')

# 3개의 컬럼명이 필요함.
col_name2=['col1', 'col2', 'col3']

# 2행x3열 형태의 리스트와 ndarray 생성 한 뒤 이를 DataFrame으로 변환.
list2 = [[1, 2, 3],
       [11, 12, 13]]

df_list2 = pd.DataFrame(list2, columns=col_name2)
print('2차원 리스트로 만든 DataFrame:\n', df_list2, '\n')

array2 = np.array(list2)
df_array1 = pd.DataFrame(array2, columns=col_name2)
print('2차원 ndarray로 만든 DataFrame:\n', df_array1)
```

```
------------------------------------
1차원 리스트로 만든 DataFrame:
    col1
0     1
1     2
2     3

1차원 ndarray로 만든 DataFrame:
    col1
0     1
1     2
2     3

2차원 리스트로 만든 DataFrame:
    col1  col2  col3
0     1     2     3
1    11    12    13

2차원 ndarray로 만든 DataFrame:
    col1  col2  col3
0     1     2     3
1    11    12    13
------------------------------------
```

<br>

**딕셔너리(dict)에서 DataFrame변환**
* * *

```python
# Key는 컬럼명으로 매핑, Value는 리스트 형(또는 ndarray)
dict = {'col1': [1, 11], 'col2': [2, 22], 'col3': [3, 33]}
df_dict = pd.DataFrame(dict)
print('딕셔너리로 만든 DataFrame:\n', df_dict)
```

```
------------------------------------
딕셔너리로 만든 DataFrame:
    col1  col2  col3
0     1     2     3
1    11    22    33
------------------------------------
```

<br>

**DataFrame을 ndarray로 변환**
* * *
```python
array3 = df_dict.values
print('df_dict.values 타입:', type(array3))
print(array3)
```
```
df_dict.values 타입: <class 'numpy.ndarray'>
[[ 1  2  3]
 [11 22 33]]
```

<br>

**DataFrame을 리스트와 딕셔너리로 변환**
* * *
```python
# DataFrame을 리스트로 변환
list3 = df_dict.values.tolist()
print('df_dict.values.tolist() 타입:', type(list3))
print(list3)

# DataFrame을 딕셔너리로 변환
dict3 = df_dict.to_dict('list')
print('\n df_dict.to_dict() 타입:', type(dict3))
print(dict3)
```

```
df_dict.values.tolist() 타입: <class 'list'>
[[1, 2, 3], [11, 22, 33]]

 df_dict.to_dict() 타입: <class 'dict'>
{'col1': [1, 11], 'col2': [2, 22], 'col3': [3, 33]}
```

<br>

**DataFrame의 컬럼 데이터 셋 Access**
* * *
```python
titanic_df = pd.read_csv('test.csv')
titanic_df['Age_0'] = 0 # 새로운 컬럼 값 할당
```
```python
# 이런식으로도 가능
titanic_df['Age_by_10'] = titanic_df['Age'] * 10
titanic_df['Family_No'] = titanic_df['SibSp'] + titanic_df['Parch'] + 1
```

```python
#기존 컬럼에 값을 업데이트 하려면 해당 컬럼에 업데이트값을 그대로 지정하면 됩니다.
titanic_df['Age_by_10'] = titanic_df['Age_by_10'] + 100
```

<br>

**DataFrame 데이터 삭제**
* * *
```python
# Age_0 칼럼 삭제, axis=0은 로우, axis=1은 칼럼
titanic_drop_df = titanic_df.drop('Age_0', axis=1 )

# 참고로 drop( )메소드의 inplace인자의 기본값은 False인데
# 만약 inplace를 true로 설정할 경우 drop()을 호출한 데이터 프레임에서 drop이 수행되고
# 디폴트일 경우엔 호출한 데이터 프레임에는 영향이 없고, 변환된 데이터 프레임이 반환 됩니다.
```

```python
# 여러개의 칼럼을 동시에 삭제하는 경우, 아래의 예는 inplace=True이므로 반환된 값은 None 입니다.
drop_result = titanic_df.drop(['Age_0', 'Age_by_10', 'Family_No'], axis=1, inplace=True)
print(' inplace=True 로 drop 후 반환된 값:', drop_result)

# 여러개의 로우를 동시에 삭제하는 경우, 아래의 출력 예에는 이 경우만 적었습니다.
titanic_df = pd.read_csv('test.csv')
titanic_df.drop([0,1,2], axis=0, inplace=True)
```

```
------------------------------------
   PassengerId  Survived  Pclass            Name     Sex   Age  SibSp  Parch  Ticket     Fare Cabin Embarked
3            4         1       1  Futrelle, M...  female  35.0      1      0  113803  53.1000  C123        S
4            5         0       3  Allen, Mr. ...    male  35.0      0      0  373450   8.0500   NaN        S
5            6         0       3  Moran, Mr. ...    male   NaN      0      0  330877   8.4583   NaN        Q
------------------------------------
```

<br>

**Index 객체**
* * *
```python
titanic_df = pd.read_csv('test.csv')

# Index 객체 추출
indexes = titanic_df.index
print(indexes)

# Index 객체를 실제 값 arrray로 변환
print('Index 객체 array값:\n', indexes.values)
```

```
------------------------------------
RangeIndex(start=0, stop=418, step=1)
Index 객체 array값:
 [  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17
 ...
 ...
  414 415 416 417]
------------------------------------
```

<br>

**Index 1차원 데이터 확인**
* * *
```python
print(type(indexes.values))
print(indexes.values.shape)
print(indexes[:5].values)
print(indexes.values[:5])
print(indexes[6])
```
```
------------------------------------
<class 'numpy.ndarray'>
(891,)
[0 1 2 3 4]
[0 1 2 3 4]
6
------------------------------------
```

<br>

**Series 객체와 Index 객체**
* * *
```python
# Series 객체는 Index 객체를 포함하지만 Series 객체에 연산 함수를 적용할 때
# Index는 연산에서 제외됩니다. Index는 오직 식별용으로만 사용됩니다.
series_fair = titanic_df['Fare']
series_fair.head(5)

print('Fair Series max 값:', series_fair.max())
print('Fair Series sum 값:', series_fair.sum())
print('sum() Fair Series:', sum(series_fair))
print('Fair Series + 3:\n',(series_fair + 3).head(3) )

# DataFrame 및 Series에 reset_index( ) 메서드를 수행하면 
# 새롭게 인덱스를 연속 숫자 형으로 할당하며 기존 인덱스는 ‘index’라는 새로운 컬럼 명으로 추가합니다
titanic_reset_df = titanic_df.reset_index(inplace=False)
```
```
------------------------------------
0     7.2500
1    71.2833
2     7.9250
3    53.1000
4     8.0500
Name: Fare, dtype: float64

Fair Series max 값: 512.3292
Fair Series sum 값: 28693.9493
sum() Fair Series: 28693.949299999967
Fair Series + 3:
 0    10.2500
1    74.2833
2    10.9250
Name: Fare, dtype: float64

   index  PassengerId  Pclass  ...    Fare Cabin  Embarked
0      0          892       3  ...  7.8292   NaN         Q
1      1          893       3  ...  7.0000   NaN         S
2      2          894       2  ...  9.6875   NaN         Q
------------------------------------
```

<br>

**데이터 Selection 및 Filtering**
* * *
```python
titanic_df = pd.read_csv('titanic_train.csv')
print('단일 컬럼 데이터 추출:\n', titanic_df[ 'Pclass' ].head(3))
print('\n여러 컬럼들의 데이터 추출:\n', titanic_df[ ['Survived', 'Pclass'] ].head(3), '\n')
#print('[ ] 안에 숫자 index는 KeyError 오류 발생:\n', titanic_df[0])

# Pandas의 Index 형태로 변환가능한 표현식은 [ ] 내에 입력할 수 있습니다.
# 가령 titanic_df의 처음 2개 데이터를 추출하고자 titanic_df [ 0:2 ] 와 같은 슬라이싱을 이용하였다면 정확히 원하는 결과를 반환해 줍니다.
print(titanic_df[0:2], '\n')

# [ ] 내에 조건식을 입력하여 불린 인덱싱을 수행할 수 있습니다
print(titanic_df[ titanic_df['Pclass'] == 3].head(3))
```
```
------------------------------------
단일 컬럼 데이터 추출:
 0    3
1    1
2    3
Name: Pclass, dtype: int64

여러 컬럼들의 데이터 추출:
    Survived  Pclass
0         0       3
1         1       1
2         1       3

   PassengerId  Pclass                              Name  ...    Fare  Cabin  Embarked
0          892       3                  Kelly, Mr. James  ...  7.8292    NaN         Q
1          893       3  Wilkes, Mrs. James (Ellen Needs)  ...  7.0000    NaN         S

   PassengerId  Pclass                              Name  ...    Fare  Cabin  Embarked
0          892       3                  Kelly, Mr. James  ...  7.8292    NaN         Q
1          893       3  Wilkes, Mrs. James (Ellen Needs)  ...  7.0000    NaN         S
3          895       3                  Wirz, Mr. Albert  ...  8.6625    NaN         S
------------------------------------
```

<br>

**DataFrame ix[], iloc[], loc[] 연산자**
* * *
```python
data = {'Name': ['Chulmin', 'Eunkyung','Jinwoong','Soobeom'],
        'Year': [2011, 2016, 2015, 2015],
        'Gender': ['Male', 'Female', 'Male', 'Male']
       }
data_df = pd.DataFrame(data, index=['one','two','three','four'])

# ix[] 연산자, 명칭 기반과 위치 기반 인덱싱 모두를 제공
# 디버깅 시의 혼란을 야기하는 문제가 있어서 현재 사용 X
# print('컬럼 위치 기반 인덱싱 데이터 추출:',titanic_df.ix[0,2])
# print('컬럼명 기반 인덱싱 데이터 추출:',titanic_df.ix[0,'Pclass'])

# iloc[] 연산자, 위치기반 인덱싱을 제공합니다.
print(data_df.iloc[0, 0])

# 아래 코드는 오류를 발생합니다. 
# iloc의 경우 위치 기반으로만 접근해야 합니다.
# data_df.iloc[0, 'Name']
# data_df.iloc['one', 0]

# loc[ ] 연산자, 명칭기반 인덱싱을 제공합니다.
print(data_df.loc['one', 'Name'])

#reset을 하면 index 칼럼이 추가 되므로 아래와 같이 접근 가능해집니다.
data_df_reset = data_df.reset_index()
print(data_df_reset.loc[1, 'Name'])

# 아래와 같이 슬라이싱으로 접근 가능합니다.
print('위치기반 iloc slicing\n', data_df.iloc[0:1, 0],'\n')
print('명칭기반 loc slicing\n', data_df.loc['one':'two', 'Name'])
```

```
------------------------------------
'Chulmin'
'Chulmin'
'Chulmin'

위치기반 iloc slicing
 one    Chulmin
Name: Name, dtype: object 

명칭기반 loc slicing
 one     Chulmin
two    Eunkyung
Name: Name, dtype: object
------------------------------------
```

<br>

**불린 인덱싱(Boolean indexing)**
* * *
```python
titanic_df = pd.read_csv('test.csv')
titanic_boolean = titanic_df[titanic_df['Age'] > 60]
print(titanic_boolean)

# 아래 var1의 타입은 시리즈입니다.
var1 = titanic_df['Age'] > 60
print('var1의 타입 : ', type(var1))

# 논리 연산자로 결합된 조건식도 불린 인덱싱으로 적용 가능합니다.
print(titanic_df[ (titanic_df['Age'] > 60) & (titanic_df['Pclass']==1) & (titanic_df['Sex']=='female')])

# 조건식은 변수로도 할당 가능합니다. 복잡한 조건식은 변수로 할당하여 가득성을 향상 할 수 있습니다.
cond1 = titanic_df['Age'] > 60
cond2 = titanic_df['Pclass'] == 1
cond3 = titanic_df['Sex'] == 'female'
print(titanic_df[cond1 & cond2 & cond3])
```
```
------------------------------------
     PassengerId  Pclass  ...            Cabin Embarked
2            894       2  ...              NaN        Q
13           905       2  ...              NaN        S
81           973       1  ...          C55 C57        S
...
...

var1의 타입 : <class 'pandas.core.series.Series'>

     PassengerId  Pclass  ...    Cabin Embarked
96           988       1  ...      C46        S
114         1006       1  ...  C55 C57        S
179         1071       1  ...      E45        C
305         1197       1  ...      B26        S
...
...

     PassengerId  Pclass  ...    Cabin Embarked
96           988       1  ...      C46        S
114         1006       1  ...  C55 C57        S
179         1071       1  ...      E45        C
305         1197       1  ...      B26        S
...
...
------------------------------------
```

<br>

**Aggregation 함수 및 GroupBy 적용**
* * *
```python
import pandas as pd
titanic_df = pd.read_csv('titanic_train.csv')

# NaN 값은 count에서 제외
titanic_df.count()

# 특정 컬럼들로 Aggregation 함수 수행.
titanic_df[['Age', 'Fare']].mean(axis=1)

# 특정 컬럼들 + axis=0으로 Aggregation 함수 수행
titanic_df[['Age', 'Fare']].sum(axis=0)

# count
titanic_df[['Age', 'Fare']].count()
```
```
------------------------------------
PassengerId    891
Survived       891
Pclass         891
Name           891
Sex            891
Age            714
SibSp          891
Parch          891
Ticket         891
Fare           891
Cabin          204
Embarked       889
dtype: int64
------------------------------------

------------------------------------
0      14.62500
1      54.64165
2      16.96250
3      44.05000
4      21.52500
         ...   
886    20.00000
887    24.50000
888    23.45000
889    28.00000
890    19.87500
Length: 891, dtype: float64
------------------------------------

------------------------------------
Age     21205.1700
Fare    28693.9493
dtype: float64
------------------------------------

------------------------------------
Age     332
Fare    417
dtype: int64
------------------------------------
```

<br>

```python
titanic_groupby = titanic_df.groupby(by='Pclass')
print(type(titanic_groupby)) 
print(titanic_groupby, '\n')

print(titanic_groupby.count(), '\n')

# group by 하고 필터링 하기
print(titanic_df.groupby(by='Pclass')[['PassengerId', 'Name']].count(), '\n')

# 먼저 필터링하고 groupby 하기
print(titanic_df[['Pclass','PassengerId', 'Name']].groupby('Pclass').count())

# 판다스는 여러개의 aggregation 함수를 적용할 수 있도록 agg( )함수를 별도로 제공
titanic_df.groupby('Pclass')['Age'].agg([max, min])

# 딕셔너리를 이용하여 다양한 aggregation 적용 방법
agg_format={'Age':'max', 'SibSp':'sum', 'Fare':'mean'}
titanic_df.groupby('Pclass').agg(agg_format)
```
```
------------------------------------
<class 'pandas.core.groupby.generic.DataFrameGroupBy'>
<pandas.core.groupby.generic.DataFrameGroupBy object at 0x0000021CDE7F6640>
------------------------------------

------------------------------------
        PassengerId  Name  Sex  Age  ...  Ticket  Fare  Cabin  Embarked
Pclass                               ...                               
1               107   107  107   98  ...     107   107     80       107
2                93    93   93   88  ...      93    93      7        93
3               218   218  218  146  ...     218   217      4       218

[3 rows x 10 columns]
------------------------------------

------------------------------------
        PassengerId  Name
Pclass                   
1               107   107
2                93    93
3               218   218
------------------------------------

------------------------------------
        PassengerId  Name
Pclass                   
1               107   107
2                93    93
3               218   218
------------------------------------

------------------------------------
Pclass            
1       76.0  6.00
2       63.0  0.92
3       60.5  0.17
------------------------------------

------------------------------------
Pclass                        
1       76.0     51  94.280297
2       63.0     35  22.202104
3       60.5    101  12.459678
------------------------------------
```

<br>

**Missing 데이터 처리하기**
* * *

```python
# isna() 모든 컬럼값들이 NaN인지 True/False값을 반환
titanic_df.isna().head(3)

# isna() 반환 결과에 sum( )을 호출하여 컬럼별로 NaN 건수를 구할 수 있음
titanic_df.isna().sum()

# fillna() 로 Missing 데이터 대체하기
titanic_df['Cabin'] = titanic_df['Cabin'].fillna('C000')
titanic_df.head(3)

# 나이 값을 알수 없는 사람 평균 값으로 초기화
titanic_df['Age'] = titanic_df['Age'].fillna(titanic_df['Age'].mean())
```
```
------------------------------------
   PassengerId  Pclass   Name    Sex  ...  Ticket   Fare  Cabin  Embarked
0        False   False  False  False  ...   False  False   True     False
1        False   False  False  False  ...   False  False   True     False
2        False   False  False  False  ...   False  False   True     False
------------------------------------

------------------------------------
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
------------------------------------

------------------------------------
   PassengerId  Pclass                              Name  ...    Fare  Cabin  Embarked
0          892       3                  Kelly, Mr. James  ...  7.8292   C000         Q
1          893       3  Wilkes, Mrs. James (Ellen Needs)  ...  7.0000   C000         S
2          894       2         Myles, Mr. Thomas Francis  ...  9.6875   C000         Q
------------------------------------

------------------------------------
[3 rows x 11 columns]
   PassengerId  Pclass                              Name  ...    Fare  Cabin  Embarked
0          892       3                  Kelly, Mr. James  ...  7.8292   C000         Q
1          893       3  Wilkes, Mrs. James (Ellen Needs)  ...  7.0000   C000         S
2          894       2         Myles, Mr. Thomas Francis  ...  9.6875   C000         Q
------------------------------------
```

<br>

**apply lambda 식으로 데이터 가공**
* * *
```python
# 람다 기본 사용법
lambda_square = lambda x : x ** 2
print('3의 제곱은:', lambda_square(3))

# map의 경우 첫번째 인자로 function을 2번째 인자로 적용할 리스트를 넣음
# 1 2 3 을 넣었으므로 1 4 9가 됨
a=[1, 2, 3]
squares = map(lambda x : x**2, a)
list(squares)

# apply는 행 또는 열 또는 전체의 셀(=원소)에 원하는 연산을 지원함
titanic_df['Name_len']= titanic_df['Name'].apply(lambda x : len(x))
titanic_df[['Name','Name_len']].head(3)

# apply에 조건식도 넣을 수 있음
titanic_df['Child_Adult'] = titanic_df['Age'].apply(lambda x : 'Child' if x <=15 else 'Adult' )
titanic_df[['Age','Child_Adult']].head(10)

# apply에 조건식 넣어서 DataFrame에 넣기, 그리고 value_counts() 수행
titanic_df['Age_cat'] = titanic_df['Age'].apply(lambda x : 'Child' if x<=15 else ('Adult' if x <= 60 else 'Elderly'))
titanic_df['Age_cat'].value_counts()


# 람다가 지저분할 경우 아래와 같이 함수를 정의해서 쓰는게 오히려 깔끔함
def get_category(age):
    cat = ''
    if age <= 5: cat = 'Baby'
    elif age <= 12: cat = 'Child'
    elif age <= 18: cat = 'Teenager'
    elif age <= 25: cat = 'Student'
    elif age <= 35: cat = 'Young Adult'
    elif age <= 60: cat = 'Adult'
    else : cat = 'Elderly'
    return cat

titanic_df['Age_cat'] = titanic_df['Age'].apply(lambda x : get_category(x))
titanic_df[['Age','Age_cat']].head()
```
```
------------------------------------
3의 제곱은: 9
[1, 4, 9]
------------------------------------

------------------------------------
                               Name  Name_len
0                  Kelly, Mr. James        16
1  Wilkes, Mrs. James (Ellen Needs)        32
2         Myles, Mr. Thomas Francis        25
------------------------------------

------------------------------------
    Age Child_Adult
0  34.5       Adult
1  47.0       Adult
2  62.0       Adult
3  27.0       Adult
4  22.0       Adult
5  14.0       Child
6  30.0       Adult
7  26.0       Adult
8  18.0       Adult
9  21.0       Adult
------------------------------------

------------------------------------
Adult      375
Child       32
Elderly     11
Name: Age_cat, dtype: int64
------------------------------------

------------------------------------
    Age      Age_cat
0  34.5  Young Adult
1  47.0        Adult
2  62.0      Elderly
3  27.0  Young Adult
4  22.0      Student
5  14.0     Teenager
6  30.0  Young Adult
7  26.0  Young Adult
8  18.0     Teenager
9  21.0      Student
------------------------------------
```

#### Reference 
***  
- ***파이썬 머신러닝 완벽 가이드***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>