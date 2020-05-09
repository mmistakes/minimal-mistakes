---
title: "IoT (3) - I2C 프로토콜"
categories:
  - IoT
tags:
  - serial communication
  - I2C
toc: true
toc_sticky: true
---

## 3. I2C 프로토콜

I2C 프로토콜은 두 라인을 이용해 데이터를 교환하는 시리얼 통신 방식이다. 특정 디바이스에서는 Two-Wired Interface (TWI) 라고 부르지만, 정식 명칭은 <span style="color:#E84A08"><b>Inter-Integrated Circuit (I2C)</b></span> 이고, 하나의 `Master`에서 여러 개의 `Slave`를 제어하기 위해 고안되었다(***N by N 통신;*** *N 개의 `Master`와 N 개의 `Slave` 사이의 통신*)

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-1.png" alt="">
</figure>

**Notice:** 본 포스트에서의 `Master`는 I2C 통신을 시작하는 모듈로서 `Slave` 모듈을 제어하거나 `Slave` 모듈로부터 데이터를 요청하는 I2C 디바이스를 통칭한다.
{: .notice--success}


### 3.1 I2C 프로토콜 특징

I2C 프로토콜은 하나의 데이터 라인 (`SDA`)과 하나의 클럭 라인 (`SCL`)을 이용하는  <span style="color:#057085"><b>동기식 (synchronous)</b></span> 시리얼 통신 방식이다. 하드웨어 구조는 복잡하지만, 위 그림에서 볼 수 있는 것처럼 서로 다른 모듈간의 wiring 연결이 간단하고, 하나의 `Master`에서 여러 개의 `Slave`를 제어할 수 있다는 특징이 있다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-2.png" alt="">
</figure>

데이터 교환 전, I2C 모듈 사이의 `SCL/SDA` 라인은 모두 `1 = High` 상태를 유지한다. 이후, <span style="color:#057085"><b>통신이 시작되면</b></span> 데이터 라인은 클럭 라인보다 먼저 `0 = Low` 신호로 변하게 된다 (falling-edge). 반대로 <span style="color:#057085"><b>통신이 종료되는</b></span> 시점에는 `SCL -> SDA` 순서로 각각의 신호가 `0` 에서 `1` 로 (rising-edge) 돌아오게 된다(위 그림 참조). 다음의 그림에서 볼 수 있듯이, **Start/Stop** 시점을 제외한, 실제 데이터의 교환은 모두 `SCL = 1` 을 유지하는 순간에 수행되는 것을 볼 수 있다 (`MSB -> LSB`).

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-3.png" alt="">
</figure>

I2C 통신에서 공통의 `SCL/SDA` 라인을 이용해 하나의 `Master`로 여러 개의 `Slave`를 제어할 수 있는 이유는 `Master`에서 `Slave`의 <span style="color:#057085"><b>주소 (Address)</b></span> 값으로 각각의 모듈을 구분하기 때문이다. `Slave`의 주소 값은 일반적으로 `7 bits` 값을 가지기 때문에 이론상 하나의 `Master`와 128 개의 `Slave`를 동시에 연결할 수 있다 (개중에는 `10 bits` 주소를 갖는 모듈도 있다).

<span style="color:#057085"><b>데이터 전송 속도</b></span>는 `100 kbps` 또는 `400 kbps` 값을 사용하고 (최근에는 `3.4 Mbps` 까지 가능한 모듈도 있다), 다음의 그림과 같이 I2C 모듈의 `SCL/SDA` 핀은  **Open-Drain** 형태로 되어 있기 때문에, `1 = High` 신호를 출력하기 위해서는 외부에 **5k ~ 10k** 정도의 <span style="color:#057085"><b>Pull-up 저항</b></span>을 연결해줘야 한다 (구체적인 스펙은 I2C 모듈에 따라 상이하다).

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-3p5.png" alt="">
</figure>

---

### 3.2 I2C Write 시퀀스

다음은 I2C Write 동작에 대한 데이터 스트림의 예시를 보여준다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-4.png" alt="">
</figure>

Start 조건 이후, `Master`는 통신하고자 하는 `Slave`의 주소 값 `7 bits`와 R/W 값 `1 bit`를 전송한다. R/W 값은 Read(`1`)와 Write(`0`) 동작을 구분하는 비트이다.

만약, 입력한 `Slave` 주소에 대응되는 모듈이 있는 경우 해당 `Slave`는 `Master`로 `ACK` 신호를 전달한다. `ACK` 신호를 전달 받은 `Master`는 Write 하고자 하는 `Slave` 내부의 데이터 영역을 선택하기 위해 `8 bits` 크기의 레지스터 정보를 전송한다. 이 과정은 Write 가능한 레지스터에 대해 수행되어야하며, 문제가 없을 경우 `Slave`는 다시 `ACK` 신호를 전달한다. 레지스터 선택을 완료한 이후, `Master`는 해당 레지스터에 원하는 데이터를 `BYTE` 단위로 전송하며, 하나의 `BYTE` 전송이 끝날 때마다 `Slave`로부터 `ACK` 신호를 수신한다.

더 이상 Write 할 데이터가 없는 경우에는 Stop 조건을 통해 I2C 통신을 종료한다.

---

### 3.3 I2C Read 시퀀스

Read 시퀀스의 경우는 아래 그림과 같은데, 특이한 점은 Read 시작 후 `Slave` 주소 다음에 오는 R/W 비트 값이 `0`이라는 점이다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-5.png" alt="">
</figure>

`Master`에서는 Read 동작을 수행하는 경우에도, `Slave`에게 어떤 레지스터 값을 읽어올지 알려줘야 하기 때문에 Write 동작을 먼저 수행한다. 그렇기 때문에, 처음에 `Slave` 주소를 전송하고 레지스터를 선택하는 시점까지는 Read/Write 시퀀스가 동일한 것을 볼 수 있다.

레지스터를 선택 후, Read 시퀀스에서는 `Master`가 Start 신호를 다시 전송하며(**Repeated START**), `Slave` 주소와 함께 R/W 비트 값을 `1`로 전송하면, `Slave`에서는 이전에 선택된 레지스터의 값을 `Master`로 전송해준다.

Read 종료 시에는 `Master`에서 `Slave`로 `NACK` 신호를 전송하며, Stop 조건을 끝으로 시퀀스가 마무리된다.

---

### 3.4 기타 데이터 스트림

<span style="color:#F51050"><b>Repeated START</b></span>

I2C 데이터 스트림에서 **Repeated START** 동작은 Read 시퀀스 또는 `10 bits` 주소 값을 갖는 `Slave`에 접근하는 경우 등에 사용된다. 아래 그림을 보면, Stop 조건 없이 `SCL/SDA` 라인이 `1` 신호를 유지하고, Start 조건이 다시 수행되는 것을 확인할 수 있다. 

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-7.png" alt="">
</figure>

<span style="color:#F51050"><b>10 bits Slave Address</b></span>

다음은 `10 bits` 주소 값을 갖는 `Slave`에 접근하는 경우의 데이터 스트림을 보여준다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-6.png" alt="">
</figure>

I2C 프로토콜에서는 `BYTE` 단위로 데이터를 주고 받기 때문에, `10 bits` 주소 값을 갖는 `Slave`에 접근하기 위해서는 위 그림과 같이 주소 정보를 두 번에 걸쳐 전송해야한다. `Addr(9:0)` 값을 임의의 I2C `Slave`의 `10 bits` 주소라고 할 때, 상위 `2 bits = Addr(9:8)`와 하위 `8 bits = Addr(7:0)`를 나눠서 전송하며, R/W 비트는 상위 `2 bits`와 함께 전송한다.

추가로, 위 그림을 보면 상위 `2 bits`는 `11110` 신호와 함께 전송되는 것을 확인할 수 있는데, 이는 `10 bits` 주소 값을 갖는 `Slave`에 접근하기 위해 고정적으로 사용되는 값이다. **따라서**, `7 bits` 주소 값을 갖는 `Slave` 주소는 `11110`으로 시작될 수 없으며, 하나의 `Master`에서 한 번에 제어할 수 있는 `7 bits` 주소의 `Slave`는 128 개가 아닌, **124 개**가 된다.

---

**Reference**

https://learn.sparkfun.com/tutorials/i2c

https://aticleworld.com/i2c-bus-protocol-and-interface/

https://www.robot-electronics.co.uk/i2c-tutorial

Jonathan Valdez and Jared Becker, "Application Report: SLVA704 - Understanding the I2C Bus," *Texas Instrumens*, June 2015 [[PDF]](/assets/papers/slva704.pdf)