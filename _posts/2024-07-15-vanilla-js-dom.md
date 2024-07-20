---
layout: single
title: '[JS] 바닐라 자비스크립트와 DOM'
categories: SpringBoot
tag: [Spring, SpringBoot]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

## Vanilla JS 란?
바닐라 자바스크립트(Vanilla JS)는 새로운 프레임워크가 아니라 외부의 라이브러리나 프레임워크를 이용하지 않는 순수 자바스크립트를 말한다.여기서 바닐라(Vanilla)는 일반적임(Plain)을 의미한다. 

자바스크립트(JavaScript)의 지속적인 개선으로 인해 대부분의 기능을 바닐라 JS로 구현할 수 있게 되었고 **가상 돔(Virtual DOM)**을 사용하는 라이브러리의 등장하면서 바닐라 자바스크립트의 중요성은 점점 커지고있다. 

## DOM은 무엇일까?
웹 브라우저가 원본 HTML 문서를 읽어들인 후, 스타일을 입히고 대화형 페이지로 만들어 뷰 포트에 표시하기까지의 과정을 “Critical Rendering Path”라고 하며, 이 단계들을 대략 두 단계로 나눌 수 있다. 

첫 번째 단계에서 브라우저는 읽어들인 문서를 파싱하여 최종적으로 어떤 내용을 페이지에 렌더링할지 결정하고 두 번째 단계에서 브라우저는 해당 렌더링을 수행한다.

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-15-vanilla-js-dom\render_tree.png" alt="Alt text" style="width: 70%; height: 70%; margin: 20px;">
</div>

첫 번째 과정을 거치면 **“렌더 트리”**가 생성된다. 렌더 트리는 웹 페이지에 표시될 HTML 요소들과 이와 관련된 스타일 요소들로 구성되며 브라우저는 렌더 트리를 생성하기 위해 다음과 같이 두 모델이 필요하다.

- DOM(Document Object Model) – HTML 요소들의 구조화된 표현
- CSSOM(Cascading Style Sheets Object Model) – 요소들과 연관된 스타일 정보의 구조화된 표현

### DOM의 생성방식

DOM은 원본 HTML 문서의 객체 기반 표현 방식이다. 단순 텍스트로 구성된 HTML 문서의 내용과 구조가 객체 모델로 변환되어 다양한 프로그램에서 사용될 수 있다. 

DOM의 개체 구조는 “노드 트리”로 표현된다. 하나의 부모 줄기가 여러 개의 자식 나뭇가지를 갖고 있고, 또 각각의 나뭇가지는 잎들을 가질 수 있는 나무와 같은 구조로 이루어져 있다.

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-15-vanilla-js-dom1\DOM.png" alt="Alt text" style="width: 70%; height: 70%; margin: 20px;">
</div>

이 케이스의 경우, 루트 요소인 <html> 은 “부모 줄기”, 루트 요소에 내포된 태그들은 “자식 나뭇가지” 그리고 요소 안의 컨텐츠는 “잎”에 해당한다.

위 이미지를 보면 DOM 과 HTML 을 동일한 개체로 착각할 수 있다. 하지만 **DOM은 HTML이 아니다.**

DOM은 HTML 문서로부터 생성되지만 항상 동일하지 않다. DOM이 원본 HTML 소스의 차이점은 다음과 같다. 

- 항상 유효한 HTML 형식이다
- 자바스크립트에 수정될 수 있는 동적 모델이어야 한다
- 가상 요소를 포함하지 않는다. (Ex. ::after)
- 보이지 않는 요소를 포함한다. (Ex. display: none)

## 가상돔(Virtual DOM)

웹 페이지의 특정 요소의 색상을 변경하려면, 그 변경 사항을 적용하기 위해 해당 요소부터 하위 요소까지 브라우저가 화면을 다시 그리는데 가장 많은 비용이 발생한다. 이러한 문제를 해결하기 위해서 React는 가상 돔(Virtual)이라는 개념을 도입했다. 

렌더링이 발생될 상황에 놓이게 되면 새로운 화면에 들어갈 내용이 담긴 가상 돔을 생성하게 된다. 가상 돔은 실제 DOM의 가벼운 복사본으로 메모리 상에 JavaScript 객체 형태로 존재하게된다.

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-15-vanilla-js-dom\virtual_dom.png" alt="Alt text" style="width: 70%; height: 70%; margin: 20px;">
</div>

메모리에 가상 돔을 만들고 실제 돔과 비교하며 작업한 후, 수정된 부분은 실제 돔에 적용하는 식으로 활용할 수 있다. 

브라우저의 성능과 속도 문제를 보완한다는 장점을 바탕으로, 가상 돔을 이용한 프레임워크와 라이브러리는 리액트(React), 뷰(Vue.js), 앵귤러(Angular)가 대표적이다.

가상 돔을 이용할 때 제이쿼리를 쓰면 스크립트 충돌이 발생할 수도 있어서, 되도록 바닐라 JS로 스크립트를 작성하려는 경향이 생다.

### Vanilla JS는 필수일까?

바닐라 JS를 지향하자는 이야기가 나오는 것은 프레임워크나 라이브러리를 무조건 금지하자는 의미가 아니라, 거기에 지나치게 의존하지 말자는 것이 핵심이다. 

기업에서도 바닐라 JS 능력을 중요하게 생각하고 확인하려는 추세이며, 채용 공고에 '자바스크립트에 대한 충분한 이해가 있는 사람'을 우대한다는 내용을 볼 수 있다. 즉 프레임워크나 라이브러리는 언제든 바뀔 수 있으므로 바닐라 JS에 대한 기본적인 개념을 알고 개발하자!


<br>
<br>

----
Reference

- IMAGE
    - <a href = 'https://www.lambdatest.com/blog/document-object-model/'>What Is DOM: A Complete Guide To Document Object Model</a>
- DOM
    - <a href = 'https://wit.nts-corp.com/2019/02/14/5522'>(번역) DOM은 정확히 무엇일까? </a>
    - <a href = 'https://yong-nyong.tistory.com/80'>가상 돔(Virtual DOM)이 무엇이고 왜 중요할까요?</a>

- Vanilla JS
    - <a href = 'https://www.inflearn.com/pages/infmation-56-20221115'>[Vanilla JS, 선택일까 필수일까</a>
