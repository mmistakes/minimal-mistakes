---
layout: single
title:  "hash 개념 및 문제"
categories: [c++,set,hash,map,hash function,hash problem,algorithm,hash table]
tag : [c++]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---


### hash 개념 

set,map 자료 구조 정리한 포스팅 있는데 참고하면 좋다!   


hash_value / bucket count ==> hash table의 index가 나온다   

삽입,탐색,삭제 ==> O(1) time complexity를 가진다 

hash table의 value는 연결리스트로 이어져 있는데(같은 hash값 나오면 연결리스트에 추가가 된다) 그래서 최악의 경우 탐색 시간이 O(n)될수있다 연결리스트를 탐색하기 때문이다
vector에서도 강조 되었지만 메모리가 낭비되지 않는선에서 reserve하는게 중요하다 -> rehashing 현상을 막아야 한다 

<br>



좋은 hash는 메모리 낭비 하지 않고 충돌이 최소가 되는것이다 




### hash 문제 리스트 

[two-sum](https://leetcode.com/problems/two-sum/description/)

[find first unique char](https://leetcode.com/problems/first-unique-character-in-a-string/)

[isomophic string](https://leetcode.com/problems/isomorphic-strings/)

[valid anagram](https://leetcode.com/problems/valid-anagram/)

[world pattern](https://leetcode.com/problems/word-pattern/)

____


### hashmap second value기준으로 찾고 싶을때

find_if를 사용하면 된다  

```c++
#include <iostream>
#include <unordered_map>
int main()
{
    std::unordered_map<std::string, int> myMap = { {"apple", 1}, {"banana", 2}, {"cherry", 3} };
    auto it = myMap.find("banana");
    if (it != myMap.end()) {
        std::cout << "The value of the key 'banana' is " << it->second << std::endl;
    } else {
        std::cout << "The key 'banana' is not found in the map" << std::endl;
    }

}
```
<br>



하지만 대부분의 코테에서는 c20을 지원하지 않기 때문에 실제로 풀려면 hashmap을 한개 더 만들어서 찾아야 한다!! 

<br>




또한 해쉬 맵에서 유용한 기술은 탐색 삽입이 강점인 만큼 어떤 합의 존재를 찾을때 유용하게 사용할수가 있다 

-------------------------
### two sum - hash version 

two sum문제는 array 문제에서 풀었던 문제이다 hash table을 사용해서 O(n)으로 풀수가 있다 코드는 다음과 같다     


```c++
class Solution 
{
public:
	vector<int> twoSum(vector<int>& nums, int target)
	{
		unordered_map<int, int> hash;

		for (int i = 0; i < nums.size(); i++)
		{
			if (hash.find(nums[i]) != hash.end())
			{
				return { hash[nums[i]],i };

			}
			hash.emplace(target - nums[i], i);
		}
        return {};

	}
};

```



-> hash table key에 target-nums[i]를 넣어서 필요한 숫자가 nums 배열 요소로 나오면 바로 return하는 구조로 문제를 풀수가 있다 



_____

### two sum 변형 문제 

two sum과 비슷한 문제인데 쌍이 몇개 있는지 반환하는 문제이다 얼핏 보면 위에와 같은 문제인것 처럼 보이지만 약간 다르다 
예를 들어 {3,3,3,3,3}, k=6이면 정답은 10개이다 즉 hashmap에서 k-num[i]가 있는지 없는지 유무에 따라 판단하게 되면 1번밖에 적용되지 않는다는 문제가 있다 그래서 이를 해결하기 위해 몇개가 있는지 확인할 필요가 있는것이다 
<br>



```c++
#include <iostream>
#include <unordered_map>
using namespace std;


int main() {
    // 여기에 코드를 작성해주세요.
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    unordered_map<int,int> map;

    int n=0,k=0,cnt=0;
    cin>>n>>k;

    for(int i=0;i<n;i++)
    {
        int temp=0;
        cin>>temp;
        long long diff =(long long)k-temp;
        cnt+=map[diff];
        map[temp]++;
    }
    cout<<cnt;
    return 0;
}
```


### find first unique char 


```c++
class Solution {
public:
    int firstUniqChar(string s) {
        unordered_map<char, int> hash_map;

        for (auto& ele : s)
        {


            hash_map[ele]++;
            
            
        }

        for (int i=0;i<s.size();i++)
        {
            if (hash_map[s[i]] == 1)
            {
                return i;
            }
        }
        return -1;
    }
};
```


------


### isomophic string 

대응 관계를 양방향으로 만족해야 하기 때문에 두개의 해쉬맵을 사용하였다  




```c++
class Solution 
{
public:
    bool isIsomorphic(string s, string t) 
    {
        unordered_map<char, char> temp;
        unordered_map<char, char> temp2;

        for (int i = 0; i < s.size(); i++)
        {
            if (temp.find(s[i]) != temp.end() )
            {
                if (t[i] != temp[s[i]])
                {
                    return false;
                }
            }
            if (temp2.find(t[i]) != temp2.end())
            {
                if (s[i] != temp2[t[i]])
                {
                    return false;
                }
            }
            temp[s[i]] = t[i];
            temp2[t[i]] = s[i];

        }
        return true;


    }
};
```


-----------


### valid anagram 

s,t 문자열이 anagram인지 판단하는 문제이다 

```c++
class Solution {
public:
    bool isAnagram(string s, string t) {
    
    unordered_map<char, int> compare;

	for (auto& ele : s)
	{
		compare[ele]++;

	}

	for (auto& ele : t)
	{
		if (compare.find(ele) != compare.end())
		{
			compare[ele]--;

		}
        else
        {
            return false;
        }
	}

	for (auto& ele : s)
	{
		if (compare[ele] != 0)
		{
			return false;
		}
	}
	return true;
        
    }
};
```

--------------------------------


### world pattern 

공백을 처리 하기 위해 string stream을 사용해 주었다 그리고 핵심은 양방향으로 패턴이 대응 되어야 하기 때문에 위에서 풀었던 문제 처럼 2개의 해쉬맵을 사용한다 패턴이 맞아야 하기 때문에 s가 남거나 t가 남는 상황이 있다면 바로 false를 반환한다  

<br>




```c++
class Solution 
{
public:
    bool wordPattern(string pattern, string s) 
    {
        stringstream os(s);
        string token;
        unordered_map<char, string> m1;
        unordered_map<string, char> m2;

        for (int i = 0; i < pattern.size(); i++)
        {

            os >> token;

            
            m1.emplace(pattern[i],token);
            m2.emplace(token, pattern[i]);
            if (pattern[i] != m2[token] || token!= m1[pattern[i]])
            {
                return false;
            }
        }

        if (m1.size() != m2.size()||os>>token)
        {
            return false;
        }


        return true;         
        


    }
};
```

