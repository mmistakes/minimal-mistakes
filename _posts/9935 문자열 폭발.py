import sys

# - 입력받은 문자를 한 글자씩 stack에 PUSH
# - 만약 방금 넣은 문자가 폭발 문자열의 마지막 문자와 같다면?
#     - 폭발 문자열의 길이만큼 비교
#     - 맞다면?
#         - 그 문자열 pop
#     - 아니면?
#         - 걍 무시

input_str = sys.stdin.readline().rstrip()

bomb_str = sys.stdin.readline().rstrip()

bomb_end_str = bomb_str[-1]
bomb_len = len(bomb_str)

stack = []

for i in range(len(input_str)):
    stack.append(input_str[i])
    if stack[-1] == bomb_end_str and len(stack) >= bomb_len:
        count = 0
        for j in range(bomb_len):
            if stack[-1 - j] == bomb_str[-1 - j]:
                count += 1
        if count == bomb_len:
            for _ in range(bomb_len):
                stack.pop()
                
if len(stack) == 0:
    print("FRULA")
else:
    for i in stack:
        print(i, end="")
           
            
