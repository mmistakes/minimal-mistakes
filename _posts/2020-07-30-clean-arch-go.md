---
toc: true
title: "Go 언어로 Clean Architecture 시작하기"
date: 2020-07-30
categories: [ architecture,go ]
---

## 시작하기 앞서

이 문서에 기록된 코드는 모두 [urunimi/ddd-go](https://github.com/urunimi/ddd-go) 에서 확인하실 수 있습니다.

가장 먼저 해야할 일은 해당 서비스에서 개발하고자 하는 Use case 를 정의하는 일입니다.

### 제공할 기능 목록

위 샘플 프로젝트에서 제공할 기능은 다음과 같습니다. 가장 기본적인 기능들로 시작해보겠습니다.

#### Notice 에 대한 저장

`[POST] /notices`

새로운 Notice 객체를 저장할 때 호출 하는 API 입니다.

#### Notice 리스트 조회

`[GET] /notices`

저장된 Notice 의 리스트를 가져오는 API 입니다.

## 도메인 정의

제공할 기능 목록을 보면 Notice 라는 도메인이 필요하고 이 도메인에서 제공할 유스케이스를 정의할 수 있습니다.

### 도메인 이름: Notice

### 도메인 유스케이스

- 새로운 Notice 를 저장한다.
- 타겟 사용자 타입에 따라 Notice 리스트를 가져온다.
- 제목을 보고 Notice 한 개를 가져온다.

도메인에 대한 정의가 끝났다면 이제 코드를 작성하기 전에 프로젝트 레이아웃에 대해 생각해보겠습니다.

## 프로젝트 레이아웃

```sh
.
├── cmd
│   ├── gorest
│   │   └── main.go
│   └── migrate
├── internal
│   ├── app
│   │   ├── api
│   │   └── server
│   └── pkg
│       ├── common
│       └── notice
└── pkg
```

[golang-standards/project-layout](https://github.com/golang-standards/project-layout) 를 토대로 구성하였습니다.

| 디렉토리 | 설명 |
| - | - |
| `/cmd` | 프로젝트의 주요 어플리케이션을 포함합니다. 서버를 실행하거나 데이터베이스 마이그레이션 등의 역할을 담당합니다. (e.g., `/cmd/myapp`). |
| `/internal` | 프로젝트 외부에 공개하지 않는 코드를 포함하며 대부분의 코드가 이 안에 위치 합니다. |
| `/internal/app` | Clean Architecture 에서 Presentation 레이어에 있는 코드를 포함합니다. |
| `/internal/pkg` | Clean Architecture 에서 Domain, Database 레이어에 있는 코드를 포함합니다. |
| `/pkg` | 외부에 공개하는 인터페이스 관련 코드를 포함합니다. |

동료들과 논의를 하다보니 Presentation 레이어와 Domain 레이어를 루트부터 분리해야 한다는 것에는 합의가 쉽게 이루어졌는데 Database 레이어의 위치는 어디에 두는 것이 더 좋은가에 대해서는 서로 다른 의견이 있었습니다. 여기서는 Database 레이어의 경우 도메인의 Repository 구현체를 둘 것이므로 도메인 영역인 `/internal/pkg` 와 가까이 두었습니다.

위에서 Notice 도메인에 대한 유스케이스에 대해 간략하게 리스트업 했는데 이제 이 유스케이스를 코드로 옮겨보도록 하겠습니다.

## 도메인 유스케이스 정의

저는 먼저 코드를 작성하기 전에 아래와 같은 패키지 레이아웃으로 미리 도메인을 구성해 둡니다.

```bash
├─- repo
│   └─ ...              // Repository 구현
├── entity.go           // 도메인에서 사용할 Entity 모음
├── repository.go       // 도메인에서 사용할 Repository interface
├── usecase.go          // 도메인에서 제공할 UseCase interface
└── usecase_test.go
```

`entity.go` 에 entity 를 추가합니다.

```go
//entity.go
type Notice struct {
    ID        int64     `json:"id"`
    Title     string    `json:"title"`
    Content   string    `json:"content"`
    UserTypes *string   `json:"-"`
    CreatedAt time.Time `json:"-"`
    UpdatedAt time.Time `json:"-"`
}
```

그런 다음 위에서 정의한 유스케이스들을 `usecase.go` 의 UseCase 인터페이스에 추가합니다.

```go
// usecase.go
type UseCase interface {
    First(title string) (*Notice, error)
    GetBy(lang string, userType string, lastID *int64) (Notices, error)
    Save(notice *Notice) error
}
```

| 이름 | 기능 |
| - | - |
| Save | 새로운 Notice 를 저장한다. |
| GetBy | 타겟 사용자 타입에 따라 Notice 리스트를 가져온다. |
| First | 제목을 보고 Notice 한 개를 가져온다. |

이렇게 하고나면 도메인의 기본 인터페이스 정의는 마무리 한 것입니다.

이제 정의한 인터페이스들을 구현합니다.

```go
type usecase struct {
    repo Repository
}

func (u *usecase) First(title string) (*Notice, error) {
    return u.repo.First(title)
}

func (u *usecase) GetBy(lang, userType string, lastID *int64) (Notices, error) {
    return u.repo.Find(lang, userType, lastID)
}

func (u *usecase) Save(notice *Notice) (err error) {
    return u.repo.Save(notice)
}
```

유스케이스에서는 해당 도메인의 비즈니스 로직에 대한 구현을 담당합니다.
위의 예제 에서는 리포지토리에서 모델을 불러오는 역할만 하고 있지만 비즈니스 요구사항에 따라 필요한 도메인 로직을 구현할 수 있습니다.

`usecase` 가 `UseCase` 인터페이스들을 잘 구현했는지 컴파일타임에 알기 위해 아래와 같은 코드를 추가할 수 있습니다.

```go
var _ UseCase = &usecase{}
```

## 도메인 리포지토리 정의

위 유스케이스를 구현하면서 Database 레이어 에서 필요한 정보들을 `repository.go` 에 정의하고 유스케이스의 비즈니스 로직을 구현합니다.

```go
type Repository interface {
    First(title string) (*Notice, error)
    Find(lang, userType string, lastID *int64) (Notices, error)
    Save(notice *Notice) error
}

```

## 도메인 유스케이스 유닛 테스트

이제 리포지토리 인터페이스까지 정의를 했으니 Notice 유스케이스의 유닛 테스트를 작성해봅시다.
테스트 케이스를 작성하기 위해 다음 두가지 라이브러리를 사용했습니다.

| 이름 | 설명 |
| - | - |
| [testify](github.com/stretchr/testify) | 테스트 스위트(Suite) 과 모킹 관련 패키지를 제공합니다. |
| [faker](github.com/bxcodec/faker) | 임의의 데이터를 생성합니다. |

### 유스케이스 테스트 스위트 정의

유스케이스를 테스트 하기 위해서 테스트 스위트는 아래 세가지를 멤버로 가집니다.

- 테스트 스위트
- 모킹한 리포지토리 구현체
- 테스트할 유스케이스

```go
type UseCaseTestSuite struct {
    suite.Suite
    repo    *mockRepo
    usecase notice.UseCase
}
```

테스트가 시작하기 전에 먼저 리포지토리를 초기화 하고 새로운 유스케이스를 생성해 둡니다.

```go
func (ts *UseCaseTestSuite) SetupTest() {
    ts.repo = new(mockRepo)
    ts.usecase = notice.NewUseCase(ts.repo)
}
```

### 리포지토리 모킹

위에서 모킹할 리포지토리를 구현합니다. [testify](github.com/stretchr/testify) 의 mock 패키지를 이용하면 함수별로 인터페이스가 호출되었는지 여부와 리턴 값들을 모킹 할 수 있습니다. 코드가 잘 안 읽히실 경우 실제 테스트 케이스를 확인하시면 이해가 될 것입니다.

```go
type mockRepo struct {
    mock.Mock
}

func (r *mockRepo) First(title string) (*notice.Notice, error) {
    ret := r.Called(title)
    return ret.Get(0).(*notice.Notice), ret.Error(1)
}

func (r *mockRepo) Find(lang, userType string, lastID *int64) (notice.Notices, error) {
    ret := r.Called(lang, userType, lastID)
    return ret.Get(0).(notice.Notices), ret.Error(1)
}

func (r *mockRepo) Save(n *notice.Notice) error {
    return r.Called(n).Error(0)
}

```

테스트 스위트를 실행하는 코드를 미리 작성해 둡니다.

```go
func TestControllerSuite(t *testing.T) {
    suite.Run(t, new(UseCaseTestSuite))
}

```

### 유스케이스 테스트 케이스 구현

이제 본격적으로 테스트 코드를 작성해 봅시다.
위에서 정의한 Notice 유스케이스의 경우 세가지 인터페이스를 제공하고 있습니다. 이에 맞춰 세가지 케이스를 만들어 둡니다. 여기서는 간단하게 각 인터페이스에 대해 성공하는 것만 작성했지만 실패하는 경우도 작성하는 것이 좋습니다.

```go

func (ts *UseCaseTestSuite) TestNoticeUseCase_First() {
}

func (ts *UseCaseTestSuite) TestNoticeUseCase_GetBy() {
}

func (ts *UseCaseTestSuite) TestNoticeUseCase_Save() {
}
```

여기서는 가장 위에 있는 `TestNoticeUseCase_First` 에 대해서만 예를 들어보겠습니다. 테스트 작성 대원칙은 마틴 파울러의 [Given-When-Then](https://martinfowler.com/bliki/GivenWhenThen.html)에 맞춰서 작성합니다.

#### Given-When-Then

##### Given

- `First` 에서 리턴할 `mockNotice` 를 생성하고 `faker` 를 이용해서 임의의 값으로 채웁니다.
- 리포지토리가 해당 Notice 엔티티를 리턴하도록 선언합니다.

##### When

- `First` 호출

##### Then

- error 가 nil 인지 확인
- 유스케이스를 통해 리턴받은 엔티티가 리포지토리에서 받은 엔티티와 같은지 확인
- 모킹한 리포지토리가 기대한대로 호출 되었는지 확인. 여기서는 한 번 호출 되었는지 검증 `Once()`

```go
func (ts *UseCaseTestSuite) TestNoticeUseCase_First() {
    // Given
    var mockNotice notice.Notice
    ts.NoError(faker.FakeData(&mockNotice))
    ts.repo.On("First", mockNotice.Title).Return(&mockNotice, nil).Once()

    // When
    result, err := ts.usecase.First(mockNotice.Title)

    // Then
    ts.NoError(err)
    ts.Equal(result.Title, mockNotice.Title)
    ts.Equal(result.Content, mockNotice.Content)
    ts.repo.AssertExpectations(ts.T())
}
```

## 리포지토리 구현

Clean Architecture 에서 Database 레이어에 해당하기 때문에 위 `Repository` 의 구현체는 도메인 로직과 별도의 package 로 구별해서 작성합니다.
먼저 리포지토리 패키지에 포함될 수 있는 요소들을 설명하겠습니다.

```bash
├── repo
│   ├── db_model.go     // DB ORM Model 정의
│   ├── mapper.go       // DB Model 을 Entity 로 변경
│   ├── repo.go         // Repository 구현체
│   └── repo_test.go
```

여기서는 [GORM](https://gorm.io/)이라는 ORM 라이브러리를 사용해서 리포지토리를 구현했습니다.

### 리포지토리 정의

리포지토리는 ORM 인터페이스와 DB모델을 도메인 엔티티로 리턴하는 `mapper` 를 가집니다. `mapper` 에 대해서는 아래에서 추가로 설명하도록 하겠습니다.

```go
type noticeRepo struct {
    db     *gorm.DB
    mapper entityMapper
}

// 도메인의 리포지토리 인터페이스를 구현했는지 확인
var _ notice.Repository = &noticeRepo{}
```

### 리포지토리 함수 구현

```go
func (r *noticeRepo) First(title string) (*notice.Notice, error) {
    dbNotice := Notice{Title: title}
    if err := r.db.Where(&dbNotice).First(&dbNotice).Error; err != nil {
        return nil, err
    }
    return r.mapper.toNoticeEntity(&dbNotice), nil
}

func (r *noticeRepo) Save(n *notice.Notice) error {
    // ...
}

func (r *noticeRepo) Find(lang, userType string, lastID *int64) (notice.Notices, error) {
    // ...
}
```

여기서 데이터베이스 레이어에서 사용하는 모델(DB 모델)과 도메인 레이어에서 사용하는 모델(엔티티)을 하나의 모델로 사용하지 않는 것을 권장합니다. 왜냐하면 두 모델이 가지고 있는 멤버가 공유가 가능하더라도 엄연히 DB 모델과 엔티티는 다른 관심사를 가지고 있는데, DB 모델의 경우 **저장**에 초점을 맞추고 있고 엔티티의 경우 **도메인 비즈니스 로직**에 초점이 맞추어져 있기 때문입니다. 이에 따라 가지게되는 멤버들도 다르고 멤버들의 타입도 달라집니다.
그렇다면 데이터베이스 레이어에서 Domain 레이어로 엔티티를 리턴하려면 어떻게 해야 할까요? 바로 DB 모델을 엔티티로 변환해주는 **Adapter**가 필요합니다. 마찬가지로 리포지토리로 엔티티를 넘겨준 경우 이를 DB모델로 변환하는 경우에도 엔티티를 DB 모델로 변환하는 Adapter 를 사용합니다.

```go
type entityMapper struct{}

func (e entityMapper) toNoticeEntity(dbNotice *Notice) *notice.Notice {
    return &notice.Notice{
        ID:        dbNotice.ID,
        Title:     dbNotice.Title,
        Content:   dbNotice.Content,
        UserTypes: dbNotice.UserTypes,
        Lang:      dbNotice.Lang,
        CreatedAt: dbNotice.CreatedAt,
        UpdatedAt: dbNotice.UpdatedAt,
    }
}

func (e entityMapper) toNoticeModel(n *notice.Notice) *Notice {
    return &notice.Notice{
        ID:        n.ID,
        Title:     n.Title,
        Content:   n.Content,
        UserTypes: n.UserTypes,
        Lang:      n.Lang,
    }
}
```

## 리포지토리 유닛 테스트

### 리포지토리 유닛 테스트 작성방법

도메인 유스케이스 테스트의 경우 리포지토리를 모킹하는 방법을 통해 유닛 테스트를 작성하는데 리포지토리의 유닛 테스트를 작성하는 경우 두가지 방법이 있습니다.

1. **DB를 구성하지 않고** 리포지토리 구현체에서 호출하는 SQL 쿼리가 기대한 쿼리와 일치하는지를 확인하는 방법
2. **DB를 구성해서** 실제 쿼리를 실행하면서 확인하는 방법

1번 방법이 물리적인 DB에 대해 의존하지 않기 때문에 진정한 의미의 리포지토리 유닛 테스트라고 할수 있지만 실제 쿼리를 돌려보지 않기 때문에 DB에 대한 테스트를 별도로 진행해야하는 단점이 있습니다.
2번 방법의 경우 실제 쿼리를 실행하면서 테스트가 진행되기 때문에 Integration 테스트에 해당하며 테스트 용도로 DB를 별도로 구성해야 하는 것이 단점입니다. 실제 서비스를 운영을 할 때는 2번 방법으로 진행하는 것이 더 나은 방안일 것입니다.
여기서는 별도의 DB 구성 없이 [sqlmock](https://github.com/DATA-DOG/go-sqlmock) 라이브러리를 사용해서 쿼리만 검증하는 1번 방법으로 테스트를 작성해보도록 하겠습니다.

### 리포지토리 테스트 스위트 정의

```go
type RepoTestSuite struct {
    suite.Suite
    mock sqlmock.Sqlmock
    db   *gorm.DB
    repo notice.Repository
}
```

테스트 스위트 정의는 위와 같이 하면 되는데요, `mock` 을 통해 어떤 쿼리가 실행되는지 확인하고 쿼리를 통해 리턴할 Row들을 정의할 수 있습니다.
테스트 케이스 하나를 한번 살펴보겠습니다.

### 리포지토리 유닛 테스트 구현

```go
func (ts *RepoTestSuite) Test_First() {
    notices := getTestNotices(1)
    req := `SELECT * FROM "notices" WHERE ("notices"."title" = $1) ORDER BY "notices"."id" ASC LIMIT 1`
    ts.mock.ExpectQuery(ts.FixedFullRe(req)).
        WillReturnRows((&test.MockRowBuilder{}).Add(*notices[0]).Build())

    n, err := ts.repo.First(notices[0].Title)

    ts.NoError(err)
    ts.Equal(*(notices[0]), *n)
}
```

위와 같이 `First` 인터페이스를 호출 한 경우 `SELECT * FROM "notices"` 로 시작하는 쿼리문이 실행되었는지 기대(expect)하고 Notice DB 모델 한 Row 를 리턴하도록 했습니다. 만약 쿼리문이 다르거나 리턴한 Row 가 다르다면 테스트 케이스가 실패합니다.
