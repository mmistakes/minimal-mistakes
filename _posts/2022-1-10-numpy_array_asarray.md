---
layout: single
title: numpy array와 asarray의 차이점
categories: numpy 라이브러리쿡북, error
tag: deeplearning numpy error
typora-root-url: ../
---

### 이미지 열기

`import PIL`

`(사용하고자하는 이미지변수) = PIL.Image.open('이미지위치')`

`img = PIL.Image.open('./images/image.jpg')`



### 이미지 ->  numpy

이미지를 불러온 다음 numpy형태로 변환한다.


    import numpy as np 
    from PIL import Image
    img = Image.open("불러올사진.jpg")
    img_np_array = np.array(img)
    print(img_np_array.shape)




다른 방법으로는 asarray() 함수를 사용 가능하다.


    import numpy as np 
    from PIL import Image
    img = Image.open("불러올사진.jpg")
    Image_np_array = np.asarray(img)
    print(Img_np_array.shape)




## 그러면 여기서 asarray와 array의 차이점은 뭐지?

이 둘은 기본적으로 수행하는 역할은 동일하다. 하지만 array의 copy 옵션은 default는 true이고 asarray의 copy 옵션은 default가 false이다. 즉 array는 개체의 복사본을 만드는 반면  asarray는 형변환이 필요한 경우가 아니라면 만들지 않는다.



```py
>>> A = numpy.matrix(numpy.ones((3,3)))
>>> A
matrix([[ 1.,  1.,  1.],
        [ 1.,  1.,  1.],
        [ 1.,  1.,  1.]])
```

array는 복사를 한 후에 사용을 하기때문에 원본에주는 영향이 없다.

```py
>>> numpy.array(A)[2]=2
>>> A
matrix([[ 1.,  1.,  1.],
        [ 1.,  1.,  1.],
        [ 1.,  1.,  1.]])
```

하지만 asarray는 필요한 경우가 아니라면 복사를 하지않고 사용하기 때문에 원본이 변화한다

```py
>>> numpy.asarray(A)[2]=2
>>> A
matrix([[ 1.,  1.,  1.],
        [ 1.,  1.,  1.],
        [ 2.,  2.,  2.]])
```



## 딥러닝 학습을 할 때 이미지를 불러온 이후 형변환을 자주 한다.

PIL -> numpy -> tensor -> numpy ...등등



`import torch`
`import numpy as np`



예시로 1로 이루어진 3x3 크기의 numpy 행렬을 만들어본다. 

`A = np.matrix(np.ones((3,3)))`

`A`

```
matrix([[1., 1., 1.],
        [1., 1., 1.],
        [1., 1., 1.]])
```



만든 numpy 행렬을 tensor로 형변환 해준다. tensorflow의 경우 자동으로 gpu에 할당이 되나 pytorch는 지정해주어야 할당이 된다. 고로 지금의 상태는 cpu에 담겨있다.

```python
CPU_Tensor_A = torch.tensor(A)
CPU_Tensor_A
tensor([[1., 1., 1.],
        [1., 1., 1.],
        [1., 1., 1.]], dtype=torch.float64)
```



tensor에서 numpy로 다시한번 변환해준다. 잘 출력이 된다는 것을 알 수 있다.

```python
NP_CPU_Tensor_A = np.array(CPU_Tensor_A)
NP_CPU_Tensor_A
array([[1., 1., 1.],
       [1., 1., 1.],
       [1., 1., 1.]])
```



## 하지만 

실제로 이미지를 이용한 딥러닝 학습을 진행을 하다보면 위의 경우처럼 잘 변환이 되지 않는데 이때 마주하는 

`TypeError: can't convert cuda:0 device type tensor to numpy. Use Tensor.cpu() to copy the tensor to host memory first.`

error command가 있다. 

```python
NP_CPU_Tensor_A = np.array(CPU_Tensor_A)
NP_CPU_Tensor_A
array([[1., 1., 1.],
       [1., 1., 1.],
       [1., 1., 1.]])

NP_GPU_Tensor_A = torch.tensor(NP_CPU_Tensor_A, device="cuda")
#TypeError: can't convert cuda:0 device type tensor to numpy. Use Tensor.cpu() to copy the tensor to host memory first.
    
#or 
NP_CPU_Tensor_A = NP_GPU_Tensor_A.numpy()
#TypeError: can't convert cuda:0 device type tensor to numpy. Use Tensor.cpu() to copy the tensor to host memory first.
```

이 error는 gpu에 할당되어있는 tensor를 numpy로 변환을 할 때 생기는 error이다.



## how to solve it

```python
NP_CPU_Tensor_A = NP_GPU_Tensor_A.cpu().numpy()
NP_CPU_Tensor_A
array([[1., 1., 1.],
       [1., 1., 1.],
       [1., 1., 1.]])
```

gpu에 있는 tensor를 cpu() 로 옮기고 numpy로 변환해주면 잘 작동한다는 것을 알 수 있다.

