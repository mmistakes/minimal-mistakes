---
title: \[MySQL] Stored Procedure 확인 및 수정

categories: 
   - Mysql
   - Command
tags:
   - mysql
   - procedure
   
author_profile: true #작성자 프로필 출력여부
read_time: true # read_time을 출력할지 여부 1min read 같은것!

toc: true #Table Of Contents 목차 보여줌
toc_label: "My Table of Contents" # toc 이름 정의
toc_icon: "cog" # font Awesome아이콘으로 toc 아이콘 설정 
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

last_modified_at: 2020-02-24T10:00:00 # 마지막 변경일

---

# STORED PROCEDURE 확인
---

## 모든 DB의 저장된 procedure들 확인

```sql
mysql> show procedure status
```

## 특정 DB의 저장된 procedure들 확인

```sql
mysql> show procedure status where db='[DB명]';
```

## PROCEDURE의 코드 보기

```sql
mysql> show create procedure [DB명].[PROCEDURE명];
```

# Reference

* [TickTalk](https://welchsy.tistory.com/261)


{% include outro %}
