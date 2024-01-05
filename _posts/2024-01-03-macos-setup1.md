---
layout: single
title: "MacOS - Homebrew Setup & App Store (1/5)"
category: setup
tag: [macos, setup]
author_profile: false
sidebar:
  nav: counts
typora-root-url: ../

---

### Homebrew 설치 (<a href="https://brew.sh/" target="_blank" rel="noreferrer noopener">링크</a>)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```



### Brewfile을 이용한 전체 설치

```bash
vi Brewfile
```

```bash
# Brewfile
tap "AdoptOpenJDK/openjdk"
tap "hashicorp/tap"
tap "homebrew/bundle"

brew "cask"
brew "ruby"
brew "cocoapods"
brew "git"
brew "neovim"
brew "nvm"
brew "go"
brew "zsh"
brew "zsh-autosuggestions"
brew "zsh-syntax-highlighting"
brew "hashicorp/tap/terraform"

cask "adoptopenjdk8"
cask "slack"
cask "1password"
cask "typora"
cask "obsidian"
cask "iterm2"
cask "google-chrome"
cask "postman"
cask "flutter"
cask "docker"
cask "visual-studio-code"
cask "android-studio"
cask "notion"
```

위의 내용을 모두 작성 후 저장합니다.

```bash
brew bundle
```

brew를 통해서 한번에 설치가 가능합니다.



### App Store 수동 설치

- Magnet - MacOS에서 창들을 정렬할 때 사용합니다.

- Wiregaurd - 개발시 별도 생성된 VPN에 접속할 때 사용합니다.

- Xcode - IOS 개발을 할 때 사용합니다.

