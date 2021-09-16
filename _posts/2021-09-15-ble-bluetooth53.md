---
title: "BLE (15) - Bluetooth 5.3 에서 개선 및 추가된 BLE 기능"
categories:
  - BLE
tags:
  - Bluetooth 5.3
  - Periodic Advertising
  - Channel Classification
  - Connection Subrating
toc: true
toc_sticky: true
---

# 15. Bluetooth 5.3 에서 개선 및 추가된 BLE 기능 (Enhancement and Added feaures of BLE protocol in Bluetooth 5.3)

이번 포스트에서는 Bluetooth 5.3 (`Released July 2021`)에서 추가된 저전력 블루투스 (`BLE`) 기능에 대해 간략하게 소개한다. 본 내용은 `nordic semiconductor` 관련 포럼 사이트 (**`devzone.nordicsemi.com`**) 에 포스팅 된 페이지의 내용을 간단한게 정리한 것이며, 보다 자세한 내용은 아래 원문 혹은 Bluetooth 공식 홈페이지의 표준 문서를 참조하길 바란다.

>**원문 링크: [https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/bluetooth-5-3](https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/bluetooth-5-3)**

## 15.1 개선된 특징

* Periodic Advertising 관련 개선

먼저, Periodic Advertising 기능은 브로드캐스터 (`Broadcaster`)로 동작하는 장치에서 신호를 게시 (advertising) 할 때, 게시 주기를 설정한 값으로 고정하는 기능이다. 기본적으로 Advertising 을 수행하는 장치는 주변 전파와의 데이터 충돌을 피하기 위해 정해진 게시 주기에 `0 ~ 10 ms` 의 임의의 지연 시간이 추가된다. Period Advertising 기능은 해당 지연 시간을 `0` 으로 고정해주는 기능이라고 보면 된다.

이와 관련하여 Blueooth 5.3 에서는 Periodic Advertising 패킷에 `AdvDataInfo` 영역이 추가되었는데, 해당 패킷을 수신하는 스캐너 (Scanner) 장치에서는 `AdvDataInfo` 영역의 값을 확인해서 이전에 수신한 패킷일 경우 `Controller` 레벨에서 해당 패킷을 무시할 수 있도록 개선하였다. 

>즉, 스캐너 `Host` 레벨; Application 단에서 일일이 수신된 패킷 정보를 비교 대조해가며 중복된 데이터인지 확인하거나 하는 작업이 필요 없어진 셈이다.

* Channel Classification 관련 개선

BLE 에서 **`central` 장치** <span style="color:#50a0a0"><b>(e.g. 스마트폰과 같이 BLE 연결을 주도하는 장치)</b></span> 와 **`peripheral` 장치** <span style="color:#a0a050"><b>(e.g. 스마트 센서와 같이 BLE 연결을 대기하는 장치)</b></span> 사이의 무선 연결이 이뤄지면, 40 개의 주파수 채널 중 37 개의 데이터 채널 (`0 ~ 36번`) 을 이용해 데이터를 교환한다.

무선 연결 과정에서는 37 개의 주파수 채널 중 현재 상태가 양호한 데이터 채널 일부를 선정해 어떤 순서로 주파수를 변경해가면서 (`e.g. "0 -> 12 -> 30 -> 24 -> 0 -> ... "`) 데이터를 보낼 것인지에 대한 정보; 일명 `channel map` 을 결정하게 되는데, 현재까지 BLE 프로토콜에서는 이 과정을 `central` 장치에서 주도적으로 진행했다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-53-fig1.png" alt="">
  <figcaption>그림 출처: https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/bluetooth-5-3</figcaption>
</figure>

Bluetooth 5.3 에서는 `central` 과 `peripheral` 주변의 무선 환경이 차이가 나는 경우에도 `channel map` 이 최대한 이상적인 조건으로 생성되도록 두 장치의 채널 정보를 토대로 `channel map` 을 결정하도록 개선되었다.

---

## 15.2 새로 추가된 특징

* Connection Subrating 기능

BLE 무선 연결 과정에서는 데이터 패킷이나 연결을 유지하기 위한 더미 패킷을 교환하는 **연결 주기 (`connection interval`)** 라는 값을 정의하는데, 데이터를 주고받는 간격이 짧을 수록 전송률 (`Throughput`)은 증가하지만, 그만큼 전력 소모가 많이 발생한다. 반대로, 전력 소모를 줄이기 위해 연결 주기를 연장하게 되면, 특정 application 에서는 요구되는 데이터 전송률을 만족시키지 못할 수 있다.

**해결책은 단순하다.** 데이터를 많이 보낼 때는 연결 주기를 짧게 가져가고, 적게 보낼 때는 길게 가져가면 된다. 그리고 연결 상태에서 연결 주기를 변경하기 위한 `"connection update procedure"` 라는 절차도 있다. 하지만, 기존의 `connection update procedure` 과정은 시간이 너무 오래 걸려서 이를 유동적으로 활용하기에는 어려움이 있었다.

Bluetooth 5.3 에서 새로 추가된 `"Connection Subrating"` 기능은 연결 주기를 빠르게 변경할 수 있도록 해주는 기능이다.

>그런데, 지금 Bluetooth 5.1 표준에서 제안된 기능들도 개발 환경이나 application 들도 제대로 보급되지 않았는데.. 이거 언제나 되야 새로운 기능들을 구경해볼 수 있을런지 ?