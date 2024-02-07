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

보니까 mex function의 디폴트 compiler는 Xcode인데 이거에 대한 문제가 좀 있나보다. 구글링을 했는데 비슷한 문제가 예전부터 있어왔던 것으로 보인다. ~~악명높은 Xcode~~ 심지어 여기서는 Xcode is installed라는데 나는 Xcode를 깐 적이 없다.

해결방법을 찾으려고 열심히 구글링을 했는데 잘 나오지 않아서 헤매던 도중 귀인을 발견했다. [귀인 출처](https://gist.github.com/martinandersen/1fea529ec04885c63477ccb944394494)


```bash
defaults write com.apple.dt.Xcode IDEXcodeVersionForAgreedToGMLicense 15.2
```
현재 최신 Xcode 버전이 15.2여서 숫자는 위와 같은데, 가지고 있는 Xcode버젼이 다르다면 다른 숫자를 입력하면 된다. 위와 같은 코드를 터미널 
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTUxNDYyOTc1M119
-->