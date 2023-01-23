### Numpy 를 사용한 신경망 구현
numpy를 사용해서 신경망을 구현하겠습니다.
Numpy는 n-차원 배열 객체와 이 배열들을 조작하기 위한 많은 기능을 제공합니다. 
이것은 계산 그래프, 딥러닝, 변화도에 대한 메서드가 존재하지 않아 직접 numpy 연산을 사용해서 신경망에 순전파와 역전파를 수동으로 구현하여 3차 polynomial를 sine 함수에 fit하기 위해 numpy를 쉽게 사용할 수 있습니다.


```python
import os
```


```python
os.getcwd()
```




    '/home/ubuntu/notebookDir/yjjo/github/kurly-aa-ds-demand-forecast/src'




```python
# -*- coding: utf-8 -*-
import numpy as np
import math

# 무작위 입력값과 결과값 생겅하기
x = np.linspace(-math.pi, math.pi, 2000)
y = np.sin(x)

# 가중치 무작위로 초기화하기
a = np.random.randn()
b = np.random.randn()
c = np.random.randn()
d = np.random.randn()

learning_rate = 1e-6
for t in range(2000):
    # 순전파 : 예측된 y 계산하기
    # y = a + b x + x^2 + d x^3
    y_pred = a + b * x + c * x ** 2 + d * x ** 3
    
    # 손실 계산하고 추력하기
    loss = np.square(y_pred - y).sum()
    if t % 100 == 99:
        print(t, loss)
        
    # 손실에 대한 a, b, c, d의 변화도를 계산하기 위한 역전파
    grad_y_pred = 2.0 * (y_pred - y)
    grad_a = grad_y_pred.sum()
    grad_b = (grad_y_pred * x).sum()
    grad_c = (grad_y_pred * x ** 2).sum()
    grad_d = (grad_y_pred * x ** 3).sum()
    
    # 가중치 갱신하기
    a -= learning_rate * grad_a
    b -= learning_rate * grad_b
    c -= learning_rate * grad_c
    d -= learning_rate * grad_d
    
print(f'Result: y = {a} + {b} x + {c} x^2 + {d} x^3')
```

    99 670.6233085277509
    199 447.0547189668734
    299 299.0396933438405
    399 201.03671524036773
    499 136.14163990407945
    599 93.16565600787479
    699 64.70241678001477
    799 45.848994717256275
    899 33.35945075279815
    999 25.084663337525225
    1099 19.60158388337724
    1199 15.967847326121078
    1299 13.559342354234355
    1399 11.96268725424817
    1499 10.904046440466708
    1599 10.202001565583583
    1699 9.736345920370539
    1799 9.427420277515376
    1899 9.222427876625131
    1999 9.086370459829261
    Result: y = 0.004574985558953889 + 0.841354721404788 x + -0.0007892611370078446 x^2 + -0.0911418472167104 x^3


----
### Pytorch Tensor

Numpy는 좋은 framework 이지만 수치적인 연산을 가속화하기 위해 GPU를 활용할 수 없습니다. 현대의 깊은 신경망에서 GPU는 50배 혹은 그 이상의 속도 향상을 제공하기 때문에, 안타깝게 numpy는 현대 딥러닝에는 충분하지 않습니다.
 여기서 가장 핵심적인 PyTorch 개념 Tensor를 소개합니다. PyTorch Tensor는 개념적으로 numpy 배열과 동일합니다. Tensor은 n-차원 배열이고 PyTorch는 Tensor를 연산하는 많은 기능을 제공합니다. Numpy 배열처럼 Tensor는 연산 그래프와 변화도에 대해 알지 못하지만 과학적인 계산을 위한 포괄적인 도구로서 유용합니다. 또한 numpy와 달리, PyTorch Tensor는 수치적인 계산을 가속하기 위해 GPU를 활용할 수 있습니다. PyTorch Tensor를 GPU에서 실행하기 위해, 간단히 올바른 기기를 명시해야 합니다. 3차 polynomial를 sine 함수에 fit하기 위해 PyTorch Tensor를 사용하겠습니다. 위의 numpy 예제와 같이 신경망을 통과하는 순전파와 역전파를 수동으로 구현하겠습니다.


```python

import torch
import math

dtype = torch.float
device = torch.device('cpu')
# device = torch.device('cuda:0') # GPU에서 실행하기 위해 이 주석을 제거하기

# 무작위 입력과 출력 데이터 생성하기
a = torch.randn((), device=device, dtype=dtype)
b = torch.randn((), device=device, dtype=dtype)
c = torch.randn((), device=device, dtype=dtype)
d = torch.randn((), device=device, dtype=dtype)

learning_rate = 1e-6
for t in range(2000):
    # 순전파 : 예측된 y 계산하기
    y_pred = a + b * x + c * x ** 2 + d * x ** 3
    
    # 손실을 계산하고 추력하기
    loss = (y_pred - y).pow(2).sum().item()
    if t % 100 == 99:
        print(t, loss)
        
    # 손실에 대한 a, b, c, d의 변화도를 계산하기 위한 역전파
    grad_y_pred = 2.0 * (y_pred - y)
    grad_a = grad_y_pred.sum()
    grad_b = (grad_y_pred * x).sum()
    grad_c = (grad_y_pred * x ** 2).sum()
    grad_d = (grad_y_pred * x ** 3).sum()
    
    # 경사 하강법을 사용해서 가중치 갱신하기
    a -= learning_rate * grad_a
    b -= learning_rate * grad_b
    c -= learning_rate * grad_c
    d -= learning_rate * grad_d
    
print(f'Result: y = {a.item()} + {b.item()} x + {c.item()} x^2 + {d.item()} x^3')
```

    99 1467.3335631179896
    199 974.4515602187425
    299 648.1864915747498
    399 432.19711441460765
    499 289.199443092091
    599 194.51888801703856
    699 131.82389016179414
    799 90.30503999706147
    899 62.80690275919107
    999 44.592853773891875
    1099 32.52689762757491
    1199 24.53279588672985
    1299 19.2356507419009
    1399 15.725206806451947
    1499 13.39839245511111
    1599 11.85593599876317
    1699 10.833205965840932
    1799 10.15499839993457
    1899 9.705144211635808
    1999 9.40669950840547
    Result: y = -0.006349306553602219 + 0.8338698744773865 x + 0.0010953610762953758 x^2 + -0.09007719904184341 x^3

