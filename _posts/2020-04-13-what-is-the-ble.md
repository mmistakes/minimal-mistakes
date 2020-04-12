---
title: "BLE (1) - 저전력 블루투스 (BLE) 란?"
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

**[저전력 블루투스](https://en.wikipedia.org/wiki/Bluetooth_Low_Energy)**(Bluetooth Low Energy, **BLE**)는 개인용 무선 네트워크 (Wireless Personal Area Network, WPAN) 기술의 일종으로, 블루투스라는 이름을 갖고 있지만 기존의 블루투스 (Bluetooth Classic, **BR/EDR**)와는 사실상 별개의 기술이다. 2010년 출시된 Bluetooth 4.0 부터 저전력 (Low Energy, **LE**) 프로토콜을 지원하기 시작했고, 2016년 Bluetooth 5.0 출시와 함께 그 기능이 보다 확장되었다.

{% capture fig_img %}
![iot-system]({{ '/assets/images/2020-04-12-bluetooth-standard.png' | relative_url }})
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>출처: https://www.semiconductorstore.com/blog/2017/Bluetooth-5-versus-Bluetooth-4-2-whats-the-difference/2080</figcaption>
</figure>

### 1.1 기존 블루투스와의 차이점

기존 블루투스 (BR/EDR + HS) 기술이 데이터 전송 속도 (Data Rate)에 초점을 맞추고 있는 반면, BLE 기술은 전력 소모를 줄이는 것에 초점을 맞추며 헬스케어, 피트니스, 보안 등의 특정 응용분야 (application)에 적합한 기술로 대두되었다.
> BLE는 대량의 정보를 빠르게 전송하는 것보다는 **소량의 정보**를 **주기적으로** 또는 간헐적으로 보내는 시스템에 적합한 기술이라고 할 수 있다.

### 1.2 응용분야의 예

* **무선 센서 네트워크 (WSN)**

{% capture fig_img %}
![iot-system]({{ '/assets/images/iot-system.png' | relative_url }})
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>출처: https://www.e-zigurat.com/innovation-school/blog/what-do-the-next-five-years-hold-for-the-iot</figcaption>
</figure>

무선 센서 네트워크는 BLE 시스템의 대표적인 응용분야이다. 예를 들어, 특정 공간에 다수의 센서를 배치하고 각 센서의 정보를 수집한다고 해보자. 이러한 센서의 경우 소량의 정보만을 전송하며, 실시간으로 수집할 필요 또한 없으므로 시스템 구축에 있어 속도에 제약을 받지 않는다. 즉, 이와 유사한 응용분야의 경우 적은 용량의 배터리를 이용해 얼마나 오래 쓸 수 있는가가 중요한 이슈라고 할 수 있다.

* **헬스케어 (Healthcare)**

{% capture fig_img %}
![hrm]({{ '/assets/images/ble-example-hrm.png' | relative_url }})
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>출처: https://www.raywenderlich.com/231-core-bluetooth-tutorial-for-ios-heart-rate-monitor</figcaption>
</figure>

사용자의 건강 상태를 모니터링하는 시스템 또한 BLE를 이용하기 적합한 모델이라고 할 수 있다. 예를 들어, 심박수 측정 센서를 이용해 사용자의 심박수를 측정하고, 해당 정보를 APP 으로 전송하는 어플리케이션을 개발한다고 해보자. 

만약, 심박수 측정 센서를 통해 측정한 값이 110 BPM 일 경우, BLE 프로세서에서 실질적으로 보내야 하는 데이터는 1 바이트 (byte) 사이즈 밖에 되지 않으며, 문제가 발생하는 경우 (너무 낮거나 높은 경우)가 아니라면 실시간으로 데이터를 전송할 필요도 없을 것이다.
>따라서, 이러한 경우에도 BLE 이용하여 저전력 시스템 설계가 가능하다.