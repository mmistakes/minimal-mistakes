---
layout: single
title:  "LLM을 위한 init setting"
categories: coding
tag: [llm, langchain, settings, poetry]
author_profile: false
toc: true
---



## init setting

맥에서 랭체인 연습을 위한 환경 구성을 위해 몇개의 세팅이 필요하다.

1. API Key 만들기 > 10달러(결제) + 1달러(세금)

   - OpenAI : 
     - URL : https://platform.openai.com/docs/overview
   - Sign up > Log in > 톱니바퀴 > Setting > billing > Add to Credit Balance($10) > Auto recharge is off
     - 최소 $5 이니 $5 이상 결제해야 합니다.
     - 보안이 항상 신경쓰이기 때문에 "Auto recharge is off" 로 진행했습니다.
   - 우측 상단 DashBoard > API keys > Create New secret key
     - Name은 Key 이름이 됩니다.
     - Project는 Default 로 진행해요.
     - 키는 안전한 곳에 복사하여 저장하세요.

   <br>

2. Homebrew

   홈브류를 설치합니다. 

   ```shell
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   brew 설치 경로를 확인하고 환경변수를 .zprofile에 넣어서 매번 환경변수를 받을 수 있게 해줍니다.

   ```shell
   MY_ACCOUNT=$(whoami)
   which brew #/opt/homebrew/bin/brew shellenv
   /opt/homebrew/bin/brew shellenv #환경변수를 확인합니다.
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/$MY_ACCOUNT/.zprofile
   ```

   brew로 설치하고 git 버전도 확인합니다.

   ```
   brew install git
   git --version
   ```

   brew로 pyenv도 설치하고 환경변수도 ~/.zshrs에 넣어줍니다.   
   pyenv를 사용하면 다양한 python 버전을 프로젝트별로 사용할 수 있어요.  
   모두 적용되었다면, exec를 통해 쉘을 재시작합니다.  

   ```shell
   brew update
   brew install pyenv
   echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
   echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
   echo 'eval "$(pyenv init -)"' >> ~/.zshrc
   exec "$SHELL"
   ```

   <br>

3. XCODE

   Xcode는 macOS에서 사용할 수 있는 통합 개발 환경(IDE)으로, Apple에서 제공하는 공식 도구입니다.   
   주로 iOS, macOS, watchOS, tvOS 애플리케이션을 개발하는 데 사용됩니다.  
   Xcode는 Apple의 프로그래밍 언어인 Swift와 Objective-C를 지원하며, 다양한 기능을 제공합니다. 

   ```shell
   xcode-select --install
   ```

   <br>

4. pyevn로 python 3.11버전 설치

   pyenv로 파이선 3.11 버전 설치하면 3.11.10이 설치됩니다. 시간지다면 다르겠지만 현재는 그러합니다.  
   일단 전역으로 3.11을 사용하기 위해 global로 설정합니다.   

   exec zsh로 쉘프로세스를 새로 시작하면서 pyenv에서 설정한 파이썬 버전을 즉시 반영합니다.  
   버전을 보면 적용된 버전을 확인할 수 있어요.

   ```shell
   pyenv install 3.11
   pyenv global 3.11
   exec zsh
   python --version
   ```

   <br>

5. Poetry 설치

   Poetry는 정말 다양한 라이브러리들의 의존성을 해결을 해결해 줍니다.  
   저는 테디노트님의 코드를 한번 훓어보려고 하기 때문에 테디노트님의 프로젝트를 그대로 사용합니다.  
   @테디노트님 영상으로만 만나지만, 많은 가르침 감사합니다.  

   ```shell
   pip3 install poetry # poetry 설치
   cd ~/Documents
   git clone https://github.com/teddylee777/langchain-kr.git
   cd ~/Documents/langchain-kr
   poetry shell # 파이썬 가상환경 설정
   poetry update # 파이썬 패키지 일괄 업데이트
   ```

   <br>

6. Visual Studio Code 설치

   URL : https://code.visualstudio.com/download

   설치가 완료되면, install extentsion > python, jupyter 노트북 설치합니다.  
   그럼 VS Code에서 테디노트님의 git 자료를 오픈합니다.  
   Select Kernel에서 "langchain-kr" 로 시작하는 커널을 선택해서 코드를 연습하면 됩니다. 

   <br>

7. LangSmith

   LangSmith는 LLM 모니터링으로 정말 좋습니다.  
   꼭 API를 받아 사용하는 것을 추천드립니다. 얼마나 낭비하는지, 무엇을 실행했는지 전부 알 수 있습니다.  
   웹으로 방문해서 봐야하기에 조금 거추장스러울 수 도 있지만, Full Managed라서 정말 손쉽습니다. 

   ![image-20240915020446545](/assets/images/2024-09-13-init_setting/image-20240915020446545.png)
   
   <br>
   
   <br>



일단 오늘은 여기까지.....
