---
layout: single
title: CentOS 7, Local Yum Repository 만들기
categories: Linux
tags: [CentOS 7,Yum,Repository]
toc: true
---

외부와 통신이 되지 않는 상태의 로컬 서버에서 yum을 사용하기 위한 설정입니다.

## 기본 설정
하이퍼바이저 : Hyper-V

Linux : CentOS-7-x86_64-DVD-2009.iso

---

### Hyper-V VM 생성

메모리 : 임의 설정
네트워크 : 연결되지 않음

![](/images/2024/07/2024-07-30-LocalYumRepository/1-HyperV.png)

### CentOS 7 Install setting

SOFTWARE SELECTION : Minimal Install

NETWORK & HOST NAME : Not connected

ROOT PASSWORD : 임의 설정

USER CREATION : No User

![](/images/2024/07/2024-07-30-LocalYumRepository/2-ServerSetting.png)

![](/images/2024/07/2024-07-30-LocalYumRepository/3-ServerSetting.png)


### Server Setting

1. Hyper-V에서 디스크 삽입
   - DVD나 Everyting iso를 사용해야 패키지를 전부 사용할 수 있음
   - Repository 생성을 하기 위해 필요한 createrepo 패키지는 Minimal iso 파일에 없음
  
2. 디스크 마운트
  - 삽입한 디스크(Hyper-V 기준 /dev/cdrom)를 원하는 위치(저는 /mnt)에 마운트
  - mount /dev/cdrom /mnt

3. 마운트된 디렉토리 내용을 원하는 위치에 복사
  - mkdir -p /root/local-repo/CentOS_7
  - cp -r /mnt/Packages /root/local-repo/CentOS_7
  - cp -r /mnt/repodata /root/local-repo/CentOS_7
  - ls /root/local-repo/CentOS_7
  - Pcakages와 Repodata가 모두 있어야 함
  - umount /mnt

4. createrepo 설치
  - createrepo 설치 확인
  - yum list installed | grep createrepo
  - 복사한 패키지 위치로 이동하여 createrepo 설치
  - cd /root/local-repo/CentOS_7/Packages
  - ls | grep createrepo
  - rpm -ivh createrepo...rpm
  - Failed dependencies가 발생하여 필요한 의존성 패키지 설치함(3개 패키지 추가설치)
  - rpm -ivh deltarpm~.rpm
  - rpm -ivh libxml2-python~.rpm
  - rpm -ivh python-delarpm~.rpm
  - rpm -ivh createrepo~.rpm

![](/images/2024/07/2024-07-30-LocalYumRepository/4-TestServer1 mount.png)

![](/images/2024/07/2024-07-30-LocalYumRepository/5-cp Packages.png)

![](/images/2024/07/2024-07-30-LocalYumRepository/6-rpm install dependencies.png)

### createrepo 설정

- 패키지 복사한 위치에 createrepo 지정
- createrepo /root/local-repo/CentOS_7

![](/images/2024/07/2024-07-30-LocalYumRepository/7-createrepo.png)

### yum repository 설정

- 기존 설정된 yum 설정 초기화
- yum clean all
- yum repolist

![](/images/2024/07/2024-07-30-LocalYumRepository/8-yum repolist.png)

### Local yum repository 사용

- 저는 vim을 설치해봤습니다.
- yum install vim -y

![](/images/2024/07/2024-07-30-LocalYumRepository/9-yum install.png)

---
