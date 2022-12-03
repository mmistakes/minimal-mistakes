---
title:  "Unity C# > 패키지 : Post Processing" 

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


# 👩‍🦰 Post Processing 패키지

영상 예쁘게 후처리. 영상미! 

## 🚀 컴포넌트

### ✈ Post Processing Layer 

> 카메라에게 Post Process를 반영해줌 

- Trigger에 기본적으로 설정이 되어있는 `Main Camera`(자기 자신) 주변에 가까이 있는, 즉 이 Trigger에 충돌하는` Post Process Volume` 오브젝트의 Box Collider로 충돌하면 이로부터 후처리 설정을 가져와서 자신이 붙어있는 `Main Camera` 카메라 오브젝트에게 이를 반영한다. IsGlobal을 체크하면 꼭 Trigger에 충돌할 필요 없이 게임 화면 전체적으로 후처리를 해줌!
- 여러가지 영상미 효과를 적용할 수 있다.
  - 빛 산란 효과라던가 시네마틱 효과라던가 등등
  - 인스타그램 필터와 같이! 

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}