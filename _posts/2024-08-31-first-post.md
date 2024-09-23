---
layout: single
title: "첫 블로그 포스팅입니다."
categories: coding
---

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

![Dobby](../assets/images/Dobby.png)