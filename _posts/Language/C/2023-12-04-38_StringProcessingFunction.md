---
layout: single
title: Chapter 38 문자열 처리 함수
date: 2023-12-04 19:00:21 +09:00
categories:
  - Language
tags:
  - C
excerpt: 문자열 처리 함수에 관한 글입니다.
toc: true
---

# 1 문자열 처리 함수

>C 언어에서 문자열은 마지막에 널 문자를 가지는 문자형 배열로 표현되며,      
>기본 타입에는 포함되지 않는다.       
따라서 C 컴파일러가 기본 타입을 위해       
제공하는 다양한 연산자를 자유롭게 사용할 수 없다.

>이 때문에 C 언어는 문자열을 처리하기 위한 다양한 함수를 별도로 제공하고 있다.    
C 언어에서 제공하는 대표적인 문자열 처리 함수는 다음과 같다.

1. strlen() 함수

2. strcat(), strncat() 함수

3. strcpy(), strncpy() 함수

4. strcmp(), strncmp() 함수

5. atoi(), atol(), atoll(), atof() 함수

6. toupper(), tolower() 함수


## 1.1 strlen() 함수

>strlen() 함수는 인수로 전달된 문자열의 길이를 반환하는 함수이다.       
이때 문자열 여부를 구분하는 마지막 문자인 널 문자는 문자열의 길이에서 제외된다.

>strlen() 함수의 원형은 다음과 같다.

- 원형

```c
#include <string.h>
size_t strlen(const char *s); 
```

>다음 예제는 strlen() 함수를 이용하여 문자열의 길이를 구하는 예제이다.

- 예제

```c
char str[] = "C언어";  
printf("이 문자열의 길이는 %d입니다.\n", strlen(str));
```

- 실행 결과

```c
이 문자열의 길이는 7입니다.
```

>utf-8 인코딩 환경에서 한글은 한 문자당 3바이트로 처리된다.

## 1.2 strcat()함수와 strncat() 함수

>strcat()함수와 strncat() 함수는 하나의 문자열에 다른 문자열을 연결해주는 함수이다.

>strcat() 함수의 원형은 다음과 같다.

- 원형

```c
#include <string.h>
char *strcat(char * restrict s1, const char * restrict s2);  
```

>strcat() 함수의 첫 번째 인수로 전달된 문자열은 기준 문자열이 된다.   
두 번째 인수로 전달된 추가하고자 하는 문자열의 복사본이 기준 문자열 뒤에 추가된다.

>위의 원형에서 볼 수 있는 restrict 키워드는          
>포인터의 선언에서만 사용할 수 있는 C99부터 추가된 키워드이다.      
포인터를 선언할 때 이 키워드를 명시하면,       
컴파일러는 해당 포인터가 가리키는 메모리에 대한 최적화를 실시한다.

![image](https://github.com/EunChong999/EunChong999/assets/136239807/72507d7f-4be9-48fd-bc1c-53713cd3dbdf)

>이때 기준 문자열이 저장된 배열의 공간이 충분하지 않으면,     
>배열을 채우고 남은 문자들이 배열 외부로 흘러넘칠 수 있다.        
이러한 현상을 배열 오버플로우(overflow)라고 한다.       
배열 오버플로우 현상을 방지하기 위해서는 strcat() 함수 대신에   
strncat() 함수를 사용하는 것이 좋다.

>strncat() 함수는 strcat() 함수와 하는 일은 같지만,      
>세 번째 인수로 추가할 문자열의 최대 길이를 지정할 수 있다.         
이 함수는 널 문자를 만나거나,          
추가하는 문자의 개수가 세 번째 인수로 전달된 최대 길이에         
도달할 때까지 추가를 계속한다.

>strncat() 함수의 원형은 다음과 같다.

- 원형

```c
#include <string.h>
char *strncat(char * restrict s1, const char * restrict s2, size_t n);  
```

- 예제

```c
char str01[20] = "C language is "; // 널 문자를 포함하여 15문자
char str02[] = "Cool! and funny!";  
//strcat(str01, str02);   // 이 부분의 주석 처리를 삭제한 후 실행시키면 배열 오버플로우우가 발생함
strncat(str01, str02, 5); // 이렇게 최대 허용치를 설정해 놓으면 배열 오버플로우우에 대해서는 안전해짐
puts(str01);
```

- 실행 결과

```c
C language is Cool!
```

>위의 예제에서는 우선 널 문자를 포함한 총 14바이트 크기의 문자열을      
>19바이트 크기의 배열에 저장한다.      
그리고 그 문자열에 정확히 5바이트 크기의 문자열을 추가하는 예제이다.      
이때 strncat() 함수가 아닌 strcat() 함수를 사용해도 괜찮지만,         
만약 5바이트 이상의 문자열을 추가하려고 한다면 배열 오버플로우가 발생할 것이다.

## 1.3 strcpy() 함수와 strncpy() 함수

>strcpy() 함수와 strncpy() 함수는 문자열을 복사하는 함수이다.

>strcpy() 함수의 원형은 다음과 같다.

- 원형

```c
#include <string.h>
char *strcpy(char * restrict s1, const char * restrict s2);  
```

>strcpy() 함수는 첫 번째 인수로 전달된 배열에,      
>두 번째 인수로 전달된 문자열을 복사한다.     
하지만 이때 첫 번째 인수로 전달된 배열의 크기가 복사할 문자열의 길이보다 작으면,          
배열 오버플로우가 발생한다.        
배열 오버플로우 현상을 방지하기 위해서는 strcpy() 함수 대신에   
strncpy() 함수를 사용하는 것이 좋다.

![image](https://github.com/EunChong999/EunChong999/assets/136239807/99883c4f-a851-4cfc-87c5-79a37b58b304)

>strncpy() 함수는 strcpy() 함수와 하는 일은 같지만,     
>세 번째 인수로 복사할 문자열의 최대 길이를 지정할 수 있다.      
이 함수는 널 문자를 만나거나,    
복사하는 문자의 개수가 세 번째 인수로 전달된 최대 길이에     
도달할 때까지 복사를 계속한다.

>strncpy() 함수의 원형은 다음과 같다.

- 원형

```c
#include <string.h>
char *strncpy(char * restrict s1, const char * restrict s2, size_t n);   
```

>다음 예제는 strncpy() 함수를 이용하여 문자열의 일부분만을 복사하는 예제이다.     
이렇게 복사한 문자열의 마지막에는 반드시 널 문자를 삽입해 주어야만     
C 프로그램이 제대로 문자열로 인식할 수 있다.

- 예제

```c
char str01[20] = "C is Cool!";
char str02[11];  

// str02 배열의 크기만큼만 복사를 진행하며, 마지막 한 문자는 널 문자를 위한 것임
strncpy(str02, str01, sizeof(str02)-1);
str02[sizeof(str02)-1] = '\0'; // 이 부분을 주석 처리하면, 맨 마지막에 널 문자를 삽입하지 않음
puts(str02);
```

- 실행 결과

```c
C is Cool!
```

>다음 예제는 strncpy() 함수를 이용하여 문자열의 일부분만을 수정하는 예제이다.      
strncpy() 함수의 첫 번째 인수에 배열 이름을 이용한 포인터 연산을 사용하여     
수정을 시작할 지점을 지정할 수 있다.

- 예제

```c
char str[20] = "C is cool!";  
strncpy(str+5, "nice", 4); // 배열 이름을 이용한 포인터 연산으로 수정할 부분의 시작 부분을 지정함
puts(str);
```

- 실행 결과

```c
C is nice!
```

## 1.4 strcmp() 함수와 strncmp() 함수

>strcmp() 함수와 strncmp() 함수는 문자열의 내용을 비교하는 함수이다.

>strcmp() 함수의 원형은 다음과 같다.

- 원형

```c
#include <string.h>
int strcmp(const char *s1, const char *s2);  
```

>strcmp() 함수는 인수로 두 개의 문자열 포인터를 전달받아,   
>해당 포인터가 가리키는 문자열의 내용을 서로 비교한다.  
두 문자열의 모든 문자는 아스키 코드값으로 자동 변환되며,    
문자열의 맨 앞에서부터 순서대로 비교된다.

>strcmp() 함수의 상황별 반환값은 다음과 같다.

![스크린샷(758)](https://github.com/EunChong999/EunChong999/assets/136239807/ac5e1774-44b8-4594-be85-2d9b43150553)

>strncmp() 함수는 strcmp() 함수와 하는 일은 같지만,     
>세 번째 인수로 비교할 문자의 개수를 지정할 수 있다.    
이 함수는 일치하지 않는 문자를 만나거나,      
세 번째 인수로 전달된 문자의 개수만큼 비교를 계속한다.

>strncmp() 함수의 원형은 다음과 같다.

- 원형

```c
#include <string.h>
int strncmp(const char *s1, const char *s2, size_t n);  
```

>다음 예제는 strcmp() 함수를 이용하여 두 문자열을 비교하는 예제이다.          
strcmp() 함수는 문자열을 비교하는 함수이므로,     
문자를 비교할 때에는 관계연산자 '=='를 사용해야 한다.

- 예제

```c
#include <stdio.h>
#include <string.h>  
int main(void)
{
    char str[20];
    char ch;  

    while (1)
    {
        puts("미국의 수도를 입력하세요 :");
        scanf("%s", str);
        if (strcmp(str, "워싱턴") == 0 || strcmp(str, "washington") == 0) // 문자열의 비교
        {
            puts("정답입니다!");
            break;
        }
        else
            puts("아쉽네요~");
        fflush(stdin);  

        puts("\n이 프로그램을 끝내고자 한다면 'q'를 눌러주세요!");
        puts("계속 도전하고자 하시면 Enter를 눌러주세요!");
        scanf("%c", &ch);  
        if (ch == 'q') // 문자의 비교
        {
            break;
        }
        fflush(stdin);
    }
    return 0;
}
```

- 실행 결과

```c
미국의 수도를 입력하세요 : 
뉴욕
아쉽네요~

이 프로그램을 끝내고자 한다면 'q'를 눌러주세요!
계속 도전하고자 하시면 Enter를 눌러주세요!

미국의 수도를 입력하세요 : 
워싱턴
정답입니다!
```

## 1.5 atoi(), atol(), atoll(), atof() 함수

>이 함수들은 인수로 전달된 문자열을 해당 타입의 숫자로 변환시켜주는 함수이다.

>atoi(), atol(), atoll(), atof() 함수의 원형은 각각 다음과 같다.

- 원형

```c
#include <stdlib.h>
int atoi(const char *nptr);            // int형 정수로 변환함.
long int atol(const char *nptr);       // long형 정수로 변환함.
long long int atoll(const char *nptr); // long long형 정수로 변환함.
double atof(const char *nptr);         // double형 실수로 변환함.  
```

>다음 예제는 숫자로 이루어진 문자열을 숫자로 변환하여,       
> 곱셈 연산을 수행하는 예제이다.

- 예제

```c
char str01[] = "10";
char str02[] = "20";  
printf("문자열을 숫자로 변환해서 곱한 값은 %d입니다.\n", atoi(str01) * atoi(str02));
```

- 실행 결과

```c
문자열을 숫자로 변환해서 곱한 값은 200이다.
```

## 1.6 toupper() 함수와 tolower() 함수

>이 함수들은 인수로 전달된 문자열의 영문자를     
>모두 대문자나 소문자로 변환시켜주는 함수이다.

>toupper(), tolower() 함수의 원형은 각각 다음과 같다.

- 원형

```c
#include <ctype.h>
int toupper(int c); // 문자열의 모든 영문자를 대문자로 변환함.
int tolower(int c); // 문자열의 모든 영문자를 소문자로 변환함.  
```

>다음 예제는 문자열 내의 모든 영문자를 대문자로 변환하는 예제이다.

- 예제

```c
int i, str_len;
char str[] = "Hello C World!";  
printf("원래 문자열 : %s\n", str);

str_len = strlen(str);
for (i = 0; i < str_len; i++)
{
    str[i] = toupper(str[i]);
}
printf("바뀐 문자열 : %s\n", str);
```

- 실행 결과

```c
원래 문자열 : Hello C World!
바뀐 문자열 : HELLO C WORLD!
```