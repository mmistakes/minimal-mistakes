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
#비밀전호 설정
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

5. QT single 설치 또는 베이스만 사용하려면 쓰면 됩니다.

```bash
wget https://download.qt.io/official_releases/qt/5.15/5.15.0/single/qt-everywhere-src-5.15.0.tar.xz
tar xf qt-everywhere-src-5.15.0.tar.xz
```

6. sysroot를 위해 의존성을 가져온다 

```bash
rsync -avz root@192.168.16.24:/lib sysroot
rsync -avz root@192.168.16.24:/usr/include sysroot/usr
rsync -avz root@192.168.16.24:/usr/lib sysroot/usr
wget https://raw.githubusercontent.com/Kukkimonsuta/rpi-buildqt/master/scripts/utils/sysroot-relativelinks.py
chmod +x sysroot-relativelinks.py
./sysroot-relativelinks.py sysroot
```

7. repo에 있는 파일중 conf 파일 대체하기

```bash
cp -r qt-everywhere-src-5.15.0/qtbase/mkspecs/devices/linux-jetson-tk1-g++/ qt-everywhere-src-5.15.0/qtbase/mkspecs/devices/linux-jetson-nano
gedit qt-everywhere-src-5.15.0/qtbase/mkspecs/devices/linux-jetson-nano/qmake.conf
```

gedit 수정 내역

```bash
#
# qmake configuration for the Jetson Nano 2GB
#
include(../common/linux_device_pre.conf)

QMAKE_INCDIR_POST += \
    $$[QT_SYSROOT]/usr/include \
    $$[QT_SYSROOT]/usr/include/aarch64-linux-gnu

QMAKE_LIBDIR_POST += \
    $$[QT_SYSROOT]/usr/lib \
    $$[QT_SYSROOT]/lib/aarch64-linux-gnu \
    $$[QT_SYSROOT]/usr/lib/aarch64-linux-gnu

QMAKE_RPATHLINKDIR_POST += \
    $$[QT_SYSROOT]/usr/lib \
    $$[QT_SYSROOT]/usr/lib/aarch64-linux-gnu \
    $$[QT_SYSROOT]/lib/aarch64-linux-gnu
    
QMAKE_INCDIR_EGL = $$[QT_SYSROOT]/usr/lib/aarch64-linux-gnu/tegra-egl

DISTRO_OPTS                  += aarch64
COMPILER_FLAGS               += -march=armv8-a+crypto+crc

EGLFS_DEVICE_INTEGRATION = eglfs_kms_egldevice

include(../common/linux_arm_device_post.conf)
load(qt_config)

```

8. 바이너리와 QT Config 만들기 위한 디렉토리 생성

 - 해당 과정은 하드웨어 상태에 따라 오래 걸릴 수 있다.
 
```bash
mkdir qt5buid && cd qt5build
../qt-everywhere-src-5.15.0/configure -opengl es2 -device linux-jetson-nano -device-option CROSS_COMPILE=/opt/qt5jnano/gcc-linaro-5.5.0-2017.10-x86_64_aarch64-linux-gnu/bin/aarch64-linux-gnu- -sysroot /opt/qt5jnano/sysroot -prefix /usr/local/qt5jnano -opensource -confirm-license -skip qtscript -skip wayland -skip qtwebengine -force-debug-info -skip qtdatavis3d -skip qtlocation -nomake examples -make libs -pkg-config -no-use-gold-linker -v
make -j4
make install
```

9. 컴파일 바이너리 잭슨에게 전

```bash
rsync -avz sysroot/usr/local/qt5jnano root@192.168.16.24:/usr/local
```

# 4. Qtcreator 설치 와 예제

1. Qt설치

```bash
sudo apt install qtcreator
```

2. kits 추가

Qt version 추가
 - /opt/qt5jnano/sysroot/usr/local/qt5jnano/bin/qmake 
Compilers 추가
- GCC : /opt/qt5jnano/gcc-linaro-5.5.0-2017.10-x86_64_aarch64-linux-gnu/bin/aarch64-linux-gnu-gcc
- G++ :/opt/qt5jnano/gcc-linaro-5.5.0-2017.10-x86_64_aarch64-linux-gnu/bin/aarch64-linux-gnu-g++
-> 참고로 ABI 수동으로 arm-linux-generic-elf-64bit 설정

3. 원격 Remote 추가
-Device에서 Jesnano 설정 적

![잭슨 나노 설정 예시](/assets/img/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD/JesonNano/%EC%9B%90%EA%B2%A9%20%EC%84%A4%EC%A0%95_2023-01-11%20153717.png)

4. Kit 제작
2번 3번에서만든 설정을 아래에 키트에 조립하드시 넣으면 된다.

![키트 설정](/assets/img/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD/JesonNano/kit%20%EC%B5%9C%EC%A2%85%20%EC%84%A4%EC%A0%95%202023-01-11%20154051.png)


5. .pro 파일 내용 추가

```
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target
```
배포 파일 위치 설정

6. 환경 설정

추가 설정 파일에 환경 설정 추가

![Alt text](/assets/img/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD/JesonNano/%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95.png)

```
DISPLAY :0
XAUTHORITY /run/user/1000/gdm/Xauthority
```

# 참고 
1. 도움 영상
https://www.youtube.com/watch?v=PY41CP13p3k
2. Jetson nano Image 
https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#write