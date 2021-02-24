---
title: "BLE (8) - Nordic BLE Chip 개발환경 구축하기"
categories:
  - BLE
tags:
  - nordic semiconductor
  - segger embedded studio
  - IDE
toc: true
toc_sticky: true
---

## 8. Nordic BLE Chip 개발환경 구축하기

`Nordic semiconductor` (이하 `Nordic`)사의 BLE chip 을 처음 개발할 당시만 해도, `Keil MDK Arm Compiler` 를 이용해 펌웨어를 개발했었는데 요새는 관련 홈페이지에서 `Segger Embedded Studio` 를 이용해 개발하는 것을 권장하고 있다. 

### 8.1 nRF5 SDK and SoftDevice 설치

본 포스트에서는 `nRF52840 BLE chip` 의 개발환경을 구축하는 방법에 대해 소개하며, `nRF52840-DK` 개발 보드에 있는 `nRF52840` 칩에 펌웨어를 업로드하는 방법을 먼저 소개한 뒤, 다른 custom 보드에 있는 `nRF52840` 칩에도 펌웨어를 업로드하는 방법을 소개할 예정이다.

먼저, `Nordic` 사 홈페이지(**[https://nordicsemi.com](https://nordicsemi.com)**)에 접속하면 아래 그림처럼 `Software and tools` 메뉴의 `Bluetooth Low Energy` 항목에서 `Nordic BLE chip` 을 개발할 수 있는 관련 소스를 다운받을 수 있다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-nordic-fig1.png" alt="">
  <figcaption>그림 출처: https://nordicsemi.com </figcaption>
</figure>

그림의 항목 중 `nRF5 SDK` 를 클릭한 뒤 다양한 버전의 `nRF5 SDK` 중 하나를 다운 받으면 되는데 현재 최신 버전은 `17.0.2` 버전이고, 이를 다운 받아서 진행해보도록 하자. 

`nRF52840` 칩에서 BLE 기능을 사용하기 위해서는 메인 프로그램과 `SoftDevice` 를 같이 업로드 해야한다. `SoftDevice`는 `Nordic` 사에서 표준 규격에 맞게 제작한 `BLE protocol stack`이라고 보면 된다. 
> `nRF5 SDK` 는 `SoftDevice` 를 가지고 펌웨어를 개발하기 위한 관련 라이브러리의 모음이라고 보면 되는데, `nRF5 SDK` 버전에 따라 호환되는 `SoftDevice`가 다르다. 최근에는 `nRF5 SDK` 에 호환되는 `SoftDevice` 파일이 포함되어 있다.

---

### 8.2 Segger Embedded Studio 설치

`Nordic` 칩 개발에 사용할 소프트웨어, `Segger Embedded Studio` (이하 `SES`)는 아래 링크에 접속해서 다운로드 하면 된다.

* [https://www.segger.com/downloads/embedded-studio](https://www.segger.com/downloads/embedded-studio)

`Embedded Studio for ARM` 항목에 있는 설치 파일 중 본인이 사용하는 OS 에 맞게 다운 받으면 된다. `Keil MDK` 컴파일러와는 달리 `SES`를 사용하는 경우 `Nordic` 칩을 개발하는데 별도의 라이센스가 필요하지 않다. 

> `Keil MDK` 컴파일러 또한 일정 수준까지는 무료로 사용 가능하지만, 펌웨어 프로그램 용량이 커지면 유료 라이센스를 구매해서 사용해야 한다. 특히, `Bluetooth Mesh` 관련 기능은 무료 라이센스로 개발이 불가능하다고 보면 된다.

`SES` 설치 파일을 다운로드 할 때 버전 선택을 할 수 있는데, 5.1 이상의 버전을 다운로드 할 경우 다음 **[링크](https://license.segger.com/Nordic.cgi)** 에서 라이센스를 따로 발급받아 추가해야 하니 참고하도록 하자 (물론 `Nordic` 개발 라이센스는 무료인 것으로 기억한다.)

---

### 8.3 SES 기본 설정

#### 8.3.1 패키지 설치

`SES` 설치 후 기본 패키지를 설치해주면, 곧바로 펌웨어 프로그래밍 및 업로드가 가능하다. `SES` 실행 후 상단의 메뉴에서
**`Tools -> Package Manager`** 를 클릭하면, 아래 그림과 같은 창이 뜨는 것을 볼 수 있다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-nordic-fig2.png" alt="">
</figure>

그림의 패키지 목록 중 다음의 두 가지를 설치해줘야 한다.

* CMSIS 5 CMSIS-CORE Support Packet
* CMSIS-CORE Support Package

각 패키지를 선택한 후 (Ctrl 버튼을 누른채로 선택하면 동시에 선택할 수 있다), 아래 `Next` 버튼을 눌러서 설치하면된다.

#### 8.3.2 SDK 프로젝트 실행하기

앞서 다운로드한 `SDK` 폴더에서 `example -> ble_peripheral` 폴더로 들어간 다음 가장 기본적인 예제 프로그램인 `ble_app_uart` 폴더로 들어가보자.

`nRF52840-DK` 보드를 사용하는 경우 `pca10056 -> s140 -> ses` 폴더로 들어가면, 아래 그림과 같이 `ble_app_uart_pca10056_s140` 이라는 이름의 EMPROJECT 파일이 있을 것이다. 이를 실행하면 `SES` 프로젝트가 실행된다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-nordic-fig3.png" alt="">
</figure>

* **`View -> Project Explorer`** : 프로젝트 구성 요소를 확인할 수 있는 탐색 창을 열 수 있다.

`nRF52840-DK` 보드와 PC 를 micro-USB to USB 케이블로 연결한 뒤, 보드에 있는 전원 스위치를 ON 으로 설정하자. 펌웨어는 `SES` 상단의 Build 메뉴에서 첫 번째 항목을 선택하거나 `F7` 버튼을 눌러서 업로드 파일을 Build 할 수 있고, `Build and Debug` 또는 `Build and Run` 버튼으로 `nRF52840-DK` 보드에 업로드 할 수 있다.

* 프로젝트 탐색 창에서 상단의 **`Project ble_app... `** 프로젝트 아이콘을 클릭 한 뒤, `SES` 메뉴의 **`Project -> Options`** 를 클릭해보자.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-nordic-fig4.png" alt="">
</figure>

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-nordic-fig5.png" alt="">
</figure>

위 그림에 표시한 부분이 `Release`로 설정되어 있는지 확인하고, 왼쪽 메뉴 중 `Debug -> Loader` 항목을 선택 시 나타나는 항목들 둥 `Additional Load File[0]` 라는 옵션 값이 `SoftDevice` 파일의 위치를 보여준다. (위 그림은 `SDK 15.3.0` 버전을 실행한 경우의 예시이다)

* **`Project -> Options`** / **`Common`** / **`Code -> Preprocessor`** 

User Include Directories 옵션 값에 현재 프로젝트에 포함된 라이브러리 코드 링크가 나와있다. 원래는 이 부분도 자신이 사용할 라이브러리를 추가했어야 했는데, `SES` 프로젝트는 기본적으로 모든 `SDK` 라이브러리를 포함하는 것 같다.

---

이전에도 소개했던 것 같은데.. 아래 링크에 들어가보면 `Nordic` 관련 튜토리얼 자료가 잘 정리되어있고, 여러 질문과 그에 대한 답변이 기재되어 있다. 

* **[https://devzone.nordicsemi.com/](https://devzone.nordicsemi.com/)**

해당 링크의 자료를 토대로 공부하면서 개발해도 기본적인 `BLE` 펌웨어 개발 및 테스트하는 데 충분할 것 같다.