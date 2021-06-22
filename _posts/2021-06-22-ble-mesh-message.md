---
title: "BLE (12) - 블루투스 메시: Advertising Bearer 포맷"
categories:
  - BLE
tags:
  - mesh network
  - advertising bearer
  - network PDU
toc: true
toc_sticky: true
---

## 12. 블루투스 메시: Advertising Bearer 포맷

### 12.1 Bearers

메시 프로토콜을 지원하는 (`unprovisioned`) 노드 (`node`) 는 네트워크 내에서 정보를 주고 받기 위해 다음의 두 종류의 전달체 (**`bearer`**) 중 하나를 이용한다.

* `Advertising bearer`
* `GATT bearer`

>블루투스 메시 프로토콜에서의 "`bearer`" 라는 단어에 대한 표준 번역이 어떻게 되는지는 모르겠지만 이번 포스트를 포함해서 본 블로그에서는 **전달체** 라고 번역하고자 한다. ('bearer 의 사전적 정의: 짐꾼, 운반인, 편지 등의 전달자 등')

현재 BLE 프로토콜을 지원하는 기기 중 대다수는 메시 프로토콜 출시 전에 생산되었는데, 이러한 기기들의 경우 메시 네트워크를 활용하기 위해 `GATT bearer` 를 이용해야한다 (정확히는 `Advertising bearer` 기반의 통신을 지원하지 않는다고 보는게 맞을지도 모르겠다.) 특히, 대부분의 스마트폰은 GATT bearer 를 통해서만 메시 네트워크에 접속 할 수 있는데, 이러한 기기의 경우 Proxy 기능을 지원하는 메시 노드와 GATT 연결 (`connection`)을 구축해야만 네트워크에 접근할 수 있다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-mesh4-fig1.png" alt="">
</figure>

### 12.2 Advertising bearer

`Advertising bearer` (이하, Adv. bearer) 는 메시 프로토콜을 지원하는 기기에서 사용 가능한 **전달체** 이며, Adv. bearer 를 사용하는 기기에서는 다음의 형태로 메시지 (정보)를 송신 (혹은 게시, `Advertisement`)한다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-mesh4-fig2.png" alt="">
  <figcaption>그림 출처: Mesh Profile - Bluetooth Specification </figcaption>
</figure>

위 그림에서 "`Network PDU`" 에 포맷은 Mesh Profile 표준 3.4.4 (Network PDU) 에 정의되어 있으며, 해당 데이터 영역에는 노드 주소 (source and destination)를 포함해 네트워크에 대한 전반적인 정보가 포함된다. 다음은 **[이전 포스트](https://enidanny.github.io/ble/ble-mesh/)** 에도 첨부한 적이 있는 그림으로 Bearer layer 이후의 메시 스택 (Mesh stack)에서의 데이터 흐름을 보여준다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-mesh-fig2.png" alt="">
</figure>

위 그림의 제일 아래에 위치한 Network Layer 의 1, 2번 패킷이 각각 Adv. bearer 를 통해 전달받은 Network PDU 의 예이다. 이후, Transport Layer 에서 분할된 데이터가 재조립되어 Access Layer 로 전달된다. 

---

**Reference**

https://www.bluetooth.com/specifications/specs/

<!-- 
블루투스 메시에서 언급하는 `element`는 네트워크에 포함된 노드가 가지고 있는 어떠한 개체를 가리키는데, 쉽게 예를 들자면 노드와 연결된 조명기구, 스위치, 센서 등이 `element` 라고 할 수 있다. 메시 네트워크에 포함된 모든 노드는 최소 하나의 `element` 를 가지고 있으며, 대개 그 이상의 `element`를 포함한다.

> 모든 노드는 `primary element` 라는 `element` 를 가지고 있으며, `Provisioning` 과정 동안 노드에 할당되는 주소 값 (`first unicast address`)을 이용해 접근 가능하다.

`state` 란 `element` 의 상태나 조건 등을 표현하는 요소를 가리킨다. 예를 들어, 노드에 조명기구의 상태를 나타내기 위해 `Generic OnOff Server` 라는 이름의 `server` 가 구현되어 있을 때, 현재 조명기구 (`element`)가 켜져 있는지 혹은 꺼져있는 지에 대한 정보를 `server` 에 나타낼 수 있는데, 이러한 유형의 정보를 `state` 라고 할 수 있다.

> `state` 개념과 함께 `binding` 혹은 `bound state` 라는 개념은 서로 연관된 `state` 의 동작을 묶어 제어하는 것을 가리킨다. 예를 들어, 어떤 빌딩 내부의 엘리베이터의 위치를 모니터링 하는 `state` 와 각 층의 조명의 현재 상태를 나타내는 `state` 가 있다고 할 때, `bound state` 개념을 이용하면, 엘리베이터가 특정 층에 도달했을 때 해당 층의 조명을 켜도록 할 수 있다.

---

### 11.2 Messages and Addresses

메시 네트워크를 구성하는 노드 및 각 노드에서 제공하는 기능에 대해 정의하는 `model` 에서는 `message` 를 이용해 `publish/subscribe` 구조로 정보를 교환하고 `element` 를 제어한다. 서로 다른 노드 사이에 정보를 교환하기 위해서는 주소 값이 필요하듯이, `model` 내에서 `message` 를 보내기 위해서는 `address` 값이 필요한데, 메시 네트워크에서의 `address` 종류는 다음의 세 가지로 분류할 수 있다.

``` python
* unicast address
* group address
* virtual address
```

**`unicast address`** 는 각 `element` 에 할당되는 고유의 `16 bits` 주소 값으로, 한 번에 하나의 `element` 만을 가리키는 주소 값이다. 이름에서 유추할 수 있듯이, **`group address`** 는 다수의 개체를 가리키는 (`multicast address`) 주소 값이며, 여러 개의 `element` 혹은 하나 이상의 노드를 가리키기 위해 사용된다.

**`virtual address`** 의 경우 메시 프로파일 표준 (<span style="color:#3060A0"><b>Mesh Profile Specification</b></span>)에서는 다음과 같이 정의하고 있다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-mesh3-fig2.png" alt="">
</figure>

위의 내용과 몇몇 사이트에서 참고한 내용을 토대로 생각해보면, `virtual address` 는 `UUID` 값을 검증하는 용도로 사용되는 것 같다. 메시 네트워크를 구성하는 BLE 시스템의 경우 `Attribute` 프로토콜을 기반으로 관리되고, 이를 구성하는 `attribute` 라는 요소에는 이를 구분하기 위한 고유 값 (`Label UUID`)이 존재한다.

BLE 시스템에서 자주 사용되는 `GATT Services` 의 경우 이를 `16 bits` 의 값으로 나타낼 수 있지만, 기본적으로 `Label UUID` 는 `128 bits` 의 값이다. 본론으로 돌아와서 `virtual address` 는 `128 bits` 의 `Label UUID` 에 대응되는 `hash` 값으로, 수신된 `message` 의 `UUID` 값을 검증하는 용도로 사용되는 것 같다. 또한, 일단 검증이 되고 나면 그 이후부터는 `128 bits` 의 `UUID` 를 전부 보지 않아도, `16 bits` 의 `virtual address` 값 만으로도 `UUID` 를 검증할 수 있도록 해주는 것으로 보인다.

아래의 표는 각각의 `address` 가 어떤 형태로 구성되는지 보여준다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-mesh3-fig1.png" alt="">
</figure>

---

### 11.3 Features and Topology

메시 네트워크를 구성하는 노드는 **`Relay`**, **`Proxy`**, **`Low Power`**, **`Friend`** 특성 (`feature`)을 가질 수 있으며, 동시에 하나 이상의 특성을 가질 수도 있다. `Relay` 는 `advertising bearer` 를 통해 수신된 `message` 를 다시 주변으로 전달하는 특성을 가리키며, `Proxy` 특성을 갖는 노드는 `GATT bearer` 와 `advertising bearer` 사이의 `message` 교환을 지원한다. `Low Power` 및 `Friend` 특성은 이전 포스트에서 소개한 `Friendship` 시스템을 구현하는데 사용되는 노드가 갖는 특성이다.

다음의 그림은 각각의 특성을 갖는 노드들이 포함되어 있는 메시 네트워크 구조 (`Topology`)의 한 예시를 보여준다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-mesh3-fig3.png" alt="">
</figure>

위 그림을 보면 무선 통신 거리 내에 있는 노드는 서로 `message` 를 주고 받을 수 있지만, 수신된 메시지를 다시 전달 (`Relay`)하여 통신 거리를 연장시키는 역할은 `Q, R, S, O` 노드만 수행 가능한 것을 볼 수 있다. 또한, 세 개의 `Friend` 노드 (`N, O, P`) 중, `N` 노드는 근처에 `Low Power` 노드와 연동되지 않은 상태임을 볼 수 있고, `O` 노드의 경우 `Relay` 특성과 함께 `Friend` 특성도 갖는 것을 확인할 수 있다.

---

**Reference**

https://www.bluetooth.com/specifications/specs/

https://devzone.nordicsemi.com/f/nordic-q-a/28324/virtual-addresses-and-their-use
-->
