---
layout: single
title: Terraform(테라폼) 소개
categories: [Terraform]
tags: [Terraform]
toc: true
author_profile: false
sidebar:
  nav: "counts"
---

![Terraform](https://github.com/dongkoony/AskUp/assets/109497684/d01bcacc-d46a-4e7c-bbe7-fa4afd8cc17c)

## Infrastructure as Code(IaC)란?

인프라스트럭처를 코드로 정의하고 관리하는 개념입니다. 클라우드 시대가 도래하면서 인프라 프로비저닝 및 관리를 자동화하는 것이 필수가 되었습니다. IaC를 통해 인프라 리소스를 코드 형태로 버전 관리하고 반복 가능한 방식으로 배포할 수 있습니다. 이렇게 하면 수동 작업을 최소화하고 일관성과 효율성을 높일 수 있습니다.

## Terraform이란?

Terraform은 HashiCorp에서 개발한 오픈소스 IaC 도구입니다. 코드 형식으로 작성된 구성 파일을 사용하여 클라우드 및 온프레미스 데이터 센터 리소스를 프로비저닝, 변경, 버전 관리할 수 있습니다. Terraform은 선언적인 구문을 사용하므로 원하는 인프라 상태를 정의하면 Terraform이 필요한 작업을 실행합니다.

### Terraform의 주요 특징

| 특징 | 설명 |
|------|------|
| 클라우드 애그노스틱 | AWS, Azure, GCP 등 다양한 클라우드 공급자와 온프레미스 환경을 지원합니다. |
| 플랫폼 애그노스틱 | Linux, Windows, macOS 등 다양한 운영체제에서 실행 가능합니다. |
| 상태 관리 | 인프라 상태를 파일 또는 원격 데이터 저장소에 저장하여 변경 사항을 추적합니다. |
| 계획 실행 | 실제 인프라에 변경을 가하기 전에 계획을 생성하여 변경 사항을 미리 확인할 수 있습니다. |
| 리소스 그래프 | 리소스 간 종속성을 자동으로 계산하여 적절한 순서로 생성 또는 변경합니다. |
| 변수와 모듈 | 변수를 사용하여 구성을 매개변수화하고, 모듈을 통해 코드를 재사용할 수 있습니다. |

### Terraform의 작동 방식

![Terraform 작동 방식](https://developer.hashicorp.com/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dterraform%26version%3Drefs%252Fheads%252Fv1.8%26asset%3Dwebsite%252Fimg%252Fdocs%252Fintro-terraform-apis.png%26width%3D2048%26height%3D644&w=2048&q=75)

*Terraform 작동 방식 이미지 출처: https://developer.hashicorp.com/terraform/intro*

1. **작성(Write)**: HCL(HashiCorp Configuration Language)이라는 선언적 구성 언어로 원하는 인프라 상태를 정의합니다.
2. **계획(Plan)**: Terraform이 현재 인프라 상태와 구성 파일을 비교하여 변경 사항을 계획합니다. 
3. **적용(Apply)**: 계획된 변경 사항을 승인하면 Terraform이 실제 인프라에 변경 사항을 적용합니다.

![Terraform 작동 방식](https://developer.hashicorp.com/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dterraform%26version%3Drefs%252Fheads%252Fv1.8%26asset%3Dwebsite%252Fimg%252Fdocs%252Fintro-terraform-workflow.png%26width%3D2038%26height%3D1773&w=2048&q=75)
*Terraform 작동 방식 이미지 출처: https://developer.hashicorp.com/terraform/intro*

Terraform은 상태 파일을 사용하여 인프라의 현재 상태를 추적하고, 변경 사항을 증분식으로 업데이트합니다.

이렇게 Terraform은 인프라를 코드 형태로 정의하고 관리할 수 있게 해주는 강력한 IaC 도구입니다. IaC 접근 방식을 통해 인프라 프로비저닝과 변경 작업을 자동화하고 일관성을 높일 수 있습니다. 다음 포스팅에서는 Terraform과 Ansible을 비교하며 더 자세히 다루겠습니다.