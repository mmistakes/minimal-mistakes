---
title:  "[ChunK] Time in ChunK" 

categories:
  - ChunK
tags:
  - [ChunK, Music, Programming]

toc: true
toc_sticky: true

date: 2021-09-02
last_modified_at: 2021-09-02
---



## Theory 
  **소리**를 조작하기 위해서는 **시간**을 관리할 줄 알아야한다
 
## how time works in Chuck
- **time** and **dur** are native types
- the **now** keyword holds the current Chuck time
- by manipulating **now** (and only by manipulating **now**), advance time to generate sound

## **time** and **dur**

- native types (like **int** and **float**)
- can declare variables to store values
- can perform arithmetic

## differ time and dur
time 은 한 포인트를 나타내고 dur 은 시간의 길이를 나타낸다
- **time** : a point in time
- **dur** : a length of time

## default durations in ChunK!!
내장되어 있는 durations 값들이 있으므로 활용하는것이 좋다
samp는 엄청 작은 단위이고 아래로 갈수록 점점 길이가 길어진다고 생각하면 된다.
<br>
<br>
![image](https://user-images.githubusercontent.com/69495129/131812074-2a08fee1-a527-483a-90ce-41126d7c8429.png)

## now의 등장
**now is a *special* time variable**
now is actually a time

### Read now
when read : gives you the current ChunK time
<br>
<br>
![image](https://user-images.githubusercontent.com/69495129/131812678-7c627a78-026a-4d4f-848a-5944b13f733a.png)
<br>
<br>
![image](https://user-images.githubusercontent.com/69495129/131812649-708b6c50-14d5-4e67-9a2c-78050f88a77b.png)
<br>
<br>
![image](https://user-images.githubusercontent.com/69495129/131812832-f38ad608-2347-487f-a80d-4918a6cd773e.png)
<br>
<br>

![image](https://user-images.githubusercontent.com/69495129/131812854-df85e647-4fd5-4439-8a54-2336db8e598e.png)


### Modify now
when modify : moves time along in Chuck
![image](https://user-images.githubusercontent.com/69495129/131813106-a14db648-1c18-4f43-919f-450fa784031f.png)
![image](https://user-images.githubusercontent.com/69495129/131813270-41aaacac-c793-430d-a9a8-d57c17d15b4a.png)
<br>
<br>
3초를 기다린후 NEW now print 문이 실행된다.

<br>
![image](https://user-images.githubusercontent.com/69495129/131813593-fca7a1d9-52ec-40d7-9f2b-ad34392101d1.png)
<br>
<br>
ChunK actually knows to automatically suspend code at this point! 알아서 중지시켜준다. 저 시간이 지날 동안 코드가 중지되고 100ms가 지나면 다시 실행된다.


## Alarm Demo
```java
now + 6::second => time later;

while(now < later)
{
	// print out
	<<< "time left:", (later-now)/second >>>;
	// advance time
	1::second => now;
}

<<< "It'S" TIME!!!" >>>;
SinOsc foo => dac;
880 => foo.freq;
2::second => now;

```




## Summary
- chucking a duration to **now** advances ChunK time precisely by that amount ( while automatically suspending your code and letting sound generate)
- **now** will never move forward unless / until you manipulate it ===> so until you explicitly advance time, you are actually working at a single point time





 🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

