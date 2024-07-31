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

### TestServer1

#### 고정 IP 설정
yum install net-tools

ifconfig

vim /etc/sysconfig/network-scripts/ifcfg-eth0
ONBOOT=yes
IPADDR=192.168.123.99
GATEWAY=192.168.123.1
NETMASK=255.255.255.0

#### HTTPD 설치
yum install httpd -y

편의상 방화벽 및 SELinux 꺼두기
systemctl stop firewalld

setenforce 0

systemctl start httpd

mkdir /var/www/html/centos7_repo

ln -s /root/local-repo/CentOS_7/ /var/www/html/centos7_repo/

chmod 551 /root
chmod -R 711 /root/local-repo/

chown -R apache:apache /root/local-repo

### TestServer2 설정
vim /etc/sysconfig/network-scripts/ifcfg-eth0
ONBOOT=yes
IPADDR=192.168.123.99
GATEWAY=192.168.123.1
NETMASK=255.255.255.0

ifup eth0

-----
편의를 위해 firewalld와 SELinux를 사용하지 않았고
/root의 권한을 수정하여 사용하고 있는데
추후 보안을 조금 더 신경 써서 만들어봐야겠다

[고쳐야 할 것]
1. root 계정 사용하지 않도록 계정 추가
2. firewalld 룰 추가하여 사용
3. SELinux 사용 고려

/images/2024/07/2024-07-31-YumRepositoryServer/1-Hyper-V-internalSwitch.png

/images/2024/07/2024-07-31-YumRepositoryServer/10-TestServer2-repolist.png

/images/2024/07/2024-07-31-YumRepositoryServer/2-sysconfig-network-edit.png

/images/2024/07/2024-07-31-YumRepositoryServer/3-ifcfg-edit.png

/images/2024/07/2024-07-31-YumRepositoryServer/4-ifcfg-edit.png

/images/2024/07/2024-07-31-YumRepositoryServer/5-serviceRestart.png

/images/2024/07/2024-07-31-YumRepositoryServer/6-Hyper-V-NetworkAdpater.png

/images/2024/07/2024-07-31-YumRepositoryServer/7-TestServer2-ipsetup.png

/images/2024/07/2024-07-31-YumRepositoryServer/8-TestServer2-repo.png

/images/2024/07/2024-07-31-YumRepositoryServer/9-TestServer2-repo2.png
