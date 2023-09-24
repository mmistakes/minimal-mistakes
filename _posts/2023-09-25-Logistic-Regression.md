# Logistic Regression

이번에는 Logistic Regression에 대해 알아보도록 하겠습니다.

Logistic Regression은 이진 분류 (Binary Classification)을 하기 위해 사용 될 수 있습니다.

이진 분류란 0과1로만 구분하는 것을 이진 분류라고 하는데 대표적인 예시로는 우리가 시험을 보고 pass, No pass 나누는 것이 바로 이진 분류의 예시로 들 수 있습니다.

그럼 시험을 보고 난 뒤 시험 점수를 기준으로 이진 분류를 이용해 pass 와 No pass를 한번 나누어 봅시다.

---

### 이진 분류(Binary Classification)

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled.png)

위의 데이터처럼 시험 점수를 기반으로 합격 불합격을 나누어 보도록 합시다.

그리고 합격을 1, 불합격을 0으로 가정 하였을 때 시험 점수와 합격, 불합격에 대한 그래프를 만들어 봅시다.

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%201.png)

해당 그래프를 한번 자세하게 분석 해보도록 합시다.

시험 점수가 55점 이하인 학생들은 불합격을 받아 0으로 표기가 되었고 시험 점수가 60점 이상인 학생들은 합격을 받아 모두 1로 표기가 된 것을 확인 할 수 있습니다. 

그리고 해당 그래프 선의 모양을 보면 직선이지만 S자 형태로 그려져 있습니다.

**???:그래도 직선이니까 선형 회귀 쓰면 되는거 아님?**

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%202.png)

그렇게 생각 하실 수 있을거 같아 위의 자료를 가져왔습니다.

만약 위의 예시와 같이 y=wx라는 직선을 그어 보도록 하겠습니다.

그리고 직선을 기준으로 직선보다 위에 있는 데이터들은 pass 직선보다 아래에 있는 데이터들은 fail이라고 가정해봅시다.

만약 pass받아야하는 점수인 100점을 받았는데 불구하고 위의 그림과 같이 직선보다 아래에 있게 된다면 결과는 fail을 받게 됩니다.

그렇게 된다면 올바른 이진 분류가 제대로 이루어지지가 않게 됩니다.

그렇기 때문에 이진 분류에서 사용하기 위해 만들어진 함수가 바로 Sigmoid 함수 입니다.

---

### 시그모이드 함수(Sigmoid Function)

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%203.png)

Sigmoid 함수는 위와 같이 정의가 됩니다.

Sigmoid 함수의 x부분 Linear Regression인 Wx+b를 넣어 hypothesis를 만들 수 있습니다.

그럼 이 함수를 pytorch를 통해 그려서 한번 어떻게 생겼는지 확인 해보도록 하겠습니다.

```python
import numpy as np
import matplotlib.pyplot as plt
def sigmoid(x):
    return 1/(1+np.exp(-x))
```

먼저 numpy와 matplotlib.pyplot라이브러리를 호출해서 한번 sigmoid함수와 sigmoid함수 그래프를 만들어 보도록 합시다.

sigmoid 함수는 numpy 라이브러리를 이용해서 쉽게 만들 수 있습니다.

```python
x=np.arange(-5.0,5.0,0.1)
y=sigmoid(x)

plt.plot(x,y,'g')
plt.plot([0,0],[1.0,0.0], ':')
plt.title('Sigmoid Function')
plt.show()
```

이 다음은 matplotlib을 이용해서 sigmoid함수를 그래프로 한번 만들어 보도록 하겠습니다.

해당 코드의 결과로 나온 sigmoid함수 그래프는 아래와 같습니다.

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%204.png)

s자 모양으로 만들어진 그래프가 보이죠

그리고 0을 기준으로 해서 0이하인 x값들은 모두 y값이 0에 가까워지고 있고 0을 기준으로 해서 0이상인 x값들은 모두 y값이 1에 가까워지는 것을 확인 할 수 있습니다.

해당 그래프의 weight는 1 bias는 0으로 설정하여 만든 그래프입니다.

그럼 weight와 bias를 다르게 하였을 때 만들어지는 그래프들도 한번 봐봅시다.

```python
x=np.arange(-5.0,5.0,0.1)
y1=sigmoid(0.5*x)
y2=sigmoid(x)
y3=sigmoid(2*x)
plt.plot(x,y1,'r', linestyle='--')
plt.plot(x,y2,'g')
plt.plot(x,y3,'b',linestyle='--')
plt.plot([0,0],[1.0,0.0],':')
plt.title('Sigmoid Function')
plt.show()
```

해당 코드를 이용해서 weight와 bias값이 서로 다른 sigmoid 함수를 만들어 보도록 하겠습니다.

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%205.png)

위의 그림에서 빨간색 점선은 weight가 0.5인 sigmoid이며 

초록색 선은 weight가 1인 sigmoid 함수입니다.

마지막으로 파랑색 점선은 weight 가 2인 sigmoid함수 입니다.

해당 그래프를 통해 우리는 sigmoid함수의 특징에 대해 알 수 있습니다.

바로 weight값에 따라 경사도가 달라진다는 것 입니다.

weight가 커질수록 경사도가 커지고 weight가 작아질수록 경사도가 작아지게 됩니다.

이번에는 weight값은 모두 고정하고 bias값만 바꾼 뒤 한번 그래프를 그려보도록 하겠습니다.

```python
x=np.arange(-5.0,5.0,0.1)
y1=sigmoid(x+0.5)
y2=sigmoid(x+1)
y3=sigmoid(x+2)
plt.plot(x,y1,'r', linestyle='--')
plt.plot(x,y2,'g')
plt.plot(x,y3,'b',linestyle='--')
plt.plot([0,0],[1.0,0.0],':')
plt.title('Sigmoid Function')
plt.show()
```

위의 코드에서 x앞에 있는 weight를 모두 지운 뒤 bias만 추가하여 실행 했을 때 나오는 그래프입니다.

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%206.png)

bias는 그래프의 좌우 이동 값을 나타내 줍니다.

bias 값이 커질 수록 좌로 이동하고  bias값이 작아질 수록 우로 이동하는 것을 확인 할 수 있습니다.

---

### Sigmoid 함수를 이용해서 이진 분류하는 원리

우리는 sigmoid함수를 이용해서 이진 분류를 할 수 있다는 것을 알 수 있습니다.

그럼 어떤 원리로 과연 분류를 하는지 조금 더 자세하게 다루도록 하겠습니다.

Sigmoid함수의 특징은 입력 데이터 x의 값이 커지면 커질 수록 1에 수렴하고 x의 값이 작아지면 작아질 수록 0에 수렴하는 특징을 가지고 있다는 것을 눈으로 확인 했습니다.

그리고 우리가 처음에 예시를 들었던 예제와 같이 시험을 봤을 때 시험 점수가 **특정 점수** 이하면 불합격 **특정 점수** 이상이면 합격을 주도록 하였습니다.

여기서 특정 점수를 우리는 임계값이라고 부릅니다.  입력 데이터인 x를 넣었을 때 출력 데이터 y가 0.5이상이면 1로 수렴하고 0.5이하면 0으로 수렴하는 특징을 가지는 것 또한 확인을 할 수 있습니다.

그렇기 때문에 우리는 이러한 sigmoid함수의 특징을 이용하여 특정 임계값을 기준으로 0과 1 단 두 가지의 분류를 할 수 있습니다.

---

### 손실 함수(loss Function)

우리는 이진 분류를 해야 하는 경우에 hypothesis를 Sigmoid함수로 사용해야 하는 것을 알게 되었습니다.

그럼 loss함수는 그대로 mse를 사용해야 할까요?

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%207.png)

먼저 mse함수를 보도록 합시다. 해당 함수의 H(x) 부분에 우리가 앞에서 배운 Sigmoid함수를 넣게 되었을 때 loss와 weight간의 관계를 한번 그래프로 그려보도록 합시다.

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%208.png)

위의 그래프를 보면 로컬 미니멈과 글로벌 미니멈이 있으며 굴곡이 여러 군데 져있습니다.

해당 용어에 대해 먼저 설명하도록 하겠습니다.

로컬 미니멈은 영어 local:지역이라는 의미에서 가져와 해당 구역에서의 최소 값이라는 의미 입니다.

글로벌 미니멈은 영어 global 세계의, 지구 전체의 라는 의미를 따와서 loss함수 전체에서 loss가 가장 작은 지점을 의미합니다.

만약 경사하강법을 이용하여 weight를 최적화 시키는 과정에서 접선의 기울기가 0인 지점을 찾았다고 가정합시다.

그런데 만약 그 지점이 위의 그래프와 같이 로컬 미니멈이 된다면 해당 weight와 bias는 로컬 미니멈에서 머물러 더 이상 개선이 되지 않으며 최적화되지 않은 weight와 bias로 설정이 된 뒤 학습을 멈추게 되어 글로벌 미니멈을 찾지 못하게 될 것 입니다.

그럼 이 문제를 개선하기 위해서 한번 sigmoid함수와 mse에 대해 그래프를 그려서 분석 해보도록 합시다.

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%209.png)

해당 그래프는 loss함수 mse의 값과 H(x) 즉 Sigmoid함수의 결과 값에 대해 나타낸 그래프입니다.

Sigmoid함수 특성 상 결과 값이 1과 0으로만 분류가 되며 실제 결과가 1일 때 예측 값이 0에 가까워질 수록 loss값이 커지고 실제 결과가 0일 때 예측 값이 1에 가까워질 수록 loss 값이 커지는 성질을 가지고 있습니다.

그리고 이러한 특성을 그래프로 표현 하였을 때 위의 그래프와 같으며 해당 그래프는 로그 함수로 표현이 가능 합니다.

위의 두 그래프를 로그 함수로 표현하였을 때 아래와 같은 식으로 표현이 됩니다.

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%2010.png)

이 식을 하나로 통일하여 쓰게 된다면 아래와 같이 표현을 할 수 있습니다.

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%2011.png)

그럼 이 식을 mse에 대입하여 적용 시켜보도록 하겠습니다.

![Untitled](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Untitled%2012.png)

이렇게 Sigmoid함수를 적용한 mse가 완성이 됩니다.

그리고 위의 손실 함수를 우리는 binary cross entropy라고 부릅니다.

[Pytorch를 이용해서 이진 분류를 해보자](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/Pytorch%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A2%E1%84%89%E1%85%A5%20%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%B5%E1%86%AB%20%E1%84%87%E1%85%AE%E1%86%AB%E1%84%85%E1%85%B2%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%A2%E1%84%87%E1%85%A9%E1%84%8C%E1%85%A1%20284e7f6096954f58a8e7e3625a13daed.md)

[nn.module로 Logistic Regression을 해보자](Logistic%20Regression%202b2b39ea3a2b47b8906f62e584a80a97/nn%20module%E1%84%85%E1%85%A9%20Logistic%20Regression%E1%84%8B%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%A2%E1%84%87%E1%85%A9%E1%84%8C%E1%85%A1%20e5d9e39872694b9f921691cac761c6f5.md)