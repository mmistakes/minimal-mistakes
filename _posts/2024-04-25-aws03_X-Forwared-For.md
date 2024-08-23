---
layout: single
title:  "X-Forwared-For란?"
categories: [AWS]
tag: [AWS]
toc: true
toc_sticky: true
post-header: false

---

# X-Forwared-For

### X-Forwared-For 헤더

단순히 포트만 열어두고 Application 서비스를 올리는 경우가 아닌 NGINX 및 AWS CloudFront 또는 Application Load Balancer 같이 앞단에 프록시 서버를 두는 경우가 있다.

이러한 경우 앱 서버(WAS)는 유저의 request가 리버스 프록시를 통해 접속하는데, 이 경우 서버의 접속 로그에 찍히는 IP는 리버스 프록시 서버의 IP(Private IP)만 가져온다. 출처를 알 수 없음

![스크린샷 2024-08-22 오후 1.48.39.png](/assets/images/aws03/01.png)

이러한 문제를 해결하기 위해 표준헤더인 X-Forwarded-For가 등장하게 되고, HTTP 헤더에 타고 있는 X-Forwarded-For를 통해 프록시 및 로드밸런서 아이피를 기록한다.

> X-Forwared-For: &lt;client&gt;, &lt;proxy1&gt;, &lt;proxy2&gt;
> 

HTTP HEAD에 타고 있는 형태로 구성되며, client IP → Proxy Server1 → Proxy Server2 → … 순차적으로 추가되는 방식으로 구성

이 설정은 각 프록시 서버별로 세팅이 필요하거나 자동으로 해더에 같이 넣어줌

- AWS ELB → 자동으로 X-Forwarded-For 헤더가 추가되거나 새롭게 생성

즉, 순차적으로 서버를 넘어가면서 받은 아이피를 기록하는 해더에서 실제 출처 IP를 찾을 수 있다.