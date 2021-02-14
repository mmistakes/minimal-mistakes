---
title: "파이썬 주식 분석 (3) - 백테스트"
categories:
  - INVESTING
tags:
  - Data analysis
  - Back test
  - Python
  - Stock
toc: true
toc_sticky: true
---

## 파이썬 주식 분석 (3) - 백테스트

### 3.1 백테스트

백테스트 혹은 백 트레이딩 테스트는 (**`Back (trading) test`**) 단어에서 유추해볼 수 있듯이 과거의 데이터를 토대로, 어떠한 매매 전략이 얼마나 효과적일지를 가능하기 위해 가상으로 시험해보는 테스트를 가리킨다. 

>가령, "작년 1월에 100만원이 있었는데, 그 때 내가 구상한 알고리즘으로 어떤 주식 종목을 샀다면 얼마만큼의 이윤을 남겼을지" 시뮬레이션을 돌려보는 것이다. 

다음은, 이전 포스트에 이어서 백테스트를 위해 작성한 파이썬 함수이다. 코드가 다소 길어보이긴 하지만.. 이는 코드가 복잡하다기 보다는 파이썬에 익숙하지 않은 내가 직접 작성해서 그런 것이니 오해하지 말자.

```python
import math
import pandas as pd

def BackTrade(sdf, input_won, krw2usd):
    # sdf: stock dataframe
    
    tot_in = input_won
    ret_usd = tot_in/krw2usd
    num_bought = 0
    num_count = 0

    bi = [] # buy index
    bv = [] # buy values
    si = [] # sell index
    sv = [] # sell values
    
    for j in range(len(sdf.Close)):
        if sdf.slow_d.values[j] <= 20: # and sdf.EMA130[j] > 0:
            # 매수 타이밍
            if ret_usd > sdf.Close.values[j]:
                num_count = math.floor(ret_usd / sdf.Close.values[j])
                ret_usd -= (num_count*sdf.Close.values[j])

                bi.append(sdf.Number[j])
                bv.append(sdf.Close.values[j])
                
                num_bought += num_count
                print('Remain:',ret_usd)
                print(sdf.Close.index[j], 'Buy Price:', round(sdf.Close.values[j],2), ', Num:', num_bought)
                
        elif sdf.slow_d.values[j] >= 80: # and sdf.EMA130[j] > 0:
            # 매도 타이밍
            if num_bought != 0:
                si.append(sdf.Number[j])
                sv.append(sdf.Close.values[j])
                
                ret_usd += (num_bought*sd.Close.values[j])
                print(sdf.Close.index[j], 'Sell Price:', round(sdf.Close.values[j],2), ', Num:', num_bought)
                num_bought = 0
                
    Tr = pd.Series({'bi':bi, 'bv':bv, 'si':si, 'sv':sv})
    res = (num_bought*sd.Close.values[len(sd.Close)-1] + ret_usd)*krw2usd

    return Tr, res
```

위의 함수에서 `sdf`는 주식 종목의 정보를 담고있는 데이터프레임에 대한 파라미터를 가리키고, `input_won`은 초기 자본금을, `krw2usd`는 원-달러 환율을 가리킨다. 매매 알고리즘에 사용된 지표로는 이전 포스트에서 소개한 `%D` 스토캐스틱 정보만을 이용했다. `Tr`은 매매 시점을 그래프에 표시하는 용도로 사용한 변수이고, `res`는 최종적으로 현재 보유하고 있는 자산 (현금 혹은 주식의 가치)을 가리킨다.

**Notice:** 위의 코드는 테스트를 목적으로 단순하게 작성된 코드이며, 실제 주식 투자에 활용하기 위해서는 더 많은 지표들을 이용해 매매 알고리즘을 구상해야 할 것이다. 하지만, 무엇보다 데이터 분석 결과 역시 하나의 지표일 뿐이지 주식 투자에 있어 절대적인 정답이라고 생각해서는 안 된다.
{: .notice--warning}

---

### 3.2 예제 1

`2020년 3월`에 초기 자본금 100만원으로 매매를 한 경우를 가정해보자. 매매 지표로는 온전히 `%D` 스토캐스틱 정보만을 사용하며, 스토캐스틱 값이 `20`이 되면 매수하고, `80`이 되면 매도하도록 했다. 원-달러 환율은 `1122.58` 원으로 설정하였다.

* 디즈니 (종목코드: `DIS`)

다음은 위의 조건으로 디즈니 주식을 거래했을 때의 결과를 보여준다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/python-stock4.png" alt="">
</figure>

위 그림에서 빨간색 화살표는 매수 시점을, 파란색 화살표는 매도 시점을 가리키며, 캔들 차트 대신 일일 종가 (`Close`)를 이용해 시세 차트를 그렸다. 스토캐스틱 정보만을 사용했음에도, 대부분 저점에서 사서 고점에서 팔고 있는 것을 볼 수 있다.

아래의 로그를 보면, 위의 조건으로 매매했을 때 약 1년간 `29.54%`의 이익을 봤을 것으로 예상된다. (물론, 위의 예시에서 수수료나 환율 변동성 등의 요소는 고려하지 않았다.)

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/python-stock5.png" alt="">
</figure>

위의 시세 차트를 보면, 시세가 계속해서 오르내리고 있지만 전반적으로 상승하고 있는 추세인 것을 볼 수 있다. 선택한 주식 종목이 상승세였다면 굳이 알고리즘으로 분석하지 않아도, 오래 기다리기만 ~~존버~~ 하면 항상 이익을 볼 수 밖에 없다.

그럼 다음 종목에 적용했을 때는 어떨까?

### 3.3 예제 2

* 인텔 (종목코드: `INTC`)

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/python-stock6.png" alt="">
</figure>

시세 차트만 보면 주가가 급격히 떨어지는 구간이 꽤 있을 뿐더러, 26주 이동평균선만 봐도 주가가 떨어지는 추세에 있는 ~~개잡주~~ 종목인 것을 볼 수 있다. 그런데 동일한 조건으로 인텔 주식에 투자했을 때의 예상 수익은 **`50.55%`**로 오히려 앞서 살펴본 디즈니보다 높게 나왔다.

스토캐스틱 지표를 이용하는 경우에는 주가 변동성이 큰, 다시 말해서 주요 변곡점이 많은 종목에서 더 이점을 발휘하는 것 같다.

사실 아래와 같이 상승 추세에 있는 종목이라면 (e.g. 애플), 별다른 매매 알고리즘으로 거래하지 않고, `2020년 3월`에 매수하고 지금까지 보유하고만 있었어도 `100%` 이상의 이득을 봤을 것이다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/python-stock7.png" alt="">
</figure>

따라서, 실제로 증권 데이터를 분석할 때는 여러 지표를 활용해야 한다.

---

**Reference**

파이썬 증권 데이터 분석 (김황후 저, 한빛미디어)