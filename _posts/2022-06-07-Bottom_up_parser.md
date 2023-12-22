---
layout: single
title:  "Bottom up Parser "
categories: [CliteP,JAVA,Bottom up Parser, LR parser,Compiler]
tag : [CliteP,JAVA,Top down parser, LR parser,Conflict,Parsing Table, rightmost derivation]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

### 시작하며 

Bottom up parser에 대한 내용과 LR Parser에 대한 내용 및 parser table 적용하는 내용은 아래 PDF 링크에 내용이 있습니다. 


<a href="https://sullivan.github.io/pdfs/Bottom_up_Parsing.pdf">Bottom up Parser One Note PDF</a>



### 내용 정리 및 마무리 


* **LR parser** 

  - bottom up parser 
  - rightmost derivation in reverse 
  - LL parser보다 poweful -> 대부분의 programming language에서 구문 분석 가능하다 


* **용어 정리** 

  - **reduce** 

    - A-> B인 경우 B => A로 역변환하는것을 의미한다 
    - pdf 예를 들어보면 A->b 의 production이 있을때 abbcde에서 aAbcde로 바뀐것을 예로 들 수 있다. [b가 A로 reduce 되었다]

  - **handle** 

    - abbcde => aAbcde 역변환 할때 handle b를 non terminal A로 치환함 
  
  - **handle pruning** 
    - handle b를 A로 reduce하는 것을 handle prunning이라고 한다 

  

* LR parsing은 handle pruning을 반복하여 start symbol로 reduce한다 

* pdf에 parser example있는데 step을 따라가면서 직접 해보기를 바란다 

* LALR은 모호한 문법 파싱 못한다 

  - conflict 발생하기 때문이다 

* conflict 발생해도 precdence와 associativity를 이용해서 해결 가능 

* Conflict 종류 

	- **Shift reduce conflict**

		○ Shift와 reduce 모두 가능한 상황 

	- **Reduce- reduce conflict**
		○ 두가지 이상의 rule로 reduce 가능 

