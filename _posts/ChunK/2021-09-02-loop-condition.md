---
title:  "[ChunK] If and Else & Loop"

categories:
  - ChunK
tags:
  - [ChunK, Music, Programming,loop,condition]

toc: true
toc_sticky: true

date: 2021-09-02
last_modified_at: 2021-09-02
---


평소에 알고 있는 다양한 프로그래밍언어와 비슷한 문법 구조이다.

## If - Else
```java
// sound network
SinOsc s => dac;

// set frequency
222.45 => s.freq;
// set volume
0.2 => s.gain;

// chance variable
3 => int chance;

if( chance == 1 )
{
  // sound only plays if chance == 1
  1::second => now;
}
else
{
  // set new frequency
  440.32 => s.freq;
  // play for 3 seconds 
  3::second => now;
}


```


## For statement


```java
for( 0 => int i; i<4; i++)
{
  <<< i >>>;
  1::second => now;
}

```
```java

SinOsc s => dac; // sound network

// For loop
for(20 => int i ; i< 400 ; i++)
{
  <<< i >>>;
  i => s.freq;
  .01::second => now;
}

```


## while statement


```java
// sound network
SinOsc s => dac;

// initialize variable i 
20 => int i;

while( i < 400 ) 
{
  i => s.freq;
  <<< i >>>;
  0.01::second => now;
  // update in loop
  i++;
}

```


## Summary
일반적인 프로그래밍 언어와 비슷하다. 역시 할당하는데 좌우만 신경써주면된다.




🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

