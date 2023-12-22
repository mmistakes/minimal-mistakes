---
layout: single
title:  "Semantics "
categories: [CliteP,JAVA,Functions,Function,Semantics,Compiler,Meaning Function]
tag : [CliteP,JAVA,Functions,Function,Semantics,Compiler,Meaning Function,State,Stack,Stack Frame,Frame Stack]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

### 시작 하며 

간단한 내용 정리와 구현 한 프로그램에서 semantics를 어떻게 구현 하였는지 배운점을 기록 하겠습니다. 

아래에 원노트로 정리한 파일이 있습니다. 


<a href="https://sullivan.github.io/pdfs/Semantic.pdf">Semantic one note pdf</a>



### 내용 정리 및 마무리 

* short circuit으로 프로그램을 더 간결하게 만들 수 있다

* 수학과 컴퓨터 계산은 같지 않음 Ex - overflow

* 선언만 되어있으면 undef로 되어있고 할당되거나 값이 바뀌면 다시 설정 된다 

* copy, reference 차이 
  * copy한 값은 서로 영향을 주지 않음  -- have the same value
  * reference는 서로 영향을 받는다     -- point the same object 


* Environment , State 

  - Environment 
    * name-> memory location 대응 시킴 "<i,154>"
  
  - State 
    * memory location -> value 대응 시킴 "<154,5>"
    * identifier, value 집합으로 정의 


* **실제 프로그램 구현 내용** 

Semantic를 구현하기 위해 3가지 class를 추가로 구현했다. FramState, StackFrame, State이다.

FrameState는 interpreter 실행중에 발생하는 변수와 대응하는 값에 집합이다. HashMap<VariableRef,Value> 자료구조를 통해 key에 변수, value에 변수값을 넣는다. onion 함수는 변수와 값을 주면 변수의 값을 파라메터로 넘긴 값으로 바꿔주는 함수이다. 

StateFrame은 Activation Record에 해당하는 클라스이다. StateFrame은 함수이름, static link, dynamic link, FrameState로 구성되어있다. 마지막으로 State에서는 만든 stackFrame을 stack에 push, pop 하는 역할을 하고 stack에 있는 stackFrame을 처리하는 클라스이다. static link , dynamic link 설정이 이루어지고 variable, value를 재설정 하는 역할도 이 클래스가 한다.
Semantics 클래스를 보면서 각 클래스에 세부적인 내용을 살펴보겠다. 

**1 semantics** 
**1.1	M(program p )정의** 
**1.2	initialState(program p) 정의**

meaning Function에 program이 인자로 들어가면 initial()함수가 실행이 되는데 전역변수에 대한 stackFrame을 만든다. 그리고 전역변수 globals에 대한 stackFrame과 program안에 정의된 함수들을 state 생성자에서 초기화 한다. 이때 stack이 생성이 되고 현재 함수를 나타내는 current_func이 초기화 된다.
다시 M(Program p)로 돌아오면 main함수에 대한 StackFrame을 생성한다. 이때 static link, dynamic link와 새로운 FrameState가 생성이 되고 state stack에 push된다. M(program p)은 현재 함수의 M(current_func.body,stat)를 반환하면서 계속 실행이 이어진다.

**1.3	M(Statement)**
Statement의 종류에 따라 meaning function을 처리하였다. Assignment는 <변수, 변수 값>을 state stack top의 StackFrame에 값을 대응시킨다. 만약에 assignment의 <변수, 변수 값>이 Stack top StatckFrame에 없다면 static link를 타고 들어가서 값을 찾아서 대응시킨다. Block의 경우는 모든 statement에 대해 meaning function을 호출한다. Block에서 return이 있다면 즉시 반환을 한다. Loop의 경우도 조건식을 확인해주고 Loop안에 return 문 있는 경우 바로 반환을 해주어야 하기 때문에 확인하는 작업을 해준다. CallStatement의 경우는 함수가 넘겨주는 인자를 배열에 저장을 하고 state stack에 push를 해주면서 current_func을 push하는 StackFrame으로 바꿔준다. 그리고 byValue() 함수를 통해 저장한 argument를 함수의 parameter에 넘기는 작업을 한다. Parameter로 argument를 넘기면 그때 정의한 함수의 실행부가 실행이 된다. 실행이 완료되면 stack에서 pop을 한다. 이때 dynamic link가 가리키는 StackFrame이 current_func이 되고 pop을 한다. Return meaning function을 보면 <$ret, 반환 값>을 Stack에 top에 있는 StackFrame에서 찾아서 업데이트 한다. 만약 없다면 static link를 타고 들어가서 대응하는 변수 찾아서 수정한다. M(Statement)의 반환 타입은 State이기 때문에 state stack에 저장 되어있는 StatackFrame의 내용이 수정이 되거나 Stack이 조정이 되거나 등의 작업을 한다.

**1.4	M(Expression)**
Expression도 종류에 따라 meaning function을 처리한다. M(Expression)은 Value를 반환 타입으로 가지기 때문에 Value를 반환한다. 일반 변수 값 Value라면 Value를 그대로 반환한다. VariableRef라면 변수에 대응하는 값을 stack에 top에서 value를 찾는다. 만약 없다면 static link를 타고 찾아서 반환한다. Binary인 경우 meaning function을 통해 expression term1, term2를 value로 바꿔주고 operation 정보와 함께 applyBinary 함수를 실행한다. 이 함수는 Binary에서 실행하는 연산 결과에 대한 Value를 반환해주는 함수이다. Unary인 경우도 Binary와 마찬가지로 meaning function을 통해 expression term1을 value로 전환하고 applyUnary 함수를 적용해서 Unary대한 결과를 Value로 반환한다. 마지막으로 CallExpression을 살펴보면 callstatement와 비슷한 구조로 진행이 된다. parameter로 넘기는 인자를 args 배열에 저장을 하고 state stack에 새로운 함수에 대한 StackFrame을 push한다. current_funct을 현재 statckFrame으로 바꿔준다. 함수의 실행부를 실행하고 stack에서 pop하는 구조까지 비슷하게 흘러가지만 다른 점은 return에 대한 처리이다. Return meaning function은 state에 variable과 expression처리한 value를 새로 업데이트 해주고 saw_ret 불리언 변수를 true로 바꿔준다. CallExpression에서는 return 문에 함수가 올 수도 있기 때문에 이에 대한 처리가 추가적으로 이루어진다. block안에서 return f()함수가 있었다고 하면 return이 있기 때문에 saw_ret = true가 된다. 그리고 f()에 대한 처리가 callExpression에서 이루어질 때 temp_saw_ret = saw_ret로 상태 값을 임시 저장한다. 이렇게 하는 이유는 f()함수의 실행부가 처리될때 saw_ret가 true로 되어있으면 제대로 작동을 하지 않기 때문에 일단 saw_ret = false로 처리하고 body를 정상적으로 처리하기 위함이다. F()의 처리가 끝나면 그때 temp_saw_ret에 저장 되어있던 상태 값을 saw_ret에 저장시키고 return처리를 한다.  
