---
title:  "[프로그래머스 SQL] Lv 2. 입양 시각 구하기(1)"
layout: single

categories: "Algorithm_SQL"
tags: ["DATE_FORMAT", "COUNT", "GROUP BY", "BETWEEN", "ORDER BY", "별칭"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - GROUP BY 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>

ANIMAL_OUTS 테이블은 동물 보호소에서 입양 보낸 동물의 정보를 담은 테이블입니다. ANIMAL_OUTS 테이블 구조는 다음과 같으며, ANIMAL_ID, ANIMAL_TYPE, DATETIME, NAME, SEX_UPON_OUTCOME는 각각 동물의 아이디, 생물 종, 입양일, 이름, 성별 및 중성화 여부를 나타냅니다.

|NAME|	TYPE|	NULLABLE|
|:----|:---|:------------|
|ANIMAL_ID|	VARCHAR(N)|	FALSE|
|ANIMAL_TYPE	|VARCHAR(N)|	FALSE|
|DATETIME|	DATETIME|	FALSE|
|NAME|	VARCHAR(N)|	TRUE|
|SEX_UPON_OUTCOME|	VARCHAR(N)|	FALSE|

## 문제
보호소에서는 몇 시에 입양이 가장 활발하게 일어나는지 알아보려 합니다. 09:00부터 19:59까지, 각 시간대별로 입양이 몇 건이나 발생했는지 조회하는 SQL문을 작성해주세요. 이때 결과는 시간대 순으로 정렬해야 합니다. [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59412)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 입양 시간대를 기준으로 그룹화하기위해 DATE_FORMAT을 이용한다.
2. 특정 시간대를 가져오기 위해 BETWEEN을 사용한다.
3. 시간을 기준으로 그룹화 하고, COUNT 함수로 집계한다.
4. 데이터는 시간을 기준으로 정렬한다.
```

## (2) 코드 작성
```sql
SELECT DATE_FORMAT(DATETIME, "%H") AS HOUR, COUNT(*)
FROM ANIMAL_OUTS
WHERE DATE_FORMAT(DATETIME, "%H") BETWEEN 9 AND 19
GROUP BY HOUR
ORDER BY HOUR
```

## (3) 코드 리뷰 및 회고
- 시간을 기준으로 데이터를 조회하기 위해 ```연-월-일-시간```으로 구성된 ```DATETIME``` 컬럼을 ```DATE_FORMAT```을 이용해 시간만 가져왔다.
- ```BETWEEN A AND B``` 는 A 이상 B 이하를 의미한다는 것을 기억하고 있어야겠다.

<br>

# <span class="half_HL">🌞 실패 코드 공유</span>
```sql
SELECT DATE_FORMAT(DATETIME, "%H") AS HOUR, COUNT(*)
FROM ANIMAL_OUTS
WHERE HOUR BETWEEN 9 AND 19
GROUP BY HOUR
ORDER BY HOUR
```

<span style="color:#FF8787">>>> SQL 실행 중 오류가 발생하였습니다. Unknown column 'ID' in 'where clause'</span>

## 1. 실패 분석
### (1) 코드 실행 순서에 대한 이해도
위 코드로 실행했을 때, 컬럼에 ```HOUR```이라는 컬럼이 없다라는 오류 메시지가 출력되었다. ```SELECT``` 문에 ```DATE_FORMAT(DATETIME, "%H") AS HOUR``` 로 별칭을 지정해주었는데 컬럼이 발견되지 않는다는 메시지를 보고 코드가 실행되는 순서를 생각해보았다.

**🤔 고민의 과정...**<br>
(1) ```SELECT -> FROM -> WHERE ...``` 과 같이 작성된 코드의 실행 순서는 위에서부터 아래로 순차적으로 실행된다고 생각함<br>
(2) ```GROUP BY``` 등 여러 조건을 적용한 결과에 대해 출력될 컬럼을 지정(SELECT)하는 것이기 때문에 SELECT 문이 마지막에 실행될 것이라고 생각함<br>
(3) 하지만, ```SELECT``` 문에 부여한 별칭이 ```WHERE``` 문에선 사용되지 않았고, ```GROUP BY```, ```ORDER BY``` 에서는 사용이 된다는 점을 발견함<br>

<u>🚨 확실하다고 생각되는 점은 FROM으로 테이블을 불러오는 것이 가장 먼저 실행된다는 것이다.</u>

### (2) 예시로 실패 분석하기
- 사용한 데이터는 해당 코딩테스트 문제의 ```ANIMAL_OUTS``` 테이블을 사용했다.
- 조회하고자 하는 데이터는 동물의 a가 이름 중간에 포함되는 이름을 그룹화하고 5개만 가져오기

**🔍 SELECT, WHERE 실행순서**
```sql
SELECT NAME AS N
FROM ANIMAL_OUTS
WHERE N LIKE '%a%'
```

🚨 오류 메시지 출력 : <u>SQL 실행 중 오류가 발생하였습니다. Unknown column 'ID' in 'where clause'</u>

**🔍 SELECT, GROUP BY 실행순서**
```sql
SELECT NAME AS N, COUNT(*)
FROM ANIMAL_OUTS
GROUP BY N
LIMIT 5
```

|N|	COUNT(*)|
|:--|:---|
|Daisy|	1|
|Allie|	1|
|Spice|	1|
|Sugar|	1|
|Jewel|	1|


**👀 문제 해결 : 별칭 제대로 사용하기**
```sql
SELECT NAME AS N, COUNT(*)
FROM ANIMAL_OUTS
WHERE NAME LIKE '%a%'
GROUP BY N
LIMIT 5
```

## 2. 실패 회고
- ```SELECT``` 문에 특정 컬럼에 대해 별칭을 지정해줄 때, 그 별칭은 ```WHERE```문에서는 사용할 수 없다.
- ```GROUP BY```, ```ORDER BY``` 등에서는 별칭을 사용할 수 있다.

## 3. 실패 경험 정리
정리해 보면, ```FROM``` 문이 가장 먼저 실행되어 테이블을 불러오고 WHERE 조건식을 통해 필터링된 테이블이 정의된다. 이때, 정의된 테이블에 ```SELECT``` 문으로 별칭을 지정하면 별칭이 부여된 테이블을 ```GROUP BY```, ```ORDER BY``` 등을 통해 2차 필터링 또는 그룹화 등이 적용된다. 

위와 같은 순서때문에 ```WHERE``` 문에서 ```SELECT```에서 지정한 별칭을 사용할 수 없다고 결론을 내렸다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}