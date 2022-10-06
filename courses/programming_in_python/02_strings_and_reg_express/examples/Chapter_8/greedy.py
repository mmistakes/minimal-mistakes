import re

test_1 = 'qq ww ee rr tt yy uu ii pp'
test_2 = 'qq ww ee rr ww ss ww ff gg'

print(f'Checking re.sub("ww (.*) ww", "X \\1 X", test_2) : ' ,re.sub('ww (.*) ww', "X \\1 X", test_2))
print(f'Checking re.sub(".*ww (.*) ww.*", "\\1", test_2) : ',re.sub('.*ww (.*) ww.*', "\\1", test_2))
print(f'Checking re.sub(".*?ww (.*) ww.*", "\\1", test_2) : ',re.sub('.*?ww (.*) ww.*', "\\1", test_2))