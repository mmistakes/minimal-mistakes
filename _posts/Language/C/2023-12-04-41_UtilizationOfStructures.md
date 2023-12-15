---
layout: single
title: Chapter 41 구조체의 활용
date: 2023-12-04 19:02:36 +09:00
categories:
  - Language
tags:
  - C
excerpt: 구조체의 활용에 관한 글입니다.
toc: true
---

# 1 함수와 구조체

>C 언어에서는 함수를 호출할 때 전달되는 인수나,       
함수가 종료될 때 반환되는 반환값으로 구조체를 사용할 수 있다.        
그 방식은 기본 타입과 완전히 같으며,          
구조체를 가리키는 포인터나 구조체의 한 멤버 변수만을 사용할 수도 있다.

>다음 예제는 구조체의 멤버 변수를 함수의 인수로 전달하는 예제이다.

- 예제

```c
typedef struct
{
    int savings;
    int loan;
} PROP;  

int main(void)
{
    int hong_prop;
    PROP hong = {10000000, 4000000};  

    hong_prop = calcProperty(hong.savings, hong.loan); // 구조체의 멤버 변수를 함수의 인수로 전달함  

    printf("홍길동의 재산은 적금 %d원에 대출 %d원을 제외한 총 %d원입니다.\n",
        hong.savings, hong.loan, hong_prop);
    return 0;
}
```

- 실행 결과

```c
홍길동의 재산은 적금 10000000원에 대출 4000000원을 제외한 총 6000000원입니다.
```

>위와 같이 구조체를 인수로 전달하는 방식은 함수가    
>원본 구조체의 복사본을 가지고 작업하므로 안전하다는 장점을 가진다.

>다음 예제는 함수의 인수로 구조체의 주소를 직접 전달하는 예제이다.

- 예제

```c
int hong_prop;
PROP hong = {10000000, 4000000};  

hong_prop = calcProperty(&hong); // 구조체의 주소를 함수의 인수로 전달함.  
printf("홍길동의 재산은 적금 %d원에 대출 %d원을 제외한 총 %d원입니다.\n", hong.savings, hong.loan, hong_prop);
```

- 실행 결과

```c
홍길동의 재산은 적금 100원에 대출 4000000원을 제외한 총 -3999900원입니다.
```

>위와 같이 구조체 포인터를 인수로 전달하는 방식은 구조체의 복사본이 아닌           
>주소 하나만을 전달하므로 처리가 빠르다.             
하지만 호출된 함수에서 원본 구조체에 직접 접근하므로              
원본 데이터의 보호 측면에서는 매우 위험하다.

>따라서 다음 예제의 calcProperty() 함수처럼 const 키워드를 사용하여                 
>함수에 전달된 인수를 함수 내에서는 직접 수정할 수 없도록 하는 것이 좋다.

- 예제

```c
PROP prop;
int hong_prop;  

prop = initProperty();
hong_prop = calcProperty(&prop);  

printf("홍길동의 재산은 적금 %d원에 대출 %d원을 제외한 총 %d원입니다.\n", prop.savings, prop.loan, hong_prop);
```

- 실행 결과

```c
홍길동의 재산은 적금 10000000원에 대출 4000000원을 제외한 총 6000000원입니다.
```

>위의 예제에서 initProperty() 함수는 반환값으로 구조체를 직접 반환한다.            
기본적으로 C 언어의 함수는 한 번에 하나의 데이터만을 반환할 수 있다.            
하지만 이렇게 구조체를 사용하면 여러 개의 데이터를 한 번에 반환할 수 있다.

# 2 중첩된 구조체

>C 언어에서는 구조체를 정의할 때 멤버 변수로 또 다른 구조체를 포함할 수 있다.

- 예제

```c
struct name
{
    char first[30];
    char last[30];
};  
struct friends
{
    struct name friend_name;
    char address[30];
    char job[30];
};  

int main(void)
{
    struct friends hong =
    {
        { "길동", "홍" },
        "서울시 강남구 역삼동",
        "학생"
    };  

    printf("%s\n\n", hong.address);
    printf("%s%s에게,\n", hong.friend_name.last, hong.friend_name.first);
    printf("그동안 잘 지냈니? 아직 %s이지?\n", hong.job);
    puts("공부 잘 하고, 다음에 꼭 한번 보자.\n잘 지내^^");
    return 0;
}  
```

- 실행 결과

```c
서울시 강남구 역삼동

홍길동에게,
그동안 잘 지냈니? 아직 학생이지?
공부 잘 하고, 다음에 꼭 한번 보자.
잘 지내^^
```

>위의 예제에서 friends 구조체는 또 다른 구조체인 name 구조체를 멤버 변수로 포함하고 있다.

# 3 구조체의 크기

>일반적으로 구조체의 크기는 멤버 변수들의 크기에 따라 결정된다.              
하지만 구조체의 크기가 언제나 멤버 변수들의 크기 총합과 일치하는 것은 아니다.

- 예제

```c
typedef struct
{
    char a;
    int b;
    double c;
} TYPESIZE;  

int main(void)
{
    puts("구조체 TypeSize의 각 멤버의 크기는 다음과 같습니다.");
    printf("%d %d %d\n", sizeof(char), sizeof(int), sizeof(double));  

    puts("구조체 TypeSize의 크기는 다음과 같습니다.");
    printf("%d\n", sizeof(TYPESIZE));
    return 0;
}
```

- 실행 결과

```c
구조체 TYPESIZE의 각 멤버의 크기는 다음과 같습니다.
1 4 8
구조체 TYPESIZE의 크기는 다음과 같습니다.
16
```

>위의 예제에서 구조체 멤버 변수의 크기는 각각 1, 4, 8바이트이다.         
하지만 구조체의 크기는 멤버 변수들의 크기 총합인 13바이트가 아니라 16바이트가 된다.

#### 바이트 패딩(byte padding)

구조체를 메모리에 할당할 때 컴파일러는 프로그램의 속도 향상을 위해 바이트 패딩(byte padding)이라는 규칙을 이용합니다.

구조체는 다양한 크기의 타입을 멤버 변수로 가질 수 있는 타입입니다.

하지만 컴파일러는 메모리의 접근을 쉽게 하기 위해 크기가 가장 큰 멤버 변수를 기준으로 모든 멤버 변수의 메모리 크기를 맞추게 됩니다.

이것을 바이트 패딩이라고 하며, 이때 추가되는 바이트를 패딩 바이트(padding byte)라고 합니다.