import re

rhymes = '''A sailor went to sea1, sea2, sea3'''
print(len(re.findall("sea[2-9]", rhymes)))