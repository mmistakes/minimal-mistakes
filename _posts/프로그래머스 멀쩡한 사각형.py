import math

def solution(w,h):
    if w == h:
        return w * h - w
    else:
        a = math.gcd(w, h)
        if a == 1:
            return w * h - (h + w - 1)
        else:
            sum = w * h
            w = w // a
            h = h // a
            return sum - (a * (h + w - 1))
            
