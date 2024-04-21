---
layout: single
title: Terraform(테라폼) vs Ansible(앤서블) IaC 도구 비교
categories: [terraform]
tags: [Terraform]
toc: true
author_profile: false
sidebar:
  nav: "counts"
---

![Terraform02](https://github.com/dongkoony/AskUp/assets/109497684/14943998-51d9-4a54-bb8b-9dd39d5524bc)

## Infrastructure as Code(IaC)란?

인프라스트럭처를 코드로 정의하고 관리하는 개념입니다. 클라우드 시대가 도래하면서 인프라 프로비저닝 및 관리를 자동화하는 것이 필수가 되었습니다. IaC를 통해 인프라 리소스를 코드 형태로 버전 관리하고 반복 가능한 방식으로 배포할 수 있습니다.

## Terraform과 Ansible 소개

`Terraform`과 `Ansible`은 대표적인 IaC 도구입니다.

### `Terraform`

![Terraform 로고](https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_terraform_icon_130125.png)

Terraform은 HashiCorp에서 개발한 오픈소스 IaC 도구입니다. 코드 형식으로 작성된 구성 파일을 사용하여 클라우드 및 온프레미스 데이터 센터 리소스를 프로비저닝, 변경, 버전 관리할 수 있습니다. Terraform은 선언적인 구문을 사용하므로 원하는 인프라 상태를 정의하면 Terraform이 필요한 작업을 실행합니다.

#### Terraform 코드 예시

```python
# 사용할 AWS 리전 설정
provider "aws" {
  region = "ap-northeast-2" # 서울 리전
}

# EC2 인스턴스 리소스 정의
resource "aws_instance" "example" {

  # 인스턴스에 사용할 AMI(Amazon Machine Image) ID
  ami           = "ami-0c94855ba95c71c99"  
  instance_type = "t2.micro" # 인스턴스 유형

  # 인스턴스에 부여할 태그
  tags = {
    Name = "Terraform-Example"
  }
}
```

위 코드는 AWS 리소스를 프로비저닝하는 Terraform 구성 파일의 예시입니다. HCL(HashiCorp Configuration Language)이라는 선언적 언어를 사용합니다.

### `Ansible`

![Ansible 로고](https://cdn.icon-icons.com/icons2/2699/PNG/512/ansible_logo_icon_167875.png)

Ansible은 Red Hat에서 개발한 오픈소스 구성 관리 및 프로비저닝 도구입니다. 에이전트리스 아키텍처로 인해 배포가 간편하며, Playbook을 사용하여 대상 시스템에서 작업을 정의하고 실행할 수 있습니다.

#### Ansible 코드 예시

```yaml
---
# 웹서버 호스트 그룹 정의
- hosts: webservers
  vars:
    http_port: 80 # HTTP 포트 번호
    max_clients: 200 # 최대 클라이언트 수

  tasks:
    # Apache 웹서버 설치 태스크
    - name: Ensure Apache is installed
      yum:
        name: httpd
        state: present

    # Apache 설정 파일 작성 태스크  
    - name: Write Apache configuration file
      template:
        src: httpd.conf.j2 # 설정 파일 템플릿 소스
        dest: /etc/httpd/conf/httpd.conf # 대상 경로
      notify:
        - restart apache # Apache 재시작 핸들러 실행

  handlers:
    # Apache 재시작 핸들러
    - name: restart apache
      service:
        name: httpd
        state: restarted
```

위 예시는 웹서버 구성을 위한 Ansible Playbook입니다. YAML 형식으로 작성되며, 호스트와 태스크를 정의할 수 있습니다.

## Terraform vs Ansible 비교

두 도구는 목적과 접근 방식에 차이가 있습니다.

| 기준 | Terraform | Ansible |
|------|-----------|---------|
| 목적 | 인프라 프로비저닝 | 구성 관리, 애플리케이션 배포 |
| 접근 방식 | 선언적 | 절차적 |
| 상태 관리 | 인프라 상태 효율적 관리 | 상태 관리 기능 제한적 |
| 범위 | 클라우드 리소스 프로비저닝 | 시스템 구성, 애플리케이션 배포 |
| 코드 작성 | HCL | YAML |

두 도구 모두 IaC 접근 방식을 지원하지만, 사용 목적과 구현 방식에 차이가 있습니다. 많은 기업에서 Terraform과 Ansible을 함께 사용하여 인프라 프로비저닝, 구성 관리, 애플리케이션 배포를 통합적으로 관리하고 있습니다.

### 사용 사례 및 통합 활용

- Terraform으로 AWS, Azure 등 클라우드 리소스 프로비저닝
- Ansible로 프로비저닝된 인프라 노드 구성 및 애플리케이션 배포
- Terraform으로 Kubernetes 클러스터 생성, Ansible로 클러스터 노드 구성

인프라 프로비저닝에는 Terraform이, 구성 관리와 애플리케이션 배포에는 Ansible이 더 적합할 수 있습니다. 때로는 두 도구를 함께 사용하는 것이 가장 효과적일 수 있습니다. 요구사항과 환경에 맞는 도구를 선택하고, IaC 접근 방식을 적극적으로 활용하는 것이 중요합니다.
