from itertools import combinations, permutations
import sys

def solution(orders, course):
    answer = []
 
    sort_orders = []
    for i in orders:
        sort_orders.append("".join(sorted(i)))

    for i in course:
        c = set()
        for z in sort_orders:
            c |= set(map("".join, combinations(z, i)))
        dict_alpha = dict()
        for j in c:
            dict_alpha[j] = 0
        for q in sort_orders:
            for k in c:
                a = set(q) & set(k)
                a_list = list(a)
                a_list.sort()
                str_a = "".join(a_list)
                if len(a) == len(k):
                    dict_alpha[str_a] += 1
        if len(dict_alpha) == 0:
            continue
        max_value = max(dict_alpha.values())
        for i in dict_alpha:
            if dict_alpha[i] == max_value and max_value > 1:
                answer.append(i)
        
        

    
    answer.sort()
    return answer

# orders = ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"]
orders = ["XYZ", "XWY", "WXA"]
course = [2,3,4]
solution(orders, course)