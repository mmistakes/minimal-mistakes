---
published: true
layout: single
title: "이름이 명시되지 않은 변수를 함수 파라미터로 사용하는 이유"
category: cppreference
tags:
comments: true
sidebar:
  nav: "mainMenu"
--- 
* * *

기본 클래스의 가상 함수를 재정의할 때, 실제로 가상 함수의 매개 변수를 사용하지 않는 경우 유용하다고 합니다. 즉 아래와 같은 경우가 될 수 있겠네요.

```c++
class Base
{
  virtual void hit(int num)
  {
    ...
  }
};

class Derived : public Base
{
  virtual void hit(int) override
  {
    ...
  }
};
```

#### Reference 
***  
- ***<https://stackoverflow.com/questions/12186698/why-does-c-allow-unnamed-function-parameters>***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>