---
layout: single
title: Chapter 37 문자열 입출력 함수
date: 2023-12-04 18:59:30 +09:00
categories:
  - Language
tags:
  - C
excerpt: 문자열 입출력 함수에 관한 글입니다.
toc: true
---

# 1 문자열 입력 함수

>C 언어에서 문자열을 입력할 때에는 fgets() 함수를 사용한다.

## 1.1 fgets() 함수

>fgets() 함수는 키보드뿐만 아니라 파일에서도 문자열을 입력받을 수 있는 함수이다.

>fgets() 함수의 원형은 다음과 같다.

- 원형

```c
#include <stdio.h>
char *fgets(char * restrict s, int n, FILE * restrict stream);  
```

>fgets() 함수의 첫 번째 인수는 입력받는 문자열을     
>저장하기 위해 선언한 배열의 시작 주소를 전달한다.     
두 번째 인수로는 입력받을 수 있는 문자열의 최대 길이를 전달하고,          
마지막 인수로는 문자열을 입력받을 스트림을 전달한다.

# 2 문자열 출력 함수

>C 언어에서 문자열을 입력할 때에는 puts()함수나 fputs() 함수를 사용한다.

## 2.1 puts() 함수

>puts() 함수는 표준 출력 스트림(stdout)인 모니터에 하나의 문자열을 출력하는 함수이다.       
이 함수는 모니터에 문자열을 출력한 다음에 자동으로 줄을 바꿔준다.

>puts() 함수의 원형은 다음과 같다.

- 원형

```c
#include <stdio.h>
int puts(const char *s);  
```

>puts() 함수는 인수로 출력할 문자열을 가리키는 포인터를 전달한다.

## 2.2 fputs() 함수

>fputs() 함수는 모니터뿐만 아니라 파일을 통해서도 문자를 출력(저장)할 수 있는 함수이다.         
이 함수는 puts() 함수와는 달리 문자열을 출력한 다음에 자동으로 줄을 바꿔주지 않는다.

>fputs() 함수의 원형은 다음과 같다.

- 원형

```c
#include <stdio.h>
int fputs(const char * restrict s, FILE * restrict stream);
```

>fputs() 함수의 첫 번째 인수는 출력할 문자열을 가리키는 포인터를 전달한다.    
>두 번째 인수로는 문자열을 출력할 스트림을 전달한다.

>다음 예제는 문자열 입출력 함수를 사용하여,        
>사용자가 입력한 문자열을 그대로 출력하는 예제이다.

- 예제

```c
#include <stdio.h>
int main(void)
{
    char str[100];

    fputs("문자열을 입력해 주세요 :\n", stdout);
    fgets(str, sizeof(str), stdin);
    puts("입력하신 문자열 : ");
    puts(str);
    fputs("입력하신 문자열 : ", stdout);
    fputs(str, stdout);
    return 0;
}
```

- 실행 결과

```c
문자열을 입력해 주세요 : 
C언어 문자열 입출력
입력하신 문자열 : 
C언어 문자열 입출력

입력하신 문자열 : C언어 문자열 입출력
```

>위의 예제에서 puts() 함수는 문자열을 출력한 후에 자동으로 줄 바꿈을 해준다.           
하지만 fputs() 함수는 문자열을 출력한 후에 줄 바꿈을 하지 않는다.