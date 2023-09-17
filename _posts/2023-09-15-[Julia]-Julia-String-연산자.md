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

추가적으로 $\alpha$와 같은 유니코드 문자를 어떻게 넣을 수 있는지에 대해서 설명하도록 하겠다. 이건 Markdown 문법이나 LaTeX와 똑같다고 볼 수 있는데 `\alpha`와 같이 백슬래쉬를 이용해 원하는 문자를 입력한 다음, 탭버튼을 누르면 $\alpha$로 전환되는 것을 확인할 수 있다.

## Escape

```
x = "He said "Hello, World!"";
println(x)
```
과 같이 입력하면 에러가 뜰 것이다. 그 이유는 Julia에서 `x = "He said "`까지만을 변수로 받아들이기 때문이다. 여기에서 `"`를 하나의 character 변수로 인지하게끔 하기 위해서는 백슬래쉬가 필요하다.

```
x = "He said \"Hello, World!\"";
println(x)
> He said "Hello, World!"
```
이렇게 `\`를 넣으면 그 다음에 오는 `"`나 `$`, `\`의 기호를 하나의 character로 입력하게 해준다.

백슬래쉬는 또 다른 역할이 있는데, `\n` 이나 `\t`를 입력하면 줄 간격을 띄우거나 탭 버튼과 같은 역할을 하게 할 수 있다.

```
x = "He said  \n \"Hello, World!\"";
println(x)
> He said
 "Hello, World!"
```
와 같이 말이다.

+) Stackedit(나의 Markdown 편집기) 상에서는 분명 alpha가 잘 보이는데, 왜 내 블로그에서 보면 깨져서 나오는지 모르겠다. 아시는 분 있으면 댓글 부탁드립니다ㅜㅜ
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc4Njk3OTUzNywtNTM0MjkwNjE0LDEzND
U4MTk1NDMsMjEzNjM2MDQ3MSwxNjAyNzQ1NDgzLDExMTUwMjYw
NTldfQ==
-->