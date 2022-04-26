---
title: "nRF5 SDK (12) - nRF Sniffer 셋팅 방법"
categories:
  - nRF5 SDK
tags:
  - nRF Sniffer
  - Wireshark
toc: true
toc_sticky: true
---

# 12. nRF Sniffer 셋팅 방법

`nRF Sniffer (for Bluetooth LE)` 무선으로 송수신 되는 패킷 데이터를 낚아채기 위해 사용하는 장치이다. 이는 특별한 하드웨어 없이 `nordic` 평가기판 (`e.g. nRF52-DK`)에 `nRF Sniffer` 프로그램을 업로드하는 것으로 사용할 수 있다. 이번 포스트에서는 설치 과정에 대해 간략하게만 적어둘 예정이며, 자세한 내용은 **[https://infocenter.nordicsemi.com/index.jsp](https://infocenter.nordicsemi.com/index.jsp)** 링크에 접속한 뒤에 **nRF Tools** 메뉴의 **nRF Sniffer for Bluetooth LE** 섹션을 참고하면 된다.

## 12.1 nRF Sniffer 프로그램 다운로드

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-sniffer-fig1.png" alt="">
</figure>

`Installing the nRF Sniffer` 메뉴를 선택하면 위 그림에서 볼 수 있는 것처럼 nRF Sniffer 를 다운로드 할 수 있는 링크를 확인할 수 있다. 현재는 해당 **[링크](https://www.nordicsemi.com/Products/Development-tools/nrf-sniffer-for-bluetooth-le/download#infotabs)** 에서 **`v4.x`** 버전의 Sniffer 를 제공하고 있다. 해당 파일을 다운로드 한 뒤에 압축을 풀면 아래 그림같은 폴더와 파일이 있을 것이다.

<figure style="width: 80%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-sniffer-fig2.png" alt="">
</figure>

위 그림의 폴더에서 **`hex`** 폴더에 들어가보면 `nRF Sniffer` 프로그램이 있는데, 아래 그림을 참고해서 본인이 사용하는 하드웨어에 맞는 프로그램을 업로드하면 된다. 

<figure style="width: 85%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-sniffer-fig3.png" alt="">
</figure>

프로그램을 업로드할 때는 지난 포스트에서 다뤘던 `nRF Command Line Tool` 을 사용하거나, `nRFgo, nRF Connect, .etc` 등의 프로그램을 사용하면 된다.

>본인은 `nRF52840-DK` 를 가지고 테스트를 진행할 예정이므로, `nRF Command Line Tool` 을 이용해 다음과 같이 프로그램을 업로드 하였음.

<figure style="width: 80%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-sniffer-fig4.png" alt="">
</figure>

---

# 12.2 nRF Sniffer 캡쳐도구 설치

`nRF Sniffer` 는 업로드한 소스 코드와 함께 연동할 캡쳐도구 프로그램이 필요한데, `nordic` 에서는 `Wireshark` 라는 프로그램을 캡쳐도구로 사용한다. 먼저, `Wireshark` 와 `nRF Sniffer` 를 연동하기 전에 **`extcap`** 폴더에 들어가서 `python` 명령어를 이용해 필요한 모듈을 설치해줘야 한다. `nRF Sniffer` 에서 필요한 모듈은 `requirements.txt` 파일에 기록되어 있으므로, `pip` 명령어를 이용해서 설치하기만 하면 된다.

>**python -m pip intstall -r requirements.txt**

필요한 모듈이 다 설치되었으면, `Wireshark` 를 다운로드 받은 후 실행시키면 된다. 참고로 현재 권장되는 `Wireshark` 버전은 `v3.4.7` 이상이고, 필요한 모듈을 설치하기 위해서는 `v3.6` 버전 이상의 `Python` 이 설치되어 있어야 한다. 본인은 현재 최신 버전인 `Wireshark v3.6.3` 을 설치하였음. (~~설치할 때 옵션은 그냥 기본으로 했음~~)

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-sniffer-fig5.png" alt="">
</figure>

`Wireshark` 실행 후 상단 메뉴의 `Help > About Wireshark` 클릭. Folders 메뉴에서 `Personal Extcap path` 경로를 클릭하면 해당 폴더가 열리는데 (처음 설치한 경우 해당 폴더를 생성하시겠습니까 라는 메시지가 뜰 것), 해당 폴더 안에 앞서 다운받은 `Sniffer` 파일의 `extcap` 폴더 안에 있는 파일들을 붙여넣기 해준다.

<figure style="width: 85%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-sniffer-fig6.png" alt="">
</figure>

이어서 해당 명령어 프롬프트 창을 실행시킨 뒤, 위 폴더의 경로로 이동해서 다음의 명령어를 입력해주면 기본적인 셋팅이 마무리된다.

* **nrf_sniffer_ble.bat --extcap-interfaces**

아래 그림과 같이 별다른 경고 문구 없이 로그가 기록된 경우 정상적으로 연동이 되었다고 보면 된다.

<figure style="width: 85%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-sniffer-fig7.png" alt="">
</figure>

---

# 12.3 nRF Sniffer 연동 예시

`nRF Sniffer` 연동 이후 `Wireshark` 프로그램을 다시 실행하거나, `F5` 누르는 경우 아래 그림과 같이 연동된 `Sniffer` 포트가 보이는 것을 확인할 수 있다. 해당 포트를 선택한 뒤 왼쪽 상단에 있는 파란색 아이콘을 클릭해주면, 주변에 있는 무선 신호를 수신할 수 있다.

<figure style="width: 85%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-sniffer-fig8.png" alt="">
</figure>

* 예시:

<figure style="width: 85%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-sniffer-fig9.png" alt="">
</figure>

>무선 채널 정보, 송신 주기, 상세 패킷 데이터, Mac Address 등 다양한 정보들을 확인할 수 있으며, 암호화 되어있지 않을 경우 일대일로 연결되어 주고받는 데이터도 중간에서 캡쳐해서 확인할 수 있다.