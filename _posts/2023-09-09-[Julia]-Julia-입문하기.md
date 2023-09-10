---
categories:
  - Julia
---

# #Julia

오랜만에 블로그를 쓰는데 또 뜬금없이 다른 언어를 들고왔다. Julia라는 프로그래밍 언어를 들어보셨는가? 이건 MIT에서 개발된 프로그래밍 언어인데 MATLAB과 비슷하거나 더 빠른 연산속도를 보이면서 python과 비슷한 언어를 가진 짬뽕 언어라고 해야할까... 무튼 되게 대단한 언어로 최근 탑스쿨과 아카데미에서는 많이 쓰이는 언어로 알고 있다. 나도 뒤쳐지지 않게 이 언어를 배워봐야겠다고 생각했다.

### 1. Install Julia
줄리아는 [줄리아 공식 홈페이지](https://julialang.org)에서 다운로드를 받을 수 있고 내용을 확인할 수 있다. 여기에서 다운로드를 해보자.

줄리아는 여타 다른 언어처럼 terminal을 통해서 실행할 수 있는데, 이보다는 역시 Microsoft VS code를 활용하는게 더 편하다. VS code를 들어가면 Extension에서 **Julia**를 다운 받은 뒤 줄리아 언어를 사용할 수 있다.

### 2. Julia language
![enter image description here](https://raw.githubusercontent.com/arrow-economist/imageslibrary/main/benchmarks.svg)

Julia 공식 홈페이지에서 밝힌 벤치마크 비교에 따르면, Julia의 속도는 보통 경제학에서 쓰는 MATLAb, R, python에 비해 압도적으로 빠르다. 심지어 이 언어의 장점은, 또 optimization에서 나오는데, Matlab의 단점 중 하나인 최적화 문제 제약조건 설정을 극복했다. Matlab에서 최적화 문제를 설계할 때, 제약 조건은 

``` latex
Ax < b
```
의 형태로 행렬로 나타내야하는데, 이게 생각보다 어렵고 귀찮다. 하지만 Julia는 이런 형식으로 최적화문제를 설계하지 않아도 된다고 들었다. 나중에 더 공부해봐야 알 수 있는 부분이다.

### 3. 기초적인 문법
```
julia> δ = 0.00001
1.0e-5

julia> 안녕하세요 = "Hello"
"Hello"

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTcyNDEwOTc1Miw3OTQxNjYzOTksLTEyNj
UwMDcwMywtMjA3ODA3MjAyMl19
-->