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
init.c라고 있는 c언어 파일을 mex로 build하려고 했는데 이렇게 떴다. 나는 현재 mac mini M2를 사용중이고 현재 OS는 macOS Sonoma 14.3이며 MATLAB version은 2022b다.

보니까 mex function의 디폴트 compiler는 Xcode인데 이거에 대한 문제가 좀 있나보다. 구글링을 했는데 비슷한 문제가 예전부터 있어왔던 것으로 보인다. ~~악명높은 Xcode~~

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI2ODU3NjE5M119
-->