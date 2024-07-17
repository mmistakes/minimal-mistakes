---
layout: single
title:   "애플 홈페이지로 배우는 시맨틱 태그"
categories: HTML
toc: true
author_profile : false
---

## 시맨틱 태그가 뭔데?
시맨틱 태그에 대해 많이 들어봤을 수도 처음 들어봤을 수도 있다.  
장점이 어떻고, 특징이 어떻고.... 나는 구구절절을 싫어한다.  
업계 표준이란 그냥 사람들이 좋아하는 것이다. 정설이란 사람들이 많이 쓰는 것 이다.  
(적어도 나는 그렇게 생각한다.)  
그래도 영어 뜻은 알고가자.  
semantic : 의미론적
쉽게 말해 머리랑 몸통(```<head>, <body>, <div>```)밖에 없던 우리 구HTML에게 "여기는 네비게이션(```<nav>```), 저기는 아티클(```<article>```), 밑에는푸터(```<footer>```) 이런식으로 의미를 부여한 것이다.  
그럼 당연히 누가 작업해도 해당 구좌에 어떤 내용이 들어가는지 알 수 있게 되겠지?  
유지보수성이 늘어난다.  

## 백문이 불여일견 - 애플로 배우자.
많은 사람들이 좋아하는 애플!!  
애플하면 심플하고 수려한 디자인이 떠오른다.  
그들의 홈페이지도 과연 그럴까?  

솔직히 이런 홈페이지... 정말 만들고싶다...  
너무 매력적이다.  

그들의 홈페이지가 매력적인 이유는 또 있다.  
바로 잘 정돈된 구조이다.  
지난 포스팅에서는 HTML기본 구조를 알아보면서 네이버 홈페이지를 예시로 들며, ```<body>```태그 안에 ```<header>```, ```<container>```, ```<footer>```가 있는 것을 살펴볼 수 있었다.  
([지난 포스팅](https://jamm0316.github.io/html/HTMLbaiscstructure/)을 보면 이번 포스팅은 이해가 더 쉽다)  
이것은 애플도 예외가 아니다.  
<br>
<img width="1462" alt="image" src="https://github.com/user-attachments/assets/3acd06f7-2f20-488d-9ca1-0047b057e0fc">
<br>

### 여기가 저희 머리입니다.(header)
보다시피 애플은 **```<div id="globalheader">```**를 사용하고있다.
실제로 ```<head>``` 태그에는 각 나라별 언어로 번역된 페이지 링크를 잔뜩 걸어놓았고, 페이지 전역에서 사용할 설정을 잔뜩 해놓았다.

컴퓨터 용어 중 global이란 말이 들어가면 **'전역'** 그러니까 전체에 다 적용하겠다는 뜻이다.  
지금은 스토어탭에 들어와 있으니 바로 옆에 있는 Mac 탭에 들어가 볼까?  
<br>
![image](https://github.com/user-attachments/assets/2b8153d4-449d-42a5-9fa1-d3f669c07163)
<br>

똑같은 탭이 보여지며, globalheader로 구성되어있는 것을 볼 수 있다.  
그 옆에 iPad, iPhone...고객지원, 검색, 장바구니까지 어느 탭에 들어가도 이것은 유지된다.  

내친김에 한번 페이지 전체 구성을 보자.  

### 저희 라인업 한번 보시죠(nav)
**golbalheader** 아래에는 **```<nav id = 'chapternav'>```** 라는 id가 존재한다.
네비게이션으로 맥 시리즈의 다양한 제품군을 보여준다.
![image](https://github.com/user-attachments/assets/6f8c5299-e86d-4902-b125-d88145b4be81)


### 자! 이제 시작합니다.(main)
쭉쭉 살펴보자.  
그다음은 ```<main>```이다.  
결국 이거보여주려고 여기까지 왔다는 얘기다.  
<br>
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/15656d27-e199-4ae4-b455-6db90573839c">
<br>

이 부분이 하이라이트인 만큼 가장 재미있는 부분이기도하다.

#### 여러분께 놀라운 것을 보여드리죠. (section-welcome)
```<main>```태그 안에는 여러개의 ```<section>```태그로 나뉘어지는데, 그 첫번째이름이 'section-welcome'이다.  
파이썬을 처음 배울 때 pythonic이라는 단어를 처음 접했다. 파이썬스럽다는 뜻이라고한다.  
이런걸 보면 아주 심플하지만 정확한 의사표시가 가능한 applic한 표현이 아닌가 싶다.  
그 말에 걸맞게 애플의 section welcome은 스크로를 잠시 멈추고 감상하게 만든다.  
<br>
<img width="1468" alt="image" src="https://github.com/user-attachments/assets/e1cde93e-23ef-45c7-8987-3306926a13bb">
<br>

#### 이번 제품으로 말할 것 같으면요. (section-consider)
다음은 ```<section-consider>```이다.
<br>
![image](https://github.com/user-attachments/assets/9ae1bb59-2a95-4338-9f38-2876dba7befb)
<br>

맥의 특성을 설명해주는 파트다.  
아마 맥을 사려는 사람들은 이걸로 뭘 할 수 있는지, 배터리 성능은 어떤지, 호환성은 좋은지, 튼튼한지 등등 맥을 사야하는 이유에 대해 설득당할 준비가 된 사람들일거다. 그 사람들에게 사야하는 이유를 부여해주어야한다.  

#### 2가지 옵션이 있습니다. (section-select)
마케팅적인 요소도 함께 공부하니 더욱 흥미가 생긴다. ㅎㅎㅎ  
후킹에 성공하고, 사야할 이유를 알려줬다.  
그 다음은 무엇일까?  
```<section-select>```에서는 라인업을 보여준다.  

<br>
<img width="1467" alt="image" src="https://github.com/user-attachments/assets/45415644-0561-47eb-9d82-28781309b5c0">
<br>

여기까지 해서 설득됐다면 사라는거다.  
후킹 > 특장점설명 > 제품소개 순으로 이루어졌다. 그리고 이 모든것이 단 2~3번의 스크롤로 이뤄졌다.  
긴 내용은 카드로 만들어 좌우로 슬라이드 되게끔 설정되어있다.  
읽을거리가 많은 시끄러운 렌딩페이지에 비해 애플의 페이지는 어지럽지 않아서 더욱 매력적이다.  

#### 아직 부족하시다고요? (section-incentive)
조금만 힘내서 마지막까지 애플의 홈페이지 구조와 어떤 마케팅을 하는지도 같이 알아보자.  
다음은 ```<section-incentive>```다.  

<br>
<img width="1451" alt="image" src="https://github.com/user-attachments/assets/d4d16c1e-dbb5-43c2-9b57-b2038cfbfffb">
<br>

강력한 화력을 쏟았는데 구매하기로 넘어가지 않았다면 부추겨야한다.  
경제적 이슈, 성능적 이슈, 그냥 다 모르겠는 소비자를 위해 구매에 도움을 주는 섹션이다.  
아마 이러한 순서대로 애플 구매를 망설이는 사람이 많은가보다.(나도 그랬다. ㅋㅋㅋ)  

#### 앗? 아이폰을 가지고 계시군요? (section-argument)
아마 보통 맥을 구매하는 사람들은 애플을 맥으로 처음 접하는 사람이 아니라는 판단을 한 것같다.  
그래서 가장 중요한 경제적, 성능적인 문제로도 해결 되지 않는다면, 소비자가 가진 물건과 훌륭한 호환성을 보여준다는 점으로 다시 후킹을 한다.  
다음 섹션이름은 ```<section-argument>```다.
참고로 argument란 마케팅용어로 쓰일 때, 소비자를 설득하는 메세지를 뜻한다.  
이를 테면, 이익이나 증거를 제시하고 반론을 극복하는 것들을 말한다.  

<br>
<img width="1465" alt="image" src="https://github.com/user-attachments/assets/e8029438-a93b-495f-b773-1d03541b30c5">
<br>

마치, 이래도 안살거야? 하는 느낌이다.

#### 이미 맥을 사용중이시라고요? (section-essentials)
자, 이제 다왔다. 마지막에서 2번째 섹션이다.  
어쩌면 이쯤되면 이미 맥을 가지고 있는 사람일 수도 있겠다는 생각을 한 것같다.  
이름하여, ```<section-essentials>``` 섹션이다.
<br>
<img width="1462" alt="image" src="https://github.com/user-attachments/assets/150dc903-d8ce-452b-9f00-884ae0c70b7a">
<br>
essentails라는 섹션 태그 이름에서 알 수 있듯이, 필수적인 제품들, 다시말해 맥 이용자에게 필요한 제품들을 소개한다.  
"아 이미 가지고계세요? 혹은 맥은 필요 없으세요? 그렇다면 이것은 어떠세요?" 라고 말하는 것이다.  

#### 다시한번 보시죠. (section-index)
마지막 섹션은 ```<section-index>```다.  
다시한번 맥 라인업에대해 훑어주는 역할을 한다.  
<br>
<img width="1466" alt="image" src="https://github.com/user-attachments/assets/e499eb2d-ffd3-4b81-bab6-db6d9d9ba727">
<br>

### 어김없이. (footer)
이렇게 모든 섹션이 끝나면 어김없이 ```<footer>```태그가 나온다.  
여기까지 보는 사람들은 솔직히 몇 없다.  
그래서일까?  
위 섹션처럼 멋드러지지거나 힘주지 않았다. 그냥 텍스트만 구구절절이다.  
이건 다른 웹사이트도 동일하다.  
나는 아직 ```<footer>```가 멋드러지는 사이트는 본 적 없다.
<img width="1462" alt="image" src="https://github.com/user-attachments/assets/2fbaa401-452e-498f-bbbb-afa9cfb82128">

## 업계표준
잘되면 그게 업계표준이다.  
이쪽 시장이 매력적인 이유는 이론먼저 나오고 실물경제에 연결되는 것이 아니라 실물경제에서 먹히는 것들이 이론적으로 발전된다.  
내 삶도 그렇다.  
나는 먼저 배우고 뛰어드는 것보다 뛰어들고 뭐가 필요한지 찾아내는 것을 더 좋아한다.  
그래서 나의 배움은 즐겁다.  
이것이 내가 프로그래밍에 매력을 느끼는 이유이기도 하다.  
이제 시작일뿐이지만 ㅎㅎ  
