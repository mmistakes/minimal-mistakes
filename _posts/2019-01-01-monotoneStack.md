---
title:  "monotone stack"
date:   2019-01-01 17:02:00
categories:
- Medium-Algorithm
tags:
- Stack
---

monotone stack은 몇몇 문제들의 시간 복잡도를 O(n)정도로 줄어주는 강력한 테크닉입니다.

### 핵심 아이디어
기본적인 아이디어는 스택의 원소들을 오름차순, 혹은 내림차순 상태를 유지하도록 하는 것입니다.<br>
스택의 원소들을 중복을 허용하지 않으면서 오름차순 상태로 유지시킨다고 가정하고, 아래 순서대로 수를 스택에 넣어봅시다.<br>
`5 19 46 20 10 16 18 15 15 29 47 20`<br><br>
하나씩 스택에 넣어봅시다.

<img src = "https://i.imgur.com/K7MNC0l.png">

<img src = "https://i.imgur.com/yeyYoLV.png">

<img src = "https://i.imgur.com/lNjet4j.png"><br>
5, 19, 46은 그냥 넣어주면 됩니다.

20을 넣어야 하는데, 스택의 top이 20보다 큰 46입니다. 46을 pop하고 20을 넣어줍시다.<br>
<img src = "https://i.imgur.com/EUoV8hc.png">

10보다 큰 20과 19를 제거하고 10을 넣어줍시다.<br>
<img src = "https://i.imgur.com/GBFaTkd.png">

16과 18도 같은 방식으로 처리해줍니다.<br>
<img src = "https://i.imgur.com/sdKuk3g.png">

16과 18을 제거하고 15를 넣어줍시다.<br>
<img src = "https://i.imgur.com/njWBqXG.png">

그 다음 수도 15입니다. 이 스택은 중복을 허용하지 않으면서 오름차순으로 유지시킬겁니다. 그러므로 기존에 있던 15를 제거하고 새로운 15를 넣어줍니다.<br>
<img src = "https://i.imgur.com/njWBqXG.png">

이런식으로 마지막 숫자까지 처리하면 아래와 같은 상태가 됩니다.<br>
<img src = "https://i.imgur.com/bMw2YhY.png">

### 활용 방법
이제 이것이 어떤 것을 의미하는지 알아봅시다.<br>
스택에 숫자 x를 넣는다고 가정합시다. x를 넣기 전에 <b>x 이상의 수를 모두 제거하고</b> x를 넣습니다.<br>
이 동작으로 인해 스택의 상태는 아래 사진과 같음을 의미합니다.<br>
<img src = "https://i.imgur.com/LwF5sPx.png">

이렇게 스택의 원소를 정렬하면, 현재 원소 x보다 왼쪽에 있는 원소 중에서 처음으로 나오는 x미만의 수의 위치를 바로 알 수 있습니다.<br>
만약 내림차순으로 유지하거나, 중복을 허용하거나, 오른쪽부터 삽입하는 등의 변형을 하면 더욱 다양한 정보를 얻을 수 있습니다.

### 연습 문제
연습 문제와 설명은 (<a href = "https://justicehui.github.io/ps/2018/11/06/StackOp/">이 링크</a>)에 있습니다.
