---
title: "[선린 알고리즘 연구반] 알고리즘 기초 최종 모의고사"
date: 2019-06-21 02:34:00
categories:
- SunrinKoi
tags:
- Sunrin-Koi
---

<img src = "https://i.imgur.com/QC9OcLM.png"><br>

# 고려대는 사랑입니다

### 문제 링크
* http://icpc.me/11942

### 풀이
생략

# 소가 길을 건너간 이유 1

### 문제 링크
* http://icpc.me/14467

### 풀이
단순 구현 문제. 풀이 생략

# 비밀번호

### 문제 링크
* http://icpc.me/13908

### 풀이
모든 경우를 다 돌려보자.

# Angry Cows (Silver)

### 문제 링크
* http://icpc.me/11973

### 풀이
chk(R) : 반지름이 R일 때 가능?
```cpp
bool chk(ll m){
	ll idx = 0;
	for(int i=0; i<k; i++){
		if(idx >= n) break;
		idx = upper_bound(v.begin(), v.end(), v[idx] + 2*m) - v.begin();
	}
	return idx == n;
}
```

# 개업

### 문제 링크
* http://icpc.me/13910

### 풀이
동전 거스름돈 문제 비슷하게 dp를 돌리자.

# 출근

### 문제 링크
* http://icpc.me/13903

### 풀이
문제의 조건에 따라 BFS를 돌리자.

# My Cow Ate My Homework

### 문제 링크
* http://icpc.me/15460

### 풀이
배열을 뒤에서 부터 보자.<br>
**small[i] = i ~ n 범위의 최솟값, sum[i] = i ~ n 범위의 합** 처럼 정의하면 두 배열 모두 O(N)에 구할 수 있다.<br>
실수 비교는 부동 소수점때문에 토 나오니까 분수로 표현하자.
```cpp
struct asdf{
	ll a, b;
	asdf(){}
	asdf(ll _a, ll _b){
		ll g = gcd(_a, _b);
		a = _a / g;
		b = _b / g;
	}
	bool operator < (const asdf &x){
		return a*x.b < x.a*b;
	}
	bool operator == (const asdf &x){
		return a*x.b == x.a*b;
	}
};
```

# 대문자

### 문제 링크
* http://icpc.me/13906

### 풀이
dp[K] = K ~ L에서 가능한 경우의 수<br>
[코드](http://boj.kr/9d18e79b18d64d9c97650bb51cd73122)

# 세부

### 문제 링크
* http://icpc.me/13905

### 풀이
decision함수를 BFS로 구현한 뒤, Parametric Search를 하자.

# 집 구하기

### 문제 링크
* http://icpc.me/13911

### 풀이
스타벅스에서 시작하는 다익스트라, 맥도날드에서 시작하는 다익스트라
