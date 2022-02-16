---
layout: single
classes: wide
title:  "내 언어로 글로벌 검색 서비스 제공하기 종합 가이드 - PART 2"
tagline: "Providing global search services in your language"
header:
  overlay_image: /assets/images/background-2.jpg
typora-copy-images-to: /assets/images
---



앞선 글에서 언급한 SaaS 솔루션들을 활용하여 간단한 샘플을 만들어 보자.



## 📐 Architecture



### Upload System

![upload_arch](../assets/images/upload_arch.png)

AWS의 소프트웨어로 Candidate Idea를 구체화한 upload system이다. 

> 1. 사용자가 컨텐츠와 정보를 AWS의 API Gateway를 통해 sever에 전달한다. 
> 2. 전달된 데이터 중, 컨텐츠는 S3저장소에 저장시키고 metadata는 database인 DynamoDB에 저장한다.
> 3. DynamoDB의 Stream 을 통해 정보가 저장되었다는 notification을 받은 후, metadata를 영어로 번역한다.
> 4. 번역된 키워드들을 ElasticSearch/OpenSearch로 Indexing 시킨다.
> 5. Indexing이 실패한다면, AWS SQS에 해당 작업이 성공할 때까지 Loop 코드를 실행한다. DB와 Search Engine간 data 동기화가 될 수 있도록 한다.



---



#### Upload System 구성하기



##### API Gateway



|           Path           |  Type  |                            Lambda                            |
| :----------------------: | :----: | :----------------------------------------------------------: |
| `/upload-batch-projects` | `POST` | [upload-batch-projects](https://github.com/KineMasterCorp/MultilingualSearch-sample/tree/main/lambda/upload-projects/upload-batch-projects) with `NodeJS` |

API Gateway에서의 목적은 upload 에 해당하는 API call이 호출되면 AWS lambda를 이용하여 컨텐츠는 저장소에, title과 tags와 같은 메타데이터는 database에 저장하는 것이다.

우선 적절한 이름으로 AWS의 API Gateway를 생성해보자. 생성이 되었다면, 위의 테이블 항목과 같이 API Gateway의 Path를 POST 타입으로 생성하자. 이제 실제 Call이 왔을 때 실행시켜줄 lambda 함수와 연결할 준비를 하면 된다.







---



##### Lambda for uploading projects



[upload-batch-projects](https://github.com/KineMasterCorp/MultilingualSearch-sample/tree/main/lambda/upload-projects/upload-batch-projects) lambda 코드로 lambda 함수를 만들고 API Gateway와 연결하자. 

👉 serverless framework를 통해 패키지를 구성하여 배포해도 된다. 



![uploading-labmda](../assets/images/upload-batch-projects-lambda.png)



이제 lambda 함수에 IAM 권한을 부여해야한다.

- AWSLambdaBasicExecutionRole

- AmazonDynamoDBFullAccess

  
  
  

👉 편의상 컨텐츠에 해당하는 데이터를 S3와 같은 저장소에 삽입하는 코드는 생략했다. 필요하다면 저장소 권한도 부여해야 한다.

![upload-batch-projects-iam](../assets/images/upload-batch-projects-iam.png)



이제 아래의 JSON과 같은 포맷으로 API Call을 하게 되면 DynamoDB에 정보가 삽입 될 것이다. 

```json
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





---



##### Database with DynamoDB



이제 컨텐츠 정보가 담길 DynamoDB를 생성하자.  여기에서는 table 이름을 project로, 파티션 키는 유니크한 값을 가질 수 있는 project id 값으로, 정렬 키는 title로 설정했다. 



<img src="../assets/images/dynamodb-create.png" alt="dynamodb-create" style="zoom: 50%;" />





또한, 검색 엔진과 data 동기화가 되어야 하기 때문에 DynamoDB에 삽입/삭제와 같은 변경이 생긴다면 이를 알려주는 트리거 기능 또한 설정해야한다. 



<img src="../assets/images/dynamodb-trigger.png" alt="dynamodb-trigger" style="zoom:50%;" />



이제 DynamoDB에서 변경이 있을 때마다 index-project 로 해당 정보가 notification 된다.





---



##### Lambda for indexing to Search Engine



|                            Lambda                            | Lambda Language |
| :----------------------------------------------------------: | :-------------: |
| [index-project](https://github.com/KineMasterCorp/MultilingualSearch-sample/tree/main/lambda/index-project) |    `Python`     |





이번에는 python으로 되어있는 코드를 packaging하여 lambda 함수로 배포해보자. 



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



index-project lambda 코드에서는 dynamoDB로 부터 전달된 메타데이터(title/tags) 정보를 검색엔진에 indexing 한다.

눈여겨 봐야할 점은 사용자의 검색어 그대로 indexing 하는 것이 아니라, 서두에 언급한 바와 같이 검색어를 영어로 변경하여 indexing 해야 하는 점이다.



```python
	try:
        # The Lambda function calls the TranslateText operation and passes the 
        # review, the source language, and the target language to get the 
        # translated review. 
        result = translate.translate_text(Text=title, SourceLanguageCode='auto', TargetLanguageCode='en')
        title_translated = result.get('TranslatedText')
        logger.info("Title translation input: " + title + ", output: " + title_translated)
    except Exception as e:
        logger.error("[Title Translate ErrorMessage]: " + str(e))
        raise Exception("[Title Translate ErrorMessage]: " + str(e))
    
    # Translate tags
    translated_tags = []
    for tag in tags:
        try:
            result = translate.translate_text(Text=tag, SourceLanguageCode='auto', TargetLanguageCode='en')
            tag_translated = result.get('TranslatedText')
            logger.info("Tag translation input: " + tag + ", output: " + tag_translated)
            translated_tags.append(tag_translated)
        except Exception as e:
            logger.error("[Tag Translate Fail]: (" + tag + "):" + str(e))
            translated_tags.append(tag) # Put the original tag string when translation failed.
```



index-project 코드 중 일부이다. AWS python SDK(Boto3)를 사용하여 translate 기능을 수행한다.

translate_text의 인자인 SourceLanguageCode에 'auto' 값이 아닌 정확한 target을 지정한다면 조금 더 좋은 번역 품질을 기대할 수 있다. 



index-project lambda 함수 또한, IAM 권한을 부여해야 한다.

* AWSLambdaDynamoDBExecutionRole
* TranslateReadOnly
* AmazonOpenSearchServiceFullAccess
* AWSXRayDaemonWriteAccess





<img src="../assets/images/index-project-iam.png" alt="index-project-iam" style="zoom:50%;" />

> 참고: 이 권한에 필요한 것보다 더 넓은 범위를 사용하고 있다. 구현에 필요한 최소한의 보안 권한을 사용하는 것을 고려해야한다.



---

##### OpenSearch 설정

이제 마지막으로 OpenSearch를 설정하면 upload system의 구성을 완료 할 수 있다.

###### OpenSearch Instance 생성
1. AWS Console 의 OpenSearch 에서 Create Domain 클릭
2. Domain name 입력 (예: multilingual-search-sample)
3. Deployment type 은 "Development and testing" 으로 선택하고 version 은 latest 로 선택한다.
4. Auto-Tune 섹션은 default 로 그대로 둔다.
5. Data nodes 섹션에서 Instance type 을 "t3.small.search" 로 선택한다. 우리는 테스트 용도로 사용할 것이기 때문에 가장 작은 인스턴스로도 충분하다. 컴퓨팅 파워가 높은 instance 를 선택할 경우 비용이 청구될 수도 있으므로 주의하자. 이 섹션의 다른 부분은 default 그대로 두면 된다.
6. Dedicated master nodes 섹션은 default 로 그대로 둔다. (Disable 상태)
7. Warm and cold data storage 와 Snapshot configuration 섹션도 그대로 둔다.
8. Network 섹션에서 Network 는 Public access 로 선택한다.
9. Fine-grained access control 을 Enable 하고 Create master user 를 선택해서 username 과 password 를 입력해 master user 를 생성하자. 이 master user 는 OpenSearch dashboard 에 접속할 때 사용한다.
10. SAML 과 Amazon Cognito authentication 섹션은 그대로 둔다.
11. Access policy 섹션에서 "Only use fine-grained access control" 을 선택한다.
12. 나머지는 그대로 두고 Create 버튼을 눌러 Domain 을 생성하자. Domain 생성이 완료 되기 까지 약간의 시간이 걸릴 수 있다. Domain 생성이 완료 되면 Domain 의 status 가 Active 로 바뀔 것이다.

###### OpenSearch Index 생성

OpenSearch Domain 생성이 완료 되면 실제 검색에 필요한 인덱스를 생성해야 한다. DynamoDB 에 문서가 Upload 될 때 index-project Lambda 가 호출될 것이고, 이 Lambda 에서 OpenSearch 로 Upload 된 문서의 meta data 를 indexing 하는데 이 정보를 저장할 Index 를 생성하는 것이다.

우리는 OpenSearch dashboard 의 Dev Tool 을 이용해 Index 를 생성해 볼 것이다. 물론 DEV Tool 에서 실행하는 request 를 Domain 의 endpoint 로 보내는 방법을 이용해서도 동일한 index 생성이 가능하다.
OpenSearch Domain 의 Name 을 클릭하면 상세 정보가 나오는데 이 화면의 우측 상단의 OpenSearch Dashboards URL 을 클릭하면 OpenSearch dash bodard 로 접속할 수 있다. 앞서 생성한 master user 의 username 과 password 를 입력해서 접속하자.
좌측 상단의 OpenSearch Dashboards 로고 아래에 있는 메뉴를 클릭해서 나오는 창에서 Management 섹션의 Dev Tools 를 클릭하면 OpenSearch 명령어를 쓸 수 있는 Console 이 나타난다.
여기에서 아래 명령어를 입력하고 우측 실행 버튼을 클릭해서 실행하면 Index 가 생성된다.

```
PUT projects
{
  "mappings": {
    "properties": {
      "projectID": {
        "type": "keyword",
        "index": false
      },
      "title": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "title_translated": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          },
          "english": {
            "type": "text",
            "analyzer": "english"
          }
        }
      },
      "tags": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "tags_translated": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          },
          "english": {
            "type": "text",
            "analyzer": "english"
          }
        }
      },
      "imageURL": {
        "type": "keyword",
        "index": false
      }
    }
  }
}
```

위의 코드는 projectID, title, title_translated, tags, tags_translated, imageURL 필드를 가지는 Index 를 생성하는 것이다. 각 필드의 설명은 아래 테이블을 참조하자.

| : Field : | Description |
| :--------------------: | :-------------: |
| projectID | 고유한 문서의 id 값 |
| title | 문서의 제목 |
| title_translated | 영어로 번역된 title |
| tags | 문서의 tag 들 |
| tags_translated | 영어로 번역된 tags |
| imageURL | 문서 데이터 |

title_translated 필드와 tags_translated 필드는 multiple field 로 english field 를 가지는데 여기에는 english analyzer 로 분석한 결과가 자동으로 들어가게 된다. 이는 형태소 분석을 통해 완전히 일치하지 않는 키워드도 검색을 가능하게 하도록 함이다.