---
layout: single
title:  "linked list 개념 및 문제 모음"
categories: Sort
tag : [c++,Algorithm,LeetCode,codetree,linked list,linked list problem]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---


### 개념 

배열과 장단점이 바뀐 자료구조이다   

<br>


1. 데이터 삽입/삭제 -> O(1)
  + 삽입 할때는 새로운 노드의 next를 이전 노드의 next값으로 설정한 후 이전 노드의 next를 갱신한다 


2. 탐색 -> O(N)

<br>



### singled linked list 

가장 기본적인 한방향 연결 리스트이다 삽입 삭제 탐색까지 구현 한 코드는 다음과 같다 



```c++

#include <iostream>

using namespace std;

template<typename T> //for all data type 

struct Node
{
  T value;
  struct Node<T> *next = nullptr;

};

class Singled_linked_list
{
  Node<T> *head;
  Node<T> *tail;

public:
  Singled_linked_list()
  :head(nullptr),tail(nullptr)
  {

  }
  ~Singled_linked_list()
  {
    delete head;
    delete tail;
  }

  void add_node(T _value)
  {
    Node<T> *new_node = new Node<T>;

    node->value = _value;
    node->next = nullptr;

    if(head==nullptr)
    {
      head = node;
    }
    else
    {
      tail->next = node;
    }
    tail = node;

  }

  void display()
  {
    Node<T> *temp = new Node<T>;
    temp = head;
    while(temp!= nullptr)
    {
      cout<<temp->value<<endl;
      temp = tmep->next;
    }

  }

  void insert_front(T _value)
  {
    Node<T> *temp = new Node<T>;

    temp->value = _value;
    temp->next = head;
    head = temp;
  }
  void insert_position(const int &pos,T _value)
  {
    Node<T> *pre = new Node<T>;
    Node<T> *cur = new Node<T>;
    Node<T> *temp = new Node<T>;

    cur = head;

    for(int i=1;i<pos;i++)
    {
      pre = cur;
      cur = cur->next;

    }
    temp->value = _value;
    pre->next = temp;
    temp->next = cur;

  }
  void delete_first()
  {
    assert(head!=nullptr);

    Node<T> *temp = new Node<T>;
    temp = head;
    head = head->next;
    delete temp;
    //사실 temp만들고 지울필요는 없다 그냥 head=head->next만 해도 첫번째 지우는 효과 있다 

  }
  
  void delete_last()
  {
    Node<T> *pre = new Node<T>;
    Node<T> *cur = new Node<T>;
        

    cur = head;

    //배열처럼 kth접근 안됨 탐색 해야 한다 
    while(cur->next != nullptr)
    {
      pre = cur;
      cur = cur->next;
    }        
    tail = pre;
    pre->next = nullptr;
    delete cur;

  }
  void delete_position(const int &pos)
  {
    Node<T> *pre = new Node<T>;
    Node<T> *cur = new Node<T>;

    cur = head;
    for(int i = 1;i < pos;i++)
    {
      pre = cur;
      cur = cur->next;
    }        
    pre->next = cur->next;
    delete cur;

  }
  /*
  
  두 노드를 swap하려면 이전 노드를 두 노드 요소와 이어주어야 하고 현재 노드의 next를 또 한번 이어주어야 한다 
  이 두과정을 해야 한다 

  */
  //node끼리 swap하기 
  void swap_node(Node<T>** head,T val1,T val2)
  {
    if(val1==val2)
    {
      return;
    }
    Node<T> *prev_val1=nullptr;
    Node<T> *cur_val1= *head;

    //탐색해서 val1 노드 찾기 
    while(cur_val1&&cur_val->value!=val1)
    {
      prev_val1=cur_val1;
      cur_val1 = cur_val1->next;

    }
    //탐색 해서 val2 노드 찾기 

    Node<T> *prev_val2 = nullptr;
    Node<T> *cur_val2 = *head;
    while(cur_val2&&cur_val2->value!=val2)
    {
      prev_val2 = cur_val2;
      cur_val2 = cur_val2->next;
    }

    //만약 둘중에 하나라도 null이면 할수있는게 없으므로 반환 

    if(cur_val1==NULL || cur_val2==NULL)
    {
      return;
    }

    //만약 val1이 head라면 prev_val1은 null일것이다 이때는 val2를 head로 만들어야 한다 
    
    if(prev_val1!=NULL)
    {
      prev_val1->next = cur_val2;
    }
    else
    {
      *head = cur_val2;
    }

    //val2에 대해서도 똑같이 적용 

    if(prev_val2!=NULL)
    {
      prev_val2->next = cur_val1;
    }
    else
    {
      *head = cur_val1;
    }

    //cur의 next를 또 이어주는 작업 

    Node<T>* temp = cur_val2->next;

    cur_val2->next = cur_val1->next;
    cur_val1->next = temp;



    
  }
};
int main()
{
  return 0;
}
```

<br>


### remove linked list element leetcode 

요소를 지우는 간단한 문제이다 하지만 삭제할 대상이 head인 상황이면 pre node가 필요하기 때문에 dummy node개념을 도입해서 문제 해결 한다 코드는 다음과 같다 
  

Input: head = [1,2,6,3,4,5,6], val = 6  
Output: [1,2,3,4,5]  



```c++

#include<iostream>
using namespace std;
struct ListNode
{
  int val=0;
  ListNode* next = nullptr;

  ListNode(int x)
  :val(x),next(nullptr)
  {}
  
};
ListNode* removeElements(ListNode* head,int val)
{
	ListNode* dummy = new ListNode;
	ListNode* cur = new ListNode;
	ListNode* pre = new ListNode;
	ListNode* temp = new ListNode;

  //dummy node

  dummy->next = head;
  cur = head;
  pre = dummy;

  while(cur!=nullptr)
  {
    if(cur->val ==val)
    {
      pre->next = cur->next;
      temp = cur;
      cur = cur->next;
      delete temp;
      continue;
    }
    pre = cur;
    cur = cur->next;
  }

  return dummy->next;//dummy 개념 다시 원상 복구 
  

}
int main()
{

}
```

### merge two sorted linked list leetcode





**iterator verstion** 

<br>


```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution 
{
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) 
    {
        ListNode *dummy = new ListNode;
        ListNode *cur = new ListNode;
        ListNode *node1 = new ListNode;
        ListNode *node2 = new ListNode;
        

        cur = dummy;

        node1 = list1;
        node2 = list2;

        while(node1!=nullptr || node2!= nullptr)
        {
            if(node1==nullptr)
            {
                cur->next = node2;
                break;
            }
            else if(node2 == nullptr)
            {
                cur->next = node1;
                break;

            }
            if(node1->val>=node2->val)
            {
                cur->next = node2;
                cur = node2;
                node2 = node2->next;
            }
            else
            {
                cur->next = node1;
                cur = node1;
                node1 = node1->next;
            }
        }
        
        return dummy->next;


        
    }
};
```

**recursive verstion** 

<br>


```c++


```


### middle-of-the-linked-list leetcode

이 문제 같은 경우 연결 리스트의 단점을 명확히 알수있는 문제이다 배열이면 kth요소 바로 반환 힐수있다 왜냐 하면 배열의 크기를 알수있기 때문이다 하지만 연결리스트의 경우 크기를 알아내려면 탐색을 끝까지 해야 하기 때문에 사이즈를 구할때 O(N)이 소요 된다       

이 문제를 푸는 3가지 방법을 소개 한다   

1. 탐색을 하여서 size알아내고 size/2 지점에서 반환하는 방법 
  + 가장 직관적이면서도 여전히 좋은 방법이다 time : O(N), space O(1)

2. 1번은 탐색을 두번 진행을 한다 만약 one pass로만 구현해주라고 한다면 바로 배열처럼 전환을 하면 된다 
  + one pass할때 배열로 복사를 한다 배열로 복사 하면 바로 중간 지점을 반환 할수가 있다 time : O(N), space : O(N)

3. fast slow 방식 
  + fast 노드와 slow 노드를 설정 한다 fast 노드는 2칸을 이동할때 slow노드는 한칸을 이동한다 fast가 null 또는 fast -> next가 null인 경우 멈춘다 이때 slow노드 지점이 mid of linked list의 정답이 된다 이 알고리즘으로 문제를 풀면 one pass성질 만족하면서 time : O(N), space : O(1)을 만족할수있다 


이번 문제에서 보아야 하는건 문제 해설이 아니라 생각의 과정이다 인터뷰를 진행 한다고 하면 반드시 위와 같이 제시가 될것이다   


**fast slow point** 

<br>


```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution 
{
public:

  ListNode* middleNode(ListNode* head) 
  {
    ListNode* fast, * slow;
	  fast = head;
	  slow = head;

	  while (fast != NULL && fast->next != NULL)
	  {
		  fast = fast->next->next;  //두칸 이동
		  slow = slow->next;//한칸 이동
	  }
	  return slow;
  }

};

```

### sort list leetcode 


문제 : [sort list problem ](https://leetcode.com/problems/sort-list/description/)

<br>


처음에는 O(N)만큼 탐색하면서 vector에 옮기고 stl sort를 사용해서 해결하려고 했지만 문제에서 요구하는 space complexity를 만족하지 않기 때문에 다른 방법을 고려 하였다 그래서 merge sort를 linked list에 맞게 구현하고 해결하려 했지만 heap sort로 해도 괜찮을것 같아서 heap sort를 linked list에 맞게 변경하기로 잡고 문제를 풀려고 했다 그러기 위해서 min heap을 구현하기로 했다 부모노드와 자식 노드간의 관계식을 이용해서 그 요소의 값을 접근하기 위해 element라는 함수를 만들었다 해당 인덱스만큼 탐색해서 만족하는 노드를 return 하는 함수이다 그리고 그 요소의 값과 비교해서 min 값을 갱신한다 마지막에 min!=rootidx의 경우 swap하기 위해 linked list에 맞게 swap하는 함수도 구현을 했다       
linked list swap코드는 singledl linked list에 언급    

min heap까지 알맞게 구현 하였는데 이제 원래 heap sort 처럼 pop을 하면서 sorting 하는 방식인데 pop까지 구현 하기가 어려워서 포기 했다 아래는 min heap을 linked list에 맞게 작성한 코드이고 출력해보면 min heap작동은 하는것 같다  




```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };


O(n)만큼 이동해서 벡터에 저장 하고 난후 아 이러면 space가 on이네 


 */
class Solution 
{
public:
    void swap_node(ListNode **head,int val1,int val2)
    {
        if(val1==val2)
        {
            return;
        }
        ListNode *prev_val1=nullptr;
        ListNode *cur_val1 = *head;

        while(cur_val1&&cur_val1->val!=val1)
        {
            prev_val1=cur_val1;
            cur_val1=cur_val1->next;
        }
        ListNode *prev_val2=nullptr;
        ListNode *cur_val2 = *head;

        while(cur_val2&&cur_val2->val!=val2)
        {
            prev_val2 = cur_val2;
            cur_val2 = cur_val2->next;

        }
        if(cur_val1==NULL || cur_val2==NULL)
        {
            return;
        }

        if(prev_val1!=NULL)
        {
            prev_val1->next= cur_val2;
        }
        else
        {
            *head = cur_val2;
        }
    
        if(prev_val2!=NULL)
        {
            prev_val2->next= cur_val1;
        }
        else
        {
            *head = cur_val1;
        }
        ListNode *temp = cur_val2->next;
        cur_val2->next = cur_val1->next;
        cur_val1->next = temp;
        std::cout<<" swap"<<std::endl;

    }
    ListNode* element(ListNode* head,int len)
    {
        ListNode *t = new ListNode;
        t=head;
        int idx =1;
        while(true)
        {
            if(idx==len)
            {
                
                break;
            }
            //std::cout<<idx<<" "<<len<<std::endl;
            if(t==NULL)
            {
                return nullptr;
            }
            t = t->next;
            idx++;
        }
        return t;
    }
    void min_heapify(ListNode* head,int rootidx,int &size)
    {
        int Min = rootidx;
        int left = 2*rootidx+1;
        int right = 2*rootidx+2;

        ListNode *left_node = element(head,left);
        ListNode *right_node = element(head,right);
        ListNode *min_node = element(head,Min);
        ListNode *rootidx_node = element(head,rootidx);

        ListNode *rr=new ListNode;
        
        if(left<size &&left_node!=NULL&&min_node!=NULL&& left_node->val < min_node->val)
        {
            Min = left;
            std::cout<<"left"<<std::endl;
        }
        else if(right<size&&right_node!=NULL&&min_node!=NULL&&right_node->val<min_node->val)
        {
            Min = right;
            std::cout<<"right"<<std::endl;
        }
        if(Min!=rootidx)
        {
            min_node = element(head,Min);
            swap_node(&head,min_node->val,rootidx_node->val);
            std::cout<<Min<<" "<<rootidx<<std::endl;
            std::cout<<"im in"<<" "<<min_node->val<<" "<<rootidx_node->val<<std::endl;
            ListNode *tem = new ListNode;
            tem=head;
            while(tem!=NULL)
            {
                std::cout<<tem->val<<std::endl;
                tem=tem->next;
            }

            min_heapify(head,Min,size);
        }
        //return head;

    }
    ListNode* sortList(ListNode* head) 
    {
        ListNode *temp = new ListNode;
        ListNode *tt = new ListNode;
        ListNode *result = new ListNode;
     
        temp=head;
        result = head;
        tt=head;
        int size = 0;

        while(temp!=nullptr)
        {
            temp=temp->next;
            size++;
        }
        //ListNode *cur = element(tt,size/2);

        for(int i = size/2;i>-1;i--)
        {
            
            
            std::cout<<"DDD "<<i<<std::endl;
   
            min_heapify(tt,i,size);
            //tt=head;
            //cur = element(tt,i);
        

        }
        return result;
    }
};
```
  


뜨는 에러   

  
Runtime Error   
Line 145: Char 24: runtime error: member access within null pointer of type 'ListNode' (solution.cpp)  
SUMMARY: UndefinedBehaviorSanitizer: undefined-behavior prog_joined.cpp:154:24    


Stdout  

DDD 2
DDD 1
DDD 0
DDD 2
DDD 1
DDD 0
DDD 0

왜 2 1 0이 반복 되는지 모르겠다   

A  : min heap () 인자에 head를 유지해서 넣어야 하는데 그러지 않아서 문제가 발생하였던것이었다 다행이 위에는 이 문제를 해결 하였다   


아래 코드는 merge sort로 접근 한 경우이다 merge sort를 linked list에 맞게 변형한 코드이다  



[Merge sort 풀이법](https://leetcode.com/problems/sort-list/solutions/1337254/c-efficient-solution-o-nlog-n-o-1-merge-sort/)
<br>


```c++
class Solution {
public:
    ListNode* midpoint(ListNode* head){
        if(head == NULL or head->next == NULL){
            return head;
        }
        
        ListNode *slow = head, *fast = head->next;
        while(fast && fast->next){
            slow = slow->next;
            fast = fast->next->next;
        }
        
        return slow;
    }
    
    ListNode* mergeSortedLists(ListNode* a, ListNode* b){
        if(a == NULL) return b;
        if(b == NULL) return a;
        
        ListNode* temp;
        if(a->val <= b->val){
            temp = a;
            temp->next = mergeSortedLists(a->next, b);
        }
        else{
            temp = b;
            temp->next = mergeSortedLists(a, b->next);
        }
        
        return temp;
    }
    
    ListNode* sortList(ListNode* head) {
        if(head == NULL or head->next == NULL){
            return head;
        }
        
        ListNode* mid = midpoint(head);
        ListNode* a = head;
        ListNode* b = mid->next;
        
        mid->next = NULL;
        
        a = sortList(a);
        b = sortList(b);
        
        ListNode* temp = mergeSortedLists(a, b);
        return temp;
    }
};
```
fast slow 방식을 사용해서 mid point를 찾았다  

<br>



### swap nodes in pairs leetcode

[swap node in linked list](https://leetcode.com/problems/swap-nodes-in-pairs/)

위에서 node 요소 스왑 하는거에는 큰 오류가 있다 만약 같은 값이 먼저 나와 버리면 swap하려는 대상을 잘못 swap할수있다 왜냐하면 값으로만 판단하기 때문이다 그래서 이를 해결하려고 코드를 수정해 보았지만 막혀서 결국 solution을 참고 하였다 아래 코드는 solution참고 하기전에 구현한 코드이다 


```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution 
{
public:
    void swap_node(ListNode**head,int val1,int val2,int i)
    {
        int cnt=0;
        if(val1==val2)
        {
            return;
        }
        ListNode *prev_val1 = nullptr;
        ListNode *cur_val1 = *head;
        while(true)
        {
            while(cur_val1&&cur_val1->val!=val1)
            {
                prev_val1 = cur_val1;
                cur_val1 = cur_val1->next;
                cnt++;
                //std::cout<<"val1 "<<cnt<<" "<<cur_val1->val<<" "<<i<<std::endl;
            }
            cnt++;
            if(cnt<i)
            {
                prev_val1 = cur_val1;
                if(cur_val1==NULL)
                {
                    return;
                }
                cur_val1 = cur_val1->next;
                continue;
            }
            else
            {
                break;
            }
        }



        ListNode *prev_val2 = nullptr;
        ListNode *cur_val2 = *head;
        cnt=0;
        while(true)
        {
            while(cur_val2&&cur_val2->val!=val2)
            {
                prev_val2 = cur_val2;
                cur_val2 = cur_val2->next;
                cnt++;
                
                std::cout<<"val2 "<<cnt<<" "<<cur_val2->val<<" "<<i<<std::endl;
            }
            cnt++;
            if(cnt<i)
            {
                prev_val2 = cur_val2;
                if(cur_val2==NULL)
                {
                    return;
                }
                cur_val2 = cur_val2->next;
                continue;
            }
            else
            {
                break;
            }
        }

        if(cur_val1==NULL||cur_val2==NULL)
        {
            return ;
        }
        if(prev_val1!=NULL)
        {
            prev_val1->next = cur_val2;
        }
        else
        {
            *head = cur_val2;
        }
        if(prev_val2!=NULL)
        {
            prev_val2->next = cur_val1;
        }
        else
        {
            *head = cur_val1;
        }
        ListNode *temp = cur_val2->next;
        cur_val2->next = cur_val1->next;
        cur_val1->next = temp;

    }
    ListNode* element(ListNode* head,int len)
    {
        ListNode *t=new ListNode;
        t=head;
        int idx=0;
        while(true)
        {
            if(idx==len)
            {
                break;
            }
            t=t->next;
            idx++;
        }
        
        return t;
    }
    ListNode* swapPairs(ListNode* head) 
    {

        ListNode *temp = new ListNode;
        ListNode *cur = new ListNode;
        cur=head;
        
        temp=head;
        int size=0;
        while(temp!=NULL)
        {
            size++;
            temp=temp->next;
        }
        delete temp;

        if(size==1||size==0)
        {
            return head;
        }
        
        for(int i=0;i<size;i=i+2)
        {
            ListNode *a = element(head,i);
            ListNode *b = element(head,i+1);
            
            if(a!=NULL&&b!=NULL)
            {
                //std::cout<<a->val<<" "<<b->val<<std::endl;
                swap_node(&head,a->val,b->val,i);
                


            }
            
            
        }
        return head;



    }
};
```

https://leetcode.com/problems/swap-nodes-in-pairs/solutions/1774708/c-visual-image-how-links-change-explained-every-step-commented-code/

### 마무리 


+ fast slow 방식 
