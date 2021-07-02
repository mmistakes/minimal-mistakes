---
title: "nRF5 SDK (2) - nRF52 시리즈 제품별 특징"
categories:
  - nRF5 SDK
tags:
  - Direction Finding
  - nRF528XX
  - nRF5340
toc: true
toc_sticky: true
---

## 2. nRF52 시리즈 제품별 특징 (nRF52 Series Features)

`nordic semiconductor` 사에서 개발한 BLE 칩 중 nRF52 시리즈에 해당하는 제품은 총 7개. 각각의 제품군은 모두 `nRF528XX` 형식의 이름을 갖고 있는데, 대략적으로 `XX` 에 해당하는 숫자가 클 수록 BLE 칩에서 지원하는 메모리 사이즈가 큰 편이고, 주변기기 (`peripheral`) 종류나 개수가 많거나 (`UART, TWI, SPI, PWM` 등), 통신 프로토콜의 종류가 다양하다고 보면 된다.

[https://www.nordicsemi.com/-/media/Software-and-other-downloads/Product-Briefs/nRF52-Series-SoC-PB-50.pdf](https://www.nordicsemi.com/-/media/Software-and-other-downloads/Product-Briefs/nRF52-Series-SoC-PB-50.pdf)

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrf52-fig1.png" alt="">
</figure>

특히, 위의 그림에서 볼 수 있듯이, 제품에 따라 Direction Finding, Long range, Mesh protocol 등의 기능들을 지원하기도하고 지원하지 않기도 한다.

* Long Range: `nRF52811, nRF52820, nRF52833, nRF52840`
* Bluetooth Mesh: `nRF52820, nRF52832, nRF52833, nRF52840`
* Direction Finding: `nRF52811, nRF52820, nRF52833`

>사실상 nRF52 시리즈 제품 중에서는 `nRF52833` 이 모든 기능을 지원하는 올포원 (OFA) 제품인 셈인데, `nordic` 에서 제품군을 새롭게 개편하려고 하는 것 같다. 바로, nRF53 시리즈의 첫 모델인 <span style="color:#0F5F5F"><b> nRF5340 </b></span> 칩이 등장한 것; 아직 사용해보지는 않았지만, Radio 송수신 전류 스펙을 보면 기존의 nRF52 제품군 대비 성능이 더 좋아진 것 같다.

>BLE 프로토콜 기능에 있어서도, 기존의 기능들을 모두 지원하는 것 같음. 무엇보다 기존의 nRF5 SDK 를 이용하던 nRF52 시리즈 제품과는 달리, `nRF Connect SDK` 라는 개발 환경을 사용하는데 LTE-M 프로토콜을 지원하는 IoT 제품군 (`nRF9160`) 시리즈도 해당 `SDK` 를 사용하는 걸로 봐서는 전반적인 시스템에 변화가 올 지도 모르겠다.