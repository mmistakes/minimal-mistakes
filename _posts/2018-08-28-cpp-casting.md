---
title: C++ Casting
key: 20180827
tags: c++ casting
---

C++ 에서 캐스팅은 변환 과정이며 데이터가 한 타입에서 다른 타입으로 변경될 수 있음을 말한다. C++ 는 두가지 타입 변환 방식을 지원한다.

<!--more-->

**참조 링크**
- [C++ Casting](http://www.cplusplus.com/articles/iG3hAqkS/)

# Types of Conversion

타입 변환에는 두가지 방식이 있는데 하나는 암시적 변환(Implicit conversion) 그리고 나머지는 명시적 변환(Explicit conversion)이 그것이다.

암시적 변환: 프로그래머(혹은 코더)의 개입(Intervention) 없이 컴파일러가 자동적으로 수행하는 변환을 의미한다.

ex.
```
int iVariable = 10;
float fVariable = iVariable; //Assigning an int to a float will trigger a conversion.
```

명시적 변환: 프로그래머에 의해서 지정되어 변환이 수행되는 것을 의미한다.

ex.
```
int iVariable = 20;
float fVariable = (float) iVariable / 10;
```

# Casting Operations
C++ 에서는 네 가지 종류의 캐스팅 연산자(casting operations)를 제공한다.

1. static_cast
2. const_cast
3. reinterpret_cast
4. dynamic_cast

이 글에서는 세번째 연산자까지를 다루는데 이는 dynamic_cast 가 다른 연산자에 비해 너무 상이하고 다형성(polymorphism) 을 다룰때에만 사용되므로 다루지 않는다.

## static_cast

*Format: static_cast<type>(expression)*

ex.
```
float fVariable = static_cast<float>(iVariable); /*This statement converts iVariable which is of type int to float. */
```

static_cast 는 컴파일러에게 두개의 다른 타입사이에서 변환을 시도하라고 알려주는 역할을 한다. 그리고 built-in타입에 한하여 변환한다. 다만, precision(정밀도)의 상실(loss)이 발생한다. 더하여, 이 연산자는 연관된 포인터 타입(related pointer types)에 대한 변환 또한 할 수 있다.

ex.
```
int* pToInt = &iVariable;
float* pToFloat = &fVariable;
// Will not work as the pointers are not related (they are of different types)
float* pResult = static_cast<float*>(pToInt);
```

**Question**
> 과연 다르다의 정의는 어떻게 내릴 수 있는 것 일까?
>> 추측 : 아마도 서로가 전환 가능한(어느 정도 precision 의 손실을 감안하여 변경 가능한 built-in 타입 끼리의 변환을 의미할 것으로 생각된다.)

## const_cast

*Format: const_cast<type>(expression)*

ex. 상수 변수를 함수에 전달할때 오류가 발생하므로 상수성을 제거하는데 const_cast 를 사용하였다.
```
void aFunction(int* a)
{
    cout << *a << endl;
}

int main()
{
    int a = 10;
    const int* iVariable = &a;

    aFunction(const_cast<int*>(iVariable));
/*Since the function designer did not specify the parameter as const int*, we can strip the const-ness of the pointer iVariable to pass it into the function.
Make sure that the function will not modify the value. */

    return 0;
}
```

글쓴이는 const_cast 가 가장 적게 사용되는 cast 중에 하나일 것이라고 말한다. const_cast 는 다른 두 타입 간의 cast(변환)을 하지 않는다. 대신에 "const-ness"(상수성 이라고 번역하는 게 옳지 않을까?) 를 변경한다. 즉, 이전에 상수가 아닌 것을 상수로 만드는 것을 의미한다. const 를 제거함으로써 값을 휘발하고 변경가능하도록 한다. *즉, 다시 말해 이 연산자를 사용하지 않도록 해야하며 만약 사용한다면 설계를 다시 고려해야 한다는 의미이다.*

## reinterpret_cast

*Format: reinterpret_cast<type>(expression);*

글쓴이는 reinterpret_cast 가 논쟁의 여지는 있지만 가장 강력한 캐스팅 연산자 중에 하나라고 말한다. 이 연산자의 기능에 대해 주절주절 설명이 많으므로 좀 numbered list 형태로 정리한다.

1. convert from any built-in type to any other, and from any pointer type to another pointer type.
2. cannot strip a variable's const-ness(상수성) or volatile-ness(휘발성).
3. convert between built-in data types and pointers without any regard to type safety or const-ness.

※ This particular cast operator should be used only when absolutely necessary!

해석: **이 연산자는 반드시 필요한 경우에만 사용되어야 한다. 남용 금지!!**


---

If you like the post, don't forget to give me a start :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=gbkim1988&repo=gbkim1988.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
