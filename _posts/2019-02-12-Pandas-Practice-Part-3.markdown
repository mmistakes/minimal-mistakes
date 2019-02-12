---
layout: post
title:  "Pandas 를 이용한 데이터 분석 Part 3"
subtitle: "Pandas DataFrame 다루기"
author: "코마"
date:   2019-02-11 21:00:00 +0900
categories: [ "python", "pandas", "DataFrame" ]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 이번 토픽에서는 DataFrame 에 대해 다루어보도록 하겠습니다. Series 객체를 다루는 방법에 대해서는 Part 1 과 Part 2 를 구독해주시길 바랍니다.

<!--more-->

# 개요

Pandas 라이브러리는 DataFrame 객체를 제공합니다. DataFrame 객체는 2-차원의(two-dimensional) 테이블 데이터 구조를 제공합니다. 다시말하면, 표로 작성되는 데이터를 다루는 것을 의미합니다.

.read_csv 메서드를 이용해 데이터를 임포트할 경우 DataFrame 객체가 반환됩니다. 이전 토픽에서는 Series 객체를 사용하도록 옵션을 전달하거나 데이터를 쪼개어 사용하였습니다. 지금부터는 곧바로 반환된 객체를 효율화 하고 다루는 방법을 알아보도록 하겠습니다.

## DataFrame 기본 메서드, 어트리뷰트 정리

DataFrame 클래스에서 제공하는 메서드 목록을 아래와 같이 정리하였습니다. 

|메서드 이름|설명|
|:---:|:---:|
|.head| 데이터를 정렬 된 순서로부터 위에서 아래로 5개(Default) 항목을 출력|
|.tail| 데이터를 정렬 된 순서로부터 아래에서 위로 5개(Default) 항목을 출력|
|.astype| 칼럼의 데이터 타입을 변환|
|.get_dtype_counts| 데이터 타입의 카운트를 출력|
|.info| 칼럼 정보를 요약하여 출력 |
|.nunique| 칼럼의 고유한 데이터 수를 출력 (중복을 제거) |
|.sort_values| 특정 칼럼을 기준으로 descending, ascending 정렬을 함 |
|.sort_values| 특정 칼럼을 기준으로 descending, ascending 정렬을 함 |
|.sort_index| 인덱스를 기준으로 descending, ascending 정렬을 함 |
|.fillna| nan 값을 0 으로 치환 |
|.rank| Salary 칼럼의 랭크를 매긴다. 랭크의 기준으로 ascending, descending 이 있다. |

|Attr. 이름|설명|
|:---:|:---:|
|.values| 데이터에서 인덱스를 제외한 항목을 출력 |
|.index | 데이터에서 인덱스만을 출력|
|.shape| 행과 열의 수치를 출력|
|.dtypes| 칼럼의 타입 목록을 출력 |
|.columns| 칼럼의 이름을 출력 |
|.axis| 인덱스와 칼럼을 출력 |

## NBA 농구 선수 데이터

이번 시간에 사용할 데이터는 nba.csv 입니다. NBA 농구 선수의 데이터가 포함된 파일입니다. 유명한 코비 브라이언트(Kobe Bryant) 선수도 있습니다. 우선 데이터를 한번 살펴볼까요?

```python
import pandas as pd
nba = pd.read_csv('nba.csv')
nba.head(3)
```

Bradely 선수는 등번호가 없습니다. 이외에도 연봉이 Non 인 경우도 있습니다. 칼럼별 실제 데이터 카운트를 보아야 할 것 같습니다.

|      | Name | Team          | Number         | Position | Age | Height | Weight | College | Salary            | 
|------|---------------|----------------|----------|-----|--------|--------|---------|-------------------|-----------|
| 0    | Avery Bradley | Boston Celtics | 0.0      | PG  | 25.0   | 6-2    | 180.0   | Texas             | 7730337.0 |
| 1    | Jae Crowder   | Boston Celtics | 99.0     | SF  | 25.0   | 6-6    | 235.0   | Marquette         | 6796117.0 |
| 2    | John Holland  | Boston Celtics | 30.0     | SG  | 27.0   | 6-5    | 205.0   | Boston University | NaN       |

```python
nba.info()
```
전체 데이터 수는 458개 입니다. 그러나 Salary 와 College 는 각각 373, 446 건입니다. 대학에 가지 않은 선수가 있을 수 있다는 점을 고려하면 연봉(Salary) 의 경우 선수 등록은 되어 있지만 계약되지 않은 선수(방출 선수)인 것으로 생각할 수 있겠습니다.

```bash
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 458 entries, 0 to 457
Data columns (total 9 columns):
Name        457 non-null object
Team        457 non-null object
Number      457 non-null float64
Position    457 non-null object
Age         457 non-null float64
Height      457 non-null object
Weight      457 non-null float64
College     373 non-null object
Salary      446 non-null float64
dtypes: float64(4), object(5)
memory usage: 32.3+ KB
```

데이터 타입을 보니 두 종류로 구분됩니다. 부동소수형 숫자를 표현하는 float 과 object 타입이 있습니다. object 는 문자열입니다.

```python
nba.get_dtype_counts()
```

```bash
float64    4
object     5
dtype: int64
```

저는 코비 브라이언트 선수가 얼마의 연봉을 받는지 궁금합니다. 아마 상상을 초월한 금액을 받을것 같습니다. 출력하는 칼럼을 두개로 제한해서 확인해보겠습니다.

```python
nba[["Name", "Team", "Salary"]].sort_values("Salary", ascending=False)
```

코비 브라이언트의 압승입니다. 역시 전설적인 선수입니다. sort_values 메서드를 통해 "Salary"를 기준으로 내림차순 정렬을 하였습니다. 맨 상단에 코비가 위치한 것을 볼 수 있습니다.

| Index | Name             	| Team                  	| Salary    |
|------	|-----------------	|-----------------------	|----------	|
| 109  	| Kobe Bryant     	| Los Angeles Lakers    	| 25000000 	|
| 169  	| LeBron James    	| Cleveland Cavaliers   	| 22970500 	|
| 33   	| Carmelo Anthony 	| New York Knicks       	| 22875000 	|
| 251  	| Dwight Howard   	| Houston Rockets       	| 22359364 	|
| 339  	| Chris Bosh      	| Miami Heat            	| 22192730 	|
| 100  	| Chris Paul      	| Los Angeles Clippers  	| 21468695 	|
| 414  	| Kevin Durant    	| Oklahoma City Thunder 	| 20158622 	|
| 164  	| Derrick Rose    	| Chicago Bulls         	| 20093064 	|
| 349  	| Dwyane Wade     	| Miami Heat            	| 20000000 	|
| 174  	| Kevin Love      	| Cleveland Cavaliers   	| 19689000 	|

## 인사 데이터

DataFrame 의 정렬 기능을 이용해 가장 연봉을 많이 받는 선수를 확인해 보았습니다. 기본 메서드를 장리해두면 손쉽게 가능함을 확인할 수 있었습니다. 그렇다면 이제 인사 데이터를 만져보겠습니다.

```python
import pandas as pd
df = pd.read_csv('./employees.csv')
df.head(3)
```

|            | First Name | Gender  | Start Date | Last Login Time | Salary   | Bonus % | Senior Management | Team  |
|------------|---------|------------|-----------------|----------|---------|-------------------|-------|-----------|
| 0          | Douglas | Male       | 8/6/1993        | 12:42 PM | 97308   | 6.945             | True  | Marketing |
| 1          | Thomas  | Male       | 3/31/1996       | 6:53 AM  | 61933   | 4.170             | True  | NaN       |
| 2          | Maria   | Female     | 4/23/1993       | 11:17 AM | 130590  | 11.858            | False | Finance   |

### 데이터 메모리 최적화

데이터를 처음에 읽어오게되면 메모리 내에 저장이됩니다. 그러나 데이터 양이 커짐에 따라 타입 변환을 통해 메모리 효율성을 증가 시킬 필요가 있습니다. 흔한 예로 날짜 데이터, 성별, 불린 데이터는 타입 변환의 주 대상이 됩니다. 아래의 코드를 볼까요?

```python
import pandas as pd

df = pd.read_csv('./employees.csv', 
                 parse_dates=["Start Date", "Last Login Time"])
df["Senior Management"] = df["Senior Management"].astype("bool")
df["Gender"]= df["Gender"].astype("category")
df.head(3)
```

위의 코드는 타입 변환을 수행한 코드입니다. 이제 결과를 보겠습니다. .info 메서드를 통해 메모리 크기 정보를 확인할 수 있습니다. 약 49 KB 인것으로 확인되었습니다. 그렇다면 이전의 결과 값은 어떨까요? 62.6 KB 입니다. 1.2배 정도 효율이 좋아졌습니다. 아마도 데이터의 크기가 클수록 더욱 좋아질 것으로 보입니다. 그렇다면 데이터의 특성을 파악한 뒤에 실제로 데이터를 처리하는 경우 변환 작업을 거친 뒤에 실제 작업에 착수하는 프로세스를 머리 속에 그릴 수 있습니다.

```python
df.info()
```

```bash
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 1000 entries, 0 to 999
Data columns (total 8 columns):
First Name           933 non-null object
Gender               855 non-null category
Start Date           1000 non-null datetime64[ns]
Last Login Time      1000 non-null datetime64[ns]
Salary               1000 non-null int64
Bonus %              1000 non-null float64
Senior Management    1000 non-null bool
Team                 957 non-null object
dtypes: bool(1), category(1), datetime64[ns](2), float64(1), int64(1), object(2)
memory usage: 49.0+ KB
```

### 조건에 따른 필터 1 (Basic)

우리는 데이터의 특성을 파악하고 이에 맞추어 필터를 걸고 싶을 것입니다. 필터를 통해서 원하는 군의 데이터를 확인할 수 있으며 이를 통해 좀 더 양질의 데이터를 추출할 수 있을 것으로 기대됩니다. 그렇다면 필터를 걸어볼까요?

인사 데이터에서 남성과 여성을 분류하여 통계를 내고 싶습니다. 이 경우 아래와 같이 사용할 수 있습니다. 아래의 코드에서 팁을 드리자면 `df["Gender"] == "Male"` 의 구문이 동작할 경우 True 혹은 False 의 (n,) 의 배열을 리턴한다는 사실입니다. 그리고 이 결과를 index operator([], square bracket) 에 전달할 경우 True 인 데이터만 표시되게 됩니다.

간혹 lambda 식과 같은 function 을 전달하는 것으로 착각할 수 있어 언급드립니다.

```python
mask = df["Gender"] == "Male"
df[mask].head()
```

남성(Male)만 필터링되어 출력된 것을 볼 수 있습니다.

|                 | First Name | Gender  | Start Date | Last Login Time | Salary              | Bonus % | Senior Management | Team  |
|------------|---------|------------|-----------------|---------------------|---------|-------------------|-------|-----------------|
| 0          | Douglas | Male       | 1993-08-06      | 2019-02-13 12:42:00 | 97308   | 6.945             | True  | Marketing       |
| 1          | Thomas  | Male       | 1996-03-31      | 2019-02-13 06:53:00 | 61933   | 4.170             | True  | NaN             |
| 3          | Jerry   | Male       | 2005-03-04      | 2019-02-13 13:00:00 | 138705  | 9.340             | True  | Finance         |
| 4          | Larry   | Male       | 1998-01-24      | 2019-02-13 16:47:00 | 101004  | 1.389             | True  | Client Services |
| 5          | Dennis  | Male       | 1987-04-18      | 2019-02-13 01:35:00 | 115163  | 10.125            | False | Legal           |
| 12         | Brandon | Male       | 1980-12-01      | 2019-02-13 01:08:00 | 112807  | 17.492            | True  | Human Resources |

연산자는 ==, >=, <=, >, <, != 등을 자유롭게 사용할 수 있습니다. 이제 조금 복합적인 조건을 살펴보겠습니다.

### 조건에 따른 필터 2 (AND, OR)

위와 내용에 있어 큰 차이가 없기 때문에 간단히 보고 넘어가면 되겠습니다. 아래는 AND(&) 연산입니다.

```python
mask1 = df["Gender"] == "Male"
mask2 = df["Team"] == "Marketing"

df[mask1 & mask2]
```

아래는 OR(\|) 연산입니다.

```python
mask1 = df["Senior Management"]
mask2 = df["Start Date"] < '1990-01-01'

df[mask1 | mask2]
```

### 조건에 따른 필터 3 (.isin, .isnull, 그리고 .notnull)

만약 우리가 위에서 배움을 멈춘다면 아래와 같이 코드의 양이 늘어날 것입니다. 이는 매우 비효율적입니다.

```python
mask1 = df["Team"] == "Legal"
mask2 = df["Team"] == "Sales"
mask3 = df["Team"] == "Product"

df[mask1 | mask2 | mask3]
```

위의 코드는 아래와 같이 작성될 수 있습니다. 코드는 더 짧아지고 간편해졌습니다. 그리고 효과는 동일합니다.

```python
df[df["Team"].isin(["Legal", "Sales", "Product"])]
```

만약에 데이터 중에 NaN 으로 표기되는 데이터가 있다면 어떨까요? 그대로 두거나 어떠한 처리를 해야합니다. 우선 NaN 데이터 여부를 확인해 볼까요?

```python
mask = df["Team"].isnull()
df[mask].head()
```

Team 이름이 NaN 인 데이터가 실재합니다. 이제 Team 칼럼에 NaN 이 아닌 경우를 필터해 보겠습니다. 이때는 .notnull 메서드가 사용됩니다. 지면상 데이터 출력 결과는 생략하였습니다.

```python
mask = df["Team"].notnull()
df[mask]
```

# 결론

이번 시간에는 DataFrame 이 제공하는 어트리뷰트, 메서드를 간략히 알아보았습니다. 그리고 메모리를 효율화 하였으며 필터를 걸어 원하는 데이터만을 추출하였습니다. 다음 시간에는 DataFrame 에 대해 좀더 알아보도록 하겠습니다. 구독해주셔서 감사합니다. 

이번 튜토리얼에 사용된 csv 파일입니다.

- [Download : employees.csv](https://raw.githubusercontent.com/code-machina/DA-Pandas/master/employees.csv)
- [Download : nba.csv](https://raw.githubusercontent.com/code-machina/DA-Pandas/master/nba.csv)
