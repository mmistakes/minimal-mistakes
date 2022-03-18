nRF Connect SDK Tutorial - Part 0 | NCS v1.9.1

조만간 2.0.0이 나올것같은 불길한 기분...
일단 지금 Visual Studio Code (VS Code) 하고 연동해서 개발하는 기능도 어느정도 안정화된 것 같긴한데.

일단은 아래 링크의 tutorial 포스트를 보면서 따라해보자

https://devzone.nordicsemi.com/guides/nrf-connect-sdk-guides/b/getting-started/posts/nrf-connect-sdk-tutorial

일단 해당 링크는 NCS v.1.5.0 을 기준으로 설명하고 있고, nRF9160 DK 나 nRF5340 DK 를 가지고 개발하라고 하고 있음. 내가 주문한 nRF5340 DK 보드가 아직 오지 않았으니, 본인은 nRF52840 DK 로 tutorial 따라해보려고 한다.
(어차피 nRF52 시리즈도 개발 가능하니 상관 없겠지?)

<그림 - fig 1> : nRF Connect update

개발 환경 및 option

NCS v:
nRF Command Line tools v:
nRF connect v:
Toolchain Manager v: 0.10.3

windows 쓰는 경우에는 nRF Connect (for Desktop?) 프로그램 내의 Toolchain Manager를 이용해서 설치가 가능함. 아래 링크보면 매우 간단.

https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/gs_assistant.html#installing-the-ncs

본인은 오늘 날짜를 기준으로 최신 버전으로 업데이트해서 설치를 진행하였음. 참고로 nRF Command Line tools 도 설치는 되어있어야 한다.

<그림 - fig 2> : Toolchain 선택


설치누르며 이렇게 현재 base directory 알려주고 설치할거냐고 묻는데... 일단 본인은 컴맹이라 Continue... 눌러서 그냥 여기다가 설치해보겠음.


nRF5340-DK 보드가 하루만에 와서 이걸 쓰도록하고...

