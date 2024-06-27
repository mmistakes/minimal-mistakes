---
layout: single
title:  "데이터 베이스 관리자 역활"
categories: DataBase
tag: [DataBase, manager, role]
toc: true
author_profile: false
published: true
---
**[공지사항]** [본 블로그에 포함된 모든 정보는 교육 목적으로만 제공됩니다.](https://weoooo.github.io/notice/notice/)
{: .notice--danger}
## 📖개요

데이터베이스의 관리자, 특히 'root' 사용자처럼 모든 권한을 가진 사용자는 데이터베이스 시스템에서 매우 광범위한 작업을 수행할 수 있습니다. 

이러한 작업들은 데이터베이스의 설정 및 유지관리, 보안 관리, 데이터 조작 및 구조 변경 등을 포함합니다. 

아래는 데이터베이스 관리자가 수행할 수 있는 주요 작업들입니다😊

### 데이터베이스 구조 관리

**CREATE**: 새로운 데이터베이스, 테이블, 뷰 등을 생성합니다.
{: .notice--danger}
**ALTER**: 기존 데이터베이스 객체(테이블, 뷰 등)의 구조를 변경합니다.
{: .notice--danger}
**DROP**: 데이터베이스, 테이블, 뷰 등을 삭제합니다.
{: .notice--danger}
**INDEX**: 인덱스를 생성 및 삭제하여 데이터 조회 성능을 최적화합니다.
{: .notice--danger}
**CREATE VIEW**: 특정 쿼리 결과를 뷰로 저장하여 재사용합니다.
{: .notice--danger}
**CREATE TEMPORARY TABLES**: 임시 테이블을 생성하여 일시적으로 데이터를 저장합니다.
{: .notice--danger}

### 데이터 조작 및 조회

**SELECT**: 테이블의 데이터를 조회합니다.
{: .notice--danger}
**INSERT**: 테이블에 데이터를 삽입합니다.
{: .notice--danger}
**UPDATE**: 테이블의 데이터를 수정합니다.
{: .notice--danger}
**DELETE**: 테이블의 데이터를 삭제합니다.
{: .notice--danger}
**EXECUTE**: 저장 프로시저 및 함수를 실행합니다.
{: .notice--danger}
### 사용자 및 권한 관리

**CREATE USER**: 새로운 데이터베이스 사용자를 생성합니다.
{: .notice--danger}
**GRANT**: 사용자의 권한을 부여합니다.
{: .notice--danger}
**REVOKE**: 사용자의 권한을 회수합니다.
{: .notice--danger}
**SHOW GRANTS**: 사용자가 가지고 있는 권한을 조회합니다.
{: .notice--danger}
### 서버 관리

**SHUTDOWN**: 데이터베이스 서버를 종료합니다.
{: .notice--danger}
**RELOAD**: 데이터베이스 서버를 다시 로드하거나 캐시를 새로 고칩니다.
{: .notice--danger}
**PROCESS**: 서버의 프로세스 목록을 조회하여 현재 실행 중인 쿼리나 프로세스를 확인합니다.
{: .notice--danger}
**SHOW DATABASES**: 서버에 존재하는 모든 데이터베이스 목록을 조회합니다.
{: .notice--danger}
### 데이터 및 파일 관리

**FILE**: 데이터베이스 서버의 파일 시스템에 접근하여 파일을 읽거나 쓸 수 있습니다.
{: .notice--danger}
**LOCK TABLES**: 테이블을 잠가서 다른 사용자가 동시에 수정하지 못하도록 합니다.
{: .notice--danger}
### 복제 및 백업

**REPLICATION CLIENT**: 서버의 복제 상태를 확인합니다.
{: .notice--danger}
**REPLICATION SLAVE**: 복제된 서버로서 데이터 동기화를 수행합니다.
{: .notice--danger}
### 보안 관리

**SUPER**: 다양한 관리자 작업을 수행할 수 있습니다. 예를 들어, 사용자의 연결을 강제로 종료하거나, 전역 변수 설정을 변경할 수 있습니다.
{: .notice--danger}
**CREATE ROUTINE**: 저장 프로시저와 함수를 생성합니다.
{: .notice--danger}
**ALTER ROUTINE**: 저장 프로시저와 함수를 수정합니다.
{: .notice--danger}
**SHOW VIEW**: 뷰의 정의를 조회합니다.
{: .notice--danger}
## 🛠️결론

이러한 권한을 가진 데이터베이스 관리자는 데이터베이스 시스템의 모든 측면을 관리할 수 있습니다. 

따라서 이러한 권한을 가진 계정은 반드시 강력한 보안 조치를 통해 보호해야 합니다. 예를 들어, 강력한 비밀번호 정책, 이중 인증, 접근 제어 목록 설정 등을 통해 관리자의 계정이 악용되지 않도록 해야 합니다.
