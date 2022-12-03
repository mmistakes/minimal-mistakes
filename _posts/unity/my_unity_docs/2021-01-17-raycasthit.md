---
title:  "Unity C# > UnityEngine : Ray, RaycastHit" 

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


# 👩‍🦰 Ray

> 레이캐스트의 광선 그 자체. 발사 위치와 발사 방향을 담고 있는 구조체다.

## 🚀 변수/프로퍼티

### ✈ direction

> public Vector3 direction;

Ray 의 방향

<br>

### ✈ origin

> public Vector3 origin;

Ray 의 진원지

<br>


# 👩‍🦰 RaycastHit

> `Raycast` 레이캐스트로부터 정보를 얻기 위한 타입으로 <u>광선에 감지된 Collider의 정보를 담는 컨테이너</u>다.

## 🚀 변수/프로퍼티

### ✈ normal

> public Vector3 normal;

광선에 감지된 Collider의 노말 벡터 (충돌 표면의 방향벡터)

<br>

### ✈ distance

> public float distance;

광선 발사 위치로부터 광선에 감지된 Collider까지의 거리

<br>

### ✈ point

> public Vector3 point;

광선에 감지된 Collider의 충돌 위치벡터

<br>

### ✈ collider

> public Collider collider;

광선에 감지된 Collider

<br>

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}