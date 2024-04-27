---
layout: single
title:  "딥러닝을 이용한 자연어 처리-01"
categories : nlp-tutorial
tag : [딥러닝을 이용한 자연어 처리, nlp, python]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=딥러닝을 이용한 자연어 처리 - 1&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)





[내용 참고](https://wikidocs.net/book/2155)

&nbsp;

## 2-6 정수 인코딩

- 컴퓨터 인식을 위해 자연어 > text
  - 각 단어를 정수로 mapping 시키는 작업이 필요한 경우가 있음
    - 이를 위해 정수 인코딩을 사용

&nbsp;&nbsp;

## 1. 정수 인코딩

- 단어를 빈도수 순으로 정렬한 단어 집합 생성 -> 빈도수가 높은 순서대로 1,2,... 부여

&nbsp;

1. **dictionary 사용 예제**

- 문장 단위로 토큰화
- 불용어와 단어 길이 2이하인 경우에 대해 단어 일부 제외

~~~ python
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

raw_text = "A barber is a person. a barber is good person. a barber is huge person. he Knew A Secret! The Secret He Kept is huge secret. Huge secret. His barber kept his word. a barber kept his word. His barber kept his secret. But keeping and keeping such a huge secret to himself was driving the barber crazy. the barber went up a huge mountain."

# 문장 토큰화
sentences = sent_tokenize(raw_text)
print(sentences)

>> ['A barber is a person.', 'a barber is good person.', 'a barber is 		huge person.', 'he Knew A Secret!', 'The Secret He Kept is huge 				secret.', 'Huge secret.', 'His barber kept his word.', 'a barber kept 	his word.', 'His barber kept his secret.', 'But keeping and keeping 		such a huge secret to himself was driving the barber crazy.', 'the 			barber went up a huge mountain.']


vocab = {}
preprocessed_sentences = []
stop_words = set(stopwords.words('english'))

for sentence in sentences:
    # 단어 토큰화
    tokenized_sentence = word_tokenize(sentence)
    result = []

    for word in tokenized_sentence:
      # 모든 단어를 소문자화하여 단어의 개수를 줄인다.
        word = word.lower() 
        # 단어 토큰화 된 결과에 대해서 불용어를 제거한다.
        if word not in stop_words:
          # 단어 길이가 2이하인 경우에 대하여 추가로 단어를 제거한다.
            if len(word) > 2: 
                result.append(word)
                if word not in vocab:
                    vocab[word] = 0 
                vocab[word] += 1
    preprocessed_sentences.append(result) 
print(preprocessed_sentences)

>> [['barber', 'person'], ['barber', 'good', 'person'], ['barber', 'huge', 'person'], ['knew', 'secret'], ['secret', 'kept', 'huge', 'secret'], ['huge', 'secret'], ['barber', 'kept', 'word'], ['barber', 'kept', 'word'], ['barber', 'kept', 'secret'], ['keeping', 'keeping', 'huge', 'secret', 'driving', 'barber', 'crazy'], ['barber', 'went', 'huge', 'mountain']]
~~~

- vocab 안의 단어 빈도수 

~~~ python
print('단어 집합 :',vocab)

>> 단어 집합 : {'barber': 8, 'person': 3, 'good': 1, 'huge': 5, 'knew': 1, 'secret': 6, 'kept': 4, 'word': 2, 'keeping': 2, 'driving': 1, 'crazy': 1, 'went': 1, 'mountain': 1}

# 'barber'라는 단어의 빈도수 출력
print(vocab["barber"])
>> 8

## 빈도수 높은 순서로 정렬
vocab_sorted = sorted(vocab.items(), key = lambda x:x[1], reverse = True)

print(vocab_sorted)
>> [('barber', 8), ('secret', 6), ('huge', 5), ('kept', 4), ('person', 3), ('word', 2), ('keeping', 2), ('good', 1), ('knew', 1), ('driving', 1), ('crazy', 1), ('went', 1), ('mountain', 1)]
~~~

- 높은 빈도수 > 낮은 정수로 부여

~~~ python
word_to_index = {}
i = 0
for (word, frequency) in vocab_sorted :
    if frequency > 1 : # 빈도수가 작은 단어는 제외.
        i = i + 1
        word_to_index[word] = i

print(word_to_index)
>> {'barber': 1, 'secret': 2, 'huge': 3, 'kept': 4, 'person': 5, 'word': 6, 'keeping': 7}
~~~

- 상위 5개의 단어만 사용시

~~~ python
vocab_size = 5

# 인덱스가 5 초과인 단어 제거
words_frequency = [word for word, index in word_to_index.items() if index >= vocab_size + 1]

# 해당 단어에 대한 인덱스 정보를 삭제
for w in words_frequency:
    del word_to_index[w]
print(word_to_index)

>> {'barber': 1, 'secret': 2, 'huge': 3, 'kept': 4, 'person': 5}
~~~

- 단어의 vocabulary에 없는 key를 위한 OOV 추가 (Out-Of-Vocabulary)

~~~ python
word_to_index['OOV'] = len(word_to_index) + 1
print(word_to_index)

>> {'barber': 1, 'secret': 2, 'huge': 3, 'kept': 4, 'person': 5, 'OOV': 6}

ed!encoded_sentences = []
for sentence in preprocessed_sentences:
    encoded_sentence = []
    for word in sentence:
        try:
            # 단어 집합에 있는 단어라면 해당 단어의 정수를 리턴.
            encoded_sentence.append(word_to_index[word])
        except KeyError:
            # 만약 단어 집합에 없는 단어라면 'OOV'의 정수를 리턴.
            encoded_sentence.append(word_to_index['OOV'])
    encoded_sentences.append(encoded_sentence)
print(encoded_sentences)

>> [[1, 5], [1, 6, 5], [1, 3, 5], [6, 2], [2, 4, 3, 2], [3, 2], [1, 4, 6], [1, 4, 6], [1, 4, 2], [6, 6, 3, 2, 6, 1, 6], [1, 6, 3, 6]]
~~~

&nbsp;

**2. Counter**

~~~ python
from collections import Counter

print(preprocessed_sentences)
>> [['barber', 'person'], ['barber', 'good', 'person'], ['barber', 'huge', 'person'], ['knew', 'secret'], ['secret', 'kept', 'huge', 'secret'], ['huge', 'secret'], ['barber', 'kept', 'word'], ['barber', 'kept', 'word'], ['barber', 'kept', 'secret'], ['keeping', 'keeping', 'huge', 'secret', 'driving', 'barber', 'crazy'], ['barber', 'went', 'huge', 'mountain']]

# words = np.hstack(preprocessed_sentences)으로도 수행 가능.
all_words_list = sum(preprocessed_sentences, [])
print(all_words_list)
>> ['barber', 'person', 'barber', 'good', 'person', 'barber', 'huge', 'person', 'knew', 'secret', 'secret', 'kept', 'huge', 'secret', 'huge', 'secret', 'barber', 'kept', 'word', 'barber', 'kept', 'word', 'barber', 'kept', 'secret', 'keeping', 'keeping', 'huge', 'secret', 'driving', 'barber', 'crazy', 'barber', 'went', 'huge', 'mountain']

# 파이썬의 Counter 모듈을 이용하여 단어의 빈도수 카운트
vocab = Counter(all_words_list)
print(vocab)
>> Counter({'barber': 8, 'secret': 6, 'huge': 5, 'kept': 4, 'person': 3, 'word': 2, 'keeping': 2, 'good': 1, 'knew': 1, 'driving': 1, 'crazy': 1, 'went': 1, 'mountain': 1})

## 빈도수에 따른 정수 인덱스 부여
word_to_index = {}
i = 0
for (word, frequency) in vocab :
    i = i + 1
    word_to_index[word] = i

print(word_to_index)
>> {'barber': 1, 'secret': 2, 'huge': 3, 'kept': 4, 'person': 5}
~~~

&nbsp;

**3. NLTK의 FreqDist 사용**

- 위와 동일한 내용 다만 NLTK 의 FreqDist로도 사용이 가능

``` python 
from nltk import FreqDist
import numpy as np

np.hstack으로 문장 구분을 제거

vocab = FreqDist(np.hstack(preprocessed_sentences))

# 등장 빈도수가 높은 상위 5개의 단어만 저장

vocab_size = 5
vocab = vocab.most_common(vocab_size) 

word_to_index = {word[0] : index + 1 for index, word in enumerate(vocab)}
print(word_to_index)

>> {'barber': 1, 'secret': 2, 'huge': 3, 'kept': 4, 'person': 5}
```

&nbsp;

## 2. keras 텍스트 전처리

- keras에서 기본적인 전처리를 위한 도구 제공

~~~ python
from tensorflow.keras.preprocessing.text import Tokenizer

preprocessed_sentences = [['barber', 'person'], ['barber', 'good', 'person'], ['barber', 'huge', 'person'], ['knew', 'secret'], ['secret', 'kept', 'huge', 'secret'], ['huge', 'secret'], ['barber', 'kept', 'word'], ['barber', 'kept', 'word'], ['barber', 'kept', 'secret'], ['keeping', 'keeping', 'huge', 'secret', 'driving', 'barber', 'crazy'], ['barber', 'went', 'huge', 'mountain']]

tokenizer = Tokenizer()

# fit_on_texts()안에 코퍼스를 입력으로 하면 빈도수를 기준으로 단어 집합을 생성.
tokenizer.fit_on_texts(preprocessed_sentences) 

### fit_on_texts는 입력한 텍스트로부터 단어 빈도수가 높은 순으로 낮은 정수 인덱스 부여
### word_index를 통해서 확인 가능
print(tokenizer.word_index)
>> {'barber': 1, 'secret': 2, 'huge': 3, 'kept': 4, 'person': 5, 'word': 6, 'keeping': 7, 'good': 8, 'knew': 9, 'driving': 10, 'crazy': 11, 'went': 12, 'mountain': 13}

### 각 단어의 빈도수가 높은 순서대로 인덱스가 부여됨, 확인시 word_counts 사용
print(tokenizer.word_counts)
>> OrderedDict([('barber', 8), ('person', 3), ('good', 1), ('huge', 5), ('knew', 1), ('secret', 6), ('kept', 4), ('word', 2), ('keeping', 2), ('driving', 1), ('crazy', 1), ('went', 1), ('mountain', 1)])

### texts_to_sequences를 통해서 입력으로 들어온 코퍼스에 대해 정해진 인덱스 부여
print(tokenizer.texts_to_sequences(preprocessed_sentences))
>> [[1, 5], [1, 8, 5], [1, 3, 5], [9, 2], [2, 4, 3, 2], [3, 2], [1, 4, 6], [1, 4, 6], [1, 4, 2], [7, 7, 3, 2, 10, 1, 11], [1, 12, 3, 13]]

### keras 토크나이저 높은 빈도 5개 
vocab_size = 5
tokenizer = Tokenizer(num_words = vocab_size + 1) # 상위 5개 단어만 사용
tokenizer.fit_on_texts(preprocessed_sentences)

print(tokenizer.word_index)
>>{'barber': 1, 'secret': 2, 'huge': 3, 'kept': 4, 'person': 5, 'word': 6, 'keeping': 7, 'good': 8, 'knew': 9, 'driving': 10, 'crazy': 11, 'went': 12, 'mountain': 13}

print(tokenizer.texts_to_sequences(preprocessed_sentences))
>> [[1, 5], [1, 5], [1, 3, 5], [2], [2, 4, 3, 2], [3, 2], [1, 4], [1, 4], [1, 4, 2], [3, 2, 1], [1, 3]]

~~~

- 지정된 num_words만 남기는 방법

~~~ python
tokenizer = Tokenizer()
tokenizer.fit_on_texts(preprocessed_sentences)

vocab_size = 5
words_frequency = [word for word, index in tokenizer.word_index.items() if index >= vocab_size + 1] 

# 인덱스가 5 초과인 단어 제거
for word in words_frequency:
    del tokenizer.word_index[word] # 해당 단어에 대한 인덱스 정보를 삭제
    del tokenizer.word_counts[word] # 해당 단어에 대한 카운트 정보를 삭제

print(tokenizer.word_index)
print(tokenizer.word_counts)
print(tokenizer.texts_to_sequences(preprocessed_sentences))

>> {'barber': 1, 'secret': 2, 'huge': 3, 'kept': 4, 'person': 5}
OrderedDict([('barber', 8), ('person', 3), ('huge', 5), ('secret', 6), ('kept', 4)])
[[1, 5], [1, 5], [1, 3, 5], [2], [2, 4, 3, 2], [3, 2], [1, 4], [1, 4], [1, 4, 2], [3, 2, 1], [1, 3]]
~~~

- OOV 보존
  - keras tokenizer는 기본적으로 'OOV'의 인덱스를 1로 잡음

~~~ python
# 숫자 0과 OOV를 고려해서 단어 집합의 크기는 +2
vocab_size = 5
tokenizer = Tokenizer(num_words = vocab_size + 2, oov_token = 'OOV')
tokenizer.fit_on_texts(preprocessed_sentences)

print('단어 OOV의 인덱스 : {}'.format(tokenizer.word_index['OOV']))
>> 단어 OOV의 인덱스 : 1

### 코퍼스에 대한 정수 인코딩 
print(tokenizer.texts_to_sequences(preprocessed_sentences))
>> [[2, 6], [2, 1, 6], [2, 4, 6], [1, 3], [3, 5, 4, 3], [4, 3], [2, 5, 1], [2, 5, 1], [2, 5, 3], [1, 1, 4, 3, 1, 2, 1], [2, 1, 4, 1]]

### 'good'과 같이 등록되지 않은 단어는 모두 'OOV'의 index 1로 지정
~~~



