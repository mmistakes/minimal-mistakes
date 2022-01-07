---
title: NicolTIP#016- How to Set Reset the revision number in a Word 2010 document
tags: [2010, DOCX, NicolTIP, Revision Number, Word, ZIP]
---
When I work for a customer, can happen that I use a document as “template” to build a new one (copy –&gt; paste –&gt; rename –&gt; delete some chapter and start writing).

I know that this is not the best way to proceed but, sometimes I find this procedure very quick a practical.

Side effect of this behavior is that the “revision number” of the new document continue to grow starting from the revision number of the previous document.

Yesterday I just realized that now the Word format is “open” and “human readable” so after some test, I discovered the following solution:

* The .docx file is simply a .zip file, this means that if you rename it to .zip, you can open it with WinZip, WinRar and so on
* Rename .docx to .zip and open the file with your preferred archive editor
* Open the file \docProps\core.xml
* Search for "&lt;cp:revision&gt;xxx&lt;/cp:revision&gt;" where "xxx" is the actual revision number
* Change xxx with your favorite new number
* Save the file core.xml into your zip again
* Rename .zip back to .docx


