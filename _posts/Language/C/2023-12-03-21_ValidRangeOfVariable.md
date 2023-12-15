---
layout: single
title: Chapter 21 변수의 유효 범위
date: 2023-12-03 21:03:20 +09:00
categories:
  - Language
tags:
  - C
excerpt: 변수의 유효 범위에 관한 글입니다.
toc: true
---

# 1 변수의 유효 범위(variable scope)

> C 언어에서는 변수의 선언 위치에 따라 해당 변수의 유효 범위,                
> 메모리 반환 시기, 초기화 여부, 저장되는 장소 등이 변경된다.

> C 언어에서 변수는 위와 같은 특징들을 기준으로 다음과 같이 나눌 수 있다.

1. 지역 변수(local variable)

2. 전역 변수(global variable)

3. 정적 변수(static variable)

4. 레지스터 변수(register variable)


## 1,1 메모리의 구조

> 컴퓨터의 운영체제는 프로그램의 실행을 위해 다양한 메모리 공간을 제공한다.               
   C 프로그램이 운영체제로부터 할당받는 대표적인 메모리 공간은 다음과 같다.

1. 코드(code) 영역

2. 데이터(data) 영역

3. 스택(stack) 영역

4. 힙(heap) 영역


## 1.2 지역 변수(local variable)

- 지역 변수(local variable)

> 지역 변수(local variable)란 '블록' 내에서 선언된 변수를 의미한다.                      
    지역 변수는 변수가 선언된 블록 내에서만 유효하며, 블록이 종료되면 메모리에서 사라진다.

> 이러한 지역 변수는 메모리상의 스택(stack) 영역에 저장되며,           
> 초기화하지 않으면 의미 없는 값(쓰레기값)으로 초기화된다.                  
함수의 매개변수 또한 함수 내에서 정의되는 지역 변수로 취급된다.

-  예제

```c
#include <stdio.h>  
void local(void);  

int main(void)
{
    int i = 5;
    int var = 10;
    printf("main() 함수 내의 지역 변수 var의 값은 %d입니다.\n", var);  

    if (i < 10)
    {
        local();
        int var = 30;
        printf("if 문 내의 지역 변수 var의 값은 %d입니다.\n", var);
    }  

    printf("현재 지역 변수 var의 값은 %d입니다.\n", var);
    return 0;
}  

void local(void)
{
    int var = 20;
    printf("local() 함수 내의 지역 변수 var의 값은 %d입니다.\n", var);
}  
```

- 실행 결과

```c
main() 함수 내의 지역 변수 var의 값은 10입니다.
local() 함수 내의 지역 변수 var의 값은 20입니다.
if 문 내의 지역 변수 var의 값은 30입니다.
현재 지역 변수 var의 값은 10입니다.
```

> 위의 예제에서 변수 var은 한 번은 main() 함수 내에서,                      
> 또 한 번은 if 문에서, 마지막은 local() 함수 내에서 선언된다.                 
이처럼 같은 이름의 변수 var은 모두 다른 중괄호({}) 영역에서 선언되었으며,               
이러한 중괄호 영역을 블록(block)이라고 한다.                
이렇게 변수의 유효 범위는 변수가 선언된 블록을 기준으로 설정되며,                 
해당 블록이 끝나면 모든 지역 변수는 메모리에서 사라지게 된다.          

>위의 변수의 이름으로 같은 이름을 여러 번 사용하는 것은        
> 구문 상 에러를 발생시키지는 않지만,           
>바람직하지 못한 방식이다. 

> 한 블록 내에서 같은 이름의 변수를 또다시 선언하려고 하면 컴파일러는 오류를 발생시킨다.

## 1.3 전역 변수(global variable)

- 전역 변수(global variable)

>전역 변수(global variable)란 함수의 외부에서 선언된 변수를 의미한다.

> 전역 변수는 프로그램의 어디에서나 접근할 수 있으며,                
> 프로그램이 종료되어야만 메모리에서 사라진다.

> 이러한 전역 변수는 메모리상의 데이터(data) 영역에 저장되며,                
> 직접 초기화하지 않아도 0으로 자동 초기화된다.

- 예제

```c
#include <stdio.h>  
void local(void);
int var; // 전역 변수 선언    

int main(void)
{
    printf("전역 변수 var의 초깃값은 %d입니다.\n", var);  
    int i = 5;
    int var = 10; // 지역 변수 선언
    printf("main() 함수 내의 지역 변수 var의 값은 %d입니다.\n", var);  

    if (i < 10)
    {
        local();
        printf("현재 변수 var의 값은 %d입니다.\n", var); // 지역 변수에 접근
    }  

    printf("더 이상 main() 함수에서는 전역 변수 var에 접근할 수가 없습니다.\n");
    return 0;
}  

void local(void)
{
    var = 20; // 전역 변수의 값 변경
    printf("local() 함수 내에서 접근한 전역 변수 var의 값은 %d입니다.\n", var);
}  
```

- 실행 결과

```c
전역 변수 var의 초기값은 0입니다.
main() 함수 내의 지역 변수 var의 값은 10입니다.
local() 함수 내에서 접근한 전역 변수 var의 값은 20입니다.
현재 변수 var의 값은 10입니다.
더 이상 main() 함수에서는 전역 변수 var에 접근할 수가 없습니다.
```

> 위의 예제에서 전역 변수 var와 같은 이름의 지역 변수 var가 main() 함수 내부에서 선언된다.             
이 지역 변수가 선언되기 전까지는 main() 함수에서도 전역 변수 var에 접근할 수 있다.             
하지만 지역 변수 var가 선언된 후에는        
main() 함수에서 전역 변수 var로 접근할 방법이 없어진다.             
왜냐하면, 블록 내에서 선언된 지역 변수는 같은 이름의 전역 변수를 덮어쓰기 때문이다.                

>따라서 이처럼 전역 변수와 같은 이름으로 지역 변수를 선언하는 것은 좋지 않다.

> 또한, 여러 개의 파일로 구성된 프로그램에서 외부 파일의 전역 변수를 사용하기 위해서는         
> extern 키워드를 사용해 다시 선언해야 줘야한다.

## 1.4 정적 변수(static variable)

- 정적 변수(static variable)

>C 언어에서 정적 변수(static variable)란 static 키워드로 선언한 변수를 의미한다.

>이렇게 선언된 정적 변수는 지역 변수와 전역 변수의 특징을 모두 가지게 된다.         
함수 내에서 선언된 정적 변수는 전역 변수처럼 단 한 번만 초기화되며        
(초기화는 최초 실행 시 단 한번만 수행됨), 프로그램이 종료되어야 메모리상에서 사라진다.               
또한, 이렇게 선언된 정적 변수는 지역 변수처럼 해당 함수 내에서만 접근할 수 있다.

- 예제

```c
#include <stdio.h>  
void local(void);
void staticVar(void);  

int main(void)
{
    int i;  
    for (i = 0; i < 3; i++)
    {
        local();
        staticVar();
    }  
    return 0;
}  

void local(void)
{
    int count = 1;
    printf("local() 함수가 %d 번째 호출되었습니다.\n", count);
    count++;
}  

void staticVar(void)
{
  ① static int static_count = 1;
    printf("staticVar() 함수가 %d 번째 호출되었습니다.\n", static_count);
    static_count++;
}
```

- 실행 결과

```c
local() 함수가 1 번째 호출되었습니다.
staticVar() 함수가 1 번째 호출되었습니다.
local() 함수가 1 번째 호출되었습니다.
staticVar() 함수가 2 번째 호출되었습니다.
local() 함수가 1 번째 호출되었습니다.
staticVar() 함수가 3 번째 호출되었습니다.
```

>위의 예제는 지역 변수로 선언된 count와          
>정적 변수로 선언된 static_count를 서로 비교하는 예제이다.              
지역 변수인 count는 함수의 호출이 끝날 때마다 메모리상에서 사라진다.         
하지만 정적 변수인 static_count는 함수의 호출이 끝나도 메모리상에서 사라지지 않고,                  
다음 함수 호출 때 이전의 데이터를 그대로 가지고 있다.       

>정적 변수 static_count의 초기화를 수행하는 ①번 라인의 코드는 최초로 실행될 때                  
>단 한 번만 수행되며, 두 번째부터는 수행되지 않는다.                 
또한, static_count는 전역 변수와는 달리 자신이 선언된 staticVar() 함수                   
이외의 영역에서는 호출할 수 없다.

## 1.5 레지스터 변수(register variable)

- 레지스터 변수

> 레지스터 변수란 지역 변수를 선언할 때 register 키워드를 붙여 선언한 변수를 의미한다.

>이렇게 선언된 레지스터 변수는 CPU의 레지스터(register) 메모리에 저장되어 빠르게 접근할 수 있게 된다.

> 하지만 컴퓨터의 레지스터는 매우 작은 크기의 메모리이므로,             
> 이 영역에 변수를 선언하기 힘든 경우도 많다.             
그럴 때 C 컴파일러는 해당 변수를 그냥 지역변수로 선언하게 된다.

- 변수의 종류

![스크린샷(753) - 복사본](https://github.com/EunChong999/EunChong999/assets/136239807/2ea267f4-2562-41d8-940e-a0c99367c6f9)

![스크린샷(753)](https://github.com/EunChong999/EunChong999/assets/136239807/7a0f722f-0ff2-4957-9cf8-b8d878996ed8)

