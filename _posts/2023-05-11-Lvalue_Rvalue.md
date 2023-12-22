---
layout: single
title:  "c++ L value R value"
categories: [c++,R value,L value]
tag : [c++]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

### L value R value 

변수 처럼 다시 사용 할수있다면 -> L value
상수 처럼 한번만 사용가능하다면 -> R value  

L value는 인자를 reference &로 받고 R value는 &&로 인자를 받는다 



**주의 점** :  
void function(&& s)로 인자 받는 함수 있을때 &&S는 R value를 받겠다는 의미이자 s 자체가 R value는 아니다 왜냐하면 함수 인자로 받은 s를 function함수 내에서 다시 사용할수있기 때문이다 그래서 move같은 명령어로 R value로 바꿔 줘야지 zero copy만들수있다  



**주의점2** :  



```c++

void func(const string &s)
{
	string b = move(s)
	
};

int main()
{
	string a = "ABC";
	func(a);

}

```

const 없는 상황에서 하면 resource ownership이 b에게 넘어가고 원래 변수는 ownership을 잃어 버린다.  
하지만 const를 붙히게 되면 래퍼런스로 넘기는 값이 변하면 안되니까 a변수도 그대로 ABC가지고 b변수도 그대로 ABC가지게 된다.   
move를 사용했는데 어떻게 이런 결과 나올수있냐면 const를 사용했을때 move사용하면 이때는 copy를 하기 때문이다.  



L,R Value를 인자로 받을수있는 함수를 만들려고 한다 인자를 reference로 받으면 R,L value모두 받을수있다 R value일때는 0copy이다 (물론 함수 안에서 인자로 받은 인자를 move를 통해 처리 했다) 하지만 L value가 인자로 왔을때는 move로 처리 하기 때문에 소유권이 없어지는 문제가 발생한다 그러면 &&로 인자를 받으면 어떻게 되나 이때는 L Value를 인자로 넘기지 못하는 문제가 발생한다 그러면 L,R 모두 인자로 받으면서 L value는 1copy, R value일때는 0copy로 만들려면 어떻게 해야할까?   

A : call by value로 인자를 받는것이다. (이러면 L,R value모두 인자로 받을수있다) 
L value일때는 copy by value로 인자가 copy가 되었기 때문에 그 소유권을 move를 통해 인자 변수의 소유권 넘기면 결국엔 인자에서 1copy가 된걸로 마무리가 된다 기존 L value 소유권도 박탈 되지 않으면서 지역변수에 전달 가능 하다. 그리고 R value일때를 보면 이때가 어떻게 0copy가 될수있냐면 **copy elision**이라는 최적화 기법이 작동이 되기 때문이다 copy elision은 인자로 R value가 오면 copy를 생략하게 된다 그래서 call by value인 상황에서도 0copy를 유지 할수가 있는것이다.  



```c++
void func(string s)
{
	string b = move(s)
	
};

int main()
{
	// L-value
	string a = "ABC";
	func(a);
	
	//R value
	func("ABC")

}
```



### RVO (return value optimize)

**copy elision**의 종류중에 하나이다.   
  
https://en.cppreference.com/w/cpp/language/copy_elision  

R value를 return 할때 move를 사용해서 return 할 필요가 없다 대부분의 경우 RVO가 작동이 되고 개입이 안되는 경우에도 일반적으로 0copy가 발생한다 --자세한 이유는 모르겠다.   
결론은 return할때 move 사용해서 return 할 필요 없다.  


