---
published: true
layout: single
title: "[Effective C++] 21. 함수에서 객체를 반환해야 할 경우에 참조자를 반환하려고 들지 말자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

앞서 공부한 내용에 이어서 알아보겠습니다. 값에 의한 반환을 하고 있는 코드들을 참조에 의한 반환을 하도록 변경하는 것은 어떨까요? 결론부터 말하자면 좋은 생각은 아닙니다.

아래처럼 유리수를 나타내는 클래스가 하나 있다고 칩시다.

```c++
class Rational
{
public:
    Rational(int numerator = 0, int denominator = 1)
    ...

private:
    int n, d;

friend const Rational operator*(const Rational& lhs, const Rational&& rhs);
}
```

그리고 operator* 함수는, 클래스 간의 곱셈 결과를 값으로 반환하도록 선언되어 있습니다. 만약에 값이 아닌 참조자를 반환한다면 어떻게 될까요? 비용 부담은 확실이 없을 것 입니다.  

하지만 참조자에 대해 한번 더 생각해보셔야 합니다. 참조자는 그냥 이름 입니다. 만약 operator*가 참조자를 반환하도록 만들어졌다면, 이 함수가 반환하는 참조자는 반드시 이미 존재하는 Rational 객체의 참조자이어야만 합니다.

```c++
Rational a(1, 2);
Rational b(3, 5);
Rational c = a * b;
```

위의 코드에서 c에 대입하는 객체가 이미 생성되어 있어야 하는데 그렇지 않다는 뜻 입니다. 함수 수준에서 새로운 객체를 만드는 방법은 딱 2가지 입니다. 스택, 그리고 힙에 만드는 것이지요. 아래와 같이 스택에 할당한 경우는 어떨까요?

```c++
const Rational& operator(const Rational& lhs, const Rational& rhs)
{
    Rational result(lhs.n * rhs.n, lhs.d * rhs.d);
    return result;
}
```

당연히 말도 안됩니다. 괄호를 빠져나가는 순간 result는 소멸 됩니다. 그렇다면 힙에 동적 할당한 경우는 어떨까요?

```c++
const Rational& operator(const Rational& lhs, const Rational& rhs)
{
    Rational *result = new Rational(lhs.n * rhs.n, lhs.d * rhs.d);
    return *result;
}
```

여전히 생성자가 한번 호출되는 것은 마찬가지입니다. new로 할당한 메모리를 초기화할 때 생성자가 호출되니깐요. 게다가 delete 처리 또한 누락할 가능성이 다분합니다.  

또 다른 방법들이 있을까요? 지역 정적 객체를 operator* 메서드 내부에 만든다구요? 또는 지역 정적 객체 배열을 만들어서 쓰자구요? 모두 말도 안되는 방법 들입니다.

반환 시에 비용을 줄이는 것은 중요한 과제 중 하나입니다. 하지만 이것 저것 따져보면 그것은 올바른 동작에 지불되는 작은 비용에 불과합니다. 여러분이 병적으로 신경쓰지 않아도 이미 대부분의 컴파일러에서 최적화를 대신 해주고 있습니다.  

참고로, 메서드에서 참조 반환을 아예 사용하지 않는 것은 아닙니다. Singletone 패턴에서 팩터리 메서드와 함께 사용 될 수 있겠지요. (물론 Mutex, Semapohre가 함께 사용되어야 Thread-safety 하겠지요)

#### ***End Note***
*** 
- 지역 스택 객체에 대한 포인터나 참조자를 반환하는 일, 혹은 힙에 할당된 객체에 대한 참조자를 반환하는 일, 또는 지역 정적 객체에 대한 포인터나 참조자를 반환하는 일은 그런 객체가 두 개 이상 필요해질 가능성이 있다면 절대 하지 맙시다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>