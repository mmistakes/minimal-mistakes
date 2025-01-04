---
layout: single
title: "VR 상호작용"
excerpt: "VR Interactor"    # 
categories: [Unity, VR]
tag: [interaction]
toc: true
author_profile: false
sidebar:
    nav: "docs"
search: true
---

# VR 상호작용

## 1. Interactor 만들기
이번 챕터에서는 Action - Based XR Origin(VR) 안에 Interactor 기능을 하는 기본적으로 들어 가 있는 Left/Right Controller 대신에 직접 Interactor를 만들어 보는 작업을 진행한다.

### 1.1. Interactor의 개념
- Interactor : 인터랙션을 시도하는 쪽(일반적으로 컨트롤러)
- XR Direct Interactor
- Interactable : 인터랙션이 되어지는 쪽(일반적으로 래이캐스팅 당하는 물체)
- Interaction manager : Interactor와 Interactable 을 주관해서 관리함
- XR Direct Interactor : XR Interaction Toolkit에서 제공해주는 Interactor로서 직접적인 상호 작용을 할 수 있게 해주는 컴포넌트 임

### 1.2. Interactor 구현 과정

1. LeftHand Controller / Right Controller 는 비활성화 한다.

![](/images/2024-12-24-VR-interaction/image1.png)

2. Camera Offset 에서 마우스 오른쪽 버튼 → XR → Direct Interactor(Action-Based) 를 클릭 → 이름을 LeftHand Direct Interactor 라고 지정

![](/images/2024-12-24-VR-interaction/image2.png)

3. LeftHand Direct Interactor 의 인스펙트 창에서 XR Controller (Action-Based)를 선택하면 체크가 비워저 있는데, Preset 버튼(XR Controller (Action-Based) 창 오른쪽에 보면 ?, 점 3개 사이에 있는 왔다 갔다 하는 모양의 아이콘)을 눌러 XR Default Left Controller 를 선택한다. 그리고 자동으로 밑에 Sphere Collider가 추가 되는 것을 확인 할 수 있다.

![](/images/2024-12-24-VR-interaction/image3.png)

4. XR Controller (Action-based) 컴포넌트 맨 아래로 내려가 보면 Model > Model Prefab 에 다가 Prefabs 폴더안에 있는 내가 만든 커스텀 컨트롤러인 Model를 끌어다 연결 시킨다. (기존에 만들어 놓은 프리펩 모델이 없으면 그냥 디폴트 모델을 적용해도 무관)

5. 실행 시키면 Sphere Collider가 붙어 있는 Left 컨트롤러가 생기는 것을 볼 수 있다.

![](/images/2024-12-24-VR-interaction/image4.png)

6. LeftHand Direct Interactor를 복사해서 RightHand Direct Interactor를 만들도록 한다. 그러면 라인이 빠진 컨트롤러(Line Render 컴포넌트가 현재는 없음)만 있는 모습을 볼 수 있다.

![](/images/2024-12-24-VR-interaction/image5.png)

## 2. Interactable 만들기

### 2.1. XR Grab Interactable 이해하기
XR Interaction Toolkit 에서 제공해주는 Interactable 중 XR Grab Interactable 이 있다. 붙어 있는 게임 오브젝트를 집을 수 있도록 해준다.

### 2.2. Interactable 구현 과정

1. 하이어라키에 새로운 Cube 게임 오브젝트를 하나 만든다. Position(0, 0, 3.0) 정도로 해서 앞에 보이도록 한다.
2. Cube에 XR Grab Interactable 컴포넌트 추가 - 자동으로 Rigidbody 컴포넌트가 추가 된다.
3. Rigidbody 에서 Use Gravity 를 체크 해제 한다.
4. 실행 시킨 다음 콘트롤러를 Cube에 갔다 대고 왼쪽 Shift - 마우스 왼쪽 클릭 - G 키를 누르는 순간 (동시에 눌러야 함, 계속 G 키를 누르고 있어야 함) Cube가 Graping 되어, 컨트롤러의 움직임과 같이 동기화 되어 움직이는 것을 확인 할 수 있다

![](/images/2024-12-24-VR-interaction/image6.png)
![](/images/2024-12-24-VR-interaction/image7.png)

- Interactor Layer Mask : 유니티의 기본 레이어 말고 XR Interaction을 위한 별개의 레이어를 구성할 수 있다. Interactor 에서는 Everything 으로 선택하고, Interactable 에서는 Default로 선택한다. (모든 Interactor 와 모든 Interactable이 서로 Interaction 될 수 있는 기본 설정임)
  - Interactor : LeftHand Direct Interactor → XR Direct Interactor → Interactor Layer Mask → Everything
  - Interactable : Cube → XR Grab Interactable → Interaction Layer Mask → Default

![](/images/2024-12-24-VR-interaction/image8.png)

- XR Grab Interactable : 객체를 선택하면 (집으면) Interactor 쪽으로 당겨져 오는 기능이 있음. 만약에 선택했을 당시의 거리를 그대로 유지하기 위해서는 XR Offset Grab Interactable 컴포넌트를 사용해야 한다.
- LeftHand Direct Interactor → XR Direct Interactor → Hide Controller On Select 기능은 물체를 집을 때 물체를 숨기게 할 수 있는 기능이다.
- LeftHand Direct Interactor → XR Direct Interactor → Select Action Trigger → Toggle이나 Sticky로 셋팅하면 Grip 키를 누르고 있을 때 잡히는게 아니라 누르는 순간 잡히고, 다시 눌렀다 뗄 때 떨어지는 그런 옵션으로 설정할 때 사용