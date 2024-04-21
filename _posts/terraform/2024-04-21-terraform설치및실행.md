---
layout: single
title: Terraform(테라폼) 설치 및 시작하기
categories: [terraform]
tags: [Terraform]
toc: true
author_profile: false
sidebar:
  nav: "counts"
---

![Terraform03](https://github.com/dongkoony/AskUp/assets/109497684/c1c3d57e-7048-47c4-b444-d575415b6eeb)

# Terraform 설치 및 시작하기

이번 포스팅에서는 `Terraform`을 설치하고 기본적인 사용법을 알아보겠습니다. Windows와 macOS 그리고 Linux(Ubuntu, Red Hat, SUSE, Amazon Linux) 모두를 다루며, AWS 리소스를 다루기 위한 AWS CLI 설치와 액세스 키 설정 방법도 함께 설명하겠습니다.

## Terraform 설치

### Windows

1. `Terraform` [공식 웹사이트](https://www.terraform.io/downloads.html){:target="_blank" title="Windows 다운로드"} 에서 최신 버전의 Windows 64비트 배포판을 다운로드합니다.

2. 다운로드한 zip 파일을 원하는 디렉터리에 압축을 해제합니다.

3. 시스템 환경 변수 편집기를 열고 "Path" 변수를 찾아 편집합니다. "새로 만들기"를 클릭하고 Terraform 바이너리 파일이 있는 디렉터리 경로(예: C:\Program Files\Terraform)를 추가합니다.

4. 새 명령 프롬프트 창을 열고 다음 명령어를 실행하여 설치를 확인합니다.

   ```
   terraform --version
   ```

### macOS

1. `Terraform` [공식 웹사이트](https://www.terraform.io/downloads.html){:target="_blank" title="Mac OS 다운로드"} 에서 최신 버전의 macOS 64비트 배포판을 다운로드합니다.

2. 다운로드한 zip 파일의 압축을 해제합니다.

3. 터미널 창을 열고 다음 명령어를 실행하여 Terraform 바이너리를 `/usr/local/bin` 디렉터리로 이동시킵니다.

   ```bash
   mv ~/Downloads/terraform /usr/local/bin/
   ```

4. 다음 명령어를 실행하여 설치를 확인합니다.

   ```
   terraform --version
   ```



### Linux

#### Ubuntu

1. 터미널 창을 열고 다음 명령을 실행하여 `HashiCorp GPG` 키를 추가합니다.

   ```bash
   wget -O- https://apt.releases.hashicorp.com/gpg | \
    gpg --dearmor | \
    sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
   ```

2. HashiCorp Terraform 저장소를 추가합니다.

   ```bash
   echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
    https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
    sudo tee /etc/apt/sources.list.d/hashicorp.list
   ```

3. Terraform를 설치합니다.

   ```bash
   sudo apt update
   sudo apt install terraform
   ```
   
#### Red Hat/CentOS

1. 터미널 창을 열고 `HashiCorp GPG` 키를 추가합니다.

   ```bash
   sudo rpm --import https://rpm.releases.hashicorp.com/RHEL/hashicorp.asc
   ```

2. HashiCorp Terraform 저장소를 추가합니다.

   ```bash
   sudo tee /etc/yum.repos.d/hashicorp.repo <<EOF
   [hashicorp]
   name=HashiCorp Repository
   baseurl=https://rpm.releases.hashicorp.com/RHEL/\$releasever/\$basearch/stable
   enabled=1
   gpgcheck=1
   gpgkey=https://rpm.releases.hashicorp.com/RHEL/hashicorp.asc
   EOF
   ```

3. Terraform를 설치합니다.

   ```bash 
   sudo yum install -y terraform
   ```


#### SUSE

1. 터미널 창을 열고 `HashiCorp GPG` 키를 추가합니다.

   ```bash
   sudo rpm --import https://rpm.releases.hashicorp.com/SUSE/hashicorp.asc
   ```

2. HashiCorp Terraform 저장소를 추가합니다.

   ```bash
   sudo zypper addrepo https://rpm.releases.hashicorp.com/SUSE/hashicorp.repo
   ```

3. Terraform를 설치합니다.

   ```bash
   sudo zypper install -y terraform
   ```

#### Amazon Linux

1. 터미널 창을 열고 `HashiCorp GPG` 키를 추가합니다.

   ```bash
   sudo rpm --import https://rpm.releases.hashicorp.com/AWS/hashicorp.asc
   ```
   
2. HashiCorp Terraform 저장소를 추가합니다.

   ```bash 
   sudo tee /etc/yum.repos.d/hashicorp.repo <<EOF
   [hashicorp]
   name=HashiCorp Repository
   baseurl=https://rpm.releases.hashicorp.com/AmazonLinux/\$releasever/\$basearch/stable  
   enabled=1
   gpgcheck=1
   gpgkey=https://rpm.releases.hashicorp.com/AWS/hashicorp.asc
   EOF
   ```
   
3. Terraform를 설치합니다.

   ```bash
   sudo yum install -y terraform
   ```

## AWS CLI 설치 및 액세스 키 설정

`Terraform`으로 AWS 리소스를 다루기 위해서는 AWS CLI와 액세스 키가 필요합니다.

### Windows

1. AWS CLI [공식 웹사이트](https://aws.amazon.com/cli/){:target="_blank" title="Windows 다운로드"} 에서 Windows 64비트 버전을 다운로드합니다.

2. 다운로드한 msi 파일을 실행하여 AWS CLI를 설치합니다.

3. 설치가 완료되면 명령 프롬프트 창을 열고 다음 명령어를 실행하여 AWS 액세스 키와 비밀 액세스 키를 입력합니다.

   ```
    // AWS Access Key, Secret Key 구성
    aws configure

    // 설정 AWS IAM 액세스 key
    AWS Access Key ID [None] :
    AWS Secret Access Key [None] :
    Default region name [None] : ap-northeast-2(서울)
    Default output format [None] : json

    // 등록 확인
    aws configure list

    // 여러 AWS 계정과 아이디로 운용할 경우
    aws configure --profile [원하는 이름]
   ```

   액세스 키는 AWS 콘솔의 보안 인증 > 액세스 키에서 생성할 수 있습니다.

### macOS

1. 터미널 창을 열고 다음 명령어를 실행하여 AWS CLI를 설치합니다.

   ```bash
   curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
   sudo installer -pkg AWSCLIV2.pkg -target /
   ```

2. 설치가 완료되면 다음 명령어를 실행하여 AWS 액세스 키와 비밀 액세스 키를 입력합니다.

   ```
    // AWS Access Key, Secret Key 구성
    aws configure

    // 설정 AWS IAM 액세스 key
    AWS Access Key ID [None] :
    AWS Secret Access Key [None] :
    Default region name [None] : ap-northeast-2(서울)
    Default output format [None] : json

    // 등록 확인
    aws configure list

    // 여러 AWS 계정과 아이디로 운용할 경우
    aws configure --profile [원하는 이름]
   ```

   액세스 키는 AWS 콘솔의 보안 인증 > 액세스 키에서 생성할 수 있습니다.

### Linux
#### Ubuntu

1. 터미널을 열고 다음 명령어를 실행하여 AWS CLI를 설치합니다.

   ```bash
   sudo apt-get update
   sudo apt-get install awscli
   ```

2. 설치가 완료되면 다음 명령어를 실행하여 AWS 액세스 키와 비밀 액세스 키를 입력합니다.

   ```
    // AWS Access Key, Secret Key 구성
    aws configure

    // 설정 AWS IAM 액세스 key
    AWS Access Key ID [None] :
    AWS Secret Access Key [None] :
    Default region name [None] : ap-northeast-2(서울)
    Default output format [None] : json

    // 등록 확인
    aws configure list

    // 여러 AWS 계정과 아이디로 운용할 경우
    aws configure --profile [원하는 이름]
   ```
#### Red Hat/CentOS

1. 터미널을 열고 다음 명령어를 실행하여 AWS CLI를 설치합니다.

   ```bash
   sudo yum install awscli
   ```

2. 설치가 완료되면 다음 명령어를 실행하여 AWS 액세스 키와 비밀 액세스 키를 입력합니다.

   ```
    // AWS Access Key, Secret Key 구성
    aws configure

    // 설정 AWS IAM 액세스 key
    AWS Access Key ID [None] :
    AWS Secret Access Key [None] :
    Default region name [None] : ap-northeast-2(서울)
    Default output format [None] : json

    // 등록 확인
    aws configure list

    // 여러 AWS 계정과 아이디로 운용할 경우
    aws configure --profile [원하는 이름]
   ```

#### SUSE  

1. 터미널을 열고 다음 명령어를 실행하여 AWS CLI를 설치합니다.

   ```bash
   sudo zypper install awscli
   ```

2. 설치가 완료되면 다음 명령어를 실행하여 AWS 액세스 키와 비밀 액세스 키를 입력합니다.

   ```
    // AWS Access Key, Secret Key 구성
    aws configure

    // 설정 AWS IAM 액세스 key
    AWS Access Key ID [None] :
    AWS Secret Access Key [None] :
    Default region name [None] : ap-northeast-2(서울)
    Default output format [None] : json

    // 등록 확인
    aws configure list

    // 여러 AWS 계정과 아이디로 운용할 경우
    aws configure --profile [원하는 이름]
   ```

#### Amazon Linux

1. 터미널을 열고 다음 명령어를 실행하여 AWS CLI를 설치합니다.

   ```bash
   sudo yum install awscli
   ```

2. 설치가 완료되면 다음 명령어를 실행하여 AWS 액세스 키와 비밀 액세스 키를 입력합니다.
   ```
    // AWS Access Key, Secret Key 구성
    aws configure

    // 설정 AWS IAM 액세스 key
    AWS Access Key ID [None] :
    AWS Secret Access Key [None] :
    Default region name [None] : ap-northeast-2(서울)
    Default output format [None] : json

    // 등록 확인
    aws configure list

    // 여러 AWS 계정과 아이디로 운용할 경우
    aws configure --profile [원하는 이름]
   ```

액세스 키는 AWS 콘솔의 보안 인증 > 액세스 키에서 생성할 수 있습니다.

### 액세스 키 하드코딩 또는 .aws 폴더 사용

위 방법 대신, 액세스 키와 비밀 액세스 키를 `Terraform` 코드에 직접 하드코딩할 수 있습니다.

```hcl
provider "aws" {
  region     = "us-west-2"
  access_key = "YOUR_ACCESS_KEY"
  secret_key = "YOUR_SECRET_KEY"
}
```

하지만 보안상의 이유로 이 방법은 권장되지 않습니다. 대신 `~/.aws/credentials`파일 **(Windows의 경우 %UserProfile%\.aws\credentials)에 키를 저장하는 것이 좋습니다.**

```bash
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY

[user2]
aws_access_key_id = OTHER_ACCESS_KEY
aws_secret_access_key = OTHER_SECRET_KEY
```

위와 같이 `~/.aws/credentials` 파일 **(Windows의 경우 `%UserProfile%\.aws\credentials)`에 액세스 키와 비밀 액세스 키를 저장할 수 있습니다.**

파일 내부에는 여러 개의 프로필을 정의할 수 있습니다. 프로필 이름은 대괄호 [ ] 안에 작성합니다.

[default] 프로필은 특별한 의미가 있으며, `AWS CLI`나 `Terraform`에서 **프로필을 지정하지 않으면 자동으로 `default` 프로필을 사용합니다.**
각 프로필에는 `aws_access_key_id`와 `aws_secret_access_key` 값을 지정해야 합니다.

아래 예시에서는 `default 프로필`과 `user2 프로필`이 정의되어 있습니다.
Terraform 코드에서 특정 프로필을 사용하고 싶다면 provider 블록에서 profile 인수를 지정하면 됩니다.

```hcl
provider "aws" {
  region  = "us-west-2"
  profile = "user2" #user2 access key
}
```
위 코드에서는 `user2` 프로필의 액세스 키와 비밀 키를 사용하게 됩니다.

프로필을 지정하지 않으면 default 프로필이 자동으로 사용됩니다.

이렇게 `~/.aws/credentials` 파일에 액세스 키를 저장해두면 `Terraform` 코드에 키를 하드코딩할 필요가 없어지므로 보안상 더 안전합니다. 또한 여러 개의 프로필을 관리할 수 있어 편리합니다.

AWS 액세스 키와 비밀 액세스 키는 AWS 콘솔에서 `IAM(Identity and Access Management)` 서비스를 통해 생성할 수 있습니다.

1. AWS 콘솔에 로그인합니다.
2. 서비스 목록에서 "IAM"을 선택합니다.
3. 좌측 메뉴에서 "액세스 관리" > "액세스 키"를 선택합니다.
4. "액세스 키 생성" 버튼을 클릭합니다.
5. 액세스 키 생성 방법을 선택합니다 (예: AWS 계정의 루트 사용자 액세스 키 또는 IAM 사용자의 액세스 키).
6. 액세스 키 생성이 완료되면 "액세스 키 ID"와 "비밀 액세스 키"가 표시됩니다.
7. 이 키 값들을 안전한 곳에 저장합니다.

생성된 액세스 키와 비밀 액세스 키는 `~/.aws/credentials` 파일에 저장할 수 있습니다.

## Terraform 시작하기

설치와 액세스 키 설정이 완료되었다면 실제로 `Terraform`을 사용해보겠습니다. 다음은 AWS EC2 인스턴스를 프로비저닝하는 예제입니다.

1. 작업 디렉터리를 만들고 `main.tf` 파일을 생성합니다.

2. `main.tf` 파일에 다음 내용을 작성합니다:

   ```hcl
   provider "aws" {
      region = "us-west-2"
      profile = "user2" #user2 access key
   }

   resource "aws_instance" "example" {
      ami           = "ami-0c94855ba95c71c99"
      instance_type = "t2.micro"

     tags = {
        Name = "TerraformExample"
     }
   }
   ```

   이 코드는 AWS 리전을 설정하고 t2.micro 인스턴스를 생성합니다.

3. 터미널(또는 명령 프롬프트)에서 작업 디렉터리로 이동합니다.

4. 다음 명령어를 차례로 실행합니다:

   ```
   terraform init
   terraform plan
   terraform apply
   ```

   - `init` 명령어는 `Terraform`을 초기화하고 프로바이더 플러그인을 설치합니다. `-upgrade` 옵션을 사용하면 최신 버전의 프로바이더로 업그레이드할 수 있습니다.
   - `plan` 명령어는 리소스 생성 계획을 보여줍니다. `-out` 옵션을 사용하면 계획을 파일로 저장할 수 있습니다.
   - `apply` 명령어는 계획된 작업을 실제로 수행합니다. `-auto-approve` 옵션을 사용하면 확인 프롬프트 없이 자동으로 적용됩니다.

5. 작업이 완료되면 AWS 콘솔에서 인스턴스가 생성된 것을 확인할 수 있습니다.

6. 더 이상 필요하지 않다면 다음 명령어로 인스턴스를 제거할 수 있습니다.

   ```
   terraform destroy
   ```

   `-auto-approve` 옵션을 사용하면 확인 프롬프트 없이 자동으로 삭제됩니다.

7. `terraform show`를 실행하면 현재 상태와 리소스 속성을 보여줍니다.

8. `terraform output`은 출력 값을 표시합니다. 출력 값은 코드에서 `output` 블록으로 정의할 수 있습니다.

9. `terraform fmt`는 코드를 정렬하고 포맷팅합니다.

10. `terraform validate`는 코드의 구문 오류를 검사합니다.

이렇게 해서 `Terraform`의 설치와 기본 사용법을 알아보았습니다. 간단한 예제를 통해 리소스 프로비저닝 과정을 익혔으며, 앞으로 더 복잡한 인프라를 `Terraform`으로 관리할 수 있습니다.
