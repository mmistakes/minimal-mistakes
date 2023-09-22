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
혹시 git이 설치가 안되어있는 사람들을 위해 git 설치부터 안내하고자 한다. 우선 나는 Mac mini M2를 쓰고 있으므로 Mac에 초점이 맞추어져있다.

### 2.1 git 확인하기
기본적으로 맥은 Git이 깔려있다.
```bash
git --version
```
터미널(혹은 내가 설치한 [iterm2](https://arrow-economist.github.io/mac/%EB%A7%A5-%ED%84%B0%EB%AF%B8%EB%84%90-%EC%84%B8%ED%8C%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95/))에서 위 명령어를 복사 붙여넣기 후 실행을 하면 현재 내 버젼을 확인할 수 있다. 없어도 걱정하지 않아도 된다.

```bash
brew install git
```
이 명령어를 통해 git을 설치(혹은 업데이트)할 수 있다. 나도 버젼이 살짝 낮은 단계여서 이 명령어를 통해 최신버젼으로 업데이트했다.

### 2.2 git 설정하기

터미널에 이제 다음의 명령어를 복사 붙여넣기 하면 초기 설정이 된다.

```bash
git config --global user.email "abcd@gmail.com"
git config --global user.name "timcook"
```
여기에서 `abcd@gmail.com`에는 자신이 깃허브에 가입한(혹은 가입할) 이메일을 적어주면 되고, `timcook`에는 이름을 적어주면 된다. 나는 깃허브 이름? 아이디?를 그대로 적어주었다. 사실 이름은 다르게 설정해도 되는지 안되는지 거기까지는 모르겠어서 혹시 몰라서 동일하게 설정했다.

### 2.3 Github Desktop 설치

나처럼 git못알들은 터미널로 commit, push 이런거 몰라 응애이기 때문에 편리한 깃헙데스크톱을 설치해준다. [설치 사이트](https://desktop.github.com/)

## 3. 옵시디언 플러그인

이제 옵시디언에서 플러그인을 설치해줄 차례이다. 

![enter image description here](https://raw.githubusercontent.com/arrow-economist/imageslibrary/main/Obs1.png)
Settings > Community Plugins > Browse에서 Obsidian Git을 검색하면 위 사진과 같은 플러그인이 뜨는데 이걸 설치해주고 Enable을 누르면 뭔가 안됐다고 뜨게 된다. 

![enter image description here](https://raw.githubusercontent.com/arrow-economist/imageslibrary/main/Obs2.png)
지금은 설정을 마친 상태라서 Git Backup settings 밑에 아무것도 뜨지 않는데, 원래는 여기에 세팅이 안되었다는 메시지가 뜨게 된다.

## 4. Github 연동하기

내가 참고한 사이트에서는 Github desktop에 들어가서 로그인을 해주고 **Create new repository**를 해준 뒤 이름도 대충, 경로도 대충 설정해주고 확인하고 **Publish repository**를 해주는 등등의 과정을 거치게 된다.
나는 그런데 그냥 깃허브에 들어가서 새로운 repository를 하나 **private**으로 설정해주고 Github desktop에 들어가서 **Clone Repository**를 한 뒤 내가 만든 repository를 고르면 된다. 이 때 repository는 "my-obsidian"으로 해주었는데 어짜피 private이니 나만 확인가능하게끔 이름을 잘 설정해주면 될 것 같다. 클론을 할 때 내 로컬 경로를 설정하게 되어있는데 이 때 경로는 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTczNjA0NTkyOSw0NjgwNzQwNzgsLTU1ND
c5MDE4OF19
-->