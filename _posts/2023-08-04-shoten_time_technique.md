---
layout: single
title:  "shoten time technique"
categories: [prefix sum, Grid compression,LR technique,+1-1 techique,two pointer, 전처리]
tag : [c++,python,Algorithm,LeetCode,Heap,Kth Largest Element in an Array,Top K Frequent Elements,Merge k Sorted Lists ,Find the Kth Largest Integer in the Array,디스크 컨트롤러]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---



### intro 

코드 트리 알고리즘 기본 과정 중에서 shoten time technique에 해당하는 내용입니다

<br>



### prefix sum (구간합)

구간합을 만드는데 시간 : O(N)이다  
하지만 만든 이후 [a,b]구간의 합을 구할수가 있다 **S_(b) - S_(a-1)**으로 [a,b]구간의 합을 구할수가 있다 이때 S_0인 경우를 고려 하여야 하기때문에 초반에 0으로 설정 하여야 한다 - 우선 순위 큐 파트 부분 문제에서도 사용한 적이 있는데 실제로 다양하게 활용이 되고 있다     



<br>


(코드트리 정수 n개의 합_2)[https://www.codetree.ai/missions/8/problems/sum-of-n-integers-2?utm_source=clipboard&utm_medium=text]

<br>


n,k가 입력으로 주어질때 연속하는 k개의 합중 가장 큰 값을 출력하는 문제이다 최대 값을 구하는 문제니까 구간합 구간을 [i,i+k]로 설정 하면 된다 그리고 배운점이 N개의 사이즈 안에 i+k-1이 존재 해야 하니까 i의 반복문 조건을 구할수가 있다 (n-k+1) 좌변에 i만 남기고 우변으로 모두 이항한다    

```c++
#include <iostream>
#include <vector>

using namespace std;

int main() 
{
    vector<int>prefix_sum;
    vector<int>arr;
    prefix_sum.reserve(100000);
    arr.reserve(100000);
    int n=0,k=0;
    cin>>n>>k;
    for(int i=0;i<n;i++)
    {
        int t=0;
        cin>>t;
        arr.emplace_back(t);
    }

    prefix_sum[0] = 0;
    for(int i = 1; i <= n; i++)
        prefix_sum[i] = prefix_sum[i - 1] + arr[i];
    
    int max_val = -10000000000;

    //구간 범위 구하는 부분 
    for(int i=1;i<=n-k+1;i++)
    {
        max_val=max(max_val,prefix_sum[i+k-1]-prefix_sum[i-1]);
    }
    cout<<max_val;
    

    return 0;
}


```

<br>


(코드트리 정수 n개의 합3)[https://www.codetree.ai/missions/8/problems/sum-of-n-integers-3?utm_source=clipboard&utm_medium=text]

<br>


이번에는 2차원에서 구간합을 살펴 볼것이다 2차원에서 구간합 만드는 시간 O(N^2)이다 하지만 만들고 난 이후 구간합 배열 기반으로 넓이 구하는 부분은 O(1)이면 해결 가능하다는 장점이 있다   

위에 문제와 거의 동일하게 진행하면 된다 위에서 i의 구간을 구했던 것 처럼 2차원에서도 똑같이 i와 j에 대해 k개의 정사각형 넓이에 해당하는 범위를 설정 해야 한다

1. 구간합 만들기 -> 2차원 벡터 0으로 초기화 후에 **S(a,b) = S(a-1,b) + S(a,b-1) - S(a-1,b-1)+ A(a,b)** 공식을 사용해서 만들어 준다      

2. 만든 구간합 기반으로 k*k의 정사각형 넓이 중 최대 구하기 - convolutiond에서 kernel의 이동으로 생각하면 된다        
  + **S(x2,y2)-S(x1-1,y2)-S(x2,y1-1)+S(x1-1,y1-1)**   






```c++
#include <iostream>
#include <vector>
using namespace std;

//구간합을 이용해서 넓이 구하는 함수
int two_D_prefix_sum(int x1,int y1,int x2,int y2,vector<vector<int>>prefix_sum)
{
    return prefix_sum[x2][y2]-prefix_sum[x1-1][y2]-prefix_sum[x2][y1-1]+prefix_sum[x1-1][y1-1];
}

int main() 
{
    // 여기에 코드를 작성해주세요.
    int n=0,k=0;
    cin>>n>>k;
    vector<vector<int>> vec(n+1,vector<int>(n+1,0)); //n*n 2차원 벡터 설정 
    vector<vector<int>> prefix_sum(n+1,vector<int>(n+1,0)); //n*n 2차원 벡터 설정 
    
    for(int i=1;i<=n;i++)
    {
        for(int j=1;j<=n;j++)
        {
            int t=0;
            cin>>t;
            vec[i][j]=t;
        }
    }
    //구간합 만들기 
    for(int i=1;i<=n;i++)
    {
        for(int j=1;j<=n;j++)
        {

            prefix_sum[i][j]=prefix_sum[i-1][j]+prefix_sum[i][j-1]-prefix_sum[i-1][j-1]+vec[i][j];

        }

    }
    int max_val = -100000000;
    for(int i=1;i<=n-k+1;i++)
    {
        for(int j =1;j<=n-k+1;j++)
        {
            max_val=max(max_val,two_D_prefix_sum(i,j,i+k-1,j+k-1,prefix_sum));
        }
    }

    cout<<max_val;


    return 0;
}
```

문제 풀다 보면 유의 할점이 보이는데 입력 받을때 1~n까지를 고려 하고 zero padding을 하기 때문에 n+1사이즈로 벡터 할당 해야 한다  
그리고 2차원에서 구간합은 범위 설정을 잘해야 한다 



<br>



(코드 트리 문제 : subarray sum equal k)[https://www.codetree.ai/missions/8/problems/the-sum-of-the-subsequences-is-k?utm_source=clipboard&utm_medium=text]


<br>


이 문제같은 경우 요소값이 모두 양수이기 때문에 sliding window로 해도 문제가 풀리긴 하지만 이 문제에서는 시간 제한이 있기 때문에 sliding window말고 다르게 풀어야 한다 구간합을 이용해서 문제를 해결해야 하는데 
내가 푼 방식을 설명하면 다음과 같다. 누적값과 unordered_map을 활용할것이다 
우선 누적합을 map key에 저장을 할것이다 만약 중복된 값이면 ++를 통해 개수를 증가 해줄것이다 그리고나서 key-target의 값을 map에서 찾는다 만약 있다면 cnt를 증가 시킨다

```c++

#include <iostream>
#include <unordered_map>
using namespace std;

int main() 
{
    int n=0,k=0;
    int cnt=0,sum=0;
    unordered_map<int,int> map;
    
    //0초기화
    map[0]=1;
    cin>>n>>k;

    for(int i=0;i<n;i++)
    {
        int t=0;
        cin>>t;
        sum+=t;
        if(map.find(sum-k)!=map.end())
        {
            cnt+=map[sum-k];
        }
        map[sum]++;
    }
    cout<<cnt;

    return 0;
}
```




### LR Technique  

사용처가 불명확 부분이 있는 개념이다 아래에서 소개 하는 내용도 일부 내용일 뿐이다 지금 상황에서는 인접한 두 요소의 차이점에 초점을 맞추어서 LR을 보고있다고 개인적으로 생각이 든다 어쨌든 크게 보면 두개의 요소차이값에 대한 누적합을 L은 처음부터 진행 , R은 끝에서부터 진행 한 누적합 배열을 구성을 하고 문제를 푸는 방식인것 같다    

<br>



(코드트리 마라톤 중간에 택시타기)[https://www.codetree.ai/missions/8/problems/taking-a-taxi-in-the-middle-of-the-marathon?utm_source=clipboard&utm_medium=text]

<br>


이 문제를 보면 위에서 말한 내용이 무엇인지 조금 감을 잡을수있을것 같다 개념 설명 할때는 인접한 요소의 차이값으로 L,R을 채워나갔지만 이 문제에서는 맨하튼 거리계산값을 넣어야 한다 그리고 LR technique을 모르고 문제를 보면 모든 요소를 반복문으로 돌면서 맨하튼 거리 계산을 해야 할것이다 하지만 LR을 사용하면 더 적은 시간 복잡도를 사용할수가 있다 

문제에서 포인트 하나를 건너띄었을때 맨하튼 거리 값이 최소인 값을 반환하는 문제이다 건너띄는 포인트를 i라고 할때 L은 0~i-1까지이고 R은 i+1~n-1까지로 배열 인덱스를 설정할수가있다 그리고 i를 건너띄니까 i-1~i+1까지 맨하튼 거리 값을 더해주면 최종적으로 i를 건너띈 맨하튼 거리를 구할수가 있다 이를 코드로 나타내면 아래와 같다 

<br>


```c++
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

int main() 
{
    int n=0;
    cin>>n;

    vector<pair<int,int>> arr;

    //LR 배열 선언
    vector <int> L(n,0);
    vector <int> R(n,0);
    
    for(int i=0;i<n;i++)
    {
        int j=0,k=0;
        cin>>j>>k;
        arr.emplace_back(make_pair(j,k));

    }

    //L 
    for(int i=1;i<n;i++)
    {
        L[i]= L[i-1]+abs(arr[i-1].first-arr[i].first)+abs(arr[i-1].second-arr[i].second);
    }

    //R
    for(int i=n-2;i>=1;i--)
    {
        R[i]=R[i+1]+abs(arr[i+1].first-arr[i].first)+abs(arr[i+1].second-arr[i].second);
    }
    int ans = 10000000000;
    //모든 요소를 건너띄는 시뮬레이션 돌릴때 최소값 구하기 
    for(int i=0;i<n;i++)
    {
        ans=std::min(ans,L[i-1]+R[i+1]+abs(arr[i-1].first-arr[i+1].first)+abs(arr[i-1].second-arr[i+1].second));
    }
    cout<<ans;
    return 0;
}


```


### +1-1 tech

사용되는 상황이 비교적 명확하다 N개의 선분이 주어졌을때 몇개의 선분이 겹쳐 있는지 알고 싶을때 이 기술을 사용하면 된다 

선분의 시작점을 +1,끝점을 -1로 맵핑 해주고 x를 기준으로 정렬 하여서 sum을 보면 된다 그러면 x=k선분과 겹치는 선의 개수를 알수가 있다 가장 많이 겹치는 선분 개수를 알고 싶다면 x=k에서 break걸지 않고 매 sum값 마다 최대값 갱신을 해주면 된다 문제는 다음과 같다 

<br>


(코드트리 가장 많이 겹치는 구간)[https://www.codetree.ai/missions/8/problems/section-with-maximum-overlap?utm_source=clipboard&utm_medium=text]

<br>


```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <tuple>
using namespace std;
int main() 
{
    // 여기에 코드를 작성해주세요.

    int n=0;
    vector<pair<int,int>> v;

    cin>>n;
    for(int i=0;i<n;i++)
    {
        int x=0,y=0;
        cin>>x>>y;
        v.emplace_back(make_pair(x,1));
        v.emplace_back(make_pair(y,-1));

        

    }
    
    //x값 기준 정렬 
    sort(v.begin(),v.end());


    int sum_val=0;
    int max_val = 0;

    for(int i=0;i<2*n;i++)
    {
        sum_val+=v[i].second;
        max_val=max(max_val,sum_val);


    }
    cout<<max_val;

    return 0;
}
```

<br>



(코드트리 서로다른 구간의 수)[https://www.codetree.ai/missions/8/problems/number-of-distinct-segments?utm_source=clipboard&utm_medium=text]

<br>


모든 구간을 합친 이후 남아있는 서로 다른 구간의 수를 구하는 문제이다 
이 문제를 풀기 위해서 +-1 기술을 사용할것인데 구간을 합치려면 우선 겹치는 구간을 알아야 하기 때문에 x값 기준 정렬할것이다 그리고 나서 시작점 즉 +1값을 unordered_set에 삽입한다 그리고 끝점 -1이 나오면 set에서 삭제를 해줌으로써 같은 구간의 선분을 통합한다 이때 set의 사이즈가 0이면 새로운 구간이라는 의미 이므로 ans++하면 된다 


```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <tuple>
#include <unordered_set>

using namespace std;

int main() 
{

    
    //세쌍의 값을 받기 위해 tuple사용
    vector<tuple<int, int, int> > vec;
    int n=0;
    cin>>n;

    for(int i = 0; i < n; i++) {
        int x=0, y=0;
        cin>>x>>y;

        

        //(x좌표, +1-1값, 선분 번호)
        vec.emplace_back(make_tuple(x, +1, i));
        vec.emplace_back(make_tuple(y, -1, i)); 
    }


    sort(vec.begin(), vec.end());


    unordered_set<int> set;

    int ans = 0; 
    for(int i = 0; i < 2 * n; i++) 
    {
        
        // tuple 값 접근은 get으로 한다 

        //
        if(get<1>(vec[i]) == +1) 
        {
            //새로운 구간
            if((int) set.size() == 0)
                ans++;
            
            
            set.emplace(get<2>(vec[i]));
        }

        // -1 즉 끝점
        else 
        {
            
            set.erase(get<2>(vec[i]));
        }
    }
    
    
    cout << ans;
    return 0;
}


```

세쌍을 받기 위해 tuple을 사용했다 tuple값 접근 하는 방법 make_tuple하는 법 코드에 나와있으니 필요할때 찾아보면 좋을것 같다  



### 전처리 


brute force 방식으로 풀었을때 시간 초과 나는 문제를 전처리를 통해서 시간 초과 안나게 하는 방식인것 같다. 대표적으로 이중 포문을 돌아야 하는 상황이 많은것 같은데 그 과정에서 필요한게 무엇인지 파악해서 전처리를 한다면 시간을 줄일수있다는 전략이다. 

<br>


(괄호쌍 만들기)[https://www.codetree.ai/missions/8/problems/pair-parentheses?utm_source=clipboard&utm_medium=text]

<br>


위에 문제도 ((이 나올때 ))이 나오는 부분을 세주면 이중 반복문으로 문제를 해결할수있지만 시간 초과가 나는 문제가 있다 이 문제에서 전처리를 어떻게 해줄것인지 살펴보자  

우선 이중 반복문을 사용해서 문제를 푸는 경우의 코드 부터 살펴 보자 
```c++
#include <iostream>
int main()
{
    string s = ")((()())())";
    int ans =0;
    for(int i=0;i<s.size();i++)
    {   
        //연속한 여는 괄호 나오면
        if(s[i]=='(' &&s[i+1]=='(')
        {
            //연속한 닫는 괄호를 봐야 한다 
            for(int j=i+2;j<s.size();j++)
            {
                if(s[j]==')'&&s[j+1]==')')
                {
                    ans++;
                }
            }
        }
    }
    return 0;
}


```

위에 같은 방식으로 이중 반복문을 통해 문제를 해결할수가있다 하지만 시간초과가 나오기때문에 이를 해결하기 위해 전처리과정이 필요하다  


전처리를 위해 봐야 하는 곳은 두번째 반복문 부분이다 두번째 반복문에서 하고있는게 무엇인가 연속된 닫는 괄호의 개수를 반복문을 통해 확인하고 있다 이 부분을 매번 하지 말고 R배열에 미리 연속된 닫는 괄호가 나오는 부분을 알수가 있다면 계산할때 R배열에서 확인을 하면서 계산할수가 있다 

```c++
#include <iostream>
#include <string>
#include <vector>
using namespace std;
int main() 
{
    string str;
    cin>>str;
    vector<long long int> R(str.size(),0); //0으로 초기화

    //연속하는 닫는 괄호 개수 세는 배열 만들기 
    for(long long int i=str.size()-2;i>-1;i--)
    {
        //연속된 닫는 괄호의 경우
        if(str[i]==')'&&str[i+1]==')')
        {
            R[i]=R[i+1]+1;
        }
        else
        {
            R[i]=R[i+1];
        }
    }
    long long int ans=0;
    for(long long int i=0;i<str.size()-2;i++)
    {
        //연속된 여는 괄호의 경우
        if(str[i]=='('&&str[i+1]=='(')
        {
            ans+=R[i+2];
        }
    }
    cout<<ans;
    return 0;
}
```
