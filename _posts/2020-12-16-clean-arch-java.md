---
toc: true
title: "Java 언어로 Clean Architecture 시작하기 (feat. Spring Boot)"
date: 2020-12-16
categories: architecture,java,spring
---

## 시작하기 앞서

이 문서에 기록된 코드는 모두 [urunimi/ddd-spring-boot](https://github.com/urunimi/ddd-spring-boot) 에서 확인하실 수 있습니다.

### 제공할 기능 목록

먼저 이 샘플 프로젝트에서 제공할 기능은 다음과 같습니다.

#### 키워드로 장소 검색 - `/v1/places`

| 파라미터 | 용도 |
|-|-|
| keyword | 검색하기 위한 키워드 |

파라미터로 들어오는 키워드로 장소를 검색하는 API 입니다.

## 도메인 정의

### 도메인 유스케이스

- 키워드를 받아서 지역 리스트를 응답한다.
  - 지역 리스트의 경우 네이버와 카카오에서 제공하는 지역 API 응답을 사용해서 구현한다.

## 프로젝트 레이아웃

```sh
.
├── main
│   ├── kotlin
│   │   └── com.hovans.local
│   │        ├── domain
│   │        └── rest
│   └── resources
│       └── application.properties
└── test
    └── kotlin
        └── com.hovans.local
            ├── domain
            └── rest
```

`main` 에는 실제 구현 코드가 포함되고 `test` 하위에는 구현코드에 대응되는 유닛 테스트 케이스들을 작성할 것입니다. 도메인 레이어와 프레젠테이션 레이어 패키지에 대해서는 좀더 설명해보도록 하겠습니다.

### 도메인 패키지 레이아웃

```sh
├── domain
│   ├── Entity.kt
│   ├── LocalRepository.kt
│   └── LocalService.kt
```

도메인 레이어에는 유스케이스 정의를 위한 `LocalService.kt` 와 리포지토리 인터페이스 정의를 담고 있는 `LocalRepository.kt` 그리고 도메인에서 사용하는 모델들을 정의하기 위한 `Entity.kt` 이렇게 세 개의 파일을 포함합니다.

### 프레젠테이션 패키지 레이아웃

```sh
└── rest
    ├── DTO.kt
    └── LocalController.kt
```

프레젠테이션 레이어에는 API 요청을 받고 응답하기 위한 `LocalController.kt` 와 응답형식(DTO) 를 정의하는 `DTO.kt` 파일로 나눴습니다.

## 도메인 유스케이스 정의

키워드로 장소를 응답하기 위해서는 지역(Local)이라는 도메인을 정의했고 이 도메인에서 제공할 유스케이스는 `keyword` 를 파라미터로 받고 장소 리스트를 응답하는 인터페이스가 필요했습니다. 여기서는 페이지네이션 구현을 위한 커서도 응답으로 내려줍니다. 여기서는 여러 지역리포지토리 구현체를 리스트로 받아서 Failover 기능을 수행할 수 있도록 작성했습니다.

```kotlin
class LocalService constructor(val localRepositories: List<LocalRepository>) {
    val gson = Gson()

    fun getPlaces(keyword: String, prevCursor: String?): Pair<List<Place>, String?> {
        for (repository in localRepositories) {
            try {
                val (places, cursor) = repository.getPlaceNames(keyword, prevCursor)
                if (cursor.currentPage > cursor.totalPages) {  // Last page
                    return Pair(places, null)
                }
                return Pair(placeNames, gson.toJson(cursor))
            } catch (ex: Exception) {
                logger.error("getPlaceNames", ex)
            }
        }
    }
}
```

## 도메인 엔티티 정의

위와 같이 장소 리스트를 응답하는 함수를 정의하고 나니 장소에 해당하는 Place 와 페이지네이션을 구현하기 위한 커서 모델에 대한 정의가 필요해졌습니다.

```kotlin
class Place(
        val title: String
)

class Cursor(
        val totalPages: Int,
        val currentPage: Int,
        val pageSize: Int,
)
```

## 도메인 리포지토리 정의

위 유스케이스를 구현하면서 Database 레이어 에서 필요한 정보들을 `LocalRepository.kt` 에 정의하고 유스케이스의 비즈니스 로직을 구현합니다.

```kotlin
interface LocalRepository {
    fun getPlaceNames(keyword: String, cursor: Cursor): Pair<List<String>, Cursor>
}
```

이렇게 하고나면 도메인의 기본 인터페이스 정의는 마무리 한 것이며 컴파일이 가능합니다.

## 도메인 유스케이스 유닛 테스트

이제 리포지토리 인터페이스까지 정의를 했으니 유스케이스의 유닛 테스트를 작성해봅시다.
테스트 케이스를 작성하기 위해 다음 두가지 라이브러리를 사용했습니다.

| 패키지 | 사용목적 |
|------|--------|
| org.junit.jupiter:junit-jupiter | 테스트 케이스 작성을 위한 라이브러리 |
| com.nhaarman.mockitokotlin2:mockito-kotlin | 유닛테스트에서 의존성을 모킹을 위한 라이브러리 |

### 유스케이스 테스트 클래스 정의

도메인 유스케이스의 유닛테스트를 작성하기 위해서는 리포지토리 구현체에 대한 모킹이 필요합니다. 이를 위해 `MockitoExtension` 을 사용했는데 Kotlin 용으로는 위의 `mockito-kotlin` 패키지를 사용하면 구현이 가능합니다.

```kotlin
@ExtendWith(MockitoExtension::class)
class LocalServiceTest(@Mock val localRepository: LocalRepository) {
    private val localService: LocalService

    init {
        val localRepositories = ArrayList<LocalRepository>()
        localRepositories.add(localRepository)
        localService = LocalService(localRepositories)
    }

    @Test
    fun getPlaces_Found() {
        // 키워드 검색 결과가 있을 경우에 대한 테스트 케이스
    }

    @Test
    fun getPlaces_NotFound() {
        // 키워드 검색 결과가 없을 경우에 대한 테스트 케이스
    }
}
```

이제 테스트케이스를 구현해보게습니다. 테스트케이스는 `getPlaces` 결과가 있는 경우와 없는 경우를 나눠서 작성했습니다.
테스트 작성 대원칙은 마틴 파울러의 [Given-When-Then](https://martinfowler.com/bliki/GivenWhenThen.html)에 맞춰서 작성합니다.

```kotlin
    @Test
    fun getPlaces_Found() {
        // Given
        val keyword = "keyword"
        val placeNames = listOf("one", "two")
        val imageUrl = "http://imagehub.com/images?id=1"
        `when`(localRepository.getPlaceNames(eq(keyword), any()))
            .thenReturn(Pair(placeNames, Cursor(2, 2, 3)))

        // When
        val (places, cursor) = localService.getPlaces(keyword, "{\"totalPages\":2,\"currentPage\":1,\"pageSize\":3}")

        // Then
        for (i in places.indices) {
            assertThat(places[i].title).isEqualTo(placeNames[i])
        }
        assertThat(cursor).isEqualTo("{\"totalPages\":2,\"currentPage\":2,\"pageSize\":3}")
    }
```

```kotlin
    @Test
    fun getPlaces_NotFound() {
        val keyword = "keyword"
        `when`(localRepository.getPlaceNames(any(), any()))
                .thenReturn(Pair(ArrayList<String>(), Cursor(1, 2, 3)))

        val (places, cursor) = localService.getPlaces(keyword, null)

        assertThat(cursor).isNull()
        assertThat(places).isEmpty()
    }
```

## 리포지토리 구현

Clean Architecture 에서 Database 레이어에 해당하기 때문에 위 `Repository` 의 구현체는 도메인 로직과 별도의 package 로 구별해서 작성합니다.
먼저 리포지토리 패키지에 포함될 수 있는 요소들을 설명하겠습니다.

```sh
└── repository
    ├── KakaoRepository.kt
    └── NaverRepository.kt
```

카카오와 네이버 API 를 사용해서 두개의 리포지토리 구현체를 정의했으며 위의 **도메인 리포지토리 정의** 에 있는 함수들을 각각 구현합니다.
구현할 때 리모트 API 호출을 위해 가독성을 위해 여기서는 Retrofit 네트워크 라이브러리를 사용했습니다.

| 패키지 | 사용목적 |
|-|-|
| com.squareup.retrofit2:retrofit | 외부 API 호출을 위한 Http client 라이브러리 |

### 리포지토리 함수 구현

카카오 API 를 활용한 리모트콜을 통해 리포지토리를 구현할 것이므로 해당 API 호출을 위한 Retrofit 인터페이스를 미리 정의합니다.

```kotlin
interface KakaoClient {
    @GET("/v2/local/search/keyword.json")
    fun getPlaces(
            @Query("query") query: String,
            @Query("page") page: Int,
            @Query("size") size: Int
    ): CompletableFuture<KakaoLocalResponse>
}

class KakaoLocalResponse(val documents: List<KakaoPlace>, val meta: KakaoMetaRes)
class KakaoPlace(@SerializedName("place_name") val placeName: String)
class KakaoMetaRes(@SerializedName("total_count") val totalCount: Int)
```

이제 위에서 정의한 API를 호출하여 응답을 받은 결과를 처리하기 위한 HTTPClient 를 생성자에서 정의합니다.

```kotlin
class KakaoRepository(baseUrl: HttpUrl = HttpUrl.get("https://dapi.kakao.com")) : LocalRepository {

    private val defaultSize = 3
    private val kakaoClient: KakaoClient

    init {
        val apiKey = System.getenv("KAKAO_API_KEY") ?: throw RuntimeException("{{KAKAO_API_KEY}} env variable is not set.")

        val httpClient = OkHttpClient()
                //... Client 설정
                .build()
        val retrofit = Retrofit.Builder().baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create())
                .client(httpClient)
                .build()
        kakaoClient = retrofit.create(KakaoClient::class.java)
    }

    override fun getPlaceNames(keyword: String, cursor: Cursor): Pair<List<String>, Cursor> {
        throw NotImplementedError()
    }
}
```

이제 리포지토리 함수 구현을 위한 준비가 마무리 되었습니다.
파라미터로 받은 키워드와 커서를 가지고 해당 키워드로 검색한 지역 리스트를 결과로 응답하도록 함수를 작성합니다.

```kotlin
override fun getPlaceNames(keyword: String, cursor: Cursor): Pair<List<String>, Cursor> {
    val res = kakaoClient.getPlaces(keyword, cursor.currentPage, defaultSize).get()
    val placeNames = ArrayList<String>()
    for (document in res.documents) {
        placeNames.add(document.placeName)
    }

    var totalPages = res.meta.totalCount / defaultSize
    if (res.meta.totalCount % defaultSize != 0) {
        totalPages += 1
    }

    val nextCursor = Cursor(
            totalPages = totalPages,
            currentPage = cursor.currentPage + 1,
            pageSize = defaultSize,
    )
    return Pair(placeNames, nextCursor)
}
```

여기서 데이터베이스 레이어에서 응답으로 사용하는 모델(`KakaoLocalResponse`, `KakaoPlace`)과 도메인 레이어에서 사용하는 모델(엔티티)을 하나의 모델로 사용하지 않는 것을 권장합니다. 왜냐하면 두 모델이 가지고 있는 멤버가 공유가 가능하더라도 엄연히 데이터베이스 모델과 엔티티는 다른 관심사를 가지고 있는데, 위의 데이터 레이어 모델의 경우 **리모트콜 응답**에 초점을 맞추고 있고 엔티티의 경우 **도메인 비즈니스 로직**에 초점이 맞추어져 있기 때문입니다. 이에 따라 가지게되는 멤버들도 다르고 멤버들의 타입도 달라집니다.

## 리포지토리 유닛 테스트

### 리포지토리 유닛 테스트 작성방법

리포지토리를 구현할 때 유의하셔야 하는건 리모트콜을 하지 않도록 막아야 합니다. 그 이유는 리모트콜(여기서는 카카오 API) 응답에 따라 테스트 결과가 달라질 수 있고 불필요하게 외부 서비스에 부하를 주기 때문입니다. 그래서 리모트콜 응답을 모킹할 수 있는 방법을 찾았습니다.
위의 리포지토리 구현의 경우 `okhttp3` 클라이언트를 사용했는데 이를 위한 `mockwebserver` 패키지가 있더군요.

| 패키지 | 사용목적 |
|-|-|
| com.squareup.okhttp3:mockwebserver | 유닛테스트에서 외부 API 호출을 막고 응답을 모킹하기 위한 라이브러리 |

### 리포지토리 테스트 클래스 정의

테스트할 대상인 `KakaoRepository` 변수인 `kakaoRepository` 를 정의하고 위에서 설명한 `MockWebServer` 도 초기화 합니다.
이때 매 테스트마다 두 변수를 초기화 하기 위해 `@BeforeEach` 와 `@AfterEach` 어노테이션을 사용했습니다.

```kotlin
class KakaoRepositoryTest {

    private lateinit var mockWebServer: MockWebServer
    private lateinit var kakaoRepository: KakaoRepository

    @BeforeEach
    fun beforeEach() {
        mockWebServer = MockWebServer()
        mockWebServer.start()
        kakaoRepository = KakaoRepository(mockWebServer.url(""))
    }

    @AfterEach
    fun afterEach() {
        mockWebServer.shutdown()
    }

    @Test
    fun getPlaceNames() {
        // ...
    }
}
```

### 리포지토리 유닛 테스트 구현

```kotlin
@Test
fun getPlaceNames() {
    // Given
    val keyword = "keyword"
    val cursor = Cursor(
            totalPages = 1,
            currentPage = 1,
            pageSize = 3,
    )
    val placeNames = listOf("One", "Two", "Three")
    mockWebServer.enqueue(MockResponse()
            .addHeader("Content-Type", "application/json; charset=utf-8")
            .setBody("{" +
                    "  \"documents\": [" +
                    "    {" +
                    "      \"place_name\": \"${placeNames[0]}\"" +
                    "    }," +
                    "    {" +
                    "      \"place_name\": \"${placeNames[1]}\"" +
                    "    }," +
                    "    {" +
                    "      \"place_name\": \"${placeNames[2]}\"" +
                    "    }" +
                    "  ]" +
                    "}" // ...
            )
    )

    // When
    val (res, nextCursor) = kakaoRepository.getPlaceNames(keyword, cursor)

    // Then
    for (i in res.indices) {
        assertThat(res[i]).isEqualTo(placeNames[i])
    }
    assertThat(nextCursor.currentPage).isEqualTo(cursor.currentPage + 1)
}
```

`mockWebServer` 의 응답을 모킹한 다음 `kakaoRepository` 의 `getPlaceNames` 함수를 호출해서 결과를 비교하도록 합니다.
