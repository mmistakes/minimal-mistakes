# 1. RMarkdown
- r studio에서 해당 청크를 실행하면 코드, 실행 결과, 시각화를 나타낸 보고서 제작에 용이함 
```{r}
summary(cars)
```

## 기본 ggplot2 그래프 예제
```{r, echo=FALSE}
library(ggplot2)
ggplot(mtcars, aes(x=mpg, y=hp, color=factor(cyl))) +
    geom_point() +
    theme_minimal()
```

## 기본 kable 테이블 출력 예제
```{r}
library(knitr)
kable(head(mtcars))
```

# 2. RMarkdown 문서 포맷 변환
## 기본 YAML 헤더 설정 예제
```
---
title: "분석 보고서"
author: "홍길동"
date: "`r Sys.Date()`"
output:
  html_document:
    toc: true
    number_sections: true
---
```
✔ HTML 문서 (html_document)
✔ PDF 문서 (pdf_document)
✔ Word 문서 (word_document)
✔ toc: true → 목차 추가
✔ number_sections: true → 섹션 넘버링 추가

## 인터랙티브 문서 생성
### shiny 활용 예제 
```{r, echo=FALSE}
---
title: "Shiny 활용 문서"
output: html_document
runtime: shiny
---

## 입력값에 따른 요약 통계

library(shiny)

sliderInput("obs", "표시할 관측값 수:", min = 1, max = 100, value = 10)

renderPrint({
  summary(mtcars[1:input$obs, ])
})
```

### Flexdashboard 
```
---
title: "Flexdashboard 예제"
output: flexdashboard::flex_dashboard
---

Column {data-width=650}
-------------------------------------
```
```{r}
### ggplot2 산점도

library(ggplot2)
ggplot(mtcars, aes(x=mpg, y=hp, color=factor(cyl))) +
    geom_point()


Column {data-width=350}
-------------------------------------
```

```{r}
### 데이터 테이블

library(DT)
datatable(mtcars)
```

# 3. 반복 분석 및 자동화된 보고서 (params 사용)
```
---
title: "isc_anova"
author: "iwon"
date: "2025-03-31"
runtime: shiny
output: html_document
params:
  dataset: "C:/mindmonitor_data/data/isc.xlsx"
---
## 데이터 요약

분석할 데이터셋: `r params$dataset`
```

```{r, message=FALSE}
library(readxl)

# params에서 파일 경로 가져오기
dataset_path <- params$dataset

# 엑셀 데이터 불러오기
data <- read_excel(dataset_path)
```


