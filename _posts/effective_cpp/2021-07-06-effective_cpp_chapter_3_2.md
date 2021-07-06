---
published: true
layout: single
title: "[Effective C++] 14. 자원 관리 클래스의 복사 동작에 대해 진지하게 고찰하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 3 - 2*
* * *

앞의 장에서 RAII 기법을 공부했습니다. 우리는 이제 RAII 객체가 복사 될 때 어떤 동작이 이루어져야 할까?에 대해 고민해볼 필요가 있습니다.  

먼저 RAII 기법으로 구현된 Mutex 관리 Class가 있다고 칩시다.

```c++
class AutoLock
{
public:
    AutoLock(Mutex* _mutex)
    : p_mutex(_mutex)
    {
        lock(p_mutex);
    }

    ~AutoLock()
    {
        unlock(p_mutex);
    }

private:
    Mutex* p_mutex;
};
```  
<br>
자 앞서 했던 질문에 대해 다시 생각해봅시다. 아마도 여러분은 아래의 선택지 중 하나를 생각해 볼 수 있을텐데요. 각각의 선택지에 대해 같이 고민해봅시다.  


#### 1) 복사를 금지합니다.  
***
- 말 그대로 복사를 금지합니다. RAII 객체가 복사되도록 놔두는 것 자체가 말이 안되는 경우가 많습니다. 위의 AutoLock의 경우도 해당하겠지요. 스레드 동기화 객체에 대한 사본의 존재할 필요가 있을까요?. 복사를 금지하는 방법은 [항목6](/effectcpp/effective_cpp_chapter_2_2/)에서 확인할 수 있습니다.

#### 2) 관리하고 있는 자원에 대한 카운팅을 수행합니다.
***
- 자원을 사용하고 있는 마지막 객체가 소멸될 때까지 자원을 해제하지 않도록 구현할 필요가 있는 경우도 있겠지요. 이 경우 shared_ptr을 사용하면 바람직할 것 같습니다만, 위의 Lock Class의 경우 자원 해제가 아닌 unlock을 수행하고 싶습니다. 그럴 경우 Custom Deleter를 사용하면 됩니다. [항목13](/effectcpp/effective_cpp_chapter_3_1-2/)을 참조해주세요

#### 3) 관리하고 있는 자원을 진짜로 복사합니다.
***
- 관리하고 있는 자원을 진짜로 복사하는 경우도 있을 수 있습니다. 이 때 복사된 사본을 확실히 해제하는 것이 우리가 만든 클래스의 존재 이유가 될 것 입니다. 그런 경우는 당연히 깊은 복사(Deep Copy)를 수행해야겠지요.

#### 4) 관리하고 있는 자원의 소유권을 옮깁니다.
***
- 자원에 대해 그 자원을 실제로 참조하는 RAII 객체는 단 하나만 존재하도록 만들고 싶을 수 있습니다. 이런 경우 unique_ptr을 사용하면 되겠지요. ([항복13](/effectcpp/effective_cpp_chapter_3_1-1/) 참조)

#### ***End Note***
***
- RAII 객체의 복사는 그 객체가 관리하는 자원의 복사 문제를 안고가기 때문에, 그 자원을 어떻게 복사하느냐에 따라 RAII 객체의 복사 동작이 결정됩니다.
- RAII 클래스에 구현하는 일반적인 복사 동작은 복사를 금지하거나 참조 카운팅을 해 주는선으로 마무리하는 것 입니다. 하지만 이 외의 방법들도 가능하니 참고해 둡시다(Custom Deleter).

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>