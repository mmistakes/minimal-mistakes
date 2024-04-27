---
layout: single
title:  "딥러닝을 이용한 자연어 처리 - 11"
categories : nlp-tutorial
tag : [nlp-study, 딥러닝을 이용한 자연어 처리,python]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=딥러닝을 이용한 자연어 처리 - 11&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

[내용 참고](https://wikidocs.net/book/2155)

&nbsp;

# Bag of Words(BoW)

- 단어의 등장 순서를 고려하지 않는 빈도수 기반의 단어 표현 방법인 Bag of Words

&nbsp;

## 1. Bag of Words란?

- 단어들의 순서는 전혀 고려하지 않고, 단어들의 출현 빈도에만 집중하는 텍스트 데이터의 수치화 표현 방법
  
- Bow 만드는 과정
  
  ~~~ markdown
  (1) 각 단어에 고유한 정수 인덱스를 부여합니다.  # 단어 집합 생성.
  (2) 각 인덱스의 위치에 단어 토큰의 등장 횟수를 기록한 벡터를 만듭니다.  
  ~~~

- EX 1) **정부가 발표하는 물가상승률과 소비자가 느끼는 물가상승률은 다르다.**

  - 입력된 문서에 대해서 단어 집합을 만들어 각 단어에 정수 인덱스를 할당하고, BoW를 만들어 각 단어에 정수 인덱스를 할당하고, BoW를 생성

  ~~~ python
  from konlpy.tag import Okt
  
  okt = Okt()
  
  def build_bag_of_words(document):
    # 온점 제거 및 형태소 분석
    document = document.replace('.', '')
    tokenized_document = okt.morphs(document)
  
    word_to_index = {}
    bow = []
  
    for word in tokenized_document:  
      if word not in word_to_index.keys():
        word_to_index[word] = len(word_to_index)  
        # BoW에 전부 기본값 1을 넣는다.
        bow.insert(len(word_to_index) - 1, 1)
      else:
        # 재등장하는 단어의 인덱스
        index = word_to_index.get(word)
        # 재등장한 단어는 해당하는 인덱스의 위치에 1을 더한다.
        bow[index] = bow[index] + 1
  
    return word_to_index, bow
  
  doc1 = "정부가 발표하는 물가상승률과 소비자가 느끼는 물가상승률은 다르다."
  vocab, bow = build_bag_of_words(doc1)
  print('vocabulary :', vocab)
  print('bag of words vector :', bow)
  >> vocabulary : {'정부': 0, '가': 1, '발표': 2, '하는': 3, '물가상승률': 4, '과': 5, '소비자': 6, '느끼는': 7, '은': 8, '다르다': 9}
  bag of words vector : [1, 2, 1, 1, 2, 1, 1, 1, 1, 1]
  ~~~

&nbsp;

## 2. Bag of Words의 다른 예제들

- EX2) 소비자는 주로 소비하는 상품을 기준으로 물가상승률을 느낀다.

  ~~~python
  doc2 = '소비자는 주로 소비하는 상품을 기준으로 물가상승률을 느낀다.'
  
  vocab, bow = build_bag_of_words(doc2)
  print('vocabulary :', vocab)
  print('bag of words vector :', bow)
  
  >> vocabulary : {'소비자': 0, '는': 1, '주로': 2, '소비': 3, '하는': 4, '상품': 5, '을': 6, '기준': 7, '으로': 8, '물가상승률': 9, '느낀다': 10}
  bag of words vector : [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1]
  
  doc3 = doc1 + ' ' + doc2
  vocab, bow = build_bag_of_words(doc3)
  print('vocabulary :', vocab)
  print('bag of words vector :', bow)
  
  >> vocabulary : {'정부': 0, '가': 1, '발표': 2, '하는': 3, '물가상승률': 4, '과': 5, '소비자': 6, '느끼는': 7, '은': 8, '다르다': 9, '는': 10, '주로': 11, '소비': 12, '상품': 13, '을': 14, '기준': 15, '으로': 16, '느낀다': 17}
  bag of words vector : [1, 2, 1, 2, 3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1]
  ~~~

- BoW는 각 단어가 등장한 횟수를 수치화하는 텍스트 표현 방법이므로 주로 어떤 단어가 얼마나 등장했는지를 기준으로 문서가 어떤 성격의 문서인지를 판단하는 작업에 사용

  > 즉, 분류 문제나 여러 문서 간의 유사도를 구하는 문제에 주로 쓰입니다. 가령, '달리기', '체력', '근력'과 같은 단어가 자주 등장하면 해당 문서를 체육 관련 문서로 분류할 수 있을 것이며, '미분', '방정식', '부등식'과 같은 단어가 자주 등장한다면 수학 관련 문서로 분류

&nbsp;

## 3. CountVectorizer 클래스로 BoW 만들기

- sklearn에서 단어의 빈도 count 하여 vector로 만드는 CountVectorizer 클래스 지원
  - CountVectorizer는 기본적으로 길이가 2이상인 문자에 대해서만 토큰으로 인식
  - 띄어쓰기만을 기준으로 단어를 자르는 토큰화를 사용, 때문에 한국어에 적용시 제대로 BoW가 만들어지지 않음

~~~ python
from sklearn.feature_extraction.text import CountVectorizer

corpus = ['you know I want your love. because I love you.']
vector = CountVectorizer()

# 코퍼스로부터 각 단어의 빈도수를 기록
print('bag of words vector :', vector.fit_transform(corpus).toarray()) 

# 각 단어의 인덱스가 어떻게 부여되었는지를 출력
print('vocabulary :',vector.vocabulary_)

>> bag of words vector : [[1 1 2 1 2 1]]
vocabulary : {'you': 4, 'know': 1, 'want': 3, 'your': 5, 'love': 2, 'because': 0}
~~~

&nbsp;

## 4. 불용어를 제거한 BoW 만들기

- BoW를 만들때 불용어를 제거하는 일은 자연어 처리의 정확도를 높이기 위해 사용
- 영어의 BoW를 만들기 위해 사용하는 CountVectorizer는 불용어 지정시 제거

&nbsp;

### 1) 사용자가 직접 정의한 불용어 사용

~~~python
from sklearn.feature_extraction.text import CountVectorizer
from nltk.corpus import stopwords

text = ["Family is not an important thing. It's everything."]
vect = CountVectorizer(stop_words=["the", "a", "an", "is", "not"])
print('bag of words vector :',vect.fit_transform(text).toarray())
print('vocabulary :',vect.vocabulary_)

>> bag of words vector : [[1 1 1 1 1]]
vocabulary : {'family': 1, 'important': 2, 'thing': 4, 'it': 3, 'everything': 0}
~~~

&nbsp;

### 2) CountVectorizer에서 제공하는 자체 불용어 사용

~~~ python
text = ["Family is not an important thing. It's everything."]
vect = CountVectorizer(stop_words="english")
print('bag of words vector :',vect.fit_transform(text).toarray())
print('vocabulary :',vect.vocabulary_)

>> bag of words vector : [[1 1 1]]
vocabulary : {'family': 0, 'important': 1, 'thing': 2}
~~~

&nbsp;

### NLTK에서 지원하는 불용어 사용

~~~ python
ed!text = ["Family is not an important thing. It's everything."]
stop_words = stopwords.words("english")
vect = CountVectorizer(stop_words=stop_words)
print('bag of words vector :',vect.fit_transform(text).toarray()) 
print('vocabulary :',vect.vocabulary_)

>> bag of words vector : [[1 1 1 1]]
vocabulary : {'family': 1, 'important': 2, 'thing': 3, 'everything': 0}
~~~

&nbsp;
