---
layout: single
title: "[mysql] 구글 코랩에서 mysql 서버 설치 후 실습 환경 만들기"
classes: wide
categories:
  - mysql
---  

# [Colab] 구글 코랩에 MySQL 서버 설치하고 데이터베이스 실습 환경 구축하기 (feat. 구글 드라이브 연동)  
 - 구글 코랩(Google Colab)은 웹 브라우저에서 파이썬 실습을 할 수 있는 아주 강력한 도구입니다. 하지만 기본적으로 휘발성 세션이기 때문에, 세션이 끊기면 데이터베이스에 저장했던 데이터나 설정이 모두 사라진다는 단점이 있습니다.
 - 이 문제를 해결하기 위해 구글 드라이브(Google Drive)와 코랩을 연동하여 백업 및 복구 프로세스를 구축하고, 코랩 환경에서 깨끗하게 MySQL을 재설치하여 실습하는 방법을 단계별로 소개합니다.

## 1. 구글 드라이브 연동하기
 - 가장 먼저 실습 데이터와 SQL 백업 파일을 영구적으로 저장할 구글 드라이브를 코랩에 마운트(연동)합니다.
```
from google.colab import drive
drive.mount('/content/drive')
```
  - 실행 후 나타나는 팝업창에서 구글 계정 로그인 및 권한 허용을 완료해 주세요.

## 2. DB 서버 저장 폴더 생성
 - 구글 드라이브 내에 MySQL 백업 파일(.sql)들을 보관할 전용 폴더를 생성합니다. 리눅스 명령어 mkdir -p를 사용하면 상위 폴더가 없어도 한 번에 안전하게 생성할 수 있습니다.
```
!mkdir -p /content/drive/MyDrive/mysql_data_com33
```
## 3. MySQL 서버 클린 설치 및 실행
 - 코랩 환경에 기존 패키지 꼬임이나 권한 문제가 있을 수 있으므로, 기존 프로세스를 종료하고 완전히 초기화한 후 깨끗한 상태로 재설치하는 과정입니다. 블록을 그대로 복사해서 실행하시면 됩니다.

```
# 1. 기존 실행 중인 mysql 프로세스 강제 종료
!pkill -9 mysqld

# 2. 꼬인 패키지 설정 데이터베이스 복구 및 락 파일 삭제
!rm /var/lib/dpkg/lock-frontend
!rm /var/lib/dpkg/lock
!dpkg --configure -a

# 3. MySQL 관련 패키지 완전히 삭제 (설정 파일 및 기존 데이터 포함)
!apt-get purge -y mysql-server mysql-client mysql-common mysql-server-8.0 mysql-client-8.0
!apt-get autoremove -y
!apt-get autoclean

!rm -rf /var/lib/mysql
!rm -rf /var/run/mysqld

# 4. 패키지 업데이트 및 MySQL 최신 버전 재설치
!apt-get update
!apt-get install mysql-server -y

# 5. 권한 설정 (중요: 로컬 소켓 경로 및 권한 부여)
!mkdir -p /var/run/mysqld
!chown -R mysql:mysql /var/run/mysqld
!chmod 777 /var/run/mysqld

# 6. MySQL 서비스 시작
!service mysql start
```

## 4. 백업 데이터 불러오기
 - 새로운 세션을 열었거나 DB를 초기화했다면, 이전에 구글 드라이브에 저장해 두었던 .sql 파일들을 가져와 복구해야 합니다.
 - 데이터베이스를 먼저 생성한 뒤, 리다이렉션 기호(<)를 이용해 백업 파일을 밀어 넣습니다. (초기 root 계정은 비밀번호가 설정되어 있지 않습니다.)
   
```
# 실습에 필요한 데이터베이스 생성 (존재하지 않을 때만 생성)
!mysql -u root -e "CREATE DATABASE IF NOT EXISTS com3300";
!mysql -u root -e "CREATE DATABASE IF NOT EXISTS 학교DB";

# 구글 드라이브의 SQL 백업 파일을 생성된 DB에 불러오기
!mysql -u root --password='' com3300 < /content/drive/MyDrive/mysql_data_com33/backup.sql
!mysql -u root --password='' mysql < /content/drive/MyDrive/mysql_data_com33/mysql.sql
!mysql -u root --password='' 학교DB < /content/drive/MyDrive/mysql_data_com33/학교DB.sql
```

## 5. 실습 데이터 저장하기

```
# 백업 전 데이터베이스 존재 여부 체크
!mysql -u root -e "CREATE DATABASE IF NOT EXISTS com3300;"
!mysql -u root -e "CREATE DATABASE IF NOT EXISTS 학교DB;"

# mysqldump를 이용하여 구글 드라이브로 SQL 백업 파일 내보내기
!mysqldump -u root --password='' com3300 > /content/drive/MyDrive/mysql_data_com33/backup.sql
!mysqldump -u root --password='' mysql > /content/drive/MyDrive/mysql_data_com33/mysql.sql
!mysqldump -u root --password='' 학교DB > /content/drive/MyDrive/mysql_data_com33/학교DB.sql
```

<img width="3146" height="1099" alt="image" src="https://github.com/user-attachments/assets/bb84af22-21a9-4267-8c9a-1277714df554" />

<img width="1868" height="1309" alt="image" src="https://github.com/user-attachments/assets/97ac5c69-b617-4178-84d8-41869e736d13" />  

<img width="1858" height="895" alt="image" src="https://github.com/user-attachments/assets/f3fe27da-1e73-483f-9d3f-f727224b97b4" />

<img width="1850" height="1219" alt="image" src="https://github.com/user-attachments/assets/09946b8c-097e-45f5-bb7b-8e86d3cdabb2" />

