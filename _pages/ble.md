---
title: Bluetooth Low Energy
layout: single
permalink: /ble/
author_profile: true
---

{% capture fig_img %}
![ble-intro]({{ '/assets/images/2020-04-12-banniere-article-ble.jpg' | relative_url }})
{% endcapture %}

<figure style="width: 100%">
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>출처: https://elainnovation.com/what-is-ble.html</figcaption>
</figure>

본 시리즈에서는 저전력 블루투스 (<span style="color:#0174DF"><b>Bluetooth Low Energy, BLE</b></span>) 기술에 대해 소개하고, **[DevZone](https://devzone.nordicsemi.com/)** 사이트에서 제공하는 포스트를 토대로 공부한 내용들을 정리할 예정입니다.

**Notice:** 각 자료에 대한 저작권 및 지적재산권 (Copyright)은 관련 링크 및 원본 포스트 작성자에게 있으며, 해당 자료를 토대로 재구성한 포스트에 대한 저작권은 필자에게 있으므로, 공부 목적 이외의 상업적 무단 배포를 금지합니다.
{: .notice--info}

---

## 포스팅 항목

* [BLE (1) - 저전력 블루투스 (BLE) 란?](https://enidanny.github.io/ble/what-is-the-ble/)
* [BLE (2) - BLE 프로토콜 스택](https://enidanny.github.io/ble/ble-protocol-stack/)
* [BLE (3) - ATT/GATT 이해하기](https://enidanny.github.io/ble/ble-att-gatt/)

## 포스팅 예정 항목
* BLE (4) - BLE 디바이스는 어떻게 연결될까?
* BLE (?) - BLE 통신 속도는 실제로 1 Mbps 일까?
* BLE (?) - BLE 5.0
* BLE (?) - Mesh
* Serial 통신 (1) - UART
* Serial 통신 (2) - I2C
* Serial 통신 (3) - SPI