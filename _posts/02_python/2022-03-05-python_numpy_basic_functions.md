---
layout: post
title: Python Numpy 기본 기능
subtitle: 여기다가 부제목을 넣으면 되냥...
tags: Python Numpy Basic
description: >
  최근 알고리즘이 나를 이끌었다 이러면서 AI가 시대를 휩쓰는 느낌이다. 그러면서 machine learning, deep learning이 주목받는데 보통사람에겐 영 그 의미를 받아들이기 힘들기도 하다. 방대한 양의 숫자를 다루는 컴퓨터 연산이 이 machine learning, deep learning의 핵심인데 이 방대한 연산을 가능하게 해준는 것들 중 하나가 바로 python에서는 Numpy라는 package이다. 
sitemap: false
hide_last_modified: true
categories:
 - 02_python
---
  
  
  다차원array(배열, 때문에 차원개념이 중요하다.  )를 효과적으로 처리가 가능한 python package이다.
	현실 세계의 다양한 data는 array 형태로 표현이 가능한데, numpy는 python에서 많이 사용하는 list에 비해 빠르고 강력하다.
<br>
### Numpy의 dimension(차원) ### 
<br>
	1d axis(row): axis 0 --> vector <br>
	2d axis(column): axis 1 --> matrix <br>
	3d axis(channel): axis 2 --> tensor (3d 이상)

<br>
## 다 필요없고 그냥 python code로 이해해보록 하자. 불친절하고 무책임하게 보이는 설명 방법같지만 이런 설명 또한 도움이 되는 사람이 있으리라. 가장 기본이 되는 기능만 요약했다. ##

```
import numpy as np

bong_list = [1,2,3]
array = np.array(bong_list)

print(array.size)
print(array.dtype)
print(array[2])	#slicing이 가능

# array 만들기
Ary1 = np.arange(4)
print("Ary1 is like: ", Ary1)
Ary2 = np.zeros((4,4), dtype = float)
print("Ary2 is like: ", Ary2)
Ary3 = np.ones((3,3), dtype = str)
print('Ary3 is like: ', Ary3)

# 4. 0부터 9까지 랜덤하게 초기화 된 array 만들기
Ary4 = np.random.randint(0,10,(3,3))
print("Ary4 is like: ", Ary4)
# 5. 평균이 0이고, 표준편차가 1인 표준 정규를 띄는 array 만들기
Ary5 = np.random.normal(0,1,(3,3))
print("Ary5 is like: ", Ary5)
# 6. array 합치기: concatenate
Ary_1 = np.array([1,2,3])
Ary_2 = np.array([4,5,6])
Ary_3 = np.concatenate([Ary_1, Ary_2])
print("Ary_3's shape is like: ", Ary_3.shape)
print("Ary_3 is like: ", Ary_3)
# 7. array reshape
bong1 = np.array([1,2,3,4])
bong2 = bong1.reshape((2,2))
print("reshaped array is like: ", bong2)
# 8. array 세로 축으로 합치기 (가로 축은 concatenate 썼었다)
bong3 = np.arange(4).reshape(1,4)
bong4 = np.arange(8).reshape(2,4)
print("bong3 is like: ", bong3)
print("bong4 is like: ", bong4)
bong5 = np.concatenate([bong3, bong4], axis = 0)    # 세로축기준은 axis = 0, 가로축기준은 axis =1
print("bong5 is like: ", bong5)
print("bong5's shape is like: ", bong5.shape)
# 9. array split
bong_ary = np.arange(8).reshape(2,4)
a, b = np.split(bong_ary, [2], axis = 1)    # index2를 기준으로, column2를 기준으로 나눈다.
print("bong_ary is like: ", bong_ary)
print(a, a.shape)
print(b, b.shape)
```