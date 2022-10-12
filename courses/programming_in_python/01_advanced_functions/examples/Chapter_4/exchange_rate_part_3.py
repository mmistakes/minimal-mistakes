def exchange_rate(amount, rate=4.75, spread=0.05):
    return round((amount / rate) * ( 1 - spread),2)

print("Calling exchange_rate(spread = 0.01, 2137), and obtain: ",exchange_rate(spread = 0.01, 2137))