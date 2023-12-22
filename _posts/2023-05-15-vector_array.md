---
layout: single
title:  "vector 문법 정리"
categories: [c++,vector,array,range,span]
tag : [c++]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

<br>



이번 시간에는 vector에 대한 기본적인 내용을 정리 할것이다. 익숙해지는거에는 역시 많이 사용해봐야 할것 같다. 이 시리즈의 저작권은 introduction에 소개 되어있다.  

<br>



_______________________


### vector 

<br>




https://en.cppreference.com/w/cpp/container/vector


**사용이유**  

1. 동적 할당 해제 자동으로 해준다   
2. 지원하는 기능이 많다  


**배열의 특성을 모두 가진다**

- random access O(1)  
- 마지막요소에 삽입 또는 마지막 요소 삭제 O(1)  
- 다른곳에 insertion은 O(n) 한칸씩 뒤로 밀린다 삭제도 마찬가지 

  

벡터는 기본만 있어도 사이즈를 가진다 64bit에서는 8byte의 포인터 변수가 3개 있기 때문이다 

1.	첫번째 요소 가리키는 포인터
2.	size포인터 
3.	capacity포인터 


하지만 vector는 heap, array는 stack영역이다 보니까(compile 시간에 결정) array가 더 빠르다 어느정도 큰 메모리가 아니라면 array 사용하는게 좋다.  



<br>



----------------------

### push_back 대신 emplace_back을 사용해야 하는 이유 

<br>



push_back,emplace_back 모두 인자에 L value : copy, R value : move된다. 하지만 object가 왔을때 임시로 object만들어지고 move를 하게 되는데 c++17의 emplace_back부터는 move없이 바로 object 생성을 할수가 있다.   

Cat& cat =cats.emplace_back("kitty",2)  이렇게 하는게 가장 좋다 쓸데없는 move없어진다.  


<br>



----------------------

### 메모리를 충분히 확보 해야 하는 이유 

벡터에서 마지막 요소 삽입 삭제 할때 O(1) 보장 한다고 했는데 가끔 O(n)이 되는 상황이 있다. -> 결론적으로 vector가 heap을 사용하기 때문이다.  



capacity는 벡터가 확보한 메모리 크기이다 그래서 reserve를 통해 메모리 용량을 조절할수있다 이렇게 하는 이유는 heap은 듬성듬성이라서 메모리를 추가 할때 추가하는 공간이 이미 쓰일수도 있다. 그래서 vector는 이런 경우 copy하거나 move를 한다 ->비효율 그래서 미리 충분한 용량을 확보하는게 좋다.  
<br>

 

또한 rule of five,three에 따라 직접 move constructor, copy constructor을 구현한 클래스와 vector를 사용할때 O(1)의 성능이 O(n)으로 나올수가 있다. 앞에 문제처럼 heap공간을 미리 쓰고 있는 공간일때 noexcept를 move constrouctor에 사용하지 않으면 move도 일어나지 않고 copy가 일어나게 된다 그래서 move constructor 앞에 noexcept 키워드를 사용하자. 물론 reserve를 통해 미리 충분한 공간을 확보하면 상황은 발생하지 않는다. 

----------------------

### vector 반복문 표현 대표적인 3가지 


**반복문 유형**   

> 1. index base
  2. iterator base

  > 백터의 itreators 반복자

    v.begin() 벡터 시작점의 주소값 반환
    v.end()   벡터 끝부분+1의 주소값 반환 (주의점 : 배열 벗어남)
    v.rbegin() 벡터의 끝 지점을 시작점으로 반환
    v.rend()   벡터의 시작+1 지점을 끝 부분으로 반환

    정리 : 벡터 시작 부분 주소값 begin     벡터 끝부분 rbegin
        벡터 시작+1 부분 rend()         벡터 끝 부분+1 end()


	3. range base

<br>




벡터 사이즈가 변경 되는 경우라면 인덱스 기반의 for loop 사용해라 - 앞에 말한 상황(heap을 누가 미리 쓰고 있는 경우)이 발생하면 iterator는 잘못된 주소를 가리키게 되어서 문제가 된다 range의 경우도 비슷한 문제 때문에 문제가 발생하게 된다 하지만 이 역시도 충분한 공간이 마련되어있다면 문제 없이 작동한다.  

<br>




```c++
	vector<int> numA(10, 1);
	
	//index base
	for (int i = 0; i < numA.size(); i++)
	{
		numA[i] *= 2;
	}
	

	//iterator base

	//std::vector<int>::iterator itor = c.begin();
	for (auto iter = numA.begin(); iter != numA.end(); iter++)
	{
		(*iter) *= 2;
	}

	//range base 자주 사용하는 형태이다
	for (auto &n:numA)
	{
		n *= 2;
	}

```


----------------------

### remove,erase

**erase**

https://en.cppreference.com/w/cpp/container/vector/erase


**remove, remove_if**   

https://en.cppreference.com/w/cpp/algorithm/remove

<br>



여러개의 요소를 지워야 할때 erase를 사용하면 O(n)작업이 여러번 발생하게 된다. 하지만 erase와 remove를 같이 사용하면 O(n)작업이 여러번 발생하는 문제 해결 할수가 있다.    


**remove(begin,end,tartget)**  

remove의 작동 원리는 two pointer와 비슷하다  


예시 배열 [0 0 1 1 0]이 있다고 가정 하자    

투 포인터가 있다 해당 target이 0이면  두번째 포인터는 계속 넘어가고 첫번째 포인터는 그대로 있다 두번째 포인터가 1을 만나면 첫번째 포인터 위치에 1을 move [int의 move는 copy]한다 그러면
[1 0 1 1 0]이렇게 된다 그리고 첫번째와 두번째 포인터 다음으로 넘어간다 현재 첫 번째 포인터는 0을 가리키고 있고 두번째 포인터는 마지막 1 위치에 있다 두번째 포인터가 또 1이니까 첫번째 포인터 위치에 copy한다 
[1 1 1 1 0] 이렇게 된다 그리고 첫번째와 두번째 포인터 다음으로 넘어간다 현재 첫번째 포인터는 3번째 1 가리키고 있고 두번째는 마지막 0을 가리킨다 두번째 포인터는 0을 지나 마지막으로 오면 첫번째 포인터 위치를 return 한다 
첫 번째 포인터 위치가 반환 (end()도 마지막 보다 한칸 더 라는거 보면 )이 위치를 erase와 같이 사용하면 
erase(arr.begin(),remove return) 결국에는 [1 1]만 남게 됨 -> 투포인터와 비슷한 원리로 remove가 이루어지고 있다    

<br>



**remove_if()를 사용하면 target자리에 함수가 올수있다 (람다 사용가능 )**


```c++
class Cat
{
	int _age;
	string _name;
public:
	Cat(string name, int age)
		:_name(move(name)),_age(move(age))
	{

	}
	void speak() const
	{
		cout << _name << " " << _age << endl;
	}
	int Age() const
	{
		return _age;
	}

};
bool even_age(Cat& cats)
{
	if (cats.Age() % 2 == 0)
	{
		return true;
	}
	return false;
}

int main()
{
  vector<int> remove_arr = { 0,0,1,1,0 };
	auto iter = remove(remove_arr.begin(), remove_arr.end(), 0); 
	remove_arr.erase(iter,remove_arr.end());
	cout << "this is remove working" << endl;
	for (auto& e : remove_arr)
	{

		cout << e << endl;
	}
	cout << "-------------------------------------" << endl;

	vector<int> rem_arr = { 0,1,1,0,1,0,1,0,2,4,8 };

	//remove
	rem_arr.erase(remove(rem_arr.begin(), rem_arr.end(), 1), rem_arr.end());
	
	cout << "this is remove example " << endl;
	for (auto& ele : rem_arr)
	{
		cout << ele << " ";
	}
	cout << endl;
	cout << "--------------------------------------------\n";

	rem_arr.erase(remove_if(rem_arr.begin(), rem_arr.end(), [](int n) {
		if (n % 2 != 0)
		{
			return n;
		}
		}),rem_arr.end());

	for (auto& ele : rem_arr)
	{
		cout << ele << " ";
	}
	cout << endl;
	cout << "--------------------------------------------\n";


	//remove if object class case 


	vector<Cat> cat_arr;
	cat_arr.reserve(5);

	cat_arr.emplace_back("cat1", 2);
	cat_arr.emplace_back("cat2", 5);
	cat_arr.emplace_back("cat3", 6);
	cat_arr.emplace_back("cat4", 4);
	cat_arr.emplace_back("cat5", 7);

	cat_arr.erase(remove_if(cat_arr.begin(), cat_arr.end(),even_age),cat_arr.end()); // 꼭 lambda 표현 안써도 상관 없다 


	cout << "this is cat remove if!" << endl;
	for (auto& e : cat_arr)
	{
		e.speak();
	}
	cout << "------------------------------------" << endl;
}

```


----------------------


### 관련 알고리즘 

**sort**  
sort가 지원하는 기본 성능은 O(n logn)이다.  
  > stable sort 기준되로 정렬하돼 그외에 것은 순서대로 한다 같은값애 대해서 순서를 바꾸지 않는다 stable sort를 따로 지원한다 
  
  이외에도   

  >partial sort (부분 정렬)도 지원한다 말그대로 부분만 정렬을 한다 이런게 나온 이유는 sort의 time complexity가 O(n logn)이라서 조금이라도 줄이기 위함이다. std::partial_sort(begin,begin+3,end)


  > nth_element( RandomIt first, RandomIt nth, RandomIt last )    
  >https://en.cppreference.com/w/cpp/algorithm/nth_element  


  >기본적으로 n번째의 요소가 정렬이 되었을때의 값을 알수있다 return 값은 없으니 직접 출력해야한다 중요한건 vector가 다시 재정렬된다 nth기준으로 왼쪽은 작은값들 오른쪽은 큰값들이 온다 ->정렬은 안됨

  


```c++
int main()
{
	
	vector<int> soArr = {8,6,3,4,2,1,9,1,41};

	//sort -> nlogn  함수도 사용가능

	//partialsort 부분 정렬 

	partial_sort(soArr.begin(), soArr.begin() + 3, soArr.end());

	for (auto& e : soArr)
	{
		cout << e << " ";
	}
	cout << endl;

	cout << "--------------------------------------------\n";

	//nth_element

	nth_element(soArr.begin(), soArr.begin() + soArr.size() / 2, soArr.end());

	cout << soArr[soArr.size() / 2]<<endl;
	cout << "--------------------------------------------\n";

	//벡터 순서가 nth기준에 따라 바뀌어 있다 

	cout << "vector is Rearranged!! check it " << endl;

	for (auto& e : soArr)
	{
		cout << e << " ";
	}
	cout << '\n';

}
```

<br>



**find**

복잡도는 O(n)찾은 요소의 첫 주소를 반환 한다 end()를 return 하면 못찾은것이다. index를 알고 싶다면 distance를 같이 활용하면 알수있다 만약 정렬이 되어있는 상황에서 find를 한다고 하면 O(n)말고 O(log n)으로 해결 할수가 있는데 binaray_search를 사용하면 되기 때문이다.    




```c++
	//find

	auto result = find(rem_arr.begin(), rem_arr.end(), 2);
	if (result != rem_arr.end())
	{
		cout << "founded" << endl;
		cout << "idx : " << distance(rem_arr.begin(), result)<<endl;
	}
	else
	{
		cout << "Fail to find!" << endl;
	}

	cout << "--------------------------------------------\n";
	
```

<br>



**max_element,min_element,minmax_element** 

사실 c++ 20부터 range를 지원하는데 range에서도 같은 기능을 제공한다 뿐만아니라 find,count등등 다양하게 지원하는게 많다 이건 따로 포스팅해서 정리 할 예정이다.  

<br>



>Defined in header <algorithm>
>min_element
>요소중에 최소 값을 반환

>max_element
>요소중 최대 값을 반환 
>주소를 반환하니까 
>iterator랑 같이 쓰인다 

>minmax_element 
>최소 최대 동시에 알수있다 
>쌍으로 반환됨 


```c++
	vector<int>::iterator it;
	vector<int>::iterator itt = soArr.begin();

	it = min_element(itt, soArr.end());
	cout << "min element is : " << *it <<" idx is " << distance(itt, it) << endl;

	it = max_element(itt, soArr.end());
	cout << "max element is : " << *it << " idx is " << distance(itt, it) << endl;


	//minmax_element 사용방법  
	//주소를 반환하니까 iterator를 써서 주소값을 받고 그다음에 출력할때는 point이용하면 된다 

	pair<vector<int>::iterator, vector<int>::iterator> a1 = minmax_element(itt, soArr.end());

	cout << "min value from minmax_element is : " << *a1.first << endl;
	
	cout << "max value from minmax_element is : " << *a1.second << endl;

	cout << "--------------------------------------------\n";
	

```

<br>



**reduce,accumulate**

>reduce    
>accumulate보다 더 빠르게 처리가능 병렬처리 할때 사용됨 


>accumulate Defined in header <numeric>

>T accumulate( InputIt first, InputIt last, T init ); T init 에는 초기 값이 들어간다 합을 구할때 초기값을 0으로 설정하는것도 그 이유이이다 

>자주하는 실수 , T init은 int형이다 그런데 doubel s = accumulate~~ 한다고 해서 double자료형이 되는게 아니다 acuumulate의 반환값이 init 타입을 따라가기 때문이다 그러니까 초기값 설정할때 잘해야함 만약 다른 자료형으로 캐스팅을 하고 싶다면 초기값을 설정할때 캐스팅을 해야한다 (not 변수)

```c++
	//accumulate     header <numeric>
	
	int sum = accumulate(itt, soArr.end(), 0);
	int multi = accumulate(itt, soArr.end(), 1,multiplies<int>());

	cout << "SoArr sum is " << sum << endl;
	cout << "SoArr product is " << multi << endl;

	cout << "--------------------------------------------\n";

```

<br>



----------------------
### 2차원 배열 

<br>



이 부분은 알고리즘을 직접 해보면서 감을 다시 찾아야 한다.  

여기서는 간단한 행렬만 보여주고 마무리 하겠다   


2차원을 1d로 표현하는게 더 효율적인데 이걸 구현 할수있다 -- 코드 참고 
중요한건 for loop사용할때 cahce line 방향으로 해야 한다 -> row col 순으로 이중 for문 사용해야 chach line방향과 맞다. 

<br>




```c++
//Matrix class 
template <typename T>

class Matrix
{
	vector<T> mMatrix;
	int mRow;
	int mCol;
public:
	Matrix(int row,int col)
		:mRow(row),mCol(col)
	{}

	//m*n matrix  mat(10,10)
	T& operator()(int row_idx, int col_idx)
	{
		const int idx = row_idx * mCol + col_idx;
		return mMatrix[idx];
	}

};
```

<br>





----------------------
### span 

<br>



c++ 20부터 추가가 된 기능이다 이걸 사용하려면 앞서 말한 range와 view에 대한 지식이 필요한데 이 내용은 따로 포스팅해서 정리 하겠다.  



>string_view char pointer string, char array string을 string으로 인자 받으면 성능 떨어진다 이때 사용하는게 string view이다 



https://en.cppreference.com/w/cpp/container/span   


span은 연속된 공간의 시작 주소와 사이즈만 전달 한다  
이러면 vector뿐아니라 array등이 와도 처리를 할수가 있게 된다 

**주의점**  
span설정 한뒤 원본을 바꾸면 다른곳을 가리킨다  


span은 2가지 모드가 있다 dynamic과 static이 있는데 dynamic은 배열의 사이즈를 매번 확인하지만 static 버전을 사용해서 고정으로 바꾸면 최적화 할수있는것이다 --> 배열의 사이즈를 정해주면 static아니면 dynamic인것 같다  


```c++
//c++ 20 span 

void print_span(span<int> nums)

{
	for (auto& e : nums)
	{
		cout << e << endl;
	}

	auto ret = ranges::find(nums, 3);

	if (ret != nums.end())
	{
		cout << "found!!" << endl;
	}

	auto count = ranges::count(nums.begin(), nums.end(), 3);

	if (count != 0)
	{
		cout << "counted " << count << endl;
	}
	else
	{
		cout << "zero counted" << endl;
	}


}

int main()
{
	//c++ 20 span 여러가지 배열에 대해서 대응을 할수가 있다 

	vector<int> v_n{ 1,2,3 };
	array<int,8> a_n{ 3,3,3,3,3,4,5,6 };

	//c style array
	int c_n[9] = { 1,2,3,4,5,6,3,3,7 };

	//dynamic version
	const std::span<int> sp{ v_n };  //이후에 배열을 바꾸면 안된다 -- 주의점
	const std::span<int, 8> fixed_sp{ a_n };

	print_span(sp);
	print_span(fixed_sp); 
}
```


<br>



----------------------
