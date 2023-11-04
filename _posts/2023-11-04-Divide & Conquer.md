# Divide & Conquer

1. Convert Sorted Array to Binary Search Tree

(문제 해석)

Sorted Array를 height-balanced binary search tree(왼쪽과 오른쪽의 높이가 동일한 BST)로 변환해라.

![Untitled](Divide%20&%20Conquer%20d996d567ee9a41608d3677641dc412c9/Untitled.png)

(해법)

![Untitled](Divide%20&%20Conquer%20d996d567ee9a41608d3677641dc412c9/Untitled%201.png)

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        if not nums: # Base case 
            return None
        mid = len(nums)//2
        root = TreeNode(nums[mid])
        root.left = self.sortedArrayToBST(nums[:mid])
        root.right = self.sortedArrayToBST(nums[mid+1:])
        return root
```

(복잡도)

O(n), O(log n)

1. Sort List

(문제 해석)

오름 차순으로 linked list를 바꿔라.

![Untitled](Divide%20&%20Conquer%20d996d567ee9a41608d3677641dc412c9/Untitled%202.png)

(해법)

![Untitled](Divide%20&%20Conquer%20d996d567ee9a41608d3677641dc412c9/Untitled%203.png)

```
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next: # base case
            return head
        
        # split the list into two halfs
        left = head
        right = self.getMid(head)
        tmp = right.next
        right.next = None
        right = tmp

        left = self.sortList(left)
        right = self.sortList(right)
        return self.merge(left, right)

    def getMid(self, head):
        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow
    
    def merge(self, left, right):
        tail = dummy = ListNode()
        while left and right:
            if left.val < right.val:
                tail.next = left
                left = left.next
            else:
                tail.next = right
                right = right.next
            tail = tail.next
        if left:
            tail.next = left
        if right:
            tail.next = right
        return dummy.next
```

(복잡도)

O(n*log n), O(log n)

1. Construct Quad Tree

(문제 해석)

Quad Tree를 만들어라.

![Untitled](Divide%20&%20Conquer%20d996d567ee9a41608d3677641dc412c9/Untitled%204.png)

![Untitled](Divide%20&%20Conquer%20d996d567ee9a41608d3677641dc412c9/Untitled%205.png)

(해법)

![Untitled](Divide%20&%20Conquer%20d996d567ee9a41608d3677641dc412c9/Untitled%206.png)

```
"""
# Definition for a QuadTree node.
class Node:
    def __init__(self, val, isLeaf, topLeft, topRight, bottomLeft, bottomRight):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight
"""

class Solution:
    def construct(self, grid: List[List[int]]) -> 'Node':
        def dfs(n, r, c):
            allSame = True
            for i in range(n):
                for j in range(n):
                    if grid[r][c] != grid[r+i][c+j]:
                        allSame = False
                        break
            if allSame: 
                return Node(grid[r][c], True)
            
            n = n // 2
            topleft = dfs(n, r, c)
            topright = dfs(n, r, c+n)
            bottomleft = dfs(n, r+n, c)
            bottomright = dfs(n, r+n, c+n)
            return Node(1, False, topleft, topright, bottomleft, bottomright)
        return dfs(len(grid), 0, 0)
```

(복잡도)

O(n^2 *log n), O(log n)

1. Merge K sorted Lists

(문제 해석)

K개의 sorted list를 하나로 합쳐라

![Untitled](Divide%20&%20Conquer%20d996d567ee9a41608d3677641dc412c9/Untitled%207.png)

(해법)

![Untitled](Divide%20&%20Conquer%20d996d567ee9a41608d3677641dc412c9/Untitled%208.png)

```
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        if not lists or len(lists) == 0:
            return None

        while len(lists) > 1:
            mergedLists = []
            for i in range(0, len(lists), 2):
                left = lists[i]
                right = lists[i + 1] if (i + 1) < len(lists) else None
                mergedLists.append(self.mergeList(left, right))
            lists = mergedLists
        return lists[0]

    def mergeList(self, left, right):
        tail = dummy = ListNode()
        while left and right:
            if left.val < right.val:
                tail.next = left
                left = left.next
            else:
                tail.next = right
                right = right.next
            tail = tail.next
        if left:
            tail.next = left
        if right:
            tail.next = right
        return dummy.next
```

(복잡도)

O(n*log k), O(log k)