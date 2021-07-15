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

RAII 클래스를 사용할 때면 내부의 자원을 직접 참조해야하는 경우가 많습니다. 그래서 get()과 같은 메소드를 만들어서 내부의 자원을 직접 가져와 사용하도록 만드는 분들이 많지요.

또한 더 고급적인 코딩 스킬을 사용하여 RAII 클래스 걸계자 중에 암시적 변환 함수를 제공하여 자원 접근을 매끄럽게 할 수 있도록 만드는 분도 있습니다.  

예를 들어 어떤 하부 수준 C API로 직접 조작이 가능한 폰트를 RAII 클래스로 둘러싸서 쓰는 경우를 생각해 봅시다.

#### 명시적 & 암시적 변환 방법
***

```c++
typedef int FontHandle;

FontHandle getFont()
{
  FontHandle dummyFontHandle = 25;
  return dummyFontHandle;
}

class Font
{
public:
  explicit Font(FontHandle fh)
    : m_fontHandle(fh)
  {}

  ~Font() 
  { 
    releaseFont(m_fontHandle); 
  }

  void releaseFont(FontHandle fh);
  FontHandle get() const;
  operator FontHandle() const;

private:
  FontHandle m_fontHandle;
};

void Font::releaseFont(FontHandle fh)
{
  std::cout << "release fontHandle : " << fh << std::endl;
}

FontHandle Font::get() const
{ 
  return m_fontHandle; 
}

Font::operator FontHandle() const
{
  return m_fontHandle;
}

int main()
{
  Font f1(getFont()); // 10
  FontHandle f2 = f1;

  std::cout << "f1(Font).FontHandle : " << f2 << std::endl;
  std::cout << "f2(FontHandle) : " << f2 << std::endl;
}
```
<br>
위의 예를 보시면 get()은 명시적 형변환이고, operator()를 사용한 변환은 암시적 형변환 입니다. 예제만으로 다른 설명이 필요 없을 정도로 쉽습니다.  

다만 암시적 형변환이 명시적 형변환보다 항상 더 나은 선택이라고는 할 수 없습니다. 상황에 알맞게 선택하여 사용하는 것이 좋겠지요.

#### 캡슐화에 대한 고민
***
단, 이렇게 되면 Font 객체인 f1이 관리하고 있는 FontHandle이 f2를 통해서도 직접 사용할 수 있는 상태가 됩니다. 객체 지향에 대해 조금이라도 알고 계신다면 앞서 말한 상황이 캡슐화에 위배되는 것이 아닌가하고 고민해볼 수 있겠지요. 하지만 괜찮습니다!. 표준라이브러리를 포함하여 이미 많은 곳에서 그러한 느슨한 방법을 사용 중입니다.

그러니 RAII 클래스 설계시에는 RAII가 관리하고 있는 자원에 직접 접근할 수 있는 방법을 마련해주는 것이 좋습니다. 스마트 포인터에서는 get()이라는 명시적 변환을 수행하는 함수가 이미 있습니다.

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