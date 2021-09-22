---
title: "IoT (8) - AIS2IH 가속도 센서 (Accelerometer) 제어"
categories:
  - IoT
tags:
  - accelerometer
  - AIS2IH
  - I2C
  - STEVAL-MKI218V1
toc: true
toc_sticky: true
---

# 8. AIS2IH 가속도 센서 (Accelerometer) 제어 (with nRF52840-DK)

## 8.1 AIS2IH 가속도 센서 개발 준비

가속도 센서 (`Accelerometer`) 는 센서에 명시된 3축 (**`x,y,z`**) 에 가해지는 지구 중력 가속도의 값을 측정하는 장치로, 이를 이용해서 물체가 기울어진 정도나 방향을 확인할 수 있다. 일반적인 가속도 센서의 경우 작은 변화에도 값이 크게 변동하는 문제가 있지만, 이를 활용해 물체가 움직이는지 아닌지 판단할 수도 있다 (~~오히려 좋아! 🧔🏻~~).

* **하드웨어 Setting:**

<figure style="width: 85%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/iot-acc-fig1.png" alt="">
</figure>

`STMicroelectronics` 사의 `AIS2IH` 가속도 센서 테스트를 위해 위의 그림과 같이 `nRF52840-DK` 보드와 해당 가속도 센서가 탑재된 키트 (`STEVAL-MKI218V1`)를 연결해주었다. 가속도 센서의 각 축의 방향은 아래 그림과 같고, `I2C` 통신을 이용해 센서를 제어하였으며, 센서 키트에 나와있는 핀 중 실제로 사용된 6개의 핀을 아래 그림에 나타내었다.

* **STEVAL-MKI218V1 Setting:**

<figure style="width: 90%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/iot-acc-fig5.png" alt="">
</figure>

센서 (키트)의 핀 중 `SA0` 는 가속도 센서의 `I2C` 슬레이브 주소 값을 설정하기 위한 핀이다. `AIS2IH` 데이터 시트에 명시되어 있듯이, `I2C` 슬레이브 주소 `7 bits` 중 앞의 `6 bits = [6:1]` 값은 `0b001100` 으로 정해져있고, `SA0` 값에 의해 마지막 `0`번째 비트 값 (`LSB`) 이 결정된다 (아래 그림 참조).

<figure style="width: 95%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/iot-acc-fig4.png" alt="">
</figure>

>`SA0 = VDD` : `0b0011001` = `0x19`

>`SA0 = GND` : `0b0011000` = `0x18`

---

## 8.2 주요 레지스터

하드웨어 설정이 완료되었다면, `I2C` 프로토콜을 이용해서 센서의 레지스터 값을 읽거나 쓰는 것으로 `AIS2IH` 가속도 센서를 제어할 수 있다. 기본적인 센서 제어에는 다음의 레지스터 정도만 활용해도 충분할 것 같다.

* `0x20`: 가속도 측정 주기, 동작 모드, Low-Power 모드 설정
* `0x25`: 하드웨어 필터, **Full-Scale**, Low-Noise 모드 설정
* `0x28~0x2D`: `x,y,z` 축 가속도 측정 값 (`14 or 12 bits`)

아래 그림은 레지스터 설정 이후 가속도 센서 값이 들어있는 레지스터 값을 읽은 경우의 예시를 보여준다. 센서는 본 포스트 제일 첫 번째 그림 (사진)과 같이 `z` 축 값이 가장 큰 값을 갖도록 지면과 평행하게 두었고, 가속도 측정 값의 resolution 은 `14 bits` 로 설정했기 때문에 부호 (`+/-`) 비트를 제외하고 `13 bits` 의 값으로 표현된다. (출력 값 범위: `-8192 ~ +8191`)

<figure style="width: 80%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/iot-acc-fig2.png" alt="">
</figure>

위 그림을 보면 `+/-2g` Full-Scale 기준으로 출력 값이 4000 정도인 것을 확인할 수 있고, Full-Scale 값 (`+/-2,4,8,16g`) 을 높일 수록 출력 값이 작아지는 것을 볼 수 있다 👩🏽‍🚀.

>여기서의 <span style="color:#600320"><b>Full-Scale</b></span> 이란 `-8192 ~ +8191` 가속도 센서 값이 나타내는 중력 가속도 값의 범위를 나타낸다. 즉, Full-Scale 을 `+/-2g` 로 설정할 경우, 센서 출력 값이 나타낼 수 있는 `-8192 ~ +8191` 이란 범위는 `+/-2g` 의 중력 가속도와 매칭되는 것을 의미한다. 평상시 지구 중력 가속도는 `1g` 이므로 `+/-2g` 의 Full-Scale 에서 `z` 축 출력 값은 `4096` 전후의 값이 측정되는 것이다.

같은 원리로 Full-Scale 값이 `+/-16g` 인 경우에는 센서 출력 `+8191` 이 `+16g` 에 해당되기 때문에 평상시 `+1g` 조건에서는 `512` 전후의 값이 측정된다. 아래 그림은 이러한 관계를 토대로 해서 센서 출력 값을 중력 가속도 (`g`) 단위로 변환한 예시를 보여준다.

<figure style="width: 80%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/iot-acc-fig3.png" alt="">
</figure>
