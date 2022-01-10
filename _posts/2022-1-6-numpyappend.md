---
layout: single
title: numpy append error
categories: numpy 라이브러리쿡북 error
tag: deeplearning numpy error
typora-root-url: ../
---

 AttributeError: 'numpy.ndarray' object has no attribute 'append'

numpy array에 새로운 원소를 append 해줄때 볼 수 있는 error이다.

이러한 error를 보게된 이유는 예상컨데 list의 append와 헷갈렸다고 볼 수 있다.



-----------------------

# list append

list append와 numpy append는 약간 차이가 있다.

<pre>
    <code>
    a_list = [1,2,3]
    a_list.append(5)
    print(a_list)
    #[1,2,3,5]
    </code>
</pre>
------------------------

# numpy append

<pre><code>
import numpy as np

    a_np = np.array([1,2,3])
    a_np = np.append(a_np, np.array([5]))
    #array([1,2,3,5])
    </code></pre>
list의 경우 (original_list).append(추가해줄원소) 를 하면 되지만 numpy는 np.append(original_list, 추가해줄원소) 이렇게 입력해주어야 작동한다. 별거 아니지만 초반에 자주 만날 수 있는 error라 생각해서 포스팅한다.
