---
categories:
  - Julia
---

# #Julia #string

이번에는 string 연산자에 대해 알아보겠다. 우선 전에 string variable은

```Julia
"Hello, World!"
```
이렇게 하면 된다는 것을 확인했다.

예를 들어서,

```Julia
"Julia" * "programming"
```
과 같이 연산자 *를 넣어준다면, 

```
> Juliaprogramming
```
처럼 결과물이 출력된다. 즉 * 연산자는 두 string variable을 concatenate, combine 하는 역할이다. 띄어쓰기가 안되어있는게 좀 불편할 수 있는데, 이는 `Julia` 뒤나 `programming` 앞에 띄어쓰기를 넣은 상태로 입력해주면 된다.
혹은,

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTYzMDk2MDc5Ml19
-->