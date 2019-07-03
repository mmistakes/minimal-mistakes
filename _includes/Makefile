# Makefile
# 
# Converts Markdown to other formats (HTML, PDF, DOCX, RTF, ODT, EPUB) using Pandoc
# <http://johnmacfarlane.net/pandoc/>

# Convert all files in this directory that have a .md suffix
SOURCE_DOCS := $(wildcard *.md)

EXPORTED_DOCS=\
 $(SOURCE_DOCS:.md=.html)

RM=/bin/rm

PANDOC=/usr/bin/pandoc

PANDOC_OPTIONS=--columns=80

#PANDOC_HTML_OPTIONS=--filter=pandoc-citeproc --csl=/home/tomas/.pandoc/agricultural-and-forest-meteorology.csl
PANDOC_HTML_OPTIONS=--filter=pandoc-citeproc --csl=els-modified.csl

# Pattern-matching Rules

%.html : %.md
	$(PANDOC) $(PANDOC_OPTIONS) $(PANDOC_HTML_OPTIONS) -o $@ $<



# Targets and dependencies

.PHONY: all clean

html : $(SOURCE_DOCS:.md=.html)

all : $(EXPORTED_DOCS)

clean:
	- $(RM) $(EXPORTED_DOCS)


