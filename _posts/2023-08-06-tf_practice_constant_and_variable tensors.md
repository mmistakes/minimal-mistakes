```python
import numpy as np
import tensorflow as tf
print(tf.__version__)
```

    2.11.1


# Constant & Variable Tensors

* 텐서플로우는 텐서라는 객체를 기반으로 작동함
* 텐서는 크게 Variable, Constant tensor로 나뉜다
* 텐서를 두 종류로 구분하는 이유
    * 딥러닝 시스템을 크게 구분하면 트레이닝이 필요한 모델 부분, 트레이닝이 필요없는 데이터셋 부분으로 나눌 수 있음
    * 트레이닝이 필요 없는 부분은 바꿔 말하면 업데이트가 필요 없다. 따라서 immutable한 객체로 만들어줌
    * 반면 트레이닝을 통해 값의 변화가 필요한 부분은 mutable 객체로 만들어준다.
* Type of constant tensor = EagerTensor
* Type of variable tensor = ResourceVariable


```python
t1 = tf.Variable([1,2,3])
t2 = tf.constant([1,2,3])
print(t1)
print(t2)
print('===')
print(type(t1))
print(type(t2))
```

    <tf.Variable 'Variable:0' shape=(3,) dtype=int32, numpy=array([1, 2, 3], dtype=int32)>
    tf.Tensor([1 2 3], shape=(3,), dtype=int32)
    ===
    <class 'tensorflow.python.ops.resource_variable_ops.ResourceVariable'>
    <class 'tensorflow.python.framework.ops.EagerTensor'>


## python list, numpy array 역시 tf.tensor로 변환하여 활용 가능


```python
ls = [1,2,3]
arr = np.array(ls)

t1 = tf.constant(ls)
t2 = tf.constant(arr)
print(t1)
print(t2)
print(type(t1))
print(type(t2))

```

    tf.Tensor([1 2 3], shape=(3,), dtype=int32)
    tf.Tensor([1 2 3], shape=(3,), dtype=int64)
    <class 'tensorflow.python.framework.ops.EagerTensor'>
    <class 'tensorflow.python.framework.ops.EagerTensor'>



```python
ls = [1,2,3]
arr = np.array(ls)

t1 = tf.Variable(ls)
t2 = tf.Variable(arr)
print(t1)
print(t2)
print(type(t1))
print(type(t2))

```

    <tf.Variable 'Variable:0' shape=(3,) dtype=int32, numpy=array([1, 2, 3], dtype=int32)>
    <tf.Variable 'Variable:0' shape=(3,) dtype=int64, numpy=array([1, 2, 3])>
    <class 'tensorflow.python.ops.resource_variable_ops.ResourceVariable'>
    <class 'tensorflow.python.ops.resource_variable_ops.ResourceVariable'>


## Tensor 연산

* Constant와 Variable 텐서의 합은 EagerTensor 반환


```python
t1 = tf.Variable([1,2,3])
t2 = tf.constant([1,2,3])
t3 = t1 + t2
print(type(t3))
```

    <class 'tensorflow.python.framework.ops.EagerTensor'>

