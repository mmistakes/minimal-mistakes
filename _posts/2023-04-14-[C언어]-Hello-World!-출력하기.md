---
categories:
  - C
---

# #C #HelloWorld!

C언어는 내가 평소에 쓰던 MATLAB이나 R 혹은 Python과는 언어가 전혀 다르게 생겼다. 그나마 파이썬이랑은 좀 비슷해보이기는 한데, 느낌이 전혀 달라서 배우기가 좀 난감하다. **Hello, World!** 하나 출력하는 것도 되게 어렵다.

```c
#include  <stdio.h>
int  main() {
printf("Hello, World!");
return  0;
}
/* C++은 Hello, World! print하기도 힘들다!*/
```

이렇게 하면 **Hello, World!**가 출력이 된다. 사실 `int main() {`까지만 입력해도 알아서 자동완성 해주더라. (이거는 아마 내가 **Github copilot**을 쓰기 때문인거 같다)

### 1. Include <>
`include <>`는 R에서 `library()` 혹은 Python에서는 `import`와 비슷한 역할을 하는 것 같다. 여기서 `stdio.h`는 입출력을 위한 라이브러리라고 한다.

> Input and Output operations can also be performed in C++ using the **C**  **St**andar**d**  **I**nput and **O**utput Library (**cstdio**, known as stdio.h in the C language). This library uses what are called _streams_ to operate with physical devices such as keyboards, printers, terminals or with any other type of files supported by the system. Streams are an abstraction to interact with these in an uniform way; All streams have similar properties independently of the individual characteristics of the physical media they are associated with.
> 출처 : https://cplusplus.com/reference/cstdio/

다른 프로그래밍 언어에서도 자주 접하는 그런 느낌의 문구라 오케이

### 2. int main()
`int main()`은 프로그램 맨 처음에 넣는거라고 하는데, 아직 프로그램을 길게 안짜봐서 이거는 더 공부를 해봐야 알것같다. `{}` 괄호로 열고 닫는데, 이거는 R과 똑같아서 이것도 금방 기억할 수 있을 것 같다.

### 3. return 0;
`return 0;`는 프로그램이 무사히 종료됨을 컴퓨터에게 알리는 신호라고 한다. `return 1;`이라고 하면 에러가 있다는 뜻이라고 하는데, 이 것도 마찬가지로 코드를 더 길게 짜보고 더 공부해봐야 언제 쓰이는지를 확인할 수 있겠다. 우선은 `int main<>`는 항상 `return 0;`로 끝나야 함을 알았다.

### 4. 주석
C++(혹은 C)에서 주석은 `/* */`를 활용해서 여러 줄 주석을 달거나 `// //`를 이용해서 한 줄만 주석처리를 하는 방법이 있다고 한다. 주석 다는 방법은 언어마다 다 달라서 항상 헷갈린다.

다음에는 기본적인 산수를 공부해봐야겠다. 
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTkyMTc4NTgxMV19
-->