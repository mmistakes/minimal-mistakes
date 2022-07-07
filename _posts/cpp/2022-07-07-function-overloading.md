

---

title : "[C++]함수 오버로딩"

categories:

- Cpp

tag :

- [Cpp, Programming]

toc: true

toc_sticky : true

published : true

date : 2022-07-07

last_modified_at : 2022-07-07

---



## [C++] 함수 오버로딩

함수의 다형(polymorphism)은 C++에 새로 추가된 기능이다. 디폴트 매개변수는 전달인자의 개수를 다르게 사용함으로써 같은 함수를 호출할 수 있게 하는 것인 반면에, 함수 오버로딩(function overloading)이라고도 부르는 함수의 다형은, 서로 다른 여러 개의 함수가 하나의 이름을 공유하는 것이다. 여기서 ‘다형’이라는 말은 다양한 형태를 가진다는 뜻으로 하나의 함수가 다양한 형태를 가지는 것이다. 이와 비슷하게, ‘함수 오버로딩’이라는 표현은 여러 개의 함수를 같은 이름으로 연결한다는 뜻이다. 즉, 이름을 오버로딩하는 것. 결론적으로 말하면 두 가지 표현은 같은 것이다. 함수 오버로딩은 본질적으로는 같은 일을 처리하지만, 전달인자 리스트가 서로 다른 여러 개의 함수를 하나의 이름으로 만들 수 있게 한다.

 함수 오버로딩의 핵심은 함수의 전달인자 리스트이다. 이것을 함수 시그니처(function signature)라고 한다. 만약에 두 함수가 같은 개수, 같은 데이터형의 전달인자를 가지고 있고, 전달인자의 순서까지 동일하다면, 두 함수의 시그니처는 같다. 이 때 변수의 이름은 달라도 상관없다. C++에서는 서로 다른 시그니처를 가지고 있는 함수들을 같은 이름으로 정의할 수있다.(이말이 즉 함수 오버로딩) 이 들 시그니처는 전달인자의 개수와 종류가 다르다. 예를 들어, print()함수의 계열을 아래와 같이 그 원형을 정의할 수 있다.

``` cpp
void print(const char* str, int width);		//#1
void print(double d, int width);			//#2
void print(long l, int width);				//#3
void print(int i, int width);				//#4
void print(const char *str);				//#5
```

사용자가 어떤 print()함수를 사용하면, 컴파일러가 그것과 동일한 시그니처를 가지고 있는 함수 원형을 찾아 준다.

```cpp
print(“Pancakes”, 15);				//#1 사용
print(“Syrup”);						//#5 사용
print(1999.0, 10);					//#2 사용
print(1999, 12);					//#4 사용
print(1999L, 15);					//#3 사용
```

예를 들면, `print(“Pancakes”, 15);`는 하나의 문자열 상수와 정수형 전달인자를 사용한다. 그래서 원형 #1에 대응한다. 오버로딩된 함수를 사용할 때에는, 함수 호출에서 올바른 데이터형의 전달인자를 사용하는지 확인해야 한다. 예를 들어, 다음과 같은 명령문을 생각해 보자.

`unsigned int year = 3210;`

`print(year, 6);				//모호한 함수 호출이다.`

print() 함수의 이러한 호출은 대응하는 원형이 없다. 대응하는 원형이 없을 경우에, C++는 표준적인 데이터형 변환을 시도하여 어떻게든 대응이 이루어지도록 노력하기 때문에, 여러 원형 중에서 어느 것이 사용될지 장담할 수 없다. 가령 print()함수의 원형이 #2밖에 없다면, `print(year, 6);`이라는 함수 호출은 year의 값을 double형으로 변환할 것이다. 그러나 앞에 제시한 예제 코드에는 첫 번째 전달인자가 수치형인 원형이 세 개나 존재한다. 이 때문에 year는 세 가지 데이터형으로 변환될 수 있다. 이처럼 상황이 모호하기 때문에, C++는 이러한 함수 호출을 에러로 간주하여 컴파일을 거부한다.



시그니처들은 서로 다른 것처럼 보이더라도 함께 공존할 수 없다. 예를 들어, 다음과 같은 두 원형을 생각해 보자.

`double cube(double x);`
`double cube(double &x);`

여기에서 함수 오버로딩을 사용할 수 있으리라고 잘못 생각할 수 있다. 왜냐하면 함수 시그니처가 서로 달라 보이기 때문이다. 그러나 모든 것을 컴파일러 입장에서 생각해야 한다. 다음과 같은 코드가 있다고 가정해 보자.

`std::cout<<cube(x);`

전달인자 x는 double x를 사용하는 원형이다 double &x를 사용하는 원형에 둘 다 일치한다. 컴파일러는 어느 함수를 사용해야 할지 알지 못한다. 그러므로 컴파일러는 함수 시그니처를 검사할 때 그러한 혼동을 피해기 위해, 어떤 데이터형에 대한 참조와 그 데이터형 자체를 같은 시그니처로 간주한다.

대응하는 함수를 찾는 과정에서 const와 const가 아닌 변수는 구별된다. 다음과 같은 원형들이 있다고 생각해보자.

```cpp
void dribble(char * bits);				//#1 오버로딩된다.
void dribble(const char * cbits);		//#2 오버로딩된다.
void dabble(char *bits);				//#3 오버로딩되지 않는다.
void drivel(const char * bits);			//#4 오버로딩되지 않는다.
```



다음은 여러 가지 함수 호출이 어떤 원형에 대응하는지를 보여 준다.

```cpp
const char p1[20] = “How’s the weather?”;
char p2[20] = “How’s business?”;

dribble(p1);		//#2 dribble(const char *);
dribble(p2);		//#1 dribble(char *);
dabble(p1);			//대응하는 원형이 없다.
dabble(p2);			//#3 dabble(char *);
drivel(p1);			//#4 drivel(char *);
drivel(p2);			//#4 drivel(char *);
```



dribble()함수는 두 가지 원형을 가진다. 하나는 const 포인터를 위한 원형이고, 다른 하나는 일반 포인터를 위한 원형이다. 컴파일러는 실제 전달인자가 const인지 아닌지 판단하여 둘 중에서 필요한 것을 선택한다. dabble() 함수는 const가 아닌 전달인자를 사용하는 호출에만 대응된다. drivel() 함수는 const전달인자를 사용하는 호출과 const가 아닌 전달인자를 사용하는 호출에 둘 다 대응한다. drivel()과 dabble()이 이렇게 다르게 작동하는 이유는 const변수에는 const 값과 const가 아닌 값을 둘 다 전할 수 있지만 채눗가 아닌 변수에는 const가 아닌 값만 전달할 수 있기 때문이다.

함수 오버로딩을 가능하게 하는 것은 함수의 데이터형이 아니라 시그내처라는 사실을 항상 명심해야한다. 예를 들어, 다음의 두 선언은 함께 공존할 수 없다.

```cpp
long Goo(int n, float m);			//같은 시그내처이므로
double Goo(int n, float m);			//공존할 수 없다.

/* 그러므로 C++는 이러한형태로 함수를 오버로딩하는 것을 허용하지 않는다. 
함수 시그내처가 다를 경우에만 다른 리턴형을 가질 수 있다. 
*/
long Goo(int n, float m);			//서로 다른 시그내처이므로
double Goo(float n, float m);		//공존할 수 있다.
```



### 함수 오버로딩 예제

```cpp
#include <iostream>
using namespace std;

unsigned long left(unsigned long num, unsigned ct);
char * left(const char *str, int n = 1);

void main()
{
	char * trip = "Hawaii!!"; //테스트값
	unsigned long n = 12345678; //테스트값
    int i ;
    char * temp;
    
    for(i = 1; i < 10; i++)
    {
        cout<<left(n, i)<<endl;
        temp = left(trip, i);
        cout<<temp<<endl;
        delete [] temp; //재사용을 위해 임시 기억 공간을 해제한다.
    }
}
 
//이 함수는 정수 num의 앞에서부터 ct개의 숫자를 리턴한다.
unsigned long left(unsigned long num, unsigned ct)
{
    unsigned digits = 1;
    unsigned long n = num;
    
    if(ct == 0 || num == 0)
        return 0; //숫자가 없으면 0을 리턴한다.
    
    while(n /= 10)
    	digits ++;

    if(digits > ct)
    {
    	ct = digits - ct;
        while(ct--)
        {
        	num /= 10;
        }
        return num; //남아 있는 ct개의 숫자를 리턴한다.
    }
    else
        return num; //'ct>=전체 숫자 개수' 이면 그정수 자체를 리턴한다.
}
//이 함수는 str 문자열의 앞에서부터 n개의 문자를 취하여
//새로운 문자열을 구성하고, 그것을 지시하는 포인터를 리턴한다.
char * left(const char * str, int n)
{
    if(n < 0) n = 0;
    char *p = new char[n+1];
    int i ;
    for(i = 0; i < n && str[i]; i++)
    {
    	p[i] = str[i]; //문자들을 복사한다.
    }
    while(i <= n)
	{
    	p[i++] = '\0'; //문자열의 나머지를 '\0'으로 설정한다.
    }
    return p;
}
```

```
💻출력💻
1
H
12
Ha
123
Haw
1234
Hawa
12345
Hawai
123456
Hawaii
1234567
Hawaii!
12345678
Hawaii!!
12345678
Hawaii!!
계속하려면 아무 키나 누르십시오...
```

함수 오버로딩이 매혹적인 것은 사실이지만 과용하면 안 된다. 함수 오버로딩은 서로 다른 데이터형을 대상으로 하지만 기본적으로는 같은 작업을 수행하는 함수들에만 사용하는 것이 바람직하다. 또한 독자는 디폴트 매개변수를 사용하여 같은 목적을 수행할 수 있는지 확인하는 것이 좋다. 예를 들어, 다음과 같은 두 개의 오버로딩된 함수를 디폴트 매개변수를 사용하는 left()라는 하나의 문자열 처리 함수로 대체할 수 있다.

`char *left(const char *str, unsigned n);   //두 개의 전달인자`

`char *left(const char *str);           //한 개의 전달인자`

디폴트 매개변수를 사용하는 하나의 함수를 사용하는 것이 더 간단하다. 함수를 단지 하나만 작성하면 되고, 프로그램도 하나의 함수를 저장하기 위한 메모리만 요구한다. 그리고 함수를 수정할 필요가 생겼을 때에도 하나의 함수만 수정하면 된다. 그러나 서로 다른 데이터형의 전달인자를 요구하고, 디폴트 매개변수가 소용이 없을 때에는 함수 오버로딩을 사용해야 한다.