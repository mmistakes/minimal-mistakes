sample_word = 'uczelnia lazarskeigo'
print(sample_word)

#CAPITALZIE
capitalized_word = sample_word.capitalize()
print(capitalized_word)

#COUNT
number_of_occ = sample_word.count('l')
print(f"There are {number_of_occ} l letters in {sample_word}")

#ENDSWITH
is_suffix = sample_word.endswith('igo')
print(f"Is {sample_word} ending with 'igo': {is_suffix}")

#FIND
looking_for = sample_word.find('laz')
print(f"'laz' is on {looking_for}, index of {sample_word}")

#ISNUMERIC
is_num = sample_word.isnumeric()
print(f"Is {sample_word}, a numeric: {is_num}")

#LOWER
make_lower = capitalized_word.lower()
print(make_lower)

#REPALCE
replaced_word = sample_word.replace('lasarskeigo', 'kozminskeigo')
print(replaced_word)

#SPLIT
print(sample_word.split(' '))

#STARTSWITH
start_with = sample_word.startswith('ucz')
print(f"Does {sample_word} start with 'ucz': {start_with}")

#UPPER
upper_word = sample_word.upper()
print(upper_word)