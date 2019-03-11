---
layout: post
title:  "Pandas 를 이용한 데이터 분석 Part 4"
subtitle: "Pandas DataFrame 다루기 (인덱스 지정/재지정 그리고 행 출력)"
author: "코마"
date:   2019-03-10 04:00:00 +0900
categories: [ "python", "pandas" ]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 이번 시간에는 데이터 프레임의 set_index, reset_index, loc, iloc, ix 를 다루어보도록 하겠습니다.

<!--more-->

# 개요

Pandas 라이브러리는 DataFrame 객체를 제공합니다. DataFrame 객체는 이전 시간에 2 차원 테이블 데이터 구조를 다룬다고 지난 시간에 이야기 하였습니다. 이번 시간에는 이 데이터 구조에서 인덱스를 설정하고 원하는 행을 출력하는 방법을 알아보겠습니다.

이번 시간의 목표

- 인덱스를 지정/재지정
- 원하는 행 데이터를 출력

## 인덱스 지정/재지정

우리는 지금까지 데이터 프레임을 다루어 오면서 데이터를 정렬하고 타입을 변환하는 등의 과정을 따라해 보았습니다. 그렇다면 이미 지정된 인덱스를 변경하는 방법을 알아보겠습니다.

제임스 본드의 영화 시리즈를 통해서 인덱스를 재지정하는 방법을 살펴보도록 하겠습니다. csv 파일을 읽어올 때 index_col 을 통해서 인덱스 칼럼을 'Film' 으로 지정하였습니다.

```python
import pandas as pd
bond = pd.read_csv('./jamesbond.csv', index_col='Film')
bond.head(3)
```

제임스 본드의 데이터는 아래와 같이 표시되며 가장 왼쪽에 있는 칼럼('Film')은 인덱스 칼럼입니다.

| | Year                  | Actor | Director     | Box Office    | Budget | Bond Actor Salary |
|-----------------------|-------|--------------|---------------|--------|-------------------|-----|
| **Film**                  |       |              |               |        |                   |     |
| Dr. No                | 1962  | Sean Connery | Terence Young | 448.8  | 7.0               | 0.6 |
| From Russia with Love | 1963  | Sean Connery | Terence Young | 543.8  | 12.6              | 1.6 |
| Goldfinger            | 1964  | Sean Connery | Guy Hamilton  | 820.4  | 18.6              | 3.2 |

만약에 여러분이 연도를 통해 영화를 알아보고자 하는 경우 어떨까요? 'Year' 칼럼을 통해 연도별 제임스 본드 영화를 출력해야 합니다.

- 단계 1. 인덱스 칼럼 해제
- 단계 2. Year 칼럼을 인덱스로 설정

```python
bond.reset_index(inplace=True)
bond.set_index('Year', inplace=True)
bond.head(3)
```

**주의: 만약에 reset_index 를 호출하지 않고 set_index 를 지정하는 경우 Film 칼럼이 삭제됩니다.**

|  | Film | Actor                 | Director     | Box Office    | Budget | Bond Actor Salary |
|------|-----------------------|--------------|---------------|--------|-------------------|-----|
| **Year** |                       |              |               |        |                   |     |
| 1962 | Dr. No                | Sean Connery | Terence Young | 448.8  | 7.0               | 0.6 |
| 1963 | From Russia with Love | Sean Connery | Terence Young | 543.8  | 12.6              | 1.6 |
| 1964 | Goldfinger            | Sean Connery | Guy Hamilton  | 820.4  | 18.6              | 3.2 |

## 인덱스를 통해 Row 가져오기

인덱스를 지정하는 목적 중에 하나는 원하는 Row 를 효과적으로 찾기 위함입니다. 이 때 사용하는 메서드가 ix, loc, iloc 입니다. 번역이 투박하지만 짧은 문장이므로 이해에는 무리가 없을 것으로 생각됩니다.

- iloc  
integer positon를 통해 값을 찾을 수 있다. label로는 찾을 수 없다
- loc  
label 을 통해 값을 찾을 수 있다. integer position로는 찾을 수 없다.
- ix  
integer position과 label모두 사용 할 수 있다. 만약 label이 숫자라면 label-based index만 된다.

우리는 연도를 통해 범위를 지정하여 영화를 검색하기도 합니다. 1964년부터 1990년까지 상영된 제임스 본드의 영화를 나열해보겠습니다. 이 때는 라벨을 기반으로 검색해야 합니다.

```python
bond.loc[1964:1990]
```

bond 데이터 프레임은 Year 칼럼을 기준으로 정렬되어 있습니다. 1964년부터 1990년까지 모든 제임스 본드의 영화가 출력됩니다.

| | Film | Actor                           | Director       | Box Office     | Budget | Bond Actor Salary |
|------|---------------------------------|----------------|----------------|--------|-------------------|-----|
| **Year** |                                 |                |                |        |                   |     |
| 1964 | Goldfinger                      | Sean Connery   | Guy Hamilton   | 820.4  | 18.6              | 3.2 |
| 1965 | Thunderball                     | Sean Connery   | Terence Young  | 848.1  | 41.9              | 4.7 |
| 1967 | Casino Royale                   | David Niven    | Ken Hughes     | 315.0  | 85.0              | NaN |
| 1967 | You Only Live Twice             | Sean Connery   | Lewis Gilbert  | 514.2  | 59.9              | 4.4 |
| 1969 | On Her Majesty's Secret Service | George Lazenby | Peter R. Hunt  | 291.5  | 37.3              | 0.6 |
| 1971 | Diamonds Are Forever            | Sean Connery   | Guy Hamilton   | 442.5  | 34.7              | 5.8 |
| 1973 | Live and Let Die                | Roger Moore    | Guy Hamilton   | 460.3  | 30.8              | NaN |
| 1974 | The Man with the Golden Gun     | Roger Moore    | Guy Hamilton   | 334.0  | 27.7              | NaN |
| 1977 | The Spy Who Loved Me            | Roger Moore    | Lewis Gilbert  | 533.0  | 45.1              | NaN |
| 1979 | Moonraker                       | Roger Moore    | Lewis Gilbert  | 535.0  | 91.5              | NaN |
| 1981 | For Your Eyes Only              | Roger Moore    | John Glen      | 449.4  | 60.2              | NaN |
| 1983 | Never Say Never Again           | Sean Connery   | Irvin Kershner | 380.0  | 86.0              | NaN |
| 1983 | Octopussy                       | Roger Moore    | John Glen      | 373.8  | 53.9              | 7.8 |
| 1985 | A View to a Kill                | Roger Moore    | John Glen      | 275.2  | 54.5              | 9.1 |
| 1987 | The Living Daylights            | Timothy Dalton | John Glen      | 313.5  | 68.8              | 5.2 |
| 1989 | Licence to Kill                 | Timothy Dalton | John Glen      | 250.9  | 56.7              | 7.9 |

### loc 과 iloc 의 차이점

그렇다면 연도(Year)는 정수이니 iloc 도 가능하지 않을까요? 실제로는 그렇지 않습니다.

```python
bond.iloc[1964:1990]
```

| | Film | Actor                           | Director       | Box Office     | Budget | Bond Actor Salary |
|------|---------------------------------|----------------|----------------|--------|-------------------|-----|
| **Year** | | | | | |

iloc 을 통해서 행을 출력하기 위해서는 위치 인덱스를 살펴야 합니다. 즉, 배열의 0, 1, 2 등의 위치에 있는 요소를 출력하는 것과 동일합니다. 따라서, 아래와 같이 입력합니다.

```python
bond.iloc[0:2]
```

출력 결과를 살펴볼까요? 행의 0, 1 에 위치한 데이터가 출력되었습니다. 맞습니다. 배열의 인덱스와 같은 성질입니다.

| | Year                  | Actor | Director     | Box Office    | Budget | Bond Actor Salary |
|-----------------------|-------|--------------|---------------|--------|-------------------|-----|
| **Film**                  |       |              |               |        |                   |     |
| Dr. No                | 1962  | Sean Connery | Terence Young | 448.8  | 7.0               | 0.6 |
| From Russia with Love | 1963  | Sean Connery | Terence Young | 543.8  | 12.6              | 1.6 |

### ix 살펴보기

그렇다면 두 가지 기능을 혼합한 것처럼 보이는 ix 를 통해서 살펴보겠습니다.

```python
bond.ix[1964:1990]
```

ix 가 곧 없어질 예정이라고 하는 군요, 대신에 .loc 과 .iloc 을 사용하라고 권장하고있습니다. 그러나 결과는 loc 과 동일합니다. 앞으로는 loc 과 iloc 만 사용해야겠습니다.

```bash
.ix is deprecated. Please use
.loc for label based indexing or
.iloc for positional indexing
```

# 결론

지금까지 DataFrame 에서 인덱스를 지정/재지정하고 원하는 행을 찾아 출력해보았습니다. 여러분이 이해하기 좋도록 예를 들어서 핵심만 정리하였습니다. 나머지 내용은 조금만 검색해도 충분히 이해할 수 있는 내용입니다. 구독해주셔서 감사합니다. 더욱 좋은 내용으로 찾아뵙도록 하겠습니다. 감사합니다.

이번 튜토리얼에 사용된 csv 파일입니다.

- [Download : jamesbond.csv](https://raw.githubusercontent.com/code-machina/DA-Pandas/master/jamesbond.csv)
