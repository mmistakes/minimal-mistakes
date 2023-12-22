---
layout: single
title:  "Functions Semantics "
categories: [CliteP,JAVA,Functions,Function,Activation Record,Compiler]
tag : [CliteP,JAVA,Functions,Function,Activation Record,static link, dynamic link,NonLocal,chain offset, local offset,Runtime stack, heap]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---


### 시작하며 

메모리 구조와 함수의 구조를 알수 있습니다. 

중첩 함수가 지원 되는 pascal에서 함수는 어떻게 call이 되는지 전반적인 느낌을 알수있습니다.
Activation Record의 개념과 static link, dynamic link의 구조에 대해서 알수있습니다. 


<a href="{{site.url}}/pdfs/Function_Semantic.pdf">Function_Semantic one note pdf</a>



### 내용 정리 및 마무리 

* pass by value,reference,value result

* Argument와 Parameter 차이 

* stack(static,runtime) <-> Heap의 메모리 구조

* Runtime memory organization

* Activation Record
  - local
  - parameter
  - return address
  - result
  - static link , dynamic link 

* chain offset, local offset 

* Example 문제 분석 

**static link, dynamic link 개념 안다는 가정** 

컴파일 시간에 (chain offset, local offset) binding 하면 
런 타임 시간에 binding한 정보 가지고 변수를 찾는다 


마지막 그림에서 봐야할 것은 sub 1의 static link가 어디로 연결 되어있는지(BigSUB)

sub2의 static link는 어디로 연결 되어있는지 (BIGsub)

그러면 sub1에서 B는 어디서 찾고 있나 BIGSub에서 찾고 있다 
sub3의 A는 어디서 찾고 있나? statick link 2번 타고 들어가서 BIGSUB에서 찾고 있다 


실제 프로그램 구현 할때는 변수가 해당 stackFrame에 없으면 연결된 static link를 타고 찾을수있도록 구현 했다 

그리고 실제 구현한 프로그램에서는 중첩 함수 지원 하지 않는다 

global stackFrame 안에 main 등 여러 함수가 들어가는 방식 
이렇게 되면 global stackFrame안에 있는 함수들의 static link는 모두 global stackFrame을 가리키게 되고 dynamic link 구조만 다르게 진행 될 것이다. 


