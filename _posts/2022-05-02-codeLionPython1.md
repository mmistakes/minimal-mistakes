---
layout: post
title: "파이썬 기초"
---

# random library
```
import random

print(random.choice(["된장찌개","피자","제육볶음"]))
```
리스트 중 하나 랜덤 선택  

<br>

# python for문 문법
```
for x in range(반복횟수):
    반복할코드
```
자바에서
```
for(i=0; i<횟수; i++){
  반복코드
}
```
와 같다  
혼자 문제푸는데 자바처럼 써서 안되니까 오류난줄..  

<br>

# python while문 문법
```
while 조건:
    반복코드
```
조건에 True 쓰면 무한루프  
끝낼때는 break  

<br>

# list
`list = ["A", "B", ...]`

<br>

```
list.append("값")
del list[순서]
```

<br>

- list 출력
```
for x in range(len(list)):
    print(list[x])
```
보다  

```
for x in range list:
    print(x)
```
가능  

<br>

# dictionary
`dict = {"key" : "value"}`  
자바의 맵?인듯  
```
information = {"고향":"수원", "취미":"영화관람", "좋아하는 음식":"국수"}
print(information.get("취미"))
```
하면 취미(key)의 value 출력  
`dictionary.get("key")`이며 value 넣으면 None이 출력됨  

<br>

```
dict["add"] = "more"
del dict["삭제할 key값"]
len(dict)
```
add가 편하다  
자바는 map.put("","")인데  

<br>

- dict 
```
for x, y in dict.items():
  print(x + " : " + y)
```

<br>

# 집합(set)
중복 X, 요소 순서 X  

- 선언
`set = set([리스트])`  

<br>

- list 👉 set
```
foods = ["된장찌개", "피자", "제육볶음"]
foods_set1 = set(foods)
foods_set2 = set(["된장찌개", "피자", "제육볶음"])
```

<br>

- 합집합  
```
menu1 = set(["된장찌개", "피자", "제육볶음"])
menu2 = set(["된장찌개", "떡국", "김밥"])
menu3 = menu1 | menu2
print(menu3)
```
- 차집합  
```
menu1 = set(["된장찌개", "피자", "제육볶음"])
menu2 = set(["된장찌개", "떡국", "김밥"])
menu3 = menu1 - menu2
print(menu3)
```
string으로 바로 차집합 실행 가능  
```
set_lunch = set(["된장찌개", "피자", "제육볶음", "짜장면"])
item = "짜장면"
set_lunch = set_lunch - set([item])
```

- 교집합  
```
menu1 = set(["된장찌개", "피자", "제육볶음"])
menu2 = set(["된장찌개", "떡국", "김밥"])
menu3 = menu1 & menu2
print(menu3)
```

<br>

# python if
```
import random

food = random.choice(["된장찌개","피자","제육볶음"])

print(food)
if(food == "제육볶음"):
    print("곱배기 주세요")
else:
    print("그냥 주세요")
print("종료")
```
for문과 마찬가지로 {} 없이 들여쓰기로 구분  

<br>

# 오늘은 뭐 드실?
저메추, 점메추 프로그램  
- 추가
```
import random
import time

lunch = ["된장찌개", "피자", "제육볶음", "짜장면"]

while True:
    print(lunch)
    item = input("a = 메뉴 추가, d = 메뉴 삭제, q = 종료")
    if item == "q":
        break
    elif item == "a":
        food = input("음식을 추가해주세요 : ")
        lunch.append(food)
    elif item == "d":
        delete = input("삭제할 음식을 입력해주세요 : ")
        set_lunch = set(lunch)
        set_lunch = set_lunch - set([delete])
        lunch = list(set_lunch)

time.sleep(1)
print(random.choice(list(set_lunch)))

```

<br>

# 문답 프로그램
```
total_list = []
while True:
    question = input("질문을 입력해주세요 : ")
    if question == "q":
        break
    else:
        total_list.append({"질문" : question, "답변" : ""})


for i in total_list:
    print(i["질문"])
    answer = input("답변을 입력해주세요 : ")
    i["답변"] = answer
print(total_list)
```

<br>

# 기타
똑같은거 5번 이상 반복하면 잘못된 코딩  
python : 변수에 타입설정X  
데이터 타입은????  

<br>

# 문제 1
```
import random

book_list = []

def enrollment_book():  # 책 등록 함수
    name = input("등록할 책의 이름을 입력하시오 ")
    write = input("등록할 책의 저자를 입력하시오 ")
    publish = input("등록할 책의 출판사를 입력하시오 ")
    date = input("등록할 책의 입고일 입력하시오 ")

    book_list.append({"이름" : name ,"저자" : write, "출판사" : publish, "입고일" : date})

def delete_book():  # 책 삭제 함수
    del_name = input("삭제할 책의 이름을 입력하시오 ")
    for i in range(len(book_list)):
        if book_list[i]["이름"] == del_name:
            del book_list[i]
            break

while True:
    print("1. 책 등록")
    print("2. 책 삭제")
    print("3. 책 목록")
    print("4. 책 추천")
    print("5. 종료")
    menu_num = input("메뉴 선택: ")

    if menu_num == "1":
        enrollment_book()

    elif menu_num == "2":
        delete_book()

    elif menu_num == "3":
        print(book_list)

    elif menu_num == "4":
        print(random.choice(book_list))

    elif menu_num == "5":
        print("프로그램을 종료합니다")
        break
    else:
        continue
```

<br>

# 문제 2
```
# 1. 첫 주문 출력
order = {"Num": "101", "Buger":"치즈버거","Beverage":"콜라"}
for x, y in order.items():
    print(x + " : " + y)

# 2. 주문 수정
order["Buger"] = "더블치즈버거"
order["Side menu"] = "치킨너겟"
print(order)

# 3. order 내역 삭제
del order

# 4. 새로운 주문을 리스트에 담기
order = []
order.append({"Num" : "102", "Burger" : "불고기버거세트", "Beverage" : "바닐라쉐이크"})
order.append({"Num" : "103", "Burger" : "치킨버거", "Beverage" : "딸기칠러", "Side menu" : "치즈스틱"})
print(order)
```

<br>

# 문제 3
```
# 첫 줄 출력
for i in range(9, 0, -1): # 이건 자바의 for(i=9; i>0; i--)
    num = str(i)
    print("#  " + num + "단" + "  #  ", end="")
    print("\n")

# 구구단 출력
for i in range(9, 0, -1):
    for j in range(9, 0, -1):
        first = str(i)
        second = str(j)
        print(second + " * " + first + "=" + str(i*j), end="  ")
    print("\n")
```
