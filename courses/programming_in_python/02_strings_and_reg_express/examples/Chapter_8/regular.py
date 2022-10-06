import re

test_1 = 'qq ww ee rr tt yy uu ii pp'
test_2 = 'qq ww ee rr ww ss ww ff gg'


if re.match(".*[qaws]", test_1):
    print('test_1 contains q or a or w or s')

if re.match(".* ([a-z]{2}) .* \\1", test_2):
    print("test_2 contains two times the same part of `test_2` string")

print (re.sub('[we]+', "XX", test_2, 2))
print (re.sub('[we]+', "XX", test_2))

