import sys

sys.setrecursionlimit(10**9)

list = []

while True:
    try:
        n = sys.stdin.readline()
        list.append(int(n))
    except:
        break


def binary(start, end):
    if start > end:
        return
    right_node = end + 1
    root = list[start]
    for i in range(start + 1, end + 1):
        if list[i] > root:
            right_node = i
            break
    binary(start + 1, right_node - 1)
    binary(right_node , end)
    print(root)
        
    
    
binary(0, len(list) - 1)
