---
title: "nRF5 SDK (10) - nrfjprog 명령어 활용 예시"
categories:
  - nRF5 SDK
tags:
  - nRF Command Line Tool
  - nrfjprog
toc: true
toc_sticky: true
---

# 10. nrfjprog 명령어 활용 예시 🍯

이번 포스트에서는 <span style="color:#50A0A0"><b>nRF Command Line Tool</b></span> 의 주요 명령어 활용 방법을 간단하게 정리해보려고 한다. 물론, **[이전 포스트](https://enidanny.github.io/nrf5%20sdk/nrf5sdk-nrfjprog/)** 에서 설명했듯이, 본 포스트에서 소개하는 `nrfjprog` 명령어에 대한 설명은 `nordic` 관련 홈페이지 혹은 매뉴얼 문서에 잘 정리되어있다.

* **[https://infocenter.nordicsemi.com/index.jsp?topic=%2Fug_nrf_cltools%2FUG%2Fcltools%2Fnrf_command_line_tools_lpage.html](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fug_nrf_cltools%2FUG%2Fcltools%2Fnrf_command_line_tools_lpage.html)**

## 10.1 메모리 초기화

* **명령어 예시**: nrfjprog --erase -f nrf52

`--erase` 명령어는 `nordic` 칩을 초기화 하기 위한 명령어로, 내부 flash 메모리에 저장된 정보를 모두 지우기 위해 사용된다고 보면 된다. 위 명령어를 사용하면 칩에 저장된 소스 코드 뿐 아니라 flash 메모리 영역도 모두 초기화 된다.

**NOTICE:** 위 명령어에서 `-f nrf52` 부분은 `--family nrf52` 의 약자로 <span style="color:#50A0A0"><b>nRF Command Line Tool</b></span> 을 이용해 제어하는 칩이 `nRF52 Series` 제품군임을 debugger 에 알려주는 부분이라고 보면 된다.
{: .notice}

---

## 10.2 소스코드 업로드 

* **명령어 예시**: nrfjprog -f nrf52 --program C:\path\filename.hex --verify

`--program` 은 소스 코드를 업로드하기 위해 사용하는 키워드이며, 프로그램이 최초로 업로드 될 때에는 (혹은 `--erase` 명령어로 내부 메모리가 완전히 초기화가 되었을 경우) 위 명령어 예시와 같이 입력할 경우 펌웨어 소스 코드를 업로드 수 있다 (위 예시에서 `filename.hex` 파일이 빌드 후에 생성된 소스 코드 파일명을 가리킨다). 

단, 일반적인 경우에는 현재 <span style="color:#50A0A0"><b>nRF Command Line Tool</b></span> 버전에서는 **nRF_Command_Line_Tools_v1.4** 문서에 기술되어있듯이, flash 메모리 영역이 비어있지 않은 경우 아래 명령어 예시 2 의  `--sectorerase` 같이 `--program` 키워드와 메모리 초기화 매개변수를 함께 사용해야 한다.

* **명령어 예시 2**: nrfjprog -f nrf52 --program C:\path\filename.hex --sectorerase --verify

메모리 초기화 매개변수로는 `--sectorerase`, `--chiperase`, `--sectoranduicrerase`, `--qspisectorerase`, `--qspichiperase` 정도가 있는데...📂 개인적으로 테스트 했을 때는 `--sectorerase` 매개변수를 이용해서 업로드를 할 경우에 flash 메모리 영역에 보관해놓은 데이터는 지워지지 않는 것을 확인했다 (~~경우에 따라서 아닐수도 있음.~~)

### 10.2.1 배치 파일 만들어 활용하기

이전 포스트에서 설명한 것처럼, `--program` 키워드를 이용하면 배치 파일 (`.bat`⚙️)을 생성해서 소스코드 파일을 쉽게 업로드 할 수 있다. 배치 파일은 다음의 코드와 같이 메모장 (`notepad`)에 `nrfjprog` 명령어를 입력한 뒤, 저장할때 `.txt` 대신 `.bat` 형식으로 저장하는 것만으로도 쉽게 생성할 수 있을 것이다.

```
nrfjprog -f nrf52 --program D:\nRF5_SDK_17.1.0_ddde560\examples\peripheral\gfx\pca10056\blank\ses\Output\Release\Exe\gfx_pca10056.hex --sectorerase --verify

nrfjprog -f nrf52 --reset
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig4.png" alt="">
</figure>

위의 코드는, **[이전 포스트](https://enidanny.github.io/nrf5%20sdk/nrf5sdk-ili9341-2/)** 에서 테스트 했던 `gfx` 예제의 소스 코드를 업로드하기 위한 배치 파일이다. 위와 같이 배치파일을 만든 후에, 이를 실행시켰을 때 정상적으로 프로그램이 업로드 되는 것을 확인하였다.

**NOTICE:** 또한, 위의 배치 파일 코드를 보면 알겠지만, `--program` 명령어로 소스 코드를 업로드한 이후에는 `--reset` 명령을 입력해줘야 업로드 한 펌웨어 프로그램이 정상 동작을 시작한다. 참고할 것 ❗
{: .notice--warning}

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig5.png" alt="">
</figure>