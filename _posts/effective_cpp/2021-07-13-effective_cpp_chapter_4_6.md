---
published: true
layout: single
title: "[Effective C++] 23. 멤버 함수보다는 비멤버 비프렌드 함수와 더 가까워지자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

웹브라우저를 나타내는 클래스가 하나 있다고 가정합시다.

```c++
class WebBrowse
{
public:
  ...
  void clearCache();     // 캐시 정리
  void clearHistory();   // 방문기록 정리
  void removeCookies();  // 쿠키 정리
  ...
};
```

하지만 사용자 중에는 이 세동작을 한번에 하고 싶은 분들도 상당수 있기 때문에, 세 함수를 모아서 불러주는 함수도 준비해둘 수 있겠지요.

```c++
class WebBrowse
{
public:
  ...
  void clearCache();      // 캐시 정리
  void clearHistory();    // 방문기록 정리
  void removeCookies();   // 쿠키 정리
  void clearEveryThing(); // clearCache(), clearHistory(), removeCookies() 호출
  ...
};
```  

물론 이 기능을 비멤버 함수로 제공해도 됩니다. 웹브라우저 객체의 멤버 함수를 순서대로 불러주기만 하면 되는 거죠

```c++
void clearBrowser(WebBrowser& wb)
{
  wb.clearCache();
  wb.clearHistory();
  wb.removeCookies();
}
```

어느 쪽이 더 괜찮을까요? 멤버 버전인 clearEverything일까요, 아니면 비멤버 버전인 clearBrowser일까요?  

객체 지향 법칙에 관련된 이야기를 찾아보면 데이터와 그 데이터를 기반으로 동작하는 함수는 한 데 묶여 있어야 하며, 멤버 함수가 더 낫다고들 합니다. 하지만 불행히도 이 제안은 틀렸습니다.  

먼저 clearEveryThing은 비멤버함수 버전인 clearBrowser보다 캡슐화가 더 안 좋습니다. 또 비멤버함수 사용 시, 패키지 유연성도 더 뛰어난데다가 컴파일 의존도도 낮추고 확장성도 높일 수 있습니다. 어째서인지 지금부터 하나씩 짚어보도록 하겠습니다.


#### 왜 비멤버 함수가 멤버 함수보다 캡슐화가 뛰어나다고 할 수 있을까?
***
어떤 것을 캡슐화하면, 우선 외부에서 이것을 볼 수 없게 됩니다. 캡슐화하는 것이 늘어나면 그만큼 밖에서 볼 수 있는 것들이 줄어듭니다. 밖에서 볼 수 있는 것들이 줄어들면, 그것들을 바꿀 때 필요한 **유연성**이 커집니다. 변경 자체가 영향을 줄 수 있는 범위가 '변경된 것을 볼 수 있는 것들'로 한정되기 때문에 당연한 이치입니다.  

어떤 객체의 모습을 그 객체의 데이터로 설명할 수 있다고 생각해 봅시다. 이 데이터를 직접 볼 수 있는(다시 말해 접근할 수 있는) 코드가 적으면 적을 수록 그 데이터는 많이 캡슐화된 것이고, 그 객체가 가진 데이터의 특징을 바꿀 수 있는 자유도가 그만큼 높은 것 입니다.  

데이터의 한 조각을 들여다 볼 수 있는 코드가 얼마나 되는지에 대한 개략적인 측정값으로서, 데이터를 접근할 수 있는 함수의 개수를 셀 수 있을 것입니다. 그러니까, 어떤 데이터를 접근하는 함수가 많으면 그 데이터의 캡슐화 정도는 낮다는 이야기 입니다.  

[항목22](/effectcpp/effective_cpp_chapter_4_5/)를 보시면 데이터 멤버는 private 멤버가 되어야 한다고 말하고 있습니다. private 멤버가 아닌 멤버는 캡슐화의 보호막이 전혀 없다고 봐도 됩니다. private에 접근할 수 있는 함수의 개수가 늘어난다는 것은 캡슐화가 약해진다고 볼 수 있지요.

그런데 비멤버 비프렌드 함수는 어떤 클래스의 private 멤버 부분을 접근할 수 있는 함수의 개수를 늘리지 않습니다. 즉 캡슐화가 정도가 더 높다고 할 수 있겠지요.

여기서 잠깐! 다음의 두 가지는 반드시 주의해야할 필요가 있습니다.  

첫째로는 비멤버 비프렌드 함수에만 적용된다는 것입니다. 프렌드 함수는 private 멤버에 대한 접근 권한이 멤버 함수가 가진 접근 권한과 똑같기 때문이지요.


둘째로는 "함수는 어떤 클래스의 비멤버가 되어야 한다"라는 주장이 "그 함수는 다른 클래스의 멤버가 될 수 없다"라는 의미가 아니라는 것입니다. 이를테면, clearBrowser 함수를 다른 유틸리티 클래스 같은 데의 정적 멤버 함수로 만들어도 된다는 이야기 입니다. 물론 앞서 방법도 좋지만 C++로는 더 자연스러운 방법을 구사할 수 있습니다. 같이 확인해 보시죠.

#### namespace 영역에 비멤버 함수 선언
***
바로 namespace 안에 비멤버 함수를 위치시키는 방법 입니다.

```c++
namespace WebBrowserStuff
{
  class WebBrowser { ... };
  void clearBrowser (WebBrowser& wb);
  ...
}
```

사실 이건 자연스러움보다 몇 걸음 더 나아간 방법이라고 볼 수 있습니다. 왜냐하면 네임스페이스는 클래스와 달리 여러 개의 소스 파일에 나뉘어 흩어질 수 있기 때문입니다. 이 부분은 굉장히 중요한데 clearBrowser와 같은 편의 함수들은 멤버도 아니고 프렌드도 아니기에 WebBrowser 사용자 수준에서 아무리 애를 써도 얻어낼 수 없는 기능들은 제공할 수 없습니다. 예를 들어 clearBrowser가 없다고 해도 사용자는 그냥 clearCache(), clearHistory(), removeCookies()를 한번에 호출해주면 되는 것입니다.  

또한 편의 함수가 시간이 흘러 꽤 많이 생길 수도 있습니다. 그런 경우 사용자는 아래의 예제처럼 각각의 다른 헤더에 코드를 나누어서 넣되 다른 헤더 파일에 선언할 수 있습니다.

```c++
// webbrowser.h WebBrowser 클래스 자체에 대한 헤더
namespace WebRowserStuff
{
  // 사용자에게 반드시 필요한 핵심 관련 기능
}
...
// webbrowserbookmarks.h 헤더
namespace WebBrowserStuff
{
  // 즐겨 찾기 관련 편의 함수
}
...
// webbrowsercookies.h 헤더
namespace WebBrowserStuff
{
  // 쿠키 관련 편의 함수
}
```

사실 표준 C++ 라이브러리 또한 같은 구조로 되어있습니다. std 네임스페이스에 속한 모든 것들이 <C++StandardLibrary> 헤더 같은 것에 모조리 들어가 한 통으로 섞여있는 것이 아니라 몇 개의 기능과 관련된 함수들이 수십 개의 헤더에 흩어져 선언되어 있지요.  

이와 같은 방법은 확장에도 매우 편하지요. 그러니 자주 사용하도록 합시다.

#### ***End Note***
***
- 멤버 함수보다는 비멤버 비프렌드 함수를 자주 쓰도록 합시다. 캡슐화 정도가 높아지고, 패키징 유연성도 커지며, 기능적인 확장성도 늘어납니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>