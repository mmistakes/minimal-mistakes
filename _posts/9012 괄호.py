import sys

N = int(sys.stdin.readline())

string_list = []
stk_list = []

for i in range(N):
    string_list = sys.stdin.readline()
    for j in range(len(string_list)):
        if string_list[j] == "(":
            stk_list.append("(")
        elif string_list[j] == ")":
            if not stk_list or stk_list[-1] != "(":
                print("NO")
                stk_list.clear()
                break
            else:
                stk_list.pop()
            
        if j == len(string_list) - 1:
            if not stk_list:
                print("YES")
            else:
                print("NO")
                stk_list.clear()
            