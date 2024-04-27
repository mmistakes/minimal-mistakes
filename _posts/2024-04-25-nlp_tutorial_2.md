---
layout: single
title:  "딥러닝을 이용한 자연어 처리 - 2"
date: 2024-04-25
categories : nlp-tutorial
tag : [nlp-study, 딥러닝을 이용한 자연어 처리,python]
toc: true
toc_sticky: true
order: 2
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=딥러닝을 이용한 자연어 처리 - 2&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

[내용 참고](https://wikidocs.net/book/2155)

&nbsp;

# 패딩

- 자연어 처리중 문장의 길이가 다른 문제가 발생할수 있음, 하지만 system은 전체를 하나의 행렬로 판단
- 여러 문장의 길이를 임의로 동일하게 맞춰주는 작업이 필요함



## 1. numpy 패딩

~~~ python 
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer


## 단어 집합
preprocessed_sentences = [['barber', 'person'], ['barber', 'good', 'person'], ['barber', 'huge', 'person'], ['knew', 'secret'], ['secret', 'kept', 'huge', 'secret'], ['huge', 'secret'], ['barber', 'kept', 'word'], ['barber', 'kept', 'word'], ['barber', 'kept', 'secret'], ['keeping', 'keeping', 'huge', 'secret', 'driving', 'barber', 'crazy'], ['barber', 'went', 'huge', 'mountain']]

### 단어 집합 -> 정수 인코딩
tokenizer = Tokenizer()
tokenizer.fit_on_texts(preprocessed_sentences)
encoded = tokenizer.texts_to_sequences(preprocessed_sentences)
print(encoded)
>> [[1, 5], [1, 8, 5], [1, 3, 5], [9, 2], [2, 4, 3, 2], [3, 2], [1, 4, 6], [1, 4, 6], [1, 4, 2], [7, 7, 3, 2, 10, 1, 11], [1, 12, 3, 13]]
~~~

- 동일한 길이로 맞추기 위해 문장의 최대길이 계산

~~~ python
max_len = max(len(item) for item in encoded)
print('최대 길이 :',max_len)

>> 최대 길이 : 7
~~~

&nbsp;

- 최대 길이인 7에 모든 문장을 맞추기, 'PAD' 사용

  - 길이가 7보다 작은경우 남은 공간을 0으로 채우기

    > 데이터에 특정 값을 채워서 데이터의 크기를 제조정하는 것을 패딩, 그중에서 숫자 0을 사용하는 것을 **제로 패딩**

~~~ python
for sentence in encoded:
    while len(sentence) < max_len:
        sentence.append(0)

padded_np = np.array(encoded)
padded_np

>> array([[ 1,  5,  0,  0,  0,  0,  0],
       [ 1,  8,  5,  0,  0,  0,  0],
       [ 1,  3,  5,  0,  0,  0,  0],
       [ 9,  2,  0,  0,  0,  0,  0],
       [ 2,  4,  3,  2,  0,  0,  0],
       [ 3,  2,  0,  0,  0,  0,  0],
       [ 1,  4,  6,  0,  0,  0,  0],
       [ 1,  4,  6,  0,  0,  0,  0],
       [ 1,  4,  2,  0,  0,  0,  0],
       [ 7,  7,  3,  2, 10,  1, 11],
       [ 1, 12,  3, 13,  0,  0,  0]])

~~~

&nbsp;

## 2. 케라스 전처리 도구로 패딩하기

- 케라스에서의 zero-padding을 위해 pad_sequences 제공
- pad_sequences는 기본적으로 문서의 앞에서 부터 0 채움
  - 뒤에 붙일경우 padding='post'

~~~ python
from tensorflow.keras.preprocessing.sequence import pad_sequences


encoded = tokenizer.texts_to_sequences(preprocessed_sentences)
print(encoded)

>> [[1, 5], [1, 8, 5], [1, 3, 5], [9, 2], [2, 4, 3, 2], [3, 2], [1, 4, 6], [1, 4, 6], [1, 4, 2], [7, 7, 3, 2, 10, 1, 11], [1, 12, 3, 13]]

padded = pad_sequences(encoded)
padded

>> array([[ 0,  0,  0,  0,  0,  1,  5],
       [ 0,  0,  0,  0,  1,  8,  5],
       [ 0,  0,  0,  0,  1,  3,  5],
       [ 0,  0,  0,  0,  0,  9,  2],
       [ 0,  0,  0,  2,  4,  3,  2],
       [ 0,  0,  0,  0,  0,  3,  2],
       [ 0,  0,  0,  0,  1,  4,  6],
       [ 0,  0,  0,  0,  1,  4,  6],
       [ 0,  0,  0,  0,  1,  4,  2],
       [ 7,  7,  3,  2, 10,  1, 11],
       [ 0,  0,  0,  1, 12,  3, 13]], dtype=int32)
~~~

&nbsp;

- 길이 제한을 두고 padding 수행
  - 문서 5000자가 max 값일경우 5000 기준 padding할 필요없이 제한을 두는것이 가능
  - 문서의 길이가 maxlen의 수보다 큰 경우는 소실이 발생, 소실되는 위치는 truncating='post'를 통해서 조절

~~~ python
padded = pad_sequences(encoded, padding='post', maxlen=5)
padded

>> array([[ 1,  5,  0,  0,  0],
       [ 1,  8,  5,  0,  0],
       [ 1,  3,  5,  0,  0],
       [ 9,  2,  0,  0,  0],
       [ 2,  4,  3,  2,  0],
       [ 3,  2,  0,  0,  0],
       [ 1,  4,  6,  0,  0],
       [ 1,  4,  6,  0,  0],
       [ 1,  4,  2,  0,  0],
       [ 3,  2, 10,  1, 11],
       [ 1, 12,  3, 13,  0]], dtype=int32)
~~~

&nbsp;

- 기본적으로 숫자 0으로 패딩하는 것은 기본적으로 사용되지만, 0이 아닌 다른 숫자로 사용하고 싶다면 **현재 사용된 정수와 겹치지 않도록 단어 집합의 크기에 +1**

~~~ python
# 단어 집합의 크기보다 1 큰 숫자를 사용
last_value = len(tokenizer.word_index) + 1 
print(last_value)

## 적용
padded = pad_sequences(encoded, padding='post', value=last_value)
padded

>> array([[ 1,  5, 14, 14, 14, 14, 14],
       [ 1,  8,  5, 14, 14, 14, 14],
       [ 1,  3,  5, 14, 14, 14, 14],
       [ 9,  2, 14, 14, 14, 14, 14],
       [ 2,  4,  3,  2, 14, 14, 14],
       [ 3,  2, 14, 14, 14, 14, 14],
       [ 1,  4,  6, 14, 14, 14, 14],
       [ 1,  4,  6, 14, 14, 14, 14],
       [ 1,  4,  2, 14, 14, 14, 14],
       [ 7,  7,  3,  2, 10,  1, 11],
       [ 1, 12,  3, 13, 14, 14, 14]], dtype=int32)
~~~

