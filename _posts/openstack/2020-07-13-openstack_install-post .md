---
title: "SELinux에서 step by step 방식으로 openstack 설치"
escerpt: "openstack install"

categories:
  - Openstack
tags:
  - [Openstack,devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2020-07-13 13:12
last_modified_at: 2020-07-13 13:12

comments: true

---

# SUSE Linux란?

OpenSUSE.
SUSE에서 판매하는 제품들인 SUSE Linux Enterprise Server와 
SUSE Linux Enterprise Desktop의기반으로 사용되고 있다. 
SUSE Linux의 선행 프로젝트로서 SUSE Linux의 개발사인 노벨 사의 후원을 받아 제작되었으며 
상당히 안정적인 리눅스이다. 
긴 역사, 높은 안정성, 변화와 안정 사이의 균형 등의 특징으로 유럽에서 특히 높은 인기를 누리고 있다.
수세의 장점으로는 중앙집중관리인 YaST라는 관리 프로그램이 탑재되어 있으며, 타 리눅스에서
터미널에서만 가능하던 옵션을 GUI로 간단하게 설정할 수 있다는 점이 있다.

# 구성도
< Controller Node / Compute Node 하드웨어 구성도 >
![openstack_In_seLinux_001](/assets/images/openstack_In_seLinux/001.png)

Controller Node에 Identity 서비스, 이미지 서비스, Compute 관리, 네트워킹 관리 부분, 
다양한 네트워킹 에이전트, 대시보드를 실행한다.
Compute Node에는 인스턴스를 동작시키는 Hypervisor를 실행한다.


# 설치 과정

## OS설정

### 1) 보안
![openstack_In_seLinux_002](/assets/images/openstack_In_seLinux/002.png)

OpenStack 서비스에 대한 암호, 정책, 암호화를 포함한 다양한 보안 방법을 지원하고,
추가적으로 데이터베이스 서버와 암호 보안을 지원하는 브로커를 포함한 서비스를 지원한다.

### 2) 호스트 네트워킹
첫 번째 인터페이스(NAT)를 관리 인터페이스로 설정하고, 두 번째 인터페이스(Bridge)를
Provider 인터페이스로 사용한다

![openstack_In_seLinux_003](/assets/images/openstack_In_seLinux/003.png)

/etc/sysconfig/network/ifcfg-eth0 파일에 위의 표시된 내용 입력
![openstack_In_seLinux_004](/assets/images/openstack_In_seLinux/004.png)

몇몇 배포 판은 127.0.1.1 과 같이 실제 호스트 이름을 다른 루프 백 IP주소로 변환하는 
부가적인 항목을 추가한다. 
이름 변환 문제를 방지하기 위해 해당 항목을 삭제한다.
127.0.0.1 항목은 삭제하면 안된다.
설정을 완료하였다면, 인터넷과 Node들 간의 접근 테스트를 시행한다.

### 3) Network Time Protocol(NTP)
Node 사이에 서비스들을 적절히 동기화하기 위해 NTP구현하는 Chrony를 설치한다. 
Controller Node가 보다 정확한 서버를 가리키도록 하고 
다른 Node들은 Controller Node를 가리키도록 구성할 것을 권장한다.
Controller Node와 Compute Node에서 # zypper install chrony 명령어로 설치한다. 
![openstack_In_seLinux_005](/assets/images/openstack_In_seLinux/005.png)

Controller Node의 /etc/chrony.conf 파일에 다른 Node가 Controller Node에서의 chrony 데몬에
접속하도록 활성화하기 위해 “allow 1.0.0.0/24”를 추가해준다.
~~~
# systemctl enable chronyd.service
# systemctl start chronyd.service  //NTP Service를 시작합니다.
~~~
![openstack_In_seLinux_006](/assets/images/openstack_In_seLinux/006.png)

Compute Node의 /etc/chrony.conf 파일에 시계 동기화를 위해 Controller Node를 가리키도록
설정 후 NTP Service를 시작
![openstack_In_seLinux_007](/assets/images/openstack_In_seLinux/007.png)

검증을 위해 Controller Node와 Compute Node에 # chronyc sources 를 입력

### 4) OpenStack Packages
~~~
# zypper addrepo –f obs://Cloud.OpenStack:Rocky/openSUSE_Leap_42.3 Rocky
# zypper refresh && zypper dist-upgrade
~~~
OpenStack 버전에 기반한 Open Build 서비스 저장소를 활성화하고 패키지를 업그레이드한다.

~~~
# zypper install python-openstackclient
~~~

### 5) SQL Database
Controller Node에서 실행.
~~~
# zypper install mariadb-client mariadb //python-PyMySQL 패키지를 설치.
~~~
![openstack_In_seLinux_008](/assets/images/openstack_In_seLinux/008.png)

/etc/my.cnf.d/openstack.cnf 파일 생성하여 편집.

[mysqld] 섹션을 생성하고, 다른 Node들이 관리 네트워크를 통한 액세스를 활성화하기 위해
Controller Node의 관리 IP주소를 bind-address 키로 설정. 유용한 옵션 및 UTF-8 문자셋을
활성화하기 위해 부가적인 키를 설정.
~~~
# systemctl enable mysql.service
# systemctl start mysql.service
~~~

데이터베이스 서비스를 시작하고 시스템 부팅 시 시작하도록 설정.
mysql_secure_installation 스크립트를 실행하여 데이터베이스 서비스 보안을 강화하고
데이터베이스 root 계정에 대해 알맞은 암호를 선택.

### 6) Message Queue
Controller Node에서 실행
~~~
# zypper install rabbitmq-server
# systemctl enable rabbitmq-server.service
# systemctl start rabbitmq-server.service
~~~

서비스 간 작업과 상태 정보에 대한 상호 교환 및 조정을 위해 message queue를 사용
메시지 큐 서비스를 시작하고 시스템이 부팅될 때 시작하도록 구성
![openstack_In_seLinux_009](/assets/images/openstack_In_seLinux/009.png)

![openstack_In_seLinux_010](/assets/images/openstack_In_seLinux/010.png)

openstack 사용자를 추가하고, 구성, 쓰기와 읽기 접근을 허용

### 7) Memcached
서비스를 위한 Identity 서비스 인증 메커니즘에서는 토큰을 캐싱하기 위해 Memcached를 사용.
Controller Node에서 실행
~~~
# zypper install memcached python-python-memcached
~~~

![openstack_In_seLinux_011](/assets/images/openstack_In_seLinux/011.png)

/etc/sysconfig/memcached 파일에 관리 IP 주소를 사용하는 서비스를 구성.
관리 네트워크를 통해 다른 노드에 대한 액세스를 활성화하도록 구성.
~~~
# systemctl enable memcached.service
# systemctl start memcached.service
~~~

Memcached 서비스를 시작하고 시스템 부팅 시 시작하도록 설정

### 8) Etcd
OpenStack 서비스들은 분산 키 잠금 관리, 구성 저장, 서비스가 살아있는지 및 다른 시나리오에 대한 
지속적인 추적을 위한 안정적인 분산 키-값 저장소인 Etcd 사용

![openstack_In_seLinux_012](/assets/images/openstack_In_seLinux/012.png)

![openstack_In_seLinux_013](/assets/images/openstack_In_seLinux/013.png)

Controller Node에서 etcd 사용자를 생성하고 필요한 디렉토리를 생성

![openstack_In_seLinux_014](/assets/images/openstack_In_seLinux/014.png)

![openstack_In_seLinux_015](/assets/images/openstack_In_seLinux/015.png)

etcd tarball 다운로드 및 설치합니다.

![openstack_In_seLinux_016](/assets/images/openstack_In_seLinux/016.png)

/etc/etcd/etcd.conf.yml 생성하여 관리 네트워크를 통해 다른 Node에 대한 액세스를 활성화 하도록 
Controller Node에 대한 관리 IP 주소로 설정

![openstack_In_seLinux_017](/assets/images/openstack_In_seLinux/017.png)

/usr/lib/systemd/system/etcd.service 생성 및 편집
~~~
# systemctl daemon-reload && systemctl enable etcd && systemctl start etcd
~~~

## Identity Service – Keystone

### 1) 전제 조건
Identity 서비스를 설치하고 구성하기 전에 데이터베이스를 생성해야한다.

![openstack_In_seLinux_018](/assets/images/openstack_In_seLinux/018.png)


~~~
$ mysql –u root –p  
~~~
위 명령어를 사용하여 root 사용자로 데이터베이스 서버에 연결
Keystone 데이터베이스를 생성하고 적절한 액세스 권한을 부여

### 2) 구성 요소 설치 및 구성

패키지 설치
~~~
# zipper install openstack-keystone 
~~~

![openstack_In_seLinux_019](/assets/images/openstack_In_seLinux/019.png)

![openstack_In_seLinux_020](/assets/images/openstack_In_seLinux/020.png)

![openstack_In_seLinux_021](/assets/images/openstack_In_seLinux/021.png)

/etc/keystone/keystone.conf 파일을 편집하고 위와 같이 구성

### 3) Apache HTTP 서버 구성

패키지설치
~~~
# zypper install apache && zypper install apache2-mod_wsgi 
~~~

![openstack_In_seLinux_022](/assets/images/openstack_In_seLinux/022.png)

![openstack_In_seLinux_023](/assets/images/openstack_In_seLinux/023.png)

/etc/sysconfig/apache2 파일과 /etc/apache2/conf.d/wsgi-keystone.conf 파일을 각각 편집하고,
/etc/keystone 디렉토리의 소유권을 변경

### 4) 설치

![openstack_In_seLinux_024](/assets/images/openstack_In_seLinux/024.png)

Apache HTTP 서비스를 시작하고 시스템이 부팅될 때 시작되도록 구성



### 5) 도메인, 프로젝트, 사용자 및 역할 만들기


사용자 환경에 추가하는 각 서비스에 대해 고유한 사용자를 포함하는 프로젝트(service)와,
권한이 없는 프로젝트와 사용자를 사용해야 하는 일반 작업을 위한
프로젝트(myproject) 및 사용자(myuser)를 생성

~~~
$ openstack project create –domain default –description “Service Project” service
$ openstack project create –domain default –description “Demo Project” myproject
$ openstack user create –domain default –password-prompt myuser
$ openstack role create myrole
$ openstack role add –project myproject --user myuser myrole
~~~

### 6) 작동확인
![openstack_In_seLinux_025](/assets/images/openstack_In_seLinux/025.png)

임시 변수 OS_AUTH_URL 및 OS_PASSWORD 환경 변수 설정을 해제
admin 사용자로서 인증 토큰을 요청하고, myuser 사용자로서 인증 토큰을 요청

## Image Service - glance

### 1) 전제 조건

![openstack_In_seLinux_026](/assets/images/openstack_In_seLinux/026.png)

glance 데이터베이스를 만들고 적절한 액세스 권한을 부여
~~~
$ . admin-openrc
$ openstack user create --domain default --password-prompt glance
$ openstack role add –project service --user glance admin
$ openstack service create --name glance --description “OpenStack Image” image
~~~

서비스 자격 증명을 위해 glance 사용자를 생성하고 admin 역할을 추가 후 entity를 생성

![openstack_In_seLinux_027](/assets/images/openstack_In_seLinux/027.png)

위와 같이 Image Service API Endpoint를 작성.

~~~
$ openstack endpoint create --region RegionOne image internal https://controller:9292
$ openstack endpoint create --region RegionOne image admin http://controller:9292
~~~


### 2) 구성 요소 설치 및 구성

~~~
# zypper install openstack-glance openstack-glance-api openstack-glance-registry 
~~~

![openstack_In_seLinux_028](/assets/images/openstack_In_seLinux/028.png)

/etc/glance/glance-api.conf 파일을 편집

![openstack_In_seLinux_029](/assets/images/openstack_In_seLinux/029.png)

/etc/glance/glance-registry.conf 파일을 편집

![openstack_In_seLinux_030](/assets/images/openstack_In_seLinux/030.png)

Image Service를 시작하고 시스템이 부팅될 때 시작되도록 구성.

### 3) 작동 확인

cirros를 사용하여 Image Service의 작동을 확인.

~~~
$ . admin-openrc
$ wget http://download.cirros-cloud.net/0.4.0/cirros-0.4.0-x86_64-disk.img
$ openstack image create “cirros” --file cirros-0.4.0-x86_64-disk.img \
--disk-format qcow2 --container-format bare --public
~~~

모든 프로젝트가 접근할 수 있도록 qcow2 디스크 포맷, 노출된 컨테이너 형식 등을 사용하여
Image Service에 Image를 업로드

![openstack_In_seLinux_031](/assets/images/openstack_In_seLinux/031.png)

Image 업로드 확인 및 속성 유효성 검사 실시

## Compute Service - nova

### Controller node 설치 및 구성

### 1) Controller Node 전제 조건

![openstack_In_seLinux_032](/assets/images/openstack_In_seLinux/032.png)

![openstack_In_seLinux_033](/assets/images/openstack_In_seLinux/033.png)

데이터베이스를 생성하고 적절한 액세스 권한을 부여

~~~
$ . admin-openrc
$ openstack user create --domain default --password-prompt nova
$ openstack role add --project service --user nova admin
$ openstack service create --name nova --description "OpenStack Compute" compute
~~~

Compute 서비스 자격 증명을 만듬

![openstack_In_seLinux_034](/assets/images/openstack_In_seLinux/034.png)

위와 같이 Compute API 끝점을 만듬.

~~~
$ openstack endpoint create --region RegionOne compute internal http://controller:8774/v2.1
$ openstack endpoint create --region RegionOne compute admin http://controller:8774/v2.1
$ openstack user create --domain default –password-prompt placement
$ openstack role add --project service –user placement admin
~~~

사용자를 만들고 관리 역할이 있는 서비스 프로젝트에 사용자를 추가.

~~~
$ openstack service create --name placement --description “Placement API” placement
$ openstack endpoint create --region RegionOne placement public http://controller:8780
$ openstack endpoint create --region RegionOne placement internal http://controller:8780
$ openstack endpoint create --region RegionOne placement admin http://controller:8780
~~~

서비스 카탈로그에 Placement API 항목을 만들고 Placement API 서비스 끝점을 생성.

### 2) Controller Node 구성요소 설치 및 구성

~~~
# zypper install openstack-nova-api openstack-nova-scheduler openstack-nova-conductor \
openstack-nova-consoleauth openstack-nova-novnproxy openstack-nova-placement-api iptables
~~~

패키지를 설치

![openstack_In_seLinux_035](/assets/images/openstack_In_seLinux/035.png)

위와 같이 /etc/nova/nova.conf 파일을 편집
~~~
# su -s /bin/sh -c “nova-manage api_db sync” nova
# su -s /bin/sh -c “nova-manage cell_v2 map_cell0” nova
# su -s /bin/sh -c “nova-manage cell_v2 create_cell --name=cell1 --verbose” nova [UUID]
# su -s /bin/sh -c “nova-manage db sync” nova
~~~

nova-api와 placement 데이터베이스를 채우고 cell0, cell1 데이터베이스 등록 및 생성

![openstack_In_seLinux_036](/assets/images/openstack_In_seLinux/036.png)

nova cell0 및 cell1이 올바르게 등록되어 있는지 확인

### 3) Controller Node 설치

![openstack_In_seLinux_037](/assets/images/openstack_In_seLinux/037.png)

Compute 서비스를 시작하고 시스템이 부팅될 때 시작되도록 구성

## Compute node 설치 및 구성

### 4) Compute Node 구성 요소 설치 및 구성

~~~
# zypper install openstack-nova-compute genisoimage qemu-kvm libvirt
~~~

패키지를 설치

![openstack_In_seLinux_038](/assets/images/openstack_In_seLinux/038.png)

위와 같이 /etc/nova/nova.conf 파일을 편집하고 # modprobe nbd로 커널 모듈 nbd가 로드 되었는지 확인

### 5) Compute Node 설치

![openstack_In_seLinux_039](/assets/images/openstack_In_seLinux/039.png)

Compute node가 가상 컴퓨터의 하드웨어 가속을 지원하는지 여부를 결정
만약 0을 반환하면 /etc/nova/nova.conf 파일의 [libvirt] 섹션에서 virt_type을 qemu로 수정
Compute 서비스를 시작하고 시스템 부팅 시 자동으로 시작되도록 구성

### 6) Cell 데이터베이스에 Compute Node 추가

~~~
$ openstack compute service list --service nova-compute
# su -s /bin/sh -c “nova-manage cell_v2 discover_hosts --verbose” nova
~~~

데이터베이스에 컴퓨팅 호스트가 있는지 확인하고 컴퓨팅 호스트를 찾는다.

### 7) Controller Node에서 작동 확인

~~~
$ openstack compute service list
~~~

consoleauth, scheduler, conductor 및 compute 서비스 구성 요소를 나열하여 확인

![openstack_In_seLinux_040](/assets/images/openstack_In_seLinux/040.png)

Identity Service의 API endpoint를 나열하여 Identity Service와의 연결을 확인

![openstack_In_seLinux_041](/assets/images/openstack_In_seLinux/041.png)

Cell 및 Placement API가 제대로 작동하는지 확인

![openstack_In_seLinux_042](/assets/images/openstack_In_seLinux/042.png)

image service의 image를 나열하여 image service와의 연결을 확인

## Networking Service - neutron

## Controller node 설치 및 구성

### 1) Controller Node 전제 조건

![openstack_In_seLinux_043](/assets/images/openstack_In_seLinux/043.png)

neutron 데이터베이스를 생성하고 적절한 액세스 권한을 부여
또한 neutron 사용자를 생성하고 admin 역할을 추가
~~~
$ openstack service create --name neutron --description “OpenStack Networking” 
~~~

networkneutron service entity를 생성

![openstack_In_seLinux_044](/assets/images/openstack_In_seLinux/044.png)

위와 같이 Networking Service API endpoint를 작성
~~~
$ openstack endpoint create --region RegionOne network internal http://controller :9696
$ openstack endpoint create --region RegionOne network admin http://controller :9696
~~~

### 2) Controller node Networking Option 2: Self-service networks

< Self-Service Networks >

![openstack_In_seLinux_045](/assets/images/openstack_In_seLinux/045.png)

XVLAN과 같은 overlay segmentation 방식을 사용하여 self-service 네트워크를 가능하게 하는
Layer-3 (routing) 서비스를 포함하는 provider 네트워크를 확장
근본적으로는, 가상 네트워크를 NAT를 사용하여 물리 네트워크로 라우팅
/etc/neutron/neutron.conf 파일을 편집하여 서버 구성 요소를 구성
/etc/neutron/plugins/ml2/ml2_conf.ini 파일을 편집하여Modular Layer 2 플러그 인을 구성
/etc/neutron/plugins/ml2/linuxbridge_agent.ini 파일을 편집하여 Linux Bridge agent를 구성
/etc/neutron/l3_agent.ini 파일을 편집하여 Layer-3 agent를 구성
마지막으로 /etc/neutron/dhcp_agent.ini 파일을 편집하여 DHCP agent를 구성

### 3) Controller Node MetaData agent 구성

![openstack_In_seLinux_046](/assets/images/openstack_In_seLinux/046.png)

/etc/neutron/metadata_agent.ini 파일을 위와 같이 편집

### 4) Networking Service를 사용하도록 Compute Service 구성

![openstack_In_seLinux_047](/assets/images/openstack_In_seLinux/047.png)

/etc/nova/nova.conf 파일에서 액세스 매개 변수를 구성하고 metadata proxy를 활성화

### 5) 설치

![openstack_In_seLinux_048](/assets/images/openstack_In_seLinux/048.png)

SUSE는 기본적으로 apparmor를 활성화하고 dnsmasq를 제한한다.
apparmor를 완전히 비활성화하거나 dnsmasq 프로필만 비활성화해야 한다.
마지막으로 Compute API Service, Networking Service, Layer-3 Service를 시작한다.

## Compute node 설치 및 구성

### 6) Compute Node 공통 구성 요소 구성

![openstack_In_seLinux_049](/assets/images/openstack_In_seLinux/049.png)

~~~
# zypper install --no-recommends openstack-neutron-linuxbridge-agent bridge-utils
~~~
먼저 구성 요소를 설치
그리고 /etc/neutron/neutron.conf 파일을 위와 같이 편집하고
추가로 [oslo_concurrency] 섹션에서 lock_path = /var/lib/neutron/tmp로 수정

### 7) Compute Node Networking Option 2: Self-Service Network

/etc/neutron/plugins/ml2/linuxbridge_agent.ini 파일을 편집하여 Linux Bridge agent를 구성

![openstack_In_seLinux_050](/assets/images/openstack_In_seLinux/050.png)

위의 sysctl 값이 1로 모두 설정되어 있는지 확인하여 Linux 운영 체제 커널이 Network Bridge
filter를 지원하는지 확인
네트워킹 브리지 지원을 사용하려면 br_netfilter 커널 모듈을 로드해야 한다.

~~~
# modprobe br_netfilter // 명령어로 커널 모듈을 로드하고 # sysctl -a 명령어로 확인
~~~

### 8) Networking Service를 사용하도록 Compute Service 구성

![openstack_In_seLinux_051](/assets/images/openstack_In_seLinux/051.png)

위와 같이 /etc/nova/nova.conf 파일을 편집

### 9) 설치

![openstack_In_seLinux_052](/assets/images/openstack_In_seLinux/052.png)


/etc/sysconfig/neutron 파일에 위의 내용이 포함되어 있는지 확인하고,
Compute Service와 Linux Bridge agent를 시작

### 10) Controller Node 작동 확인

~~~
$ openstack extension list --network // 명령어로 neutron-server 프로세스가 실행됐는지 확인
~~~

![openstack_In_seLinux_053](/assets/images/openstack_In_seLinux/053.png)

neutron agent가 성공적으로 시작되었는지 확인

## Dashboard – horizon

### 1) 구성 요소 설치 및 구성

~~~	
# zipper install openstack-dashboard
# cp /etc/apache2/conf.d/openstack-dashboard.conf.sample \
 /etc/apache2/conf.d/openstack-dashboard.conf
~~~
패키지를 설치하고 웹 서버를 구성

![openstack_In_seLinux_054](/assets/images/openstack_In_seLinux/054.png)
		
/srv/www/openstack-dashboard/openstack_dashboard/local/local_settings.py 파일을 편집

### 2) 설치

~~~		
# systemctl restart apache2.service memcached.service
~~~
웹 서버 및 세션 저장 서비스를 다시 시작한다.

### 3) 동작 확인

http://controller/ 웹 브라우저를 사용하여 대시보드에 액세스합니다.
Admin 또는 demo 사용자 및 default 도메인 자격 증명을 사용하여 인증합니다.

## 인스턴스 실행

인스턴스를 실행하기 위해서는 가상 네트워크, Flavor, Key Pair, 보안 그룹을 먼저 생성해야한다.
CLI 환경과 대시 보드에서 모두 생성 가능합니다.

### 1) 가상 네트워크 설정

Networking Option 2를 선택한 경우 Provider와 Self-service Network를 모두 생성해야 한다.

![openstack_In_seLinux_055](/assets/images/openstack_In_seLinux/055.png)

먼저 Provider 네트워크를 생성

![openstack_In_seLinux_056](/assets/images/openstack_In_seLinux/056.png)

네트워크에 Subnet을 생성

이제 NAT를 통해 실제 네트워크 인프라에 연결하는 Self-service Network를 생성

![openstack_In_seLinux_057](/assets/images/openstack_In_seLinux/057.png)

selfservice 네트워크를 생성

![openstack_In_seLinux_058](/assets/images/openstack_In_seLinux/058.png)


네트워크에 Subnet을 생성

![openstack_In_seLinux_059](/assets/images/openstack_In_seLinux/059.png)

Dashboard의 관리 > 네트워크 항목에 2개의 네트워크가 생성된 것을 확인할 수 있다.

![openstack_In_seLinux_060](/assets/images/openstack_In_seLinux/060.png)

selfservice 네트워크를 공유 상태로 편집

### 2) Router 생성
외부 네트워크를 provider 네트워크로 지정하여 router를 생성

![openstack_In_seLinux_061](/assets/images/openstack_In_seLinux/061.png)

### 3) Flavor 생성

![openstack_In_seLinux_062](/assets/images/openstack_In_seLinux/062.png)

### 4) Key Pair 생성

대부분의 Cloud Image는 기존 암호 인증보다는 공개 키 인증을 지원한다.

### 5) 보안 그룹 규칙 추가

기본적으로 default 보안 그룹은 모든 인스턴스에 적용되며 인스턴스에 대한 원격 액세스를
거부하는 방화벽 규칙을 포함한다.

### 6) Floating IP 할당

![openstack_In_seLinux_063](/assets/images/openstack_In_seLinux/063.png)

지정한 Subnet 범위 내에서 Floating IP가 할당된다

### 7) 인스턴스 생성 및 실행

![openstack_In_seLinux_064](/assets/images/openstack_In_seLinux/064.png)

생성된 인스턴스 콘솔로 접속한다.

![openstack_In_seLinux_065](/assets/images/openstack_In_seLinux/065.png)

정상적으로 외부와 통신 되는지 확인

## SUSE Linux를 이용하여 구성하며 발생한 문제점 및 해결방안

### 1) RabbitMQ Server 실행 오류

![openstack_In_seLinux_066](/assets/images/openstack_In_seLinux/066.png)

Message Queue Service인 RabbitMQ 설치 후 RabbitMQ Server가 실행되지 않는 오류이다


#### 해결방안

/etc/hosts에서 Loopback Interface Name과 Hostname이 일치하지 않을 경우 RabbitMQ Server가
실행되지 않는다. Loopback Interface와 Hostname을 일치시켜 주면 정상적으로 실행된다.

###	1)   Apache2 설치 오류
Apache2 패키지를 설치할 때 mod_wsgi 패키지가 같이 설치되지 않아서 오류가 발생한다.

#### 해결방안

~~~
zypper install apache2-mod_wsgi
~~~

### 3) 환경변수 오류

![openstack_In_seLinux_067](/assets/images/openstack_In_seLinux/067.png)

auth plugin password에 필요한 값인 auth-url 값이 누락되어 발생하는 오류이다

#### 해결방안

![openstack_In_seLinux_068](/assets/images/openstack_In_seLinux/068.png)

![openstack_In_seLinux_069](/assets/images/openstack_In_seLinux/069.png)

![openstack_In_seLinux_070](/assets/images/openstack_In_seLinux/070.png)


계속 사용할 환경변수 이므로 위와 같이 스크립트를 만들어서 실행한다.

### 4)  Database 변경사항 적용

Database에 값을 넣었지만 아무 값이 안 들어가는 경우
MariaDB [keystone]> flush privileges; 명령어를 실행하여 적용시켜 준다.

### 5) DashBoard 접속 오류_1

![openstack_In_seLinux_071](/assets/images/openstack_In_seLinux/071.png)

![openstack_In_seLinux_072](/assets/images/openstack_In_seLinux/072.png)

Horizon 실행 후 대시보드로 접속이 안 되는 오류이다.
vi /var/log/apache2/openstack-dashboard-error_log
로그 파일에서 에러 확인이 가능하며, Time zone setting이 맞지 않아 발생

#### 해결방안

![openstack_In_seLinux_073](/assets/images/openstack_In_seLinux/073.png)

~~~
vi /srv/www/openstack-dashboard/openstack_dashboard/local/local_settings.py
~~~

협정 세계 표준시인 UTC로 변경한다


### 6) DashBoard 접속 오류_2

![openstack_In_seLinux_074](/assets/images/openstack_In_seLinux/074.png)

잘못된 HTTP_Host header로 인해 Horizon 실행 후 대시보드 접속이 안 되는 오류이다

#### 해결방안

![openstack_In_seLinux_075](/assets/images/openstack_In_seLinux/075.png)

~~~
vi /srv/www/openstack-dashboard/openstack_dashboard/local/local_settings.py
~~~
모든 HOST가 접속 가능하도록 설정하고,

만약 특정 호스트만 접속이 가능하도록 하고 싶다면 IP를 지정해주어도 된다.

### 7) Router 활성화

![openstack_In_seLinux_076](/assets/images/openstack_In_seLinux/076.png)

대시보드 접속은 가능하나, 네트워크 라우터 설정 탭이 보이지 않는 오류

#### 해결방안

![openstack_In_seLinux_077](/assets/images/openstack_In_seLinux/077.png)

vi /srv/www/openstack-dashboard/openstack_dashboard/local/local_settings.py

위의 설정들을 모두 True로 변경하고,

설정 변경 후엔 apache2.service, memcached.service 서비스들을 재 시작한다.

### 8) 인스턴스 부팅 오류
인스턴스 생성 후 가상 머신 타입이 kvm을 지원하지 않아, 인스턴스 부팅이 안 되는 오류이다.

![openstack_In_seLinux_078](/assets/images/openstack_In_seLinux/078.png)

virt_type = qemu로 변경
 
위와 같은 방식으로 SUSE Linux를 활용하여 OpenStack 환경을 구축할 수 있다.

CentOS, Ubuntu 모두 비슷한 방식으로 구축할 수 있다