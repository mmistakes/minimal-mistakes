---
published: true
layout: single
title: "C++ Template에 인수로 넣을 수 있는 것들"
category: cppreference
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

#### Template Parameters
* * *

템플릿 인수로 사용할 수 있는 것들은 다음과 같습니다.

Type Parameters.
- Types
- Templates (함수, 변수 템플릿 제외)

Non-type Parameters
- Pointers
- References
- 정수 상수식(Integral constant expression)

* * *

1) 기본형
```c++
template<typename T>
struct Container {
    T t;
};

Container<long> test;
```
<br>
2) 변수 타입
```c++
template<unsigned int S>
struct Vector {
    unsigned char bytes[S];
};

Vector<3> test;
```
<br>
3) 포인터 (예제는 함수 포인터)
```c++
template<void (*F)()>
struct FunctionWrapper {
    static void call_it() { F(); }
};

// pass address of function do_it as argument.
void do_it() { }
FunctionWrapper<&do_it> test;
```
<br> 
4) 참조
```c++
template<int &A>
struct SillyExample {
    static void do_it() { A = 10; }
};

// pass flag as argument
int flag;
SillyExample<flag> test;
```
<br>
5) 템플릿
```c++
template<template<typename T> class AllocatePolicy>
struct Pool {
    void allocate(size_t n) {
        int *p = AllocatePolicy<int>::allocate(n);
    }
};

// pass the template "allocator" as argument. 
template<typename T>
struct allocator { static T * allocate(size_t n) { return 0; } };
Pool<allocator> test;
```

<br>
6) 매개 변수가 없는 템플릿은 불가능 합니다. 그러나 명시적인 인수만 없는 템플릿은 가능합니다. 즉, 디폴트 값이 있습니다.
```c++
template<unsigned int SIZE = 3>
struct Vector
{
  unsigned char buffer[SIZE];
};

Vector<> test;
```

<br>
7) 참고로 template<>는 매개변수가 없는 템플릿이 아니라, 명시적 템플릿 특수화를 위한 문법 입니다.
```c++
template<unsigned int SIZE = 3>
struct Vector {
	void Print()
	{
		std::cout << "default size : " << SIZE << std::endl;
	}
};


template<>
struct Vector<4> {
	void Print()
	{
		std::cout << "4로 특수화 " <<std::endl;
	}
};
```

#### Reference 
***  
- ***<https://stackoverflow.com/questions/499106/what-does-template-unsigned-int-n-mean>***
- ***<https://modoocode.com/293>***