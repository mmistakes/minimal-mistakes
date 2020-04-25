---
title: "IoT (2) - 시리얼 통신 (2)"
categories:
  - IoT
tags:
  - rules of serial
  - UART example
toc: true
toc_sticky: true
---

## 2. 시리얼 통신 예제

**Notice:** 본 포스트는 **[IoT (1) - 시리얼 통신](https://enidanny.github.io/iot/serial-uart/)** 포스트의 후반부 내용과 이어집니다.
{: .notice}

이전 포스트에서는 시리얼 통신에 대한 간략한 개념과 비동기식 시리얼 통신 (이하 UART 통신) 에서 어떤 식으로 데이터를 전송하는지에 대해 언급하였다. 다음 데이터 프레임 (포맷) 그림에서 각 영역(**i.e. `Start`, `Data`, .etc**) 아래의 숫자는 해당 영역의 **bits** 사이즈를 보여준다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/serial-uart-fig-3.png" alt="">
</figure>

UART 통신에서 데이터 프레임의 시작과 끝은 **Start bit**와 **Stop bit**로 정해져있다는 것은 알고 있지만, 위 그림에서 볼 수 있듯이 **Start bit**를 제외하면 나머지 영역의 사이즈는 하나의 사이즈로 고정되어 있지 않는 것을 볼 수 있다. 따라서, UART 인터페이스로 정보를 주고 받기 위해서는 사전에 **통신 규격**을 동일하게 설정해줘야 한다.

### 2.1 비동기식 시리얼 통신 규격

UART 통신을 이용하기 위해서는 크게 다음의 두 가지 항목을 사전에 정의해줘야 한다.

* **Baud rate**
* **Size of each frame field**

#### 2.1.1 보드 레이트 (Baud rate)

먼저, **Baud rate** 값은 신호의 전송 속도를 명시한다. UART 통신에서는 별도의 클럭을 이용하지 않기 때문에 어디서부터 어디까지를 하나의 신호로 판단해야할 것인지를 알아야 하고, 이는 곧 신호의 전송 속도와 연관된다. 

>예를 들어 1초 간격으로 신호를 구분하는 경우 1초 동안 `1`이란 신호가 유지되는 경우, 그대로 `1` 이란 정보를 수신했다고 판단할 것이다. 하지만, 0.5초 간격으로 신호를 구분하는 장치에서 1초 동안 `1` 신호가 유지되는 경우에는 `11`이란 정보를 수신했다고 판단하게 될 것이다.

따라서, 정상적으로 데이터를 주고받기 위해서는 사전에 Baud rate 값을 이용해 통신 속도를 명시해줘야 한다. 일반적으로 Baud rate 의 단위로는 `bps = bits per second`를 사용하며, 이는 1초당 전송하는 `bit` 수를 명시한다.

**주로 사용되는** <span style="color:#EF2F0F"><b>표준 bps 값:</b></span> `1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200`
{: .notice}

UART 인터페이스의 통신 속도를 **Baud rate** 라고 소개하였고 보편적으로도 그렇게 언급되지만, 실제로 <span style="color:#DF0F0F"><b>Baud rate</b></span> 는 초당 전송 가능한 <span style="color:#DF0F0F"><b>Symbol</b></span> (의미있는 데이터의 묶음)의 개수를 정의하는 단위이다. 예를 들어, `Symbol = 1 bit` 인 경우에는 **Baud rate** 는 `bps` 단위를 갖게 되며, `1 Baud = 1 bps`로 표현 가능하다. 하지만, `Symbol = 1 byte = 8 bits` 인 경우는 `1 Baud = 8 bps` 가 된다. 표준 전송 속도 단위를 예로 들면, `9600 bps = 1200 Baud` 가 되는 것이다.

**Notice:** 혹시나 **Baud** 개념에 대해 잘 이해되지 않더라도, 대부분 경우 `bps` 단위를 기준으로 전송 속도를 명시하므로 크게 걱정하지 않아도 될 것이다.
{: .notice  }

#### 2.1.2 프레임 사이즈 (Size of each frame field)

다음으로, 전송 속도와 함께 데이터 프레임 각 영역 (field)의 사이즈도 정의해줘야 한다. 일반적으로  **Data bit**는 `1 bytes = 8 bits` 사이즈로 설정되고, **Stop bit**는 `1 bit`, **Parity bit**는 `0 bit`로 설정하지만, 이는 UART 통신을 사용하는 환경에 따라 상이할 수 있다.

>데이터 전송 속도가 `9600 bps` 이고, **Stop bit**는 `1 bit` 이며, **Parity bit**가 `0 bit`인 디바이스의 UART 통신 규격은 다음과 같이 명시하기도 한다: **`9600 8N1`**

### 2.2 UART 예제 (Arduino)

### 2.3 UART 예제 (nRF52-DK)

---

**Referecnce**

https://learn.sparkfun.com/tutorials/serial-communication

<!-- 
<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/serial-uart-fig-1.png" alt="">
</figure>

<span style="color:#DF9F0F"><b>문구</b></span>
-->