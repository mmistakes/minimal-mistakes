'''
9.6 EX. 8 (3 point)
>[PESEL](https://en.wikipedia.org/wiki/PESEL) is the national identification number used in Poland since 1979. The number is 11 digits long, identifies exactly one person, and cannot be changed once assigned, except in specific situations (such as gender reassignment). 

To create a proper PESEL number one must obey a few rules; for the purpose of this exercise we would consider only PESEL numbers for those born between 1900 and 1999. By calculating the following expression, one my check the validity of the given PESEL number:
$$
c_1\cdot1 + c_2\cdot3 + c_3\cdot7 + c_4\cdot9 + c_5\cdot1 + c_6\cdot3 + c_7\cdot7 + c_8\cdot9 + c_9\cdot1+c_{10}\cdot3+c_{11}\cdot1,
$$

where:

| $2$ | $6$ | $0$ | $3$ | $0$ | $8$ | $3$ | $6$ | $4$ | $7$ | $9$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $c_1$ | $c_2$ | $c_3$ | $c_4$ | $c_5$ | $c_6$ | $c_7$ | $c_8$ | $c_9$ | $c_{10}$ | $c_{11}$ |

Now we have to check if the last digit of our expression is equal to `0`. We can do it by checking if a modulo 10 is equal to `0` or by transforming the expression result into a string and then checking the last digit. For example, for the PESEL number `39090109215` the output of the expression is `205`, so this is not a valid PESEL number. Your task is to code a `check_PESEL(PESEL)` function, where `PESEL` is a string parameter and there are 2 possible outputs of this function:
1. If the PESEL number is incorrect, based on the provided expression, the function should return 'Invalid PESEL';
2. If the PESEL number is correct, return:
    Year of birth:
    Month of birth:
    Day of birth:
    Gender:
'''

###START FROM HERE
def check_PESEL(PESEL):
    ...
    ...
    ...
    if ...:
        ...
        return f"Year of birth: {year}\nMonth of birth: {month}\nDay of birth: {day}\nGender: {gender}"
    else: return 'Invalid PESEL'