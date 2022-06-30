import sys

alpha = {'a': 1,'b': 2,'c': 3,'d': 4,'e': 5,'f': 6,'g': 7,'h': 8,'i': 9,'j': 10,'k': 11,'l': 12,'m': 13,'n': 14,'o': 15,'p': 16,'q': 17,'r': 18,'s': 19,'t': 20,'u': 21,'v': 22,'w': 23,'x': 24,'y': 25,'z': 26}


def Recursive_Power(C, n):
    if n == 0:
        return 1
    
    if n == 1:
        return C
    
    if n % 2 == 0:
        y = Recursive_Power(C, n / 2)
        return y * y
    
    else:
        y = Recursive_Power(C, (n - 1) / 2)
        return y * y * C
    
L = int(sys.stdin.readline())

str_alpha = sys.stdin.readline().rstrip()

sum = 0

for i in range(L):
    sum += alpha[str_alpha[i]] * Recursive_Power(31, i)
    
print(sum % 1234567891)