---
title:  "(C++) 순열(Permutation) 구현하기" 

categories:
  - Algorithm
tags:
  - [Algorithm, Coding Test, Cpp, Recursion, STL]

toc: true
toc_sticky: true

date: 2020-08-20
last_modified_at: 2020-08-20
---

> 순열은 완전 탐색(브루트 포스) 문제에서 많이 등장하므로 잘 익혀놓자.

<br>

## 순열이란

> 선택 순서가 결과에 영향을 미치는 경우! (1,2)와 (2,1)은 달라야 할 때

- 순서를 따진다.
  - `abc` 와 `acb`는 서로 다른 존재이다.
- 중복을 허용하지 않는다.
- `nPr`
  - 5P3 = 5 X 4 X 3
  - 4P1 = 4
  - 4P4 = 4! = 4 X 3 X 2 X 1

<br>

## 재귀로 구현한 코드 1

> 예시) `{'a', 'b', 'c', 'd'}` 배열의 `4P3`의 순열 출력하기

```cpp
#include <iostream>

using namespace std;

void swap(char & a, char & b)
{
    char temp = a;
    a = b;
    b = temp;
}

void permutation(char data [], int depth, int n, int r)
{
    if (depth == r)
    {
        for(int i = 0; i < r; i++)
            cout << data[i] << " ";
        cout << endl;
        
        return;
    }
    
    for(int i = depth; i < n; i++)
    {
        swap(data[depth], data[i]);   // 스왑
        permutation(data, depth + 1, n, r);  // ⭐재귀
        swap(data[depth], data[i]);  // 다시 원래 위치로 되돌리기
    }
}
```
```cpp

int main()
{
    char arr [] = {'a', 'b', 'c', 'd'};
    
    permutation(arr, 0, 4, 3); // 4P3

    return 0;
}

```
```
💎출력💎

a b c
a b d
a c b
a c d
a d c
a d b
b a c
b a d
b c a
b c d
b d c
b d a
c b a
c b d
c a b
c a d
c d a
c d b
d b c
d b a
d c b
d c a
d a c
d a b
```


<br>

### 설명

- {a, b, c, d} 모든 순열은 `depth = 0`, (0 ~ n - 1) 인덱스의 순열 상태라고 할 수 있다. 그리고 아래와 같이 구성된다. 
  - a 로 시작하는 {b, c, d} 모든 순열
  - b 로 시작하는 {a, c, d} 모든 순열
  - c 로 시작하는 {b, a, d} 모든 순열
  - d 로 시작하는 {b, c, a} 모든 순열
  - 어떤 것으로 시작하는지는(prefix) 스왑 하여 자리를 서로 바꿔 주어 결정하면 되고 <u>`depth = 1`로 들어가 depth 값인 1부터 시작하여 (1 ~ n - 1)인덱스의 순열 상태를 구해주면 된다.</u> 👉 **재귀적 방식**
    - 즉 prefix 가 되는 앞 글자는 고정해준 후 그 뒤에 있는 원소들끼리의 순열을 구하면 된다.
    - 재귀할 수록 depth가 증가하면서 prefix는 길어지고 뒤에 원소들은 점점 없어진다.
    - `depth`는 prefix를 제외하고 다음 순열 범위의 첫번째 위치를 뜻한다.
      - `depth`를 초기값인 0 부터 넘겨주어 1 씩 증가시켜 깊게 들어간다. 
      - `nPr` 이므로 r번째까지 들어가면 되므로 `depth == r`이 될 때 재귀 종료된다.
  - 스왑 하고 재귀한 후 다시 스왑하여 원래 자리로 되돌려야 한다.
    - 스왑은 위 코드처럼 직접 `void swap` 함수를 구현할 수도 있지만 STL알고리즘 헤더에서 지원하는 `iter_swap` 함수를 사용할 수도 있다!
      ```cpp
      #include <algorithm>

      iter_swap(str.begin() + depth, str.begin() + i);
      ```

> 처음엔 prefix 가 아무것도 없는 상태로 시작하므로 `depth = 0`부터 시작한다. 따라서 첫 호출은 permutation(arr, <u>0</u>, 4, 3); 로 해주어야 함.

<br>

#### 재귀 과정

> <u>{a, b, c, d}</u> 배열의 `4P3` 순열을 예시로 들어 보겠다. **총 4 X 3 X 2 = 24 개의 경우가 나온다**

  - {a, b, c, d} 의 모든 `4P3`짜리 순열
    - **depth = 0**
    - 1️⃣ 첫 원소가 `a`로 시작하는 {b, c, d} 의 모든 `3P2`짜리 순열
      - ↑ {a, b, c, d} 상태에서 `a`와 `a`끼리 스왑하면 만들 수 있다 👉 {`a`, b, c, d}
      - **depth = 1**
        - 1️⃣ 첫 원소가 `ab`로 시작하는 {c, d} 의 모든 `2P1`짜리 순열
          - ↑ {a, b, c, d} 상태에서 `b`와 `b`끼리 스왑하면 만들 수 있다  👉 {`a`, `b`, c, d}
          - **depth = 2**
            - 1️⃣ 첫 원소가 `abc`로 시작하는 {d} 의 모든 `1P0`짜리 순열
              - ↑ {a, b, c, d} 상태에서 `c`와 `c`끼리 스왑하면 만들 수 있다  👉 {`a`, `b`, `c`, d}
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨a b c✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {a, b, c, d}
            - 2️⃣ 첫 원소가 `abd`로 시작하는 {c} 의 모든 `1P0`짜리 순열
              - ↑ {a, b, c, d} 상태에서 `c`와 `d`끼리 스왑하면 만들 수 있다 👉 {`a`, `b`, `d`, c}
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨a b d✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {a, b, c, d}
          - 다시 한단계 이전 정렬로 되돌리기 {a, b, c, d}
        - 2️⃣ 첫 원소가 `ac`로 시작하는 {b, d} 의 모든 `2P1`짜리 순열
          - ↑ {a, b, c, d} 상태에서 `b`와 `c`끼리 스왑하면 만들 수 있다 👉 {`a`, `c`, b, d} 
          - **depth = 2**
            - 1️⃣ 첫 원소가 `acb`로 시작하는 {d} 의 모든 `1P0`짜리 순열
              - ↑ {a, c, b, d} 상태에서 `b`와 `b`끼리 스왑 👉 {`a`, `c`, `b`, d}
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨a c b✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {a, c, b, d}
            - 2️⃣ 첫 원소가 `acd`로 시작하는 {b} 의 모든 `1P0`짜리 순열
              - ↑ {a, c, b, d} 상태에서 `b`와 `d`끼리 스왑 👉 {`a`, `c`, `d`, `b`}
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨a c d✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {a, c, b, d}
          - 다시 한단계 이전 정렬로 되돌리기 {a, b, c, d}
        - 3️⃣ 첫 원소가 `ad`로 시작하는 {b, c} 의 모든 `2P1`짜리 순열
          - ↑ {a, b, c, d} 상태에서 `b`와 `d`끼리 스왑 👉 {`a`, `d`, c, b}
          - **depth = 2**
            - 1️⃣ 첫 원소가 `adc`로 시작하는 {c} 의 모든 `1P0`짜리 순열
              - ↑{a, d, c, b} 상태에서 `c`와 `c`끼리 스왑 👉 {`a`, `d`, `c`, b}
                - **depth = 3**
                  - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨a d c✨ 를 출력 한다.</u>
                - 다시 한단계 이전 정렬로 되돌리기 {a, d, c, b}
            - 2️⃣ 첫 원소가 `adb`로 시작하는 {c} 의 모든 `1P0`짜리 순열
              - ↑ {a, d, c, b}  상태에서 `c`와 `b`끼리 스왑 👉 {`a`, `d`, `b`, c}
                - **depth = 3**
                  - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨a d b✨를 출력 한다.</u>
                - 다시 한단계 이전 정렬로 되돌리기 {a, c, b, d}
          - 다시 한단계 이전 정렬로 되돌리기 {a, b, c, d}
      - 다시 한단계 이전 정렬로 되돌리기 {a, b, c, d}
    - 2️⃣ 첫 원소가 `b`로 시작하는 {a, c, d} 의 모든 `3P2`짜리 순열
      - ↑ {a, b, c, d} 상태에서 `a`와 `b`끼리 스왑하면 만들 수 있다 👉 {`b`, a, c, d}
      - **depth = 1**
        - 1️⃣ 첫 원소가 `ba`로 시작하는 {c, d} 의 모든 `2P1`짜리 순열
          - ↑ {b, a, c, d} 상태에서 `a`와 `a`끼리 스왑하면 만들 수 있다  👉 {`b`, `a`, c, d} 
          - **depth = 2**
            - 1️⃣ 첫 원소가 `bac`로 시작하는 {d} 의 모든 `1P0`짜리 순열
              - ↑ {b, a, c, d} 상태에서 `c`와 `c`끼리 스왑하면 만들 수 있다  👉 {`b`, `a`, `c`, d} 
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨b a c✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {b, a, c, d}
            - 2️⃣ 첫 원소가 `bad`로 시작하는 {c} 의 모든 `1P0`짜리 순열
              - ↑ {b, a, c, d} 상태에서 `c`와 `d`끼리 스왑하면 만들 수 있다  👉 {`b`, `a`, `d`, c} 
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨b a d✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {b, a, c, d}
          - 다시 한단계 이전 정렬로 되돌리기 {b, a, c, d}
        - 2️⃣ 첫 원소가 `bc`로 시작하는 {a, d} 의 모든 `2P1`짜리 순열
          - ↑ {b, a, c, d} 상태에서 `a`와 `c`끼리 스왑하면 만들 수 있다 👉 {`b`, `c`, a, d} 
          - **depth = 2**
            - 1️⃣ 첫 원소가 `bca`로 시작하는 {d} 의 모든 `1P0`짜리 순열
              - ↑ {b, c, a, d} 상태에서 `a`와 `a`끼리 스왑 👉 {`b`, `c`, `a`, d} 
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨b c a✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {b, c, a, d}
            - 2️⃣ 첫 원소가 `bcd`로 시작하는 {a} 의 모든 `1P0`짜리 순열
              - ↑ {b, c, a, d} 상태에서 `a`와 `d`끼리 스왑 👉 {`b`, `c`, `d`, a}
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨b c d✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {b, c, a, d}
          - 다시 한단계 이전 정렬로 되돌리기 {b, a, c, d}
        - 3️⃣ 첫 원소가 `bd`로 시작하는 {a, c} 의 모든 `2P1`짜리 순열
          - ↑ {b, a, c, d} 상태에서 `a`와 `d`끼리 스왑 👉 {`b`, `d`, c, a}
          - **depth = 2**
            - 1️⃣ 첫 원소가 `bdc`로 시작하는 {a} 의 모든 `1P0`짜리 순열
              - ↑ {b, d, c, a}상태에서 `c`와 `c`끼리 스왑 👉 {`b`, `d`, `c`, a}
                - **depth = 3**
                  - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨b d c✨ 를 출력 한다.</u>
                - 다시 한단계 이전 정렬로 되돌리기 {b, d, c, a}
            - 2️⃣ 첫 원소가 `bda`로 시작하는 {c} 의 모든 `1P0`짜리 순열
              - ↑ {b, d, c, a} 상태에서 `c`와 `a`끼리 스왑 👉 {`b`, `d`, `a`, c}
                - **depth = 3**
                  - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨b d a✨를 출력 한다.</u>
                - 다시 한단계 이전 정렬로 되돌리기 {b, d, c, a}
          - 다시 한단계 이전 정렬로 되돌리기 {b, a, c, d}
      - 다시 한단계 이전 정렬로 되돌리기 {a, b, c, d}
    - 3️⃣ 첫 원소가 `c`로 시작하는 {b, a, d} 의 모든 `3P2`짜리 순열
      - ↑ {a, b, c, d} 에서 `a`와 `c`끼리 스왑 👉 {`c`, b, a, d}
      - **depth = 1**
        - 1️⃣ 첫 원소가 `cb`로 시작하는 {a, d} 의 모든 `2P1`짜리 순열
          - ↑ {c, b, a, d} 상태에서 `b`와 `b`끼리 스왑하면 만들 수 있다  👉 {`c`, `b`, a, d}
          - **depth = 2**
            - 1️⃣ 첫 원소가 `cba`로 시작하는 {d} 의 모든 `1P0`짜리 순열
              - ↑ {c, b, a, d} 상태에서 `a`와 `a`끼리 스왑하면 만들 수 있다  👉 {`c`, `b`, `a`, d}
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨c b a✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {c, b, a, d}
            - 2️⃣ 첫 원소가 `cbd`로 시작하는 {a} 의 모든 `1P0`짜리 순열
              - ↑ {c, b, a, d} 상태에서 `a`와 `d`끼리 스왑하면 만들 수 있다  👉 {`c`, `b`, `d`, a}
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨c b d✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {c, b, a, d}
          - 다시 한단계 이전 정렬로 되돌리기 {c, b, a, d} 
        - 2️⃣ 첫 원소가 `ca`로 시작하는 {b, d} 의 모든 `2P1`짜리 순열
          - ↑ {c, b, a, d}  상태에서 `b`와 `a`끼리 스왑하면 만들 수 있다 👉 {`c`, `a`, b, d} 
          - **depth = 2**
            - 1️⃣ 첫 원소가 `cab`로 시작하는 {d} 의 모든 `1P0`짜리 순열
              - ↑ {c, a, b, d} 상태에서 `b`와 `b`끼리 스왑 👉 {`c`, `a`, `b`, d} 
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨c a b✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {c, a, b, d}
            - 2️⃣ 첫 원소가 `cad`로 시작하는 {b} 의 모든 `1P0`짜리 순열
              - ↑ {c, a, b, d} 상태에서 `b`와 `d`끼리 스왑 👉 {`c`, `a`, `d`, b} 
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨c a d✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {c, a, b, d}
          - 다시 한단계 이전 정렬로 되돌리기 {c, b, a, d}
        - 3️⃣ 첫 원소가 `cd`로 시작하는 {a, b} 의 모든 `2P1`짜리 순열
          - ↑  {c, b, a, d} 상태에서 `b`와 `d`끼리 스왑 👉 {`c`, `d`, a, b}
          - **depth = 2**
            - 1️⃣ 첫 원소가 `cda`로 시작하는 {b} 의 모든 `1P0`짜리 순열
              - ↑ {c, d, a, b} 상태에서 `a`와 `a`끼리 스왑 👉 {`c`, `d`, `a`, b} 
                - **depth = 3**
                  - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨c d a✨ 를 출력 한다.</u>
                - 다시 한단계 이전 정렬로 되돌리기 {c, d, a, b}
            - 2️⃣ 첫 원소가 `cdb`로 시작하는 {a} 의 모든 `1P0`짜리 순열
              - ↑ {c, d, a, b} 상태에서 `a`와 `b`끼리 스왑 👉 {`c`, `d`, `b`, a} 
                - **depth = 3**
                  - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨c d b✨를 출력 한다.</u>
                - 다시 한단계 이전 정렬로 되돌리기 {c, d, a, b}
          - 다시 한단계 이전 정렬로 되돌리기 {c, b, a, d}
      - 다시 한단계 이전 정렬로 되돌리기 {a, b, c, d}
    - 4️⃣ 첫 원소가 `d`로 시작하는 {b, c, a} 의 모든 `3P2`짜리 순열
      - ↑ {a, b, c, d} 에서 `a`와 `d`끼리 스왑 👉 {`d`, b, c, a}
      - **depth = 1**
        - 1️⃣ 첫 원소가 `db`로 시작하는 {c, a} 의 모든 `2P1`짜리 순열
          - ↑ {d, b, c, a} 상태에서 `b`와 `b`끼리 스왑하면 만들 수 있다  👉 {`d`, `b`, c, a}
          - **depth = 2**
            - 1️⃣ 첫 원소가 `dbc`로 시작하는 {a} 의 모든 `1P0`짜리 순열
              - ↑ {d, b, c, a} 상태에서 `c`와 `c`끼리 스왑하면 만들 수 있다  👉 {`d`, `b`, `c`, a}
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨d b c✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {d, b, c, a}
            - 2️⃣ 첫 원소가 `dba`로 시작하는 {c} 의 모든 `1P0`짜리 순열
              - ↑ {d, b, c, a} 상태에서 `c`와 `a`끼리 스왑하면 만들 수 있다  👉 {`d`, `b`, `a`, c}
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨d b a✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {d, b, c, a}
          - 다시 한단계 이전 정렬로 되돌리기 {d, b, c, a}
        - 2️⃣ 첫 원소가 `dc`로 시작하는 {b, a} 의 모든 `2P1`짜리 순열
          - ↑ {d, b, c, a} 상태에서 `b`와 `c`끼리 스왑하면 만들 수 있다 👉 {`d`, `c`, b, a} 
          - **depth = 2**
            - 1️⃣ 첫 원소가 `dcb`로 시작하는 {a} 의 모든 `1P0`짜리 순열
              - ↑ {d, c, b, a} 상태에서 `b`와 `b`끼리 스왑 👉 {`d`, `c`, `b`, a} 
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨d c b✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {d, c, b, a}
            - 2️⃣ 첫 원소가 `dca`로 시작하는 {b} 의 모든 `1P0`짜리 순열
              - ↑ {d, c, b, a} 상태에서 `b`와 `a`끼리 스왑 👉 {`d`, `c`, `a`, b} 
              - **depth = 3**
                - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨d c a✨ 를 출력 한다.</u>
              - 다시 한단계 이전 정렬로 되돌리기 {d, c, b, a}
          - 다시 한단계 이전 정렬로 되돌리기 {d, b, c, a}
        - 3️⃣ 첫 원소가 `da`로 시작하는 {b, c} 의 모든 `2P1`짜리 순열
          - ↑ {d, b, c, a} 상태에서 `b`와 `a`끼리 스왑 👉 {`d`, `a`, c, b}
          - **depth = 2**
            - 1️⃣ 첫 원소가 `dac`로 시작하는 {b} 의 모든 `1P0`짜리 순열
              - ↑ {d, a, c, b} 상태에서 `c`와 `c`끼리 스왑 👉 {`d`, `a`, `c`, b} 
                - **depth = 3**
                  - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨d a c✨ 를 출력 한다.</u>
                - 다시 한단계 이전 정렬로 되돌리기 {d, a, c, b}
            - 2️⃣ 첫 원소가 `dab`로 시작하는 {c} 의 모든 `1P0`짜리 순열
              - ↑ {d, a, c, b} 상태에서 `c`와 `b`끼리 스왑 👉 {`d`, `a`, `b`, c}
                - **depth = 3**
                  - <u>depth = 3 가 되었으므로 인덱스 2 까지 ✨d a b✨를 출력 한다.</u>
                - 다시 한단계 이전 정렬로 되돌리기 {d, a, c, b}
          - 다시 한단계 이전 정렬로 되돌리기 {d, b, c, a}
      - 다시 한단계 이전 정렬로 되돌리기 {a, b, c, d}

##### 재귀 함수 구현시 주의 사항

1. 모든 case는 base case에 수렴하는 방향으로 가야한다.
  - ex) `depth`는 최초에 0 에서 시작하여 `depth == r`인 base case에 수렴하도록 재귀 호출시 `depth + 1`을 인수로 넘긴다.  
2. 한 단계씩 재귀 할 때마다 변화를 줄 인수를 넘겨주어야 한다. 👉 `depth` 

<br>

## 재귀로 구현한 코드 2 

- 아래 코드의 자세한 설명은 [이 포스트 참고](https://ansohxxn.github.io/algorithm/repeated-permutation/#%EC%88%9C%EC%97%B4-%EA%B5%AC%ED%95%98%EA%B8%B0)

```cpp
#include <iostream>
#include <vector>

using namespace std;

void repeatPermutation(vector<pair<char, bool>> check, vector<char> perm, int depth)
{
    if (depth == perm.size())  // perm.size 👉 r
    {
        for(int i = 0; i < perm.size(); i++)
        {
            cout << perm[i] << " ";
        }
        cout << endl;
        
        return;
    }
    
    for(int i = 0; i < check.size(); i++)  // check.size() 👉 vec.size()와 동일. vec 원소들 순회나 마찬가지!
    {
        if (check[i].second == true)  // 이전에 perm 원소로 결정된 vec원소라면 그냥 지나가기
            continue;
        else
        {
            check[i].second = true;  // 이전에 perm 원소로 결정된 vec원소라고 표시해 줌.
            perm[depth] = check[i].first;   // 이전에 perm 원소로 결정된 vec원소가 아니라면 perm의 원소로 결정. depth 자리에 대입. 
            repeatPermutation(check, perm, depth + 1);  // perm의 다음 원소 결정하러 가기
            check[i].second = false;  // 결정하고 돌아왔으면 체크 해제 👉 이 과정 중요!! 원래대로 복원하여 다음 for 반복에서 시작되는 경로에서 선택될 수 있도록
        }
    }
}

int main()
{
    const int r = 2;
    
    vector<char> vec = {'a', 'b', 'c', 'd'};
    vector<char> perm(r);
    
    vector<pair<char, bool>> check(vec.size());
    for(int i = 0; i < check.size(); i++)  // check는 vec의 원소들이 이미 perm 원소로 결정된 적이 있는지를 함께 나타내주는 컨테이너가 될 것이다.
        check[i] = make_pair(vec[i], false);  // false로 초기화
    
    repeatPermutation(check, perm, 0); // 4P2 {'a', 'b', 'c', 'd'}의 길이 2의 순열 모두 출력하기

    return 0;
}

```
```
💎출력💎

a b
a c
a d
b a
b c
b d
c a
c b
c d
d a
d b
d c
```

<br>

## 재귀로 구현한 코드 3 (배열로 방문 체크)

```cpp
void Permutation(vector<bool> visited, vector<char> arr, vector<char> perm, int depth)
{
    if (depth == perm.size())  // r
    {
        for (int i = 0; i < perm.size(); i++)
            cout << perm[i] << " ";
        cout << endl;

        return;
    }

    for (int i = 0; i < arr.size(); i++) 
    {
        if (visited[i] == true)  
            continue;
        
        visited[i] = true; // 방문 체크
        perm[depth] = arr[i];   
        Permutation(visited, arr, perm, depth + 1); 
        visited[i] = false;  // 방문 해제
    }
}

int main()
{
    vector<char> vec = { 'a', 'b', 'c', 'd' };
    const int n = vec.size();
    const int r = 2;
    vector<char> perm(r);
    vector<bool> visited(n);

    Permutation(visited, vec, perm, 0); // 4P2 {'a', 'b', 'c', 'd'}의 길이 2의 순열 모두 출력하기

    return 0;
}
```
```
💎출력💎

a b
a c
a d
b a
b c
b d
c a
c b
c d
d a
d b
d c
```


<br>

## 재귀로 구현한 코드 4  (+ 비트 연산으로 방문 체크)

```cpp
int N = 4;
int Nums[] = { 1, 2, 3, 4 };

void solve(int cnt, int visited, int val) {
    if (cnt == 2) // 4P2
        cout << val << endl;

    int ret = 0;
    for (int i = 0; i < N; ++i) {
        if (visited & (1 << i)) continue; // 방문한 비트에 대응되는 원소는 넘어감
        // 매개변수 visited 에 visited | (1 << i) 이 대입되는 과정에서 방문 체크. visited 에서 i 자리에 해당하는 비트를 1 로 만든다.
        // 방문 해제해줄 필요는 없음. 그냥 다음 재귀함수에 파라미터 넘겨준 것 뿐이며 현재 단계에서 visited 값은 변화가 없으므로
        solve(cnt + 1, visited | (1 << i), val * 10 + Nums[i]);
    }
}

int main(){
    solve(0, 0, 0);
}
```
```
💎출력💎

12
13
14
21
23
24
31
32
34
41
42
43
```


<br>

## STL 함수로 순열 구하기

> #include \<algorithm>

### next_permutation

> `bool` 타입을 리턴한다. 

> `nPn` 을 구하는 함수다.

```cpp
next_permutation(vec.begin(),vec.end());
```
- 시작 위치, 끝 위치를 인수로 넘겨 해당 범위를 넘겨주면 <u>인수로 넘긴 범위를 기준으로</u> <u>다음 순열 모양새로 정렬을 한 후</u> `true` 를 리턴한다.
  - 다음 순열이 없다면 `false` 리턴


```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

	vector<int> v = {1, 2, 3};
	
  // 3P3 출력하는 코드

	do
	{
		for(int i = 0; i < v.size(); i++)
		{
			cout << v[i] << " ";
		}
		cout << '\n';

	}while(next_permutation(v.begin(),v.end()));   

}
```
```
💎출력💎

1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

- 다음 순열이 있다면 `true`를 리턴하고 없으면 `false`를 리턴하므로 위와 같이 while 반복 문의 조건으로 넣어 모든 순열을 전부 구할 수 있다.
- 위의 코드는 {1, 2, 3}의 ✨`3P3`✨ 순열들을 순열 순서대로 출력하게 된다.

#### nPr

`next_permutation`은 `nPn` 순열을 구한다. 그렇다면 `nPr`은 어떻게 구할까

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

    // 5P2 출력 하는 코드

	vector<int> v = {1, 2, 3, 4, 5};

    int n = v.size();  // 5
    int r = 2  
	
	do
	{
	  for(int i = 0; i < r; i++)
			cout << v[i] << " ";
		cout << '\n';

    reverse(v.begin() + r, v.end()); // ✨✨✨

	}while(next_permutation(v.begin(), v.end()));   

}
```
```
💎출력💎

1 2
1 3
1 4
1 5
2 1
2 3
2 4 
2 5
3 1 
3 2 
3 4 
3 5
4 1 
4 2 
4 3 
4 5 
5 1 
5 2
5 3
5 4
```

`next_permutation`이 {1, 2, 3, 4, 5}의 5P5 전체 순열의 다음 순열을 구한다. 따라서 `reverse`해주지 않는다면 `r = 2`까지만 출력한다 하더라도 `r = 2`부분까지를 prefix로 한 순열들이 뒤를 잇기 때문에 `r = 2`부분까지가 중복해서 출력되게 된다. 예를 들어 `reverse`해주어 r 부분 뒤를 전부 거꾸로 뒤집어 주지 않는다면 `12345` 👉 `12354` 이런 순서로 순열이 가기 때문에 인덱스 `2`까지만 출력해도 `12`가 6 번(3P3)은 중복되게 된다. (`12`로 시작하는 {3, 4, 5}의 모든 순열) <u>따라서 r 인덱스 뒷부분을 전부 뒤집어주어 `12345` 👉 `12354`로 다음 순열이 가는게 아닌, 바로 `12` 👉 `13`이 될 수 있도록 `12`로 시작하는 {3, 4, 5}의 모든 순열의 마지막 순열인 `12543`으로 만들어 주어야 한다. </u> 바로 다음에 `13`으로 시작하는 순열이 될 수 있도록! 

<br>

#### 특징 : 1. 오름차순 정렬

> `next_permutation`으로 모든 순열을 구하려면 반드시 <u>오름 차순 정렬이 되어 있어야 한다.</u> `<` 연산자를 사용하여 순열 정렬을 해나가기 때문이다.

위의 예시 코드들은 전부 `{1, 2, 3}` 이런식으로 오름차순 정렬이 되어 있는 상태에서 `next_permutation`을 사용했었다. 그렇다면 아래 예시처럼 정렬이 되어 있지 않은 `{3, 1, 2}`를 대상으로 `next_permutation` 실행을 진행하면 어떨까

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

	vector<int> v = {3, 1, 2};
	
	do
	{
		for(int i = 0; i < v.size(); i++)
		{
			cout << v[i] << " ";
		}
		cout << '\n';

	}while(next_permutation(v.begin(),v.end()));   

}
```
```
💎출력💎

3 1 2
3 2 1
```

`3P3`을 계산한 것이므로 *(1 2 3) (1 3 2) (2 1 3) (2 3 1) (3 1 2) (3 2 1)* 의 3 X 2 X 1 = 6 가지의 결과가 나와야 하지만 *(3 1 2) (3 2 1)*만 출력되고 있다. 이렇게 나오는 이유는 `v`벡터가 정렬이 되어 있지 않은 채 {`3`, 1, 2} 이렇게 3 으로 시작하고 있기 때문이다. `nex_permutation`은 `<` 연산자를 바탕으로 순열 정렬을 해나가기 때문에 3 부터 시작하는 순열들만 계산 후 끝내게 된다. (3 2 1)까지 구하고 나면 3 보다 큰 수는 없기에 더 이상의 순열은 없고 이게 마지막 순열이라고 판단하기 때문에!

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

	vector<int> v = {3, 1, 2};
	
	sort(v.begin(), v.end());
	
	do
	{
		for(int i = 0; i < v.size(); i++)
		{
			cout << v[i] << " ";
		}
		cout << '\n';

	}while(next_permutation(v.begin(),v.end()));   

}
```
```
💎출력💎

1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

- `next_permutation`을 실행하기 전에 미리 벡터 `v`를 오름 차순 정렬 해놓으면 *sort(v.begin(), v.end());* 정상적으로 모든 `3P3` 순열 결과들이 차례대로 출력되는 것을 확인할 수 있다.

<br>

#### 특징 : 2. 중복 제외

중복을 제외하고 정렬이 된다. 예를 들어 1 이 두 개 중복되어 있는 `{0, 1, 1}`의 순열을 구한다면, 원래 같으면 3P3 인 6가지의 순열 결과가 나와야 하지만 중복 결과가 제외된 `{0, 1, 1}`, `{1, 0, 1}`, `{1, 1, 0}` 이렇게 3 가지만 나온다! 1이 2개가 중복되어 있기 때문에 중복된 결과가 있을 수 있는데 이는 제외됨.


<br>

### prev_permutation

> `bool` 타입을 리턴한다. 

```cpp
prev_permutation(vec.begin(),vec.end());
```
- 시작 위치, 끝 위치를 인수로 넘겨 해당 범위를 넘겨주면 <u>인수로 넘긴 범위를 기준으로</u> <u>이전 순열 모양새로 정렬을 한 후</u> `true` 를 리턴한다.
  - 이전 순열이 없다면 `false` 리턴
- `next_permutation`과는 다르게 `<`연산자를 사용한 <u>내림 차순 정렬로 순열 정렬을 해나간다.</u>
  - 이 얘기는 즉, `prev_permutation`을 사용하여 모든 `nPn` 순열 결과를 구하려면 미리 내림 차순 정렬을 해놔야 한다는 얘기!  
- `next_permutation`와 마찬가지로 <u>중복을 제외하고 정렬</u>된다.
  - 이 성질은 <u>조합(Combination)을 구현할 때 사용한다.</u>
    - [조합 포스트 참고](https://ansohxxn.github.io/algorithm/combination/#stl-prev_permutation으로-조합-구현하기)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

	vector<int> v = {2, 1, 3};
	
	do
	{
		for(int i = 0; i < v.size(); i++)
		{
			cout << v[i] << " ";
		}
		cout << '\n';

	}while(prev_permutation(v.begin(),v.end()));   

}
```
```
💎출력💎

2 1 3
1 3 2
1 2 3
```

현재 `v`는 `{2, 1, 3}`이다. (2 1 3)의 이전 순열은 (1 3 2), (1 2 3)이므로 이렇게 3 개를 출력하게 된다.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

	vector<int> v = {1, 2, 3};
	
	do
	{
		for(int i = 0; i < v.size(); i++)
		{
			cout << v[i] << " ";
		}
		cout << '\n';

	}while(prev_permutation(v.begin(),v.end()));   

}
```
```
💎출력💎

1 2 3
```

(1 2 3)의 이전 순열은 없다. 따라서 (1 2 3)만 출력하고 종료한다.

<br>

## 참고 문제

- [프로그래머스 (소수 찾기)](https://ansohxxn.github.io/programmers/kit19/)

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}