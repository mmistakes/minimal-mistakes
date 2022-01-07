---
title: NicolTIP#016- How to Set/Reset the revision number in a Word 2010 document
tags: [2010, DOCX, NicolTIP, Revision Number, Word, ZIP]
---

<p>When I work for a customer, can happen that I use a document as “template” to build a new one (copy –&gt; paste –&gt; rename –&gt; delete some chapter and start writing).</p>  <p>I know that this is not the best way to proceed but, sometimes I find this procedure very quick a practical.</p>  <p>Side effect of this behavior is that the “revision number” of the new document continue to grow starting from the revision number of the previous document. </p>  <p>Well, I cant find on internet a quick way to reset this number and the solution provided by <a title="http://blogs.technet.com/b/heyscriptingguy/archive/2008/01/09/how-can-i-reset-the-revision-number-of-a-word-document-to-1.aspx" href="http://blogs.technet.com/b/heyscriptingguy/archive/2008/01/09/how-can-i-reset-the-revision-number-of-a-word-document-to-1.aspx">http://blogs.technet.com/b/heyscriptingguy/archive/2008/01/09/how-can-i-reset-the-revision-number-of-a-word-document-to-1.aspx</a> looks to complex for me:-) </p>  

<p>…BTW it doesn’t allow to set revision number to a specific value different than “1”.</p>  <p>Yesterday I just realized that now the Word format is “open” and “human readable” so after some test, I discovered the following solution:</p>  <ol>   <li>The .docx file is simply a .zip file, this means that if you rename it to .zip, you can open it with WinZip, WinRar and so on</li>    <li>Rename .docx to .zip and open the file with your preferred archive editor</li>    <li>Open the file \docProps\core.xml</li>    <li>Search for “<strong>&lt;cp:revision&gt;xxx&lt;/cp:revision&gt;</strong>” where “xxx” is the actual revision number</li>    <li>Change xxx with your favorite new number</li>    <li>Save the file core.xml into your zip again</li>    <li>Rename .zip back to .docx</li> </ol>  


