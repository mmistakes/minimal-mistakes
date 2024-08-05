---
layout: single
title: CentOS 7, Yum Repository 서버 만들기
categories: Linux
tags: [CentOS 7,Yum, Repository]
toc: true
---
이전에 Local Yum Repository를 만들어봤는데
이번엔 이전에 만든 서버를 Yum Repository Server로 활용해보려고 한다.

### Hyper-V 스위치 생성
Hyper-V Internal Switch

![](/images/2024/07/2024-07-31-YumRepositoryServer/1-Hyper-V-internalSwitch.png)

### 네트워크 어댑터 수정

Windows 네트워크 설정에서 yumrepo TCP/IPv4의 속성을 원하는 대역대로 설정했음
IP: 192.168.123.1
NM: 255.255.255.0
![](/images/2024/07/2024-07-31-YumRepositoryServer/1-1-network-adpater-config.png)


내부망에서 통신할 수 있는 환경으로 진행하기 위해 VM들의 네트워크 어댑터는 모두 yumrepo로 지정되어 있어야 합니다.

![](/images/2024/07/2024-07-31-YumRepositoryServer/6-Hyper-V-NetworkAdpater.png)

아래는 서버에서 고정 IP로 할당할 주소입니다.

TestServer1
IP: 192.168.123.99
NM: 255.255.255.0
GW: 192.168.123.1

TestServer2
IP: 192.168.123.2
NM: 255.255.255.0
GW: 192.168.123.1

TestServer3(Option)
IP: 192.168.123.3
NM: 255.255.255.0
GW: 192.168.123.1


### CentOS 7 고정 IP 설정

- TestServer1(192.168.123.99) 외에 다른 VM도 동일한 방법으로 진행

#### TestServer1

```bash
yum install net-tools

ifconfig

# vim /etc/sysconfig/network-scripts/ifcfg-eth0
ONBOOT=yes
IPADDR=192.168.123.99
GATEWAY=192.168.123.1
NETMASK=255.255.255.0
# 저장 후 종료

service network restart

```

#### TestServer2

```bash
vim /etc/sysconfig/network-scripts/ifcfg-eth0
ONBOOT=yes
IPADDR=192.168.123.99
GATEWAY=192.168.123.1
NETMASK=255.255.255.0

ifup eth0
```

![](/images/2024/07/2024-07-31-YumRepositoryServer/2-sysconfig-network-edit.png)

![](/images/2024/07/2024-07-31-YumRepositoryServer/3-ifcfg-edit.png)

![](/images/2024/07/2024-07-31-YumRepositoryServer/4-ifcfg-edit.png)

![](/images/2024/07/2024-07-31-YumRepositoryServer/5-serviceRestart.png)

### HTTPD 설치

- Master 서버가 될 TestServer1(192.168.123.99)에서 진행

```bash
yum install httpd -y

# 편의상 방화벽 및 SELinux 꺼두는 세팅으로 진행

systemctl stop firewalld

setenforce 0

systemctl start httpd

mkdir /var/www/html/centos7_repo

# 이전에 사용했던 로컬 레포지토리를 html 아래에 링크
ln -s /root/local-repo/CentOS_7/ /var/www/html/centos7_repo/

# 권한이 없으면 httpd 서버로 접속 시 접근 불가능
chmod 551 /root
chmod -R 711 /root/local-repo/

chown -R apache:apache /root/local-repo
```

### ping 테스트

- TestServer2에서 TestServer1으로 핑 테스트

![](/images/2024/07/2024-07-31-YumRepositoryServer/7-TestServer2-ipsetup.png)

### repository 등록

```bash
# yumrepo
baseurl=http://192.168.123.99/centos7_repo/CentOS_7
```

![](/images/2024/07/2024-07-31-YumRepositoryServer/8-TestServer2-repo.png)

![](/images/2024/07/2024-07-31-YumRepositoryServer/9-TestServer2-repo2.png)

![](/images/2024/07/2024-07-31-YumRepositoryServer/10-TestServer2-repolist.png)

-----

로컬 pc에서 192.168.123.99로 접속 시 웹페이지에서도 접근 가능하다.
편의를 위해 firewalld와 SELinux를 사용하지 않았고
/root의 권한을 수정하여 사용하고 있는데
추후 보안을 조금 더 신경 써서 만들어봐야겠다

[고쳐야 할 것]
1. root 계정 사용하지 않도록 계정 추가
2. firewalld 룰 추가하여 사용
3. SELinux 사용 고려












