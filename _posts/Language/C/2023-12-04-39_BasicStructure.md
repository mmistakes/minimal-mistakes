---
layout: single
title: Chapter 39 구조체의 기본
date: 2023-12-04 19:01:09 +09:00
categories:
  - Language
tags:
  - C
excerpt: 구조체의 기본에 관한 글입니다.
toc: true
---

# 1 구조체(structure type)

- 구조체(structure type)

>구조체(structure type)란 사용자가 C 언어의 기본 타입을 가지고    
>새롭게 정의할 수 있는 사용자 정의 타입을 의미한다.

>구조체는 기본 타입만으로는 나타낼 수 없는 복잡한 데이터를 표현할 수 있다.

>배열이 같은 타입의 변수 집합이라고 한다면,     
>구조체는 다양한 타입의 변수 집합을 하나의 타입으로 나타낸 것이다.      
이때 구조체를 구성하는 변수를            
구조체의 멤버(member) 또는 멤버 변수(member variable)라고 한다.

## 1.1 구조체의 정의와 선언

>C 언어에서 구조체는 struct 키워드를 사용하여 다음과 같이 정의한다.

- 문법

```c
struct 구조체이름
{
    멤버변수1의타입 멤버변수1의이름;
    멤버변수2의타입 멤버변수2의이름;
    ...  
};
```

>다음은 book이라는 이름의 구조체를 정의하는 그림이다.

![image](https://github.com/EunChong999/EunChong999/assets/136239807/18e39362-0630-4c39-9ff0-8a63445dae60)

>struct라는 키워드를 사용하여 구조체의 시작을 알리고,     
>구조체 이름인 book으로 구조체를 정의하고 있다.     
중괄호 사이에 char titile[30], char author[30], int price와 같은       
변수들은 book의 멤버 변수들이다.     
마지막 세이콜론은 구조체 정의를 종료한다는 의미이다.         
이렇게 정의된 book 구조체는 사용자 정의 자료형이라고 한다.       
이렇게 정의된 구조체 타입은 다음과 같이 구조체 변수로 선언하여 사용할 수 있다.

- 문법

```c
struct 구조체이름 구조체변수이름;
```

- 예제

```c
struct book my_book;
```

>또한, 구조체의 정의와 구조체 변수의 선언을 동시에 할 수도 있다.

- 문법

```c
struct 구조체이름
{
    멤버변수1의타입 멤버변수1의이름;
    멤버변수2의타입 멤버변수2의이름;
    ...
} 구조체변수이름;
```

- 예제

```c
struct book
{
    char title[30];
    char author[30];
    int price;
} my_book;
```

## 1.2 typedef 키워드

>C 언어의 typedef 키워드는 이미 존재하는 타입에 새로운 이름을 붙일 때 사용한다.       
구조체 변수를 선언하거나 사용할 때에는             
매번 struct 키워드를 사용하여 구조체임을 명시해야 한다.       
하지만 typedef 키워드를 사용하여 구조체에 새로운 이름을 선언하면                    
매번 struct 키워드를 사용하지 않아도 된다.

>typedef 키워드를 사용하여 새로운 이름을 선언하는 방법은 다음과 같다.

- 문법

```c
typedef struct 구조체이름 구조체의새로운이름;
```

- 예제

```c
typedef struct book TEXTBOOK;
```

>또한, 구조체의 정의와 typedef 선언을 동시에 할 수도 있다.

- 문법

```c
typedef struct (구조체이름)
{
    멤버변수1의타입 멤버변수1의이름;
    멤버변수2의타입 멤버변수2의이름;
    ...
} 구조체의새로운이름;
```

- 예제

```c
typedef struct {
    char title[30];
    char author[30];
    int price;
} TEXTBOOK;
```

>구조체의 정의와 typedef 선언을 동시에 할 때에는 구조체의 이름을 생략할 수 있다.

## 1.3 구조체 멤버로의 접근 방법

>배열에서는 인덱스를 이용하여 배열 요소에 접근할 수 있다.          
하지만 구조체에서 구조체 멤버로 접근하려고 할 때는 멤버 연산자(.)를 사용해야 한다.

>구조체에서 구조체 멤버로의 접근 방법은 다음과 같다.

- 문법

```c
구조체변수이름.멤버변수이름
```

- 예제

```c
my_book.author
```

>구조체의 주소값과 구조체의 첫 번째 멤버 변수의 주소값은 언제나 같다.

## 1.4 구조체 변수의 초기화

>구조체 변수를 초기화할 때에는 멤버 연산자(.)와 중괄호({})를 사용한다.

>구조체 변수의 초기화 방법은 다음과 같다.

- 문법

```c
구조체변수이름 = {.멤버변수1이름 = 초깃값, .멤버변수2이름 = 초깃값, ...};
```

- 예제

```c
my_book = {.title = "HTML과 CSS", .author = "홍길동", .price = 28000};
```

>이 방법을 사용하면 원하는 멤버 변수만을 초기화할 수 있다.        
이때 멤버 변수가 정의된 순서와 초기화하는 순서는 아무런 상관이 없으며,          
초기화하지 않은 멤버 변수는 0으로 초기화된다.

>또한, 배열의 초기화와 같은 방법으로 구조체 변수를 초기화할 수도 있다.

- 문법

```c
구조체변수이름 = {멤버변수1의초깃값, 멤버변수2의초깃값, ...};
```

- 예제

```c
my_book = {"HTML과 CSS", "홍길동", 28000};
```

>이때 구조체 정의에서 멤버 변수가 정의된 순서에 따라 차례대로 초깃값이 설정되며,         
>나머지 멤버 변수는 0으로 초기화된다.

>다음 예제는 두 가지 방법을 사용하여 각각 구조체 변수를 초기화하는 예제이다.

- 예제

```c
#include <stdio.h>  

struct book
{
    char title[30];
    char author[30];
    int price;
};  

int main(void)
{
    struct book my_book = {"HTML과 CSS", "홍길동", 28000};
    struct book java_book = {.title = "Java language", .price = 30000};  

    printf("첫 번째 책의 제목은 %s이고, 저자는 %s이며, 가격은 %d원입니다.\n",
        my_book.title, my_book.author, my_book.price);
    printf("두 번째 책의 제목은 %s이고, 저자는 %s이며, 가격은 %d원입니다.\n",
        java_book.title, java_book.author, java_book.price);
    return 0;
}
```

- 실행 결과

```c
첫 번째 책의 제목은 HTML과 CSS이고, 저자는 홍길동이며, 가격은 28000원입니다.
두 번째 책의 제목은 Java language이고, 저자는 이며, 가격은 30000원입니다.
```

>다음 예제는 구조체에 typedef 키워드를 사용하여 새로운 이름을 선언한 후 사용하는 예제이다.

- 예제

```c
#include <stdio.h>  

typedef struct
{
    char title[30];
    char author[30];
    int price;
}  TEXTBOOK;  

int main(void)
{
    TEXTBOOK my_book = {"HTML과 CSS", "홍길동", 28000};
    TEXTBOOK java_book = {.title = "Java language", .price = 30000};  

    printf("첫 번째 책의 제목은 %s이고, 저자는 %s이며, 가격은 %d원입니다.\n",
        my_book.title, my_book.author, my_book.price);
    printf("두 번째 책의 제목은 %s이고, 저자는 %s이며, 가격은 %d원입니다.\n",
        java_book.title, java_book.author, java_book.price);
    return 0;
}
```

- 실행 결과

```c
첫 번째 책의 제목은 HTML과 CSS이고, 저자는 홍길동이며, 가격은 28000원입니다.
두 번째 책의 제목은 Java language이고, 저자는 이며, 가격은 30000원입니다.
```

>위 예제의 실행 결과처럼 typedef 키워드를 사용하여 구조체에      
>새로운 이름을 선언한 후 사용해도         
>structr 키워드를 그대로 사용한 것과 같은 결과를 얻을 수 있다.