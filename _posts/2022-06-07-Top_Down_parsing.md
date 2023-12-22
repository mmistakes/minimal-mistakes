---
layout: single
title:  "Top Down Parser "
categories: [CliteP,JAVA,Top down parser, LL parser,Predictive parser,Compiler]
tag : [CliteP,JAVA,Top down parser, LL parser,First,Follow,Parsing Table, leftmost derivation,Predictive parser]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

### 시작하며 

Top down parser중에 Backtraking이 없는 predictive parser에 대해서 정리한 pdf가 아래에 링크에 있습니다. 

<a href="{{site.url}}/pdfs/Top_down_Parsing.pdf">Top Down Parser One Note PDF</a>





### 정리 및 마무리 


* **LL parsing** : 왼쪽에서 스캔해서 파싱하는 방식 , left most dervation 

* **Nondeterministic top down parsing** : 규칙 선택이 잘못 된 경우 backtracking 필요하다 

* **Deterministic top down parsing** -> predictive parser : Backtracking을 배제 한 것이다. 
  
  - lookahead 방식 : LL(1) -> one toekn lokkahead top down predictive parser 

  - lookahead는 frist , follow함수를 이용해서 구현한다. 이러한 정보 가지고 parsing table을 만든다

  - parsing table에 action이 2개 이상이 오면 모호해진다 -> 충돌 발생 


* **left recursion은 infinite loop 발생한다** 


* parsing table이 주어졌을때 스택에 거꾸로 push한다는것만 인지하고 진행 하면 문법 G에서 해당 input string이 유효한지 아닌지 확인 할 수 있다. 

  - LL(1) parsing은 잘못 되면 backtracking 하는데 backtracking 하지 않으려면 LL condition을 만족해야한다 -> Frist, Follow 함수 알고리즘 필요 

  - 모든 문법이 LL parsing 할 수 없다 


* **First (X) 함수** 

  - X가 생성하는 스트링의 시작 위치에 올 수 있는 terminal의 집합 x=>* 입실론 이면 입실론도 포함이다. 

  - pdf에 나와 있는 예제로 설명을 보충하자면 E <- T <- F 관계가 되잖아 이런 이유는 Frist E에서 F 까지 non terminal로 계속 들어가서이다 F에서 결과물이 나오니까 관계 가지는 함수들도 같은 결과를 가지게 된다 


* **Follow (X) 함수** 

  - X라는 symbol뒤에 나올수 있는 symbol들을 포함한다 

  - 입실론은 없어야한다 

  - 즉 유도 과정에서 x뒤에 올수 있는 terminal의 집합이다 

    - x가 start symbol이면 $가 온다 

  - 보충 설명 

    - Follow(X)  : 

		  - a. Y -> αXβ    => First (β) - ε 
		  - b. Y -> αXβ && ε ㅌ First(β) [First β가 ε 생성한다면 ]    => Follow(Y)이다 
      - Y-> αX   => Follow(Y)
  

    - pdf에 내용을 보충해보면 Follow E' = Follow E' U Follow E인데 Follow E'이 recursive이니까 결국에 Follow E와 동일한 결과를 얻게 된다 
  

* **LL condition** 

  - A-> a | b 
  
  1. First (a) n First(b) = 공집합

  2. if a가 입실론을 생성한다면 Follow(A) n Follow(b) = 공집합


  2 가지 조건을 만족해야 ll codition 만족 하는 것이다. 



