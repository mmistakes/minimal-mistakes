---
title:  "[ChunK] Functions in ChunK"

categories:
  - ChunK
tags:
  - [ChunK, Music,funtion]

toc: true
toc_sticky: true

date: 2021-09-03
last_modified_at: 2021-09-03
---

ChunK 에서의 함수를 배워보자, 개인적으로 Java lang 에서의 function 과 비슷하다고 생각한다.


## Introduction to Functions
![image](https://user-images.githubusercontent.com/69495129/131992570-1e605bd7-0c09-4fb1-83ca-d0b4efb8e6b7.png)
![image](https://user-images.githubusercontent.com/69495129/131992610-0a5fcb75-c898-4ab2-b65f-6129dee89e39.png)

## Basic Function Examples
```java
// function
fun int myAdd(int x, int y)
{
    // two inputs locally known as x and y
    // returns an integer
    
    int result; // variable to store final answer
    x+y => result;  // add x + y
    return result;  // output final answer
}

// MAIN PROGRAM
// call myAdd function

myAdd(8,12) => int answer;

<<< answer >>> ;    // printed 20 : ( int) 

```

## Local vs. Global
```java
8 => int k;
fun int myAdd(int x, int y)
{
    // two inputs locally known as x and y
    // returns an integer
    
    int result; // variable to store final answer
    x+y => result;  // add x + y
    return result;  // output final answer
}
myAdd(k,12) => int answer; // it is ok cuz k is global variable
// <<< result >>> ; // this gave error cuz result is local variable in myAdd function
```


## Functions Through Music
```java
SinOsc s => dac;
SinOsc t => dac;
SinOsc u => dac;


// function
fun float octave( float originalFreq)
{
       // calculate octave of input frequency
    return originalFreq * 2;
    
}


fun float fifth( float originalFreq)
{
       // calculate octave of input frequency
    return originalFreq * 1.5;
    
}

for( 20 => float i ; i < 500 ; i+ .5 => i)
{
    i=> s.freq;
    octave(i) => t.freq;
    fifth(i) => u.freq;
    
    <<< s.freq(),t.freq() >>>;
    1::ms => now;
}

```

## Functions to make form

```java
// sound chain
SndBuf click => dac;
SndBuf kick => dac;


// open sound files;

me.dir() + "/audio/kick_01.wav" => kick.read;
me.dir() + "/audio/snare_03.wav" => click.read;

// tack away playback at initialization

kick.samples() => kick.pos;
click.samples() => click.pos;

// global

[1,0,0,0,1,0,0,0] @=> int kick_ptrn_1[];
[0,0,1,0,0,0,1,0] @=> int kick_ptrn_2[];
[1,0,1,0,1,0,1,0] @=> int click_ptrn_1[];
[1,1,1,1,1,1,1,1] @=> int click_ptrn_2[];

fun void section (int kickArray[], int clickArray[], float beattime)
{
    for(0 => int i; i< kickArray.cap(); i++)
    {
        if(kickArray[i] == 1){
           0 => kick.pos;
        }
        if(clickArray[i] == 1){
           0 => click.pos;
        }
        beattime::second => now;
    }
    
}

while(true)
{
    section(kick_ptrn_1,click_ptrn_1,.2);
    section(kick_ptrn_2,click_ptrn_2,.2);

}

```

## Recursion 
다른 프로그래밍 언어와 비슷하다.
```java

fun int factorial(int x ) 
{
  if(x<=1)
  {
    return 1;
  }
  else
  {
    return (x*factorial(x-1));
  }
  
}

<<< factorial(4) >>> ; // printed 24
```



## Summary
- 서서히 음악파일을 가져와서 beat 를 Array로 지정하고 음악을 재생하는 법을 배웠다. 더 다양한 방법을 배워서 나만의 플레이리스트를 만들고싶다.


🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

