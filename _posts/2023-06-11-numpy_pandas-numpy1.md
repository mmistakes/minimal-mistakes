---
layout: single
title: numpy 1. numpy와 attribute
tags: numpy_pandas
---
https://numpy.org/doc/stable/reference/index.html  


## numpy 1. numpy와 attribute

## 예제 4_1

```python
import numpy as np

def testArray():
    a0 = [0,0.5,1.0,1.5,2.0]  # dim = 5
    # b = [1,2,3,4] dim = 4
    b = [1,2,3,4,5]
    a = np.array([a0,a0,b])
    print('Type of a =>',type(a))
    print(a)

    print('-------------')
    print(a[2:])
    print(a[2:][0][2])
    print('-------------')
    print(a[:,2],np.e)
    print('-------------')
    #aa = np.array([])
    #np.copyto(a,aa)
    #print(aa)
    return None

def main():
    testArray()
    return None

if __name__=='__main__':
    main()
```
```
Type of a => <class 'numpy.ndarray'>
[[0.  0.5 1.  1.5 2. ]
 [0.  0.5 1.  1.5 2. ]
 [1.  2.  3.  4.  5. ]]
-------------
[[1. 2. 3. 4. 5.]]
3.0
-------------
[1. 1. 3.] 2.718281828459045
-------------
```

## 예제 4_1_0

```python
import numpy as np
def testArray():
    a = np.array([1,2,3], dtype=np.float32)
    b = np.array([[1,3,5,7,9],[0,2,4,6,8]],dtype=np.int16)
    print(a)
    print(b)

    # sum, prod
    print('sum of a:',a.sum())
    print('product of a:',a.prod())
    # std 표준편차, mean
    print('std of a:',a.std())
    print('mean of a:',a.mean())
    # cumsum(합), cumprod(곱)
    print('cumulative sum of a:',a.cumsum())
    print('cumprod of a:',a.cumprod())
    # math function
    print('1==',np.log(np.e))
    # 열 지정해서 합
    print(b[:,1].sum())
    # 열끼리 합
    #use_sum = []
    #for k in range(len(list(a[0]))):
    #   use_sum += [b[:,k]]

    # gradient
    print('gradient of a:', np.gradient(a))

    return None

def main():
    testArray()
    return None

if __name__ =='__main__':
    main()
```
```
[1. 2. 3.]
[[1 3 5 7 9]
 [0 2 4 6 8]]
sum of a: 6.0
product of a: 6.0
std of a: 0.8164966
mean of a: 2.0
cumulative sum of a: [1. 3. 6.]
cumprod of a: [1. 2. 6.]
1== 1.0
5
gradient of a: [1. 1. 1.]
```


## 예제 4_2

```python
# ndarray attributes
import numpy as np

def testNumpyArray():
    a = np.array([1,2,3,4,5], dtype='i8')       # construct an ndarray
    #list up attributes
    print('a type : ', type(a), ' and element type :', a.dtype, sep='')
    print(a)
    # size, ndim, shape, nbytes, itemsize
    # parameters : i2, i4, i8
    L1 =  [1,2,3,4,5]
    L2 =  [1,2,3,4,5,1,2,3,4,5]
    dtypelist = ['i2','i4','i8']
    for tmp in dtypelist:
        a1 = np.array(L1, dtype = tmp)
        print('------type is',tmp)
        print('size :',a1.size)
        print('ndim :', a1.ndim)
        print('shape : ',a1.shape)
        print('nbytes : ',a1.nbytes)
        print('itemsize : ', a1.itemsize)
        print()
    for tmp in dtypelist:
        a1 = np.array(L2, dtype = tmp)
        print('------type is',tmp)
        print('size :',a1.size)
        print('ndim :', a1.ndim)
        print('shape : ',a1.shape)
        print('nbytes : ',a1.nbytes)
        print('itemsize : ', a1.itemsize)
        print()
    return None

def testNumpyArray2():
    b = np.array([1.3,2.44,-9.01687,4.99,0])
    print('dtype :', b.dtype) # f8
    print('nbytes :', b.nbytes)
    print('shape :', b.shape)
    print('itemsize :', b.itemsize)
    return None

def testNumpyArray3():
    c = np.array([10,2,3,4,5])
    print(c)
    c[0] = 100
    print('updated:', c)
    c[4] = -10.88      # float를 넣어도 원래 type인 int로 바뀌어서 들어간다
    print('updated2:', c)
    print(c.dtype)
    return None

def testNumpyArray4():
    c = np.array([100,2,3,4,-10])
    d = c[1:3]
    print(d)
    #d[1:3] = 30,40  # ValueError: could not broadcast input array from shape (2,) into shape (1,)
    print(d)
    return None

def main():
    testNumpyArray()
    print('--------------------------')
    testNumpyArray2()
    print('--------------------------')
    testNumpyArray3()
    print('--------------------------')
    testNumpyArray4()
    return None

if __name__ == '__main__':
    main()
```
```
a type : <class 'numpy.ndarray'> and element type :int64
[1 2 3 4 5]
------type is i2
size : 5
ndim : 1
shape :  (5,)
nbytes :  10
itemsize :  2

------type is i4
size : 5
ndim : 1
shape :  (5,)
nbytes :  20
itemsize :  4

------type is i8
size : 5
ndim : 1
shape :  (5,)
nbytes :  40
itemsize :  8

------type is i2
size : 10
ndim : 1
shape :  (10,)
nbytes :  20
itemsize :  2

------type is i4
size : 10
ndim : 1
shape :  (10,)
nbytes :  40
itemsize :  4

------type is i8
size : 10
ndim : 1
shape :  (10,)
nbytes :  80
itemsize :  8

--------------------------
dtype : float64
nbytes : 40
shape : (5,)
itemsize : 8
--------------------------
[10  2  3  4  5]
updated: [100   2   3   4   5]
updated2: [100   2   3   4 -10]
int32
--------------------------
[2 3]
[2 3]
```