---
published: true
layout: single
title: "[Effective C++] 46. 타입 변환이 바람직할 경우에는 비멤버 함수를 클래스 템플릿 안에 정의해 두자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

모든 매개변수에 대해 암시적 타입 변환이 되도록 만들기 위해서는 비멤버 함수 밖에 없다는 것을 앞에서 공부했습니다. 
그렇다면 이번엔 조금 더 확장해서 비멤버 템플릿 함수에 대해 알아보도록 합시다.

```c++
template<typename T>
class Rational
{
public:
    Rational(const T& numerator = 0, const T& denominator = 1);

    const T numerator() const;
    const T denominator() const;
};


template<typename T>
const Rational<T> operator*(const Rational<T>& lhs, const Rational<T>& rhs)
{ ... }

Rational<int> oneHalf(1, 2);
Rational<int> result = oneHalf * 2; // Compile Error 발생
```

위의 Compile Error가 발생하는 이유는 무엇일까요? operator*의 첫번째 매개변수가 Rational<int>이기 때문에 T가 int라는 것을 쉽게 유추할 수 있습니다. 
하지만 두번째 매개변수의 타입을 유추하는 것으 녹록치 않습니다. 쉽게 생각해보면 컴파일러가 2를 
Rational<int> 타입으로 변환하고 이를 통해 T가 int라는 것을 유추할 수 있다고 생각하실 수 있지만, 그렇게 동작하지 못합니다. 
왜냐하면 템플릿 인자 추론 과정에서는 암시적 타입 변환이 고려되지 않기 때문입니다.
  
그렇다면 이러한 상황에서 어떤 방법을 사용할 수 있을까요? 지금 상황에서 타입 변환이 
자동으로 이루어지는 것이 컴파일러의 입장이든 사용자 입장이든 좋을 것 입니다.  

바로 클래스 템플릿 안에 프렌드 함수로 선언하므로서 문제를 해결할 수 있습니다.

```c++
template<typename T>
class Rational
{
public:
    ...
    // Rational<T> 대신 Rational을 써도 Rational<T>로 적용됨.
    friend const Rational<T> operator*(const Rational& lhs, const Rational& rhs);
};

template<typename T>
Rational<T> operator*(const Rational<T>& lhs, const Rational<T>& rhs)
{
    ...
}
```

템플릿 인자 추론은 함수 템플릿에서만 적용되는 과정이므로 클래스 템플릿의 
프렌드 함수는 컴파일러가 호출 시의 정황에 맞는 인자를 찾는데 어려움이 없게 됩니다.
  
하지만, 아직 끝나지 않았습니다. 위의 코드는 컴파일은 되지만 링킹은 여전히 동작하지 않습니다.

<details>
<summary>링크 에러 발생하는 실제 예제 코드 보기</summary>
<div markdown="1">
```c++
template<typename T>
class Rational
{
public:
    Rational(T _value)
        : value(_value)
    { }

    friend const Rational<T> operator*(const Rational<T>& lhs, const Rational<T>& rhs);

private:
    T value;
};

template<typename T>
Rational<T> operator*(const Rational<T>& lhs, const Rational<T>& rhs)
{
    return Rational<T>(lhs.value * rhs.value);
}

int main()
{
    Rational<int> a(5);
    Rational<int> b(5);
    Rational<int> c = a * b;
}
```
</div>
</details>
<br>
어떻게 하면 해결할 수 있을까요? 가장 간단하게 해결하려면 operator* 함수의 본문을 선언부와 붙이면 됩니다. 
하지만 복잡하게 구현된 함수의 경우 클래스 안에 inline으로 정의하는 것은 별로 좋은 방법이 아닙니다.
  
이 경우에 우리는 앞에서 공부했던 인라인 최적화에 써먹었던 방법을 사용할 수 있습니다.
```c++
template<typename T>
class Rational; // 클래스 선언

template<typename T>
const Rational<T> doMultiply(const Rational<T>& lhs, const Rational<T>& rhs)
{
    ...
}

template<typename T>
class Rational
{
public:
    ...
    // 프렌드 함수가 도우미 함수를 호출하게 만듭니다.
    friend const Rational<T> operator*(const Rational<T>& lhs, const Rational<T>& rhs)
    {
        return doMultiply(lhs, rhs);
    }
    ...
};
```
대다수의 컴파일러에서 템플릿 정의를 헤더 파일에 전부 넣을 것을 사실상 강제로 강요하다시피 하고 있으니, doMultiply 템플릿 함수도 헤더 파일안에 정의해 넣어야할 것 입니다.

물론 doMultiply는 템플릿으로서 혼합형 곱셈을 지원하지 못하겠지만 (doMultiply는 템플릿 함수라서 암시적 변환이 불가능하니깐요.)
  
사실, 지원할 필요가 없습니다. 왜냐하면 이 doMultiply는 operator*에서만 사용될 텐데, operator\*가 이미 혼합형 연산을 지원하고 있으니깐요.

#### ***End Note***
***
- 템플릿 인자 추론 과정에서는 암시적 타입 변환이 고려되지 않습니다.
- 모든 매개변수에 대해 암시적 타입 변환을 지원하는 템플릿과 관계가 있는 함수를 제공하는 클래스 템플릿을 만들려고 한다면, 
이런 함수는 클래스 템플릿 안에 프렌드 함수로서 정의 합시다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>
