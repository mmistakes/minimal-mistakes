---
published: true
title: "[SQL] SubQuery, View"

categories: SQL
tag: [SQL, MySQL, SubQuery]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2024-01-01
---
SubQuery(서브쿼리)와 View(뷰) 대해 알아보자.

<br>
<br>

# SubQuery

서브쿼리 | SQL문 안에 포함된 SQL문. 쿼리 안에 쿼리가 중첩되어 있는 구조

바깥부분에 있는 쿼리를 **MainQuery**, 안에 있는 쿼리를 **SubQuery**라고 부름

**SubQuery**는 일반적으로 WHERE절에서 조건의 일환으로 사용된다.

ex) 신장이 가장 큰 선수의 정보 조회 -> 키가 가장 큰 사람을 찾아야하고, 그 사람의 이름을 찾아야함. 질문 2개

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

**1번** SQL문으로 키가 가장 큰 선수를 찾아낸 뒤에 그 값을 **2번** 쿼리의 WHERE에 집어넣어서 그 사람의 정보를 가져오는 것이다.

2번이 **MainQuery**가 되는 것.

```sql
SELECT PLAYER_NAME, POSITION, HEIGHT
FROM PLAYER
WHERE HEIGHT = (SELECT MAX(HEIGHT) FROM PLAYER)
```

<br>
<br>

## SubQuery의 종류

**쓰이는 위치에 따라**

- SELECT절에 사용하는 **Scalar SubQuery**

- FROM절에 사용하는 **Inline View**
  - FROM절에서 서브쿼리를 사용하면 VIEW와 유사하게 동작하지만 조금 다른 특징을 가진다해서 Inline View라고 부름

- WHERE절에 사용하는 **중첩SubQuery**

**결과 칼럼 / 행의 수에 따라**

- 단일 컬럼 서브쿼리 - SELECT 뒤에 컬럼이 한 개

- 다중 컬럼 서브쿼리 - SELECT 뒤에 컬럼이 여러개

- 단일 행 서브쿼리 - 결과로 나오는 행이 한 개

- 다중 행 서브쿼리 - 결과로 나오는 행이 여러개

결과의 수를 가지고 4가지 타입으로 구분을 할 수 있다.

단일 컬럼 서브쿼리 - 단일 행 서브쿼리

단일 컬럼 서브쿼리 - 다중 행 서브쿼리

다중 컬럼 서브쿼리 - 단일 행 서브쿼리

다중 컬럼 서브쿼리 - 다중 행 서브쿼리

**메인쿼리와의 연관성에 따라**

- 연관(상관) 서브쿼리 : 메인쿼리의 칼럼을 서브쿼리가 사용을 하게될 때

- 비연관 서브쿼리 : 메인쿼리의 칼럼을 서브쿼리에서 사용하지 않을 때. 연관이 안되어있을 때


서브쿼리는 메인쿼리의 칼럼 모두 사용 가능하지만 메인쿼리는 서브쿼리의 칼럼을 사용할 수 없다.

(Inline View에 정의된 칼럼만 사용 가능)

<br>
<br>

## 중첩 서브쿼리

- WHERE절에 사용하는 중첩 서브쿼리
- 성능의 문제와는 무관
  - 서브쿼리로 쿼리를 짜든 조인으로 풀어서 짜든 어떤 것이 유리한지 옵티마이저가 알아서 판단을 해서 실행해서 작성을 해주기 때문에 성능과는 무관함

<br>

## 결과 칼럼/행의 수에 따른 구분

|서브쿼리 종류|설명|
|:--:|:--|
|단일행|서브쿼리의 실행결과로 항상 1건 이하의 행을 반환, 단일행 비교 연산자(=, < , <= , >, >=, <>)와 함께 사용|
|다중행|서브쿼리의 실행결과로 여러 건의 행 반환 가능, 다중행 비교 연산자(IN, ALL, ANY, SOME, EXISTS)와 함께 사용|
|단일칼럼|서브쿼리의 실행결과로 하나의 칼럼을 반환|
|다중칼럼|서브쿼리의 실행 결과로 여러 칼럼을 반환, 서브쿼리와 메인쿼리의 비교 연산 수행 시, 비교하는 칼럼 개수와 위치가 동일해야 함|


### 단일행 서브쿼리

- 서브커리의 결과 건수가 반드시 1건 이하
- 단일행 비교 연산자(=, < , <= , >, >=, <>)와 함께 사용
  - 결과가 **2건 이상이면 Run Time Error** 발생
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

<br>

**Q)** EMP테이블의 사번이 7499인 직원의 입사일을 사번 7369인 직원의 입사일과 같게 변경하는 질의

**전)**

|-|ENPNO|ENAME|DATE|
|-|:--:|:--:|:--:|
|1|7369|Smith|0512|
|2|7499|Allen|0000|

**후)**

|-|ENPNO|ENAME|DATE|
|-|:--:|:--:|:--:|
|1|7369|Smith|0512|
|2|7499|Allen|0512|

```sql
UPDATE EMP SET DATE = (SELECT DATE FROM EMP WHERE EMPNO = 7369)
WHERE EMPNO = 7499;
```

### 다중행 서브쿼리

- 서브쿼리의 결과 건수가 2건 이상일 가능성이 있을 때
- 다중행 비교 연산자(IN, ALL, ANY, SOME, EXISTS)와 함께 사용
  - 2건 이상일 가능성은 있지만 결과 건수가 우연히 1개인 경우 -> 단일행 비교 연산자도 에러는 발생하지 않음

IN(subquery) | 임의의 결과 중 하나만 만족해도 참(Multiple OR 조건)
비교연산자 ALL(subquery) | 결과의 모든 값을 만족해야 하는 조건
비교연산자 ANY/SOME(subquery) | 결과의 어느 하나의 값이라도 만족하면 되는 조건 (ANY = SOME)
EXISTS(subquery) | 조건을 만족하는 값이 존재하는지 여부를 확인, 조건을 만족하는 건을 하나라도 찾으면 검색 중지(속도 빠름)

<br>

**IN 연산자**

```sql
SELECT PLAYER_NAME, HEIGHT, BACK_NO
FROM PLAYER
WHERE HEIGHT =
    (SELECT HEIGHT
    FROM PLAYER
    WHERE BACK_NO = 15);
```

등번호(BACK_NO)가 15인 사람의 결과행이 1개보다 많이 때문에 = 를 사용하면 에러가 발생. -> **IN**을 사용해야함.

```sql
SELECT PLAYER_NAME, HEIGHT, BACK_NO
FROM PLAYER
WHERE HEIGHT IN
    (SELECT HEIGHT
    FROM PLAYER
    WHERE BACK_NO = 15);
```

<br>

**ALL 연산자**

- 결과의 모든 값을 만족해야 하는 조건
    - ex) x > ALL(1, 2, 3, 4, 5) 라면 x > 5가 되어야함

```sql
SELECT PLAYER_NAME, HEIGHT, BACK_NO
FROM PLAYER
WHERE HEIGHT > ALL
    (SELECT HEIGHT
    FROM PLAYER
    WHERE BACK_NO = 15);
```

서브쿼리 결과 HEIGHT가 180, 176, 184. 이 3개의 값보다 키가 큰 선수의 정보를 출력하게 됨 ( > 184)

<br>

**ANY(=SOME) 연산자**

- 결과의 어느 하나의 값이라도 만족하면 되는 조건
  - ex) x > ANY(1, 2, 3, 4, 5) 라면 x > 1이면 됨

```sql
SELECT PLAYER_NAME, HEIGHT, BACK_NO
FROM PLAYER
WHERE HEIGHT >= ANY
    (SELECT HEIGHT
    FROM PLAYER
    WHERE BACK_NO = 15);
```

180, 176, 184 중 최소값만 만족해도 됨

<br>

**EXIST 연산자**

- 조건을 만족하는 값이 존재하는지 여부를 확인
- 조건이 만족되는 1건만 찾으면 더 이상 검색하지 않음 (속도가 빠름)
- 주로 참/거짓의 조건 판단용으로 사용됨

```sql
SELECT PLAYER_NAME, HEIGHT, BACK_NO
FROM PLAYER
WHERE EXISTS
    (SELECT 1
    FROM PLAYER
    WHERE BACK_NO = 15);
```

서브쿼리의 결과가 참 -> 모든 결과가 출력됨

<br>
<br>

### 연관 서브쿼리

- 메인쿼리의 칼럼이 서브쿼리에서 사용된 쿼리

```sql
SELECT ENAME, SAL, DEPTNO
FROM EMP M
WHERE SAL > (SELECT AVG(S.SAL)
            FROM EMP S
            WHERE M.DEPTNO = S.DEPTNO);
```

> 어떤 직원이 있을 때 그 직원이 속한 부서의 모든 직원의 급여 평균을 구한 뒤에, 평균보다 큰 급여인 사원의 이름, 급여, 부서번호를 출력

- 메인쿼리에서 EMP M 을 서브쿼리에 전달
- 서브쿼리에서 EMP M과 같은 부서인 EMP S의 평균 급여를 게산하여 메인쿼리에 전달
- 메인쿼리에서 EMP M의 급여와 서브쿼리에서 전달받은 급여를 비교

**연관 서브쿼리의 특징**

- 메인쿼리의 칼럼이 서브쿼리에서 사용된 쿼리
  - cf) 비연관 서브쿼리 : 서브쿼리에서 메인쿼리의 칼럼을 사용하지 않음
- 메인쿼리가 먼저 수행되고, 그 후에 서브쿼리가 수행됨
  - 테이블의 별칭(Alias)을 이용하여 메인쿼리에서 서브쿼리로 정보 전달
  - 서브쿼리가 메인쿼리의 값을 이용, 그 후에 서브쿼리의 결과를 메인쿼리가 이용
- 서브쿼리에서 메인쿼리의 칼럼과 서브쿼리의 칼럼 간 비교가 이루어짐
  - 메인쿼리에서는 서브쿼리의 칼럼 사용 불가

### 단일행 다중칼럼 서브쿼리

- 서브쿼리의 결과로 여러 칼럼, 단일행이 반환됨
  - ex) PLAYER_ID가 2007188인 선수와 키, 포지션이 같은 선수 조회
  
```sql
SELECT PLAYER_NAME, HEIGHT, POSITION, BACK_NO
FROM PLAYER
WHERE (HEIGHT, POSITION) =
    (SELECT HEIGHT, POSITION
    FROM PLAYER
    WHERE PLAYER_ID = '2007188');
```

### 다중행 다중칼럼 서브쿼리

- 서브쿼리의 결과로 여러 칼럼, 다중행이 반환됨

```sql
SELECT PLAYER_NAME, HEIGHT, POSITION
FROM PLAYER
WHERE (HEIGHT, POSITION) IN
    (SELECT HEIGHT, POSITION
    FROM PLAYER
    WHERE PLAYER_NAME = '김충호');
```

|-|PLAYER_NAME|HEIGHT|POSITION|
|-|:--|--:|:--|
|1|김충호|185|DF|
|2|김충호|185|GK|


**Q)** 부서별로 최고 급여를 받는 사원의 사원명, 부서번호, 급여를 출력하는 질의

```sql
SELECT ENAME, DEPTNO, SAL
FROM EMP
WHERE (DEPTNO, SAL) IN 
    (SELECT DEPTNO, MAX(SAL)
    FROM EMP
    GROUP BY DEPTNO);
```

|-|ENAME|DEPTNO|SAL|
|-|:--|--:|:--|
|1|Blake|30|2850|
|2|Scott|20|3000|
|3|King|10|5000|
|4|Ford|20|3000|


<br>
<br>

## Scalar SubQuery

스칼라 서브쿼리 | 하나의 값을 반환하는 서브쿼리

- 단일 행, 단일 칼럼
- 하나의 값을 반환한다는 점에서 함수(Function)의 특성을 가짐
- 공집합을 반환하는 경우 NULL이 대응됨

- 칼럼이 올 수 있는 대부분의 곳에서 사용가능
  - SELECT절, WHERE절, 함수의 인자, ORDER BY절, CASE절, HAVING절 등
  - 주로 SELECT절에서 사용함

```sql
SELECT EMPNO, ENAME,
        (SELECT DNAME FROM DEPT WHERE DEPTNO = A.DEPTNO) AS DNAME
FROM EMP A;
```

함수의 인자로도 사용 가능

```sql
SELECT EMPNO, ENAME, SUBSTR( (SELECT DNAME FROM DEPT WHERE DEPTNO = A.DEPTNO), 1, 3)
       AS DNAME
FROM EMP A;
```

<br>

## 뷰 (View)

- 테이블은 실제로 데이터를 갖고 있지만, 뷰는 실제 데이터를 갖지 않음
  - 뷰 정의(View Definition, SQL txt 파일)만 갖고 있음
  - 쿼리에서 뷰가 사용되면 DBMS 내부적으로 질의를 재작성(Rewrite)
- 실제 데이터를 가지고 있지 않지만 **테이블의 역할 수행**
  - 가상 테이블(Virtual Table)이라고도 함
- CREATE VIEW문을 통해 VIEW 생성 - TABLE을 만드는 것과 유사함
  ```sql
  CREATE VIEW V_PLAYER_TEAM AS
  SELECT P.PLAYER_NAME, P.BACK_NO, P.TEAM_ID, T.TEAM_NAME
  FROM PLAYER P INNER JOIN TEAM T
  ON P.TEAM_ID = T.TEAM_ID;
  ```
- VIEW의 확인
  ```sql
  SELECT *
  FROM V_PLAYER_TEAM
  ```
- VIEW의 제거
  ```sql
  DROP VIEW V_PLAYER_TEAM
  ```
- 생성된 뷰는 테이블과 동일한 형태로 사용 가능
- 파싱 시점에 DBMS가 내주벚긍로 뷰에 해당하는 DDL을 SQL문으로 재작성해줌
  ```sql
  SELECT PLAYER_NAME, BACK_NO, TEAM_ID, TEAM_NAME
  FROM V_PLAYER_TEAM
  WHERE PLAYER_NAME LIKE '이%';
  ```
  ```sql
  SELECT PLAYER_NAME, BACK_NO, TEAM_ID, TEAM_NAME
  FROM (SELECT P.PLAYER_NAME, P.BACK_NO, P.TEAM_ID, T.TEAM_NAME
        FROM PLAYER P INNER JOIN TEAM T
        ON P.TEAM_ID = T.TEAM_ID)
  WHERE PLAYER_NAME LIKE '이%';
  ```

<br>

### 계층적 뷰 생성

뷰로 부터 또 다른 뷰를 생성할 수 있음

**Q)** 사원과 부서 테이블로부터 사원번호, 사원명, 부서번호, 부서명을 추출한 뷰 V_EMP_DEPT를 작성하고
   이 뷰로부터 사원명과 부서명 만을 다시 추출한 V_EMP_DEPT2를 작성

("사원과 부서 테이블로부터" -> `JOIN`)

```sql
CREATE VIEW V_EMP_DEPT AS
SELECT ENAME, EMPNO, DEPTNO, DNAME
FROM EMP JOIN DEPT
USING (DEPTNO);
```

```sql
CREATE VIEW V_EMP_DEPT2 AS
SELECT ENAME, DNAME
FROM V_EMP_DEPT;
```

<br>

### 뷰의 장점

|장점|설명|
|:--:|:--|
|독립성|테이블 구조가 변경시, 뷰만 변경되고 뷰를 사용하는 응용 프로그램은 변경될 필요가 없음|
|편리성|복잡한 질의를 뷰로 생성하여 질의의 가독성을 높임|
|보안성|민감한 정보(급여정보 등)를 제외하고 뷰를 생성하여, 사용자로부터 정보를 보호할 수 있음|

<br>
<br>

## Inline View

- FROM 절에서 사용되는 서브쿼리
- 실행 순간에만 임시적으로 생성되며 DB에 저장되지 않음
  - 인라인 뷰(Inline View) = 동적 뷰(Dynamic View) / 쿼리가 끝나면 날라감
  - 일반 뷰 = 정적 뷰(Static View) / 저장이 됨
- Inline View의 SELECT 문에서 정의된 칼럼만 메인쿼리에서 사용 가능
  - cf) 일반적으로 서브쿼리에서 정의된 칼럼은 메인쿼리에서 사용 불가능함

```sql
SELECT EMPNO
FROM (SELECT EMPNO, ENAME FROM EMP ORDER BY MGR);
```

**Q)** 급여가 2,000 초과인 직원들에 대해 직원번호, 직원명, 급여, 부서명을 출력하고자 한다.
다음의 질의에서 오류를 수정하시오.

```sql
SELECT E.EMPNO, E.ENAME, E.SAM, D.DNAME
FROM (SELECT EMPNO, ENAME, SAL FROM EMP WHERE SAL > 2000) E, DEPT D
WHERE E.DEPTNO = D.DEPTNO;
```

**A)**

```sql
SELECT E.EMPNO, E.ENAME, E.SAM, D.DNAME
FROM (SELECT EMPNO, ENAME, SAL, DEPTNO FROM EMP WHERE SAL > 2000) E, DEPT D
WHERE E.DEPTNO = D.DEPTNO;
```