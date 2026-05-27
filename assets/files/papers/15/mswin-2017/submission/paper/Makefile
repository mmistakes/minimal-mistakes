#
# Dissertacao mestrado Makefile 
# Autor: Bruno Pereira dos Santos
#

TEX := pdflatex
BIB := bibtex

DIR_COMPILE_TRASH := build-trash

SRC := main
BIN := artigo.pdf

TOOL_READ_PDF := okular

all: artigo

artigo: $(SRC).tex
	$(TEX) $< 
	$(BIB) $(SRC).aux
	$(TEX) $<
	$(TEX) $<
	@mv $(SRC).pdf $(BIN)
	@echo -e "\n# Type make read to read the output file $(BIN)"
	@make clean

latex: artigo read

read: $(BIN)
	@$(TOOL_READ_PDF) $^

teste:
	@echo "teste2"

dirtrahs:
	@mkdir -p $(DIR_COMPILE_TRASH)

clean:
	@rm -vf *.aux *.dvi *.log *.bbl *.blg *.bak *.out *.lot *.lof *.toc
