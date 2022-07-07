---
published: true
layout: single
title: "C++ 함수 포인터"
category: cppreference
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

#### Example 1
* * *
```c++
int foo(int x) { return x; }

...
...

int (*funcPtr)(int) = foo; // 함수 포인터 선언

(*funcPtr)(5); // 명시적인 역참조
funcPtr(5);    // 암시적인 역참조
```

#### Example 2
* * *
```c++
// 쓸모 없어 보이는 코드지만
// 예제로는 쓸만 합니다.

bool compare(int x, int y)
{
    return x < y;
}

int max(int x, int y, bool (*compare)(int, int))
{
    if( true == (*compare)(x, y) )
    {
        return y;
    }
    else
    {
        return x;
    }
}

...
...

std::cout << max(x, y, compare) << std::endl;
```

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>