---
layout: single
title:  "딥러닝을 이용한 자연어 처리 - 4"
categories : nlp-tutorial
tag : [nlp-study, 딥러닝을 이용한 자연어 처리,python]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=딥러닝을 이용한 자연어 처리 - 4&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

[내용 참고](https://wikidocs.net/book/2155)

&nbsp;

# 한국어 전처리 패키지

- KoNLPy, KSS와 같은 한국어 전처리 패키지 정리

&nbsp;

## 1. PyKoSpacing

- PyKoSpacing은 띄어쓰기가 되어있지 않은 문장을 띄어쓰기를 한 문장으로 변환해주는 패키지

~~~ python
# 설치 pip install git+https://github.com/haven-jeon/PyKoSpacing.git

new_sent = '김철수는극중두인격의사나이이광수역을맡았다.철수는한국유일의태권도전승자를가리는결전의날을앞두고10년간함께훈련한사형인유연재(김광수분)를찾으러속세로내려온인물이다.
'

from pykospacing import Spacing
spacing = Spacing()
kospacing_sent = spacing(new_sent) 

print(kospacing_sent)

>> 김철수는 극중 두 인격의 사나이 이광수 역을 맡았다. 철수는 한국 유일의 태권도 전승자를 가리는 결전의 날을 앞두고 10년간 함께 훈련한 사형인 유연재(김광수 분)를 찾으러 속세로 내려온 인물이다.
김철수는 극중 두 인격의 사나이 이광수 역을 맡았다. 철수는 한국 유일의 태권도 전승자를 가리는 결전의 날을 앞두고 10년간 함께 훈련한 사형인 유연재(김광수 분)를 찾으러 속세로 내려온 인물이다.
~~~

&nbsp;

## 2. SOYNLP를 이용한 단어 토큰화

- soynlp는 품사 태깅, 단어 토큰화 등을 지원하는 단어 토크나이저
- 비지도 학습으로 단어 토큰화를 한다는 특징
  - 자주 등장하는 단어들을 단어로 분석
  - soynlp는 내부적으로 단어 점수 표로 동작, 해당 점수는 응집 확률과 브랜칭 엔트로피를 활용
    - [응집 확률 내용](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/05/05/cohesion/)
    - [브랜칭 엔트로피](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/05/06/BranchingEntropy/)

~~~python
#설치 pip install soynlp
~~~

&nbsp;

### 1. 학습하기

- soynlp 형태소는 독립된 다른 단어들이 계속 등장한다면 해당 단어를 한 단어로 파악

- 기본적으로 학습에 기반한 tokenizer

~~~python
import urllib.request
from soynlp import DoublespaceLineCorpus
from soynlp.word import WordExtractor

urllib.request.urlretrieve("https://raw.githubusercontent.com/lovit/soynlp/master/tutorials/2016-10-20.txt", filename="2016-10-20.txt")

# 훈련 데이터를 다수의 문서로 분리
corpus = DoublespaceLineCorpus("2016-10-20.txt")
len(corpus)
>> 30091

# 일부분 출력
19  1990  52 1 22
오패산터널 총격전 용의자 검거 서울 연합뉴스 경찰 관계자들이 19일 오후 서울 강북구 오패산 터널 인근에서 사제 총기를 발사해 경찰을 살해한 용의자 성모씨를 검거하고 있다 ... 중략 ... 숲에서 발견됐고 일부는 성씨가 소지한 가방 안에 있었다
테헤란 연합뉴스 강훈상 특파원 이용 승객수 기준 세계 최대 공항인 아랍에미리트 두바이국제공항은 19일 현지시간 이 공항을 이륙하는 모든 항공기의 탑승객은 삼성전자의 갤럭시노트7을 휴대하면 안 된다고 밝혔다 ... 중략 ... 이런 조치는 두바이국제공항 뿐 아니라 신공항인 두바이월드센터에도 적용된다  배터리 폭발문제로 회수된 갤럭시노트7 연합뉴스자료사진
~~~

- 학습과정을 통해서 응집 확률과 브랜칭 엔트로피 단어 점수표를 만드는 과정이 필요

~~~python
word_extractor = WordExtractor()
word_extractor.train(corpus)
word_score_table = word_extractor.extract()

training was done. used memory 5.186 Gb
all cohesion probabilities was computed. # words = 223348
all branching entropies was computed # words = 361598
all accessor variety was computed # words = 361598
~~~

&nbsp;

### 3. SOYNLP의 응집 확률

- 응집 확률은 내부 문자열이 얼마나 응집하여 자주 등장하는지를 판단하는 척도
  -  ![image-20240426165600674](/images/2024-04-25-nlp_tutorial4/image-20240426165600674.png)
  - '반포한강공원에'라는 7의 길이를 가진 문자 시퀀스에 대해서 각 내부 문자열의 스코어를 구하는 과정
    - ![image-20240426165613088](/images/2024-04-25-nlp_tutorial4/image-20240426165613088.png)

~~~ python
word_score_table["반포한"].cohesion_forward
>> 0.08838002913645132

word_score_table["반포한강"].cohesion_forward
>> 0.19841268168224552

word_score_table["반포한강공"].cohesion_forward
>> 0.2972877884078849

word_score_table["반포한강공원"].cohesion_forward
>> 0.37891487632839754

word_score_table["반포한강공원에"].cohesion_forward
>> 0.33492963377557666
~~~

>  '반포한강공원' 보다 '반포한강공원에'의 응집도가 낮아짐, 응집도를 기준으로 하나의 단어로 판단하기 좋은건 '반포한강공원'

&nbsp;

### 4. SOYNLP의 브랜칭 엔트로피

-  Branching Entropy는 확률 분포의 엔트로피값을 사용
  - 주어진 문자열에서 다음 문자가 등장할 수 있는지 판단하는 척도
  - 하나의 완성된 단어에 가까워질수록 문맥으로 인해 점점더 정확히 예측할 수 있게 되면서 값이 줄어듦

~~~python
word_score_table["디스"].right_branching_entropy
>> 1.6371694761537934

word_score_table["디스플"].right_branching_entropy
>> -0.0

## 디스플 다음은 디스플레 오는 것이 당연해 지면서 값이 0

word_score_table["디스플레이"].right_branching_entropy
>> 3.1400392861792916

## 디스플레이 뒤는 조사가 올수 있기에 다시 값이 증가
~~~

&nbsp;

### 5. SOYNLP의 L tokenizer

- 한국어는 띄어쓰기 단위로 나눈 어절 토큰은 주로 L 토큰 + R 토큰의 형식을 가지는 경우가 많음
  - Ex) '공원에' > '공원 + 에', '공부하는' > '공부 + 하는' 
  - L 토크나이저는 L토큰 + R토큰으로 나누고, 분리 기준을 점수가 가장 높은 L토큰을 찾아내는 원리

~~~python
from soynlp.tokenizer import LTokenizer

scores = {word:score.cohesion_forward for word, score in word_score_table.items()}
l_tokenizer = LTokenizer(scores=scores)
l_tokenizer.tokenize("국제사회와 우리의 노력들로 범죄를 척결하자", flatten=False)

>> [('국제사회', '와'), ('우리', '의'), ('노력', '들로'), ('범죄', '를'), ('척결', '하자')]
~~~

&nbsp;

### 6. 최대 점수 토크나이저

- 띄어쓰기가 되지 않는 문장에서 점수가 높은 글자 시퀀스를 순차적으로 찾아내는 tokenizer

~~~python
from soynlp.tokenizer import MaxScoreTokenizer

maxscore_tokenizer = MaxScoreTokenizer(scores=scores)
maxscore_tokenizer.tokenize("국제사회와우리의노력들로범죄를척결하자")

>> ['국제사회', '와', '우리', '의', '노력', '들로', '범죄', '를', '척결', '하자']
~~~

&nbsp;

### 7. SOYNLP를 이용한 반복되는 문자 정제

- ㅋㅋ, ㅎㅎ, 이모티콘등 불필요하게 연속되는 경우를 하나로 정규화

~~~ python
from soynlp.normalizer import *

print(emoticon_normalize('앜ㅋㅋㅋㅋ이영화존잼쓰ㅠㅠㅠㅠㅠ', num_repeats=2))
print(emoticon_normalize('앜ㅋㅋㅋㅋㅋㅋㅋㅋㅋ이영화존잼쓰ㅠㅠㅠㅠ', num_repeats=2))
print(emoticon_normalize('앜ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ이영화존잼쓰ㅠㅠㅠㅠㅠㅠ', num_repeats=2))
print(emoticon_normalize('앜ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ이영화존잼쓰ㅠㅠㅠㅠㅠㅠㅠㅠ', num_repeats=2))

>> 아ㅋㅋ영화존잼쓰ㅠㅠ
아ㅋㅋ영화존잼쓰ㅠㅠ
아ㅋㅋ영화존잼쓰ㅠㅠ
아ㅋㅋ영화존잼쓰ㅠㅠ

print(repeat_normalize('와하하하하하하하하하핫', num_repeats=2))
print(repeat_normalize('와하하하하하하핫', num_repeats=2))
print(repeat_normalize('와하하하하핫', num_repeats=2))

>> 와하하핫
와하하핫
와하하핫
~~~

&nbsp;

## 3. Customized KoNLPy

- 영어권은 띄어쓰기만으로도 분리가 잘됨, 하지만 한국어는 분리가 어려움
- Customized Konlpy 패키지를 통해 토큰화시, 단어, 품사를 추가해서 사전에 반영가능

~~~python
# 설치 pip install customized_konlpy

from ckonlpy.tag import Twitter
twitter = Twitter()
twitter.morphs('은경이는 사무실로 갔습니다.')

>> ['은', '경이', '는', '사무실', '로', '갔습니다', '.']

twitter.add_dictionary('은경이', 'Noun')
twitter.morphs('은경이는 사무실로 갔습니다.')

>> ['은경이', '는', '사무실', '로', '갔습니다', '.']
~~~

