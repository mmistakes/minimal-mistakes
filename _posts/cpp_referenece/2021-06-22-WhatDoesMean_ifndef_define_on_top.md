---
published: true
layout: single
title: "헤더 파일 상단의 #ifndef #define의 의미"
category: cppreference
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

코드를 보다보면 헤더 파일 상단에 아래와 같은 구조를 자주 볼 수 있습니다.

```c++
#ifndef DEF_ARME
#define DEF_ARME
...
...
#endif
```
<br>
이러한 구조를 왜 사용할까요? 위와 같은 구조를 사용하면 헤더 파일을 중복 선언하는 것을 방지할 수 있습니다. 아래의 예제 코드를 같이 확인해봅시다.

```c++
/*
* test.h
*/

#ifndef DEF_ARME
#define DEF_ARME

#include "A"
#include "B"
#include "C"

static int test1;
static int test2;

...
...
#endif
```

```c++
#include "test.h"
#include "test.h"
...
...
```

가장 먼저 #include "test.h"가 호출되면 DEF_ARME는 정의된 적이 없기 때문에 #define이 호출될 것입니다.

그리고 아래의 헤더 파일과 코드들을 실행하게 될 겁니다. 이후 두 번째 #include "test.h"가 호출될 때는 어떻게 될까요? DEF_ARME가 이미 정의되어 있으므로 #ifndef와 #endif 사이로 진입하지 않을 것 입니다.

#### ***End Note***
- 헤더 파일 상단의 #ifndef #define을 추가하는 것은 헤더 파일간의 종속성이 복잡할 때, 중복 선언을 방지해주는 역할을 합니다.


#### Reference 
***
- ***<https://stackoverflow.com/questions/22769919/what-does-mean-ifndef-define-directive>***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>