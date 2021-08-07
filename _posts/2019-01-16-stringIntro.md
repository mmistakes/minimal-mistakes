---
title:  "[문자열] 문자열 매칭의 개요"
date:   2019-01-16 03:16:00
categories:
- Hard-Algorithm
tags:
---

이 카테고리에서는 문자열 매칭 알고리즘(String Matching Algorithm)을 주로 다룹니다.<br>
문자열 매칭 알고리즘의 목적은 전체 문자열 S에서 패턴 P를 찾는 것입니다.

본격적으로 문자열 매칭 알고리즘을 알아보기 전에, 이 글에서는 누구나 짤 수 있는 Naive한 방법 하나만 알아봅시다.<br>
S에서 P를 찾는 가장 간단한 방법은 **모두 돌려보는 것** 입니다.<br>
S에서 P가 처음으로 나오는 인덱스를 반환하는 find함수는 아래와 같이 작성할 수 있습니다.
```cpp
int find(string S, string P){
  int n = S.size(), m = P.size();
  for(int i=0; i<n; i++){
  	bool flag = 1;
    for(int j=0; j<m; j++){
      if(S[i+j] != P[j]){ flag = 0; break; }
    }
    if(flag) return i;
  }
  return -1;
}
```
시간 복잡도는 최악의 경우에 O(nm)이 나옵니다.

다음 글에서는 KMP라는 알고리즘을 활용해 O(n + m)만에 구하는 방법을 알아보도록 하겠습니다.
