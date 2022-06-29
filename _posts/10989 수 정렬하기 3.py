import sys

N = int(sys.stdin.readline())

# num_sort = []

# for i in range(N):
#     num_sort.append(int(sys.stdin.readline()))
    
# num_sort.sort(reverse = False)

# for i in range(N):
#     print(num_sort[i])

cnt_sort = [0] * 10001

for i in range(N):
    cnt_sort[int(sys.stdin.readline())] += 1
    
for i in range(len(cnt_sort)):
    if cnt_sort[i] != 0:
        for j in range(cnt_sort[i]):
            print(i)
    