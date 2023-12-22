---
layout: single
title:  "set map unorderd set, unordered map 정리 "
categories: [c++,set,hash,bucket count,bucket,unorderd_set,unordered_map, map, red block tree, BST]
tag : [c++]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---


### set 

중복 허용하지 않는다 중복 허용하려면 multiset을 사용하라.  
내부적으로는 BST 또는 red block tree로 구현이 되어있다 즉 정렬이 되어있다.   

탐색 , 삽입 , 삭제 모두 O(log n )이다.  
set<T,function> fuction 따라서 set구성할수있다   
set과 class를 같이 쓸때는 compare operator가 있어야 한다   

정렬 되어있는데 요소 접근 하는 operator지원하지 않는다   
**최대값은 *set.rbegin() , 최솟 값은 *set.begin()이다**   

<br>



* Lower bound: first element that is greater-or-equal.   

<br>



* Upper bound: first element that is strictly greater.   



==> 기준이 여러개인 경우에 잘 써먹을수있다!      

<br>



>그리고 lowerbound,upper bound에 greater<int>()를 사용할수가 있다 이건 동일한 값 또는 작은 값을 출력하는건데 이때 순서가 맞아야 한다 그래서 
sort greater를 사용해서 역순으로 내림차순 정렬을 해야 한다 이건 vector등을 사용할때이고 set을 사용해야 한다고 하면 마찬가지로 set<int,greater<int>>를 사용해서 역순으로 만들고 나서 lower bound greater를 적용할수가 있다!!!   

<br>














**multi set ,set, map모두 정렬되어있고 log n이 걸리니까 sort사용하는것보다 더 이득인가에 대한 답변**



https://stackoverflow.com/questions/50198839/storing-in-stdmap-stdset-vs-sorting-a-vector-after-storing-all-data#:~:text=Using%20a%20set%2C%20you%20get%20O%20%28log%20%28N%29%29,std%3A%3Asort%20have%20O%20%28N%20log%20%28N%29%29%20on%20average.%29.
____________________

### map

key와 value로 이루어져 있다 python에서 dictionary와 같다. set처럼 BST 또는 red block tree로 구성 되어있다 비교 할때는 key 값을 기준으로 비교 한다    


**key값 기준으로 정렬이 되어있는 결과를 얻을수있다 ==> ordered_map인것이다**   



주의점 : 지정하지 않는 key값에 대해서도 default 값 들어간다 조심해야함   

탐색, 삽입 , 삭제 => O(log n)   


____________________

### unordered_set

set에 정렬 기능만 없는것이으로 hash로 이루어져 있다  

탐색 ,삽입,삭제 가 O(1) 이다    

hash값에 따른 bucket을 구해서 bucket들어가면 연결리스트로 연결되어있다(hash값이 크니까 여러개의 bucket을 사용한다 hash%bucket count로 버킷 인덱스를 찾는다)     

여기서 찾는 값이있는지 없는지만 파악하면 되므로 탐색 삽입 삭제가 O(1)인것이다   

linked list에 요소가 계속 많아지면 결국 bucket count가 늘어남 -> rehashing이 일어난다 - O(n) 미리 충분한 메모리를 확보 해야 하는 이유이다   

**max_load factor**  

bucket에 어느정도 요소가 있으면 rehashing하는지 직접 설정하는거다 비율로 계산을 한다 만약 bucket count =100 ,linked list요소들도 100이면 
비율이 1이다(default)이때 rehashing일어나는데 이 비율을 max load factor로 조절 하면 50개일때 rehashing하는등 조절 할수가 있다 자세한 사항은 cppreference참고 할것!     


**object를 사용하려면**  

class 에서 unordered set 사용하려면  equal 와 hash를 만들어야한다 -> hash 정보가 없으면 class를 대상으로 unorderd set사용할수가 없다
hash 함수는 custom으로 만들수도 있고 namespace안에 적용 하는 방법도 있다 

equal이 필요한 이유는 같은 bucket안에서 서로 다른 object임을 구분하기 위해서 필요한 개념인것이다 

unordered_set<Cat,CatHash> cats; -> 만든 hash 함수를 같이 넘겨야 한다 


**unordered_map**   


unorderd set과 비슷하다  hash 로 구성됨 탐색 삽입 삭제 모두 O(1) 이다  map처럼 squal blacket접근 사용은 주의해야한다   
reserve를 통해 rehashing 막아야함 


<br>




```c++
#include <iostream>
#include <unordered_set>
#include <string>
#include <unordered_map>
/*
	Unordered set   Unordered map 

	hash function 사용한다 여러개의 bucket에 나누어 담는다 




*/

using namespace std;

class Cat
{
	int _age;
	string _name;

public:
	Cat(string name, int age)
		:_name(name), _age(age)
	{}
	void speak() const
	{
		cout << _name << " " << _age << endl;
	}
	const int age() const
	{
		return _age;
	}
	const string name() const
	{
		return _name;
	}

};

//hash
struct CatHash
{
	std::size_t operator()(Cat const& c) const noexcept
	{
		std::size_t h1 = std::hash<std::string>{}(c.name());
		std::size_t h2 = std::hash<int>{}(c.age());
		return h1 ^ (h2 << 1); // or use boost::hash_combine
	}
};

//equal

bool operator==(const Cat& lhs, const Cat& rhs)
{
	return(lhs.age() == rhs.age() && lhs.name() == rhs.name());
}
int main()
{
	unordered_set<string> unordSet;

	unordSet.emplace("abc");
	unordSet.emplace("def");
	unordSet.emplace("ghi");
	unordSet.emplace("jkl");

	cout << "bucket count : " << unordSet.bucket_count() << endl;

	cout<<"abc : "<<hash<string>{}("abc")<<" bucket is : "<<unordSet.bucket("abc")<<endl;
	cout<<"def : "<<hash<string>{}("def")<<" bucket is : "<<unordSet.bucket("def")<<endl;
	cout<<"ghi :" <<hash<string>{}("ghi")<<" bucket is : "<<unordSet.bucket("ghi")<<endl;
	cout<<"jkl : "<<hash<string>{}("jkl")<<" bucket is : "<<unordSet.bucket("jkl")<<endl;
	


	cout << "-----------------------------------unordered set class object version! --------------------------------------------\n";
	
	//hash와 equal을 만들어야 한다 

	

	unordered_set<Cat,CatHash> cats;
	cats.emplace("kitty", 1);
	cats.emplace("nabi", 2);






	cout << "-----------------------------------unordered map --------------------------------------------\n";

	unordered_map<int, string> id;

	id.emplace(1,"nocope");
	id.emplace(2,"noco");
	id.emplace(3,"cope");
	id.emplace(1, "ddddd");
	

	for (auto& ele : id)
	{
		cout << ele.first << " " << ele.second << endl;
	}

	
	return 0;
}
```
