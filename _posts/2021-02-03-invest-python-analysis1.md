---
title: "파이썬 주식 분석 (1) - OHLC 차트와 26주 이동평균선"
categories:
  - INVESTING
tags:
  - Data analysis
  - OHLC
  - Python
  - Stock
toc: true
toc_sticky: true
---

## 파이썬 주식 분석 (1) - OHLC 차트와 26주 이동평균선

이번 포스트에서는 **`파이썬 증권 데이터 분석 (김황후 저, 한빛미디어)`** 책에서 다루고 있는 내용을 참고해서, 원하는 주식 종목을 분석하는 코드를 작성하려고 한다. 책에 나와있는 예제 코드들은 **["파이썬 증권 데이터 분석 github"](https://github.com/INVESTAR/StockAnalysisInPython)** 에 모두 올라와 있지만, 보다 자세하게 공부하고 싶으면 책을 직접 구매해서 보는 것을 권장한다.

### 1.1 주식 시세 읽어오기

먼저, 아래의 코드는 야후 파이낸스와 팬더스-데이터리더 라이브러리를 읽어온 후, 원하는 주식 종목의 시세를 읽어오는 코드다. 참고로 파이썬 버전은 3.8.6 (64-bit)를 사용하였고, 코드를 작성하면서 필요한 라이브러리는 `pip install "library-name"` 명령어로 설치했다.

```python
from pandas_datareader import data as pdr
import yfinance as yf
yf.pdr_override()

sd = pdr.get_data_yahoo(stock_code, start=start_date)
```

주식 투자를 시작한 지 1년 정도 지난 것 같은데, 본인은 어차피 해외 (미국) 주식 투자에만 관심이 있어서 (국내 포털 사이트에서 시세 정보를 스크랩하기 귀찮아서) 간단하게 야후 파이낸스 라이브러리를 사용했다.

위의 코드에서 `stock_code`에는 관심 종목 코드를 넣으면 되고, `start_date`에는 조회하고 싶은 시작일자를 작성하면된다. 가령, 작년 3월부터의 애플 시세를 읽어오고 싶다면, `stock_code`에 `'AAPL'`를 입력하고, `start_date`에는 `'2020-03-01'`를 입력하면 된다. 위의 코드로 불러온 정보는 `sd`라는 변수에 팬더스 데이터프레임 형식으로 저장되며, 개장 일자와 함께 시가, 종가, 고가, 저가 등의 정보를 포함하고 있다.

---

### 1.2 26주 지수 이동평균 계산하기

다음은 26주 (약 130일) 동안의 종목 시세에 대한 지수 이동평균 (**`exponential moving average, EMA`**)을 계산하는 과정이다. 책에서는 현재 주식 시장에 참여할지 (매수/매매를 할지)를 결정하는데 있어 도움을 주는 지표를 몇 가지 소개해주는데, 그 중 하나가 26주 지수 이동평균선이다.

지수 이동평균은 다음과 같이 계산할 수 있다.
```
y[t] = x[t]*K + y[t-1]*(1-K)

K: 2 / (N+1)
N: the number of average point
x[t]: today(t)'s value (input)
y[y-1]: EMA result until yesterday (t-1)
```

지수 이동평균선이 오르면 (기울기가 양수) 전반적으로 상승 추세에 있다는 것을 의미하므로 매수하기 좋은 시기임을 나타내는 지표일 수 있으며, 이동평균선이 내려가고 있을 때는 매도하거나 아직은 매수하기 적절한 시기가 아닐 수 있음을 나타낸다.  다음은, 위의 수식을 바탕으로 직접 작성해본 26주 이동평균을 계산하는 코드이다.

```python
# 26 Week EMA = EMA130
if len(sd.Close) < 130:
    print("Stock info is short")

y = sd.Close.values[0]
m_list = [y]
for k in range(1, len(sd.Close)):
    if k < 130:
        a = 2 / (k+1 + 1)
    else:
        a = 2 / (130 + 1)

    y = y*(1-a) + sd.Close.values[k]*a
    m_list.append(y)

sd.EMA130 = m_list
```

코드에서 `m_list`는 계산한 이동평균값을 그래프로 보기위해 사용한 리스트이며, 결과적으로는 종목 정보를 담고 있는 `sd` 데이터프레임의 `EMA130`이란 영역에 저장하였다.


### 1.3 OHLC 차트와 26주 이동평균선 그리기

앞서 불러온 종목 정보의 OHLC 차트 (캔들 차트)를 그리기 위해 `mpl_finance` 패키지를 사용했고, 시간 정보를 `float` 타입으로 바꾼 뒤 ohlc 라는 데이터프레임을 이용해 차트를 그렸다.

```python
# ohlc candle-chart
from mpl_finance import candlestick_ohlc
import matplotlib.dates as mdates

sd['Number'] = sd.index.map(mdates.date2num)
ohlc = sd[['Number','Open','High','Low','Close']] 

# plot method
import matplotlib.pyplot as plt

p1 = plt.subplot(111)
candlestick_ohlc(p1,ohlc.values,width=.6,colorup='red',colordown='blue')
p1.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
plt.plot(sd.Number, sd.EMA130, color='c', label='EMA130')
plt.title(stock_code+': OHLC chart')
plt.grid(True, linestyle=':')
plt.legend(loc='upper left')
plt.show()
```

다음은 위에서 설명한 코드를 이용해서 그려본 애플 (종목코드: `AAPL`)과 디즈니 (종목코드: `DIS`)의 주식 차트이다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/python-stock1.png" alt="">
</figure>

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/python-stock2.png" alt="">
</figure>

위의 그림을 보면 두 종목 모두 26주 지수 이동평균선(`EMA130`)이 오르고 있는 것을 확인할 수 있다. 물론, 굳이 지수 이동평균선을 보지 않더라도, 월별/분기별 시세를 보면 오르는 추세인지 아닌지 확인할 수 있다. 다만, 26주 이동평균선과 같은 지표를 이용하면 보다 구체적으로 얼마나 오르는 추세인지 또는 얼마나 하락하는 추세인지를 보는데 도움이 될 것이다.

---

**Reference**

파이썬 증권 데이터 분석 (김황후 저, 한빛미디어)