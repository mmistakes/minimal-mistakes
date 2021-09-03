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
![img_1.png](img_1.png)

## Sampling Period
![image](https://user-images.githubusercontent.com/69495129/131868366-46765ca9-9d9d-462b-be57-cd019813bed0.png)


## wav 파일 불러오기
```java
// sound chain
SndBuf mySound => dac;

// directory of this file
me.dir() => string path;


//define the filename
"/audio/snare_01.wav" => string filename;
path + filename => filename;

// open up soundfile
filename => mySound.read;
// simple control

0 => mySound.pos; // sets playhead position

1::second => now;
```


## Sample Management
```java
// sample management

// sound chain

SndBuf snare => dac;

// array of strings (paths) array want to insert path

string snare_samples[3];

// load array with file paths

for(1 => int i; i < snare_samples.cap()+1; i++)
{
     me.dir() + "/audio/snare_0"+i+".wav" => snare_samples[i-1];
}
//me.dir() + "/audio/snare_01.wav" => snare_samples[0];
//me.dir() + "/audio/snare_02.wav" => snare_samples[1];
//me.dir() + "/audio/snare_03.wav" => snare_samples[2];

// how many samples?
<<< snare_samples.cap() >>>;

// infinite loop
while(true)
{
    Math.random2(0,snare_samples.cap()-1) => int which;
    snare_samples[which] => snare.read;
    250::ms => now;
    
}

```

## Stereo Playback

```java
// sound chain
SndBuf2 mySound => dac;

// read the file into string
me.dir() + "/audio/stereo_fx_01.wav" => string filename;
//open up soundfile
filename => mySound.read;

// infinite loop
while(true)
{
    Math.random2f(.6 ,1.0) => mySound.gain;
    Math.random2f(.2,1.8) => mySound.rate;
    0 => mySound.pos;
    5::second => now;
}
```

## Modulo
![image](https://user-images.githubusercontent.com/69495129/131868421-921d4012-7ac0-4aeb-a969-db39308bd212.png)



## Summary
- **folder structure** 가 중요하므로 주의해서 사용한다


🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

