---
published: true
title: "[Python] Pandas library"

categories: Python
tag: [python, pandas]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2024-01-02
---
<br>

이전에 `pandas`를 이용해 `dacon`, `kaggle` 등에서 데이터를 다뤄 본 경험이 있다.

하지만 1년이 넘어서.. 기초를 다시 빠르게 짚고 넘어가려고 포스팅한다.

# Pandas

판다스 라이브러리는 데이터 조작과 분석을 위한 파이썬 라이브러리로, 표 형태의 데이터를 다루는데 매우 효과적이다. 판다스는 데이터프레임, 시리즈라는 두가지 핵심 데이터 구조를 제공한다.

**DataFrame** | 엑셀 시트와 같은 형태로 데이터를 표현한다. 여러 열과 행으로 구성되어 있어 다양한 데이터를 다뤄볼 수 있다.

**Series** | 데이터프레임의 한 열을 나타내는데 사용되는 자료구조로 간단히 생각하면, 시리즈는 엑셀의 한 열과 유사하다

## Pandas의 주요 기능

- 데이터 불러오기 및 저장 : CSV, 엑셀, 데이터베이스에서 데이터를 불러오거나 저장할 수 있다.
- 데이터 정렬 및 필터링 : 데이터를 원하는 기준에 따라 정렬하거나, 특정 조건에 맞는 데이터만 뽑아낼 수 있다.
- 데이터 변환 및 처리 : 데이터에 대한 변환 작업을 수행한다.
- 누락된 데이터 처리 : 데이터에 결측값이 있는 경우, 이를 처리하거나 다른 값으로 대체할 수 있다.
- 통계 및 집계 함수 : 평균, 합계, 표춘편차 등 다양한 통계 함수를 통해 데이터의 특성을 분석할 수 있다.
- 시계열 데이터 처리 : 날짜와 시간 관련된 데이터를 다루는데 특화되어 있다.
  
<br>
<br>

## Series

시리즈는 1차원 어레이와 동일한 구조를 갖는다. 다만 인덱스(index)를 0, 1, 2,...가 아닌 임의의 값으로 지정할 수 있다.

**list로 Series 생성하기**

```python
data = [10, 20, 30, 40, 50]
series1 = pd.Series(data)

print(series1)
print(type(series1))
```
```python
0    10
1    20
2    30
3    40
4    50
dtype: int64
<class 'pandas.core.series.Series'>
```

<br>

**Numpy배열로 Series 생성하기**

```python
import numpy as np

data = [10, 20, 30, 40, 50]
np_data = np.array(data)
print('배열의 타입:', type(np_data))

series2 = pd.Series(np_data)
print(series2)
```
```python
배열의 타입: <class 'numpy.ndarray'>
0    10
1    20
2    30
3    40
4    50
dtype: int32
```

<br>

**Dictionary로 Series 생성하기**

```python
data_dict = {
    'a': 10,
    'b': 20,
    'c': 30,
    'd': 40,
    'e': 50
}
series = pd.Series(data_dict)
series
```
```python
a    10
b    20
c    30
d    40
e    50
dtype: int64
```

**DataType 정해주기**

dtype 파라미터에 데이터 타입을 넣어 데이터 타입을 정할 수 있다.

모든 항목은 동일한 자료형을 가져야 한다.

```python
data = [10, 20, 30, 40, 50]
series = pd.Series(data, name='MySeries', dtype='float')
series
```
```python
0    10.0
1    20.0
2    30.0
3    40.0
4    50.0
Name: MySeries, dtype: float64
```

<br>

**values**

항목으로 사용된 값들은 `values` 속성이 넘파이 어레이로 저장된다.

```python
data = [10, 20, 30, 40, 50]
series1 = pd.Series(data)

series1.values
```
```python
array([10, 20, 30, 40, 50])
```

<br>

**index**

`index` 파라미터에 값을 넣어 index를 정할 수 있다.

별도로 지정하지 않으면 리스트, 넘파이 어레이 등에서 사용된 인덱스와 같이 기본으로 사용된다.

```python
data1 = [1, 2, 3, 4]
index = ['a', 'b', 'c', 'd']

series = pd.Series(data1, index=index, name='MySeries', dtype='int32')
series
```
```python
a    1
b    2
c    3
d    4
Name: MySeries, dtype: int32
```

사용된 인덱스는 `index` 속성이 갖고 있다.

```python
series.index
```
```python
Index(['a', 'b', 'c', 'd'], dtype='object')
```

숫자가 아닌 인덱스에 대해서도 인덱싱이 가능하다.

```python
series['a'] = 2
series
```
```python
a    2
b    2
c    3
d    4
Name: MySeries, dtype: int32
```

<br>

**부울 인덱싱**

```python
series[series >= 3]
```
```python
c    3
d    4
Name: MySeries, dtype: int32
```

<br>

**연산**
```python
series * 2
```
```python
a    4
b    4
c    6
d    8
Name: MySeries, dtype: int32
```

<br>

## 결측치

<br>

**isnull()**

`pd.isnull()` 함수는 누락된 항목은 `True`, 아니면 `False`로 지정하여 단번에 결측치가 포함되었는지 여부를 알 수 있다.

```python
pd.isnull(series)
```
```python
a    False
b    False
c    False
d    False
Name: MySeries, dtype: bool
```

<br>

**notnull()**

pd.notnull() 함수는 누락된 항목은 `True`, 아니면 `Falses`로 지정하여 결측치 포함 여부를 알 수 있다. `isnull`과 반대이다.

```python
pd.notnull(series)
```
```python
a    True
b    True
c    True
d    True
Name: MySeries, dtype: bool
```


`any()` 또는 `all()` 메서드를 활용하면 결측치 사용 여부를 한 번에 알 수 있다. 예를 들어 `pd.isnull()`과 `any()` 메서드의 활용 결과가 `True` 이면 결측치가 있다는 의미이다.

```python
series.isnull().any()
```
```python
False
```

<br>
<br>

## DataFrame

데이터프레임은 인덱스를 공유하는 여러 개의 시리즈를 다루는 객체이다.

**데이터프레임 생성**

state(주 이름), year(년도), pop(인구)를 key로 사용하며 해당 특성에 해당하는 데이터로 구성된 리스트를 값으로 갖는 사전 객체이다

```python
data = {'state': ['Ohio', 'Ohio', 'Ohio', 'Nevada', 'Nevada', 'Nevada', 'NY', 'NY', 'NY'],
        'year': [2000, 2001, 2002, 2001, 2002, 2003, 2002, 2003, 2004],
        'pop': [1.5, 1.7, 3.6, 2.4, 2.9, 3.2, 8.3, 8.4, 8.5]}
```

```python
frame = pd.DataFrame(data)
```

|-|state|year|pop|
|-|-:|:-:|-:|
|0|Ohio|2000|1.5|
|1|Ohio|2001|1.7|
|2|ohio|2002|3.6|
|3|Nevada|2001|2.4|
|4|Nevada|2002|2.9|
|5|Nevada|2003|3.2|
|6|NY|2002|8.3|
|7|NY|2003|8.4|
|8|NY|2004|8.5|


---

`head()` 메서드는 처음 5개의 행을 보여주고 인자를 지정하면 지정된 크기 만큼의 행을 볼 수 있다.

```python
frame.head()
```

|-|state|year|pop|
|-|-:|:-:|-:|
|0|Ohio|2000|1.5|
|1|Ohio|2001|1.7|
|2|ohio|2002|3.6|
|3|Nevada|2001|2.4|
|4|Nevada|2002|2.9|

<br>

`tail()` 메서드는 `head()`와 반대로 뒤에서부터 보여준다. 마찬가지로 5개 행을 보여주고 인자를 지정하면 지정된 크기 만큼의 행을 보여준다

```python
frame.tail()
```

|4|Nevada|2002|2.9|
|5|Nevada|2003|3.2|
|6|NY|2002|8.3|
|7|NY|2003|8.4|
|8|NY|2004|8.5|

<br>


**열 순서 지정**

```python
pd.DataFrame(data, columns=['year', 'state', 'pop'])
```

<br>

**열 추가**

```python
frame2 = pd.DataFrame(data, columns=['year', 'state', 'pop', 'debt'])
```

<br>

Series와 마찬가지로 **index를 지정**할 수 있고, 

```python
frame2 = pd.DataFrame(data, columns=['year', 'state', 'pop', 'debt'],
                      index=['one', 'two', 'three', 'four',
                             'five', 'six', 'seven', 'eight', 'nine'])
frame2
```

**열 인덱싱**도 시리즈와 동일한 방식을 사용가능하다.

```python
frame2['state']
```
```python
one        Ohio
two        Ohio
three      Ohio
four     Nevada
five     Nevada
six      Nevada
seven        NY
eight        NY
nine         NY
Name: state, dtype: object
```

아래는 Ohio state라는 열을 추가하는 예시로, state(주)가 Ohio인지 판단하는 여부를 판정하는 열이다.

```python
frame2['Ohio state'] = frame2.state == 'Ohio'
```

**열 삭제**

```python
del frame2['Ohio state']
```

<br>

**행 인덱싱**

행 인덱싱은 `loc`속성과 지정된 인덱스를 이용한다. 여러 행을 대상으로도 가능하다.

```python
frame2.loc['three']
```

**열 업데이트**

열 인덱싱을 이용하여 항목의 값을 지정할 수 있으며 브로드캐스팅이 기본적으로 작동한다.

```python
frame2['debt'] = 16.5
```

<br>
<br>
<br>

**정리 중.**