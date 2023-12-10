---
layout: single
title: Chapter 35 문자 입출력 함수
date: 2023-12-04 18:58:06 +09:00
categories:
  - Language
tags:
  - C
excerpt: 문자 입출력 함수에 관한 글입니다.
toc: true
---
# 1 단일 문자 입력 함수

>C 언어에서 하나의 문자를 입력할 때에는 getchar() 함수나 fgetc() 함수를 사용한다.

## 1.1 getchar() 함수

>getchar() 함수는 표준 입력 스트림(stdin)인 키보드로부터 하나의 문자를 입력받는 함수이다.

>getchar() 함수의 원형은 다음과 같다.

- 원형

```c
#include <stdio.h>
int getchar(void);
```

## 1.2 fgetc() 함수

>fgetc() 함수는 getchar() 함수와 마찬가지로           
>표준 입력 스트림(stdin)인 키보드로부터 하나의 문자를 입력받는 함수이다.          

>하지만 getchar() 함수와는 달리 문자를 입력받을 스트림을            
>인수로 전달하여 직접 지정할 수 있다.               
따라서 fgetc() 함수는 키보드뿐만 아니라 파일을 통해서도 문자를 입력받을 수 있다.

>fgetc() 함수의 원형은 다음과 같다.

- 원형

```c
#include <stdio.h>
int fgetc(FILE *stream);
```

# 2 단일 문자 출력 함수

>C 언어에서 하나의 문자를 출력할 때에는 putchar() 함수나 fputc() 함수를 사용한다.

## 2.1 putchar() 함수

>putchar() 함수는 표준 출력 스트림(stdout)인 모니터에 하나의 문자를 출력하는 함수이다.

>putchar() 함수의 원형은 다음과 같다.

- 원형

```c
#include <stdio.h>
int putchar(int c);
```

## 2.2 fputc() 함수

>fputc() 함수는 putchar() 함수와 마찬가지로        
>표준 출력 스트림(stdout)인 모니터에 하나의 문자를 출력하는 함수이다.

>하지만 putchar() 함수와는 달리 문자를 출력할 스트림을        
>인수로 전달하여 직접 지정할 수 있다.        
따라서 fputc() 함수는 모니터뿐만 아니라 파일을 통해서도 문자를 출력(저장)할 수 있다.

>fputc() 함수의 원형은 다음과 같다.

- 원형

```c
#include <stdio.h>
int fputc(int c, FILE *stream);
```

>다음 예제는 단일 문자 입출력 함수를 사용하여,        
>'x'문자가 입력될 때까지 계속해서 영문자를 입력받고 출력하는 예제이다.

- 예제

```c
#include <stdio.h>  
int main(void)
{
    char ch;
    printf("x가 입력될 때까지 영문자를 계속 입력받습니다 :\n");  

    while ((ch = getchar()) != 'x')
    {
        putchar(ch);
    }  
    printf("x를 입력하셨습니다.\n");  
    return 0;
}
```

- 실행 결과

```c
x가 입력될 때까지 영문자를 계속 입력받습니다 : 
c
c
d
d
x
x를 입력하셨습니다.
```