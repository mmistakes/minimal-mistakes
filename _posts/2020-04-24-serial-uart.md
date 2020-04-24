---
title: "시리얼 통신 - UART"
categories:
  - IoT
tags:
  - serial communication
  - UART
toc: true
toc_sticky: true
---

## 시리얼 통신

시리얼 (serial) 통신이란 직렬로 데이터를 교환하는 프로토콜 (규칙)들을 통칭한다. 여러 시리얼 통신 중 임베디드 시스템에서는 **UART, SPI, I2C** 프로토콜이 가장 보편적으로 사용되고 있다. **N bits** 데이터를 전송하는 경우, 패러렐 (parallel) 인터페이스에서는 클럭 (CLK) 라인을 이용해 동기화를 맞춘 상태에서 **N개의 데이터**를 한 번에 전송하지만, 시리얼 인터페이스의 경우 대개 **1개의 데이터 라인**을 이용해 정보를 전달한다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/serial-uart-fig-1.png" alt="">
</figure>

위 그림에서 볼 수 있듯이, 직렬로 데이터를 전송하는 방식보다는 병렬로 데이터를 전송하는 방식이 더 빠를 것이다. 그러나, 이를 구현하기 위해서는 기본적으로 **N bits**의 데이터 라인을 필요로 하기 때문에, 마이크로 프로세서와 여러 종류의 집적회로 (IC)로 구성되는 <span style="color:#DF9F0F"><b>임베디드 시스템 내부의 인터페이스로는 시리얼 통신이 더 적합</b></span>할 것으로 보인다.

### UART

일반적으로 아두이노와 같은 임베디드 보드 또는 마이크로 컨트롤러 (**micro-controller unit, MCU**)에는 UART (universal asynchronous receiver/transmitter) 모듈이 내장되어 있어서 비동기식 (asynchronous) 시리얼 통신 규격에 맞춰 데이터를 교환할 수 있도록 처리해준다. UART 모듈은 하드웨어 제작자가 이미 설계해두었다고 할 때, 비동기식 시리얼 인터페이스를 이용하기 위해 <span style="color:#DF0174"><b>"펌웨어 개발자"</b></span>는 다음의 내용을 숙지하고 있어야 한다.

**Notice:** 임베디드 시스템에서의 비동기식 시리얼 통신은 대부분 UART 모듈을 이용하므로, 이하 내용에서 비동기식 시리얼 인터페이스를 편의상 UART 통신이라고 언급하겠다.
{: .notice}

### 하드웨어 연결

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/serial-uart-fig-2.png" alt="">
</figure>

위 그림에서 전압 레벨을 맞추기 위한 그라운드 (GND) 라인을 제외하면, UART 통신에서는 별도의 클럭 없이 **TX**와 **RX** 두 개의 라인만을 이용한다. 즉, UART 통신을 이용하는 경우 하드웨어 연결이 단순하다.

**Notice:** UART 통신 이용 시 한 쪽 모듈의 **TX** 핀은 다른 한 쪽의 **RX** 핀과 연결해줘야 한다.
{: .notice}

### 데이터 프레임

UART 통신의 데이터 프레임은 다음과 같다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/serial-uart-fig-3.png" alt="">
</figure>

UART 인터페이스에서는 별도의 클럭을 사용하지 않기 때문에, **Start bit**와 **Stop bit**를 이용해 데이터 통신의 시작과 끝을 구분한다. 아래 그림은 **TTL** level (**logical HIGH: 3.3 or 5V**)에서의  데이터 스트림 예시를 보여준다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/serial-uart-fig-4.png" alt="">
</figure>

### 규격

속도, 패리티, 블라블라 등등

여기서 사전에 알고 있다는 가정하에 데이터를 교환할 수 있는 것.

이게 안맞으면 교환 안됨



### 예시 1: 아두이노


### 예시 2: nRF52-DK





**Referecnce**

https://learn.sparkfun.com/tutorials/serial-communication