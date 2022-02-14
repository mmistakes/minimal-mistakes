---
layout: single
title:  "내 언어로 글로벌 검색 서비스 제공하기"
---

세계의 여러 나라에서 이용하는 서비스가 있다고 해보자. 

마침 그 서비스는 내가 만든 컨텐츠를 공유하고, 다른 사람들의 것들도 검색하여 그 컨텐츠들을 즐길 수 있다. 

그런데, 아쉽게도 우리나라에서 그 서비스가 런칭된지 얼마 되지 않아서인지 검색된 컨텐츠들이 빈약하기 그지 없다. 그러나 같은 뜻을 가진 단어를 다른 언어로 검색을 시도했더니, 내가 원하는 컨텐츠들이 넘쳐나는게 아닌가. 

위와 같은 상황이 벌어지는 것은, 공유된 컨텐츠의 제목이나 등록했던 태그들의 언어에서 비롯한다. 대부분의 사람들이 그들의 언어로 제목을 짓고, 태그들을 등록하기 때문이다. 

그렇다면 언어와 관계 없이 사용자에게 검색 경험을 어떻게 제공해 줄 수 있을까?

## Candidate Idea

위의 상황을 해결해 줄 수 있는 여러 방법들이 존재할 수 있겠지만, 여기에서는 우리가 생각하는 간단하고 효율적인 방법 하나를 소개하고자 한다.

기본 아이디어는 다음과 같이 두개로 나눌 수 있다.

<b>사용자가 컨텐츠를 등록할 때<b>
![upload_idea](/assets/upload_idea.png)
  

 {% include callout.html content="
  1. 사용자의 dominant 언어를 detect한다.
  2. detect된 사용자의 언어를 영어로 변경한다.
  3. 자연어 처리를 통해 키워드들을 선정한다.
  4. 선정된 키워드를 데이터베이스에 기록한다." 
  type="primary" %} 
  
  
<b>사용자가 컨텐츠를 검색할 때<b>
![search_idea](/assets/search_idea.png)
  
  ```
  1. 사용자가 자신의 언어로 검색을 시도한다.
  2. 사용자의 dominant 언어를 detect한다.
  3. detect된 사용자의 언어를 영어로 변경한다.
  4. 자연어 처리를 통해 키워드들을 선정한다.
  5. 선정된 키워드들을 이용하여 데이터베이스에 쿼리한다.
  ```

위의 두가지 Usecase 에 맞춰 필요한 기능은 먼저 **_사용자의 언어를 파악할 수 있어야 한다._** 인지 할 수 없는 언어는 아쉽게도 지원대상이 될 수 없다. 

그렇게  **_파악된 언어를 영어로 번역할 수 있어야 한다._** 우리의 목적은 특정 언어로 기록된 컨텐츠만 검색되는 문제를 해결하는 것에 있다. 이를 위해 업로드 된 컨텐츠의 정보를 영어로 번역하고, 검색어 또한 연어로 번역한다. 이렇게 검색 환경을 통일함으로써 사용자에게 적절한 검색 결과를 제공할 준비를 한다.

번역이 완료 되었으면 **_자연어 처리를 통해 키워드 형식으로 축출 할 수 있어야 한다._** 검색어가 하나의 키워드 일 수도 있고, 문장으로 되어 있을 수도 있기 때문이다. 

마지막으로 **_데이터를 저장할 데이터베이스와 검색엔진이 있어야 한다._** 우리가 처리해야할 데이터의 수는 많다고 가정할 때, 많은 양의 데이터를 저장하고, 효과적으로 검색 할 수 있는 기능들은 필수적이다. 또한, 자연어 처리된 키워드들은 복수 개일 수 있으며, 이에 대한 가중치 부여, 복합 쿼리등의 기능이 있어야 한다.

## Tools with SaaS

언어를 탐색하고, 번역하고, 분석하는 일은 분명 매력적인 일이 될 것이다. 하지만, 한 사람의 개발자가 혹은, 소규모의 팀이 진행하기에 확실히 효율적이지 못하다. 그래서 클라우드 기반의 소프트웨어를 찾아보는 것은 우리에게 좋은 옵션이 될 것이다.

|Translation|Natural Language Processing|Search Engine|
|:---:|:---:|:---:|
| `AWS Translate` | `AWS Comprehend` | `OpenSearch` |

사실 위의 기능을 다루는 다양한 플랫폼의 적절한 솔루션들이 존재한다. 그러나 이 글에서는 편의상 AWS에서 제공하는 소프트웨어들을 기반으로 살펴 보고자 한다.

## Archtecture

### Upload System

![search_idea](/assets/upload_arch.png)

AWS의 소프트웨어로 candidate idea를 구체화한 upload system이다. 

    1. 사용자가 컨텐츠와 정보를 AWS의 API Gateway를 통해 sever에 전달한다. 
    2. 전달된 데이터 중, 컨텐츠는 S3저장소에 저장시키고 metadata는 database인 dynamoDB에 저장한다.
    3. DynamoDB의 Stream 을 통해 정보가 저장되었다는 notification을 받은 후, metadata를 영어로 번역한다.
    4. 번역된 키워드들을 ElasticSearch/OpenSearch로 Indexing 시킨다.
    5. Indexing이 실패한다면, AWS SQS에 해당 작업이 성공할 때까지 Loop 코드를 실행한다. DB와 Search Engine간 data 동기화가 될 수 있도록 한다.
   
#### Upload System 구성하기

1. API Gateway

Name: UploadSystem

|Path|Type|Lambda|
|:---:|:---:|:---:|
| `/upload-batch-projects` | `POST` | [upload-batch-projects](https://github.com/KineMasterCorp/MultilingualSearch-sample/tree/main/lambda/upload-projects/upload-batch-projects) |

AWS API Gateway를 적절한 이름으로 생성해보자. (여기에서는  UploadSystem 란 이름으로 생성) API Gateway에 Call이 온다면 실행시켜줄 lambda 함수를 연결한다. 

2. Lambda for uploading projects

위의 연결된 lambda 코드에서는 DynamoDB에 데이터를 삽입한다. 편의상 컨텐츠에 해당하는 데이터를 S3와 같은 저장소에 삽입하는 코드는 생략했다. 

이제 아래의 JSON과 같은 포맷으로 API Call을 하게 되면 DynamoDB에 정보가 삽입 될 것이다.

```JSON
[
    {
       "title":"바다",
       "tags":["바다"],
       "imageURL":"https://URL..."
    },
    {
       "title":"seas",
       "tags":["seas"],
       "imageURL":"https://URL..."
    }
]
```

3. Notify that info rmation has been saved

DynamoDB의 내보내기 기능을 사용하면 DynamoDB의 변경사항이 있을 때마다 변경된 데이터와 함께 notification을 받을 수 있습니다.
![DynamoDB-Stream](/assets/DynamoDB-Stream.png)

4.  Lambda for indexing to Search Engine

|Type|Lambda|
|:---:|:---:|
| `Python` | [index-project](https://github.com/KineMasterCorp/MultilingualSearch-sample/tree/main/lambda/index-project)

> Python code 를 lambda packaging 하는 방법

```
1. Install dependencies

package directory 에 dependency 다운로드

pip install --target ./package requests 
pip install --target ./package requests_aws4auth
pip install --target ./package git+https://github.com/opensearch-project/opensearch-py.git

2. 소스 작성

Python 소스 파일을 (lambda_function.py) package 폴더의 상위 폴더에 넣는다.

3. zip 으로 묶기 (다운받은 package 들을 zip 으로 묶고 그 zip 파일에 작성한 소스 파일도 추가)

cd package
zip -r ../deploy_package.zip .
cd ..
zip -g deploy_package.zip lambda_function.py

4. deploy_package.zip 파일을 Lambda 에 업로드.
```
