---
layout: single
title: "자바스크립트의 시작"
categories: javascript
tag: [javascript]
toc: true
toc_label: "포스트 목차"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---
새로운 언어를 배울때  
무작정 문법 공부를 시작하기 보다  
어째서 이 언어가 사용되기 시작하였는지에 대하여  
이해하고 가는것이,  
앞으로의 공부 방향과  
내가 배운 문법을 필요한 곳에 활용할 때 도움이 된다.  
자바스크립트의 시작과 역사에 대하여 알아보자.  
<br>
1993년에 처음으로 UI요소가 더해진  
Mosaic Web Browser가 출시되었다.  
UI요소가 더해짐으로써,  
컴퓨터에 대한 전문적인 지식이 없는 일반인 이라도  
간편하게 이용할수 있는,  
현대적인 Web의 시작이라고 할 수 있겠다.  
<br>
여기에, Mosaic Web Browser를 출시한  
<span>Marc Andreessen</span>이 대학 졸업 후  
NetScape를 설립하면서  
조금의 디자인이 추가된
NetscapeNavigator가 추가로 출시된다.  
<br>
이 당시에는, html과 Css만으로  
간단하고 정적인 웹 사이트만이 가능했다.  
이 당시 Netscape는 시장 점유율이  
80%에 다다르는 기염을 토했다. 
회사가 발전함에 따라, Marc Andreessen은  
점차 동적인 웹 사이트에 대한  
고민이 깊어지게 되었는데,  
이에따라 웹사이트에 <span>Scripting</span>언어를 추가하자는  
아이디어를 떠올리게 된다.  
<br>
아이디어는 <span>BrendanEich</span>을 스카우트하여,  
기존에 사용되던 Scheme 스크립트 언어를  
수정하여 새로운 언어를 만드는 것이었다.  
이 언어의 이름으로 최초에 LiveScript를 떠올렸다가  
당시에 인기가 많았던 Java의 유명세에 올라탈 마음으로  
JavaScript로 수정하게 된다.  
이것이 자바스크립트의 시작이라고 할 수 있겠다.  
<br>
<small>*(JavaScript가 정말로 이러한 생각으로  
만들어진 이름인지는 정확히 모르겠다...  
내가 이름의 유래만 3개는 되어서...)*</small>  
<br>
이 당시 유명한 일화로, MarcAndreessen의 요청으로  
BrendanEich가 JavaScript를 10일만에 만들었다는 일화가 있다.  
<br>
<hr>
<br>  
후에, Microsoft사에서 JavaScript의 성공을 보고서는  
Netscpae사의 JavaScript를 Reverse engineering하게 되는데,  
<small>*Reverse engineering = 만들어진 프로그램을 분석해서 소스코드를 복원해 내는 것*</small>  
이 Reverse engineering한 언어에 JScript라는 이름을 붙여 출시한다.  
<small>*(이거 범죄 아닌가...?)*</small>  
<br>
이 때, 개발자들은 매우 고통받게 되었는데  
이유는 JScript와 JavaScript두 언어에서 공통으로  
작동하는 웹 사이트의 구현이 너무나도 힘들었기 때문이다.  
아예 JScript에서만 작동되도록 구현해 놓고서,  
Microsoft사의 Browser를 다운로드 받도록 유도하는 일도 허다했다.  
이에 Netscape는 <span>ECMA international</span>라는 단체를 찾아가서  
JavaScript를 Browser에서 동작하는 언어의  
표준으로 삼아달라고 요청하게 된다.  
이에, Browser에서 작동하는 언어들의 표준인  
<span>ECMAScript</span>가 등장하게 된다.  
<br>
이후 ES1, 2, 3, 4... 등이 계속해서 사용되다가,  
Microsoft의 InternetExplore가 표준안에 반발하게 되면서  
잠깐 주춤한 이후, Chrome의 등장과 함께  
ES5, ES6가 등장하였다.  
ES6를 마지막으로 그 후도 매년 새로운 버젼의 ECMAScript가 출시되어왔지만,  
눈에 띄는 큰 변화는 대부분 5버젼과 6버젼에서 이루어졌다.  

