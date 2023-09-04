---
title:  "[Code Complete 2] 4부 - 명령문"
search: true
categories: 
  - 독서
tags:
  - CodeComplete2
classes: wide
---

# 14장: 순차적 코드 구성하기
## 14.1 순서가 중요한 명령문
- 의존성이 분명히 보이도록 코드와 이름을 작성한다. 매개변수는 의존성을 표현하기도 한다.
- 의존성이 잘 보이지 않으면 주석을 단다.
```
# 이렇게 쓰면 의존성이 잘 보인다.
InitializeExpenseData
ComputeMarketingExpense
ComputeSalesExpense
ComputeTravelExpense
DisplayExpenseSummary
```
## 14.2 순서가 중요하지 않은 명령문
- 코드를 하향식으로, 블럭 단위로 읽을 수 있도록(객체 수명이 짧게) 작성한다.
```
# bad
TravelData t; SlaesData s; MarketingData m;
t.compute1(); s.compute1(); m.compute1();
t.compute2(); s.compute2(); m.compute2();
t.print(); s.print(); m.print();

# good
TravelData t; t.compute1(); t.compute2(); t.print();
SalesData s; s.compute1(); s.compute2(); s.print();
MarketingData m; m.compute1(); m.compute2(); m.print();
```

# 15장: 조건문 사용
## 15.1 if 문
- *일반적인 경우를 if에 쓰고 특별한 경우를 else에 쓴다.*
- if 를 썼다면 else 인 경우를 고려했는지 생각해 보기. else 인 경우가 없다면 왜 없는지 else 문에 주석으로 남기기.
## 15.2 case 문
- break 잘 하기

# 16장: 반복문 제어
## 16.1 반복문 종류 선택
- N/A
## 16.2 반복문 제어
- for 루프헤더에 루프와 관련된 커맨드가 아닌 것들은 다 뺀다. 해당하는 경우 while 문이 더 적절할 수 있다.
```
// bad
for ( input.start(), recordCound = 0; !input.EndOfFile(); input.next(), recordCount++ ) {
    ...
}

// good
input.start();
while (!input.EndOfFile()) {
    ...
    input.next();
    recordCount++;
}
```
- 루프는 50줄 이내로. 중첩은 3단계 이내로. 길이가 길면 명료하게 코드를 짜려고 노력할 것.
## 16.3 반복문을 쉽게 작성하는 법 - 안에서부터 밖으로
- 내용을 슈도코드 형태로 먼저 쓰고, 내부 코드를 작성한 다음 반복문 헤더를 쓴다.
- 굳이 ?
## 16.4 반복문과 배열의 연관성

# 17장: 특이한 제어 구조
## 17.1 여러 곳에서 반환하는 루틴
- 코드를 읽기 쉽게 만들수 있는 경우에 리턴을 넣는다. 위에서 리턴하고 있는지를 모르고 아래쪽 코드를 읽는다면?
## 17.2 재귀문
- 재귀문 쓰기 전에 한번 더 생각해라. 대부분의 경우 반복문으로도 할 수 있다.
- A가 B를, B가 C를, C가 A를 호출하는 형태의 순환 리커시브는 위험하다.
- 스택 터지지 않게 조심. 
## 17.3 goto 문
- 쓰지마라
## 17.4 특이한 제어 구조에 대한 관점
- N/A

# 18장: 테이블 활용 기법
- 테이블은 dictionary, 2차원 배열 등, if 문을 대체할 수 있는 자료구조를 말한다. 조건이 복잡해질수록 테이블이 유용하다.
## 18.1 테이블 활용 기법에서 일반적으로 고려해야 할 사항
- 테이블이 표현해야 하는 범위가 말도 안되게 크다면, 테이블 사용이 복잡할 수 있다.
- 테이블 안에 들어있는 게 데이터라면 쉬운데, 어떠한 기능(action)인 경우에는 복잡해진다.
## 18.2 직접 접근 방식
- 디자인의 중요성. 때로는 OOP보다 테이블이 더 좋을 수 있다. 물론 OOP와 테이블을 결합하면 더 좋은 결과가 나올 수 있다. 
- 최대한 Abstract 로 잘게 쪼개려는 시도를 하자.
## 18.3 인덱스 접근 방식
- 중간 테이블을 활용하는 방식. 공간활용과 속도 면에서 좋다.
## 18.4 단계적 접근 방식
- N/A
## 18.5 그 밖의 테이블 참조 방법
- N/A

# 19장: 제어와 관련된 일반적인 이슈
## 19.1 불린 표현식
- if 문에서 숫자는 명시적으로 비교하기. `while (bufferPtr != NULL)`, `while (balance != 0)` 이렇게.
## 19.2 복합문(블록)
- N/A
## 19.3 널 명령문
- N/A
## 19.4 지나치게 깊은 중첩 구조 처리
- if 문이 3중첩 이상이라면 다시 생각해보자. 재구성이 가능할 것이다. 함수로 빼든, case로 치든, 객체지향적으로 처리하든.
## 19.5 프로그래밍의 기초: 구조적 프로그래밍
- 입출구가 하나인 구조. 순서, 선택, 반복의 조합으로 모든 프로그램을 작성할 수 있다는 개념이다.
- goto, brea, continue, return, throw-catch는 구조적 프로그래밍의 요소가 아니다.
## 19.6 제어 구조와 복잡성
- 제어 구조가 복잡해지면 코드를 읽기 어려워진다. 복잡도는 프로그램을 이해하는 데 필요한 노력의 양이다.
- 고급 코드를 작성하는 지름길은 복잡도를 최소화하는 것이다.