---
layout: single
title:  "c++ compiler_linker_build"
categories: [c++,compiler,linker,build,debug,header,C++,]
tag : [c++]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---


!!!이 포스팅의 저작권은 c++ introduce에 설명이 되어 있음을 알립니다!!! 



### preprocessor, compiler, linker 큰 그림  


**preprocessor**  


미리 선언된 매크로 관한 내용  
__func__  
__LINE__  
__FILE__  
__DATE__  
__TIME__    

__DATE__ ,__TIME__ 같은 경우는 컴파일 되었을때 시간이라서 언제 컴파일 했는지 알고 싶을때 유용하게 사용할수있다 


전처리기가 중복 선언안되게 visual studio 에서는 #pragma once를 지원 함 
그런데 다른 idle 에서는 #ifndef #ifdef 등을 통해 해야한다  

compiler가 cpp파일을 obj파일로 만들고 linker가 lib와 함께 실행 파일 만드는 구조이다. 


### static library

.a , .lib가 static libaray 파일 확장자이다 static libaray 만든다는건 archive 파일 만드는것이다 -> 리눅스 환경에서 ar rs 명령어 사용해서 한번 해본적이 있다. visual studio환경에서는 파일 설정에서 static lib로 솔루션 안에 파일을 설정 할수있다.   





### dynamic libaray

.dll, .so가 dynamic libaray 파일 확장자 이다. runtime에 bining된다 크게 loading time, run time이 있다.   

사용 이유 : 실행 파일 가지고 있고 업데이트 위해 dynamic lib만 바꿔주면 re build 하는 과정 없앨수있다 - static lib는 새로 생기면 다시 build해줘야 한다  

cf : visual studio환경에서 솔루션 안에 여러개 파일 만든 상황 가정, 이때 파일끼리 상호 작용하려면 속성에서 절대 경로 설정을 하여야 한다. 
해당 파일의 속성에서 c/c++에 general부분 가면 include directories 가 있다 여기에 경로 추가를 해주면 다른 파일에 선언된 헤더 파일도 include할수가 있다.  



-fPIC option을 주어서 so파일을 만든다 이때 static lib처럼 바로 실행하면 안될것이다(shared lib를 찾을수 없어서 발생하는 문제)   

해결 방법   
1. LD_LIBRARY_PATH에다가 shared library 갖고 있는 디렉토리 정보 넣어주면 됨 
https://change-words.tistory.com/entry/linux-LDLIBRARYPATH   

2. 현재 디렉토리에 shared file과 main 파일이 있고 실행 파일을 만들고 싶다면 
g++ main.o -L. -l(shared_file_name) -Wl, -rpath=.   


### contexpr 

C++ 17부터 도입된 문법 이다. 
compile 시간에 계산되는 값을 결정해준다. 


피보 나치 함수 보면 런타임으로 만들어주면 O(n)으로 만들수있다 하지만 예제를 위해 recursive version으로 만들면 재귀 함수로 불려지고 하는 과정이 포함되지만 constexpr사용하면 컴파일 시간에 계산된 값을 직접 d에 할당 한다. 하지만 compile시간이 넘어가는건 아무래도 소용이 없는것 같다. 

```c++
constexpr int fib(int n)
{
	if(n<=1):
	{
		return n;
	}
	else
	{
		return fib(n-1)+fib(n-2);
	}
}


int main()
{
	int d = fib(10);
}

```

함수나 변수에 해당 키워드 사용할수있다.   
https://en.cppreference.com/w/cpp/language/constexpr  

