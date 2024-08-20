---
layout: single
title: ubuntu xrdp black screen
categories: Linux
tags: [linux, ubuntu, Server]
toc: true
---

## 에러 내용
1. 원격 접속 시 독이 사라지거나 일부 기능 안됨
	- 검은 화면만 뜸
	- https://github.com/neutrinolabs/xrdp/issues/1723
	
2. 원격 접속 시 반응 속도가 너무 느림


## 에러 환경
- Hypervisor: Windows10 hyper-v
- ubuntu 24.04 desktop


### 1. xrdp 수정

```
sudo systemctl stop xrdp
```

```
# /etc/xrdp/startwm.sh 수정

export DESKTOP_SESSION=ubuntu
export GNOME_SHELL_SESSION_MODE=ubuntu
export XDG_CURRENT_DESKTOP=ubuntu:GNOME
```

```
# option ~/.xsessionrc 수정 시(테스트 해봐야함)

export GNOME_SHELL_SESSION_MODE=ubuntu
export XDG_CURRENT_DESKTOP=ubuntu:GNOME
export XDG_CONFIG_DIRS=/etc/xdg/xdg-ubuntu:/etc/xdg
```

```
sudo systemctl restart xrdp
```

#### Reference
https://github.com/neutrinolabs/xrdp/issues/1723
https://blog.naver.com/uof4949/223455170846


### 2. TCP 커널 값 수정

```
# /etc/xrdp/xrdp.ini 수정
# tcp_send... 주석 해제 후 아래 값으로 변경
...
tcp_send_buffer_bytes=4194304
...
```

```
sudo systemctl restart xrdp
```

#### Reference
https://www.reddit.com/r/Ubuntu/comments/1ceun0e/xrdp_extremely_slow/
















Image : History of Virtualization

### 가상화란

- 가상화의 일반적인 정의
	- Hypervisor 사용한 가상 머신
	
- 가상화의 예시
	- 서버 통합
	- 서버 급증 문제 해결 등
	
- 가상화의 장점
	- 비가상화 vs 가상화

### 가상화의 종류

- 가상화 종류
	- 하이퍼바이저 가상화(Type 1)
	- 호스트 가상화(Type 2)
	- 컨테이너 가상화
	
- CPU 동작 레벨
	- Ring 0~3
	
- 전가상화
	- root / non-root
	- Trap&Emulate
	- Binary Translation
	
- 반가상화
	- Hypercall(Xen)
	- KVM
