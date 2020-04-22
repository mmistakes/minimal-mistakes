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

**Advertising interval**: <span style="color:#AF2F2F"><b>20 ms ~ 10.24 secs.</b></span>
{: .notice--info}

---

### 4.2 Scanning

다음으로, `GAP central`로 동작하는 디바이스는 BLE 무선연결을 위해 근처에 연결 가능한 디바이스가 있는지 찾아본다 (**scanning**). 이는 즉, 근처에 advertising 하고 있는 디바이스가 있는지를 확인하는 작업이므로, scanning 또한 40개의 채널 중 advertising 채널에 대해 수행하게 된다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-conn-fig-2.png" alt="">
  <figcaption>출처: https://microchipdeveloper.com/wireless:ble-link-layer-discovery</figcaption>
</figure>

위 그림에서 볼 수 있듯이, 일반적으로 `Advertiser = peripheral` 디바이스는 한 번에 3개의 채널로 advertising 하고,  `Scanner = central` 디바이스는 일정 간격으로 하나의 채널을 scanning 한다. 주요 scanning 파라미터로는 `scan interval` 과 `scan window` 가 있는데, 그림에서 볼 수 있듯이 `scan interval` 은 scanning **시작시간 사이의 간격**을 정의하고, `scan window` 는 한 채널에서 실제로 scanning 하는 시간 (**구간**)을 정의하고 있다.
>advertising 채널과 scanning 채널이 일치하는 경우에만 `Scanner` 에서 advertising 데이터를 수신할 수 있으며, advertising 시간은 수 ms 인 반면 `Scanner` 에서는 수십에서 수백 ms 동안 scanning 동작을 수행한다. 따라서, `Scanner` 에서는 기본적으로 `Advertiser` 에 비해 보다 많은 양의 전류를 소비하게 된다.

---

### 4.3 Connection

다음의 그림은 `peripheral` 디바이스에서의 BLE 연결 과정을 보여준다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-conn-fig-3.png" alt="">
  <figcaption>출처: https://devzone.nordicsemi.com/nordic/short-range-guides/b/bluetooth-low-energy/posts/bluetooth-smart-and-the-nordics-softdevices-part-2</figcaption>
</figure>

앞서 BLE 무선연결은 `peripheral` 디바이스에서 advertising 동작을 수행하는 것으로 시작된다고 언급한 바 있는데, 실제로 연결 가능한 `peripheral` 디바이스는 위 그림에서처럼 advertising 직후 잠깐동안 해당 채널의 신호를 수신하는 시간을 갖는다. 그림에서 볼 수 있듯이 `peripheral` 디바이스에서 advertising 주기와 scanning 주기가 겹치는 시점에 해당 채널(*38번*)을 통해 `central` 디바이스의 **연결 요청 신호 (CREQ: connection request)**를 수신하게 되면, 두 디바이스 사이의 무선연결이 시작된다.

무선연결이 시작되고나면, 데이터를 교환에 앞서 연결 파라미터를 주고 받는다. BLE 에서는 통신 과정에서 advertising 채널을 제외한 37개의 채널을 이용해 **FHSS** 방식으로 데이터를 주고 받는다. 즉, 중심 주파수 (**frequency**)를 바꿔가면서(**hopping**) 데이터를 주고 받는 것인데, 처음 연결시 동기화 (**synchronization**) 작업이 필요하지만, 방해 전파나 잡음의 간섭을 줄일 수 있으며, 호핑 코드 (**hopping code**)만 다르면, 같은 공간 내에서도 무선 디바이스 사이의 간섭을 최소화할 수 있다는 이점이 있다.

**hopping code:** Frequency Hopping Spread Spectrum 통신 기술에서 어떤 순서로 주파수 대역을 변경할 것인지에 대한 정보.
{: .notice}

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-conn-fig-4.png" alt="">
  <figcaption>출처: https://microchipdeveloper.com/wireless:ble-link-layer-channels</figcaption>
</figure>

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-conn-fig-5.png" alt="">
  <figcaption>출처: https://microchipdeveloper.com/wireless:ble-link-layer-channels</figcaption>
</figure>

BLE 연결 직후에는 호핑 코드와 같이 하드웨어 단에서 필요한 파라미터를 포함해 무선연결과 관련된 파라미터를 교환하게 된다. 또한, 이 시점에 연결 주기, 타임아웃 시간 (*일정 시간 통신이 되지 않을 경우 연결이 끊어졌다고 판단하는 시간*) 등의 정보를 주고 받으며, 이러한 파라미터는 대부분 `central` 디바이스에서 의해 결정된다.

무선연결 파라미터를 정하는데 있어서 우선적인 결정 권한은 `central` 디바이스가 가지고 있지만,  `peripheral` 디바이스에서도 다음의 연결 파라미터를 **제안**할 수 있다.

* minimum connection interval
* maximum connection interval
* slave latency
* connection supervision timerout

**Connection interval**: <span style="color:#AF2F2F"><b>7.5 ms ~ 4 secs.</b></span>
{: .notice--info}

---

**Reference**

https://microchipdeveloper.com/wireless:ble-link-layer-channels

https://microchipdeveloper.com/wireless:ble-link-layer-discovery

https://devzone.nordicsemi.com/f/nordic-q-a/28058/what-is-connection-parameters

https://devzone.nordicsemi.com/nordic/short-range-guides/b/bluetooth-low-energy/posts/bluetooth-smart-and-the-nordics-softdevices-part-2

https://www.argenox.com/library/bluetooth-low-energy/ble-advertising-primer/
