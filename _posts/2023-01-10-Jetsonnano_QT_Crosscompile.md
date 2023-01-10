---
title: "잭슨 나노 크로스 컴파일"
categories:
  - Jetson Nano
  - QT
  - CrossCompile

tags: [Jetson Nano]
toc : true
comments: true
---
# 잭슨 나노 크로스 컴파일

## 개발 환경 설치 

# 1. 가상 환경 설치 
1. wsl 환경 에서 개발 Ubuntu 20.04 설치
 -> 인터넷에 자료 많으니 여기서 적지 않겠
 -> 도움 영상에서는 VM 머신 이용함

# 2. SD 카드 설치

1. <참고 2번> 을 보고 설치하면된다.
-> 당연히 여기서 sudo apt-get update +upgrade 수
* 여기서 멈추면 추후에 root passwd를 사용할 수 없어 다음 아래 단계를 실행해야한다.
2. passwd  설정해준다
```bash
sudo passwd root
#비밀전호 설
```
3. 루트 로그인 설정을 해준다
```bash
sudo vi /etc/ssh/sshd_config

# PermitRootLogin 의 값을 수정
PermitRootLogin yes
```


4. 설치 dependencies(의존성?)
```bash
sudo apt install -y '.*libxcb.*' libxrender-dev libxi-dev libfontconfig1-dev libudev-dev libgles2-mesa-dev libgl1-mesa-dev gcc git bison python gperf pkg-config make libclang-dev build-essential
```

# 3. 가상환경 구축 

1. Ubuntu 업데이트
```bash
sudo apt update
sudo apt upgrade
```
2. 개발 프로그램 설치 
-> sudo 명령어로 실

```bash
apt install gcc git bison python gperf pkg-config
apt install make libclang-dev build-essential
```

3. 빌드를 위한 OPT 파일 생성

```bash
mkdir /opt/qt5jnano
chown jnanoqt:jnanoqt /opt/qt5jnano 
cd /opt/qt5jnano/
```

4. 툴체인 설치 
```bash
wget https://releases.linaro.org/components/toolchain/binaries/latest-5/aarch64-linux-gnu/gcc-linaro-5.5.0-2017.10-x86_64_aarch64-linux-gnu.tar.xz
tar xf gcc-linaro-5.5.0-2017.10-x86_64_aarch64-linux-gnu.tar.xz 
export PATH=$PATH:/opt/qt5jnano/gcc-linaro-5.5.0-2017.10-x86_64_aarch64-linux-gnu/bin

```

```
 * 만약 프로그램이 매번 환경설정하기 귀찮으면
sudo vi ~/.bashrc 마지막에 환경 변수 설정
export PATH=$PATH:/opt/qt5jnano/gcc-linaro-5.5.0-2017.10-x86_64_aarch64-linux-gnu/bin

```


# 참고 
1. 도움 영상
https://www.youtube.com/watch?v=PY41CP13p3k
2. Jetson nano Image 
https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#write