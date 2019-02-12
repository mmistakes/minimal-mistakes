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

코비 브라이언트의 압승입니다. 역시 전설적인 선수입니다. sort_values 메서드를 통해 "Salary"를 기준으로 내림차순 정렬을 하였습니다.

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