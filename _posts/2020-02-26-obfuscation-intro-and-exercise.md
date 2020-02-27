---
title: "[난독화]코드 난독화 개요와 간단한 적용"
date: 2020-02-26 22:31:00 -0400
categories: obfuscation,codeobfuscation
---

## 난독화란?

바이너리 코드를 분석하여 유용한 정보를 뽑아내는 작업을 **역공학**(reverse engineering)라고 부른다. 하지만 역공학이 악의적으로 사용된다면 각종 보안 프로그램 등이 공격받게 될 수 있어 문제가 된다.  이에 대응하기 위해서 바이너리를 분석하기 어렵도록 복잡하게 만드는데, 이것이 **코드 난독화**이다.

코드 난독화는 프로그램을 변화하는 방법의 일종으로, 코드를 읽기 어렵게 만들어 역공학을 통한 공격을 막는 기술을 의미한다. 난독화는 난독화의 대상에 따라 크게 
 1. 소스 코드 난독화
2. 바이너리 난독화

로 나눌 수 있다. 소스 코드 난독화는 C/C++/자바 등의 프로그램의 소스 코드를 알아보기 힘든 형태로 바꾸는 기술이고, 바이너리 난독화는 컴파일 후에 생성된 바이너리를 역공학을 통해 분석하기 힘들게 변조하는 기술이다.

## 난독화 방법 - 바이너리 난독화

1. **개별 난독화 기법**

	바이너리 코드에서 변수를 할당하는 코드를 난독화, 분기문에서 명령의 순서를 바꾸어 난독화, 가짜 코드를 주입하여 난독화 하는 등의 난독화 기법이다. 
	
2. **역어셈블 방지를 위한 난독화**

	대표적으로 포인터를 사용한 간접 분기나 간접 메모리 접근등을 넣는 방법이나, 의미 있는 명령이 서로 겹치도록 해서 명령의 구문 분석에 모호성을 증가시키는 경우이다.
	
3. **함수 호출 관련 난독화**

	함수호출 그래프는 프로그램을 분석하는 데에 필요한 기본적인 자료 구조 중 하나이
나 난독화를 통해 함수호출이 식별되지 못하게 될 수 있다. 예를 들어 역어셈블을 어
렵게 하기 위해 사용되는 앞서 언급한 방법들을 호출 명령에 사용하는 방법, 함수 호
출 대신 분기명령을 사용하는 방법으로 호출을 은닉하는 방법, 함수 주소를 레지스터
나 메모리에 넣고 (다중) 간접 호출하는 방법, IAT(Import Address Table)을 은닉하
는 방법 등이 사용될 수 있다. 또한 함수 호출 명령을 일반 분기와 같은 용도로 사용
하여 호출 명령 수행 후 복귀하지 않는 경우도 있다.

4. **가상화 난독화**

가상화 난독화는 제어흐름을 왜곡시키는 대표적인 방법 중 하나로 정상적인 제어흐
름상의 각 명령을 가상 명령으로 바꾸고, 가상기계를 삽입하여 이를 실행하도록 하는
것을 말한다.

## 난독화 방법 - 소스 코드 난독화 -(추가 )



난독화 되어 있는 프로그램은 Dynamic Symbolic Execution(DSE)을 통해 효과적으로 역난독화 할 수 있다. 최신 난독화 기술들도 DSE에는 별 효력이 없다-Runtime overhead와 code size가 큰 Nested virtualization만 효력이 있음.



## 소스 코드 레벨에서 난독화한 예제 - miniC의 확장

난독화 전
{% highlight C %}
int sum(int a, int b) {
    return a+b;
}

int sub(int a, int b) {
    return sum(a, -b);
}
void main() {
    int a = 3;
    int b = 5;
    int c = 0;
    _print(sum(a,b));
    _print(sub(a,b));
    _print(sub(sum(a,b),2));
}
{% endhighlight %}

난독화 후

{% highlight C %}
int sum(int a, int b)
{
    int temp_a = 0;
    int temp_b = 0;
    for (int i = 0; i < a; i++)
	temp_a++;
    for (int i = 0; i < b; i++)
	temp_b++;
    if (0) { 
	temp_a + temp_b = 0;
    }
    return temp_a + temp_b;
}

int sub(int a, int b)
{
    int temp_a = 0;
    int temp_b = 0;
    for (int i = 0; i < a; i++)
	temp_a++;
    for (int i = 0; i < b; i++)
	temp_b++;
    if (0) { 
        sum(temp_a, -temp_b) = 0;
    }
    return sum(temp_a, -temp_b);
}

void main()
{
    int a = 3;
    int b = 5;
    int c = 0;
    _print(sum(a, b));
    _print(sub(a, b));
    _print(sub(sum(a, b), 2));
}
{% endhighlight %}

새로운 난독화 기법을 제시하는 논문(참고)을 참고하여 for loop를 이용한 난독화를 구현해보았다. 변수의 이용을 숨기기 위해서 새로운 변수를 사용하는데, 새로운 변수에 직접 값을 할당하는게 아니라 for loop을 이용하여 1씩 증가시켜서 값을 만드는 아이디어이다.

compiler수업에서 구현한 miniC pretty printer를 확장하였다. 구현하려고보니 어떤 변수를 숨겨야 할 지 모호하여 일단은 함수의 매개변수에 대하여 난독화 기법을 적용하였다. 먼저 기존의 miniC 코드에서 변수를 저장할 자료구조를 추가하였다. 그리고 난독화할 매개변수 정보와 새로운 변수의 정보를 담을 자료구조를 추가하였다. 함수에 매개변수가 존재한다면 새로운 변수의 이름을 `temp_매개변수명` 으로, 값을 0으로 하여 새로운 변수를 할당해둔다. 그리고 한 statement에서 변수 선언이 끝나면 ~(C99 이전 버전에서는 변수 선언이 중간에 올 수 없다고 알고 있다...! 사실 잘 모르겠다.)~ 기존의 변수만큼의 값을 갖도록 for loop을 실행한다. 후에 기존의 매개변수를 호출하면 새롭게 선언한 `temp_매개변수명`를 호출하게 되도록 작성하였다.


*참고 : How to Kill Symbolic Deobfuscation for Free (or: Unleashing the Potential of Path-oriented Protections)
Mathilde Ollivier, Sebastien Bardin, Richard Bonichon, Jean-Yves Marion.Annual Computer Security Applications Conference(ACSAC ’19)*

## 소스 코드 레벨에서 난독화한 예제 - miniC의 확장 - 아쉬운 점/발전방향

