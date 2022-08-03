from collections import deque

def solution(record):
    answer = []
    name_list = dict()
    queue = deque()

    for i in range(len(record)):
        a = record[i].split(" ")
        if a[0] == "Enter":
            name_list[a[1]] = a[2]
            queue.append(("E", a[1]))
        elif a[0] == "Leave":
            queue.append(("L", a[1]))
            continue
        else:
            name_list[a[1]] = a[2]
    while queue:
        flag, id = queue.popleft()
        a = ""
        if flag == "E":
            a += name_list[id] + "님이 들어왔습니다."
            answer.append(a)
        elif flag == "L":
            a += name_list[id] + "님이 나갔습니다."
            answer.append(a)
    return answer
