# lil' script to fetch all tags on posts
# to see which ones have already been used and to which extent

import os
from collections import Counter

tags = []

for p in ['_posts/', 'data/_posts/', 'tech/_posts/']:
    filenames = [item for item in os.listdir(p) if '.DS_' not in item]
    for filename in filenames:
        content = open(p + filename).readlines()
        for i in range(len(content)):
            if '---' in content[i] and i > 0:
                break
            else:
                line = content[i]
                if '  - ' in line and '---' not in line and '#' not in line:
                    tags.append(line.replace('\n', ''))

c = Counter(tags)
print(c.most_common())
