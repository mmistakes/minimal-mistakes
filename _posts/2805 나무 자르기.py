import sys

N, M = map(int, sys.stdin.readline().split())

tree_list = list(map(int, list(sys.stdin.readline().split())))

sum = 0

end = max(tree_list)
start = 1



while start <= end:
    mid =  (start + end) // 2
    sum = 0
    for i in range(N):
        if tree_list[i] <= mid:
            continue
        else:
            sum += tree_list[i] - mid
    
    if sum < M:
        end = mid - 1
        
    elif sum == M:
        end = mid
        break
    
    else:
        start = mid + 1
   
print(end)