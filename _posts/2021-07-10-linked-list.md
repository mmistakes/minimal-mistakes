---
title: "Linked List" 
date: 2021-07-10  
categories:
  - Python
tags:
  - Python
  - Data structure
---

### Node 구현
* 보통 파이썬 클래스를 활용함
    - 파이썬의 클래스 메소드는 항상 첫 번째 파라미터로 self를 가짐!! 
    - 인자가 필요없을때에도 self는 사용


```python
class Node:
    def __init__(self, data):
        self.data=data
        self.next=None
```


```python
class Node:
    def __init__(self, data, next=None):
        self.data=data
        self.next=next
```

### Node 와 Node 연결하기 (포인터 활용)


```python
node1=Node(1)
node2=Node(2)
node1.next=node2
head=node1
```

### data 추가


```python
class Node:
    def __init__(self,data,next=None):
        self.data=data
        self.next=next
        
def add(data):
    node=head
    while node.next:
        node=node.next
    node.next=Node(data)
```


```python
node1=Node(1)
head=node1
for index in range (2,10):
    add(index)
```

### data 출력


```python
node=head
while node.next:
    print(node.data)
    node=node.next
print(node.data)
```

    1
    2
    3
    4
    5
    6
    7
    8
    9
    

### **파이썬 객체지향 프로그래밍으로 링크드 리스트 구현


```python
class Node:
    def __init__(self,data,next=None):
        self.data=data
        self.next=next

class NodeMgmt:
    def __init__(self, data):
        self.head=Node(data)
    
    def add(self, data):
        if self.head=='':
            self.head=Node(data)
        else:
            node=self.head
            while node.next:
                node=node.next
            node.next=Node(data)
        
    def desc(self):
        node=self.head
        while node:
            print(node.data)
            node=node.next
            
    def delete(self, data):
        if self.head=='':
            print("해당 값을 가진 노드가 없습니다.")
            return
        if self.head.data==data:
            temp=self.head
            self.head=self.head.next
            del temp
        else:
            node=self.head
            while node.next:
                if node.next.data==data:
                    tmp=node.next
                    node.next=node.next.next
                    del tmp
                else:
                    node=node.next
    
    def search_node(self, data):
        node=self.head
        while node:
            if node.data==data:
                return node
            else:
                node=node.next
```


```python
linkedlist1=NodeMgmt(1)
linkedlist1.desc()
```

    1
    

#### head가 살아있음을 확인


```python
linkedlist1.head
```




    <__main__.Node at 0x1c54336c588>



#### head 를 지워봄


```python
linkedlist1.delete(1)
```

#### 다음 코드 실행시 아무것도 안나온다는 것은 linkedlist1.head 가 정상적으로 삭제되었음을 의미


```python
linkedlist1.head
```

#### 다시 노드 추가


```python
linkedlist1=NodeMgmt(0)
for data in range(1,10):
    linkedlist1.add(data)
linkedlist1.desc()
```

    0
    1
    2
    3
    4
    5
    6
    7
    8
    9
    


```python
linkedlist1.delete(4) #중간 노드
linkedlist1.delete(9) #마지막 노드 
linkedlist1.delete(0) #첫번째 노드
```


```python
linkedlist1.desc()
```

    1
    2
    3
    5
    6
    7
    8
    


```python

```


> Ref: https://fun-coding.org/