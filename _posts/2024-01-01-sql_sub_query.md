---
published: true
title: "[SQL] SubQuery"

categories: SQL
tag: [SQL, MySQL, SubQuery]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2024-01-01
---
SubQuery(서브쿼리)에 대해 알아보자.

<br>
<br>

# SubQuery

서브쿼리 | SQL문 안에 포함된 SQL문. 쿼리 안에 쿼리가 중첩되어 있는 구조

바깥부분에 있는 쿼리를 main query, 안에 있는 쿼리를 sub query라고 부름

SubQuery는 일반적으로 WHERE절에서 조건의 일환으로 사용된다.


## SubQuery의 종류

쓰이는 위치에 따라서 3가지 종류로 나뉨

- SELECT절에 사용하는 Scalar SubQuery

- FROM절에 사용하는 Inline View
  - FROM절에서 서브쿼리를 사용하면 VIEW와 유사하게 동작하지만 조금 다른 특징을 가진다해서 Inline View라고 부름

- WHERE절에 사용하는 중첩 서브쿼리

결과 칼럼 / 행의 수에 따라

- 단일 컬럼 서브쿼리 - SELECT 뒤에 컬럼이 한 개

- 다중 컬럼 서브쿼리 - SELECT 뒤에 컬럼이 여러개

- 단일 행 서브쿼리 - 결과로 나오는 행이 한 개

- 다중 행 서브쿼리 - 결과로 나오는 행이 여러개

결과의 수를 가지고 4가지 타입으로 구분을 할 수 있다.

단일 컬럼 서브쿼리 - 단일 행 서브쿼리

단일 컬럼 서브쿼리 - 다중 행 서브쿼리

다중 컬럼 서브쿼리 - 단일 행 서브쿼리

다중 컬럼 서브쿼리 - 다중 행 서브쿼리

메인쿼리와의 연관성에 따라

- 연관(상관)서브쿼리 : 메인쿼리의 칼럼을 서브쿼리가 사용을 하게될 때

- 연관이 안되어있으면 비연관 서브쿼리 : 메인쿼리의 칼럼을 서브쿼리에서 사용하지 않을 때

-------------------------------------------------

서브쿼리는 메인쿼리의 칼럼 모두 사용 가능하지만 메인쿼리는 서브쿼리의 칼럼을 사용할 수 없다.

(Inline View에 정의된 칼럼만 사용 가능)

**결과 칼럼/행의 수에 따른 구분**

|서브쿼리 종류|설명|
|:--:|:--|
|단일행|서브쿼리의 실행결과로 항상 1건 이하의 행을 반환, 단일행 비교 연산자(=, < , <= , >, >=, <>)와 함께 사용|
|다중행|서브쿼리의 실행결과로 여러 건의 행 반환 가능, 다중행 비교 연산자(IN, ALL, ANY, SOME, EXISTS)와 함께 사용|
|단일칼럼|서브쿼리의 실행결과로 하나의 칼럼을 반환|
|다중칼럼|서브쿼리의 실행 결과로 여러 칼럼을 반환, 서브쿼리와 메인쿼리의 비교 연산 수행 시, 비교하는 칼럼 개수와 위치가 동일해야 함|

**단일행 서브쿼리**

- 서브커리의 결과 건수가 반드시 1건 이하
- 단일행 비교 연산자(=, < , <= , >, >=, <>)와 함께 사용
    - 결과가 2건 이상이면 Run Time Error 발생
    - 서브쿼리의 결과가 예를 들어 3건이 나왔는데 단일행 비교연산자이면 Run Time Error가 발생하는 것임

ex) '2007182'번 선수와 같은 팀에 속하는 선수의 이름, 포지션, 팀ID 출력
    - 선수의 팀을 찾는 것이 서브쿼리가 되고, 그 팀에 속하는 선수의 정보를 출력하는 것이 메인쿼리가 됨

```sql
SELECT TEAM_ID
FROM PLAYER
WHERE PLAYER_ID = '2007182';
```
위 쿼리의 결과는 1개가 나올 것이니까 위 쿼리가 서브쿼리로 사용되면 그 때는 단일행 비교연산자를 사용해도 된다!

```sql
SELECT PLAYER_NAME, POSITION, TEAM_ID
FROM PLAYER
WHERE TEAM_ID = 
        (SELECT TEAM_ID
        FROM PLAYER
        WHERE PLAYER_ID = '2007182');
```

Q) 사번이 7499인 직원의 입사일을 사번 7369인 직원의 입사일과 같게 변경하는 질의를 완성하시오.

전)

|--|ENPNO|ENAME|DATE|
||:--:|:--:|:--:|
|1|7369|Smith|0512|
|2|7499|Allen|0000|

후)
|--|ENPNO|ENAME|DATE|
||:--:|:--:|:--:|
|1|7369|Smith|0512|
|2|7499|Allen|0512|





ex) 신장이 가장 큰 선수의 정보 조회 - 키가 가장 큰 사람을 찾아야하고, 그 사람의 이름을 찾아야함. 질문 2개

```sql
1.
SELECT MAX(HEIGHT)
FROM PLAYER;
```

```sql
2.
SELECT PLAYER_NAME, POSITION, HEIGHT
FROM PLAYER
WHERE HEIGHT = 194;
```

1번 SQL문으로 키가 가장 큰 선수를 찾아낸 뒤에 그 값을 2번 쿼리의 WHERE에 집어넣어서 그 사람의 정보를 가져오는 것이다.

2번이 Main Query가 되는 것이다.

```sql
SELECT PLAYER_NAME, POSITION, HEIGHT
FROM PLAYER
WHERE HEIGHT = (SELECT MAX(HEIGHT) FROM PLAYER)
```


# 중첩 서브쿼리

성능의 문제와는 무관

서브쿼리로 쿼리를 짜든 조인으로 풀어서 짜든 어떤 것이 유리한지 옵티마이저가 알아서 판단을 해서 실행해서 작성을 해주기 때문에 성능과는 무관함

