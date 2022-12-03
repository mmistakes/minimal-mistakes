---
title:  "[STL 컨테이너] map 과 set의 정렬" 

categories:
  - STL
tags:
  - [Data Structure, Coding Test, Cpp, STL]

toc: true
toc_sticky: true

date: 2021-01-30
last_modified_at: 2021-01-30
---

## 🚀 Key에 의한 정렬

map과 set은 자동으로 정렬된다. 이 map과 set의 정렬 기준은 선언할 때 결정할 수 있다. (디폴트는 Key를 기준으로한 오름차순 정렬)

```cpp
map<int, int> m1;   // Key 오름차순 정렬
map<int, int, greater<int>()> m2; // Key 내림차순 정렬
```
```cpp
struct cmp {
    bool operator()(const int& a, const int& b) const {
        return a < b;
    }
};

// ...
map<int, int, cmp> m3;  // Key 를 커스텀 비교 함수로 정렬 (priority_queue처럼 () 연산자 오버로드로 사용)
```

<br>

## 🚀 Value에 의한 정렬

map은 Key를 기준으로 정렬하기 때문에 Value로 정렬하려면 map과 모든 원소들을 pair를 원소로 가지는 Vector로 복사한 후 이 Veter를 Value (second)기준으로 정렬하면 된다. 

```cpp
bool compare(pair<int, int> a, pair<int, int> b)
{
    return a.second > b.second; // Value로 정렬
}

//...
map<int, int> count;

//...

vector<pair<int, int>> sortByValue(count.begin(), count.end()); // count map을 vector sortByBalue에 복사
sort(sortByValue.begin(), sortByValue.end(), compare); // Value로 정렬
```

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}