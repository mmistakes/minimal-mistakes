---
layout: single
title: Secuguard SSE Agent 재설치
categories: Other Tips
tags:
  - Tips
  - TroubleShooting
  - Linux
  - ThirdParty
---
취약점 점검 솔루션 Secuguard 관련 내용입니다.

netstat -tnlp 30041

\-> process name은 ssed 인 것 같다.

```
pkill -9 -ef PROCESS_NAME
```

rm -rf /opt/SSExplorer  
  
**rm -rf /usr/lib/systemd/system/ssed.service**

얘 때문에 재설치 시 오류가 발생하는 것 같다.
