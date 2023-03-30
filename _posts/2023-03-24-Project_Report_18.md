---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록18(1차 마무리)"
categories: Project
tag: [web, server, DB, spring boot, spring mvc, java, JPA]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
---

<br>

# 현재까지 진행 상황

- 회원가입 기능 완료
    - BaseTimeEntity 생성 완료
    - User Entity 생성 완료
    - UserRepositoryImpl, UserService를 통해서 DB에 저장되는지 Test Code로 확인.
    - 중복 회원 검증
    - 회원가입 관련 html thymeleaf 적용해서 동적인 코드로 변경
    - 회원가입시 사용할 error code 생성
    - 회원가입시 검증기를 통한 text 출력
    - Controller 생성 후 연결해서 화면에서 확인
- 로그인 기능 완료
    - 로그인시 사용할 Dto 생성
    - 로그인 Service 생성
    - 로그인 Controller에서 로그인 처리
    - 로그인 관련 HTML 동적인 코드로 변경(+오류 코드)
- 게시판 Entity, DTO, Repository 개발    
    - 게시판 관련 Entity 생성
    - 필요한 정보만 받아올 DTO 생성
    - Error Code 작성
    - 게시판 관련 Repository 개발
    - 게시판 Repository Test Code 작성
- 게시판 Controller, Service 개발
    - 게시판 비즈니스 로직 구현
    - 비즈니스 로직 테스트 코드 작성
    - 컨트롤러 제작
    - 게시판 html을 thymeleaf를 통해 동적인 코드로 수정
    - 실제 실행 테스트
- 로그인된 사용자만 특정 사이트에 들어갈 수 있도록 인터셉터 제작
- 오류 페이지 적용
- 로그인 후 모든 페이지에서 사용자가 로그인된 상태인 것을 인지할 수 있도록 로직 수정
- 게시판 검색기능 기능 추가
    - Repository, Service, Controller 코드 수정
    - 테스트 코드 작성
    - 검색기능 tymeleaf 추가
- 메인 서비스 개발
    - 임시 메인 서비스 화면 제작
    - `NaverMovieApiService` 개발(네이버 API를 활용한 값 읽어오기)
    - AutoComplete 기능 개발
        - MainService 로직 개발
        - 서비스 페이지에 ajax 코드 추가
        - AutoComplete 관련 Controller 코드 작성
    - 검색어의 개수에 따른 동작 구현
        - MainService.java에 영화를 검색하는 로직 작성
        - MainServiceController 관련 코드 작성
        - searvicePage.html, compareServicePage.html thymeleaf 코드 작성
        - 에러 페이지 제작
    - 네이버 영화 페이지에서 리뷰 정보 크롤링 해오기
        - MainService 크롤링 관련 코드 작성
        - MainServiceController 관련 코드 추가
        - servicePage, compareServicePage 코드 추가
- 전체적인 디자인 변경 및 부가적인 페이지 제작
- 로그인, 회원가입 관련 검증에 대한 우선순위 설정
- 메시지 알림창(alert) 기능을 위한 message.html 제작
    - 게시글 삭제시에 적용
    - 회원 가입시 사용
        - 회원 가입 실패에 대한 예외 처리
- 회원 정보 페이지 제작
    - 관련 엔티티 생성
        - 연관관계 매핑 코드 추가
    - RecordRepository 생성
    - RecordService 코드 작성
        - RecordService Test code 작성
    - PostingService 코드 수정
    - RecordRepositoryCustom 생성
        - RecordRepositoryCustomImpl 생성 및 코드 작성
        - RecordRepositoryCustomImpl Test Code 작성
    - RecordService 코드 추가
    - RecordService Test Code 추가
    - MemberInfoController 생성 및 코드 작성
    - Popup창 제작

<br>

# 이번에 해야할 목록

- H2 DB를 MySQL로 변경
- 영화 검색기록을 시간이 지남에 따라 DB에서 제거하는 기능
    - Spring batch, Spring Scheduler 사용

## MySQL로 변경

### build.gradle

```gradle
implementation 'mysql:mysql-connector-java'
```

### application.properties

```
# DB Setting(MySQL)
spring.datasource.url=jdbc:mysql://localhost:3306/(DB-Name)?useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=UTF-8&serverTimezone=Asia/Seoul
spring.datasource.username=(DB-UserName)
spring.datasource.password=(DB-Password)
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.database=mysql
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect
```
- `serverTimeZone=Asia/Seoul` : DB의 시간을 한국 시간으로 설정
    - 설정하지 않으면 저장할 때 시간이 다르게 저장됨

## 영화 검색기록 관리

영화 제목 검색같은 경우는 비교적 간단하게 진행될 수 있으며, 따로 삭제하는 기능이 없기 때문에 회원 탈퇴를 하지 않는한 DB에 데이터가 계속 쌓이게 된다.<br>
따라서, Spring Batch와 Scheduler를 사용해서 일정 시간이 되면 자동으로 삭제되도록 제작 할 것이다.

### 설정

```gradle
// Spring Batch
implementation("org.springframework.boot:spring-boot-starter-batch")
```

**application.properties**
```properties
# spring boot batch + scheduler
# batch 스키마 자동 생성
# 시작과 동시에 실행되는건 방지
spring.batch.initialize-schema=always
spring.batch.job.enabled=false
```
- 스프링 부트 2.X 이상일 경우에는 `spring.batch.initialize-schema= always` 코드를 작성해줘야 오류가 나지 않는다.

<br>

**Main.class**
```java
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableJpaAuditing
@EnableBatchProcessing
@EnableScheduling
public class ComparisonOfReviewsApplication {
    (...)
}
```
- 메인 클래스에 `@EnableBatchProcessing`, `@EnableScheduling` 설정을 추가해야 한다.

### BatchConfig.class

```java
@Configuration
@EnableBatchProcessing
@Slf4j
public class BatchConfig {

    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    @Autowired
    private RecordService recordService;

    @Autowired
    private RecordRepository recordRepository;

    @Bean
    public Job job() {

        Job job = jobBuilderFactory.get("job")
                .start(step())
                .build();
        return job;
    }

    @Bean
    public Step step() {
        return stepBuilderFactory.get("step")
                .tasklet((contribution, chunkContext) -> {
                    log.info("Step!!!!");
                    // 업데이트 날짜가 일주일 이전인 문서 목록을 가져옴
                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime aWeekAgo = now.minusDays(7);
                    List<Movie> limitedMovies = recordRepository.findByCreatedDateLessThan(aWeekAgo);

                    if(limitedMovies.size() > 0) {
                        for(Movie movie : limitedMovies) {
                            recordService.deleteMovieRecord(movie);
                        }
                    }
                    return RepeatStatus.FINISHED;
                }).build();
    }
}
```
- 수행하고자 하는 Job을 Step으로 구성.
- `LocalDateTime.now().minusDays(7)`
    - 현재를 기준으로 7일전의 값(생성된지 일주일이 지난 문서)을 제거할 것이다.
- `RecordRepository.findByCreatedDateLessThan()`를 통해서 일주일이 지난 영화 검색 리스트를 가져오고, 값이 존재하면 삭제 진행.

### RecordRepository(+)

```java
public interface RecordRepository extends JpaRepository<Movie, Long>, RecordRepositoryCustom {
    List<Movie> findByCreatedDateLessThan(LocalDateTime aWeekAgo);
}
```
- Spring Data JPA 기능을 이용해서 메소드 이름으로 쿼리 생성을 했다.

#### RecordRepository Test Code

```java
@SpringBootTest
@Transactional
@Slf4j
public class RecordRepositoryTest {

    @Autowired RecordRepository recordRepository;
    @Autowired UserRepository userRepository;

    @Test
    void searchMovie_lessThan_Test() {
        //given
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime aWeekAgo = now.minusDays(7);

        //when
        List<Movie> limitedMovies = recordRepository.findByCreatedDateLessThan(aWeekAgo);

        //then
        assertEquals(3, limitedMovies.size());
    }

    @Test
    void saveMovieRecord_Test() {
        //given
        User user = new User("테스트", "test1234", "test1234@", Role.ROLE_USER);
        userRepository.save(user);
        Movie movie1 = new Movie("슈퍼보드", user);
        Movie saved_movie = recordRepository.save(movie1);

        //when
        Movie findMovie = recordRepository.findById(saved_movie.getId()).get();
        assertEquals(findMovie.getMovie_title(), "슈퍼보드");

        //then
        List<Movie> all_movies = recordRepository.findAll();
        org.assertj.core.api.Assertions.assertThat(all_movies).extracting("movie_title").contains("슈퍼보드");
    }

    @Test
    void deleteMovieRecord_Test() {
        //given
        User user = new User("테스트", "test1234", "test1234@", Role.ROLE_USER);
        userRepository.save(user);
        Movie movie1 = new Movie("슈퍼보드", user);
        Movie saved_movie = recordRepository.save(movie1);

        //when
        recordRepository.delete(saved_movie);

        //then
        log.info("delete_movie = {}", recordRepository.findById(saved_movie.getId()));
        org.assertj.core.api.Assertions.assertThatThrownBy(() -> recordRepository.findById(saved_movie.getId()).get()).isInstanceOf(NoSuchElementException.class);
    }
}
```

### BatchScheduler

```java
@Slf4j
@Component
public class BatchScheduler {

    @Autowired
    private JobLauncher jobLauncher;

    @Autowired
    private BatchConfig batchConfig;

    /*
    * Seconds / Minutes / Hours / Day of Month 1-31 / Month / Day of Week / Year
    * * : 필드의 모든 값을 선택
    * 모든 달의 오전 00시에 작업을 실행
    * */
    @Scheduled(cron = "0 0 0 * * *")
    public void runJob() {

        // job parameter 설정
        Map<String, JobParameter> config_map = new HashMap<>();
        config_map.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters jobParameters = new JobParameters(config_map);

        try {
            /*
            * 첫번째 파라미터로 Job, 두번째 파라미터로 Job Parameter를 받는다.
            * Job Paramter의 역할은 반복해서 실행되는 Job의 유일한 ID.
            * */
            jobLauncher.run(batchConfig.job(), jobParameters);
        } catch (JobInstanceAlreadyCompleteException | JobExecutionAlreadyRunningException
                | JobParametersInvalidException | JobRestartException e) {

            log.error(e.getMessage());
        }
    }
}
```
- `@Scheduled`의 cron 표현식을 사용해서 매일 00시에 Batch 작업을 진행.
- Job실행 전 Job에서 사용될 Parameter 정보 설정.
- JobLauncher를 통해 `BatchConfig`에 설정해둔 Job을 실행.

## 오류 발생

테스트겸 데이터를 넣어놓고 시간을 맞춰서 돌렸는데, `batch_job_instance doesn't exist` 오류가 발생했다.<br>
구글링해 보니 스프링 부트 2.X버전 부터는 `spring.batch.initialize-schema=always` 코드를 추가하면 된다고 해서 처음부터 추가해서 실행했는데, 오류가 발생한 것이다.<br>
코드를 여기저기 보다가 위 코드에서 jdbc를 추가한 `spring.batch.jdbc.initialize-schema=always` 코드로 변경했더니 정상 실행 되었다.<br>
JPA 사용과 더불어 자연스럽게 JDBC API를 사용하게 되서 그런것 같다.

## 실행

![tables](/images/Project_Report/tables.png)<br>
실행해서 Table을 조회해 보니 Batch관련 Table이 자동으로 생성되었다.
<br>
검색 기록도 일주일 전 기록이 정상적으로 삭제되었다.

<br>

# 정리

우선적으로 필요한 기능은 다 넣은 것 같다는 생각이 든다.<br>
코드를 작성하면서 어디에 코드 리펙토링이 필요한지 느낄 수 있었는데, 매일 공부만 하는 것 보다는 직접 코드를 짜보면서 느끼는게 더 배우는게 많은 것 같다.<br>
예를 들면 Repository 부분에서 DTO로 바로 받는 것이 편해서 바로 DTO의 값으로 치환해서 반환해주었는데, 코드 자체는 간결하지만, 재사용성이 떨어졌다.<br>
재사용성을 높이려면 Entity로 받아 온 뒤에 Service 단에서 DTO로 치환하는 것이 맞다는 생각이 든다.<br>
또한 주석도 다른 개발자가 봤을 때 더 잘 이해할 수 있도록 수정해야 겠다는 생각이, 클린코드 주석 예시를 보고 알게되었다..<br>
아직 부족한 부분도 많고 더 넣고 싶은 기능들도 많지만, 우선 여기서 끊고 주석 리펙토링만 하고 마무리를 지어야겠다.<br>
그렇지 않으면 프로젝트가 영원히 끝나지 않을 것만 같다.(넣고 싶은 기능이 너무 많은데 지금 당장은 취업이 우선..)<br>