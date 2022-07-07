---
published: true
layout: single
title: "std::bind, std::function 사용법"
category: cppreference
tags:
comments: true
sidebar:
  nav: "mainMenu"
--- 
* * *

#### std::bind 사용법
* * *

```c++
void Add(int a, int b)
{
    int sum = a + b;
    std::cout << sum << std::endl;
}

...
...
auto func = std::bind(Add, 10, std::placeholders::_1);
func(20);

---------
30
---------
```

####  std::bind 멤버 함수 사용법
* * *

```c++
class AddTest
{
public:
    void Add(int a, int b)
    {
        int sum = a + b;
        std::cout << sum << std::endl;
    }

    void bindTest()
    {
        auto func2 = std::bind(&AddTest::Add, this, 10, std::placeholders::_1); // this 필수, & 필수
        func2(10);
    }
};

...
...

AddTest test;
test.bindTest();

---------
20
---------
```

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>