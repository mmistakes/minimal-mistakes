---
published: true
layout: single
title: "[Machine Learning PerfectGuide] ndarray 사용법 기초"
category: mlbasic
tags:
comments: true
sidebar:
  nav: "mainMenu"
--- 
* * *

<br>

**numpy ndarray 생성**
* * *
```python
import numpy as np
```

```python
list = [1, 2, 3]
print("list:",list)
print("list type:",type(list))

ndArray = np.array(list)
print("ndArray:",ndArray)
print("ndArray type:", type(ndArray))
```
```
------------------------------------
list: [1, 2, 3]
list type: <class 'list'>
ndArray: [1 2 3]
ndArray type: <class 'numpy.ndarray'>
------------------------------------
```

<br>

**ndarray shape 및 차원 확인**
* * *
```python
ndArray1 = np.array([1, 2, 3])
print('ndArray1 type:',type(ndArray1))
print('ndArray1 array 형태(shape):', ndArray1.shape)

ndArray2 = np.array([[1, 2, 3], [2, 3, 4]])
print('ndArray2 type:',type(ndArray2))
print('ndArray2 array 형태(shape):', ndArray2.shape)

ndArray3 = np.array([[1, 2, 3]])
print('ndArray3 type:',type(ndArray3))
print('ndArray3 array 형태(shape):', ndArray3.shape, '\n')

print('ndArray1 {0}차원'.format(ndArray1.ndim))
print('ndArray2 {0}차원'.format(ndArray2.ndim))
print('ndArray3 {0}차원'.format(ndArray3.ndim))
```

```
------------------------------------
ndArray1 type: <class 'numpy.ndarray'>
ndArray1 array 형태(shape): (3,)
ndArray2 type: <class 'numpy.ndarray'>
ndArray2 array 형태(shape): (2, 3)
ndArray3 type: <class 'numpy.ndarray'>
ndArray3 array 형태(shape): (1, 3)

ndArray1 1차원
ndArray2 2차원
ndArray3 2차원
------------------------------------
```
<br>

**ndarray 데이터 값의 타입**
* * *
```python
list1 = [1, 2, 3]
array1 = np.array(list1)

list2 = [1, 2, 'test']
array2 = np.array(list2)

list3 = [1, 2, 3.0]
array3 = np.array(list3)

print(type(array1))
print(type(array2))
print(type(array3))

print(array1, array1.dtype)
print(array2, array2.dtype)
print(array3, array3.dtype)
```
```
------------------------------------
<class 'numpy.ndarray'>
<class 'numpy.ndarray'>
<class 'numpy.ndarray'>
[1 2 3] int64
['1' '2' 'test'] <U21
[1. 2. 3.] float64
------------------------------------
```
<br>

**astype()을 통한 ndarray 타입 변환**
* * *
```python
array_int = np.array([1, 2, 3])
array_float = array_int.astype('float64')
print(array_float, array_float.dtype)

array_int1= array_float.astype('int32')
print(array_int1, array_int1.dtype)

array_float1 = np.array([1.1, 2.1, 3.1])
array_int2= array_float1.astype('int32')
print(array_int2, array_int2.dtype)
```

```
------------------------------------
[1. 2. 3.] float64
[1 2 3] int32
[1 2 3] int32
------------------------------------
```

<br>

**ndarray에서 axis 기반의 연산함수 수행**
* * *
```python
array2 = np.array([[1, 2, 3], [2, 3, 4]])

#    1 2 3  -> 6
#    2 3 4  -> 8
# -> 3 5 7

print(array2.sum())
print(array2.sum(axis=0))
print(array2.sum(axis=1))
```
```
------------------------------------
15
[3 5 7]
[6 9]
------------------------------------
```

<br>

**ndarray를 편리하게 생성하기 - arange, zeros, ones**
* * *
```python
sequence_array = np.arange(10)
print(sequence_array)
print(sequence_array.dtype, sequence_array.shape, '\n')

zero_array = np.zeros((3,2),dtype='int32')
print(zero_array)
print(zero_array.dtype, zero_array.shape, '\n')

one_array = np.ones((3,2))
print(one_array)
print(one_array.dtype, one_array.shape)
```
```
------------------------------------
[0 1 2 3 4 5 6 7 8 9]
int64 (10,)

[[0 0]
 [0 0]
 [0 0]]
int32 (3, 2)

[[1. 1.]
 [1. 1.]
 [1. 1.]]
float64 (3, 2)
------------------------------------
```

<br>

**ndarray의 shape를 변경하는 reshape()**
* * *

```python
array1 = np.arange(10)
print('array1:\n', array1)

array2 = array1.reshape(2,5)
print('array2:\n', array2)

array3 = array1.reshape(5,2)
print('array3:\n', array3)

# 변환할 수 있는 shape구조를 입력하면 오류 발생.
# array1.reshape(4,3)
```

```
------------------------------------
array1:
 [0 1 2 3 4 5 6 7 8 9]
array2:
 [[0 1 2 3 4]
 [5 6 7 8 9]]
array3:
 [[0 1]
 [2 3]
 [4 5]
 [6 7]
 [8 9]]
------------------------------------
```

<br>

**reshape()에 -1 인자값을 부여하여 특정 차원으로 고정된 가변적인 ndarray형태 변환**
* * *
```python
array1 = np.arange(10)
print(array1, '\n')

#컬럼 axis 크기는 5에 고정하고 로우 axis크기를 이에 맞춰 자동으로 변환. 즉 2x5 형태로 변환 
array2 = array1.reshape(-1,5)
print('array2 shape:',array2.shape)
print('array2:\n', array2, '\n')

#로우 axis 크기는 5로 고정하고 컬럼 axis크기는 이에 맞춰 자동으로 변환. 즉 5x2 형태로 변환 
array3 = array1.reshape(5,-1)
print('array3 shape:',array3.shape)
print('array3:\n', array3)
```

```
------------------------------------
[0 1 2 3 4 5 6 7 8 9]

array2 shape: (2, 5)
array2:
 [[0 1 2 3 4]
 [5 6 7 8 9]]

array3 shape: (5, 2)
array3:
 [[0 1]
 [2 3]
 [4 5]
 [6 7]
 [8 9]]
------------------------------------
```

<br>

```python
# reshape()는 (-1, 1), (-1,)와 같은 형태로 주로 사용됨.
# 1차원 ndarray를 2차원으로 또는 2차원 ndarray를 1차원으로 변환 시 사용. 
array1 = np.arange(5)
print(array1, '\n')

# 1차원 ndarray를 2차원으로 변환하되, 컬럼axis크기는 반드시 1이여야 함. 
array2d_1 = array1.reshape(-1, 1)
print("array2d_1 shape:", array2d_1.shape)
print("array2d_1:\n",array2d_1, '\n')

# 2차원 ndarray를 1차원으로 변환 
array1d = array2d_1.reshape(-1,)
print("array1d shape:", array1d.shape)
print("array1d:\n",array1d)
```

```
------------------------------------
[0 1 2 3 4] 

array2d_1 shape: (5, 1)
array2d_1:
 [[0]
 [1]
 [2]
 [3]
 [4]]

array1d shape: (5,)
array1d:
 [0 1 2 3 4]
------------------------------------
```
<br>

``` python
------------------------------------
# -1 을 적용하여도 변환이 불가능한 형태로의 변환을 요구할 경우 오류 발생.
# array1 = np.arange(10)
# array4 = array1.reshape(-1,4)

# 반드시 -1 값은 1개의 인자만 입력해야 함, 2인자 모두 입력할 경우 error 발생
# array1.reshape(-1, -1)
------------------------------------
```


<br>

**인덱싱(Indexing) - 특정 위치의 단일값 추출**
* * *

```python
# 1에서 부터 9 까지의 1차원 ndarray 생성 
array1 = np.arange(start=1, stop=10)
print('array1:',array1)

# index는 0 부터 시작하므로 array1[2]는 3번째 index 위치의 데이터 값을 의미
value = array1[2]
print('value:', value)
print(type(value))
print('맨 뒤의 값:', array1[-1], ', 맨 뒤에서 두번째 값:', array1[-2], '\n')

array1[0] = 9
array1[8] = 0
print('array1:',array1, '\n')

array1d = np.arange(start=1, stop=10)
array2d = array1d.reshape(3,3)
print(array2d)

print('(row=0,col=0) index 가리키는 값:', array2d[0,0] )
print('(row=0,col=1) index 가리키는 값:', array2d[0,1] )
print('(row=1,col=0) index 가리키는 값:', array2d[1,0] )
print('(row=2,col=2) index 가리키는 값:', array2d[2,2] )
```

```
------------------------------------
array1: [1 2 3 4 5 6 7 8 9]
value: 3
<class 'numpy.int64'>
맨 뒤의 값: 9 , 맨 뒤에서 두번째 값: 8

array1: [9 2 3 4 5 6 7 8 0]

[[1 2 3]
 [4 5 6]
 [7 8 9]]
(row=0,col=0) index 가리키는 값: 1
(row=0,col=1) index 가리키는 값: 2
(row=1,col=0) index 가리키는 값: 4
(row=2,col=2) index 가리키는 값: 9
------------------------------------
```

<br>

**슬라이싱(Slicing)**
* * *
```python
array1 = np.arange(start=1, stop=10)
print(array1)
array3 = array1[0:3]
print(array3)
print(type(array3))
```

```
------------------------------------
[1 2 3 4 5 6 7 8 9]
[1 2 3]
<class 'numpy.ndarray'>
------------------------------------
```

<br>

```python
array1 = np.arange(start=1, stop=10)
array4 = array1[:3]
print(array4)

array5 = array1[3:]
print(array5)

array6 = array1[:]
print(array6)
```

```
------------------------------------
[1 2 3]
[4 5 6 7 8 9]
[1 2 3 4 5 6 7 8 9]
------------------------------------
```

<br>

```python
array1d = np.arange(start=1, stop=10)
array2d = array1d.reshape(3,3)
print('array2d:\n',array2d)

print('array2d[0:2, 0:2] \n', array2d[0:2, 0:2])
print('array2d[1:3, 0:3] \n', array2d[1:3, 0:3])
print('array2d[1:3, :] \n', array2d[1:3, :])
print('array2d[:, :] \n', array2d[:, :])
print('array2d[:2, 1:] \n', array2d[:2, 1:])
print('array2d[:2, 0] \n', array2d[:2, 0])
```

```
------------------------------------
array2d:
 [[1 2 3]
 [4 5 6]
 [7 8 9]]
array2d[0:2, 0:2] 
 [[1 2]
 [4 5]]
array2d[1:3, 0:3] 
 [[4 5 6]
 [7 8 9]]
array2d[1:3, :] 
 [[4 5 6]
 [7 8 9]]
array2d[:, :] 
 [[1 2 3]
 [4 5 6]
 [7 8 9]]
array2d[:2, 1:] 
 [[2 3]
 [5 6]]
array2d[:2, 0] 
 [1 4]
------------------------------------
```

<br>

**팬시 인덱싱(fancy indexing)**
* * *
```python
array1d = np.arange(start=1, stop=10)
array2d = array1d.reshape(3,3)
print(array2d)

array3 = array2d[[0,1], 2]
print('array2d[[0,1], 2] => ',array3.tolist())

array4 = array2d[[0,2], 0:2]
print('array2d[[0,2], 0:2] => ',array4.tolist())

array5 = array2d[[0,1]]
print('array2d[[0,1]] => ',array5.tolist())

array6 = array2d[[1,2], 0:3]
print('array2d[[1,2], 0:3] => ',array6.tolist())

array7 = array2d[0:3, [1, 2]]
print('array2d[0:3, [1, 2]] => ',array7.tolist())
```

```
------------------------------------
[[1 2 3]
 [4 5 6]
 [7 8 9]]
array2d[[0,1], 2] =>  [3, 6]
array2d[[0,2], 0:2] =>  [[1, 2], [7, 8]]
array2d[[0,1]] =>  [[1, 2, 3], [4, 5, 6]]
array2d[[1,2], 0:3] =>  [[4, 5, 6], [7, 8, 9]]
array2d[0:3, [1, 2]] =>  [[2, 3], [5, 6], [8, 9]]
------------------------------------
```

<br>

**불린 인덱싱(Boolean indexing)**
* * *
```python
array1d = np.arange(start=1, stop=10)
print(array1d, '\n')

print(array1d > 5, '\n')

var1 = array1d > 5
print("var1:", var1, '\n')

print(type(var1), '\n')

# [ ] 안에 array1d > 5 Boolean indexing을 적용 
print(array1d)
array3 = array1d[array1d > 5]
print('array1d > 5 불린 인덱싱 결과 값 :', array3, '\n')

boolean_indexes = np.array([False, False, False, False, False,  True,  True,  True,  True])
array3 = array1d[boolean_indexes]
print('불린 인덱스로 필터링 결과 :', array3, '\n')

print(array1d)
indexes = np.array([5,6,7,8])
array4 = array1d[ indexes ]
print('일반 인덱스로 필터링 결과 :', array4, '\n')

print(array1d[array1 > 5])
```

```
------------------------------------
[1 2 3 4 5 6 7 8 9]

[False False False False False  True  True  True  True] 

var1: [False False False False False  True  True  True  True] 

<class 'numpy.ndarray'>

[1 2 3 4 5 6 7 8 9]
array1d > 5 불린 인덱싱 결과 값 : [6 7 8 9]

불린 인덱스로 필터링 결과 : [6 7 8 9]

[1 2 3 4 5 6 7 8 9]
일반 인덱스로 필터링 결과 : [6 7 8 9]

[6 7 8 9]
------------------------------------
```

<br>

**행렬의 정렬 – sort()와 argsort()**
* * *
```python
org_array = np.array([ 3, 1, 9, 5]) 
print('원본 행렬:', org_array)

# np.sort( )로 정렬 
sort_array1 = np.sort(org_array)         
print ('np.sort( ) 호출 후 반환된 정렬 행렬:', sort_array1) 
print('np.sort( ) 호출 후 원본 행렬:', org_array)

# ndarray.sort( )로 정렬
sort_array2 = org_array.sort()
org_array.sort()
print('org_array.sort( ) 호출 후 반환된 행렬:', sort_array2)
print('org_array.sort( ) 호출 후 원본 행렬:', org_array, '\n')

sort_array1_desc = np.sort(org_array)[::-1]
print ('내림차순으로 정렬:', sort_array1_desc) 
```
```
------------------------------------
원본 행렬: [3 1 9 5]
np.sort( ) 호출 후 반환된 정렬 행렬: [1 3 5 9]
np.sort( ) 호출 후 원본 행렬: [3 1 9 5]
org_array.sort( ) 호출 후 반환된 행렬: None
org_array.sort( ) 호출 후 원본 행렬: [1 3 5 9]

내림차순으로 정렬: [9 5 3 1]
------------------------------------
```

<br>

```python
array2d = np.array([[8, 12], 
                   [7, 1 ]])

sort_array2d_axis0 = np.sort(array2d, axis=0)
print('로우 방향으로 정렬:\n', sort_array2d_axis0)

sort_array2d_axis1 = np.sort(array2d, axis=1)
print('컬럼 방향으로 정렬:\n', sort_array2d_axis1)
```
```
------------------------------------
로우 방향으로 정렬:
 [[ 7  1]
 [ 8 12]]
컬럼 방향으로 정렬:
 [[ 8 12]
 [ 1  7]]
------------------------------------
```

<br>

```python
org_array = np.array([ 3, 1, 9, 5]) 
print(np.sort(org_array))

sort_indices = np.argsort(org_array)
print(type(sort_indices))
print('행렬 정렬 시 원본 행렬의 인덱스:', sort_indices, '\n')

org_array = np.array([ 3, 1, 9, 5]) 
print(np.sort(org_array)[::-1])

sort_indices_desc = np.argsort(org_array)[::-1]
print('행렬 내림차순 정렬 시 원본 행렬의 인덱스:', sort_indices_desc)
```

```
------------------------------------
[1 3 5 9]
<class 'numpy.ndarray'>
행렬 정렬 시 원본 행렬의 인덱스: [1 0 3 2]

[9 5 3 1]
행렬 내림차순 정렬 시 원본 행렬의 인덱스: [2 3 0 1]
------------------------------------
```

<br>

**key-value 형태의 데이터를 John=78, Mike=95, Sarah=84, Kate=98, Samuel=88을 ndarray로 만들고 argsort()를 이용하여 key값을 정렬**
* * *

```python
name_array=np.array(['John', 'Mike', 'Sarah', 'Kate', 'Samuel'])
score_array=np.array([78, 95, 84, 98, 88])

# score_array의 정렬된 값에 해당하는 원본 행렬 위치 인덱스 반환하고 이를 이용하여 name_array에서 name값 추출.  
sort_indices = np.argsort(score_array)
print("sort indices:", sort_indices)

name_array_sort = name_array[sort_indices]

score_array_sort = score_array[sort_indices]
print(name_array_sort)
print(score_array_sort)

# argsort 용도?
# 원본 ndarrary에서 값을 다시 참조해야하는 경우가 종종 있는데
# 그 경우, 유용하게 사용한다고 함.
```

```
------------------------------------
sort indices: [0 2 4 1 3]
['John' 'Sarah' 'Samuel' 'Mike' 'Kate']
[78 84 88 95 98]
------------------------------------
```

<br>

**선형대수 연산 – 행렬 내적과 전치 행렬 구하기**
* * *
```python
A = np.array([[1, 2, 3],
              [4, 5, 6]])
B = np.array([[7, 8],
              [9, 10],
              [11, 12]])

dot_product = np.dot(A, B)
print('행렬 내적 결과:\n', dot_product)
```
```
------------------------------------
행렬 내적 결과:
 [[ 58  64]
 [139 154]]
------------------------------------
```

<br>

```python
A = np.array([[1, 2],
              [3, 4]])
transpose_mat = np.transpose(A)
print('A의 전치 행렬:\n', transpose_mat)
```

```
------------------------------------
A의 전치 행렬:
 [[1 3]
 [2 4]]
------------------------------------
```

#### Reference 
***  
- ***파이썬 머신러닝 완벽 가이드***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>