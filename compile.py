#! /usr/bin/env python
import os,sys

dirname=os.path.dirname
filepath=(dirname(dirname(os.path.abspath(__file__))))
sys.path.append(filepath)
if len(sys.argv) ==2 :
  dest = sys.argv[1]
else :
  dest = 'compiled'

from jinja2 import Environment, PackageLoader
env = Environment(loader=PackageLoader('cdiswebsite', 'template'))
for filename in os.listdir('template'):
    if filename!='base.html':
        template = env.get_template(filename)
        content=template.render()
        f=open(os.path.join(dest ,filename),'w')
        f.write(content.encode('utf-8'))
        f.close()
