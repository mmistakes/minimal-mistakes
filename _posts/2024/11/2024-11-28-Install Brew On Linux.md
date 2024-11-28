---
layout: single
title: 우분투에 brew 설치하기
categories: Linux
tags: ubuntu, brew
toc: True
---

설치환경
Hyper-V
ubuntu-24.04.1-desktop
bash

## Brew 설치하기
### brew 설치하기 전에 필요한 build tools
https://docs.brew.sh/Homebrew-on-Linux#requirements
```
# ex) 우분투
sudo apt-get install build-essential procps curl file git
```

1. https://brew.sh/
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. .bashrc 수정
```
# 터미널에서 그대로 입력
test -d ~/.linuxbrew && eval "$(~/.linuxbrew/bin/brew shellenv)"
test -d /home/linuxbrew/.linuxbrew && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.bashrc
```

```
# ~/.bashrc
...
eval "$(/bin/brew shellenv)"
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

bash: /bin/brew: No such file or directory
이런 에러가 뜨는데
eval "$(/bin/brew shellenv)" 라인을 삭제함

### 옵션 : 기본 쉘 zsh로 변경하기
```
# zsh 설치
sudo apt install -y zsh

# 현재 쉘 확인
echo $SHELL

# 쉘 변경
sudo chsh -s /usr/bin/zsh

# 터미널 재실행
```

ubuntu gnome 터미널에선 기본 쉘이 bash로 고정돼있는 것 같습니다.
원격 접속으로 사용할 경우 zsh로 접속돼고
만약 gnome 환경에서 zsh를 사용하고 싶다면
gnome preferences 메뉴에서 Profile을 선택한 후
Run a Custom command instead of my shell 체크,
Command -> Custom Command 에 /bin/zsh 를 입력하면 됩니다.

![](/images/2024/11/2024-11-28-Install Brew On Linux_Image-01.png)


#### zsh에서도 brew를 사용할 수 있도록 export를 추가
```
# ~/.zshrc
# linuxbrew export
export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"
export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"
export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"
```
#### ohmyzsh

https://ohmyz.sh/#install

폰트 설치(apt로 설치하거나, git clone 후 install.sh 실행)
https://github.com/powerline/fonts
설치 후 터미널 재실행하여 preferences에서 font 수정


플러그인 설치
```
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# ~/.zshrc의 plugins 부분 수정
...
plugins=(git
zsh-syntax-highlighting
zsh-autosuggestions
)
...
```