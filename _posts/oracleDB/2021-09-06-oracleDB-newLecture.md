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
위와 같은 코드를 작성하면 될까? Answer => 안된다.
왜냐하면 ROWNUM 1이 가져와지고 이것이 위 조건에 안맞기때문에 홍길동은 제외된다. 그 후 유재석이 ROWNUM 1이 되고 다시 조건이 안맞기때문에 없어지고 강호동이 ROWNUM 1이되고.. 계속 반복 된다 그러므로 
ROWNUM 6 까지 갈 수 조차 없다는것이다. 그렇다면 어떻게 해결해야할것인가? 이 이유는 ROWNUM 이 결과집합이 만들어질때 만들어지는 수 이기 때문이다.
이것이 아니라 원래 일련번호를 가지고 있었다면 될 것이다. 즉 미리 만들어놓으면 된다
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








***
<br>

    🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}

