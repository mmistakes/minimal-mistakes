---
layout: post
title:  "Pandas 를 이용한 데이터 분석 Part 1"
subtitle: "기본에 충실한 pandas.Series 클래스 설명"
author: "코마"
date:   2019-02-04 01:00:00 +0900
categories: [ "python", "pandas", "data_analysis" ]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 이번 포스트는 Pandas 를 이용한 데이터 분석에 대해 알아보겠습니다. 우선 실제 데이터 분석 전에 Pandas 의 기본을 다루어 보도록 하겠습니다.
<!--more-->

# 개요

Pandas 는 데이터 분석 라이브러리 입니다. BSD 라이선스를 기반으로 한 오픈 소스입니다. 고 성능, 쉬운 데이터 구조, 그리고 데이터 분석 도구를 **파이썬** 언어로 제공해줍니다. 이 프로젝트는 **NumFOCUS** 가 후원하는 프로젝트입니다. 덕분에 pandas 는 세계적인 오픈 소스 프로젝트가 될 수 있었습니다.

물론 Pandas 는 여러 도구 중에 하나입니다. 도구 보다는 데이터 분석이라는 기본기에 충실할 것을 당부드립니다. 하나의 도구에 충실하다보면 데이터 분석의 프로세스와 활용을 더 잘 이해 할 수 있으므로 커뮤니티가 활성화된 도구를 추천드립니다.

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

## Series 객체

금번 파트에서는 Series 객체를 다루어 보도록 하겠습니다. Pandas 공식 문서에서 Series 객체를 살펴보면 다음과 같습니다.

> One-dimensional ndarray with axis labels (including time series)

해석 하면 축 이름을 가진 1차원의 배열(ndarray)입니다. 그리고 수학적으로 보면 급수(Series) 라고도 불립니다. 주로 미적분 영역에서 다룹니다. 그러나 데이터 분석에서는 항의 개수가 무한할 수 없으므로 유한급수라고 생각할 수 있습니다.

그렇다면 Pandas 라이브러리의 Series 객체는 미적분의 급수와 같은 의미일까요? 결론을 먼저 말씀드리면 아닙니다. 아래 링크의 메서드 스펙을 살펴보면 Series 객체가 제공하는 연산(operation)은 1차원의 배열에 대한 broadcasting 과 출력, 치환 등의 연산과 관련되어 있습니다. 즉, 다음과 같이 정리할 수 있습니다.

**pandas.Series 클래스는 1차원 ndarray 데이터를 처리하는데 필요한 연산(add, sub, div, mul)을 제공합니다.**

## Broadcasting 이란

pandas.Series 클래스를 다루다 보면 단순 연산이 행렬 전체에 영향을 미치는 것을 볼 수 있습니다. 이를 Broadcast 라고 부릅니다. 즉, 어떠한 산술 연산(arithmetic operation)이 행렬 의 차원(shape)에 따라 처리되는 방법을 의미합니다. pandas 의 broadcasting 은 numpy 에서 본래의 의미를 찾을 수 있습니다. 아래의 인용에서 굵게 처리된 텍스트를 읽어봅니다.

주의할 점은 다차원 행렬끼리의 연산의 경우 연산이 되지 않는 경우가 있다는 점입니다. 이 내용은 조금 복잡한 내용이므로 다음 기회에 자세히 다루어보도록 하겠습니다. 지금까지의 내용은 pandas 를 제대로 이해하고 다루기 위한 내용이므로 이정도만 알고 있다면 무리 없이 이해하고 Series 클래스를 다룰 수 있습니다.

> Let’s explore a more advanced concept in numpy called broadcasting. **The term broadcasting describes how numpy treats arrays with different shapes during arithmetic operations.** Subject to certain constraints, the smaller array is “broadcast” across the larger array so that they have compatible shapes. Broadcasting provides a means of vectorizing array operations so that looping occurs in C instead of Python. It does this without making needless copies of data and usually leads to efficient algorithm implementations. There are also cases where broadcasting is a bad idea because it leads to inefficient use of memory that slows computation. This article provides a gentle introduction to broadcasting with numerous examples ranging from simple to involved. It also provides hints on when and when not to use broadcasting.

## Series 객체 생성

pandas 는 Anaconda 를 설치하면 기본 내장된 라이브러리 입니다. 그리고 Python3 를 내장하고 있습니다. 따라서, 한글의 사용에도 부담이 없습니다.  pandas 는 임포트(import,모듈을 불러오기) 할 때 타이핑 수를 줄이기 위해서 약어(acronym) 혹은 줄임말을 `as` 키워드로 지정할 수 있습니다. 전통적으로 `pd` 라고 써줍니다. *(이 부분은 고민하지 마시고 그렇구나 하고 넘어가주세요)*

pandas 모듈은 .(dot) 연산자를 통해 Series 클래스에 접근할 수 있습니다. 편리한 점은 pandas 외에 별도의 모듈이 필요하지 않다는 점입니다. 아래와 같이 Series 객체를 만들어 봅니다.

```python
import pandas as pd

tags = pd.Series(["코마", "블로그", "Pandas", "Series"])
# 일반 콘솔인 경우 print 문을 이용해 주세요
# print(tags)
# Jupyter 라면 변수명을 적어주면 출력됩니다.
tags
```

출력 결과는 아래와 같이 보입니다. 중요한 것은 key 칼럼 입니다. 제공한 값은 없지만 Series 는 자동으로 이를 만들어 냅니다.

|Key|Value|
|:---:|:---:|
|0|코마|
|1|블로그|
|2|Pandas|
|3|Series|

그렇다면 여러가지 테스트하고 싶은 명제가 떠오를 것입니다. **코마**는 여러분의 명제를 대신 생각해보고 정리해 보았습니다.

- 명제 1. 키 값은 중복이 가능한가?
- 명제 2. 키 값을 별도로 지정할 수 있는가?
- 명제 3. 키 값이 중복된다면 접근할 때는 어떻게 출력되는가?

### 명제 2: 키 값을 별도로 지정할 수 있는가

결론은 **그렇다** 입니다. 생성 시점에 index 옵션으로 배열을 지정해주면 Series 객체는 이를 각 Value 의 인덱스로 간주합니다. 여기서 중요한 점은 키 값의 순서와 갯수입니다.

- 인덱스의 숫자와 데이터의 숫자가 일치하지 않으면 에러가 발생
- 인덱스의 배열의 순서와 매칭되는 Value 의 순서는 동일

```python
new_tags = pd.Series(["코마", "블로그", "Pandas", "Series"], index=["k1", "k2", "k3", "k4"])
new_tags
```

출력 결과는 아래와 같습니다.

|Key|Value|
|:---:|:---:|
|k1|코마|
|k2|블로그|
|k3|Pandas|
|k4|Series|

### 명제 1: 키 값은 중복이 가능한가

결론은 **그렇다** 입니다. 인덱스의 값이 동일한 경우, 아래의 예에서는 k1 이 두번 나타납니다, Series 클래스는 이를 정상적으로 인지합니다.

```python
new_tags_but_duplicated = pd.Series(["코마", "블로그", "Pandas", "Series"], index=["k1", "k1", "k3", "k4"])
new_tags_but_duplicated
```

출력 결과는 아래와 같습니다.

|Key|Value|
|:---:|:---:|
|k1|코마|
|k1|블로그|
|k3|Pandas|
|k4|Series|

### 명제 3: 키 값이 중복된다면 접근할 때는 어떻게 출력되는가

명제 1을 만족하였으므로 명제 3을 체크해봐야 합니다. python 에 익숙하신 분들이라면 bracket(각진 괄호)를 이용한 데이터 접근법을 이미 알고 있을 겁니다. 만약에 알지 못한다면 어려운 내용이 아니므로 기호를 통해서 원하는 위치의 데이터를 참조한다 정도로 이해하시면 됩니다.

```python
new_tags_but_duplicated["k1"]
```

출력 결과는 아래와 같습니다.

|Key|Value|
|:---:|:---:|
|k1|코마|
|k1|블로그|

자 그렇다면 클래스의 속성을 알아보겠습니다.

## Series 객체의 속성(Attribute)

어트리뷰트란 무엇일까요? 그리고 프로퍼티란 무엇일까요? 조금은 헷갈리고 많이 섞어서 쓰는 표현입니다. 그러나 엄밀하게(technically, 엄밀하게) 말하자면 프로퍼티의 상위 집합은 어트리뷰트입니다. 단, 어트리뷰트 중 getter, setter, deleter 메서드를 구현한 경우 이를 프로퍼티(property)라고 명시합니다. 즉, 어트리뷰트는 프로퍼티의 상위 집합입니다.

자 그렇다면 Series 객체는 어떠한 속성을 제공하는지 보겠습니다. 

### 자주 쓰이는 Series 어트리뷰트 (Series' Common Attribute)

제가 자주 사용하는 어트리뷰트를 정리해 보았습니다.

|attr. name|descr.|
|:---:|:---|
|Series.values| 데이터만 array 타입으로 출력한다.|
|Series.index| index 만 출력한다. |
|Series.dtype| 데이터 타입을 출력한다. |
|Series.is_unique| value가 모두 고유하다면 True 그렇지 않다면 False 이다. |
|Series.ndim| 데이터의 차원(1이면 1차원, 2이면 2차원)|
|Series.shape| 행과 열의 갯수로 (row,column) 과 같이 표현한다.|
|Series.name | 열의 이름을 출력한다. `google.name = "Google Stock Pr"` 과 같이 할당이 가능하다. |

아래와 같이 출력 결과를 보면 단번에 이해가 가능합니다.

```python
tags.values
# => array(['코마', '블로그', 'Pandas', 'Series'], dtype=object)
tags.dtype
# => dtype('O') # 여기서 대문자 O(오)는 알파벳이며 Object 의 줄임입니다.
tags.is_unique 
# => True # 모든 값이 다르므로 고유합니다.
tags.ndim
# => 1 # 1 차원이므로 1입니다.
tags.shape
# => (4,) # 행이 4개 이므로 4입니다.
tags.name
# => # 이름을 지정하지 않았으므로 출력되지 않습니다.
```

각 기본 Attribute 는 100개 혹은 10000개 이상의 데이터를 다룰 때 데이터의 특성을 보기에 좋습니다. 만약 중복된 값이 있는지 확인하고자 할 때 눈으로 쫓을 필요 없이 `.is_unique` 만 확인하면 됩니다. 이외에도 많은 활용법과 여러 어트리뷰트가 있으니 필요할 때마다 활용하면 좋습니다.

## 결론

내용을 좀 더 잘 전달하고 간편하게 읽어 볼 수 있도록 부득이 내용을 잘랐습니다. 너무 길어지면 독자 분들이 지루해 할까 조금 걱정이 되었습니다. 다음 편에는 실제 CSV 파일을 사용하여 Series 객체로 데이터를 다루는 방법을 알아보도록 하겠습니다. 위에서 언급한 기본 개념을 바탕으로 모든 작업이 진행되기 때문에 이번 파트만 제대로 알고 있다면 다음 파트의 내용은 실습 수준으로 빠르게 훑어 넘길 수 있습니다. 저 **코마**는 시간 대비 효율성이 높은 정보를 전달해 드리기 위해서 항상 최선을 다하도록 하겠습니다.

**Simple is best!**

## 참조 문서

**코마**는 아래의 문서를 인용하여 이 문서를 작성하였습니다.

- [NumPy : 브로드캐스팅 이론](https://www.numpy.org/devdocs/user/theory.broadcasting.html)
- [SciPy : 브로드캐스팅 이론](https://docs.scipy.org/doc/numpy/user/basics.broadcasting.html)
- [스택오버플로우 : 브로드캐스팅 이론](https://stackoverflow.com/questions/29954263)
- [위키피디아 : Series(급수)](https://en.wikipedia.org/wiki/Series_(mathematics))
- [Pandas : Series 클래스 문서](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.html)
- [스택오버플로우 : 어트리뷰트와 프로퍼티의 차이점](https://stackoverflow.com/questions/7374748)
- [파이썬 : 파이썬 데이터모델](https://docs.python.org/3/reference/datamodel.html)