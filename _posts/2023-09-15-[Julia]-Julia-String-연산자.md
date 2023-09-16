---
categories:
  - Julia
---

# #Julia #string

이번에는 string 연산자에 대해 알아보겠다. 우선 전에 string variable은

```
"Hello, World!"
```
이렇게 하면 된다는 것을 확인했다.

예를 들어서,

```
"Julia" * "programming"
```
과 같이 연산자 *를 넣어준다면, 

```
> Juliaprogramming
```
처럼 결과물이 출력된다. 즉 * 연산자는 두 string variable을 concatenate, combine 하는 역할이다. 띄어쓰기가 안되어있는게 좀 불편할 수 있는데, 이는 `Julia` 뒤나 `programming` 앞에 띄어쓰기를 넣은 상태로 입력해주면 된다. 혹은,

```
"Julia" * "" * "programming"
```
과 같이 공백을 하나 따로 넣어주는 것도 가능하다.

  
다음 연산자는 ^이다. 제곱표시인데, 예상 가능하듯, Julia에서는 같은 string을 여러번 반복할 때 사용할 수 있다.
```
"Hello"^3
```
이렇게 입력한다면,

```
> HelloHelloHello
```
와 같은 결과가 생성될 것이다. 

## Unicode letter

추가적으로 $\alpha$와 같은 유니코드 문자를 어떻게 넣을 수 있는지에 대해서 설명하도록 하겠다. 이건 Markdown 문법이나 LaTeX와 똑같다고 볼 수 있는데 `\alpha`와 같이 백슬래쉬(\\)를 이용해 원하는 문자를 입력한 다음, 탭버튼을 누르면 $\alpha$로 전환되는 것을 확인할 수 있다.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTYwMjc0NTQ4MywxMTE1MDI2MDU5XX0=
-->