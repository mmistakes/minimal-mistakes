#!/bin/bash

# this script will convert the index.md to index.html
if test -f "index.html"; then
    rm "index.html"
fi

if test -f "_index.md"; then
    mv "_index.md" "index.md"
fi

pandoc -f markdown -t html index.md -o index.html

# Linux
#sed -i '1s/^/---\ntitle: "Hello, World"\nlayout: home\nauthor_profile: true\nheader:\n  overlay_image: "assets\/images\/home-cover-1.jpg"\n---\n\n/' index.html

# Mac
sed -i '.original' -e '1s/^/---\ntitle: "Hello, World"\nlayout: home\nauthor_profile: true\nheader:\n  overlay_image: "assets\/images\/home-cover-1.jpg"\n---\n\n/' index.html

mv index.md _index.md
rm index.html.original
