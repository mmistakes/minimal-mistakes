---
title:  "[Oracle DB] 기본 정리- 뉴렉쳐"

categories:
  - oracleDB
tags:
  - [RDBMS, OracleDB,newLecture]

toc: true
toc_sticky: true

date: 2021-09-06
last_modified_at: 2021-09-06

---

# Oracle DB 기본 정리
이 포스트는 뉴렉쳐의 Oracle Database 수업을 참조하였습니다.
개인적으로 공부하면서 참조하려고 만든 포스트입니다.
<br>

[뉴렉쳐 Oracle DB 바로가기](https://www.youtube.com/playlist?list=PLq8wAnVUcTFVq7RD1kuUwkdWabxvDGzfu)



## 관계 연산자
![image](https://user-images.githubusercontent.com/69495129/132188946-d1f998e0-99d5-4bbd-8af4-70e815e7b5b4.png)
![image](https://user-images.githubusercontent.com/69495129/132189113-fd042194-1aa0-4a34-b7f9-d590a640d278.png)

## 패턴 비교 연산자
![image](https://user-images.githubusercontent.com/69495129/132189466-410f4e59-0f0f-45b1-bfc6-e7272759e8e8.png)
<br>
위에 LIKE로 비교해야지 = 으로 비교하면안된다 = 으로 비교하면 진짜 그 '' 안에 들어가있는 값을 찾아버린다.
<br>
![image](https://user-images.githubusercontent.com/69495129/132189700-22844ad0-f6d2-49e1-983a-e6d1dd113be8.png)

## 정규식을 이용한 패턴 연산

정규식은 치트시트를 많이 활용하는 것이좋다. 기술은 발전하고 우리의 뇌 용량은 발전하지 않으므로, 우리의 뇌 용량을 정규식을 외우는데 사용하지 않는 것이 효율적이다. 
발전하는것보다는 발전하지 않는것을 더 가치 있게 여겨야 하기 때문.
<br>

[Cheat Sheet](https://regexlib.com/cheatsheet.aspx?AspxAutoDetectCookieSupport=1)
[regex tester](https://regexlib.com/RETester.aspx)
<br>
![image](https://user-images.githubusercontent.com/69495129/132191060-7d3b7fb6-e738-413d-8761-4f0c95db334b.png)

전화번호가 포함된 패턴을 가진 열을 TITLE Column 에서 찾겠다라고 하면 쉽게 찾아낼 수 있다. 전화번호 형식을 가진 것을 title에서 찾는법.
``` sql
SELECT * FROM NOTICE WHERE REGEXP_LIKE(TITLE, '01[016-9]-\d{3,4}-\d{4}');
```
 
 
## 문자열 비교 정규식
오토마타 형식언어론에서의 정규식과 비슷하다.

이메일 형식을 판별할 수 있는 정규식을 찾아라

``` sql
SELECT * FROM NOTICE WHERE REGEXP_LIKE(TITLE, '\D\w*@\D\w*.(org|net|com)');
```
### 위 정규식 해석
- \D : 숫자가 아닌 알파벳 (^0-9)
- \w* : 아무거나 올 수 있다 숫자든, 알파벳이든 아무것도 오지않아도 된다. 
- @ : @
- . : .
- org|net|com : org 이나 net 이나 com 이나 셋 중 하나 or 연산 


### ROUNUM 행 제한
![image](https://user-images.githubusercontent.com/69495129/132193547-eab9f45a-cb14-4aed-b50e-6371ba79fe67.png)
그렇다면 6부터 10 까지 가져오고 싶으면 
``` sql
SELECT * FROM MEMBER WHERE ROWNUM BETWEEN 6 AND 10
```
<br>
위와 같은 코드를 작성하면 될까? Answer => 안된다.
왜냐하면 ROWNUM 1이 가져와지고 이것이 위 조건에 안맞기때문에 홍길동은 제외된다. 그 후 유재석이 ROWNUM 1이 되고 다시 조건이 안맞기때문에 없어지고 강호동이 ROWNUM 1이되고.. 계속 반복 된다 그러므로 
ROWNUM 6 까지 갈 수 조차 없다는것이다. 그렇다면 어떻게 해결해야할것인가? 이 이유는 ROWNUM 이 결과집합이 만들어질때 만들어지는 수 이기 때문이다.
이것이 아니라 원래 일련번호를 가지고 있었다면 될 것이다. 즉 미리 만들어놓으면 된다
<br>
<br>
![image](https://user-images.githubusercontent.com/69495129/132194143-dc729df8-5e79-44dc-9de4-466d8322e63c.png)
<br>


``` sql
SELECT * FROM (SELECT ROWNUM NUM, NOTICE.* FROM NOTICE)
WHERE NUM BETWEEN 6 AND 10;
```

위처럼 하면 미리 안쪽 SELECT 구문안에서 생성된 NUM 을 가지고 작업하기 떄문에 6~10까지인 행을 정확히 뽑아낼 수 있다.


## 중간 요약정리

![image](https://user-images.githubusercontent.com/69495129/132195701-07eb4196-235b-423a-baed-6d4f07cc6c3c.png)


## 함수
여러가지 함수가 있다. 문자열 함수가 가장 많이 사용된다.

![image](https://user-images.githubusercontent.com/69495129/132196122-7255c403-1a97-4a30-8847-534ed05c600e.png)

## 문자열 함수

``` sql
    SELECT SUBSTR('HELLO',2) FROM MEMBER; -- 처음부터 2개만큼 짤라주세요 
    SELECT SUBSTR('HELLO',1,3) FROM MEMBER; --1번 인덱스부터 3개잘라주세요
    SELECT SUBSTRB('HELLO',3) FROM DUAL; -- 바이트 단위
```
![image](https://user-images.githubusercontent.com/69495129/132197023-3b5a1496-e9a2-4119-bb6c-5fa20ebfd41c.png)
내가 행을 필터링해야하는지, 열을 필터링해야하는지 잘 알아야한다.
조건절에 함수를 사용하는것보다 패턴절을 사용하는게 연산에 더 효율적이다.

**회원 중에서 생년 월이 7,8,9월인 회원의 모든 정보를 출력하시오**
``` sql
SELECT * FROM MEMBER WHERE SUBSTR(BIRTHDAY,6,2) IN ('07','08','09');
```
<br>

**전화번호를 등록하지 않은 회원 중에서 생년 월이 7,8,9월인 회원의 모든 정보를 출력하시오**
``` sql
SELECT * FROM MEMBER WHERE PHONE IS NULL AND SUBSTR(BIRTHDAY,6,2) IN ('07','08','09');
```

![image](https://user-images.githubusercontent.com/69495129/132197929-4f8d0763-3c84-4e82-8244-e7d94bd5b81a.png)
위에서 + 는 숫자를 연산할때 사용하고 문자를 더할때에는 || 기호를 사용한다 물론 CONCAT 도 있지만 함수보다는 연산자가 더 퍼포먼스에 좋기 때문에 연산자 || 를 사용하여 문자열을 더 하는 쪽을 택하는것이 좋을 것 같다.

<br>

![image](https://user-images.githubusercontent.com/69495129/132198362-08c074da-8a5a-4c6b-9bae-83609a41b3be.png)
![image](https://user-images.githubusercontent.com/69495129/132198326-1138a728-fb5d-49ee-a012-bd0b1e7b8c5e.png)
소대문자를 안가리고 검색하고 싶을때 유용하다

<br>

![image](https://user-images.githubusercontent.com/69495129/132198500-ebe5d35e-e1f9-4289-b9b1-f3744bbcc22d.png)
위의 REPLACE 는 'WE' 가 통째로 'YOU'로 대체 된다. 하지만 밑의 TRANSLATE같은 경우에는 'W' => 'Y' 'E' => 'O' void => 'U' 이렇게 하나하나 Character 기준으로 대치가 된다. 위의 TRANSLATE SQL문을 실행한 결과는 **YHORO YO ARO** 이 될 것이다.

![image](https://user-images.githubusercontent.com/69495129/132198829-b2f65642-67c0-496f-8db6-a912e90f5e48.png)


![image](https://user-images.githubusercontent.com/69495129/132199496-10c0b5d6-2653-4400-9f58-193473bebc05.png)

위의 문제에 대한 답이다.
``` sql
  SELECT RPAD(NAME,3,'_') FROM MEMBER -- 이렇게 하면 안된다 영문일때 가능
  SELECT RPAD(NAME,6,'_') FROM MEMBER -- 한글일땐 이처럼 *2 를 해줘야하는것을 주의하자.
```

![image](https://user-images.githubusercontent.com/69495129/132200721-a45de332-6488-4622-a7e5-d533b46cbe4d.png)

위 문제에서 가운데 번호를 뽑으라고 하였다 그 번호는 4자리이거나 3자리이거나 가변적이므로 그 부분도 함수로 처리해주어야한다.
``` sql
SELECT SUBSTR(PHONE,5,INSTR(PHONE,'-',1,2) - INSTR(PHONE,'-',1,1)-1) FROM MEMBER;
```

![image](https://user-images.githubusercontent.com/69495129/132200941-501d7091-c418-4967-81c4-90b19b0f9fc1.png)


## 숫자 함수
<br>

![image](https://user-images.githubusercontent.com/69495129/132203490-9e780710-d7b9-49b2-97f8-638140ba21ee.png)

<br>
![image](https://user-images.githubusercontent.com/69495129/132203594-0618fe73-c7e2-44d9-a4ad-ae8829d3e0e0.png)


## 날짜 함수

![image](https://user-images.githubusercontent.com/69495129/132203914-1974e189-2c05-4c80-8363-af11b170de43.png)

![image](https://user-images.githubusercontent.com/69495129/132204419-038a39b5-4bdd-4cd9-922e-be52433fbfff.png)
<br>
위의 문제에 대한 솔루션이다

``` sql
SELECT * FROM MEMBER WHERE EXTRACT(MONTH FROM REGDATE) IN (2,3,11,12);
```

**Member table에서 REGDATE라는 Column에서 Month 만 추출해주고 그것이 만약 2,3,11,12 중 하나라면 그 Row에 대한 정보를 모두 가져와줘**

<br>

![image](https://user-images.githubusercontent.com/69495129/132205134-e6a754c4-63c8-47ce-a85f-77d161f31b4b.png)

NEXT_DAY 에서는 현재날짜를 기준으로 다음요일을 구해준다. 토요일이라고써도되고 토 라고 써도되고 2번째 인자의 7은 토요일을 뜻한다.
일요일이 1이고 월요일이 2이다........토요일은 7이 자명하다

월의 마지막 일자를 알려주는 함수도 사용하면 그 월의 마지막 일자를 알려준다
 
 

![image](https://user-images.githubusercontent.com/69495129/132209810-9037a500-37f1-45f5-ab37-d0c4a815431c.png)
단위별로 잘라서 표현할 수 있다. (CC는 세기 단위이다 100년단위로 반올림이 된다) 년도 , 분기 , 세기 , 주 .. 등등 어느 부분에서 **잘라내고(TRUNC)** 어느부분에서 **반올림(ROUND)**할지 선택할 수 있다.

## 변환 함수
***
![image](https://user-images.githubusercontent.com/69495129/132210181-f05fd0a4-bc7c-42bb-89d8-0c8a78ddaeaa.png)

<br>
![image](https://user-images.githubusercontent.com/69495129/132210276-e5466007-dab3-42b2-8e70-727d2b429757.png)

<br>
![image](https://user-images.githubusercontent.com/69495129/132210650-af93e256-8150-4b47-9acb-b3f9a5356073.png)
날짜도 어차피 숫자이고 그것을 어떠한 식으로 뽑아낼지 지정할 수 있다. 
모든 옵션을 외울필요는 없다. 
날짜를 문자로 바꿔보자.

``` sql
SELECT TO_CHAR(SYSDATE, 'YY/MM/DD HH24:MI') FROM DUAL;
SELECT TO_DATE('2014-03-31 12:23:03','YYYY-MM-DD HH:MI:SS') FROM DUAL;
```
단 '' 내부에는 포맷문자만 사용가능하다.
오류가 나면 포맷까지 설명을 해줘야한다. 시 분 초 까지 설정하고 싶다하면 포맷을 컴퓨터에게 설명해줘야한다.

``` sql
SELECT NVL(AGE,0) FROM MEMBER;
```
MEMBER 로 부터 AGE 를꺼내는데 만약 그 값이 NULL 이라면 그걸 0으로 대체해서 가져와준다. **NVL** 은 엄청 쓸만한 함수이므로 잘 알아두자.
 
<br>

``` sql
SELECT TRUNC(NVL(AGE,0)/10)*10 FROM MEMBER;
SELECT NVL2(AGE,TRUNC(AGE/10)*10,0) FROM MEMBER;
```

위의 쿼리문은 모든 ROW가 연산을 하지만 아래 NVL2를 사용했을땐 NVL2(AGE,AGE가Null이아닐때실행할것,AGE가Null일때 실행할것) 
으로 나눠서 연산을 수행하기때문에 밑의 쿼리문이 더 퍼포먼스 측면에서 좋다.

<br>
![image](https://user-images.githubusercontent.com/69495129/132211855-2c6dbf45-04de-4584-b799-9b4fbbc86933.png)
<br>


![image](https://user-images.githubusercontent.com/69495129/132211978-3d06968b-ff54-41f9-997d-1048f4d68208.png)

<br>
<br>
**DECODE 사용법**
<br>
![image](https://user-images.githubusercontent.com/69495129/132212121-3a919e32-ff93-48da-b93b-7239f9a9805d.png)

## 집계함수 ORDER BY , GROUP BY
순서가 중요하다! **암기 필수**
![image](https://user-images.githubusercontent.com/69495129/132212364-bec4aa2a-04fa-4a1c-b5de-404e025b6a21.png)
![image](https://user-images.githubusercontent.com/69495129/132212430-4bafb8a2-c878-4cf4-97cb-c1e1066a52ba.png)

FROM 에서 격자형 데이터를 준비하고 WHERE 에서 필터링 하고 GROUP BY에서 그것을 집계하고 그 후에 정렬 할 수 있다.

### ORDER BY
![image](https://user-images.githubusercontent.com/69495129/132212615-20c7fdae-bd7a-44c1-83a0-971f933a41c1.png)

### 집계 함수
레코드 수를 알고 싶을때 사용하는 방법 COUNT
- 절대 NULL이 되지 않는 Column을 세는법
- 모든 Column 을 대상으로조회 (퍼포먼스가 떨어짐)

작성자 별로 쓴 글의 개수를 보고 싶다.
그리고, 그 글의 개수가 큰것부터 정렬해서 꺼내오고 싶다.
``` sql
SELECT WRITER_ID, COUNT(ID) FROM NOTICE GROUP BY WRITER_ID;
SELECT WRITER_ID, COUNT(ID) COUNT FROM NOTICE GROUP BY WRITER_ID
ORDER BY COUNT DESC;
```

실행순서 FROM => CONNECT BY => WHERE => GROUP BY => HAVING => SELECT => ORDER BY
그러므로 SELECT 에서 지은 별칭을 HAVING 절에서 사용할 수는 없다.
하지만 위 예제처럼 SELECT 절에서 지은 별칭 COUNT 는 ORDER BY 절에서 사용 가능하다.

### HAVING 

<br>
회원별 게시글 수를 조회하시오. 단 게시글이 **2이하인** 레코드만 출력하시오
``` sql
SELECT WRITER_ID,COUNT(N.ID) FROM NOTICE N
WHERE COUNT(N.ID) < 2
GROUP BY WRITER_ID;
```
위 코드는 Error 가 나온다 그룹 함수는 허가되지 않습니다.
FROM,WHERE,GROUP BY,HAVING,ORDER BY ,SELECT 
<br>
``` sql
SELECT WRITER_ID,COUNT(N.ID) FROM NOTICE N
GROUP BY WRITER_ID;
HAVING COUNT(N.ID) < 2
```
WHERE 절에서는 사용 불가능하지만, WHERE 대신 HAVING 으로 바꿔야한다 (GROUP BY 절에서는)

<br>
### ROW_NUMBER(), RANK(),DENSE_RANK()
![image](https://user-images.githubusercontent.com/69495129/132215296-50ae43a4-cf05-45ae-8439-467384b80a1c.png)
정렬된상태로 일련번호를 붙히고 싶을때 사용하면된다.
등수를 메기고 싶을때는 RANK()를 사용하면된다.

## 서브쿼리
구절에 순서를 갖고있는데 구절의 순서를 바꿔야할 경우에 서브쿼리를 사용한다
<br>
![image](https://user-images.githubusercontent.com/69495129/132215851-72094422-80a2-4b0a-a435-646a4f15cfe9.png)
<br>

FROM 절에는 반드시 Table 만 와야하는 것이아니라, 격자형 데이터면 사용가능하다. 소괄호는 서브쿼리를 나타내는 중요한 키워드이다.
소괄호는 먼저 계산하겠습니다. 소괄호를 계산하면 격자형 데이터집합이 만들어지고 그것을 FROM 절으로 사용가능하다.

<br>
![image](https://user-images.githubusercontent.com/69495129/132216128-18229035-920e-4a8f-b155-6398854eabc8.png)
<br>
평균나이를 구한뒤 그것을 이용해서 원하는 결과를 도출해낸다. 현재 회원이 갖고있는 평균나이를 구하고 그 후에 작업시행
먼저 어떤 작업을해서 그결과를 남기고 그 결과를 이용해서 다른쿼리를 실행하려면 **서브쿼리** 를 떠올리자.

## JOIN 조인
### INNER 조인(JOIN)
여러개의 참조하고있는 테이블을 합치는 작업.
저장할때 중복되는것을 제거하고 저장하기 때문에. 퍼포먼스 적으로 하나의테이블로 관리하는것보다 좋다.
IO작업을 줄이는게 전체적인 성능을 줄일때 많이 영향을 미친다.

``` sql
SELECT * FROM MEMBER INNER JOIN NOTICE ON MEMBER.ID = NOTICE.WRITER_ID;
```
JOIN 할때는 ON 이라는것이 뒤따르면서 어떠한 컬럼과 어떠한 컬럼이 관계가 있다라는 점을 명확히 명시해줘야한다.

<br>
![image](https://user-images.githubusercontent.com/69495129/132218415-864e34af-d360-42de-b3ee-6cd5e9258751.png)
양쪽 outer 를 제거한 상태에서 INNER JOIN 을했을때 총 레코드의 개수 3개입니다. 
이것은 표준방식으로 JOIN 한 것이다.

### OUTER JOIN
<br>
두개 테이블을 조인할때 서로 관계가 없는 레코드는 OUTER 라고 한다 왼쪽테이블에는 OUTER가 3개 오른쪽에는 2개가 있다. 
<br>
![image](https://user-images.githubusercontent.com/69495129/132218729-ff1d45fd-fc5f-4688-a0c5-472d49fad001.png)
<br>
LEFT JOIN 을 하면 왼쪽의 OUTER는 포함한다 그 후 합친다. 그 후 오른쪽에는 NULL 을 채워준다 (왼쪽 OUTER와 맞추기위해서)
<br>
![image](https://user-images.githubusercontent.com/69495129/132218883-0ffc2860-ba60-447a-b6e6-7de10e7935c6.png)
<br>
![image](https://user-images.githubusercontent.com/69495129/132219106-03ad26a0-e715-4629-92bb-81947f4588c3.png)
<br>
3 + 2 총 5개의 레코드가 만들어 질 것이다. 오른쪽의 Outer 가 남는다.
<br>
![image](https://user-images.githubusercontent.com/69495129/132219158-4b406973-f623-439a-a4e6-36bd1a84c8fe.png)
<br>
![image](https://user-images.githubusercontent.com/69495129/132219201-32459e0d-b021-4902-b26e-fe259265693c.png)
<br>
3+3+2 = 8 => 8개의 레코드가 만들어 지게 된다.
거의 무조건 OUTER JOIN 을 많이 사용한다 ( INNER JOIN 보다 ) 
업무를 다루다보면 거의 한가지 테이블을 주인공으로 하고 그 테이블을 기준으로 OUTER JOIN 을 많이 한다.

### SELF JOIN
자기가 자기와 합쳐진다. 테이블 하나가 두개인것처럼 자기와 자기가 합쳐지는것이다.
확장하고 싶은 Coulmn이 있는데 그 Column 이 다른 Table 에 있는것이아니라. 바로 자기 자신 테이블에 있는 경우.

<br>
![image](https://user-images.githubusercontent.com/69495129/132220753-28836a2b-2048-4866-a371-acb66268f837.png)
<br>
왼쪽은 사원 오른쪽을 보스라는 개념으로 사용한다 보스의 아이디를 맴버가 가지고있는 보스의 아이디와 비교하여 보스의 정보를 가져온다.
SELECT 맴버의 모든 테이블을 가져오고 + B.NAME을 가져온다.
SELF JOIN 은 잘 사용된다. 댓글이 댓글을 참조하는 경우, 혹은 카테고리가 카테고리를 참조하는경우 많이 사용된다.

### 오라클 OLD JOIN

![image](https://user-images.githubusercontent.com/69495129/132225316-bebba4c4-f685-48be-8cfc-4e721d83e99c.png)
오라클은 ANSI 와 달리 WHERE절에서 ON 처럼 처리한다.

![image](https://user-images.githubusercontent.com/69495129/132225526-04c4ed97-33cc-4d5c-9f15-af9d993a3251.png)
오라클에서의 Outer JOIN 이것은 ANSI 방식을따라가는것이 편할 것 같다. ORACLE OUTER JOIN 은 좀 모호한 부분이 있는것 같다.

혹시라도 오라클 문법을 쓴 과거의 문장을 볼 수 있기 떄문에 이런것이 있다 정도로만 알고 있으면 될 것 같다.

## UNION 
컬럼이 늘어나는것이 아닌, 레코드를 합치는 작업. 관련이 없어도 된다. 컬럼의 갯수와 컬럼의 자료형만 맞춰주면 합칠 수 있다.
게시판이 3종류가 있고 그 3종류가 별도의 테이블이라면 그 3개를 통합하여 통합검색을 할때 사용할 수 있다.
결과물 혹은 레코드를 합칠때 유니온을 사용가능
<br>
![image](https://user-images.githubusercontent.com/69495129/132225812-aec6b597-47a7-4e37-909e-c4011decdcb6.png)
<br>

``` sql
SELECT ID, NAME FROM MEMBER
  UNION
SELECT WRITER_ID, TITLE FROM NOTICE;
```
``` sql
SELECT ID, NAME FROM MEMBER
  UNION ALL
SELECT WRITER_ID, TITLE FROM NOTICE;
```
<br>
![image](https://user-images.githubusercontent.com/69495129/132226004-895d0e46-8212-4f12-b5e2-be0e6e1629a6.png)
UNION 을 하면 6개의 레코드가 얻어질 것이라고 생각하기 쉽지만, 그것은 UNION ALL 이고 일반적인 UNION을 실행하면 5개의 레코드가 얻어진다 중복된것은 1개로 치부된다.

## View(뷰)의 의미와 생성방법

![image](https://user-images.githubusercontent.com/69495129/132226732-27c26ab2-ca25-40fe-87a0-5f300c708571.png)
<br>
뷰를 만들어두고 언제든지 꺼내 쓸 수 있다. 자주쓰는것들은 뷰로 만들어두면 좋다.
목록을 볼때 일반적으로 한테이블을 보지않고 여러개를 합쳐쓰기때문에 그것을 뷰로 미리 만들어두고 사용하면 편리하다.

## 데이터 딕셔너리
<br>
![image](https://user-images.githubusercontent.com/69495129/132227040-e601e2ab-8466-40f3-8125-2b6c64c935c1.png)
<br>

과거의 콘솔형태의 클라이언트 도구를 사용할때에는 데이터 딕셔너리를 이용하여 여러가지 정보를 얻을 수 있었지만, 요즘 GUI Tool 을 사용하면 그 GUI 환경에서 모든것이 확인 가능하다.

## 도메인 제약조건
제약이 없으면 유효하지않은 데이터들이 가득 채워질 위험이 있다.
<br>
![image](https://user-images.githubusercontent.com/69495129/132227971-cf47d41a-90a9-48f1-b2f9-d8e2c96a8117.png)
<br>
도메인을 만족하면 형식으로 봤을때는 유효한 값이다. 컬럼단위
<br>
![image](https://user-images.githubusercontent.com/69495129/132228347-01a9e4f3-628e-4e1c-909c-9ebe64515386.png)
<br>
![image](https://user-images.githubusercontent.com/69495129/132228369-4fd1be3b-8dd5-419a-a9db-934f29f5fbf6.png)
<br>

### 체크 제약 조건
값의 범위나 형식이 알맞지 않으면 값이 들어가지 않도록 한다. 
<br>
![image](https://user-images.githubusercontent.com/69495129/132228887-0600b165-736d-4ac8-977d-97e9f85d51cd.png)
<br>
![image](https://user-images.githubusercontent.com/69495129/132228962-b540aca5-4cf0-4374-a6fa-fd9a1b9b7d98.png)
<br>
정한 규칙에 위배되면 오류가 발생한다.

#### 정규식을 이용한 체크 제약조건
체크 제약 조건을 더 정밀하게 다루기 위해서 정규식을 사용한다.

``` sql
PHONE LIKE '010-____-____'

REGEXP_LIKE(PHONE,'010-\d{3,4}-\d{4}')
```
위 쿼리문보다 아래 쿼리문이 더 엄격한 제한조건을 걸 수 있는 방법이다. 정규식을 사용했기 때문에.

## Entity 제약조건
테이블 전체에서 봤을때 레코드를 식별할 수 있는 뭔가가 있어야한다. 식별 컬럼 식별 키를 갖고있는 컬럼 이 필요하다.
<br>
![image](https://user-images.githubusercontent.com/69495129/132230759-fb662b66-90fd-4826-ab8b-f8cbc3ee477a.png)
<br>
![image](https://user-images.githubusercontent.com/69495129/132230936-f20619ec-793d-4b71-b67a-ee6372d96633.png)
<br>
이미 테이블이 만들어져있다면 수정을 택한다
<br>
![image](https://user-images.githubusercontent.com/69495129/132230959-6b12f086-5b1d-4792-a5bd-931c1aee8510.png)
<br>

## 시퀀스 (Sequence)
일련번호, 일련번호를 계속 뽑아야한다. 중복이 되면안되고 계속계속 번호가 증가되어야한다. 내가 몇번의 일련번호를 집어넣어야한다?
ID 열에 다음값을 쉽게 얻을 수 있도록 해주는 도구가 있으면 좋을 것 같다.
시퀀스 => 새 시퀀스 => 이름 : NOTICE_ID_SEQ  다음으로 시작 : 1  증분 : 1 캐시: 캐시 크기 20 (성능 개선) 

**사용방법**
``` sql
INSERT INTO NOTICE(ID, TITLE, WRITER_ID)
VALUES(NOTICE_ID_SEQ.NEXTVAL,'Oracle','chanhyuk');
```



***
<br>

    🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}

