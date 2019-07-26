---
layout: post
title:  "DNS 싱크홀(Sinkhole) 을 이용한 사내 보안"
subtitle: "간편한 해킹 대응 (C2 서버 차단 편)"
author: "코마"
date:   2019-03-02 14:00:00 +0900
categories: [ "security", "dns", "sinkhole" ]
excerpt_separator: <!--more-->
---

안녕하세요 코마입니다. 오늘은 사내 내부 보안을 비용없이 강화하는 방법을 알아보겠습니다. 이른바 DNS 싱크홀이라고 불리는 방법입니다.

<!--more-->

# 개요

해커에 의해서 악성 봇 혹은 백도어가 침투하였다고 가정해봅시다. 내부 망에 침투한 프로그램은 사용자 몰래 더 깊숙히 내부에 침투하거나 정보를 수집하여 외부로 빼돌립니다. 그렇다면 어떻게 해야 이를 효과적으로 막을 수 있을까요?

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 수평형 광고 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7572151683104561"
     data-ad-slot="5543667305"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# DNS 싱크홀

DNS 싱크홀이라는 방법을 통해서 C2 서버의 통신을 차단할 수 있습니다. 이 방법은 내부 DNS 서버를 이용하는 방법인데요. 

- [KISA 보호나라 DNS 싱크홀 서비스 신청](https://www.krcert.or.kr/webprotect/dnsSinkhole.do)