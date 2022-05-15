---
published: true
layout: single
title: "[C++] lvalue, rvalue, 우측값 레퍼런스, std::move"
category: cppreference
tags: 
comments: true
sidebar:
  nav: "mainMenu"
--- 
* * *

열심히 정리를 하고 있었는데, 도저히 아래의 글보다 잘 쓸 자신이 없어서 포기합니다. 
봐도봐도 헷갈리니 시간날 때마다 계속 봐야겠습니다. 이해가 안가는 설명은 여러번 곱씹다 보면 이해가 
갔는데 다시보면 또 이해가 안갈지도 모르겠습니다...
  
적어도 아래의 질문 정도는 답할 수 있도록 공부해야겠습니다.
- lvalue와 rvalue란?
- lvalue, glvalue, xvalue, rvalue, prvalue란?
- 우측값 레퍼런스란 무엇인가?
- std::move은 어떤 역할을 하는가?
- 우측값 레퍼런스 연산이 주로 사용 되는 곳?
- 우측값 레퍼런스가 좌측값, 혹은 우측값이 되는 기준?
- 우측값 레퍼런스를 인자로 받는 템플릿에서 인자가 좌측값이냐 우측값이냐에 따라 적용되는 규칙과 & 겹침 문법
- 우측값 레퍼런스를 사용하는 복사, 이동 연산자 오버로딩 시 주의할 점?
- 대입 연산을 우측 값 레퍼런스와 std::swap을 사용하여 구현 시 주의할 점?
- std::forword의 역할?
- 우측값 참조 예외처리하는 법?
- 암시적 move는 왜 없는가? 
  
아래는 반복해서 아래 포스팅들을 읽을 때, 곱씹다보면 이해가 된 부분에 대해 정리한 것 입니다.

#### 우측값 레퍼런스는 우측값 일까요?
* * *
- 아래와 같은 코드가 있을 때, #1에서 move되고 나면 #0의 x는 더 이상 사용할 수 없음.
- 하지만 #2에서 만약 x가 우측값이라고 C++에서 동작하게 정의되어있다면 #2 라인 밑에서 x에 접근하는 순간 미정의 동작에 빠지게 됨.
- 그래서 우측값 레퍼런스는 이름이 있냐 없냐에 따라 좌측값, 우측값 모두가 될 수 있음 (이름이 있다면 좌측값, 아니면 우측값)
```c++
void foo(X&& x) {
  X anotherX = x;  // #2 좌측값 이므로 X(X const & rhs) 가 호출됨
}

...
...

X x; // #0
foo(std::move(x)); // #1
```

#### 완벽한 전달(perfect forwarding)
* * *
아래와 같은 함수가 있을 때 우측 값에 대해서 동작할 수 없음
```c++
template <typename T, typename Arg>
shared_ptr<T> factory(Arg& arg) {
  return shared_ptr<T>(new T(arg));
}
```
<br>

그래서 아래와 같이 const를 붙이면 우측값 레퍼런스를
 인자로 받을 순 있어지지만 move 연산을 할 수 없다는 점과, factory가 여러개라면 모든 factory에 대해 오버로드 함수를 구현해야하는 불편함이 있었음.
```c++
template <typename T, typename Arg>
shared_ptr<T> factory(Arg const& arg) {
  return shared_ptr<T>(new T(arg));
}
...
...
factory<X>(hoo());
factory<X>(41);
```

- 그래서 이러한 문제를 해결 하기 위해 C++에서는 우측값 레퍼런스를 도입했고, 
& 겹침에 규칙을 적용하였음.

#### value category
* * *

|             |move 가능하다|move 불가능하다
|-------------|-------------|--------------|
|&로 주소를 알 수 없다|xvalue|lvalue|
|&로 주소를 알 수 있다|prvalue|무쓸모|

glvalue : 정체를 알 수 있는 모든 식 (lvalue + xvalue)

rvalue : 정체를 알 수 없는 모든 식 (prvalue + xvalue)

lvalue : 이름을 가지고 있어서, 주소를 취할 수 있는 모든 것 (문자열 리터럴도 포함, 우측값 레퍼런스도 경우에 따라 lvalue임)인데 이동(move) 시킬 수 없는 것들.

xvalue : prvalue와 lvalue중 move할 수 있는 것들.

prvalue : a++, a--, 문자열 리터럴을 제외 한 모든 리터럴, 레퍼런스가 아닌 것을 리턴하는 함수의 호출식, 주소값 연산자 식 &a, this, enum 값
, 람다식, a.m, p->m 과 같이 멤버를 참조할 때. 이 때 m 은 enum 값이거나 static 이 아닌 멤버 함수.

#### Reference 
***  
- ***[우측값 참조](https://modoocode.com/189)***
- ***[value category](https://modoocode.com/294)***
- ***[std::move](https://modoocode.com/301)***
- ***[std::forward](https://modoocode.com/302)***