---
title: "[MySQL] SElinux 로 인해 mysql 계정의 공개키 접속이 차단되는 현상"
excerpt: "SElinux로 인해 mysql 계정의 공개키 접속이 차단되는 현상이 있어 공유합니다."
#layout: archive
categories:
 - Mysql
tags:
  - [mysql, mariadb, linux, ssh]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-10-05
last_modified_at: 2024-10-05
comments: true
---

### ✏️mysql 서버를 패스워드 인증없이 SSH 키로 접근하기
--- 
mysql 서버의 접근을 용이하게 하기 위해 보통 우리는 SSH 키 인증 방식을 설정하여 접근합니다. 대강의 루틴을 그림으로 보면 이렇습니다.

![SSH 키 인증 방식 설정](https://github.com/user-attachments/assets/37af50d5-1717-4781-8332-1ee42f3f8ed4)
[그림1] SSH 키 인증 방식 설정

#### 1. SSH 키 생성

먼저, 클라이언트에서 ssh-keygen 명령을 통해 공개키와 개인키를 생성합니다. 이때 공개키는 .pub 파일로, 개인키는 id_rsa라는 파일로 생성됩니다.

{% include codeHeader.html name="SSH 키 생성" %}
```bash
ssh-keygen -t rsa
```
<br>

#### 2. 공개키를 서버에 복사

클라이언트에서 생성된 공개키를 서버에 전달해야 합니다. 이를 위해 ssh-copy-id 명령을 사용하여 클라이언트의 공개키를 서버에 복사합니다. 공개키는 서버의 ~/.ssh/authorized_keys 파일에 저장되며, 이 파일을 통해 서버는 클라이언트의 인증을 처리합니다.

{% include codeHeader.html name="ssh-copy-id 로 공개키를 서버에 복사" %}
```bash
ssh-copy-id 사용자명@서버_IP
```
<br>

그런데 위의 명령어를 사용하기 위해서는 패스워드가 필요합니다. 보안상의 이유로 패스워드 없이 계정과 홈디렉토리만 있어야 한다면 아래처럼 클라이언트의 공개키 파일 내용을 그대로 복사해 서버의 authorized_keys 파일에 붙여넣어도 됩니다.

{% include codeHeader.html name="id_rsa.pub 로 공개키를 서버에 복사" %}
```bash
#클라이언트에서 작업
RESULT=`cat ~/.ssh/id_rsa.pub`
echo ${RESULT}

#위의 결과를 복사해서 서버에서 작업
#${RESULT} 값을 붙여넣고 저장(:wq)
vi ~/.ssh/authorized_keys

#authorized_keys 권한조정
chmod 600 ~/.ssh/authorized_keys
```
<br>

#### 3. 서버에서 공개키 인증 설정

서버에서 할 작업으로 /etc/ssh/sshd_config 파일에서 공개키 인증을 활성화해야 합니다. 해당 설정을 통해 서버는 공개키를 기반으로 연결할 수 있게 됩니다. 설정이 완료되면 SSH 서버를 재시작합니다.

{% include codeHeader.html name="서버에서 공개키 인증 설정" %}
```bash
#서버에서 작업
sudo vi /etc/ssh/sshd_config

#아래 두항목을 찾아 설정
PasswordAuthentication no #패스워드 접근을 허용할건지 설정(Optional)
PubkeyAuthentication yes

#SSH 서비스를 재시작
sudo systemctl restart sshd

```
<br>

#### 4. 패스워드 없이 접속

이제 클라이언트는 패스워드 없이 SSH 접속할 수 있습니다. 클라이언트는 개인키를 사용하여 서버에 인증 요청을 보내고, 서버는 미리 저장된 공개키로 이 요청을 검증하여 접속을 허용합니다.

{% include codeHeader.html name="패스워드 없이 접속" %}
```bash
#클라이언트에서 작업
ssh 사용자명@서버_IP
```

<br>

### ❓mysql 유저만 SSH 키 접근이 안된다?
---

Rocky8.8 환경에서 mysql 계정에 쉽게 접근하기 위해 공개키를 각 서버들의 authorized_keys 에 넣고 ssh 키 인증으로 연결을 시도했지만 계속해서 패스워드를 인증하라는 문구가 발생하였습니다. 그리고 신기한 것은 유독 mysql 유저로 연결을 맺으려고 할때에만 SSH 키 접근이 불가했습니다. 조금더 자세히 살펴보기 위해 ssh 접속 시 -v(verbose) 옵션을 주어 다른 계정과의 차이를 확인해보았습니다. 

root 계정과 mysql 계정간의 접속 과정을 -v 옵션을 통해 확인해보면 다음과 같습니다.

#### 1. root 계정으로 ssh 키로 연결

```bash
[root@mysql-server1 .ssh]# ssh root@192.168.0.5 -v
OpenSSH_8.0p1, OpenSSL 1.1.1k  FIPS 25 Mar 2021
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: Reading configuration data /etc/ssh/ssh_config.d/05-redhat.conf
debug1: Reading configuration data /etc/crypto-policies/back-ends/openssh.config
debug1: configuration requests final Match pass
debug1: re-parsing configuration

..중략...

debug1: Next authentication method: publickey
debug1: Offering public key: /root/.ssh/id_rsa RSA SHA256:6drYGRU1V7xgeP+Nn1H2xUQ2zfozfDKAlA0wQw79Ru4
debug1: Server accepts key: /root/.ssh/id_rsa RSA SHA256:6drYGRU1V7xgeP+Nn1H2xUQ2zfozfDKAlA0wQw79Ru4
debug1: Authentication succeeded (publickey).
Authenticated to 192.168.0.5 ([192.168.0.5]:22).

```

보는 바와 같이 publickey 인증방식으로 공개키를 서버에 전달하여 accept 가 이루어지면서 최종 연결이 이루어지는 모습을 볼 수 있습니다.

#### 2. mysql 계정으로 ssh 키로 연결

이번엔 mysql 계정으로 연결할 경우 ssh 키 연결입니다.

```bash
[mysql@mon-server1 ~]$ ssh mysql@192.168.0.5 -v
OpenSSH_8.0p1, OpenSSL 1.1.1k  FIPS 25 Mar 2021
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: Reading configuration data /etc/ssh/ssh_config.d/05-redhat.conf
debug1: Reading configuration data /etc/crypto-policies/back-ends/openssh.config
debug1: configuration requests final Match pass

..중략...

debug1: Next authentication method: publickey
debug1: Offering public key: /var/lib/mysql/.ssh/id_rsa RSA SHA256:aLkRbfnxWmvdWktpvzsfIOSHwUUxXOJEQ/ZuAvYYEjg
debug1: Authentications that can continue: publickey,gssapi-keyex,gssapi-with-mic,password
debug1: Trying private key: /var/lib/mysql/.ssh/id_dsa
debug1: Trying private key: /var/lib/mysql/.ssh/id_ecdsa
debug1: Trying private key: /var/lib/mysql/.ssh/id_ed25519
debug1: Trying private key: /var/lib/mysql/.ssh/id_xmss
debug1: Next authentication method: password
mysql@192.168.0.5's password: 

```
publickey 인증으로 연결을 시도하려다가 패스워드 인증으로 넘어가게 됩니다. ssh 생성과 서버에 전달하는 과정은 root 계정과 동일하게 작업하였는데 왜그러는 것인지 의문이었습니다.

<br>

### ⚠️원인은 SElinux 의 보안 컨텍스트
---

이리저리 찾아보던 중 [System Administrator 님의 블로그](https://www.lesstif.com/system-admin/ssh-authorized_keys-public-key-17105307.html)를 확인하게 되었고 원인을 찾게 되었습니다. 바로 mysql 계정 연결실패의 원인은 SElinux 의 보안 컨텍스트였습니다. 사용자의 .ssh 의 SELinux 보안 컨텍스트가 적절치 않으면 sshd 가 authorized_keys 를 읽을 수 없기 때문에 로그인이 실패하는 현상이었습니다.

mysql 의 연결실패를 분석하기 위해 mysql 서버에서 아래의 명령어를 수행합니다.
<br>

{% include codeHeader.html name="SElinux 감사로그 분석" %}
```bash
audit2why  < /var/log/audit/audit.log
```

- ```audit2why``` : SELinux의 보안 경고 및 차단 로그를 해석하여 "왜(why)" 해당 동작이 차단되었는지 설명하는 도구입니다.
- ```< /var/log/audit/audit.log``` : /var/log/audit/audit.log는 SELinux와 관련된 보안 감사 로그가 저장되는 파일입니다. 이 파일에는 SELinux가 차단한 모든 접근 시도에 대한 기록이 들어 있습니다.

<br>

위의 명령어 결과에서 아래와 같은 항목을 볼 수 있었습니다.

```bash
[root@mon-server1 .ssh]# audit2why  < /var/log/audit/audit.log

type=AVC msg=audit(1728189270.965:8192): avc:  denied  { read } for  pid=138598 comm="sshd" name="authorized_keys" dev="dm-0" ino=4236386 scontext=system_u:system_r:sshd_t:s0-s0:c0.c1023 tcontext=system_u:object_r:mysqld_db_t:s0 tclass=file permissive=0

        Was caused by:
                Missing type enforcement (TE) allow rule.

                You can use audit2allow to generate a loadable module to allow this access.
```
<br>

로그의 내용을 ChatGPT를 통해 해석을 받아보니 아래와 같았습니다. 

> SELinux가 mysqld_db_t 컨텍스트로 설정된 파일에서 SSH 데몬(sshd_t)이 authorized_keys 파일을 읽는 것을 차단하고 있습니다. 이로 인해 mysql 계정으로 퍼블릭 키를 통한 SSH 접속이 불가능한 상황입니다.
>
> SELinux가 파일 접근을 차단하는 문제는 mysqld_db_t 컨텍스트가 MySQL과 관련된 파일에만 접근하도록 제한되어 있기 때문입니다. 즉, mysql 계정의 .ssh 디렉토리 내 authorized_keys 파일도 MySQL 관련 파일로 인식되어 접근이 차단된 것입니다.

메시지 중 ```denied  { read } for``` 는 읽기가 거부되었다는 의미입니다. 읽으려는 주체는 ```pid=138598 comm="sshd"``` 입니다. 즉 프로세스 id 138598 인 sshd 입니다. 그리고 ```name="authorized_keys"```를 통해서 authorized_keys 파일을 읽지 못한 것을 알 수 있습니다.

그리고 ```tcontext=system_u:object_r:mysqld_db_t:s0``` 는 읽지 못한 authorized_keys 파일의 보안 컨텍스트입니다.즉, authorized_keys 파일이 mysqld_db_t로 라벨링되어 있어서 MySQL 관련 파일로 인식되었고, 이 때문에 sshd 프로세스가 해당 파일에 접근하는 것을 차단한 것입니다. 참고로 mysqld_db_t 컨텍스트는 MySQL 데이터베이스 파일 및 MySQL 서버가 사용하는 파일유형들을 의미합니다. authorized_keys 파일의 보안컨텍스트는 아래의 명령어를 통해서도 확인 가능합니다.
<br>

{% include codeHeader.html name="파일의 보안컨텍스트 확인" %}
```bash
ls -dlZ 파일명
```
<br>

위의 명령어를 실행하면 아래의 결과를 확인할 수 있습니다. audit2why 감사 로그의 보안컨텍스트와 동일합니다.
```bash
[mysql@mon-server1 .ssh]$ ls -dlZ authorized_keys 
-rw-------. 1 mysql mysql system_u:object_r:mysqld_db_t:s0 745 10월  6 13:35 authorized_keys
```

<br/>

### 😸문제해결
---
authorized_keys 파일이 존재하는 $HOME/.ssh 디렉토리 내의 파일들에 대하여 연결 제한을 막는 mysqld_db_t 컨텍스트 대신 ssh 연결을 위한 전용 컨텍스트인 ssh_home_t 를 부여하면 됩니다. ssh_home_t는 SELinux에서 ssh와 관련된 파일(특히 사용자의 SSH 설정 파일)에 사용되는 보안 컨텍스트 입니다. 주로 ssh 키 파일과 사용자 홈 디렉토리 안에 있는 ssh 관련 파일들에 적용되며, ssh 데몬(sshd)이 안전하게 접근할 수 있습니다.

root 계정에 있는 authorized_keys 파일의 보안컨텍스트를 확인해보아도 ssh_home_t 컨텍스트를 할당받고 있었습니다.

```bash
[root@mon-server1 .ssh]# ls -dlZ authorized_keys 
-rw-------. 1 root root unconfined_u:object_r:ssh_home_t:s0 1146 Oct  7 00:40 authorized_keys
```
<br>

ssh_home_t 컨텍스를 부여하기 위해 서버에서 아래의 명령어를 수행합니다.

{% include codeHeader.html name="ssh_home_t 컨텍스 부여" %}
```bash
sudo semanage fcontext -a -t ssh_home_t "/var/lib/mysql/.ssh(/.*)?"
sudo restorecon -Rv /var/lib/mysql/.ssh
```
- ```semanage fcontext -a -t ssh_home_t "/var/lib/mysql/.ssh(/.*)?"```는 .ssh 디렉토리 및 그 내부의 모든 파일에 대해 ssh_home_t 보안 컨텍스트를 적용합니다.
- ```restorecon -Rv /var/lib/mysql/.ssh``` 명령어는 위에서 설정한 보안 컨텍스트를 실제 파일에 적용합니다.
<br>

수행결과는 아래와 같습니다.
```bash
[root@mon-server1 .ssh]# sudo semanage fcontext -a -t ssh_home_t "/var/lib/mysql/.ssh(/.*)?"
[root@mon-server1 .ssh]# sudo restorecon -Rv /var/lib/mysql/.ssh
Relabeled /var/lib/mysql/.ssh from system_u:object_r:mysqld_db_t:s0 to system_u:object_r:ssh_home_t:s0
Relabeled /var/lib/mysql/.ssh/id_rsa from unconfined_u:object_r:mysqld_db_t:s0 to unconfined_u:object_r:ssh_home_t:s0
Relabeled /var/lib/mysql/.ssh/id_rsa.pub from unconfined_u:object_r:mysqld_db_t:s0 to unconfined_u:object_r:ssh_home_t:s0
Relabeled /var/lib/mysql/.ssh/known_hosts from unconfined_u:object_r:mysqld_db_t:s0 to unconfined_u:object_r:ssh_home_t:s0
Relabeled /var/lib/mysql/.ssh/authorized_keys from system_u:object_r:mysqld_db_t:s0 to system_u:object_r:ssh_home_t:s0
```
<br>

이제 다시한번 mysql 계정으로 접속을 시도해봅니다.

```bash
[mysql@mysql-server1 ~]$ ssh mysql@192.168.0.5
Activate the web console with: systemctl enable --now cockpit.socket

Last login: Mon Oct  7 01:41:19 2024 from 192.168.0.11
[mysql@mon-server1 ~]$ 
```
<br>

정상적으로 수행됩니다.👏

<br/>

### 🚀추가로 해야할 일(자동화)
---
공개키를 넘기는 작업은 수동으로 한다면 굉장히 수고스러운 작업입니다. 플랫폼을 대거 이관해야하는 작업이 생긴다면 더할나위 없이 야근 당첨입니다. 그리고 mha 를 구성할 경우에도 공개키를 서로 교환하는 사전작업이 필요하기 때문에 IaC 도구를 활용하여 자동화시킬 필요가 있습니다. 

<br>

ansible 을 활용하여 공개키를 자동화 작업은 [다음 포스팅(클릭)](https://duhokim0901.github.io/mysql/ansible_mysql_PubkeyAuth_script/)을 통해 공유드리겠습니다. 감사합니다.

<br>

### 📚 참고자료
---
- [~/.ssh/authorized_keys 에 public key 를 추가했으나 자동 로그인이 안 됨](https://www.lesstif.com/system-admin/ssh-authorized_keys-public-key-17105307.html)

<br/>
---

{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}