---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록2"
categories: Project
tag: [web, server, DB, spring boot, spring mvc, java, JPA]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
---

<br>

# 화면 제작 마무리..

Html, Css를 통해서 화면은 어느정도 틀만 잡아놓고, 디테일한 디자인 같은 경우는 추후에 추가하기 위해서 일단 마무리 했다.<br>

너무 대충 만든 감이 있지만, 필요한 기능만 일단 다 넣어놨다.

<br>

**게시판 메인 페이지 제작 캡쳐**<br>
![community_page](/images/Project_Report/community_page.png)<br>

디테일한 디자인은 나중에.. 할 수 있겠지..

<br>

# 백엔드 개발 시작

## 이번에 해야할 목록

- BaseTimeEntity 생성
- User Entity 생성
- 필요한 DTO 생성
- 회원가입 Repository 개발
- 회원가입 검증기 작성
- 회원가입 Repository와 service 연결

## BaseTimeEntity

```java
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {

    // Entity가 생성되서 저장될 때 시간이 자동 저장
    @CreatedDate
    private String createdDate;

    // 조회한 Entity 값을 변경할 때 시간이 자동 저장
    @LastModifiedDate
    private String modifiedDate;

    /*
    * 엔티티를 저장하기 이전에 실행
    * 시간을 가져온 뒤 알맞게 포멧
    * */
    @PrePersist
    public void onPrePersist() {
        this.createdDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        this.modifiedDate = this.createdDate;
    }

    @PreUpdate
    public void onPreUpdate() {
        this.modifiedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
}
```
- 공통 적으로 사용되는 생성 일자와, 수정 일자
- Auditing 기능을 포함 : 시간에 대해서 자동으로 값을 넣어주는 기능
- Main Class에 `@EnableJpaAuditing` 어노테이션을 추가해줘야 한다.

## User Entity

```java
@Entity
@Getter
@NoArgsConstructor
public class User extends BaseTimeEntity{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_PK")
    private Long id;
    private String userName;
    private String userId;
    private String password;

    @Enumerated(EnumType.STRING)
    @Setter
    private Role role;

}
```

## 회원가입 기능

처음에는 로그인 기능을 목표로 해서 제작했는데, domain -> repository -> service -> controller 순으로 개발 계획을 세웠다.<br>

회원가입 로직을 제작하는데, 처음에는 Entity에 모든 Validation을 다 넣어서 구성을 했다. 엔티티 자체로 회원가입할 때 쓰기위해서 그렇게 했는데, 생각해보면 엔티티를 그대로 노출하는 것도 그렇고, 필요 없는 정보(Ex. 2차 비밀번호 등)도 같이 Entity객체에 들어가서 코드가 지저분했다.<br>

그래서 회원가입시 사용하는 DTO를 따로 만들고, 그걸 이용해서 값을 입력 받은 뒤 Entity객체로 변환해서 DB에 저장하기로 했다.

### JoinForm
```java
@Getter
public class JoinForm {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    @Pattern(regexp = "^[가-힣a-zA-Z]{2,10}$")
    private String userName;

    @NotBlank
    @Pattern(regexp = "[a-z0-9]{5,9}")
    private String userId;

    @NotBlank
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}")
    private String password;

    @NotBlank
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}")
    private String check_password;  // 2차 비밀번호

    public JoinForm(String userName, String userId, String password, String check_password) {
        this.userName = userName;
        this.userId = userId;
        this.password = password;
        this.check_password = check_password;
    }
}
```
- `@NotBlank` : `@NotEmpty`를 사용해야 하나 고민했는데 `@NotBlank`가 스페이스바 같은 공백까지 막아준다고 하여 이걸로 선택하였다.
- `@Pattern` : 처음에 패턴을 짜는데 많이 애먹은게, 보면서 해도 구성이 헷갈리고, 복잡해서 시간이 많이 걸렸다.

### UserRepositoryImpl

처음에는 Service가 Repository를 바로 의존관계 주입하도록 했는데, 나중에 Repository 코드를 바꿀 가능성이 있기 때문에 Interface를 하나 만들어서 Service로직이 Interface를 주입받도록 설계했다.

<br>

**구현 기능**<br>
우선 필요한 4가지 로직만 작성해 놓았다.
- 회원 저장
- DB ID값을 통한 회원 조회
- 회원 id값을 통한 회원 조회
- 전체 회원 조회


#### findAll()
```java
    @Override
    public List<FindUserDto> findAll() {
        return em.createQuery(
                "select new project.reviews.dto.FindUserDto(u.userId, u.userName, u.password)" +
                " from User u", FindUserDto.class)
                .getResultList();
    }
```
- 우선 순수 JPA로만 작성했는데, 추후에 Querydsl로 변경할 수도 있다..
- 전체 회원을 조회하는데, User Entity 그대로 받아오지 않고, 필요한 정보만 Dto로 받아오게 했다.

**FindUserDto**
```java
@Getter
@AllArgsConstructor
public class FindUserDto {

    private String userId;
    private String userName;
    private String password;
}
```


#### findByUserId()

회원가입할 때 입력하는 회원의 아이디를 통해서 중복회원이 가입하는건지 체크하기 위한 로직이다.
```java
    @Override
    public Optional<FindUserDto> findByUserId(String userId) {
        return findAll().stream()
                .filter(findUserDto -> findUserDto.getUserId().equals(userId))
                .findFirst();
    }
```
- `userId`값을 통해서 DB에 이미 가입되어 있는 회원인지 값을 가져온다.
- `findAll()`을 사용해서 가져온 모든 데이터에서 필터링을 통해 원하는 정보만 뽑아올 수 있게 작성하였다.

<br>

여기서 한 가지 고민은 `Optional` 사용 여부였다.<br>
`Optional`을 찾아보니 비용이 비싸서 정확한 의도대로 사용하지 않으면 오히려 안쓰는 것보다 못하다고 했다.<br>
우선 사용하긴 했지만, 나중에 리팩토링할 때 메모리를 많이 잡아먹는다고 생각되면 비교문으로 바꿔야 겠다.

### UserService(비즈니스 로직)

`Service` 역할은 회원가입 form에서 받은 정보로 중복회원인지 확인하고, 중복회원이 아니라면 User Entity로 변환해서 `Repository`에 넘겨주어 DB에 저장하는 역할을 한다.

```java
    public Long join(JoinForm form) {

        validateDuplicateUser(form);    // 중복 회원 검증

        /*
        * 중복 확인이 끝나면, User Entity로 변환해서 DB에 저장
        * */
        User user = new User(form.getUserName(), form.getUserId(), form.getPassword());
        userRepository.save(user);
        return user.getId();
    }

    /*
    * 회원가입시 입력한 아이디와 DB에 입력된 아이디 값을 비교해서 중복 회원가입인지 확인
    * */
    private void validateDuplicateUser(JoinForm form) {
        Optional<FindUserDto> findUser = userRepository.findByUserId(form.getUserId());
        if(!findUser.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }
```
<br>

중복회원 검증은 `Repository`에서 만든 `findByUserId()`를 통해서 진행한다.
<br>
사실 Service 로직은 중복회원 검증만 하고 저장하는 용도가 끝이다.