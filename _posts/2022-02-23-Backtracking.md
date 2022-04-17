---
layout: single
title:  "Backtracking 개념 및 관련 문제"
categories: [Backtracking,Recursive]
tag : [c++,python,Algorithm,LeetCode,Backtracking,Letter Combinations of a Phone Number,subsets,permutations,Combination Sum,restore_ip_adr,Word Search,valid sudoku, Sudoku Solver, N-Queen,Recursive,C++]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

### Intro

안녕하세요 이번 포스팅에서는 Backtracking을 다룰 예정입니다. 

Backtracking은 가지치기를 하는 알고리즘이라고 생각하면 됩니다. 정답을 찾은 조건이 맞다면 계속 탐색을 진행하고 아니면 탐색을 가지 않는 방법으로 진행 됩니다. 
모든 경우의수를 모두 고려하다가 조건이 맞지않으면 다시 돌아간다 이게 핵심입니다. 


DFS같은 경우 Backtracking처럼 불필요한 경로를 판단하는 경우가 없이 모든 경우를 탐색합니다. (DFS와 Backtracking 차이)


DP같은 경우는 문제를 sub문제로 나누고 푸는 분할 정복 느낌이 있는 알고리즘이기 때문에 Backtracking과 차이가 있습니다. 


가지치기 최적화를 얼마나 하느냐에 따라 성능 차이가 난다고 생각하시면 될것 같습니다. 

Backtracking , DFS, DP 모두 개념은 비교적 쉽게 이해 할수있지만 구현이 쉽지 않은 경우가 많이 있는것 같습니다.


Bactracking문제를 풀때 아래의 경우를 생각하시면 구현할때 도움이 될 것 같습니다. 

1. 종료 조건 
2. 다음 재귀함수가는 프로세스 설정 
3. 현재 프로세스 종료 설정 



1. Recursive할때 마다 무엇을 선택할것인가?
2. Base case는 무엇인가
3. 제약 생각하기
    * 언제 멈추고 Back하는지 조건을 생각하기 
4. Base case로 부터 오는 우리의 target이 무엇인지 생각하기 






-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


### 문제 링크 

[1번 Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)
{: .notice--danger}

[2번 Backtracking subsets ](https://leetcode.com/problems/subsets/)
{: .notice--danger}
[3번 permutations](https://leetcode.com/problems/permutations/)
{: .notice--danger}
[4번 Combination Sum](https://leetcode.com/problems/combination-sum/)
{: .notice--danger}
[5번 restore_ip_adr](https://leetcode.com/problems/restore-ip-addresses/)
{: .notice--danger}
[6번 Word Search](https://leetcode.com/problems/word-search/)
{: .notice--danger}
[7번 valid sudoku ](https://leetcode.com/problems/valid-sudoku/)
{: .notice--danger}
[8번 Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)
{: .notice--danger}
[9번 N-Queen](https://leetcode.com/problems/n-queens/)
{: .notice--danger}

사실 문제가 더 있긴 합니다만 추후에 업로드 하는 방식으로 하겠습니다. ㅠ v ㅠ



-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 1번 Letter Combinations of a Phone Number

문제 자체를 이해하는데 큰 어려움은 없는 문제 일것입니다.

모든 경우를 출력하면 되는 문제 입니다. 

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]



* c++ 코드 


```c++
class Solution 
{
  //전화 번호부와 매칭한 배열
	vector<string> arr = { "","", "abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
	
  //입력 받은 숫자 
  string num = "";

	//결과 반환하는 벡터 배열 
  vector<string> result;
public:
	
  // 1.recursion할때 마다 무엇을 선택할 것인가
  //str,idx를 재귀함수 할때마다 고려할 것이다
	void BT(string str, int idx)
	{
    //num의 사이즈와 같을때까지 반복한다 
    //Base case 
		if (str.size() == num.size())
		{
			result.emplace_back(str);
			return;
		}

    
		for (auto& e : arr[num[idx] - '0'])
		{
      //다음 재귀함수 프로세스와 현재 프로세스 종료 설정
			BT(str+e, idx + 1);
		}
	}
	
	vector<string> letterCombinations(string digits) 
	{
    //빈 문자이면 빈 배열 반환 -> 예외 상황 처리 
		if (digits == "")
		{
			return {};
		}

    //입력 받은 숫자를 num에 넣는다
		num = digits;
		BT("", 0);

		return result;

	}
};
```




-----------------------------------------------------------------------------------------------------------------------------------------------------


### 2번 Backtracking subsets


이번 문제는 중복이 없는 subset을 구하는 문제 입니다. 각 문자를 뽑는 경우 아닌경우를 나누어서 생각하면 됩니다. 


* c++ 코드 

```c++
class Solution {
    vector<vector<int>> result;
    vector<int> num;
public:

    //idx, letter를 매개 변수로 넣으면서 진행 
    void BT(int idx, vector<int>& letter)
    {
      //base case 종료 조건 
        if (idx == num.size())
        {
            result.emplace_back(letter);
            return;
        }

       
        //해당 문자 안 뽑는 경우
        //다음 재귀함수 프로세스 설정 
        BT(idx + 1, letter);
        
        letter.emplace_back(num[idx]);    //해당 문자를 추가한다 

        //해당 문자 뽑는 경우
        //현재 프로세스 종료 설정
        BT(idx + 1, letter);
        letter.pop_back();    //원상 복귀 

    }

    vector<vector<int>> subsets(vector<int>& nums)
    {
        num = nums;
        vector<int> letter;

        
        BT(0, letter);

        return result;

    }
};
```


이번 문제는 문자를 뽑고 안뽑고 진행하는 모델을 먼저 생각하고 backtracking으로 진행하는게 중요한 문제 였습니다. 

Time : O(n 2^n)

    * 진행 될때마다 2배씩 늘어나기 때문에 2^n이고 이 과정이 n번 수행 되기 때문입니다.  


Space : O(n) 


-----------------------------------------------------------------------------------------------------------------------------------------------------

### 3번 permutations


이번 문제는 순열 문제 입니다. 결과 값의 개수는 n!만큼 나올 것입니다. 


왜 n!의 개수가 나오는지 생각해보면 이해하기 쉬워질 것입니다. 

1 2 3 4가 있다면 처음 경우만 생각 해보겠습니다. 

1 2 3 4   
2 1 3 4   (1과 2를 swap한 결과)
3 1 2 4   (2와 3을 swap한 결과)
4 1 2 3 (3와 4을 swap한 결과)이 가능 할것입니다. (아래 for반복문이 swap하는 이유 )

각 반복문의 BT함수는 1 2 3 4일때 2 1 3 4일때를 차례대로 들어가면서 가능한 순열의 경우를 탐색해 나갑니다. 

(1 2 3 4는 또 다시 여러개의 순열로 이루어질수있습니다. 2를 대상으로 다시 swap합니다.)




* c++ 코드 

```c++
class Solution {
	vector<vector<int>> ans;
public:
	void BT(int idx, vector<int> nums)
	{
    //base case 
		if (idx == nums.size())
		{
			ans.emplace_back(nums);
			return;
		}

    //idx부터 swap하는 반복문 
    //현재 프로세스 종료 설정 
		for (int i = idx; i < nums.size(); i++)
		{
      //다음 재귀함수 프로세스 설정
			swap(nums[idx], nums[i]);
			BT(idx + 1, nums);
			
		}
	}
	vector<vector<int>> permute(vector<int>& nums) 
	{
		BT(0, nums);

		return ans;
	}
};

```

-----------------------------------------------------------------------------------------------------------------------------------------------------

### 4번 Combination Sum



이번 문제에서 고려할 점은 후보 배열의 원소가 반복해서 사용될수있다는 것입니다. 


* c++ 코드 

```c++
class Solution {
	vector<vector<int>> result;
	vector<int> num;
public:

	void BT(int idx, int target, vector<int> arr)
	{
    //base case 종료 조건 
		if (target == 0)
		{
			result.emplace_back(arr);
		}
		else if (target < 0)		//target==0되고 한번 더 들어오면 종료한다 
                            //back하는 조건
		{
			return;
		}
  /*
    입력 배열 원소가 반복될수있기 때문에 반복문 설정을 잘 해주어야하는데
    현재 원소 인덱스 부터 시작할수있게 idx설정한다 
  
  */
		for (int i = idx; i < num.size(); i++)
		{
			arr.emplace_back(num[i]);

			BT(i, target - num[i], arr);    //다음 재귀함수 프로세스 설정 i번째부터 시작하기 위해 idx = i , 
                                      //target-num[i]해서 target탐색
      //현재 프로세스 종료 설정 
			arr.pop_back();
		}
		return;

	}
	vector<vector<int>> combinationSum(vector<int>& candidates, int target) 
	{
		num = candidates;
		vector<int> arr;
		BT(0, target, arr);

		return result;
	}
};
```



사실 앞에 3문제는 backtracking문제라기 보다 Recursive, DFS문제에 가깝다고 생각합니다. 
거의 모든 경우를 탐색하기 때문입니다. 하지만 이번 문제는 그나마 조건을 보고 아니면 back하는 프로세스를 조금 
느끼실 수 있던 문제였다고 생각 합니다. 


-----------------------------------------------------------------------------------------------------------------------------------------------------

### 5번 restore_ip_adr


문제 이해가 안될수도 있기 때문에 추가 설명을 먼저 하겠습니다. 


ip version 4의 ip Format은 다음과 같습니다. (8bit를 4개 쓸수있다는 의미와 동일 합니다. 8bit의 범위는 0~255)


IP Format : (0-255).(0-255).(0-255).(0-255)

문제에서 invalid ip가 왜 안되는지 이해 했을 것 이라고 생각 됩니다. 


invalid한 ip 조건 

1. leading 0오면 안된다 
2. ip format을 넘어가는 숫자 오면 안된다 즉 255이상 0이하의 숫자가 오면 안됩니다. 



가능성을 파악하는 문제 => Backtracking 문제 입니다.


 **BASE CASE**

 1. Catch answer 

          -> vector<string>에 추가를 해야한다 그러려면 일단 string s끝까지 탐색이 되어야한다 
          그리고 . 기준 정수 개수가 정확히 4개 여야한다  그래야 ip version 4이다 

 2. Dead Path 

          2-1 )	. 기준으로 정수가 4개 이상인 경우는 더 안봐도 된다 
          2-2)	비교 숫자가 0-255범위를 벗어난다면 더 안봐도 된다 


**Process**

1. Choose 

        0-255 범위를 확인을 해야한다 그러면 1자리부터 100자리까지 모든 가능성을 확인해야한다 

2. Explore

        0-255 범위가 맞다면 추가 하면서 recursive 로 탐색해나간다 

3. Unchoose 

        3-1)	0-255 범위를 벗어난다면 선택하지 않고 다음으로 넘어간다 
        3-2)	leading 0가 있다면 더이상 가지 않고 다음으로 넘어간다 



* c++ 코드 

```c++
class Solution 
{
	vector<string> res;

public:
	
	void BT(string t, int counter, string& s, int pos)
	{
		// counter 는 . 기준으로 정수가 4개를 넘어가는지 아닌지 확인하는 변수 
		//pos는 대상 s끝까지 갔는지 확인하는 변수 

		//BASE CASE in BT 

		if (pos == s.size() && counter == 4)
		{
			t.pop_back();		//t 마지막에 . 을 제거하기 위함이다
			res.emplace_back(t);
			return;
		}

		// .기준으로 정수가 4개 넘어갔을때   DEAD PATH 
		if (counter > 4)
		{
			return;
		}

		for (int start = 1;  start <= 3 && pos + start <= s.size(); start++)
		{
			string temp = s.substr(pos, start);
			stringstream os;
			os.clear();

			//Unchoose in BT    leading 0를 선택하지 않는다 
			if (temp.size() > 1 && temp[0] == '0')
			{
				continue;
			}

      //문자열-> 정수 변환 
			os.str(temp);
			int val = 0;
			os >> val;
			
			//Choose in BT 
			if (val <= 255 && val >= 0)
			{
				string kl = t + temp+'.';  //1자리부터 . 붙히면서 모든 가능성을 본다 
				//왜냐하면 정확히 4개의 정수로 나누어 떨어져야하기때문이다 그리고 0-255범위이기때문에 start는 1부터 3인것이다 

				
				//pos+start 는 다음으로 넘어간다는 의미이다 
				BT(kl, counter + 1, s, pos + start);
				
			}



		}


	}

    vector<string> restoreIpAddresses(string s) 
	{
		BT("", 0, s, 0);
		return res;
    }
};

```


이번 문제를 통해 backtracking을 좀더 이해 할수있었을것이라고 생각 됩니다. 
모든 가능성 중에서 원하는 조건일때만 탐색을 진행하고 아니라면 빠져나가는 가지치기를 경험 할 수 있었습니다.



-----------------------------------------------------------------------------------------------------------------------------------------------------

### 6번 Word Search


이번 문제는 word search 문제 입니다. grid에서 해당 word가 있으면 T아니라면 F를 반환하는 문제 입니다. 
한 문자 기준으로 위 아래 왼쪽 오른쪽 4방향으로 이동할수있습니다. 


해당 단어가 있는지 모든 경우를 우선 탐색해야합니다. 탐색 과정 속에서 조건이 맞지 않으면 back을 해야 하는 문제이므로 backtracking문제입니다. 


문제 전략은 스타트 지점에서 4방향을 모두 탐색을 이어갈것입니다. 4방향중에서 하나라도 true가 나온다면 해당 word가 존재한다는 의미이므로 true를 반환 할 것입니다.


스타터 지점을 찾고 탐색을 이어가는게 핵심입니다. 



* c++ 코드

```c++
class Solution 
{
    string temp;

public:

    bool BT(vector<vector<char>>& board,int idx,int row,int col)
    {
				//base case 

        //size에 도달하면 True
        if (idx==temp.size())
        {
            
            return true; 
        }

				//back 조건 
        //board를 벗어나는 경우 그리고 다음 row col이 temp[idx]가 아니라면 false를 반환한다 
        if (row < 0 || col < 0 || row >= board.size() || col >= board[0].size() || board[row][col] != temp[idx])
        {
           
            return false;
        }

      

        board[row][col] = ' ';

				//다음으로 탐색 하는 프로세스 설정 
        //4방향에 대해서 모든 경우에 T/F를  or개념으로 묶는다 하나라도 true가있으면 true를 출력한다 
        bool res = BT(board, idx + 1, row - 1, col) ||
            BT(board, idx + 1, row, col - 1) ||
            BT(board, idx + 1, row, col + 1) ||
            BT(board, idx + 1, row + 1, col);


        //' '공백으로 바꾼 곳을 원상복구한다   => 그래야 여러 스타트 지점이 있어도 탐색을 이어나갈수있다 
        board[row][col] = temp[idx];

        return res;
        
        

    }
    bool exist(vector<vector<char>>& board, string word) 
    {
        temp = word;
      
      
        for (int i = 0; i < board.size(); i++)
        {
            for (int j = 0; j < board[0].size(); j++)
            {
                //word[0]스타트 지점을 찾는다 그리고 BT가 T일때 찾는 문자가 있는것이다 
                if (board[i][j]==word[0]&& BT(board, 0, i, j))                      //스타트 지점에 4방향을 돌아봤을때 word가 있다는 의미이다 
                {
            
                    return true;

                }
            }


                       
            
        }


        return false;
    }
};
```



원상복구를 하는 부분 **board[row] [col] = temp[idx]** 이 부분이 있어야 스타트 지점이 여러개 있어도 탐색을 이어갈 수 있었습니다.




-----------------------------------------------------------------------------------------------------------------------------------------------------




### 7번 valid sudoku

스도쿠가 유효한지 판단하는 문제입니다. 사실 이 문제는 Backtracking을 쓰지 않고도 풀수있는 문제입니다. 그래서 이번 문제는 backtracking을 사용하지않고 문제를 풀어 보겠습니다. 



**주의**
사실 이어지는 문제 8번을 풀다가 추천 문제에 있어서 풀어본 문제라서 backtracking관련 문제는 아니지만 이어지는 문제도 스도쿠 문제이기 때문에 이번 문제를 이해하시면 다음 문제를 이해하는데 도움이 될 것 같아서 이번 포스팅에 넣어 보았습니다. bactracking문제만 풀고 싶으시면 이 문제는 넘어가셔도 됩니다.  




스도쿠의 규칙은 9 * 9 행렬에서 각 가로줄에는 중복되지 않는 숫자 1-9 ,각 세로줄 , 3 * 3 행렬도 마찬가지로 중복 되지 않는 숫자 1-9가 있어야 합니다 

유효한지 판단하려면 위의 규칙을 지켰는지 확인을 하면 됩니다. 




* c++ 코드 

```c++
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) 
    {
			//hash set 설정 
			//각 row, col , 3*3행렬에 중복되지 않는 1-9를 넣는 해쉬이다 
        unordered_set<string> seen;

				//9*9 행렬 탐색 
        for (int row = 0; row < 9; row++)
        {
            for (int col = 0; col < 9; col++)
            {
							//값이 있다면
                if (board[row][col] != '.')
                {

										//각 row,col ,3*3행렬에 값이 있다는것을 표시 하기 위한 변수들 
                    string row_str = "R" + to_string(row) + board[row][col];		
                    string col_str = "C" + to_string(col) + board[row][col];
                    string sub_arr = "B" + to_string(row / 3) + to_string(col / 3) + board[row][col];		//3*3 행렬 고려해야하기때문에 /3한다

										//hash에 있다면 false 
                    if (seen.find(row_str) != seen.end() ||
                        seen.find(col_str) != seen.end() ||
                        seen.find(sub_arr) != seen.end())
                    {
                        return false;
                    }
										//hash에 값 넣는다 (중복되지 않는 1-9)
                    seen.emplace(row_str);
                    seen.emplace(col_str);
                    seen.emplace(sub_arr);

                }
            }
        }
        return true;
    }
};
```

해쉬 셋에 각 row, 각 col, 각 3*3행렬의 유효한 값을 저장합니다. 만약 해쉬셋에서 중복된 값을 발견하면 false를 반환하는 구조 입니다. 


스도쿠가 유효한지 아닌지만 판단하면 되는 문제 였기 때문에 큰 어려움은 없었을 것 입니다.  



-----------------------------------------------------------------------------------------------------------------------------------------------------


### 8번 Sudoku Solver


앞에 7 번 문제를 보시고 왔다면 이 문제를 이해하는데 도움이 될것입니다. 앞의 문제와는 다르게 난이도가 있는 문제 입니다. 
이번 문제는 스도쿠를 직접 푸는 문제입니다. 

빈 곳에 1-9중복되지 않는 숫자를 스도쿠 규칙에 맞추어서 풀어야합니다. 

그래서 입력으로 들어온 grid를 전체 탐색하면서 빈곳에 값을 넣어줄것인데 스도쿠 규칙에 따라 각 row,각 col , 각 3*3행렬에 넣으려는 값이 중복하는지 안하는지 확인을 하면서 값을 삽입해야합니다. 



* c++ 코드 

```c++
class Solution {
public:
    pair<int, int> isEmpty(vector<vector<char>>& board)
    {
        for (int i = 0; i < 9; i++)
        {
            for (int j = 0; j < 9; j++)
            {
                if (board[i][j] == '.')
                {
                    return make_pair(i,j);
                }
            }
        }

        return make_pair(10, 10);   //9*9 matrix를 다 마친 경우 

    }

    bool check_row(int x, char val, vector<vector<char>>& board)
    {
        for (int i = 0; i < 9; i++)
        {
            if (board[x][i] == val)         //각 row에 같은 val있으면 조건에 맞지않는다
            {
                return false;
            }
        }
        return true;
    }
    bool check_col(int y, char val, vector<vector<char>>& board)
    {
        for (int j = 0;j < 9; j++)
        {
            if (board[j][y] == val)
            {
                return false;
            }
        }
        return true;
    }

    bool check_box(int x, int y, char val, vector<vector<char>>& board)     //sub box 모두를 탐색할것이다 
    {
        int X = x / 3;  // 빈곳 row 
        int Y = y / 3;  //빈곳 col    의 sub box위치 

        //각 sub box의 범위를 가리키기 위함이다 
        X = 3 * X;
        Y = 3 * Y;

        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {

                //sub box에 같은 val 있으면 false
                if (board[X + i][Y + j] == val)
                {
                    return false;
                }
            }
        }
        return true; 


    }
    bool solve(vector<vector<char>>& board)
    {
        pair<int, int> empty_slot = isEmpty(board);

        if (empty_slot.first == 10 && empty_slot.second == 10)
        {
            //9*9 모든 경우를 다 탐색 한 경우이다 

            return true;        //catch ans  => 9*9 다 돈 경우 정답을 출력할수있다 
        }
        int row = empty_slot.first;
        int col = empty_slot.second;
        for (char val = '1'; val <= '9'; val++)
        {
            if (check_row(row, val, board) && check_col(col, val, board) && check_box(row, col, val, board))
            {
                board[row][col] = val;          //choose 조건에 맞는 다면 val로 교체한다 
                
                if (solve(board))       //Explore 계속 탐색해 나간다 
                {
                    return true;
                }
                board[row][col] = '.';          //unChoose  조건에 맞지 않는 val이면 다시 원상 복구 한다 
            }
        }
        return false;    //Dead path 조건 맞지 않으면 backtracking 한다 
    }
    void solveSudoku(vector<vector<char>>& board) 
    {

        solve(board);

    }
};

```


간단히 다시 리뷰를 해보면 빈곳에 1-9값을 넣어줄것인데 유효한지 각 row,col 3*3행렬 조건을 따져 줍니다. 계속 진행을 하다가 끝나는 조건 (9 * 9행렬 모두 돈 경우)일때 종료를 합니다. 
그 전까지는 solve가 계속 탐색을 진행 합니다. 그래서 if문은 solve가 끝나는 조건을 만나야 비로소 연쇄적으로 true를 반환하면서 함수가 끝나게 됩니다. 

유효한 값의 가능성을 계속 탐색하면서 값이 유효하지 않다면 바로 이전으로 돌아가는 성질의 문제이므로 backtracking문제로 볼수있었습니다. 
->스도쿠 조건에 따라 검사를 진행하는 과정은 7번 문제를 풀어보시면 더 쉽게 이해하실수있을 것 입니다. 




-----------------------------------------------------------------------------------------------------------------------------------------------------


### 9번 N-Queen


마지막 문제는 N-Queen 문제입니다. 이 문제는 backtracking의 성질을 잘 보여주는 대표적인 backtracking 문제입니다. 


n이 주어질때 n * n의 보드에서 n개의 퀸이 서로 공격하지 않도록 보드에 배치하는 문제입니다. 체스에서 퀸은 대각선 ,수직 , 수평으로 이동 할수있습니다. 
서로 공격하지 않도록 배치해야 하므로 대각선 , 수평, 수직에 다른 퀸이 배치되어있으면 안됩니다. 이때 정답은 하나가 아닐수있습니다. 



8번 문제와 비슷한 유형의 문제라고 보시면 될것 같습니다. 스도쿠 문제를 풀때 또한 조건에 따라 처리를 해주었는데 이번에는 퀸의 성질에 따라 조건을 처리 하면 됩니다. 



우선 n = 4라고 가정하고 설명을 이어가겠습니다. 그러면 4 * 4 행렬에서 답을 찾아가야합니다. 
0부터 16번째까지 모두 Q의 자리를 찾아서 탐색해 나간다면 O(4*16^(16+1))이 걸릴것입니다. 4는 왜 곱해지냐면 col과 대각선을 확인할때 걸리는 시간이 있기 때문입니다. 

저희는 이 Time을 더 최적화 해야합니다. 여기서 더 생각 해볼수있는것은 같은 row에 2개의 퀸이 올수없다는 것입니다. 그렇다면 각 row에 대해서 위치를 정해주고 이어 갈 수 있다면 

TIME : O(4*4^(4+1))로 줄일수 있을 것입니다. (row을 따로 검사 하지 않아도 되는 이유 )


아래 c++코드가 위와 같은 프로세스로 진행 되었습니다. 






* c++ 코드 


```c++
class Solution {
public:

    void set_board(vector<string>& board, int& n) { // 보드 만들기 


        board.reserve(n);			//n개 만큼 크기 설정
        
				//char vector로 입력이 오기 때문에 string으로 묶는 과정 
				string s = "";
        for (int i = 0; i < n; i++) {
            s = s + '.';
        }

				//묶은 string을 보드로 만드는 과정 
        for (int i = 0; i < n; i++) {
            board.emplace_back(s);
        }
        return;
    }

		//퀸의 성질 확인하는 함수 
    bool check_safe(vector<string>& board, int& row, int& col, int& n) {



        for (int i = 0; i <= row; i++) { // col확인 같은 col에 Q있으면 false 
            if (board[i][col] == 'Q') {
                return false;
            }
        }

				//대각선 확인할때 현재 row보다 아래의 대각선 위치는 고려 하지 않는다 
        int i = row;
        int j = col;
        while (i >= 0 && j >= 0) { // 현재 row 기준 왼쪽 대각선 확인 
            if (board[i][j] == 'Q') {
                return false;
            }
            i--;
            j--;
        }

        i = row;
        j = col;
        while (i >= 0 && j < n) { //현재 row 기준 오른쪽 대각선 확인 
            if (board[i][j] == 'Q') {
                return false;
            }
            i--;
            j++;
        }

        
        return true;

    }

    void nqueen(vector<vector<string>>& sol, vector<string>& board, int row, int& n) {

				//n*n행렬이기 때문에 row가 n과 같아지면 모두 탐색 했다는 의미 이므로 종료 
				//base case 
        if (row == n) {

            sol.emplace_back(board);
            return;
        }

        for (int i = 0; i < n; i++) { // n*n행렬이기 때문에 row, col모두 0~n-1까지의 범위 가진다 

						//각 row마다 퀸 자리 정해준다 
            if (check_safe(board, row, i, n)) {
                board[row][i] = 'Q';

								//현재row에 Q넣고 다음 row부터 다시 탐색 한다 
                nqueen(sol, board, row + 1, n);		
                board[row][i] = '.';					//중복하는 답을 찾기 위해 원상 복귀 한다 
            }
        }

        return;
    }
    vector<vector<string>> solveNQueens(int n) {

        vector<vector<string>> sol;		//결과 배열 

        vector<string>board;		//n 배열 보드 

        set_board(board, n);		//n 보드 만들기 

        nqueen(sol, board, 0, n);		//탐색 시작 

        return sol;
    }
};

```


col과 대각선을 해결할때 O(N)의 time쓰는것 보다 O(1)으로 최적화 할수도 있는데 hashset을 이용해주면 가능합니다. 


row에 Q정해졌다면 그때 col위치를 hash에 넣어줍니다 그리고 마지막에 row에서 Q넣을 때 기존 처럼 모두 검사하는것이 아니라 hashset에서 없는 위치를 찾아서 넣어주면 O(1)으로 해결 할 수있습니다. 


대각선의 경우는 왼쪽 대각선과 오른쪽 대각선을 따로 생각을 해주어야 하는데 좌표를 (x,y)로 가정 해보겠습니다. 

왼쪽 대각선의 경우 x==y이기 때문에 x-y=0입니다.  

오른쪽 대각선의 경우 x+y의 값이 일정하다는 성질이 있습니다.  이 특성을 이용해서 hashset을 만들어준다면 대각선 처리 또한 O(1)으로 해결 가능합니다. 


아래의 python 코드는 위의 프로세스의 결과 입니다. 


* python 코드 

```python
from typing import List


class NQueens:
  def solve(self, n: int) -> List[List[str]]:
    self.__results = []
    self.__col_set = set()  #column duplicates
    self.__diag_set1 = set() #row-col duplicates
    self.__diag_set2 = set() #row+col duplicates
    self.__n = n  #length
    
    for x in range(n):
      self.__bt(0,x,[])
    
    return self.__results
    
  #python str is immutable 보드 만들기 
  def __create_str_row(self, col:int) -> str:    
    str_list = ['.']* self.__n
    str_list[col] = 'Q'    
    return ''.join(str_list)  
  
  def __bt(self, row:int, col:int, board:List[str]):    
    #exit conditions base case 
    if row==self.__n or col==self.__n:
      return
    if col in self.__col_set:
      return

		# 왼쪽 대각선 성질
    diag1_info = row-col

		#오른쪽 대각선 성질 
    diag2_info = row+col

		# 설정한 hash에 값이 있다면 return 
    if diag1_info in self.__diag_set1:
      return
    if diag2_info in self.__diag_set2:
      return 
    
    #process
    str_line = self.__create_str_row(col)
    board.append(str_line)
    
    if len(board) == self.__n:
      self.__results.append(board.copy())
      board.pop()
      return
    
    #duplicates sets  hash set 설정 
    self.__col_set.add(col)
    self.__diag_set1.add(diag1_info)
    self.__diag_set2.add(diag2_info)
    
    #recursive calls
    for x in range(self.__n):
      self.__bt(row+1,x,board)      
    
    #duplicates sets pop
    self.__diag_set2.remove(diag2_info)
    self.__diag_set1.remove(diag1_info)
    self.__col_set.remove(col)
    board.pop()

nQsolver = NQueens()

```




-----------------------------------------------------------------------------------------------------------------------------------------------------

### 마무리 

이번 문제를 통해 bactracking에 대한 감을 잡는 시간이 되었으면 좋겠습니다. 특히 마지막 문제는 유명하고 대표적인 문제인 만큼 여러번 보고 이해하는 것을 추천 드립니다. 

긴 글 읽어 주셔서 감사합니다. 



