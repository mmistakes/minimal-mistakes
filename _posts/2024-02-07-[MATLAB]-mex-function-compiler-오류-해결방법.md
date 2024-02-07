---
categories:
  - MATLAB
  - C
  - VSCode
---

# #MATLAB #C #VSCode

매트랩(MATLAB)으로 코딩을 하다보면 C언어로 mex function을 빌드해서 써야하는 경우가 종종 있다. 그런데 오늘 mex function을 쓰려고 하다보니 다음과 같은 에러메시지가 떴다.

```
>> mex init.c
Warning: Xcode is installed, but its license has not been accepted. Run Xcode and accept its license agreement.
 
Error using mex
Supported compiler not detected. For options, visit https://www.mathworks.com/support/compilers.
```
init.c라고 있는 c언어 파일을 mex로 build하려고 했는데 이렇게 떴다. 나는 현재 mac mini M2를 사용중이고 현재 
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5NTYzNDEyMDZdfQ==
-->