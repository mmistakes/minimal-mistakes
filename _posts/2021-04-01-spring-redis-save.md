---
title: "Spring boot + Redis 데이터 조회/저장"
date: 2021-04-06 12:00:00 +0900
categories: spring
comments: true
---


[참조 : 레디스(Redis)의 다양한 활용 사례](https://happyer16.tistory.com/entry/%EB%A0%88%EB%94%94%EC%8A%A4Redis%EC%9D%98-%EB%8B%A4%EC%96%91%ED%95%9C-%ED%99%9C%EC%9A%A9-%EC%82%AC%EB%A1%80)

## Hash
* hash에 사용자를 저장한다.

```java
@Service
public class MainService {

	final RedisTemplate<String, Object> redisTemplate;
	
	final HashOperations<String, String, User> hash;
	
	MainService(RedisTemplate<String, Object> redisTemplate) {
		this.redisTemplate = redisTemplate;
		this.hash = this.redisTemplate.opsForHash();
	}

	public void save( User user) {
		hash.put("USER", user.getUserId(), user);
	}

	public User findById( String userId) {
		return (User) hash.get("USER", userId);
	}

	public void deleteById(String userId) {
		hash.delete("USER", userId);
	}
}
```

## zSet / sortedSet
* 사용자의 최근 검색어를 불러오기
 - sortedSet에 사용자가 검색시 검색어를 저장한다.

```java
@Service
public class RecentService {
	
	final RedisTemplate<String, Object> redisTemplate;
	
	final ZSetOperations<String, Object> zSet;
	
	RecentService( RedisTemplate<String, Object> redisTemplate) {
		this.redisTemplate = redisTemplate;
		this.zSet = this.redisTemplate.opsForZSet();
	}

	public void save(String userId, String keyword) {
		String key = String.format("SEARCH:%s", userId);
		zSet.add(key, keyword, 0);
	}

	public String[] findRecent(String userId) {
		String key = String.format("SEARCH:%s", userId);
		Set<Object> range = zSet.range(key, 0, 5);
		
		String arr[] = range.toArray(new String[range.size()]);
		return arr;
	}
}
```

# bit
* bit연산을 사용해서 일일 방문자수 구하기
 - 사용자가 1~n까지 순번을 가지고 있다면 사용자가 로그인한 시점에 사용자 순번에 맞는 비트를 1로 업데이트한다.
 - 해당 날짜의 데이터를 redis bitcount를 사용하여 구하면 일일 방문자수가 계산한다.
 - 한 사용자가 여러번 방문하더라도 중복으로 카운트 하지 않는다.

```java
@Service
public class VisitorService {
	
	final RedisTemplate<String, Object> redisTemplate;
	
	final ValueOperations<String, Object> value;
	
	final RedisConnectionFactory factory;
	
	SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	
	VisitorService(RedisTemplate<String, Object> redisTemplate) {
		this.redisTemplate = redisTemplate;
		this.value = this.redisTemplate.opsForValue();
		this.factory = this.redisTemplate.getConnectionFactory();
	}

	// 방문한 사용자를 저장
	public void save(long userSeq) {
		Date date = new Date();
		
		String today = sdf.format(date);
		
		String key = String.format("VISIT:%s", today);
		
		value.setBit(key, userSeq, true);
	}
	
	// 방문자 수를 구한다.
	public long countVisitor( String date) {
		
		String key = String.format("VISIT:%s", date);
		return factory.getConnection().bitCount(key.getBytes());
	}
}
```


<a id="prev" class="btn" href="/spring/spring-redis/">Spring boot + Redis 시작하기</a>
