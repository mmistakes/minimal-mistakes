---
layout: post
title:  "Pandas 를 이용한 데이터 분석 Part 2"
subtitle: "CSV 파일을 읽고 Series 객체를 다루어보기"
author: "코마"
date:   2019-02-07 03:00:00 +0900
categories: [ "python", "pandas", "data_analysis", "csv" ]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 이번 포스트는 **"Pandas 를 이용한 데이터 분석 Part 1"** 에 이어서 CSV 파일을 이용한 Series 객체를 다루어보도록 하겠습니다. Pandas 의 시작은 외부 데이터를 불러오는 것에서 시작합니다. 그리고 데이터는 보통 CSV 파일로 운반됩니다. 아마도 어플리케이션에 특정되지 않으며 파일 규격이 복잡하지 않기 때문에 널리 쓰이는 것으로 보입니다.

<!--more-->

# 개요

이번 시간에는 csv 파일을 이용해 Series 객체를 생성하고 메서드를 이용하여 데이터를 조작하는 방법을 다루겠습니다.

> **코마** 는 **Anaconda** 를 즐겨 사용합니다. 그러나 반드시 이 툴을 사용해야 하는 것은 아닙니다. 하지만 설치의 부담없이 간편하게 사용할 수 있으므로 추천합니다. 그리고 **jupyter notebook** 을 사용하면 아주 편리하게 작업할 수 있습니다.
>> 이 과정에 사용되는 모든 파일은 github 링크를 참조하면 좀더 편리합니다. 이때 포맷은 주피터 노트북이므로 약간의 설치 과정을 수반합니다. 아나콘다 설치 및 주피터 사용 방법은 다른 블로그에서 많이 다루고 있으니 5분만 할애해 주세요 ^^;

## 자주 사용되는 메서드

시작하기에 앞서 Series 객체를 다룰 때 자주 사용되는 메서드들을 아래와 같이 정리하였습니다.

|.method|descr.|
|:---:|:---:|
|.read_csv| csv 파일을 읽고 데이터 객체로 변환한다. |
|.tail| 맨 마지막에서 위로 5개(Default) 데이터 항목을 출력|
|.head| 맨 위에서 아래로 5개(Default) 데이터 항목을 출력 |
|.sort_values | 데이터를 기준으로 데이터를 정렬 |
|.sort_index | 인덱스를 기준으로 데이터를 정렬 |
|.idxmax, .idxmin | 인덱스의 최대 혹은 최소 값을 출력 |
|.sum, .mean, .count, .std, .min, .max, .median, .mode | 각각 데이터의 합, 평균, 데이터 항목 수, 표준편차, 최소 값, 최대 값, 중간값, 최빈값을 출력 |
|.describe | 각종 통계, 사분위수 포함|
|.value_counts| 고유한 값들에 대한 카운트를 출력 |
|.apply(fnc, ...)| Series 데이터에 대해 함수를 실행, 분류값으로 사용할 수 있음 |
|.map| 두개의 Series 객체를 value-key 로 맵핑하여 새로운 Series 객체를 출력|
| (python-built-in) dir| 객체의 어트리뷰트 리스트를 출력|
| (python-built-in) sorted | 데이터를 정렬하여 출력 |
| (python-built-in) list |  객체를 list 타입으로 변환 |
| (python-built-in) dict |  객체를 dict 타입으로 변환 |
| (python-built-in) max, min |  데이터의 최대, 최소를 출력|

# csv 파일 읽어오기 (pd.read_csv)

pandas 모듈은 .read_csv 메서드를 통해 가까운 CSV 파일을 읽고 이를 데이터 객체로 표현할 수 있습니다.

```python
import pandas as pd

pokemon = pd.read_csv(
  './pokemon.csv',
)
poket.info()
```

```bash
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 721 entries, 0 to 720
Data columns (total 2 columns):
Pokemon    721 non-null object
Type       721 non-null object
dtypes: object(2)
memory usage: 11.3+ KB
```

.info 메서드를 통해서 csv 파일의 구성을 알 수 있습니다. csv 파일은 두 개의 칼럼을 가지고 있고 각각의 이름은 Pokemon, Type 입니다. 열이 두개 이상이므로 read_csv 메서드는 DataFrame 객체를 반환합니다. 그러나 이는 우리가 원하는 데이터 타입이 아닙니다. 따라서 읽어올 데이터를 바꾸어 보겠습니다.

- Pokemon 열만 읽어오기

```python
poket_name = pd.read_csv('../pokemon.csv',usecols=['Pokemon'], squeeze=True)

poket_name.head()
```

|인덱스|포켓몬 이름|
|:---:|:---:|
|0 |  Bulbasaur |
|1 |  Ivysaur |
|2 |   Venusaur |
|3 |    Charmander |
|4 |   Charmeleon |

- Type 열만 읽어오기

```python
poket_types = pd.read_csv('../pokemon.csv',usecols=['Type'], squeeze=True)

poket_types.head()
```

|인덱스|포켓몬 속성|
|:---:|:---:|
|0 |  Grass |
|1 |  Grass |
|2 |   Grass |
|3 |    Fire |
|4 |   Fire |

## 과제

우리는 각각의 데이터를 가져왔습니다. 데이터의 특성을 확인해보고 아래의 과제를 한번 풀어 보겠습니다.

- **Types 와 Pokemon 열을 합치되 Pokemon 열이 인덱스가 되며 포켓몬의 이름을 통해서 속성을 알 수 있는 데이터 셋을 만들기**

과제는 단순합니다. DataFrame 이 아닌 오로지 Series 만을 이용해서 숫자 인덱스 대신에 포켓몬 이름을 인덱스로 하는 새로운 Series 를 만드는 것입니다. 여기에는 두가지 해결 방법이 있습니다.

- Series.map 을 이용한 방법
- read_csv 를 이용한 방법

### **map 을 이용한 방법**

map 메서드의 원리는 간단합니다. A, B Series 가 있다고 하였을 때, A 의 Values 는 B 의 Index 와 일치해야 합니다.

즉, 아래와 같은 데이터가 필요합니다. 아래의 표는 위의 (인덱스, 포켓몬 이름) 데이터를 (포켓몬 이름, 인덱스) 로 변환한 것입니다. 즉, 자리를 바꾼 것이죠(이제 인덱스는 Pokemon 입니다.). 이를 A 라고 하겠습니다.

|포켓몬 이름|인덱스|
|:---:|:---:|
|  Bulbasaur | 0 |
|  Ivysaur | 1 |
|   Venusaur | 2 |
|    Charmander | 3 |
|   Charmeleon | 4 |

그리고, B 는 포켓몬 속성입니다. 위의 테이블에서 변경없이 사용하겠습니다.

|인덱스|포켓몬 속성|
|:---:|:---:|
|0 |  Grass |
|1 |  Grass |
|2 |   Grass |
|3 |    Fire |
|4 |   Fire |

만약에, A.map(B) 라고 한다면 아래와 같이 데이터가 연결됩니다.

|포켓몬 이름| 인덱스 A | 인덱스 B | 포켓몬 속성|
|:---:|:---:|:---:|:---:|
|Bulbasaur| 0 | 0 | Grass | 

위의 표에서 Bulbasaur 의 값은 0 이고 Grass 속성의 인덱스는 0 입니다. 그리고 map 은 A 의 값과 B 의 인덱스를 연결하여 아래의 표를 출력합니다.

|인덱스(포켓몬 이름) | 값(포켓몬 속성) |
|:---:|:---:|
| Bulbasaur  |   Grass|
| Ivysaur    |   Grass|
| Venusaur   |   Grass|
| Charmander |    Fire|

자 이제, 실제 데이터를 처리해볼까요?

- 첫번째, 인덱스와 데이터를 변경하기

새로운 Series 를 만듭니다. data 옵션에 poket_name.index, 그리고 index 에 poket_name.values 데이터를 전달합니다. .head 를 통해서 데이터를 살펴봅니다.

```python
inverse_poket_name = pd.Series(data=poket_name.index, index=poket_name.values)
inverse_poket_name.head(4)
```

인덱스와 데이터가 바뀐것을 알 수 있습니다.

```bash
Bulbasaur     0
Ivysaur       1
Venusaur      2
Charmander    3
dtype: int64
```

- 두번째, map 을 이용한 결합

map 메서드를 사용할 수 있는 조건이 갖추어져 있습니다. poket_types 객체를 연결해보겠습니다.

```python
poket_name_type = inverse_poket_name.map(poket_types)
poket_name_type.head(4)
```

결과는 성공적입니다. 이제, Pikachu(피카추) 의 속성을 불러오겠습니다.

```bash
Bulbasaur     Grass
Ivysaur       Grass
Venusaur      Grass
Charmander     Fire
dtype: object
```

- 세번째, 포켓몬의 이름으로 속성에 접근하기

```python
poket_name_type['Pikachu']
```

성공적입니다. 피카추의 속성은 Electric (전기) 속성입니다.

```bash
'Electric'
```

### **.read_csv 를 이용한 방법**

이제, 간편하게 .read_csv 메서드를 이용해보겠습니다. 아래의 메서드 파라미터를 참고해주세요.

- index_col : 칼럼 중에 인덱스로 지정할 칼럼의 이름을 지정
- usecols : .read_csv 메서드가 읽어올 칼럼을 지정
- squeeze : DataFrame 을 단일 칼럼의 Series 데이터로 변환

> TIP. usecols 는 Values 에 지정될 데이터가 아닙니다. 말 그대로 사용할 칼럼을 지정하는 옵션입니다. 그리고 usecols 에서 Pokemon 칼럼을 사용한다고 알려주어야 index_col 에서 Pokemon 칼럼을 인덱스로 지정할 수 있습니다.

```python
poket_name_type = pd.read_csv('../pokemon.csv',
  index_col='Pokemon',
  usecols=['Pokemon','Type'],
  squeeze=True)

poket_name_type.head(4)
```

동일한 결과가 나옵니다.

```bash
Bulbasaur     Grass
Ivysaur       Grass
Venusaur      Grass
Charmander     Fire
dtype: object
```

## 결론

오늘은 csv 파일을 읽어와 두 개의 Series 객체를 만들고 이를 결합하는 과정을 살펴보았습니다. 아래의 csv 파일을 다운받아 여러분도 과정을 함께 해보시길 추천드립니다. 그리고 read_csv 메서드를 이용해서 동일한 작업을 짧은 코드로 해결할 수 있음을 알아보았습니다. 여기에서는 Series 객체의 다른 메서드들은 간단한 목록표로 설명을 줄였습니다. csv 파일을 다룰 때 한번 써보시기를 추천드립니다. 지금까지 **코마의 Series 객체를 사용한 데이터 분석 Part2** 였습니다. Part3 에서는 DataFrame 을 다루어보도록 하겠습니다. 더욱더 노력하는 **코마**가 되겠습니다.

구독해주셔서 감사합니다.

[CSV 파일 다운로드 : Pokemon.csv](https://raw.githubusercontent.com/code-machina/DA-Pandas/master/pokemon.csv)