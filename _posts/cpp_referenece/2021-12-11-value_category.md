---
published: true
layout: single
title: "[C++] lvalue, rvalue, 우측값 레퍼런스, std::move"
category: cppreference
tags: 
comments: true
sidebar:
  nav: "mainMenu"
--- 
* * *

열심히 정리를 하고 있었는데, 도저히 아래의 글보다 잘 쓸 자신이 없어서 포기합니다. 
봐도봐도 헷갈리니 시간날 때마다 계속 봐야겠습니다. 이해가 안가는 설명은 여러번 곱씹다 보면 이해가 
갔는데 다시보면 또 이해가 안갈지도 모르겠습니다...
  
적어도 아래의 질문 정도는 답할 수 있도록 공부해야겠습니다.
- lvalue와 rvalue란?
- lvalue, glvalue, xvalue, rvalue, prvalue란?
- 우측값 레퍼런스란 무엇인가?
- std::move은 어떤 역할을 하는가?
- 우측값 레퍼런스 연산이 주로 사용 되는 곳?
- 우측값 레퍼런스가 좌측값, 혹은 우측값이 되는 기준?
- 우측값 레퍼런스를 인자로 받는 템플릿에서 인자가 좌측값이냐 우측값이냐에 따라 적용되는 규칙과 & 겹침 문법
- 우측값 레퍼런스를 사용하는 복사, 이동 연산자 오버로딩 시 주의할 점?
- 대입 연산을 우측 값 레퍼런스와 std::swap을 사용하여 구현 시 주의할 점?
- std::forword의 역할?
- 우측값 참조 예외처리하는 법?
- 암시적 move는 왜 없는가? 

#### Reference 
***  
- ***[우측값 참조](https://modoocode.com/189)***
- ***[value category](https://modoocode.com/294)***
- ***[std::move](https://modoocode.com/301)***
- ***[std::forward](https://modoocode.com/302)***