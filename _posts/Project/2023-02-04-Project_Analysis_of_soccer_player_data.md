---
layout: single
title: "[프로젝트] 축구 분석 사이트(트랜스퍼마켓)를 통한 축구 선수 데이터 비교"
categories: Project
tag: [python, Project]
toc: true
---

## 축구 분석 사이트(트랜스퍼마켓)를 통한 축구 선수 데이터 비교



## 1. 주제 선정 이유

 최근에 데이터 관련 직업이 많이 뜨고 있는 직업이다. 데이터 분야는 IT뿐만이 아니라 많은 곳에서 쓰이게 되는 분야가 되었다. 그중에 스포츠도 포함이 된다. 예전부터 야구는 데이터를 많이 사용하는 반면 축구는 그렇지는 않았다. 점점 시간이 변하면서 현대축구도 데이터로 가지고 상대를 분석하고 우리 팀을 분석해 전술을 펼친다. 기술이 발달 되면서 골, 어시스트, 선방, 슈팅 등등 수많은 영역에 데이터를 사용함으로 패턴을 찾고 분석을 한다. 그중에서 내가 선택을 한 분야는 축구 분석 사이트 통해 축구 선수별 데이터를 파이썬으로 뽑아 선수들의 데이터를 비교해보는 것이다. 
 다른 운동선수와 같이 축구 선수도 선수 생활이 다른 직업에 비해 길지 않은 직업이다. 인간은 30대가 되면 급격한 신체 능력이 떨어진다고 한다. 운동선수는 특히 10대 때부터 빠르면 더 어렸을 때부터 몸을 많이 쓰는 직업이다 보니 더 어린 선수들과 비교가 될 수밖에 없다. 그래서 보통 30대 중반이 되면 은퇴를 해 다른 직업을 갖기 시작한다. 예를 들면 축구 감독을 하거나 박지성 전 축구 선수처럼 축구 행정가가 될 수도 있고 안정환 전 축구 선수처럼 방송을 할 수도 있다. 이처럼 선수 생활이 짧은 축구 선수의 나이가 몸값에 영향을 미치는지 알아보겠다.


## 2. 데이터 분석 목표

![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/ZbdLAq9lna.png)

 이처럼 우리나라의 손흥민 선수 같은 경우 이러한 기사들이 쏟아지며 세계에서 몸값으로 몇 위 인지 아시아뿐만 아니라 EPL에서 시장가치가 어느 정도 되는지 사람들이 관심도가 쏟아진다. 축구는 인기가 많은 만큼 그만큼의 데이터의 양도 급격하게 증가하고 있다. 내가 하고자 하는 바는 파이썬 웹 크롤링을 통해 나이와 몸값의 연관성이다. 이러한 데이터를 얻기 위해 먼저 트랜스퍼마켓이라는 세계적으로 유명한 축구 사이트를 통해 자료를 수집할 수 있다. 웹 크롤링을 통해 몸값이 높은 순대로 1,000명의 선수를 크롤링하는 게 이번 보고서의 목표이다. 

## 3. 데이터 수집

**트랜스퍼마켓**은 2000년 5월에 개설된 독일의 축구 정보 전문 사이트로 해외뿐만 아니라 국내에서도 유용하게 쓰이는 축구 정보 사이트로 선수 몸값, 이적 루머, 프로필 등 각종 데이터를 확인할 수 있는 사이트이다.

**[트랜스퍼마켓 주소](https://www.transfermarkt.com/)**
{: .notice--primary}


### 3-1. 웹 크롤링 초기 설정

<div class="notice--primary" markdown="1">
1. 라이브러리 import 하기
2. 얻고자 싶은 정보 리스트에 담아두기
3. 파싱할 페이지 요청 후 담기
4. 사전형으로 데이터 파일 만들기
<div>

#### 3-2-1. 라이브러리 import 하기

```python
import requests
from bs4 import BeautifulSoup
import pandas as pd
import matplotlib.pyplot as plt
```

```python
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'}
```

먼저 데이터를 만들기 전 초기 상태에서 import와 from 구문을 통해 초기 설정을 해준다.

<div class="notice--primary" markdown="1">
**보충 설명**
 - requests 사용 시, 스크립트가 불가능한 사이트들이 있을 수가 있어 허용할 수 있게 User Agent를 사용한다.
**[User Agent 사이트](http://www.useragentstring.com/)**
<div>

이 사이트에 접속한 후에 보이는 코드를 복사 붙여넣기를 해주면 된다.

#### 3-2-2. 얻고자 싶은 정보 리스트에 담아두기

```python
number=[]
number=[]
name=[]
position=[]
age=[]
nation=[]
team=[]
value=[]
```

#### 3-2-3. 파싱할 페이지 요청 후 담기

```python
# 파싱할 페이지를 요청
for i in range(1,21):
    url = f"https://www.transfermarkt.com/spieler-statistik/wertvollstespieler/marktwertetop?ajax=yw1&page={i}"
    r = requests.get(url,headers=headers)
    r.status_code

    soup = BeautifulSoup(r.text,'html.parser')
#얻고자 싶은 데이터 담기
    player_info=soup.find_all('tr', {'class':['odd','even']})
    for info in player_info:
        player = info.find_all('td')
        number.append(player[0].text)
        name.append(player[3].text)
        position.append(player[4].text)
        age.append(player[5].text)
        nation.append(player[6].img['alt'])
        team.append(player[7].img['alt'])
        value.append(player[8].text.strip())
```


#### 3-2-4. 사전형으로 데이터 파일 만들기

```python
df=pd.DataFrame({"순위":number,"이름":name,"포지션":position,"나이":age,"국가":nation,"팀":team,"몸값":value})
```

초기 설정으로 웹 크롤링을 통해 트랜스퍼마켓에 있는 데이터들을 파이썬으로 뽑아 왔다. 


## 4. 데이터 분석

<div class="notice--primary" markdown="1">
1. 나이 분포표 만들기
2. 원하는 나이대 선수 몸값 순위
3. 나이대별 분포표
4. 나이와 포지션의 관계
5. 나이가 몸값에 영향이 큰지
<div>


### 4-1. 나이 분포표 만들기
#### 4-2-1. '나이’와 ‘순위’ str ⟶int로 변환하기
#### 4-2-2. 4개의 구간으로 나이 나누기
#### 4-2-3. 나눈 구간 원그래프로 나타내기

### 4-2. 원하는 나이대 선수 몸값 순위

### 4-3. 나이대별 분포표
### 4-4. 나이와 포지션의 관계
#### 4-4-1. ‘나이’와 ‘포지션’의 교집합 만들기
#### 4-4-2. x축과 y축 변수 지정하기
#### 4-4-3. 누적 막대그래프를 이용하여 추출

### 4-5. 나이가 몸값에 영향이 큰지

## 5. 수행 결과 및 결과에 대한 검토/분석

## 6. 분석 내용 기반 향후 활용방안 또는 기대효과

## 7. 보완 사항











