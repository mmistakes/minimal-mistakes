---
title: "파이썬 주식 분석 (4) - 캔들차트 (candlestick chart) 직접 그리기"
categories:
  - INVESTING
tags:
  - Data analysis
  - Candlestick
  - OHLC
  - Python
  - Stock
toc: true
toc_sticky: true
---


## 파이썬 주식 분석 (4) - 캔들차트 (candlestick chart) 직접 그리기

간만에 업로드하는 파이썬 주식 관련 포스트이다👨🏻‍💻. 이번 포스트에서는 캔들 차트를 직접 그리는 방법에 대해 소개한다. `mpl_finance`, `mplfinance` 같은 라이브러리를 사용하는 방법에 대해서는 이미 여러 블로그에서 소개하고 있는데 (~~구글링 ㄱㄱ~~), 본 포스트에서는 별다른 라이브러리 없이 **`matplotlib`** 모듈의 plotting 관련 기능만을 이용해서 직접 차트를 그려볼 예정이다.

### 4.1 오픈 소스 라이브러리 (mplfinance, yfinance) 없이 직접 그리는 이유?

**[이전에 업로드했던 포스트](https://enidanny.github.io/investing/invest-python-analysis1/)** 에서는 캔들 차트를 그리기 위한 데이터, 즉, **`OHLC`** 데이터 (**`일일 시가/고가/저가/종가 정보`**) 를 아래의 코드와 같이 yahoo finance 모듈을 이용해서 읽었고, `mpl_finance` 모듈의 `candlestick_ohlc` 함수를 이용해 차트를 그렸다.

```python
# example: read stock data
from pandas_datareader import data as pdr
import yfinance as yf
yf.pdr_override()
sd = pdr.get_data_yahoo(stock_code, start=start_date)

# example: plotting ohlc candle-chart
from mpl_finance import candlestick_ohlc
candlestick_ohlc(p1,ohlc.values,width=.6,colorup='red',colordown='blue')
p1.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
```

사실 위와 같은 오픈 소스 라이브러리를 활용하면 쉽게 캔들차트를 그릴 수 있지만, 야후 파이낸스 (`yfinance`) 데이터의 경우 국내 주식 종목이 액면 분할 등으로 인해 주가가 변동하거나 할 때 해당 정보가 제대로 반영되지 않는 문제가 있다고 했던 것 같다.

>그 외에도 캔들 차트를 그릴 때 사용하는 오픈 소스 라이브러리에서 사용 시 요구되는 포맷에 맞게 데이터 형식을 재가공 해야하고, 간혹 함수의 매개변수 형식이 바뀌거나 라이브러리 자체가 바뀌는 경우에도 문제가 될 것이다 (e.g. 현재는 위 예제 코드에서 사용한 `mpl_finance`
모듈은 사용되지 않는 것 같다.)

---

### 4.2 OHLC 데이터 추출

본 포스트의 주제는 "캔들차트를 직접 그리기" 이기 때문에 **`OHLC`** 데이터는 파일이 별도로 준비되어 있어야 하며, 기본적으로 캔들차트를 그리는데 사용할 **`OHLC`** 데이터를 (.csv 형태로) 저장하고 (`write`), 읽고 (`read`), 활용할 수 있어야 한다.

**`OHLC`** 데이터 추출을 위해서는 `mplfinance` 모듈의 캔들차트 함수에서 쉽게 사용 가능한 `yfinance` 모듈을 사용하거나, 웹 크롤링 (or 스크래핑 ~~개념적으로 세세한 차이는 모르겠음 😴~~)을 이용해 네이버나 다음 증권사 페이지의 정보를 읽어와도 된다.

본인의 경우는 크레온 (대신증권) 에서 제공해주는 파이썬 라이브러리를 활용해 **`OHLC`** 데이터를 추출했고, 이 과정에서 다음의 링크들을 참고했다.

* **Youtube 영상 - 크레온 (파이썬) 개발환경 구축 관련:** [https://www.youtube.com/watch?v=4DzGOpsT3bw&list=RDCMUCQNE2JmbasNYbjGAcuBiRRg&index=2](https://www.youtube.com/watch?v=4DzGOpsT3bw&list=RDCMUCQNE2JmbasNYbjGAcuBiRRg&index=2)
* **파이썬 증권 데이터 분석 github:** [https://github.com/INVESTAR/StockAnalysisInPython](https://github.com/INVESTAR/StockAnalysisInPython)
* **크레온 API 관련 도움말:** [https://money2.creontrade.com/e5/mboard/ptype_basic/HTS_Plus_Helper/DW_Basic_List_Page.aspx?boardseq=284&m=9505&p=8841&v=8643](https://money2.creontrade.com/e5/mboard/ptype_basic/HTS_Plus_Helper/DW_Basic_List_Page.aspx?boardseq=284&m=9505&p=8841&v=8643)

```python
# CreonPlus API example
cpMgr = win32com.client.Dispatch('CpUtil.CpCodeMgr')
... = cpMgr.GetStockListByMarket(...)

cpWeek = win32com.client.Dispatch('Dscbo1.StockWeek')
... = cpWeek.SetInputValue(...)
... = cpWeek.BlockRequest()
... = cpWeek.GetHeaderValue(...)
```

**`OHLC`** 데이터 추출을 위해 위의 코드에서와 같이 크레온 플러스의 `CpUtil.CpCodeMgr` API 에서 제공해주는 `GetStockListByMarket` 함수를 이용해 **KOSDAQ** 혹은 **KOSPI** 전 종목의 종목 코드를 호출했고, `Dscbo1.StockWeek` API 를 이용해서 각 종목의 일자별 **`OHLC`** 데이터를 `pandas dataframe` 형태로 정리한 뒤 `.csv` 파일로 저장하였다 (아래 그림 참조).

>물론 위에서 소개한 API 이외의 다른 API 를 이용해서도 **`OHLC`** 데이터 추출이 가능하다.

<figure style="width: 85%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/invest4-fig1.png" alt="">
</figure>

---

### 4.3 캔들차트 그리기 (matplotlib.pyplot -plot, -fill_between)

다음의 그림은 직접 추출한 **`OHLC`** 데이터와 `matplotlib.pyplot` 모듈에서 제공되는 `plot`, `fill_between` 함수를 이용해서 나타낸 캔들차트 그래프 예시이다.

<figure style="width: 90%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/invest4-fig2.png" alt="">
</figure>

각자 사용하는 **`OHLC`** 데이터 포맷이 다를 수 있는데, 먼저 특정 날짜 (e.g. `20210902`) 에 대한 **`OHLC`** 데이터가 들어있는 `candle_set` 이란 리스트가 있다고 가정해보자. 일단 날짜 (x축 데이터) 표시는 잠시 제쳐두고, 캔들차트에서 일자별 차트는 시가보다 종가가 올랐다면 **양봉** 으로, 떨어졌다면 **음봉** 으로 표시하고, **`OHLC`** 각각의 데이터를 구분할 수 있도록 표시하기만 하면 된다.

* **예시 1**

```python
# candle_set [0]: Open, [1]: High, [2]: Low, [3]: Close

cnt = 0
width = 0.2

import matplotlib.pyplot as plt

plt.plot([cnt-width, cnt], [candle_set[0], candle_set[0]], linewidth = 1.5, color=clr) # open
plt.plot([cnt, cnt], [candle_set[1], candle_set[2]], linewidth = 1.5, color=clr) # high-low
plt.plot([cnt+width, cnt], [candle_set[3], candle_set[3]], linewidth = 1.5, color=clr) # close
```
<figure style="width: 90%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/invest4-fig3.png" alt="">
</figure>

위 예제 코드에서, `cnt` 변수는 **`OHLC`** 데이터를 표시하기 위한 단순 인덱스 값이고, `width` 변수는 시가와 종가를 표시해주는 선의 길이를 나타낸다 📊. `clr` 값은 시가와 종가의 관계를 비교해서 양봉 (e.g. `'red'`) 혹은 음봉 (e.g. `'blue'`) 으로 나타내기 위한 변수이다.

>왼쪽에 확대한 그림을 보면 조금 이상해 보일 수 있지만, 여러 날짜 데이터를 모아서 보면 꽤 그럴싸한 **`OHLC`** 그래프처럼 보인다 (~~아닐지도~~). 

---

* **예시 2**

하지만, 아무래도 시가와 종가 데이터를 굵은 막대 (봉)의 형태로 표현해야 캔들차트 느낌이 나는 것 같긴하다. 이를 위해 다음과 같이 `matplotlib.pyplot` 의 `fill_between` 함수를 이용할 수 있다.

```python
import matplotlib.pyplot as plt

plt.plot([cnt, cnt], [candle_set[1], candle_set[2]], linewidth = 0.8, color=clr) # high-low
plt.fill_between([cnt-width, cnt+width],[candle_set[0],candle_set[0]],[candle_set[3],candle_set[3]], color=clr) # open-close
```
`plt.fill_between(x[0:2], y1[0:2], y2[0:2])` 함수의 경우 `(x, y1)` 과, `(x, y2)` 두  그래프 사이의 공간을 채워준다. 위의 코드에서는 인덱스 (`cnt`)를 기준으로 각각 시가 (`candle_set[0]`) 와 종가 (`candle_set[3]`) 높이에 위치한 `2*width` 너비의 두 그래프를 `fill_between` 함수를 이용해 채우는 작업을 수행한다. 이와 같은 방식으로 그래프를 그리면 위의 **`4.3`** 도입부에 첨부한 그림의 캔들차트를 나타낼 수 있다. 

추가로 날짜 정보의 경우 먼저 연속된 상수 값 (e.g. `0, 1, ... N`)을 기준으로 그래프를 그린 뒤 `plt.xticks(range(0, N), indices)` 형태로 x축의 이름만 변환해주면 된다. (여기서 `indices` 는 `str` 타입의 날짜 정보를 포함하는 리스트이다.)