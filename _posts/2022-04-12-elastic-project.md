---
published: true
title:  "[elastic 프로젝트] 애플리케이션 검색 웹 서비스 만들기"
excerpt: ""
categories:
- Elastic
tags:
- [elastic cloud, elasticsearch, logstash, kibana, django, python]
last_modified_at: 2022-05-01
---

> 상명대학교 elastic 팀 프로젝트에 참여하며 공부했던 것들을 기록하기 위해 작성한 글 ( 2022.02.08 - 2022.04.29 )

<br>

이 글에선 elastic cloud를 사용하며 크롤러를 이용해 데이터를 수집하고, 로그스태시를 이용해 데이터를 cloud 내에 저장한다. 데이터를 직접 관리할 수 있도록 만들어서 최종 결과물로 애플과 안드로이드 어플 모두 검색 가능한 검색 웹 서비스를 제공하는 것까지가 이 글에 담은 내용이자 팀의 목표였다. ( 크롤러 작성하는 부분과 대시보드를 제작하는 과정을 담지 않았습니다. )

어플 데이터를 앱스토어와 구글 플레이스토어에서 크롤링하여 수집했고, 엘라스틱에 저장하는 것까지 완료했지만, 프로젝트 데드라인 때문에 앱 스토어 데이터 index만 사용하여 웹 사이트를 구현하게 되었다. elastic 클라우드를 5월 전까지 지원해주셔서 데드라인이라고 표현한 것이고, 결과물이 아쉬워도 마무리해야 했지만, 내 로컬에 ELK 스택을 설치하여 웹 사이트를 마무리 짓는 것은 마음만 먹으면 언제든지 가능하다. 


<br>

앱 데이터는 `3월 15일` 부터 수집하였고, 하루에 한 번으로 크롤러 주기를 설정했다. 크롤링 결과를 저장한 index의 storage size를 확인했을 때 1-2mb 정도로 작아서 년 단위로 크롤링 주기를 설정해도 괜찮겠다는 피드백을 받았었다.

<br>

## 데이터 수집, 저장, 관리

먼저 구글 플레이스토어와 애플의 앱스토어에서 앱 데이터를 크롤링하기 위해 각각의 **크롤러를 구현**했다. (팀 내에서 담당하지 않은 부분입니다.) 

그리고 크롤링 한 데이터를 elastic에 업로드하기 위해 [파이썬의 elastic API](https://elasticsearch-py.readthedocs.io/en/v8.1.1/)를 사용하려 했지만, 파이썬 코드 내에서 문제가 생길 경우 크롤링 과정에서 발생한 것인 지 업로드 과정에서 발생한 것인 지 등 문제를 정확히 파악하고 수정하기 위해 **로그스태시를 이용하여 업로드**하기로 결정했다. 


크롤링한 데이터를 `json` 파일로 저장했고, 로그스태시의 `conf` 파일을 아래처럼 구성했다. 틀은 비슷하기 때문에 앱스토어의 데이터를 저장하는 과정을 작성했다.
```ruby
input {
    file {
        path => "/[파일이 저장된 경로]/*.json"
        codec => "json"
    }
}

filter {
    # 불필요한 필드 제거
    mutate {
        remove_field => ["advisories", "appletvScreenshotUrls", "artistId", "artistName", "artistViewUrl", "artworkUrl100", "artworkUrl512", "averageUserRating", "bundleId", "ChartCountry", "ChartDevice", "contentAdvisoryRating", "currency", "features", "fileSizeBytes", "formattedPrice", "genreIds", "genres", "ipadScreenshotUrls", "iPadSupport", "iPhoneSupport", "isGameCenterEnabled", "isVppDeviceBasedLicensingEnabled", "kind", "languageCodesISO2A", "minimumOsVersion", "primaryGenreId", "screenshotUrls", "sellerUrl", "supportedDevices", "trackCensoredName", "trackContentRating", "userRatingCount", "userRatingCountForCurrentVersion", "version", "wrapperType", "CrawlingTimes", "event", "host", "log.file.paath", "releaseNotes"]
    }
}

output {
    # elastic cloud에 접속해서 데이터를 삽입하기 위해 적은 Rest API key
    elasticsearch {
        cloud_id => "[Cloud ID]"
        ssl => true
        ilm_enabled => false
        user => "[user]"
        password => "[password]"
        index => "%{ChartName}-apple-%{+YYYY-MM-dd}"
  }
}
```

대괄호 안에 적은 내용은 다르게 채워야 하는 내용이다. 위 코드의 input에서 file을 여러 개 넣어 아래처럼 index를 구성했다. 

<br>

- 앱 스토어 관련 인덱스
	1. 모든 앱에 대한 무료 인기 차트: topfree-apple-YYYY-MM-DD
	2. 모든 앱에 대한 유료 인기 차트: toppaid-apple-YYYY-MM-DD
	3. 모든 앱에 대한 앱 수입 차트: topgrossing-apple-YYYY-MM-DD
	4. 하위 카테고리에 대한 무료 인기 차트: category-topfree-apple-YYYY-MM-DD-"카테고리 ID"


- 플레이 스토어 관련 인덱스:
	1. 모든 앱에 대한 무료 인기 차트: topfree-google-YYYY-MM-DD
	2. 모든 앱에 대한 유료 인기 차트: toppaid-google-YYYY-MM-DD
	3. 모든 앱에 대한 앱 수입 차트: topgrossing-google-YYYY-MM-DD
	4. 하위 카테고리에 대한 무료 인기 차트: category-topfree-google-YYYY-MM-DD-"카테고리이름"

<br>

또한 인덱스 내에 필요한 필드들의 기존 매핑정보를 확인한 뒤 `index templates`을 생성할 때, **매핑 정보를 수정**하는 과정을 거쳤다. 

|                    | app store                          | 자료형        | play store  | 자료형               |
| ------------------ | ---------------------------------- | ------------- | ----------- | -------------------- |
| 아이콘 이미지 주소 | artworkUrl60                       | keyword       | icon        | keyword              |
| 현재 평점          | averageUserRatingForCurrentVersion | float         | score       | double > float       |
| 앱 링크            | trackViewUrl                       | keyword       | url         | keyword              |
| 앱 이름            | trackName                          | text, keyword | title       | text > text, keyword |
| 출시일             | releaseDate                        | date          | released    | date                 |
| 메인 장르          | primaryGenreName                   | text, keyword | genre       | text, keyword        |
| 업데이트 시간      | currentVersionReleaseDate          | date          | updated     | date                 |
| 판매자명           | sellerName                         | keyword       | developer   | keyword              |
| 모든 카테고리      | genres                             |               |             |                      |
| 가격               | price                              | float         | price       | float                |
| 상세설명           | description                        | text, keyword | description | text > text, keyword |
| 순위               | Ranking                            | byte          | Ranking     | byte                 |

<br> 

마지막으로 최종 결과물인 웹 페이지에 보여주기 위한 키바나 대시보드를 구성하였다. ( 팀 내에서 담당하지 않은 부분으로 대시보드의 일부만 가져왔다. ) 


<p align="center"><img height="70%" width="80%" src="https://user-images.githubusercontent.com/83692497/162900592-99b850dc-0889-4428-bb7c-0688d064f908.jpg"/>
<img height="70%" width="80%" src="https://user-images.githubusercontent.com/83692497/162900639-4ea61732-9e0f-4b3f-830d-cca88a239f8c.jpg"/></p>


<br>

## Django로 검색 웹 서비스 구현하기
웹 구현이 팀 내에서 맡은 부분이고, 위에서 얘기했듯이 앱 스토어 데이터 index 하나만 사용하여 웹 사이트를 구현하였다. 다음과 같은 순서로 글을 작성했다.

- Django 선택 이유
- 인덱스 설정 (reindex API)
- 

### Django를 선택한 이유

Django를 선택한 이유는 미리 만들어진 라이브러리가 많기 때문에 개발 시간을 단축시킬 수 있을 것 같았고, 팀원 대부분이 python 언어를 사용한 경험이 있어서 python 기반의 웹 프레임워크를 사용한다면 내 코드를 이해하는 데 큰 어려움은 없을 거라 생각되어 선택하게 되었다. 

또한 프론트엔드 부분에서 Django templates를 사용한 이유는 프로젝트가 모든 앱 데이터를 보여주는 페이지, 검색하면 결과를 보여주는 페이지 등 모두 컨텐츠 위주라서 쉽고 빠르게 구현할 수 있겠다 생각이 들었다.

여기서는 검색에 중점을 두었지만, 앱 데이터의 히스토리에 중점을 두어 우리 팀만의 히스토리를 만들고, 그걸 웹 사이트 내에 나타내어 사용자가 시간에 따른 앱의 트렌드 등을 볼 수 있도록 만든다면 좋은 서비스가 나왔을 거라 생각한다. 그렇게 만드려면? index template을 이용하여 데이터를 나타내야 하는 것인지.. 머릿속으로 잘 그려지지 않았다. 이 부분은 계속해서 고민해 보아야겠다.


### 인덱스 설정
tag는 index의 genres 필드에서 데이터를 추출하여 구성하고자 했다. 그런데 index의 필요한 필드를 정하는 회의에서 다른 팀원과의 커뮤니케이션 오류로 genres 필드를 제거하게 되어서 필드가 포함된 test index( `testtest-topfree-apple-2022-03-13` )를 따로 만들어 사용하였다. 

또한 검색 엔진을 구현하기 위해 한글 형태소 분석기인 **nori**를 사용했다. test index에 nori를 적용하기 위해 구글링한 결과 index를 생성하는 과정에서 setting에 nori를 걸어주는 방법은 찾았지만, 생성한 뒤 적용하는 방법에 대해선 찾지 못했다.

다시 새로 만드는 방법보다는 **`_reindex API`를 이용하여 새 index로 재색인하는 방법**이 적합하다고 생각했다. index setting에 nori를 걸어주고, 위에서 정의한 mapping 정보를 입력하여 `ssbinn_index` index를 먼저 생성하고, index에 들어갈 도큐먼트들을 색인했다. dev tools에서 작업했고, mapping 할 때 앱 이름과 설명에서 분석할 수 있도록 trackName과 description에 'my_analyzer'를 설정해주었다.

<details>
<summary>reindex로 새 index 재색인하기</summary>
<div markdown="1">

```
PUT ssbinn_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "type": "custom",
          "tokenizer": "nori_tokenizer"
        }
      }
    }
  }, 
  "mappings" : {
    "dynamic_templates" : [ ],
    "properties" : {
      "@timestamp" : {
        "type" : "date"
      },
      "@version" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        }
      },
      "ChartField" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        }
      },
      "ChartName" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        }
      },
      "Ranking" : {
        "type" : "byte"
      },
      "artworkUrl60" : {
        "type" : "keyword"
      },
      "averageUserRatingForCurrentVersion" : {
        "type" : "float"
      },
      "currentVersionReleaseDate" : {
        "type" : "date"
      },
      "description" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        },
        "analyzer": "my_analyzer"
      },
      "log" : {
        "properties" : {
          "file" : {
            "properties" : {
              "path" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              }
            }
          }
        }
      },
      "price" : {
        "type" : "float"
      },
      "primaryGenreName" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        }
      },
      "releaseDate" : {
        "type" : "date"
      },
      "sellerName" : {
        "type" : "keyword"
      },
      "trackId" : {
        "type" : "long"
      },
      "trackName" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        },
        "analyzer": "my_analyzer"
      },
      "trackViewUrl" : {
        "type" : "keyword"
      },
      "genres" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        }
      }
    }
  }
}
POST _reindex
{
  "source": {
    "index": "testtest-topfree-apple-2022-03-13"
  },
  "dest": {
    "index": "ssbinn_index"
  }
}
```
</div>
</details>

<br>

### Django, elastic cloud 연동

[공식 문서](https://www.elastic.co/guide/en/elasticsearch/client/python-api/7.17/connecting.html) 참고하여 장고에서 elastic cloud에 접근하기 위해 아래의 코드를 사용했고, 웹 사이트에 `ssbinn_index` index를 불러 테스트 한 결과 오류없이 잘 작동하는 것을 확인했다. 
```python
es = Elasticsearch(
    cloud_id="[Cloud ID]",
    http_auth=("[user]", "[password]"),
    )
```

참고로 elastic 클라우드 서비스에서 nori를 사용하기 위해서는 클러스터를 배포할 때, Customize deployment 메뉴의 Manage plugins and settings 부분에서 analysis-nori 부분을 선택해야 한다고 한다.

<p align="center"><img width="80%" height="70%" alt="출처: elastic 가이드북" src="https://user-images.githubusercontent.com/83692497/166125868-854b20f2-afb5-452c-8d1a-14dfc901d15d.png"></p>

<br>

### view, 검색창 구현
함수 기반으로 view를 작성했다. GET 요청을 통해 전달 받은 keyword를 쿼리 문자열로 설정했고, 앱 이름(trackName)과 설명(description)을 쿼리할 필드로 설정하여 검색 결과를 응답하도록 구현했다. 

```python
# apps/view.py
def search_API(keyword):
    es = cloud_auth()  # elastic cloud 연동

    index = es.search(index="ssbinn_index")
    resp = es.search(
        index="ssbinn_index",
        body={
            "size": 10000,
            "query": {
                "multi_match": {
                    "query": keyword,
                    "fields": ["trackName", "description"],
                }
            },
        },
    )
    # fields: 쿼리할 fields들
    size = resp["hits"]["total"]["value"]

    list = []
    i = 0
    while i < size:
        if i == size:
            break
        temp = resp["hits"]["hits"][i]["_source"]
        temp["id"] = resp["hits"]["hits"][i]["_source"]["trackId"] 
        # 앱 고유 id로 앱 상세페이지를 접속하므로 추가함 
        
        list.append(temp)
        i += 1

    return list


def search(request):
    search_query = ''

    if request.GET.get("q"):
        search_query = request.GET.get("q")

    data = search_API(search_query)
    # ...생략
    return render(request, "apps/search.html", context)
```

```HTML
<!-- templates/home.html - 검색창을 둔 메인페이지 -->
<form class="w-full max-w-xl" method="get" action="{% url 'apps:search' %}">
    <input name="q" class="search-bar" placeholder="찾고 싶은 앱을 검색해보세요." />
</form> 
<!-- 생략 -->
```
```python
# apps/urls.py
from . import views

app_name = "apps"

urlpatterns = [
    path("search/", views.search, name="search"),
    # ...생략
]
```

`search.html` 코드는 가져오지 않았지만, 모든 소스코드는 [깃허브](https://github.com/ssbinn/applastic-django)에 커밋해두었다.
그리고 검색한 결과를 보여주는 페이지에서 pagination을 추가해 문제가 발생했었는데 그 부분은 [다음 글]()에 자세히 작성해두었다. 

<br>

### 검색 결과 확인
'배달'을 검색하여 나온 결과를 캡처한 화면이다. 화면에서 앱 제목과 설명에서 '배달'과 일치하는 앱을 표시했으며, elasticsearch에서 전달해주는 결과를 그대로 나타내었다. 자세히 얘기하면 elasticsearch의 검색 결과 표시되는 score 점수가 있는데, 이 점수는 검색된 결과가 얼마나 검색 조건과 일치하는 지를 나타내며 점수가 높은 순으로 결과를 보여준다. 
<p align="center"><img width="80%" height="70%" src="https://user-images.githubusercontent.com/83692497/166138045-a74e5ad2-e958-4a2e-8274-d660a1daf802.JPG"></p>

기초적인 검색 기능을 구현한듯 보이지만, nori 형태소 분석기를 '사용자 사전'없이 사용하며 다른 예외처리(ex. 오타를 검색 했을 경우) 등을 하지 않았기 때문에 원하는 결과를 항상 얻지 못한다. 예를 들어 '생생한'을 검색 시 모든 앱이 출력되지만, 그 중에 앱 이름이나 앱 설명이 검색 조건과 일치해서 결과로 나타난 앱은 없다. 기회가 된다면 유연한 검색 엔진으로 개선시켜 보고 싶다. 마지막으로 구현 완료된 웹 사이트이다. 

<br>

### 웹 사이트 최종 모습

<p align="center"><img width="80%" height="70%" src="https://user-images.githubusercontent.com/83692497/166140329-e9d9c114-f0fd-4dac-86c0-14600fa8ef59.JPG">
<img width="80%" height="70%" src="https://user-images.githubusercontent.com/83692497/166140359-87fa2cac-962f-4c55-a228-ccfd288eeb69.JPG">
<img width="80%" height="70%" src="https://user-images.githubusercontent.com/83692497/166140362-31b31fef-bf53-43ee-9f33-e76124d2a889.JPG">
</p>

<br>

## 참고
- Python Elasticsearch API
  - https://elasticsearch-py.readthedocs.io/en/v8.1.1/
  - https://elasticsearch-py.readthedocs.io/en/7.x/
  
- [elastic 가이드북](https://esbook.kimjmin.net/06-text-analysis/6.7-stemming/6.7.2-nori)

- [Django, elastic cloud 연동](https://www.elastic.co/guide/en/elasticsearch/client/python-api/7.17/connecting.html)
  
- [검색 기능 구현](https://blog.nerdfactory.ai/2019/04/29/django-elasticsearch-restframework.html)

- [tailwind css 공식문서](https://tailwindcss.com/docs/installation)
