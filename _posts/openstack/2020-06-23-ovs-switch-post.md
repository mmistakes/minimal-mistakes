---
title: "KVM의 Bridege를 OVS-switch로 바꾸기"
escerpt: "OVS-switch 환경세팅하기"

categories:
  - Openstack
tags:
  - [Openstack,devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2020-06-23 13:12
last_modified_at: 2020-06-23 13:12

comments: true

---

# 개요

일반적인 OpenStack 설치에서, 특히 kolla-anible 또는 openstack-anible을 통해 롤아웃되는 경우 추가 구성없이 작동하는 네트워크 인터페이스가 필요하다. 그런 다음 배포 도구는 open-vswitch 또는 linux-bridge를 이러한 인터페이스에 연결한다. open-vswitch는 물리적 인터페이스가 이후 프로세스에 있는지 확인하지 않는다.(그래서 이것은 kolla에 영향을 미친다)

KVM은 리눅스 커널 기반의 가상화 시스템이다. KVM 을 이용하면 네트워크도 가상화를 해주는데, 이는 KVM 의 네트워크 가상화는 Bridege 네트워크를 이용하도록 되어 있다.

![가상화된 네트워킹 인프라(Ibm develop works 참조)](/assets/images/가상화된 네트워킹 인프라.jpg)

위 그림은 KVM 하이퍼바이저의 가상 네트워킹을 보여준다. 네트워크 가상화를 하이퍼바이저내에서 이루어지다보니 가상 시스템을 모아놓은 상태에서 전체 네트워킹을 설정하고 변경하기가 쉽지가 않게 된다. 가상 네트워킹을 관리하기 좀 더 쉽게 하이퍼바이저내에서 빼내서 가상 네트워킹을 가능하도록 한다면 어떨까. OpenvSwitch 가 이것을 가능하게 해준다.

# 설치

## 1. 환경.

- CentOS 7  의 KVM 환경이다. OpenvSwitch 는 2.0 버전이며 이는 OpenStack IceHouse 패키지 저장소에 있는 것을 이용했다.

## 2. KVM 가상화 구축.

- 다음과 같이 패키지를 설치한다.

	- KVM 패키지 설치
~~~
# yum -y install qemu-kvm libvirt virt-install bridge-utils
~~~

- 재부팅을 하면 다음과 같이 네트워크 인터페이스들을 볼 수 있다.
- 
```
  eno16777736: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500 
	        inet 192.168.110.6  netmask 255.255.254.0  broadcast 192.168.111.255 
	        inet6 fe80::20c:29ff:fe62:f9d3  prefixlen 64  scopeid 0x20<link> 
	        ether 00:0c:29:62:f9:d3  txqueuelen 1000  (Ethernet) 
	        RX packets 49  bytes 7163 (6.9 KiB) 
	        RX errors 0  dropped 0  overruns 0  frame 0 
	        TX packets 64  bytes 10038 (9.8 KiB) 
	        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0 
	  
	lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536 
	        inet 127.0.0.1  netmask 255.0.0.0 
	        inet6 ::1  prefixlen 128  scopeid 0x10<host> 
	        loop  txqueuelen 0  (Local Loopback) 
	        RX packets 2  bytes 140 (140.0 B) 
	        RX errors 0  dropped 0  overruns 0  frame 0 
	        TX packets 2  bytes 140 (140.0 B) 
	        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0 
	  
	virbr0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500 
	        inet 192.168.122.1  netmask 255.255.255.0  broadcast 192.168.122.255 
	        ether 6a:e2:f0:1a:cf:c7  txqueuelen 0  (Ethernet) 
	        RX packets 0  bytes 0 (0.0 B) 
	        RX errors 0  dropped 0  overruns 0  frame 0 
	        TX packets 1  bytes 90 (90.0 B) 
	        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```
- virbr0 는 KVM 하이퍼바이저 생성한 인터페이스이며 기본적으로 NAT 기반의 네트워킹이다. 이는 가상화 쉘을 통해서 네트워크를 확인할 수 있다.

```
# virsh net-list 
	 이름               상태     자동 시작 Persistent 
	---------------------------------------------------------- 
	 default              활성화  예           예
```

- 가상화 네트워크의 이름은 ‘default’ 이며 내용은 다음과 같이 확인할 수 있다.


```
# virsh net-edit default 
	<network> 
	  <name>default</name> 
	  <uuid>cc156804-6f05-4f61-9e2a-b64c73ed49c5</uuid> 
	  <forward mode='nat'/> 
	  <bridge name='virbr0' stp='on' delay='0' /> 
	  <ip address='192.168.122.1' netmask='255.255.255.0'> 
	    <dhcp> 
	      <range start='192.168.122.2' end='192.168.122.254' /> 
	    </dhcp> 
	  </ip> 
	</network>
```

	- 보통 NAT 가상화 네트워크를 이용하지 않고 물리 네트워크 인터페이스와 Bridege 시켜서 사용을 한다.
		 여기서는 NAT 이던 Bridege  던지간에 KVM 하이퍼바이저의 가상 네트워크를 이용하지 않고 OpenvSwitch  를 이용할 것이다.

## 3. KVM 가상 네트워크 삭제.

- 다음과 같이 KVM 가상 네트워크를 삭제해준다.

```
# virsh net-destroy default //default 네트워크 강제 종료 
# virsh net-autostart --disable default //자동 시작으로 default 네트워크를 표시하지 않음
```

## 4. OpenvSwitch 설치.

- OpenvSwitch 의 RedHat 패키지는 OpenStack Rdo 프로젝트의 저장소를 이용하면 쉽게 설치할 수 있다.


~~~
# yum install yum install -y http://rdo.fedorapeople.org/rdo-release.rpm
~~~

그리고 다음과 같이 yum 으로 설치해 준다.


```
# yum install openvswitch -y
```

이제 systemd  에 활성화해주고 데몬을 시작해 준다.


```
# systemctl enable openvswitch 
	ln -s '/usr/lib/systemd/system/openvswitch.service' '/etc/systemd/system/multi-user.target.wants/openvswitch.service' 
	  
# systemctl start openvswitch 
# systemctl status openvswitch 
	openvswitch.service - Open vSwitch 
	   Loaded: loaded (/usr/lib/systemd/system/openvswitch.service; enabled) 
	   Active: active (exited) since 목 2014-08-28 00:06:13 KST; 3s ago 
	  Process: 11364 ExecStart=/bin/true (code=exited, status=0/SUCCESS) 
	 Main PID: 11364 (code=exited, status=0/SUCCESS) 
	  
	 8월 28 00:06:13 localhost.localdomain systemd[1]: Started Open vSwitch.
```

재부팅을 한번 해준 후에 커널 모듈을 살펴보면 openvswitch 커널 모듈이 적재된 것을 볼 수 있다.

```
# lsmod | grep open 
	openvswitch            70743  0  
	vxlan                  37584  1 openvswitch 
	gre                    13808  1 openvswitch 
	libcrc32c              12644  2 xfs,openvswitch
```

## 5. OpenvSwitch 설정.

- OpenvSwitch 의 인터페이스와 물리적인 네트워크 인터페이스를 브릿지 해준다.

```
#vim /etc/sysconfig/network-scripts/ifcfg-ovsbr0 
	DEVICE=ovsbr0 
	ONBOOT=yes 
	DEVICETYPE=ovs 
	TYPE=OVSBridge 
	BOOTPROTO=static 
	IPV6INIT=no 
	DELAY=0 
	IPADDR=192.168.110.6 
	PREFIX=23 
	GATEWAY=192.168.110.1 
	DNS1=8.8.8.8 
	HOTPLUG=no 
	  
# vim /etc/sysconfig/network-scripts/ifcfg-eno16777736 
	HWADDR="00:0C:29:62:F9:D3" 
	TYPE="OVSPort" 
	DEVICETYPE="ovs" 
	OVS_BRIDGE="ovsbr0" 
	BOOTPROTO="none" 
	NAME="eno16777736" 
	UUID="5cc31ab7-c26d-48b6-89f2-a7c933d53cb8" 
	ONBOOT="yes" 
	NM_CONTROLLED="no"
```

다음으로 리눅스의 네트워크 서비스를 재시작 해준다.

```
# systemctl restart network
```

OpenvSwitch 상태를 살펴보면 다음과 같다.

```
# ovs-vsctl show 
	9e903f10-46c4-4318-8d03-89f5760136b2 
	    Bridge "ovsbr0" 
	        Port "eno16777736" 
	            Interface "eno16777736" 
	        Port "ovsbr0" 
	            Interface "ovsbr0" 
	                type: internal 
	    ovs_version: "2.0.0"
```

네트워크 인터페이스 카드 상태는 다음과 같다.

```
# ifconfig  
	eno16777736: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500 
	        inet6 fe80::20c:29ff:fe62:f9d3  prefixlen 64  scopeid 0x20<link> 
	        ether 00:0c:29:62:f9:d3  txqueuelen 1000  (Ethernet) 
	        RX packets 3392  bytes 251802 (245.9 KiB) 
	        RX errors 0  dropped 0  overruns 0  frame 0 
	        TX packets 539  bytes 137998 (134.7 KiB) 
	        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0 
	  
	lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536 
	        inet 127.0.0.1  netmask 255.0.0.0 
	        inet6 ::1  prefixlen 128  scopeid 0x10<host> 
	        loop  txqueuelen 0  (Local Loopback) 
	        RX packets 2  bytes 140 (140.0 B) 
	        RX errors 0  dropped 0  overruns 0  frame 0 
	        TX packets 2  bytes 140 (140.0 B) 
	        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0 
	  
	ovsbr0: flags=67<UP,BROADCAST,RUNNING>  mtu 1500 
	        inet 192.168.110.6  netmask 255.255.254.0  broadcast 192.168.111.255 
	        inet6 fe80::ccdb:4bff:fe33:2dd0  prefixlen 64  scopeid 0x20<link> 
	        ether 00:0c:29:62:f9:d3  txqueuelen 0  (Ethernet) 
	        RX packets 125  bytes 17134 (16.7 KiB) 
	        RX errors 0  dropped 0  overruns 0  frame 0 
	        TX packets 64  bytes 6704 (6.5 KiB) 
	        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

이제 KVM 하이퍼바이저의 가상 네트워킹을 OpenvSwitch 를 사용하도록 해야 한다. 이전에 지웠던 기본 가상 네트워킹을 OpenvSwitch 로 사용하도록 설정해주면 되는 것이다.

```
# vim ovsbr0.xml 
	<network> 
	  <name>ovsbr0</name> 
	  <forward mode='bridge'/> 
	  <bridge name='ovsbr0'/> 
	  <virtualport type='openvswitch'/> 
	  <portgroup name='vlan-01' default='yes'> 
	  </portgroup> 
	</network>
```

ovsbr0.xml 파일을 위와 같이 만들었다면 이것을 virsh 를 이용해서 가상 네트워킹으로 인식시켜주면 된다.


```
# virsh net-define ovsbr0.xml 
	ovsbr0에서 정의된 ovsbr0.xml 네트워크 
	  
# virsh net-start ovsbr0  
	ovsbr0 네트워크 시작 
	  
# virsh net-autostart ovsbr0 
	자동 시작으로 ovsbr0 네트워크가 표시됨 
	  
# virsh net-list 
	이름               상태     자동 시작 Persistent 
	---------------------------------------------------------- 
	 ovsbr0               활성화  예           예
```

## 6. 사용.

- virt-install 이나 virt-manager 를 이용해서 Guest 만들때에 네트워크에서 ovsbr0 를 선택하면 된다.

