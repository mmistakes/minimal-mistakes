---
layout: single
title:  "multi thread Synchronize with c++"
categories: [Operating System,multi thread,process,synchronize,semaphore,mutex,critical section,c++,C++,Lock]
tag : [Operating System,OS,process,synchronize,Mutex,Critical Section,Critical Section Problem,Semaphore,c++,lock]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---



### 시작하며 

멀티 스레드 챕터 시리즈 이어나가고 있습니다. 이번 포스팅에서는 지난 포스팅에서 문제가 되었던 data race관련 문제에 관한 이야기 입니다. 
동기화에 대한 내용을 코드와 함께 정리 하는 포스팅입니다. 

또한 OS 부분에서 프로세스/ 스레드 동기화 대한 내용 포스팅 한적 있는데 먼저 보고 오시면 이해하는데 더 도움이 될것 같습니다. 

그래서 개념에 대한 이야기 보다는 어떻게 코드로 구현이 되는지에 초점을 두고 진행하겠습니다. 



-------------



## <span style='background-color: #F7DDBE'>Mutex</span>



lock , unlock 개념 #include mutex 해야 사용 할수 있다 



mutex로 보호하는 critical section은 최소화가 되어야 의미가 있다 만약 공유 되는 자원이 많아지면 즉 critical section 커지면 하나의 스레드만 계속 사용되기 때문에 비효율적이 된다  즉 핵심은 최소화 해야한다. 



**그리고 흔히 mutex에서 착각하는게 있는데 lock을 얻지 못해 block상태에 갔다고 해서 먼저 온 스레드가 lock을 먼저 획득한다는 보장은 없다** 

스케쥴링 방식 ,OS 구현 방식에 따라 달라진다 



```c++
/*
mutex 관련 코드 

임계구역은 최대한 적게 해야한다 
lock을 했을때 성능이 어느 정도 나오는지 검사하는 코드 

*/

#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
#include <chrono>

using namespace std;
using namespace std::chrono;

const int MAX_THREAD = 64;

volatile int sum;	//compile 최적화 하지 말아라 

mutex ml; 
void thread_func()
{
	
	//10만번 까지 더하기 
	for (int i = 0; i < 100000; i++)
	{
		
		ml.lock();
		sum++;			//critical section 
		ml.unlock();	


	}
}

int main()
{
	vector<thread> threads;

	for (int i = 1; i <= MAX_THREAD; i *= 2)
	{
		sum = 0;
		threads.clear();
		
		auto start = high_resolution_clock::now();

		for (auto j = 0; j < i; j++)
		{
			threads.emplace_back(thread(thread_func));
			
		}

		for (auto& tmp : threads)
		{
			tmp.join();
		}

		auto duration = high_resolution_clock::now() - start;

		cout << i << " threads" << " sum = " << sum;
		cout << " Duration = " << duration_cast<milliseconds>(duration).count() << " milliseonds\n";
	}
	return 0;
}
```



![화면 캡처 2022-07-21 201055](C:\github_blog\sullivan.github.io\images\2022-07-21-multi_thread_syn\화면 캡처 2022-07-21 201055.png)



위의 코드는 lock을 이용해서 성능을 체크 해보는 코드 이다. 결과를 보면 성능이 느려졌다. 

왜냐하면 lock은 오버헤드이기 때문에 부하가 발생한다.





<span style='background-color: #ffdce0'>**lock의 개수를 최소화하고 lock으로 보호받는 구간인 cs를 최소화 해야한다. **</span>

```c++
/*
mutex 관련 코드 

임계구역은 최대한 적게 해야한다 
lock을 했을때 성능이 어느 정도 나오는지 검사하는 코드 

*/

#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
#include <chrono>

using namespace std;
using namespace std::chrono;

const int MAX_THREAD = 64;

volatile int sum;	//compile 최적화 하지 말아라 

mutex ml; 
void thread_func()
{
	volatile int localSum = 0;

	
	//백만번 까지 더하기 
	for (int i = 0; i < 10000000; i++)
	{
		localSum++;
	}
    
    
    
	ml.lock();
	sum = localSum;		//cs영역
	ml.unlock();

}

int main()
{
	vector<thread> threads;

	for (int i = 1; i <= MAX_THREAD; i *= 2)
	{
		sum = 0;
		threads.clear();
		
		auto start = high_resolution_clock::now();

		for (auto j = 0; j < i; j++)
		{
			threads.emplace_back(thread(thread_func));
			
		}

		for (auto& tmp : threads)
		{
			tmp.join();
		}

		auto duration = high_resolution_clock::now() - start;

		cout << i << " threads" << " sum = " << sum;
		cout << " Duration = " << duration_cast<milliseconds>(duration).count() << " milliseonds\n";
	}
	return 0;
}
```



![화면 캡처 2022-07-21 203944](C:\github_blog\sullivan.github.io\images\2022-07-21-multi_thread_syn\화면 캡처 2022-07-21 203944.png)



10만에서 100만으로 늘렸는데도 성능이 더 좋아진 것을 알수있다





mutex는 copy와 move가 안된다. lock과 unlock은 mutex의 개념과 똑같이 구현되어있어서 위의 코드로 생략한다 



---------



### lock_guard

사용 할때 lock과 unlock을 사용하면 예외가 발생하여 비정상적으로 종료 되었거나 아니면 문제가 생겼을때 unlock이 되지 않아 문제가 발생할수있다. 그래서 lock_guard를 사용하는게 더 안정적이다. lock_guard를 사용하면 아래 오는 코드는 자동으로 Critical section으로 인식 되고 scope가 끝나면 자동으로 unlock을 호출한다 -> scope단위로 unlock해주므로 더 안전하다 하자만 사용하는데 제한적이다. 



```c++
 const std::lock_guard<std::mutex> lock(g_i_mutex);
```



-----------



### unique_lock 

lock_guard와 같은 기능을 하지만 더 많은 기능을 제공한다 move도 가능하고 여러 메서드 사용 가능하다 

move가 가능하다는것은 mutex lock을 resuorece로 관리 할수있다는 의미이다. 안전하게 관리 할수있다 

lock_guard가 제한이 있지만 가볍고 간단한 설계 가능하다. 만약 lock 기능이 더 필요할때 사용하면 될것 같다 



-----------



### scoped_lock 

여러개의 mutex lock을 사용하다가 순서가 맞지 않으면 deadlock에 쉽게 빠지게 된다. deadlock을 피하기위해서는 동기화를 해주어야하는데 scpoped_lock을 사용하면 순서를 맞추어주어서 deadlock을 회피 할수있다. 

동작 범위는 lock_guard와 마찬가지로 scope단위이다 



```c++
/*
	scoped_lock 관련 예제 코드
	노코프 유튜브 내용속 코드 입니다. 

	cppreference scpod_lock 예제 코드도 참고 하시면 좋을것 같아요 

	

*/

#include <iostream>
#include <mutex>
#include <chrono>
#include <thread>

using namespace std;

mutex mtxA, mtxB;	//mutex 2개 생성 

void a_to_b()
{
	const scoped_lock lck(mtxA, mtxB);
	
	this_thread::sleep_for(chrono::seconds(1));
}
void b_to_a()
{
	const scoped_lock lck(mtxA, mtxB);

	this_thread::sleep_for(chrono::seconds(1));
}
int main()
{
	thread t1(a_to_b);
	thread t2(b_to_a);

	t1.join();
	t2.join();

	cout << "bye" << endl;
}
```



실행 결과 bye의 결과가 나오는것을 알수있습니다. 



--------------------



### shared_mutex 

여러개의 mutex가 critical section에 들어갈수있는 구조 들어간 mutex가 다 빠져 나오면 lock반납한다 



두가지 접근 단계가 있다. 



- shared
- exclusive



shared_mutex가 필요한 이유는 read/write할때 필요하다. 

write작업은 하나의 스레드만 임계구역 들어가서 작동되어야한다 --exculsive

하지만 read같은 경우는 shared되어도 문제 없다 어차피 read only file이니까 그러니 shared_mutex 사용하면 여러개의 스레드가 동시에 critical section에 진입 하여 read 작업을 할수있다 





--------------------------------------



### 필요하면 찾아볼것들 

* call_once
  * call_once와 flag를 사용하면 여러 스레드 환경에서도 라도 함수가 한번만 실행된다 



-------



### scoped static init

static같은 경우 stack 부분에서 static 영역에 따로 메모리 있다 그래서 여러 스레드가 접근해도 한번만 초기화 된다 

singleton은 디자인패턴에서 나오는 부분인데 프로세스 전체에서 오직 하나의 object만 생성할수있는 패턴을 의미한다 

scoped static을 활용한다면 한번만 초기화 시킬려고 mutex나 call_once 사용 안해도 된다 



-------



### condition variable



프로세스/스레드 동기화 내용에 대한 포스터 내용을 보고 오면 더 쉽게 이해할수있습니다.



- cpp에서는 <condition_variable>을 include해주고 사용해야한다 

- wait는 lock release 시키고 block한다  인자로는 unique_lock을 받는다 

  - template< class Predicate >
    void wait( [std::unique_lock](http://en.cppreference.com/w/cpp/thread/unique_lock)<[std::mutex](http://en.cppreference.com/w/cpp/thread/mutex)>& lock, Predicate stop_waiting );

  - ```c++
    while (!stop_waiting()) {
        wait(lock);
    }
    ```

  - 두번째 인자는 stop_waiting이 true일때만 빠져 나올수있는 옵션이다. 

    

- notify_one은 waiting queue에 있는 thread 하나만 wake up 하는것이다 signal과 같은 개념 

- notify_all은 broadcast같은 개념이다. waiting queue에 있는 스레드 모두를 wake up 한다 



```c++
/*
condition varable 관련 예제 코드이다 

wait(unique_lock,predict) -> cppreference condition varable wait 부분 보기 

readyFlag는 shard variable로써 condition_variable의 동기화를 위해 넣어줌 

모니터 생산자 소비자 문제에서 서로 순서(동기화)위해 공유 자원 버퍼가 비어있는지 채워져있는지로 조건을 확인했잖아 
그것과 같은 맥락이라고 보면 될것같다 

*/

#include <iostream>
#include <thread>
#include <condition_variable>
#include <mutex>

using namespace std;

bool readFlag = false;
mutex mtx;
condition_variable cv;

void waitFn()
{
	cout << "wait"<<'\n';
	unique_lock<mutex> lck(mtx);
	
	cv.wait(lck, [] {return readFlag; });

	//critical section 
	lck.unlock();

	cout << "re run " << '\n';

}
void signalFn()
{
	cout << "signal" << '\n';
	unique_lock<mutex> lck(mtx);
	readFlag = true;
	lck.unlock();
	cv.notify_one();
}
int main()
{
	thread waitT(waitFn);
	thread signalT(signalFn);

	waitT.join();
	signalT.join();

	return 0;
}
```





-------------



### producer consumer problem 



buffer가 string vector stack구조라는거 빼면 나머지는 비슷하게 진행한다 



```c++
/*producer consumer problem

*/
#include <iostream>
#include <vector>
#include <thread>
#include <mutex>
#include <condition_variable>
using namespace std;

class strStack
{
	mutex mMtx;
	vector<string> mstr;
	condition_variable mcv;

public:

	//producer
	void addStr(string s)
	{
		//제한된 buffer가 아니라 vector니까 따로 Full condition 확인할 필요는 없다 
		{
			lock_guard<mutex> lck(mMtx);
			mstr.emplace_back(move(s));
		}
		mcv.notify_one();
		

	}

	//consumer 
	string getStr()
	{
		unique_lock<mutex> lck(mMtx);

		while (mstr.empty())
		{
			mcv.wait(lck);
		}
		string s = move(mstr.back());
		mstr.pop_back();
		lck.unlock();
		return s;
	}

};

int main()
{
	strStack str_stack;
	
	thread t1([&]() {str_stack.addStr("meangsungjoo"); });
	thread t2([&]() {str_stack.addStr("Have a GoodDay!!!"); });
	thread t3([&]() {cout<<str_stack.getStr()<<endl; });
	thread t4([&]() {cout<<str_stack.getStr()<<endl; });

	t1.join();
	t2.join();
	t3.join();
	t4.join();

	return 0;

}
```









___________



### semaphore



OS에서 다루었던 개념과 같다.

counting semaphore는 constructor에서 초기화된  초기 counter 가지고 있다. acquir하면 count--하고 release하면 count++한다 

counter가 0라면 acqurie는 block 한다  acqurie 종류는 여러개가지가 있는데 block하지 않는 옵션도 있고 couter 증가 하거나 timeout 될때까지 block 하는 옵션도 있다. 



shared resource가 있다면 mutex로 보호를 해야한다 



```c++
/*
counting_semaphore 간단 사용 예제

signal과 wait 순서에 따라 결과가 달라질수있다. 

*/

#include <iostream>
#include <thread>
#include <semaphore>

using namespace std;

counting_semaphore<10> sp(0);	//counting semaphore를 10으로 설정하고 초기값을 0으로 초기화하는 예제 

void waitFn()
{
	cout << "waiting" << '\n';
	sp.acquire();
	cout << "rerun" << '\n';
}
void signalFn()
{
	cout << "signal" << '\n';
	sp.release();
}
int main()
{
	thread waitT(waitFn);
	thread signalT(signalFn);

	waitT.join();
	signalT.join();

	return 0;
}
```



-----------------



### latch

세마포어랑 비슷한데 count_down밖에 없다 



스레드를 동기화 하기 위한 **downward couter**이다. counter 값은 생성 될때 정해지고 counter가 0이 될때까지 스레드들은 block 상태에 있다.  counter를 reset하고 증가 시키는 방법은 없다 

메서드에는 count_down()이 있다 latch의 counter--한다. wait()는 counter가 0이 아니면 block 0이라면 block  시키지 않고 진행한다 

**count_down과 wait를 같이 쓰는 메서드 arrive_and_wait 메서드가 있다. **



주의 할점은 counter를 reset 할 수 없기 때문에 count_down을 초기값보다 많이해서 음수가된 상황에서 wait하면 block이 되는데 block을 풀 방법이 없다 



```c++
#include <iostream>
#include <chrono>
#include <latch>
#include <vector>
#include <thread>

using namespace std;

std::latch lt{3};

void fn()
{
	cout << "decrease counter" << '\n';
	cout << "wait" << '\n';
	
	lt.arrive_and_wait();		//count_down() && wait()

	cout << "re run" << '\n';

}

int main()
{
	vector<thread> threads;

	//초기화한 latch couter만큼 반복해야한다 
	for (int i = 0; i < 3; i++)
	{
		this_thread::sleep_for(500ms);
		threads.emplace_back(thread(fn));
	}

	for (auto& thread : threads)
	{
		thread.join();
	}

	return 0;
}
```





-----------------------



### barrier 



latch와 비슷하다 여러 스레드가 차단 되었다가 어떠한 조건이 만족 되었을때 스레드가 진행한다 

latch와 다르게 내부 counter가 reset이 되기 때문에 재사용이 가능하다 

counter==0이 될때 동기화 되는 방식이 latch와 같은 맥락이다. 



barrier 역시 arrive, wait 지원하고 둘다 지원하는 arrive_and_wait()도 지원한다 



스레드를 만들고 실행 하면 정해진 순서가 아니라 랜덤 순서로 스레드가 실행이 되는데 bariier를 사용하면 여러 스레드가 초기 설정한 barrier couter 만큼의 스레드가 도착할때까지 block 시켰다가 couter가 0이 되면 다시 reset하여 동기화(순서) 맞춘다 이때 couter가 0이 되고 다시 reset되는 단계를 **phase completion**이라고 한다  



```c++
#include <iostream>
#include <barrier>
#include <thread>
#include <vector>

using namespace std;

auto on_completion = []() noexcept {
	cout << " phase completion" << endl;
};

//barrier 초기값 설정 및 phase completion 할때 작동하는 completionFunction도 인자로 넘겨 주었다 
std::barrier bar{ 3,on_completion };

void fn()
{
	cout << "1" << flush;
	bar.arrive_and_wait();

	cout << "2" << flush;
	bar.arrive_and_wait();

	cout << "3" << flush;

}
int main()
{
	vector<thread> threads;
	for (int i = 0; i < 3; i++)
	{
		threads.emplace_back(thread(fn));
	}

	for (auto& thread : threads)
	{
		thread.join();

	}
	return 0;
}
```





______________



### 마무리 

이번 포스팅에서는 동기화에 관련 내용을 c++ 코드와 함께 알아보는 시간이었습니다. 다음 포스팅에서는 비동기 관련 포스팅으로 진행하겠습니다. 







