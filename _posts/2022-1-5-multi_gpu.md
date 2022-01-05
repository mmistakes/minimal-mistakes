---
layout: single
title: 멀티 GPU
categories: 딥러닝환경설정
tag: pytorch, deeplearning, linux, gpu
typora-root-url: ../
---



# 멀티 gpu 사용설정

상황마다 다르겠지만 여러개의 GPU를 갖고있고 각각의 GPU마다 다른 학습을 수행시키고자 하는 경우 몇가지 입력을 해주어야 한다. 

먼저 터미널에서 nvidia-smi 입력하여 현재 gpu가 잘 인식이 되고있는지 확인한다.

<img src="/images/2022-1-5-multi_gpu/post1.PNG" alt="post1" style="zoom:150%;" />

필자의 경우에는 0,1 두개의 gpu가 인식이 되고있음을 알 수 있다. (학습을 돌리는중이라 사용량이 크게 나오는중이다.)



이러한 경우 해야하는 작업이 두가지일때 하나는 0번 gpu로 하나는 1번 gpu로 동작을 시키는 방법은 약간의 command를 추가해주면된다. 



기존의 학습 수행  command가 python train.py 라면 

--------------------------------

0번 gpu를 사용할 경우 

<pre><code>
CUDA_VISIBLE_DEVICES=0 python train.py
</code></pre>
------------------------------------

1번 gpu를 사용할 경우

<pre><code>
CUDA_VISIBLE_DEVICES=1 python train.py
</code></pre>
--------------------------

100번 gpu를 사용할 경우

<pre><code>
CUDA_VISIBLE_DEVICES=100 python train.py
</code></pre>
-----------------------------------------------

이런식으로 CUDA_VISIBLE_DEVICES 뒤에 원하는 gpu number를 입력해주면된다.

필자는 0번을 사용했고 

![post2](/images/2022-1-5-multi_gpu/post2.PNG)

잘동작한다는 것을 확인 할 수 있다.

![post3](/images/2022-1-5-multi_gpu/post3.PNG)