def letter_check(string, character):
    present = False
    for letter in string:
        if letter == character:
            present = True
            break
        else: present = False
    return present

is_in_string = letter_check('word', 'o')
print(is_in_string)
