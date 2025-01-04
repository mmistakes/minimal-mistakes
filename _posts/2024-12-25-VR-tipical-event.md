---
layout: single            # 싱글 페이지 레이아웃 사용
title: "VR트래커의 기본 이벤트"    # 포스트 제목
excerpt: "VR 인터랙션의 기본이 되는 이벤트들에 대해 알아보자"    # 포스트 요약 (목록에서 표시됨)
categories: VR, Unity           # 포스트 카테고리
tag: [Interaction, Event]    # 태그 목록
toc: true               # 목차 사용 여부
toc_sticky: true        # 목차를 스크롤해도 고정할지 여부
author_profile: false    # 작성자 프로필 표시 여부
sidebar:                 # 사이드바 설정
    nav: "docs"         # docs 네비게이션 사용
---

1. 이벤트의 종류 및 속성

(1) Interactor Events

![VR Game Scene](https://lh7-us.googleusercontent.com/WQc5CWDS8xTKSuR7OHzIhBbeN5MpoqSM8tSM8M51alfRgFNU1RqQc2C3MZulyXDEr49NuCs9Z6aLNCkYrsIyUG7jtWH088VuRSG1bOHmy8RoviB0NlnsEIrFb2M41NIiEs9S2o8Is7XDhzQxHCWuBdQ)

(2) Interactable Events

- Cube 인스펙터 창에서 보면 Interactable Events 속성이 있고, 어떤 이벤트들이 존재하는지를 알 수 있다.

![VR Game Scene](https://lh7-us.googleusercontent.com/ciS2kzRMYn-T9aAI7YHPum4vtgJ-7DTtfZYNoFRdGJe7_6osbdcxIBMcrvxS_eR6kawUrV_AT-tDWn9MH2jJVaRZCIzn2XOECPkxFCE1jcb0Ux5Hy7h56EAa1kdI4GDNNBEu5ts2bZiHcx1Gd8YGLLA)

- Cube → XR Grab Interactable → Interactable Events 에는 다양한 이벤트들이 있다.
  - Hover : Interactor 와 Interactable 이 Overlap(서로 겹치게 되는 현상) 되는 상황을 말함, 대부분의 이벤트 중 가장 많이 사용하는 이벤트라고 할 수 있음
  - Select : Interactror(Custom Controller)와 Interactable(Cube)이 Overlap 상태에서 Select 제스처를 하면 (일반적으로 Gript 키를 누르면) Interactor(콘트롤러) 가 Interactable(큐브) 을 Select 하게 된다.
  - Focus
  - Activate : Select한 상태에서, Grip 키를 누르고 있는 상태에서 Activate 제스처를 하게 되면 발생하는 이벤트
  - First 이벤트 : 여러 Interactor 들이 인터랙션을 했을 때, 가장 먼저 들어온 Interactor만 처리하는 이벤트
  - Last 이벤트 : 가장 나중에 나간 Interactor만 처리하는 이벤트

1. scripts 폴더 안에 스크립트 작성 : EventTest.cs
2. LeftHand Direct Interactor 와 Cube에 각각에 EventTest.cs 를 추가한다.

- Debug.Log($"{gameObject.name} - OnFirstHoverEntered");
  - gameObject.name : 이벤트가 발생한 게임오브젝트의 이름을 출력
  - 어떤 이벤트가 발생했는지를 출력

![VR Game Scene](https://lh7-us.googleusercontent.com/NMFA53UgEjtiw_0sWmW1i403rTqHUSdA_6MQyYcM_ZwfcqH8cwve_jC89ZFxiCpU1iOlgbZt7yDgUjHJWhCaqr48T0vnVBrt5tVJg6o2ByGSqFroBVpVwv0tZjCzFAuZWYiTkM8fHK_shX4D4vrJAJA)

![VR Game Scene](https://lh7-us.googleusercontent.com/pxxgujFQ-Ue5iI5vQ4W912nR0w9xs9iL1gytkVoVGYFUVQPqjr0673b6VAWRHcPwRgUcXY19rjdafDBuCDDdko-HIfcoeLdzZYbtWzeCrI0gA7NHoMtvyowUiBMVE1Qt6JZwOvZGhqexm5cC97Ms9-c)

![VR Game Scene](https://lh7-us.googleusercontent.com/wHsr1vAjoYgmvIIIiJznBmQVEZztZBMStuLkZbNfEJqtX_veeNtbptTBTubP9pNK7VggBbNG-SLlXQJue-TwTEzeG2eGsF-DIiTtwSanybuscA2PR1OsPcrvl0bIBD-aRWGhXc5n_mgBOlb7X-foofg)

![VR Game Scene](https://lh7-us.googleusercontent.com/7u8di0T6D6g7e7qbtDBHNcHbpJwTWRsIJccbA6clGZcLFMMU-49eX1ZtG0v6TRYurDakWBiX4F-zsF6jXXYNuVqOFkGJRX5vL0okKUryCj5xTdEQX0X_SGeHxnGou1hIl3V7Gk1VQIVRdOkWNvPLrMY)

2. Interactor Event 설정

3) LeftHand Direct Interactor → Interactor Events에서 Hover Entered / Hover Exited / Select Entered / Select Exited 에서 (+) 을 눌러서 하나씩 추가하도록 한다.

4) 추가한 다음 EventTest.cs 콤포넌트를 이벤트 객체에 연결시킨다. (인스펙터 창에 바로 아래에 추가된 EvnetTest.cs 스크립트 컴포넌트를 마우스로 드래그 해서 연결 시킨다)

5) 함수를 연결 시킨다.

- Hover Entered : OnHoverEntered()
- Hover Exited : OnHoverExited()
- Select Entered : OnSelectEntered()
- Select Exited : OnSelectExited()

![VR Game Scene](https://lh7-us.googleusercontent.com/gswrk4n9bZnNlBfJJfNTwhqilqcwFy8JH6pbg23g5cXKCJFXB7kU_s4fKtngeW2L7aRRsuaRTGjccYQTIjlfEs4mC9Pgs8NvnKqGQAC9dL1Ud69l_U1sXidltfxdp878AQ4riIMtm8gh8QqGOD46IKI)

3. Interactable Event 설정

6) Cube를 선택 한 후 XR Grab Interactable 를 선택하고, Interactable Events를 선택한 후 앞에서 했던 방식과 마찬가지로. 이벤트를 하나씩 추가 한다. 대신 객체는 Cube 자신을 연결 시킨다. 그리고 각각 해당하는 함수를 지정한다.

- First Hover Entered - OnFirstHoverEntered()
- Last Hover Exited - OnLastHoverExited()
- Hover Entered - OnHoverEntered()
- Hover Exited - OnHoverExited()
- First Select Entered - OnFirstSelectEntered()
- Last Select Exited - OnLastSelectExited()
- Select Entered - OnSelectEntered()
- Select Exited - OnSelectExited()
- First Focus Entered - OnFirstFocusEntered()
- Last Focus Exited - OnLastFocusExited()
- Focus Entered - OnFocusEntered()
- Focus Exited - OnFocusExited()
- Activate - OnActivated()
- DeActivate - OnDeactivated()
- 아래 그림은 다음과 같이 이벤트만 셋팅 했을 때 Overlap 시 호출되는 event 에 대한 결과 화면이다. 콘트롤러가 큐브쪽에 다가가서 부딪혔을 때 (Overlap) 호출되는 이벤트임
  - Interactor : LeftHand Direct Interactor
    - Hover
  - Interactable : Cube
    - First Hover
    - Hover

![VR Game Scene](https://lh7-us.googleusercontent.com/MAXTBNlN4hwMzr-kF3s3wtxfEKFJQ_0WGnj6EhAMOjE3KOO-x2sNBuzPFjHvX4ZCAXULUbVIm-vVn88Erlsm_uoGznwSCA3IuRSt7nWPT8V9bEFS5QPTJDb6OnF-WHfeMR_OjoVgdWVmBywpUGGzPmE)

- 아래 그림은 Interactor - Interactable - Grap 의 동작에 따른 호출되는 이벤트 함수들을 나타낸 그림이다. 먼저 물건을 잡기 위해서는 Interactor가 Interactable과 겹쳐져야 한다(Overlap). 이때 발생되는 이벤트 함수들이 Interactor입장(콘트롤러)에서 호출되는 함수들과 Interactable 입장(큐브)에서 호출되는 함수들로 나눠 질 수 있다. 또한 겹쳐져 있는 상태에서 G 키를 누르고 있으면 Select(선택)되어진 상태를 의미한다.

![VR Game Scene](https://lh7-us.googleusercontent.com/kx-0b8NoGpWS4my7jYxryFDt7TFeWLkzIj4JcYfYd-AQPpOhNhOXIc1xwTJ38jVdnba0FzqdP7hukk2PKnyc1MGqKjBzjAyMXdnG6royFqz_BOHV4w7osi1cqvHvaQB4qOtJqNt9V7b5g-hu1WECCZA)

7) Cube의 위치와 스케일을 다음과 같이 조정하여 잘 볼 수 있도록 한다.

![VR Game Scene](https://lh7-us.googleusercontent.com/Bu-6hu53mSfMsovD6wdpeg_FSCdeAWzBezpYjF7rehu40JJpyilwjIjI2R-sJd2lEv7DDdwrwUA2SfHmQc-EtJ-sAdh_K7kKz9FRo9_DQF6kvKoUhEKDI_c0BJg6zh2_OsLvch_RsstytSjQPQnOJss)

8) 실행해서 컨트롤러를 큐브에 부딪쳐 보자. 각각 해당하는 이벤트 함수들이

호출되는것을 콘솔창에서 확인해 볼 수 있다. (모든 이벤트를 셋팅 했을 때)

![VR Game Scene](https://lh7-us.googleusercontent.com/MUgAjby6Qh5YVoOxKKCEnjQwu4Vu59P2yf21CgsDuXqVDhmXoiR03zJkVjr7C6OowJySes6G1IcJMhc54_MEMVYZVo9wJqBDaDj2Xm3grJvILNJ5S-VtAy2y8EEMNVeTZHGqVXJd9np_xquoOvywyBk)

![VR Game Scene](https://lh7-us.googleusercontent.com/x-IiBzN5K4rl_NOcrmSu2Ac3JoiPgZ6C-lsmW1ai5wIHcbnMzlvs-eNJRV5p5S7UjWYq2fHeictij7-DI5srD2myObCin9PaMF4Lf2BZugnjQ2okdWaYO2elwGo-UPAeC5L8RpON5--_0XleHmm5Lno)

- 이번에는 광선(Ray Interactor)이 큐브에 Overlap 되었을때도 이벤트가 발생 되는가에 대해 알아 본다.

9) 오른쪽 컨트롤러를 보이기 위해서 기존에 비활성해 둔 Right Controller를 다시

활성화 한다.

10) 활성화 한 Right Controller 에 기존에 만든 EventTest.cs 콤포넌트를 추가한다.

11) Right Controller → XR Ray Interactor → Interactor Events 에서 아래와 같이 4개의 이벤트를 추가 한다. 객체는 방금전에 추가한 EventTest.cs 객체를 할당한다.

- Hover Entered → OnHoverEntered()
- Hover Exited → OnHoverExited()
- Select Entered → OnSelectEntered()
- Select Exited → OnSelectExited()

![VR Game Scene](https://lh7-us.googleusercontent.com/mk6yy67QW7_8IqjyMClTUNr7A7Ce7oDdXMf6zZEIHRzK4YFuC2RDTc0RCPdP7BTexyWsR5quBEfJdPsh86weF4TStBmhKoNVpiCg7NTbdJBMxqP0Cs5tco9I_ORwcCCtRo5ivkieHXn709zI-h_DRJM)

- 레이가 큐브에 닿았을 때 레이의 색깔이 회색으로 바뀌고 빠져 나왔을 때 빨간색으로 변화하는것을 볼 수 있다. 아래 결과 창에 gameObject 가 Right Controller로 출력되는 것을 알 수 있다.

![VR Game Scene](https://lh7-us.googleusercontent.com/QOZ21otyTJzdapcGz5dEQ1F97AWvjGXk1NJCi5RStwFm1c-dmFg-1xLdZ0OSmvqmA2WEOnamNwsZbt59KxJ0J8dt_QtqKnweNouaVvlDaH8r5ApSeSHQn_iqUPGSygYY-BMcNHvN6aEthR8K8M0R2MA)

![VR Game Scene](https://lh7-us.googleusercontent.com/lqInZ8ekn3Dio5geSNrbBAUerHmL3XYppI3P_k2h0Qzi_2y-IxRaaTJ0pp09BwaTvmU77baKj5JdteZ2ySaGFrW2P01-E-Hb9ZBjAPMjNh-h_jtm0PnZBbER783k5QXZY_j_1i8hiQ_XxWaFVEZ4uAI)