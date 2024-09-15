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

아래처럼 json 형식으로 리턴합니다. 
<details>
<summary>결과보기  
</summary>

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
                    "Key": "xxxxxxx-cost",
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
                    "Key": "xxxxxxx-service",
                    "Value": "xxxxxxx"
                },
                {
                    "Key": "xxxxxxx-map",
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
  

</details>  


필요한 필드값만 추려내고 싶다면 --query 옵션을 사용하면 됩니다. 관련 예시입니다.  

```
aws rds describe-db-instances --query '{"DBInstanceIdentifier":DBInstances[*].DBInstanceIdentifier,"Endpoint":DBInstances[*].Endpoint.Address,"TagList" : DBInstances[*].TagList }' > output/${cloud_platform}_rds"_list.json"
```


## 🖱️ EC2 CLI


```
aws rds describe-db-instances --filters "Name=tag:Name,Values=prd-contents1-mongo-104" | grep "InstanceId" | awk -F ':' '{print $2}' | sed -r "s/\"//g" | sed -r "s/,//g"



aws rds describe-db-instances --query "{instance: DBInstances[*].DBInstanceIdentifier, disksize: DBInstances[*].AllocatedStorage}"
```




## 💾 S3 CLI




{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}