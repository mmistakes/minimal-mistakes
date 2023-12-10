---
layout: single
title: Chapter 27 인수 전달 방법
date: 2023-12-04 18:52:21 +09:00
categories:
  - Language
tags:
  - C
excerpt: 변수의 유효 범위에 관한 글입니다.
toc: true
---
# 1 인수 전달 방법

- 인수(argument)

>인수(argument)란 함수가 호출될 때 함수로 값을 전달해주는 값을 의미한다.

>함수를 호출할 때에는 함수에 필요한 데이터를 인수(argument)로 전달해 줄 수 있다.             
>함수에 인수를 전달하는 방법에는 크게 다음과 같이 두 가지 방법이 있다. 

1. 값에 의한 전달(call by value)

2. 참조에 의한 전달(call by reference)

## 1.1 값에 의한 전달(call by value)

- 값에 의한 전달(call by value)

>값에 의한 전달(call by value) 방법이란 인수로 전달되는 변수가 가지고 있는 값을               
>함수 내의 매개변수에 복사하는 방식을 의미한다. 

> 이렇게 복사된 값으로 초기화된 매개변수는 전달된 변수와는 완전히 별개의 변수가 된다.                
> 따라서 함수 내에서의 매개변수 조작은 인수로 전달되는 변수에 아무런 영향을 미치지 않는다. 

- 예제 

```c
#include <stdio.h>  
void local(int);  

int main(void)
{
    int var = 10;
    printf("변수 var의 초깃값은 %d입니다.\n", var);  

    local(var);
    printf("local() 함수 호출 후 변수 var의 값은 %d입니다.\n", var);
    return 0;
}  

void local(int num)
{
    num += 10;
}
```

- 실행 결과

```c
변수 var의 초기값은 10입니다.
local() 함수 호출 후 변수 var의 값은 10입니다.
```

>위의 예제에서 local() 함수의 매개변수 num은 인수로 변수 var의 값을 전달받는다.                
>따라서 함수 내에서 매개변수 num의 값을 아무리 변경하더라도                
>원래 인수로 전달된 변수 var의 값은 절대 변경되지 않는다.

## 1.2 참조에 의한 전달(call by reference)

- 참조에 의한 전달(call by reference)

>참조에 의한 전달(call by reference) 방법이란 인수로 변수의 값을 전달하는 것이 아닌,              
>해당 변수의 주소 값을 전달하는 방식을 의미한다.

>즉 함수의 매개변수에 인수로 전달된 변수의 원래 주소값을 저장하는 것이다.                  
>이 방식을 사용하면 인수로 전달된 변수의 값을 함수 내에서 변경할 수 있게 된다.

- 예제

```c
#include <stdio.h>  
void local(int*);

int main(void)
{
    int var = 10;
    printf("변수 var의 초깃값은 %d입니다.\n", var);  

    local(&var);
    printf("local() 함수 호출 후 변수 var의 값은 %d입니다.\n", var);
    return 0;
}  

void local(int* num)
{
    *num += 10;
}
```

- 실행 결과 

```c
변수 var의 초기값은 10입니다.
local() 함수 호출 후 변수 var의 값은 20입니다.
```

>위의 예제에서 local() 함수의 매개변수 num은 인수로 변수 var의 주소값을 전달받는다.                  
따라서 함수 내에서 매개변수 num의 값을 변경하면,            
원래 인수인 변수 var의 값도 같이 변경된다.

