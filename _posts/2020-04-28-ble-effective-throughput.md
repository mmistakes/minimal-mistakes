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
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble5-fig-4.png" alt="">
</figure>

---

### 5.3 최대 전송 패킷

위의 예시를 통해 `20 bytes` 데이터를 전송하는데 `0.708 ms` 의 시간이 소요되는 것을 확인하였다. BLE 무선연결 주기는 `7.5 ms ~ 4 secs` 이므로, 연결 주기를 `7.5 ms` 로 설정하는 경우 약 10 개의 패킷을 전송할 수 있으므로 유효 데이터 통신 속도는 `200 * 8 bits / 7.5 ms = 213 kbps` 가 될 것이다.

그러나, BLE 프로토콜에서는 연결 주기 동안 전송할 수 있는 유효 패킷의 수가 정해져있다. `Nordic Semiconductor` 사의 BLE 프로토콜 스택에서는 6개로 제한되어 있고, Andriod 또는 iOS 기반의 스마트폰에서는 최대 전송 패킷의 수가 4개 정도로 제한되어 있다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble5-fig-5.png" alt="">
  <figcaption>출처: https://punchthrough.com/maximizing-ble-throughput-on-ios-and-android </figcaption>
</figure>

---

### 5.4 Effective throughput

다음의 수식은 연결 주기($T_{\rm conn \it}$)와 전송 가능한 최대 패킷 수($N_{\rm max \it}$), 그리고 BLE 패킷 전송 시간의 관계를 보여준다. 

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble5-fig-6.png" alt="">
</figure>

`Nordic Semiconductor` 사의 BLE 디바이스를 이용한다고 할 때, 전송 가능한 최대 패킷 수는 6 이고, DLE 기능을 사용하지 않을 경우 ATT Payload 의 크기는 최대 `20 bytes` 이므로 (전송 시간: `0.708 ms`) 위의 수식을 항상 만족한다. 따라서, 해당 조건에서 BLE 4.1 프로토콜의 이론적인 maximum effective throughput 은 다음과 같다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble5-fig-7.png" alt="">
</figure>

**Question:** 결국 maximum effective throughput 는 $^{\bold{1})}$연결 주기와 $^{\bold{2})}$전송 가능한 최대 패킷 수, $^{\bold{3})}$유효 데이터 사이즈만 알고 있으면 계산할 수 있는 거 아닌가요? <span style="color:#084A68"><b>위에 5.2 에서 BLE 패킷 전송 시간을 계산하는 이유가 궁금합니다</b></span>
{: .notice}

>BLE effective throughput 계산 단계에서는 BLE 패킷 전송 시간을 사용하지 않습니다. 하지만, 전송 가능한 최대 패킷 수를 확인하기 위해서는 패킷 전송 시간을 계산해봐야 합니다. DLE 기능을 사용하지 않는 경우에 ATT Payload 크기는 최대 `20 bytes` 이지만, 해당 기능을 사용하는 경우 하나의 패킷에 최대 `244 bytes` 까지 유효 데이터를 전송할 수 있습니다. 따라서, **연결 주기동안 보낼 수 있는 BLE 패킷의 개수가 디바이스에서 지원하는 최대 전송 패킷 수 보다 적을 수 있으므로** BLE 패킷 전송 시간을 계산하는 과정이 필요합니다.

---

**Reference**

https://punchthrough.com/maximizing-ble-throughput-on-ios-and-android

https://devzone.nordicsemi.com/f/nordic-q-a/13004/maximum-data-throughput/49564#49564