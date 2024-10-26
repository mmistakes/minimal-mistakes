---
title: "[GCP] AWS MariaDB 를 GCP MySQL 로 이전(2)"
excerpt: "AWS DMS를 이용하여 AWS RDS MariaDB를 GCP Cloud SQL MySQL로 이전하는 내용을 정리합니다."
#layout: archive
categories:
 - Gcp
tags:
  - [aws, rds, gcp, cloudsql, mysql, mariadb]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 1999-10-20
last_modified_at: 1999-10-20
comments: true
---

### 📝AWS DMS 를 이용한 AWS RDS MariaDB 의 GCP Cloud SQL MySQL 이전
--- 
**[지난번 포스팅](https://duhokim0901.github.io/aws/aws_mariadb_to_gcp_mysql_1/#gcp-cloud-sqlmysql-%EC%9D%B4%EC%A0%84-%EB%B0%B0%EA%B2%BD)**에서 AWS RDS MariaDB를 GCP Cloud SQL MySQL 에 이전해야하는 배경과 이전 방안에 대해 정리하였습니다. AWS의 관리형 데이터베이스(RDS)를 GCP의 관리형 데이터베이스(Cloud SQL)로 이전하는 이유가 성능이나 관리적 이점(HA,RPO,RTO)으로 인한 점이 아닌 회사 내부 상황에 의한 비용 효율화 측면으로 인한 이전 배경이었음을 다시 말씀드리고 싶습니다.

또한 사용중인 플랫폼 및 관리형 데이터베이스의 제약 사항으로 인해 현재의 이전 방식으로 결정된 점을 유념하고 글을 읽어주시면 좋겠습니다.(어느 클라우드 플랫폼이 좋다 나쁘다로 인한 이전이 아님을 다시 한번 강조드립니다.) DMS 서비스를 이용한 이전에는 아래와 같은 작업 절차가 필요했습니다.

<br>

| 순서 | 작업 절차                                                      |
|------|---------------------------------------------------------------|
| 1    | GCP Cloud SQL 생성                                             |
| 2    | 방화벽 Rule 허용 작업                                          |
| 3    | DMS 인스턴스, 소스/타겟 엔드포인트, DMS 태스크 생성             |
| 4    | 사용자 계정 및 권한 생성
| 5    | 데이터베이스 덤프 / 리스토어 (--no-data, --routines, --triggers, --events)|
| 6    | DMS 실행                                                       |
| 7    | Cloud DNS 변환                                                 |
| 8    | 컷오버                                                         |
| 9    | AWS RDS 정지                                                   |

<br>

위의 작업 중 1 ~ 6 까지가 사전 작업에 필요한 내용이고, 실제로 7번부터가 전환할 시점에서 이루어져야 할 작업입니다. 이제부터 각 단계 별 작업을 간단하게 정리해보려고 합니다.

<br>

### ✏️마이그레이션 절차
---


<br>

#### 1. GCP Cloud SQL 생성
---

먼저 이관 대상인 Cloud SQL을 생성하였습니다. 콘솔로 인스턴스를 생성할 수도 있긴하지만 전체 플랫폼을 대거 이관해야하고, GCP 에 CloudSQL 파라미터 그룹같은 개념이 없기 때문에 변경해야할 설정 값을 인스턴스 마다 모두 입력해야 해서 코드로 작성하여 관리하는 것이 생산적이라 판단하였습니다. 제가 근무하고 있는 회사는 클라우드 리소스는 모두 테라폼으로 생성하고 있기 때문에 규칙에 맞추어 테라폼으로 생성하였습니다. [공식 테라폼 생성 가이드](https://github.com/gruntwork-io/terraform-google-sql/blob/v0.6.0/modules/cloud-sql/main.tf)가 있으니 참고하시면 좋을 것 같습니다.

※ 테라폼 cloud sql template 디렉토리 구조
```
└── gcp-template
    ├── cloud-sql
    │   ├── mysql
    │   │   ├── sql-database.tf
    │   │   └── variables.tf    
    │   └── mysql-replica
    │       ├── sql-database-replica.tf    
    │       └── variables.tf    
    ├── primary
    │   └── primary.tf
    ├── replica
    │   └── replica.tf
    └── main.tf
```

<br>

아래는 프라이머리 인스턴스를 생성하기 위한 템플릿입니다.   
{% include codeHeader.html name="sql-database.tf" %}
```bash

locals {
    is_postgres = replace(var.database_version, "POSTGRES", "") != var.database_version
    is_mysql    = replace(var.database_version, "MYSQL", "") != var.database_version

    // HA method using REGIONAL availability_type requires binary logs to be enabled
    binary_log_enabled = var.availability_type == "REGIONAL" ? true : lookup(var.backup_configuration, "binary_log_enabled", null)
    backups_enabled    = var.availability_type == "REGIONAL" ? true : lookup(var.backup_configuration, "enabled", null)
}

resource "google_sql_database_instance" "db_instance" {

    project = var.project_name
    region = var.region_name

    name = "${var.replica_set_name}-master"
    database_version = var.database_version
    
    settings {
        tier = var.instance_spec_size
        availability_type = var.availability_type

        dynamic "backup_configuration" {
        for_each = [var.backup_configuration]
        content {
            binary_log_enabled             = local.binary_log_enabled
            enabled                        = local.backups_enabled
            start_time                     = lookup(backup_configuration.value, "start_time", null)
            location                       = lookup(backup_configuration.value, "location", null)
            transaction_log_retention_days = lookup(backup_configuration.value, "transaction_log_retention_days", null)
        }
        }

        disk_type = "PD_SSD"
        disk_size = var.disk_size_gb
        
        ip_configuration {
            ipv4_enabled = var.enable_public_internet_access
            private_network = "projects/${var.project_name}/global/networks/${var.private_network}"
            #private_network = var.private_network
        }

        user_labels = {
            environmrnt = var.tag_environment
            application = var.tag_application
            category = var.tag_category
        }

        dynamic "database_flags" {
            for_each = var.database_flags
            content {
                name  = lookup(database_flags.value, "name", null)
                value = lookup(database_flags.value, "value", null)
            }
        }
    }
}


resource "google_sql_database" "db" {
    depends_on = [ google_sql_database_instance.db_instance ]    
    name = var.database_name
    instance = google_sql_database_instance.db_instance.name
    project = var.project_name
    charset   = var.db_charset
    collation = var.db_collation
}

resource "google_sql_user" "db_users" {
    depends_on = [google_sql_database.db ]
    name     = var.db_user_name
    instance = google_sql_database_instance.db_instance.name
    project = var.project_name
    host     = local.is_postgres ? null : var.master_user_host
    password = var.db_user_password
}
```

<br>

아래의 variables.tf 파일은 위에서 정의한 프라이머리 인스턴스의 기본 변수값들을 설정하기 위한 파일입니다. 
<details><summary>variables.tf</summary>
<div markdown="1">  
{% include codeHeader.html name="variables.tf" %}
```

locals {
    is_postgres = replace(var.database_version, "POSTGRES", "") != var.database_version
    is_mysql    = replace(var.database_version, "MYSQL", "") != var.database_version

    // HA method using REGIONAL availability_type requires binary logs to be enabled
    binary_log_enabled = var.availability_type == "REGIONAL" ? true : lookup(var.backup_configuration, "binary_log_enabled", null)
    backups_enabled    = var.availability_type == "REGIONAL" ? true : lookup(var.backup_configuration, "enabled", null)
}

resource "google_sql_database_instance" "db_instance" {

    project = var.project_name
    region = var.region_name

    name = "${var.replica_set_name}-master"
    database_version = var.database_version
    
    settings {
        tier = var.instance_spec_size
        availability_type = var.availability_type

        dynamic "backup_configuration" {
        for_each = [var.backup_configuration]
        content {
            binary_log_enabled             = local.binary_log_enabled
            enabled                        = local.backups_enabled
            start_time                     = lookup(backup_configuration.value, "start_time", null)
            location                       = lookup(backup_configuration.value, "location", null)
            transaction_log_retention_days = lookup(backup_configuration.value, "transaction_log_retention_days", null)
        }
        }

        disk_type = "PD_SSD"
        disk_size = var.disk_size_gb
        
        ip_configuration {
            ipv4_enabled = var.enable_public_internet_access
            private_network = "projects/${var.project_name}/global/networks/${var.private_network}"
            #private_network = var.private_network
        }

        user_labels = {
            environmrnt = var.tag_environment
            application = var.tag_application
            category = var.tag_category
        }

        dynamic "database_flags" {
            for_each = var.database_flags
            content {
                name  = lookup(database_flags.value, "name", null)
                value = lookup(database_flags.value, "value", null)
            }
        }
    }
}


resource "google_sql_database" "db" {
    depends_on = [ google_sql_database_instance.db_instance ]    
    name = var.database_name
    instance = google_sql_database_instance.db_instance.name
    project = var.project_name
    charset   = var.db_charset
    collation = var.db_collation
}

resource "google_sql_user" "db_users" {
    depends_on = [google_sql_database.db ]
    name     = var.db_user_name
    instance = google_sql_database_instance.db_instance.name
    project = var.project_name
    host     = local.is_postgres ? null : var.master_user_host
    password = var.db_user_password
}
```
</div>
</details>
  
<br>

다음은 레플리카 인스턴스를 생성하기 위한 템플릿 입니다.   
{% include codeHeader.html name="sql-database-replica.tf" %}
```
locals {
    is_postgres = replace(var.database_version, "POSTGRES", "") != var.database_version
    is_mysql    = replace(var.database_version, "MYSQL", "") != var.database_version

    // HA method using REGIONAL availability_type requires binary logs to be enabled
    binary_log_enabled = var.availability_type == "REGIONAL" ? true : lookup(var.backup_configuration, "binary_log_enabled", null)
    backups_enabled    = var.availability_type == "REGIONAL" ? true : lookup(var.backup_configuration, "enabled", null)
}

resource "google_sql_database_instance" "read_replica" {
  count = length(var.replica_names)

  name             = var.replica_names[count.index]
  project          = var.project_name
  region           = var.region_name
  database_version = var.database_version

  # The name of the instance that will act as the master in the replication setup.
  master_instance_name = "${var.replica_set_name}-master"

  # Whether or not to allow Terraform to destroy the instance.
  deletion_protection = var.deletion_protection

  replica_configuration {
    # Specifies that the replica is not the failover target.
    failover_target = false
  }

  settings {
    tier            = var.instance_spec_size
    #disk_autoresize = var.disk_autoresize
    availability_type = var.availability_type

    ip_configuration {
      #dynamic "authorized_networks" {
      #  for_each = var.authorized_networks
      #  content {
      #    name  = authorized_networks.value.name
      #    value = authorized_networks.value.value
      #  }
      #}

      ipv4_enabled    = var.enable_public_internet_access
      private_network = "projects/${var.project_name}/global/networks/${var.private_network}"
      #require_ssl     = var.require_ssl
    }

    location_preference {
      zone = element(var.read_replica_zones, count.index)
    }

    disk_size = var.disk_size_gb
    disk_type = "PD_SSD"

    dynamic "database_flags" {
      for_each = var.database_flags
      content {
        name  = lookup(database_flags.value, "name", null)
        value = lookup(database_flags.value, "value", null)
      }
    }

    user_labels = {
            environmrnt = var.tag_environment
            application = var.tag_application
            category = var.tag_category
    }
  }

}
```

<br>

아래는 위에서 정의한 레플리카 인스턴스의 기본 변수값을 설정하기 위한 파일입니다.

<details><summary>variables.tf</summary>
<div markdown="1">  
{% include codeHeader.html name="variables.tf" %}
```
variable "project_name" {
    type = string
}

variable "region_name" {
  type = string
  default = "asia-northeast3"
}

#variable "database_instance_name" {
#  type = string
#}

variable "database_version" {
  type = string
}

variable "instance_spec_size" {
  type = string
}

variable "disk_size_gb" {
  type = string
}

variable "enable_public_internet_access" {
  type = bool
  default = false
}

variable "private_network" {
  type = string
}

variable "tag_environment" {
  type = string
}

variable "tag_application" {
  type = string
}

variable "tag_category" {
  type = string
}


variable "master_user_host" {
  type = string
  default = null
}


variable "database_flags" {
  description = "List of Cloud SQL flags that are applied to the database server. See [more details](https://cloud.google.com/sql/docs/mysql/flags)"
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}

variable "availability_type" {
  description = "The availability type for the master instance. Can be either `REGIONAL` or `null`."
  type        = string
  default     = "REGIONAL"
}


variable "backup_configuration" {
  description = "The backup_configuration settings subblock for the database setings"
  type = object({
    binary_log_enabled             = bool
    enabled                        = bool
    start_time                     = string
    location                       = string
    transaction_log_retention_days = string
    retained_backups               = number
    retention_unit                 = string
  })
  default = {
    binary_log_enabled             = false
    enabled                        = false
    start_time                     = null
    location                       = null
    transaction_log_retention_days = null
    retained_backups               = null
    retention_unit                 = null
  }
}

#variable "num_read_replicas" {
#  description = "The number of read replicas to create. Cloud SQL will replicate all data from the master to these replicas, which you can use to horizontally scale read traffic."
#  type        = number
#  default     = 0
#}

variable "read_replica_zones" {
  description = "A list of compute zones where read replicas should be created. List size should match 'num_read_replicas'"
  type        = list(string)
  default     = []
  # Example:
  #  default = ["us-central1-b", "us-central1-c"]
}


variable "replica_set_name" {
  description = "The name of the database instance. Note, after a name is used, it cannot be reused for up to one week. Use lowercase letters, numbers, and hyphens. Start with a letter."
  type        = string
}


#variable "custom_labels" {
#  description = "A map of custom labels to apply to the instance. The key is the label name and the value is the label value."
#  type        = map(string)
#  default     = {}
#}


variable "resource_timeout" {
  description = "Timeout for creating, updating and deleting database instances. Valid units of time are s, m, h."
  type        = string
  default     = "60m"
}


variable "deletion_protection" {
  description = "Whether or not to allow Terraform to destroy the instance. Unless this field is set to false in Terraform state, a terraform destroy or terraform apply command that deletes the instance will fail."
  type        = bool
  default     = "true"
}


variable "replica_names" {
  description = "replica list"
  type        = list(string)
  # example : ["Paul_Dirac", "Erwin_Schrodinger", "Wolfgang_Pauli"]
}
```
</div>
</details>


<br>

위에서 정의한 템플릿을 기반으로 프라이머리 인스턴스를 생성하기 위한 모듈 정의입니다.

{% include codeHeader.html name="sql-database.tf" %}
```
module "prd-zzim-mysql-101" {
    source = "../../gcp-template/cloud-sql/mysql"
    project_name = "프로젝트명"
    region_name = "리전명"

    # instance
    replica_set_name = "인스턴스명" # "인스턴스명_master" 라는 명칭으로 생성
    database_version ="MYSQL_8_0"

    # db-custom-[vcore]-[mem(MB)]
    instance_spec_size = "db-n1-highmem-16" #db-n1-highmem-16 #https://cloud.google.com/sql/docs/mysql/create-instance#machine-types
    disk_size_gb = "2048"
    enable_public_internet_access = false #공인ip제거
    private_network = "VPC명"

    # instance lable
    # 인스턴스에 원하는 태그를 작성하고 싶다면 사용합니다.
    tag_environment     = "태그값" 

    # db
    database_name = "dba"
    
    # db user
    db_user_name = "관리자계정"
    db_user_password = "관리자계정비밀번호"

    # database_flags
    # 원하는 파라미터 설정값을 기재한다. 파라미터 그룹으로 관리되지 않으니 모든 인스턴스마다 파라미터값을 정의해주어야한다.
    database_flags = [
      {
        name  = "log_bin_trust_function_creators"
        value = "on"
      },
    ]
}

```


<br/>

#### 2. 방화벽 Rule 허용 작업
---


<br/>

#### 3. DMS 인스턴스, 소스/타겟 엔드포인트, DMS 태스크 생성
---


<br/>

#### 4. 사용자 계정 및 권한 생성
---


<br/>

#### 5. 데이터베이스 덤프 / 리스토어 (--no-data, --routines, --triggers, --events)
---


<br/>

#### 6. DMS 실행
---

<br/>

#### 7. 보조인덱스 생성 및 제약 사항 조치
---

<br/>

#### 8. Cloud DNS 변환
---


<br/>

#### 9. 컷오버
---



<br/>

#### 10. AWS RDS 정지
---


<br>

### 📚 참고자료
---
- [AWS Database Migration Service](https://docs.aws.amazon.com/ko_kr/dms/latest/userguide/Welcome.html)
- [AWS DMS - MySQL을 소스로 사용](https://docs.aws.amazon.com/ko_kr/dms/latest/userguide/CHAP_Source.MySQL.html)
- [AWS DMS best practices for moving large tables with table parallelism settings](https://aws.amazon.com/ko/blogs/database/aws-dms-best-practices-for-moving-large-tables-with-table-parallelism-settings/)
- [GCP Cloud SQL 가격정책](https://cloud.google.com/sql/pricing?hl=ko#storage-networking-prices)
- [AWS RDS 서비스 전송 비용](https://aws.amazon.com/ko/blogs/korea/exploring-data-transfer-costs-for-aws-managed-databases/)
- [AWS RDS 가격 정책](https://aws.amazon.com/ko/rds/mysql/pricing/)
- [공통 아키텍처에 대한 데이터 전송 비용 개요](https://aws.amazon.com/ko/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/)

<br/>
---

{% assign posts = site.categories.Gcp %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}