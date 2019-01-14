---
title: NicolTIP#010- How to rename and manage file names of your video (and audio?) library with powershell on Windows 7:-)
categories: [File, NicolTIP, powershell, Rename, Script, Scrubs, wmv]
---
<p>This week end I encoded some my old DVD in wmv file because I’m destroying my old DVD player and I don’t want to buy a blue ray disk (I’m sorry Sony:-).</p>  <p>After the encoding arrived the boring time to organize file names, and because now PowerShell is available to everyone OOB with Windows 7, this sounds like a good opportunity for me to test my skills in that area.</p>  <p>(these tricks can be usable and useful even if you download series from torrent &amp; co. but because it seems something not so legal, please do not ping me about this topic:-)</p>  <p>&#160;</p>  <p><strong>Well, lets’ start with a list of files</strong>:</p>  <p>&#160;</p>  <p></p>  <pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">PS C:\TEMP\temp&gt; dir
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">    Directory: C:\TEMP\temp
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">Mode                LastWriteTime     Length Name
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">----                -------------     ------ ----
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 Ephisode 1.wmv
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 Ephisode 2.wmv
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 Ephisode 3.wmv
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 Ephisode 4.wmv</pre></pre>

<p>&#160;</p>

<p><strong>Let add series information at begin of the file name</strong>:</p>

<p>&#160;</p>

<pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">PS C:\TEMP\temp&gt; dir | %{$x=1} {rename-item $_ -NewName &quot;<span style="color: #8b0000">E1-$x Scrubs -.wmv</span>&quot;; $x++}
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">PS C:\TEMP\temp&gt; dir
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">    Directory: C:\TEMP\temp
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">Mode                LastWriteTime     Length Name
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">----                -------------     ------ ----
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-1 Scrubs -.wmv
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-2 Scrubs -.wmv
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-3 Scrubs -.wmv
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-4 Scrubs -.wmv
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre></pre>

<p><strong>Ok, now I have a file with all ep. titles</strong>:</p>

<pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">My first <span style="color: #0000ff">day</span>
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">My Mentor
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">My Best Friend's Mistake
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">My Old Lady</pre></pre>

<p>&#160;</p>

<p><strong>And with the following rows I add the title to the file name</strong>:</p>

<pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">PS C:\TEMP\temp&gt; $title = <span style="color: #0000ff">Get</span>-Content &quot;<span style="color: #8b0000">..\titles.txt</span>&quot;
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">PS C:\TEMP\temp&gt; dir | %{$x=0} {rename-item $_ -newname (&quot;<span style="color: #8b0000">E1-</span>&quot; + ($x+1) + &quot;<span style="color: #8b0000"> Scrubs - </span>&quot; + $Title[$x] + &quot;<span style="color: #8b0000">.wmv</span>&quot;); $x++ }
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">PS C:\TEMP\temp&gt; dir
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">    Directory: C:\TEMP\temp
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">Mode                LastWriteTime     Length Name
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">----                -------------     ------ ----
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-1 Scrubs - My first <span style="color: #0000ff">day</span>.wmv
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-2 Scrubs - My Mentor.wmv
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-3 Scrubs - My Best Friend's Mistake.wmv
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-4 Scrubs - My Old Lady.wmv</pre></pre>

<p>&#160;</p>

<p><strong>and now let’s add something at the end:</strong></p>

<pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">PS C:\TEMP\temp&gt; <span style="color: #0000ff">foreach</span> ($f <span style="color: #0000ff">in</span> dir) {rename-item $f -newname ($f.Name.<span style="color: #0000ff">Replace</span>(&quot;<span style="color: #8b0000">.wmv</span>&quot;, &quot;<span style="color: #8b0000">- ripped by Nicold.wmv</span>&quot;))}
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">PS C:\TEMP\temp&gt; dir
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">    Directory: C:\TEMP\temp
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">Mode                LastWriteTime     Length Name
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">----                -------------     ------ ----
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-1 Scrubs - My first <span style="color: #0000ff">day</span>- ripped by Nicold.wmv
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-2 Scrubs - My Mentor- ripped by Nicold.wmv
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-3 Scrubs - My Best Friend's Mistake- ripped by Nicold.wmv
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">-a---         20-Jan-10   3:49 PM          0 E1-4 Scrubs - My Old Lady- ripped by Nicold.wmv</pre></pre>

<p>&#160;</p>

<p>enjoy!</p>

<p>&#160;</p>

<p>PS. Yes I love <a href="http://en.wikipedia.org/wiki/Scrubs_(TV_series)" target="_blank">Scrubs</a>:-)</p>
