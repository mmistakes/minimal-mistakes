---
layout: single
title:  "advance type 정리 "
categories: [c++,floating, Union,variant,pair, tuple,
type punning,optional]
tag : [c++]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---


### 부동소수점 정리  


-380000=-3.8*10^4 등등 이런 부동 소수 특징은   

IEEE 754   
32bit 기준  


1. 부호 1bit  
2. 유효 숫자 8bit  
3. 2의 몇제곱(exponantion) 23bit  





```c++

#include <iostream>
using namespace std;

int main()
{
	const float num1 = 0.3f;	//0.30000000119
	const float num2 = 0.4f;	//0.40000000596
	
	const float result = num1 + num2;	//0.70000001xx


	//0.7f == 0.69999998
	if(result == 0.7f)
	{
		cout << "sum is correct" << endl;
	}
	else
	{
		cout << "sum is not correct" << endl;
	}
	return 0;
}
```


sum is not correct나오는 이유 :2진법 floating 표현이 가지는 한계 때문이다 무슨말이냐면 0.3이 진짜 0.3이 아니라 최대한 근사한 값으로 
0.3을 표현 하기 때문에 발생하는 문제라는 것이다 
실제로 result에는 0.70000046이런식으로 계산이 되어있었다 



**해결 방법**    

차이가 거의 없다면 똑같다고 판단하는 함수를 만들면 된다 
이때 인자로 들어오는 값에 비례해서 차이를 계산 해주어야 한다는 점이다 

**epsilon**   
차이를 계산해준다 

```c++
#include <iostream>
#include <algorithm>

using namespace std;

//cpperference eplsilon
//ulp는 또다른 scale 값이다 
template<class T>
typename std::enable_if<!std::numeric_limits<T>::is_integer, bool>::type
almost_equal(T x, T y, int ulp)
{
	// the machine epsilon has to be scaled to the magnitude of the values used
	// and multiplied by the desired precision in ULPs (units in the last place)
	return std::fabs(x - y) <= std::numeric_limits<T>::epsilon() * std::fabs(x + y) * ulp
		// unless the result is subnormal
		|| std::fabs(x - y) < std::numeric_limits<T>::min();
}


int main()
{
	const float num1 = 0.3f;	//0.30000000119
	const float num2 = 0.4f;	//0.40000000596
	
	const float result = num1 + num2;	//0.70000001xx


	//0.7f == 0.69999998
	if(almost_equal(0.7f,result,1))
	{
		cout << "sum is correct" << endl;
	}
	else
	{
		cout << "sum is not correct" << endl;
	}
	return 0;
}
```


그래서 중요한 통찰은 float나 doble 값을 사용할때는 equal,< ,>!=... 비교하는 연산자는 사용하면 안된다!!! 


또하나 조심해야 하는건 float,doble 두변수의 합이나 차가 클때 계산 결과값 달라진다 


________

### pair,tuple   


tuple은 get<idx>()을 통해 접근 한다    
https://en.cppreference.com/w/cpp/utility/tuple



```c++
#include <iostream>
#include <stdexcept>
#include <string>
#include <tuple>
using namespace std;

std::tuple<double, char, std::string> get_student(int id)
{
    switch (id)
    {
    case 0: return { 3.8, 'A', "Lisa Simpson" };
    case 1: return { 2.9, 'C', "Milhouse Van Houten" };
    case 2: return { 1.7, 'D', "Ralph Wiggum" };
    case 3: return { 0.6, 'F', "Bart Simpson" };
    }

    throw std::invalid_argument("id");
}

int main()
{
    pair<int, std::string> numstr = { 1,"meang" };
    cout << numstr.first << " " << numstr.second << endl;
    
    cout << "---------------------------------------------\n";

    const auto student0 = get_student(0);
    std::cout << "ID: 0, "
        << "GPA: " << std::get<0>(student0) << ", "
        << "grade: " << std::get<1>(student0) << ", "
        << "name: " << std::get<2>(student0) << '\n';

    const auto student1 = get_student(1);
    std::cout << "ID: 1, "
        << "GPA: " << std::get<double>(student1) << ", "
        << "grade: " << std::get<char>(student1) << ", "
        << "name: " << std::get<std::string>(student1) << '\n';

    double gpa2;
    char grade2;
    std::string name2;
    std::tie(gpa2, grade2, name2) = get_student(2);
    std::cout << "ID: 2, "
        << "GPA: " << gpa2 << ", "
        << "grade: " << grade2 << ", "
        << "name: " << name2 << '\n';

    C++17 structured binding:
    const auto [gpa3, grade3, name3] = get_student(3);
    std::cout << "ID: 3, "
       << "GPA: " << gpa3 << ", "
       << "grade: " << grade3 << ", "
       << "name: " << name3 << '\n';

    return 0;
}
```


### 업데이트 해야하는 내용들  

1. c++ optional : 값이 있을수도 있고 없을수도 있는 그런 개념이다 - 필요할때 다시 보면 될것 같다 
그러나 optional은 성능에 중요한 영향을 주진 않는다      



2. Union type   
> 메모리 공간을 공유 함으로써 메모리 saving하는 목적이다  



3. std::variant  c++17    
union type의 단점을 보완 한거다   

variant<int,dobule,float> v;   

여러가지 타입을 다룰수 있다   



4. type punning 

업데이트 할 예정 


