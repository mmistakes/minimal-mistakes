---
title: "[ansible] mysql 계정을 패스워드 없이 SSH 연결하기"
excerpt: "ansible 플레이북을 이용하여 mysql 계정을 패스워드 없이 SSH 연결하기 위한 설정을 자동화 합니다."
#layout: archive
categories:
 - Ansible
tags:
  - [ansible, mariadb, linux, ssh]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-10-05
last_modified_at: 2024-10-05
comments: true
---

### ✏️mysql 계정으로 패스워드 인증없이 SSH 연결할 때 발생하는 문제
--- 

[이전 포스팅(클릭)](https://duhokim0901.github.io/mysql/SELinux_mysql_PubkeyAuth_deny/)에서 rocky8.8 리눅스 환경에서 mysql 계정으로 패스워드 인증없이 SSH 연결을 시도할 때 발생하는 문제에 대해서 다루어 보았습니다. 짧게 요약을 하자면 접속하려는 서버의 authorized_keys 파일의 SElinux 보안 컨텍스트가 ssh_home_t 로 설정되어 있지 않아서 발생하는 현상이었습니다. 이를 조정하기 위해서 아래의 명령어를 수행해 주었습니다.

{% include codeHeader.html name="ssh_home_t 컨텍스 부여" %}
```bash
sudo semanage fcontext -a -t ssh_home_t "/var/lib/mysql/.ssh(/.*)?"
sudo restorecon -Rv /var/lib/mysql/.ssh
```

이번 포스팅에서는 위의 사항도 고려하면서 공개키(id_rsa.pub)를 접속하고 싶은 서버의 authorized_keys 에 할당하는 작업을 ansible 로 자동화 하고자 합니다. 특히 mha 를 가정하고 mha 매니저와 mha 노드간의 통신을 위해 mysql 계정의 공개키를 서로 상호 복사하고 보안 컨텍스트까지 맞출 수 있도록 스크립트를 작성하겠습니다.

<br>

### 🚀ansible-playbook 자동화
---
저는 mha 매니저 서버 1대와 mysql 레플리카셋 3대에 있는 mha 노드 서버간의 상호 통신을 위해 공개키를 서로 교환하는 것을 목표로 할 예정입니다. 이를 위해 ansible 스크립트를 아래와 같이 구성하였습니다.

```
root@DESKTOP:~/ansible_code/ansible-ssh-publickey-cp# tree
.
├── inventory
│   └── hosts
├── roles
│   └── ssh-publickey-cp
│       ├── defaults
│       ├── handlers
│       ├── tasks
│       │   └── main.yml
│       ├── templates
│       └── vars
└── ssh-publickey-cp_deploy.yml
```

<br>


아래는 배포를 위해 생성한 파일입니다. 여러 role 들을 연속으로 수행할 경우를 생각해서 _deploy.yml 이라는 컨벤션으로 파일을 생성해두었습니다.

{% include codeHeader.html name="ssh-publickey-cp_deploy.yml" %}
```yml
---
- name: ssh-publickey-cp_deploy
  gather_facts: true
  hosts: mysql-server-list
  become: true

  roles:
    - ssh-publickey-cp
```

<br>

아래는 공개키를 서로 교환할 서버 정보인 inventory/hosts 입니다.

{% include codeHeader.html name="inventory/hosts" %}
```yml
all:
  children:
    mysql-server-list:
      hosts:
        mon-server1:
          ansible_host: 192.168.0.5
        mysql-server1:
          ansible_host: 192.168.0.11
        mysql-server2:
          ansible_host: 192.168.0.12
        mysql-server3:
          ansible_host: 192.168.0.13
      vars:
        ansible_user: root
        ansible_become: true
        ansible_ssh_extra_args: '-o StrictHostKeyChecking=no'
        ssh_user: mysql
        ssh_key_dir: /var/lib/mysql/.ssh
        ssh_key_file: id_rsa
        ssh_key_passphrase: ""
        delete_existing_key: true #파일 초기화할지 여부 확인
```

<br>

작업대상은 hosts 에 있는 서버 4대입니다. ansbile_user 에 의해 root 로 접속을 하고 ansbile_become 변수가 true 이므로 모든 명령어들이 sudo 로 실행됩니다.
vars 설정에 의해서 ssh 키 디렉토리와 파일들을 정의하였습니다. ssh_key_passphrase 는 ssh-keygen 수행 시 passphrase 값을 지정한 변수입니다. delete_existing_key 는 ssh 키 디렉토리를 초기화 할지 여부를 설정하기 위해 만든 변수입니다.

<br>

아래는 task 가 정의된 roles/ssh-publickey-cp/tasks/main.yml 입니다.

<details><summary>roles/ssh-publickey-cp/tasks/main.yml</summary>
<div markdown="1">

{% include codeHeader.html name="roles/ssh-publickey-cp/tasks/main.yml" %}
```yml
---

- name: Check if the SSH authorized key exists
  stat:
    path: /var/lib/mysql/.ssh/authorized_keys
  register: authorized_key

- name: Check if the SSH public key exists
  stat:
    path: /var/lib/mysql/.ssh/id_rsa.pub
  register: ssh_key

- name: Delete existing SSH keys if specified
  file:
    path: /var/lib/mysql/.ssh/id_rsa
    state: absent
  when: delete_existing_key | default(false) and ssh_key.stat.exists

- name: Delete existing SSH public key if specified
  file:
    path: /var/lib/mysql/.ssh/id_rsa.pub
    state: absent
  when: delete_existing_key | default(false) and ssh_key.stat.exists

- name: Delete existing authorized_keys file if it exists
  file:
    path: /var/lib/mysql/.ssh/authorized_keys
    state: absent
  when: delete_existing_key | default(false) and authorized_key.stat.exists

- name: Generate SSH key pair
  command: >
    sudo -u mysql ssh-keygen -t rsa -b 4096 -f /var/lib/mysql/.ssh/id_rsa -N "{{ ssh_key_passphrase }}"
  args:
    creates: /var/lib/mysql/.ssh/id_rsa
  register: ssh_keygen_result
  when: delete_existing_key | default(false)

- name: Fetch public key from current server
  slurp:
    src: /var/lib/mysql/.ssh/id_rsa.pub
  register: current_public_key

- name: Add public key to authorized_keys on other servers
  authorized_key:
    user: mysql
    state: present
    key: "{{ current_public_key.content | b64decode }}"
  delegate_to: "{{ item }}"
  with_items:
    - mon-server1
    - mysql-server1
    - mysql-server2
    - mysql-server3
  #when: inventory_hostname != item

- name: Check if the SELinux context is already defined
  shell: semanage fcontext -l | grep '/var/lib/mysql/.ssh' || true #파이프(|)와 같은 셸 기능은 command 에서 지원이 안되어서 shell 로 변경
  register: secontext_check
  ignore_errors: true

- name: Add or modify the SELinux context for the directory and its files
  command: >
    semanage fcontext -m -t ssh_home_t '/var/lib/mysql/.ssh(/.*)?'
  when: secontext_check.rc == 0  # secontext_check 의 리턴코드(rc)가 성공적으로 실행됨(=0), 보안컨텍스트가 이미 정의됨을 의미

- name: Add SELinux context if not already defined
  command: >
    semanage fcontext -a -t ssh_home_t '/var/lib/mysql/.ssh(/.*)?'
  when: secontext_check.rc != 0  # secontext_check 의 리턴코드(rc)가 성공적으로 실행됨(!=0)), 보안컨텍스트가 정의되지 않은 경우

- name: Restore SELinux context on files
  command: restorecon -R -v /var/lib/mysql/.ssh
```

</div>
</details>

<br>

main.yml 중 아래 내용들은 hosts 파일의 vars 에서 선언하였던 delete_existing_key 키가 true 일경우 삭제 처리하는 내용입니다. 초기화 이후에는 ssh-keygen 명령어를 이용하여 새로운 ssh key 를 발급받습니다.

```yml
- name: Delete existing SSH keys if specified
  file:
    path: /var/lib/mysql/.ssh/id_rsa
    state: absent
  when: delete_existing_key | default(false) and ssh_key.stat.exists

- name: Delete existing SSH public key if specified
  file:
    path: /var/lib/mysql/.ssh/id_rsa.pub
    state: absent
  when: delete_existing_key | default(false) and ssh_key.stat.exists

- name: Delete existing authorized_keys file if it exists
  file:
    path: /var/lib/mysql/.ssh/authorized_keys
    state: absent
  when: delete_existing_key | default(false) and authorized_key.stat.exists

- name: Generate SSH key pair
  command: >
    sudo -u mysql ssh-keygen -t rsa -b 4096 -f /var/lib/mysql/.ssh/id_rsa -N "{{ ssh_key_passphrase }}"
  args:
    creates: /var/lib/mysql/.ssh/id_rsa
  register: ssh_keygen_result
  when: delete_existing_key | default(false)  
```

<br>

공개키를 slurp 모듈을 이용하여 읽어들입니다. 텍스트를 Base64로 인코딩하여 가져옴으로써 데이터 손실이 없도록 가져올 수 있습니다. 공개키는 current_public_key 변수에 할당됩니다. slurp 모듈을 쓰면 dict 형으로 자료를 받아올 수 있는데 그 중 content 필드에 공개키의 내용이 포함되어 있습니다. Base64 인코딩된 값은 ```{{ current_public_key.content | b64decode }}``` 이란 표현으로 디코딩 시킬 수 있습니다. authorized_key 모듈을 이용해서 hosts 에 정의된 ansible_host로 현재 실행 서버의 공개키를 넘겨줍니다.


<br>

### 😎️Ansible 플레이북 실행
---
ansible-playbook 은 아래와 같이 수행하면 됩니다.

```bash
ansible-playbook -i inventory/hosts ssh-publickey-cp_deploy.yml
```

<br>


위 명령어를 실행하면 아래와 같이 task 들이 수행됩니다. skipped 된 한건은 /var/lib/mysql/.ssh 의 파일들에 SELinux 의 보안컨텍스트가 이미 정의되어 있어서 modify 작업을 동작시키기 위한 처리 결과입니다. 즉, task에 정의된 add 작업이 skip 되어 나타나는 현상입니다.

```bash
PLAY RECAP *************************************************************************************************
mon-server1                : ok=16   changed=8    unreachable=0    failed=0    skipped=1    rescued=0    ignored=0   
mysql-server1              : ok=16   changed=8    unreachable=0    failed=0    skipped=1    rescued=0    ignored=0   
mysql-server2              : ok=16   changed=8    unreachable=0    failed=0    skipped=1    rescued=0    ignored=0   
mysql-server3              : ok=16   changed=8    unreachable=0    failed=0    skipped=1    rescued=0    ignored=0 
```

<br>

스크립트 수행 이후 ssh 접속을 해보면 아래와 같이 패스워드 인증없이 정상적으로 연결되는 것을 확인할 수 있습니다.👍

```bash
[mysql@mon-server1 ~]$ ssh 192.168.0.5
Activate the web console with: systemctl enable --now cockpit.socket

Last login: Mon Oct  7 04:04:37 2024
[mysql@mon-server1 ~]$ exit
logout
Connection to 192.168.0.5 closed.
[mysql@mon-server1 ~]$ ssh 192.168.0.11
Activate the web console with: systemctl enable --now cockpit.socket

Last login: Mon Oct  7 03:54:56 2024
[mysql@mysql-server1 ~]$ exit
logout
Connection to 192.168.0.11 closed.
[mysql@mon-server1 ~]$ ssh 192.168.0.12
Activate the web console with: systemctl enable --now cockpit.socket

Last login: Mon Oct  7 03:55:51 2024 from 192.168.0.5
[mysql@mysql-server2 ~]$ exit
logout
Connection to 192.168.0.12 closed.
[mysql@mon-server1 ~]$ ssh 192.168.0.13
Activate the web console with: systemctl enable --now cockpit.socket

Last login: Mon Oct  7 03:53:13 2024 from 192.168.0.11
[mysql@mysql-server3 ~]$ exit
logout
Connection to 192.168.0.13 closed.
```

<br>

### 📚 참고자료
---
- [~/.ssh/authorized_keys 에 public key 를 추가했으나 자동 로그인이 안 됨](https://www.lesstif.com/system-admin/ssh-authorized_keys-public-key-17105307.html)

<br/>
---

{% assign posts = site.categories.Ansible %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}