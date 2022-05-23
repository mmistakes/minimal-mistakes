---
title: "BLE (14) - 새로운 무선 오디오 시장의 시작: Bluetooth 5.2"
categories:
  - BLE
tags:
  - Bluetooth 5.2
  - LE Audio
  - Isochronous Channel
  - EATT
  - LEPC
toc: true
toc_sticky: true
---

## 14. 새로운 무선 오디오 시장의 시작: Bluetooth 5.2

### 14.1 Background for LE Isochronous Channels (ISOC)

**Notice :** 다음은 [https://www.bluetooth.com/wp-content/uploads/2020/01/Bluetooth_5.2_Feature_Overview.pdf](https://www.bluetooth.com/wp-content/uploads/2020/01/Bluetooth_5.2_Feature_Overview.pdf) 의 3.1 절 내용을 의역한 것이며, 보다 자세한 내용은 자료 원문 혹은 **Bluetooth Core Specification** 문서를 참조하십시오.
{: .notice--info}

블루투스 5.2 에서 추가된 `ISOC` 특징을 알아보기 전, 블루투스 5.1 까지 소개된 BLE 프로토콜의 대략적인 채널 특성은 다음과 같다.

* BLE 물리 계층 (PHY, `Physical Layer`)은 전송 속도(방식) 기준 `LE 1M`, `LE 2M`, `LE Coded` 로 구분되며, `LE Coded` 계층의 파라미터는 FEC (`forward error correction`) 방식에 따라 `S=2` 또는 `S=8` 으로 나뉜다.
* 무선 통신 시 데이터 충돌을 방지하기 위해 시간 영역을 특정 간격 (`Slots`)으로 구분해서 여러 데이터를 송신하는 `TDMA (Time Division Multiple Acess)` 기법과 채널 (`Channels`)을 구분해서 데이터를 송신하는 `FDMA (Frequency Division Multiple Acess`) 기법이 사용된다.
* `2.4 GHz` 대역의 주파수를 사용하는 BLE 는 `2 MHz` 간격으로 구분된 40 개의 채널이 이용하며, `0` 부터 `39`번 까지의 40 개의 채널 중 `37, 38, 39` 세 개의 채널은 게시 (`Advertising`) 채널로 사용되고, 나머지 37 개 채널이 데이터 채널로 사용된다.
* 연결 없이 게시 데이터를 이용해 정보를 전달하는 브로드캐스트 (`Broadcast`) 시스템의 활용을 위해 `Extended Advertising` 관련 기법이 고안되었으며, 앞서 언급한 `37~39` 채널을 primary advertising 채널로 구분하고, 나머지 37 개의 채널을 secondary advertising 채널로 활용하는 것이 가능하다.
* 또한, 기본적으로 Advertising 간격은 데이터 충돌을 방지하기 위해 임의의 랜덤한 지연 (`delay`) 시간이 존재하는데, `Periodic Advertising` 이라고 불리는 동작 모드에서는 이러한 지연 시간을 제거하여 완전히 고정된 (fixed and deterministic) 간격으로 데이터를 게시하는 것이 가능하다.

---

### 14.2 Whats the New Features of Blueetoth 5.2

블루투스 5.2 <span style="color:#053070"><b>(Bluetooth Core Specification v5.2)</b></span> 에서 추가된 기능은 크게 다음과 같다. 

* `Enhanced Attribute Protocol (EATT)`
* `LE Power Control (LEPC)`
* `Isochronous Channels (ISOC)`

`EATT` 는 기존의 `Attribute Protocol (ATT)` 의 업그레이드 버전으로, 두 연결된 디바이스 (`GATT Client and Server`) 간에 데이터 교환을 순차적으로 처리하는 `ATT` 와는 달리 `EATT` 는 동시에 병렬로 처리하기 위해 도입된 것으로 보인다 🎢. 특히, 여러 종류의 응용 프로그램 (`Application`)을 제어하는 경우, 서로 다른 응용 프로그램과 관련된 패킷 (`packet`)을 처리할 때 이를 한 번에 처리 가능한 단위로 효율적으로 관리하여 전반적인 지연속도를 낮출 수 있도록 고안된 것 같다.

`LEPC` 는 연결된 두 디바이스 사이의 송수신 파워를 제어하는 기술인데, 각 디바이스의 수신 강도 (`RSSI`) 정보를 기반으로 적정 레벨의 전력으로 데이터를 송신하도록 하는 기법이다. 두 디바이스 간의 거리가 가깝다면 (혹은 수신 강도가 클 경우) 송신 파워 (📡)를 적정 수준까지 줄여서 전력 효율을 높일 수 있을 것이다. 또한, 반대로 거리가 멀거나 장애물 등으로 인해 수신 강도가 낮게 측정되는 경우 송신 파워를 올리도록 요청하여 두 디바이스 간의 통신 상태가 원활하도록 조율할 수 있을 것이다.

`ISOC` 는 `LE Audio` 와 관련된 기술로 블루투스 5.2 에서 새롭게 추가된 PHY (`Physical Layer`) 의 특징이다. `ISOC` 의 경우 우리나라말로 번역하면 등시성 채널 정도가 될 텐데, 완전 별개의 물리 계층이라기 보다는 기존 물리 계층 (`LE 1M`, `LE 2M`, `LE Coded`)에 추가되는 등시성 특성이라고 보면 될 것 같다. `ISOC` 의 대략적인 개념을 이해하는데는 아래 그림 하나만 살펴봐도 충분할 것 같다.

<figure style="width: 90%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-52-fig1.png" alt="">
</figure>

`ISOC` 에서 구현하고자하는 것은 쉽게 말해 "에어팟"을 "스마트폰"에 연결해 음악을 듣거나 유튜브를 보려고 할 때 기존 블루투스 대신 BLE 를 이용할 수 있도록 하는 것이다. 이게 단순한 문제라고 여겨질 수도 있지만 에어팟이나 갤럭시 버즈 같은 무선 이어폰은 좌(L)/우(R) 이어폰이 서로 분리되어 있고, 각각의 이어폰이 음원 데이터를 받아서 동일한 시간에 재생이 되어야 한다. 

무선 이어폰에서 음원 데이터를 받는 시점을 생각해보면, 결국에는 위 그림의 `event A` 처럼 어떤 기기는 먼저 데이터를 받을 것이고, `event B` 나 `event C` 처럼 어떤 기기는 나중에 데이터를 받을 것이다. 우리가 음악을 듣거나 유튜브 영상을 볼 때 어색함을 느끼지 않으려면 음원 데이터를 먼저 받은 이어폰은 다른 한 쪽이 동일한 데이터를 받을 때까지 대기했다가 동시에 이를 재생해야 하는 것이다. `ISOC` 는 대략적으로 이러한 기능을 구현하기 위해 고안된 기술이라고 생각하면 된다.

"다시 말해서, `ISOC` 는 하나의 소스에서 생성된 데이터를 여러 싱크 노드 (`Receiver`)에서 동시에 렌더링하기 위한 기술이다."

>블루투스 5.2 관련 기술적인 내용은 아래 참조 (**Reference**) 에 소개한 링크에서 보다 자세히 소개하고 있다.

---

### 14.3 Wireless Audio Application

블루투스 클래식 (BR/EDR)은 초창기 무선 마우스를 시작으로 다양한 분야에서 활용되었는데, 특히 에어팟이나 갤럭시 버즈 같은 무선 (스테레오) 이어폰 또는 무선 스피커 시장에서 적극 활용되고 있다.

블루투스 클래식의 경우 `A2DP (Advanced Audio Distribution Profile)` 를 이용해 무선 스트리밍 서비스를 제공하는데, 이와 같은 기능이 BLE 에서는 아직까지 이러한 어플리케이션이 제공되지 않았었다. BLE 에서 아직까지 무선 Audio 어플리케이션을 출시하지 않은 것에 있어서는 여러 이유가 있겠지만, 기본적으로 BR/EDR 의 전송 속도는 `2~3 MHz` 인데 반해, 저전력 센서 네트워크 시장에 초점을 맞췄던 BLE 는 런칭 당시 `1 MHz` 의 전송 속도만을 제공했던 것이 가장 큰 한계점이지 않았을까 싶다.

<figure style="width: 90%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-52-fig2.png" alt="">
</figure>

무선 오디오 어플리케이션 구현을 위해 음성 데이터를 압축 (인코딩)하고, 다시 재생 (디코딩)하기 위한 코덱 (`Codec`)이 필요한데, 지금까지도 보편적으로 사용되는 `SBC` 코덱의 경우 약 `345 Kbps` 의 유효 데이터 전송률 (Throughput)을 달성할 수 있어야 하는데, 데이터 패킷에 포함되는 각종 헤더 (Header)를 제외하면 초창기 `1 MHz` 의 전송 속도로는 초당 `345 Kbit ~= 43 KBytes` 의 유효 데이터를 보내는 것이 불가능하다 ☔️.

지금의 BLE 프로토콜은 통신 속도와 Throughput 이 **Bluetooth 4.0** 런칭 당시와 비교했을 때 상당히 증가했으며, `ISOC` 같은 특성과 함께 `LE Audio` 어플리케이션에 사용 가능한  고퀄리티의 저전력 코덱인 `LC3 (Low Complexity Communications Coded)` 코덱도 개발되었다.

---

### 14.4 New Features of LE Audio

`LE Audio` 는 기존에 BR/EDR 기반으로 제공되던 무선 오디오 기능을 BLE 기반으로 제공하는 것 이외에 어떤 의미가 있을까? 다음은 블루투스 공식 홈페이지에서 소개하는 `LE Audio` 의 적용 예시이다.

* <span style="color:#209070"><b>Personal Audio Sharing :</b></span> 하나의 소스에서 나오는 음원 데이터를 특정 그룹에게만 전달하여 공유.
* <span style="color:#209070"><b>Public Assisted Hearing :</b></span> 청각 보조 어플리케이션 (e.g. 보청기). 특히, 극장이나 영화관 같은 곳에서 청력 안 좋은 사용자들에게 LE Audio 이어폰을 이용해 음성 데이터를 들을 수 있도록 어플리케이션 제공.
* <span style="color:#209070"><b>Public Television :</b></span> 운동장이나 체육관 등지에서 전광판에서 나오는 음성 데이터를 LE Audio 이용해서 수신.
* <span style="color:#209070"><b>Multi-Language Flight Announcements :</b></span> 여객기 탑승 전 여행객 정보를 등록 후 각 좌석에 비치된 이어폰을 이용해 음성 안내 방송을 들을 때 선호하는 언어로 번역된 안내 방송을 들을 수 있도록 제공.

그 외에도 여러 적용 분야가 있을 수 있는데, 핵심은 하나의 소스에서 다수의 구별된 그룹에게 동기화된 음원 데이터를 제공하는데 있다.

>현재 최신 iOS 가 탑재된 아이폰의 경우 두 세트의 에어팟과 연결이 가능한데, `LE Audio` 어플리케이션을 이용해 이런 기능을 다양한 BLE 제품에 대해서도 활용할 수 있게 되지 않을까 싶다.

---

**Reference**

"블루투스 5.2 특징"

https://www.bluetooth.com/wp-content/uploads/2020/01/Bluetooth_5.2_Feature_Overview.pdf

https://www.novelbits.io/bluetooth-version-5-2-le-audio/

https://www.telink-semi.com/need-to-know-bluetooth-version-5-2/

"LE Audio 소개"

https://www.youtube.com/watch?v=KxI1-NdmHU8&t=225s

"무선 오디오 코덱 (Codec) 이란?"

https://m.blog.naver.com/zzoggopai/221791121828

https://m.blog.naver.com/koreasmp/221978250920