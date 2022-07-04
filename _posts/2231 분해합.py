import sys

n = int(sys.stdin.readline())
sum = 0
j = 0
if n == 1:
    print("0")
else:
    for i in range(1, n):
        j = i
        while True:  
            sum += j % 10
            j = j // 10
            if j == 0:
                break
        sum += i   
        if sum == n:
            print(i)
            break
        elif i == n - 1:
            print("0")
        else:
            sum = 0    
            