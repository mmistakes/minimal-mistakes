---
layout: post
title:  "퍼센트 체인지(Percent Change)이란?"
subtitle: "Pandas 로 배우는 퍼센트 변화율"
author: "코마"
date:   2019-07-22 00:00:00 +0900
categories: [ "pandas", "pct_change"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 퍼센트 체인지(Percent Change)의 개념을 알아보도록 하겠습니다. 😺

<!--more-->

# 퍼센트 변화율(Percent Change)란?

이전 것으로부터 새로운 것을 빼고(subtract), 이전 것으로 나눈다. 이를 퍼센트로 보여준다(`Subtract the old from the new, then divide by the old value. Show that as a Percentage.`).

예를 들어 예전에 5권의 책을 들고 있고, 이제는 7권을 가지고 있을때, 변화량은 2 (7-5) 권이다.
여기서 변화율을 구하면 2/5 = .4 이고 40%이다.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 수평형 광고 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7572151683104561"
     data-ad-slot="5543667305"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## Pandas의 pct_change (퍼센트 변화율)

Pandas 또한 pct_change 메서드를 제공해주며 아래와 같이 예제로 표현할 수 있다.

```python
returns = price.pct_change()
returns.tail()
```

이떄 계산된 값은 아래와 같다. 그렇다면 실제로 퍼센트 변화율의 개념과 계산 방식이 일치하는지 알아보자.

```bash
            AAPL 	IBM 	MSFT 	GOOG
Date 				
2015-12-24 	-0.005340 	-0.002093 	-0.002687 	-0.002546
2015-12-28 	-0.011201 	-0.004629 	0.005030 	0.018854
2015-12-29 	0.017974 	0.015769 	0.010724 	0.018478
2015-12-30 	-0.013059 	-0.003148 	-0.004244 	-0.007211
2015-12-31 	-0.019195 	-0.012344 	-0.014740 	-0.015720
```

2015-12-30 과 2015-12-31 의 AAPL 칼럼을 살펴보자.

```bash
            AAPL 	IBM 	MSFT 	GOOG
Date 				
2015-12-24 	108.029999 	138.250000 	55.669998 	748.400024
2015-12-28 	106.820000 	137.610001 	55.950001 	762.510010
2015-12-29 	108.739998 	139.779999 	56.549999 	776.599976
2015-12-30 	107.320000 	139.339996 	56.310001 	771.000000
2015-12-31 	105.260002 	137.619995 	55.480000 	758.880005
```

각각 107.320000, 105.260002 이다. 이를 위에서 소개한 대로 계산하면 아래와 같다.

105.260002 (New one) - 107.320000 (Old one) = -2.059998 (Change)
-2.059998 (Change) / 107.320000 (Old one) = -0.0191949124114797 * 100 (Percent Change)

1.9 % 정도 감소하였음으로 확인된다. 실제 Pandas 가 계산한 값은 `-0.019195` 이다. 즉, 동일한 계산 방식으로 산출하였음을 의미한다. (단, 100을 곱하지 않았다.)

## 퍼센트 변화율의 의미

그렇다면, 왜 이러한 값을 구하는가이다. 우유 가격을 예를들어 알아보자.

예시: 
> 우유(Milk)의 가격은 2원 이었고 이제는 3원이다. 이때, 우유의 가격은 1원이 올랐다고 말할 수 있다.

이를 퍼센트 변화율로 구하게 되면 1원/2원 = 0.5 이므로 50% 정도 상승하였다고 말할 수 있다. 이를 통해 
우리는 단순히 우유의 가격이 몇 원 올랐다는 표현보다는 이전 가격에 비해 몇 퍼센트 올랐다고 표현할 수 있다.

# 결론

이로써 Pandas 에서 제공하는 pct_change 메서드에 대해서 알아보았다. 매우 간단한 개념이지만, 단순히 차이를 구하여 얼마나 차이가 난다라고 말하는 것보다는 더 나은 방법으로 보인다. 이러한 개념을 잘 내재화 하여 수치를 비교하거나 변화율을 계산할 때 유용하게 쓸 수 있도록 Pandas 와 결합하여 내재화 하자. 


# 참고

- [Mathisfun: Percentage Change](https://www.mathsisfun.com/numbers/percentage-change.html)



