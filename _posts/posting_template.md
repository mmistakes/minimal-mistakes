---
title: "제목"
excerpt: "요약글"
#layout: archive
categories:
 - 카테고리
tags:
  - [태그리스트]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-09-14
last_modified_at: 2024-09-14
comments: true
---
### 🚀부제목1
!["MySQL아키텍쳐"](https://github.com/user-attachments/assets/4443fdb1-0de8-46bb-904d-8cc0b7f06cac "MySQL 아키텍처")

본문

---

### 🚀부제목2
#### 소제목1
본문

---

### 🚀부제목3
#### 소제목1
본문



### 코드카피하기
참고 : https://kosate.github.io/blog/blogs/how-to-add-copy-button-into-jekyll-blogs/
예시 : 아래 

{% include codeHeader.html name="file-name" %}
```someLanguage
code goes in here!
```

<details><summary>rds_cli_ouput.json</summary>
<div markdown="1">

```json

{
    "DBInstances": [
        {
            "DBInstanceIdentifier": "xxxxxxx",
            "DBInstanceClass": "db.r6g.xlarge",
            "Engine": "mariadb",
            "DBInstanceStatus": "available",
            "MasterUsername": "xxxxxxx",
            "DBName": "xxxxxxx",
            "Endpoint": {
                "Address": "xxxxxxx.xxxxxxx.ap-northeast-2.rds.amazonaws.com",
                "Port": 3306,
                "HostedZoneId": "xxxxxxx"
            },
            "AllocatedStorage": 1024,
            "InstanceCreateTime": "2022-10-26T04:15:32.224000+00:00",
            "PreferrexxxxxxxckupWindow": "16:39-17:09",
            "BackupRetentionPeriod": 7,
            "DBSecurityGroups": [],
            "VpcSecurityGroups": [
                {
                    "VpcSecurityGroupId": "sg-xxxxxxx",
                    "Status": "active"
                }
            ],
            "DBParameterGroups": [
                {
                    "DBParameterGroupName": "xxxxxxx-xxxxxxx-paramter-group",
                    "ParameterApplyStatus": "in-sync"
                }
            ],
            "AvailabilityZone": "ap-northeast-2c",
            "DBSubnetGroup": {
                "DBSubnetGroupName": "xxxxxxx-subnet",
                "DBSubnetGroupDescription": "xxxxxxx-subnet",
                "VpcId": "vpc-0ebe885553344eaac",
                "SubnetGroupStatus": "Complete",
                "Subnets": [
                    {
                        "SubnetIdentifier": "subnet-xxxxxxx",
                        "SubnetAvailabilityZone": {
                            "Name": "ap-northeast-2c"
                        },
                        "SubnetOutpost": {},
                        "SubnetStatus": "Active"
                    },
                    {
                        "SubnetIdentifier": "subnet-xxxxxxx",
                        "SubnetAvailabilityZone": {
                            "Name": "ap-northeast-2a"
                        },
                        "SubnetOutpost": {},
                        "SubnetStatus": "Active"
                    }
                ]
            },
            "PreferredMaintenanceWindow": "mon:19:29-mon:19:59",
            "PendingModifiedValues": {},
            "LatestRestorableTime": "2022-11-21T05:55:00+00:00",
            "MultiAZ": true,
            "EngineVersion": "xxxxxxx",
            "AutoMinorVersionUpgrade": false,
            "ReadReplicaDBInstanceIdentifiers": [
                "xxxxxxx",
                "xxxxxxx",
                "xxxxxxx"
            ],
            "LicenseModel": "general-public-license",
            "OptionGroupMemberships": [
                {
                    "OptionGroupName": "default:xxxxxxx",
                    "Status": "in-sync"
                }
            ],
            "SecondaryAvailabilityZone": "ap-northeast-2a",
            "PubliclyAccessible": false,
            "StorageType": "xx",
            "DbInstancePort": 0,
            "StorageEncrypted": false,
            "DbiResourceId": "db-xxxxxxx",
            "CACertificateIdentifier": "rds-ca-2019",
            "DomainMemberships": [],
            "CopyTagsToSnapshot": true,
            "MonitoringInterval": 0,
            "DBInstanceArn": "arn:aws:rds:ap-northeast-2:882241623684:db:xxxxxxx",
            "IAMDatabaseAuthenticationEnabled": false,
            "PerformanceInsightsEnabled": false,
            "EnabledCloudwatchLogsExports": [
                "error",
                "slowquery",
                "audit"
            ],
            "DeletionProtection": true,
            "AssociatedRoles": [],
            "TagList": [
                {
                    "Key": "default-info",
                    "Value": "xxxxxxx"
                },
                {
                    "Key": "xxxxxxx-xxxxxxx",
                    "Value": "xxxxxxx"
                },
                {
                    "Key": "xxxxxxx-application",
                    "Value": "mariadb"
                },
                {
                    "Key": "xxxxxxx-resource",
                    "Value": "xxxxxxx"
                },
                {
                    "Key": "xxxxxxx-xxxxxxx",
                    "Value": "xxxxxxx"
                },
                {
                    "Key": "xxxxxxx-xxxxxxx",
                    "Value": "xxxxxxx"
                },
                {
                    "Key": "xxxxxxx-category",
                    "Value": "cmsband"
                },
                {
                    "Key": "Name",
                    "Value": "xxxxxxx"
                }
            ],
            "CustomerOwnedIpEnabled": false,
            "ActivityStreamStatus": "stopped",
            "BackupTarget": "region",
            "NetworkType": "IPV4"
        }
    ]
}

```
</div>
</details>


<br>

### ⚠️보안그룹의 실행결과를 DBMS에 넣어 관리하자
---

![테이블 스키마](https://github.com/user-attachments/assets/917d5495-fcd6-4253-9d30-541c3650204e)   
[그림x] 대략적인 테이블 스키마

<br>

---
{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}