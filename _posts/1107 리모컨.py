import sys
from itertools import product

N = sys.stdin.readline().rstrip()

M = int(sys.stdin.readline())

if M != 0:
    broken = list(sys.stdin.readline().split())

if int(N) == 100:
    print("0")
    exit()
    
elif M != 0 and M != 10:
    min_num = 99999999999
    a = min_num + 1
    for num in range(1000001):
        str_num = str(num)
        
        for i in range(len(str_num)):
            if str(str_num[i]) in broken:
                break    
            
            elif i == len(str_num) - 1:
                a = abs(int(N) - num)
                
        if min_num > a:
            min_num = a
            res = num
    sum_a = abs(res - int(N)) + len(str(res))
    sum_b = abs(int(N) - 100)
    
    if sum_a > sum_b:
        print(sum_b)
    else:
        print(sum_a)
        
    
    
elif M == 10:
    print(abs(int(N) - 100))
            
else:
    a = abs(int(N) - 100)
    b = len(N)
    
    if a > b:
        print(b)
    else:
        print(a)
    
    
        