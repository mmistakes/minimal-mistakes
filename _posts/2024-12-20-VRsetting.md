---
layout: single
title:  "VR 초기 세팅"
excerpt: "VR 초기 세팅에 대해 알아보자"
categories: [Unity, VR]
tag: [setting]
toc: true # 오른쪽 UI 목차 기능
author_profile: false # 좌측 프로필 표시 기능
sidebar:
    nav: "docs" # 네비게이션 설정

search: true # 블로그 검색 기능 노출 여부
---





# VR 초기 세팅

---

### **1. 새로운 프로젝트 생성**

- 프로젝트 생성 : VRTutorial
- 3D (URP) 선택

![image](/images/2024-12-20-VRsetting/image.png)

### **2. XR Plugin Management**

- Edit - Project Settings 에서
  - Install XR Plugin Management 설치

![image2](/images\2024-12-20-VRsetting\image2.png)



- pc 탭 아래에서 OpenXR 선택
  - 경고 아이콘이 나올때 클릭(Project Validation) → Fix All

![image3](/images\2024-12-20-VRsetting\image3.png)





- 안드로이드 탭 아래에서 OpenXR 를 선택한다.

![4](/images\2024-12-20-VRsetting\4.png)



- pc 탭 아래에서 (+) 버튼을 눌러서 아래와 같이 셋팅 한다.

![5](/images\2024-12-20-VRsetting\5.png)



- 안드로이드탭 아래에서 (+) 버튼을 눌러서 아래와 같이 셋팅 한다.

![6](/images\2024-12-20-VRsetting\6.png)



### **3. XR Interaction Toolkit**

- Package Manager 에서 Unity Registry 를 선택 한다.
- XR Interaction Toolkit 을 설치

![7](/images\2024-12-20-VRsetting\7.png)



- Samples 탭에서 3개의 샘플을 설치한다.
  - Starter Assets
  - XR Device Simulator
  - Hands Interaction Demo

![8](/images\2024-12-20-VRsetting\8.png)



### **4. XR Origin (테스트 환경)**

- 하이어라키 창에서 Plane 을 하나 만든다. 적당하게 Plane에 머터리얼을 입히도록 한다.
- 하이어라키 창에서 추가 및 위치 리셋
  - XR - XR Origin (XR Rig) → Position (0, 0, 0)
  - Camera Offset → Position (0, 0, 0)
  - Main Camera / Left Controller / Right Controller → Position (0, 0, 0)

![9](/images\2024-12-20-VRsetting\9.png)



- Left Controller
  - Sorting Group 콤포넌트 삭제
- Right Controller
  - Sorting Group 콤포넌트 삭제

![10](/images\2024-12-20-VRsetting\10.png)



### **5. XR Interaction Manager**

XR Origin을 추가하면 자동으로 XR Interaction Manger도 추가 된다. **XR Interaction Manger는 Interactor 와 Interactable 사이의 상호 작용을 담당하는 관리자**이다.

Left Controller 에서 XR Controller (Action-based) 을 보면 입력 작업에 대한 목록이 전부 누락되어 있는것을 확인할 수 있다. Select Preset 버튼(XR Controller 오른쪽 상단의 아이콘)을 눌러서 XRI Default Left Controller 를 선택하도록 한다. 마찬가지로 Right Controller 역시 같은 작업으로 진행한다.

![11](/images\2024-12-20-VRsetting\11.png)





다음으로 XR Origin을 생성할 때 자동으로 적용되도록 할 수 있다.

- Samples - XR Interaction Toolkit - 2.4.3 - Start Assets
  - XRI Default Left Controller 에서 Add to ActionBasedController default 클릭
  - XRI Default Right Controller 에서 Add to ActionBasedController default 클릭



![12](/images\2024-12-20-VRsetting\12.png)



### **6. Preset Manager 연결**

다음으로 Preset Manager를 사용하여 연결해야 한다.

- 편집 - 프로젝트 셋팅 - 프리셋 관리자
  - XRI Default Left Controller 옆의 빈 슬롯에다 “Left” 입력
  - XRI Default Right Controller 옆의 빈 슬롯에다 “Right” 입력

![13](/images\2024-12-20-VRsetting\13.png)



### **7. Input Action Manager**

다음으로 Input Action Manager을 추가 하도록 한다.

- 하이어라키 창에 빈 게임 오브젝트 : XR Manager (position(0, 0, 0))
- 기존에 있던 XR Interaction Manager를 옮겨서 지금 만든 XR Manager 아래로 이동시킨다.
- XR Manager 아래에다가 새로운 빈 게임 오브,ㅈ게트를 하나 만든다. Input Action Manager
- 만든 Input Action Manager 게임 오브젝트에다 새로운 컴포넌트 Input Action Manager를 추가한다.
- 추가한 컴포넌트의 Action Assets 에다가 List (+)를 눌러사 하나의 Element를 추가한다.
- Starter Assets 안에 있는 XRI Default Input Actions 을 끌어다가 위에 만들어놓은 Element에다가 연결 시킨다.



![14](/images\2024-12-20-VRsetting\14.png)





### **8. Test**

다음으로 Sphere 을 Left / Right 밑에다 달아 보도록 하자.

- XR Origin - Camera Offset - Left Controller 밑에다가 Sphere을 하나 추가 (이름 : LSphere, Scale(0.1, 0.1, 0.1))
- XR Origin - Camera Offset - Right Controller 밑에다가 Sphere을 하나 추가 (이름 : RSphere, Scale(0.1, 0.1, 0.1))

![15](/images\2024-12-20-VRsetting\15.png)



![16](/images\2024-12-20-VRsetting\16.png)



### **9. Occulus 장비**

다음으로 Occulus 장비;에 올려 보도록 한다. 아래 사이트에서 소프트웨어 다운로드

- [meta.com](http://meta.com/)/kr/quest/setup (본인은 Quest 2를 가지고 있기 때문에 Quest 2를 기본으로 하였음)

![17](/images\2024-12-20-VRsetting\17.png)



아래 소프트웨어 설치에서 해당하는 아이콘을 클릭한다.

설정에서 [알수 없는 출저]를 활성화 시키고, [OpenXR Runtime] 에서 Occulus 를 활성으로 설정한다.

[https://lh7-us.googleusercontent.com/eIA6gAFn46x5j6l3QuAdH_c8d-_G9oxbS8MaXNexWB1rfFTaBo7LjxBdgpKnq5EF5Y2rDMBnQhnVM3FEQ1qR-ASV0ZRIWbfjK8EtzPQlp-U8_xkqnmAok9vWqDsRlhaSfrXoxk4ZRYPWTmS4kPrW2qk](https://lh7-us.googleusercontent.com/eIA6gAFn46x5j6l3QuAdH_c8d-_G9oxbS8MaXNexWB1rfFTaBo7LjxBdgpKnq5EF5Y2rDMBnQhnVM3FEQ1qR-ASV0ZRIWbfjK8EtzPQlp-U8_xkqnmAok9vWqDsRlhaSfrXoxk4ZRYPWTmS4kPrW2qk)

그리고 Occulus HMD 장비를 쓰고 Air Link 를 선택한 다음 Unity에서 실행을 눌러 보도록 한다. 그러면 아래 실행 결과화면과 같이 Occulus 에서 보이는 화면과 같은 화면이 Unity 실행창에 보이게 된다. (실제 연결된 화면)

### 

![16](/images\2024-12-20-VRsetting\16.png)

