---
layout: post
title:  "R로 배우는 통계적 분석(ADsP, 데이터 분석 전문가)"
subtitle: "R 의 기초 1분안에 파악하기"
author: "코마"
date:   2019-02-24 21:00:00 +0900
categories: [ "r", "basic" ]
excerpt_separator: <!--more-->
---

안녕하세요 코마입니다. 오늘은 R을 이용한 통계적 분석 방법을 알아보기 전에 R 의 기초를 1분안에 파악하는 시간을 가져보겠습니다. 저는 프로그램 언어에 익숙한 관계로 기본적인 구조만 배우고 실제 통계 분석을 하면서 곁가지를 치도록 하겠습니다. 궁금하신 내용이 있을 경우 글 하단의 이메일로 문의 주시면 감사하겠습니다.

<!--more-->

# R 을 배우는 이유

R 은 통계 패키지로써 무료이자 가장 빠르게 진화하는 오픈 소스 프로젝트이다. R 을 통해서 통계적 분석이 용이하며 약간의 진입 장벽을 극복하면 데이터로부터 유의미한 결론을 낼 수 있는 능력을 키울 수 있다.

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

# R 데이터 구조

R 에서 자주 사용되는 데이터 구조는 벡터, 행렬, 데이터 프레임이 있다.

## 벡터

R 에서 다루는 데이터 구조 중 가장 단순한 형태이며 명령어 **c를 이용해서 선언할 수 있다**. 여기서 c 연산자는 concentration(연결)을 의미한다.

벡터를 선언하고 변수에 할당 할 때 두 가지 방법을 가진다. 아래의 두 연산자는 동일하다.

- 연산자 =
- 연산자 <-

아래의 두 연산은 동일하다.

```r
> x <- c(1, 10, 24, 40)
> x = c(1, 10, 24, 40)
```

벡터들을 결합하여 새로운 벡터를 생성하는데도 c 명령어를 사용할 수 있다.

```r
> x <- c(1, 10, 24, 40)
> y <- c(TRUE, FALSE, TRUE)
> xy <- c(x, y)
```

## 행렬(matrix)

행렬은 행과 열을 갖는 m x n 형태의 직사각형에 데이터를 나열한 데이터 구조이다. 이 선언을 위해 matrix 를 사용한다.

열을 채우는 순서는 다음과 같다. 즉, 열을 우선으로 채우는 방향으로 동작한다.

- 1행 1열
- 2행 1열
- 3행 1열
- 중략
- 1행 2열
- 중략
- 3행 2열

*만약 행을 우선 채우는 방향을 원하는 경우 byrow=T 옵션을 추가한다.*

```r
> mx = matrix(c(1,2,3,4,5,6), ncol=2)
> mx
     [,1] [,2]
[1,]    1    4
[2,]    2    5
[3,]    3    6
```

### rbind 와 cbind 이용하기

벡터를 합쳐 행렬을 만들 수 있다. 여기서 rbind 와 cbind 의 의미를 알아보자.

rbind 는 row bind 를 의미한다. 즉, 행에 붙인다는 의미이다. 아래의 예제를 살펴보자.

```r
> r1 <- c(10, 20)
> rbind(mx, r1)
   [,1] [,2]
      1    4
      2    5
      3    6
r1   10   20
```

cbind 는 column bind 를 의미한다. 즉, 열에 붙인다는 의미이다. 아래의 예제를 살펴보자.

```r
> cbind(mx, c(10, 20, 30))
     [,1] [,2] [,3]
[1,]    1    4   10
[2,]    2    5   20
[3,]    3    6   30
```

## 데이터 프레임(DataFrame)

데이터 프레임은 행렬과 유사한 2차원 목록 데이터 구조이다. 행렬과의 차이점은 서로 다른 데이터 타입을 가질 수 있다는 점이고 데이터의 크기가 커져도 다루기가 수월하다.

data.frame 을 이용하여 여려개의 벡터를 하나의 데이터 프레임에 합칠 수 있다. 예시를 통해서 살펴보자. 아래는 제품의 가격(price)와 제품의 벤더 그리고 성별을 나타낸 데이터 프레임이다.

```r
> price <- c(10, 20, 30, 40, 50)
> product <- c('lg', 'samsung', 'apple', 'apple', 'haweii')
> male <- c(FALSE, TRUE, TRUE, TRUE, FALSE)
> data.frame(price, product, male)
  price product  male
1    10      lg FALSE
2    20 samsung  TRUE
3    30   apple  TRUE
4    40   apple  TRUE
5    50  haweii FALSE
```

# 데이터 불러오기

R 은 csv, txt, xls/xlsx 파일을 불러 올 수 있다.

## CSV 파일 불러오기

read.table 명령어를 이용해서 csv 파일을 R 의 데이터 프레임 형태로 불러 올 수 있다. 옵션의 설명은 아래와 같다.

- header=T : csv 파일의 첫 줄을 변수명으로 지정할 수 있다.
- sep=',' : 데이터가 쉼표로 구분된 데이터 파일임을 지정해 준다.

주의할 점은 윈도우에서 파일 경로를 구분할 때 사용하는 backslash('\\') 문자열을 사용할 때 double-backslash('\\\\') 로 표기하는 것이다. 이는 파이썬 등에서도 통용되는 윈도우 경로 표기법으로 경로 표기시 주의한다.

```r
data1 <- read.table("C:\\Data\\MyExample.csv", header=T, sep=",")
```

## txt 파일 불러오기

csv 파일과의 차이점으로 header, sep 과 같은 옵션이 없음을 알 수 있다.

```r
data2 <- read.table("C:\\Data\\MyExample2.txt")
```

## 엑셀 파일 불러오기

엑셀 파일을 불러오기 위해서 RODBC 패키지가 필요하다. 이 패키지를 불러오기 위해서는 `library(RODBC)` 를 입력해 주어야 한다. 아래의 코드를 따라하면 쉽다.

```r
library(RODBC)
new <- odbcConnectExcel("C:\\Data\\MyExcel.xlsx")
data3 <- sqlFetch(new, "Sheet1")
close(new)
```

# 결론

오늘은 R 에 대해서 간단히 알아보았습니다. R 을 이용해서 통계를 공부하는 분들에게 도움이 되고자 조금씩 정리해 나가겠습니다. 앞으로도 좋은 자료를 제공해 드리기 위해서 노력하는 **코마**가 되겠습니다. 감사합니다.