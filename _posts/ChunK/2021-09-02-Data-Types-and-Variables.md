---
title:  "[ChunK] Data Types and Variables" 

categories:
  - ChunK
tags:
  - [ChunK, Music, Programming]

toc: true
toc_sticky: true

date: 2021-09-02
last_modified_at: 2021-09-02
---




## 변수 선언 및 값 할당,출력
```java
// Integer Example


// define integer
int a;
// store 2 in a
2=> a;

<<< a >>>;


```


## 변수를 이용한 계산식


```java
// Integer Example

// define integer
2 => int a;
// multiply by 10
10 *=> a;
// print a
<<< a >>>;


```

## float 를 사용하여 주기, 크기 설정


```java
// sound network
SinOsc s => dac;

// middle C freq (in hz)
261.63 => float myFreq;
// variable for volume control
0.6 => float myVol;

// set frequency
myFreq = s.freq;
// set volume
myVol => s.gain;

1::second => now;


```

## 여러가지 타입
![image](https://user-images.githubusercontent.com/69495129/131806370-87763969-c81a-4311-a1c8-0564649f043a.png)

## Summary
일반적인 프로그래밍 언어와 비슷하다. 단지, 할당할 때 좌우 방향이 달라서 적응하는데 시간이 걸릴 것 같다.




 🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

