def math_operation(name):
    if name == 'sum':
        def f(a,b):
            return a + b
    elif name == 'diff':
        def f(a,b):
            return a - b
    elif name == 'multi':
        def f(a,b):
            return a * b
    else:
        def f(a,b):
            return a / b
    return f


s = math_operation('sum')
print(s(2, 11))
