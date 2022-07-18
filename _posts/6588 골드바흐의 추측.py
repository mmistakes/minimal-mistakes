import sys

list = [True] * 1000001
list[0] = False
list[1] = False

prime = []

for i in range(2, 1000001):
    if i == 2:
        continue
    if list[i]:
        prime.append(i)
    for j in range(i * 2, 1000001, i):
        list[j] = False

while True:
    flag = 0
    T = int(sys.stdin.readline())
    if T == 0:
        break
    else:
        for i in prime:
            for j in prime:
                if i + j == T:
                    ans = str(T) + " = " + str(i) + " + " + str(j)
                    print(ans)
                    flag = 1
                    break
                elif i + j > T:
                    break
            if flag == 1:
                break
            elif i == prime[len(prime) - 1]:
                print("Goldbach's conjecture is wrong.")    


    