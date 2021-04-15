---
title: "Spring boot + Redis 시작하기"
date: 2021-04-06 12:00:00 +0900
categories: spring
comments: true
---

## Spring boot + Redis 시작하기
* pom.xml에 dependency 추가

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

* application.properties 설정 추가

```m
spring.redis.lettuce.pool.max-active=10
spring.redis.lettuce.pool.max-idle=10
spring.redis.lettuce.pool.min-idle=2
spring.redis.port=6379
spring.redis.host=127.0.0.1
```

* Redis Configuration 추가

```java
@Configuration
public class RedisConfig {
	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory();
		return lettuceConnectionFactory;
	}

	@Bean
	public RedisTemplate<String, Object> redisTemplate() {
		RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
		redisTemplate.setConnectionFactory(redisConnectionFactory());
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		return redisTemplate;
	}
}
```

<a id="prev" class="btn" href="/spring/spring-redis-save/">Spring boot + Redis 데이터 조회/저장</a>
