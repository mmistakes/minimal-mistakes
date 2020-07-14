---
title: "BLE (7) - 연결 파라미터"
categories:
  - BLE
tags:
  - connection parameter
  - slave latency
toc: true
toc_sticky: true
---

## 7. BLE 무선 연결 파라미터

이번 포스트에서는 BLE 무선 연결과정에서 `GAP central`과 `GAP peripheral` 사이에 주고 받는 연결 파라미터 (**connection parameter**)에 대해 소개한다. 연결 파라미터는 두 개의 BLE 디바이스가 무선 연결 되었을 때, 데이터 패킷 (packet)을 얼마나 빠르게 주고 받을 것인지, 얼마 동안 통신이 되지 않을 경우 연결이 끊어졌는가를 판단할 것인지 등을 결정한다.

**Notice:** 본 포스트에서 다루는 연결 파라미터에 관한 내용은 `GAP peripheral` 디바이스를 기준으로 작성되었습니다. 또한, BLE 무선 연결 프로세스에 대한 자세한 내용은 이전에 게재한 **[BLE(4)](https://enidanny.github.io/ble/ble-connection/)** 포스트를 참고하시길 바랍니다.
{: .notice--info}

### 7.1 Connection Interval

일반적으로 BLE 무선 연결을 시작하는 디바이스를 `GAP central`, 연결 요청을 받는 디바이스를 `GAP peripheral` 이라고 부른다. `GAP peripheral`의 경우 다음의 연결 파라미터 정보를 가지고 있으며, 이는 `GAP central`과 연결된 직후 연결 파라미터 변경을 제안하고자 할 때 사용된다.

* minimum connection interval
* maximum connection interval
* slave latency
* connection supervision timerout

먼저, <span style="color:#9FAF2F"><b>connection interval</b></span> 은 BLE packet 을 주고받는 시간 간격을 가리킨다. 해당 파라미터의 경우 `GAP central` 에서 임의의 값을 설정해 사용하거나, `GAP peripheral` 로부터 전달받은 파라미터 중 하나를 선택하기도 한다. `GAP peripheral` 에서는 connection interval 파라미터에 대해 최소값과 최대값을 저장하도록 되어있고, 각각의 값은 <span style="color:#9F0F4F"><b>7.5 ms ~ 4 secs</b></span> 사이의 값을 가져야 하고, <span style="color:#9F0F4F"><b>1.25 ms</b></span> 간격으로 설정 가능하다. 다음은 해당 파라미터에 대한 블루투스 표준 (Core Specification 5.1)에서 명시된 내용이다.

>connIntervalMin(Max) = Interval Min(Max) * 1.25 ms. Interval Min(Max) range: 6 to 3200 frames where 1 frame is 1.25 ms. (...) Interval Min shall be less than or equal to Interval Max.
(BLUETOOTH CORE SPEFICIFATION Version 5.1 | Vol 3, Part A, 4.20)

BLE 시스템의 유효 데이터 통신 속도에 대해 설명한 **[BLE(5)](https://enidanny.github.io/ble/ble-effective-throughput/)** 포스트에서 잠깐 언급하였는데, BLE 디바이스가 무선으로 연결된 상태에서는 무선 연결 상태를 유지하기 위해 유효한 데이터가 포함되지 않은 더미 패킷 (**Dummy or Empty packet**)을 주고 받는다. 더미 패킷은 두 디바이스 사이의 유효한 데이터 교환이 없을 때에도 서로 주고 받기 때문에, connection interval 은 사실상 더미 패킷의 교환 주기를 결정한다고 볼 수도 있다.

---

### 7.2 Connection Supervision Timeout

이름을 보고 짐작할 수 있듯이 <span style="color:#9FAF2F"><b>connection supervision timeout</b></span> 은 BLE 디바이스가 연결된 상태에서 얼마동안 패킷을 교환하지 못했을 때 연결이 끊어졌다고 판단할 것인지를 결정하는 파라미터이다. 두 BLE 디바이스 사이의 거리가 멀어지거나 전파 간섭 등으로 인해 connection supervision timeout 시간 이상으로 패킷을 교환하지 못할 경우, 각각의 디바이스는 무선 연결이 끊어진 것으로 판단한다.

>connSupervisionTimeout = Timeout Multiplier * 10 ms. The Timeout Multiplier field shall have a value in the range of 10 to 3200.
(BLUETOOTH CORE SPEFICIFATION Version 5.1 | Vol 3, Part A, 4.20)

블루투스 표준 문서에 명시된 위 내용에 따르면, connection supervision timeout 값은 최대 32 secs 로 설정이 가능하다. 그렇다면 여기서 다음과 같은 의문이 생길 수 있다. 

>"어차피 최대 연결 주기 (maximum connection interval)는 4 secs 이므로 정상적으로 연결된 상태라면 그 시간을 초과해서 패킷을 주고 받는 경우가 없을텐데, connection supervision timeout 값을 왜 그 이상으로 입력할 수 있게 해놓은 것일까?

위와 같은 의문점은 다음 파라미터에 대해 알고 나면 해소될 것이다.

---

### 7.3 Slave latency

BLE 디바이스가 무선으로 연결된 상태에서의 패킷 교환 주기는 최대 4 secs 이지만, 
<span style="color:#9FAF2F"><b>slave latency</b></span> 파라미터를 활용하면 그 이상으로 연결 주기를 늘릴 수 있다. Slave latency 는 `GAP peripheral` 디바이스에 대한 설정 값으로, 무선 연결을 유지하기 위해 교환하는 더미 패킷을 몇 번까지 무시할 것인지를 결정하는 파라미터이다.

Slave latency 를 이용하면 `GAP peripheral` 디바이스에 전송할 유효한 데이터가 없는 경우, `GAP central` 디바이스에 더미 패킷을 전송하는 과정을 건너뛸 수 있고, 따라서 불필요한 전력 소모를 줄일 수 있게 된다. 만약 connection interval 값을 4 secs 로 설정하고, slave latency 를 2 로 설정하는 경우, 유효한 데이터가 없는 상황에서는 `GAP peripheral` 디바이스의 더미 패킷 전송을 두 번 스킵할 수 있으므로 연결 주기가 12 secs 정도가 되는 셈이다.

>상시 무선 연결이 유지되는 블루투스 키보드나 마우스의 경우 slave latency 를 이용해 전력 소모를 줄인 예라고 볼 수 있다. 블루투스 무선 마우스의 경우 항상 컴퓨터와 연결된 상태를 유지하는데, 실질적으로 의미있는 데이터는 사용자가 마우스를 움직이는 시점에만 발생한다. 이런 경우, slave latency 를 높은 값으로 설정해두면, 사용자가 마우스를 움직이지 않는 동안 마우스에서 더미 패킷을 전송하는 과정을 스킵하도록 하여 전력 소모를 줄일 수 있다.

Slave latency 값은 최대 499 까지 설정할 수 있는데, 이렇게만 보면 `GAP peripheral` 디바이스에서의 불필요한 더미 패킷 전송 횟수를 무한정 줄일 수 있을 것처럼 느껴진다. 하지만, slave latency 를 설정하는데 있어서는 다음과 같은 조건이 있다.

>The Slave Latency field shall have a value in the range of 0 to **((connSupervisionTimeout / (connIntervalMax * 2))-1)**. The Slave Latency field shall be less than 500.
(BLUETOOTH CORE SPEFICIFATION Version 5.1 | Vol 3, Part A, 4.20)

예를 들어, maximum connection interval 값이 `500 ms` 이고, supervision timeout 값이 `5000 ms (5 secs)`인 경우 slave latency 값은 `4` 보다 작아야하므로, `0` 부터 최대 `3` 까지만 설정이 가능하다. 따라서, 위의 표준 문서에서 명시된 규칙에 따라 slave latency 값을 설정해줘야 한다.

---

### 7.4 An example of the effect of slave latency

다음의 그림은 `Nordic Semiconductor` 사의 `nRF52840` BLE 칩이 탑재된 보드의 소비 전류를 측정한 결과이다. 

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble7-fig-1.png" alt="">
</figure>

위의 예제에서 보드는 `GAP peripheral` 에 해당되고, `GAP central` 디바이스에 무선으로 연결되어 있는 상태이다. 그림에서 주기적으로 보이는 펄스 신호는 보드에서 더미 패킷을 송신할 때 발생하는 소비 전류이며, 해당 주기는 위의 예제에서 사용된 maximum connection interval 값과 동일한 `200 ms` 이고, connection supervision timeout 은 `5000 ms`, slave latency 값은 `0` 으로 설정하였다. 

주어진 조건에서 `connSupervisionTimeout / (connIntervalMax * 2) - 1` 값은 `(5000/400) - 1 = 11.5` 이므로, slave latency 는 최대 `11` 까지 설정 가능하다. (해당 규칙을 따르지 않을 경우, `Nordic` BLE 펌웨어의 경우 컴파일은 되지만, run-time 상에서 error 가 발생한다.) 다음은 본 예제 조건에 대해 slave latency 값을 `8` 로 변경한 경우의 전류 파형이다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble7-fig-3.png" alt="">
</figure>

실제 BLE 연결 상에서의 연결 주기는 `200 ms` 이지만, slave latency 에 의해 더미 패킷 교환 주기는 `1.8 secs` 로 변경된 것을 볼 수 있다. 소비 전류 측정 데이터를 살펴봤을 때, 경우에 따라서는 설정된 slave latency 보다 적은 횟수로 더미 패킷 전송을 건너뛰기도 하는 것 같다. BLE sniffer 를 이용해 전송 패킷 자체를 캡쳐할 수 있으면 보다 확실하게 확인이 가능할텐데, 이번 포스트에서는 이 정도만 다루고 넘어가려고 한다.

---

**Reference**

https://www.bluetooth.com/bluetooth-resources/bluetooth-core-specification-v5-1-feature-overview