# Kadane’s Algorithm

1. Maximum Subarray

(문제 해석)

largest sum을 만드는 contiguous(연속적인) 원소로 이루어진 subarray를 찾으시오

![Untitled](Kadane%E2%80%99s%20Algorithm%203bea8a9d049849de9731569a5b6d2a5a/Untitled.png)

(해법)

![Untitled](Kadane%E2%80%99s%20Algorithm%203bea8a9d049849de9731569a5b6d2a5a/Untitled%201.png)

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        maxSub = nums[0]
        curSum = 0

        for n in nums:
            if curSum < 0 :
                curSum = 0
            curSum += n
            maxSub = max(maxSub, curSum)
        return maxSub
```

(복잡도)

O(n), O(1) 

1. Maximum Sum Circular Subarray

(문제 해석)

Circular Array에서 Maximum sum이 나오는 circular subarray의 sum을 구하라.

![Untitled](Kadane%E2%80%99s%20Algorithm%203bea8a9d049849de9731569a5b6d2a5a/Untitled%202.png)

(해법)

![Untitled](Kadane%E2%80%99s%20Algorithm%203bea8a9d049849de9731569a5b6d2a5a/Untitled%203.png)

```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        globMax, globMin = nums[0], nums[0]
        curMax, curMin = 0, 0
        total = 0
        
        for i, n in enumerate(nums):
            curMax = max(curMax + n, n)
            curMin = min(curMin + n, n)
            total += n
            globMax = max(curMax, globMax)
            globMin = min(curMin, globMin)

        return max(globMax, total - globMin) if globMax > 0 else globMax
```

(복잡도)

O(n), O(1)