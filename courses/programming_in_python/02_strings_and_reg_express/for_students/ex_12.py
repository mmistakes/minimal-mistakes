'''
EX. 12 (1 point)
Code a function `abbreviation(list_of_strings)`, which will create an abbreviation of words provided in a list. 
The function returns the first and the last character of the word as well as its length in a list, e.g. for`['Lazarski','University']` 
function will return:

   ['L - i (8)', 'U - y (10)']
'''

####SOLUTION

import re

def abbreviation(list_of_strings):
    output = [0 for i in range(len(list_of_strings))]
    for i in range(len(list_of_strings)):
        first = list_of_strings[i][0]
        last = list_of_strings[i][-1]
        length = len(list_of_strings[i])
        output[i] = f"{first} - {last} ({length})"
    return output
