---
layout: single
title:  "알고리즘 소개 및 방향"
categories: Array
tag: [c++,python,LeetCode,Array,moveZeros,Find pivot index,Minimum size subarray sum,Merge sorted Array,Find peak element,Merge intervals ,Shortest Unsorted continuout subArray ,Find duplicate number ,Two sum,Rotate Image 2D array ,search 2D matrix
]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

### Intro

풀어볼 문제는 총 11한 문제입니다. 링크 달았으니까 참고 자세한 문제 설명은 참고하시면 될것같습니다.

이번 포스트에서는 총 11한 문제에 대한 저의 코드와 생각들을 정리합니다. 

내용이 길어질수있으니 문제 목록을 참고하셔서 필요한 부분만 보는것을 추천합니다. 


### 배열 정리 

읽기를 할때 가장 효율이 좋은 자료 구조인 것 같습니다. 
첫 주소를 알고 있으므로 index만 안다면 한 단계로 읽을수있다는 장점이 있습니다. 

삽입을 할 때 또한 마지막 요소에 삽입하는 경우 한 단계로 삽입할수있습니다. 
하지만 요소를 앞 또는 중간에 삽입 , 검색, 삭제 하는 경우 최대 N의 시간이 걸릴수있습니다. 


배열 문제를 풀때는 index를 다루는 것에 익숙해질 필요가 있었습니다. 

### 풀어볼 문제 링크 LeetCode

**[1번_moveZeros]** (https://leetcode.com/problems/move-zeroes/)
{: .notice--danger}


**[2번_Find_pivot_index]** (https://leetcode.com/problems/find-pivot-index/)
{: .notice--danger}


**[3번_Minimum_size_subarray_sum]** (https://leetcode.com/problems/minimum-size-subarray-sum/)
{: .notice--danger}

**[4번_Merge_sorted_Array]** (https://leetcode.com/problems/merge-sorted-array/)
{: .notice--danger}

**[5번_Find_peak_array]** (https://leetcode.com/problems/find-peak-element/)
{: .notice--danger}

**[6번_Merge_Intervals]** (https://leetcode.com/problems/merge-intervals/)
{: .notice--danger}

**[7번_Shortest_Unsorted_continuout_subArray]** (https://leetcode.com/problems/shortest-unsorted-continuous-subarray/)
{: .notice--danger}

**[8번_Find_duplicate_number]** (https://leetcode.com/problems/find-the-duplicate-number/)
{: .notice--danger}

**[9번_Two_sum]** (https://leetcode.com/problems/two-sum/)
{: .notice--danger}

**[10번_Rotate_Image_2D_array]** (https://leetcode.com/problems/rotate-image/)
{: .notice--danger}

**[11번_search_2D_matrix]** (https://leetcode.com/problems/search-a-2d-matrix/)
{: .notice--danger}



###  1 번 moveZeros


moveZero의 내용을 먼저 보시면 
