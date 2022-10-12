def exchange_rate(amount, rate=4.75, spread=0.05):
    return round((amount / rate) * ( 1 - spread),2)

print(" Calling exchange_rate(2137), and obtain: ", exchange_rate(2137))


