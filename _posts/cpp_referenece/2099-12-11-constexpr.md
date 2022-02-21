---
published: true
layout: single
title: "[C++] constexpr"
category: cppreference
tags:
comments: true
sidebar:
  nav: "mainMenu"
--- 
* * *

#### 정수 상수식(Integral constant expression)
* * *
- 컴파일 타임에 결정되는 정수 값을 가지는 상수  
ex) int arr[size] 구문의 size , enum A { a = number, b, c }; 구문의 number
  
#### constexpr
* * *
- 어떠한 식이 상수식 이라고 명시해주는 키워드
- constexpr의 우측에는 반드시 다른 상수식이 와야 한다.
- const의 경우 런타임/컴파일타임 중 언제 초기화 될 지 알 수 없지만 constexpr의 경우
반드시 컴파일 타임에 초기화 된다.


#### constexpr 함수
* * *

```c++
#include <iostream>

int factorial(int N) {
  int total = 1;
  for (int i = 1; i <= N; i++) {
    total *= i;
  }
  return total;
}

template <int N>
struct A {
  int operator()() { return N; }
};

int main() { A<factorial(5)> a; } // 컴파일 에러 발생
```

위 예제에서 컴파일 에러가 발생하는데, 그 이유는 factorial(5)의 값을 컴파일 타임에는 알 수 없기 때문. 그래서 전통적으로 
템플릿 메타 프로그래밍 방식으로 사용해야 했음.

```c++
#include <iostream>

template <int N>
struct Factorial {
  static const int value = N * Factorial<N - 1>::value;
};

// 아래 특수화를 통해 컴파일 타임에 값 유추 가능
template <>
struct Factorial<0> {
  static const int value = 1;
};

// 템플릿 인자 N 값을 operator()을 사용하여 반환하는 Warpper
// operator() 호출에 사용되는 파라미터가 없으므로 operator()()
template <int N>
struct FuncWrapper {
  int operator()() { return N; }
};

int main() {
  // 컴파일 타임에 값이 결정되므로 템플릿 인자로 사용 가능!
  FuncWrapper<Factorial<10>::value> func;
  std::cout << func() << std::endl;
}
```
<br>
그런데 constexpr 사용하면 복잡한 TMP 구현하지 않고 함수의 반환 값을 컴파일 타임 상수로 만들 수 있음 (단, 조건에 맞추어 사용해야 함)
```c++
#include <iostream>

constexpr int Factorial(int n) {
  int total = 1;
  for (int i = 1; i <= n; i++) {
    total *= i;
  }
  return total;
}

template <int N>
struct FuncWrapper {
  int operator()() { return N; }
};

int main() {
  FuncWrapper<Factorial(10)> func;
  std::cout << func() << std::endl;
}
```
<br>
**constexpr 함수 조건**  
- C++ 11 : 함수 내부에서 변수들을 정의할 수 없고, return 문은 딱 하나만 있어야 함.  
- C++ 14 : **goto 문, 예외 처리, 리터럴 타입이 아닌 변수의 정의, 초기화 되지 않은 변수의 정의, 실행 중간에 constexpr 함수가 아닌 함수 호출**을 제외한 모든 수행 가능  
- 조건에 맞지 않을 경우 컴파일 에러 발생  
- constexpr 함수에 컴파일 타임 상수가 아닌 값을 전달하면 일반 함수처럼 동작함.  
  
#### constexpr 생성자
* * *
- constexpr 로 생성자의 경우 일반적인 constexpr 함수에서 적용되는 제약조건들이 모두 적용 됨.
- constexpr 생성자의 인자들은 반드시 리터럴 타입이여야만 하고, 해당 클래스는 다른 클래스를 가상 상속 받을 수 없음.

#### Reference 
***  
- ***<https://modoocode.com/293>***