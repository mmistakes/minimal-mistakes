
March 5, 2007


IEEEtran is the official LaTeX class for authors of the Institute of
Electrical and Electronics Engineers (IEEE) transactions journals and
conferences. The latest version of the IEEEtran package can be found
at CTAN:

http://www.ctan.org/tex-archive/macros/latex/contrib/IEEEtran/

as well as within IEEE's site:

http://www.ieee.org/

For latest news, helpful tips, answers to frequently asked questions,
beta releases and other support, visit the IEEEtran home page at my
website:

http://www.michaelshell.org/tex/ieeetran/


Version 1.7a is a bug fix release that corrects the two column peer
review title page problem. This problem was not present in the 1.6 series.


V1.7 is a significant update over the 1.6 series with many important
changes. For a full list, please read the file changelog.txt. The most
notable changes include:

 1. New class option compsoc to support the IEEE Computer Society format.

 2. Several commands and environments have been deprecated in favor of
    replacements with IEEE prefixes to better avoid potential future name
    clashes with other packages. Legacy code retained to allow the use of
    the obsolete forms (for now), but with a warning message to the console
    during compilation:
    \IEEEauthorblockA, \IEEEauthorblockN, \IEEEauthorrefmark,
    \IEEEbiography, \IEEEbiographynophoto, \IEEEkeywords, \IEEEPARstart,
    \IEEEproof, \IEEEpubid, \IEEEpubidadjcol, \IEEEQED, \IEEEQEDclosed,
    \IEEEQEDopen, \IEEEspecialpapernotice. IEEEtran.cls now redefines
    \proof in way to avoid problems with the amsthm.sty package.
    For IED lists:
    \IEEEiedlabeljustifyc, \IEEEiedlabeljustifyl, \IEEEiedlabeljustifyr,
    \IEEEnocalcleftmargin, \IEEElabelindent, \IEEEsetlabelwidth,
    \IEEEusemathlabelsep
    These commands/lengths now require the IEEE prefix and do not have
    legacy support: \IEEEnormaljot.
    For IED lists: \ifIEEEnocalcleftmargin, \ifIEEEnolabelindentfactor,
    \IEEEiedlistdecl, \IEEElabelindentfactor

 3. New \CLASSINPUT, \CLASSOPTION and \CLASSINFO interface allows for more
    user control and conditional compilation.

 4. Several bug fixes and improved compatibility with other packages.


A note to those who create classes derived from IEEEtran.cls: Consider the
use of patch code, either in an example .tex file or as a .sty file,
rather than creating a new class. The IEEEtran.cls CLASSINPUT interface
allows IEEEtran.cls to be fully programmable with respect to document
margins, so there is no need for new class files just for altered margins.
In this way, authors can benefit from updates to IEEEtran.cls and the need
to maintain derivative classes and backport later IEEEtran.cls revisions
thereto is avoided. As always, developers who create classes derived from
IEEEtran.cls should use a different name for the derived class, so that it
cannot be confused with the official/base version here, as well as provide
authors with technical support for the derived class. It is generally a bad
idea to produce a new class that is not going to be maintained.


Best wishes for all your publication endeavors,

Michael Shell
http://www.michaelshell.org/


********************************** Files **********************************

README                 - This file.

IEEEtran.cls           - The IEEEtran LaTeX class file.

changelog.txt          - The revision history.

IEEEtran_HOWTO.pdf     - The IEEEtran LaTeX class user manual.

bare_conf.tex          - A bare bones starter file for conference papers.

bare_jrnl.tex          - A bare bones starter file for journal papers.

bare_jrnl_compsoc.tex  - A bare bones starter file for Computer Society
                         journal papers.

bare_adv.tex           - A bare bones starter file showing advanced
                         techniques such as conditional compilation,
                         hyperlinks, PDF thumbnails, etc. The illustrated
                         format is for a Computer Society journal paper.

***************************************************************************
Legal Notice:
This code is offered as-is without any warranty either expressed or
implied; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE! 
User assumes all risk.
In no event shall IEEE or any contributor to this code be liable for
any damages or losses, including, but not limited to, incidental,
consequential, or any other damages, resulting from the use or misuse
of any information contained here.

All comments are the opinions of their respective authors and are not
necessarily endorsed by the IEEE.

This work is distributed under the LaTeX Project Public License (LPPL)
( http://www.latex-project.org/ ) version 1.3, and may be freely used,
distributed and modified. A copy of the LPPL, version 1.3, is included
in the base LaTeX documentation of all distributions of LaTeX released
2003/12/01 or later.
Retain all contribution notices and credits.
** Modified files should be clearly indicated as such, including  **
** renaming them and changing author support contact information. **

File list of work: IEEEtran.cls, IEEEtran_HOWTO.pdf, bare_adv.tex,
                   bare_conf.tex, bare_jrnl.tex, bare_jrnl_compsoc.tex
***************************************************************************
