---
title : "📊 Pandas 시각화 3 - plotly에서 for문 사용하기"

categories:
    - Pandas_visual
tags:
    - [Pandas, Plotly, Visualization, forloop]

toc : true
toc_sticky : true

date: 2022-03-13
last_modified_at: 2022-03-13
---

* * *

📊 개강했더니 삼학년이라고 학기 초부터 아주 바쁘다!! 전공과목의 난이도가 정말 2학년때와는 비교할 수 없게 올라갔다(물론 2년동안 굳은 내 머리도 한몫하겠지만...🙄). 배운 건 그날그날 복습하려는 습관을 들이고 있는데 개강 첫주부터 아슬아슬하다. 그래도 짬짬이 공부한 내용들은 최대한 블로그에 올려볼 생각이다.  

📊 오늘은 plotly에서 for loop를 사용하는 법을 알아보자.

* * *
## 3.1 for문을 사용하지 않은 plotly
* * *

📊 먼저 데이터프레임을 하나 정의하자.  

```py
#pandas 임포트
import pandas as pd

#plotly 임포트
import plotly.graph_objects as go
import plotly.offline as pyo
pyo.init_notebook_mode()
```  
```py
score_df = pd.DataFrame({'test' : ['score1','score2','score3','score4','score5','score6'],
                         'A' : [95, 100, 90, 88, 92, 94],
                         'B' : [87, 92, 95, 93, 88, 86],
                         'C' : [92, 92, 86, 95, 90, 84],
                         'D' : [78, 80, 82, 86, 80, 82],
                         'E' : [80, 76, 84, 80, 78, 84]})
score_df = score_df.set_index('test')
score_df
```
```
>>
        A	B	C	D	E
test					
score1	95	87	92	78	80
score2	100	92	92	80	76
score3	90	95	86	82	84
score4	88	93	95	86	80
score5	92	88	90	80	78
score6	94	86	84	82	84
```  

학생 A,B,C,D,E 의 6개의 시험 성적을 나타낸 데이터프레임이다.  

📊 일단 for 문을 사용하지 않는 상태에서 시각화를 진행해보자.  

```py
fig = go.Figure()
fig.add_trace(
    go.Scatter(
        x = score_df.index, y = score_df['A'], name = 'A'))

fig.add_trace(
    go.Scatter(
        x = score_df.index, y = score_df['B'], name = 'B'))

fig.add_trace(
    go.Scatter(
        x = score_df.index, y = score_df['C'], name = 'C'))

fig.add_trace(
    go.Scatter(
        x = score_df.index, y = score_df['D'], name = 'D'))

fig.add_trace(
    go.Scatter(
        x = score_df.index, y = score_df['E'], name = 'E'))

fig.show()
```  
<p align="center"><img src="https://user-images.githubusercontent.com/65170165/158064657-e01f137e-f104-4297-a661-a9d38a0d1baa.png" width="900" /></p>  

📊 for문을 사용하지 않는 경우에는 <a>fig . add_trace( )</a> 를 다섯번 모두 호출해서 각 학생의 시험 성적들을 그려준다. 이렇게 데이터의 수가 많지 않은 경우에는 굳이 반복문을 사용하지 않아도 큰 부담이 없지만, 많은 데이터를 다루려면 위의 방법만으로는 좀 무리가 있을 수 있다고 생각한다.  

그러면 이번에는 for 문을 사용해보자.  

* * *
## 3.2 for문으로 plotly 그려보기
* * *  

📊 데이터는 위에서 만든 score_df 데이터프레임을 그대로 사용한다. 

```py
score_df
```
```
>>
        A	B	C	D	E
test					
score1	95	87	92	78	80
score2	100	92	92	80	76
score3	90	95	86	82	84
score4	88	93	95	86	80
score5	92	88	90	80	78
score6	94	86	84	82	84
```  

📊 이번에는 for 문을 가지고 시각화해보자!!  

```py
col = len(score_df.columns)

fig = go.Figure()
for i in range(col):
    fig.add_trace(
        go.Scatter(
            x = score_df.index, y = score_df[score_df.columns[i]], name = score_df.columns[i]))

fig.show()
```  
📊 변수 <a>col</a> 에 데이터의 열 개수를 넣어주고, 그 개수만큼 <a>for문</a> 을 돌리면서 <a>fig . add_trace( )</a> 를 호출해준다. 그 뒤부터는 데이터의 열에 인덱스로 접근해줌으로써 x축과 y축의 데이터를 정해준다.이렇게 하고 나면 시각화는 아래와 같이 나타난다.  

<p align="center"><img src="https://user-images.githubusercontent.com/65170165/158064679-1c647096-0fcb-40d6-84c8-63c6da7d8081.png" width="900" /></p>  

for 문을 사용하지 않은 경우와 같은 결과를 나타낸다.  
* * *
📊 당연히 for 문을 사용하면 일일이 호출해주는 것보다 코드를 짜는 시간적 측면에서 효율을 얻을 수 있지만, 앞서 [다른 포스팅](https://nyamin9.github.io/pandas_practice/practice2-3/)에서도 언급했듯이 이 방법은 의외로 변수가 많이 발생하는 작업이다(당연히 내가 잘 모르는 부분일 수도 있다. 여러가지 형태로 시도해보다가 성공하면 짠!!하고 포스팅할 생각이다😅.)  

📊 데이터분석 공부를 하다보면 대놓고 파이썬 공부를 하는 것이 아니더라도 이런저런 상황 속에서 자연스럽게 응용하는 게 조금씩 익숙해지는 것 같다. 이렇게 저렇게 공부하면서 실력이 늘었으면 좋겠다🙌.
