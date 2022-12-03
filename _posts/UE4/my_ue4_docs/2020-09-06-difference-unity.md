---
title:  "UE4 Unity와 다른점들 정리" 

categories:
  -  UE4Docs
tags:
  - [Game Engine, UE4]

toc: true
toc_sticky: true

date: 2020-09-06
last_modified_at: 2020-09-06
---

***

> [유니티 개발자를 위한 언리얼 엔진 4 in 언리얼 공식 문서](https://docs.unrealengine.com/ko/GettingStarted/FromUnity/index.html)

## 👩‍🦰 용어

|카테고리|**유니티**|**언리얼**|
|:---:|---:|---|
|게임 플레이 유형|컴포넌트|컴포넌트|
||GameObject|액터(Actor), 폰(Pawn)|
||프리팹(Prefab)|블루프린트 클래스|
|에디터|Hierarchy|월드 아웃라이너|
||Inspector|디테일|
||Project Browser|콘텐츠 브라우저|
||Scene|뷰포트|
|메시|Mesh|Static Mesh|
||Skinned Mesh|Skeletal Mesh|
|머터리얼|Shader|Material|
||Material|Material Instance|
|이펙트|Particle Effect|Effect, Particle, Cascade|
||Shuriken|Cascade|
|UI|UI|UMG|
|애니메이션|Animation|Skeletal Animation System|
||Macanim|Persona, Animation Blueprint|
|2D|Sprite Editor|Paper 2D|
|피직스|Raycast|Line Trace, Shape Trace|
||Rigid Body|Collision, Physics|

<br>

## 👩‍🦰 좌표계

- 유니티 
  - `X` 수평적인 앞 뒤
  - `Y` 수직적인 위 아래
  - `Z` 수평적인 오른쪽 왼쪽
- 언리얼
  - `X` 수평적인 앞 뒤
  - `Y` 수평적인 오른쪽 왼쪽
  - `Z` 수직적인 위 아래

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}