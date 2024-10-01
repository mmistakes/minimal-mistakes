---
layout: single
title: "첫 블로그 포스팅입니다."
categories: coding
tags: [python, blog, jekyll]
toc: true
author_profile: false
sidebar:
    nav: "docs"
search: true
---
**[공지사항]** [지킬 블로그 신규 업데이트 안내 드립니다.](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#notices)
{: .notice--info}

<div class="notice--success">
<h4>공지사항입니다.</h4>
<ul>
    <li>공지사항 순서 1</li>
    <li>공지사항 순서 2</li>
    <li>공지사항 순서 3</li>
</ul>
</div>

[Git](https://github.com/KyungbinKo?tab=repositories){: .btn .btn--danger}

{% include video id="q0P3TSoVNDM" provider="youtube" %}


# 오늘 처음 블로그를 만들었어요
앞으로 열심히 해보겠습니다.
## 실시간 반영 Update
## Configuration 업데이트
```python
import random

secret_number = random.randint(1, 100)
while True:
    guess = int(input("Guess the number between 1 and 100: "))

    if guess == secret_number:
        print("Congratulations! You guessed the number!")
        break
    elif guess < secret_number:
        print("Too low! Try again.")
    else:
        print("Too high! Try again.")
```

![Koala](../../assets/images/Koala_Logo.png)