---
title: "JdbcTemplate을 이용한 쿼리 실행"
categories:
  - Spring
toc: true
toc_label: "목차"
#toc_icon:
toc_sticky: true
#last_modified_at:
---

## 1. JdbcTemplate을 이용한 쿼리 실행
스프링을 사용하면 DataSource나 Connectionm Statement, ResultSet을 직접 사용하지 않고 JdbcTemplate을 이용해서 편리하게 쿼리를 실행할 수 있다. 

### 1.1 JdbcTemplate 생성하기
가장 먼저 해야 할 작업은 JdbcTemplate 객체를 생성하는 것이다. 코드는 다음과 같다.
```java
import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

public class MemberDao {
	
	private JdbcTemplate jdbcTemplate;
	
	public MemberDao(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
}
```
JdbcTemplate 객체를 생성하려면 DataSource를 생성자에 전달하면 된다. 물론 setter 메서드 방식을 이용해서 주입해도 된다.

### 1.2 JdbcTemplate을 이용한 조회 쿼리 실행
Jdbctemplate 클래스는 <span style="color:red">SELECT 쿼리 실행을 위한 query()메서드</span>를 제공한다. 자주 사용되는 쿼리 메서드는 다음과 같다.
- List<T> query(String sql, RowMapper<T> rowMapper)
- List<T> query(String sql, Object[] args, RowMapper<T> rowMapper)
- List<T> query(String sql, RowMapper<T> rowMapper, Object ... args)

query() 메서드는 sql 파라미터로 전달받은 쿼리를 실행하고 RowMapper를 이용해서 ResultSet의 결과를 자바 객체로 변환한다. sql 파라미터가 아래와 같이 인덱스 기반 파라미터를 가진 쿼리이면 args 파라미터를 이용해서 각 인덱스 파라미터의 값을 지정한다.
```java
select * from member where email = ?;
```
쿼리 실행 결과를 자바 객체로 변환할 때 사용하는 RowMapper 인터페이스는 다음과 같다
```java
package org.springframework.jdbc.core;

public interface RowMapper<T>{
    T mapRow(ResultSet rs, int rowNum) throws SQLException;
}
```
RowMapper의 <span style="color:red">mapRow() 메서드는 SQL 실행 결과로 구한 ResultSet에서 한 행의 데이터를 읽어와 자바 객체로 변환하는 매퍼 기능을 구현한다.</span> RowMapper 인터페이스를 구현한 클래스를 작성할 수도 있지만 임의 클래스나 람다식으로 RowMapper의 객체를 생성해서 query() 메서드에 전달할 때도 많다. 다음과 같이 임의 클래스를 이용해서 메서드를 구현할 수 있다.
```java
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class MemberDao {
	
	private JdbcTemplate jdbcTemplate;
	
	public MemberDao(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	public Member selectByEmail(String email) {
		List<Member> results = jdbcTemplate.query(
				"select * from spring5fs.member where EMAIL = ?;",
				new RowMapper<Member>() {
					@Override
					public Member mapRow(ResultSet rs, int rowNum) throws SQLException{
						Member member = new Member(
								rs.getString("EMAIL"),
								rs.getString("PASSWORD"),
								rs.getString("NAME"),
								rs.getTimestamp("REGDATE").toLocalDateTime());
						member.setId(rs.getLong("ID"));
						return member;
					}
				}, email);
		return results.isEmpty() ? null : results.get(0);
	}
    ... 코드 생략
```
JdbcTemplate의 query() 메서드를 이용해서 쿼리를 실행한다. 이 쿼리는 인데스 파라미터(?)를 포함하고 있다. 인테스 파라미터에 들어갈 값은 emil로 지정했다. 이 query() 메서드의 세 번째 파라미터는 가변 인자로 인덱스 파라미터가 두 개 이상이면 다음과 같이 인데스 파라미터 설정에 사용할 각 값을 콤마로 구분한다.
```java
List<Member> results = jdbcTemplate.query(
    "select * from member where EMAIL = ? and NAME = ?;",
    new RowMapper<Member>(){ ... },
    email, name); // 물음표 개수만큼 해당되는 값 전달
```

### 1.3 결과가 1행인 경우 사용알 수 있는 queryForObject() 메서드
다음은 MEMBER 테이블의 전체 행 개수를 구하는 코드이다. 이 코드는 query() 메서드를 사용했다.
```java
public int count(){
    List<Integer> results = jdbcTemplate.query(
        "select count(*) from member;",
        new RowMapper<Integer>(){
            @Override
            public Integer mapRow(ResultSet rs, int rowNum) throws SQLException{
                return rs.getInt(1);
            }
        });
    return results.get(0);
}
```
count(*) 쿼리는 결과가 한 행 뿐이니 쿼리 결과를 List로 받기보다는 Integer와 같은 정수 타입으로 받으면 편리할 것이다. 이를 위한 메서드가 바로 <span style="color:red">queryForObject()</span>이다.  이 메서드를 이용하면 다음과 같이 구현할 수 있다.
```java
public class MemberDao{
    private JdbcTemplate jdbcTemplate;
    ...
    public int count(){
        Intger count = jdbcTemplate.queryForObject(
            "select count(*) from member;", Integer.class);
    }
}
```
<span style="color:red">queryForObject() 메서드는 쿼리 실행 결과 행이 한 개인 경우에 사용할 수 있는 메서드다.</span> 이 메서드의 두 번째 파라미터는 칼럼을 읽어올 때 사용할 타입을 지정한다.\
이 코드에서 볼 수 있듯이 queryForObject() 메서드도 쿼리에 인덱스 파라미터(?)를 사용할 수 있다.

실행 결과 칼럼이 두 개 이상이면 RowMapper를 파라미터로 전달해서 결과를 생성할 수 있다. 다음은 그 예이다.
```java
Member member = jdbcTemplate.queryForObject(
    "select * from member where ID = ?",
    new RowMapper<Member>(){
        @Override
        public Member mapRow(ResultSet rs, int rowNum) throws SQLException{
            Member member = new Member(
                rs.getString("EMAIL"),
                rs.getString("PASSWORD"),
                rs.getString("NAME"),
            )
            return member;
        }
    }, 100);
```
> queryForObject() 메서드를 사용한 위 코드와 기존의 query() 메서드를 사용한 코드의 차이점은 리턴 타입이 List가 아니라 RowMapper로 변환해주는 타입이라는 점이다.

주요 queryForObejct() 메서드는 다음과 같다.
- T queryForObject(String sql, Class<T> requiredType)
- T queryForObject(String sql, Class<T> requiredType, Object ... args)
- T queryForObject(String sql, RowMapper<T> rowMapper)
- T queryForObject(String sql, RowMapper<T> rowMapper, Object ... args)

<span style="color:red">queryForObejct() 메서드를 사용하려면 쿼리 실행 결과는 반드시 한 행이어야 한다.</span> 만약 쿼리 실행 결과 행이 없거나 두 개 이상이면 IncorrectResultSizeDataAccessException이 발생한다. 행의 개수가 0이면 하위 클래스인 EmptyResultDataAccessException이 발생한다.

> 따라서 결과 행이 정확히 한 개가 아니면 queryForObject() 메서드 대신 qeury() 메서드를 사용해야 한다.

### 1.4 JdbcTemplate을 이용한 변경 쿼리 실행
INSERT, UPDATE, DELETE 쿼리는 update()메서드를 사용한다.
- update(String sql)
- update(String sql, Object ... args)

<span style="color:red">update()메서드는 쿼리 실행 결과로 변경된 행의 개수를 리턴한다.</span> 이 메서드의 사용 예는 다음과 같다.

```java
... 

public class MemberDao {
	
	private JdbcTemplate jdbcTemplate;
	
	public MemberDao(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	public void update(Member member) {
		jdbcTemplate.update(
				"update member set NAME = ?, PASSWORD = ? where EMAIL = ?",
				member.getName(), member.getPassword(), member.getEmail());
	}
}
```

### 1.5 PreparedStatementCreate를 이용한 쿼리 실행
지금까지 작성한 코드는 다음과 같이 쿼리에서 사용한 값을 인자로 전달했다.

```java
jdbcTemplate.update(
    "update member set NAME = ?, PASSWORD = ? where EMAIL = ?",
    member.getName(), member.getPassword(), member.getEmail());
```
대부분 이와 같은 방법으로 쿼리의 인덱스 파라미터의 값을 전달할 수 있다.

PreparedStatement의 set 메서드를 사용해서 직접 인덱스 파라미터의 값을 설정해야 할 때도 있다. 이 경우 PreparedStatementCreator()를 인자로 받는 메서드를 이용해서 직접 PreparedStatemt를 생성하고 설정해야 한다.

PreparedStatementCreator 인터페이스는 다음과 같다.
```java
package org.springframework.jdbc.core;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public interface PreparedStatementCreator{
    PreparedStatement createPreparedStatement(Connection con) throws SQLException;
}
```
PreparedStatementCreator 인터페이스의 createPrepareStatement() 메서드는 Connection 타입의 파라미터를 갖는다. PreparedStatementCreator를 구현한 클래스는 createPrepareStatement() 메서드의 파라미터로 전달받는 Connection을 이요해서 PreparedStatement 객체를 생성하고 인데스 파라미터를 알맞게 설정한 뒤에 리턴하면 된다.
```java
jdbcTemplate.update(new PreparedStatementCreator(){
    @Override
    public PreparedStatement createPreparedStatement(Conncetion con) throws SQLException{
        // 파라미터로 전달받은 Connection을 이용해서 PreparedStatement 생성 
        PreparedStatement pstmt = con.preparedStatemnt(
            "insert into member (EMAIL, PASSWORD, NAME, REGDATE) values (?, ?, ?, ?);");
        
        //인덱스 파라미터의 값 설정
        pstmt.setString(1, member.getEmail());
        pstmt.setString(2, member.getPassword());
        pstmt.setString(3, member.getName());
        pstmt.setTimestamp(4, Timestamp.valueOf(member.getRegisteDateTime()));

        //생성한 PreparedStatement 객체 리턴
        return pstmt;
    };
});
```
JdbcTemplate 클래스가 제공하는 메서드 중에서 PreparedStatementCreator 인터페이스를 파라미터로 갖는 메서드는 다음과 같다.
- List<T> query(PreparedStatementCreator psc, RowMapper<T> rowMapper)
- int update(PreparedStatement psc)
- int update(PreparedStatement psc, KeyHolder generatedKeyHolder)

위 목록에서 세 번째 메서드는 자동 생성되는 키값을 구할 때 사용한다. 이에 대한 내용은 이어서 설명된다.

### 1.6 INSERT 쿼리 실행 시 KeyHolder를 이용해서 자동 생성 키값 구하기
MySQL의 AUTO_INCREMENT 칼럼은 행이 추가되면 자동으로 값이 할당되는 칼럼으로서 주요키 칼럼에 사용된다. 따라서 INSERT 쿼리에 자동 증가 칼럼에 해당하는 값은 지정하지 않는다.\
그런데 쿼리 실행 후에 생성된 키값을 알고 싶다면 어떻게 해야 할까? update()메서드는 변경된 행의 개수를 리턴할 뿐 생성된 키값을 리턴하지는 않는다.

JdbcTemplate은 자동으로 생성된 키값을 구할 수 있는 방법을 제공하고 있다. 그것은 바로 KeyHolder를 사용하는 것이다. 다음은 그 예이다.
{% highlight java linenos %}
```java
...

import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

public class MemberDao {
	
	private JdbcTemplate jdbcTemplate;
	
	public MemberDao(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	public void insert(Member member) {
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator() {
			@Override
			public PreparedStatement createPreparedStatement(Connection con) throws SQLException{
				PreparedStatement pstmt = con.prepareStatement(
						"insert into spring5fs.member (EMAIL, PASSWORD, NAME, REGDATE) "
						+ "values (?, ?, ?, ?);",
						new String[] {"ID"});
				pstmt.setString(1, member.getEmail());
				pstmt.setString(2, member.getPassword());
				pstmt.setString(3, member.getName());
				pstmt.setTimestamp(4, Timestamp.valueOf(member.getRegisterDateTime()));
				return pstmt;
			}
		}, keyHolder);
		Number keyValue = keyHolder.getKey();
		member.setId(keyValue.longValue());
	}
}
```
{% endhighlight %}
- 16행 : GeneratedKeyHolder 객체를 생성한다. 이 클래스는 자동 생성된 키값을 구해는  KeyHolder 구현 클래스이다.
- 20-23행 : Connection의 preparedStatement() 메서드를 이용해서 PreparedStatemnt 객체를 생성하는데 두 번째 파라미터로 String 배열인 {"ID"}를 주었다. 이 두 번째 파라미터는 자동 생성되는 키 칼럼 목록을 지정할 때 사용한다.

JdbcTemplate의 update() 메서드는 PreparedStatement를 실행한 후 자동 생성된 키 값을 KeyHolder에 보관한다. KeyHolder에 보관된 키값은 getKey() 메서드를 이용해서 구한다. 이 메서드는 java.lang.Number를 리턴하므로 Number의 intValue(), longValue() 등의 메서드를 사용해서 원하는 타입의 값으로 변환할 수 있다.

## 2. 스프링의 익셉션 변환 처리
SQL 문법이 잘 못 됐을 때 발생한 메시지를 보면 익셉션 클래스가 org.springframework.jdbc 패키지에 속한 BadSqlGrammarException 클래스임을 알 수 있다. 에러 메시지를 보면 BadSqkGrammarException이 발생한 이유는 MySQLSyntaxErrorException이 발생했기 때문이다.
```
org.springframework.jdbc.BadSqlGrammarException ...
...
Caused by : com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: ...
```
위 익셉션이 발생할 때 사용한 코드는 다음과 같았다.
```java
jdbcTemplate,update(
    "update member set NAME = ?, PASSWORD = ?"
    + "where EMAIL = ?;",
    member.getName(), member.getPassword(), member.getEmail())'
```
BadSqlGrammarException을 발생한 메서드는 JdbcTemplate 클래스의 update()메서드이다. JdbcTemplate의 update() 메서드는 DB 연동을 위해 JDBC API를 사용하는데, JDBC API를 사용하는 과정에서 SQLException이 발생하면 이 엑셉션을 알맞은 DataAccessException으로 변환해서 발생한다. 즉 다음과 유사한 방식으로 익셉션을 변환해서 재발생한다.
```java
try{
    ...JDBC 사용 코드
}catch(SQLException ex){
    throw convertSqlToDataException(ex);
}
```
에를 들어 Mysql용 JDBC 드라이버는 SQL 문법이 잘 못된 경우 SQLException 상속받은 MySQLSyntaxErrorException을 발생시키는데 JdbcTemplate은 이 익셉션을 DataAccessException을 상속받은 BadSqlGrammarException으로 변환한다.

DataAccessException은 스프링이 제공하는 익셉션 타입으로 데이터 연결에 문제가 있을 때 스프링 모듈이 발생시킨다. 그렇다면 <span style="color:red">스프링은 왜 SQLException을 그대로 전파하지 않고 SQLException을 DataAccessException으로 변환할까?</span>

<span style="color:red">주된 이유는 연동 기술에 상관없이 동일하게 익셉션을 처리할 수 있도록 하기 위함이다.</span> 스프링은 JDBC뿐만 아니라 JPA, 하이버네이트 등에 대한 연동을 지원하고 MyBatis는 자체적으로 스프링 연동 기능을 제공한다.\
그런데 각각의 구현기술마다 익셉션을 다르게 처리해야 한다면 개발자는 기술마다 익셉션 처리 코드를 작성해야 할 것이다. 각 연동 기술에 따라 발생하는 익셉션을 스프링이 제공하는 익셉션으로 변환함으로써 구현 기술에 상관없이 동일한 코드로 익셉션을 처리할 수 있게 된다.

앞서 BadSqlGrammarException은 DataAccessException을 상속받은 하위 타입이라고 했다. 이 익셉션은 실행할 쿼리가 올바르지 않은 경우에 사용된다. 스프링은 이 외에도 DuplicateException, QueryTimeoutException 등 DataAccessException을 상속한 다양한 익셉션 클래스를 제공한다. 각 익셉션 클래스의 이름은 문제가 발생한 원인을 의미한다.

DataAccessException은 RuntimeException이다. JDBC를 직접 이용하면 다음과 같이 try ~ catch를 이용해서 익셉션 처리해야 하는데 또는 메서드의 throws에 반드시 SQLException을 지정해야 하는데 <span style ="color:red">DataAccessException은 RuntimeException이므로 필요한 경우에만 익셉션을 처리하면 된다.</span>
```java
// JDBC를 직접 사용하면 SQLException을 반드시 알맞게 처리해주어야 함
try{
    pstmt = conn.prepareStatement(someQuery);
    ...
}catch(SQLException ex){
    ... 
}

// 스프링을 사용하면 DataAccessException을 필요한 경우에만
// try ~ catch로 처리해주면 된다.
jdbcTemplate.update(someQuery, param1);
```

## Ref.
- 최범균, 스프링프로그래밍입문5, 가메출판사.