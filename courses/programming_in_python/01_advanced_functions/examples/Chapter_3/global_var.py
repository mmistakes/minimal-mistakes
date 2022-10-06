def glob_var():
    global a
    a, b = 20, 30
    print("Values for a,b,c inside the function body ",a,' ',b,' ',c)

a, b, c = 1, 2, 3
glob_var() 
print("Values for a,b,c outside the function body ",a,' ',b,' ',c)