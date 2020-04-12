---
title: "저전력 블루투스 (BLE) 소개"
categories:
  - BLE
tags:
  - low power system
  - wireless communication
  - introduction
toc: true
toc_sticky: true
---

## 1. 저전력 블루투스

저전력 블루투스 (Bluetooth Low Energy, BLE)는 개인용 무선 네트워크 (Wireless Personal Area Network, WPAN) 기술의 일종으로, 블루투스라는 이름을 갖고 있지만 기존의 블루투스 (Bluetooth Classic, BR/EDR)와는 별개의 기술이다. 2010년, Bluetooth 4.0 부터 Low Energy (LE) 프로토콜을 지원하기 시작했으며, 2016년 Bluetooth 5.0 출시와 함께 그 기능이 보다 확장되었다.

![ble-version]({{ site.url }}{{ site.baseurl }}/assets/images/2020-04-12-bluetooth-standard.png)

### 1.1 기존 블루투스와의 차이점

기존의 블루투스 (BR/EDR + HS) 기술은 데이터 전송 속도 (Data Rate)에 초점을 맞추고 있는 반면에, BLE 기술은 **저전력** 이라는 목표와 함께 특정 응용분야 (application)에 초점을 맞추고 있다. 즉, BLE 기술은 대량의 정보를 빠르게 전송하는 것보다 소량의 정보를 주기적으로 또는 간헐적으로 보내는 시스템에 적합한 기술이다.

{% capture fig_img %}
![iot-system]({{ '/assets/images/iot-system.png' | relative_url }})
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>출처: https://www.e-zigurat.com/innovation-school/blog/what-do-the-next-five-years-hold-for-the-iot</figcaption>
</figure>

특히, BLE 기술은 무선 센서 네트워크를 구축하는데 큰 이점을 갖는다. 예를 들어, 특정 공간에 다수의 센서 (온습도, 밝기 등)를 배치하고 각각의 정보를 수집한다고 해보자. 각 센서는 소량의 정보를 전송하며, 실시간으로 수집할 필요가 없으므로 시스템을 구축하는데 있어 속도에 제약을 받지 않는다. 오히려, 이러한 응용분야의 경우 적은 용량의 배터리를 이용해 얼마나 오래 쓸 수 있는가가 중요한 이슈가 된다.