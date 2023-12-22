---
layout: single
title:  "Static Type checker "
categories: [CliteP,JAVA,TypeChecker,Compiler]
tag : [clite,cliteP,TypeChecker,Static type checker,JAVA,java,Function,Call Statement, Call Expression]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

### 시작 하며 

AST에서 나온 결과로 type checking을 하게 됩니다. 

<변수,타입>의 typeMap 자료구조를 만들어서 타입을 확인합니다. 

clite에서 type check를 어떻게 진행하는지는 정리한 pdf에서 알 수 있습니다. 


원노트에서 정리한 기반의 내용의 pdf는 아래 링크에서 확인 할 수 있습니다. 


<a href="https://sullivan.github.io/pdfs/TypeChecker.pdf">Static Type Checker one note pdf</a>





### 내용 요약 및 정리 및 마무리

함수의 내용도 타입 체크 어떻게 하는지 포함하겠다

Type checker는 변수와 타입을 typeMap 자료구조에 삽입한다.

V()함수로 타입 체크를 하는데 인자에 무엇이 오는가에 따라 역할이 다르다 

1. Declarations 같은 경우는 중복 선언이 되었는지 확인

2.	Declarations, Functions를 인자로 받는 경우 선언부의 이름과 함수의 이름이 같지 않는지 확인을 한다.

3.	Functions을 인자로 받는 경우 Declarations와 마찬가지로 함수끼리 이름이 중복되지 않는지 확인을 한다.

4.	Functions, TypeMap이 인자로 온 경우 함수의 parameter, locals의 내용을 선언부 배열에 넣어서 V(Declarations)를 통해 유효한 parameter, locals인지 확인을 한다. 

함수가 main이 아니라면 void형이 아닌데 return이 없는 경우에 대한 유효 체크를 한다. 또 Void형인데 return 형이 있는 경우에 대한 처리도 하고 main 함수에 return이 있는지에 대한 유효 확인도 한다. 

5.	Statement, Typemap을 인자로 받은 경우 Assignment의 경우는 Variable은 typeMap에 정의 되어있는지 확인하고 Expression은 유효한지 확인을 한다. 또 변수와 할당하는 값의 타입이 같은지 확인을 해야한다. 만약 같지 않다면 float일때는 int형 , int 형일때는 char형까지만 지원하고 나머지는 지원하지 않느다. 
Loop, condional의 경우 조건식이 bool 타입인지 확인을 해야한다. 그리고 conditional은 than statement, else statement가 유효한지 판단하기 위해 V()를 재 호출한다. LOOP의 경우도 body가 유효한지 확인을 하기 위해 재 호출을 한다. 

callStatement는 함수에 대한 타입 유효 검사를 진행하는데 전달하는 인자와 parameter개수가 같은지 부터 힘수에 대한 유효 검사를 진행한다. 또 함수의 이름을 선언 하지 않는경우데 대한 에러도 같이 확인한다 

6.	 Expression, typemap이 인자로 오는 경우 변수가 선언이 되었는지 아닌지 유효검사를 하고 Binary같은 경우에는 계산하는 변수끼리 타입이 같은 지 확인을 한다. Unaray에서는 !가 오면 bool type으로 유효 검사를 하여야하고 NegateOp가 오면 int형으로 처리를 해야한다. unary에서는 타입 변환도 같이 처리를 한다. Callexpression의 경우는 함수이름이 없는 경우, 함수가 void인데 1+f(1)하면 안되는 경우, 전달하는 인자 개수와 받는 parameter 개수가 일치하는지에 대한 유효검사를 진행한다. callsatement에서 처리하는 유효검사와 비슷하다.


