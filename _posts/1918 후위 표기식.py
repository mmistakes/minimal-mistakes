import sys

s = sys.stdin.readline().rstrip()
stack = []
ans = ""

for i in range(len(s)):
    if s[i] == "(":
        stack.append(s[i])
    elif s[i] == "*" or s[i] == "/":
        while stack and(stack[-1] == "*" or stack[-1] == "/"):
            ans += stack.pop()
        stack.append(s[i])
    elif s[i] == "+" or s[i] == "-":
        while stack and stack[-1] != "(":
            ans += stack.pop()
        stack.append(s[i])
    elif s[i] == ")":
        while stack and stack[-1] != "(":
            ans += stack.pop()
        stack.pop()
    else:
        ans += s[i]
while stack:
    ans += stack.pop()
print(ans)