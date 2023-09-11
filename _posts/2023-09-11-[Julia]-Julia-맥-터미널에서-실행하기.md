---
categories:
  - Julia
---

# #Julia #Mac #Terminal

Julia를 쓰려면, VS code나 주피터노트북을 쓰는 것이 일반적이지만, 가끔은 또 간지를 챙겨야 되지 않나. 그러기 위해서 전에 깔아두었던 나의 이쁜 맥 터미널을 이용해서 Julia를 실행시켜볼 계획이다.
(맥 터미널 꾸미기 링크: [여기](https://arrow-economist.github.io/mac/%EB%A7%A5-%ED%84%B0%EB%AF%B8%EB%84%90-%EC%84%B8%ED%8C%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95/))

### 1. Julia 설치 확인하기
여기에서는 이미 Julia가 설치되어 있음을 가정한다. [내 블로그](https://arrow-economist.github.io/julia/Julia-Julia-%EC%9E%85%EB%AC%B8%ED%95%98%EA%B8%B0/)에서도 그 내용을 확인할 수 있지만, 역시 제일 좋은건 [공홈](https://julialang.org)아닐까?!

### 2. 터미널에서 작동시키기
우선 내 Julia가 내 맥의 application에 있는지 확인하고 맞게 깔렸으면 이제 터미널을 킨다. 그리고 ``` Julia ``` 라고 써보자. 아마 에러가 나면서 제대로 실행되지 않을 것이다. 따라서 터미널 내에서 Path를 지정해줘야 한다.

``` bash
sudo mkdir -p /usr/local/bin
sudo rm -f /usr/local/bin/julia
sudo ln -s /Applications/Julia-1.9.app/Contents/Resources/julia/bin/julia /usr/local/bin/julia
```
여기에서 만약 Julia의 버젼이 다르다면 저기있는 버젼만 다르게 입력해주면 된다. 이걸 복사해서 그대로 붙여넣기 하고 실행을 하면 패스워드를 입력하라는 창이 뜨고, 패스워드를 입력하면 끝이 난다.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY5MTMzNjYwMCw3Mjk2OTk5ODZdfQ==
-->