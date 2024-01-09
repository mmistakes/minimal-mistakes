---
published: true
title: "[Python] input() vs sys.stdin.readline()"

categories: Python
tag: [python]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2023-12-19
---
input()과 sys.stdin.readline()의 차이에 대해 알아보자.



<br>
<br>

# input()

- 표준 입력에서 한 줄을 읽는 `Python`의 내장 함수이다.
- 입력을 문자열로 읽고 후행 개행 문자('\n')을 자동으로 제거한다.
- 대화형 입력 시나리오세서 사용하기 쉽고 편리하다
- 아래 예시처럼 `parameter`로 `prompt message`를 받을 수 있다.

```python
user_input = input("Enter something: ")
```

<br>
<br>

# sys.stdin.readline()

`sys.stdin`은 표준 입력 스트림을 나타내는 객체이고 `readline()`은 이 스트림에서 한 줄을 읽는 메소드이다.

`input()`과 달리 `sys.stdin.readline()`은 후행 개행 문자('\n')를 자동으로 제거하지 않기 때문에 `strip()` 메서드나 기타 문자열 조작 함수를 사용해 수동으로 처리해야한다.

아래는 `readline()`을 사용할 때 개행문자가 포함 되는 것을 제거하여 출력해주는 함수들이다.

## rstrip()

```python
# 오른쪽 공백 제거
'abcdefg '.rstrip() # output >>> 'abcdefg'

import sys
a = sys.stdin.readline().rstrip()
```

## strip()
```python
# 양쪽 공백 제거
' abcdefg '.strip() # output >>> 'abcdefg'

'abcdefg '.strip() # output >>> 'abcdefg'

' abcdefg'.strip() # output >>> 'abcdefg'

import sys
a = sys.stdin.readline().strip()
```


# 결론

`input()` 내장 함수는 `prompt message`를 출력 할 수 있고 개행 문자를 삭제한 값을 리턴한다.

그렇기 때문에 간단한 대화형 입력에 더 일반적으로 사용되는 반면,

`sys.stdin.readline()`은 성능이 중요한 상황에 선호된다. 가끔 백준에서 시간초과가 났을 때 사용하면 해결되는 경우도 있다고 한다.



