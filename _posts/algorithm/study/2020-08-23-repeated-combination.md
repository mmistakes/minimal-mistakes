---
title:  "(C++) 중복 조합(Repeated Combination) 구현하기" 

categories:
  - Algorithm
tags:
  - [Algorithm, Coding Test, Cpp, Recursion, STL]

toc: true
toc_sticky: true

date: 2020-08-23
last_modified_at: 2020-08-23
---

## 중복 조합이란

- 순서를 따지지 않는다.
  - `abc`와 `acb`는 같은 존재다.
- 중복을 허용한다.
  - <u>선택 했던 것을 다시 선택할 수 있다.</u>
  - `nHr = n+r-1Cr`로 경우의 수를 구할 수 있다.
    - `n`개에서 `r`개를 중복을 허용해서 뽑을을 수 있다.
    - 중복을 허용하므로 `n`보다 `r`이 더 클 수도 있다.
      - {2, 3}에서 5개 뽑기 가능 
    - 위 공식의 원리
      - {1, 2}에서 4 개를 중복 조합으로 뽑는다면 (n = 2, r = 4)
        - 🟡는 <u>서로 다른 원소를 구분하는 칸막이</u>
          - 서로 다른 원소는 2 개 이므로 이를 구분하는 칸막이🟡는 1 개만 필요하다.
            - 칸막이는 `n - 1`개 필요
        - {1, 1, 1, 1}
          - 1 1 1 1 🟡
        - {1, 1, 1, 2}
          - 1 1 1 🟡 2
        - {1, 1, 2, 2}
          - 1 1 🟡 2 2
        - {1, 2, 2, 2}
          - 1 🟡 2 2 2
        - {2, 2, 2, 2}
          - 🟡 2 2 2 2
      - 이는 마치 🔵🔵🔵🔵🟡 뽑아야 하는 수 4 개와 칸막이 1 개를 합한 것 중에서
        - 총 5 개에서 칸막이로 쓸 1 개를 뽑는는거나 마찬가지다. (`n-1`는 칸막이 개수가 된다.)
          - `n-1` + `r` 에서 `n-1`개를 선택 👉 `n-1+r C n-1`
        - 혹은 총 5 개에서 4 개를 뽑는거나 마찬가지다. (`r`은 원래 뽑아야할 개수)
          - `n-1` + `r` 에서 `r`개를 선택 👉 `n-1+r C r`
        - `nHr = n-1+r C n-1 = n-1+r C r`
      - [참고블로그](http://naver.me/xKGQZ1Ni)
      
<br>

## 재귀로 구현한 코드 1

```cpp
#include <iostream>
#include <vector>

using namespace std;

void Combination(vector<char> arr, vector<char> comb, int r, int index, int depth)
{
    if (r == 0)
    {
        for(int i = 0; i < comb.size(); i++)
            cout << comb[i] << " ";
        cout << endl;
    }
    else if (depth == arr.size())  // depth == n
    {
        return;
    }
    else
    {
        comb[index] = arr[depth];
        Combination(arr, comb, r - 1, index + 1, depth); // arr[depth]를 뽑기로 결정. (중복 조합이므로 다음에 또 arr[depth ] 뽑을 수 있음)
        
        Combination(arr, comb, r, index, depth + 1); // arr[depth]를 뽑지 않기로 결정. 이제 arr[depth + 1] 
    }
}

int main()
{
    vector<char> vec = {'a', 'b', 'c', 'd'}; // n = 4
    
    int r = 3;
    vector<char> comb(r);
    
    Combination(vec, comb, r, 0, 0);  // {'a', 'b', 'c', 'd'}의 중복조합 '4H3' 구하기 

    return 0;
}
```
```
💎출력💎

a a a
a a b
a a c
a a d
a b b
a b c
a b d
a c c
a c d
a d d
b b b
b b c
b b d
b c c
b c d
b d d
c c c
c c d
c d d
d d d
```

- 사실 [조합을 구하는 이 코드](https://ansohxxn.github.io/algorithm/combination/#%EC%9E%AC%EA%B7%80%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%9C-%EC%BD%94%EB%93%9C-1)와 매우 유사하다.
  - 조합
    ```cpp
    comb[index] = arr[depth];
    Combination(arr, comb, r - 1, index + 1, depth + 1);  // depth + 1
        
    Combination(arr, comb, r, index, depth + 1);
    ```
  - 중복조합
    ```cpp
    comb[index] = arr[depth];
    Combination(arr, comb, r - 1, index + 1, depth);  // depth
        
    Combination(arr, comb, r, index, depth + 1);
    ```
  - **조합**을 구할 땐 뽑혔든 뽑히지 않았든 이미 한번 살펴본 `arr` 원소라면 다시는 쳐다보지 말고 지나가야 했기에 뽑든 안뽑든 `depth`를 1 증가 시켜 주었다. `depth + 1`
  - 그러나 **중복 조합**을 구할 땐 
    - `arr[depth]` 원소를 뽑은 경우라면, 중복을 허용하므로 `arr[depth]`가 다시 뽑힐 수 있다. 따라서 `depth`를 1 증가 시켜 `arr`의 다음 원소부터 후보로 삼는게 아니라 그대로 `depth`를 인수로 넘긴다. 현재 뽑힌 이 원소도 다음 단계에서 또 후보가 될 수 있기 때문에
   - `arr[depth]` 원소를 뽑지 않기로 한 경우라면, 뽑지 않기로 결정했으므로 `depth`를 1 증가 시켜 `arr`의 다음 원소부터 후보로 삼는다.
- 코드 원리는 [조합을 구하는 이 코드](https://ansohxxn.github.io/algorithm/combination/#%EC%9E%AC%EA%B7%80%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%9C-%EC%BD%94%EB%93%9C-1) 참조

<br>

## 재귀로 구현한 코드 2

```cpp
#include <iostream>
#include <vector>

using namespace std;

void Combination(vector<char> arr, vector<char> comb, int index, int depth)
{
    if (depth == comb.size()) 
    {
        for(int i = 0; i < comb.size(); i++)
            cout << comb[i] << " ";
        cout << endl;
        
        return;
    }
    else
    {
        for(int i = index; i < arr.size(); i++)
        {
            comb[depth] = arr[i];
            Combination(arr, comb, i, depth + 1);
        }
    }
}

int main()
{
    vector<char> vec = {'a', 'b', 'c', 'd'};   // n = 5
    
    int r = 3;
    vector<char> comb(r);
    
    Combination(vec, comb, 0, 0);  // {'a', 'b', 'c', 'd'}의 중복조합 '4H3' 구하기 

    return 0;
}
```
```
💎출력💎

a a a
a a b
a a c
a a d
a b b
a b c
a b d
a c c
a c d
a d d
b b b
b b c
b b d
b c c
b c d
b d d
c c c
c c d
c d d
d d d
```

- 마찬가지로 이 코드 또한 [조합을 구하는 이 코드](https://ansohxxn.github.io/algorithm/combination/#%EC%9E%AC%EA%B7%80%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%9C-%EC%BD%94%EB%93%9C-2)와 매우 유사하다.
    - 조합
    ```cpp
        for(int i = index; i < arr.size(); i++)
        {
            comb[depth] = arr[i];
            Combination(arr, comb, i + 1, depth + 1);  // i + 1
        }
    ```
  - 중복조합
    ```cpp
        for(int i = index; i < arr.size(); i++)
        {
            comb[depth] = arr[i];
            Combination(arr, comb, i, depth + 1);  // i
        }
    ```
  - **조합**을 구할 땐 이미 한번 살펴본 `arr` 원소라면 다시는 쳐다보지 말고 지나가야 했기에 `i`를 1 증가 시켜 주었다. `i + 1`
  - 그러나 **중복 조합**을 구할 땐 중복을 허용하므로 `arr[i]` 원소가 다음 단계에서 또 후보가 될 수 있다. 따라서 `i`를 1 증가 시켜 `arr`의 다음 원소부터 후보로 삼는게 아니라 그대로 `i`를 인수로 넘긴다. 현재 뽑힌 이 원소도 다음 단계에서 또 후보가 되기 때문에

<br>

## 🚀 조합 vs. 중복조합

- *조합* 👉 뽑기로 결정했던, 안뽑기로 결정했던, 한번 살펴본 원소는 다신 살펴보지 않는다. 
  - 뽑은 원소도, 안뽑은 원소도, 다음 후보에 등록될 수 없다.
- *중복 조합* 👉 뽑은 원소는 다음에 다시 또 뽑을 수 있다. 다음 뽑기 후보다 또 될 수 있다.
  - 그러나 안뽑은 원소는 다음 후보에 등록될 수 없다.

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}