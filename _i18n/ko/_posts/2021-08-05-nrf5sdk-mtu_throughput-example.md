---
title: "nRF5 SDK (5) - nRF52 시리즈 (SDK 17.0.2) MTU Throughput 예제"
categories:
  - nRF5 SDK
tags:
  - Maximum Transmission Unit
  - Throughput
  - Link Layer
toc: true
toc_sticky: true
---


# 5. nRF52 시리즈 (SDK 17.0.2) MTU Throughput 예제 : MTU Throughput example

## 5.1 Setup

* nRF5 SDK 17.0.2 에서 제공해주는 MTU Throughput 예제 이용. BLE 데이터 송신 속도 확인.
* nRF5 SDK 폴더 > examples > ble_central_and_peripheral > experimental > ble_app_att_mtu_throughput 예제 이용하고, 실험을 위해 두 개의 nRF52840-DK 보드를 사용
* 하나는 통신과 관련된 파라미터를 설정하고 테스트를 시작할 보드 (Tester), 나머지 하나는 Tester 보드에서 송신한 데이터를 수신할 보드 (Dummy).

---

## 5.2 Backgrounds

**Notice :** 다음은 BLE 최대 전송속도 (Throughput)를 고려하기 위해 필요한 배경지식을 필자가 이해한 개념으로 서술한 것. 잘못된 내용 있을 수도 있음으로 주의.
{: .notice--info}

### 5.2.1 Link layer Packet format

블루투스 스택의 (Bluetooth Stack) 의 L2CAP 계층에서는 상위 레이어 (HOST) 에서 생성된 데이터를 (SDU: service data unit) 하위 레이어 (HCI, Controller)에서 제어할 수 있도록 PDU (: protocol data unit) 단위로 변환해준다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-mtu-fig2.png" alt="">
</figure>

PDU 단위로 변환된 데이터는 다음의 Link layer (LL) 패킷에 포함되어 무선 신호로 송수신됨.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-mtu-fig3.png" alt="">
</figure>

위 그림에서 Preamble 영역은 처음에 BLE 신호의 시작점을 확인하기 위한 값이 들어있는 영역. `1 Mbps` 속도로 데이터를 송수신 하는 경우에 `1 bytes` 길이이고, `2 Mbps` 전송 속도가 사용되는 경우에는 `2 bytes` 길이가 된다. (참고: `octet = byte = 8 bits`)

PDU 영역은 다시 `Advertising, Data, Isochronous Physical Channel PDU` 로 구분되는데, 여기서는 LL 패킷의 `Data (Physical Channel) PDU` 가 포함되는 경우를 고려할 것. 그리고 CTE (constant tone extension) 영역은 `AoA/AoD Direction Finding` 기능을 위한 영역으로 지금은 고려하지 않아도 됨.

### 5.2.2 Link layer Packet format for Data PDU

`Data PDU` 는 다음과 같이 구성된다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-mtu-fig4.png" alt="">
</figure>

`2 bytes` 길이의 `LL Header` 에는 각종 파라미터와 Payload 길이 정보 (`8 bits = 1 byte`)가 포함되는데 (`CTE 정보가 있다면 8 bits 추가된다`), 이 때 Payload 길이의 최대 값은 `251` 이다 (MIC 영역 고려). 최대 `251 bytes` 의 크기를 같는 Payload 는 다시 `4 bytes` 의 L2CAP Header 와 이를 제외한 ATT Data 영역으로 분리된다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-mtu-fig5.png" alt="">
</figure>

물론 ATT Data 영역 (최대 `247 bytes`)을 그대로 사용할 수도 있겠지만, 일반적인 BLE 시스템은 `GATT` 를 기반으로 데이터를 service 와 characteristic 형태로 관리하고, 각각의 정보는 다시 attribute 라는 최소 단위로 관리된다. 따라서 안정적인 시스템이라면 ATT Data 영역에는 attribute Header 에 대한 정보가 포함되기 때문에 최대 Throughput 고려할 때 ATT Header 가 차지하는 `3 bytes` 를 제외하는게 맞다고 생각.

### 5.2.3 Summary

* 상위 레이어에서 생성된 데이터는 PDU 단위로 분할되어 LL 패킷을 통해 송신된다.
* PDU 영역 중 실제로 유효한 데이터가 포함되는 영역은 ATT Payload 영역이다.
* 위 그림의 Table 4.6 에 정리되어 있듯이 `DLE (Data length extension)` 기능을 사용하지 않을 경우의 Payload 길이는 `27 bytes` 이고 여기서 L2CAP Header 와 ATT Header 영역을 제외하면 하나의 패킷으로 전송 가능한 유효 데이터는 **`20 bytes`** 이다. `DLE` 기능 사용 시 최대 유효 데이터는 **`244 bytes`**

---

## 5.3 Test nRF5 SDK Example

본 예제를 이용해 BLE 데이터 통신 속도 (Throughput)를 측정하는 실험을 준비하면서 의아한 부분이 몇 가지 있었는데, 여러 사이트에서 구글링도 해보고 Bluetooth 표준 문서 (**Core Specification**)도 확인해봤지만 결과적으로는 명확한 답을 얻지는 못했다.

>예제 코드 관련 링크: https://infocenter.nordicsemi.com/index.jsp?topic=%2Fsdk_nrf5_v17.0.2%2Fble_sdk_app_att_mtu.html&cp=8_1_4_2_1_0

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-mtu-fig1.png" alt="">
</figure>

실험 결과를 정리하기에 앞서 본 예제에서 사용되는 파라미터 중 `ATT_MTU` 와 `Data_length` 대한 개념이 다소 모호하다. `Data_length` 는 Link Layer (LL) Data Packet PDU 의 Payload 영역의 길이를 가리키는 것 같고, `ATT_MTU` 는 `Data_length` 가 가리키는 영역 중에서도 중 `4 bytes` 길이의 L2CAP Header 를 제외한 영역의 길이를 가리키는 것 같은데 예상과는 다르게 동작함..

### 5.3.1 ATT MTU = 23 bytes, Data length = 27 bytes, 1 Mbps

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-mtu-fig6.png" alt="">
</figure>

위 실험 조건은 초기의 BLE 규격 (4.2 에서 추가된 `DLE` 기능 적용하지 않는 경우)을 가정한 것으로 테스트 결과 약 `193 Kbps` 의 Throughput 얻었다. 그런데 예전에 최대 전송속도 관련해서 구글링 했었던 [사이트](https://punchthrough.com/maximizing-ble-throughput-on-ios-and-android/) 내용 보면, 하나의 연결 주기 동안 주고받을 수 있는 데이터 패킷의 개수가 정해져있는데, 이 값이 nordic device 의 경우 6개 인줄 알았음. 그런데 테스트 해보면, `193 Kbps` 라는 값이 어떻게 나왔는지 모르겠음.

>**최대 전송속도:** <span style="color:#A00F50"><b>24 KB/s</b></span>

### 5.3.2 ATT MTU = 23 bytes, Data length = 251 bytes, 1 Mbps

DLE 기능 사용하지만, 실제 유효한 데이터는 사용 가능한 패킷 영역보다 적게 사용하는 경우. 일부러 worst-case 가정해서 테스트 진행. 그래도 초당 `10 Kbytes` 송신 가능한 것을 확인

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-mtu-fig7.png" alt="">
</figure>

>**최대 전송속도:** <span style="color:#A00F50"><b>10 KB/s</b></span>

### 5.3.3 ATT MTU = 247 bytes, Data length = 251 bytes, 2 Mbps, 40 ms (conn. interval)

`DLE` 기능 사용해서 최대로 데이터를 보내는 경우를 가정. 본 예제 코드에서 연결 주기는 `7.5 ms, 50 ms, 400 ms` 중 하나로 설정할 수 있는데, 해당 조건 중에서는 `50 ms` 에서 Throughput 최대로 나왔다. 전송 속도는 `2 Mbps` 로 설정.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-mtu-fig7.png" alt="">
</figure>

>**최대 전송속도:** <span style="color:#A00F50"><b>150 KB/s</b></span>

 (송신 속도를 `1 Mbps` 로 했을 때는 90 KB/s 정도의 Throughput 나왔다.)

---

## 5.4 Conclusion

* 실험 결과: `1 Mbps` 조건에서의 Throughput (`DLE` off: **`24 KB/s`**, on: **`90 KB/s`**). `2 Mbps` 조건에서의 Throughput (`DLE` on: **`150 KB/s`**)
* 한계점: 예제 소스 코드에서 제공해주는 결과가 실제 유효한 데이터 (ATT Payload 영역) 기준으로 계산된 속도인지 확인 안 됨. 또한 실제 환경에서는 두 기기 사이에 정확하게 데이터가 수신되었는지 확인하는 절차 필요. (`e.g. QoS`)
* 다음 포스트에서 Nordic UART Service 예제 코드를 이용해서, 임의의 GATT Service 데이터 보낼 때 실제 어플리케이션 시나리오 고려해서 **Throughput** 계산해볼 예정이다. (~~`2022.03` 지금보니 결국 귀찮아서 따로 테스트 안했음 ㅋㅋ~~)
---

**Reference**

https://www.bluetooth.com/specifications/specs/

https://punchthrough.com/maximizing-ble-throughput-on-ios-and-android/
