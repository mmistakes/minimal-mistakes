---
title: "nRF5 SDK (9) - nRF Command Line Tool 소개 및 설치방법"
categories:
  - nRF5 SDK
tags:
  - nRF Command Line Tool
  - nrfjprog
toc: true
toc_sticky: true
---

# 9. nRF Command Line Tool 소개 및 설치방법

## 9.1 Intro.

**nRF Command Line Tool** 은 **`nordic`** 사 제품을 개발하고 디버깅하는데 활용되는 소프트웨어로, 처음에 개발환경 셋팅하다보면 같이 설치하게 될 것이다. 초기에 `Keil` 컴파일러 이용해서 개발을 할 당시만해도 softDevice 파일을 업로드하거나 내부 메모리를 초기화 시킬 때는 nRF Command Line Tool 을 이용하기 위해 `nrfjprog` 명령어를 일부 사용했는데, `SEGGER Embedded Studio` 로 개발 플랫폼을 옮긴 뒤부터는 거의 직접적으로는 사용하지 않는 것 같다.

그럼에도 nRF Command Line Tool 이 유용하다고 생각될 때가 있는데.. 아래 링크에서 볼 수 있듯이 nRF Command Line Tool 을 이용하면 빌드 후에 생성된 최종 소스코드 파일 (예: `.hex` 파일)을 업로드할 수 있는 배치 파일 (`.bat`)을 생성할 수 있다.

* **[https://m.blog.naver.com/chandong83/221771456844](https://m.blog.naver.com/chandong83/221771456844)**

물론 주로 혼자 펌웨어를 개발하고 테스트한다면 굳이 배치 파일을 만들어서 `nrfjprog` 명령어로 소스코드를 업로드할 필요가 없지만, 본인이 생성해놓은 소스코드를 다른 누군가가 다른 PC 에서 업로드해야하는 경우에 nRF Command Line Tool 하고 SEGGER J-Link 디버거만 있으면 쉽게 소스코드를 업로드 할 수 있기 때문에 꽤 유용하다고 볼 수 있다.

>참고로 `nRF52-DK` 나 `nRF52804-DK` 등의 개발보드에도 디버거가 있어서 이를 이용해 다른 `nordic` chip 에 프로그램을 업로드할 수 있다.

---

## 9.2 Deveopment Environment

nRF Command Line Tool (이하 **`nRF Tool`**) 설치 파일은 아래 링크에서 다운 받을 수 있다. 사용중인 운영체제 (OS)에 맞는 설치파일을 다운받은 뒤 실행하면 된다.

* **[https://www.nordicsemi.com/Products/Development-tools/nRF-Command-Line-Tools/Download?lang=en#infotabs](https://www.nordicsemi.com/Products/Development-tools/nRF-Command-Line-Tools/Download?lang=en#infotabs)**


만약 위의 링크에 정상적으로 접속이되지 않을 경우, `nordic` **[메인 홈페이지](https://nordicsemi.com)** 상단의 Products 메뉴에서 Bluetooth Low Energy Development software 혹은 tools 메뉴를 보면 설치 파일을 찾을 수 있을 것이다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig1.png" alt="">
</figure>

Windows OS 기준으로는 설치 후 명령어 창을 실행 후 (`시작 (윈도우) 버튼 + R > cmd 입력`), `nrjprog` 라고 입력했을 때 아래 그림과 같이 관련 명령어가 나타난다면 정상적으로 nRF Tool 이 설치된 것이다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig2.png" alt="">
</figure>

nRF Tool 을 설치하다보면 SEGGER J-Link 도 함께 설치될텐데 (~~아닐수도 있음~~), 설치 팝업이 뜨면 기본 설정 (default)으로 설치하면된다. 본 포스트를 작성하면서 테스트한 PC 의 프로그램 버전은 다음과 같다.

* `nRF Command Line Tool` version: 10.15.2 external
* `JLinkARM.dll` version: 7.58b

---

## 9.3 nrfjprog 명령어 (Honey Tip)

`nrfjprog` 명령어는 shorthand form 과 normal form 으로 구분된다. 아래 그림은 각각의 form 으로  현재 PC 에 연결된 debugger (해당 그림에서는 nRF52840-DK 보드의 debugger)의 시리얼 번호를 출력하는 명령어를 사용한 예를 보여준다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig3.png" alt="">
</figure>

그림에서 `--ids` 가 normal form, `-i` 가 shorthand form 이라고 보면 된다. 위의 **9.2** 항목에 있는 그림에서 볼 수 있듯이, 명령어 (cmd) 창에 `nrfjprog` 를 입력해보면 nRF Command Line Tool 에서 사용가능한 명령어 형식과 해당 명령어에 대한 설명들을 볼 수 있다. 또한, 보다 자세한 내용은 아래 링크에서 확인할 수 있을 것이다.

* **[https://infocenter.nordicsemi.com/index.jsp?topic=%2Fug_nrf_cltools%2FUG%2Fcltools%2Fnrf_command_line_tools_lpage.html](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fug_nrf_cltools%2FUG%2Fcltools%2Fnrf_command_line_tools_lpage.html)**

>위 링크의 명령어들 중 실제로 자주 사용할만한 명령어 및 실제 사용 예시에 대해서는 다음 포스트에 이어서 설명할 예정이다.