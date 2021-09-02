---
title:  "[ChunK] Libraries and Intro to Arrays"

categories:
   - ChunK
tags:
   - [ChunK, Music, Programming,Libraries,Arrays]

toc: true
toc_sticky: true

date: 2021-09-02
last_modified_at: 2021-09-02
---


평소에 알고 있는 다양한 프로그래밍언어와 비슷한 문법 구조이다.

## Absolute Values

| METHOD                | OUTPUT | DESCRIPTION                                     |
| --------------------- | ------ | ----------------------------------------------- |
| std.abs(int value)    | int    | returns absolute value of integer               |
| std.fabs(float value) | float  | returns absolute value of floating point number |
| std.sgn(float value)  | float  | computes sign of the input                      |


                                                                                                

## Unit Conversion

| METHOD                   | OUTPUT | DESCRIPTION                                             |
| ------------------------ | ------ | ------------------------------------------------------- |
| Std.powtodb(float value) | float  | Converts signal power ratio to decibels (dB)            |
| Std.rmstodb(float value) | float  | Converts linear amplitude to decibels (dB)              |
| Std.dbtopow(float value) | float  | Converts decibels (dB) to signal power ratio            |
| Std.dbtorms(float value) | float  | Converts decibels (dB) to linear amplitude              |
| Std.atoi(string value)   | int    | converts ascii (string) to integer (int)                |
| Std.atof(string value)   | float  | converts ascii (string) to floating point value (float) |
| Std.itoa(int value)      | string | converts integer(int) to ascii(string)                  |
| Std.ftoa(float value)    | string | converts floating point value (float) to ascii (string) |




## Random Numbers

| METHOD                              | OUTPUT | DESCRIPTION                                                  |
| ----------------------------------- | ------ | ------------------------------------------------------------ |
| Math.random()                       | int    | generates random integer ben 0 and MATH.RANDOM_MAX           |
| Math.random2(int min, int max)      | int    | generates random integer in the range [min,max]              |
| Math.randomf()                      | float  | generates random floating point number in the range [0,1]    |
| Math.random2f(float min, float max) | float  | generates random floating point number in the range [min,max] |

## Arrays 
```java

// array declaration (1st way)

int A[7];

54 => A[0];
56 => A[1];
62 => A[2];
54 => A[3];
48 => A[4];
50 => A[5];
52 => A[6];

// array declaration (2nd way)

[54,56,62,54,48,50,52] @=> int A[];


// array lookup
// how do we get data
A[1] => int data;

// what does this print out?
<<< data >>> ;

// A.cap() is max number of element of A[]
<<< A.cap() >>>;

// loop

for ( 0 => int i; i< A.cap(); i++)
{
  your code here   
}


```

## Summary
- 수 사이에 랜덤값을 구하는 API는 따로 없는경우가 있는데, ChunK 의 라이브러리에는 있기 때문에 잘 활용하면 도움이 많이 될것 같다
-  @=>(at chunk) 을 사용해서 배열을 정의하는 방법도 있기 때문에 잘 이용해야 할 것 같다.



🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

