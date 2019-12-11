---
title:  "Spring Boot Security 가이드 2편"
last_modified_at: 2019-12-09T08:06:00-05:00 
categories:
  - spring-Security-Series
tags:
  - spring
  - security
  - java
  - spring security
  - spring boot
  - spring boot security
author: Juyoung Lee
excerpt: "Spring Security적용 프로그램을 위해 Domain Model과 핵심 Method를 구현합니다."
toc: true
toc_sticky: true
toc_label: "List"
---

# Domain Model

Spring Security 샘플 프로그램의 도메인 모델은 크게 4가지가 필요합니다.

1. Account : 사용자 계정 정보
2. Permission : 역할에게 주어질 권한
3. Role : 사용자에게 주어질 역할
4. Menu : 사용자가 이용할 메뉴 -> 생성 시 자동으로 권한이 생성됩니다.

## Modeling

샘플 프로젝트의 모델 설계는 아래의 이미지와 같습니다.


[![ClassModel](https://cnaps-skcc.github.io/assets/images/ERS권한관리model2.png)](https://cnaps-skcc.github.io/assets/images/ERS권한관리model2.png)

- Account, Permission, Role은 계정 및 권한관리에 함께 쓰이기 때문에 **Authority**라는 패키지로 묶어 설계하였습니다.
- Menu(TopMenu, SubMenu)는 계정 및 권한관리에 관계없는 프로그램의 기능 자체(게시판 등)이기 때문에 **bcm**의 **menu**라는 패키지로 묶어 설계했습니다.
- 이미지에서는 점선으로 각 클래스들을 연결해주었지만, 설계를 위한 ***Logical Connection*** 입니다.
- 즉, 실제 구현에선 직접적인 관계를 맺지 않고 있습니다. 구현에서는 다른 Entity 또는 Aggregate Root를 참조할 때, 해당 ***Entity나 Root의 Id를 참조*** 하는 간접 참조 방식을 사용했습니다.

# Modeling -> Code로 구현하기

샘플 프로젝트의 전체적인 구조는 아래의 이미지와 같습니다.

![project-structure](https://cnaps-skcc.github.io/assets/images/ers-structure.png)

- config : RepositoryRestConfig, SecurityConfig, SwaggerConfig 등 프로그램의 Configuration 파일들을 위한 패키지
- context : auth, base, bcm과 같은 컨텍스트의 상위 패키지
- auth, bcm은 서로의 Repository에 직접 접근할 수 없고 각자의 Service를 통해서만 데이터 요청 및 응답할 수 있습니다.
- application.sp.web : Web을 위한 Controller, RestController를 위한 패키지
- 위에서 설계한 각 클래스들은 Domain으로 구분하였습니다.  Account, Permission, Role은 Authority라는 Domain 패키지로, TopMenu와 SubMenu는 Functions라는 Domain 패키지의 Menu로 묶었습니다.
- 각 클래스 들은 Model과 Repository로 나뉩니다.

아래는 각 클래스 Model의 Code 설명입니다.

## 1. Accout

각 사용자는 1개의 역할을 부여받을 수 있습니다.

```java
package com.skcc.demo.context.auth.domain.authority.account.model;
 
import javax.persistence.Entity;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
 
import com.skcc.demo.context.base.domain.AbstractEntity;
import com.skcc.demo.context.base.domain.AggregateRoot;
 
import lombok.Data;
 
@Data
@Entity
public class Account extends AbstractEntity implements AggregateRoot {
    @NotNull
    private String password;
 
    private String name;
 
    @NotNull
    @Email
    private String email;
 
    private Boolean accountUsage = true;
    private Long roleId;
    private String roleName;
 
    public Account() {
 
    }
 
    public Account(String name, String password, String email, Boolean accountUsage) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.accountUsage = accountUsage;
    }
}

```

## 2. Permission

권한은 어떤 메뉴 (기능)의 권한인지 구분되도록 resourceId를 가지며, 권한의 정도는 PerLevel로 구분됩니다.

```java

package com.skcc.demo.context.auth.domain.authority.permission.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.skcc.demo.context.base.domain.AbstractEntity;
import com.skcc.demo.context.base.domain.AggregateRoot;

import lombok.Data;

@Data
@Entity
public class Permission extends AbstractEntity implements AggregateRoot{
	private String name;
	
	@Enumerated(EnumType.STRING)
	private PerLevel perLevel;
	
	private Long resourceId;
	private Boolean perUsage=true; //Should not use 'usage' as property's name
	public Permission() {
		
	}
	public Permission(String name, PerLevel perLevel, Long resourceId) {
		this.name= name;
		this.perLevel = perLevel;
		this.resourceId = resourceId;
	}
}

```

```java
package com.skcc.demo.context.auth.domain.authority.permission.model;
 
public enum PerLevel {
    VIEW, //read
    EDIT, //create, update, delete
    ADMIN //create, read, update, delete
}

```

*PerLevl : Permission Level

## 3. Role

각 역할은 권한 리스트를 가지고 있습니다.  
또한 역할은 큰 4가지 범위로 RoleDivision에 의해 구분됩니다.

```java
package com.skcc.demo.context.auth.domain.authority.role.model;
 
import java.util.ArrayList;
import java.util.List;
 
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
 
import com.skcc.demo.context.base.domain.AbstractEntity;
import com.skcc.demo.context.base.domain.AggregateRoot;
 
import lombok.Data;
 
@Data
@Entity
public class Role extends AbstractEntity implements AggregateRoot{
     
    private String name;
     
    @ElementCollection
    private List<Long> perIdList = new ArrayList<Long>();
     
    private Boolean roleUsage;
     
    @Enumerated(EnumType.STRING)
    private RoleDivision roleDivision;
     
    public Role() {
         
    }
     
    public Role(String name,RoleDivision roleDivision, Boolean roleUsage) {
        this.name= name;
        this.roleDivision = roleDivision;
        this.roleUsage = roleUsage;
         
    }
}

```

*perIdList = Permission Id List

```java
package com.skcc.demo.context.auth.domain.authority.role.model;
 
public enum RoleDivision {
     
    SYS_ADMIN("SYS_ADMIN"), //시스템관리
    PARTNER_COMPANY("PARTNER_COMPANY"), //협력
    MEMBER_COMPANY("MEMBER_COMPANY"), //회원
    COUNSELOR("COUNSELOR"), //상담,
    MANAGER("MANAGER"); //관리
     
    private String value;
    RoleDivision(String value){
        this.value = value;
         
    }
    public String getValue() {
        return this.value;
    }
}
```

*RoleDivision : Role 상위 구분 타입

## 4. bcm.Menu

메뉴는 현재 상위메뉴와 하위메뉴로 나눠져 구현하였습니다.  
각 하위메뉴는 1개의 상위 메뉴 Id를 가지게 됩니다.

```java
package com.skcc.demo.context.bcm.domain.functions.menu.model;
 
import javax.persistence.Entity;
 
import com.skcc.demo.context.base.domain.AbstractEntity;
import com.skcc.demo.context.base.domain.AggregateRoot;
 
import lombok.Data;
 
@Data
@Entity
public class SubMenu extends AbstractEntity implements AggregateRoot{
    private String name;
    private Long topMenuId;
    private Boolean subMenuUsage = true;
     
    public SubMenu() {
         
    }
    public SubMenu(String name, Long topMenuId) {
        this.name = name;
        this.topMenuId = topMenuId;
    }
}
```

```java
package com.skcc.demo.context.bcm.domain.functions.menu.model;
 
import javax.persistence.Entity;
 
import com.skcc.demo.context.base.domain.AbstractEntity;
 
import lombok.Data;
 
@Data
@Entity
public class TopMenu extends AbstractEntity {
    private String name;
    private Boolean topMenuUsage = true;
     
    public TopMenu() {
         
    }
    public TopMenu(String name) {
        this.name= name;
    }
}
```

# UserDetailsService 구현

Spring Security는 반드시 UserDetailsService의 loadUserByUsername메소드를 구현해야합니다.  
구현방법: UserDetailsService를 상속받아, loadUserByUsername 메소드를 구현할 수 있습니다.  
  
예제 프로젝트에서는 AuthorityService라는 interface가 UserDetailsService를 상속받습니다.  
그리고 AuthorityService는 AuthorityLogic에서 구현하게 하였는데, 따라서 loadUserByUsername은 AuthorityLogic에서 구현하였습니다.

## 1. AuthorityService

```java
package com.skcc.demo.context.auth.domain.authority;
 
import java.util.List;
 
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;
 
import com.skcc.demo.context.auth.domain.authority.account.model.Account;
import com.skcc.demo.context.auth.domain.authority.permission.model.Permission;
import com.skcc.demo.context.auth.domain.authority.role.model.Role;
import com.skcc.demo.context.auth.domain.authority.role.model.RoleDivision;
 
public interface AuthorityService extends UserDetailsService{
        /******other method ******/
 
}
```

## 2. AuthorityLogic

```java
package com.skcc.demo.context.auth.domain.authority;
 
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
 
import javax.transaction.Transactional;
 
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
 
import com.skcc.demo.context.auth.domain.authority.account.AccountRepository;
import com.skcc.demo.context.auth.domain.authority.account.model.Account;
import com.skcc.demo.context.auth.domain.authority.permission.PermissionRepository;
import com.skcc.demo.context.auth.domain.authority.permission.model.Permission;
import com.skcc.demo.context.auth.domain.authority.role.RoleRepository;
import com.skcc.demo.context.auth.domain.authority.role.model.Role;
import com.skcc.demo.context.auth.domain.authority.role.model.RoleDivision;
@Service
@Transactional
public class AuthorityLogic implements AuthorityService{
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
 
    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
 
        Account account = accountRepository.findByEmail(userEmail).orElseThrow(()->new UsernameNotFoundException(userEmail+"이 존재하지 않습니다."));
 
        String roleName = roleRepository.findById(account.getRoleId()).get().getRoleDivision().getValue(); //RoleDivision에 따라서 접근할 수 있는 페이지 제한
 
 
            return new User(account.getEmail(), account.getPassword(),getAuthorities("ROLE_"+roleName)); //반드시 "ROLE_"로 시작해야한다
            //new org.springframework.security.core.userdetails.User
    }
 
    private Collection<? extends GrantedAuthority> getAuthorities(String roleName) {
        List<GrantedAuthority> authorities = new ArrayList<>();
         authorities.add(new SimpleGrantedAuthority(roleName));
        return authorities;
    }
 
    @Override
    @Transactional
    public Long joinUser(Account account) {
 
          BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
          account.setPassword(passwordEncoder.encode(account.getPassword())); //PasswordEncoder를 사용하지 않고 가입하는 경우 Password형식 오류로 로그인 불가
          account.setRoleId((long)1);
          account.setRoleName(roleRepository.findById((long)1).get().getName());
            return accountRepository.save(account).getId();
    }
 
    /******other method implements******/
 
 
}
```

**Tips**  
- loadUserByUsername : return 하는 User는 Domain Model에서 선언하는 User가 아닌, **Spring Security의 User**임  
- joinUser : 회원가입 시 PasswordEncoder로 암호화하지 않고 DB에 임의로 입력하는 경우 Login 불가 → Password 형식 오류 → 반드시 PasswordEncoder를 사용해서 회원가입  
  ***(예제는 현재 회원가입시 '관리자'역할을 갖게함)***
{: .notice--danger}

## Login Flow

1. 로그인 시도  
   Id : xxx@email.com (Email 형식) , Password : xxx

2. SecurityConfig 의 configure(AuthenticationManagerBuilder) → userDetailsService 호출
3. loadUserByUsername 호출 (UserDetailsService를 상속하고 있는지 Check한 뒤)
4. DB에 접근해, 해당 Id에 부여되어있는 권한 authorities 에 저장
5. Id, Password, Authorities List 를 User에 담아서 return
6. 인증 처리 후 접근할 수 있는 url Open

**구현 코드는 변경되었을 수 있으니, 최종 코드는 반드시 아래의 프로젝트 Github주소를 참고하세요.**

>프로젝트 예제 Github 주소 : <!--인용구-->
<https://github.com/Juyounglee95/auth-sample.git> 