---
published: true
title: "[Python] for - else"

categories: Python
tag: [python]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2024-01-08
---
생소한 for - else문

<br>

# for - else

for문이 break 등으로 중간에 빠져나오지 않고 끝까지 실행 됐을 경우 else문이 실행된다.

break를 사용하여 루프가 조기에 종료되면 else문이 실행되지 않는다.

for else문을 설명하기 위한 간단한 예시이다.

```python
nums = [1, 2, 3, 4, 5]

for num in nums:
    if num == 3:
        print("Found 3!")
        break
else:
    print("3을 찾지 못하고 루프 끝")
```

반복문에서 3을 찾으면 "Found 3!"을 출력하고,

3을 찾지 못한 채 반복문이 끝나면 "3을 찾지 못하고 루프 끝" 이 출력된다.

