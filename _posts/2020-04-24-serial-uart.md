---
title: "IoT (1) - 시리얼 통신"
categories:
  - IoT
tags:
  - serial communication
  - UART
toc: true
toc_sticky: true
---

## 1. 시리얼 통신

시리얼 (serial) 통신은 직렬로 데이터를 교환하는 프로토콜 (규칙)들을 통칭한다. 여러 시리얼 통신 중 임베디드 시스템에서는 **UART, SPI, I2C** 프로토콜이 가장 보편적으로 사용되고 있다. **N bits** 데이터를 전송하는 경우, 패러렐 (parallel) 인터페이스에서는 클럭 (CLK) 라인을 이용해 동기화를 맞춘 상태에서 **N개의 데이터**를 한 번에 전송하지만, 시리얼 인터페이스의 경우 대개 **1개의 데이터 라인**을 이용해 정보를 전달한다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/serial-uart-fig-1.png" alt="">
</figure>

위 그림에서 볼 수 있듯이, 직렬보다는 병렬로 데이터를 전송하는 경우의 전송 속도가 보다 빠르다. 그러나, 이를 구현하기 위해서는 기본적으로 **N bits**의 데이터 라인을 필요로 하기 때문에, 마이크로 프로세서와 여러 종류의 집적회로 (IC)로 구성되는 <span style="color:#DF9F0F"><b>임베디드 시스템의 내부 인터페이스로는 시리얼 통신이 더 적합</b></span>할 것으로 보인다.

### 1.1 UART

일반적으로 아두이노와 같은 임베디드 보드 또는 마이크로 컨트롤러 (**micro-controller unit, MCU**)에는 UART (universal asynchronous receiver/transmitter) 모듈이 내장되어 있어서 **비동기식 (asynchronous) 시리얼 통신** 규격에 맞춰 데이터를 교환할 수 있도록 처리해준다. UART 모듈은 하드웨어 제작자가 이미 설계해두었다고 할 때, 비동기식 시리얼 인터페이스를 이용하기 위해 <span style="color:#DF0174"><b>"펌웨어 개발자"</b></span>는 다음의 내용 정도는 숙지하고 있어야 한다.

**Notice:** 임베디드 시스템에서의 비동기식 시리얼 통신은 대부분 UART 모듈을 이용하므로, 이하 내용에서 비동기식 시리얼 인터페이스를 편의상 <span style="color:#AF0F0F"><b>UART 통신</b></span>이라고 언급하겠다.
{: .notice}

---

### 1.2 하드웨어 연결

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/serial-uart-fig-2.png" alt="">
</figure>

위 그림에서 전압 레벨을 맞추기 위한 그라운드 (GND) 라인을 제외하면, UART 통신에서는 별도의 클럭 없이 **TX**와 **RX** 두 개의 라인만을 이용한다 (**e.g.** `A`에서 `B`로 데이터를 송신하는 경우, `A.TX`핀과 `B.RX`핀 사이의 데이터 라인을 이용). 따라서, UART 통신을 이용하는 경우 하드웨어 사이의 연결이 단순해진다.

**Notice:** UART 인터페이스 이용 시 한 쪽 모듈의 **TX** 핀은 다른 한 쪽의 **RX** 핀과 연결해줘야 한다.
{: .notice}

---

### 1.3 데이터 프레임

UART 인터페이스에서는 별도의 클럭을 사용하지 않기 때문에, **Start bit**와 **Stop bit**를 이용해 통신의 시작과 끝을 구분한다. 다음 그림은 UART 통신에서의 **데이터 프레임**과 **TTL** level (logical `HIGH`: **3.3 or 5V**)에서의 **데이터 스트림** 예시를 보여준다. 

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/serial-uart-fig-3.png" alt="">
</figure>

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/serial-uart-fig-4.png" alt="">
</figure>

기본적으로 통신 전 IDLE 상태에서는 logical `HIGH` 전압을 유지하고, `LOW` (**Start bit**) 로 바뀌는 시점부터 데이터 전송이 시작된다. 데이터는 **LSB**에서 **MSB** 순서로 전달하며, 데이터 전송이 끝나면 **Stop bit** 이후 `HIGH` 상태를 유지한다. 위 그림은 `1 byte = 8 bits` 데이터를 전송하는 경우를 보여주고 있으며, 데이터 값은 `0x55 = 0b0101_0101` 이다. (**Start bit:** `1`, **Stop bit:** `0`)

---

**Referecnce**

https://learn.sparkfun.com/tutorials/serial-communication