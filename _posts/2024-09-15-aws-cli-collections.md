---
title: "[AWS] 유용한 cli 정리"
excerpt: "매번 잊어버리는 AWS cli를 정리해보았습니다."
#layout: archive
categories:
 - Aws
tags:
  - [aws,rds,mysql,ec2]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-09-15
last_modified_at: 2024-09-15
comments: true
---

대부분의 퍼블릭 클라우드의 경우 웹 콘솔에 직접 접근할 필요 없이 쉽게 작업할 수 있도록 명령줄인터페이스를 지원하고 있습니다. 그러나 루틴한 작업들은 대부분 자동화를 해둔 상태라 직접 커맨드를 입력할 상황이 많지 않다보니 일회성으로 사용할 때마다 매번 잊어버리곤 했습니다.  
특히나 30대 후반에 접어들면서 기억하기가 더 어렵게 되었는데요😂 본 포스팅에서 일회성으로 쓰기 좋은 AWS cli를 정리해보고자 합니다.(순전히 제가 써먹기 위한 용도로 작성하는 글입니다.)

---

## ⌨️ 기본 프로필 설정

관리하는 AWS 계정이 다수일 경우 cli 입력시 --profile 옵션을 지정하기 귀찮을 때가 있을 때 사용합니다. ~/.aws/credential 파일을 수정해도 됩니다.

```
aws configure set aws_access_key_id $aws_access_key_id
aws configure set aws_secret_access_key $aws_secret_access_key
```


## 🖥️ RDS CLI

RDS 정보를 조회하는 기본 명령어입니다.

```
aws rds describe-db-instances
```

<br/>

아래처럼 json 형식으로 리턴합니다. 

<details><summary>rds_cli_ouput.json</summary>

<br/>

```

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
<br/>

</details>

<br/>

필요한 필드값만 추려내고 싶다면 --query 옵션을 사용하면 됩니다. 관련 예시입니다. query 옵션의 문법은 [JMESPATH](https://jmespath.org/) 문법을 따릅니다. 

```
aws rds describe-db-instances --query '{"DBInstanceIdentifier":DBInstances[*].DBInstanceIdentifier,"Endpoint":DBInstances[*].Endpoint.Address,"TagList" : DBInstances[*].TagList, DiskSize: DBInstances[*].AllocatedStorage }' > output/${cloud_platform}_rds"_list.json"
```
<br/>

조건에 맞는 RDS 정보만 가져오고 싶다면 --filters 옵션을 사용하면 됩니다. 아래는 관련 예시입니다. RDS의 경우 [지원되는 --filters 항목](https://docs.aws.amazon.com/cli/latest/reference/rds/describe-db-instances.html#options)이 명시 되어 있으니 공식문서를 참고하시면 좋겠습니다. 아래는 DBInstance Identifier 명이 postgres-101 인 RDS 의 ARN 정보를 출력하는 예시입니다.

```
aws rds describe-db-instances --filters "Name=db-instance-id,Values=postgres-101" --query 'DBInstances[*].DBInstanceArn'
```
<br/>

RDS 스냅샷 관련 CLI 입니다. FinOps 중요성이 커지면서 퍼블릭 클라우드의 비용관리를 위해 태깅이 없는 리소스들에 대하여 일괄 등록하는 작업을 한적이 있었습니다. 그 때 태깅이 없는 자동백업된 스냅샷들이 엄청 많아 CLI를 통해 태깅처리를 일괄 처리를 했었습니다. 아래는 관련 CLI 예시입니다.

```
aws rds describe-db-snapshots  --db-snapshot-identifier rds:prd-xxxxxxx-2022-07-13-13-47 --query 'DBSnapshots[*].TagList' > rds:prd-xxxxxxx-2022-07-13-13-47.result

#DBInstance ARN LIST
aws rds describe-db-instances --filters "Name=db-instance-id,Values=postgres-01" --query 'DBInstances[*].DBInstanceArn'

#DBSNAPSHOT ARN LIST
aws rds describe-db-snapshots --filters "Name=db-instance-id,Values=arn:aws:rds:ap-northeast-2:xxxxxxx:db:postgres-01"  --query 'DBSnapshots[*].DBSnapshotArn'

#RESULT - DBSNAPSHOT ARN LIST
    "arn:aws:rds:ap-northeast-2:xxxxxxx:snapshot:rds:postgres-01-2022-11-14-18-06"

#태그 변경
aws rds add-tags-to-resource --resource-name arn:aws:rds:ap-northeast-2:xxxxxxx:snapshot:rds:postgres-01-2022-11-14-18-06 --tags "[{\"Value\": \"xxxxxxx-xxxxxxx\",\"Key\": \"xxxxxxx-xxxxxxx\"},{\"Value\": \"xxxxxxx-xxxxxxx-xxxxxxx\",\"Key\": \"default-info\"},{\"Value\": \"xxxxxxx-xxxxxxx\",\"Key\": \"xxxxxxx-xxxxxxx\"}]"
```
<br/>

RDS의 파라미터 그룹을 조회하거나 현재 설정된 파라미터 그룹의 파라미터 항목을 변경하는 CLI 입니다.
```
#파라미터 그룹 리스트 조회
aws rds describe-db-parameter-groups --query={"parameter_group":DBParameterGroups[*].DBParameterGroupName}


#특정 RDS의 파라미터 그룹 내 파라미터 변경
aws rds modify-db-parameter-group --db-parameter-group-name xxxxxxx-paramter-group \
--parameters \
'[
    {"ParameterName": "performance_schema", "ParameterValue": "1", "ApplyMethod": "pending-reboot"},
    {"ParameterName": "max_digest_length", "ParameterValue": "4096", "ApplyMethod": "pending-reboot"},
    {"ParameterName": "performance_schema_max_digest_length", "ParameterValue": "4096", "ApplyMethod": "pending-reboot"},
    {"ParameterName": "performance_schema_max_sql_text_length", "ParameterValue": "4096", "ApplyMethod": "pending-reboot"}
]'


#RDS의 파라미터 그룹 반영결과 확인
aws rds describe-db-parameters --db-parameter-group-name xxxxxxx-paramter-group > xxxxxxx-paramter-group.json
cat xxxxxxx-paramter-group.json


#RDS 재시작
aws rds reboot-db-instance --db-instance-identifier xxxxxxx-xxxx-101

```
<br/>

RDS의 유지보수 시간을 변경하는 CLI 입니다.

```
aws rds modify-db-instance --db-instance-identifier xxxxxxx-postgres-101 --preferred-maintenance-window Thu:19:00-Thu:19:30
```
<br/>

Multi-AZ 가 적용되지 않은 RDS를 조회하고 Multi-AZ를 반영하는 CLI 입니다.

```
aws rds describe-db-instances --query 'DBInstances[?MultiAZ==`false`]' | grep '"DBInstanceIdentifier":'
aws rds modify-db-instance --db-instance-identifier "xxxx-xxxxx-101" --multi-az --apply-immediately
```
<br/>




## 🖱️ EC2 CLI

ec2 머신에 설치된 DBMS 또는 서드파티 솔루션들을 관리하기 위해 ec2 명령어도 사용합니다. 

```
#ec2 리스트 확인
aws ec2 describe-instances --filters --query "Reservations[].Instances[].[PrivateIpAddress,Tags[?Key=='Name'].Value[]]" --output text | sed '$!N;s/\n/\t/'
```
<br/>


## 💾 S3 CLI

AWS S3에 파일을 다운로드 / 업로드 하는 CLI 입니다.
```
#a.txt 파일을 업로드
aws s3 cp a.txt s3://bucket-name

#버킷에서 a.txt를 다운로드
aws s3 cp s3://bucket-name/a.txt .
```
<br/>
  




{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}