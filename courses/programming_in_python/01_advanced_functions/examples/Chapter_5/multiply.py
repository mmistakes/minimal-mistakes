def multiply(*numbers):
    result = 1
    for n in numbers:
        result = result * n
    return result

print("Calling multiply(2,4,5), and obtain: ", multiply(2,4,5))