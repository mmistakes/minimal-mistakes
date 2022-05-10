---
layout: single
title: "파이썬 class, import (편집중) "
categories: study
toc: true
tag: [python, import]
---

# 예외-에러라고 부른다
>syntax 구문에러 READ와 EVALUATION 사이에서 발생하는 에러 개발자가 조금만 신경쓰면 막을수 있는 에러
	RUNTIME ERROR 실행중에 생기는 에러- running 과정에서 생기는 에러입니다.
	Exception이라는 상위 클래스를 상속받는다.


#### 클래스...
```python
class ClassName
		클래스 블록
클래스 외에 모든 변수, 함수명은 snake_case를 권장
```

#### 빈 클래스
```python
class person:
	pass
```

1. 객체는 변수의 확장된 형태이다.
2. 클래스도 객체다.
3. 클래스는 빈 블록을 허용하지 않는다. 파이썬이 너무나도 부지런하기 때문에
4. 객체안에 만들어진 함수는 메쏘드

<hr/>

# 객체 는 대상의 인스턴스이다.

### self?
1. 객체 자기자신


```python
class LeeGangJu:
	name:'LeeGangJu'
	gender:'male'

Alpha=LeeGangJu.gender
```
메소드는 셀프를 통해서 호출한 객체를 구분합니다.
```python
class Person:
	nation ='america'
	
	def method(self):
		print('함수와 같은 방식으로 동작합니다.')
		print('클래스 내에 정의가 되었을 뿐입니다.')
		
		
		
class _car:
	def _check(self):
		print('정기검사를 받으셔야합니다.') 
_mormning = _car() 
_mormning._check()
		```

#언더바는 파이썬에서 숨김기능이다. 
	변수명 앞에 _ 언더바 하나는 internal use only이다. 
    
	변수면 뒤에 언더바 하나는 파이썬의 기본키워드와 충돌을 방지할려고 쓴다.

메소드 이름앞에 더블언더바는 속성 충돌 방지를 위해쓰인다.

##### 클래스 내에 함수가 선언 될때에는 객체 사용유무와 관련없이 첫번째 인자로 
###### 무조건 self가 와야합니다. 

instance는 객체를 생성해서 기능덩어리 클래스를 담아둔다.~

객체와 관련없이 참조 가능한 변수(클래스 변수)

생성자: 객체가 생성될때 자동으로 호출되는 함수
	constructor: '__init__' == 객체초기화 매서드

#### 상속(inherit)
##### - 클래스 의 코드를 재사용하는데 굉장히 유용하다.

```python
class Party():
	def arguing(self):
		print("I'm rich girl")

class Jessie(Party):
	pass

issubclass(Jessie,Party)
#True

give_me_a_money=Party()
give_me_jessie=Jessie()
give_me_jessie.arguing()
#I'm rich girl

```
is - a 상속
	base - derived
	parent - child
	super - sub
	
	
has - a 관계





#### 메서드 오버라이드
	자식 클래스가 부모에게 받은 메서드가 자식매서드와 이름이 같을경우 자식클래스의 메서드만 적용된다.
	만약 자식 클래스에서 부모클래스에 있는 기능이 필요할 경우  super().(__init__함수)(name 인자) 의 형식으로 사용한다.
#### 파이썬의 상속순서
다중상속은 메서드 해석순서에 따라 달려있다.  mro()라는 매써드는 해당 클래스 객체에 대한 매서드 또는 속성을 찾는데 필요한 클래스의 리스트를 반환한다.

	1.객체자신
	2.객체의 클래스
	3.클래스의 첫번째 부모클래스
#### Getter/ Setter
  private 속성은 외부에서 바로 접근할수 없게 만들수 없다.
  프로퍼티를 사용하는것이 Getter/ Setter를 사용하는 방법인것이다.
 ```python
class Jack():
	def __init__(self,input_dummy):
		self.hidden_dummy = input_dummy
		
	def get_dummy(self):
		print('inside the getter')
		return self.hidden_dummy
	
	def set_dummy(self,input_dummy):
		print('inside the setter')

jang= Jack()
jang.get_dummy()
jang.set_dummy('pyiolo')
```



static method/ class method
```python
#static method
class name:
	count=100
	@staticmethod
	def plus(num):
		return num*10+ hello.count

print(hello.plus(100))
#결과 1100

#정적변수로 접근하는 것과 클래스로 접근하는 것의 차이는?


#class method
class name:
	count=100
	@classmethod
	def plus(cls,num):
		return num*10 + name.num
print(name.plus(100))

```

파이썬은 정적메소드임에도 불구하고 인스턴스에서도 접근이 가능하다.
인스턴스 메소드는 첫번째 인자로 self를 가진다.
클래스 메소드는 첫번째인자로 cls만 추가될 뿐이다.

이 두개념의 차이는 상속에서 차이가 난다.
static method는 클래스에서 다른 클래스 함수를 참조할때 다른클래스의 값을 참조하고,
class method는 클래스에서 다른 클래스 함수를 참조할때 자기클래스의 값을 참조한다. 


정적 메소드, 데코레이터를 통해서 구분함

getter,setter
```python
class Person:
   > def __init__(self):
        self.__age = 0
 
    def get_age(self):           # getter
        return self.__age
    
    def set_age(self, value):    # setter
        self.__age = value
 
james.set_age(20)
print(james.get_age())

#결과 20
```



맹글링 
 속성 변수의 이름을 변경하는 기능
 충돌을 방지하는 기능
 속성이름 앞에 언더스코어를 두번 붙여주면 됩니다.
 속성이름도 자동으로 바뀝니다
 
 
 다형성
 	클래스 내의 하나의 메소드가 여러개의 기능을 처리
	파이썬은 오버로딩이 되지 않습니다.
	연산자 오버로딩이라고 매직 메소드를 이용해서 눈속임
	오버라이딩
	메소드를 재정의
	메소드 뿐 아니라 속성도 오버라이딩
	부모에게 물려받은 메소드를 그대로 사용하지 않겠다는 의미
	자식 클래스에서 부모에게 있던 메소드를 고쳐쓰는 법
	상속이 되어야만 ...


find 함수 index 함수 차이

count 함수

문제를 잘읽자...
