---
layout: single
title: "MacOS Setup 1장 - Homebrew Setup & App Store"
category: macos
tag: [macos, brew, setup]
author_profile: false
typora-root-url: ../
---

MAC을 초기화 하거나 새로운 장비를 받아서 재설치 하는 경우가 있습니다. 빠른 업무 투입을 위해 내용을 정리해 보았습니다.

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

위의 내용을 모두 작성 후 저장합니다. ( 위의 내용은 사용자에 따라 수정합니다. )

검색은 <a href="https://formulae.brew.sh/" target="_blank" rel="noreferrer noopener">Homebrew Formulae</a>에서 검색을 통해 진행하면 됩니다. (뒤의 옵션을 보고 brew, cask를 구분하면 됩니다.)

설치할 내용을 모두 작성 후에 다음의 명령어를 실행하면 한번에 설치가 가능합니다.

```bash
brew bundle
```

### App Store 수동 설치

- Magnet - MacOS에서 창들을 정렬할 때 사용하지만 유료입니다. (선택)

- Wiregaurd - 개발시 별도 생성된 VPN에 접속할 때 사용합니다. (선택)

- Xcode - IOS 개발을 할 때 사용합니다. (필수)

### 마치면서

개발시 MAC에 여러가지를 많이 해보았지만, 역시 욕심 내지 않고 필요한 것들로 개발에 집중하는 것이 좋더라구요. 방문하신 여러분 모두 MAC을 다시 설정시에 내용이 많이 도움이 되었으면 좋겠습니다.
