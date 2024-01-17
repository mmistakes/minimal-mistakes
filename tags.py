# lil' script to fetch all tags on posts
# to see which ones have already been used and to which extent

# This will be used to regularly prune/edit/collapse uncommon tags

import os
from collections import Counter
import pandas as pd

tags = []

for p in ['_posts/', 'data/_posts/', 'tech/_posts/']:
    filenames = [item for item in os.listdir(p) if '.DS_' not in item]
    for filename in filenames:

        # find the index of line "tags"
        content = open(p + filename).readlines()
        for i in range(len(content)):
            if 'tags' in content[i]:
                break

        # find tags after that line and only there
        content = open(p + filename).readlines()
        for j in range(i+1, len(content)):
            if content[j][0] != ' ':
                break
            tags.append(content[j].replace('\n', ''))

c = Counter(tags)
df = pd.DataFrame.from_dict(c, orient='index').reset_index().rename(columns={'index': 'tag', 0: 'count'})

print(df.sort_values('count', ascending=False).to_string())

#print(c.most_common())


