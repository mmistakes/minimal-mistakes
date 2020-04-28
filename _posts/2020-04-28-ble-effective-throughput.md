---
title: "BLE (5) - BLE 통신 속도는 실제로 1 Mbps 일까?"
categories:
  - BLE
tags:
  - data rate
  - effective throughput
  - connection
  - LE packet
toc: true
toc_sticky: true
---

## 5. BLE effective throughput

BLE 프로토콜을 지원하는 디바이스의 스펙 사양 (specification)을 보면 데이터 전송 속도가 `1 Mbps` 라고 명시되어 있는 것을 볼 수 있을 것이다(~ BLE 4.2). 일반적으로 데이터 전송 (통신) 속도를 정의할 때 주로 사용되는 `bps = bits per second` 단위는 문자 그대로 초당 보낼 수 있는 비트의 수를 정의한다.

`1 Mbps` 라는 것은 BLE 프로토콜에서 초당 백만 비트의 신호를 보낼 수 있는 속도로 데이터를 전송할 수 있음을 나타낸다. **그러나, 초당 백만 비트의 신호를 보낼 수 있는 속도로 데이터를 전송해도, 실제 유효한 데이터는 그만큼 전송할 수 없다.**
>예를 들어, 달리기 시합에서 100 미터를 10 초만에 완주할 수 있는 사람이 있다고 가정해보자. 그 사람은 신체적으로 빠르게 달릴 수 있는 능력이 있지만, 무거운 짐을 들고 있거나 사람들이 밀집된 지역에서는 평소처럼 빠르게 달리기 어려울 것이다.

이번 포스트에서는 BLE 프로토콜에서의 실질적인 데이터 통신 속도 (effective throughput)에 대해 알아보고, 전송 속도와 실제 통신 속도가 다른 이유에 대해서도 소개할 예정이다.

### 5.1 BLE Link Layer (LL) packet

**[이전 포스트]()** 에서는 BLE 프로토콜에서 `Central = Master` 디바이스와 `Peripheral = Slave` 디바이스 사이의 무선 연결 과정에 대해 소개하였다. 두 개의 디바이스가 무선 연결에 성공하고 나면, 연결 주기에 맞춰서 데이터를 주고 받는데, 이 과정에서 실제로 전송되는 데이터는 다음의 패킷 형태로 전송된다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble5-fig-1.png" alt="">
</figure>

위 그림에서 볼 수 있듯이, 실제 전송되는 BLE 신호는 유효한 데이터 (**ATT Payload**) 이외에도 BLE 프로토콜 스택의 레이어에서 데이터를 분류하고 오차를 보정하는데 사용되는 온갖 데이터를 포함한다. 

---

### 5.2 전송 시간

BLE 패킷에서 실질적인 데이터는 ATT Payload 영역에 저장되는데, BLE 4.2 부터 지원되는 DLE (**data length extension**) 기능을 사용하는 경우 해당 영역을 최대 `244 bytes` 까지 확장할 수 있고, 그렇지 않을 경우에는 한 번에 `20 bytes` 의 데이터만 전송할 수 있다. 또한, BLE 5.0 이전까지는 `1 Mbps` 의 전송 속도를 가지므로, BLE 4.2 기준으로 `20 bytes` 이하의 데이터를 전송하는 경우의 BLE 패킷 구조는 다음과 같다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble5-fig-2.png" alt="">
</figure>

`20 bytes` 데이터를 전송하기 위해서는 다른 영역의 데이터를 포함해서 `1 + 4 + 29 + 3 + 4(MIC) = 41 bytes` 사이즈의 패킷을 전송해야 한다. 따라서, `20 bytes` 데이터를 전송하는데 걸리는 시간은 `20 * 8 bits / 1 Mbps` 와 같이 계산할 수 있다. 

추가로, BLE 디바이스는 무선으로 연결된 상태에서 연결을 유지하기 위해 일정 시간마다 실제 데이터가 포함되지 않은 더미 패킷 (**Empty packet**)을 송수신한다. 그렇기 때문에 데이터 패킷을 전송하는 과정에는 아래 그림과 같이 하나의 더미 패킷까지 함께 고려한다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble5-fig-3.png" alt="">
</figure>

그림에서 IFS (**inter-frame space**)는 인접한 패킷을 구분하기 위한 시간 간격으로 `150 us` 정도로 고려한다. 더미 패킷은 `Preamble(1) + Access Address(4) + LL Header(2) + CRC(3) = 10 bytes` 사이즈를 갖는다. 따라서, `20 bytes` 의 데이터를 전송하는데 걸리는 데 필요한 전송 시간은 다음과 같이 계산할 수 있다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble5-fig-3.png" alt="">
</figure>

---

### 5.3 최대 전송 패킷

<!-- Connection interval 은 7.5 ~ 4초인데
실제로 그 사이에는 서로 패킷을 여러번 주고 받는다. 한 두개 주고 받는게 아님

위의 패킷을 한 간격동안 이거를 몇번 보낼 수 있는가?가 최대 전송 패킷임

Nordic 지원하는 스택에서는 6개이지만
Andriod 또는 iOS 디바이슨느 일반적으로 4개 많으면 6개

물론 4.1 까지는 한 사이클에 6개는 충분히 보내고도 남는다

그러나 4.2 ~ 5.0 은 ATT 실제 데이터가 244 bytes 이기 때문에

한번에 6개를 못보내는 경우도 있음.. 아무튼

4.1 이하의 경우는 최대 전송 패킷은 디바이스 스펙에 따라 나뉜다. -->

---

### 5.4 Effective throughput

<!-- 계산은 간단하다. interval 동안에 몇개 데이터 보낼 수 있는지 계산하면 됌

최대 128 kbps 정도가 나온다.

따라서 1Mbps 의 BLE 4.1 까지는 이정도 스펙이라고 보면 된다 실제로.

속도 결정짓는 요소는

ATT paylod 크기
connection interval
최대 전송패킷

-->

---

**Reference**

