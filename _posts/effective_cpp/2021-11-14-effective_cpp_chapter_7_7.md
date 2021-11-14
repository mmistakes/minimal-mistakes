---
published: true
layout: single
title: "[Effective C++] 47. 타입에 대한 정보가 필요하다면 특성정보 클래스를 사용하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

STL은 기본적으로 컨테이너(Container), 반복자(iterator), 알고리즘(algorithm)의 템플릿으로 구성되어 
있고 그 외에 유틸리티(utility)라고 불리는 템플릿도 몇 개 들어 있습니다.
  
그 중에는 advance라는 이름의 템플릿이 있는데, 이 템플릿이 하는 일은 지정된 반복자를 지정된 거리만큼 이동시키는 것 입니다.
  
간단한 개념만 놓고 볼 때 단순하게 iter += d만 하면 될 것 같지만, += 연산을 지원하는 반복자는 임의 접근 반복자밖에 없기 때문에 그렇게 할 수 없습니다.
  
반복자들이 종류마다 가능한 것이 있고 불가능한 것이 있다는 점 때문에 각각의 구현을 모두 다르게 해주어야겠지요. 그렇지만 만약 임의 접근 반복자와 나머지 반복자를 
구분할 수 있다면 아래와 같이 구현하는 것이 가능할 것 입니다.

```c++
template<typename IterT, typename DistT>
void advance(IterT& iter, DistT d)
{
  if(iter가 임의 접근 반복자이다)
  {
    iter += d;
  }
  else
  {
    ...
    // 한칸씩 이동.
    ...
  }
}
```

우리는 이것을 구분할 수단이 있을까요? 지금 사용가능한 것이 바로 특성정보(traits)라는 것 입니다. 특성정보란, 
컴파일 도중에 어떤 주어진 타입의 정보를 얻을 수 있게 하는 객체를 지칭하는 개념입니다.
  
특성정보는 C++에 미리 정의된 문법구조가 아니며, 키워드도 아닙니다. 그냥 C++ 프로그래머들이 따르는 구현 기법이며 관례 입니다. 
(물론 현재의 C++에서는 type_traits이라는 헤더를 지원하고 있습니다.) 참고로 특성정보를 구현할 때 아래와 같은 관례를 지켜야 합니다.
- 특성정보는 기본제공 타입과 사용자 정의 타입에서 모두 동작해야한다.
- 특성 정보는 항상 구조체로 구현한다.

특성정보를 다루는 표준적인 방법은 특성정보를 템플릿 및 템플릿의 1개 이상의 특수화 버전에 넣는 것입니다. 반복자의 경우, 
표준 라이브러리의 특성정보용 템플릿이 iterator_tratis라는 이름으로 준비되어 있습니다.

```c++
template<typename IterT>
struct iterator_traits;
```

위처럼 특성정보를 구현하는 데 사용한 구조체를 가리켜 특성정보 클래스라고 부릅니다.

```c++
template< ... > // 템플릿 매개 변수는 편의상 생략
class deque
{
public:
  class iterator
  {
    public:
      typedef random_iterator_tag iterator_category;
      ...
  };
  ...
};
```

```c++
template< ... > // 템플릿 매개 변수는 편의상 생략
class list
{
public:
  class iterator
  {
    public:
      typedef bidirectional_iterator_tag iterator_category;
      ...
  };
  ...
};
```

iterator_tratis가 동작하는 방법은 이렇습니다. iterator_traits<IterT> 안에는 IterT 타입 각각에 대해 
iterator_category라는 이름의 typedef 타입이 선언되어 있습니다. 이렇게 선언된 typedef 타입이 바로 IterT의 반복자 범주를 가리키는 것입니다.
  
iterator_tratis 클래스는 이 반복자 범주를 두 부분으로 나누어 구현합니다. 첫번째 부분은 사용자 정의 반복자 타입에 대한 구현인데, 
사용자 정의 반복자 타입(컨테이너의 내부 클래스로 정의된 반복자)으로 하여금 iterator_category라는 이름의 typedef 타입을 내부에 가질 것을 요구합니다.
  
이 내부 클래스 iterator가  지닌 중첩 typedef 타입을 동일하게 맞춰놓은 것이 iterator_tratis 입니다.

```c++
template<typename IterT>
struct iterator_traits
{
  typedef typename IterT::iterator_category iterator_category;
  // iterator_traits*::iterator_category라는 문법은 말도 안됨.
  ...
};
```

아직 끝나지 않았습니다. 위의 코드는 사용자 정의 타입에 대해서는 잘 돌아가지만, 반복자의 실제 타입이 포인터인 경우에는 전혀 동작하지 않습니다.
포인터 안에 typedef 타입이 중첩된다는 것부터가 도무지 말이 안되기 때문입니다.
  
여기서 iterator_tratis의 두번째 부분이 나옵니다. 반복자 포인터의 처리 부분이지요.

```c++
template<typename IterT>
struct iterator_traits<IterT*>
{
  typename random_access_iterator_tag iterator_category;
  ...
};
```

포인터 타입을 지원하기 위해 포인터 타입에 대한 부분 템플릿 특수화 버전을 제공하고 있습니다.
  
이제 특성정보 클래스의 설계 및 구현 방법에 대해 감을 잡았을 것 입니다.
- 다른 사람이 사용하도록 열어 주고 싶은 타입 관련 정보를 확인합니다. (예를 들어 반복자라면 반복자 범주 등이 여기에 해당합니다.)
- 그 정보를 식별하기 위한 이름을 선택합니다. (예: iterator_category)
- 지원하고자 하는 타입 관련 정보를 담은 템플릿 및 그 템플릿의 특수화 버전(예: iterator_tratis)을 제공합니다.

```c++
template<typename IterT, typename DistT>
void advance(IterT& iter, DistT d)
{
  if (typeid(typename std::iterator_traits<IterT>::iterator_category)
  == typeid(std::random_access_iterator_tag))
  ...
}
```

```c++
template<typename IterT, typename DistT>
void doAdvance(IterT& iter, DistT T, std::random_access_iterator_tag)
{
  iter += d;
}

template<typename IterT, typename DistT>
void doAdvance(IterT& iter, DistT d, std::input_iterator_tag)
{
  if(d < 0)
  {

  }
  while (d--) ++iter;
}

template<typename IterT, typename DistT>
void doAdvance(IterT& iter, DistT d, std::input_iterator_tag)
{
  if (d < 0)
  {
    throw std::out_of_range(*Negative distance*);
  }
  while (d--) ++iter;
}
```

이제 advance가 해 줄 일은 오버로딩된 doAdvance를 호출하는 것뿐입니다. 이때 컴파일러가 오버로딩 모호성 해결을 통해 
적합한 버전을 호출할 수 있도록 반복자 범주 타입 객체를 맞추어 전달해야겠지요.

```c++
template<typename IterT, typename DistT>
void advance(IterT& iter, DistT d)
{
  doAdvance
  {
    iter, d,
    typename std::iterator_traits<IterT>::iterator_category()
  };
}
```
  
특성 정보 클래스를 어떻게 사용하는지, 마지막으로 깔끔하게 정리해봅시다.
- 작업자(worker) 역할을 맡은 함수 혹은 템플릿(예: doAdvance)을 특성정보 매개변수를 다르게 하여 오버로딩합니다. 
그리고 전달되는 해당 특성정보에 맞추어 각 오버로드 버전을 구현합니다.
- 작업자를 호출하는 주작업자(master) 역할을 맡은 함수 혹은 템플릿(예: advance)을 만듭니다. 이때 특성정보 클래스에서 제공되는 정보를 넘겨서 작업자를 호출하도록 구현합니다.

#### ***End Note***
***
- 특성정보 클래스는 컴파일 도중에 사용할 수 있는 타입 관련 정보를 만들어냅니다. 
또한 특성정보 클래스는 템플릿 및 특수화 버전을 사용하여 구현합니다.
- 함수 오버로딩 기법과 결합하여 특성정보 클래스를 사용하면, 컴파일 타임에 결정되는 타입별 if...else 점검문을 구사할 수 있습니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>
