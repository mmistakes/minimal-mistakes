---
title: "마크다운예시"
---
https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one

**가나다라마바사**
**가나다라마바사**

- [Section](#section)
  - [Section1.1](#section11)
    - [Section1.1.1](#section111)
- [Section2](#section2)


# Section
## Section1.1
### Section1.1.1
---
# Section2


- one
  - dd
    - ddd
      - ddd
        - ddd
        - 


| ddd  |  ddd  |  ddd |
| :--- | :---: | ---: |
| 1    |   2   |    3 |
| 1    |   2   |    3 |
| 1    |   2   |    3 |
| 1    |   2   |    3 |
| 1    |   2   |    3 |
| 1    |   2   |    3 |
| 1    |   2   |    3 |
| 1    |   2   |    3 |


이모지
https://emojipedia.org/smileys#smiling-affectionate

🚀
🔥
😵
😄





<details>
<summary>결과보기</summary>

```
코드블록

```


Window Function 은 쿼리 행 집합에 대해 집계나 정렬과유사한 연산을 지원하는 함수입니다. 그러나 집계 연산이 쿼리 행을 단일 결과 행으로 그룹화하는 반면, 윈도우 함수는 각 쿼리 행에 대한 결과를 생성합니다. 

기본적인 쓰임은 OVER 구문을 같이 사용하는 것입니다. 아래와 같습니다.

<br/>

```
집계합수(컬럼) OVER()
집계합수(컬럼) OVER(PARTITION BY 기준컬럼)
집계합수(컬럼) OVER(PARTITION BY 기준컬럼 ORDER BY 정렬컬럼 ASC|DESC)
```


윈도우 함수에 쓸수 있는 집계함수는 아래와 같습니다.

먼저 집계함수에 적용되는 함수입니다.
```
AVG()
BIT_AND()
BIT_OR()
BIT_XOR()
COUNT()
JSON_ARRAYAGG()
JSON_OBJECTAGG()
MAX()
MIN()
STDDEV_POP(), STDDEV(), STD()
STDDEV_SAMP()
SUM()
VAR_POP(), VARIANCE()
VAR_SAMP()
```

MySQL은 또한 윈도우 함수로만 사용되는 비집계 함수도 지원합니다.
```
CUME_DIST()
DENSE_RANK()
FIRST_VALUE()
LAG()
LAST_VALUE()
LEAD()
NTH_VALUE()
NTILE()
PERCENT_RANK()
RANK()
ROW_NUMBER()
```


</details>




{% assign posts = site.categories.blog %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}