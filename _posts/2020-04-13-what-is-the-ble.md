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

**[저전력 블루투스](https://en.wikipedia.org/wiki/Bluetooth_Low_Energy)**(Bluetooth Low Energy, **BLE**)는 개인용 무선 네트워크 (Wireless Personal Area Network, **WPAN**) 기술의 일종으로, 블루투스라는 이름을 갖고 있지만 기존의 블루투스 (Bluetooth Classic, **BR/EDR**)와는 사실상 별개의 기술이다. 2010년 출시된 <span style="color:#0582a8"><b>Bluetooth 4.0</b></span> 부터 저전력 (Low Energy, **LE**) 프로토콜을 지원하기 시작했고, 2016년 <span style="color:#0582a8"><b>Bluetooth 5.0</b></span> 출시와 함께 그 기능이 보다 확장되었다.

{% capture fig_img %}
![iot-system]({{ '/assets/images/2020-04-12-bluetooth-standard.png' | relative_url }})
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>출처: https://www.semiconductorstore.com/blog/2017/Bluetooth-5-versus-Bluetooth-4-2-whats-the-difference/2080</figcaption>
</figure>

### 1.1 기존 블루투스와의 차이점

기존의 블루투스 (**BR/EDR + HS**) 기술이 데이터 전송 속도 (**data rate**)에 초점을 맞추고 있는 반면, BLE는 전력 소모를 줄이는 것에 초점을 맞추며 헬스케어, 피트니스, 보안 시스템 등의 특정 응용분야 (**application**)에 적합한 기술로 대두되었다.
> BLE는 대량의 정보를 빠르게 전송하는 것보다는 <span style="color:#0582a8"><b>소량의 정보</b></span>를 <span style="color:#0582a8"><b>주기적으로</b></span> 또는 간헐적으로 보내는 시스템에 적합한 기술이다.

### 1.2 응용분야의 예

<span style="color:#0582a8"><b>무선 센서 네트워크 (WSN)</b></span>

{% capture fig_img %}
![iot-system]({{ '/assets/images/iot-system.png' | relative_url }})
{% endcapture %}

<figure style="width: 500px">
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>출처: https://www.e-zigurat.com/innovation-school/blog/what-do-the-next-five-years-hold-for-the-iot</figcaption>
</figure>

무선 센서 네트워크 (Wireless Sensor Network, **WSN**)는 BLE를 적용하기에 적절한 응용분야이다. 예를 들어, 특정 공간에 다수의 센서를 배치하고 각 센서의 정보를 수집한다고 해보자. 이러한 응용분야에서 센서는 소량의 정보만을 전송하며, 실시간으로 각 데이터를 수집할 필요 또한 없으므로 시스템 구축에 있어 속도에 제약을 받지 않는다. 
>이와 유사한 응용분야의 경우 데이터 전송 속도보다, 적은 용량의 배터리를 가지고 얼마나 오래 시스템을 구동할 수 있는지가 중요한 이슈라고 할 수 있다.

<span style="color:#0582a8"><b>헬스케어 (Healthcare)</b></span>

{% capture fig_img %}
![hrm]({{ '/assets/images/ble-example-hrm.png' | relative_url }})
{% endcapture %}

<figure style="width: 500px">
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>출처: https://www.raywenderlich.com/231-core-bluetooth-tutorial-for-ios-heart-rate-monitor</figcaption>
</figure>

사용자의 건강 상태를 모니터링하는 **헬스케어** 응용분야 또한 BLE를 이용하기 적합한 모델이라고 할 수 있다. 예를 들어, 심박수 측정 센서를 이용해 사용자의 심박수를 측정하고, 해당 정보를 APP 으로 전송하는 어플리케이션을 개발한다고 해보자. 

만약, 심박수 측정 센서를 통해 측정한 값이 **110 BPM** 일 경우, BLE 프로세서에서 실질적으로 보내야 하는 `110`이라는 데이터는 1 바이트 (byte) 만으로 표현 가능하며, 이상이 있는 경우 (심박 수치가 너무 높거나 낮은 경우)가 아니라면 실시간으로 데이터를 전송할 필요도 없을 것이다.
>따라서, 이러한 경우에도 BLE를 이용하여 효율적인 저전력 시스템 설계가 가능하다.