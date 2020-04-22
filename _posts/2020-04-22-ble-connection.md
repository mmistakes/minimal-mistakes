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

### 4.1 Advertising

BLE 무선연결의 시작은 `GAP periphral`로 동작하는 디바이스에서 advertising 동작을 수행하는 것으로 시작된다. <span style="color:#0F7F5F"><b>Advertising 이란</b></span>, 해당 디바이스의 정보 (**Device Name, Mac Address, Tx Power, .etc**)를 `GAP central`로 동작하는 근처 BLE 디바이스에 알리는 동작이다.

아래 그림과 같이 advertising을 수행하는 디바이스는 **PHY** (Physical Layer)의 40 개의 채널 중 3개의 advertising 채널(*37번-39번*)을 이용하며, 각 채널은 2.4 GHz 대역 중에서도 WiFi 와의 간섭이 가장 적을 것으로 예상되는 주파수를 중심 주파수로 갖는다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-conn-fig-1.png" alt="">
  <figcaption>출처: https://www.argenox.com/library/bluetooth-low-energy/ble-advertising-primer/</figcaption>
</figure>

---

### 4.2 Scanning

다음으로, `GAP central`로 동작하는 디바이스는 BLE 무선연결을 위해 근처에 연결 가능한 디바이스가 있는지 찾아본다 (**scanning**). 이는 즉, 근처에 advertising 하고 있는 디바이스가 있는지를 확인하는 작업이므로, scanning 또한 40개의 채널 중 advertising 채널에 대해 수행하게 된다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-conn-fig-2.png" alt="">
  <figcaption>출처: https://microchipdeveloper.com/wireless:ble-link-layer-discovery</figcaption>
</figure>

위 그림에서 볼 수 있듯이, 일반적으로 `Advertiser = peripheral` 디바이스는 한 번에 3개의 채널로 advertising 하고,  `Scanner = central` 디바이스는 일정 간격으로 하나의 채널을 scanning 한다. 주요 scanning 파라미터로는 `scan interval` 과 `scan window` 가 있는데, 그림에서 볼 수 있듯이 `scan interval` 은 scanning 을 시작하는 시간 사이의 간격을 정의하고, `scan window` 는 하나의 채널에 대해 실제로 scanning 하는 시간 (구간)을 정의하고 있다.
>advertising 채널과 scanning 채널이 일치하는 경우에만 `Scanner` 에서 advertising 데이터를 수신할 수 있으며, advertising 시간은 수 ms 인 반면 `Scanner` 에서는 수십에서 수백 ms 동안 scanning 동작을 수행한다. 따라서, `Scanner` 에서는 기본적으로 `Advertiser` 에 비해 보다 많은 양의 전류를 소비하게 된다.