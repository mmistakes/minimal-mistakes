---
title:  "(C++) 조합(Combination) 구현하기" 

categories:
  - Algorithm
tags:
  - [Algorithm, Coding Test, Cpp, Recursion, STL]

toc: true
toc_sticky: true

date: 2020-08-22
last_modified_at: 2020-08-22
---

## 조합이란

> 선택 순서가 결과에 영향을 주지 않는 경우! (1,2)이나 (2,1)이나 결과가 같을 때

- 순서를 따지지 않는다.
  - `abc`와 `acb`는 같은 존재다.
- 중복을 허용하지 않는다.
- `nCr`
  - 5C3 = 5P3 / 3! = (5 X 4 X 3) / (3 X 2 X 1)

순열과 다르게 방문 체크, 복원이 필요 없다. 어떤 원소로 시작한 조합들이 있다면 그 해당 원소는 다음 반복문으로 넘어가면 다신 등장하지 않아야 하기 때문이다. 순열은 다음 반복문에서도 재방문을 할 수 있도록 하기 위하여 방문체크를 따로 해주어 체크하고 해제하고를 해주는 것인데 조합은 아예 재방문할 일도 없게끔 하기 때문에 방문 체크 해제 자체가 필요가 없는 것이다.

- `abc` 순열
  - `b`로 시작하는 순열에서도 `a`는 다시 등장할 수 있어야 한다. `bac`와 `abc`는 다르니까!
  - 따라서 `a`로 시작하는 모든 순열을 구할 때만! `a`가 등장하지 않도록 방문 체크를 해주고, 모든 순열을 구하고 돌아온 이후 이제 `b`로 시작하는 모든 순열을 구할 떈 다시 `a`가 등장할 수 있어야 하므로 방문 체크 해제 과정이 필요하다.
- `abc` 조합
  - 조합은 이와 다르게 `abc` 와 `bac`는 같다. 
  - `b`로 시작 하는 모든 조합에는 `a`가 포함되지 않는다. 따라서 다음 반복문을 통하여 이제 `a`가 들어가는 모든 조합을 구한 후 이제 `b`가 들어가는 조합을 구할 떄 굳이 방문 체크, 해제 해줄 필요가 없다. 그냥 `b` 이후의 원소들에서만 조합 포함 여부를 따지게 되기 때문에 `a`는 애초에 이제부턴 조합에 포함될 수가 없기 떄문이다.

<br>

### 조합 경우의 수 구하기 nCr

`nCr = n-1Cr-1 + n-1Cr` 공식을 사용하여 재귀적으로 구하면 된다.

```cpp
int combination(int n, int r)
{
    if(n == r || r == 0) 
        return 1; 
    else 
        return combination(n - 1, r - 1) + combination(n - 1, r);
}
```
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
    else if (depth == arr.size())  // depth == n // 계속 안뽑다가 r 개를 채우지 못한 경우는 이 곳에 걸려야 한다.
    {
        return;
    }
    else
    {
        // arr[depth] 를 뽑은 경우
        comb[index] = arr[depth];
        Combination(arr, comb, r - 1, index + 1, depth + 1);
        
        // arr[depth] 를 뽑지 않은 경우
        Combination(arr, comb, r, index, depth + 1);
    }
}

int main()
{
    vector<char> vec = {'a', 'b', 'c', 'd', 'e'};  // n = 5
    
    int r = 3;
    vector<char> comb(r);
    
    Combination(vec, comb, r, 0, 0);  // {'a', 'b', 'c', 'd', 'e'}의 '5C3' 구하기 

    return 0;
}
```
```
💎출력💎

a b c
a b d
a b e
a c d
a c e
a d e
b c d
b c e
b d e
c d e
```

> 예시) `{'a', 'b', 'c', 'd', 'e'}` 벡터에서 `r = 3` 자릿수의 **조합**들 출력하기 👉 경우의 수 5C3 =10 

{1,2,3,4} 의 4C2 조합

- 1 뽑기
  - 2 뽑기 👉 {1, 2} 조합 완성! 종료 
  - 2 안뽑기
    - 3 뽑기 👉 {1, 3} 조합 완성! 종료
    - 3 안뽑기
      - 4 뽑기 👉 {1, 4} 조합 완성! 종료
      - 4 안뽑기 👉 `r = 2`개를 뽑지 못했다. 1만 뽑고 2,3,4 는 안뽑아서.. 이 경로는 종료되고 되돌아 가야 한다. 
- 1 안뽑기
  - 2 뽑기
    - 3 뽑기 👉 {2, 3} 조합 완성! 종료
    - 3 안뽑기
      - 4 뽑기 👉 {2, 4} 조합 완성! 종료
      - 4 안뽑기 👉 `r = 2`개를 뽑지 못했다. 2만 뽑고 1,3,4 는 안뽑아서.. 이 경로는 종료되고 되돌아 가야 한다.
  - 2 안뽑기
    - 3 뽑기 
      - 4 뽑기 👉 {3, 4} 조합 완성! 종료
      - 4 안뽑기 👉 `r = 2`개를 뽑지 못했다. 3만 뽑고 1,2,4 는 안뽑아서.. 이 경로는 종료되고 되돌아 가야 한다.
    - 3 안뽑기 
      - 4 뽑기 👉 `r = 2`개를 뽑지 못했다. 4만 뽑고 1,2,3 는 안뽑아서.. 이 경로는 종료되고 되돌아 가야 한다.
      - 4 안뽑기 👉 `r = 2`개를 뽑지 못했다. 아무것도 안뽑아서.. 이 경로는 종료되고 되돌아 가야 한다.

### 이 풀이의 원리

> **nCr = n-1Cr-1 + n-1Cr**

> <u>뽑은 경우</u>와 <u>뽑지 않은 경우로 나뉜다.

- `arr`에서 어떤 원소를 뽑은 경우
  ```cpp
  // comb[index]에 arr[depth] 을 대입하고 이제 comb[index + 1] 대입하러 간다.
  comb[index] = arr[depth];
  Combination(arr, comb, r - 1, index + 1, depth + 1);
  ```
- `arr`에서 어떤 원소를 뽑지 않기로 결정한 경우 
  ```cpp
  // 위에서 comb[index]에 arr[depth]에 대입했었지만 comb[index]에 다시 덮어쓰러 가듯, comb[index] 대입하러 간다. (즉 arr[depth]를 뽑지 않은 것으로 간주)
  Combination(arr, comb, r, index, depth + 1);
  ```
- 매개 변수 소개
  - `arr`
    - `r`개를 뽑을 대상이 될 원소들이 모인 `n`크기의 벡터
    - `n`은 `arr.size()`로 구할 수 있고 재귀 할 때마다 변화를 겪는건 아니기 때문에 굳이 인수로 넘기지 않았다.
  - `comb` 
    - 하나의 조합이 완성되면 `r`크기를 가지는 벡터가 될 것이다. 처음엔 빈 벡터로 시작한다.
  - `r`
    - 재귀의 매 단계마다 그 단계 시점에서 `arr`중에서 <u>몇 개를 더 뽑아야 하는지</u>를 나타낼 수. 
      - 5C3 의 경우들을 구하는데 이미 원소 2개가 뽑여있는 상태라면 현재의 r 값은 1이 된다. 하나만 더 뽑으면 되니까.
    - `arr[depth]` 원소를 뽑는 경우에는 뽑아야 하는 수는 1 줄어드므로 `r - 1`을 다음 재귀에 인수로 넘긴다.
    - `arr[depth]` 원소를 뽑지 않은 경우에는 뽑아야 하는 수는 그대로 이므로 `r`을 그대로 다음 재귀에 인수로 넘긴다.
  - `index`
    - `arr`로부터 원소를 뽑을 때 뽑은 원소를 `comb`에 넣을 위치가 된다.
      - `comb`의 인덱스가 됨.
    - `arr[depth]` 원소를 뽑은 경우에는 `comb`의 `[index]` 인덱스에 이미 `arr[depth]`원소를 뽑아 넣었으므로 이젠 `comb`의 `[index + 1]` 인덱스에 뽑아 넣어야 한다. 따라서 다음 재귀에 `index + 1`을 넘긴다.
    - `arr[depth]` 원소를 뽑지 않은 경우에는 `comb`의 `[index]` 인덱스에 넣을 원소를 다음 재귀에서 결정해야 한다. 따라서 다음 재귀에 그대로 `index`을 넘긴다.
    - 중복을 허용하지 않으므로 순열과 달리 <u>이미 지나간 원소는 다시 쳐다도 보면 안된다.</u> ✨✨
      - <u>따라서 순열과 달리 매 재귀 단계마다 arr의 첫번째 원소(인덱스 0)부터 따지는 것이 아닌 매 단계마다 1씩 증가시키는 depth 자리를 검사한다.</u> 
  - `depth`
    - 뽑을 원소를 결정하기 위해 `arr`을 순회하는 인덱스.
    - ✨재귀의 깊이는 `arr`을 끝까지 순회하는 곳 까지이기 때문에 `arr`을 순회할 인덱스를 `depth`라고 명명했다.✨
      - ✨`arr`의 원소들을 하나하나씩 차례대로 살펴볼 때 재귀를 사용하여 살펴봄 ✨
    - 뽑는 경우든 뽑지 않는 경우든 어쨋든 `comb`에 결정해서 넣을 `arr`의 다음 원소를 살펴보아야 하기 때문에 언제나 `depth + 1`을 다음 재귀에 인수로 넘긴다.
- **if(r == 0)**
  - `depth`가 `arr.size()`(= n)에 도달하기 전에 `r`개만큼 다 뽑은 경우다. 즉, `comb`가 결정되어 조합의 한 경우가 결정되어 이제 출력해야 할 때.
  - 이때의 `index`는 `comb.size()`(원래의 시작 r값)과 같은 값을 가진다. `comb`를 다 채웠기 때문에! 
- **else if(depth == arr.size())**
  - `depth`가 `arr.size()`(= n)에 도달한 경우다. 
    - 즉, `arr`의 모든 원소를 순회했는데도 `r`이 0 이 되지 않은 경우이므로 조합의 경우들 중 하나가 될 수 없는 케이스라는 것을 뜻한다. 
      - 예를 들어 {a, b, c, d, e} 중에서 5C3을 구해야 하는데 a 는 뽑고 b c d e 는 뽑지 않기로 했다면, 즉 r = 2 두개를 더 뽑아야함에도 불구하고 이미 순회를 다 해버렸으니 a 는 뽑고 b c d e 는 뽑지 않는 경우는 철회해야 한다.
  - 정답 중 하나가 될 수 없으므로 되돌아가기 위해 <u>return 한다.</u>
    - base case
- **else**
  - 아직 더 뽑아야 하고 (r != 0), `arr` 中 아직 뽑을 후보들도 남아 있다면 (depth != arr.size())  
  - 현재 단계 (depth)에서 아래와 같이 두 케이스로 나눈다. 
    - `arr[depth]` 원소를 ✨뽑는 경우
    ```cpp
      comb[index] = arr[depth];  // 뽑음.
      Combination(arr, comb, r - 1, index + 1, depth + 1); // arr의 다음 원소를 comb[index + 1]자리에 따져보기 위해 출발
    ```
    - `arr[depth]`를 ✨뽑지 않는 경우 
    ```cpp
    Combination(arr, comb, r, index, depth + 1);  //  arr의 다음 원소를 뽑지 않았으니 그대로 comb[index]자리에 따져보기 위해 출발
    ```


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
            Combination(arr, comb, i + 1, depth + 1);
        }
    }
}

int main()
{
    vector<char> vec = {'a', 'b', 'c', 'd', 'e'};  // n = 5
    
    int r = 3;
    vector<char> comb(r);
    
    Combination(vec, comb, 0, 0);  // {'a', 'b', 'c', 'd', 'e'}의 '5C3' 구하기 

    return 0;
}
```
```
💎출력💎

a b c
a b d
a b e
a c d
a c e
a d e
b c d
b c e
b d e
c d e
```

> 예시) `{'a', 'b', 'c', 'd', 'e'}` 벡터에서 `r = 3` 자릿수의 **조합**들 출력하기 👉 경우의 수 5C3 =10 


### 이 풀이의 원리

> 이 코드는 [중복 순열](https://ansohxxn.github.io/algorithm/repeated-permutation/) 구현 코드와 비슷하다!

- 중복 순열
  - 매개변수
    ```cpp
    void repeatPermutation(vector<char> arr, vector<char> perm, int depth)
    ```
  - 재귀 부분
    ```cpp
    for(int i = 0; i < arr.size(); i++)
    {
        perm[depth] = arr[i];
        repeatPermutation(arr, perm, depth + 1);
    }
    ```
- 조합
  - 매개변수
    ```cpp
    void Combination(vector<char> arr, vector<char> comb, int index, int depth)
    ```
  - 재귀 부분
    ```cpp
    for(int i = index; i < arr.size(); i++)
    {
        comb[depth] = arr[i];
        Combination(arr, comb, i + 1, depth + 1);
    }
    ```

- 1 번 코드에서 `arr`을 순회하는 포인터를 `depth`로 명명했던 반면에 이 2번 코드에서의 `depth`는 `comb`의 자릿수만큼 재귀한다는 점에서 `comb`를 순회하는 포인터를 `depth`라고 명명했다.
  - 1 번 코드는 `arr` 순회를 재귀 기준으로 삼았었고
  - 2 번 코드는 `comb` 순회를 재귀 기준으로 삼는다.
    - 그리고 `comb`의 매 자리마다(매 재귀마다) for문으로 `arr` 원소들을 순회한다.
- 각 재귀 단계 (`arr` 원소가 `r`개 뽑혀 들어갈 `comb`의 각 자리. 인덱스)마다 <u>for문을 돌며 arr의 원소들을 대입해본다</u>
  - for문은 `arr`의 원소들 중 `comb`에 들어갈 수 있는 원소들을 순회한다.
    - **중복 순열**에서는 중복이 가능하므로 `comb`의 매 자리를 결정할 때마다(매 재귀마다) `arr`의 모든 원소가 후보가 될 수 있었다. 따라서 *for(<u>int i = 0</u>; i < arr.size(); i++)* 이렇게 0 인덱스부터 순회
    - **조합**에서는 중복이 가능하지 않고 순서도 따지지 않으므로 `arr` 원소들 중에서 <u>이미 한번 뽑았었거나 뽑지 않기로 결정하고 지나갔었던 원소라면 다시 comb에 넣는 경우와 넣지 않는 경우를 따질 필요가 없다.</u> 따라서 조합을 구하는 경우에는 `comb`의 매 자리를 결정할 때마다(매 재귀마다) `arr`에서 `comb`에 넣고 안 넣고를 <u>따졌었던 가장 최근의 원소의 그 다음 원소부터가 후보가 된다.</u> 따라서 *for(<u>int i = index</u>; i < arr.size(); i++)* 후보는 `index`부터이며 재귀할 때 `index + 1`을 인수로 넘겨주어야 한다. *Combination(arr, comb, <u>i + 1</u>, depth + 1);* 이 때문에 중복순열과 달리 `arr` 중에서 아직 안지나간 원소들 중 첫 번째 원소의 위치를 나타내는 `index`라는 매개 변수가 추가로 필요하다. 후보가 될 수 있는 원소의 범위가 매 재귀마다 바뀌므로 `index`로 범위의 시작 위치를 매번 갱신해 표시해주어야 하기 때문이다.

<br>

### 재귀로 구현한 코드 3  👉 2 응용


```cpp
#include <iostream>
#include <vector>

using namespace std;

void Combination(vector<pair<char, bool>> arr, vector<char> comb, int index, int depth)
{
    if (depth == comb.size())
    {
        for(int i = 0; i < arr.size(); i++)
            if (arr[i].second)
                cout << arr[i].first << " ";
        cout << endl;
        
        return;
    }
    else
    {
        for(int i = index; i < arr.size(); i++)
        {
            if(arr[i].second == true)
                continue;
            else
            {
                arr[i].second = true;
                comb[depth] = arr[i].first;
                Combination(arr, comb, i + 1, depth + 1);
                arr[i].second = false;
            }
        }
    }
}

int main()
{
    vector<char> vec = {'a', 'b', 'c', 'd', 'e'};  // n = 5
    vector<pair<char, bool>> check(vec.size());
    for(int i = 0; i < check.size(); i++)  // check는 vec의 원소들이 이미 comb 원소로 결정된 적이 있는지를 함께 나타내주는 컨테이너가 될 것이다.
        check[i] = make_pair(vec[i], false);  // false로 초기화
    
    int r = 3;
    vector<char> comb(r);
    
    Combination(check, comb, 0, 0);  // {'a', 'b', 'c', 'd', 'e'}의 '5C3' 구하기 

    return 0;
}
```
```
💎출력💎

a b c
a b d
a b e
a c d
a c e
a d e
b c d
b c e
b d e
c d e
```

> 예시) `{'a', 'b', 'c', 'd', 'e'}` 벡터에서 `r = 3` 자릿수의 **조합**들 출력하기 👉 경우의 수 5C3 =10 

- 2 번 코드와 사실 비슷하다. `comb`의 각 자리를 결정 하는 것을 재귀의 한 단계로 삼으며 매 단계마다 `comb`의 각 자리에 들어갈 후보는 중복 순열처럼 `arr`의 0 인덱스부터 시작한 모든 원소가 아닌`arr`중 이전에 `comb`에 넣을지 안넣을지 결정 한번 했었던 원소부터 끝까지를 후보로 삼는 것 또한 똑같다. (*for(<u>int i = index</u>; i < arr.size(); i++)*) 
- [순열 구현 2 번 코드](https://ansohxxn.github.io/algorithm/permutation/#%EC%9E%AC%EA%B7%80%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%9C-%EC%BD%94%EB%93%9C-2)처럼 `comb`에 넣을지 안넣을지 결정 한번 했었던 `arr`원소인지를 bool 타입으로 저장할 수도 있지만 <u>사실 for문을 `comb`에 넣을지 안넣을지 결정 한적이 없었던 원소들 중 첫번째 위치를 나타내는 `index`부터를 후보로 정한다면 그 자체로 결정 안했었던 원소들만이 후보가 된다는 것을 의미하니 bool타입으로 체크하는 것은 사실 필요없는 과정이기는 하다.</u>
- 그래도 한번 구현해 보았다. 출력할 때 `arr`을 순회하며 출력하되 `comb`에 넣기로 결정했었다는 것을 의미하는 bool타입의 second 값이 true 값을 가지는 `arr` 원소만 출력하는데에 써먹었다.
- 재밌는 점은 *for(<u>int i = 0</u>; i < arr.size(); i++)* `comb`의 각 자리를 매번 결정할때마다 `arr`의 모든 원소로 한다는 것을 의미하므로 이렇게 `i = 0`으로만 바꿔주어도 순열을 구하는 것과 같아진다!
  - 매번 모든 원소가 후보가 된다는 것은 순서를 고려한다는 말과도 같다. 순열은 `arr`원소가 `comb`의 원소로 결정만 안됐었으면 될 뿐, 안뽑힌 것이라도 다음 후보가 될 수 있기 때문이다.

<br>

## STL: prev_permutation으로 조합 구현하기 

> bool 배열의 중복 순열을 구하고 이에 대응시키기

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
 
int main() {
    const int r = 2;
    
    vector<char> arr{'a', 'b', 'c', 'd'};
    vector<bool> temp(arr.size(), false);
    for(int i = 0; i < r; i ++) // 앞부터 r개의 true가 채워진다. 나머지 뒤는 false.
        temp[i] = true;
 
    do {
        for (int i = 0; i < arr.size(); ++i) {
            if (temp[i])
                cout << arr[i] << ' ';
        }
        cout << endl;
    } while (prev_permutation(temp.begin(), temp.end()));
}

```
```
💎출력💎

a b
a c
a d
b c
b d
c d
```

- 모든 순열을 구하려면 <u>bool 배열 초기 상태가 내림 차순 정렬이 되어 있어야 한다.</u> (그래야 모든 수열을 다 구할 수 있으니까)
    - 👉 즉, `true`가 `false`보다 앞에 와야 한다. (`true`는 `r`개 존재)
      - ex) 6C<u>2</u> 라면 {<u>true, true</u>, false, false, false, false} 모양이 초기값이어야 함. (내림 차순 되어 있는 형태. false < true 니까)
        - 이건 내림 차순 정렬이 되어 있는 상태다. (`ture > false`니까!) 따라서 `true (=1)`와 `false (=0)` 끼리의 *"크기를 비교하여 이전 순열을 결정한다."*
        - 따라서 4C2의 경우 bool배열은 아래와 같은 모양으로 while문이 진행될 것이다. 이 `ture` 값과 같은 인덱스에 대응하는 배열의 원소들끼리를 조합하면 된다.
          ```
          {true, true, false, false} 👉 'a' 'b' 에 대응시킴
          {true, false, true, false} 👉 'a' 'c' 에 대응시킴
          {true, false, false, true} 👉 'a' 'd' 에 대응시킴
          {false, true, true, false} 👉 'b' 'c' 에 대응시킴
          {false, true, false, true} 👉 'b' 'd' 에 대응시킴
          {false, false, true, true} 👉 'c' 'd' 에 대응시킴
          ```
    - 그리고 **이 bool 배열을 바탕으로 prev_permutation 연산을 수행하며 이 때 True 가 되는 것에 대응시켜서 조합을 구하면 된다.**
  -  <u>중복이 있는 원소들은 제외하고 순열을 만들어준다.</u>
    - 자세한 설명은 [순열 포스트](https://ansohxxn.github.io/algorithm/permutation/#prev_permutation) 참고
- `do-while`문을 사용하는 이유는, 저 prev_permutation 연산을 수행하자마자 이전 순열로 모양이 바뀌어 버리기 때문이다. 초기 모양, 출발 모양 그대로 한번 연산 가야하므로 `do-while`문을 사용한 것이다.

예를 들어 {'a', 'b', 'c', 'd'}의 `4C2` 조합들을 출력하려면 `r = 2` 개수 만큼의 `true` 값 원소를 가지고 ✨{'a', 'b', 'c', 'd'}와 사이즈가 같은 bool타입의 `temp` 벡터를 선언한다.✨`temp`의 초기 값은 `r = 2`개의 💜<u>`true` 원소를 맨 앞</u> 으로 보낸 것에서 시작한다.💜 이렇게 {true, true, false, false} 가 되는데 이는 `temp`를 내림 차순 정렬할 때 가장 처음으로 올 값이다. 즉 반대로 말하면 오름 차순 정렬시 가장 큰 값. 여기서 시작하여 <u>temp 를 대상으로 prev_permutation 실행한다.</u>

```
{true, true, false, false} 👉 이 상태가 바로 내림 차순 정렬이 되어 있는 상태 (true가 false보다 앞섬)
{true, false, true, false}
{true, false, false, true}
{false, true, true, false}
{false, true, false, true}
{false, false, true, true} 👉 true 2개 , false 2개 조합에서 더 이상 이 것보다 더 작은 수를 만들 수 없음. 종료.
```

위와 같이 중복을 제외하고 내림 차순으로 정렬이 된다. 매번 `temp`의 이전 순열을 구한 후 `temp`의 `true`인 자리에 일치하는 인덱스를 가진 `arr`의 원소만을 뽑는다! 현재 순열이 `{true, false, false, true}` 이라면 `arr[0]`, `arr[3]`인 'b'와 'c'를 출력한다.

<br>

## STL: next_permutation으로 조합 구현하기

> bool 배열의 중복 순열을 구하고 이에 대응시키기

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
 
int main() {
    const int r = 2;
    
    vector<char> arr{'a', 'b', 'c', 'd'};
    vector<bool> temp(arr.size(), true);
    for(int i = 0; i < arr.size() - r; i ++) // 뒤에 false가 n-r개 채워지고 뒤에 true 가 r개 채워진다.
        temp[i] = false;
 
    do {
        for (int i = 0; i < arr.size(); ++i) {
            if(temp[i]) 
                cout << arr[i] << " ";
        }
        cout << endl;
    } while (next_permutation(temp.begin(), temp.end()));
}

```
```
💎출력💎

c d
b d
b c
a d
a c
a b
```

- 모든 순열을 구하려면 <u>bool 배열 초기 상태가 오름 차순 정렬이 되어 있어야 한다.</u> (그래야 모든 수열을 다 구할 수 있으니까)
    - 👉 즉, `false`가 `true`보다 앞에 와야 한다. (`true`는 `r`개 존재)
      - ex) 6C<u>2</u> 라면 {false, false, false, false, <u>true, true</u>} 모양이 초기값이어야 함. (오름 차순 되어 있는 형태. false < true 니까)
        - 이건 오름 차순 정렬이 되어 있는 상태다. 따라서 `true (=1)`와 `false (=0)` 끼리의 *"크기를 비교하여 다음 순열을 결정한다."*
        - 따라서 4C2의 경우 bool배열은 아래와 같은 모양으로 while문이 진행될 것이다. 이 `ture` 값과 같은 인덱스에 대응하는 배열의 원소들끼리를 조합하면 된다.
          ```
          {false, false, true, true} 👉 'c' 'd' 에 대응시킴
          {false, true, false, true} 👉 'b' 'd' 에 대응시킴
          {false, true, true, false} 👉 'b' 'c' 에 대응시킴
          {true, false, false, true} 👉 'a' 'd' 에 대응시킴
          {true, false, true, false} 👉 'a' 'c' 에 대응시킴
          {true, true, false, false} 👉 'a' 'b' 에 대응시킴
          ```
    - 그리고 **이 bool 배열을 바탕으로 next_permutation 연산을 수행하며 이 때 True 가 되는 것에 대응시켜서 조합을 구하면 된다.**
  -  <u>중복이 있는 원소들은 제외하고 순열을 만들어준다.</u>
    - 자세한 설명은 [순열 포스트](https://ansohxxn.github.io/algorithm/permutation/#prev_permutation) 참고
- `do-while`문을 사용하는 이유는, 저 next_permutation 연산을 수행하자마자 이전 순열로 모양이 바뀌어 버리기 때문이다. 초기 모양, 출발 모양 그대로 한번 연산 가야하므로 `do-while`문을 사용한 것이다.

예를 들어 {'a', 'b', 'c', 'd'}의 `4C2` 조합들을 출력하려면 `r = 2` 개수 만큼의 `true` 값 원소를 가지고 ✨{'a', 'b', 'c', 'd'}와 사이즈가 같은 bool타입의 `temp` 벡터를 선언한다.✨`temp`의 초기 값은 `r = 2`개의 💜<u>`true` 원소를 맨 뒤</u>로 보낸 것에서 시작한다.💜 이렇게 {false, false, true, true} 가 되는데 이는 `temp`를 오름 차순 정렬할 때 가장 처음으로 올 값이다. 여기서 시작하여 <u>temp 를 대상으로 next_permutation 실행한다.</u>

```
{false, false, true, true} 👉 이 상태가 바로 오름 차순 정렬이 되어 있는 상태 (true가 false보다 뒤에)
{false, true, false, true}
{false, true, true, false}
{true, false, false, true}
{true, false, true, false}
{true, true, false, false} 👉 true 2개 , false 2개 조합에서 더 이상 이 것보다 더 큰 수를 만들 수 없음. 종료.
```

위와 같이 중복을 제외하고 오름 차순으로 정렬이 된다. 매번 `temp`의 다음 순열을 구한 후 `temp`의 `true`인 자리에 일치하는 인덱스를 가진 `arr`의 원소만을 뽑는다! 현재 순열이 `{true, false, false, true}` 이라면 `arr[0]`, `arr[3]`인 'b'와 'c'를 출력한다.

<br>

### 변형 (순서대로 조합)

```cpp
int main() {
    const int r = 2;
    
    vector<char> arr{'a', 'b', 'c', 'd'};
    vector<bool> temp(arr.size(), true);
    for(int i = 0; i < r; i ++)
        temp[i] = false;
 
    do {
        for (int i = 0; i < arr.size(); ++i) {
            if (temp[i] == false)
                cout << arr[i] << " ";
        }
        cout << endl;
    } while (next_permutation(temp.begin(), temp.end()));
}
```
```
💎출력💎

a b
a c
a d
b c
b d
c d
```

*next_permutation*는 "다음 순열"로 정렬시키는 것을, 이 순열로 더 큰 수를 만들 수 있을 때까지 수행하기 때문에 해당 범위의 조합을 구하려면 해당 범위로 만들 수 있는 가장 작은 수열 형태가 초기값이 되야 하는 것이 불가피하다. 그래서 bool 배열에 대응시키려면 반드시 ⭐**`false`가 `ture`보다 앞선 오름 차순 정렬이 된 수열 최소값**⭐형태에서 시작해야한다는 것이다. (그래야 모든 수열을 다 구할 수 있으니까)

```cpp
    vector<bool> temp(arr.size(), true);
    for(int i = 0; i < r; i ++)
        temp[i] = false;

    //...
        if (temp[i] == false)
            cout << arr[i] << " ";
```

따라서 "a b" 부터, 즉 <u>원소의 순서들을 지키면서 조합을 구하고 싶다면</u> `true`를 `r`개로 하는 것이 아닌 앞에 있는 `false`를 `r`개로 하고, `false` 값에 대응 시키면 범위의 순서 'a', 'b', 'c', 'd'} 대로 조합을 구할 수 있겠다! (앞 문항에선, 뒤에 있는 `true`를 `r`개로 하고 이 `true`에 대응시켰었기 때문에 순서가 다르게 나왔었다. 그래서 앞에선 "c d"부터 출력됐었음)

*next_permutation으로 조합을 구하려 할 때, 조합 순서 딱히 상관 없으면 true 를 r 개로 하자! 그냥 그게 가독성이 더 좋으니까..☆*

<br>

## 모든 조합의 수 구하기 (nC0 + nC1 + nC2 + .. + nCn)

> [코드의 문제 출처 포스트](https://ansohxxn.github.io/programmers/95/)

`nCr` 에서 `r = 0,1,..,n` 일 때의 모든 조합의 수 구하기

### prev_permutation (혹은 next_permutation)

```cpp
        for (int r = 1; r <= 4; ++r) {
            vector<bool> comb(4, false);
            for (int j = 0; j < r; ++j)
                comb[j] = true;
            do {
                string temp = "";
                for (int k = 0; k < 4; ++k) {
                    if (comb[k]) temp += '-';
                    else temp += applicant[k];
                }
                db[temp].push_back(stoi(applicant[4]));
            } while (prev_permutation(comb.begin(), comb.end()));
        }
```

*for (int r = 1; r <= 4; ++r)* 안에서 조합 구하기. `r` 값에 따라 `comb` 배열의 `true` 개수가 결정됨.

<br>

### 비트 마스크로 구하기 

```cpp
for (int i = 0; i < info.size(); ++i){
    //...
    string str = "";
    for(int mask = 0; mask < 16; mask++){
        for (int k = 0; k < 4; k++){
            str += (mask & (1 << k)) ? '-' : applicant[k];
            db[str].push_back(score);
        }
    }
```

4 자리에서 `-` 이 들어갈 수 있는 경우는 *4C0 + 4C1 + 4C2 + 4C3 + 4C4 = 16* 가지가 된다. 이는 사실

```
0000 
👉 0 
👉 {F,F,F,F} 로 만들 수 있는 모든 순열과도 같음

1000 0100 0010 0001
👉 1 2 4 8
👉 {T,F,F,F} 로 만들 수 있는 모든 순열과도 같음

1100 1010 1001 0110 0101 0011 
👉 12 10 9 6 5 3
👉 {T,T,F,F} 로 만들 수 있는 모든 순열과도 같음

1110 1101 1011 0111
👉 14 13 11 7
👉 {T,T,T,F} 로 만들 수 있는 모든 순열과도 같음

1111
👉 15
👉 {T,T,T,T} 로 만들 수 있는 모든 순열과도 같음
```

이 `0000` ~ `1111` 즉, `0` ~ `15` 인 16 가지의 4 자리 비트는는 `-`가 들어갈 수 있는 모든 케이스들이 되는 것이나 마찬가지이다. 

- 예를 들어 위 코드에서 현재 `mask`가 13 일 땐 
  - *(mask & (1 << k)*
    - 1101 & 0001 👉 True 이므로 `-` 추가 👉 str = "-"
    - 1101 & 0010 👉 False 이므로 `applicant[1]` 추가 👉 str = "-backend"
    - 1101 & 0100 👉 True 이므로 `-` 추가 👉 str = "-backend-"
    - 1101 & 1000 👉 True 이므로 `-` 추가 👉 str = "-backend--"
      - `1` 자리에 `-`가 들어가는 식은 아니지만 16가지 비트들은 서로 다 데칼코마니처럼 대응이되므로 이렇게 해도 될듯 하다. (최하위 비트인 오른쪽부터 덧붙여나가니까 마치 1011 자리에 `-`을 붙이는 것과도 같아진다.)

<br>

## 참고한 블로그

- <https://mjmjmj98.tistory.com/38>
- <https://gorakgarak.tistory.com/523>
- <https://codemcd.github.io/algorithm/Algorithm-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9/#%EA%B5%AC%ED%98%84-%EC%BD%94%EB%93%9C>
- <https://yabmoons.tistory.com/99?category=838490>

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}