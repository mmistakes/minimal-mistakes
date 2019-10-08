---
bibliography: /home/tomas/Dropbox/cv/makerefen4/selectedpubs.bib
nocite: '@*'
linestretch: 1.5
fontsize: 12pt
header-includes: |
    \usepackage[
    backend=biber,
    style=numeric,
    natbib=true,
    url=false, 
    doi=true,
    eprint=false,
    sorting=ydnt, %Year (Descending) Name Title
    maxbibnames=99
    ]{biblatex}
    \renewcommand*{\mkbibnamegiven}[1]{%
      \ifitemannotation{highlight}
        {\textbf{#1}}
        {#1}}
    \renewcommand*{\mkbibnamefamily}[1]{%
      \ifitemannotation{highlight}
        {\textbf{#1}}
        {#1}}
...


