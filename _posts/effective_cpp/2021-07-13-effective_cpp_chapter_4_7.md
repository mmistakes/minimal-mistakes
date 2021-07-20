---
published: true
layout: single
title: "[Effective C++] 24. 타입 변환이 모든 매개변수에 대해 적용되어야 한다면 비멤버 함수를 선언하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

아래의 클래스는 유리수를 나타내는 클래스 입니다.

```c++
class Rational
{
public:
  Rational(int numerator = 0, int denominator = 1);

  int numerator() const;
  int denominator() const;

private:
  ...
};
```

유리수를 나타내는 클래스인 만큼 덧셈이나 곱셈 등의 수치 연산은 기본으로 지원하고 싶을 겁니다. 이 때 비멤버 함수가 좋을까요, 아니면 비멤버 프렌드 함수가 좋을까요?  

뭐.. operator*는 Rational 클래스 자체와 관련이 있으니 클래스 안에 넣는게 자연스러울 것 같습니다. 자 다음 예제를 같이 볼까요?

```c++
class Rational
{
public:
  ...
  const Rational operator*(Const Rational& rhs) const;
};

...
...
Rational oneEnglish(1, 8);
Rational oneHalf(1, 2);
Rational result = oneHalf * oneEight;
result = result * oneEight;
...
...
```

하지만, 아래 예제를 보시죠. 혼합형 수치 연산을 할 수 없다는 사실을 금방 알게 될 것입니다.

```c++
result = oneHalf * 2;  // Good~~
result = 2 * oneHalf;  // Error!!
```

사칙 연산은 교환 법칙이 성립해야하는데, 예제를 보면 알 수 있듯이 교환 법칙이 성립하지 않습니다. 이 문제의 원인은 위의 두 예제를 함수 형태로 바꾸어 써보면 바로 드러납니다.

```c++
result = oneHalf.operator*(2);
result = 2.operator*(oneHalf);
```

Rational Class의 operator*는 int와 Rational을 취하지 않습니다. 이미 생성된 클래스 자기 자신과 매개변수 Rational을 취하고 있지요. 매개 변수는 생성자를 통해 int를 받아들일 수 있지만, 이미 생성된 객체는 int를 Rational로 둔갑시킬 수 없습니다.  

물론 이것은 생성자를 명시호출(explicit)로 선언하지 않았기 때문에 가능한 일이지요. 만약 명시호출 생성자였다면, 다음의 코드 중 어느 쪽도 컴파일되지 않습니다. 물론 혼합형 수치 연산에 대한 지원은 수포로 돌아갔지만, 최소한 두 문장의 동작은 일관되게 유지되겠지요.  

#### 암시적 타입 변환을 위해 비멤버 함수 사용
***
그렇다면 위에서 언급했던 두 개의 코드 모두가 동작하도록 하는 방법은 없는 걸까요?  

아래와 같이 비멤버 함수 operator*를 구현함으로서 암시적 변환을 모든 매개 변수에 적용시킬 수 있습니다.

```c++
class Rational
{
  ...
}

const Rational operator*(const Rational& lhs, const Rational& rhs)
{
  return Rational(lhs.numerator() * rhs.numerator(), lhs.denumerator() * rhs.denumerator());
}
```

자 그렇다면 마지막으로 operator* 함수는 Rational 클래스의 프렌드 함수로 두어도 괜찮을까요?  

지금의 예제에서는 '아니오'라고 답해야 옳습니다. operator*는 완전히 Rational의 public 인터페이스만을 써서 구현할 수 있기 때문이지요. 이후 뒷장에서 Rational을 클래스가 아닌 클래스 템플릿으로 만들다 보면, 고민해야 할 문제점이 지금 것과 다르고 이것을 해결하는 방법도 다를 것 입니다.

#### ***End Note***
***
- 어떤 함수에 들어가는 모든 매개변수(this 포인터가 가리키는 객체도 포함)에 대해 타입 변환을 해줄 필요가 있다면, 그 함수는 비멤버 함수이어야 합니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>