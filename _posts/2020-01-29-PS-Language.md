---
title: "실전 PS 용어"
date: 2020-01-29 21:19:00
categories:
- etc
tags:
---

**글로 배우는 실전 PS 용어**

PS를 하는 사람들과 대화를 하거나 문제 풀이를 보면 상당히 많이 보이는 어휘가 있습니다. 간결한 어휘를 이용해 생각을 전달할 때에도 쓰이고, meme과 같은 형태로 쓰이기도 합니다. 이 글에서는 자주 보이는 몇몇 어휘와 주요 사용처를 다룹니다.

### 가장 작은 3개만 "들고다니면서"...
보통 데이터를 저장하고 있는 것을 의미합니다.

* 가장 작은 3개만 "들고다니면서" : 가장 작은 3개만 저장해놓고
* 최근 2개의 값만 "들고다니면" : 최근 2개의 값만 저장하면

등등 슬라이딩 윈도우, 토글링 등을 설명할 때 자주 사용됩니다.

### 어떤 구간을 "관리하는"...
* 구간을 "관리"하는 자료구조 : 구간의 특정 대푯값을 빠르게 구해주는 자료구조
* 구간을 "관리"하는 노드 : 구간을 담당하는 노드
* 각 정점에서 CHT를 "관리"하는 세그먼트 트리 : 각 정점마다 CHT를 저장하고 있는 세그먼트 트리

등등 자유분방하게 사용됩니다.

### 쭉 "훑어주면서"...
스위핑을 하는 것을 의미합니다. PBS(Parallel Binary Search)를 할때도 등장하는 어휘입니다.

* 쭉 훑어주면서 쿼리를 처리할 수 있다.
* 쭉 보면서 하나씩 갱신해주면...

### 노드를 "동적으로" 생성해서...
정적 할당 / 동적 할당의 동적과 같은 의미입니다.<br>
주로 세그먼트 트리나 트라이같은 자료구조에서 노드를 미리 할당하는 것이 아닌, 필요한 노드만 그때그때 할당해줄 때 많이 사용합니다.

* 이 문제는 뇌를 비우고 2차원 동적 세그먼트 트리를 짜면 풀립니다.

### 맞왜틀 / 틀왜맞
보자마자 알 수 있을겁니다. 맞았는데 왜 **틀려** / 틀렸는데 왜 **맞아**

전자의 경우, 대부분 본인의 잘못입니다. 간혹 데이터가 틀렸거나(출제자의 정해가 틀리는 경우도 있습니다.) 채점 시스템이 잘못되어 맞왜틀을 외치는 경우도 있긴 합니다.<br>
후자의 경우, 데이터 추가 요청을 해주시면 됩니다 :)

### 좌셋
대회를 보다보면 가끔 등장하는 용어입니다.<br>
흔히 말하는 성공적인 대회의 기준 중 하나로, 모든 문제가 풀렸으면서 모든 문제를 푼 사람(팀)은 없는 문제 셋을 말합니다.<br>
모든 문제라 풀렸기 때문에 대회 시간 내에 풀 수 있는 문제라는 것을 알 수 있으며, 모든 문제를 푼 사람이 없었기 때문에 변별력이 있는 좋은 셋이라고 할 수 있습니다.

### bitset
[이런 자료구조](https://en.cppreference.com/w/cpp/utility/bitset)입니다.<br>
LCS를 $O(NM/w)$ 시간에 구할 수도 있고([링크](http://www.secmem.org/blog/2019/09/12/lcs-with-bitset/)), DP를 푸는 knapsack 문제를 32배정도 빨리 풀 수 있게 해주는([링크](https://codeforces.com/blog/entry/45576)) 좋은 자료구조입니다. 시간복잡도에 /32를 붙여준다고 합니다.

bitset을 이 글에 쓰는 이유는, 최근에 [이런 글](https://codeforces.com/blog/entry/53168)을 봤습니다. 개인적으로 재미있게 봐서 여기에 썼습니다.

### notorious coincidence
```
Hi , so to me seems like a notorious coincidence. Though I have come across a similar technique in a programming article ( it was in Russian ) way back.
```
[원본](https://codeforces.com/blog/entry/52348?#comment-364302)

codechef에서 열린 대회의 출제자가 기존에 있던 문제를 그대로 가져오는 일이 있었습니다. 출제자는 "notorious coincidence"라고 말하였고, 이것이 그대로 meme이 되었습니다.<br>
BOJ에는 동일한 문제를 모아놓은 [이런 문제집](https://www.acmicpc.net/workbook/view/2305)이 존재합니다.

### unethical and ugly behavior
```
If you are a participant of the official Technocup Finals, you are not allowed to take part in the rounds at evening. We ask participants of the official Finals not to discuss the problems in open media till evening.

Due to the unethical and ugly behavior of some members of the community, this round will be unrated. Let's solve problems just for fun!
```
[윗줄 원본](https://codeforces.com/blog/entry/65664), [아랫줄 원본](https://codeforces.com/contest/1120)

오프라인 대회를 먼저 진행하고, 그 대회 문제를 그대로 이용하여 codeforces에서 라운드를 진행하는 어떤 대회에서 문제 풀이가 라이브 스트리밍으로 유출되는 사건이 있었습니다.<br>
대회 운영진은 라운드 공지로 "unethical and ugly behavior"를 언급하며 unrated시켰고, 이것이 meme이 되었습니다.

`unethical and ugly behavior of organizers who leaked the solutions in Youtube and blame participants for that`이 맞는 것 같네요 :(

### multiple account for one person should be banned
```
Multiple accounts for one person should be banned
```
[원본](https://codeforces.com/blog/entry/62458)

codeforces에서 부계정을 과도하게 사용하는 사람들에 대한 글의 제목입니다. 개인적으로 댓글이 매우 재밌습니다.<br>
요즘은 BOJ 슬랙 등 PS 관련 채팅방에서 부계정을 언급할 때마다 MAFOPSBB와 같은 답장이 올라옵니다.

[이 댓글](https://codeforces.com/blog/entry/62458?#comment-464254)에 나와있는 `Stop crying like a baby!`도 한동안 많이 사용되었던 것으로 기억합니다.
