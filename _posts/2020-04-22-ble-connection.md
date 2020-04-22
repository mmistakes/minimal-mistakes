---
title: "BLE (4) - BLE 디바이스는 서로 어떻게 연결할까?"
categories:
  - BLE
tags:
  - GAP
  - connection
  - advertising
  - scanning
toc: true
toc_sticky: true
---

## 4. BLE 무선연결 과정

이전 포스트에서 BLE 시스템의 연결 및 advertising 동작을 관리하는 최상위 레이어는 **GAP** (Generic Access Profile)이고, 서로 다른 BLE 디바이스 사이의 상호작용을 관리하는 모듈이라고 소개한 바 있다 (**[BLE 프로토콜 스택](https://enidanny.github.io/ble/ble-protocol-stack/#25-generic-access-profile-gap)**). 이번 포스트에서는 <span style="color:#0F7F5F"><b>BLE 연결 과정</b></span>에 대해 조금 더 자세하게 소개하고자 한다.

### 4.1 Advertising 이란

BLE 무선연결의 시작은 `GAP periphral`로 동작하는 디바이스에서 advertising 동작을 수행하는 것으로 시작된다. <span style="color:#0F7F5F"><b>Advertising</b></span>이란, 해당 디바이스의 정보 (**Device Name, Mac Address, Tx Power, .etc**)를 `GAP central`로 동작하는 근처 BLE 디바이스에 알리는 동작이다.

아래 그림과 같이 advertising을 수행하는 디바이스는 **PHY** (Physical Layer)의 40 개의 채널 중 3개의 advertising 채널(*37번-39번*)을 이용하며, 각 채널은 2.4 GHz 대역 중에서도 WiFi 와의 간섭이 가장 적을 것으로 예상되는 주파수를 중심 주파수로 갖는다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-conn-fig-1.png" alt="">
  <figcaption>출처: https://www.argenox.com/library/bluetooth-low-energy/ble-advertising-primer/</figcaption>
</figure>

### 4.2 Scanning