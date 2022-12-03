---
title:  "(C++) 중복 순열(Repeated Permutation) 구현하기" 

categories:
  - Algorithm
tags:
  - [Algorithm, Coding Test, Cpp, Recursion, STL]

toc: true
toc_sticky: true

date: 2020-08-21
last_modified_at: 2020-08-21
---

## 중복 순열이란

- 순서를 따진다.
  - `abc` 와 `acb`는 서로 다른 존재이다.
- <u>중복을 허용한다</u>
- 길이가 n 인 범위의 r 자리 중복 순열 경우의 수 
  - 👉 `n`을 `r`번 곱하면 된다.
    - 길이가 3 인 범위의 4 자리 중복 순열 경우의 수
      - 👉 \\(3 X 3 X 3 X 3 = 3^4 = 81\\)

<br>

## 구현 코드(feat. 재귀)

```cpp
#include <iostream>
#include <vector>

using namespace std;

void repeatPermutation(vector<char> vec, vector<char> perm, int depth)
{
    if (depth == perm.size())
    {
        for(int i = 0; i < perm.size(); i++)
        {
            cout << perm[i] << " ";
        }
        cout << endl;
        
        return;
    }
    
    for(int i = 0; i < vec.size(); i++)
    {
        perm[depth] = vec[i];
        repeatPermutation(vec, perm, depth + 1);
    }
}

int main()
{
    const int r = 3;
    
    vector<char> v = {'a', 'b'};
    vector<char> perm(r);
    
    repeatPermutation(v, perm, 0);  // {'a', 'b'}의 길이 3의 중복순열 모두 출력하기

    return 0;
}

```
```
💎출력💎

a a a
a a b
a b a
a b b
b a a
b a b
b b a
b b b
```

> 예시) `{'a', 'b'}`배열에서 `r = 3` 자릿수의 **중복 순열**들 출력하기 👉 경우의 수 \\(2^3 = 8\\)

- 중복을 허용하기 때문에 <u>모든 각각의 자리마다 올 수 있는 숫자의 후보는 모든 원소가 된다.</u> 👈 '중복'순열 특징.
  - 반면에 그냥 일반 순열은 중복이 허용되지 않기 때문에 각 자리에 올 수 있는 수는 이전 단계에서 perm 원소로 결정된 적이 없는 원소여야 했음.
- 재귀 과정 (`r = 3`길이의 중복 순열 구하기) 
  -  ![image](https://user-images.githubusercontent.com/42318591/90953176-21bc9d00-e4a4-11ea-8ebc-d30f9c526df2.png){: width="80%" height="80%"}{: .align-center}
  - `vec` 벡터(길이 2)로부터 후보 원소들을 뽑아내서 `perm` 벡터(길이 `r = 3`)을 만들어 나감.
    - `depth`는 `perm`을 순회하며 `i`는 `vec`을 순회한다.
  - 한단계씩 깊숙히 들어갈 때마다(= 즉 `perm`의 자릿수를 한칸씩 옮길 때 마다) 각 자릿수에 `vec`의 <u>모든 원소를 순회하며 대입한다.</u>
    - *for(int i = 0; i < vec.size(); i++)*
    - 중복 순열은 중복을 허용하기 때문에 `perm`의 각 자리마다  `vec`의 모든 원소가 후보가 되기 때문  
  - `r`길이의 중복 순열을 구하려는것이면 `r`단계까지 깊숙히 들어가면 된다!
    - `depth`는 0 부터 시작하여 base case인 `depth == r`이 될 때까지 증가하며 깊숙히 들어간다.
    - base case인 `depth == r`이 되면 그동안 벡터에 저장되어 완성된 한 케이스의 중복 순열을 출력한 후 return 하여 빠져나와 다음 원소를 후보로 삼는다. 


<br>

### 일반 순열 구하기

> *위에 중복 순열 구하는 코드와 비슷한 방식대로*  한단계씩 깊숙히 들어가면서 대입하되 <u>이전에 후보가 결정되지 않았었던 원소만 대입할 수 있는 장치</u>를 넣으면 일반 순열을 구현할 수 있다.

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
            check[i].second = false;  // 결정하고 돌아왔으면 체크 해제
        }
    }
}

int main()
{
    const int r = 2;
    
    vector<char> vec = {'a', 'b', 'c', 'd'};
    vector<char> perm(r);
    
    vector<pair<char, bool>> check;
    for(int i = 0; i < vec.size(); i++)  // check는 vec의 원소들이 이미 perm 원소로 결정된 적이 있는지를 함께 나타내주는 컨테이너가 될 것이다.
        check.push_back(make_pair(vec[i], false));  // false로 초기화
    
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

> 예시) `{'a', 'b', 'c', 'd'}`배열에서 `r = 2` 자릿수의 **일반 순열**들 출력하기 👉 경우의 수 4P2 = 12

- 그냥 일반 순열은 중복이 허용되지 않기 때문에 각 자리에 올 수 있는 수는 이전 단계에서 perm 원소로 결정된 적이 없는 원소여야 한다.
  - 후보가 될 원소들인 `vec`의 각 원소마다 <u>bool 타입으로 이전 단계에서 이미 결정된 적이 있는지를 체크 하는 정보가 추가로 필요하다.</u>
  - 그리고 <u>체크 되지 않은 것들만</u> 후보로 삼고 그 중에서 선택해야 한다.
  - <u>재귀가 끝난 다음에는</u>, 즉 해당 순열이 결정됐으면 돌아가야 하므로 <u>다시 체크를 해제해주어야 한다.</u>
- 재귀 과정 예시 (`r = 2`길이의 중복 순열 구하기)
  - `vec` 벡터(길이 4)로부터 후보 원소들을 뽑아내서 `perm` 벡터(길이 `r = 2`)을 만들어 나감.
    - `depth`는 `perm`을 순회하며 `i`는 `vec`을 순회한다.
  - 한단계씩 깊숙히 들어갈 때마다(= 즉 `perm`의 자릿수를 한칸씩 옮길 때 마다) 각 자릿수에 `vec`의 <u>방문 하지 않은, 즉 체크되지 않은 원소들만 골라 차례대로 대입한다.</u>
    - `check`는 `pair<char, bool>`타입의 원소를 가지는 벡터로 `vec`의 char 원소들 각각에 bool 타입의 데이터를 또 붙여 `vec`의 각각의 원소들이 이전 단계에서 `perm`의 원소가 됐는지 안됐는지를 체크한다.
    ```cpp
    vector<pair<char, bool>> check(vec.size());
    for(int i = 0; i < check.size(); i++)
        check[i] = make_pair(vec[i], false);
    ```

<br>

#### cf) vector 에러와 깨달음

> 공간이 없는 벡터일 때 👉 `push_back`

> 내용물은 아직 없지만 공간은 잡혀있는 벡터일 때 👉 `[]` 

```cpp
    vector<char> vec = {'a', 'b', 'c', 'd'};
    vector<char> perm(r);
    
    vector<pair<char, bool>> check(vec.size());
    for(int i = 0; i < vec.size(); i++)  
        check.push_back(make_pair(vec[i], false)); // ❌런타임 에러 발생!
```

> 위와 같이 하면 에러가 발생하거나 공백들이 출력되는 등 정상적으로 출력되지 않는다. 왜 그럴까? 

- <u>check는 vec.size() 사이즈 만큼의 공간을 이미 갖고 있는 상태다.</u> `vector<pair<char, bool>> check(vec.size());` 라고 선언해서!
- 그런 상태에서 `push_back`을 해버리면 내용물은 텅텅 비었지만 <u>vec.size() 사이즈만큼의 공간을 차지하는 상태에서 뒤에 원소를 추가해주려고 하니 에러가 발생</u>하는 것이다.

```cpp
vector<pair<char, bool>> check;
for(int i = 0; i < vec.size(); i++)  
    check.push_back(make_pair(vec[i], false)); 
```

- `vector<pair<char, bool>> check;` 그냥 이렇게 사이즈 0 인 아무것도 없는 빈 공간의 컨테이너로 선언한 후 그 이후에 `push_back`으로 뒤에 추가해주면 문제가 발생하지 않는다.


```cpp
vector<int> vec;

vec[0] = 2;  // ❌런타임 에러 발생!
```

벡터 `vec`은 아직 아무런 공간을 차지 하지 않는 벡터다. 그런 상황에서 `vec[0]`을 통해 없는 공간을 사용하려고 하면 위와같이 에러가 발생한다.

```cpp
vector<int> vec(3);

vec[0] = 2;  
```

위와 같이 `vec`을 선언시 int 데이터가 3 개 들어갈 만큼 공간을 미리 확보해두면 `vec[0]`을 통해 접근해도 문제가 없다. 이미 `vec`로서 존재하는 공간에 접근하려고 하는 것이기 때문이다! 그리고 저렇게 미리 공간을 잡아두면 vec[0]~vec[2]는 `0`으로 초기화를 해준다. (int 벡터의 경우)

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}