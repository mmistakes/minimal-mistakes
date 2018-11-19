---
title: WMI 정보를 수집하기 (Try to Collect WMI Info In Ubuntu 18)
key: 20181117
tags: ubuntu build wmi windows
excerpt: "프로젝트 shred 의 일부로서 Windows WMI 정보를 Unbuntu 환경에서 수집하는 내용을 다룬다."
toc: true
toc_sticky: true
---

# WMI 정보 수집하기 (Collecting WMI Info In Ubuntu 18)

이번 포스트에서는 WMI 정보를 수집하기 위한 wmic 툴을 빌드하고 python `wmi-client-wrapper` 를 통해 정보를 수집하는 내용을 다룬다. 이 내용을 통해 `shred` 프로젝트의 Linux, Windows 환경의 구동을 보장하고 원격 정보 수집에 있어 성능을 어느정도 보장한다.

## 0. Summary

WMIC 정보를 수집하기 위해서는 Windows 환경에서만 가능하다라는 종속적인 이슈가 있다. 그러나 이러한 제약을 벗어날 수 있다면 좀 더 자유로운 시스템 개발 및 구축이 가능할 것이다.
나는 적어도 그러한 가능성이 탐구할 만한 것이라고 여기어 조사를 시작하게 되었다.

이 문서는 아래의 주제를 다룬다. 이 주제들을 만족할 경우 `1. OpenVas WMI 모듈 사용` 절을 만족하는 결과를 얻을 수 있다.

- WMI Module Build
- Allow Windows 10 Remote WMIC Access
- Performance Test in Collecting Remote WMI Metrics
  - For example, Win32_ComputerSystem
- Install wmi-client-wrapper

## 1. OpenVas WMI 모듈 사용

구글링을 하다보면 Ubuntu 16.04 에서 wmi 모듈을 빌드하는 것을 공유해 놓았다. 순수한 파이썬으로 개발되지 않음에 안타까워하며 나는 모듈을 빌드하기 위해 아래의 링크를 참조하였다.

https://www.shellandco.net/wmic-command-ubuntu-16-04-lts/

마침내 빌드는 성공하였지만, 중요한 것이 있다. 현재 사용 중인 Windows 10 이 wmi 정보 수집을 제대로 하는지 이다. 따라서 다음과 같은 절차를 생각하였다.

1. Powershell 에서 WMI 정보를 IP 를 통해서 수집하기
2. Windows Microsoft 계정을 사용하고 있으므로 이를 인증 정보로사용하여 접속이 가능한지
   > 원격에서 WMI 정보를 수집하는 과정이 어려워 졌다.

   2.1 보안을 위해서 따로 계정을 생성하고 권한을 제한해야 하지 않을까?

Powershell(Administrator)를 통해서 원격에서 정보를 수집하는데 성공하였다. 그리고 pywin32 모듈과는 달리 수집시간을 대폭 단축 시킬 수 있었다.

`Ubuntu 18` 에서 수행한 wmic 성능 테스트 결과 
> 원격에서 데이터를 수집하므로 Metric 을 가져오는데 걸리는 시간을 측정해야한다. 이러한 테스트 결과를 바탕으로 다수의 서버에 대한 Metric 수집을 구현하는 서비스를 구축할 수 있다.

```bash
time wmic -U ${username}%${password} //${remote} "select * from Win32_ComputerSystem"
```

![Wmi Performance Test][wmi-perf]

## 2. OpenVas WMI Module Build

구글링을 깊이하지 않으면 Ubuntu 14.02 에서 Wmi 모듈을 빌드하는 내용만 찾을 수 있다. 본인의 경우 아래와 같은 구글 키워드를 통해서 매우 정확한 검색 결과를 얻을 수 있었으니 참고 바란다. 정확한 링크는 아래의 링크를 참조한다.

|참조|
|:---|
|1. [WMIC Command in Ubuntu 16.04 LTS][1]|

구글링 키워드 : `Ubuntu 18 openvas wmi`

결론: `Ubuntu 18`에서도 빌드하여 사용할 수 있다.

@TODO(gbkim): Docker 를 통해서 구성한다.

```bash
# Install openvas-wmi module
sudo aptitude install autoconf
mkdir -p /data/tools
cd /data/tools/
wget http://www.openvas.org/download/wmi/wmi-1.3.14.tar.bz2
wget http://www.openvas.org/download/wmi/openvas-wmi-1.3.14.patch
wget http://www.openvas.org/download/wmi/openvas-wmi-1.3.14.patch2
wget http://www.openvas.org/download/wmi/openvas-wmi-1.3.14.patch3v2
wget http://www.openvas.org/download/wmi/openvas-wmi-1.3.14.patch4
wget http://www.openvas.org/download/wmi/openvas-wmi-1.3.14.patch5
bzip2 -cd wmi-1.3.14.tar.bz2 | tar xf -
cd wmi-1.3.14/

patch -p1 < /data/tools/openvas-wmi-1.3.14.patch
patch -p1 < /data/tools/openvas-wmi-1.3.14.patch2
patch -p1 < /data/tools/openvas-wmi-1.3.14.patch3v2
patch -p1 < /data/tools/openvas-wmi-1.3.14.patch4
patch -p1 < /data/tools/openvas-wmi-1.3.14.patch5

# Fix some code to build successfully ...
# See the below comments

sudo make "CPP=gcc -E -ffreestanding"
# copy wmic into /usr/local/bin
sudo cp Samba/source/bin/wmic /usr/local/bin/
```

- Edit the file GNUmakefile and add the following line at the top after the license info:  
  `ZENHOME=$(HOME)`
- Edit the file /data/tools/wmi-1.3.14/Samba/source/pidl/pidl : remove the line number 583  
  `defined @$pidl || die "Failed to parse $idl_file";`  
- Edit the file /data/tools/wmi-1.3.14/Samba/source/lib/tls/tls.c  
`Line 508: replace gnutls_transport_set_lowat(tls->session, 0); by gnutls_record_check_pending(tls->session);`  
`Line 579: remove the line gnutls_certificate_type_set_priority(tls->session, cert_type_priority);`  
`Line 587: replace gnutls_transport_set_lowat(tls->session, 0); by gnutls_record_check_pending(tls->session);`  

위의 복잡한 절차를 생략하기 위해서 패치한 내용을 github 에 올려두고 다운로드 하여 사용한다.

```bash
wget https://github.com/code-machina/awesome-packages/raw/master/openvas-wmi/wmi-1.3.14-patched.7z # 원격에서 파일 다운로드
7z x wmi-1.3.14-patched.7z # 7z 압축 파일 해제
sudo make "CPP=gcc -E -ffreestanding" # make 파일 구동 (실제 빌드)
sudo cp Samba/source/bin/wmic /usr/local/bin/ # 실행 파일 복사
sudo apt-get install python-pip -y # python2.7 pip 패키지 설치
sudo pip install wmi-client-wrapper # wmi wrapper 모듈 설치
```

또한, Bash Script 를 작성하여 올려두었다. 그러나 아직은 정상적으로 구동하는지 테스트하는 중이다.
연결을 테스트 해보자. 

```python
from wmi_client_wrapper import WmiClientWrapper as wcw
con = wcw(username='code-machina', host='127.0.0.1', password='password')
result = con.query('SELECT * FROM Win32_Processor')
print(result)
```

## 3. Performance Test

WMI Class 는 클래스마다 수집하는 속도가 상이하다. 따라서 아래의 간단한 스크립트를 통해서 데이터를 가져오는 속도를 측정할 수 있다. 수집할 만한 데이터를 알아보기 위해서 다음과 같이 Powershell 명령을 사용해서 목록을 확인한다.

```Powershell
# Disk 와 관련된 WMI Class 리스트를 반환한다.
$> Get-WmiObject -list | Select-Object "name" | findstr Disk

```



```python
from wmi_client_wrapper import WmiClientWrapper as wcw
from time import time
from statistics import mean

from pprint import pprint

con = wcw(username='code-machina', host='127.0.0.1', password='password')

average = list([])

for x in range(50):
    start = time()
    result = con.query('SELECT * FROM Win32_Processor')
    end = time()
    average.append(end-start)

print("{0} Takens to finish 50 times job".format(mean(average)))
pprint(result, indet=4)
```

위의 코드를 통해서 테스트한 결과 50회의 동일한 쿼리를 반복하였을 때 1.13초 가 소요되는 것을 확인하였다. 목표로하는 성능은 0.5초로 할 때 어떻게 하면 성능을 올릴 수 있을까?

- 해결책: 쿼리의 칼럼(Column) 지정하기
  > 성능 측정 결과 수집하고자 하는 WMI 클래스에 따라 속도가 다름을 확인했다.

성능 지표  

아래의 성능 지표는 네트워크 상태 및 다른 요인에 의해서 영향을 받을 수 있으므로 다음과 같이 여긴다.

- 실제 측정 시간 : `real_time = time + alpha`
- Alpha 값 : `alpha > 0 or alpha < 0`

그러나 클래스 마다 수집 속도에 대한 우위는 상대적이므로 우열을 가릴 수 있다.

|Class|Performance|
|:---:|:---:|
|Win32_Processor| 1.14s|
|Win32_ComputerSystem|0.047s|
|Win32_LogicalDisk|0.042s|
|Win32_DiskDrive|0.17s|
|Win32_PerfFormattedData_Counters_FileSystemDiskActivity|0.37s|
|Win32_ComputerSystemProduct|0.38s|
|Win32_SystemResources|0.169s|
|Win32_NetworkAdapter|0.217s|

## 4. Windows 환경에서 Remote WMI 수집을 허용하기

윈도우 환경에서 원격 WMI 접근을 기본적으로 차단하고 있다. 물론, 수집하려는 대상에 대해서 허용을 할 수 있다. 다음과 같은 절차가 반드시 필요로하다.

|참조|
|:---|
|1. [Enable WMI Remoting in Windows 10][2]|

```Powershell
$> Get-Service winrm # 서비스의 상태를 확인한다. Default 는 Stop 이다.
$> Enable-PSRemoting -Force # 강제로 구동한다. 
# or, $> Enable-PSRemoting -SkipNetworkProfileCheck
$> winrm quickconfig # 설정을 검증한다.

```

### 4.1. Trouble Shooting : Network Profile Check Step

PSRemoting 을 활성화 하는 경우 Network 프로파일 체크를 수행하여 아래와 같은 메시지를 출력한다.
이는 특정 네트워크 프로파일 중에 Public 인 것이 있으므로 이를 변경해야 함을 경고한다.

이 경우 아래와 같이 명령어를 입력하여 해결한다.
```Powershell
$> Enable-PSRemoting -SkipNetworkProfileCheck
```

```Powershell
Message = WinRM firewall exception will not work since one of the network connection types on this machine is set to Public. Change the network connection type to either Domain or Private and try again.
```

### 4.2. Security : Powershell Remoting Security

원격에서 Powershell Remoting 이 가능해진 만큼 Security Hardness 전략이 중요하다.

> PowerShell Remoting 및 WinRM은 다음 포트에서 수신 대기합니다.
>> - HTTP: 5985
>> - HTTPS: 5986

## 5. 결론 (Conclusion)

이번 토픽에서는 Ubuntu 환경에서 WMI 모듈을 빌드하고 이를 Python 인터페이스를 통해서 사용하는 과정을 살펴보았다. 이 내용은 shred 프로젝트에 큰 도움이 되는 요소라고 생각되며 다음과 같이 결론을 내린다.

- Ubuntu 12, 14, 16, 18 환경에서 WMI 모듈을 빌드
- winrm 서비스를 구동하여 WMI Remoting 을 허용
- wmi-client-wrapper 를 통해서 wmi 정보를 수집하는 python 코드
- wmi 클래스 원격 수집 성능 체크

<!-- Images Reference Links -->
[wmi-perf]: /assets/img/2018-11-17-Try-To-Collect-WMI-Info-In-Ubuntu/wmi_perf.png

<!-- External Reference Links -->

[1]: https://www.shellandco.net/wmic-command-ubuntu-16-04-lts/ "Wmic Command in Ubuntu 16.04 LTS"
[2]: https://stackoverflow.com/questions/38859777/windows-10-wmic-wmi-remote-access-denied-with-local-administrator "Windows 10 Enable Wmi Remoting"

---

<!-- End Of Documents -->
If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
