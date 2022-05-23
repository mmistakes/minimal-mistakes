---
title: "nRF5 SDK (1) - nRF52840 칩에서 2개의 UART 모듈 사용하기"
categories:
  - nRF5 SDK
tags:
  - nRF52840
  - UART
  - UARTE
toc: true
toc_sticky: true
---

# 1. nRF52840 칩에서 2개의 UART 모듈 사용하기 : How To Use Two UART in nRF52840

**SDK Version :** `nRF5 SDK 17.0.2 (or nRF5 SDK 15.3.0)`
{: .notice--info}

## 1.1 Setup

* `nRF5 SDK 17.0.2` 다운로드 (본인의 경우 `nRF5 SDK 15.3.0, 17.0.2` 버전에서 테스트해볼 기회가 있었는데 둘 다 동일하게 작동하였음)
* nRF5 SDK 폴더 > examples > ble_peripheral > ble_app_uart 예제 이용: 다른 이름으로 새폴더를 하나 만들고, 원래의 폴더 안의 항목들을 복사 / 붙여넣기 해서 사용
* 새로 생성한 폴더에서 `Segger Embedded Studio (SES)` 프로젝트 실행

---

## 1.2 "main.c" 수정

`main.c` 파일을 보면 사전에 정의되어있는 uart 관련 함수가 있음 (예: uart_init, uart_event_handle). 추가 UART 모듈을 사용하기 위해 (**정확하게는 추가 UARTE1 모듈**) UART1 이란 이름을 사용해서 동일한 함수를 정의하고 complie (Build) 진행.

>물론 추가 UART1 모듈을 사용할 GPIO pin 하고, Baudrate, event handler 등은 본인 application 에 맞게 설정해야함.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-uart-fig1.png" alt="">
</figure>

위 그림의 예시처럼 함수를 정의해서 compile 해보면 당연히 경고가 뜰텐데, 대충 "APP_UART1_FIFO_INIT" 이라는 함수가 있냐고 묻는 내용. 우리는 해당 함수를 정의한 적이 없으므로, "APP_UART_FIFO_INIT" 함수가 있는 위치로 가서 동일한 형식으로 UART1 모듈과 관련된 함수를 정의하자.

---

## 1.3 "app_uart.h" 수정

`app_uart.h` 파일 열어서 사전에 정의된 함수를 참고해서 동일한 형식으로 UART1 모듈에 대한 함수를 아래 그림과 같이 선언하면 된다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-uart-fig2.png" alt="">
</figure>

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-uart-fig3.png" alt="">
</figure>

app_uart1_init(, get, put, close) 등의 함수를 선언했으면, 해당 함수를 정의하기 위해 `app_uart_fifo.c` 파일로 이동 (기존의 app_uart_init 함수가 있는 위치).

---

## 1.4. "app_uart_fifo.c" 수정

`app_uart_fifo.c` 파일에서 앞서 선언한 함수들을 정의하면 되는데, UART1 모듈을 제어하기 위한 인스턴스 및 관련 변수를 추가로 선언한 뒤에 UART1 관련 함수를 정의해야 한다. 아래 예시 참조.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-uart-fig4.png" alt="">
</figure>

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-uart-fig5.png" alt="">
</figure>

>기존의 UART 모듈에서 사용되는 instance, event handler 함수, buffer 변수를 중복해서 사용하면 UART1 모듈이 정상적으로 동작하지 않음.

---

## 1.5. "sdk_config.h" 수정

위의 과정까지 정상적으로 진행되었다면, 마지막으로 프로젝트의 `sdk_config.h` 파일에서 UART 관련 변수를 다음과 같이 설정하자.

```c
// <e> UART1_ENABLED - Enable UART1 instance
//==========================================================
#ifndef UART1_ENABLED
#define UART1_ENABLED 1
#endif
// </e>

// <e> NRFX_UARTE_ENABLED - nrfx_uarte - UARTE peripheral driver
//==========================================================
#ifndef NRFX_UARTE_ENABLED
#define NRFX_UARTE_ENABLED 1
#endif
// <o> NRFX_UARTE0_ENABLED - Enable UARTE0 instance 
#ifndef NRFX_UARTE0_ENABLED
#define NRFX_UARTE0_ENABLED 0
#endif

// <o> NRFX_UARTE1_ENABLED - Enable UARTE1 instance 
#ifndef NRFX_UARTE1_ENABLED
#define NRFX_UARTE1_ENABLED 1
#endif
```
<!--figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-uart-fig6.png" alt="">
</figure-->

---

## 1.6. 기타 참고사항

* 아두이노나 다른 임베디드 프로세서에서는 쉽게 여러개의 UART 모듈을 제어할 수 있는데, nRF5 BLE 칩에서는 기본적으로 라이브러리를 수정하지 않으면 사용하기 어렵다.
* (확실한 이유는 모르겠는데) 테스트 도중 UARTE1 인스턴스가 제대로 동작하지 않는 핀을 확인하였음 (사전에 다른 용도로 assign 되어있는 핀을 이용한 것인지, 아니면 UARTE1 로 사용할 수 있는 모듈이 제한 되어있는것인지 까지는 모르겠음).
* 본인의 경우는 위의 기능을 `nRF52840-DK` 보드로 테스트 했는데, `main.c` 파일 내 uart1_init 함수에서 UART1 모듈 핀을 위의 1.2 의 그림의 핀으로 설정했을때는 정상동작하지 않아서 다른 핀 ((**`P1.07`, `P1.08`**)을 사용했음.
* 추가 UART 모듈 (UARTE1)이 정상적으로 활성화되면, 해당 모듈의 Tx 핀이 `High` 값 (e.g. 3.3V)으로 설정되어 있을 것이다.
* 만약, 여러개의 프로젝트를 개발하고 있고, 다른 프로젝트에서 UART 모듈을 사용한다면 UARTE1 모듈 추가 후 complie 에러 발생할 수 있음. (`sdk_config.h` 설정에서 UARTE1 관련 모듈을 활성화 시키거나, UARTE1 모듈을 사용하지 않을 경우  UARTE1 인스턴스와 관련된 부분을 주석처리할 것)