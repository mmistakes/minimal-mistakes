---
layout: post
title:  "Pandas 를 이용한 데이터 분석 Part 5"
subtitle: "Pandas DataFrame 다루기 (인덱스 지정/재지정 그리고 행 출력)"
author: "코마"
date:   2019-03-13 09:00:00 +0900
categories: [ "python", "pandas" ]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 이번 시간에는 데이터 프레임의 편집(가공)에 대해 알아보겠습니다.

<!--more-->

# 개요

Pandas 데이터 프레임의 마지막을 향해 달려가고 있습니다. 여유가 있는 구독자 분들은 Part 1 탄 부터 구독을 부탁드립니다. 이번 시간에는 DataFrame 의 변경 작업을 해보도록 하겠습니다.

이번 시간의 목표

- loc/iloc 을 이용해 원하는 칼럼을 출력
- 인덱스 레이블을 이용한 행 편집
- 마스킹을 이용한 다중 행 편집
- 칼럼 이름 재할당
- 칼럼 한글화 패치

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 수평형 광고 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7572151683104561"
     data-ad-slot="5543667305"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 지정된 칼럼 출력

매번 head 를 통해서 데이터를 일일이 파악하다보면 세부적인 컨트롤이 필요할 때가 있습니다. 모든 프로그램 언어가 그렇듯이 세부적인 컨트롤이 관건입니다. Pandas 를 이를 위한 간단한 해법을 제시하고 있습니다. 바로 square brackets([]) 가 그것입니다. 파이썬 언어에 관심이 있으신 분들은 브레킷의 문법적 의미를 이해하실 것이라고 믿습니다. Pandas 철학을 복제하는 글은 나중에 다루어보도록 할게요.

지정된 칼럼을 출력하기 위해서 아래와 같이 제임스 본드 영화의 CSV 데이터를 임포트(로드)하도록 하겠습니다.

```python
import pandas as pd
bond = pd.read_csv('./jamesbond.csv', index_col='Film')
bond.head(3)
```

데이터가 잘 로드된 것을 볼 수 있습니다. 그렇다면 원하는 칼럼을 추출해볼까요?

| | Year                  | Actor | Director     | Box Office    | Budget | Bond Actor Salary |
|-----------------------|-------|--------------|---------------|--------|-------------------|-----|
| **Film**                  |       |              |               |        |                   |     |
| Dr. No                | 1962  | Sean Connery | Terence Young | 448.8  | 7.0               | 0.6 |
| From Russia with Love | 1963  | Sean Connery | Terence Young | 543.8  | 12.6              | 1.6 |
| Goldfinger            | 1964  | Sean Connery | Guy Hamilton  | 820.4  | 18.6              | 3.2 |

사용할 메서드는 loc 과 iloc 입니다. 이 둘의 차이점은 Part 4 에서 언급하였습니다. 기억이 안나시는 분들은 'Pandas 를 이용한 데이터 분석 Part 5' 글을 참조해 주세요.

loc 메서드를 이용해 인덱스 레이블의 "Moonraker" 에 접근을 합니다. 그리고 'Year', 'Actor' 칼럼만 출력하도록 지정해줍니다.

```python
bond.loc['Moonraker', ['Year', 'Actor']]
```

Moonraker 는 1979년도에 발표된 작품이군요 고전입니다. 배우는 Roger Moore 입니다.

```bash
Year            1979
Actor    Roger Moore
Name: Moonraker, dtype: object
```

iloc 은 배열의 인덱스 처럼 접근합니다. 즉, 0번째, 1번째, .... K번째 행에 접근하기 위해서 `bond.iloc[2, ['Year', 'Actor]]` 와 같이 작성해 줍니다.

## 인덱스 레이블을 통한 행(Row) 편집

iloc 은 조금 불편하다는 사실을 알았습니다. 사실 loc 을 자주 쓰게될 것이라는 예감이 듭니다. loc 을 이용해서 특정 행을 호출하고 행의 데이터를 약간 변형하도록 하겠습니다.

'Dr. No' 영화를 불러옵니다. 그리고 'Year', 'Actor' 를 확인해 보겠습니다.

```python
bond.loc['Dr. No', ['Year', 'Actor']]
```

드디어 대 배우 숀 코네리가 등장하였습니다. 무려 1962년도 작품입니다. 여전히 숀 코네리는 멋있습니다.

```bash
Year             1962
Actor    Sean Connery
Name: Dr. No, dtype: object
```

그런데 만약에, 1962 년도 작품이 아니라 1961 년도에 개봉되었으나 한국에서만 1962 년도에 개봉되었다고 가정해봅시다. 그리고 이미 숀 코네리가 기사 자격증(?)을 취득하였다고 가정한다면 데이터가 변경되어야 합니다.

```python
bond.loc['Dr. No', ['Year', 'Actor']] = [1961, 'Sir Sean Connery']
bond.loc['Dr. No]
```

데이터가 잘 변경되었습니다. 그리고 변경 시 복제본을 생성하는 것이 아닌 원본을 변경합니다. 항상 파이썬에서 데이터 처리 작업 시에 원본은 변경하느냐 혹은 사본을 생성하느냐는 중요한 이슈입니다. 잘 기억해두시길 바랍니다.

```bash
Year                             1961
Actor                Sir Sean Connery
Director                Terence Young
Box Office                      448.8
Budget                              7
Bond Actor Salary                 0.6
Name: Dr. No, dtype: object
```

## 마스킹을 이용한 다중 행 편집

이제 하나의 데이터를 바꾸어 보았으니 다수의 데이터를 편집해보도록 합니다. 엑셀을 편집할 때 어떻게 자료를 작성하시나요? 그렇습니다. 필터를 걸어두고 원하는 데이터만 선별하여 일괄적으로 데이터를 바꾸어 넣습니다. 일일이 하나씩 데이터를 바꾸는 것은 매우 비효율적인 일이며 데이터량에 비례해 작업량이 선형적으로 증가합니다. 다음의 사항을 가정해볼까요?

Sean Connery 가 출연한 영화의 데이터를 분석하여 시각화 레포트를 작성하였습니다. 그런데, 영화 협회에서 영화 배우에 대한 이름을 변경해달라는 요청을 받게됩니다. 기사 작위를 받았으니 Sir Sean Connery 배우 님이 되는 것입니다. 영화 협회가 조금은 밉지만 그래도 무시할 순 없습니다. 작업은 여러 단계로 나누어 볼까요?

- Sean Connery 데이터 만을 선별
- Sir Sean Connery 로 치환

데이터를 선별하기 위해서는 마스킹(Mask)를 만들어 True/False Bolean 리스트를 만들어야 합니다. 불린 리스트를 만드는 방법은 간단하니 이전 글을 참조하지 않으셔도 됩니다.

```python
mask = bond['Actor'] == "Sean Connery"
bond[mask]
```

마스킹이 잘 되었습니다.

| | Year                  | Actor | Director     | Box Office     | Budget | Bond Actor Salary |
|-----------------------|-------|--------------|----------------|--------|-------------------|-----|
| Film                  |       |              |                |        |                   |     |
| Diamonds Are Forever  | 1971  | Sean Connery | Guy Hamilton   | 442.5  | 34.7              | 5.8 |
| From Russia with Love | 1963  | Sean Connery | Terence Young  | 543.8  | 12.6              | 1.6 |
| Goldfinger            | 1964  | Sean Connery | Guy Hamilton   | 820.4  | 18.6              | 3.2 |
| Never Say Never Again | 1983  | Sean Connery | Irvin Kershner | 380.0  | 86.0              | NaN |
| Thunderball           | 1965  | Sean Connery | Terence Young  | 848.1  | 41.9              | 4.7 |
| You Only Live Twice   | 1967  | Sean Connery | Lewis Gilbert  | 514.2  | 59.9              | 4.4 |

### 하기 쉬운 실수

위에서 데이터를 편집할 때 loc, iloc 을 사용하였습니다. 그런데 단순 square brackets([]) 을 사용하여 편집이 될 수 있다고 착각하기 쉽습니다. 그럴 경우 아래와 같은 코드가 나오게됩니다.

```python
sean = bond[mask]
sean['Actor'] = 'Sir Sean Connery'
```

에러가 발생하였습니다. 좋지 않아보이는 군요. 내용은 데이터 프레임의 일부 복사본에 대해 값(value)를 설정하였다는 에러이며 대신 .loc 을 사용하라고 알려줍니다. 친절한 Panda 씨입니다. :)

```bash
C:\ProgramData\Anaconda3\lib\site-packages\ipykernel_launcher.py:3: SettingWithCopyWarning: 
A value is trying to be set on a copy of a slice from a DataFrame.
Try using .loc[row_indexer,col_indexer] = value instead

See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
  This is separate from the ipykernel package so we can avoid doing imports until
```

### 바른 방법

올바른 방법을 알아보겠습니다. 아래의 코드를 그대로 따라해주세요.

```python
bond.loc[mask, 'Actor'] = 'Sir Sean Connery'
bond.loc[mask]
```

다중 행에 대한 데이터 변경이 잘 이루어졌습니다. 그리고 마스킹도 응용이되었습니다.

|  | Year                  | Actor | Director         | Box Office     | Budget | Bond Actor Salary |
|-----------------------|-------|------------------|----------------|--------|-------------------|-----|
| Film                  |       |                  |                |        |                   |     |
| Diamonds Are Forever  | 1971  | Sir Sean Connery | Guy Hamilton   | 442.5  | 34.7              | 5.8 |
| From Russia with Love | 1963  | Sir Sean Connery | Terence Young  | 543.8  | 12.6              | 1.6 |
| Goldfinger            | 1964  | Sir Sean Connery | Guy Hamilton   | 820.4  | 18.6              | 3.2 |
| Never Say Never Again | 1983  | Sir Sean Connery | Irvin Kershner | 380.0  | 86.0              | NaN |
| Thunderball           | 1965  | Sir Sean Connery | Terence Young  | 848.1  | 41.9              | 4.7 |
| You Only Live Twice   | 1967  | Sir Sean Connery | Lewis Gilbert  | 514.2  | 59.9              | 4.4 |

## 칼럼 변경 (.rename 메서드와 .columns 프로퍼티)

이제 마지막입니다. 여기까지 오느라 고생하셨습니다. 그럼 마지막으로 칼럼의 한글화 패치를 알아보도록 하겠습니다.

```python
bond.rename(columns = {"Year": "개봉일", "Box Office": "매출"}, inplace=True)
bond.head(1)
```

일부 칼럼이 보기 좋게 편집되었습니다.

|     | 개봉일           | Actor | Director    | 매출      | Budget | Bond Actor Salary |
|------------------|-------|-------------|-----------|--------|-------------------|-----|
| Film             |       |             |           |        |                   |     |
| A View to a Kill | 1985  | Roger Moore | John Glen | 275.2  | 54.5              | 9.1 |

columns 프로퍼티를 사용할 경우 칼럼 이름의 통편집이 가능합니다. 언어가 고르지 못한점 미리 사과드립니다.

```python
bond.columns = ['개봉일', '배우', '감독', '개이득', '예산', '연봉?']
bond.head(1)
```

|  | 개봉일           | 배우 | 감독        | 개이득    | 예산  | 연봉? |
|------------------|------|-------------|-----------|-------|-------|-----|
| Film             |      |             |           |       |       |     |
| A View to a Kill | 1985 | Roger Moore | John Glen | 275.2 | 54.5  | 9.1 |

# 결론

지금까지 DataFrame 에서 행의 편집에 대해 알아보았습니다. 여러분이 이해하기 좋도록 예를 들어서 핵심만 정리하였습니다. 나머지 내용은 조금만 검색해도 충분히 이해할 수 있는 내용입니다. 구독해주셔서 감사합니다. 더욱 좋은 내용으로 찾아뵙도록 하겠습니다. 감사합니다.

이번 튜토리얼에 사용된 csv 파일입니다.

- [Download : jamesbond.csv](https://raw.githubusercontent.com/code-machina/DA-Pandas/master/jamesbond.csv)
