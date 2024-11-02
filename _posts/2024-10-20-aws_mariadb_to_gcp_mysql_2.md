---
title: "[GCP] AWS MariaDB 를 GCP MySQL 로 이전 - 사전 작업편[draft]"
excerpt: "AWS DMS를 이용하여 AWS RDS MariaDB를 GCP Cloud SQL MySQL로 이전하기 위한 사전작업을 정리합니다."
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

| 순서 | 작업 유형 | 작업 절차                                                      |
|------|--------|------------------------------------------------------|
| 1    |  사전 작업 | GCP Cloud SQL 생성                                   |
| 2    | 사전 작업 | 방화벽 Rule 허용 작업                                   |
| 3    | 사전 작업 | 사용자 계정 및 권한 생성                                  |
| 4    | 사전 작업 | 데이터베이스 덤프 / 리스토어 (--no-data, --routines)       |
| 5    | 본작업 | DMS 인스턴스, 소스/타겟 엔드포인트, DMS 태스크 생성 및 실행       |
| 6    | 본작업 | Cloud DNS 변환                                         |
| 7    | 본작업 | 컷오버                                                  |
| 8    | 본작업 | AWS RDS 정지                                           |

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
    ├── credential.json
    ├── cloud-sql
    │   ├── mysql
    │   │   ├── sql-database.tf
    │   │   └── variables.tf    
    │   └── mysql-replica
    │       ├── sql-database-replica.tf    
    │       └── variables.tf    
    ├── primary
    │   └── primary.tf
    └── replica
        └── replica.tf

```

<br>

아래는 프라이머리 인스턴스를 생성하기 위한 템플릿입니다.   
<details><summary>sql-database.tf</summary>
<div markdown="1">  
{% include codeHeader.html name="sql-database.tf" %}
```tf

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

아래의 variables.tf 파일은 위에서 정의한 프라이머리 인스턴스의 기본 변수값들을 설정하기 위한 파일입니다. 
<details><summary>variables.tf</summary>
<div markdown="1">  
{% include codeHeader.html name="variables.tf" %}
```tf

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

<details><summary>sql-database-replica.tf</summary>
<div markdown="1">
{% include codeHeader.html name="sql-database-replica.tf" %}
```tf
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

</div>
</details>

<br>

아래는 위에서 정의한 레플리카 인스턴스의 기본 변수값을 설정하기 위한 파일입니다.

<details><summary>variables.tf</summary>
<div markdown="1">  
{% include codeHeader.html name="variables.tf" %}
```tf
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

위에서 정의한 템플릿을 기반으로 프라이머리 인스턴스를 생성하기 위한 모듈 정의입니다. 프라이머리 인스턴스를 생성할 때는 아래의 tf 파일을 정의해야합니다.

{% include codeHeader.html name="sql-database.tf" %}
```tf

provider "google" {
    credentials = "${file("../../credential.json")}"
}

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

<br>

primary 디렉토리에 접근하여 아래의 명령어를 수행하면 프라이머리 인스턴스가 생성됩니다.

```bash
terraform init
terraform apply
```

<br>

프라이머리 구성이 완료되면 레플리카를 구성할 차례인데 아래의 tf파일을 이용하면 됩니다.

{% include codeHeader.html name="replica.tf" %}
```tf

provider "google" {
    credentials = "${file("../../credential.json")}"
}

module "replica" {
    source = "    source = "../../gcp-template/cloud-sql/mysql-replica"
    project_name = "프로젝트명"
    region_name = "리전명"
    replica_names = ["프라이머리명-repl-01", "프라이머리명-repl-02"]

    # instance
    replica_set_name = "프라이머리명" #자동으로 붙었던 _master 명칭은 빼야함
    database_version = "MYSQL_8_0"

    # db-custom-[vcore]-[mem(MB)]
    instance_spec_size = "db-n1-highmem-16" #db-n1-highmem-16 #https://cloud.google.com/sql/docs/mysql/create-instance#machine-types
    availability_type = "REGIONAL"
    disk_size_gb = "2048"
    enable_public_internet_access = false  #공인ip제거
    private_network = "VPC명"

    # instance lable
    # 인스턴스에 원하는 태그를 작성하고 싶다면 사용합니다.
    tag_environment     = "태그값" 


    #location_preference
    read_replica_zones  = ["asia-northeast3-b", "asia-northeast3-a"]


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

<br>

Replica 디렉토리에 접근하여 아래의 명령어를 수행하면 레플리카 인스턴스가 생성됩니다.

```bash
terraform init
terraform apply
```

<br>

#### 2. 방화벽 Rule 허용 작업
---

백엔드 서버 또는 EKS, GKE 와 GCP SQL 간의 연결을 위해 방화벽 Rule 을 설정해야합니다. FIREWALL Rule 을 생성할 수 있는 [콘솔 화면](https://console.cloud.google.com/net-security/firewall-manager/firewall-policies/list) 에 접속하여 정책을 넣어주면 됩니다.

![CREATE FIREWALL RULE](https://github.com/user-attachments/assets/984fb49b-9018-4f8c-a2a2-3612d9a434e0)    
[그림1] 방화벽 허용 정책 생성   

<br>

\[그림1\] 처럼 Cloud NGFW 의 Firewall policies 메뉴에서 CREATE FIREWALL RULE 을 생성할 수 있습니다.

<br>

![FIREWALL 생성 메뉴](https://github.com/user-attachments/assets/b7af1ef4-3c04-4594-b42a-774112b77644)   
[그림2] 방화벽 정책 생성 메뉴   

<br>

\[그림2\] 는 방화벽 정책 생성을 위한 정보를 기입하는 화면입니다. 방화벽 이름, 로그 생성 여부, 우선순위, 트래픽방향, 허용여부, 소스 및 타겟 설정, 허용 포트 등의 항목들을 입력하여 백엔드 서버 또는 EKS, GKE 등이 Cloud SQL 과 통신할 수 있도록 룰을 설정해야합니다.

<br>

<img src="https://github.com/user-attachments/assets/5fb64e3e-5fec-4b0f-ad3b-2105ec641cb2" alt="FIREWALL RULE 설정 결과" width="300">
[그림3] 방화벽 정책 설정 결과   

설정 이후에는 \[그림3\]과 같이 설정한 정보를 확인할 수 있습니다.


<br/>


#### 4. 사용자 계정 및 권한 생성
---

사용자 계정 및 권한 생성 작업입니다. 이관 대상 DBMS 의 사용자 계정과 권한을 동일하게 설정해야합니다. 물론 이관 대상 DBMS 의 서비스 성격에 따라서 정합성이 강하게 요구된다면 읽기 권한만 먼저 설정하고 커넥션이 AS-IS DBMS 에서 TO-BE DBMS로 완전히 전환된 것을 확인하고 쓰기 권한을 부여할 수도 있습니다.

{% include codeHeader.html name="사용자 백업" %}
```sql
SHOW CREATE USER `계정명`;  -- 사용자 계정 암호 및 계정 설정 백업
SHOW GRANTS FOR `계정명`; -- 사용자 계정의 권한 백업
```

<br>

사용자 계정과 권한을 백업할 때에는 보통 위의 쿼리를 통해 계정의 패스워드 설정과 정책, 권한을 백업합니다. 계정 목록은 mysql.user 테이블에 있기 때문에 해당 테이블에서 계정 목록을 읽어들여서 필요한 계정 정보를 백업하는 스크립트를 만들어서 관리하는 편이 좋습니다.

<br>

##### MariaDB, MySQL 간의 사용자 계정, 권한 부여 차이점

1) 사용자 계정 생성 구문과 권한 차이

{% include codeHeader.html name="사용자 백업 결과 일부" %}
```sql
MariaDB 10.6 : CREATE USER `cooperation`@`%` IDENTIFIED BY PASSWORD '*08xxxxxxxxxxxxxxx9F6181';
MySQL 8.0 : CREATE USER `cooperation`@`%` IDENTIFIED WITH 'mysql_native_password' AS '*08xxxxxxxxxxxxxxx9F6181';
```

<br>

위의 내용과 같이 MySQL 로 이전 시에 유의사항으로는 mysql_native_password 로 패스워드를 설정한 경우에 MariaDB 문법과 MySQL 문법이 상호 다른점이 있습니다. 구문을 파싱해야하는 작업이 필요합니다. MariaDB 에서 ```SHOW CREATE USER``` 명령문의 수행결과를 모아둔 파일에 아래와 같이 sed 를 이용해서 파싱을 해줘서 호환 가능하도록 변경해도 좋습니다.

<br>

{% include codeHeader.html name="사용자 백업 결과 변환" %}
```bash
echo `mysql -h${HOST} -u${USER} -p"${PASSWORD}" -N -B --execute="${QUERY}"`";" >> result_show_create_user.sql"
sed -i -e 's/BY PASSWORD/WITH '"'"'mysql_native_password'"'"' AS/g' result_show_create_user.sql"
```

<br>

권한 같은 경우도 지원하지 않는 권한이 있습니다. BINLOG MONITOR, SLAVE MONITOR 라는 권한은 MariaDB에만 있는 권한입니다. 대체 가능한 MySQL의 REPLICATION CLIENT 로 변경해야합니다. 추가로 SHOW GRANTS FOR 구문 실행 시 MariaDB 의 경우 IDENTIFIED BY PASSWORD ~ 문구가 생성되는데 해당 내용은 삭제 시켜줍니다.

{% include codeHeader.html name="사용자 권한 백업 결과 일부" %}
```sql
GRANT USAGE ON *.* TO `cooperation`@`%` IDENTIFIED BY PASSWORD '*08xxxxxxxxxxxxxxx9F6181';
GRANT BINLOG MONITOR, SLAVE MONITOR ON *.* TO `adm`@`%` ;
```
<br>

{% include codeHeader.html name="사용자 백업 결과 변환" %}
```bash
sed -i -e 's/BINLOG MONITOR/REPLICATION CLIENT/g' result_show_grants.sql
sed -i -e 's/SLAVE MONITOR/REPLICATION CLIENT/g' result_show_grants.sql
sed -i -e 's/IDENTIFIED BY PASSWORD.*/;/g' result_show_grants.sql
```

<br/>

#### 5. 데이터베이스 덤프 / 리스토어 (--no-data, --routines)
---

소스 데이터베이스의 형상을 타겟 MySQL에 복원하기 위해서 아래와 같은 명령어를 수행합니다. --no-data 옵션을 통해 스키마 틀만 가져올 것이고 routines 옵션으로 프로시져까지 반영하도록 합니다. DMS를 이용하여 이전할 경우 DMS에 의한 변경 작업과 트리거와 이벤트의 변경 작업이 충돌되기 때문에 이전이 완료된 후에 별도로 생성해주어야 합니다. 아래의 명령어를 수행하여 덤프를 받은 뒤 타겟 데이터베이스에 리스토어 합니다.

<br>

```sql
/usr/bin/mysqldump -h 'AWS RDS 주소' -u'관리자계정' -p'관리자패스워드' --no-data --databases db1 db2 db3 db4 --routines > backup.sql
mysql -h 'GCP MySQL 주소' -u'관리자계정' -p'관리자패스워드' < backup.sql
```

<br/>

#### 6. DMS 인스턴스, 소스/타겟 엔드포인트, DMS 태스크 생성 및 실행
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