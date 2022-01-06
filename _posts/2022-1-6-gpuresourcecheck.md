---
layout: single
title: GPU 사용량 확인
categories: 딥러닝환경설정
tag: deeplearning, linux, gpu
typora-root-url: ../
---

# GPU 사용량 확인



Window 환경에서는 작업관리자-성능-GPU를 보면 실시간 사용량을 확인을 합니다.



하지만 linux 그 중에서 ubuntu에서는 터미널에서 command를 입력해서 확인이 가능합니다.

### 첫번째 방법

<pre><code>
	nvidia-smi -l 5
</code></pre>

![post2](/images/2022-1-6-gpuresourcecheck/post2.PNG)

-| 뒤에 있는 숫자만큼 초단위로 상태를 갱신합니다.



하지만 이러한 방법을 사용할 경우 log가 계속 쌓이게 되는데 이에 따른 장점도 있지만 이러한 부분이 불편하게 느껴질 때가 있습니다. 



### 두번째 방법

위에 언급한 불편함을 피하기 위한 방법으로 gpustat가 있습니다.

<pre><code>
    #설치
    pip install gpustat
    #실행
    gpustat -i
</code></pre>

![post1](/images/2022-1-6-gpuresourcecheck/post1.PNG)