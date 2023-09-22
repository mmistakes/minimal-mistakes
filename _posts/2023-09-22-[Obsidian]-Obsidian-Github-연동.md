---
categories:
  - Obsidian
  - Github
---

# #Obsidian #Github

내가 요즘 매일같이 쓰는 메모 앱이 있는데, 바로 Obsidian이다. Obsidian은 제텔카스텐 기반의 메모앱이라고 하는데, 사실 그런건 잘 모르겠고 그냥 편하고 예뻐서 쓴다.

[노마드 코더 유튜브 옵시디언](https://youtu.be/h6rxKbbgI28?si=oTGFANvcMW-I0H4e) << 이 유튜브 영상을 보면 옵시디언이 뭔지 이해를 좀 더 할 수 있고 간략하게 체험해볼 수 있다.
[Obsidian homebrew](https://formulae.brew.sh/cask/obsidian#default) << 옵시디언 설치할 수 있는 brew 안내 링크
[옵시디언 공식 홈페이지 Help문서](https://help.obsidian.md/Getting+started/Download+and+install+Obsidian) << 역시 모를 땐 공홈 Help (ReadMe)가 최고다.

## 1. 참고한 사이트

이번 포스팅은 [여기](https://dannyhatcher.com/obsidian-git-for-beginners/) 사이트를 거의 번역한 것에 가깝다.

## 2. git 설치
혹시 git이 설치가 안되어있는 사람들을 위해 Git 설치부터 안내하고자 한다. 우선 나는 Mac mini M2를 쓰고 있으므로 Mac에 초점이 맞추어져있다.

### 2.1 Git 확인하기
기본적으로 맥은 Git이 깔려있다.
```bash
git --version
```
터미널(혹은 내가 설치한 [iterm2](https://arrow-economist.github.io/mac/%EB%A7%A5-%ED%84%B0%EB%AF%B8%EB%84%90-%EC%84%B8%ED%8C%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95/))에서 위 명령어를 복사 붙여넣기 후 실행을 하면 현재 내 버젼을 확인할 수 있다. 없어도 걱정하지 않아도 된다.

```bash
brew install git
```
이 명령어를 통해 git을 설치(혹은 업데이트)할 수 있다. 나도 버젼이 살짝 낮은 단계여서 이 명령어를 통해 최신버젼으로 업데이트했다.

### 2.2 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE1NTA5ODI2NywtNTU0NzkwMTg4XX0=
-->