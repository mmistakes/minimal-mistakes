---
layout: single
title: Tex, LaTex 수식 문법
tags: markdown
---

## Tex, LaTex 수식 문법
Tex, LaTex 수식 문법 정리  
https://ko.overleaf.com/  
overleaf 사이트를 이용하여 사용하면 편하다고 한다.

참고하기
http://mrskrummel.com/tutorials
http://tomoyo.ivyro.net/123/wiki.php/TeX_%EB%B0%8F_LaTeX_%EC%88%98%EC%8B%9D_%EB%AC%B8%EB%B2%95


## 기본 템플릿
```
\documentclass[11pt]{article} : 명령의 시작(option - 11pt, class - article)
\usepackage{kotex} - 사용할 패키지(kotex)
\begin{document} - 주요 부분 시작
\end{document} - 문서의 끝
```
class - 문서의 유형을 의미. proc article, report, slides 등
option - 의도에 맞게 형식을 조절, 옵션의 구분은 쉼표로 한다. 10pt, a4paper, letterpaper, fleqn, titlepage, onecolumn, landscape 옵션 등
package - 패키지 이름으로 주로 kotex 사용

- amsfonts - 자연수, 정수, 실수 등 수학기호 입력시
- graphicx - 그림삽입을 위한 패키지
- fullpage - 문서를 꽉 차게 출력시키기

```
$수식$
\(수식\)

$$줄바꿈후 중앙에 위치한 수식$$

특수기호 입력 위해서는 '\특수기호' 입력
백슬래쉬는 '\textbackslash'
```
띄어쓰기와 엔터가 여러번 입력되었다고 해도, 1번으로 인식한다.  
줄바꿈을 하려면 한줄을 직접 띄워도 되고, \\\\을 사용해도 된다 (정렬방식에 차이가 있다.)

## 참고용 예제
```
$A + B - C \times D \div E$
$$\frac{A}{B}$$
$$\sum_{i=0}^{n}{log{(i)}}$$
$$\frac{df(x)}{dx} = \lim_{h\to0} \frac{f(x+h)-f(x)}{h}$$
$$\int_{0}^{1}{f(x)dx}$$
$A=\begin{bmatrix}
0 & 1 & 2\\
3 & 4 & 5\\
6 & 7 & 8
\end{bmatrix}
$
$x=a^{y} \Longleftrightarrow y=log_{a}{x}$
```
$A + B - C \times D \div E$  
  
$$\frac{A}{B}$$  
  
$$\sum_{i=0}^{n}{log{(i)}}$$  
  
$$\frac{df(x)}{dx} = \lim_{h\to0} \frac{f(x+h)-f(x)}{h}$$  
  
$$\int_{0}^{1}{f(x)dx}$$  
  
$A=\begin{bmatrix}
0 & 1 & 2\\
3 & 4 & 5\\
6 & 7 & 8
\end{bmatrix}$  
  
$x=a^{y} \Longleftrightarrow y=log_{a}{x}$


