---
layout: single
title:  "딥러닝을 이용한 자연어 처리 - 3"
categories : nlp-tutorial
tag : [딥러닝을 이용한 자연어 처리, nlp, python]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=딥러닝을 이용한 자연어 처리 - 3&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

[내용 참고](https://wikidocs.net/book/2155)

&nbsp;

# 원-핫 인코딩

- 단어 집합의 크기를 벡터의 차원으로 하고, 표현하고 싶은 단어의 인덱스에 1의 값을 부여
  - 다른 인덱스는 0을 부여하는 단어의 벡터 표현방법

- 두가지 과정으로 정리
  - 정수 인코딩 수행, 단어에 고유값 부여
  - 표현하고 싶은 단어의 고유한 정수를 인덱스로 간주하고 해당 위치에 1을 부여, 다른 단어의 인덱스의 위치에는 0을 부여

&nbsp;

**예시**

- 문장 : 나는 자연어 처리를 배운다
  - Okt 형태소 분석기를 통해서 문장에 대해서 토큰화를 수행

~~~ python
from konlpy.tag import Okt  

okt = Okt()  
tokens = okt.morphs("나는 자연어 처리를 배운다")  
print(tokens)

>> ['나', '는', '자연어', '처리', '를', '배운다']

## 이후에 고유값 부여, 빈도수 기준
word_to_index = {word : index for index, word in enumerate(tokens)}
print('단어 집합 :',word_to_index)

>> 단어 집합 : {'나': 0, '는': 1, '자연어': 2, '처리': 3, '를': 4, '배운다': 5}
~~~

&nbsp;

~~~ python
def one_hot_encoding(word, word_to_index):
  one_hot_vector = [0]*(len(word_to_index))
  index = word_to_index[word]
  one_hot_vector[index] = 1
  return one_hot_vector

one_hot_encoding("자연어", word_to_index)
>> [0, 0, 1, 0, 0, 0]  
~~~

&nbsp;

## 2. keras를 이용한 원-핫 인코딩

- keras는 to_categorical() 지원
- 단어 집합(vocabulary)에 있는 단어들로만 구성된 텍스트가 있다면, texts_to_sequences()를 통해서 이를 정수 시퀀스로 변환 가능

~~~ python
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.utils import to_categorical

text = "나랑 점심 먹으러 갈래 점심 메뉴는 햄버거 갈래 갈래 햄버거 최고야"

tokenizer = Tokenizer()
tokenizer.fit_on_texts([text])
print('단어 집합 :',tokenizer.word_index)
>> 단어 집합 : {'갈래': 1, '점심': 2, '햄버거': 3, '나랑': 4, '먹으러': 5, '메뉴는': 6, '최고야': 7}

sub_text = "점심 먹으러 갈래 메뉴는 햄버거 최고야"
encoded = tokenizer.texts_to_sequences([sub_text])[0]
print(encoded)
>> [2, 5, 1, 6, 3, 7]

one_hot = to_categorical(encoded)
print(one_hot)

>> [[0. 0. 1. 0. 0. 0. 0. 0.] # 인덱스 2의 원-핫 벡터
 [0. 0. 0. 0. 0. 1. 0. 0.] # 인덱스 5의 원-핫 벡터
 [0. 1. 0. 0. 0. 0. 0. 0.] # 인덱스 1의 원-핫 벡터
 [0. 0. 0. 0. 0. 0. 1. 0.] # 인덱스 6의 원-핫 벡터
 [0. 0. 0. 1. 0. 0. 0. 0.] # 인덱스 3의 원-핫 벡터
 [0. 0. 0. 0. 0. 0. 0. 1.]] # 인덱스 7의 원-핫 벡터

~~~

&nbsp;

## 원-핫 인코딩의 한계

- 단어에 따라 비효율적인 크기가 계속해서 늘어남

- 단어간의 유사도를 표현하지 못함

  > 이를 해결하기 위해 잠재 의미를 반영한 다차원 공간에 vector화
  >
  > 크게 3가지 
  >
  > - LSA(잠재 의미 분석), HAL 등
  > - 예측 기반으로 vector화 하는 NNLM, RNNLM, Word2Vec, FastText 존재
  > - count 기반과 예측 기반 두가지 모두 사용하는 GloVe