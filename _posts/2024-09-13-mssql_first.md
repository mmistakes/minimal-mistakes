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

⚠️ MSSQL 이벤트 스케쥴러, SQL Server Agent Job의 다소 아쉬운 알람 방식

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

dll 파일이 없어서 발생하는 에러인데요. 찾아보니 저희같은 Azure의 관리형 DBMS 를 사용할 경우 기능을 지원하지 않았습니다. 그렇게 서칭을 하다가 SQL Agent Job 에 Powershell 코드를 삽입할 수 있다는 것을 알게 되었는데요. PowerShell이 가능하다면 PowerShell 코드를 통해 REST API 를 호출해서 Slack 전송을 하면 되는 것 아니야? 라는 생각이 들었고 부랴부랴 테스트를 하게 되었습니다. 



🙈 테스트

SQL Agent Job의 작업단계를 아래 그림과 같이 새로 추가하고 코드를 입력합니다. 단계이름을 작성해 주고 "유형" 란에 PowerShell 을 선택한 후 코드를 삽입합니다.

![SQL Agent Job 에 Step 추가](https://github.com/user-attachments/assets/40adc37a-aab5-4ede-a796-98f1f1819ff2)


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
$payloadJson = $payload | ConvertTo-Json

# UTF-8 인코딩을 명시적으로 지정하여 Webhook 호출
$utf8Encoding = [System.Text.Encoding]::UTF8
$bytes = [System.Text.Encoding]::UTF8.GetBytes($payloadJson)
$utf8Payload = [System.Text.Encoding]::UTF8.GetString($bytes)

# Webhook 호출하여 Slack으로 메시지 전송
Invoke-RestMethod -Uri $webhookUrl -Method Post -ContentType 'application/json; charset=utf-8' -Body $utf8Payload
```


코드를 설명하면 다음과 같습니다.



**웹훅 주소 지정**

``` powershell
$webhookUrl = "슬랙웹훅주소"
```


위 변수에다 사용할 슬랙웹훅주소를 입력합니다. 공인 outbound 가 막혀있다면 슬랙 전용 proxy 서버의주소를 써야합니다.


**Slack 메시지 내용 구성**

``` powershell
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

```$payload``` 변수에 슬랙 메시지의 내용을 구성하는 attachments 정보를 설정합니다.



**Slack 메시지 내용 구성**

```powershell
# Payload를 JSON으로 변환
$payloadJson = $payload | ConvertTo-Json
```

REST API 호출 시 Body 는 Json 객체여야 합니다. 이를 위해 컨버팅 하는 작업입니다.



**한글 깨짐 방지 인코딩**

```powershell
# UTF-8 인코딩을 명시적으로 지정하여 Webhook 호출
$utf8Encoding = [System.Text.Encoding]::UTF8
$bytes = [System.Text.Encoding]::UTF8.GetBytes($payloadJson)
$utf8Payload = [System.Text.Encoding]::UTF8.GetString($bytes)
```

한글을 보낼경우 깨질 수 있기 때문에 UTF8 인코딩을 합니다.


```powershell
# Webhook 호출하여 Slack으로 메시지 전송
Invoke-RestMethod -Uri $webhookUrl -Method Post -ContentType 'application/json; charset=utf-8' -Body $utf8Payload
```

```Invoke-RestMethod``` 명령어는 REST API 호출을 위한 전용 명령어입니다. Slack 의 웹훅 URL 에 POST 요청을 보냅니다.



**결과 확인**

아래 그림과 같이 슬랙으로 메시지가 전송된 것을 확인할 수 있었습니다.

![Slack 발송 확인](https://github.com/user-attachments/assets/98e0dc1a-e93f-45e5-9e85-934eb213b43c)


<br/>

### 🚀고도화 - SQL Agent Job 의 Slack 알람 보내기
---
그렇다면 현재 코드에 살을 입혀 좀더 고도화를 해보면 좋을 것 같습니다. 

필요한 것이라하면 아래 정도가 됩니다.

- 스케쥴링된 작업들의 작업 이상여부 판단 로직
- 이상여부에 따라 다른 메시지 출력("작업성공" or "작업실패")
- 메시지 색상(작업실패:빨간색, 작업성공:초록색)

위의 요건들을 고려하여 코드를 추가로 만들어 줍니다. 테스트 코드는 아래와 같습니다.

```powershell

# 변수 설정
$JobName = "$(ESCAPE_SQUOTE(JOBNAME))"  # JOBNAME을 가져오는 코드

$webhookUrl = "http://hooks.slack.com.local.wavve.com/services/TPCTZ84AK/B048GQ98CLA/MBQXEQ0gwVKO9ATy2QODANyc"

# SQL Server 연결 정보
$serverInstance = "qa-sql-prdb-paas.076dab551c44.database.windows.net"
$database = "msdb"
$username = "wavve"               # SQL Server 로그인 사용자 이름
$password = "ew(0dv7}xoa>d}"       # SQL Server 로그인 비밀번호

# SQL 쿼리: 각 Job 단계의 상태 및 메시지 가져오기
$query = @"
SELECT TOP (select max(st.step_id)-1 
			from msdb.dbo.sysjobsteps st 
			inner join msdb.dbo.sysjobs j on st.job_id = j.job_id
			where j.name = '$JobName'
			)
   CONCAT('[SQLAgentJob] - ', j.name) AS JobName,
   h.step_name  AS StepName,
   message AS Msg, 
   CASE WHEN run_status = 1 THEN 'Success'
        WHEN run_status = 0 THEN 'Failure'
        WHEN run_status = 2 THEN 'Retry'
        WHEN run_status = 3 THEN 'Canceled'    
        ELSE 'Unknown'             
        END AS JobStatus,
   CASE 
        WHEN run_status = 1 THEN '#36a64f'  -- 성공(초록색)
        WHEN run_status = 0 THEN '#ff0000'  -- 실패(빨간색)
        WHEN run_status = 2 THEN '#ffcc00'  -- 재시도(노란색)
        WHEN run_status = 3 THEN '#808080'  -- 취소(회색)
        ELSE '#000000'  -- 알 수 없음(검정색)
   END AS JobColorCode   
FROM msdb.dbo.sysjobhistory h
  LEFT JOIN msdb.dbo.sysjobs j 
ON h.job_id = j.job_id
  LEFT JOIN (SELECT job_id, run_requested_date, stop_execution_date FROM msdb.dbo.sysjobactivity) a
ON a.job_id = h.job_id
WHERE 1=1
 AND j.name = '$JobName'
ORDER BY instance_id DESC;
"@

# SQL Server에서 Job 상태 조회
$connectionString = "Server=$serverInstance;Database=$database;User ID=$username;Password=$password;"
$queryResult = Invoke-Sqlcmd -ConnectionString $connectionString -Query $query

# SQL 결과 출력 (디버깅용)
Print $queryResult

# Slack 메시지 내용 구성
try {
    foreach ($result in $queryResult) {
        $jobname = $result.JobName
        $stepname = $result.StepName
        $status = $result.JobStatus
        $msg = $result.Msg
        $jobcolorcode = $result.JobColorCode
        

        # Slack에 보낼 Payload 구성
        $payload = @{
            attachments = @(
                @{
                    color = $jobcolorcode
                    title = "$jobname"
                    text = "STEP: $stepname`nSTATUS: $status`nMSG: $msg"  # `n으로 줄 바꿈
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
    }
} catch {
    Write-Host "Error during processing: $_"
}

```


코드를 설명하면 다음과 같습니다.



**웹훅 주소 지정**

``` powershell
$webhookUrl = "슬랙웹훅주소"
```




**결과 확인**

아래 그림과 같이 슬랙으로 메시지가 전송된 것을 확인할 수 있었습니다.

![Slack 발송 확인](https://github.com/user-attachments/assets/67a891aa-9e21-4e36-b8f1-df65f54e5a0e)

<br/>

### 😸보완할 점 - SQL Agent Job 의 Slack 알람 보내기
---
이빅션 쓰레드는 한정된 공유캐시의 공간을 확보하기 위해 적절히 제거할 수 있는 페이지를 디스크 영역으로 동기화 시키는 작업을 수행하는데 이 때 하자드 포인터를 참조하여 공유 캐시에 제거 가능한지 여부를 확인합니다. 

사용자 쓰레드는 사용자의 쿼리를 처리하기 위해 WiredTiger 의 공유캐시를 참조할 때 먼저 하자드 포인터에 자신이 참조하는 페이지를 등록합니다. 그리고 사용자 쓰레드가 쿼리를 처리하는 동안 이빅션 쓰레드는 동시에 캐시에서 제거해야 할 데이터 페이지를 골라 캐시에서 삭제하는 작업을 실행합니다. 이때 "이빅션 쓰레드"는 적절히 제거할 수 있는 페이지(자주 사용되지 않는 페이지)를 골라 먼저 하자드 포인터에 등록돼 있는지 확인합니다.

---

{% assign posts = site.categories.Mssql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}