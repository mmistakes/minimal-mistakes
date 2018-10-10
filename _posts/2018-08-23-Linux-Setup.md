---
title: 20180823 Linux 셋업
key: 20180824
tags: ubuntu linux setup
---

Ubuntu 머신의 IP 를 갑작스럽게 변경해야할 때, 혹은 시스템의 설정을 변경 할 때 ...

<!-- more -->

# IP 변경 이슈

현재 운용 중인 서버의 IP 를 변경해야 하는 경우

## Ubuntu 16.04

아래의 파일을 변경한다.
{% highlight bash %}
vim /etc/network/interfaces
{% endhighlight %}

유동 아이피 설정
```
# The primary network interface
auto enp0s3
iface enp0s3 inet dhcp
```

```
# The primary network interface
auto enp0s3
iface enp0s3 inet static
address xxx.xxx.xxx.xxx
netmask xxx.xxx.xxx.xxx
gateway xxx.xxx.xxx.xxx
dns-nameservers xxx.xxx.xxx.xxx
```

파일 수정 후 네트워크 재시작
```
systemctl restart networking.service
```

위의 명령어 이후에도 IP가 변경되지 않는다면?
```
reboot
```

---


If you like the post, don't forget to give me a start :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=gbkim1988&repo=gbkim1988.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
