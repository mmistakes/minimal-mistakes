---
categories:
  - C++
---

# #C++ #HelloWorld!

C++은 내가 평소에 쓰던 MATLAB이나 R 혹은 Python과는 언어가 전혀 다르게 생겼다. 그나마 파이썬이랑은 좀 비슷해보이기는 한데, 느낌이 전혀 달라서 배우기가 좀 난감하다. **Hello, World!** 하나 출력하는 것도 되게 어렵다.

```c++
#include  <stdio.h>
int  main() {
printf("Hello, World!");
return  0;
}
/* C++은 Hello, World! print하기도 힘들다!*/
```

이렇게 하면 **Hello, World!**가 출력이 된다. 사실 `int main() {`까지만 입력해도 알아서 자동완성 해주더라.

### 1. Include <>
`include <>`는 R에서 `library()` 혹은 Python에서는 `import`와 비슷한 역할을 하는 것 같다. 여기서 `stdio.h`는 입출력을 위한 라이브러리라고 한다.

> Input and Output operations can also be performed in C++ using the **C**  **St**andar**d**  **I**nput and **O**utput Library (**cstdio**, known as stdio.h in the C language). This library uses what are called _streams_ to operate with physical devices such as keyboards, printers, terminals or with any other type of files supported by the system. Streams are an abstraction to interact with these in an uniform way; All streams have similar properties independently of the individual characteristics of the physical media they are associated with.
> 출처 : https://cplusplus.com/reference/cstdio/

이거는 다른 언어에서도 자주 보던거라 익숙하다.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwMTc5Nzg3NDRdfQ==
-->