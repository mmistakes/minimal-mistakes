---
title: "[MSSQL] SQL Agent Job의 작업 알람 Slack 으로 전송하기"
excerpt: "SQL Agent Job 의 알람을 Slack 으로 전송하는 방법을 공유드립니다."
#layout: archive
categories:
 - Mssql
tags:
  - [mssql, sqlserver]
#permalink: mssql-first
toc: true
toc_sticky: true
date: 2024-09-14
last_modified_at: 2024-09-14
comments: true
---

MSSQL은 SQL Agent Job 이라는 이벤트 스케쥴러가 존재합니다. SSMS 을 이용하면 작업단계를 설정하여 원하는 시간에 반복적으로 수행할 수 있는 장점이 있기 때문에 일배치를 수행할 때 자주 사용합니다. 그런데 SQL Agent Job 의 작업 상태를 확인하기 위해서는 아래의 화면과 같이 SSMS 상에서 [관리] - [데이터베이스 메일] 에서 "데이터베이스 메일 구성" 에 들어가서 이메일 서버 주소와 SMTP Port, 이메일 표시 정보를 설정하여 알람을 받아야 합니다.

![데이터베이스 메일](https://github.com/user-attachments/assets/a80dad43-4bc9-429d-a58d-c39d13f06583)

그리고 작업속성에서 작업 완료 시 수행할 동작의 전자 메일을 체크해주면 메일 발송을 할 수 있습니다.

![SQL Agent Job 전자메일 활성화](https://github.com/user-attachments/assets/70f449c8-30e9-42d9-9e17-b699c34d2a2a)

그런데 문득 MSSQL의 SQL Agent Job 알람 기능이 불편하다는 생각이 들었습니다. 왜 메일전송만 UI를 제공할까? 다른 방법은 없을까? 메일보다 내부 메신저를 이용하는 회사들도 많은데 알람 방식이 다양해야하지 않을까? 라는 생각이 들었죠. 그래서 장애 및 모니터링 업무 대응 시 주로 사용하는 Slack 을 이용하여 알람을 받아보는 방법을 알아보게 되었습니다.

<br/>
### 💻SQL Agent Job 작업 결과를 Slack 으로 보내는 방법 
---
Ole Automation Procedures 설정을 활성화 하여 sp_OAMethod 를 호출하여 Slack 을 보내는 방법도 존재하지만 클라우드 플랫폼의 관리형 데이터베이스를 사용하고 있다면 아래와 같은 에러를 만나실 수 있습니다.

```
메시지
Executed as user: User Manager\ContainerAdministrator. Could not load the DLL odsole70.dll, or one of the DLLs it references. Reason: 2(The system cannot find the file specified.). [SQLSTATE 42000] (Error 17750)  Could not load the DLL odsole70.dll, or one of the DLLs it references. Reason: 2(The system cannot find the file specified.). 
[SQLSTATE 42000] (Error 17750)  Could not load the DLL odsole70.dll, or one of the DLLs it references. Reason: 2(The system cannot find the file specified.). [SQLSTATE 42000] (Error 17750)  Could not load the DLL odsole70.dll, or one of the DLLs it references. Reason: 2(The system cannot find the file specified.). [SQLSTATE 42000] (Error 17750)  Could not load the DLL odsole70.dll, or one of the DLLs it references. Reason: 2(The system cannot find the file specified.). [SQLSTATE 42000] (Error 17750)  Could not load the DLL odsole70.dll, or one of the DLLs it references. Reason: 2(The system cannot find the file specified.). [SQLSTATE 42000] (Error 17750).  The step failed.
```

<<<<<<< HEAD
dll 파일이 없어서 발생하는 에러인데요. 찾아보니 저희같은 Azure 의 관리형 DBMS 를 사용할 경우 기능을 지원하지 않았습니다. 그렇게 서칭을 하다가 SQL Agent Job 에 Powershell 코드를 삽입할 수 있다는 것을 알게 되었는데요. PowerShell이 가능하다면 PowerShell 코드를 통해 REST API 를 호출해서 Slack 전송을 하면 되는 것 아니야? 라는 생각이 들었고 부랴부랴 테스트를 하게 되었습니다.
=======
dll 파일이 없어서 발생하는 에러인데요. 찾아보니 저희같은 Azure 의 관리형 MSSQL DBMS를 사용할 경우 해당 기능이 지원이 불가능 한 것이었습니다.
그러게 서칭을 하다가 SQL Agent Job 에 Powershell 코드를 삽입할 수 있다는 것을 알게 되었습니다. 그렇다면 PowerShell을 통해 REST API 를 호출할 수 있다면 Slack 전송도 가능한것 아니야? 라는 생각이 들어 부랴부랴 테스트를 하게 되었습니다.
>>>>>>> 54ac5a0b1a2c78deb4bed78cfc2bdaf156cfb8b1



테스트 코드는 아래와 같습니다.

``` powershell
# 웹훅 주소
$webhookUrl = "슬랙웹훅주소"

# Slack 메시지 내용 구성
$payload = @{
    attachments = @(
        @{
            color = "#36a64f" 
            title = "발송테스트"
            text = "STATUS: completen`nMSG: 작업완료"  # n으로 줄 바꿈
            footer = "MSSQL Agent Job"
            ts = [int][double]::Parse((Get-Date -UFormat %s))  # 타임스탬프 추가
        }
    )
}

# Payload를 JSON으로 변환
$payloadJson = $payload | ConvertTo-Json -Depth 3

# UTF-8 인코딩을 명시적으로 지정하여 Webhook 호출
$utf8Encoding = [System.Text.Encoding]::UTF8
$bytes = [System.Text.Encoding]::UTF8.GetBytes($payloadJson)
$utf8Payload = [System.Text.Encoding]::UTF8.GetString($bytes)

# Webhook 호출하여 Slack으로 메시지 전송
Invoke-RestMethod -Uri $webhookUrl -Method Post -ContentType 'application/json; charset=utf-8' -Body $utf8Payload
```

<<<<<<< HEAD
<br/>

코드를 대략적으로 설명하면 다음과 같습니다.

**웹훅주소를 지정 변수**
=======

코드를 대략적으로 설명하면 다음과 같습니다.

- 웹훅주소를 지정하는 변수입니다.
>>>>>>> 54ac5a0b1a2c78deb4bed78cfc2bdaf156cfb8b1
 
```powershell
$webhookUrl = "슬랙웹훅주소"
```
<<<<<<< HEAD
위 변수에 url 주소를 입력하면 됩니다. 운영환경에 적용할 시에는 대부분 공인망은 막혀있을 것이므로 slack 용 proxy 서버를 하나 만들어서 경유해야합니다.
=======
- 위 변수에 url 주소를 입력하면 됩니다. 운영환경에 적용할 시에는 대부분 공인망은 막혀있을 것이므로 slack 용 proxy 서버를 하나 만들어서 경유해야합니다.
>>>>>>> 54ac5a0b1a2c78deb4bed78cfc2bdaf156cfb8b1

- Slack 메시지 내용 구성

```
$payload = @{
    attachments = @(
        @{
            color = "#36a64f"
            title = "발송테스트"
            text = "STATUS: complete`n`nMSG: 작업완료"  # `n으로 줄 바꿈
            footer = "MSSQL Agent Job"
            ts = [int][double]::Parse((Get-Date -UFormat %s))  # 타임스탬프 추가
        }
    )
}
```




![image](https://github.com/user-attachments/assets/40adc37a-aab5-4ede-a796-98f1f1819ff2)


```powershell
# PowerShell 스크립트 예제
$slackWebhookUrl = "http://웹훅주소"

# 전송할 메시지
$message = @{
    text = "Hello."
}

# JSON 형식으로 변환
$jsonMessage = $message | ConvertTo-Json

# Slack Webhook에 메시지 전송
Invoke-RestMethod -Uri $slackWebhookUrl -Method Post -Body $jsonMessage -ContentType "application/json"
```


<br/>

### 🙈ProxySQL 로그별 Filebeat 설정
---
이빅션 쓰레드는 한정된 공유캐시의 공간을 확보하기 위해 적절히 제거할 수 있는 페이지를 디스크 영역으로 동기화 시키는 작업을 수행하는데 이 때 하자드 포인터를 참조하여 공유 캐시에 제거 가능한지 여부를 확인합니다. 

사용자 쓰레드는 사용자의 쿼리를 처리하기 위해 WiredTiger 의 공유캐시를 참조할 때 먼저 하자드 포인터에 자신이 참조하는 페이지를 등록합니다. 그리고 사용자 쓰레드가 쿼리를 처리하는 동안 이빅션 쓰레드는 동시에 캐시에서 제거해야 할 데이터 페이지를 골라 캐시에서 삭제하는 작업을 실행합니다. 이때 "이빅션 쓰레드"는 적절히 제거할 수 있는 페이지(자주 사용되지 않는 페이지)를 골라 먼저 하자드 포인터에 등록돼 있는지 확인합니다.

WiredTiger 스토리지 엔진에서 사용할 수 있는 하자드 포인터의 최대 개수는 기본적으로 1,000개로 제한돼 있습니다. 만약 하자드 포인터의 개수가 부족해 WiredTiger 스토리지 엔진의 처리량이 느려진다면 WiredTiger 스토리지 엔진의 옵션을 변경하여 하자드 포인터의 최대 개수를 1,000개 이상으로 설정할 수 있습니다.

MongoDB 서버의 설정 파일을 이용해 하자드 포인터의 개수를 변경하려면, 다음과 같이 `configString` 옵션에 `hazard_max` 옵션을 설정합니다.

<br/>

### 📚개념확인
---
이빅션 쓰레드는 한정된 공유캐시의 공간을 확보하기 위해 적절히 제거할 수 있는 페이지를 디스크 영역으로 동기화 시키는 작업을 수행하는데 이 때 하자드 포인터를 참조하여 공유 캐시에 제거 가능한지 여부를 확인합니다. 

<br/>

### 🚀환경테스트
---
이빅션 쓰레드는 한정된 공유캐시의 공간을 확보하기 위해 적절히 제거할 수 있는 페이지를 디스크 영역으로 동기화 시키는 작업을 수행하는데 이 때 하자드 포인터를 참조하여 공유 캐시에 제거 가능한지 여부를 확인합니다. 

<br/>

### 😸문제해결
---
이빅션 쓰레드는 한정된 공유캐시의 공간을 확보하기 위해 적절히 제거할 수 있는 페이지를 디스크 영역으로 동기화 시키는 작업을 수행하는데 이 때 하자드 포인터를 참조하여 공유 캐시에 제거 가능한지 여부를 확인합니다. 

사용자 쓰레드는 사용자의 쿼리를 처리하기 위해 WiredTiger 의 공유캐시를 참조할 때 먼저 하자드 포인터에 자신이 참조하는 페이지를 등록합니다. 그리고 사용자 쓰레드가 쿼리를 처리하는 동안 이빅션 쓰레드는 동시에 캐시에서 제거해야 할 데이터 페이지를 골라 캐시에서 삭제하는 작업을 실행합니다. 이때 "이빅션 쓰레드"는 적절히 제거할 수 있는 페이지(자주 사용되지 않는 페이지)를 골라 먼저 하자드 포인터에 등록돼 있는지 확인합니다.

---

{% assign posts = site.categories.Mssql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}