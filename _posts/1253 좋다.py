import sys

N = int(sys.stdin.readline())
lst = list(map(int, sys.stdin.readline().split()))
lst.sort()

count = 0

for i in range(len(lst)):
    temp = lst[ : i] + lst[i + 1 : ]
    left = 0
    right = len(temp) - 1
    while left < right:
        a = temp[left] + temp[right]
        if lst[i] == a:
            count += 1
            break
        elif lst[i] > a:
            left += 1
        else:
            right -= 1

print(count)
