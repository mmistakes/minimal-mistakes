---
title:  "Unity C# > 컴포넌트 : Line Renderer 와 프로퍼티/함수 모음" 

categories:
  -  UnityDocs
tags:
  - [Game Engine, Unity]

toc: true
toc_sticky: true

date: 2021-01-17
last_modified_at: 2021-01-17
---

공부하면서 알게된 것만 정리합니다.😀
{: .notice--warning}

# 👩‍🦰 Line Renderer

주어진 점들을 이은 선을 그리는 역할을 한다.

## 🚀 변수/프로퍼티

### ✈ positionCount

<u>선에 위치한 정점의 수</u>를 Set 하고 Get 할 수 있는 프로퍼티. 

<br>

## 🚀 함수

### ✈ SetPosition

> public void SetPosition(int index, Vector3 position);

- 인수 👉 정점 인덱스, 위치로 사용할 Vector3 
- 선분 상의 정점의 위치를 지정하는 함수

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right} 