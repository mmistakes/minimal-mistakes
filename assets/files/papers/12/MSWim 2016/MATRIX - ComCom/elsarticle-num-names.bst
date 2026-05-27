%%
%% This is file `elsarticle-num-names.bst',
%% 
%% Copyright 2007, 2008, 2009 Elsevier Ltd
%% 
%% This file is part of the 'Elsarticle Bundle'.
%% ---------------------------------------------
%% 
%% It may be distributed under the conditions of the LaTeX Project Public
%% License, either version 1.2 of this license or (at your option) any
%% later version.  The latest version of this license is in
%%    http://www.latex-project.org/lppl.txt
%% and version 1.2 or later is part of all distributions of LaTeX
%% version 1999/12/01 or later.
%% 
%% The list of all files belonging to the 'Elsarticle Bundle' is
%% given in the file `manifest.txt'.
%% 
%%
%% $Id: elsarticle-num-names.bst 19 2009-12-17 07:07:52Z rishi $
%%
%%
%% ----------------------------------------
%%
ENTRY
 { address
   author
   booktitle
   chapter
   doi
   edition
   editor
   eid
   howpublished
   institution
   isbn
   issn
   journal
   key
   month
   note
   number
   organization
   pages
   publisher
   school
   series
   title
   type
   url
   volume
   year
 }
 {}
 { label extra.label sort.label short.list }
INTEGERS { output.state before.all mid.sentence after.sentence after.block }
FUNCTION {init.state.consts}
{ #0 'before.all :=
 #1 'mid.sentence :=
 #2 'after.sentence :=
 #3 'after.block :=
}
STRINGS { s t}
FUNCTION {output.nonnull}
{ 's :=
 output.state mid.sentence =
   { ", " * write$ }
   { output.state after.block =
       { add.period$ write$
         newline$
         "\newblock " write$
       }
       { output.state before.all =
           'write$
           { add.period$ " " * write$ }
         if$
       }
     if$
     mid.sentence 'output.state :=
   }
 if$
 s
}
FUNCTION {output}
{ duplicate$ empty$
   'pop$
   'output.nonnull
 if$
}
FUNCTION {output.check}
{ 't :=
 duplicate$ empty$
   { pop$ "empty " t * " in " * cite$ * warning$ }
   'output.nonnull
 if$
}
FUNCTION {fin.entry}
{ add.period$
 write$
 newline$
}

FUNCTION {new.block}
{ output.state before.all =
   'skip$
   { after.block 'output.state := }
 if$
}
FUNCTION {new.sentence}
{ output.state after.block =
   'skip$
   { output.state before.all =
       'skip$
       { after.sentence 'output.state := }
     if$
   }
 if$
}
FUNCTION {add.blank}
{  " " * before.all 'output.state :=
}

FUNCTION {date.block}
{
 skip$
}

FUNCTION {not}
{   { #0 }
   { #1 }
 if$
}
FUNCTION {and}
{   'skip$
   { pop$ #0 }
 if$
}
FUNCTION {or}
{   { pop$ #1 }
   'skip$
 if$
}
FUNCTION {new.block.checkb}
{ empty$
 swap$ empty$
 and
   'skip$
   'new.block
 if$
}
FUNCTION {field.or.null}
{ duplicate$ empty$
   { pop$ "" }
   'skip$
 if$
}
FUNCTION {emphasize}
{ duplicate$ empty$
   { pop$ "" }
   { "\emph{" swap$ * "}" * }
 if$
}
FUNCTION {tie.or.space.prefix}
{ duplicate$ text.length$ #3 <
   { "~" }
   { " " }
 if$
 swap$
}

FUNCTION {capitalize}
{ "u" change.case$ "t" change.case$ }

FUNCTION {space.word}
{ " " swap$ * " " * }
 % Here are the language-specific definitions for explicit words.
 % Each function has a name bbl.xxx where xxx is the English word.
 %-------------------------------------------------------------------
 % Begin module:
 % \ProvidesFile{english.mbs}[2003/11/06 4.2 (PWD)]

 % The language selected here is ENGLISH
FUNCTION {bbl.and}
{ "and"}

FUNCTION {bbl.etal}
{ "et~al." }

FUNCTION {bbl.editors}
{ "eds." }

FUNCTION {bbl.editor}
{ "ed." }

FUNCTION {bbl.edby}
{ "edited by" }

FUNCTION {bbl.edition}
{ "edn." }

FUNCTION {bbl.volume}
{ "vol." }

FUNCTION {bbl.of}
{ "of" }

FUNCTION {bbl.number}
{ "no." }

FUNCTION {bbl.nr}
{ "no." }

FUNCTION {bbl.in}
{ "in" }

FUNCTION {bbl.pages}
{ "" }

FUNCTION {bbl.page}
{ "" }

FUNCTION {bbl.chapter}
{ "chap." }

FUNCTION {bbl.techrep}
{ "Tech. Rep." }

FUNCTION {bbl.mthesis}
{ "Master's thesis" }

FUNCTION {bbl.phdthesis}
{ "Ph.D. thesis" }

MACRO {jan} {"Jan."}

MACRO {feb} {"Feb."}

MACRO {mar} {"Mar."}

MACRO {apr} {"Apr."}

MACRO {may} {"May"}

MACRO {jun} {"Jun."}

MACRO {jul} {"Jul."}

MACRO {aug} {"Aug."}

MACRO {sep} {"Sep."}

MACRO {oct} {"Oct."}

MACRO {nov} {"Nov."}

MACRO {dec} {"Dec."}

 % End module: english.mbs
%% Copyright 1994-2004 Patrick W Daly
MACRO {acmcs} {"ACM Computing Surveys"}

MACRO {acta} {"Acta Informatica"}

MACRO {cacm} {"Communications of the ACM"}

MACRO {ibmjrd} {"IBM Journal of Research and Development"}

MACRO {ibmsj} {"IBM Systems Journal"}

MACRO {ieeese} {"IEEE Transactions on Software Engineering"}

MACRO {ieeetc} {"IEEE Transactions on Computers"}

MACRO {ieeetcad}
 {"IEEE Transactions on Computer-Aided Design of Integrated Circuits"}

MACRO {ipl} {"Information Processing Letters"}

MACRO {jacm} {"Journal of the ACM"}

MACRO {jcss} {"Journal of Computer and System Sciences"}

MACRO {scp} {"Science of Computer Programming"}

MACRO {sicomp} {"SIAM Journal on Computing"}

MACRO {tocs} {"ACM Transactions on Computer Systems"}

MACRO {tods} {"ACM Transactions on Database Systems"}

MACRO {tog} {"ACM Transactions on Graphics"}

MACRO {toms} {"ACM Transactions on Mathematical Software"}

MACRO {toois} {"ACM Transactions on Office Information Systems"}

MACRO {toplas} {"ACM Transactions on Programming Languages and Systems"}

MACRO {tcs} {"Theoretical Computer Science"}
FUNCTION {bibinfo.check}
{ swap$
 duplicate$ missing$
   {
     pop$ pop$
     ""
   }
   { duplicate$ empty$
       {
         swap$ pop$
       }
       { swap$
         "\bibinfo{" swap$ * "}{" * swap$ * "}" *
       }
     if$
   }
 if$
}
FUNCTION {bibinfo.warn}
{ swap$
 duplicate$ missing$
   {
     swap$ "missing " swap$ * " in " * cite$ * warning$ pop$
     ""
   }
   { duplicate$ empty$
       {
         swap$ "empty " swap$ * " in " * cite$ * warning$
       }
       { swap$
         "\bibinfo{" swap$ * "}{" * swap$ * "}" *
       }
     if$
   }
 if$
}
FUNCTION {format.url}
{ url empty$
   { "" }
   { "\urlprefix\url{" url * "}" * }
 if$
}

STRINGS  { bibinfo}
INTEGERS { nameptr namesleft numnames }

FUNCTION {format.names}
{ 'bibinfo :=
 duplicate$ empty$ 'skip$ {
 's :=
 "" 't :=
 #1 'nameptr :=
 s num.names$ 'numnames :=
 numnames 'namesleft :=
   { namesleft #0 > }
   { s nameptr
     "{f.~}{vv~}{ll}{, jj}"
     format.name$
     bibinfo bibinfo.check
     't :=
     nameptr #1 >
       {
         namesleft #1 >
           { ", " * t * }
           {
             "," *
             s nameptr "{ll}" format.name$ duplicate$ "others" =
               { 't := }
               { pop$ }
             if$
             t "others" =
               {
                 " " * bbl.etal *
               }
               { " " * t * }
             if$
           }
         if$
       }
       't
     if$
     nameptr #1 + 'nameptr :=
     namesleft #1 - 'namesleft :=
   }
 while$
 } if$
}
FUNCTION {format.names.ed}
{
 format.names
}
FUNCTION {format.key}
{ empty$
   { key field.or.null }
   { "" }
 if$
}

FUNCTION {format.authors}
{ author "author" format.names
}
FUNCTION {get.bbl.editor}
{ editor num.names$ #1 > 'bbl.editors 'bbl.editor if$ }

FUNCTION {format.editors}
{ editor "editor" format.names duplicate$ empty$ 'skip$
   {
     " " *
     get.bbl.editor
     capitalize
  "(" swap$ * ")" *
     *
   }
 if$
}
FUNCTION {format.isbn}
{ isbn "isbn" bibinfo.check
 duplicate$ empty$ 'skip$
   {
     "ISBN " swap$ *
   }
 if$
}

FUNCTION {format.issn}
{ issn "issn" bibinfo.check
 duplicate$ empty$ 'skip$
   {
     "ISSN " swap$ *
   }
 if$
}

 FUNCTION {format.doi}
 { doi "doi" bibinfo.check
  duplicate$ empty$ 'skip$
    {
      "\doi{" swap$  * "}" *
    }
  if$
 }

FUNCTION {format.note}
{
 note empty$
   { "" }
   { note #1 #1 substring$
     duplicate$ "{" =
       'skip$
       { output.state mid.sentence =
         { "l" }
         { "u" }
       if$
       change.case$
       }
     if$
     note #2 global.max$ substring$ * "note" bibinfo.check
   }
 if$
}

FUNCTION {format.title}
{ title
 "title" bibinfo.check
}
FUNCTION {format.full.names}
{'s :=
 "" 't :=
 #1 'nameptr :=
 s num.names$ 'numnames :=
 numnames 'namesleft :=
   { namesleft #0 > }
   { s nameptr
     "{vv~}{ll}" format.name$
     't :=
     nameptr #1 >
       {
         namesleft #1 >
           { ", " * t * }
           {
             s nameptr "{ll}" format.name$ duplicate$ "others" =
               { 't := }
               { pop$ }
             if$
             t "others" =
               {
                 " " * bbl.etal *
               }
               {
                 numnames #2 >
                   { "," * }
                   'skip$
                 if$
                 bbl.and
                 space.word * t *
               }
             if$
           }
         if$
       }
       't
     if$
     nameptr #1 + 'nameptr :=
     namesleft #1 - 'namesleft :=
   }
 while$
}

FUNCTION {author.editor.key.full}
{ author empty$
   { editor empty$
       { key empty$
           { cite$ #1 #3 substring$ }
           'key
         if$
       }
       { editor format.full.names }
     if$
   }
   { author format.full.names }
 if$
}

FUNCTION {author.key.full}
{ author empty$
   { key empty$
        { cite$ #1 #3 substring$ }
         'key
     if$
   }
   { author format.full.names }
 if$
}

FUNCTION {editor.key.full}
{ editor empty$
   { key empty$
        { cite$ #1 #3 substring$ }
         'key
     if$
   }
   { editor format.full.names }
 if$
}

FUNCTION {make.full.names}
{ type$ "book" =
 type$ "inbook" =
 or
   'author.editor.key.full
   { type$ "proceedings" =
       'editor.key.full
       'author.key.full
     if$
   }
 if$
}

FUNCTION {output.bibitem}
{ newline$
 "\bibitem[{" write$
 label write$
 ")" make.full.names duplicate$ short.list =
    { pop$ }
    { * }
  if$
 "}]{" * write$
 cite$ write$
 "}" write$
 newline$
 ""
 before.all 'output.state :=
}

FUNCTION {n.dashify}
{
 't :=
 ""
   { t empty$ not }
   { t #1 #1 substring$ "-" =
       { t #1 #2 substring$ "--" = not
           { "--" *
             t #2 global.max$ substring$ 't :=
           }
           {   { t #1 #1 substring$ "-" = }
               { "-" *
                 t #2 global.max$ substring$ 't :=
               }
             while$
           }
         if$
       }
       { t #1 #1 substring$ *
         t #2 global.max$ substring$ 't :=
       }
     if$
   }
 while$
}

FUNCTION {word.in}
{ bbl.in
 ":" *
 " " * }

FUNCTION {format.date}
{ year "year" bibinfo.check duplicate$ empty$
   {
     "empty year in " cite$ * "; set to ????" * warning$
      pop$ "????"
   }
   'skip$
 if$
 extra.label *
}
FUNCTION{format.year}
{ year "year" bibinfo.check duplicate$ empty$
   {  "empty year in " cite$ *
      "; set to ????" *
      warning$
      pop$ "????"
   }
   {
   }
 if$
 extra.label *
 "(" swap$ * ")" *
}
FUNCTION {format.btitle}
{ title "title" bibinfo.check
 duplicate$ empty$ 'skip$
   {
   }
 if$
}
FUNCTION {either.or.check}
{ empty$
   'pop$
   { "can't use both " swap$ * " fields in " * cite$ * warning$ }
 if$
}
FUNCTION {format.bvolume}
{ volume empty$
   { "" }
   { bbl.volume volume tie.or.space.prefix
     "volume" bibinfo.check * *
     series "series" bibinfo.check
     duplicate$ empty$ 'pop$
       { swap$ bbl.of space.word * swap$
         emphasize * }
     if$
     "volume and number" number either.or.check
   }
 if$
}
FUNCTION {format.number.series}
{ volume empty$
   { number empty$
       { series field.or.null }
       { series empty$
           { number "number" bibinfo.check }
           { output.state mid.sentence =
               { bbl.number }
               { bbl.number capitalize }
             if$
             number tie.or.space.prefix "number" bibinfo.check * *
             bbl.in space.word *
             series "series" bibinfo.check *
           }
         if$
       }
     if$
   }
   { "" }
 if$
}

FUNCTION {format.edition}
{ edition duplicate$ empty$ 'skip$
   {
     output.state mid.sentence =
       { "l" }
       { "t" }
     if$ change.case$
     "edition" bibinfo.check
     " " * bbl.edition *
   }
 if$
}
INTEGERS { multiresult }
FUNCTION {multi.page.check}
{ 't :=
 #0 'multiresult :=
   { multiresult not
     t empty$ not
     and
   }
   { t #1 #1 substring$
     duplicate$ "-" =
     swap$ duplicate$ "," =
     swap$ "+" =
     or or
       { #1 'multiresult := }
       { t #2 global.max$ substring$ 't := }
     if$
   }
 while$
 multiresult
}
FUNCTION {format.pages}
{ pages duplicate$ empty$ 'skip$
   { duplicate$ multi.page.check
       {
         n.dashify
       }
       {
       }
     if$
     "pages" bibinfo.check
   }
 if$
}
FUNCTION {format.journal.pages}
{ pages duplicate$ empty$ 'pop$
   { swap$ duplicate$ empty$
       { pop$ pop$ format.pages }
       {
         " " *
         format.year * " " *
         swap$
         n.dashify
         "pages" bibinfo.check
         *
       }
     if$
   }
 if$
}
FUNCTION {format.journal.eid}
{ eid "eid" bibinfo.check
 duplicate$ empty$ 'pop$
   { swap$ duplicate$ empty$ 'skip$
     {
         " " *
     }
     if$
     swap$ *
   }
 if$
}
FUNCTION {format.vol.num.pages}
{ volume field.or.null
 duplicate$ empty$ 'skip$
   {
     "volume" bibinfo.check
   }
 if$
 number "number" bibinfo.check duplicate$ empty$ 'skip$
   {
     swap$ duplicate$ empty$
       { "there's a number but no volume in " cite$ * warning$ }
       'skip$
     if$
     swap$
     "~(" swap$ * ")" *
   }
 if$ *
}

FUNCTION {format.chapter.pages}
{ chapter empty$
   { "" }
   { type empty$
       { bbl.chapter }
       { type "l" change.case$
         "type" bibinfo.check
       }
     if$
     chapter tie.or.space.prefix
     "chapter" bibinfo.check
     * *
   }
 if$
}

FUNCTION {format.booktitle}
{
 booktitle "booktitle" bibinfo.check
}
FUNCTION {format.in.ed.booktitle}
{ format.booktitle duplicate$ empty$ 'skip$
   {
     editor "editor" format.names.ed duplicate$ empty$ 'pop$
       {
         " " *
         get.bbl.editor
         capitalize
         "(" swap$ * "), " *
         * swap$
         * }
     if$
     word.in swap$ *
   }
 if$
}
FUNCTION {format.thesis.type}
{ type duplicate$ empty$
   'pop$
   { swap$ pop$
     "t" change.case$ "type" bibinfo.check
   }
 if$
}
FUNCTION {format.tr.number}
{ number "number" bibinfo.check
 type duplicate$ empty$
   { pop$ bbl.techrep }
   'skip$
 if$
 "type" bibinfo.check
 swap$ duplicate$ empty$
   { pop$ "t" change.case$ }
   { tie.or.space.prefix * * }
 if$
}
FUNCTION {format.article.crossref}
{
 word.in
 " \cite{" * crossref * "}" *
}
FUNCTION {format.book.crossref}
{ volume duplicate$ empty$
   { "empty volume in " cite$ * "'s crossref of " * crossref * warning$
     pop$ word.in
   }
   { bbl.volume
     swap$ tie.or.space.prefix "volume" bibinfo.check * * bbl.of space.word *
   }
 if$
 " \cite{" * crossref * "}" *
}
FUNCTION {format.incoll.inproc.crossref}
{
 word.in
 " \cite{" * crossref * "}" *
}
FUNCTION {format.org.or.pub}
{ 't :=
 ""
 address empty$ t empty$ and
   'skip$
   {
     t empty$
       { address "address" bibinfo.check *
       }
       { t *
         address empty$
           'skip$
           { ", " * address "address" bibinfo.check * }
         if$
       }
     if$
   }
 if$
}
FUNCTION {format.publisher.address}
{ publisher "publisher" bibinfo.warn format.org.or.pub
}

FUNCTION {format.organization.address}
{ organization "organization" bibinfo.check format.org.or.pub
}

FUNCTION {article}
{ output.bibitem
 format.authors "author" output.check
 author format.key output
 format.title "title" output.check
 crossref missing$
   {
     journal
     "journal" bibinfo.check
     "journal" output.check
     add.blank
     format.vol.num.pages output
   }
   { format.article.crossref output.nonnull
   }
 if$
 eid empty$
   { format.journal.pages }
   { format.journal.eid }
 if$
 format.issn output
 format.doi output
 format.url output
 format.note output
 fin.entry
}
FUNCTION {book}
{ output.bibitem
 author empty$
   { format.editors "author and editor" output.check
     editor format.key output
   }
   { format.authors output.nonnull
     crossref missing$
       { "author and editor" editor either.or.check }
       'skip$
     if$
   }
 if$
 format.btitle "title" output.check
 crossref missing$
   { format.bvolume output
     format.number.series output
     format.publisher.address output
   }
   {
     format.book.crossref output.nonnull
   }
 if$
 format.edition output
 format.isbn output
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}
FUNCTION {booklet}
{ output.bibitem
 format.authors output
 author format.key output
 format.title "title" output.check
 howpublished "howpublished" bibinfo.check output
 address "address" bibinfo.check output
 format.isbn output
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}

FUNCTION {inbook}
{ output.bibitem
 author empty$
   { format.editors "author and editor" output.check
     editor format.key output
   }
   { format.authors output.nonnull
     crossref missing$
       { "author and editor" editor either.or.check }
       'skip$
     if$
   }
 if$
 format.btitle "title" output.check
 crossref missing$
   {
     format.bvolume output
     format.chapter.pages "chapter and pages" output.check
     format.number.series output
     format.publisher.address output
   }
   {
     format.chapter.pages "chapter and pages" output.check
     format.book.crossref output.nonnull
   }
 if$
 format.edition output
 crossref missing$
   { format.isbn output }
   'skip$
 if$
 format.pages "pages" output.check
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}

FUNCTION {incollection}
{ output.bibitem
 format.authors "author" output.check
 author format.key output
 format.title "title" output.check
 crossref missing$
   { format.in.ed.booktitle "booktitle" output.check
     format.bvolume output
     format.number.series output
     format.chapter.pages output
     format.publisher.address output
     format.edition output
     format.isbn output
   }
   { format.incoll.inproc.crossref output.nonnull
     format.chapter.pages output
   }
 if$
 format.pages "pages" output.check
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}
FUNCTION {inproceedings}
{ output.bibitem
 format.authors "author" output.check
 author format.key output
 format.title "title" output.check
 crossref missing$
   { format.in.ed.booktitle "booktitle" output.check
     format.bvolume output
     format.number.series output
     publisher empty$
       { format.organization.address output }
       { organization "organization" bibinfo.check output
         format.publisher.address output
       }
     if$
     format.isbn output
     format.issn output
   }
   { format.incoll.inproc.crossref output.nonnull
   }
 if$
 format.pages "pages" output.check
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}
FUNCTION {conference} { inproceedings }
FUNCTION {manual}
{ output.bibitem
 format.authors output
 author format.key output
 format.btitle "title" output.check
 organization "organization" bibinfo.check output
 address "address" bibinfo.check output
 format.edition output
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}

FUNCTION {mastersthesis}
{ output.bibitem
 format.authors "author" output.check
 author format.key output
 format.btitle
 "title" output.check
 bbl.mthesis format.thesis.type output.nonnull
 school "school" bibinfo.warn output
 address "address" bibinfo.check output
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}

FUNCTION {misc}
{ output.bibitem
 format.authors output
 author format.key output
 format.title output
 howpublished "howpublished" bibinfo.check output
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}
FUNCTION {phdthesis}
{ output.bibitem
 format.authors "author" output.check
 author format.key output
 format.btitle
 "title" output.check
 bbl.phdthesis format.thesis.type output.nonnull
 school "school" bibinfo.warn output
 address "address" bibinfo.check output
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}

FUNCTION {proceedings}
{ output.bibitem
 format.editors output
 editor format.key output
 format.btitle "title" output.check
 format.bvolume output
 format.number.series output
 publisher empty$
   { format.organization.address output }
   { organization "organization" bibinfo.check output
     format.publisher.address output
   }
 if$
 format.isbn output
 format.issn output
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}

FUNCTION {techreport}
{ output.bibitem
 format.authors "author" output.check
 author format.key output
 format.title
 "title" output.check
 format.tr.number output.nonnull
 institution "institution" bibinfo.warn output
 address "address" bibinfo.check output
 format.doi output
 format.url output
 format.note output
 format.date "year" output.check
 fin.entry
}

FUNCTION {unpublished}
{ output.bibitem
 format.authors "author" output.check
 author format.key output
 format.title "title" output.check
 format.doi output
 format.url output
 format.note "note" output.check
 format.date output
 fin.entry
}

FUNCTION {default.type} { misc }
READ
FUNCTION {sortify}
{ purify$
 "l" change.case$
}
INTEGERS { len }
FUNCTION {chop.word}
{ 's :=
 'len :=
 s #1 len substring$ =
   { s len #1 + global.max$ substring$ }
   's
 if$
}
FUNCTION {format.lab.names}
{ 's :=
 "" 't :=
 s #1 "{vv~}{ll}" format.name$
 s num.names$ duplicate$
 #2 >
   { pop$
     " " * bbl.etal *
   }
   { #2 <
       'skip$
       { s #2 "{ff }{vv }{ll}{ jj}" format.name$ "others" =
           {
             " " * bbl.etal *
           }
           { bbl.and space.word * s #2 "{vv~}{ll}" format.name$
             * }
         if$
       }
     if$
   }
 if$
}

FUNCTION {author.key.label}
{ author empty$
   { key empty$
       { cite$ #1 #3 substring$ }
       'key
     if$
   }
   { author format.lab.names }
 if$
}

FUNCTION {author.editor.key.label}
{ author empty$
   { editor empty$
       { key empty$
           { cite$ #1 #3 substring$ }
           'key
         if$
       }
       { editor format.lab.names }
     if$
   }
   { author format.lab.names }
 if$
}

FUNCTION {editor.key.label}
{ editor empty$
   { key empty$
       { cite$ #1 #3 substring$ }
       'key
     if$
   }
   { editor format.lab.names }
 if$
}

FUNCTION {calc.short.authors}
{ type$ "book" =
 type$ "inbook" =
 or
   'author.editor.key.label
   { type$ "proceedings" =
       'editor.key.label
       'author.key.label
     if$
   }
 if$
 'short.list :=
}

FUNCTION {calc.label}
{ calc.short.authors
 short.list
 "("
 *
 year duplicate$ empty$
    { pop$ "????" }
    { purify$ #-1 #4 substring$ }
 if$
 *
 'label :=
}

FUNCTION {sort.format.names}
{ 's :=
 #1 'nameptr :=
 ""
 s num.names$ 'numnames :=
 numnames 'namesleft :=
   { namesleft #0 > }
   { s nameptr
     "{vv{ } }{ll{ }}{  f{ }}{  jj{ }}"
     format.name$ 't :=
     nameptr #1 >
       {
         "   "  *
         namesleft #1 = t "others" = and
           { "zzzzz" * }
           { t sortify * }
         if$
       }
       { t sortify * }
     if$
     nameptr #1 + 'nameptr :=
     namesleft #1 - 'namesleft :=
   }
 while$
}

FUNCTION {sort.format.title}
{ 't :=
 "A " #2
   "An " #3
     "The " #4 t chop.word
   chop.word
 chop.word
 sortify
 #1 global.max$ substring$
}
FUNCTION {author.sort}
{ author empty$
   { key empty$
       { "to sort, need author or key in " cite$ * warning$
         ""
       }
       { key sortify }
     if$
   }
   { author sort.format.names }
 if$
}
FUNCTION {author.editor.sort}
{ author empty$
   { editor empty$
       { key empty$
           { "to sort, need author, editor, or key in " cite$ * warning$
             ""
           }
           { key sortify }
         if$
       }
       { editor sort.format.names }
     if$
   }
   { author sort.format.names }
 if$
}
FUNCTION {editor.sort}
{ editor empty$
   { key empty$
       { "to sort, need editor or key in " cite$ * warning$
         ""
       }
       { key sortify }
     if$
   }
   { editor sort.format.names }
 if$
}
INTEGERS { seq.num }
FUNCTION {init.seq}
{ #0 'seq.num :=}
EXECUTE {init.seq}
FUNCTION {int.to.fix}
{ "000000000" swap$ int.to.str$ *
 #-1 #10 substring$
}
FUNCTION {presort}
{ calc.label
 label sortify
 "    "
 *
 seq.num #1 + 'seq.num :=
 seq.num  int.to.fix
 'sort.label :=
 sort.label
 *
 "    "
 *
 title field.or.null
 sort.format.title
 *
 #1 entry.max$ substring$
 'sort.key$ :=
}

ITERATE {presort}
SORT
STRINGS { last.label next.extra }
INTEGERS { last.extra.num number.label }
FUNCTION {initialize.extra.label.stuff}
{ #0 int.to.chr$ 'last.label :=
 "" 'next.extra :=
 #0 'last.extra.num :=
 #0 'number.label :=
}
FUNCTION {forward.pass}
{ last.label label =
   { last.extra.num #1 + 'last.extra.num :=
     last.extra.num int.to.chr$ 'extra.label :=
   }
   { "a" chr.to.int$ 'last.extra.num :=
     "" 'extra.label :=
     label 'last.label :=
   }
 if$
 number.label #1 + 'number.label :=
}
FUNCTION {reverse.pass}
{ next.extra "b" =
   { "a" 'extra.label := }
   'skip$
 if$
 extra.label 'next.extra :=
 extra.label
 duplicate$ empty$
   'skip$
   { "{\natexlab{" swap$ * "}}" * }
 if$
 'extra.label :=
 label extra.label * 'label :=
}
EXECUTE {initialize.extra.label.stuff}
ITERATE {forward.pass}
REVERSE {reverse.pass}
FUNCTION {bib.sort.order}
{ sort.label
 "    "
 *
 year field.or.null sortify
 *
 "    "
 *
 title field.or.null
 sort.format.title
 *
 #1 entry.max$ substring$
 'sort.key$ :=
}
ITERATE {bib.sort.order}
SORT
FUNCTION {begin.bib}
{ preamble$ empty$
   'skip$
   { preamble$ write$ newline$ }
 if$
 "\begin{thebibliography}{" number.label int.to.str$ * "}" *
 write$ newline$
 "\providecommand{\natexlab}[1]{#1}"
 write$ newline$
 "\providecommand{\url}[1]{\texttt{#1}}"
 write$ newline$
 "\providecommand{\urlprefix}{URL }"
 write$ newline$
 "\expandafter\ifx\csname urlstyle\endcsname\relax"
 write$ newline$
 "  \providecommand{\doi}[1]{doi:\discretionary{}{}{}#1}\else"
 write$ newline$
 "  \providecommand{\doi}[1]{doi:\discretionary{}{}{}\begingroup \urlstyle{rm}\url{#1}\endgroup}\fi"
 write$ newline$
 "\providecommand{\bibinfo}[2]{#2}"
 write$ newline$
}
EXECUTE {begin.bib}
EXECUTE {init.state.consts}
ITERATE {call.type$}
FUNCTION {end.bib}
{ newline$
 "\end{thebibliography}" write$ newline$
}
EXECUTE {end.bib}
%% End of customized bst file
%%
%%
%% End of file `elsarticle-num-names.bst'.


