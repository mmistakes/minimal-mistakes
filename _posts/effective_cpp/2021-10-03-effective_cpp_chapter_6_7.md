---
published: true
layout: single
title: "[Effective C++] 38. \"has-a\" 혹은 \"is-implemented-in-terms-of\"를 모형화할 때는 객체 합성을 사용하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

합성이란, 어떤 타입의 객체들이 그와 다른 타입의 객체들을 포함하고 있을 경우에 성립하는 그 타입들 사이의 관계를 일컫습니다. 포함된 객체들을 모아서 이들을 포함한 다른 객체를 합성한다는 뜻인데, 이를 테면 다음과 같은 경우에 해당합니다.  

```c++
class Address {...};

class PhoneNumber {...};

class Person 
{
public:
  ...

private:
  std::string name;
  Address address;
  PhoneNumber voiceNumber;
  PhoneNumber faxNumber;
};
```

항목 32에서 public 상속의 의미는 is-a라는 의미를 갖고 있다고 말씀드렸습니다. 객체 합성의 경우에도 의미가 있습니다. has-a 또는 is-implemented-in-terms-if가 바로 그것입니다. 이렇게 뜻이 두 개인 이유는 소프트웨어 개발에서 여러분이 대하는 영역(domain)이 두 가지이기 때문입니다.  

우리가 일상생활에서 흔히 볼 수 있는 사물을 본 뜻 것들, 이를 테면 사람, 이동수단, 비디오 프레임 등의 객체는 응용 영역에 속합니다. 응용 영역에 속하지 않는 나머지들은 버퍼, 뮤텍스, 탐색 트리 등은 구현 영역에 해당합니다. 여기서 객체 합성이 응용 영역의 객체들 사이에서 일어나면 has-a 관계 입니다. 구현 영역에서 일어나면 is-implemented-in-terms-of 인 것입니다.

위의 예제에서 Person 클래스가 나타내는 관계는 has-a 관계에 해당합니다. 위의 예제에서 is-a 관계와 has-a 관계의 역할을 헷갈리는 경우는 없습니다. 상대적으로 헷갈리는 부분이 is-a와 is-implemented-in-terms-of 관계의 차이점 입니다.  

차이점을 알기 위해서 상황을 가정해봅시다. 여러분이 std::list를 재활용하여 std::set보다 메모리 사용에 효율적인 Set 클래스를 직접 구현하게 되었다고 말입니다.

```c++
 template<typename T>
 class Set : public std::list<T> { ... };
```

모든 것이 순조롭게 흘러갈것 같지만 전혀 그렇지 않습니다. public 상속의 경우 is-a 관계가 성립하면 기본 클래스의 모든 것을 파생 클래스가 가지게 됩니다. 그렇게 되면 list는 중복 원소를 가질 수 있으므로 Set이 list라는 is-a 관계는 절대 성립하지 못합니다. 즉 Set 객체는 list 객체를 써서 구현되는 is implemented in terms of의 형태의 설계가 가능하다는 사실을 잡아내는 것 입니다.

```c++
template<class T>
class Set
{
public:
  bool member(const T& item) const;
  void insert(const T& item);
  void remove(const T& item);
  
  std::size_t size() const;

private:
  std::list<T> rep;
};
```

```c++
template<typename T>
bool Set<T>::member(const T& item) const
{
  return std::find(rep.begin(), rep.end(), item) != rep.end();
}

template<typename T>
void Set<T>::insert(const T& item)
{
  if (!member(item)) rep.push_back(item);
}

template<typename T>
void Set<T>::remove(const T& item)
{
  typename std::list<T>::iterator it =
    std::find(rep.begin(), rep.end(), item);

  if (it != rep.end()) rep.erase(it);
}

template<typename T>
std::size_t Set<T>::size() const
{
  return rep.size();
}
```

보시다 시피 너무 간단해서 인라인 함수로 만들어도 될 정도의 구현 입니다. 물론 인라인 함수로 만드는 것은 진지하게 고민해보아야할 사항이겠지만요. 결국 Set 클래스에서 중요한 것은 주렁주렁 인터페이스가 아니라 list와의 관계라는 것입니다. 이 관계는 is-a가 아니라 is-implemented-in-terms-of라는 것이지요.

#### ***End Note***
***
- 객체 합성의 의미는 public 상속이 가진 의미와 완전히 다릅니다.
- 응용 영역에서 객체 합성의 의미는 has-a 입니다. 구현 영역에서는 is-implemented-in-terms-of 입니다.


#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>