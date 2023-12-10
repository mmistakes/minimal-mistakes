---
layout: single
title: Chapter 28 다양한 포인터
date: 2023-12-04 18:53:11 +09:00
categories:
  - Language
tags:
  - C
excerpt: 다양한 포인터에 관한 글입니다.
toc: true
---

# 1 다양한 포인터

## 1.1 포인터의 포인터 

- 포인터의 포인터

>포인터의 포인터란 포인터  변수를 가리키는 포인터를 의미한다.               
>참조 연산자(*)를 두 번 사용하여 표현하며, 이중 포인터라고도 부른다. 

>다음 그림은 포인터와 포인터의 포인터와의 동작 상 차이점을 보여주고 있다.

![image](https://github.com/EunChong999/EunChong999/assets/136239807/37cc2625-89df-4c38-9e13-9365d34ec85d)

>다음 예제는 포인터의 포인터를 선언하고, 포인터의 포인터를 이용한 접근 방법을 보여주고 있다.

- 예제 

```c
int num = 10;              // 변수 선언
int* ptr_num = &num;       // 포인터 선언
int** pptr_num = &ptr_num; // 포인터의 포인터 선언  

printf("변수 num가 저장하고 있는 값은 %d입니다.\n", num);
printf("포인터  ptr_num가 가리키는 주소에 저장된 값은 %d입니다.\n", *ptr_num);
printf("포인터의 포인터 pptr_num가 가리키는 주소에 저장된 포인터가 가리키는 주소에 저장된 값은 %d입니다.\n", **pptr_num);
```

- 실행 결과

```c
변수 num가 저장하고 있는 값은 10입니다.
포인터 ptr_num가 가리키는 주소에 저장된 값은 10입니다.
포인터의 포인터 pptr_num가 가리키는 주소에 저장된 포인터가 가리키는 주소에 저장된 값은 10입니다.
```

## 1.2 void 포인터(void pointer)

- void 포인터(void pointer)

>void 포인터(void pointer)란 일반적인 포인트 변수와는 달리                                                     
>대상이 되는 데이터의 타입을 명시하지 않은 포인터를 의미한다. 

>따라서 변수, 함수, 포인터 등 어떠한 값도 가리킬 수 있지만,                      
> 포인터 연산이나 메모리 참조와 같은 작업은 할 수 없다.             

>즉 void 포인터는 주소값을 저장하는 것 이외에는 아무것도 할 수 없는 포인터이다.                    
>또한, void 포인터를 사용할 때에는 반드시 먼저 사용하고자 하는 타입으로             
>명시적 타입 변환 작업을 거친 후에 사용해야 한다.

>다음 예제는 void 포인터의 선언 및 void 포인터를 이용한 접근 방법을 보여주고 있다.

- 예제 

```c
int num = 10;         // 변수 선언
void* ptr_num = &num; // void 포인터 선언  

printf("변수 num가 저장하고 있는 값은 %d입니다.\n", num);
printf("void 포인터 ptr_num가 가리키는 주소에 저장된 값은 %d입니다.\n", *(int*)ptr_num);  

*(int*)ptr_num = 20;  // void 포인터를 통한 메모리 접근  
printf("void 포인터 ptr_num가 가리키는 주소에 저장된 값은 %d입니다.\n", *(int*)ptr_num);
```

- 실행 결과

```c
변수 num가 저장하고 있는 값은 10입니다.
void 포인터 ptr_num가 가리키는 주소에 저장된 값은 10입니다.
void 포인터 ptr_num가 가리키는 주소에 저장된 값은 20입니다.
```

> 위의 예제처럼 void 포인터는 사용할 때마다 명시적 타입 변환을 하고 난 뒤에 사용해야 한다.

## 1.3 함수 포인터(function pointer)

>프로그램에서 정의된 함수는 프로그램이 실행될 때 모두 메인 메모리에 올라가게 된다.              
>이때 함수의 이름은 메모리에 올라간 함수의 시작 주소를 가리키는                
>포인터 상수(constant pointer)가 된다. 

- 함수 포인터(function pointer)

>함수 포인터(function pointer)란 함수의 시작 주소를 가리키는 포인터 상수를 의미한다.

>함수 포인터의 포인터 타입은 함수의 반환값과 매개변수에 의해 결정된다.                    
>즉 함수의 원형을 알아야만 해당 함수에 맞는 함수 포인터를 만들 수 있다.

- 함수 원형

```c
void func (int, int);
```

> 위와 같은 함수 원형을 가지는 함수에 대한 함수 포인터는 다음과 같다.

- 함수 포인터

```c
void (*ptr_func) (int, int);
```

>함수 포인터 사용시 연산자의 우선순위 때문에                     
>반드시 *ptr_func 부분을 괄호(())로 둘러싸야 한다.

>함수 포인터는 다음 예제처럼 함수를 또 다른 함수의 인수로 전달할 때 유용하게 사용된다. 

- 예제

```c
double (*calc)(double, double) = NULL; // 함수 포인터 선언
double result = 0;  
double num01 = 3, num02 = 5;
char oper = '*';  

switch (oper)
{
    case '+':
        calc = add;
        break;
    case '-':
        calc = sub;
        break;
    case '*':
        calc = mul;
        break;
    case '/':
        calc = div;
        break;
    default:
        puts("사칙연산(+, -, *, /)만을 지원합니다.");
}  

result = calculator(num01, num02, calc);
printf("사칙 연산의 결과는 %lf입니다.\n", result);
```

- 실행 결과

```c
사칙 연산의 결과는 15.000000입니다.
```

>위의 예제는 함수 포인터를 사용하여 변수 oper의 값에 따라          
>4개의 사칙연산 함수 중 하나를 선택한다.                  
>이렇게 선택된 함수는 함수 포인터를 사용하여            
>calculator() 함수에 인수로 전달되게 된다.

## 1.4 널 포인터(null pointer)

- 널 포인터(null pointer)

>널 포인터(null pointer)란 0이나 NULL을 대입하여 초기화한 포인터를 의미한다.              
>널 포인터는 아무것도 가리키지 않는 포인터라는 의미이다.

