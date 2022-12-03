---
title:  "UE4 C++ 언리얼의 문자열, 문자열 포맷" 

categories:
  -  UE4Docs
tags:
  - [Game Engine, UE4]

toc: true
toc_sticky: true

date: 2020-12-06
last_modified_at: 2020-12-06
---

공부하면서 알게된 <u>C++ 관련 언리얼4 기능들 정리</u>  
{: .notice--warning}


- 3 가지 문자열 클래스
  - `FString`
  - `FText`
  - `FName`
- 그리고 `TEXT()` 매크로

<br>

## 🌷 TEXT 매크로

```cpp
TEXT("Hello World");
```

- 언리얼에서는 문자열 리터럴을 TEXT 매크로 안에 넣어서 `TEXT("Hello World")` 이런식으로 넘기는게 좋다.
  - 어떤 플랫폼에서든 동작할 수 있도록 언리얼이 인코딩을 해주기 때문이다.
    - 모든 플랫폼에서 2 바이트 문자열로 동작하게끔 해준다.
  

<br>

## 🌼 FString

> C++ 에서의 `string`처럼 문자열 처리와 관련된 메서드들 사용 가능

```cpp
FString str = TEXT("Hello World");
```

### printf 함수

```cpp
FString::printf(TEXT("Actor Name: %s, ID : %d, Location X : %.3f", *GetName(), ID, GetActorLocation().X);
```

- C언어의 printf와 비슷하다. 형식 문자열을 출력함.
- 언리얼에서는 `%s` 부분에 함수를 사용한다면 함수앞에 꼭 `*`를 붙여주어야 한다.
  - *GetName()
- TEXT 매크로로 인수를 넘긴다.

```cpp
PrintLine(FString::Printf(TEXT("The HiddenWord is: %s. \nIt is %i characters long"), *HiddenWord, HiddenWord.Len())); 

PrintLine(FString::Printf(TEXT("The HiddenWord is: %s."), *HiddenWord));
```

- 참고로 PrintLine 은 그냥 📜Catridge.cpp로부터 상속 받은 사용자 지정 멤버 함수다. 언리얼 자체 함수 아님.
- `FString` 클래스의 `Printf` 함수는 
  - 형식 지정자로 새롭게 조립한 `FString`을 리턴하는 것 뿐만 아니라
    - `%s`, `%i`, `%.3i` 등등..
  - C언어의 printf 처럼 화면에 출력시킬 수도 있다. 
- <u>Printf 에 FString 을 넘길 땐 %s로 받는 경우 반드시 * 를 붙여 주소로 넘겨야 한다.</u>
  - `*`을 붙여주지 않으면 컴파일 에러가 발생한다.
  - `%s`는 `TCHAR *` 포인터 타입을 받기 때문이다. (TCHAR 타입의 배열의 첫번째 원소의 주소. C에서 `char *`를 받는 것과 같은 이치인 것 같다.)
    - ⭐`FString` 클래스는 `TArray<TCHAR>` 타입의 멤버 변수에 문자열을 저장하기 때문에, `FString` 클래스는 `*` 사용시 `TArray<TCHAR>` 즉, `TCHAR *` 배열의 주소를 리턴하도록 `*` 연산자를 오버로딩이 되어 있다.
      ```cpp
        // FString 클래스 내부

        typedef TArray<TCHAR> DataType;
	      DataType Data; // TArray<TCHAR> Data 와 같다. 생성자를 통해 여기에 문자열을 저장한다.

        //...
      	FORCEINLINE const TCHAR* operator*() const
	      {
		      return Data.Num() ? Data.GetData() : TEXT("");
	      }
      ```
- `FString`도 내부적으론(멤버 변수로) 문자열을 `TCHAR` 원소들로 이루어진 배열로서 저장하고 있고 마찬가지로 마지막 원소 다음에 null character `\0`를 붙여 저장한다.

<br>

### Len 함수 

```cpp
FString HiddenWord = TEXT("cake");
PrintLine(FString::Printf(TEXT("It is %i characters long"), HiddenWord.Len())); // 4 출력
```

문자열의 길이를 리턴

<br>

## 🌼 FText

> 언리얼의 자동 현지화(번역)를 지원한다. 문자열 처리와 관련된 메소드들도 있다.

<br>

## 🌼 FName

> 대소문자를 구분하지 않는다.

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}