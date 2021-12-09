---
published: true
layout: single
title: "Lvalue와 Rvalue 완벽 정리"
category: cppreference
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

LValue는 연산의 왼쪽, RValue는 연산의 오른쪽에 오는 값이라는 설명을 한 글을 어디선가 읽은적이 있고, 나도 그냥 그런식으로 이해하고 넘어갔는데 공부를 하면 할 수록 헷갈리고 정리가 안되어서 찾아본 내용을 정리하였습니다.

#### LValue와 RValue 정리
***
- LValue는 단일 표현식 이후에 없어지지 않고 지속되는 객체이다.
- RValue는 표현식 이후에 남아있지 않고 더 이상 존재하지 않는 임시적인 데이터이다.
- LValue는 &를 통해 참조 접근이 가능하다.
- C++11 버전 이후부터는 LValue 참조자 &외에 RValue를 참조할 수 있는 RValue 참조자 &&가 추가 되었다.
- 임시적인 값인 RValue에 왜 참조자가 필요할까?, 이미 존재하는 RValue를 새로 생성하지 않고 RValue 참조자를 이용하여 임시 객체의 리소스를 이동시켜 불필요한 메모리 할당과 복사 작업을 생략하여 성능을 향상 시킬 수 있다 (**Move Semantics**)

#### Move Semantics
***
- 임시적인 객체인 RValue를 RValue 참조자를 이용하여 다른 객체로 전송하는 것.
- Move semantics를 구현함으로서 성능을 대폭 향상 시킬 수 있음. 
- 일반 함수를 &&로 오버로드 함으로서 Move Semantics 사용하는 함수를 쉽게 구현 가능.
- STL의 많은 함수들이 이미 Move semantics 동작이 구현되어 있음.
- std::move를 사용하면 RValue를 LValue로 변환할 수 있다.


#### C++ 개념 추가
* * *
- https://dydtjr1128.github.io/cpp/2019/06/10/Cpp-values.html

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>