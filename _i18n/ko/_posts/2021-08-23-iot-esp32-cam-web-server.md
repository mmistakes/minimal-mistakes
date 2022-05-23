---
title: "IoT (6) - ESP32-CAM 비디오 스트리밍 웹서버 만들기"
categories:
  - IoT
tags:
  - ESP32-CAM
  - AI Thinker
  - CCTV
toc: true
toc_sticky: true
---

# 6. ESP32-CAM 비디오 스트리밍 웹서버 (가정용 CCTV) 만들기 (ESP32-CAM Video Streaming Web Server with Error Solved!!)

지금 살고 있는 원룸에서 <span style="color:#e06000"><b>햄스터</b></span>를 한 마리 키우고 있는데, 집을 장기간 비울 때면 요녀석이 은근 신경쓰인다..🧐 그래서 저렴하게 구현 가능한 비디오 스트리밍 (Video Streaming) 웹 서버를 검색하던 중 ESP32-CAM 보드에 대해 알게 되어서 곧바로 **[디바이스 마트](https://www.devicemart.co.kr/goods/view?no=12496229)** 에서 구매했다. (*현재 부가세 포함 8,800 원 !!*)

## 6.1 준비물 (Setup)

**Reference Link:** https://randomnerdtutorials.com/esp32-cam-video-streaming-web-server-camera-home-assistant/
{: .notice--info}

**Hardware**
* `ESP32-CAM`
* `FTDI programmer`

아래 그림에서 볼 수 있듯이, ESP32-CAM 보드에는 별도의 USB 커넥터가 없다. 따라서 USB-to-TTL 컨버터가 필요한데, 참조한 링크에서 FTDI 프로그래머를 권장하고 있어서 본인의 경우 "FT232RL" 프로그래머를 이용했다.

<figure style="width: 90%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/iot-esp32-fig1.png" alt="">
</figure>

라이브러리 설치 방법과 관련 소스 코드는 모두 위의 참고 링크 사이트에 들어가면 확인할 수 있으니, 해당 페이지를 확인하도록 하자. 참고로 이 예제 코드가 정상적으로 작동하려면 <span style="color:#056070"><b>아두이노 IDE</b></span> 버전이 <span style="color:#e50000"><b>1.8.12</b></span> 이상이 되어야 하는 것 같다. (**주의할 것!!**)

**Software**
* `Arduino IDE (1.8.12~)`

---

## 6.2 ESP32-CAM 프로그램 올리기 (Upload)

프로그램 올리는 전반적인 과정은 아래 영상에도 본인이 정리해두었다.

{% include youtubeplayer.html id="oXG6WJnzpsg" %}

---

## 6.3 기타 참고 사항

ESP32-CAM 관련 영상이나 자료는 꽤 있는데.. 그럼에도 본인이 다시 글과 영상으로 남기는 이유는 프로그램을 업로드하는 과정에서 꽤나 삽질을 많이 했는데, 이 부분에 있어서 관련 정보가 부족했어서 이를 공유하려고 한다.

### 6.3.1 프로그램 업로드 순서 (Upload sequence)

ESP32-CAM 보드에 업로드 하는 순서는 다음과 같다.

1. ESP32-CAM 보드와 FTDI 프로그래머 연결 (**[관련 링크](https://randomnerdtutorials.com/esp32-cam-video-streaming-web-server-camera-home-assistant/)** Schematic diagram 참조)
2. ESP32-CAM 보드의 IO0, GND 연결
3. 소스 코드 복사 후 프로그램 업로드 (Ctrl + U)
4. 아두이도 IDE 아래쪽 터미널에 Connecting ... 이란 문구 뜨면 ESP32-CAM 보드 RST 버튼 클릭
5. 업로드 시작
6. 업로드 완료 후 IO0, GND 연결 선 제거
7. ESP32-CAM 보드 RST 버튼 클릭 (프로그램 시작)

>위의 순서 중 회로 구성에 따라 4번 과정은 생략되기도 하는 것 같다.

>ESP32-CAM 보드의 IO0 핀을 GND 에 연결하는 것은 ESP32-CAM 보드를 일종의 "프로그램 업로드 모드" 로 전환하기 위함이다. 따라서 프로그램 업로드 이후 정상적으로 해당 프로그램을 실행시키기 위해서는 IO0 핀과 GND 를 분리해줘야 한다.

---

### 6.3.2 Solving Failed to connect to ESP32: Timed out waiting for packet header Error

본인이 처음 프로그램을 업로드 할 때는, 위의 6.3.1 의 프로그램 업로드 순서의 4번 단계에서 RST 버튼을 눌러도 아무런 반응이 없었는데, 이때 아두이노 초기 업로드(?) 조건은 다음과 같았다.

* Board: "AI Thinker ESP32-CAM"
* CPU Frequency: "240MHz (WiFi/BT)"
* Flash Frequency: "80MHz"
* Flash Mode: "QIO"

"Failed to connect ..." 에러에 대한 각종 링크를 참조해도 프로그램이 정상적으로 업로드 되지 않았는데, 최종적으로는 본인의 경우 아두이노 업로드 조건을 다음과 같이 설정하는 것으로 본 문제가 해결되었다.

* Board: "AI Thinker ESP32-CAM"
* **CPU Frequency:** "80MHz (WiFi/BT)"
* **Flash Frequency:** "40MHz"
* **Flash Mode:** "DIO"

CPU 주파수 값은 "(WiFi/BT)" 표시가 되어있는 값 중 가장 낮은 값인 80MHz 로 설정하였고 (*아마도 무선 통신 기능을 활성화할 수 있는 최저 CPU 주파수가 80MHz 인 듯 하다.*), Flash 주파수 값도 40MHz 로 낮췄다. Flash Mode 는 기존의 QIO 에서 DIO 로 설정해주었다.

> 본인의 경우 일단 이렇게 했을 때 프로그램 업로드 단계에서 RST 버튼 눌렀을 때 정상적으로 프로그램이 업로드 되었는데, 이상한 점은 이후에는 초기 설정값을 그대로 사용해도 프로그램이 정상적으로 업로드가 되었다.

<figure style="width: 90%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/iot-esp32-fig2.png" alt="">
</figure>

위 그림은 본인이 갖고 있는 ESP32-CAM 보드로 촬영한 영상을 캡쳐한 그림이다. (햄스터 목욕 모래장에서 수면중...) (ESP32-CAM 보드에 연결된 `OV2640` 카메라 모듈 자체가 망가진건지 흑백으로 촬영됨...😒)

---

### 6.3.3 외부 IP 에서 ESP32-CAM 웹서버에 접속하기

본 예제 프로그램을 업로드하고 나면 **192.168.X.X** 형태의 로컬 IP 주소를 할당 받는데, 실내 에서 같은 공유기에 연결되어 있는 경우에는 해당 주소에 접속해 ESP32-CAM 의 영상을 볼 수 있지만, 외부에서는 접근할 수가 없다.

포트포워딩 기능을 이용하면 외부에서도 확인할 수 있는데, 특히 ipTime 공유기를 사용중이라면 ipTime 에서 제공하는 무료 도메인 기능과 포트포워딩을 이용해서 외부에서도 쉽게 ESP32-CAM 보드에 할당된 로컬 IP 에 접근할 수 있다.

공유기 설정 관련해서는 아래 링크에 매우 친절하게 설명이 되어있다.

* [https://micropilot.tistory.com/2949](https://micropilot.tistory.com/2949)

**주의:** 포트포워딩을 이용하는 방법은 어떻게 보면 외부에서 공유기를 통해 로컬 디바이스로 접속하는 루트를 뚫어놓는 것이기 때문에 랜섬웨어나 바이러스 침입 등에 취약할 수 있다. 정말 필요한 경우가 아니라면 굳이 사용하지 않을 것을 권장하며, 만약 사용할 경우 통상적으로 사용되지 않는 숫자를 이용해 외부 포트와 내부 포트 번호를 설정해야한다. (원격 데스크톱 에서 통상적으로 쓰이는 포트 번호를 그대로 사용했다가는 한순간에 컴퓨터 먹통될 수도 있다)
{: .notice--danger}


