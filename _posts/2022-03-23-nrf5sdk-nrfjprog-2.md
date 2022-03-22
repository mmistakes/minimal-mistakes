<!--
🍯

### 9.3.1 메모리 초기화

▶ **명령어 예시**: `nrfjprog --erase -f nrf52`

`--erase` 명령어는 `nordic` 칩을 초기화 하기 위한 명령어로, 내부 flash 메모리에 저장된 정보를 모두 지우기 위해 사용된다고 보면 된다. 위 명령어를 사용하면 칩에 저장된 소스 코드 뿐 아니라 flash 메모리 영역도 모두 초기화 된다.

>위 명령어에서 `-f nrf52` 부분은 `--family nrf52` 의 약자로 nRF Tool Command Line 을 이용해 제어하는 칩이 nRF52 Series 제품군임을 debugger 에 알려주는 부분이라고 보면 된다.

---

### 9.3.2 소스코드 업로드 

▶ **명령어 예시**: `nrfjprog -f nrf52 --program C:\path\filename.hex --verify`

`--program` 은 소스 코드를 업로드하기 위해 사용하는 키워드이며, 프로그램이 최초로 업로드 될 때에는 (혹은 `--erase` 명령어로 내부 메모리가 초기화가 되었을 경우) 위 명령어 예시와 같은 형태로 사용할 수 있다(위 예시에서 `filename.hex` 파일이 빌드 후에 생성된 소스 코드 파일명이다). 

단, 일반적인 경우에는 현재 nRF Command Line Tool 버전에서는 (**nRF_Command_Line_Tools_v1.4** 기준)에 기술되어있듯이, flash 메모리 영역이 비어있지 않은 경우에는 아래 명령어 예시2 의  `--sectorerase` 키워드 같이 메모리 초기화 매개변수를 함께 사용되어야 한다.

▶ **명령어 예시**: `nrfjprog -f nrf52 --program C:\path\filename.hex --sectorerase --verify`

메모리 초기화 매개변수로 `--sectorerase`, `--chiperase`, `--sectoranduicrerase`, `--qspisectorerase`, `--qspichiperase` 정도가 있는데... 일단 개인적으로 테스트 했을 때는 `--sectorerase` 매개변수를 이용해서 업로드를 할 경우에 flash 메모리 영역의 데이터는 지워지지 않는 것을 확인했다 (~~경우에 따라서 아닐수도 있음.~~)

앞어 이야기했듯이, `--program` 키워드를 이용하면 배치 파일 (`.bat`)을 생성해서 소스코드 파일을 쉽게 업로드 할 수 있다. 배치 파일은 다음의 코드와 같이 메모장 (`notepad`)에 nrfjprog 명령어를 입력한 뒤, 저장할때 `.txt` 대신 `.bat` 형식으로 저장하는 것만으로도 쉽게 생성할 수 있을 것이다.

```
nrfjprog -f nrf52 --program D:\nRF5_SDK_17.1.0_ddde560\examples\peripheral\gfx\pca10056\blank\ses\Output\Release\Exe\gfx_pca10056.hex --sectorerase --verify

nrfjprog -f nrf52 --reset
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig4.png" alt="">
</figure>

위의 코드는, [이전 포스트]()에서 테스트 했던 `gfx` 예제의 소스 코드를 업로드하기 위한 실제 배치 파일의 예시이다. 위와 같이 배치파일을 만든 후에, 이를 실행시켰을 때 정상적으로 프로그램이 업로드 되는 것을 확인하였다.

> 위의 코드를 보면 알겠지만, `--program` 이후에는 `--reset` 명령어를 입력해야 업로드 된 프로그램이 정상적으로 실행된다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig5.png" alt="">
</figure>
-->