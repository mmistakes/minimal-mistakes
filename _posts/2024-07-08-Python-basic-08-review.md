---
title: Python Object Oriented Programming(복습용)
date: 2024-07-08
categories: python-basic
---
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Python Object Oriented Programming</title>
    <style>
        /* 기존 CSS 스타일과 추가된 스타일 */
        input[type="text"] {
            width: 150px;
            border: 1px solid black;
        }
        .result {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Python Object Oriented Programming</h1>
    <ul>
        <li>만들어 놓은 코드를 재사용하고 싶다!</li>
    </ul>
    <h2>클래스와 객체</h2>
    <ul>
        <li>객체 지향 언어의 이해</li>
    </ul>
    <h3>예시로 생각해보기</h3>
    <blockquote>
        <p>수강신청 프로그램을 작성한다. 어떻게 해야할까?</p>
        <ol>
            <li><input type="text" data-answer="절차적" /> 프로그래밍
                <ul>
                    <li>수강신청이 시작부터 끝까지 순서대로 작성</li>
                </ul>
            </li>
            <li><input type="text" data-answer="객체 지향" /> 프로그래밍
                <ul>
                    <li>수강신청 관련 <strong>주체</strong>(교수, 학생, 관리자)의 <strong>행동</strong>(수강신청, 과목 입력)과 <strong>데이터</strong>(수강과목, 강의 과목)들을 중심으로 프로그램 작성 후 연결</li>
                </ul>
            </li>
        </ol>
    </blockquote>
    <h3>객체지향 프로그래밍 개요</h3>
    <ul>
        <li>Object-Oriented Programming, OOP</li>
        <li>객체 : 실생활에서 일종의 물건 <input type="text" data-answer="속성(Attribute)|속성|attribute" />와 <input type="text" data-answer="행동(Action)|행동|action" />을 가짐</li>
        <li>OOP는 이러한 객체 개념을 프로그램으로 표현</li>
        <li>속성은 <input type="text" data-answer="변수(variable)|변수|variable" />, 행동은 <input type="text" data-answer="함수(method)|메소드|method" />로 표현</li>
        <li><input type="text" data-answer="class" /> : 설계도</li>
        <li><input type="text" data-answer="instance" /> : 실제 구현체</li>
    </ul>
    <h3>축구 선수 정보를 Class로 구현하기</h3>
    <ol>
        <li>Attribute(속성) 추가는 <strong><input type="text" data-answer="init" /></strong>, self와 함께!
            <ul>
                <li><strong>init</strong>은 객체 초기화 예약 함수</li>
            </ul>
            <div class="language-python highlighter-rouge">
                <div class="highlight">
                    <pre class="highlight"><code>
class SoccerPlayer(object):

  def <input type="text" data-answer="__init__" />(self, name, position, back_number):
      self.name = name
      self.position = position
      self.back_number = back_number
                    </code></pre>
                </div>
            </div>
        </li>
    </ol>
    <blockquote>
        <p>파이썬에서 __의 의미
            <ul>
                <li>__는 특수한 예약 함수나 변수 그리고 함수명 변경(맨글링)으로 사용
                    ex) __main__, __add__, __str__, __eq__
                    class SoccerPlayer(object):
                </li>
            </ul>
        </p>
        <div class="language-python highlighter-rouge">
            <div class="highlight">
                <pre class="highlight"><code>
def <input type="text" data-answer="__str__" />(self):
    return "Hello, My name is %s. I play in %s in center" % (self.name, self.position)
jinhyun = Soccerplayer("Jinhyun", "MF", 10)
print(jinhyun)
                </code></pre>
            </div>
        </div>
    </blockquote>
    <ol>
        <li>method 구현하기
            <ul>
                <li>method(Action) 추가는 기존 함수와 같으나, 반드시 self를 추가해야만 class 함수로 인정됨</li>
            </ul>
            <div class="language-python highlighter-rouge">
                <div class="highlight">
                    <pre class="highlight"><code>
class SoccerPlayer(object):
    def change_back_number(<input type="text" data-answer="self, new_number" />):
        print("선수의 등번호를 변경합니다: From %d to %d"% (self.back_number, new_number))
        self.back_number = new_number
                    </code></pre>
                </div>
            </div>
        </li>
    </ol>
    <ol>
        <li>Object(instance) 사용하기
            <ul>
                <li>Object 이름 선언과 함께 초기값 입력 하기</li>
            </ul>
            <div class="language-python highlighter-rouge">
                <div class="highlight">
                    <pre class="highlight"><code>
jinhyun = SoccerPlayer("Junhyun", "MF", 10)
                    </code></pre>
                </div>
            </div>
        </li>
    </ol>
    <blockquote>
        <p>self : <strong>생성된 인스턴스 자신</strong>을 의미함</p>
    </blockquote>
    <h2>OOP Implementation Example</h2>
    <blockquote>
        <ol>
            <li>Note를 정리하는 프로그램</li>
            <li>사용자는 Note에 뭔가를 적을 수 있다.</li>
            <li>Note에는 Content가 있고, 내용을 제거할 수 있다.</li>
            <li>두 개의 노트북을 합쳐 하나로 만들 수 있다.</li>
            <li>Note는 Notebook에 삽입된다.</li>
            <li>Notebook은 Note가 삽입 될 때 페이지를 생성하며, 최고 300 페이지까지 저장 가능하다.</li>
            <li>300 페이지가 넘으면 더 이상 노트를 삽입하지 못한다.</li>
        </ol>
    </blockquote>
    <ul>
        <li>Notebook
            <ul>
                <li>method
                    <ul>
                        <li>add_note</li>
                        <li>remove_note</li>
                        <li>get_number_of_pages</li>
                    </ul>
                </li>
                <li>variable
                    <ul>
                        <li>title</li>
                        <li>page_number</li>
                        <li>notes</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>Note
            <ul>
                <li>method
                    <ul>
                        <li>write_content</li>
                        <li>remove_all</li>
                    </ul>
                </li>
                <li>variable
                    <ul>
                        <li>content</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
    <h2>객체 지향 언어의 특징</h2>
    <ul>
        <li>실제 세상을 모델링</li>
        <li>필요한 것들
            <ul>
                <li><input type="text" data-answer="Inheritance" />(상속)</li>
                <li><input type="text" data-answer="Polymorphism" />(다형성)</li>
                <li><input type="text" data-answer="Visibility" />(히든 클래스)</li>
            </ul>
        </li>
    </ul>
    <h3><input type="text" data-answer="Inheritance" />(상속)</h3>
    <ul>
        <li>부모클래스로부터 <input type="text" data-answer="속성" />과 <input type="text" data-answer="method" />를 물려받는 자식 클래스를 생성 하는 것</li>
    </ul>
    <div class="language-python highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code>
class Person:
   def __init__(self, name, age):
      self.name = name
      self.age = age

class <input type="text" data-answer="Korean(Person)" />:
   pass
first_korean = Korean("Sungchul", 35)
print(first_korean.name)
# "Sungchul"
            </code></pre>
        </div>
    </div>
    <div class="language-python highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code>
class Person: # 초기 상속은 (object)를 적어주지 않아도 됨
    def __init__(self, name, age, gender):
        self.name = name
        self.age = age
        self.gender = gender

    def about_me(self):
        print("저의 이름은", self.name,"이구요.제 나이는", str(self.age),"살 입니다.")

    def __str__(self):
        return "저의 이름은", self.name,"이구요.제 나이는", str(self.age),"살 입니다."
class <input type="text" data-answer="Employee(Person)" />:
    def __init__(self, name, age, gender, salary, hire_date):
        <input type="text" data-answer="super().__init__(name, age, gender)" />
        self.salary = salary
        self.hire_date = hire_date

    def do_work(self):
        print("열심히 일을 합니다.")

    def about_me(self):
        super().about_me()
        print("제 급여는", self.salary,"원 이구요, 제 입사일은", self.hire_date, "입니다.")

my_person = Person("John", 34, "Male")
my_employee = Employee("Chunsic", 45, "Male", 1000, "1989/12/19")

my_employee.about_me()
# 저의 이름은 Chunsic 이구요.제 나이는 45 살 입니다. 제 급여는 1000 원 이구요, 제 입사일은 1989/12/19 입니다.
            </code></pre>
        </div>
    </div>
    <h3><input type="text" data-answer="Polymorphism" />(다형성)</h3>
    <ul>
        <li>같은 이름 메소드의 내부 로직을 다르게 작성</li>
        <li>Dynamic Typing 특성으로 인해 파이썬에서는 같은 부모클래스의 상속에서 주로 발생함</li>
        <li>개념적으로는 같은 일 세부적인 구현이 다를 때</li>
    </ul>
    <div class="language-python highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code>
class Animal:
    def __init__(self, name):
        self.name = name
    def talk(self):
        <input type="text" data-answer="raise" /> <input type="text" data-answer="NotImplementedError" />("Subclass must implement abstract method")
    def __str__(self):
        return f"{self.name}: {self.talk()}"
class Cat(Animal):
    def talk(self):
        return "Meow!"
class Dog(Animal):
    def talk(self):
        return "Woaf! Woaf!"

animals = [Cat("John"), Cat("Chunsic"), Dog("Lassie")]

for animal in animals:
    print(animal)

# John: Meow!
# Chunsic: Meow!
# Lassie: Woaf! Woaf!
            </code></pre>
        </div>
    </div>
    <h3><input type="text" data-answer="Visibility" />(가시성)</h3>
    <ul>
        <li>객체의 정보를 볼 수 있는 레벨을 조절하는 것</li>
        <li>누구나 객체 안에 모든 변수를 볼 필요가 없음
            <ol>
                <li>객체를 사용하는 사용자가 임의로 정보 수정</li>
                <li>필요 없는 정보에는 접근할 필요가 없음</li>
                <li>만약 제품으로 판매한다면? 소스의 보호</li>
            </ol>
        </li>
    </ul>
    <h4><input type="text" data-answer="Encapsulation\캡슐화" /></h4>
    <ul>
        <li>캡슐화 또는 정보 은닉(Information Hiding)</li>
        <li>Class를 설계할 때, 클래스 간 간섭/정보공유의 최소화
            <ul>
                <li>심판 클래스가 축구선수 클래스 가족 정보를 알아야 하나?</li>
            </ul>
        </li>
        <li>캡슐을 던지듯, 인터페이스만 알아서 써야함</li>
        <li>가시성을 통해 객체 내부의 변수와 메서드를 외부에서 볼 수 있는 범위를 제한합니다.
            <ul>
                <li>public: 모든 곳에서 접근 가능</li>
                <li>protected: 같은 패키지나 서브클래스에서만 접근 가능</li>
                <li>private: 같은 클래스에서만 접근 가능</li>
            </ul>
        </li>
        <li>캡슐화를 통해 객체의 상태를 보호하고, 객체의 동작을 제어합니다.
            <ul>
                <li>내부적으로 사용되는 변수는 private으로 설정하고, 필요한 경우 getter와 setter 메서드를 통해 접근을 허용합니다.</li>
            </ul>
        </li>
    </ul>
    <h4>Visibility Example 1</h4>
    <ul>
        <li>Product 객체를 Inventory 객체에 추가</li>
        <li>Inventory에는 오직 Product 객체만 들어감</li>
        <li>Inventory에 Product가 몇 개인지 확인이 필요</li>
        <li>Inventory에 Product items는 직접 접근이 불가</li>
    </ul>
    <div class="language-python highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code>
class Product(object):
   pass
class Inventory(object):
   def __init__(self):
      self.__items = [] # Private(__) 변수로 선언, 타객체가 접근 못함
      self.test = "abc"

   def add_new_item(self, product):
      if type(product) == Product:
         self.__items.append(product)
      else:
         raise ValueError("Invalid Item")

   def get_number_of_items(self):
      return len(self.__items)
my_inventory = Inventory()
my_inventory.add_new_item(Product())
my_inventory.add_new_item(Product())
my_inventory.__items # 접근 불가

# 접근 허용 방법(property decorator)
   @property
   def items(self):
      return self.__items
            </code></pre>
        </div>
    </div>
    <h2>decorator</h2>
    <ul>
        <li>first-class objects(일급 객체)</li>
        <li>inner function</li>
        <li>decorator</li>
    </ul>
    <ol>
        <li>First-class objects
            <ul>
                <li>일등 함수, 일급 객체</li>
                <li>변수나 데이터 구조에 할당이 가능한 객체</li>
                <li><strong><input type="text" data-answer="parameter" /></strong>로 전달이 가능 + <strong><input type="text" data-answer="리턴 값" /></strong>으로 사용
                    <ul>
                        <li>파이썬의 함수는 일급함수</li>
                    </ul>
                </li>
            </ul>
            <div class="language-python highlighter-rouge">
                <div class="highlight">
                    <pre class="highlight"><code>
def square(x):
   return x*x
<input type="text" data-answer="f = square" />
f(5)
# 25
def cube(x):
   return x*x*x
def formula(method, argument_list):
   return [method(value) for value in argument_list]
                    </code></pre>
                </div>
            </div>
        </li>
    </ol>
    <ol>
        <li>Inner function
            <ul>
                <li>함수 내에 또 다른 함수가 존재</li>
            </ul>
            <div class="language-python highlighter-rouge">
                <div class="highlight">
                    <pre class="highlight"><code>
def print_msg(msg):
   def printer():
      print(msg)
   printer()

print_msg("Hello, Python")
                    </code></pre>
                </div>
            </div>
        </li>
    </ol>
    <ul>
        <li><input type="text" data-answer="closures" /> : Inner function을 return값으로 반환</li>
    </ul>
    <div class="language-python highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code>
def print_msg(msg):
   def printer():
      print(msg)
   return printer()

another = print_msg("Hello, Python")
another()
            </code></pre>
        </div>
    </div>
    <div class="language-python highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code>
def tag_func(tag, text):
   text = text
   tag = tag

   def inner_func():
      return '<{0}>{1}</{0}>'.format(tag, text)

   return <input type="text" data-answer="inner_func" />
h1_func = tag_func('title', "This is Python Class")
p_func = tag_func('p', "Data Academy")

print(h1_func())
print(p_func())
# <title>This is Python Class</title>
# <p>Data Academy</p>
            </code></pre>
        </div>
    </div>
    <ol>
        <li>Decorator function
            <ul>
                <li>복잡한 클로져 함수를 간단하게 표현</li>
            </ul>
            <div class="language-python highlighter-rouge">
                <div class="highlight">
                    <pre class="highlight"><code>
def star(func):
   def inner(*args, **kwargs):
      print(arg[1],"*"*30)
      func(*args, **kwargs)
      print(arg[1],"*"*30)
   return inner

@star
def printer(msg):
   print(msg)
printer("Hello","Python")
                    </code></pre>
                </div>
            </div>
        </li>
    </ol>
    <div class="language-python highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code>
def generate_power(exponent):
   def wapper(f): # f는 <input type="text" data-answer="raise_two(n)" /> 함수를 의미한다
      def inner(*args):
         result = f(*args) # *args는 <input type="text" data-answer="3" />을 의미한다
         return exponent ** result
      return inner
   return wrapper

@generate_power(2)
def raise_two(n):
   return n**2

print(raise_two(3))
# 512
            </code></pre>
        </div>
    </div>
    <button onclick="checkAnswers()">제출</button>
    <p id="result"></p>
    <script>
        function normalizeText(text) {
            return text.trim().toLowerCase().replace(/\s+/g, "");
        }

        function checkAnswers() {
            const inputs = document.querySelectorAll('input[type="text"]');
            let correct = 0;
            let total = inputs.length;

            inputs.forEach((input) => {
                const userAnswer = normalizeText(input.value);
                const correctAnswers = input.dataset.answer.split("|").map(normalizeText);
                if (correctAnswers.includes(userAnswer)) {
                    input.style.backgroundColor = "lightgreen";
                    correct++;
                } else {
                    input.style.backgroundColor = "lightcoral";
                }
            });

            document.getElementById("result").textContent = `총 ${total} 문제 중 ${correct}개 맞았습니다.`;
        }
    </script>
</body>
</html>
