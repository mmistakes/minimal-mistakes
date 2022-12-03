---
title:  "[STL 알고리즘] algorithm" 

categories:
  - STL
tags:
  - [Coding Test, Cpp, STL]

toc: true
toc_sticky: true

date: 2020-07-21
last_modified_at: 2020-07-21
---

## 🔔 STL 알고리즘

> #include \<algorithm>

- [모두의 알고리즘 페이지 참고하기](https://modoocode.com/256)
- 코테 공부하며 알게된 것들만 차근 차근 추가해나갈 것.

## 🔔 원소를 수정하지 않는 작업들

### for_each

> 처음과 끝 반복자 범위 내 원소들에 대해 함수를 실행시킨다.

- 원소들에 대해 함수를 실행시키되 <u>원소를 수정하지 않는다. </u>
- 원소들을 <u>순차적으로</u> 접근하여 함수를 실행시킨다.
- **인수**
  1. 범위의 첫 원소 가리키는 반복자
  2. 범위의 끝 원소 가리키는 반복자
  3. 함수 포인터
    - 람다 함수 넘기기 가능  
- **리턴값**
  - 인수로 전달 받은 함수 객체를 리턴한다.

```cpp
for_each(myvector.begin(), myvector.end(), myfunction);
```
- myvector 라는 벡터의 처음부터 끝까지 모든 원소들에 대해 myfunction 함수를 실행시킨다.

<br>

### 순열 

> 원소들을 어떤 순서로 나열한 것

<br>

## 🔔 원소를 수정하는 작업들

### iter_swap

> 두 반복자를 인수로 넘기면 두 반복자가 가리키는 원소를 바꿔치기 해준다.

```cpp
iter_swap(str.begin() + depth, str.begin() + i);  // str[depth]와 str[i]가 서로 자리를 바꾸게 된다.
```

### 파티션(partition)

> 특정 조건을 만족하는 원소들은 앞으로 보내고 나머지들은 뒤로 보내는 작업 

<br>

### 정렬(sort)

#### sort

```cpp
sort(myVector.begin(), myVector.end());
```

> `<` 연산자를 사용하여 정렬한다. 

- 정렬 하고자 하는 범위의 첫번째 원소를 가리키는 반복자와 끝 원소를 가리키는 반복자를 인수로 넘긴다.
  - `sort(a, b)`
    - <u>a 반복자로부터 'b 반복자 전까지'를 정렬</u> **[a, b)**
	  - b 반복자가 가리키는 곳은 정렬에 포함되지 않음.
	  - 참고로 `end()`은 마지막 원소를 가리키는 반복자가 아닌 마지막 원소보다도 더 뒤인, 아무 것도 없는 공간을 가리킨다. `end() - 1`이 바로 마지막 원소를 가리키는 반복자! 
- 기본적으로 오름차순으로 정렬된다.
  - `sort` 함수를 사용하여 객체를 정렬하고자 할 때는 `<`연산자를 오버로딩 해야 한다.


```cpp
bool compare(const float & a, const float & b)
{
  return a > b;
}
...
sort(myVector.begin(), myVector.end(), compare);
```

> 비교 연산 결과(`bool`타입)를 리턴하는 비교 함수를 직접 정의하여 이를 포인터로 넘겨줄 수 있다. 이 방법으로 <u>내가 원하는 기준대로 정렬시킬 수 있다.</u>

- 사용자 정의 **비교함수**
  - 인수는 반드시 2개 받아야 한다.
    - 비교는 피연산자가 2개 있어야 하니까
  - 인자가 굳이 `const &`일 필요는 없지만 <u>비교 함수 내부에서 인자로 받은 원소를 수정하면 안된다.</u>
  - `<` 연산 결과 리턴 👉 오름차순 정렬
  - `>` 연산 결과 리턴 👉 내림차순 정렬
- 아래와 같이 람다 함수로 넘길 수도 있다.
  ```cpp
  std::sort(s.begin(), s.end(), [](int a, int b) { return a > b; });**
  ```
- **템플릿 비교 함수**
  - string 비교할 때 함수, int 비교할 때 함수,... 이렇게 다 만들 필요 없이 <u>비교 함수 또한 구조체 템플릿으로 만들고 ()연산자를 오버로딩하면 된다.</u>
  - 주의 사항 📢 `a < b` 일 때도 true, `a == b`일 때도 true, 즉 `a <= b` 일 때 true식으로 구현하면 안된다. 런타임 에러남! 정렬 기준이 명확하지 않기 때문. **strict weak ordering 위반**
  - 어떤 타입이든 간에 템플릿을 통하여 구체화 된다.
    ```cpp
    struct int_compare {
    bool operator()(const int& a, const int& b) const { return a > b; }
    };

    ...
    std::sort(vec.begin(), vec.end(), int_compare());
    ```

```cpp
#include <functional>

std::sort(s.begin(), s.end(), std::greater<int>());
```
- C++ 표준인 `functional` 라이브러리의 `greater<타입>()` 함수 객체를 넘겨 내림 차순 정렬을 해줄 수도 있다. 

<br>

#### partial_sort 

> 배열의 일부분만 정렬한다.

```cpp
partial_sort(start, middle, end)
```
- [start, end) 전체 원소들 중에서 [start, middle) 자리에 전체에서 가장 작은애들만 순서대로 저장한다.
  - 즉 [start, middle) <u>자리에만 전체 정렬을 적용함.</u> 나머지는 신경 안씀.
  - 예를 들어
    - 5 3 1 6 4 7 2 👉 partial_sort 👉 <u>1 2 3</u> 6 5 7 4
      - 3 개만 정렬했다.
  - 100명중 상위 10명의 성적만 보고 싶다. 이럴 때 쓰면 좋을 정렬. 
- `sort`와 마찬가지로 비교를 위한 비교 함수 포인터도 인자로 넣어줄 수 있다.

<br>

#### stable_sort

> 정렬은 하되 원소들간의 순서를 보전한다.

- 일반 `sort`의 경우 [a, b]  원소의 크기가 같다면 [a, b]가 될지 [b, a]가 될지는 랜덤으로 정해진다.
- 그러나 `stable_sort`는 원래 순서를 보전하기 때문에 크기가 같으면 [a, b]로 유지가 된다.
- 때문에 `sort`보다는 좀 느리다.
- `sort`와 마찬가지로 비교를 위한 비교 함수 포인터도 인자로 넣어줄 수 있다.

<br>

#### reverse

> 인수로 넘긴 범위의 순서를 거꾸로 뒤집는다.

```cpp
string str = "abcdefg";
reverse(str.begin() + 3, str.end());  // abcgfed  인덱스 3~끝 부분만 순서를 뒤집는다.
```

<br>

### 이진 탐색(binary search)

> 아래 함수들을 사용하기 위해선 <u>원소들이 정렬되어 있다는 전제가 있어야 한다.</u>

#### lower_bound 

> 어떤 값의 <u>하한선</u>

- **이진 참색의 방법**으로 어떤 값의 하한선을 찾는다.
- *lower_bound(v.begin(), v.end(), 150)*
  - 👉 `v` 컨테이너에서 Key : `150` 과 <u>일치하면 그 Key의 반복자를 리턴하고 </u>, 일치 하는게 없다면 `150`을 <u>초과하는 것 중 가장 작은 것</u>의 반복자를 리턴한다.

 - [1, 10, 20, 40, 50, 60, 70]
   - `50`을 lower_bound 로 찾는다면 `50`의 반복자 리턴
   - `65`을 lower_bound 로 찾는다면 `65`는 없으므로 `70`의 반복자 리턴
   - `80`을 lower_bound 로 찾는다면 없으므로 `end()` 리턴

```cpp
lower = lower_bound(myVector.begin(), myVector.end(), 7);
```

- 두 반복자로 나타낸 해당 범위 안의 원소들 중 <u>세번째 인수 값보다 <u>크거나 같은</u> 첫번째 원소의 반복자를 리턴</u>한다.
  - 없다면 범위의 끝을 나타내는 반복자를 리턴한다. 
- `sort`와 마찬가지로 비교를 위한 비교 함수 포인터도 인자로 넣어줄 수 있다.
- 예시
  - arr = [1, 2, 3, 4, 5, 6, 7] 일때
  - `lower_bound(arr, arr + 10, 6)`은 `6을 가리키는 반복자` 이다.
    - 6 보다 크거나 같은 첫번째 원소는 6

##### lower_bound 를 직접 구현한 코드

```cpp
int start = 0;
int end = n - 1;
 
while(start < end){  
    mid = (start + end) / 2;    
 
    if(arr[mid] < key)
        start = mid + 1;
    else
        end = mid;  
}

return end; // 시작 위치 == 끝 위치가 되면 빠져 나오며 이 위치가 바로 답이 된다. 
```

- Key 보다 *작은* 범위는 답이 될 수 없다. 👉 *start = mid + 1*
- Key 보다 *크거나 같은* 범위는 답이 될 수 있다. 그러므로 현재의 `mid`가 또 답 후보가 될 수 있다. 👉 *end = mid*
  - lower_bound 는 일치하는 것도 답이 될 수 있다.


<br>

#### upper_bound 

> 어떤 값의 <u>상한선</u>

- **이진 참색의 방법**으로 어떤 값의 상한선을 찾는다.
- *lower_bound(v.begin(), v.end(), 150)*
  - 👉 `v` 컨테이너에서 `150`을 <u>초과하는 것 중 가장 작은 것</u>의 반복자를 리턴한다.
  - **uppder_bound 는 lower_bound 와는 다르게 일치하는건 찾지 않는다.**
    - lower_bound 👉 일치 or 초과하는 것 중 가장 작은 것
    - upper_bound 👉 초과하는 것 중 가장 작은 것

 - [1, 10, 20, 40, 50, 60, 70]
   - `50`을 upper_bound 로 찾는다면 `60`의 반복자 리턴 👉 <u>lower_bound 와의 차이!</u>
   - `65`을 upper_bound 로 찾는다면 `70`의 반복자 리턴
   - `80`을 upper_bound 로 찾는다면 없으므로 `end()` 리턴

```cpp
upper = upper_bound(myVector.begin(), myVector.end(), 7);
```

- 두 반복자로 나타낸 해당 범위 안의 원소들 중 <u>세번째 인수 값보다 <u>큰</u> 첫번째 원소의 반복자를 리턴</u>한다.
  - 없다면 범위의 끝을 나타내는 반복자를 리턴한다. 
- `sort`와 마찬가지로 비교를 위한 비교 함수 포인터도 인자로 넣어줄 수 있다.

##### upper_bound 를 직접 구현한 코드

```cpp
int start = 0;
int end = n - 1;
 
while(start < end)){  
    mid = (start + end) / 2;    
 
    if(arr[mid] <= key) // ⭐lower_bound랑 다른점은 여기뿐!!!!!
        start = mid + 1;
    else
        end = mid;  
}

return end; // 시작 위치 == 끝 위치가 되면 빠져 나오며 이 위치가 바로 답이 된다. 
```

- Key 보다 *작거나 같은* 범위는 답이 될 수 없다. 👉 *start = mid + 1*
  - uppder_bound 는 lower_bound 와 다르게 일치하는 것은 답이 될 수 없음
- Key 보다 *큰* 범위는 답이 될 수 있다. 그러므로 현재의 `mid`가 또 답 후보가 될 수 있다. 👉 *end = mid*


<br>

#### equal_range 

```cpp
equal_range(vec.begin(), vec.end(), 3);
```
- <u>(lowerbound, uppderbound)</u>의 `std::pair` 객체를 리턴한다. 
  - (해당 범위 내에서 처음으로 3과 같거나 큰 원소의 반복자, 해당 범위 내에서 처음으로 3보다큰 원소의 반복자)

<br>

#### binary_search 

```cpp
// 이렇게 구현되어 있다.

template <class ForwardIterator, class T>
  bool binary_search (ForwardIterator first, ForwardIterator last, const T& val)
{
  first = std::lower_bound(first,last,val);
  return (first!=last && !(val<*first));
}
```
```cpp
binary_search(vec.begin(), vec.end(), 3);
```

- `bool`타입을 리턴한다.
  - 즉 세번째 인수가 해당 범위 내에 있다면 true, 없으면 false를 리턴한다.

<br>

### 병합(merge)

> 아래 함수들을 사용하기 위해선 <u>원소들이 정렬되어 있어야 한다.</u>

<br>

### 집합(set)

> 아래 함수들을 사용하기 위해선 <u>원소들이 정렬되어 있어야 한다.</u>

<br>

## 🔔 힙(heap)

<br>

## 🔔 수학 관련

### max, min

```cpp
max(1, 3); // 1, 3 중 더 큰 값
min(1, 3); // 1, 3 중 더 작은 값
```
- 객체 끼리의 `max`, `min`을 구하고 싶으면 `<` 비교 연산자 오버로딩 해놓기

<br>

### max_element, min_element

```cpp
max_element(시작 주소/반복자, 끝 주소/반복자)  // 해당 범위(끝주소 이전까지) 내의 최대값 원소의 주소/반복자 리턴
min_element(시작 주소/반복자, 끝 주소/반복자)  // 해당 범위(끝주소 이전까지) 내의 최소값 원소의 주소/반복자 리턴
```

- 주의할점 👉 리턴은 해당 최대최소 원소값이 리턴되는게 아니라 최대 최대 원소를 가리키는 반복자/주소라는 것이다.
  - 따라서 최대 최소 원소값을 리턴하고 싶으면 간접 참조를 리턴해야 한다.
    ```cpp
    *max_element(arr, arr + 2);
    *min_element(vec.begin(), vec.end());
    ```

<br>

### next_permutation

> `bool` 타입을 리턴한다. 

```cpp
next_permutation(vec.begin(),vec.end());
```
- 시작 위치, 끝 위치를 인수로 넘겨 해당 범위를 넘겨주면 <u>인수로 넘긴 범위를 기준으로</u> <u>"크기로 따져봤을 때"의 다음 순열 모양새(더 큰수)로 정렬을 한 후</u> `true` 를 리턴한다.
  - 다음 순열이 없다면 `false` 리턴. 즉 **더 이상 이 수열에서 더 큰 수를 만들 수 없다면 `false`**
- 원소들간의 크기를 비교하여 다음 순열 모양을 결정하기 때문에 원소들이 크기가 비교 가능한 것이여야 할 것이다. 

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

	vector<int> v = {1, 2, 3};
	
	do
	{
		for(int i = 0; i < 3; i++)
		{
			cout << v[i] << " ";
		}

		cout << '\n';

	}while(next_permutation(v.begin(),v.end()));   

}
```

- 다음 순열이 있다면 `true`를 리턴하고 없으면 `false`를 리턴하므로 위와 같이 while 반복 문의 조건으로 넣어 모든 순열을 전부 구할 수 있다.
- 위의 코드는 {1, 2, 3}의 `3P3` 순열들을 순열 순서대로 출력하게 된다.


<br>

### prev_permutation

> `bool` 타입을 리턴한다. 

```cpp
prev_permutation(vec.begin(),vec.end());
```
- 시작 위치, 끝 위치를 인수로 넘겨 해당 범위를 넘겨주면 <u>인수로 넘긴 범위를 기준으로</u> <u>"크기로 따져봤을 때"의 이전 순열 모양새(더 작은 수)로 정렬을 한 후</u> `true` 를 리턴한다.
  - 이전 순열이 없다면 `false` 리턴. 즉 **더 이상 이 수열에서 더 작은 수를 만들 수 없다면 `false`**
- 원소들간의 크기를 비교하여 다음 순열 모양을 결정하기 때문에 원소들이 크기가 비교 가능한 것이여야 할 것이다. 

<br>


## 🔔 기타

### fill

> 해당 값으로 채워준다. 즉, 컨테이너의 모든 값을 하나의 값으로 초기화 시킬 수 있다.

```cpp
fill(v.begin(), v.end(), 5);
```

`v` 컨테이너의 처음부터 끝까지를 모두 `5` 값으로 초기화한다.

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}

