%%% -*-BibTeX-*-
%%% ====================================================================
%%%  @BibTeX-style-file{
%%%     author          = "Nelson H. F. Beebe, Boris Veytsman and Gerald Murray",
%%%     version         = "1.18",
%%%     date            = "10 July 2016",
%%%     filename        = "ACM-Reference-Format.bst",
%%%     email           = "beebe@math.utah.edu, beebe@acm.org,
%%%                        beebe@computer.org, borisv@lk.net, murray@hq.acm.org",
%%%     codetable       = "ISO/ASCII",
%%%     keywords        = "ACM Transactions bibliography style; BibTeX",
%%%     license         = "public domain",
%%%     supported       = "yes",
%%%     abstract        = "",
%%%  }
%%% ====================================================================

%  ACM BibTeX style, ACM-Reference-Format.bst
%  for BibTeX version 0.99c, LaTeX version 3.141
%  ACM extensions with code cleaned up, extended, and debugged 10--15-Nov-2008
%  Revised 17-APRIL-2008 (Nelson)
%  Revised 13-MARCH-2011 (Boris/Gerry)
%  Revised 23-MARCH-2011 (Boris/Gerry)
%  Revised 27-MARCH-2011 (Boris/Gerry)
%  Revised 15-APRIL-2011 (Boris/Gerry)
%  Revised 27-SEPTEMBER-2011 (Boris)
%  Revised 10-JULY-2016 (Boris)
%  Revised 04-FEB-2017 (Boris)
%
%
% History (by Nelson)
%
% Based on 'acmtrans' (for ACM Journals)
% Date: 28th April 2008
%
% 1. Avoid 'repeating' the 'month' values.
% 2. Avoid incorrectly italicizing the volume number.
% 3. Avoid non italicizing certain titles (book, inproceedings etc).
% 4. NO series if there is NO volume.
% 5. Sorting of reference with first surname.
% 6. Article no added for Inproceedings.
%
% Date: 07th May 2008
%
% 1. Abbreviation list added
%
%   Citation format: [author-last-name year]
%             [author-last-name and author-last-name year]
%             [author-last-name, author-last-name, and author-last-name year]
%             [author-last-name et al. year]
%             [author-last-name]
%             author-last-name [year]
%             [author-last-name and author-last-name]
%             [author-last-name et al.]
%             [year] or [year,year]
%             year or year,year
%
%   Reference list ordering: alphabetical by author or whatever passes
%    for author in the absence of one.
%
% Features of the old acmtrans.bst:
% =================================
%
% - all authors appear last name first.
% - all pages are listed xx-xx, (no pp.) and are at the end of the reference
% - publishers are identified as publisher, address
% - conferences papers (inproceedings) may give city of conference,
%   date of conference, and journal that the proceedings appear in.
% - months abbreviated to max four letters (eg. Mar.)
% - volume of a series indicated after the title of the series
% - editors appear after edited title and are identified by a trailing "Eds."
%   not in parentheses.  Editor names are not given in small caps.
%   (unless there is no author line)
% - names terminated with a period even if there is no first name.
% - editions are indicated trailing after the work, not in parentheses.
% - "et al." citations have a protected period to avoid bad spacing (jrh)
% - "address" required when publisher given
% - series (roman) and volume are in a sentence separate from (book-)title
%
%
% Features of chicago.bst:
% =======================
%
% - full names used in citations, but abbreviated citations are available
%   (see above)
% - if an entry has a "month", then the month and year are also printed
%   as part of that bibitem.
% - all conjunctions use "and" instead of "\&"
% - major modification from Chicago Manual of Style (13th ed.) is that
%   only the first author in a reference appears last name first-
%   additional authors appear as J. Q. Public.
% - pages are listed as "pp. xx-xx" in all entry types except
%   article entries.
% - book, inbook, and manual use "location: publisher" (or organization)
%   for address and publisher. All other types list publishers separately.
% - "pp." are used to identify page numbers for all entry types except
%   articles.
% - organization is used as a citation label if neither author nor editor
%   is present (for manuals).
% - "et al." is used for long author and editor lists, or when "others"
%   is used.
%
% Modifications and bug fixes from newapa.bst:
% ===========================================
%
%   - added month, year to bib entries if month is present
%   - fixed bug with In proceedings, added necessary comma after title
%   - all conjunctions changed to "and" from "\&"
%   - fixed bug with author labels in my.full.label: "et al." now is
%        generated when "others" is an author name
%   - major modification from Chicago Manual of Style (13th ed.) is that
%     only the first author in a reference appears last name first-
%     additional authors appear as J. Q. Public.
%   - pages are listed as "pp. xx-xx" in all entry types except
%     article entries. Unnecessary (IMHO) "()" around page numbers
%     were removed, and page numbers now don't end with a period.
%   - created chicago.sty for use with this bibstyle (required).
%   - fixed bugs in FUNCTION {format.vol.num.pages} for missing volume,
%     number, and /or pages. Renamed to format.journal.volume.number.
%   - fixed bug in formatting booktitles: additional period an error if
%     book has a volume.
%   - fixed bug: editors usually given redundant period before next clause
%     (format.editors.dot) removed.
%   - added label support for organizations, if both author and editor
%     are missing (from alpha.bst). If organization is too long, then
%     the key field is used for abbreviated citations.
%   - In proceedings or books of several volumes, no comma was written
%     between the "Volume x" and the page numbers (this was intentional
%     in newapa.bst). Fixed.
%   - Some journals may not have volumes/numbers, only month/year (eg.
%     IEEE Computer). Fixed bug in article style that assumed volume/number
%     was always present.
%
% Original documentation for newapa.sty:
% =====================================
%
% This version was made by modifying the master file made by
% Oren Patashnik (PATASHNIK@SCORE.STANFORD.EDU), and the 'named' BibTeX
% style of Peter F. Patel-Schneider.
%
% Copyright (C) 1985, all rights reserved.
% Copying of this file is authorized only if either
% (1) you make absolutely no changes to your copy, including name, or
% (2) if you do make changes, you name it something other than 'newapa.bst'.
% There are undoubtably bugs in this style.  If you make bug fixes,
% improvements, etc.  please let me know.  My e-mail address is:
%    spencer@cgrg.ohio.state.edu or 71160.3141@compuserve.com
%
% This style was made from 'plain.bst', 'named.bst', and 'apalike.bst',
% with lots of tweaking to make it look like APA style, along with tips
% from Young Ryu and Brian Reiser's modifications of 'apalike.bst'.
%
%
% Start of ACM-Reference-Format-Journals.bst
%
% Note: Many of the new bibentry 'fields' will only work with the
% 'ACM-Reference-Format-Journals.bst' file. Legacy .bib files (which will, in all probability,
% NOT contain these new fields) will _still_ work with the ACM-Reference-Format-Journals.bst.
%
%
ENTRY
  { address
    advisor
    archiveprefix
    author
    booktitle
    chapter
    city        % jtb: added
    date        % jtb: added
    edition
    editor
    eprint
    howpublished
    institution
    journal
    key
    month
    note
    number
    organization
    pages
    primaryclass
    publisher
    school
    series
    title
    type
    volume
    year
        % New keys recognized
        issue         % UTAH: used in, e.g., ACM SIGSAM Bulletin and ACM Communications in Computer Algebra
        articleno
	eid           
        day           % UTAH: needed for newspapers, weeklies, bi-weeklies
        doi           % UTAH
        url           % UTAH
        bookpages     % UTAH
        numpages
        lastaccessed  % UTAH: used only for @Misc{...}
        coden         % UTAH
        isbn          % UTAH
        isbn-13       % UTAH
        issn          % UTAH
        lccn          % UTAH
  }
  {}
  { label.year extra.label sort.year sort.label }

INTEGERS { output.state before.all mid.sentence after.sentence after.block }

INTEGERS { show-isbn-10-and-13 }  % initialized below in begin.bib

INTEGERS { nameptr namesleft numnames }

INTEGERS { multiresult }

INTEGERS { len }

INTEGERS { last.extra.num }

STRINGS { s t t.org u }

STRINGS { last.label next.extra }

STRINGS { p1 p2 p3 page.count }

FUNCTION { not }
{
    { #0 }
    { #1 }
  if$
}

FUNCTION { and }
{
    'skip$
    { pop$ #0 }
  if$
}

FUNCTION { or }
{
   { pop$ #1 }
    'skip$
  if$
}


FUNCTION { dump.stack.1 }
{
    duplicate$ "STACK[top] = [" swap$ * "]" * warning$
}

FUNCTION { dump.stack.2 }
{
    duplicate$ "STACK[top  ] = [" swap$ * "]" * warning$
    swap$
    duplicate$ "STACK[top-1] = [" swap$ * "]" * warning$
    swap$
}

FUNCTION { empty.or.unknown }
{
  %% Examine the top stack entry, and push 1 if it is empty, or
  %% consists only of whitespace, or is a string beginning with two
  %% queries (??), and otherwise, push 0.
  %%
  %% This function provides a replacement for empty$, with the
  %% convenient feature that unknown values marked by two leading
  %% queries are treated the same as missing values, and thus, do not
  %% appear in the output .bbl file, and yet, their presence in .bib
  %% file(s) serves to mark values which are temporarily missing, but
  %% are expected to be filled in eventually once more data is
  %% obtained.  The TeX User Group and BibNet bibliography archives
  %% make extensive use of this practice.
  %%
  %% An empty string cannot serve the same purpose, because just as in
  %% statistics data processing, an unknown value is not the same as an
  %% empty value.
  %%
  %% At entry: stack = ... top:[string]
  %% At exit:  stack = ... top:[0 or 1]

  duplicate$ empty$
    { pop$ #1 }
    { #1 #2 substring$ "??" = }
  if$
}

FUNCTION { writeln }
{
  %% In BibTeX style files, the sequences
  %%
  %%     ... "one" "two" output
  %%     ... "one" "two" output.xxx
  %%
  %% ship "one" to the output file, possibly following by punctuation,
  %% leaving the stack with
  %%
  %%     ... "two"
  %%
  %% There is thus a one-string lag in output processing that must be
  %% carefully handled to avoid duplicating a string in the output
  %% file.  Unless otherwise noted, all output.xxx functions leave
  %% just one new string on the stack, and that model should be born
  %% in mind when reading or writing function code.
  %%
  %% BibTeX's asynchronous buffering of output from strings from the
  %% stack is confusing because newline$ bypasses the buffer.  It
  %% would have been so much easier for newline to be a character
  %% rather than a state of the output-in-progress.
  %%
  %% The documentation in btxhak.dvi is WRONG:  it says
  %%
  %%    newline$ Writes onto the bbl file what's accumulated in the
  %%             output buffer. It writes a blank line if and only
  %%             if the output buffer is empty. Since write$ does
  %%             reasonable line breaking, you should use this
  %%             function only when you want a blank line or an
  %%             explicit line break.
  %%
  %%    write$   Pops the top (string) literal and writes it on the
  %%             output buffer (which will result in stuff being
  %%             written onto the bbl file when the buffer fills
  %%             up).
  %%
  %% Examination of the BibTeX source code shows that write$ does
  %% indeed behave as claimed, but newline$ sends a newline character
  %% directly to the output file, leaving the stack unchanged.  The
  %% first line "Writes onto ... buffer." is therefore wrong.
  %%
  %% The original BibTeX style files almost always use "write$ newline$"
  %% in that order, so it makes sense to hide that pair in a private
  %% function like this one, named after a statement in Pascal,
  %% the programming language embedded in the BibTeX Web program.

  write$                % output top-of-stack string
  newline$              % immediate write of newline (not via stack)
}

FUNCTION { init.state.consts }
{
  #0 'before.all :=
  #1 'mid.sentence :=
  #2 'after.sentence :=
  #3 'after.block :=
}

FUNCTION { output.nonnull }
{ % Stack in: ... R S T  Stack out: ... R T   File out: S<comma><space>
  's :=
  output.state mid.sentence =
    {
      ", " * write$
    }
    {
      output.state after.block =
        {
          add.period$ writeln
          "\newblock " write$
        }
        {
          output.state before.all =
            {
              write$
            }
            {
              add.period$ " " * write$
            }
          if$
        }
      if$
      mid.sentence 'output.state :=
    }
  if$
  s
}

FUNCTION { output.nonnull.dot.space }
{ % Stack in: ... R S T  Stack out: ... R T   File out: S<dot><space>
  's :=
  output.state mid.sentence =           % { "<DEBUG output.nonnull.dot.space>. " * write$ }
    {
      ". " * write$
    }
    {
      output.state after.block =
        {
          add.period$ writeln "\newblock " write$
        }
        {
          output.state before.all =
            {
              write$
            }
            {
              add.period$ " " * write$
            }
          if$
        }
      if$
      mid.sentence 'output.state :=
    }
  if$
  s
}

FUNCTION { output.nonnull.remove }
{ % Stack in: ... R S T  Stack out: ... R T   File out: S<space>
  's :=
  output.state mid.sentence =
    {
      " " * write$
    }
    {
      output.state after.block =
        {
          add.period$ writeln "\newblock " write$
        }
        {
          output.state before.all =
            {
              write$
            }
            {
              add.period$ " " * write$
            }
          if$
        }
      if$
      mid.sentence 'output.state :=
    }
  if$
  s
}

FUNCTION { output.nonnull.removenospace }
{ % Stack in: ... R S T  Stack out: ... R T   File out: S
  's :=
  output.state mid.sentence =
    {
      "" * write$
    }
    {
      output.state after.block =
        {
          add.period$ writeln "\newblock " write$
        }
        {
          output.state before.all =
            {
              write$
            }
            {
              add.period$ " " * write$
            }
          if$
        }
      if$
      mid.sentence 'output.state :=
    }
  if$
  s
}

FUNCTION { output }
{ % discard top token if empty, else like output.nonnull
  duplicate$ empty.or.unknown
    'pop$
    'output.nonnull
  if$
}

FUNCTION { output.dot.space }
{ % discard top token if empty, else like output.nonnull.dot.space
  duplicate$ empty.or.unknown
    'pop$
    'output.nonnull.dot.space
  if$
}

FUNCTION { output.removenospace }
{ % discard top token if empty, else like output.nonnull.removenospace
  duplicate$ empty.or.unknown
    'pop$
    'output.nonnull.removenospace
  if$
}

FUNCTION { output.check }
{ % like output, but warn if key name on top-of-stack is not set
  't :=
  duplicate$ empty.or.unknown
    { pop$ "empty " t * " in " * cite$ * warning$ }
    'output.nonnull
  if$
}

FUNCTION { bibinfo.output.check }
{ % like output.check, adding bibinfo field
  't :=
  duplicate$ empty.or.unknown
    { pop$ "empty " t * " in " * cite$ * warning$ }
    { "\bibinfo{" t "}{" * * swap$ * "}" *
      output.nonnull }
  if$
}

FUNCTION { output.check.dot.space }
{ % like output.dot.space, but warn if key name on top-of-stack is not set
  't :=
  duplicate$ empty.or.unknown
    { pop$ "empty " t * " in " * cite$ * warning$ }
    'output.nonnull.dot.space
  if$
}

FUNCTION { fin.block }
{ % functionally, but not logically, identical to fin.entry
   add.period$
   writeln
}

FUNCTION { fin.entry }
{
   add.period$
   writeln
}

FUNCTION { new.sentence }
{ % update sentence state, with neither output nor stack change
  output.state after.block =
    'skip$
    {
      output.state before.all =
        'skip$
        { after.sentence 'output.state := }
      if$
    }
  if$
}

FUNCTION { fin.sentence }
{
   add.period$
   write$
   new.sentence
   ""
}

FUNCTION { new.block }
{
  output.state before.all =
    'skip$
    { after.block 'output.state := }
  if$
}

FUNCTION { output.coden }       % UTAH
{ % output non-empty CODEN as one-line sentence (stack untouched)
  coden empty.or.unknown
    { }
    { "\showCODEN{" coden * "}" * writeln }
  if$
}

FUNCTION { format.articleno }
{
  articleno empty.or.unknown not eid empty.or.unknown not and
     { "Both articleno and eid are defined for " cite$ * warning$ }
     'skip$
  if$
  articleno empty.or.unknown eid empty.or.unknown and
     { "" }
     {
        numpages empty.or.unknown
          { "articleno or eid field, but no numpages field, in " 
            cite$ * warning$ }
          { }
        if$
        eid empty.or.unknown 
          { "Article \bibinfo{articleno}{" articleno * "}" * }
          { "Article \bibinfo{articleno}{" eid * "}" * }
        if$
     }
  if$
}

FUNCTION { format.year }
{ % push year string or "????" onto output stack
  %% Because year is a mandatory field, we always force SOMETHING
  %% to be output
  "\bibinfo{year}{"
  year empty.or.unknown
    { "????" }
    { year }
  if$
  *  "}" *
}

FUNCTION { format.day.month }
{ % push "day month " or "month " or "" onto output stack
  day empty.or.unknown
    {
      month empty.or.unknown
        { "" }
        { "\bibinfo{date}{" month * "} " *}
      if$
    }
    {
      month empty.or.unknown
        { "" }
        { "\bibinfo{date}{" day * " " * month * "} " *}
      if$
    }
  if$
}

FUNCTION { format.day.month.year }     % UTAH
{ % if month is empty, push "" else push "(MON.)" or "(DD MON.)"
  % Needed for frequent periodicals: 2008. ... New York Times C-1, C-2, C-17 (23 Oct.)
  % acm-*.bst addition: prefix parenthesized date string with
  % ", Article nnn "
  articleno empty.or.unknown eid empty.or.unknown and
    { "" }
    { output.state after.block =
       {", " format.articleno * }
       { format.articleno  }
      if$
    }
  if$
  " (" * format.day.month * format.year * ")" *
}

FUNCTION { output.day.month.year }     % UTAH
{ % if month is empty value, do nothing; else output stack top and
  % leave with new top string "(MON.)" or "(DD MON.)"
  % Needed for frequent periodicals: 2008. ... New York Times C-1, C-2, C-17 (23 Oct.)
  format.day.month.year
  output.nonnull.remove
}

FUNCTION { strip.doi } % UTAH
{ % Strip any Web address prefix to recover the bare DOI, leaving the
  % result on the output stack, as recommended by CrossRef DOI
  % documentation.
  % For example, reduce "http://doi.acm.org/10.1145/1534530.1534545" to
  % "10.1145/1534530.1534545".  That is later typeset and displayed as
  % doi:10.1145/1534530.1534545 as the LAST item in the reference list
  % entry.  Publisher Web sites wrap this with a suitable link to a real
  % URL to resolve the DOI, and the master https://doi.org/ address is
  % preferred, since publisher-specific URLs can disappear in response
  % to economic events.  All journals are encouraged by the DOI
  % authorities to use that typeset format and link procedures for
  % uniformity across all publications that include DOIs in reference
  % lists.
  % The numeric prefix is guaranteed to start with "10.", so we use
  % that as a test.
  % 2017-02-04 Added stripping of https:// (Boris)
  doi #1 #3 substring$ "10." =
    { doi }
    {
      doi 't :=  % get modifiable copy of DOI

      % Change https:// to http:// to strip both prefixes (BV)

      t #1 #8 substring$ "https://" =
        { "http://"  t #9 t text.length$ #8 - substring$ * 't := }
        { }
      if$

      t #1 #7 substring$ "http://" =
        {
            t #8 t text.length$ #7 - substring$ 't :=

            "INTERNAL STYLE-FILE ERROR" 's :=

            % search for next "/" and assign its suffix to s

            { t text.length$ }
            {
              t #1 #1 substring$ "/" =
                {
                  % save rest of string as true DOI (should be 10.xxxx/yyyy)
                  t #2 t text.length$ #1 - substring$ 's :=
                  "" 't :=    % empty string t terminates the loop
                }
                {
                  % discard first character and continue loop: t <= substring(t,2,last)
                  t #2 t text.length$ #1 - substring$ 't :=
                }
              if$
            }
            while$

            % check for valid DOI (should be 10.xxxx/yyyy)
            s #1 #3 substring$ "10." =
              { }
              { "unrecognized DOI substring " s * " in DOI value [" * doi * "]" * warning$ }
            if$

            s   % push the stripped DOI on the output stack

        }
        {
          "unrecognized DOI value [" doi * "]" * warning$
          doi   % push the unrecognized original DOI on the output stack
        }
      if$
    }
  if$
}

%
% Change by BV: added standard prefix to URL
%
FUNCTION { output.doi } % UTAH
{ % output non-empty DOI as one-line sentence (stack untouched)
  doi empty.or.unknown
    { }
    {
      %% NB: We want URLs at beginning of line to reduce likelihood of
      %% BibTeX's nasty line wrapping after column 79, which then requires
      %% manual (or automated) editing of the .bbl file to repair.
      %% The \url{} macro strips percent-newlines, and is thus safe in
      %% the presence of the line wrapping, but \path|...| and
      %% \verb|...| do not.
      "\showDOI{%" writeln
      "\url{https://doi.org/" strip.doi * "}}" * writeln
    }
  if$
}

FUNCTION { output.isbn }                % UTAH
{ % output non-empty ISBN-10 and/or ISBN-13 as one-line sentences (stack untouched)
  show-isbn-10-and-13
    {
      %% show both 10- and 13-digit ISBNs
      isbn empty.or.unknown
        { }
        {
          "\showISBNx{" isbn * "}" * writeln
        }
      if$
      isbn-13 empty.or.unknown
        { }
        {
          "\showISBNxiii{" isbn-13 * "}" * writeln
        }
      if$
    }
    {
      %% show 10-digit ISBNs only if 13-digit ISBNs not available
      isbn-13 empty.or.unknown
        {
          isbn empty.or.unknown
            { }
            {
              "\showISBNx{" isbn * "}" * writeln
            }
          if$
        }
        {
          "\showISBNxiii{" isbn-13 * "}" * writeln
        }
      if$
    }
  if$
}

FUNCTION { output.issn } % UTAH
{ % output non-empty ISSN as one-line sentence (stack untouched)
  issn empty.or.unknown
    { }
    { "\showISSN{" issn * "}" * writeln }
  if$
}

FUNCTION { output.issue }
{ % output non-empty issue number as a one-line sentence (stack untouched)
  issue empty.or.unknown
    { }
    { "Issue " issue * "." * writeln }
  if$
}

FUNCTION { output.lccn } % UTAH
{ % return with stack untouched
  lccn empty.or.unknown
    { }
    { "\showLCCN{" lccn * "}" * writeln }
  if$
}

FUNCTION { output.note } % UTAH
{ % return with stack empty
  note empty.or.unknown
    { }
    { "\shownote{" note add.period$ * "}" * writeln }
  if$
}

FUNCTION { output.note.check } % UTAH
{ % return with stack empty
  note empty.or.unknown
    { "empty note in " cite$ * warning$ }
    { "\shownote{" note add.period$ * "}" * writeln }
  if$
}

FUNCTION { output.eprint } %
{ % return with stack empty
  eprint empty.or.unknown
    { }
    { "\showeprint"
         archiveprefix empty.or.unknown
           { }
           { "["  archiveprefix "l" change.case$ "]" * * * }
         if$
         "{" *
         primaryclass empty.or.unknown
           { }
           { primaryclass "/" * *}
         if$
         eprint "}" * *
         writeln
    }
  if$
}


%
% Changes by BV 2011/04/15.  Do not output
% url if doi is defined
%
FUNCTION { output.url } % UTAH
{ % return with stack untouched
  % output URL and associated lastaccessed fields
  doi empty.or.unknown
  {
    url empty.or.unknown
      { }
      {
          %% NB: We want URLs at beginning of line to reduce likelihood of
          %% BibTeX's nasty line wrapping after column 79, which would require
          %% manual (or automated) editing of the .bbl file to repair.  However,
          %% the \url{} macro handles the unwrapping job automatically.
          "\showURL{%" writeln
          lastaccessed empty.or.unknown
            { "" }
            { "Retrieved " lastaccessed * " from " * }
          if$

          %% The URL field may contain a semicolon-separated list of Web
          %% addresses, and we locate and wrap each of them in \url{...}.
          %% The simplistic approach of putting the entire list into the
          %% macro argument is that the semicolons are typeset in a
          %% typewriter font, and no space follows them.
          %%
          %% We therefore replace the original code
          %%    "\url{" * url * "}}" * writeln
          %% with this character-at-a-time loop:

          "\url{" *

          url 't :=                       % get modifiable copy of URL list

          { t text.length$ }
          {
            t #1 #1 substring$ ";" =
              {                         % then split argument at separator
                "};" * writeln
                "\url{"
              }
              {                         % else concatenate nonblank character to argument
                t #1 #1 substring$ " " =
                  { }
                  { t #1 #1 substring$ * }
                if$
              }
            if$

            t #2 t text.length$ #1 - substring$ 't :=
          }
          while$

          "}}" * writeln
      }
    if$
  }
  { }
  if$
}

FUNCTION { output.year.check }
{ % warn if year empty, else output top string and leave " YEAR<label>" on stack in mid-sentence
  year empty.or.unknown
     { "empty year in " cite$ * warning$ }
     { write$
       " \bibinfo{year}{" year * "}"  *
       "\natexlab{" extra.label * "}" * *
       mid.sentence 'output.state :=
     }
  if$
}


FUNCTION { le }
{
  %% test whether first number is less than or equal to second number
  %% stack in:  n1 n2
  %% stack out: if n1 <= n2 then 1 else 0

  %% "DEBUG: le " cite$ * warning$
  > { #0 } { #1 } if$
}

FUNCTION { ge }
{
  %% test whether first number is greater than or equal to second number
  %% stack in:  n1 n2
  %% stack out: if n1 >= n2 then 1 else 0

  %% "DEBUG: ge " cite$ * warning$
  < { #0 } { #1 } if$
}

FUNCTION { is.leading.digit }
{
  %% test whether first character of string is a digit
  %% stack in:  string
  %% stack out: if first-char-is-digit then 1 else 0

  #1 #1 substring$                      % replace string by string[1:1]
  duplicate$                            % string[1:1] string[1:1]
  chr.to.int$
  "0" chr.to.int$ swap$ le              % "0" <= string[1:1] --> 0-or-1
  swap$                                 % 0-or-1 string[1:1]
  chr.to.int$
  "9" chr.to.int$ le                    % string[1:1} <= "9" --> 0-or-1
  and
}

FUNCTION { skip.digits }
{
  %% skip over leading digits in string
  %% stack in:  string
  %% stack out: rest-of-string leading-digits

  %% "DEBUG: enter skip.digits " cite$ * warning$

  %% dump.stack.1

  duplicate$
  't :=
  't.org :=
  "" 'u :=

  { t text.length$ }
  {
    %% "=================DEBUG: skip.digits   t = [" t * "]" * warning$
    t is.leading.digit
      { t #2 t text.length$ #1 - substring$ }
      {
        t 'u :=
        ""
      }
    if$
    't :=
  }
  while$

  u                                                             % rest of string
  t.org #1 t.org text.length$ u text.length$ - substring$       % leading digits

  %% "DEBUG: t.org = [" t.org * "]" * warning$
  %% "DEBUG: u     = [" u * "]" * warning$

  %% dump.stack.2

  %% "DEBUG: leave skip.digits " cite$ * warning$
}

FUNCTION { skip.nondigits }
{
  %% skip over leading nondigits in string
  %% stack in:  string
  %% stack out: rest-of-string

  %% "DEBUG: enter skip.nondigits " cite$ * warning$

  't :=
  "" 'u :=

  { t text.length$ }
  {
    %% "=================DEBUG: skip.nondigits   t = [" t * "]" * warning$
    t is.leading.digit
      {
        t 'u :=
        ""
      }
      { t #2 t text.length$ #1 - substring$ }
    if$
    't :=
  }
  while$

  u                     % rest of string

  %% dump.stack.1
  %% "DEBUG: leave skip.nondigits " cite$ * warning$
}

FUNCTION { parse.next.number }
{
  %% stack in:  string
  %% stack out: rest-of-string next-numeric-part-of-string
  %% Example:
  %% stack in:  "123:1--123:59"
  %% stack out: ":1--123:59" "123"

  's :=
  s skip.nondigits 's :=
  s skip.digits
}

FUNCTION { reduce.pages.to.page.count }
{
  %% Stack in:  arbitrary-and-unused
  %% Stack out: unchanged
  %%
  %% For the new-style pagination with article number and numpages or
  %% pages, we expect to have BibTeX entries containing something like
  %%     articleno = "17",
  %%     pages     = "1--23",
  %% with output "Article 17, 23 pages",
  %% or
  %%     articleno = "17",
  %%     numpages  = "23",
  %% with output "Article 17, 23 pages",
  %% or
  %%     articleno = "17",
  %%     pages     = "17:1--17:23",
  %% with output "Article 17, 23 pages",
  %%
  %% If articleno is missing or empty, then we should output "1--23",
  %% "23" (with a warning of a missing articleno), or "17:1--17:23",
  %% respectively.

  %% "DEBUG: enter reduce.pages.to.page.count " cite$ * warning$

  %% "DEBUG: pages = [" pages * "]" * warning$

  pages
  parse.next.number 'p1 :=
  parse.next.number 'p2 :=
  parse.next.number 'p3 :=
  parse.next.number 'page.count :=

  duplicate$
  empty.or.unknown
    {  }
    {
      duplicate$ "unexpected trailing garbage [" swap$ *
      "] after n:p1--n:p2 in pages = [" *
      pages *
      "] in " *
      cite$ *
      warning$
    }
  if$

  pop$

  %% "DEBUG: reduce.pages.to.page.count: "
  %% " p1 = " p1 * *
  %% " p2 = " p2 * *
  %% " p3 = " p3 * *
  %% " p4 = " page.count * *
  %% " in " cite$ * * warning$

  p1 p3 =   p2 "1" =   and   numpages empty.or.unknown   and
    { "INFO: reduced pages = [" pages * "] to numpages = [" * page.count * "]" * warning$ }
    {
      numpages empty.or.unknown
        { pages }
        { numpages }
      if$
      'page.count :=
    }
  if$

  p1 "1" =   p3 empty.or.unknown   and   numpages empty.or.unknown   and
    {
      p2 'page.count :=
      "INFO: reduced pages = [" pages * "] to numpages = [" * page.count * "]" * warning$
    }
    {
      numpages empty.or.unknown
        { pages }
        { numpages }
      if$
      'page.count :=
    }
  if$

  %% "DEBUG: leave reduce.pages.to.page.count " cite$ * warning$
}

FUNCTION { new.block.checkb }
{ % issue a new.block only if at least one of top two stack strings is not empty
  empty.or.unknown
  swap$ empty.or.unknown
  and
    'skip$
    'new.block
  if$
}

FUNCTION { field.or.null }
{ % convert empty value to null string, else return value
  duplicate$ empty.or.unknown
    { pop$ "" }
    'skip$
  if$
}

FUNCTION { emphasize }
{ % emphasize a non-empty top string on the stack (WITHOUT italic correction)
  duplicate$ empty.or.unknown
    { pop$ "" }
    { "{\em " swap$ * "}" * }
  if$
}

FUNCTION { emphasize.with.italic.correction }
{ % convert empty string to null string, or emphasize with a trailing italic correction
  duplicate$ empty.or.unknown
    { pop$ "" }
    { "{\em " swap$ * "\/}" * }
  if$
}

FUNCTION { comma }
{ % convert empty string to null string, or brace string and add trailing comma
  duplicate$ empty.or.unknown
    { pop$ "" }
    { "{" swap$ * "}," * }
  if$
}

FUNCTION { format.names }
{
  % Format bibliographical entries with the first author last name first,
  % and subsequent authors with initials followed by last name.
  % All names are formatted in this routine.

  's :=
  #1 'nameptr :=               % nameptr = 1;
  s num.names$ 'numnames :=    % numnames = num.name$(s);
  numnames 'namesleft :=
    { namesleft #0 > }
    { nameptr #1 =
        %NO: BAD ORDER: {"{" s nameptr "{ff~}{ll}{, jj}{, vv}" format.name$ * "}" * 't := }
        %NO: BAD ORDER: {"{" s nameptr "{ff~}{ll}{, jj}{, vv}" format.name$ * "}" * 't := }
        {"\bibinfo{person}{" s nameptr "{ff }{vv }{ll}{, jj}" format.name$ * "}" * 't := }
        {"\bibinfo{person}{" s nameptr "{ff }{vv }{ll}{, jj}" format.name$ * "}" * 't := }
      if$
      nameptr #1 >
        {
          namesleft #1 >
            { ", " * t * }
            {
              numnames #2 >
                { "," * }
                'skip$
              if$
              t "\bibinfo{person}{others}" =
                { " {et~al\mbox{.}}" * } % jrh: avoid spacing problems
                { " {and} " * t * } % from Chicago Manual of Style
              if$
            }
          if$
        }
        't
      if$
      nameptr #1 + 'nameptr :=          % nameptr += 1;
      namesleft #1 - 'namesleft :=      % namesleft =- 1;
    }
  while$
}

FUNCTION { my.full.label }
{
  's :=
  #1 'nameptr :=               % nameptr = 1;
  s num.names$ 'numnames :=    % numnames = num.name$(s);
  numnames 'namesleft :=
    { namesleft #0 > }

    { s nameptr "{vv~}{ll}" format.name$ 't :=  % get the next name
      nameptr #1 >
        {
          namesleft #1 >
            { ", " * t * }
            {
              numnames #2 >
                { "," * }
                'skip$
              if$
              t "others" =
                { " et~al\mbox{.}" * } % jrh: avoid spacing problems
                { " and " * t * } % from Chicago Manual of Style
              if$
            }
          if$
        }
        't
      if$
      nameptr #1 + 'nameptr :=          % nameptr += 1;
      namesleft #1 - 'namesleft :=      % namesleft =- 1;
    }
  while$

}

FUNCTION { format.names.fml }
{
  % Format names in "familiar" format, with first initial followed by
  % last name. Like format.names, ALL names are formatted.
  % jtb: The names are NOT put in small caps

  's :=
  #1 'nameptr :=               % nameptr = 1;
  s num.names$ 'numnames :=    % numnames = num.name$(s);
  numnames 'namesleft :=
    { namesleft #0 > }

    {
      "\bibinfo{person}{" s nameptr "{ff~}{vv~}{ll}{, jj}" format.name$ * "}" * 't :=

      nameptr #1 >
        {
          namesleft #1 >
            { ", " * t * }
            {
              numnames #2 >
                { "," * }
                'skip$
              if$
              t "\bibinfo{person}{others}" =
                { " {et~al\mbox{.}}" * }
                { " {and} " * t * }
              if$
            }
          if$
        }
        't
      if$
      nameptr #1 + 'nameptr :=          % nameptr += 1;
      namesleft #1 - 'namesleft :=      % namesleft =- 1;
    }
  while$
}

FUNCTION { format.authors }
{
  author empty.or.unknown
    { "" }
    {
      "\bibfield{author}{"
      author format.names add.period$ * "}" *} % jtb: add period if none before
  if$
}

FUNCTION { format.key }
{
  empty.or.unknown
    { key field.or.null }
    { "" }
  if$
}

FUNCTION { format.no.key }
{
  empty.or.unknown
    { "" }
    { "" }
  if$
}

FUNCTION { format.editors.fml }
{
  % Format editor names for use in the "in" types: inbook, incollection,
  % inproceedings: first initial, then last names. When editors are the
  % LABEL for an entry, then format.editor is used which lists editors
  % by last name first.

  editor empty.or.unknown
    { "" }
    {
      "\bibfield{editor}{"
      editor format.names.fml
      *  "}" *
      editor num.names$ #1 >
        { " (Eds.)" * }
        { " (Ed.)" * }
      if$
    }
  if$
}

FUNCTION { format.editors }
{ % format editor names for use in labels, last names first.
  editor empty.or.unknown
    { "" }
    {
      "\bibfield{editor}{"
      editor format.names
      *  "}" *
      editor num.names$ #1 >
        { " (Eds.)." * }
        { " (Ed.)." * }
      if$
    }
  if$
}

FUNCTION { format.articletitle }
{
  title empty.or.unknown
    { "" }
    % Use this to preserve lettercase in titles:
    { "\showarticletitle{" title * "}" * }
    % Use this for downcase title style:
    % { \showarticletitle{" title "t" change.case$ * "}" * }
  if$
}

FUNCTION { format.title }
{
  title empty.or.unknown
    { "" }
    % Use this to preserve lettercase in titles:
    { "\bibinfo{title}{" title * "}" * }
    % Use this for downcase title style:
    % { title "t" change.case$ }
  if$
}

FUNCTION { n.dashify }
{
  't :=
  ""
    { t empty.or.unknown not }
    {
      t #1 #1 substring$ "-" =
        {
          t #1 #2 substring$ "--" = not
            { "--" *
              t #2 global.max$ substring$ 't :=
            }
            {
              { t #1 #1 substring$ "-" = }
              {
                "-" *
                t #2 global.max$ substring$ 't :=
              }
              while$
            }
          if$
        }
        {
          t #1 #1 substring$ *
          t #2 global.max$ substring$ 't :=
        }
      if$
    }
  while$
}

FUNCTION { format.btitle }
{
  "\bibinfo{booktitle}{"
  edition empty.or.unknown
  { title emphasize }
  { title empty.or.unknown
    { title emphasize } % jtb: what is this supposed to do ?!?
    { "{\em " title * "\/} (\bibinfo{edition}{" * edition "l" change.case$ *
    "} ed.)" * } % jtb: no parens for ed.
    if$
  }
  if$
  * "}" *
}

FUNCTION { format.emphasize.booktitle }
{ % push "" or "{\em booktitle}" or "{\em booktitle}, (second ed.)" on stack
  "\bibinfo{booktitle}{"
  edition empty.or.unknown
    { booktitle emphasize }
    { booktitle empty.or.unknown
      { "" }
      { "{\em " booktitle * "} (\bibinfo{edition}{" *
      edition "l" change.case$ * "} ed.)" * }
      if$
    }
  if$
  * "}" *
}

FUNCTION { format.city }
{
  % jtb: if the preceding string (the title of the conference) is non-empty,
  % jtb: append the location, otherwise leave empty (so as to trigger the
  % jtb: error message in output.check

  duplicate$ empty.or.unknown
    { }
    {
      city empty.or.unknown
        {
          date empty.or.unknown
            { }
            { " (" * date * ")" * }
          if$
        }
        {
          date empty.or.unknown
            { " (" * city * ")" * }
            { " (" * city * ", " * date * ")" * }
          if$
        }
      if$
    }
  if$
}

FUNCTION { tie.or.space.connect }
{
  duplicate$ text.length$ #3 <
    { "~" }
    { " " }
  if$
  swap$ * *
}

FUNCTION { either.or.check }
{
  empty.or.unknown
    'pop$
    { "can't use both " swap$ * " fields in " * cite$ * warning$ }
  if$
}

FUNCTION { format.bvolume }
{
  % jtb: If there is a series, this is added and the volume trails after it.
  % jtb: Otherwise, "Vol" is Capitalized.

  volume empty.or.unknown
    { "" }
    {
      series empty.or.unknown
        { "Vol.~\bibinfo{volume}{" volume "}" * *}
        { "\bibinfo{series}{" series "}, " * *
          "Vol.~\bibinfo{volume}{" volume "}" * * *}
      if$
      "volume and number" number either.or.check
    }
  if$
}

FUNCTION { format.bvolume.noseries }
{
  volume empty.or.unknown
    { "" }
    { "Vol.~\bibinfo{volume}{" volume "}" * *
      "volume and number" number either.or.check
    }
  if$
}

FUNCTION { format.series }
{
  series empty.or.unknown
    {""}
    {" {\em (\bibinfo{series}{" * series "})}" *}
  if$
}

FUNCTION { format.number.series }
{
  volume empty.or.unknown
    {
      number empty.or.unknown
        {
          volume empty.or.unknown
          { "" }
          {
            series empty.or.unknown
              { "" }
              { " (\bibinfo{series}{" series * "})" * }
            if$
          }
          if$
        }                                       %    { series field.or.null }
        {
          output.state mid.sentence =
            { "Number" }                        % gnp - changed to mixed case always
            { "Number" }
          if$
          number tie.or.space.connect series empty.or.unknown
            { "there's a number but no series in " cite$ * warning$ }
            { " in \bibinfo{series}{" * series * "}" * }
          if$
        }
      if$
    }
    {
      ""
    }
  if$
}

FUNCTION { multi.page.check }
{
  't :=
  #0 'multiresult :=
    { multiresult not
      t empty.or.unknown not
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

FUNCTION { format.pages }
{
  pages empty.or.unknown
    { "" }
    { "\bibinfo{pages}{"
      pages multi.page.check
        { pages n.dashify } % gnp - removed () % jtb: removed pp.
        { pages }
      if$
      * "}" *
    }
  if$
}

FUNCTION { format.pages.check.without.articleno }
{ %% format pages field only if articleno is absent
  %% Stack out: pages-specification
  numpages missing$ pages missing$ and
    { "page numbers missing in both pages and numpages fields in " cite$ * warning$ }
    { }
  if$

  articleno empty.or.unknown eid empty.or.unknown and
    {
      pages missing$
        { numpages }
        { format.pages }
      if$
    }
    { "" }
  if$
}

FUNCTION { format.pages.check }
{
  pages empty.or.unknown
    { "page numbers missing in " cite$ * warning$ "" }
    { pages n.dashify }
  if$
}

FUNCTION { format.bookpages }
{
  bookpages empty.or.unknown
    { "" }
    { bookpages "book pages" tie.or.space.connect }
  if$
}

FUNCTION { format.named.pages }
{
  pages empty.or.unknown
    { "" }
    { format.pages "pages" tie.or.space.connect }
  if$
}

%
% Changed by Boris Veytsman, 2011-03-13
% Now the word "pages" is printed even if
% there field pages is not empty.
%

FUNCTION { format.page.count }
{
  page.count empty.or.unknown
    { "" }
    { "\bibinfo{numpages}{" page.count * "}~pages" * }
  if$
}

FUNCTION { format.articleno.numpages }
{
  %% There are seven possible outputs, depending on which fields are set.
  %%
  %% These four are handled here:
  %%
  %%     articleno, numpages, pages     -> "Article articleno-value, numpages-value pages"
  %%     articleno, numpages            -> "Article articleno-value, numpages-value pages"
  %%     articleno, pages               -> "Article articleno-value, reduced-pages-value pages"
  %%     articleno                      -> "Article articleno-value" and warn about missing numpages
  %%
  %% The remaining three have already been handled by
  %% format.pages.check.without.articleno:
  %%
  %%     numpages, pages                -> "pages-value"
  %%     numpages                       -> "numpages-value"
  %%     pages                          -> "pages-value"

  articleno empty.or.unknown eid empty.or.unknown and
    {
      numpages empty.or.unknown
        { }
        { "numpages field, but no articleno or eid field, in "
	  cite$ * warning$ }
      if$
      ""
    }
    {
      numpages empty.or.unknown
        {
          pages empty.or.unknown
            {
              "articleno or eid, but no pages or numpages field in "
	         cite$ * warning$
              "" 'page.count :=
            }
            { reduce.pages.to.page.count }
          if$
        }
        { numpages 'page.count := }
      if$

      %% The Article number is now handled in format.day.month.year because
      %% ACM prefers the style "Digital Libraries 12, 3, Article 5 (July 2008)"
      %% over "Digital Libraries 12, 3 (July 2008), Article 5"
      %% format.articleno output
      format.page.count
    }
  if$
}

FUNCTION {calc.format.page.count}
{
  numpages empty.or.unknown
   {
     pages empty.or.unknown
        {
        "" 'page.count :=
        }
        { reduce.pages.to.page.count }
     if$
   }
   { numpages 'page.count := }
  if$
  format.page.count
}



FUNCTION { format.journal.volume.number.day.month.year }
{
  % By Young (and Spencer)
  % GNP - fixed bugs with missing volume, number, and/or pages
  %
  % Format journal, volume, number, pages for article types.
  %
  journal empty.or.unknown
    { "no journal in " cite$ * warning$
      "" }
%    { journal emphasize.with.italic.correction }
     {
       "\bibinfo{journal}{"
           journal "Journal of the ACM" =
       { "{\it J. ACM}" }
       {
           journal "American Mathematical Society Translations" =
       { "{\it Amer. Math. Soc. Transl.}" }
       {
           journal "Bulletin of the American Mathematical Society" =
       { "{\it Bull. Amer. Math. Soc.}" }
       {
           journal "Proceedings of the American Mathematical Society" =
       { "{\it Proc. Amer. Math. Soc.}" }
       {
           journal "Transactions of the American Mathematical Society" =
       { "{\it Trans. Amer. Math. Soc.}" }
       {
           journal "Communications of the {ACM}" =
       { "{\it Commun. {ACM}}" }
       {
           journal "{ACM} Computing Surveys" =
       { "{\it Comput. Surveys}" }
       {
           journal "{ACM} Transactions on Mathematical Software" =
       { "{\it {ACM} Trans. Math. Software}" }
       {
           journal "{ACM} {SIGNUM} Newsletter" =
       { "{\it {ACM} {SIGNUM} Newslett.}" }
       {
           journal "American Journal of Sociology" =
       { "{\it Amer. J. Sociology}" }
       {
           journal "Journal of the American Statistical Association" =
       { "{\it J. Amer. Statist. Assoc.}" }
       {
           journal "Applied Mathematics and Computation" =
       { "{\it Appl. Math. Comput.}" }
       {
           journal "American Mathematical Monthly" =
       { "{\it Amer. Math. Monthly}" }
       {
           journal "British Journal of Mathematical and Statistical Psychology" =
       { "{\it Brit. J. Math. Statist. Psych.}" }
       {
           journal "Canadian Mathematical Bulletin" =
       { "{\it Canad. Math. Bull.}" }
       {
           journal "Journal of Computational and Applied Mathematics" =
       { "{\it J. Comput. Appl. Math.}" }
       {
           journal "Journal of Computational Physics" =
       { "{\it J. Comput. Phys.}" }
       {
           journal "Computers and Structures" =
       { "{\it Comput. \& Structures}" }
       {
           journal "The Computer Journal" =
       { "{\it Comput. J.}" }
       {
           journal "Journal of Computer and System Sciences" =
       { "{\it J. Comput. System Sci.}" }
       {
           journal "Contemporary Mathematics" =
       { "{\it Contemp. Math.}" }
       {
           journal "Crelle's Journal" =
       { "{\it Crelle's J.}" }
       {
           journal "Giornale di Mathematiche" =
       { "{\it Giorn. Mat.}" }
       {
           journal "{IEEE} Transactions on Computers" =
       { "{\it {IEEE} Trans. Comput.}" }
       {
           journal "{IEEE} Transactions on Automatic Control" =
       { "{\it {IEEE} Trans. Automat. Control}" }
       {
           journal "Proceedings of the {IEEE}" =
       { "{\it Proc. {IEEE}}" }
       {
           journal "{IEEE} Transactions on Aerospace and Electronic Systems" =
       { "{\it {IEEE} Trans. Aerospace Electron. Systems}" }
       {
           journal "{IMA} Journal of Numerical Analysis" =
       { "{\it {IMA} J. Numer. Anal.}" }
       {
           journal "Information Processing Letters" =
       { "{\it Inform. Process. Lett.}" }
       {
           journal "Journal of the Institute of Mathematics and its Applications" =
       { "{\it J. Inst. Math. Appl.}" }
       {
           journal "International Journal of Control" =
       { "{\it Internat. J. Control}" }
       {
           journal "International Journal for Numerical Methods in Engineering" =
       { "{\it Internat. J. Numer. Methods Engrg.}" }
       {
           journal "International Journal of Supercomputing Applications" =
       { "{\it Internat. J. Supercomputing Applic.}" }
       {
           journal "Journal of Research of the National Bureau of Standards" =
       { "{\it J. Res. Nat. Bur. Standards}" }
       {
           journal "Linear Algebra and its Applications" =
       { "{\it Linear Algebra Appl.}" }
       {
           journal "Journal of Mathematical Analysis and Applications" =
       { "{\it J. Math. Anal. Appl.}" }
       {
           journal "Mathematische Annalen" =
       { "{\it Math. Ann.}" }
       {
           journal "Journal of Mathematical Physics" =
       { "{\it J. Math. Phys.}" }
       {
           journal "Mathematics of Computation" =
       { "{\it Math. Comp.}" }
       {
           journal "Mathematica Scandinavica" =
       { "{\it Math. Scand.}" }
       {
           journal "Mathematical Tables and Other Aids to Computation" =
       { "{\it Math. Tables Aids Comput.}" }
       {
           journal "Numerische Mathematik" =
       { "{\it Numer. Math.}" }
       {
           journal "Pacific Journal of Mathematics" =
       { "{\it Pacific J. Math.}" }
       {
           journal "Journal of Parallel and Distributed Computing" =
       { "{\it J. Parallel and Distrib. Comput.}" }
       {
           journal "Parallel Computing" =
       { "{\it Parallel Comput.}" }
       {
           journal "Philosophical Magazine" =
       { "{\it Philos. Mag.}" }
       {
           journal "Proceedings of the National Academy of Sciences of the USA" =
       { "{\it Proc. Nat. Acad. Sci. U. S. A.}" }
       {
           journal "Quarterly Journal of Mathematics, Oxford, Series (2)" =
       { "{\it Quart. J. Math. Oxford Ser. (2)}" }
       {
           journal "Quarterly of Applied Mathematics" =
       { "{\it Quart. Appl. Math.}" }
       {
           journal "Review of the International Statisical Institute" =
       { "{\it Rev. Inst. Internat. Statist.}" }
       {
           journal "Journal of the Society for Industrial and Applied Mathematics" =
       { "{\it J. Soc. Indust. Appl. Math.}" }
       {
           journal "Journal of the Society for Industrial and Applied Mathematics, Series B, Numerical Analysis" =
       { "{\it J. Soc. Indust. Appl. Math. Ser. B Numer. Anal.}" }
       {
           journal "{SIAM} Journal on Algebraic and Discrete Methods" =
       { "{\it {SIAM} J. Algebraic Discrete Methods}" }
       {
           journal "{SIAM} Journal on Applied Mathematics" =
       { "{\it {SIAM} J. Appl. Math.}" }
       {
           journal "{SIAM} Journal on Computing" =
       { "{\it {SIAM} J. Comput.}" }
       {
           journal "{SIAM} Journal on Matrix Analysis and Applications" =
       { "{\it {SIAM} J. Matrix Anal. Appl.}" }
       {
           journal "{SIAM} Journal on Numerical Analysis" =
       { "{\it {SIAM} J. Numer. Anal.}" }
       {
           journal "{SIAM} Review" =
       { "{\it {SIAM} Rev.}" }
       {
           journal "{SIAM} Journal on Scientific and Statistical Computing" =
       { "{\it {SIAM} J. Sci. Statist. Comput.}" }
       {
           journal "Software Practice and Experience" =
       { "{\it Software Prac. Experience}" }
       {
           journal "Statistical Science" =
       { "{\it Statist. Sci.}" }
       {
           journal "{USSR} Computational Mathematics and Mathematical Physics" =
       { "{\it {U. S. S. R.} Comput. Math. and Math. Phys.}" }
       {
           journal "Journal of {VLSI} and Computer Systems" =
       { "{\it J. {VLSI} Comput. Syst.}" }
       {
           journal "Zeitschrift fur Angewandte Mathematik und Mechanik" =
       { "{\it Z. Angew. Math. Mech.}" }
       {
           journal "Zeitschrift fur Angewandte Mathematik und Physik" =
       { "{\it Z. Angew. Math. Phys.}" }
       {
           journal "ACM Computing Surveys" =
       { "{\it Comput. Surveys}" }
       {
           journal "ACM Transactions on Mathematical Software" =
       { "{\it ACM Trans. Math. Software}" }
       {
           journal "ACM {SIGNUM} Newsletter" =
       { "{\it ACM {SIGNUM} Newslett.}" }
       {
           journal "IEEE Transactions on Computers" =
       { "{\it IEEE Trans. Comput.}" }
       {
           journal "IEEE Transactions on Automatic Control" =
       { "{\it IEEE Trans. Automat. Control}" }
       {
           journal "Proceedings of the IEEE" =
       { "{\it Proc. IEEE}" }
       {
           journal "IEEE Transactions on Aerospace and Electronic Systems" =
       { "{\it IEEE Trans. Aerospace Electron. Systems}" }
       {
           journal "IMA Journal of Numerical Analysis" =
       { "{\it IMA J. Numer. Anal.}" }
       {
           journal "SIAM Journal on Algebraic and Discrete Methods" =
       { "{\it SIAM J. Algebraic Discrete Methods}" }
       {
           journal "SIAM Journal on Applied Mathematics" =
       { "{\it SIAM J. Appl. Math.}" }
       {
           journal "SIAM Journal on Computing" =
       { "{\it SIAM J. Comput.}" }
       {
           journal "SIAM Journal on Matrix Analysis and Applications" =
       { "{\it SIAM J. Matrix Anal. Appl.}" }
       {
           journal "SIAM Journal on Numerical Analysis" =
       { "{\it SIAM J. Numer. Anal.}" }
       {
           journal "SIAM Review" =
       { "{\it SIAM Rev.}" }
       {
           journal "SIAM Journal on Scientific and Statistical Computing" =
       { "{\it SIAM J. Sci. Statist. Comput.}" }
       {
           journal "USSR Computational Mathematics and Mathematical Physics" =
       { "{\it U. S. S. R. Comput. Math. and Math. Phys.}" }
       {
           journal "Journal of VLSI and Computer Systems" =
       { "{\it J. VLSI Comput. Syst.}" }
       {
           journal "Communications of the ACM" =
       { "{\it Commun. ACM}" }
       %% If no match with cases needing special handling, just output journal name
       {  journal emphasize.with.italic.correction  }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
           }
     if$
     * "}" *
         }
    if$

  number empty.or.unknown
    {
      volume empty.or.unknown
        { "no number and no volume in " cite$ * warning$ "" * }
        { " " * " \bibinfo{volume}{" * volume * "}" * }
      if$
    }
    {
      volume empty.or.unknown
        {
          "unusual to have number, but no volume, for " cite$ * warning$
          " \bibinfo{number}{" * number * "}" *
        }
        { " \bibinfo{volume}{" * volume  * "}, \bibinfo{number}{" *
          number * "}" *}
      if$
    }
  if$
  after.block 'output.state :=

  % Sometimes proceedings are published in journals
  % In this case we do not want to put year, day and month here

  type$ "inproceedings" =
    { }
    {format.day.month.year * }
  if$
}

FUNCTION { format.chapter.pages }
{
  chapter empty.or.unknown
    'format.pages
    { type empty.or.unknown
        { "Chapter" } % gnp - changed to mixed case
        { type "t" change.case$ }
      if$
      chapter tie.or.space.connect
      pages empty.or.unknown
        {"page numbers missing in " cite$ * warning$} % gnp - added check
        { ", " * format.pages * }
      if$
    }
  if$
}

FUNCTION { format.in.emphasize.booktitle }
{ % jtb: format for collections or proceedings not appearing in a journal
  booktitle empty.or.unknown
  { "" }
  { "In " format.emphasize.booktitle * }
  if$
}

FUNCTION { format.in.booktitle }
{ % jtb: format for proceedings appearing in a journal
  booktitle empty.or.unknown
  { "" }
  { "In \bibinfo{booktitle}{" booktitle * "}" * }
  if$
}

FUNCTION { format.in.ed.booktitle }
{
  booktitle empty.or.unknown
  { "" }
  { editor empty.or.unknown
    { "In " format.emphasize.booktitle * }
                % jtb: swapped editor location
    { "In " format.emphasize.booktitle * ", " * format.editors.fml * }
    if$
  }
  if$
}

FUNCTION { format.thesis.type }
{ % call with default type on stack top
  type empty.or.unknown
    'skip$    % use default type
    {
      pop$    % discard default type
      % NO: it is silly to have to brace protect every degree type!:  type "t" change.case$
      type
    }
  if$
}

FUNCTION { format.tr.number }
{
  "\bibinfo{type}{"
  type empty.or.unknown
    { "{T}echnical {R}eport" }
    'type
  if$
  "}" * *
  number empty.or.unknown
    { "t" change.case$ }
    %% LOOKS BAD: { "." * number tie.or.space.connect }
    %% Prefer "Research report RJ687." to "Research report. RJ687."
    { number tie.or.space.connect }
  if$
}

FUNCTION { format.advisor }
{
  advisor empty.or.unknown
    { "" }
    { "Advisor(s) " advisor * }
  if$
}

FUNCTION { format.article.crossref }
{ "See"
  "\citeN{" * crossref * "}" *
}

FUNCTION { format.crossref.editor }
{
  editor #1 "{vv~}{ll}" format.name$
  editor num.names$ duplicate$
  #2 >
    { pop$ " et~al\mbox{.}" * }         % jrh: avoid spacing problems
    { #2 <
    'skip$
    { editor #2 "{ff }{vv }{ll}{ jj}" format.name$ "others" =
        { " et~al\mbox{.}" * }          % jrh: avoid spacing problems
        { " and " * editor #2 "{vv~}{ll}" format.name$ * }
      if$
    }
      if$
    }
  if$
}

FUNCTION { format.book.crossref }
{
  volume empty.or.unknown
    { "empty volume in " cite$ * "'s crossref of " * crossref * warning$
      "In "
    }
    { "Volume" volume tie.or.space.connect % gnp - changed to mixed case
      " of " *
    }
  if$
  editor empty.or.unknown
  editor field.or.null author field.or.null =
  or
    { key empty.or.unknown
    { series empty.or.unknown
        { "need editor, key, or series for " cite$ * " to crossref " *
          crossref * warning$
          "" *
        }
        { "{\em " * series * "\/}" * }
      if$
    }
    { key * }
      if$
    }
    { format.crossref.editor * }
  if$
  " \citeN{" * crossref * "}" *
}

FUNCTION { format.incoll.inproc.crossref }
{ "See"
  " \citeN{" * crossref * "}" *
}

FUNCTION { format.lab.names }
{
  % format.lab.names:
  %
  % determines "short" names for the abbreviated author information.
  % "Long" labels are created in calc.label, using the routine my.full.label
  % to format author and editor fields.
  %
  % There are 4 cases for labels.   (n=3 in the example)
  % a) one author             Foo
  % b) one to n               Foo, Bar and Baz
  % c) use of "and others"    Foo, Bar et al.
  % d) more than n            Foo et al.

  's :=
  s num.names$ 'numnames :=
  numnames #2 >    % change number to number of others allowed before
                   % forcing "et al".
    { s #1 "{vv~}{ll}" format.name$ " et~al\mbox{.}" * } % jrh: \mbox{} added
    {
      numnames #1 - 'namesleft :=
      #2 'nameptr :=
      s #1 "{vv~}{ll}" format.name$
        { namesleft #0 > }
        { nameptr numnames =
            { s nameptr "{ff }{vv }{ll}{ jj}" format.name$ "others" =
                { " et~al\mbox{.}" * }          % jrh: avoid spacing problems
                { " and " * s nameptr "{vv~}{ll}" format.name$ * }
              if$
            }
            { ", " * s nameptr "{vv~}{ll}" format.name$ * }
          if$
          nameptr #1 + 'nameptr :=
          namesleft #1 - 'namesleft :=
        }
      while$
    }
  if$
}

FUNCTION { author.key.label }
{
  author empty.or.unknown
    { key empty.or.unknown
          { "no key, author in " cite$ * warning$
            cite$ #1 #3 substring$ }
         'key
      if$
    }
    { author format.lab.names }
  if$
}

FUNCTION { editor.key.organization.label }
{ % added - gnp. Provide label formatting by organization if editor is null.
  editor empty.or.unknown
    { organization empty.or.unknown
        { key empty.or.unknown
            { "no key, editor or organization in " cite$ * warning$
              cite$ #1 #3 substring$ }
            'key
          if$
        }
        { organization }
      if$
    }
    { editor format.lab.names }
  if$
}

FUNCTION { author.editor.key.label }
{
  author empty.or.unknown
    { editor empty.or.unknown
          { key empty.or.unknown
               { "no key, author, or editor in " cite$ * warning$
                 cite$ #1 #3 substring$ }
             'key
           if$
         }
          { editor format.lab.names }
      if$
    }
    { author format.lab.names }
  if$
}

FUNCTION { author.editor.key.organization.label }
{ % added - gnp. Provide label formatting by organization if author is null.
  author empty.or.unknown
    { editor empty.or.unknown
        { organization empty.or.unknown
            { key empty.or.unknown
               { "no key, author, editor or organization in " cite$ * warning$
                 cite$ #1 #3 substring$ }
               'key
              if$
            }
            { organization }
          if$
        }
        { editor format.lab.names }
      if$
    }
    { author format.lab.names }
  if$
}

FUNCTION { calc.basic.label }
{
  type$ "book" =
  type$ "inbook" =
  or
  type$ "article" =
  or
    'author.editor.key.label
    { type$ "proceedings" =
      type$ "periodical" =
      or
        'editor.key.organization.label
        { type$ "manual" =
            'author.editor.key.organization.label
            'author.key.label
          if$
        }
      if$
    }
  if$
}

FUNCTION { calc.label }
{
  % Changed - GNP. See also author.editor.organization.sort, editor.organization.sort
  % Form label for BibTeX entry. The classification of which fields are used
  % for which type of entry (book, inbook, etc.) are taken from alpha.bst.
  % The change here from newapa is to also include organization as a
  % citation label if author or editor is missing.

  calc.basic.label

  author empty.or.unknown  % generate the full label citation information.
    {
      editor empty.or.unknown
        {
          organization empty.or.unknown
            {
              key empty.or.unknown
                {
                  "no author, editor, organization, or key in " cite$ * warning$
                  "??"
                }
                { key }
              if$
            }
            { organization }
          if$
        }
        { editor my.full.label }
      if$
    }
    { author my.full.label }
  if$

  % leave label on the stack, to be popped when required.

  "}{" * swap$ * "}{" *
  %  year field.or.null purify$ #-1 #4 substring$ *
  %
  % save the year for sort processing afterwards (adding a, b, c, etc.)
  %
  year field.or.null purify$ #-1 #4 substring$
  'label.year :=
}


FUNCTION { output.bibitem }
{
  newline$
  "\bibitem[\protect\citeauthoryear{" write$
  calc.label write$
  sort.year write$
  "}]%" writeln
  "        {" write$
  cite$ write$
  "}" writeln
  ""
  before.all 'output.state :=
}


FUNCTION { output.issue.doi.coden.isxn.lccn.url.eprint }
{ % enter and return with stack empty
  %% We switch now from buffered output to output of complete lines, so
  %% that the Issue .. URL data have their own lines, and are less likely
  %% to be line-wrapped by BibTeX's short-sighted algorithm, which wraps
  %% lines longer than 79 characters, backtracking to what it thinks is
  %% a break point in the string.  Any such wrapping MUST be undone to
  %% prevent percent-newline from appearing in DOIs and URLs.  The
  %% output data are intentionally wrapped in \showxxx{} macros at
  %% beginning of line, and that supply their own punctuation (if they
  %% are not defined to suppress output entirely), to make it easier for
  %% other software to recover them from .bbl files.
  %%
  %% It also makes it possible to later change the macro definitions
  %% to suppress particular output values, or alter their appearance.
  %%
  %% Note that it is possible for theses, technical reports, and
  %% manuals to have ISBNs, and anything that has an ISBN may also
  %% have an ISSN.  When there are no values for these keys, there
  %% is no output generated for them here.

  "\newblock" writeln
  after.block 'output.state :=

  output.issue
  output.isbn
  output.coden  % CODEN is functionally like ISSN, so output them sequentially
  output.issn
  output.lccn
  output.doi    % DOI is ALWAYS last according to CrossRef DOI documentation
  output.eprint
  output.url    % but ACM wants URL last
}

FUNCTION { output.issue.doi.coden.isxn.lccn.url.eprint.note }
{ % enter with stack empty, return with empty string on stack
  output.issue.doi.coden.isxn.lccn.url.eprint
  note empty.or.unknown
    { }
    {
      "\newblock" writeln
      output.note
    }
  if$
  ""
}

FUNCTION { output.issue.doi.coden.isxn.lccn.url.eprint.note.check }
{ % enter with stack empty, return with empty string on stack
  output.issue.doi.coden.isxn.lccn.url.eprint
  note empty.or.unknown
    { }
    {
      "\newblock" writeln
      output.note.check
    }
  if$
  ""
}

FUNCTION { article }
{
  output.bibitem

  author empty.or.unknown
    {
      editor empty.or.unknown
        { "neither author and editor supplied for " cite$ * warning$ }
        { format.editors "editor" output.check }
      if$
    }
    { format.authors "author" output.check }
  if$

  author format.no.key output       % added
  output.year.check                 % added
  new.block
  format.articletitle "title" output.check
  new.block
  howpublished empty.or.unknown
    { }
    { "\bibinfo{howpublished}{" howpublished "}" * * output }
  if$

  crossref missing$
    { format.journal.volume.number.day.month.year output}
    {
      "cross reference in @Article{...} is unusual" warning$
      format.article.crossref output.nonnull
    }
  if$

  format.pages.check.without.articleno output
  format.articleno.numpages output
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { book }
{
  output.bibitem
  author empty.or.unknown
    { format.editors "author and editor" output.check }
    { format.authors output.nonnull
      crossref missing$
        { "author and editor" editor either.or.check }
        'skip$
      if$
    }
  if$
  output.year.check       % added
  new.block
  format.btitle "title" output.check
  crossref missing$
    { new.sentence              % jtb: start a new sentence for series/volume
      format.bvolume output
      new.block
      format.number.series output
      new.sentence
      publisher "publisher" bibinfo.output.check
      address "address" bibinfo.output.check    % jtb: require address
      fin.sentence
      pages empty.or.unknown
        { format.bookpages }    % use bookpages when pages empty
        { format.pages.check "pages" tie.or.space.connect }
      if$
      output
    }
    { new.block
      format.book.crossref output.nonnull
    }
  if$
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { booklet }
{
  output.bibitem
  format.authors output
  author format.key output          % added
  output.year.check                 % added
  new.block
  format.title "title" output.check
  new.block
    howpublished empty.or.unknown
    { }
    { "\bibinfo{howpublished}{" howpublished "}" * * output }
  if$
  address output
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { inbook }
{
  output.bibitem
  author empty.or.unknown
    { format.editors
      "author and editor" output.check
    }
    { format.authors output.nonnull
      crossref missing$
    { "author and editor" editor either.or.check }
    'skip$
      if$
    }
  if$
  output.year.check                 % added
  new.block
  format.btitle "title" output.check
  crossref missing$
    { new.sentence              % jtb: start a new sentence for series/volume
      format.bvolume output
      new.block
      format.number.series output
      new.sentence
      publisher "publisher" bibinfo.output.check
      address "address" bibinfo.output.check    % jtb: require address
      format.bookpages output
      format.chapter.pages
      "chapter and pages" output.check  % jtb: moved from before publisher
    }
    {
      format.bookpages output
      format.chapter.pages "chapter and pages" output.check
      new.block
      format.book.crossref output.nonnull
    }
  if$
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { incollection }
{
  output.bibitem
  format.authors "author" output.check
  author format.key output       % added
  output.year.check              % added
  new.block
  format.articletitle "title" output.check
  new.block
  crossref missing$
    { format.in.ed.booktitle "booktitle" output.check
      new.sentence                % jtb: start a new sentence for series/volume
      format.bvolume output
      format.number.series output
      new.sentence
      publisher "publisher" bibinfo.output.check
      address "address" bibinfo.output.check      % jtb: require address
      format.bookpages output
      format.chapter.pages output % gnp - was special.output.nonnull
                                  % left out comma before page numbers
                                  % jtb: moved from before publisher
    }
    {
      format.incoll.inproc.crossref output.nonnull
      format.chapter.pages output
    }
  if$
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { inproceedings }
{
  output.bibitem
  format.authors "author" output.check
  author format.key output            % added
  output.year.check                   % added
  new.block
  format.articletitle "title" output.check
  howpublished empty.or.unknown
    { }
    { "\bibinfo{howpublished}{" howpublished "}" * * output.dot.space }
  if$
  crossref missing$
    {
      journal missing$          % jtb: proceedings appearing in journals
        { format.in.emphasize.booktitle format.city "booktitle"  output.check.dot.space
          format.series output.removenospace
          format.editors.fml output % BV 2011/09/27 Moved dot to comma
          format.bvolume.noseries output
          new.sentence
          organization output
          publisher "publisher" bibinfo.output.check % jtb: require publisher (?)
          address "address" bibinfo.output.check  % jtb: require address
          format.bookpages output
        }
        {
           format.in.booktitle format.city "booktitle" output.check
           format.editors.fml output
           new.sentence
           format.journal.volume.number.day.month.year output
        }
      if$
      format.articleno output
      format.pages.check.without.articleno output
    }
    {
      format.incoll.inproc.crossref output.nonnull
      format.articleno output
      format.pages.check.without.articleno output
    }
  if$
  format.articleno.numpages output
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { conference } { inproceedings }

FUNCTION { manual }
{
  output.bibitem
  author empty.or.unknown
    { editor empty.or.unknown
      { organization "organization" output.check
        organization format.key output }  % if all else fails, use key
      { format.editors "author and editor" output.check }
      if$
    }
    { format.authors output.nonnull }
    if$
  output.year.check                 % added
  new.block
  format.btitle "title" output.check
  organization address new.block.checkb
  % jtb: back to normal style: organization, address
  organization "organization" output.check
  address output
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { mastersthesis }
{
  output.bibitem
  format.authors "author" output.check
  author format.key output          % added
  output.year.check                 % added
  new.block
  format.title emphasize "title" output.check  % NB: ACM style requires emphasized thesis title
  new.block
  "\bibinfo{thesistype}{Master's\ thesis}" format.thesis.type output
  new.sentence
  school "school" bibinfo.output.check
  address empty.or.unknown
     { }
     { "\bibinfo{address}{" address * "}" * output }
  if$
  new.block
  format.advisor output
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { misc }
{
  output.bibitem
  format.authors output
  author format.key output            % added
  output.year.check                   % added
  title howpublished new.block.checkb
  format.title output
  new.block
  howpublished empty.or.unknown
    { }
    { "\bibinfo{howpublished}{" howpublished "}" * * output }
  if$
  "" output.nonnull.dot.space
  output.day.month.year
  calc.format.page.count output
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { online } { misc }

FUNCTION { game } { misc }


FUNCTION { phdthesis }
{
  output.bibitem
  format.authors "author" output.check
  author format.key output          % added
  output.year.check                 % added
  new.block
  format.title emphasize "title" output.check  % NB: ACM style requires emphasized thesis title
  new.block
  "\bibinfo{thesistype}{Ph.D. Dissertation}" format.thesis.type output
  new.sentence
  school "school" bibinfo.output.check
  address empty.or.unknown
     { }
     { "\bibinfo{address}{" address * "}" * output }
  if$
  new.block
  format.advisor output
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION {format.date}
{ year empty.or.unknown
    { month empty.or.unknown
        {
          ""                    % output empty date if year/month both empty
          day empty.or.unknown
            {  }
            { "there's a day but no month or year in " cite$ * warning$ }
          if$
        }
        { "there's a month but no year in " cite$ * warning$
          month
          day empty.or.unknown
            { }
            { " " * day * }
          if$
        }
      if$
    }
    { month empty.or.unknown
        {
          year                  % output only year if month empty
          day empty.or.unknown
            {  }
            { "there's a day and year but no month in " cite$ * warning$ }
          if$
        }
        {
          month " " *
          day empty.or.unknown
            { }
            { day * ", " * }
          if$
          year *
        }
      if$
    }
  if$
}

FUNCTION {new.block.checka}
{
  empty.or.unknown
    'skip$
    'new.block
  if$
}

FUNCTION { periodical }
{
  output.bibitem
  editor empty.or.unknown
    { organization output }
    { format.editors output.nonnull }
  if$
  new.block
  output.year.check
  new.sentence
  format.articletitle "title" output.check
  format.journal.volume.number.day.month.year output
  calc.format.page.count output
  fin.entry
}

FUNCTION { proceedings }
{
  output.bibitem
  editor empty.or.unknown
    { organization output
      organization format.key output }  % gnp - changed from author format.key
    { format.editors output.nonnull }
  if$
  % author format.key output             % gnp - removed (should be either
  %                                        editor or organization
  output.year.check                    % added (newapa)
  new.block
  format.btitle format.city "title" output.check        % jtb: added city
  new.sentence
  format.bvolume output
  format.number.series output
  new.sentence
  organization output
  % jtb: normal order: publisher, address
  publisher empty.or.unknown
     { }
     { "\bibinfo{publisher}{" publisher * "}" * output }
  if$
  address empty.or.unknown
     { }
     { "\bibinfo{address}{" address * "}" * output }
  if$
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { techreport }
{
  output.bibitem
  format.authors "author" output.check
  author format.key output             % added
  output.year.check                    % added
  new.block
  format.btitle "title" output.check
  new.block
%   format.tr.number output               % jtb: moved month ...
  format.tr.number output new.sentence    % Gerry  - need dot 2011/09/28
  institution "institution" bibinfo.output.check
  address empty.or.unknown
    { }
    { "\bibinfo{address}{" address "}" * * output }
  if$
  new.sentence
  format.named.pages output
  % ACM omits year at end in transactions style
  % format.day.month.year output.nonnull.dot.space  % jtb: ... to here (no parens)
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note
  fin.entry
}

FUNCTION { unpublished }
{
  output.bibitem
  format.authors
  "author" output.check
  author format.key output              % added
  output.year.check                     % added
  new.block
  format.title "title" output.check
  fin.sentence
  output.day.month.year                 % UTAH
  calc.format.page.count output
  fin.block
  output.issue.doi.coden.isxn.lccn.url.eprint.note.check
  fin.entry
}

FUNCTION { default.type } { misc }

%%% ACM journal-style month definitions: full name if 1--5 letters, else
%%% abbreviation of 3 or 4 characters and a dot

MACRO {jan}             {"Jan."}

MACRO {feb}             {"Feb."}

MACRO {mar}             {"March"}

MACRO {apr}             {"April"}

MACRO {may}             {"May"}

MACRO {jun}             {"June"}

MACRO {jul}             {"July"}

MACRO {aug}             {"Aug."}

MACRO {sep}             {"Sept."}

MACRO {oct}             {"Oct."}

MACRO {nov}             {"Nov."}

MACRO {dec}             {"Dec."}


%%% ====================================================================
%%%                 I M P O R T A N T   C H A N G E
%%%
%%% For the 2009 release of the official acm-*.bst files, there are to
%%% be NO predefined journal abbreviations in those style files.
%%%
%%% ACM may later develop an official list of mappings of full journal
%%% names of commonly-cited journals to ACM-preferred abbreviations, but
%%% authors should consider that use of any of these commented-out
%%% abbreviations is DEPRECATED unless the BibTeX file itself provides
%%% its own @String{name = "value"} definitions.
%%%
%%% Use of journal (and publisher and address) @String{...}
%%% abbreviations, as opposed to explicit value assignments such as
%%% journal = "J. ACM" and publisher = "IEEE", is preferred in
%%% bibliographic databases, because it makes it easier for journal
%%% production staff to replace those definitions by publisher-preferred
%%% abbreviations when articles are typeset for publication.
%%%
%%% For historical reasons, and because some of these abbreviations are
%%% used in other (non-ACM) bibliography style files, they are preserved
%%% here in comments.  Future releases of the acm*-.bst files are likely
%%% to remove them entirely.
%%% ====================================================================
%%%
%%% DEPRECATED: MACRO {acmcs}           {"ACM Comput. Surv."}                   % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {acmlett}         {"ACM Lett. Program. Lang. Syst."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {acta}            {"Acta Inf."}                           % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ai}              {"Artificial Intelligence"}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {al}              {"Ada Lett."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {acr}             {"Adv. Comput. Res."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {bit}             {"Bit"}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {cacm}            {"Commun. ACM"}                         % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {cj}              {"Comput. J."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {cn}              {"Comput. Netw."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {cl}              {"Comput. Lang."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ibmjrd}          {"IBM J. Res. and Development"}         % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ibmsj}           {"IBM Systems Journal"}                 % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ict}             {"Inf. Contr."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ieebcs}          {"IEE/BCS Softw. Eng. J."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ieees}           {"IEEE Softw."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ieeese}          {"IEEE Trans. Softw. Eng."}             % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ieeetc}          {"IEEE Trans. Comput."}                 % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ieeetcad}        {"IEEE Transactions on Computer-Aided Design of Integrated Circuits"} % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ieeetpds}        {"IEEE Trans. Parall. Distrib. Syst."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ieeetit}         {"IEEE Trans. Inf. Theory"}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ipl}             {"Inf. Process. Lett."}                 % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {icp}             {"Inf. Comput."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ist}             {"Inf. Softw. Tech."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ijsa}            {"Int. J. Supercomput. Appl."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ijpp}            {"Int. J. Parallel Program."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {jacm}            {"J. ACM"}                              % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: % MACRO {jcss}          {"Journal of Computer and System Sciences"} % original BibTeX
%%% DEPRECATED: MACRO {jcss}            {"J. Comput. Syst. Sci."}               % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {jlp}             {"J. Logic Program."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {jfp}             {"J. Funct. Program."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {jsmrp}           {"J. Softw. Maint. Res. Pract."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {jss}             {"J. Syst. Softw."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {jlc}             {"J. Logic and Comput."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {jlsc}            {"J. Lisp Symb. Comput."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {lpls}            {"Lett. Program. Lang. Syst."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {mor}             {"Math. Oper. Res."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {mscs}            {"Math. Struct. Comput. Sci."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {mst}             {"Math. Syst. Theor."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {ngc}             {"New Gen. Comput."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {scp}             {"Sci. Comput. Program."}               % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {sicomp}          {"SIAM J. Comput."}                     % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {spe}             {"Softw. Pract. Exper."}
%%% DEPRECATED:
%%% DEPRECATED: MACRO {tocs}            {"ACM Trans. Comput. Syst."}            % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {tods}            {"ACM Trans. Database Syst."}           % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {tog}             {"ACM Trans. Graphics"}                 % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {toms}            {"ACM Trans. Math. Softw."}             % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {toois}           {"ACM Trans. Office Inf. Syst."}        % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {toplas}          {"ACM Trans. Program. Lang. Syst."}     % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {tcs}             {"Theor. Comput. Sci."}                 % original BibTeX
%%% DEPRECATED:
%%% DEPRECATED: MACRO {tr}              {"Tech. Rep."}
%%% ====================================================================

READ

FUNCTION { sortify }
{
  purify$
  "l" change.case$
}

FUNCTION { chop.word }
{
  's :=
  'len :=
  s #1 len substring$ =
    { s len #1 + global.max$ substring$ }
    's
  if$
}

FUNCTION { sort.format.names }
{
  's :=
  #1 'nameptr :=
  ""
  s num.names$ 'numnames :=
  numnames 'namesleft :=
    { namesleft #0 > }
    { nameptr #1 >
          { "   " * }
         'skip$
      if$
  %      s nameptr "{ff{ } }{ll{ }}{  vv{ }}{  jj{ }}" format.name$ 't :=
      s nameptr "{vv{ } }{ll{ }}{  f{ }}{  jj{ }}" format.name$ 't :=
      nameptr numnames = t "others" = and
          { " et~al" * }
          { t sortify * }
      if$
      nameptr #1 + 'nameptr :=
      namesleft #1 - 'namesleft :=
    }
  while$
}

FUNCTION { sort.format.title }
{
  't :=
  "A " #2
    "An " #3
      "The " #4 t chop.word
    chop.word
  chop.word
  sortify
  #1 global.max$ substring$
}

FUNCTION { author.sort }
{
  author empty.or.unknown
    { key empty.or.unknown
         { "to sort, need author or key in " cite$ * warning$
           "" }
         { key sortify }
      if$
    }
    { author sort.format.names }
  if$
}

FUNCTION { author.editor.sort }
{
  author empty.or.unknown
    {
      editor empty.or.unknown
         {
           key empty.or.unknown
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

FUNCTION { editor.organization.sort }
{
  % added - GNP. Stack editor or organization for sorting (from alpha.bst).
  % Unlike alpha.bst, we need entire names, not abbreviations

  editor empty.or.unknown
    { organization empty.or.unknown
        { key empty.or.unknown
            { "to sort, need editor, organization, or key in " cite$ * warning$
              ""
            }
            { key sortify }
          if$
        }
        { organization sortify }
      if$
    }
    { editor sort.format.names }
  if$
}

FUNCTION { author.editor.organization.sort }
{
  % added - GNP. Stack author or organization for sorting (from alpha.bst).
  % Unlike alpha.bst, we need entire names, not abbreviations

  author empty.or.unknown
    {
      editor empty.or.unknown
        { organization empty.or.unknown
            { key empty.or.unknown
                { "to sort, need author, editor, or key in " cite$ * warning$
                ""
                }
                { key sortify }
              if$
            }
            { organization sortify }
          if$
        }
        { editor sort.format.names }
      if$
    }
    { author sort.format.names }
  if$
}

FUNCTION { presort }
{
  % Presort creates the bibentry's label via a call to calc.label, and then
  % sorts the entries based on entry type. Chicago.bst adds support for
  % including organizations as the sort key; the following is stolen from
  % alpha.bst.

  calc.label sortify % recalculate bibitem label
  year field.or.null purify$ #-1 #4 substring$ * % add year
  "    "
  *
  type$ "book" =
  type$ "inbook" =
  or
  type$ "article" =
  or
    'author.editor.sort
    { type$ "proceedings" =
      type$ "periodical" =
      or
        'editor.organization.sort
        { type$ "manual" =
            'author.editor.organization.sort
            'author.sort
          if$
        }
      if$
    }
  if$
  #1 entry.max$ substring$        % added for newapa
  'sort.label :=                  % added for newapa
  sort.label                      % added for newapa
  *
  "    "
  *
  title field.or.null
  sort.format.title
  *
  #1 entry.max$ substring$
  'sort.key$ :=
}

ITERATE { presort }

SORT             % by label, year, author/editor, title

FUNCTION { initialize.extra.label.stuff }
{ #0 int.to.chr$ 'last.label :=
  "" 'next.extra :=
  #0 'last.extra.num :=
}

FUNCTION { forward.pass }
{
  % Pass through all entries, comparing current entry to last one.
  % Need to concatenate year to the stack (done by calc.label) to determine
  % if two entries are the same (see presort)

  last.label
  % OLD:calc.label year field.or.null purify$ #-1 #4 substring$ * % add year
  % NEW:
  calc.basic.label year field.or.null purify$ #-1 #4 substring$ * % add year
  #1 entry.max$ substring$ =     % are they equal?
     { last.extra.num #1 + 'last.extra.num :=
       last.extra.num int.to.chr$ 'extra.label :=
     }
     { "a" chr.to.int$ 'last.extra.num :=
       "" 'extra.label :=
       % OLD: calc.label year field.or.null purify$ #-1 #4 substring$ * % add year
       % NEW:
       calc.basic.label year field.or.null purify$ #-1 #4 substring$ * % add year
       #1 entry.max$ substring$ 'last.label := % assign to last.label
     }
  if$
}

FUNCTION { reverse.pass }
{
  next.extra "b" =
    { "a" 'extra.label := }
     'skip$
  if$
  label.year extra.label * 'sort.year :=
  extra.label 'next.extra :=
}

EXECUTE {initialize.extra.label.stuff}

ITERATE {forward.pass}

REVERSE {reverse.pass}

FUNCTION { bib.sort.order }
{
  sort.label
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

ITERATE { bib.sort.order }

SORT             % by sort.label, year, title --- giving final bib. order.

FUNCTION { begin.bib }
{
  %% Set to #0 show 13-digit ISBN in preference to 10-digit ISBN.
  %% Set to #1 to show both 10-digit and 13-digit ISBNs.
  #1 'show-isbn-10-and-13 :=

  "%%% -*-BibTeX-*-" writeln
  "%%% Do NOT edit. File created by BibTeX with style" writeln
  "%%% ACM-Reference-Format-Journals [18-Jan-2012]." writeln
  "" writeln

  preamble$ empty.or.unknown
    'skip$
    { preamble$ writeln }
  if$
  "\begin{thebibliography}{00}" writeln
  ""                                                                         writeln
  "%%% ====================================================================" writeln
  "%%% NOTE TO THE USER: you can override these defaults by providing"       writeln
  "%%% customized versions of any of these macros before the \bibliography"  writeln
  "%%% command.  Each of them MUST provide its own final punctuation,"       writeln
  "%%% except for \shownote{}, \showDOI{}, and \showURL{}.  The latter two"  writeln
  "%%% do not use final punctuation, in order to avoid confusing it with"    writeln
  "%%% the Web address."                                                     writeln
  "%%%"                                                                      writeln
  "%%% To suppress output of a particular field, define its macro to expand" writeln
  "%%% to an empty string, or better, \unskip, like this:"                   writeln
  "%%%"                                                                      writeln
  "%%% \newcommand{\showDOI}[1]{\unskip}   % LaTeX syntax"                   writeln
  "%%%"                                                                      writeln
  "%%% \def \showDOI #1{\unskip}           % plain TeX syntax"               writeln
  "%%%"                                                                      writeln
  "%%% ====================================================================" writeln
  ""                                                                         writeln

  %% ACM publications do not use CODEN, ISSN, and LCCN data, so their default
  %% macro wrappers expand to \unskip, discarding their values and unwanted
  %% space.
  %%
  %% For other publications, prior definitions like these may be useful:
  %%
  %%     Plain TeX:
  %%         \def \showCODEN     #1{CODEN #1.}
  %%         \def \showISSN      #1{ISSN #1.}
  %%         \def \showLCCN      #1{LCCN #1.}
  %%
  %%     LaTeX:
  %%         \newcommand{\showCODEN}[1]{CODEN #1.}
  %%         \newcommand{\showISSN}[1]#1{ISSN #1.}
  %%         \newcommand{\showLCCN}[1]{LCCN #1.}

  "\ifx \showCODEN    \undefined \def \showCODEN     #1{\unskip}     \fi" writeln
  "\ifx \showDOI      \undefined \def \showDOI       #1{#1}\fi" writeln
  % ACM styles omit ISBNs, but they can be included by suitable definitions of
  % \showISBNx and \showISBNxiii before the .bbl file is read
  "\ifx \showISBNx    \undefined \def \showISBNx     #1{\unskip}     \fi" writeln
  "\ifx \showISBNxiii \undefined \def \showISBNxiii  #1{\unskip}     \fi" writeln
  "\ifx \showISSN     \undefined \def \showISSN      #1{\unskip}     \fi" writeln
  "\ifx \showLCCN     \undefined \def \showLCCN      #1{\unskip}     \fi" writeln
  "\ifx \shownote     \undefined \def \shownote      #1{#1}          \fi" writeln % NB: final period supplied by add.period$ above
  "\ifx \showarticletitle \undefined \def \showarticletitle #1{#1}   \fi" writeln
  "\ifx \showURL      \undefined \def \showURL       {\relax}        \fi" writeln
  "% The following commands are used for tagged output and should be " writeln
  "% invisible to TeX" writeln
  "\providecommand\bibfield[2]{#2}" writeln
  "\providecommand\bibinfo[2]{#2}" writeln
  "\providecommand\natexlab[1]{#1}" writeln
  "\providecommand\showeprint[2][]{arXiv:#2}" writeln
}

EXECUTE {begin.bib}

EXECUTE {init.state.consts}

ITERATE {call.type$}

FUNCTION { end.bib }
{
  newline$
  "\end{thebibliography}"
  writeln
}

EXECUTE {end.bib}
