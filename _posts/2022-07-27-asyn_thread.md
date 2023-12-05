---
layout: single
title:  "multi thread Asynchronize with c++"
categories: [Operating System,multi thread,process,asynchronize,critical section,c++,C++,future,promise]
tag : [Operating System,OS,process,Asynchronize,Critical Section,c++,future,promise]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---



### 시작하며 

task 기반의 비동기 처리에 관한 포스트 입니다.  

여러 작업들을 독립적으로 실행하도록 개발 하는것이 비동기 프로그래밍이다. 순서 상관없이 독립적으로 동시에 실행된다 

-------



## <span style='background-color: #F7DDBE'>Promise</span>



* Header : include future



future와 promise는 한쌍의 community channel이다 

생성자 소비자 문제처럼 promise를 생성자 , future를 소비자의 역할로 생각 해도 된다 



**간단한 구조 ** 



> future와 promise 관계에는 conditional variable, mutex, shared memory에 관한 내용이 전부 들어 있다
>
> promise에서 set_value넣기 전까지 future는 get()을 통해 계속 wait 한다 
>
> promise가 set_value할때까지 wait하는게 아니라 그 시간동안 다른일 하도록 설정 할수 있다 future에 wait_for()를 통해 설정 시간마다 ready 상태인지 확인 할수있다. 



위의 구조 때문에 (heap에서 communication channel 만듬) 성능면에서는 좋지 않다 



* constructor
  * promise<int> prom 



- promise 객체는 자신이 가지고 있는 future객체에 값을 넣어준다 이때 promise가 가지고 있는 future을 얻는 함수가 **get_future()**이다 

  

- future에 넣는것은 set_value(data)로 한다

  

- copy안된다 move로 해야한다 

- set_except통해 예외 전달 가능 

  

---



## <span style='background-color: #F7DDBE'>future</span>



async의 결과를 접근하기 위한 class template이다 



* **get()**함수를 통해 promise가 set_value한 data 얻을수있다 이때 wait() 기능도 들어가있으므로 get()만 써도 된다 
* 단 두번 연속 호출하면 안된다 get을 하면 future 내에 전달 받은 객체가 이동되기 때문이다 
* future에 예외도 전달할수있다 



```c++
/*
* Async
* 
promis future 
*/

#include <iostream>
#include <future>
#include <thread>

using namespace std;

void fn(promise<int> prom)
{
	std::this_thread::sleep_for(2s);
	prom.set_value(42);
}
int main()
{
	promise<int> prom;
	future<int> fut = prom.get_future();

	thread t(fn, std::move(prom));

	while (fut.wait_for(0.2s) != std::future_status::ready)
	{
		cout << "doing other work" << endl;

	}
	const int num = fut.get();

	cout << "num is " << num << endl;

	t.join();
	return 0;
}

```



결과 : 

doing other work
doing other work
doing other work
doing other work
doing other work
doing other work
doing other work
doing other work
doing other work
num is 42



-------------------------

**set_exception** 전달 예제 

예외처리에서 예외문제가 나오면 그 예외를 set_exception을 통해 promise가 전달한다 

* set_value와 같이 쓰면 안된다



```c++
/*

set_exception 예제 


*/
#include <iostream>
#include <future>
#include <thread>
#include <chrono>

using namespace std;

void fn(promise<int> prom)
{
	using namespace std::chrono_literals;
	this_thread::sleep_for(1s);

	try
	{
		throw std::runtime_error("Runtime Error");
	}
	catch (...)
	{

		prom.set_exception(current_exception());
		
	}


	
}
int main()
{
	promise<int> prom;
	future<int> fut = prom.get_future();

	thread t(fn, std::move(prom));
	
	try
	{
		const int num = fut.get();
		cout << "num is " << num << endl;
	}
	catch (exception& e)
	{
		cout << "Exception is " << e.what() << endl;
	}


	t.join();
	return 0;
}
```

-----------



## <span style='background-color: #F7DDBE'>shared_future</span>



future는 copy가 안되기 때문에 promise가 set한 value를 여러개의 future가 참고 하지 못한다 이런 상황에서 copy가능한 shared_future를 사용할수있다 

즉 copy가 필요할때 사용할수있다  



**shared_future는 ready only(shared data가 바뀌지 않는다) 거나 External synchronization(동기화 문제) 제공된 경우에 사용 되어야한다**

 

```c++
/*
shared_future

copyable

*/
#include<iostream>
#include <vector>
#include <thread>
#include <future>


using namespace std;

void fn(shared_future<int> fut)
{
	cout << "num " << fut.get() << endl;
}

int main()
{
	using namespace chrono_literals;

	promise<int> prms;
	shared_future<int> fut = prms.get_future();

	vector<jthread> threads;
	for (int i = 0; i < 5; i++)
	{
		threads.emplace_back(fn, fut);
	}
	this_thread::sleep_for(1s);

	prms.set_value(42);



	return 0;
}
```



---------------



## <span style='background-color: #F7DDBE'>async</span>







