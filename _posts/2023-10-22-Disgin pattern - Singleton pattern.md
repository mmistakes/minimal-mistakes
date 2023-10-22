---
layout: single
title:  "Disgin pattern - Singleton pattern"
categories: Disgin_pattern
tag: [Disgin pattern]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆싱글톤 패턴(Singleton pattern)

애플리케이션이 시작될 때, 어떤 클래스가 최초 한 번만 메모리를 할당(static)하고 해당 메모리에 인스턴스를 만들어 사용하는 패턴이다.<br>즉, 싱글톤 패턴은 '하나'의 인스턴스만 생성하여 사용하는 디자인 패턴이다. 인스턴스가 필요할 때, 똑같은 인스턴스를 만들지 않고 기존의 인스턴스를 활용하는 것!



**사용하는 이유**

먼저, 객체를 생성할 때마다 메모리 영역을 할당받아야 한다. 하지만 한번의 new를 통해 객체를 생성한다면 메모리 낭비를 방지할 수 있다. <br>하지만 싱글톤 인스턴스가 너무 많은 일을 하거나 많은 데이터를 공유시킬 경우에 다른 클래스의 인스턴스들 간에 결합도가 높아져 "개방-폐쇄 원칙"을 위배하게 된다. 



**사용하는 경우**

주로 공통된 객체를 여러개 생성해서 사용해야하는 상황 : 데이터베이스에서 커넥션풀, 스레드풀, 캐시, 로그 기록 객체 등

<br>





# ◆싱글톤 패턴 예시



## DB manger 작성

```java
public class DBManager {
// 인스턴스의 주소를 저장하기 위한 참조 변수
		private static Connection conn;
		
		// Connection 관련 정보 상수
		private static final String DRIVER = "oracle.jdbc.driver.OracleDriver";
		private static final String URL = "jdbc:oracle:thin:@localhost:1521:xe";
		private static final String USER = "scott";
		private static final String PASS = "tiger";
		
		// 생성자를 private으로 선언하여 은닉화
		private DBManager() {
			
		}
		
		// 인스턴스를 생성 또는 기존 인스턴스를 반환하는 메서드
		public static Connection getConnection() {
			conn = null;
			if (conn == null) {
				try {
					Class.forName(DRIVER);
					conn = DriverManager.getConnection(URL, USER, PASS);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return conn;
		}
		
		// select를 수행한 후 리소스 해제를 위한 메서드
		public static void close(Connection conn, PreparedStatement pstmt, ResultSet rs) {
			try {
				if (rs != null) {
					try {
						rs.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				
				if (pstmt != null) {
					try {
						pstmt.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				
				if (conn != null) {
					try {
						conn.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		// DML작업을 수행한 후 리소스 해제를 위한 메서드
		public static void close(Connection conn, PreparedStatement pstmt) {
			try {
				if (pstmt != null) {
					try {
						pstmt.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				
				if (conn != null) {
					try {
						conn.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
}
```

<br>





## 자바 쿼리문 실행

```java
public MemberDTO loginCheck(MemberDTO Check) {

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    MemberDTO mDto = null;

    String sql = "SELECT mem_email, mem_pwd, mem_nickName FROM member WHERE mem_email = ? AND mem_pwd = ?";
    try {

        conn = DBManager.getConnection();

        pstmt = conn.prepareStatement(sql);

        pstmt.setString(1, Check.getMemEmail());
        pstmt.setString(2, Check.getMemPwd());

        rs = pstmt.executeQuery();

        while (rs.next()) {
            String email = rs.getString("mem_email");
            String pwd = rs.getString("mem_pwd");
            String nickName = rs.getString("mem_nickName");

            mDto = new MemberDTO(nickName, email, pwd);

        }

    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        DBManager.close(conn, pstmt, rs);
    }
    return mDto;
}
```

<br>



**<DB 연결 주소 : String url = "jdbc:oracle:thin:@localhost:1521:xe";>**

"jdbc:oracle:thin:@localhost:1521:XE" 의 의미<br/>jdbc - jdbc 라이브러리<br/>oracle - 오라클로 연결<br/>thin - 자바로 연결 (반대는 OCI - OS로 작동)<br/>@localhost - 내 내부 아이피로 접속<br/>1521 - 포트번호<br/>XE - 리스너

<br>



**<PreparedStatement( or Statement )를 이용한 SQL Syteax정의 및 실행>**

**PrepareStatement**는 **메서드**와, "**?**" 이것을 이용해서 데이터를 **전달**할 수 있다.<br/>**set타입**은 작성한 SQL문에 있는 ? 라는 **값을 바꿔주는 역할**이다 ***중요\***<br/>예시) **첫** 번째 ?를 **숫자형** **100**으로 변경하고 싶으면 **setInt(1, 100)** 형식으로 작성하면 된다.<br/>

<br>



**<succ = pstmt.executeUpdate();>**

마지막으로 해야하는것은 **Statement**때와 다르게 **PrepareStatement**는 **execute**를 따로 해야한다.<br/>여기서도 **executeQuery**, **executeUpdate** 메소드를 **사용**해야 한다.



 \- **executeUpdate(String sql)**

조회문(select, show 등)을 **제외한** create, drop, insert, delete, update 등등 문을 처리할 때 사용한다.

 \- **executeQuery(String sql)**

**조회문**(select, show 등)을 실행할 목적으로 사용한다.





참고 블로그 : <a href="https://gyoogle.dev/blog/design-pattern/Singleton%20Pattern.html">gyoogle.dev</a>
