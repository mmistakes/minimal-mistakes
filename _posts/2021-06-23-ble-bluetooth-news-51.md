---
title: "BLE (13) - 블루투스 소식: BLE in Bluetooth 5.1"
categories:
  - BLE
tags:
  - Bluetooth 5.1
  - Low Energy
toc: true
toc_sticky: true
---

## 13. BLE in Bluetooth 5.1

이번 포스트에서는 블루투스 5.1 에서 추가된 저전력 (LE, Low Energy) 프로토콜 관련 부가 기능들 중 두 가지를 소개한다.

>The Bluetooth SIG presented Bluetooth 5.1 on 21 January 2019.

### 13.1 Direction Finding

블루투스 5.1 에서 추가된 가장 주요한 기능은 **"방향 감지 (`Direction Finding`)"** 기능이다. 기존의 블루투스 기반 위치 인식 (`Positioning`) 시스템의 경우 수신된 신호의 세기 (`RSSI`)를 바탕으로 두 기기 사이의 거리를 추정했으나, 정확도 측면에서 다른 실내 위치 인식 기술들과 비교해서 두드러진 강점을 보이지는 못했다. 그러나, 블루투스 5.1 에서 방향 감지 기능이 추가되면서 블루투스 기반 위치 인식 시스템의 정확도가 크게 향상될 것으로 보인다. 

방향 (혹은 위치) 을(를) 감지하고자 하는 대상을 타겟 노드 (`target node`)라고 할 때, 타겟 노드의 방향은 크게 두 가지의 방법으로 감지가 가능하다.

* AoA: Angle of Arrival
* AoD: Angle of Departure

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-51-fig1.png" alt="">
</figure>


위 그림에서 확인할 수 있듯이, 도래각 (AoA) 혹은 송출각 (AoD)을 계산하기 위해서는 두 개의 통신 기기 중 하나는 다수의 안테나를 가지고 있어야 한다. 

---

### 13.2 Advertising Channel Index

기본적으로 신호를 게시 (Advertise)하는 기기에서는 주변의 다른 기기와의 패킷 충돌 혹은 스캐너와 주기가 일치하지 않는 경우를 고려해, 정해진 게시 주기 (`Adv. Interval`) 에 최대 `10 ms` 만큼의 임의의 지연 시간을 추가해 신호를 송신한다. 하지만, 송신 채널의 경우 3개의 게시 채널에 대해 `37-38-39` 의 고정된 순서로 패킷을 전송한다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-51-fig2.png" alt="">
</figure>

블루투스 5.1 에서는 패킷 충돌을 방지하기 위해 위의 그림과 같이 송신 채널의 순서를 임의로 변경하는 기능이 추가되었다.

---

### 13.3 Other functions

그 외에 추가된 기능으로는 다음의 항목들이 있다.

* GATT Caching Enhancements: GATT 연결 과정에서의 attribute table 을 보다 효율적으로 관리
* Periodic Advertising Sync Transfer (PAST): 개선된 방식의 Advertising 주기 동기화 기능 (Scanner 기기에서의 전력 효율 증가)
* LE (Low Energy) Connection 관련 기능 개선

---

**Reference**

https://www.bluetooth.com/bluetooth-resources/bluetooth-core-specification-v5-1-feature-overview/