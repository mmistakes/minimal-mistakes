
import collections
import itertools

def solution(orders, course):
    result = []

    for course_size in course:
        order_combinations = []
        for order in orders:
            order_combinations += itertools.combinations(sorted(order), course_size)

        most_ordered = collections.Counter(order_combinations).most_common()
        result += [ k for k, v in most_ordered if v > 1 and v == most_ordered[0][1] ]

    return [ ''.join(v) for v in sorted(result) ]

orders = ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"]
# orders = ["XYZ", "XWY", "WXA"]
course = [2,3,4]
solution(orders, course)