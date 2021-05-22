---
published: true
layout: single
title: "[Effective C++] 3. 낌새만 보이면 const를 들이대 보자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  

*Effective C++ 제 3판 - Chapter 1 - 3*
* * *

const 키워드가 붙은 객체는 외부에서의 변경이 불가능하게 한다라는 제약사항을 걸 수 있습니다. 어떤 값은 불변이여야 한다는 개발자의 의도를 컴파일러와 다른 개발자들과 공유할 수 있는 수단이 될 수 있죠. const는 파일, 함수, 블록 유효범위에서의 static으로 선언한 객체, 클래스 내부의 정적 멤버, 비정적 데이터 멤버의 상수 선언 등 엄청나게 많은 곳에 사용될 수 있습니다. 포인터는 어떨까요? 포인터 자체를 상수로, 혹은 포인터가 가리키는 데이터를 상수로 지정할 수 있는데, 둘 다 지정할 수도 있고 아무것도 지정하지 않을 수도 있습니다.  
#### const 포인터 사용법
***  

아래의 예는 포인터와 관련된 const 문법 입니다. *를 기준으로 const가 좌측에 있으면 **포인터가 가리키는 대상**이 상수, const가 *를 기준으로 우측에 있으면 **포인터 자체가** 상수라는 의미 입니다.

```c++
char greeting[] = "Hello";

char* p = greeting;

const char* p = greeting;
// char const * p = greeting; (위와 동일) 

char * const p = greeting;

const char * const p = greeting;
```  
<br>
무슨 차이가 있냐구요? 아래 예제를 통해 보시죠.
```c++
#include <iostream>

int main()
{
  char greeting[] = "Hello";

  const char* p = greeting;
  p = "Hi";
  //p[1] = 'X'; // error 발생

  std::cout << p << std::endl;
  return 0;
}
```  

방금 보여드린 예제는 const가 *의 좌측에 위치하고 있습니다. **포인터가 가리키는 대상**이 상수입니다. 포인터가 가르키는 대상을 통째로 바꿀 수는 있지만, 포인터가 가르키는 대상인, "Hello"를 변경할 순 없습니다. 다음은 const가 *의 우측에 위치할 때 입니다.  

```c++
#include <iostream>

int main()
{
  char greeting[] = "Hello";

  char* const p = greeting;
  //p = "Hi"; // error 발생
  p[1] = 'X'; 

  std::cout << p << std::endl;
  return 0;
}
```  

이 경우는 반대로 포인터가 가르키는 대상을 변경할 수 없고, 실제 포인터의 데이터는 변경할 수 있습니다. 그렇다면  **포인터가 가리키는 대상**과 **포인터 자체** 모두를 외부에서 변경하지 못하도록 하려면 어떻게 해야할까요?. const 사용시 *의 좌측과 우측 모두에 const를 추가하면 됩니다. (평소 잘 사용하지 않아서 그런지 어색하다고 느껴지는군요) 

```c++
#include <iostream>

int main()
{
  char greeting[] = "Hello";

  const char* const p = greeting;
  //p = "Hi"; // error 발생
  //p[1] = 'X'; // error 발생

  std::cout << p << std::endl;
  return 0;
}
```

#### 함수 반환 값을 const로 선언하라
***

const는 함수 선언문에 있어서, 함수 반환 값, 각각의 매개 변수, 멤버 함수 앞, 함수 전체에 대해 const의 성질을 부여할 수 있습니다. 그 중에서도 함수 반환 값을 상수로 정해주면, 안전성이나 효윬을 포기하지 않고도 사용자측의 에러 발생을 줄이는 효과를 볼 수 있습니다. 아래 코드의 예를 같이 볼까요?  

```c++
#include <iostream>

class Rational
{
public:
  Rational()
    : x(0), y(0)
  { }

  Rational(double _x, double _y)
    : x(_x), y(_y)
  { }

  ~Rational()
  { }

  double x;
  double y;
};

const Rational operator*(const Rational& lhs, const Rational& rhs)
{
  Rational rational;
  rational.x = lhs.x * rhs.x;
  rational.y = lhs.y * rhs.y;

  return rational;
}

const bool operator==(const Rational& lhs, const Rational& rhs)
{
  bool isEqual = false;
  if ((lhs.x == rhs.x)
    && (lhs.y == rhs.y))
  {
    isEqual = true;
  }

  return isEqual;
}

int main()
{
  Rational a(1.0, 1.0);
  Rational b(2.0, 2.0);
  Rational c(2.0, 2.0);

  if ((a * b) == c)
  {
    std::cout << "Same!!" << std::endl;
  }

}
```  

책에서는 요점만 적혀 있지만, 대충이나마 코드를 작성해보았습니다. (실제로 유리수 클래스는 위와 같이 동작하지 않을 겁니다) 굳이 operator* 함수의 반환 값이 상수 객체일 이유가 있냐는 의견을 내실 수 있습니다. 하지만 아래 예를 보시죠, 반환 값이 상수 객체가 아닐 경우 아래와 같은 실수가 발생할 수 있습니다.  
```c++
Rational a, b, c;
...
(a * b) = c;
```

위의 코드는 a, b 타입이 기본제공 타입이었다면 문법 위반에 걸리는 코드 입니다. 훌륭한 사용자 정의 타입들의 특징 중 하나는 기본제공 타입과의 쓸데없는 비호환성을 피한다는 것 입니다. 위의 경우가 바로 그러한 경우지요. 함수의 반환을 const로 선언하므로서 의도하지 않은 실수를 미연에 방지할 수 있을 것이니 적극 활용해보시며 좋을 것 같습니다.


#### 상수 멤버 함수
***
멤버 함수에 붙는 const 키워드의 역할은 "해당 멤버 함수가 상수 객체에 대해 호출될 함수이다"라는 사실을 알려주는 것입니다. 그렇다면 이 함수가 왜 중요할까요? 이유는 2가지인데 첫째는 클래스의 인터페이스를 이해하기 좋게 하기 위해서 입니다. 그 클래스로 만들어진 객체를 변경할 수 있는 함수는 무엇이고, 또 변경할 수 없는 함수는 무엇인가를 사용자 쪽에서 알고 있어야 하는 것입니다. 둘째는 이 키워드를 통해 상수 객체를 사용할 수 있게 하자는 것인데, 코드의 효율을 위해 아주 중요한 부분이기도 합니다. C++의 핵심 기법 중 하나인 객체 전달을 참조자(&)로 진행하는 것인데 이 방법을 제대로 사용하려면 상수 상태로 전달된 객체를 조작할 수 있는 const 멤버 함수, 즉 상수 멤버 함수가 준빋되어 있어야 한다는 것이 바로 포인트 입니다.  

참고로 const 키워드가 있고 없고의 차이만 있는 멤버 함수들은 오버로딩이 가능합니다. C++의 중요한 성질이니 꼭 외워 두셔야 합니다. 아래 클래스의 예를 한번 보시죠.

```c++
#include <iostream>

class TextBlock
{
public:
  TextBlock(std::string _text)
    : text(_text)
  {

  }

  // 상수 객체에 대한 operator[]
  const char& operator[](std::size_t position) const
  {
    return text[position];
  }

  // 비상수 객체에 대한 operator[]
  const char& operator[](std::size_t position)
  {
    return text[position];
  }
private:
  std::string text;
};

int main()
{
  TextBlock tb("Hello");
  std::cout << tb[0] << std::endl;

  const TextBlock ctb("World");
  std::cout << ctb[0] << std::endl;

  std::cout << tb[0];
  tb[0] = 'x';
  std::cout << ctb[0];
  ctb[0] = 'x'; // 컴파일 error 발생
}
```

위의 예에서는 operator[]를 오버로드했기 때문에 상수 객체와 비상수 객체에 따라 쓰임새가 달라집니다. 참고로 주의할 것이 하나 있는데 넷째 줄에서 발생한 에러는 순전히 operator[]의 반환 타입 때문에 생긴 것이라는 점입니다. operator[]의 반환 타입이 const가 붙어있어서, 대입 연산 때 발생하는 에러 입니다.  

또 하나 더 눈여겨 볼 것이 있습니다. operatorp[]의 비상수 멤버는 char의 참조라를 반환한다라는 것인데, char 하나만 쓰면 안 된다는 점을 꼭 주의하세요. operatorp[]가 그냥 char를 반환하게 만들어져 있으면, 다음과 같은 코드는 컴파일이 불가능할 것 입니다.
```c++
  tb[0] = 'x';
```

너무 당연하죠?, 기본제공 타입을 반환하는 함수의 반환 값을 수정하는 일은 절대로 있을 수 없습니다. 설령 이것이 가능하다고 해도 **값에 의한 반환**을 수행하는 C++의 성질이 있기 때문에 불가능 합니다. 즉 수정 되는 값은 본래 반환 값의 복사본이라는 점이지요.

#### 물리적 상수성(physical constness) & 논리적 상수성(logical constness)
자, 어떤 멤버 함수가 상수 멤버라는 것이 대체 어떤 의미일까요? 여기에는 2가지 개념이 있습니다. 바로 물리적 상수성과 논리적 상수성입니다. 물리적 상수성(비트수준 상수성)은 어떤 멤버 함수가 그 객체의 어떤 데이터 멤버도 건드리지 않아야 합니다(이 때 정적 멤버는 제외). 즉 멤버 함수가 const이고, 그 객체를 구성하는 비트들 중 어떤 것도 바꾸면 안된다는 것 입니다. 사실 C++에서 정의하고 있는 상수성이 비트수준 상수성 이지요. 비트수준 상수성을 사용하면 상수성 위반을 발견하는 것은 매우 쉽습니다. 컴파일러는 멤버에 대해 대입 연산이 수행 되었는지만 확인하면 됩니다.   

그런데, const로 올바르게 동작하지 않는데도 이 비트수준 상수성 검사를 통과하는 멤버 함수들이 있습니다. 어떤 포인터가 **가리키는 대상**을 수정하는 멤버 함수들 중 상당수가 이런 안타까운 경우에 속하고 있습니다. 잘 이해가 안가신다구요? 아래 예제를 봅시다.  

```c++
class CTextBlock
{
public:
  ...
  char& operator[](std::size_t position) const
  {
    return pText[position];
  }

private:
  char *pText;
};

int main()
{
  const CTextBlock cctb("Hello");
  char* pc = &cctb[0];
  *pc = 'J';

  return 0;
}
```

위의 예제를 보면 operator[] 함수가 const 멤버 함수로 선언되어 있습니다. 잘 아시겠지만 const 멤버 함수는 함수 내부에서 클래스의 멤버를 변경할 수 없습니다. 즉 **변경할 수 없다**라는 의미는 클래스 멤버에 대입 연산을 수행할 수 없다는 것 입니다. 그런데 상수 멤버 함수를 호출했더니 값이 변해버렸습니다. 심지어 반환 받은 객체는 상수 객체임에도 멤버 값의 변경이 발생하고 있습니다 (끔찍합니다).  

논리적 상수성이란 개념은 이런 황당한 상황을 보완하는 대체 개념으로 나오게 되었습니다. 논리적 상수성이란 상수 멤버 함수라고해서 객체의 한 비트도 수정할 수 없는 것이 아니라 일부 몇 비트 정도는 바꿀수 있되, 사용자측에서 알아채지 못하게만 하면 상수 멤버의 자격이 있다는 것 입니다. 자 다음의 예제는 논리적 상수성을 만족하는 코드의 예입니다. 하지만 비트 수준의 상수성은 만족하지 않습니다. 예제를 같이 볼까요?

```c++
class CTextBlock 
{
public:
  ...
  std::size_t length() const;

private:
  char *pText;
  std::size_t textLength;
  bool lengthIsValid;
};

std::size_t CTextBlock::length() const
{
  if (!lengthIsValid)
  {
    textLength = std::strlen(pText);
    lengthIsValid = true;
  }

  return textLength;
}
```

위 예제의 상수 멤버 함수 length()의 구현은 너무나도 명백히 비트 수준의 상수성과 멀리 떨어져 있습니다. 그렇지만 CTextBlock의 상수 객체에 대해서는 당연히 아무 문제가 없어야 할 것 같은 코드 입니다. 하지만 코드는 비트 수준의 상수성을 유지하지 않는다는 명분으로 Error를 발생할 것 입니다. 이런 경우 어떻게 해야할까요? 해답은 간단합니다. 바로 mutable을 사용하는 것 입니다. mutable은 비정적 데이터 멤버를 비트수준의 상수성의 족쇄에서 풀어줍니다. 즉 아래와 같이 mutable을 사용함으로서 비트 수준의 상수성이 약간 위배되더라도 논리적 상수성을 만족시켜 프로그래밍할 수 있습니다.  

```c++
class CTextBlock 
{
public:
  ...
  std::size_t length() const;

private:
  char *pText;
  mutable std::size_t textLength;
  mutable bool lengthIsValid;
};

std::size_t CTextBlock::length() const
{
  if (!lengthIsValid)
  {
    textLength = std::strlen(pText);
    lengthIsValid = true;
  }

  return textLength;
}
```

즉 정리하자면, 컴파일러에 아무 문제가 없는 **비트 수준의 상수성**을 지키는 것 뿐만 아니라 코딩을 할 때 반드시 **논리적 상수성**을 염두해두어야만 한다는 것 입니다.

#### 상수 멤버 및 비상수 멤버 함수에서 코드 중복 현상을 피하는 방법
mutable은 비트 수준 상수성의 문제를 해결하는 꽤 괜찮은 방법입니다. 하지만 이것으로 const에 관련된 골칫거리 전부를 말끔히 씻어내진 못합니다. 또 예를 들어보죠 operator[] 함수가 지금은 특정 문자의 참조자만 반환하고 있지만, 이것 말고도 여러 가지를 더 할 수도 있을 것 입니다. 경계 검사, 접근정보 로깅, 내부잘 무결성 검증 등이 있겠지요. 이런저런 코드를 상수/비상수 버전의 함수 2개 모두에 넣어 버리면 어느덧 중복 코드 판박이 괴물이 우리 앞에 나타납니다. 다음 예제를 보시죠.

```c++
class TextBlock
{
public:
  ...

  const char& operator[](std::size_t position) const
  {
    ... // 경계 검사
    ... // 접근 데이터 로깅
    ... // 자료 무결성 검증
    return text[position];
  }

  char& operator[](std::size_t position)
  {
    ... // 경계 검사
    ... // 접근 데이터 로깅
    ... // 자료 무결성 검증
    return text[position];
  }

private:
  std::string text;
}
```

이 경우 코드를 줄일 수 있는 방법이 과연 있을까요?, 물론 경계 검사, 접근 데이터 로깅, 자료 무결성 검증등의 코드를 함수화하여 상수/비상수 버전의 함수에서 각각 호출하게 하면 코드의 양은 줄어들지도 모릅니다. 하지만 근본적인 중복 문제는 해결하지 못합니다.  

기본적으로 캐스팅은 지양해야하는 방법입니다. 하지만 코드 중복도 결코 만만히 볼 문제가 아닙니다. operator[]의 상수 버전은 비상수 버전과 정확히 하는 일이 같습니다. const 키워드가 더 붙어있다는 것뿐이죠. 결론적으로 코드 중복을 피하는 방법은 비상수 operator[]가 상수 버전을 호출하도록 구현하는 것입니다. 아래의 예를 보시죠.

```c++
class TextBlock
{
public:
  ...
  const char& operator[](std::size_t position) const
  {
    ...
    ...
    ...
    return text[position];
  }

  char& operator[](std::size_t position)
  {
    return const_cast<char&>(static_cast<const TestBlock&>(*this)[position]);
  }
};
```

이 코드를 처음 봤을 때 저는 왜 캐스팅을 2번하고 있을까라고 생각했습니다. 하지만 책의 설명을 보고나니 바로 이해할 수 있었습니다. 바로 비상수 operator[] 내부에서 비상수 operatorp[]를 재귀적으로 호출하는 문제가 발생하기 때문에 상수 함수로 캐스팅 해주어야 하는 것 입니다. 즉 첫번째로 const 키워드를 붙여서 상수 함수를 호출하게 하고 반환할 때는 const를 떼서 반환하는 것이죠. (저는 이 아름다운 코드를 보고 감명을 받았습니다.)  

자, 그렇다면 우리는 생각해볼 수 있습니다. 비상수 함수를 구현하고 상수함수에서 비상수 함수를 캐스팅하여 사용하는 코드를 구현할 수는 없는가? 하고 말이죠. 그것은 우리가 의도한바가 아닙니다. 상수 멤버 함수는 해당 객체의 논리적인 상태를 바꾸지 않겠다고 컴파일러와 약속한 함수인 반면, 비상수 함수는 아닙니다. 또한 상수 함수에서 비상수 함수를 호출하려면 const_cast를 적용해서 const를 떼어내야 하는데 이것은 온갖 재앙의 씨앗이라고 볼 수 있습니다. **즉 상수 함수 내부에서 비상수 함수를 casting하여 호출하는 것은 해서는 안됩니다**.

#### ***End Note***
자! 마지막으로, 공부한 내용 중 중요하다고 생각되는 것들을 정리해봅시다.

- 포인터 변수에 const를 사용할 때 *를 기준으로 좌측은 포인터가 가르키는 대상을 우측은 포인터 자체를 상수로 만든다.
- 멤버 함수의 반환 값에 const를 붙여서 실수를 미연에 방지하라.
- 객체 멤버의 값을 변경할 수 있는 권한을 가진 멤버 함수를 구분하기 위해 const를 사용하라.
- 상수 멤버 함수의 반환형으로 참조자를 사용할 경우, 값을 반환 받은 곳에서 멤버의 값 변경이 발생할 수 있습니다. 이를 방지하기 위해 컴파일러 수준에서는 비트 수준의 상수성을 지키고 코딩할 때는 논리적 상수성을 사용해야 합니다.
- 상수/비상수 함수의 코드 중복을 피하기 위해서는 casting을 활용할 수 있습니다. 단 사용시에는 안전성을 위해서 비상수 함수 내부에서 상수 함수를 캐스팅하여 사용하는 방식으로 사용해야만 합니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>