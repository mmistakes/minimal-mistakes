def solution(N, number):
    dp = [[] for _ in range(9)]
    for i in range(1, 9):
        comb_list = set()
        comb_list.add(int(str(N) * i))
        for j in range(1, i):
            for comb1 in dp[i - j]:
                for comb2 in dp[j]:
                    plus = comb1 + comb2
                    minus = comb1 - comb2
                    mul = comb1 * comb2
                    if comb2 != 0:
                        div = comb1 / comb2
                        if div % 1 == 0:
                            comb_list.add(int(div))
                    comb_list.add(plus)
                    comb_list.add(mul)
                    if minus >= 0:
                        comb_list.add(minus)
        if number in comb_list:
            return i
        for q in comb_list:
            dp[i].append(q)
    return -1
