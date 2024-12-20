---
layout: single
title:  "Unity와 데이터베이스 연동하기"
categories: 데이터베이스
tag: [Unity, MySQL, DB연동]
toc: true # 오른쪽 UI 목차 기능
author_profile: false # 좌측 프로필 표시 기능
sidebar:
    nav: "docs" # 네비게이션 설정

search: true # 블로그 검색 기능 노출 여부
---

# Unity와 MySQL 데이터베이스 연동하기

Unity와 MySQL을 연동하여 게임 데이터와 같은 중요한 정보를 효율적으로 저장하고 관리하는 방법을 소개한다. 이 글에서는 MySQL 설치부터 Unity와의 연동 과정까지 단계별로 설명하며, 초보자도 쉽게 따라 할 수 있도록 작성하였다.



---

## 1. MySQL 설치하기



### MySQL 다운로드 및 설치 (MySQL Community 8.0)

MySQL은 전 세계적으로 가장 널리 사용되는 관계형 데이터베이스(RDBMS) 중 하나이다. 데이터를 체계적으로 저장하고 관리할 수 있는 강력한 도구이다. Unity와의 연동을 위해 먼저 MySQL을 설치해야 한다.

1. [MySQL 다운로드 페이지](http://dev.mysql.com/downloads/windows/installer/)에 접속한다.
2. Windows용 MySQL Installer를 다운로드하고 실행한다.
3. 설치 중 기본 설정을 유지하며, `root` 사용자 비밀번호를 기억해 둔다. 이 비밀번호는 이후 데이터베이스에 접속할 때 필요하다.

설치가 완료되면 MySQL Workbench를 통해 데이터베이스를 생성하고 관리할 준비가 완료된다.



---

## 2. MySQL Workbench를 사용한 데이터베이스 생성

MySQL Workbench는 MySQL을 시각적으로 관리할 수 있는 GUI 도구이다. 이를 통해 데이터베이스(Schema)와 테이블을 쉽게 생성할 수 있다.



### 1) Schema 생성

1. MySQL Workbench를 실행한 뒤, `root` 사용자 계정으로 로그인한다.
2. 왼쪽 스키마(Schema) 탭에서 **Create Schema** 버튼을 클릭한다.
3. 스키마 이름(예: `testdb`)을 입력하고 **Apply** 버튼을 클릭하여 생성한다.

Schema는 데이터를 저장하는 기본 단위로, 테이블(Table)을 포함한다.



### 2) Table 생성

Schema를 생성한 뒤, 다음과 같은 과정을 통해 테이블을 추가한다:

1. 생성한 스키마(`testdb`)를 선택한 상태에서 **Create Table** 버튼을 클릭한다.
2. 테이블 이름을 `user`로 설정하고, 아래와 같은 필드를 추가한다:

| Column Name | Data Type     | Constraints            |
|-------------|---------------|------------------------|
| Num         | INT           | Primary Key, Not Null |
| id          | VARCHAR(20)   | Not Null              |
| pwd         | VARCHAR(20)   | Not Null              |

3. 모든 필드 설정을 완료한 후 **Apply** 버튼을 클릭하여 테이블을 생성한다.

테이블은 데이터를 저장하는 구조이다. 위 예시에서는 사용자 정보를 저장하기 위한 간단한 테이블을 만들었다.



---



## 3. Unity와 MySQL 연동

MySQL 데이터베이스를 Unity 프로젝트에서 사용하려면 MySQL Connector를 설치하고, Unity에서 데이터베이스와 통신할 코드를 작성해야 한다.



### 1) MySQL Connector 설치

MySQL Connector는 Unity와 MySQL 간의 통신을 가능하게 하는 드라이버이다. 아래 과정을 따라 설치한다:

1. [MySQL Connector 다운로드 페이지](https://dev.mysql.com/downloads/connector/net/)에 접속한다.
2. **ADO.NET Driver for MySQL**을 다운로드하여 설치한다.

설치가 완료되면 Unity 프로젝트에서 이 드라이버를 사용할 수 있다.



### 2) Unity 프로젝트 설정

1. Visual Studio에서 새로운 Unity 프로젝트를 생성한다.
2. Unity 프로젝트 탐색기에서 `NuGet 패키지 관리자`를 열고 MySQL 라이브러리를 추가한다.
   - 예: `MySql.Data`를 검색하여 설치한다.
   - 

### 3) DBManager 스크립트 작성

Unity에서 데이터베이스와 통신하기 위한 스크립트를 작성한다. 아래는 기본적인 데이터 삽입 예제이다:

```csharp
using System;
using MySql.Data.MySqlClient;
using UnityEngine;

public class DBManager : MonoBehaviour
{
    private string connectionString = "Server=localhost;Database=testdb;User=root;Password=0000;";

    public void InsertData()
    {
        using (MySqlConnection conn = new MySqlConnection(connectionString))
        {
            try
            {
                conn.Open();
                string query = "INSERT INTO user (Num, id, pwd) VALUES (1, 'test', '0000');";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                Debug.Log("Data Inserted Successfully");
            }
            catch (Exception ex)
            {
                Debug.LogError("Database Error: " + ex.Message);
            }
        }
    }
}
```

이 스크립트는 `user` 테이블에 데이터를 삽입하는 역할을 한다. 필요에 따라 조회, 수정 등의 기능을 추가할 수 있다.



---

## 4. Unity에서 데이터 확인



1. Unity 에디터에서 빈 게임 오브젝트를 생성한다.
2. 생성한 오브젝트에 `DBManager` 스크립트를 추가한다.
3. 스크립트의 메서드를 호출하여 데이터를 삽입하거나 확인한다.
4. Unity 콘솔 창에서 삽입 성공 메시지를 확인할 수 있다.

이 과정을 통해 MySQL 데이터베이스와 Unity 프로젝트 간의 연동이 완료된다.



---



위 과정을 따라하면 Unity와 MySQL 간의 데이터를 효율적으로 관리할 수 있다. 이 연동은 사용자 정보 관리, 게임 진행 데이터 저장 등 다양한 용도로 활용할 수 있다. 데이터 조회, 수정 기능을 추가 구현하여 더욱 강력한 시스템을 구축해 보자.
