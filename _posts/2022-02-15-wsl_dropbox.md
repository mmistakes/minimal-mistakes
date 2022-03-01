---
tags:
- WSL2
- Dropbox
categories:
- Programming
title: WSL2(우분투)에 dropbox 설치
date: 2022-02-15 10:00:01
---

> WSL2 우분투(20.04)는 GUI 환경이 원활하지 않으므로  
> 명령줄 방식으로 dropbox 를 설치하는 방법을 설명함  
> 핵심은 윈도우 웹브라우저로 dropbox 계정 접속 상태에서   
> 우분투 쉘에서 dropbox 명령들을 실행하는 것임  
> 부수적으로 우분투와 윈도우간 동기화 폴더도 덤으로 얻음

[참조: Dropbox : Headless install on a Windows Subsystem for Linux](https://www.dropboxforum.com/t5/Dropbox-installs-integrations/Headless-install-on-a-Windows-substem-for-Linux/td-p/365055/page/2)

# WSL2(우분투) 명령으로 Dropbox 설치

- WSL2 >> GUI 원활하지 않음 >> 명령줄 입력으로 Dropbox 설치

- 일반 사용자로서 sudo 명령으로 아래 명령들을 실행

- **주의: root로 명령 실행하면 루트 경로에 Dropbox 설치됨**

  - 루트 디렉토리에 설치되면 일반 사용자 로그인시 Dropbox 사용 못함 

## **준비 단계**

- 윈도우 웹브라우저로 드랍박스 계정에 접속한 상태 유지

## **다시 우분투 쉘로 와서 다음 진행**

- (재설치 등의 이유로) 이미 존재할 수 있는 해당 폴더를 제거

- 드랍박스 싸이트로부터 해당 파이썬 파일을 얻는다

- 모든 사용자에게 실행권한을 부여한다
  ```
  $ rm -rf ~/.dropbox-dist ~/.dropbox
  $ wget -q -O ~/dropbox https://www.dropbox.com/download?dl=packages/dropbox.py
  $ chmod a+x ~/dropbox
  ```

## **드랍박스 시작 실행**

```
$ ~/dropbox start -i
```

- 실행하면 Dropbox 데몬 실행과정이 화면에 표시됨

  - 옵션 `-i` (`--install`): 데몬 미설치시 자동 설치
  
  - 설치 여부 
  
- 에러 나오면 >> 메시지에 지적된 파이썬 패키지 설치

  - `ModuleNotFoundError: No module named 'gi'` 메시지 본다면
  
    ```
    $ sudo apt install python3-gi python3-gi-cairo gir1.2-gtk-3.0
    ```
  
    - gi 패키지 >> 리눅스 그래픽 환경인 GNOME 등을 파이썬에서 실행
  
    - [출처: PyGObject](https://pygobject.readthedocs.io/en/latest/getting_started.html#ubuntu-getting-started)

- 다시 명령 실행
  ```
  $ ~/dropbox start -i
  ```

- 정상 실행 과정에서 `python3-gpg` 패키지 설치 요구 창이 나올 수 있음

  - 우분투 16.10 이하 버전에서는 `python3-gpgme` 패키지

  - 그냥 오케이 버튼 누르면 자동 설치됨

- 다 설치되면 자동적으로 윈도우에 열어둔 드랍박스 계정 화면에서

  - 연결 여부를 질문하는 창이 뜨게 되는데
  
  - 당연히 `연결` 클릭하면 좀 더 설치 진행되고 완료됨  
  
  - 이제 윈도우 브라우저는 접속해제 및 끄기 가능  

## 이어서 다음 두 명령 실행 (선택적)

```
$ lsb_release -d
$ cat /proc/vmstat > /dev/null
```

- `lsb_release -d`

  - `Description: Ubuntu 20.04.3 LTS` 같은 결과물을 출력

- `vmstat`

  - 하부 시스템의 리소스 사용 추이 관찰 위해 짧은 기간 단위로 실행

- `/dev/null`

  - 출력 결과물을 삭제하는 대신에 화면/프린터 등에 표시되지 않도록 함

## **동기화 시작 및 중지**

WSL에서는 다음 명령으로 동기화 시작
```
$ ~/dropbox start
```

- 마지막으로 잘 작동되는지 확인하기 위해 다음 명령을 하나씩 실행해 본다

  - `$ ~/dropbox status` >> `Up to date` 또는 `sync`(동기화) 표시

  - `stop` & `start` >> 정상 작동 여부 확인

  - `$ cd ~/Dropbox` >> 경로 및 파일 추가 삭제 등 확인

## 주의: 드랍박스 자동 재시작은 안됨

- 다음 명령을 실행해도 마찬가지임 ㅠㅠ 
  ```
  $ ~/dropbox autostart y
  $ ~/dropbox start
  ```

- WSL 시작때마다 동기화 시작 명령 필요함 ㅠㅠ

- 그나마 간단히 시작 명령 만들어 사용하면 편리

  - 먼저 홈에 쉘파일 생성(예: drpbx_start.sh)
    ```
    $ echo "~/dropbox start" > drpbx_start.sh
    ```
    
    - 여기서 새로운 파일 이름은 탭 키 고려해서 가능한 첫글자들이 겹치지 않도록 작명
  
  - 홈에서 쉘파일 실행(탭 키로 타이핑 수고 절약)  
    ```
    $ . drpbx_start.sh
    ```
  
    - 여기서 `.` 은 `source` 줄임표현
