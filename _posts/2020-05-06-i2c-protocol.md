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

I2C 프로토콜은 두 개의 라인으로 데이터를 교환하는 시리얼 통신 방식이다. 특정 디바이스에서는 Two-Wired Interface (TWI) 라고 부르지만, 정식 명칭은 <span style="color:#E84A08"><b>Inter-Integrated Circuit (I2C)</b></span> 이고, 하나의 `Master`에서 여러 개의 `Slave`를 제어하기 위해 고안되었다. 특히, 다음과 같이 중첩된 형태로 다수의 `Master`와 `Slave`를 연결할 수 있기 때문에, **N by N** 통신이 가능하다. (*N 개의 `Master`와 N 개의 `Slave` 사이의 통신*)

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-1.png" alt="">
</figure>

**Notice:** 본 포스트에서의 `Master`는 I2C 통신을 시작하는 모듈로서 `Slave` 모듈을 제어하거나 `Slave` 모듈로부터 데이터를 요청하는 디바이스를 통칭한다.
{: .notice-success}


### 3.1 I2C 프로토콜 특징

I2C 프로토콜은 클럭 라인 (`SCL`)과 데이터 라인 (`SDA`)을 이용해 통신하는 동기식 (synchronous) 시리얼 통신 방식이다. 하드웨어 구조는 복잡하지만, 위의 그림에서 볼 수 있는 것처럼 서로 다른 모듈간의 wiring 연결이 간단하고, 하나의 `Master`에서 여러 개의 `Slave`를 번갈아가면서 제어할 수 있다는 특징이 있다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-2.png" alt="">
</figure>

데이터를 교환하기 전 `SCL/SDA` 라인은 모두 `1 = High` 상태를 유지한다. 이후, `Master`에서 `Slave`를 제어하기 위해 통신을 시작하는 경우 클럭 신호보다 앞서서 데이터 라인이 `0 = Low` 신호로 변하게 된다 (falling-edge). 반대로 통신이 끝나는 시점에는 `SCL -> SDA` 순서로 `0` 에서 `1` 로 (rising-edge) 돌아오게 된다 (위 그림 참조). 아래 예시에서 볼 수 있듯이, **Start/Stop** 이외의 실제 데이터 교환은 모두 `SCL = 1` 을 유지하는 시점에 수행되는 것을 볼 수 있다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-3.png" alt="">
</figure>

I2C 통신에서 하나의 `Master`로 여러 개의 `Slave`를 제어하는 경우에는 각각의 `SCL/SDA` 라인을 중첩해서 연결해도 문제가 되지 않는데, 그 이유는 `Master`에서 데이터를 주고 받을 `Slave`의 주소 (Address) 값을 이용해 각각의 모듈을 구분하기 때문이다. `Slave`의 주소 값은 일반적으로 `7 bits` 값을 가지기 때문에 이론상 하나의 `Master`와 127 개의 `Slave`를 동시에 연결할 수 있다 (개중에는 `10 bits` 주소를 갖는 모듈도 있음).

데이터 전송 속도는 `100 kbps` 또는 `400 kbps` 값을 사용하고, 다음의 그림과 같이 I2C 의 내부 구조는 Open-Drain 형태로 되어 있기 때문에, `1 = High` 신호를 출력하기 위해서는 외부에 **5k ~ 10k** 정도의 Pull-up 저항을 연결해줘야 한다 (구체적인 스펙은 I2C 모듈에 따라 상이하다).

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/i2c-fig-3p5.png" alt="">
</figure>

<!-- 다른 시리얼 통신과 비교해서 하드웨어는 복잡하지만, 이 또한 대부분의 임베디드 보드에서 제공해줄 것이다.-->

### 3.2 I2C Write 시퀀스

<!--I2C 프로토콜과 관련된 라이브러리는 대부분 임베디드 시스템 제작 업체에서 제공하지만, 실제로 관련
함수를 이용해 I2C 프로토콜을 이용하는 모듈 제어하기 위해서는 어떤 순서로 데이터를 주고 받는지 알아야한다.-->

### 3.3 I2C Read 시퀀스

<!--주소가 10 bit 인 경우는 어떻게 주소를 보내는지 명시

 IoT (4) - I2C 프로토콜 예제 

대충 찾아보면 라이브러리는 다 있어

그래도 왜 그렇게 쓰이는지를 알아야 한다
-->