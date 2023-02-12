---
layout: single
title: "Virtual DOM "
categories: React
tag: [React_Grammar_Intensive,Sail99]
---

[TOC]

# DOM이란?

Document Object Model

웹페이지는 수많은 컴포넌트로 구성(nav 요소들이 대표적)

우선 태그하나하나는 element

DOM == element를 트리형태로 표현한 것
DOM에서 element요소들을 'Node'라고 부름
각 노드는 Api를 제공 (Api : HTML요소에 접근해 수정가 능한 함수정도로 이해)

form validation도 접근하여 가져와서 확인

# 개념링크 

[가상DOM == Virtual DOM](https://teamsparta.notion.site/09-DOM-Virtual-DOM-b3e9eabede01478cafb121fc95f1f34e)



화면이 바뀌어야 하죠. 저 빨간색 하트에 해당되는 **엘리먼트 DOM 요소가 갱신**돼야 한다는 거에요. **`DOM을 조작`**해야 한다는 의미입니다.

**[STEP 1]**

이 과정에서 리액트는 항상 **`2가지 버전의 가상DOM`**을 가지고 있어요.

- 버전 1 : 화면이 갱신되기 **전** 구조가 담겨있는 **가상DOM 객체**

- 버전 2 : 화면 갱신 **후** 보여야 할 **가상 DOM 객체**

리액트는 **`state`**가 변경돼야만 리렌더링이 되죠. 그 때, 바로 2번에 해당되는 **가상 DOM을 만드는거죠.**

**[STEP 2 : diffing]**

**state**가 변경되면 2번에서 생성된 가상돔과 1번에서 이미 갖고있었던 **가상돔을 비교**해서 어느 부분(엘리먼트)에서 변화가 일어났는지를 상당히 빠르게 파악해내요.

**[STEP 3 : 재조정(reconciliation)]**

파악이 다 끝나면, 변경이 일어난 **그 부분만** 실제 `DOM에 적용`시켜줘요. 적용시킬 때는, 한건 한건 적용시키는 것이 아니라, 변경사항을 모두 모아 한 번만 적용을 시켜요**(Batch Update 🔥)**

- **(3) Batch Update**

  우리는 앞서, useState 시간에 리액트가 state를 batch 방법으로 update 한다는 것을 배웠어요. 변경된 모든 엘리먼트를 한꺼번에 반영할 수 있는 방법이기도 하죠!

  

  이렇게 보면 이해가 쉬워요. 

  <**클릭 한 번으로 화면에 있는 5개의 엘리먼트가 바뀌어야 한다면>**

- 실제DOM은 5번을 페인팅
- 가상DOM은 Batch Update로 한번에 페인팅