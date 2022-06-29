import sys

N = int(sys.stdin.readline())

array1 = list(map(int, sys.stdin.readline().split()))

dict1 = dict()

for i in array1:
    if i in dict1:
        dict1[i] += 1
    else:
        dict1[i] = 1

M = int(sys.stdin.readline())

array2 = list(map(int, sys.stdin.readline().split()))

for i in array2:
    if i in dict1:
        print(dict1[i], end = " ")
    else:
        print(0, end = " ")