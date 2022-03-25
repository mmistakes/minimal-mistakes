---
title: "nRF5 SDK (11) - nrfjprog 명령어 활용 예시 (2) - 메모리 참조"
categories:
  - nRF5 SDK
tags:
  - nRF Command Line Tool
  - nrfjprog
  - memrd
toc: true
toc_sticky: true
---

# 11. nrfjprog 명령어 활용 예시 (2) - 메모리 참조 🌟

`nrfjprog` 명령어 중 `--memrd` 를 이용하면 <span style="color:#50A0A0"><b>nRF Command Line Tool</b></span> 을 이용해 `nordic` chip 내부에의 flash 메모리 데이터를 읽을 수 있다. 구체적인 명령어 사용 예시에 대해 설명하기에 앞서, 이를 활용하려면 기본적으로 본인이 사용하는 `nordic` chip 의 flash 메모리가 어떤 식으로 구성되는지 확인해야 한다.

`nordic` chip 메모리에 대한 정보는 제품 datasheet 를 확인하거나, **[https://infocenter.nordicsemi.com/index.jsp](https://infocenter.nordicsemi.com/index.jsp)** 링크에 접속해서 본인이 사용하는 칩에 대한 메모리 정보를 확인해보면 된다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig6.png" alt="">
</figure>

## 11.1 nRF52840 memory structure

`nRF52` Series BLE chip 중에서 `nRF52840` chip 의 경우 아래의 그림과 같이 내부 메모리 영역이 나눠져 있는 것을 볼 수 있다.

<figure style="width: 90%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig7.png" alt="">
  <figcaption> 출처: https://infocenter.nordicsemi.com/topic/ps_nrf52840/memory.html?cp=4_0_0_3_1 </figcaption>
</figure>

위 그림을 보면 flash 메모리 (`Code`)과 메모리 주소 영역이, 메모리 내 제일 낮은 주소 (`0x0000_0000`) 에 할당되어 있는 것을 볼 수 있을 것이다. 내부 flash 메모리는 `4 bytes` 단위로 구성이 되어있으며, flash 메모리에 정보를 저장 (`write`)할 때는 `page` 단위로 초기화를 시킨 뒤에 접근해야한다. 여기서의 `page` 는 `4KB` 단위로 구분이 되어있으며, `nRF52840` chip 의 flash 메모리는 총 256 개의 `page` 로 구성되어 있다 (0 ~ 255 page, 256 * 4 KB = 1024 KB = 1MB)

<figure style="width: 95%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig9.png" alt="">
  <figcaption> 출처: https://infocenter.nordicsemi.com/topic/ps_nrf52840/memory.html?cp=4_0_0_3_1 </figcaption>
</figure>

위의 그림을 보면 각각의 페이지 주소가 `0x0000_1000` 단위로 구분되어 있는 것을 볼 수 있는데, 각 주소값은 및 메모리 영역은 `4 bytes` 단위로 정렬이 되어있다. (`예: 0x0000_0000, 0x0000_0004, ...., 0x0000_0FFC, 0x0000_1000`). 결과적으로는 하나의 `page` 는 `0x0000_1000 = 4096 bytes = 4kB` 의 크기를 갖는다.

---

## 11.2 memrd 명령어를 이용한 메모리 참조

<span style="color:#50A0A0"><b>nRF Command Line Tool</b></span> 매뉴얼을 보면 메모리 참조를 위한 명령어 포맷은 다음과 같이 정의되어 있는 것을 볼 수 있다.

* `nrfjprog --memrd <addr> [--w <width>] [--n <n>]`

여기서 `<addr>` 까지가 기본 명령어 형태이고 그 뒤에 대괄호 (`[,]`)로 명시된 부분은 세부 옵션이라고 보면 된다. 이제부터 `--memrd` 명령어를 이용해서 flash 메모리 데이터를 읽어볼텐데, 아래 그림은 `0` 부터 `255 page` 중 `1 page` 의 데이터를 읽어온 예를 보여준다.

<figure style="width: 90%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig10.png" alt="">
</figure>

현재 사용중인 BLE chip 이 `nRF52` 제품군이므로 `-f nrf52` 매개변수를 함께 입력해주었고, 테스트한 chip 에는 **[이전 포스트](https://enidanny.github.io/nrf5%20sdk/nrf5sdk-ili9341-2/)** 에서 `gfx` 예제를 테스트할 때 사용했던 소스 코드가 업로드 되어있다. 앞서 언급했듯이, flash 메모리는 `4KB` 단위의 `page` 로 구분되어 있으므로, `1 page` 의 주소는 `1 * 4096 (bytes) = 4096` 의 값을 갖는다.

### 11.2.1 memrd width, length 매개변수 활용

* **width**

`--memrd` 명령어와 함께 `--w` 매개변수를 사용하면, 입력한 주소의 데이터를 얼마나 읽어올 지 지정할 수 있다. 아래 그림에서 볼 수 있는 것처럼 `--w` 값으로는 `8, 16, 32` 등을 입력할 수 있으며, 이는 참조할 메모리 `bits` 수를 가리킨다. 즉, `1, 2, 4 bytes` 단위로 값을 읽을 수 있으며, `width` 값을 별도 입력하지 않는 경우에는 `4 bytes (32 bits)` 가 기본 참조 단위인 것을 알 수 있다.

<figure style="width: 90%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig11.png" alt="">
</figure>

* **length**

`--n` 매개변수는 `--memrd` 명령으로 지정한 주소를 기준으로 몇 `bytes` 를 읽을 것인지를 지정해주는 값이다. `width` 변수의 값은 `bits` 단위로 값을 입력하기 때문에 `8, 16, 32` 를 입력할 수 있었는데, `length` 를 지정해주는 `--n` 의 값은 `bytes` 단위로 입력해줘야 하므로 혼동하지 않도록 주의할 것.

또한, 참조하는 `bytes` 길이는 `width` 의 길이와 매칭이 되어야 한다.

**Ex 1:** `nrfjprog -f nrf52 --memrd 4096 --w 8 --n 1` (⭕)
{: .notice--info}

**Ex 2:** `nrfjprog -f nrf52 --memrd 4096 --w 32 --n 4` (⭕)
{: .notice--info}

**Ex 3:** `nrfjprog -f nrf52 --memrd 4096 --w 8 --n 4` (⭕)
{: .notice--info}

**Ex 4:** `nrfjprog -f nrf52 --memrd 4096 --w 16 --n 1` (❌)
{: .notice--info}

위 **Ex 3** 의 예시 처럼 `8 bits (1 byte)` 단위로 `4 bytes` 데이터를 읽어오는 것은 문제가 되지 않지만, **Ex 4** 처럼 `16 bits (2 bytes)` 단위로 `1 bytes` 데이터를 읽는 것은 단위가 맞지 않는다. 또한, 아래의 그림에서 볼 수 있듯이 `1 or 2 bytes` 단위로 데이터를 읽어보면, 하위 비트 (LSB)의 데이터 부터 참조해서 읽는 것을 볼 수 있다.

>이 부분은 직접 테스트해보면서 이해하는 게 좋을 듯 하다

<figure style="width: 90%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig12.png" alt="">
</figure>

위 그림을 보면 **동일한 주소** 에서 **동일한 길이** 의 데이터를 `width` 값을 다르게 해서 참조했을 때 어떤 순서로 출력되는지를 확인할 수 있다.

---

## 11.3 비어있는 flash memory 찾기

`SEGGER Embedded Studio` 를 이용해 소스 코드를 빌드 (`build`)하는 경우, 빌드 완료 후 페이지 하단에 flash 메모리와 ram 에 할당된 메모리 용량이 표시되는 것을 볼 수 있다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig13.png" alt="">
</figure>

**[이전 포스트](https://enidanny.github.io/nrf5%20sdk/nrf5sdk-ili9341-2/)** 에서 테스트할 때 사용했던 사진 파일의의 크기는 120*160 이었고, 각 pixel 은 `16 bits` **565RGB** 포맷으로 변환했기 때문에 위 그림이 `FLASH1 = 64.6KB` 메모리 중, `120*160*2 = 38.4 KB` 는 예제에 사용된 이미지 변환 파일에 할당된 용량이다.

위 그림의 flash 메모리 용량을 `page` 단위인 `4KB` 로 나누면 `16.15` 이므로, 위 예제의 펌웨어에서 사용되는 flash 메모리는 `0 ~ 15 page`이면 좋겠지만... <span style="color:#A02020"><b>아쉽게도 그렇진 않다</b></span>**.**

<figure style="width: 90%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig14.png" alt="">
</figure>

위 그림에서 볼 수 있듯이 `16 page` (`address = 16*4096 = 65536`) 의 값을 참조해보면, 메모리를 차지하고 있는 데이터가 있는 것을 볼 수 있다. 그래도 이제는 소스 코드를 빌드하는 툴이 잘 발되었기 때문에 예전과 비교하면 최적화가 잘 되었다고 볼 수 있을 것 같다.

참고로 💡 flash 메모리의 초기 값은 `-1 (0xFFFF_FFFF)` 이므로, 위의 그림에서처럼 `page` 단위로 읽어보면, 해당 `page` 가 사용되었는지 아닌지 확인할 수 있을 것이다. 

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig15.png" alt="">
</figure>

<figure style="width: 80%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-nrfjprog-fig16.png" alt="">
</figure>

위 그림을 보면, 이전 `gfx` 예제 코드와 비교해보니 이미지 변환 파일에 해당하는 코드는 `8 page` 의 메모리 영역 중 `0x0000_6A14` 번지의 상위 `16 bits` (MSB) 부터 저장되는 것을 확인하였다. (~~심심해서 한 번 확인해봤음 😪~~). 이것으로 이번 개발일지는 마무리.
