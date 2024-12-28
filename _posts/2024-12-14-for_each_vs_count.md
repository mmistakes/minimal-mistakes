---
layout: single
title:  "count와 for_each의 차이?"
categories: Terraform
tag: [Terraform]
author_profile: false
sidebar:
    nav: "docs"
---

**[공지사항]** 
이전부터 학습하고 연구한 내용들을 함께 나누기 위해 최근 기술블로그를 개설하고 지속적으로 업로드하고 있습니다. 많은 관심과 피드백 부탁드립니다! 감사합니다 :)
{: .notice--success}

count와 for_each는 Terraform을 통해 동일한 리소스를 프로비저닝할 때 유용하게 쓰이는 구문입니다. 0.12 버전부터는 모듈을 개발할 때도 for_each와 같은 반복문을 활용할 수 있게 되었죠. 코드의 반복을 줄일 수 있다는 공통된 장점은 쉽게 알 수 있지만 이 두 가지는 어떤 차이점이 있을까요? 어떤 상황에 주로 쓰일 수 있을까요? 본 포스팅에서는 count와 for_each의 차이점과 적절한 사용 방법에 대해 작성해 보았습니다.

## 정해진 순서를 번호로 인덱스를 부여하는 count

```
variable "AWS_REGION" {
    default = "ap-northeast-2"
}

variable "project" {
    default = "projectA"
}

variable "ec2_instances" {
    type = list(map(string))
    default = [
        { suffix = "instance1"},
        { suffix = "instance2"},
        { suffix = "instance3"}
    ]
}

variable "PATH_TO_PUBLIC_KEY" {
  default = "mykey.pub"
}
```

```
module "ec2_instance" {
  source  = "terraform-aws-modules/ec2-instance/aws"

  count = length(var.ec2_instances)

  instance_type          = "t2.micro"
  key_name               = aws_key_pair.mykeypair.key_name
  monitoring             = true
  vpc_security_group_ids = ["sg-0f4e8438a0abe27e5"]
  subnet_id              = "subnet-06d6e8c3835a71d8f"

  name = "${var.project}_${var.ec2_instances[count.index].suffix}"

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }
}

resource "aws_key_pair" "mykeypair" {
  key_name   = "mykeypair"
  public_key = file(var.PATH_TO_PUBLIC_KEY)
}
```

각 인스턴스의 suffix가 ec2_instances 라는 list에 저장하고 ec2_instance 모듈을 사용하여 인스턴스를 생성해 보겠습니다. count는 **지정된 수만큼 리소스를 프로비저닝할 때** 사용하는 구문으로 정수값만 취급합니다. 그래서 ec2_instances 라는 list의 element 개수를 매개변수로 전달해 총 3대의 인스턴스를 suffix를 붙여 생성합니다.

<img title="" src="../../images/2024-12-14-for_each_vs_count/e27951ccef7a1c22513276666691bcafa83f3b93.png" alt="loading-ag-1014" data-align="center">

<img title="" src="../../images/2024-12-14-for_each_vs_count/0f4ebada39daeb71b17091306a332885bceecdcb.png" alt="loading-ag-1076" data-align="center">

terraform state list를 조회하면 ec2_instance 모듈을 통해 생성된 리소스가 0부터 2까지의 인덱스가 부여되었음을 알 수 있습니다. 이처럼 count는 0부터 시작하는 숫자를 인덱스로 부여하여 순서대로 생성하고 관리합니다. 그럼 여기서 두번째 인스턴스를 삭제하려고 하면 어떤 일이 발생할까요? 이를 위해 instance2 라는 suffix의 map element를 주석처리한 다음 코드를 전달받은 AWS provider가 어떤 식으로 처리하는지 확인해보겠습니다.

```
variable "ec2_instances" {
    type = list(map(string))
    default = [
        { suffix = "instance1"},
#        { suffix = "instance2"},
        { suffix = "instance3"}
    ]
}
```

<img title="" src="../../../images/2024-12-14-for_each_vs_count/20c1053c6cb810aff2b30adac1572197c2124d3f.png" alt="loading-ag-1036" data-align="center">

<img title="" src="../../images/2024-12-14-for_each_vs_count/ee04c8ee479952c49c52a56787f694582138b1b5.png" alt="loading-ag-1043" data-align="center">

오히려 projectA-instance3라는 이름을 가진 마지막 인스턴스를 삭제하고 두번째 인스턴스의 이름이 projectA_instance3으로 변경하게 됩니다. 다시 state list를 살펴보면

<img title="" src="../../images/2024-12-14-for_each_vs_count/2024-12-28-16-34-12-image.png" alt="loading-ag-1092" data-align="center">

0부터 1까지의 총 두 개의 인덱스가 부여되어 있습니다.

이렇게 count를 사용하면 중간의 element를 지우고 apply하게 될 때 인덱스를 0부터 다시 부여하게 됩니다. 따라서 instance1 suffix는 그대로 0을 갖게 되어 기존의 첫번째 인스턴스 naming을 그대로 유지하고, instance3 suffix가 1로 이동하여 두 번째 인스턴스를 naming하는데 사용됩니다. 결과적으로 두번째 인스턴스가 아닌 마지막 인스턴스가 삭제되게 됩니다.

## 고유한 key 값을 인덱스로 부여할 수 있는 for_each

count를 사용하고 나니 운영상의 불편함을 어느 정도 체감할 수 있었습니다. 그렇다면 for_each를 사용하면 이러한 문제를 해결할 수 있을까요? **vars.tf를 그대로 두고 for_each 구문을 아래와 같이 ec2_instances 변수 내 element의 value값을 key로, element 자체를 value로 둔 자료 형태를 갖도록 한 상태에서** 리소스들을 프로비저닝합니다.

```
module "ec2_instance" {
  source  = "terraform-aws-modules/ec2-instance/aws"

  for_each = { for instance in var.ec2_instances: instance.suffix => instance }

  name = "${var.project}_${each.value.suffix}"

  instance_type          = "t2.micro"
  key_name               = aws_key_pair.mykeypair.key_name
  monitoring             = true
  vpc_security_group_ids = ["sg-0f4e8438a0abe27e5"]
  subnet_id              = "subnet-06d6e8c3835a71d8f"

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }
}

resource "aws_key_pair" "mykeypair" {
  key_name   = "mykeypair"
  public_key = file(var.PATH_TO_PUBLIC_KEY)
}
```

<img title="" src="../../images/2024-12-14-for_each_vs_count/2024-12-28-17-37-01-image.png" alt="loading-ag-1116" data-align="center">

<img title="" src="../../images/2024-12-14-for_each_vs_count/2024-12-28-17-37-32-image.png" alt="loading-ag-1122" data-align="center">

state list를 확인해보니 이번에는 고유한 key 값을 인덱스로 부여한 것을 확인할 수 있습니다. 여기서 projectA-instance2 라는 인스턴스를 다시 삭제해 보겠습니다. 동일하게 instance2 라는 suffix의 map element를 주석처리하고 terraform plan을 실행하면 다음과 같은 결과가 출력됩니다.

<img title="" src="../../images/2024-12-14-for_each_vs_count/2024-12-28-17-49-40-image.png" alt="loading-ag-1134" data-align="center">

이번에는 의도한 대로 instance2 라는 인덱스를 가진 두번째 인스턴스만 삭제됩니다. 이처럼 for_each는 순서에 구애받지 않는 고유한 key값을 리소스와 mapping해요. 그래서 이후에 편집하거나 삭제하려고 하는 리소스를 명확하게 지정할 수 있다는 장점을 확인할 수 있었습니다.

## count vs for_each

shared storage를 기반으로 동일한 인스턴스를 생성하거나 혹은 naming 규칙이 필요 없이 **특정 수량**의 리소스를 빠르게 scale-out할 경우 등 **stateless**한 리소스를 프로비저닝할 땐 복잡한 하드 코딩 없이 count를 사용할 수 있습니다. count는 정수값을 취급하기 때문에 필요한 수량을 산출하여 입력하면 될 정도로 비교적 간단하게 쓰일 수 있는 구문입니다.

for_each는 주로 **map** 자료형을 기반으로 리소스에 고유한 naming을 적용하고 관리할 때 사용됩니다. 그래서 SSM parameter나 iam 사용자 등 count보다 더 많은 사용 사례를 갖게 됩니다. count를 아얘 사용하지 않는 것은 아니지만 엄격한 naming 규칙 아래 **stateful**한 리소스를 운영해야 되는 사례가 많아 for_each를 더욱 선호하게 되는 것 같아요. 하지만 상대적으로 count보단 코딩이 간단하지 않아서 굳이 필요하지 않은 상황에는 사용하지 않고 비교적 간단한 count를 사용하는 것이 terraform 코드의 가독성을 높일 수 있습니다.




