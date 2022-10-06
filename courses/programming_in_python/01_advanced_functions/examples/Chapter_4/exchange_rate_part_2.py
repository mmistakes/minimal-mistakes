def exchange_rate(amount, rate=4.75, spread=0.05):
    return round((amount / rate) * ( 1 - spread),2)
    
A = exchange_rate(100, 10, 0.01)
B = exchange_rate(100, rate=10, spread = 0.01)
C = exchange_rate(100, spread = 0.01, rate=10)
D = exchange_rate(1000, 5)
E = exchange_rate(1000, rate=5)
F = exchange_rate(2137, spread = 0.01)

print("Testing A == B == C, and obtain: ", A == B == C)
print("Testing D == E, and obtain: ", D == E)