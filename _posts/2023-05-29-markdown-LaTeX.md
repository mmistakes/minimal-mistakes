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
[참고1](http://mrskrummel.com/tutorials)  
[참고2](http://tomoyo.ivyro.net/123/wiki.php/TeX_%EB%B0%8F_LaTeX_%EC%88%98%EC%8B%9D_%EB%AC%B8%EB%B2%95)



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



## 수식
### 연산과 표기
```
$\div$
$\angle$
$\mathbb{ABCDEFG}$
$\nabla$
$\partial$
$\hbar$
$\vec{v}$
$\overrightarrow{OP}$
$\overleftrightarrow{QR}$
$h \to 0$
$f:A\to B, A\overset{f}{\to}B$
$f:a\mapsto b, x\mapsto f(x)$
$\bar{x}$
$\overline{OQ}$
$\underline{fff}$
$\cancel{text}$ - 적용안됨
$\not\nabla$
$\sim$
$\tilde{x}$
$\widetilde{xyz}$
$\hat{k}$
$\widehat{wxyz}$
```
$\div$  
$\angle$  
$\mathbb{ABCDEFG}$  
$\nabla$  
$\partial$  
$\hbar$  
$\vec{v}$  
$\overrightarrow{OP}$  
$\overleftrightarrow{QR}$  
$h \to 0$  
$f:A\to B, A\overset{f}{\to}B$  
$f:a\mapsto b, x\mapsto f(x)$  
$\bar{x}$  
$\overline{OQ}$  
$\underline{fff}$   
$\not\nabla$  
$\sim$  
$\tilde{x}$  
$\widetilde{xyz}$  
$\hat{k}$  
$\widehat{wxyz}$  


### 표기 2
```
$\begin{cases}a&b\\cde&fg\end{cases}$ - 마크다운 문서에서 \\2개가 \임에 유의
$\overbrace{abc\cdots xyz}^{\rm alphabets}$
$v\underbrace{oi}_{52}d$
$\lim_{a \to b}c$
$\exp x, e^x$
$\det A$
$a \bmod c$
$x\equiv a \pmod{b}$
```
$$\begin{cases}a&b\\\\cde&fg\end{cases}$$  
$$\overbrace{abc\cdots xyz}^{\rm alphabets}$$  
$$v\underbrace{oi}_{52}d$$  
$$\lim_{a \to b}c$$  
$$\exp x, e^x$$  
$$\det A$$  
$$a \bmod c$$  
$$x\equiv a \pmod{b}$$  
  
### 벡터, 텐서
```
$$\vec{a}\cdot\vec{b}$$
$$\vec{c}\times\vec{d}$$
$$\otimes$$
$$\ast *$$
```
$$\vec{a}\cdot\vec{b}$$  
$$\vec{c}\times\vec{d}$$  
$$\otimes$$  
$$\ast *$$ 

### 지수 표기
superscripts : 지수로 올리고 싶은 부분은 {} 중괄호로 묶어주어야 한다.
```
$$a^{b+1}$$
```
$$a^{b+1}$$

### greek letters
\$백슬래쉬 + 문자철자\$
```
$\pi$
$\alpha$
$S=\pi r^2$
```
$\pi$  
$\alpha$  
$S=\pi r^2$  
원의 넓이처럼 다른 문자와 붙이고 싶다면, 한칸 띄고 작성해야 한다.

### 삼각함수
\$백슬래쉬 + 삼각함수{}\$
```
$\sin{x}$
```
$\sin{x}$


### 로그함수
\$백슬래쉬+log{}\$
```
$\log{x}$
$\log_5{x}$
$\ln{x}$
```
$\log{x}$  
$\log_5{x}$  
$\ln{x}$  

### 제곱근 square roots
```
$\sqrt{2}$
$\sqrt[3]{2}$
$\sqrt{x^2+y^2}$
$\sqrt{1+\sqrt{x}}$
```
$\sqrt{2}$  
$\sqrt[3]{2}$  
$\sqrt{x^2+y^2}$  
$\sqrt{1+\sqrt{x}}$  

### 분수 fractions
displaystyle을 적용하면 커진다
```
About 2/3 
About $2/3$ 
About $\frac{2}{3}$ 
About $\displaystyle{\frac{2}{3}}$ 
$\frac{x}{x^2+x+1}$
$\frac{\sqrt{x+1}}{\sqrt{x-1}}$
$\frac{1}{1+\frac{1}{x}}$
$\sqrt{\frac{x}{x^2+x+1}}$
```
About 2/3   
About $2/3$   
About $\frac{2}{3}$   
About $\displaystyle{\frac{2}{3}}$   
$\frac{x}{x^2+x+1}$  
$\frac{\sqrt{x+1}}{\sqrt{x-1}}$  
$\frac{1}{1+\frac{1}{x}}$  
$\sqrt{\frac{x}{x^2+x+1}}$  


### 괄호
```
$(x+1)$
$3[2+(x+1)]$
${a,b,c}$
$\{a,b,c\}$
$\$12.55$

$3{\frac{2}{5}}$
$3\left(\frac{2}{5}\right)$
$3\left[\frac{2}{5}\right]$
$3\left\{\frac{2}{5}\right\}$ - 오류발생

$\left\{x^2\right\}$ - 오류발생
$\left\{x^2\right.$ - 오류발생
```
$(x+1)$  
$3[2+(x+1)]$  
${a,b,c}$  
$\{a,b,c\}$  
$\$12.55$  
  
$3{\frac{2}{5}}$  
$3\left(\frac{2}{5}\right)$  
$3\left[\frac{2}{5}\right]$  


### 절댓값
그냥 | 기호 입력시 작게 나온다, 크게 입력하려면 위치+기호로 작성
```
$|x|$
$|\frac{x}{x+1}|$
$\left|\frac{x}{x+1}\right|$
```
$|x|$  
$|\frac{x}{x+1}|$  
$\left|\frac{x}{x+1}\right|$  

### 미적분
```
$\int$
$\iint$
$\iiint$
$\oint$

$\dot{x}$
$\ddot{x}$
$\overset{...}{x}$
$\overset{::}{x}$
$x^{\prime}$
```
$\int$  
$\iint$  
$\iiint$  
$\oint$  

$\dot{x}$  
$\ddot{x}$  
$\overset{...}{x}$  
$\overset{::}{x}$  
$x^{\prime}$  

#### textstyle과 displaystyle
\inlinestyle 이 아니다.
```
$\textstyle \int_a^b f \sum_c^d g$
$\displaystyle \int_a^b f \sum_c^d g$
```
$\textstyle \int_a^b f \sum_c^d g$
$\displaystyle \int_a^b f \sum_c^d g$