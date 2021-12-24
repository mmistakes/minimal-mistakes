---
layout: post
title: "스프링부트 이클립스 DB 연결 2"
---

📌이전에 진행한 것  
프로젝트 파일 생성 ✔  
application.properties 설정 ✔  
domain 생성 ✔  

<br>

📌해야할 것  
repository 생성  
service, serviceImpl 생성  
controller 생성  
연결 확인  

<br>

### 4. Repository 생성   
repository package 생성 뒤  
CategoryRepository.java 생성  
![image](https://user-images.githubusercontent.com/86642180/147019788-9cb89378-616e-4558-ae1b-b6748a0a1626.png)  
![image](https://user-images.githubusercontent.com/86642180/147020036-389d5f61-26e0-4406-a1af-1f8e862a2754.png)  

T 👉 Entity명으로 변경 Category  
ID 👉 실제로 category 테이블의 primary key type이 integer기 때문에 Integer로 변경  
![image](https://user-images.githubusercontent.com/86642180/147019895-7fa8aff4-3141-458e-8a6e-c72879e248a8.png)

<br><br>

### 5. Service 및 ServiceImpl
service package 생성 뒤 CategoryService.java 생성(interface)  
데이터 관련 메소드를 생성  
```
	public List<Category> getAllCategory();
	public Category getCategoryById(int category_id);
	public Category addOrUpdateCategory(Category category);
	public Category deleteCategory(int category_id) throws Exception;
```

<br>
serviceImpl package 생성 뒤 CategoryServiceImpl.java 생성(class)  
`@Service`를 추가하여 비즈니스 로직 처리 가능하게 만듦  
CRUD를 진행하는 repository에서 활용할 메소드를 처리할 수 있게
```
  @Autowired
	private CategoryRepository categoryRepository;
```
추가  
의존성 주입으로 현 클래스에서 JPA 메소드 처리를 할 수 있음  
기존에 repository에서 선언한 메소드를 오버라이드 하여 데이터 처리  
```
	@Override
	public List<Category> getAllCategory() {
		return (List<Category>) categoryRepository.findAll();
	}

	@Override
	public Category getCategoryById(int category_id) {
		return categoryRepository.findById(category_id).orElse(null);
	}

	@Override
	public Category addOrUpdateCategory(Category category) {
		return categoryRepository.save(category);
	}

	@Override
	public Category deleteCategory(int category_id) throws Exception {
		Category deleteCategory = null;
		
		try {
			deleteCategory = categoryRepository.findById(category_id).orElse(null);
			if(deleteCategory == null) {
				throw new Exception("Not available");
			}else {
				categoryRepository.deleteById(category_id);
			}
		}
		catch(Exception e){
			throw e;
		}
		
		return deleteCategory;
	}
```

<br>

### 6. Controller
`@RestController` json 타입의 객체 데이터를 반환함  
`@Controller` 주로 view를 반환  
연결이 되는지 확인이 필요하므로 `@RestController` 추가 `@RequestMapping` 추가  
