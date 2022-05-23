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

---

### 12.2 Advertising bearer

`Advertising bearer` (이하, Adv. bearer) 는 메시 프로토콜을 지원하는 기기에서 사용 가능한 **전달체** 이며, Adv. bearer 를 사용하는 기기에서는 다음의 형태로 메시지 (정보)를 송신 (혹은 게시, `Advertisement`)한다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-mesh4-fig2.png" alt="">
  <figcaption>그림 출처: Mesh Profile - Bluetooth Specification </figcaption>
</figure>

위 그림에서 "`Network PDU`" 에 포맷은 Mesh Profile 표준 3.4.4 (Network PDU) 에 정의되어 있으며, 해당 데이터 영역에는 노드 주소 (source and destination)를 포함해 네트워크에 대한 전반적인 정보가 포함된다. 다음은 **[이전 포스트](https://enidanny.github.io/ble/ble-mesh/)** 에도 첨부한 적이 있는 그림으로 Bearer layer 이후의 메시 스택 (Mesh stack)에서의 데이터 흐름을 보여준다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-mesh4-fig3.png" alt="">
</figure>

위 그림의 제일 아래에 위치한 Network Layer 의 1, 2번 패킷이 각각 Adv. bearer 를 통해 전달받은 Network PDU 의 예이다. 이후, Transport Layer 에서 분할된 데이터가 재조립되어 Access Layer 로 전달된다. Nordic 에서 제공하는 메시 SDK (nRF5 SDK for Mesh vX.X.X)에서는 Access Layer 이후부터 디바이스에서 수신한 값을 확인할 수 있는 것으로 보이며, 같은 네트워크에 포함되어있으나 AppKey 가 일치하지 않거나 Publish 대상이 아닐 경우에는 Network Layer 위로 데이터가 전달되지 않는다 (Network Key 만 일치한다면, Relay (재전송)는 가능하다.)

---

**Reference**

https://www.bluetooth.com/specifications/specs/