---
toc: true
title: "Rest API 를 지원하는 gRPC 서버 구축하기"
date: 2021-01-29
categories: [ go,grpc,api ]
---

## 시작하기 앞서

gRPC 서버를 도입을 고려할 때 기존에 Rest API 로 구현된 클라이언트를 지원하지 못하는 이슈가 큰 걸림돌인 경우가 많이 있습니다. 기존의 클라이언트들 뿐 아니라 API 를 외부에 제공할 때도 gRPC 보다는 Rest API 가 훨씬 보편적으로 많이 사용되는 것도 이슈인데요. 이를 해결하기 위한 여러 시도 중에서 하나를 소개해드리고자 합니다. 이 튜토리얼을 통해 얻을 수 있는 점은 다음과 같습니다.

- 외부에 Rest API와 gRPC 인터페이스를 별도의 포트를 통해 제공
- 내부는 gRPC로 코드를 작성
- OpenAPI 스펙 페이지 제공

이 문서에 기록된 코드는 모두 [urunimi/grpc-open-api](https://github.com/urunimi/grpc-open-api)에서 확인하실 수 있습니다.

### 사전지식

- Protocol buffer 의 문법에 대해 알고 있습니다.
- Go 혹은 다른 언어로 웹서버를 띄우거나 유사한 경험을 해봤습니다.
- Open API 혹은 Swagger 에 대해 알고 있거나 접해봤습니다.

## API 정의

### 프로토콜 파일 작성

여기서는 `openapi.proto` 라는 이름으로 프로토콜 파일을 생성하겠습니다.
새로운 Article 생성 요청을 받아서 저장하는 인터페이스도 정의했습니다. `Article` 을 구성하는 요소는 간단하게 `Title`과 `Description`을 둡니다.

```protobuf
service ArticleService {
  rpc AddArticle(AddArticleRequest) returns (Article) {}
}

message AddArticleRequest {
    string title = 1;
    string description = 2;
}

message Article {
    // Id uniquely identifies an article. Output only.
    string id = 1;
    string title = 2;
    string description = 3;
    google.protobuf.Timestamp created_at = 4;
}
```

### 프로토콜 파일에 API Spec 추가

`ArticleService` 라는 이름의 service 안에 `AddArticleRequest` 라는 인터페이스를 추가했습니다.
요청과 응답형식에 대해서도 정의했습니다. 이 인터페이스를 Open API 로 제공하려면 rpc 인터페이스 안에 다음과 같은 `option` 코드를 추가하시면 됩니다.

```protobuf
  rpc AddArticle(AddArticleRequest) returns (Article) {
    option (google.api.http) = {
      post: "/api/v1/articles"
      body: "*"
    };
    option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {
      summary: "Add an article"
      description: "Add an article to the server."
      tags: "Articles"
    };
  }
```

#### option (google.api.http)

- `post` 방법
- `/api/v1/articles` 경로

로 API 를 제공한다는 말입니다.

#### option (openapiv2_operation)

API Spec 페이지에서 사용할

- 요약(summary)
- 설명(description)
- 태그(tags)

을 정의합니다.

새로운 리소스를 추가하는 인터페이스 외에 조회하는 인터페이스도 추가해보겠습니다. 여기서는 **stream** 을 사용해서 Rest 와 gRPC 응답을 다르게 받을 수 있도록 해볼게요.

```protobuf
  rpc ListArticles(ListArticlesRequest) returns (stream Article) {
    option (google.api.http) = {
      // Route to this method from GET requests to /api/v1/articles
      get: "/api/v1/articles"
    };
    option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {
      summary: "List articles"
      description: "List all articles on the server."
      tags: "Articles"
    };
  }
```

### API Spec 페이지 빌드

`Makefile` 파일을 확인하시면 두가지 함수를 제공하고 있습니다.

```sh
generate:
    protoc \
        -I proto \
        -I third_party/grpc-gateway/ \
        -I third_party/googleapis \
        --go_out=plugins=grpc,paths=source_relative:./proto \
        --grpc-gateway_out=paths=source_relative:./proto \
        --openapiv2_out=third_party/OpenAPI/ \
        proto/openapi.proto

    # Generate static assets for OpenAPI UI
    statik -m -f -src third_party/OpenAPI/
```

프로토콜 파일을 통해 gRPC서버를 위한 코드를 생성하고 정적 애셋에 사용할 파일들과 함께 Open API Spec 페이지를 위한 코드를 생성합니다.
여기서 눈여겨 볼 코드는 `xx_out` 부분인데요. 세가지 산출물을 만듭니다.

- `--go_out`: Go용 gRPC 서버용 산출물
- `--grpc-gateway_out`: Rest API 요청을 gRPC로 변환하기 위한 산출물
- `--openapiv2_out`: Open API 스펙을 제공하기 위한 산출물

```sh
install:
    go get -u \
        github.com/golang/protobuf/protoc-gen-go \
        github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway \
        github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2 \
        github.com/rakyll/statik
```

gRPC 서버를 띄우면서 Open API Spec 사이트에 필요한 의존성 코드들을 다운로드 합니다.

## gRPC 서버 코드 작성

### gRPC 인터페이스 코드 작성

gRPC 서버를 띄우는 최소한의 코드만 남겨봤습니다. 10000번 포트를 gRPC 용으로 사용합니다.
`RegisterArticleServiceServer` 의 파라미터로 전달하는 `server.New()` 의 경우 위 Makefile 의 `generate` 를 통해 생성된 gRPC 서버의 인터페이스들을 구현한 객체를 넘기시면 됩니다.

```go
addr := "0.0.0.0:10000"
lis, err := net.Listen("tcp", addr)

s := grpc.NewServer()
openapi.RegisterArticleServiceServer(s, server.New())
```

### Open API 와 Rest 인터페이스 코드 작성

Rest API 로 온 요청을 gRPC 로 보내는 방법은 다음과 같습니다.

- Rest API 로 온 요청을 gRPC 요청으로 변환
- gRPC 요청을 보내는 클라이언트를 구현해서 위에서 띄운 gRPC서버로 요청을 보냄

이를 구현해보면, 먼저 gRPC 클라이언트가 사용할 연결을 생성합니다. 여기서 dialAddr 은 위의 gRPC서버에서 제공하는 호스트를 입력합니다.

```go
conn, err := grpc.DialContext(
    context.Background(),
    dialAddr,
    grpc.WithInsecure(),
    grpc.WithBlock(),
)
```

`grpc-gateway` 에서 제공하는 `runtime.NewServeMux` 를 사용해서 Rest API 요청을 gRPC 로 트랜스코드 할수 있도록 `gwmux` 를 만듭니다.

```go
gwmux := runtime.NewServeMux(
    runtime.WithErrorHandler(server.CustomErrorHandler),
)
err = openapi.RegisterArticleServiceHandler(context.Background(), gwmux, conn)
```

이제 Rest API 를 제공하는 서버를 띄웁니다. 여기서는 11000번 포트를 사용하도록 하겠습니다.

```go
gatewayAddr := "0.0.0.0:" + "11000"
gwServer := &http.Server{
    Addr: gatewayAddr,
    Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if strings.HasPrefix(r.URL.Path, "/api") {
            gwmux.ServeHTTP(w, r)
            return
        }
        oa.ServeHTTP(w, r)
    }),
}
```

이렇게 하면 10000번 포트로 gRPC 인터페이스를, 11000번 포트로 Rest API 를 제공하는 서버를 띄울 수 있습니다!

이제 이 서버의 동작을 확인할 수 있도록 실제 서버를 구현하고 테스트해보도록 하겠습니다.

## gRPC 인터페이스 구현

### gRPC Unary 인터페이스 구현

입력으로 받은 `AddArticleRequest` 로 article을 생성한 다음 인메모리(b.articles)에 추가 합니다.

```go
func (b *Backend) AddArticle(ctx context.Context, req *openapi.AddArticleRequest) (*openapi.Article, error) {
    article := &openapi.Article{
        Id:          uuid.Must(uuid.NewV4()).String(),
        Title:       req.GetTitle(),
        Description: req.GetDescription(),
        CreatedAt:   ptypes.TimestampNow(),
    }
    b.articles = append(b.articles, article)

    return article, nil
}
```

### gRPC Streaming 인터페이스 구현

인메모리에 있는 article 리스트를 응답으로 내려주는 `ListArticles` 도 구현합니다.
스트림 응답이므로 `ArticleService_ListArticlesServer` 에 `Send` 로 하나씩 응답을 내려주도록 합니다.

```go
// ListArticles lists all articles in the store.
func (b *Backend) ListArticles(_ *openapi.ListArticlesRequest, srv openapi.ArticleService_ListArticlesServer) error {
    for _, article := range b.articles {
        err := srv.Send(article)
        if err != nil {
            return err
        }
    }
    return nil
}
```

서버를 띄울 준비가 끝났습니다! 이제 gRPC 요청과 Rest 요청이 잘 동작하는지 확인해보도록 하겠습니다.

## gRPC 서버 구동 및 확인

### gRPC 함수 호출

gRPC 클라이언트로 위의 `AddArticleRequest` 요청을 보냅니다.
gRPC 요청에 대해 10000번 포트를 통해 제공하고 있으므로 호스트를 `0.0.0.0:10000` 로 설정합니다.

```json
{
  "title": "Title",
  "description": "Description"
}
```

그러면 아래와 같은 응답을 통해 새로운 Article 등록 요청이 잘 된것을 확인 할수 있습니다.

```json
{
  "id": "27393acb-4186-48b1-bbb4-e6208c08b125",
  "title": "Title",
  "description": "Description",
  "created_at": {
    "seconds": "1612254929",
    "nanos": 141063000
  }
}
```

### Rest API 함수 호출

Article 리스트를 불러오는 함수는 Rest API 로 호출해보도록 하겠습니다. gRPC Open API 서버가 두개의 포트로 각기 다른 프로토콜을 지원하기 때문에 11000번 포트로 요청을 전송합니다.

```sh
curl -X GET "http://0.0.0.0:11000/api/v1/articles"
```

그러면 아래와 같이 json 형식으로 응답하는 것을 확인할 수 있습니다. Rest API는 Streaming을 지원하지 않기 때문에 모든 응답을 한꺼번에 준 것을 확인할 수 있습니다.

```json
{"result":{"id":"27393acb-4186-48b1-bbb4-e6208c08b125","title":"Title","description":"Description","createdAt":"2021-02-02T08:35:29.141063Z"}}
{"result":{"id":"e750d098-ba60-406f-a439-43f4f08a62cc","title":"Title2","description":"Description2","createdAt":"2021-02-02T08:57:12.614560Z"}}
```
