import sys
stack_list = []
while True:
    str_input = sys.stdin.readline()
    if str_input == ".\n":
        break
    for i in range(len(str_input)):
        if str_input[i] == "(":
            stack_list.append("(")
        elif str_input[i] == "[":
            stack_list.append("[")
            
        elif str_input[i] == ")":
            if not stack_list or stack_list[-1] != "(":
                print("no")
                stack_list.clear()
                break
            else:
                stack_list.pop()
        elif str_input[i] == "]":
            if not stack_list or stack_list[-1] != "[":
                print("no")
                stack_list.clear()
                break
            else:
                stack_list.pop()
            
        elif i == len(str_input) - 1:
            if not stack_list:
                print("yes")
            else:
                print("no")
                stack_list.clear()


