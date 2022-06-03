---
layout: single
title:  [Github] HTTPS와 SSH를 알아보자
categories: 04_gitgithub
tag: [github, https, ssh ]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# https와 ssh의 차이

쉽게는 repository에 push, pull 등을 할 때 본인이 맞는지, github과 약속한 사람이 맞는지 인증을 해야 한다. 그 인증을 id, password로 (**https**) 할거냐? **SSH key**를 가지고 할거냐의 차이이다. github에는 4가지 인증방식이 있다고 한다. 

1. Token-Based authentication
2. SSH Key
3. Personal Access Key
4. OAuth

# HTTPS와 SSL 모두 보안을 위한 protocol

1. HTTPS()**:** 단순하게 사용자의 id, pw로 인증하는 것. 보안용 protocol인 SSL(Secure Sockets Layer)로 통신을 암호화한단다. 2018년 7월부터 모든 website는 SSL인증서를 설치하여 연결을 암호화한다. 
2. SSH(Secure Shell)**:**  내 pc에 있는 public key로 인증하는 것. 이걸 사용하면 repo에 접근할 때 passphrase 없이 생성한 SSH Key를 사용하면 id, pw 입력 안해도 안전하게 data를 주고받을 수 있다. 
    
    SSH key를 만드는 방법(다른사람 블로그참고): [https://www.lainyzine.com/ko/article/creating-ssh-key-for-github/](https://www.lainyzine.com/ko/article/creating-ssh-key-for-github/)
    
    *SSH URL을 업데이트하는 변경하는 방법
    
    SSH URL이 변경되었지만 이전 SSH URL은 계속 작동합니다. SSH를 이미 설정한 경우 원격 URL을 새 형식으로 업데이트해야 합니다.
    
    Git 클라이언트에서 실행 `git remote -v` 하여 SSH를 사용하는 원격을 확인합니다.
    
    웹의 리포지토리를 방문하여 오른쪽 위에 있는 **복제** 단추를 선택합니다.
    
    **SSH**를 선택하고 새 SSH URL을 복사합니다.
    
    Git 클라이언트에서 다음 `git remote set-url <remote name, e.g. origin> <new SSH URL>`을 실행합니다. 또는 Visual Studio **[리포지토리 설정](https://docs.microsoft.com/ko-kr/azure/devops/repos/git/git-config?view=azure-devops#remotes)** 이동하여 원격을 편집합니다.
    
    *잘 안되는 경우가 있더라
    
    1. enter passphrase for key ‘/c/Users/uidv6361/.ssh/id_rsa’ 이런게 나온다고 한다면, 
    2. command 창을 .ssh가 있는 쪽으로 옮기고, ssh-keygen -f id_rsa -p 명령어를 입력해주고 새로 passphrase를 입력해주면 된다. 기존의 passphrase를 입력 후 새로운 passphrase에 그냥 엔터를 치면 된다. 

 <img src = "/assets/img/bongs/https_ssh.png">
