---
title:  "(C++) 문자열 검색 알고리즘 : 아호-코라식(Aho-Corasick) 알고리즘" 

categories:
  - Algorithm
tags:
  - [Algorithm, Coding Test, Cpp]

toc: true
toc_sticky: true

date: 2021-04-23
last_modified_at: 2021-04-23
---

## 🚀 서론

아호 코라식 알고리즘을 이해하기 위해선 **트라이 자료구조**와 **KMP 알고리즘** 개념이 선행되어야 한다.(추가로 BFS 도 알고 있어야 한다.) 아호 코라식은 트라이 자료구조를 사용하며 KMP 알고리즘의 확장판이라고 볼 수 있기 때문이다. 자세한 설명은 아래 링크 참고 :)

- [문자열 집합 : 트라이 자료구조](https://ansohxxn.github.io/algorithm/trie/)
- [문자열 검색 알고리즘 : KMP 알고리즘](https://ansohxxn.github.io/algorithm/kmp/)
- [그래프 순회 방법 2️⃣ - BFS(너비 우선 탐색)](https://ansohxxn.github.io/algorithm%20lesson%202/chapter4-4/)

<br>

### 🔥 쓰임새

> <u>여러 문자열</u>들을 동시에 찾아야 하는 <u>검색 엔진</u>에서 유용하게 사용되는 알고리즘

- KMP 👉 텍스트에서 검색어 하나를 찾아낼 때 사용 (1:1)
- <u>아호 코라식</u> 👉 텍스트에서 <u>검색어 여러개를 동시에</u> 찾아낼 때 사용 (1:N)

ex) "cacachefcachy" 텍스트에 { "cache", "he", "chef", "archy" } 中 하나라도 부분 문자열로 포함되어 있는지 찾기.

아호코라식 알고리즘을 통해 수 많은 페이지에서 여러 검색어들이 부분적으로 포함된 각각의 위치들을 빠르게 찾아낼 수 있다. 

<br>

### 🔥 용어

- *텍스트*, *text* : 검색을 실행할 문자열. 이 문자열 내에 원하는 검색어가 있는지 탐색해보고자 함.
  - \\(N\\) : 텍스트의 길이
- *검색어*, *search*, *pattern* : 검색할 문자열. 검색이 된다면 *텍스트* 의 부분 문자열. 문자열 패턴 매칭을 하는 것과도 같기에 패턴이라고도 칭할 것.
  - \\(M\\) : 검색어의 길이
  - \\(k\\) : 검색어의 총 개수 👉 <u>아호 코라식은 검색어가 여러개일 때 사용</u>

<br>

### 🔥 다른 방법들과의 비교 (+ 아호-코라식의 시간 복잡도)

- 브루트 포스 
  - 일일이 검색어들마다 텍스트와 브루트 포스로 비교한다면
  - 👉 \\(O(nm_{1} + nm_{2} + nm_{3} + .. + nm_{k})\\)
- KMP 알고리즘을 N 번 실행
  - 일일이 검색어들마다 텍스트와 KMP 알고리즘으로 비교
  - 👉 \\(O(n + m_{1} + n + m_{2} + n + m_{3} + .. + n + m_{k}) = O(kn + m_{1} + m_{2} + m_{3} + .. + m_{k})\\) 
    - 동일한 텍스트를 \\(k\\) 번 검사해야 하고 (\\(kn\\)) 검색어들 별로 실패 함수들 \\(m_{1} + m_{2} + m_{3} + .. + m_{k}\\) 을 따로 다 만들어야 한다.
- **아호 코라식**을 사용했을 때
  - 일일이 검색어들마다 비교하지 않고, 검색어들을 트라이 트리에 모아두고 <u>한번에 순회한다.</u>
  - 👉 \\(O(n + m_{1} + m_{2} + .. + m_{k})\\)
    - 텍스트의 순회는 단 한번만 하면 된다. \\(n\\)
    - 검색어 별로 <u>실패 "링크"</u>를 만들 때 \\(m_{1} + m_{2} + m_{3} + .. + m_{k}\\)
      - 아호 코라식은 실패 함수 "배열"을 만들지 않고 트라이에서 불일치시 돌아갈 실패 "링크" 를 만든다.
      - 이 실패 링크 또한 KMP 처럼 접두사 = 접미사의 최대 길이인 곳으로 돌아간다. A 검색어를 검사하는데서 불일치가 발생했다면 A 검색어의 접미사와 일치하는 다른 B 검색어의 접두사 노드로 간다!

<br>

## 🚀 구현 코드 및 과정 설명

아호 코라식 알고리즘은 <u>트라이 + KMP</u> 짬뽕

### 🔥 아호-코라식 개념 설명 (두서없음 주의..)

> 1️⃣ 검색어들은 트라이에 저장한다.

트라이는 여러개의 문자열을 트리 형태로 저장하는 형태의 자료 구조이다. 또한 이 문자열들의 공통된 접두사는 하나의 노드로 묶여 탐색 공간이 줄어들기 때문에 이 트라이에 저장된 문자열들에서 내가 찾아보고자 하는 길이만큼의 시간만 들여서 빠르게 찾아낼 수 있다.

검색어가 여러개일 때, 텍스트 문자열에 이 검색어들이 각각 탐색되는지를 "빠르게" 알고 싶다면 이 검색어들을 트라이에 저장하여 여기서 탐색한다는 것이 아호 코라식의 아이디어다.

> 2️⃣ KMP 처럼 접두사 = 접미사 <u>실패함수를 미리 전처리 과정에서 구해놓는다.</u> 아호 코라식에선 "실패 링크"라고 불린다. 노드 별로 실패 링크를 만든다. 

KMP 와 달리 검색어가 여러개이기 때문에 걸칠 수 있는 그 대상은 검색어 하나가 아닌 여러개가 후보가 될 수 있다. 예를 들어 "블라블라AB" 까지 일치했었다면 이제 "AB" 를 접두사로 가진 '다른 검색어'로 이동할 수 있다는 것이다. "AB" 는 이미 일치했다고 걸쳐진 상태로 "AB" 로 시작하는 이 검색어를 텍스트와 비교하는 식이다. 즉, 걸칠 수 있는 다른 검색어로 비교 대상을 바꾸는 것이다. 

노드별로 실패링크를 만든다는 것은 A 검색어의 원소와 텍스트를 비교해나가다가 불일치가 발생하면 A 검색어에서 <u>이전까지 일치한 부분 문자열의 접미사를 접두사로 가지는 다른 B 검색어 '노드'로 이동하도록</u> 하는 트라이 트리의 "링크"를 만들어주는 것이다. 

여기서 한번 짚고 넘어가고 싶은 부분은 트라이 트리에 있어 "조상 및 부모 노드"는 이전 문자이며, "자식 노드"는 다음 문자라는 것에 주의하자. 직계 부모, 직계 조상이면 자신이 속한 그 문자열을 비롯하여 같은 접두사를 공유하는 문자열들 내에서의 "이전 문자"일테고 직계는 아니지만 그냥 나보다 깊이가 얕은 위의 노드들이면 다른 검색어에 속하지만 나보다 인덱스 상으로 더 앞의 문자가 될 것이다. 자식은 그 반대! 

> 3️⃣ KMP 처럼 <u>탐색</u>시 접두사 = 접미사 최대 길이를 활용하고 **걸치는 작업**을 한다.

실패 링크로 이동하는 것 자체가 <u>걸치는 작업</u>이다.

- 현재 A 노드(=글자)를 방문 중이라고 예를 들자면
  - KMP 와 비교
    - 이전까지 일치한 문자열 👉 트라이 트리 안에서 A 글자까지 내려오면서 지나온 문자들 
    - 이전까지 일치한 문자열의 접미사와 다른 문자열의 접두사 👉 다른 검색어로 비교 하기 위해 옮겨가, 해당 접두사를 걸쳐놓는 위치로 이동한다.
      - 이미 전처리 과정에서 실패 링크를 다 만들어 놨기 때문에 다른 검색어의 걸칠 수 있는 그 위치로 이동하면 된다.

> 📌 정리

- 성공 링크
  - 현재 노드(문자)가 비교 중인 텍스트 원소와 일치한다면 이동할 노드 링크
    - 자식 노드(비교중인 검색어의 다음 문자)로 이동하는 링크이다.
    - 트라이를 만드는 과정인 *Inser* 삽입 함수 과정에서 자연스럽게 정해진다.
- 실패 링크
  - 현재 노드(문자)가 비교 중인 텍스트 원소와 일치하지 않는다면 이동할 노드 링크
    - 다른 검색어에 걸칠 수 있는게 있다면, 즉!! 이전 노드까지의 접미사 중 다른 검색어의 접두사와 일치하는게 있다면, 즉!! 현재 방문 중인 노드의 부모 노드의 실패링크!
      - 부모의 실패 링크를 타고 가면 나오는 노드에서도 현재 문자가 자식 노드(=다음 문자)로 **연결 되는게 있다면**
        - <u>현재 노드의 실패 링크는 부모 노드의 실패 링크의 자식 노드로 가게끔 연결해준다.</u> 즉, 현재 문자에서 불일치되면 현재문자는 이전 문자(부모 노드)까지의 접미사와 동일한 타 검색어의 접두사의 끝 문자가 되도록 이동을 할 수 있도록 하는 것이다.
        - 예시
          - "블라블라AC" 는 **불일치 발생시** "AC블라블라" 로 이동 하도록 실패 링크를 놓을 수 있다. 
          - "블라블라ACZ" 는 **불일치 발생시** "ACZ블라블라" 로 이동 하도록 실패 링크를 놓을 수 있다.
          - "블라블라AC" 의 자식인 "블라블라ACZ" 는 "블라블라AC" 의 실패 링크인 "AC블라블라" 의 자식인 "ACZ블라블라"를 실패 링크로 가질 수 있는 것이다. 단! "블라블라AC" 의 "C" 의 다음 글자가 "Z" 인게 트라이에 존재한다는 전제하에! 
      - 부모의 실패 링크를 타고 가면 나오는 노드에서도 현재 문자가 자식 노드(=다음 문자)로 **연결 되는게 없다면**
        - 루트로 돌아갈 떄까지, 혹은 현재 문자가 접두사의 끝이 될 수 있을 때까지 부모의 실패링크를 타고 올라가고 그 노드의 실패 링크를 또 타고 올라가고를 반복하여 올라간다. 
    - 전체적으로 이렇게 가장 가까운 조상인 직계 부모의 실패링크부터 검사를 하고, 연결되는게 없다면 타고타고 올라가고 하기 때문에 접두사 = 접미사의 "최대 길이"라는 것이 자연스럽게 보장이 된다.
      - 조상 노드들부터 이렇게 실패 링크를 결정 지어 왔기 때문에 DP 방식으로 생각하면 된다.

밑에서 더 자세히 설명하겠지만 BFS 방식으로 루트부터 깊이대로 차례 차례 노드 들을 방문해 내려오면서 각각 실패 링크를 만들어 준다. 그래서 현재 노드의 실패 링크를 결정하고자 하는 시점엔 이미 그의 조상 노드들의 실패 링크는 모두 정해진 상태이다. 만약 재귀 호출 방식으로 DFS 를 사용한다면 직계 부모의 실패 링크는 알 수 있지만 실패 링크를 따라간 노드의 실패 링크는 알 수가 없을 수도 있기 때문이다.(아직 실패링크 안 만든 상태일 수도) 따라서 BFS 를 통해 깊이대로 차례 차례 실패 링크를 만든다.

전체적으로 말로 풀어서 설명하기가 너무 어렵다. 😅 그러니 밑에 도식화 한 과정을 보며 이해해보자.


<br>

### 🔥 전체 코드

```cpp
#include <bits/stdc++.h>

using namespace std;

struct Trie { // 노드 객체 클래스
public:
	bool isEnd; // 이 노드가 한 검색어의 끝인지 아닌지를 알려줌 
	string p;   // 이 노드까지의 접두사 (아호 코라식의 필요한 부분은 아니다.)
	map<char, Trie*> child; // 자식 노드 링크
	Trie* fail; // 실패 링크 ⭐

	Trie() : isEnd(false), fail(nullptr) {}

	void Insert(string pattern) {
		Trie* now = this;
		int m = pattern.length();
		for (int i = 0; i < m; ++i) {
			if (now->child.find(pattern[i]) == now->child.end())
				now->child[pattern[i]] = new Trie;
			now = now->child[pattern[i]];

			if (i == m - 1) {
				now->p = pattern;
				now->isEnd = true;
			}
		}
	}

	void Fail() {  // BFS + KMP
		Trie* root = this;
		queue<Trie*> q;

		q.push(root);

		while (!q.empty()) {
			Trie* now = q.front();
			q.pop();

			for (auto& ch : now->child) {

				Trie* next = ch.second;
				if (now == root)
					next->fail = root;
				else {
					Trie* prev = now->fail;
					while (prev != root && prev->child.find(ch.first) == prev->child.end())
						prev = prev->fail;
					if (prev->child.find(ch.first) != prev->child.end())
						prev = prev->child[ch.first];
					next->fail = prev;
				}

				if (next->fail->isEnd)
					next->isEnd = true;

				q.push(next);
			}
		}
	}
};

vector<pair<string, int>> KMP(string text, Trie* root) {
	Trie* now = root;
	int n = text.length();
	vector<pair<string, int>> answer;
	for (int i = 0; i < n; ++i) {
		while (now != root && now->child.find(text[i]) == now->child.end())
			now = now->fail;
		if (now->child.find(text[i]) != now->child.end())
			now = now->child[text[i]];
		if (now->isEnd) {
			answer.push_back({ now->p, i });
		}
	}
	return answer;
}

int main() {
	freopen("input.txt", "r", stdin);

	int N;
	cin >> N;
	vector<string> patterns(N);
	for (int i = 0; i < N; ++i)
		cin >> patterns[i];
	Trie* root = new Trie;
	for (int i = 0; i < N; ++i)
		root->Insert(patterns[i]);
	root->Fail();

	string text;
	cin >> text;

	vector<pair<string, int>> answer = KMP(text, root);
  cout << text << "에서 검색하기" << '\n';
	for (int i = 0; i < answer.size(); ++i) 
		cout << "확인된 검색어 : " << answer[i].first << ", 위치 : " << answer[i].second << '\n';
}

```
```
💎입력💎

검색어 👉 cache, he, chef, achy
텍스트 👉 cacachefcachy
```
```
💎출력💎

cacachefcachy에서 검색하기
확인된 검색어 : cache, 위치 : 6
확인된 검색어 : chef, 위치 : 7
확인된 검색어 : achy, 위치 : 12
```


<br>

#### 1️⃣ 삽입 함수 (트라이 만들기)

```cpp
  // Trie 트라이의 멤버 함수
  // 📌 노드들의 성공 링크 결정
	void Insert(string pattern) {
		Trie* now = this;
		int m = pattern.length();
		for (int i = 0; i < m; ++i) {
			if (now->child.find(pattern[i]) == now->child.end())
				now->child[pattern[i]] = new Trie;
			now = now->child[pattern[i]];

			if (i == m - 1) {
				now->p = pattern;
				now->isEnd = true;
			}
		}
	}
```

***

![image](https://user-images.githubusercontent.com/42318591/115852460-11a9f280-a463-11eb-931e-50554633aa00.png)

가장 첫 번째로 해주어야할 작업은 검색어들을 트라이 트리에 삽입하는 것이다. 검색어의 마지막 글자엔 해당 검색어를 문자열 `p`에 할당해주고 `isEnd` 를 True 로 바꾸었다. 진한 노란색은 `isEnd`가 True인 단어의 끝을 의미한다.

![image](https://user-images.githubusercontent.com/42318591/115852481-166ea680-a463-11eb-8186-b4b3dba71797.png)

원래 실제 메모리상으론 첫 번째 그림처럼 되는게 맞다. 그러나 아호 코라식 과정을 이해하는데 도움이 되기 위하여 두 번째 그림과 같이 해당 글자까지의 접두사로 노드를 표현하겠다.

<br>

#### 2️⃣ 실패 함수 (트라이를 BFS 순회하며 노드마다 실패 링크 만들어주기)

```cpp
  // Trie 트라이의 멤버 함수
  // 📌 노드들의 실패 링크 결정
	void Fail() {  // BFS + KMP
		Trie* root = this;
		queue<Trie*> q;

		q.push(root);

		while (!q.empty()) {
			Trie* now = q.front(); // 방문 중인 노드
			q.pop();

      /* 자식 노드들 큐에 삽입 및 실패 링크 만들어주기 */
			for (auto& ch : now->child) {

				Trie* next = ch.second; // 자식 노드 (now 의 자식 next)
        // 부모(now)가 루트 노드라면 실패 링크는 루트로 한다. 
        // 첫 문자부터 불일치였다면 걸칠 수 있는게 없기 때문이다.
				if (now == root)
					next->fail = root;
        // 부모(now)가 루트 노드가 아니라면
				else {
					Trie* prev = now->fail; // 부모 노드(= 이전 문자)의 실패 링크! 현재 노드(next) 까지 도달 했다는 것은 부모 노드(= 이전 문자)까진 일치했었다는 뜻이다.
          // 부모의 실패 링크에 현재 문자(next)가 자식 노드로 연결되지 않았다면, 즉 자식으로 없다면! 혹시 그 실패 링크가 루트 노드가 되거나 현재 문자를 자식으로 둔 노드를 찾을 떄까지 실패 링크를 타고 타고 올라간다.
          // 접미사 = 접두사인 타 검색어의 접두사를 찾을 때까지 올라감
          // 타고 타고 올라갈 수록 접미사 = 접두사의 길이는 짧아질 수 밖에 없다.
					while (prev != root && prev->child.find(ch.first) == prev->child.end())
						prev = prev->fail;
          // 현재 노드(next)의 실패링크를 결정한 실패링크의 자식 노드로 연결
					if (prev->child.find(ch.first) != prev->child.end())
						prev = prev->child[ch.first];
					next->fail = prev;
				}
        // che 의 실패링크가 he 라면, 근데 he 가 완전한 단어의 모습이라면! chef 의 che 또한 isEnd 가 true 가 될 수 있다. che 에서 불일치가 발생하더라도 그건 완전한 검색어 he 로도 걸칠 수 있기 때문이다.
				if (next->fail->isEnd)
					next->isEnd = true;

				q.push(next);
			}
		}
	}

```

***

> BFS 순회

- 회색 별표 : 현재 방문 중인 노드 `now` (= 현재 노드인 `next`의 부모)
- 노란 화살표 : 성공 링크
- 주황 화살표 : 실패 링크
  - 볼드체는 현재 예약 중인 노드 `next` 에게  방금 만들어준 실패 링크

***

![image](https://user-images.githubusercontent.com/42318591/115852572-30a88480-a463-11eb-9ec6-cfa28753ea5c.png)

```cpp
				if (now == root)
					next->fail = root;
```

> "a" 에서 불일치가 발생한다면?

- 부모가 루트이기 때문에 실패 링크는 루트로 한다. 
  - 이전 문자가 하나도 없기 때문에 이전 문자에서 접두사 = 접미사를 찾을 수 없어 처음부터 찾도록 실패시 트라이의 루트로 돌아가도록 한다. 

***

![image](https://user-images.githubusercontent.com/42318591/115852590-34d4a200-a463-11eb-88e8-1b8fabba942b.png)

```cpp
				if (now == root)
					next->fail = root;
```

> "c" 에서 불일치가 발생한다면?

- 부모가 루트이기 때문에 실패 링크는 루트로 한다. 
  - 이전 문자가 하나도 없기 때문에 이전 문자에서 접두사 = 접미사를 찾을 수 없어 처음부터 찾도록 실패시 트라이의 루트로 돌아가도록 한다. 

***

![image](https://user-images.githubusercontent.com/42318591/115852610-3a31ec80-a463-11eb-94be-34eeac39a2e6.png)

```cpp
				if (now == root)
					next->fail = root;
```

> "h" 에서 불일치가 발생한다면?

- 부모가 루트이기 때문에 실패 링크는 루트로 한다. 
  - 이전 문자가 하나도 없기 때문에 이전 문자에서 접두사 = 접미사를 찾을 수 없어 처음부터 찾도록 실패시 트라이의 루트로 돌아가도록 한다. 

***

![image](https://user-images.githubusercontent.com/42318591/115852632-4158fa80-a463-11eb-815f-0bda989e0dd9.png)

> "ac" 의 "c" 에서 불일치가 발생한다면 ?

"ac"의 가능한 접미사는 "c" 뿐이다.

```cpp
					if (prev->child.find(ch.first) != prev->child.end())
						prev = prev->child[ch.first];
					next->fail = prev;
```

- 부모인 "a" 의 실패 링크가 루트인데 루트의 자식으로 "c" 가 있다.
  - 즉, "c" 로 시작하는 접두사가 있다는 의미이다. 실패시 이 "c" 로 이동하도록 한다.

***

![image](https://user-images.githubusercontent.com/42318591/115852657-48800880-a463-11eb-85d7-891f51c318b2.png)

> "ca" 의 "a" 에서 불일치가 발생한다면 ?

"ca"의 가능한 접미사는 "a" 뿐이다.

```cpp
					if (prev->child.find(ch.first) != prev->child.end())
						prev = prev->child[ch.first];
					next->fail = prev;
```

- 부모인 "c" 의 실패 링크가 루트인데 루트의 자식으로 "a" 가 있다.
  - 즉, "a" 로 시작하는 접두사가 있다는 의미이다. 실패시 이 "a" 로 이동하도록 한다.

***

![image](https://user-images.githubusercontent.com/42318591/115852688-4e75e980-a463-11eb-8bee-e08528716c43.png)

> "ch" 의 "h" 에서 불일치가 발생한다면 ?

"ch"의 가능한 접미사는 "h" 뿐이다.

```cpp
					if (prev->child.find(ch.first) != prev->child.end())
						prev = prev->child[ch.first];
					next->fail = prev;
```

- 부모인 "c" 의 실패 링크가 루트인데 루트의 자식으로 "h" 가 있다.
  - 즉, "h" 로 시작하는 접두사가 있다는 의미이다. 실패시 이 "h" 로 이동하도록 한다.

***

![image](https://user-images.githubusercontent.com/42318591/115944985-39956680-a4f4-11eb-9f91-1476ff954461.png)

> "he" 의 "e" 에서 불일치가 발생한다면 ?

"he"의 가능한 접미사는 "e" 뿐이다.

```cpp
        next->fail = prev;
```

- 부모인 "h" 의 실패 링크가 루트인데 루트의 자식으로 "e" 가 없다. 
  - 즉, "e" 로 시작하는 접두사가 없다는 의미이다. 
    - 부모 실패 링크가 루트이니 while 에도 걸리지 않고, 부모 실패링크의 자식으로 "e" 가 없으니 if 문에도 걸리지 않는다. 
- 부모의 실패 링크인 루트가 그대로 할당 된다.
  - "he" 의 "e" 에서 불일치가 발생한다면 "he" 보다 짧은 것 중 "e" 로 시작할 수 있는게 없기 때문에 루트로 향한다.

***

![image](https://user-images.githubusercontent.com/42318591/115852732-5cc40580-a463-11eb-84fa-4508c5e0705d.png)

> "ach" 의 "h" 에서 불일치가 발생한다면 ?

"ach" 의 가능한 접미사는 "h", "ch" 가 있다. (길이가 긴게 선택될 수록 좋다. 현재 노드와 가까운 실패링크일 수록 길이가 길다.)

```cpp
					if (prev->child.find(ch.first) != prev->child.end())
						prev = prev->child[ch.first];
					next->fail = prev;
```

- 부모인 "ac" 의 실패 링크인 "c"의 자식으로 "h" 가 있다.
  - 즉, "ch" 로 시작하는 접두사가 있다는 의미이다. 실패시 이 "ch" 로 이동하도록 한다.

***

![image](https://user-images.githubusercontent.com/42318591/115852752-62b9e680-a463-11eb-9095-2af5955f5e2f.png)

> "cac" 의 "c" 에서 불일치가 발생한다면 ?

"cac" 의 가능한 접미사는 "c", "ac" 가 있다. (길이가 긴게 선택될 수록 좋다. 현재 노드와 가까운 실패링크일 수록 길이가 길다.)

```cpp
					if (prev->child.find(ch.first) != prev->child.end())
						prev = prev->child[ch.first];
					next->fail = prev;
```

- 부모인 "ca" 의 실패 링크인 "a"의 자식으로 "c" 가 있다.
  - 즉, "ac" 로 시작하는 접두사가 있다는 의미이다. 실패시 이 "ac" 로 이동하도록 한다.

***

![image](https://user-images.githubusercontent.com/42318591/115945625-8595da80-a4f7-11eb-8b7d-e7c25e50bc23.png)

> "che" 의 "e" 에서 불일치가 발생한다면 ?

"che" 의 가능한 접미사는 "e", "he" 가 있다. (길이가 긴게 선택될 수록 좋다. 현재 노드와 가까운 실패링크일 수록 길이가 길다.)

```cpp
					if (prev->child.find(ch.first) != prev->child.end())
						prev = prev->child[ch.first];
					next->fail = prev;
```

- 부모인 "ch" 의 실패 링크인 "h"의 자식으로 "he" 가 있다.
  - 즉, "he" 로 시작하는 접두사가 있다는 의미이다. 실패시 이 "he" 로 이동하도록 한다.

```cpp
				if (next->fail->isEnd)
					next->isEnd = true;
```

"che" 의 실패링크인 "he" 는 단어의 끝이다. 즉, "che" 에 "he" 검색어가 포함되어 있다는 것이다. 따라서 "che" 의 `isEnd`도 True 로 체크를 해준다. (진한 노란색으로 색 바꿔줌)

***

![image](https://user-images.githubusercontent.com/42318591/115945633-8a5a8e80-a4f7-11eb-9364-5454011e0f51.png)

"he" 의 자식은 아무것도 없기 때문에 for문 예약 작업 하지 않고 넘어간다.

***

![image](https://user-images.githubusercontent.com/42318591/115945636-8fb7d900-a4f7-11eb-9ca5-b13bdc8af65d.png)

> "achy" 의 "y" 에서 불일치가 발생한다면 ?

"achy" 의 가능한 접미사는 "y", "hy", "chy" 가 있다. (길이가 긴게 선택될 수록 좋다. 현재 노드와 가까운 실패링크일 수록 길이가 길다.)

```cpp
					while (prev != root && prev->child.find(ch.first) == prev->child.end())
						prev = prev->fail;
          // if 는 false
					next->fail = prev;
```

- 부모인 "ach" 의 실패 링크인 "ch"의 자식으로 "y" 가 없다. 👉 "chy" 로 걸칠 수 있는 접두사 없음
  - 부모의 실패링크가 루트도 아니기 때문에 while 문을 돌며 "hy", "y" 로 걸칠 수 있을지 각각 검사하러 간다.
    - "ch" 의 실패 링크인 "h"의 자식으로 "y" 가 없다.
    - "h" 의 실패 링크인 루트의 자식으로 "y" 가 없다.
  - 결국 "hy", "y" 접두사도 존재하지 않기에 "ach" 의 실패 링크는 루트가 된다.

***

![image](https://user-images.githubusercontent.com/42318591/115945640-95152380-a4f7-11eb-9b22-697545f2a9d6.png)

> "cach" 의 "h" 에서 불일치가 발생한다면 ?

"cach" 의 가능한 접미사는 "h", "ch", "ach" 가 있다. (길이가 긴게 선택될 수록 좋다. 현재 노드와 가까운 실패링크일 수록 길이가 길다.)

```cpp
					if (prev->child.find(ch.first) != prev->child.end())
						prev = prev->child[ch.first];
					next->fail = prev;
```

- 부모인 "cac" 의 실패 링크인 "ac"의 자식으로 "ach" 가 있다.
  - 즉, "ach" 로 시작하는 접두사가 있다는 의미이다. 실패시 이 "ach" 로 이동하도록 한다.

***

![image](https://user-images.githubusercontent.com/42318591/115945643-99414100-a4f7-11eb-918e-6460e503dcd5.png)

> "chef" 의 "f" 에서 불일치가 발생한다면 ?

"chef" 의 가능한 접미사는 "f", "ef", "hef" 가 있다. (길이가 긴게 선택될 수록 좋다. 현재 노드와 가까운 실패링크일 수록 길이가 길다.)

```cpp
					while (prev != root && prev->child.find(ch.first) == prev->child.end())
						prev = prev->fail;
          // if 문은 false
					next->fail = prev;
```

- 부모인 "che" 의 실패 링크인 "he"의 자식으로 "y" 가 없다. 👉 "hef" 로 걸칠 수 있는 접두사 없음
  - 부모의 실패링크가 루트도 아니기 때문에 while 문을 돌며 "ef", "f" 로 걸칠 수 있을지 각각 검사하러 간다.
    - "he" 의 실패 링크인 루트의 자식으로 "f" 가 없다.
  - 결국 "ef", "f" 접두사도 존재하지 않기에 "chef" 의 실패 링크는 루트가 된다.

***

![image](https://user-images.githubusercontent.com/42318591/115945647-9e05f500-a4f7-11eb-97a4-d318ec648e2a.png)

"achy" 의 자식은 아무것도 없기 때문에 for문 예약 작업 하지 않고 넘어간다.

***

![image](https://user-images.githubusercontent.com/42318591/115945657-a2321280-a4f7-11eb-88e0-8c59def7c277.png)

> "cache" 의 "e" 에서 불일치가 발생한다면 ?

"cache" 의 가능한 접미사는 "e", "he", "che", "ache" 가 있다. (길이가 긴게 선택될 수록 좋다. 현재 노드와 가까운 실패링크일 수록 길이가 길다.)

```cpp
					while (prev != root && prev->child.find(ch.first) == prev->child.end())
						prev = prev->fail;
					if (prev->child.find(ch.first) != prev->child.end()) // if 도 True 가 됨!
						prev = prev->child[ch.first];
					next->fail = prev;
```

- 부모인 "cach" 의 실패 링크인 "ach"의 자식으로 "e" 가 없다. 👉 "ache" 로 걸칠 수 있는 접두사 없음
  - 부모의 실패링크가 루트도 아니기 때문에 while 문을 돌며 "che", "he", "e" 로 걸칠 수 있을지 각각 검사하러 간다.
    - "ach" 의 실패 링크인 "ch"의 자식으로 "e" 가 있다. (while문 종료)
  - 따라서 "cache" 의 실패 링크는 "che" 가 된다. 

***

![image](https://user-images.githubusercontent.com/42318591/115945661-a65e3000-a4f7-11eb-8132-ea85d5cdcba0.png)

"chef" 의 자식은 아무것도 없기 때문에 for문 예약 작업 하지 않고 넘어간다.

***

![image](https://user-images.githubusercontent.com/42318591/115945666-ab22e400-a4f7-11eb-832e-d091310459a6.png)

"cache" 의 자식은 아무것도 없기 때문에 for문 예약 작업 하지 않고 넘어간다.

***

<br>

#### 3️⃣ 검색 함수 (KMP 알고리즘 방식으로 트라이에서 검색)

```cpp
// 전역 함수
vector<pair<string, int>> KMP(string text, Trie* root) {
	Trie* now = root;
	int n = text.length();
	vector<pair<string, int>> answer;
	for (int i = 0; i < n; ++i) {
    // 텍스트 글자가 현재 방문 중인 노드(검색어 글자)와 일치하지 않는다면 👉 일치하는게 하나도 없는 상태(now == root)가 되거나 일치할 때까지 실패 링크 타기
		while (now != root && now->child.find(text[i]) == now->child.end()) 
			now = now->fail;
    // 일치한다면 성공링크 타고 내려가기
		if (now->child.find(text[i]) != now->child.end()) 
			now = now->child[text[i]]; 
    // 검색어를 찾았다면
		if (now->isEnd) {
			answer.push_back({ now->p, i }); // 그 문자열과 위치를 answer 에 담도록 하였다.
		}
	}
	return answer;
}
```

- 일치할 경우 "성공 링크"를 타고 내려간다. (노란 화살표)
- 일치하지 않을 경우, 일치할 때까지 (혹은 루트가 될 때까지) "실패 링크"를 타고 올라간다. (주황 화살표)

***

![image](https://user-images.githubusercontent.com/42318591/115952115-4c716080-a51f-11eb-8387-dc78ce8f1553.png)

> 텍스트 : <u>c</u> a c a c h e f c a c h y

- 현재 방문 노드 : 루트 
- 루트의 성공 링크 (첫 번째 if) 
  - 루트의 자식인 `c` 로 이동
- 아직 검색어 찾지 못함 (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952119-52ffd800-a51f-11eb-81e9-b0c0e5c682af.png)

> 텍스트 : c <u>a</u> c a c h e f c a c h y

- 현재 방문 노드 : `c` 
- `c`의 성공 링크 (첫 번째 if) 
  - `c`의 자식인 `ca` 로 이동
- 아직 검색어 찾지 못함 (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952133-585d2280-a51f-11eb-9058-38ab21b1f598.png)

> 텍스트 : c a <u>c</u> a c h e f c a c h y

- 현재 방문 노드 : `ca` 
- `ca`의 성공 링크 (첫 번째 if) 
  - `ca`의 자식인 `cac` 로 이동
- 아직 검색어 찾지 못함 (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952136-5dba6d00-a51f-11eb-859f-4962e4aa6539.png)

> 텍스트 : c a c <u>a</u> c h e f c a c h y

- 현재 방문 노드 : `cac` 
- 실패 링크 (while)
  - `cac`의 자식엔 `caca` 가 없다. 👉 `cac`의 실패 링크인 `ac` 로 이동
  - `ac`의 자식엔 `aca` 가 없다. 👉 `ac` 의 실패 링크인 `c` 로 이동
  - `c`의 자식엔 `ca` 가 있다.
- `c`의 성공 링크 (첫 번째 if) 
  - `c`의 자식인 `ca` 로 이동
- 아직 검색어 찾지 못함 (두 번째 if)

***


![image](https://user-images.githubusercontent.com/42318591/115952141-627f2100-a51f-11eb-8bbc-a5ccf49d6a7c.png)

> 텍스트 : c a c a <u>c</u> h e f c a c h y

- 현재 방문 노드 : `ca` 
- `ca`의 성공 링크 (첫 번째 if) 
  - `ca`의 자식인 `cac` 로 이동
- 아직 검색어 찾지 못함 (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952147-68750200-a51f-11eb-8a67-bebadea1cec2.png)


> 텍스트 : c a c a c <u>h</u> e f c a c h y

- 현재 방문 노드 : `cac` 
- `cac`의 성공 링크 (첫 번째 if) 
  - `cac`의 자식인 `cach` 로 이동
- 아직 검색어 찾지 못함 (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952153-6dd24c80-a51f-11eb-8c55-f60ff9fdea6b.png)

> 텍스트 : c a c a c h <u>e</u> f c a c h y

- 현재 방문 노드 : `cach` 
- `cach`의 성공 링크 (첫 번째 if) 
  - `cach`의 자식인 `cache` 로 이동
- 검색어 찾음 ! ! ! (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952156-72970080-a51f-11eb-8957-5f4b362263af.png)

> 텍스트 : c a c a c h e <u>f</u> c a c h y

- 현재 방문 노드 : `cache` 
- 실패 링크 (while)
  - `cache`의 자식엔 `cachef` 가 없다. 👉 `cache`의 실패 링크인 `che` 로 이동
  - `che`의 자식엔 `chef` 가 있다.
- `che`의 성공 링크 (첫 번째 if) 
  - `che`의 자식인 `chef` 로 이동
- 검색어 찾음 ! ! ! (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952164-79257800-a51f-11eb-95d9-2beb7e8b2ed5.png)


> 텍스트 : c a c a c h e f <u>c</u> a c h y

- 현재 방문 노드 : `chef` 
- 실패 링크 (while)
  - `chef`의 자식엔 `chefc` 가 없다. 👉 `chef`의 실패 링크인 루트로 이동
- 루트의 성공 링크 (첫 번째 if) 
  - 루트의 자식인 `c` 로 이동
- 아직 검색어 찾지 못함 (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952168-7e82c280-a51f-11eb-97a8-f82e89866d0b.png)

> 텍스트 : c a c a c h e f c <u>a</u> c h y

- 현재 방문 노드 : `c` 
- `c`의 성공 링크 (첫 번째 if) 
  - `c`의 자식인 `ca` 로 이동
- 아직 검색어 찾지 못함 (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952175-82aee000-a51f-11eb-81a0-195852d21d27.png)

> 텍스트 : c a c a c h e f c a <u>c</u> h y

- 현재 방문 노드 : `ca` 
- `ca`의 성공 링크 (첫 번째 if) 
  - `ca`의 자식인 `cac` 로 이동
- 아직 검색어 찾지 못함 (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952182-88a4c100-a51f-11eb-9053-53737c5b2cb0.png)

> 텍스트 : c a c a c h e f c a c <u>h</u> y

- 현재 방문 노드 : `cac` 
- `cac`의 성공 링크 (첫 번째 if) 
  - `cac`의 자식인 `cach` 로 이동
- 아직 검색어 찾지 못함 (두 번째 if)

***

![image](https://user-images.githubusercontent.com/42318591/115952185-8e020b80-a51f-11eb-9a51-3298019adeb4.png)

> 텍스트 : c a c a c h e f c a c h <u>y</u>

- 현재 방문 노드 : `cach` 
- 실패 링크 (while)
  - `cach`의 자식엔 `cachy` 가 없다. 👉 `cach`의 실패 링크인 `ach`로 이동
  - `ach`의 자식엔 `achy` 가 있다.
- `ach`의 성공 링크 (첫 번째 if) 
  - `ach`의 자식인 `achy` 로 이동
- 검색어 찾음 ! ! ! (두 번째 if)

***

이렇게 하여 텍스트를 모두 순회하였고 탐색을 종료 :)


<br>

## 📌 Reference

- [책 : 알고리즘 문제 해결 전략](http://www.yes24.com/Product/Goods/8006522)
- [마법의 슈퍼 마리오 라이님 블로그](https://m.blog.naver.com/kks227/220992598966)

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}