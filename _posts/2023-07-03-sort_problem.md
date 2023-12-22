---
layout: single
title:  "정렬 문제모음"
categories: Sort,Sort proplem
tag : [c++,python,Algorithm,LeetCode,Sort,problem]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

### Intro

sorting 개념은 따로 정리 했으니 참고 하면 도움이 될것이다. 이 포스팅에서는 정렬관련 문제들을 모아 보았다  



https://leetcode.com/problems/sort-array-by-increasing-frequency/

-> 우선 순위 큐 내용 힙 내용 배우고 나서 힙 정렬 문제 할때 풀어보기
-> counting sort 변형해서 풀어보려고 하였다 그러나 음수의 경우도 고려를 해야 하였기 때문에 누적 합을 이용한 자릿수는 안될것 같았다 그렇다고 std::count를 사용해서 매번 O(n)만큼 탐색하고 풀어내는것도 조금 그랬다 그래서 답안을 보았는데 우선 순위 큐를 이용해서 문제를 푸는것 같더라.. 거의 2시간 가까이 보고있었는데 결국 하지 못함 미래의 나 화이팅  


<br>



### 문제 모음 


[array partition](https://leetcode.com/problems/array-partition/description/)
{: .notice--danger} 
  


[sort_color_leetcode](https://leetcode.com/explore/learn/card/sorting/694/comparison-based-sorts/4483/)
{: .notice--danger}  

[수 찾기](https://www.acmicpc.net/problem/1920)
{: .notice--danger}   

[Longest Subsequence With Limited Sum](https://leetcode.com/problems/longest-subsequence-with-limited-sum/description/)


[intersection of two arrays I](https://leetcode.com/problems/intersection-of-two-arrays/description/)




[intersection of two arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/)


-------------------------------

### array partition - leetcode

정렬 문제인지를 모르고 그냥 이 문제를 보면 접근을 어떤식으로 해야할지 감이 안올것이다 실제로 감이 안왔다 정렬 문제라는 tag를 보고 나서 쉽게 접근 할수 있었다 

```c++
class Solution {
public:
    int arrayPairSum(vector<int>& nums) 
    {
        int result=0;
        sort(nums.begin(),nums.end());
        for(int i=0;i<nums.size();i=i+2)
        {
            result+=min(nums[i],nums[i+1]);
        }
        return result;
        
    }
};

```

이 문제를 통해 2n의 길이를 가진 배열을 정렬 했을때 min으로 pair 비교 한후 가장 큰값을 가지는 성질을 이해 했다 만약 반대로 max해보면 max 비교 했을때 가장 작은 값이 나올것 같다(아직 안해봄)

--------

### sort color _ leetcode 

lib사용 하지 않고 정렬 하는 문제 버블 정렬, 선택 정렬 사용해도 된다 하지만 원소가 0-2까지 밖에 없으니까 count sorting으로 해결해 보고자 한다 leetcode에서는 c++20을 지원 하지 않는다 C++20을 지원한다고 하면 range를 사용해서 해결할것 같다     





```c++
class Solution {
public:
    void sortColors(vector<int>& nums) 
    {
        vector<int> count(3,0); //0,1,2
        vector<int> result(nums.size(),0);
        int acc = 0; // 누적합 변수 
        
        for(auto&e:nums)
        {
            count[e]++;
            
        }
        for(int i=0;i<count.size();i++)
        {
            acc+=count[i];
            count[i]=acc;
            
        }
        for(int i=0;i<count.size();i++)
        {
            count[i]--;
        }
        
        for(int i=nums.size()-1;i>-1;i--) //for stable
        {
            result[count[nums[i]]] = nums[i]; //count 배열에서 인덱스 정보에 값 넣는다
            count[nums[i]]--;
        }
        nums=std::move(result);
    }
};

```

마지막에서 복사를 막기 위해 move를 통해 처리 하였다  


### 수찾기 백준


문제는 링크 타고 가서 보면 될것 같다 처음 문제 해결 방법 떠올린것은 정렬을 하고 binary serarch로 수 찾으면 될것 같았다 시도 안해봤지만 아마 될것이다 하지만 정렬 하는데 nlogn 그리고 수찾는데(binary serarch) logn 걸리니까 O(nlogn +logn)이 소요될것으로 예상 되었다 그래서 다른 방법을 찾기로 했다 unordered set을 이용해서 O(n)으로 해결 하고 싶었다(예상 time complexty가 O(n)이지 실제로는 모르겠다 대략 계산한거라 틀릴수있다 그래서 틀리면 알려주세요) N,M 범위가 100000까지니까 reserve를 통해 미리 할당을 해주었다 그리고 o(1)으로 find하면 된다      

```c++
#include <iostream>
#include <unordered_set>
using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    
    unordered_set<int> set;
    set.reserve(100000);
    
    long long int n=0,m=0;
    cin>>n;
    for(int i=0;i<n;i++)
    {
        long long temp=0;
        cin>>temp;
        set.emplace(temp);
    }
    
    cin>>m;
    for(int i=0;i<m;i++)
    {
        long long temp=0;
        cin>>temp;
        if(set.find(temp)!=set.end())
        {
            cout<<1<<'\n';
        }
        else
        {
            cout<<0<<'\n';
        }
    }
    
 

    return 0;
}
```

### Longest Subsequence With Limited Sum


처음에 내가 풀었던 방식은 구간 합을 보고 나서 queries요소보다 커지면 인덱스를 result에 저장하는 방식이었다 

처음에 내가 풀었던 방법 코드 


```c++
class Solution {
public:
    vector<int> answerQueries(vector<int>& nums, vector<int>& queries) 
    {
        sort(nums.begin(),nums.end());
        //sort(queries.begin(),queries.end());
        vector<int> result;


        
        int i=0,j=0;
        for(j=0;j<queries.size();j++)
        {
            
            int temp=0;
            int q = queries[j];
            for(i=0;i<nums.size();i++)
            {
                temp+=nums[i];

                if(temp>q)
                {
                   
                    break;
                }
                

            }

            //i=i-1
            result.emplace_back(i);

        }
        return result;
        
    }
};
```

문제 없이 통과 했지만 솔루션을 통해 다른 사람의 코드를 본 결과 위에서 내가 했던 방식과 똑같은 생각이지만 코드 구현에서 차이가 있어서 남긴다 

처음 코드에서 아쉬웠던것들    

1. prefix sum을 하는거에서 이전까지의 합만 필요했던것이라서 코드 구현에서 아쉬운거 있었다 

2. 인덱스까지의 위치를 upper bound를 통해 해결할수있음을 알았다 
    * https://en.cppreference.com/w/cpp/algorithm/upper_bound


```c++

class Solution {
public:
    vector<int> answerQueries(vector<int>& nums, vector<int>& que) {
        vector<int> ans;
        sort(nums.begin(),nums.end());
        for(int i=1; i<nums.size(); i++){
            nums[i] += nums[i-1];
        }

        for(auto it : que){
            int index = upper_bound(nums.begin(), nums.end(), it) - nums.begin();
            ans.push_back(index);
        }
        return ans;
    }
};


```

처음 보다 더 깔끔한 코드가 나왔고 실제로 돌려본 결과 더 나은 결과가 나왔다 


-------------------------------------------------------------------------------------

### intersection of two arrays I 


num1,num2가 주어질때 겹치는 요소를 반환하는 문제이다 난 set을 이용해서 중복을 없에주었다 그리고 나서 set에서 num1의 요소를 찾으면 비워진 num2에 할당하고 반환 해주었다 코드는 다음과 같다     

<br>




```c++
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) 
    {
        set<int> set;
        
        for(auto&e:nums2)
        {
            set.emplace(e);
        }
        nums2={};

        for(auto&e:nums1)
        {
            if(set.find(e)!=set.end())
            {
                nums2.emplace_back(e);
                set.erase(e);
            }
        }
        return nums2;
        
        
    }
};
```
<br>



----------------------------------------------------------------------------------------------------------

<br>



### intersection of two arrays II 

위에서 풀었던 문제의 2번째 버전 문제이다 위의 1번 문제와 다른 점은 이제 중복 한것도 표시를 해야 한다는 것 빼곤 1번문제와 같은 문제이다  

하지만 위 문제 처럼 중복을 허용하지 않기 때문에 더이상 set으로 문제 풀기 어렵다 왜냐 하면 num1의 요소가 몇개 있는지 확인을 해야 하기 때문이다 그래서 각 요소가 몇번 반복되는지 map을 통해 구해주고 문제를 해결한다 처음에는 위에 솔루션에서 해결 해보려고 하였는데 중복을 제거하는 set으로는 구해지지 않을것을 알게 되었고 솔루션을 통해 문제를 해결 하였다    

<br>




```c++
class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) 
    {
        unordered_map<int,int> map;
        vector<int> ans;

        for(int i=0;i<nums1.size();i++)
        {
            map[nums1[i]]++;
        }
        for(int i=0;i<nums2.size();i++)
        {
            //value not 0
            if(map[nums2[i]]>0)
            {   
                map[nums2[i]]--;
                ans.emplace_back(nums2[i]);
            }
        }

        return ans;
        
    }
};

```