---
title: "nRF5 SDK (6) - nordic product 통합 개발환경: nRF Connect SDK"
categories:
  - nRF5 SDK
tags:
  - nRF Connect SDK
  - RTOS
  - Zephyr
toc: true
toc_sticky: true
---

# 6. nordic product 통합 개발환경: nRF Connect SDK

## 6.1 nordic 사 SDK 현황 

* 현재까지 `nordic semiconductor` 사의 저전력 블루투스 (BLE) 프로토콜은 `nRF5 SDK (Software Development Kit)` 를 주로 이용해서 개발하도록 되어있었음. (`"Since 2012"`)
* 한 동안 `nRF5 SDK` 의 최신 버전은 `17.0.2` 였는데, 최근 몇몇 에러가 수정된 `17.1.0` 이 배포됨.
* 그런데, 현재 `nordic` 에서는 BLE 이외에도 `Zigbee` 나 `Bluetooth Mesh` 개발을 위한 별도의 `SDK` 를 제공해왔고, 이제는 LTE-M 프로토콜을 지원하는 nRF91 제품군을 위한 `SDK` 도 제공이 되어야 함. (*최근에는 WiFi application 도 개발하려고 하는 것 같다*)

<figure style="width: 80%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-connect-fig1.png" alt="">
</figure>

[https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/nrf-connect-for-visual-studio-code-preview](https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/nrf-connect-for-visual-studio-code-preview)

위의 링크에 포스팅 된 게시글을 보면 알겠지만, 현재까지 개발된 여러 버전의 `nRF5 SDK` 는 완전 폐기는 아니지만 현재의 기능들 위주로 유지 보수하는 정도로만 업데이트를 제공할 예정이고, 기능적인 측면에서의 업데이트는 진행되지 않을 것으로 보인다.

>즉, Bluetooth 5.X (혹은 그 이상) 버전에서의 BLE 기능 개발은 **`nRF Connect SDK`** 라는 통합 개발 환경을 이용해야 한다는 것. ~~아이고 두야..😅~~

--

## 6.2 nRF Connect SDK 주요 특징

* 개발 가능 제품군: `nRF91, nRF53, nRF52`
* 지원 프로토콜: Blueooth LE, Bluetooth mesh, Zigbee, Thread, LTE-M/NB-IoT, GPS.
* 주요 특징: **`Zephyr RTOS`** 기반, application 및 network protocol 관련 예제-라이브러리 제공, Bootloader 및 각종 hardware driver 제공.

주요 통합 개발 환경을 `nRF Connect SDK` 로 하려고 하는 이유는 아무래도 그동안 지원해주는 프로토콜마다 `SDK` 와 `SoftDevice` 버전을 일일이 분류하는 대신 이를 하나의 플랫폼으로 통합하기 위함이 큰 것 같다 🔰.

BLE 프로토콜 기능을 제공해주는 BLE stack 은 크게 `Host` 와 `Controller` 영역으로 구분할 수 있는데, `nRF Connect SDK` 에서는 `Host` 계층에서 `Zephyr Bluetooth host` 를 이용하고, `Controller` 계층의 경우 `SoftDevice controller` 혹은 `Zephyr controller` 중 하나를 이용할 수 있다.

>nRF91, nRF53 같은 새로운 nordic chip 이 개발되고, 제품 제조 현장에서 보다 빠르고 편리하게 nordic chip 을 개발할 수 있도록 하기 위해 RTOS 기반의 SDK 개발에 초점을 맞추게 된 것 같다.

<figure style="width: 80%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-connect-fig2.png" alt="">
</figure>

또한, 아래 링크를 보면 Visual Studio Code 에서 `nRF Connect SDK` 를 이용 가능하도록 준비중에 있고, 이미 베타 버전은 이용이 가능한 것 같기도 하다.

[https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/nrf-connect-for-visual-studio-code-preview](https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/nrf-connect-for-visual-studio-code-preview)

---

**Reference**

https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/nrf-connect-sdk-and-nrf5-sdk-statement