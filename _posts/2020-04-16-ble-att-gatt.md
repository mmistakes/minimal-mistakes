---
title: "BLE (3) - ATT/GATT"
categories:
  - BLE
tags:
  - ATT
  - GATT
  - data structure
toc: true
toc_sticky: true
---

## 3. ATT/GATT

BLE 프로토콜 스택에서 Attribute protocol (**ATT**)은 서버 (**server**)와 클라이언트 (**client**) 사이의 <span style="color:#0FAFAF"><b>데이터 교환에 대한 규칙</b></span>을 정의한다. 다음의 그림에서 볼 수 있듯이, 어플리케이션 단에서의 데이터 교환은 **ATT** 를 기반으로 이뤄지며 각각의 데이터는 구조는 Generic Attribute Profile (**GATT**)에 의해 정의되는 <span style="color:#0FAFAF"><b>데이터 구조</b></span>를 따른다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-att-gatt.png" alt="">
</figure>

>대부분의 BLE 칩 제작사 **(e.g. Nordic Semiconductor, Texas Instruments, .etc**)에서는 각각의 BLE 칩에서 사용 가능한 BLE 프로토콜 스택 소스를 제공하기 때문에, 펌웨어 개발자가 직접 프로토콜 스택을 프로그래밍하거나 수정하는 경우는 드물 것이다. 다만, BLE 디바이스 내부의 데이터 구조가 어떤 식으로 생성되고, 어떤 정보를 기반으로 데이를 주고 받는지를 알아두는 것은 BLE 시스템을 이해하는데 큰 도움이 될 것이라고 생각한다.

### 3.1 GATT




[ATT 사진]

BLE 스택의 상위 레이어이고, attribute table 로 구성됨.

GATT 구성

[GATT 사진 예]

service

characteristic

구성되어있음

attribute 란 무엇인가?

무엇이다

### Attribute Table 예시

attribute 테이블 사진

출처: https://www.researchgate.net/figure/BLE-Data-Hierarchy_fig2_317553032
