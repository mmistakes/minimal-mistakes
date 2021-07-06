---
published: true
layout: single
title: "[Effective C++] 15. 자원 관리 클래스에서 관리되는 자원은 외부에서 접근할 수 있도록 하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 3 - 3*
* * *

RAII 클래스 설계시에는 RAII가 관리하고 있는 자원에 직접 접근할 수 있는 방법을 마련해주는 것이 좋습니다. 스마트 포인터에서는 get()이라는 명시적 변환을 수행하는 함수가 이미 있습니다. 또는 자원에 바로 접근할 수 있도록 해주는 방법도 괜찮습니다.

그런데 말입니다. 객체 지향에 대해 조금이라도 알고 계신다면 캡슐화에 위배되는 것이 아닌가하고 고민해볼 수 있겠지요. 하지만 괜찮습니다!. 표준라이브러리를 포함하여 이미 많은 곳에서 그러한 느슨한 방법을 사용 중입니다.

#### ***End Note***
***
- 실제 자원을 직접 인자로 사용해야 하는 기존 API들도 많기 때문에, RAII 클래스를 만들 때는 그 클래스가 관리하는 자원을 얻을 수 있는 방법을 열어 주어야 합니다.
- 자원 접근은 명시적 변환 혹은 암시적 변환을 통해 가능합니다. 안전성만 따지면 명시적 변환이 대체적으로 더 낫지만, 고객 편의성을 놓고 보면 암시적 변환이 괜찮습니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>