---
layout: single
title: numpy 2. 연산자와 shape
tags: numpy_pandas
---
    
## numpy 2. 연산



## 예제 4_3

```python
# vector addition, hadammard & dot product
import numpy as np

def testBasicOp():
    a = np.array([1,2,3,4,5])
    b = np.array([-1,-2,-3,-4,-5])

    # addition
    print('a[] + b[] =', a+b)
    # hadamard product
    print('a[] * b[] =', a*b)
    # inner product
    print('a[] dot b[] =', a.dot(b))

    return None

def testOp2():
    a = np.array([1, np.pi, np.pi/2, 1/np.pi, np.pi/4])
    # mean
    avg = a.mean()
    print('avg :', avg)
    # min/max
    mina = a.min()
    print('min :',mina)
    # sin/cos
    arr_sin = np.sin(a)
    print('sin :',arr_sin)

    # floor
    x = np.floor(a[1])
    print(x)
    # ceil
    x = np.ceil(a[1])
    print(x)

    # gcd
    b = np.array([13413,1241])
    #print(np.gcd(b))

    return None

def testOp3():
    a = np.array([1,2,3,4,5])
    b = np.linspace(-2,2, num=5)
    print('Line space b[] :',b, 'of elt type:', b.dtype, sep='')
    #c = a + b
    #d = a * b
    #e = b.dot(a)
    #e2 = np.dot(a,b)
    return None

def main():
    testBasicOp()
    print('-----------------')
    testOp2()
    print('-----------------')
    testOp3()
    return None

if __name__ == '__main__':
    main()
```

```
a[] + b[] = [0 0 0 0 0]
a[] * b[] = [ -1  -4  -9 -16 -25]
a[] dot b[] = -55
-----------------
avg : 1.3632194059931857
min : 0.3183098861837907
sin : [8.41470985e-01 1.22464680e-16 1.00000000e+00 3.12961796e-01
 7.07106781e-01]
3.0
4.0
-----------------
Line space b[] :[-2. -1.  0.  1.  2.]of elt type:float64

C:\Users\noir1\Documents\git\numpy_pandas>C:/Users/noir1/AppData/Local/Programs/Python/Python310/python.exe c:/Users/noir1/Documents/git/numpy_pandas/lab4_3.py
a[] + b[] = [0 0 0 0 0]
a[] * b[] = [ -1  -4  -9 -16 -25]
a[] dot b[] = -55
-----------------
avg : 1.3632194059931857
min : 0.3183098861837907
sin : [8.41470985e-01 1.22464680e-16 1.00000000e+00 3.12961796e-01
 7.07106781e-01]
3.0
4.0
-----------------
Line space b[] :[-2. -1.  0.  1.  2.]of elt type:float64
```


## 예제 4_4

```python
# 2-dim Numpy array => matrix
import numpy as np

def dim2test():
    # creating a 3x3 matrix
    a = [[1,2,3],[4,5,6],[7,8,9]]
    A = np.array(a, dtype='i4')
    print('Matrix :A\n', A)

    # slicing
    b = A[0:2,1]
    c = A[1,0:2]
    print('Sliced vector b[]:', b)
    print('sliced vec c[] :',c)
    return None

def main():
    dim2test()
    return None

if __name__ == '__main__':
    main()
```
```
Matrix :A
 [[1 2 3]
 [4 5 6]
 [7 8 9]]
Sliced vector b[]: [2 5]
sliced vec c[] : [4 5]
```


## 예제 4_5

```python
# arrange, reshape, resize, transpose (or T)
import numpy as np
import time

def testNp1():
    a = np.arange(20)
    print('a ranged vector :',a)

    A = a.reshape((2,10))   # reshape - method
    print(A)
    B = np.resize(a,(4,2))  # resize - element 개수가 바뀐다, numpy function
    print(B)
    print(B.transpose())    # transpose - method (data 바뀌지 않음)
    
    # 아래 두개의 차이에 유의
    print(A[:2,1])
    print(A[:2][1])
    return None
def testNp2():
    dt_student = np.dtype([
        ('Name', np.unicode_, 10), # name tag S10
        ('Age', np.int16), # age tag i4
        ('Height', np.float32), # height f
        ('Children/Pets', np.int8, 2)  # child/pets i4
    ]
    )
    student = np.array([
        ('아이유',45,1.70,(0,1)),
        ('Jones',53,1.60,(2,2)),
        ('Kim',20,1.60,(1,1))
    ]
        , dtype= dt_student)
    arr_name_student = student["Name"]
    print(arr_name_student)
    arr_height_student = student["Height"]
    print(arr_height_student.mean())

    return None

def testNp3():
    np.random.seed(int(time.time()))
    A = np.arange(12).reshape((4,3))
    print('print random 4x3 matrix A')
    print(A)
    B = np.random.randint(1,10,12,dtype=np.int32).reshape((2,6))
    # [1,10) random 12개 int
    print(B)

    return None

def main():
    testNp1()
    print('--------------')
    testNp2()
    print('--------------')
    testNp3()
    return None

if __name__ == '__main__':
    main()
```
```
a ranged vector : [ 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19]
[[ 0  1  2  3  4  5  6  7  8  9]
 [10 11 12 13 14 15 16 17 18 19]]
[[0 1]
 [2 3]
 [4 5]
 [6 7]]
[[0 2 4 6]
 [1 3 5 7]]
[ 1 11]
[10 11 12 13 14 15 16 17 18 19]
--------------
['아이유' 'Jones' 'Kim']
1.6333333
--------------
print random 4x3 matrix A
[[ 0  1  2]
 [ 3  4  5]
 [ 6  7  8]
 [ 9 10 11]]
[[2 9 5 7 8 3]
 [3 9 8 9 1 8]]
```