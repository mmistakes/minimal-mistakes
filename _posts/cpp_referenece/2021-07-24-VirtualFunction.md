---
published: true
layout: single
title: "c++ 가상 함수 정리 (virutal)"
category: cppreference
tags:
comments: true
sidebar:
  nav: "mainMenu"
--- 
* * *

#### 기본 클래스와 파생 클래스간의 가상 함수 호출 시 동작 정리
- 가상 함수가 아닌 파생 클래스 멤버 함수를 기본 클래스 포인터형으로 호출하면 기본 클래스의 함수가 호출 된다. 
- virtual 키워드가 붙은 함수를 가상 함수라고 칭하며, 가상 함수는 파생 클래스에서 재정의 될 경우 기본 클래스 포인터 형에 파생 클래스가 할당 되더라도 파생 클래스에서 재정의 된 동작을 수행 한다.
- 만약 기본 클래스의 함수에 virtual 키워드가 붙은 함수는 파생 클래스에서 virtual 키워드를 붙여주지 않아도 가상 함수로 취급 되지만, 관례 상 붙여주는 것을 권장한다. 
- 아래 코드는 위에서 정리한 내용을 예제로 작성한 것 이다.

```c++
#include <iostream>

class Base
{
public:
    virtual void Print();
};

void Base::Print()
{
    std::cout << "Base Class" << std::endl;
}


class PrintTest1 : public Base
{
public:
    virtual void Print();
};

void PrintTest1::Print()
{
    std::cout << "PrintTest1 Class" << std::endl;
}

class PrintTest2 : public Base
{
public:
    virtual void Print();
};

void PrintTest2::Print()
{
    std::cout << "PrintTest2 Class" << std::endl;
}

class PrintTest3 : public Base
{
};

int main()
{
    Base base;
    PrintTest1 test1;
    PrintTest2 test2;
    PrintTest3 test3;

    Base* pBase = &base;
    pBase->Print();

    pBase = &test1;
    pBase->Print();

    pBase = &test2;
    pBase->Print();
    
    pBase = &test3;
    pBase->Print();
}

----------------------------------------
Base Class
PrintTest1 Class
PrintTest2 Class
Base Class
----------------------------------------
```

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>