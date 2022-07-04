import sys

N, M = map(int, sys.stdin.readline().split())

# str_lst1 = set()
# str_lst2 = set()

# for i in range(N):
#     str_lst1.add(sys.stdin.readline().rstrip())

# for i in range(M):
#     str_lst2.add(sys.stdin.readline().rstrip())
    
# res = list(str_lst1 & str_lst2)

# res.sort(reverse = False)

# print(len(res))

# for i in res:
#     print(i)
    
str_list1 = dict()
res = []

for i in range(N):
    a = sys.stdin.readline().rstrip()
    if a not in str_list1:
        str_list1[a] = 1
for i in range(M):
    a = sys.stdin.readline().rstrip()
    if a in str_list1:
        res.append(a)
    
    
res.sort(reverse = False)

print(len(res))

for i in res:
    print(i)
            