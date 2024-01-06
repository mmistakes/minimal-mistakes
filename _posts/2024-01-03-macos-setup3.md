---
layout: single
title: "MacOS Setup 3장 - NVM Setup"
category: setup
tag: [macos, setup, node, nvm]
author_profile: false
sidebar:
  nav: counts
typora-root-url: ../

---

### NVM 설명

NVM이란,  Node Version Manager의 약자로 Node버전을 관리해줍니다.

설치는 [[MacOS - Homebrew Setup & App Store]] 에서 Brewfile을 통해서 진행하시면 됩니다.



### NVM PATH 설정

```bash
# ~/.zshrc
...

export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

위의 내용을 ~/.zshrc 최하단에 추가해주시면 nvm의 명령어를 사용하실수 있습니다. ( 적용후 `source ~/.zshrc`를 잊지 말아주세요. )



### NVM을 이용한 Node 설치

```bash
nvm install {node-version}
```

여기서 {node-version}은 <a href="https://nodejs.org/" target="_blank" rel="noreferrer noopener">NodeJS 공식사이트</a>에서 설치할 버전을 체크하거나 회사, 커뮤니티에서 사용하고 있는 Node 버전을 설정해주셔도 됩니다. ( 여러버전을 설치하고 변경 가능합니다. )



```bash
nvm alias default {node-version}
```

위의 명령어로 현재 기본으로 사용하는 버전을 설정해주세요.  default가 현재 설치한 버전으로 고정됩니다.



```bash
nvm list
```

현재 설치된 버전, 선택된 버전을 알 수 있습니다.



```bash
nvm use default
```

default로 설정된 node버전을 이용하겠다 설정하면 기본적 설정은 완료 됩니다.
