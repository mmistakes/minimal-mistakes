def calling(**numbers):
    for key, value in numbers.items():
        print("{0} == {1}".format(key, value))

print("\n Calling calling(one=1, five=5, three=3, two=2, four=4), and obtain: ", calling(one=1, five=5, three=3, two=2, four=4))