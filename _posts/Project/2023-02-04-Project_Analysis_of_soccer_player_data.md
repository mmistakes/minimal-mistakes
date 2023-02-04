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

```
1. 라이브러리 import 하기
2. 얻고자 싶은 정보 리스트에 담아두기
3. 파싱할 페이지 요청 후 담기
4. 사전형으로 데이터 파일 만들기
```

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


**보충 설명**
 - requests 사용 시, 스크립트가 불가능한 사이트들이 있을 수가 있어 허용할 수 있게 User Agent를 사용한다.

**[User Agent 사이트](http://www.useragentstring.com/)**
{: .notice--primary}

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

```
1. 나이 분포표 만들기
2. 원하는 나이대 선수 몸값 순위
3. 나이대별 분포표
4. 나이와 포지션의 관계
5. 나이가 몸값에 영향이 큰지
```

### 4-1. 나이 분포표 만들기

가장 먼저 분석할 것은 나이 분포표를 만들어 어느 구간의 나이대가 몸값 순으로 많은지 확인을 할 것이다. 

#### 4-2-1. '나이’와 ‘순위’ str ⟶int로 변환하기

```python
df= df.astype({'나이':'int','순위':'int'})
```

astype함수를 이용하여 정수형으로 변환을 해준다.

#### 4-2-2. 4개의 구간으로 나이 나누기

```python
under_20=df[df['나이']<=20]
over_20=df[df['나이']>=30]
twenty21_24 = df[(df['나이'] > 20) & (df['나이'] < 25)]
twenty25_29 = df[(df['나이'] >=25) & (df['나이'] < 30)]
```

```python
len(under_20)
len(twenty21_24)
len(twenty25_29)
len(over_20)
```
    36
    199
    225
    40

구간을 20살 이하, 20살~24살, 25살~29살, 30살 이상으로 나이를 나눠 각 변수에 저장해준다. len()을 통해 구간별 축구 선수 수를 구할 수 있다.

#### 4-2-3. 나눈 구간 원그래프로 나타내기

```python
ratio = [len(under_20), len(twenty21_24), len(twenty25_29), len(over_20)]
labels = ['under_20', 'twenty21_24', 'twenty25_29', 'over_20']

plt.pie(ratio, labels=labels, autopct='%.2f%%') 
plt.title("각 나이대별 분포") #그래프 제목 설정
plt.rc('font', family="Malgun Gothic") #그래프 내부의 한글 깨짐 처리
plt.legend(fontsize=6) #글자 크기 설정
plt.show()
```

소수점 2번째 자리까지 나타낸 다음 원그래프를 만들어준다.

![image](https://user-images.githubusercontent.com/100071667/216762960-f2484a8d-c8d9-4dcd-880d-2b8d813515df.png)

위의 원그래프를 보면 확실히 20대 선수들이 많다는 것을 알 수 있다. 20살 이상 25살 미만인 선수들도 39.80%라는 높은 비율을 차지하고 있지만 20대에서도 축구 선수 전성기라고 불리는 20대 후반의 선수들이 무려 45%를 차지하고 있다. 또한 10대 선수와 30대 선수는 비율이 각각 7.2%와 8.0%인 것을 확인할 수 있다. 몸값을 측정할 때 아직 성장기인 10대와 전성기가 지난 30대 선수들보다 신체적으로 가장 발달하여 있는 20대일수록 몸값이 높은 축구 선수일 확률이 높다는 것을 보여준다. 

### 4-2. 원하는 나이대 선수 몸값 순위

```python
most_value_player = int(input('나이를 입력하시오 = '))
df[df['나이']==most_value_player]
```

    나이를 입력하시오 = 29

![image](https://user-images.githubusercontent.com/100071667/216763067-eaf7256a-db6d-4acd-94f8-a886ed604a5e.png)


이렇게 원하는 나이의 선수들을 확인할 수도 있다. 내가 확인 해 본 나이대는 축구 선수로 전성기인 29살을 확인해보았다. 1위는 이집트와 리버풀에서 뛰고 있는 살라로 그 뒤에 네이마르, 마네가 뒤따르고 있다. 4위에는 한국의 손흥민 선수도 기록되어 있으며 전 세계적으로 15위의 몸값을 자랑하고 있다.

### 4-3. 나이대별 분포표

```python
df['count']=df.groupby('나이').cumcount()
df['count']=df['count']+1
plt.figure(figsize=(30,10))
plt.barh(df['나이'],df['count'], color = 'r')
plt.title("각 나이대별 분포") #그래프 제목
plt.rc('font', family="Malgun Gothic") #그래프 내부의 한글 깨짐 처리
plt.xlabel('수')       # X축 이름 
plt.ylabel('나이')     # Y축 이름
plt.xlim([0, 90])      # X축의 범위: [xmin, xmax]
plt.ylim([15, 40])     # Y축의 범위: [ymin, ymax]
plt.show()
```
#보충 설명
groupby()함수는 그룹별로 구분하여 데이터를 보기 위해 저장하는 함수이다.

### 4-4. 나이와 포지션의 관계
#### 4-4-1. ‘나이’와 ‘포지션’의 교집합 만들기
#### 4-4-2. x축과 y축 변수 지정하기
#### 4-4-3. 누적 막대그래프를 이용하여 추출

### 4-5. 나이가 몸값에 영향이 큰지

## 5. 수행 결과 및 결과에 대한 검토/분석

## 6. 분석 내용 기반 향후 활용방안 또는 기대효과

## 7. 보완 사항











