---
layout: single
title: "MacOS - OH MY ZSH Setup (2/3)"
category: setup
tag: [macos, setup, zsh]
author_profile: false
sidebar:
  nav: counts
typora-root-url: ../



---

### Oh My ZSH 설치

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```



### ZSHRC 파일 업데이트

```bash
...
# 기본 테마를 변경합니다.
ZSH_THEME="agnoster"
...
puglins=(git node rails ruby)
...

# command 앞 정보를 변경합니다. (사용자에 의해 수정하시면 됩니다.)
prompt_context(){}

# brew를 통해 설치한 zsh의 plugin으로 자동완성과 명령어 하이라이트입니다.
source /opt/homebrew/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

```





### Font 설치 및 변경

