# Python Data Analysis Library - Pandas 1

- 구조화된 데이터의 처리를 지원하는 Python 라이브러리
- panel data -> pandas
- 고성능 array 계산 라이브러리인 numpy와 통합하여, 강력한 "스프레드시터"처리 기능을 제공
- 인덱싱, 연산용 함수, 전처리 함수 등을 제공함
- 데이터 처리 및 통계 분석을 위해 사용
- Tabular Data 처리에 최적화
- ![alt text](image.png)

## Pandas 사용법

### 데이터 로딩

```python
import pandas as pd

data_url = ".."
df_data = pd.read_csv(data_url, sep= '\s+', header=None)
df_data.header(n=10)

# 데이터의 컬럼을 지정할 수 있음
df_date.columns = ["1", "2", "3", "4", "5"...]
```

### series

#### pandas의 구성

- Series : DataFrame 중 하나의 Column에 해당하는 데이터의 모음 Object
  - column vector를 표현하는 object
- DataFrame : Data Table 전체를 포함하는 Object

```python
list_data = [1, 2, 3, 4, 5]
example_obj = Series(data = list_data)
example_obj
# 0 1
# 1 2
# 2 3
# 3 4
# 4 5
```

- numpy.ndarray의 subclass

```python
list_data = [1, 2, 3, 4, 5]
list_name = ["a", "b", "c", "d", "e"]
example_obj = Series(data = list_data, index=list_name)
example_obj
# a 1
# b 2
# c 3
# d 4
# e 5
```

- dict type도 가능

```python
dict_data = {"a":1, "b": 2, "c": 3, "d", 4, "e":5}
example_obj = Series(dict_data, dtype=np.float32, name="exameple_data")
#name : series 이름 설정
# a 1.0
# b 2.0
# c 3.0
# d 4.0
# e 5.0
example_obj["a"]
# 1.0
example_obj["a"] = 3.2
example_obj["a"]
# 3.2
example_obj = example_obj.astype(int)
# a 3
# b 2
# c 3
# d 4
# e 5
exmaple_obj.values
# array([3, 2, 3, 4, 5], dtype=int)
exmaple_obj.index
Index(['a', 'b', 'c', 'd', 'e'], dtype='object')
```

## dataframe memory

![alt text](image-1.png)

- Series : DataFrame 중 하나의Column에 해당하는 데이터의 모음 Object
- DataFrame : Data Table 전체를 포함하는 Object

|     | foo | bar | baz | qux   |
| --- | --- | --- | --- | ----- |
| A   | 0   | x   | 2.7 | True  |
| B   | 4   | y   | 6   | True  |
| C   | 8   | z   | 10  | False |
| D   | -12 | w   | NA  | False |
| E   | 16  | a   | 18  | False |

```python
# columns : foo, bar, baz, qux
# index : A, B, C, D, E
```

```python
raw_data = {'first_name' : ['Jason', 'Molly', 'Jake', 'Amy'],
'last_name' : ['Miller', 'Jacobson', 'Ali', 'Milner'],
'age' : [42, 52, 36, 24],
'city' : ['San Francisco', 'Baltimore', 'Miami', 'Douglas']}

df = pd.DataFrame(raw_data, columns = ['first_name', 'last_name', 'age', 'city'])
df
```

|     | first_name | last_name | age | city          |
| --- | ---------- | --------- | --- | ------------- |
| 0   | Jason      | Miller    | 42  | San Francisco |
| 1   | Molly      | Jacobson  | 52  | Baltimore     |
| 2   | Jake       | Ali       | 36  | Miami         |
| 3   | Amy        | Milner    | 24  | Douglas       |

## dataframe indexing

- loc : index의 이름
- iloc : index의 number

```python
df.loc[1]
# first_name Molly
# last_name  Jacobson
# age 52
# city Baltimore

df['age'].iloc[1:]
1 52
2 36
3 24
```

### loc과 iloc의 차이

```python
s = pd.Series(np.nan, index = [49, 48, 47, 46, 45, 1, 2, 3, 4, 5])
s.loc[:5]
# 49 NaN
# 48 NaN
# 47 NaN
# 46 NaN
# 45 NaN
# 1 NaN
# 2 NaN
# 3 NaN
# 4 NaN
# 5 NaN
s.iloc[:3]
# 49 NaN
# 48 NaN
# 47 NaN
```

## data handling

```python
df.debt = df.age > 40
```

|     | first_name | last_name | age | city          | debt  |
| --- | ---------- | --------- | --- | ------------- | ----- |
| 0   | Jason      | Miller    | 42  | San Francisco | True  |
| 1   | Molly      | Jacobson  | 52  | Baltimore     | True  |
| 2   | Jake       | Ali       | 36  | Miami         | False |
| 3   | Amy        | Milner    | 24  | Douglas       | False |

```python
values = Series(data=["M", "F", "F"], index=[0, 1, 3])
df["sex"]= value
```

|     | first_name | last_name | age | city          | debt  | sex |
| --- | ---------- | --------- | --- | ------------- | ----- | --- |
| 0   | Jason      | Miller    | 42  | San Francisco | True  | M   |
| 1   | Molly      | Jacobson  | 52  | Baltimore     | True  | F   |
| 2   | Jake       | Ali       | 36  | Miami         | False | NaN |
| 3   | Amy        | Milner    | 24  | Douglas       | False | F   |

```python
# 데이터 삭제1
del df["debt"]
df
```

|     | first_name | last_name | age | city          | sex |
| --- | ---------- | --------- | --- | ------------- | --- |
| 0   | Jason      | Miller    | 42  | San Francisco | M   |
| 1   | Molly      | Jacobson  | 52  | Baltimore     | F   |
| 2   | Jake       | Ali       | 36  | Miami         | NaN |
| 3   | Amy        | Milner    | 24  | Douglas       | F   |

```python
# 데이터 삭제2
df.drop("debt", axis=1)
```

### selection & drop

#### Selection with column names

```python
df[['account', 'street', 'state']].head(3)
```

|     | account | street                              | state         |
| --- | ------- | ----------------------------------- | ------------- |
| 0   | 211829  | 34456 Seean Highway                 | texas         |
| 1   | 320563  | 1311 Alvis Tunnel                   | NorthCarolina |
| 2   | 648336  | 62184 Schamberger Underpass Apt.231 | Iowa          |

```
!conda install --y -c anaconda xlrd
```

#### basic, loc, iloc selection

```python
df[['name', 'street']][:2]
df.loc[[211829, 320563]], ['name', 'street']
df.iloc[:2][:2]

df.reset_index(drop = True)
# 기존의 index를 지우고 새롭게 인덱스 생성

df.drop(1) # index number 1을 삭제(원래 데이터프레임은 변경X)
df.drop("city", axis=1) # column을 기준으로 삭제
df.drop("city", axis=1, inplace= True) # 원래 데이터프레임도 변경
```

## DataFrame operation

### series operation

```python
df1 = DataFrame(np.arange(9).reshape(3, 3), columns = list("abc"))
```

|     | a   | b   | c   |
| --- | --- | --- | --- |
| 0   | 0   | 1   | 2   |
| 1   | 3   | 4   | 5   |
| 2   | 6   | 7   | 8   |

```python
df2 = DataFrame(np.arange(16).reshape(4,4), columns = list("abcd"))
```

|     | a   | b   | c   | d   |
| --- | --- | --- | --- | --- |
| 0   | 0   | 1   | 2   | 3   |
| 1   | 4   | 5   | 6   | 7   |
| 2   | 8   | 9   | 10  | 11  |
| 3   | 12  | 13  | 14  | 15  |

```python
df1 + df2
```

|     | a    | b    | c    | d   |
| --- | ---- | ---- | ---- | --- | --- |
| 0   | 0.0  | 2.0  | 4.0  | NaN |
| 1   | 7.0  | 9.0  | 11.0 | NaN |
| 2   | 14.0 | 16.0 | 18.0 | NaN |
| 3   | NaN  | NaN  | NaN  | NaN | NaN |

```python
df1.add(df2, fill_value= 0)
```

|     | a    | b    | c    | d    |
| --- | ---- | ---- | ---- | ---- |
| 0   | 0.0  | 2.0  | 4.0  | 3.0  |
| 1   | 7.0  | 9.0  | 11.0 | 7.0  |
| 2   | 14.0 | 16.0 | 18.0 | 11.0 |
| 3   | 12.0 | 13.0 | 14.0 | 15.0 |

```python
s2 = Series(np.arange(10, 14))
df2.add(s2, axis=0)
```

### lambda, map, apply

#### map for series

- pandas의 series type의 데이터에도 map 함수 사용 가능
- function 대신 dict, sequence형 자료 등으로 대체 가능

```python
s1 = Series(np.arange(10)) # 0부터 9까지 생성
s1.head(5)
s1.map(lambda x: x**2).head(5)
# 0 0
# 1 1
# 2 4
# 3 9
# 4 16

z = {1: 'A', 2: 'B', 3: 'C'}
s1.map(z).head(5)
# 0 NaN
# 1 A
# 2 B
# 3 C
# 4 NaN
# 없는 값은 NaN
```

> example

- 성별 str을 -> 성별 code(0, 1)로 바꾸기

```python
df = pd.read_csv("wages.csv")
df["sex_code"] = df.sex.map({"male":0, "female": 1})

df.sex.replace({"male":0, "female": 1})

df.sex.replace(["male", "female"],[0, 1], inplace=True)

```

#### apply for dataframe

- map과 달리, series 전체(columns)에 해당 함수를 적용
- 입력 값이 series 데이터로 입력 받아 handling 가능

|     | earn         | height | age |
| --- | ------------ | ------ | --- |
| 0   | 79571.299011 | 73.89  | 49  |
| 1   | 96396.988643 | 66.23  | 62  |
| 2   | 48710.666947 | 63.77  | 33  |
| 3   | 80478.096153 | 63.22  | 95  |
| 4   | 82089.345398 | 63.08  | 43  |

```python
df_info = df[["earn","height","age"]]

f = lambda x : x.max() - x.min()
df_info.apply(f)
```

#### applymap for dataframe

- series 단위가 아닌 element 단위로 함수를 적용함

```python
f = lambda x : -x
df_info.applymap(f).head(5)
```

## Pandas built-in functions

### describe

- Numeric Type 데이터의 요약 정보를 보여줌
  - count, mean, std, min 25%, 50%, 75%, max

### unique

- series data의 유일한 값을 list를 반환함

````python
df.race.unique()
# array(['white', 'other', 'hispanic', 'black'], dtype=object)
### sum
```python
df.sum(axis=0)
#  column 별로 sum
df.sum(axis=1)
# row 별로 sum
````

### isnull

- column 또는 row 값의 NaN 값의 index를 반환함

```python
df.isnull().sum()
# 비어져 있는 값의 합
```

### sort_values

- column 값을 기준으로 데이터를 sorting

```python
df.sort_values(["age", "earn"] ascending=True).head(10)
# 오름차순 정렬
```

### Correlation & Covariance

- 상관계수와 공분산을 구하는 함수
- corr, cov, corrwith

```python
df.age.corr(df.earn)
df.age.cov(df.earn)
df.corrwith(df.earn)

# 15세 ~ 45세 사이의 나이와 소득관의 상관관계
df.age(df.age < 45)&(df.age > 15).corr(df.earn)
```
