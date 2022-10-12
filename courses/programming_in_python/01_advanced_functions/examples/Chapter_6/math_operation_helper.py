def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def perform(operation, a, b):
    return operation(a, b)

s = perform(add, 7,8) #compute sum
m = perform(multiply, 7, 8) #compute product

print(s)
print(m)
