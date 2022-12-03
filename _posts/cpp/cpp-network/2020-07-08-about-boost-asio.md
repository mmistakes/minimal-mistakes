---
title:  "Chapter 1. Boost 라이브러리, Boost.Asio" 

categories:
  -  Cpp Network 
tags:
  - [Cpp, Programming, Network]

toc: true
toc_sticky: true

date: 2020-07-08
last_modified_at: 2020-07-08
---

최흥배님의 책 **Boost.Asio를 사용한 네트워크 프로그래밍** 을 공부하고 정리한 필기입니다. 😀  
{: .notice--warning}


## 🔔 Boost 라이브러리

- C++ 프로그래머를 위한 유용한 오픈소스 C++ 라이브러리 모음.
  - 많이 사용되고 유용하기 때문에 C++ 표준에도 종종 포함되어 왔다.
  - IT, 게임 회사 상당수가 Boost 라이브러리를 사용하고 있다. 

### 설치

> [이 블로그](https://velog.io/@underlier12/C-17-Boost.Asio-%EA%B0%9C%EC%9A%94-%EB%B0%8F-%EC%84%A4%EC%B9%98)와 [이 블로그](https://wendys.tistory.com/115)를 참고했다. 

1. Boost 라이브러리 공식 사이트에서 다운로드
2. 압축 풀고 boostrap.bat 실행
3. 실행하고나면 b2.exe이 생기는데 이것도 실행해 줌
  - cmd로 실행하자. 비주얼 스튜디오와 bit에 맞게 옵션을 주어 설정하기 위해서.
  - 난 VS 2017 15.6 버전이기 때문에 아래 명령어를 사용했다. 각각 32bit, 64bit.

    ```
    b2 -j4 -a --toolset=msvc-14.13 variant=debug,release link=static threading=multi address-model=32 lib32

    b2 -j4 -a --toolset=msvc-14.13 variant=debug,release link=static threading=multi address-model=64 lib64
    ``` 
4. VS 프로젝트 속성에서 **추가 라이브러리 디렉터리** (boost설치경로\stage\lib) 추가
  - 속성 플랫폼 : 활성(Win32)
  - VS에서 : x86
5. VS 프로젝트 속성에서 **포함 디렉터리** (boost설치경로) 추가
  - 속성 플랫폼 : 활성(Win32)
  - VS에서 : x86


<br>

## 🔔 Boost.Asio

> Boost 라이브러리 중 하나로 <u>네트워크, 비동기 프로그래밍</u>과 관련 있는 라이브러리다.

- 네트워크 프로그래밍에 주로 사용
- 비동기 IO 입출력 프로그래밍을 지원함
  - I/O 작업을 빠르게 처리할 수 있음
- 멀티플랫폼 지원
- 고성능 네트워크 프로그래밍에도 사용 가능

> #include \<boost/asio.hpp> 로 Boost.Asio 사용.

<br>


***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}