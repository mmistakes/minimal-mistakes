---
layout: single
title: "토스 채용공고 분석 - 워드클라우드"
categories: 데이터_시각화
tag:
  [
  	토스, 
  	지원,
  	공공서비스,
  	채용,
  	공고
    python,
    crawling,
    blog,
    github,
    파이썬,
    시각화,
    워드클라우드,
    기초,
    트렌드,
    파악,
    마케팅
  ]
toc: true
sidebar:
  nav: "docs"
---

## 채용공고 분석

```
지원서 쓰기 전, 채용공고를 워드클라우드로 분석해보는 건 어떨까?
```



### 워드클라우드 결과 
![토스 워드클라우드](https://user-images.githubusercontent.com/67591105/154791124-9e182b42-b41a-4cc9-88c7-43d66a538714.png)



###  분석대상 텍스트 

```
합류하시면 함께 할 업무입니다

점차 확장되고 있는 토스의 공공서비스 영역을 개척하는 역할을 수행하며, 정부 및 준정부기관들과의 대외 연계 및 협업을 진행합니다.
토스 공공서비스의 확장을 위한 사업전략을 수립하고, 정부기관과의 제휴 및 협업 전략을 이행합니다.
공공서비스 사업을 선제 탐색하고 정부기관에 제안하며, 관련 팀과 협력하고 제품을 성공적으로 만들어나가는 업무를 담당합니다.
이런 경험을 가진 분을 찾습니다

영업/사업개발/제휴 경험이 4년 이상 필요합니다.
공공기관과의 대외 부문에서, 자기주도적으로 사업 개발을 수행해본 경험이 필요합니다
입법부 혹은 행정부를 대상으로 커뮤니케이션을 주도하여 문제를 해결 해보신 경험이 필요합니다.
탁월한 커뮤니케이션으로 기관과 관계를 구축하고, 제휴를 성공적으로 이끌어 내는 능력이 필요합니다.
새로운 사업을 탐색하고 기대효과를 분석하여, 이를 대내외에 제안하고 사업을 만들어가는 분이 필요합니다
이런 경험이 있다면 더 좋습니다

기관에 소속되어 입법부 혹은 행정부를 대상으로 기관이 당면한 문제를 개선하기 위한 커뮤니케이션을 주도하고 문제를 해결하여 목표한 비즈니스를 성공적으로 달성해보신 분이라면 더 좋습니다.
입법부와 행정부 내 탄탄한 인적 네트워크를 보유하신 분이라면 더 좋습니다.
토스로의 합류 여정

서류 접수 > 직무 인터뷰 > 문화적합성 인터뷰 > 최종 합격

동료의 한마디

어렵고 번거롭게 느껴졌던 공공서비스를 토스앱안에서 단한번에 이용할 수 있도록
변화를 만들기 시작했습니다. 일상 생활에 불편했던 순간들을 토스에서 해결해준다면
우리 모두의 삶이 얼마나 편리해질까요? 그동안 몰라서 놓쳤던 공공서비스들을 
토스에서 친절히 알려준다면 얼마나 좋을까요?

그러한 우리의 일상을 함께 만들어나갈 열정과 사명감 넘치는 동료를 기다립니다.
```




### 워드클라우드 코드 

```python
# 워드클라우드 IMPORT

import matplotlib.pyplot as plt # 시각화
from konlpy.tag import Okt # 형태소분석기 : Openkoreatext
from collections import Counter # 빈도 수 세기
from wordcloud import WordCloud, STOPWORDS # wordcloud 만들기

# 한글폰트 설정 
mpl.rcParams['font.family'] = 'Malgun Gothic'
mpl.rcParams['font.size'] = 20
mpl.rcParams['axes.unicode_minus'] = False    # 마이너스 깨짐 방

# 텍스트 불러오기
text = open('word.txt', encoding='utf-8-sig').read()

# 형태소 분석기를 통해 명사만 추출하는 함수
def token_konlpy(text):
    okt=Okt()
    return [word for word in okt.nouns(text) if len(word)>1] # 1글자 명사는 제외    

noun = token_konlpy(text)
len(noun)

noun_set = set(noun) # 중복값 제거
                    # stopwords 변수 만들어서, 차집합으로 빼기 
len(noun_set)

# 텍스트 파일로 저장
f = open('noun_set.txt','w', encoding='utf-8')
f.write(str(noun_set))
f.close()

# 추출된 명사들의 빈도수 카운트 
count = Counter(noun)
count.pop('토스') # 키워드 제외
len(count)

# 빈도수 상위 15개 까지 딕셔너리 형태로 자료 변환 {'noun':'key'}
word = dict(count.most_common(15))

#wordcloud 만들기
wc = WordCloud(max_font_size=200, font_path = 'C:\Windows\Fonts\malgun.ttf',background_color="white",width=2000, height=500).generate_from_frequencies(word) # font 경로 개별적으로 설정해야함

plt.figure(figsize = (40,40))
plt.imshow(wc)
plt.tight_layout(pad=0)
plt.axis('off')
plt.show()
```

​     

